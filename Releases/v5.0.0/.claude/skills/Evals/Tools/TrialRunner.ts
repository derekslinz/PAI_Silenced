!/usr/bin/env bun
/ Trial Runner
 Execute multiple trials and calculate pass@k / pass^k metrics
 /

import type { Task, Trial, EvalRun, GraderResult, Transcript, GraderConfig } from '../Types/index.ts';
import { createGrader, runGraders, type GraderContext } from '../Graders/Base.ts';
import { TranscriptCapture } from './TranscriptCapture.ts';
import { parseArgs } from 'util';

// Import graders to register them
import '../Graders/CodeBased/index.ts';
import '../Graders/ModelBased/index.ts';

export interface TrialRunnerConfig {
  task: Task;
  executor: (task: Task, trialNumber: number) => Promise<{
    output: string;
    transcript: Transcript;
    outcome?: unknown;
  }>;
  onTrialComplete?: (trial: Trial) => void;
}

export class TrialRunner {
  private config: TrialRunnerConfig;

  constructor(config: TrialRunnerConfig) {
    this.config = config;
  }

  /   Run all trials for a task
   /
  async run(): Promise<EvalRun> {
    const task = this.config.task;
    const nTrials = task.trials ?? ;
    const trials: Trial[] = [];

    const runId = `run_${Date.now()}_${Math.random().toString().slice(, )}`;
    const startTime = Date.now();

    // Create graders
    const graders = task.graders.map(config => createGrader(config));

    for (let i = ; i < nTrials; i++) {
      const trialId = `trial_${i + }`;
      const trialStart = Date.now();

      try {
        // Execute the task
        const execution = await this.config.executor(task, i + );

        // Create grader context
        const context: GraderContext = {
          task_id: task.id,
          trial_id: trialId,
          transcript: execution.transcript,
          output: execution.output,
          working_dir: task.setup?.working_dir,
          reference: task.reference_solution,
        };

        // Run graders
        const { results, aggregate_score, passed } = await runGraders(graders, context);

        const trial: Trial = {
          id: trialId,
          task_id: task.id,
          trial_number: i + ,
          status: passed ? 'passed' : 'failed',
          started_at: new Date(trialStart).toISOString(),
          completed_at: new Date().toISOString(),
          transcript: execution.transcript,
          grader_results: results,
          score: aggregate_score,
          passed,
        };

        trials.push(trial);

        if (this.config.onTrialComplete) {
          this.config.onTrialComplete(trial);
        }
      } catch (e) {
        // Create failed trial
        const trial: Trial = {
          id: trialId,
          task_id: task.id,
          trial_number: i + ,
          status: 'error',
          started_at: new Date(trialStart).toISOString(),
          completed_at: new Date().toISOString(),
          transcript: new TranscriptCapture(task.id, trialId).finalize(),
          grader_results: [],
          score: ,
          passed: false,
          error: String(e),
        };

        trials.push(trial);

        if (this.config.onTrialComplete) {
          this.config.onTrialComplete(trial);
        }
      }
    }

    // Calculate aggregate metrics
    const passCount = trials.filter(t => t.passed).length;
    const scores = trials.map(t => t.score);
    const meanScore = scores.reduce((a, b) => a + b, ) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - meanScore, ), ) / scores.length;
    const stdDev = Math.sqrt(variance);

    // Calculate pass@k and pass^k
    const passAtK = this.calculatePassAtK(trials);
    const passToK = this.calculatePassToK(trials);

    const evalRun: EvalRun = {
      id: runId,
      task_id: task.id,
      trials,
      n_trials: nTrials,
      pass_rate: passCount / nTrials,
      mean_score: meanScore,
      std_dev: stdDev,
      pass_at_k: passAtK,
      pass_to_k: passToK,
      started_at: new Date(startTime).toISOString(),
      completed_at: new Date().toISOString(),
      total_duration_ms: Date.now() - startTime,
    };

    return evalRun;
  }

  /   pass@k: Probability of at least one success in k trials
   This measures capability - can the agent ever succeed?
      Formula: - (n-c choose k) / (n choose k)
   where n = total trials, c = successful trials, k = trials considered
      For k = n (using all trials): if any passed, otherwise
   Simplified: At least one trial passed
   /
  private calculatePassAtK(trials: Trial[]): number {
    const anyPassed = trials.some(t => t.passed);
    return anyPassed ? : ;
  }

  /   pass^k: Probability all k trials succeed
   This measures consistency/reliability
      For k = n (using all trials): All trials must pass
   Simplified: pass_rate
   /
  private calculatePassToK(trials: Trial[]): number {
    const passCount = trials.filter(t => t.passed).length;
    return passCount / trials.length;
  }
}

/ Calculate extended pass@k for different k values
 /
export function calculatePassAtKForK(trials: Trial[], k: number): number {
  const n = trials.length;
  const c = trials.filter(t => t.passed).length;

  if (k > n) return ;  // Can't calculate for k > n
  if (c === ) return ;  // No successes
  if (c >= k) return ;  // Guaranteed at least one success in any k sample

  // Calculate: - (n-c choose k) / (n choose k)
  // = - [(n-c)! / (k! (n-c-k)!)] / [n! / (k! (n-k)!)]
  // = - [(n-c)! (n-k)!] / [(n-c-k)! n!]

  let failProb = ;
  for (let i = ; i < k; i++) {
    failProb = (n - c - i) / (n - i);
  }

  return - failProb;
}

/ Format evaluation results for display
 /
export function formatEvalResults(run: EvalRun): string {
  const lines: string[] = [];

  lines.push(`Evaluation Results: ${run.task_id}`);
  lines.push('');
  lines.push(`Run ID:${run.id}`);
  lines.push(`Duration:${(run.total_duration_ms / ).toFixed()}s`);
  lines.push('');
  lines.push('Summary');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Trials | ${run.n_trials} |`);
  lines.push(`| Pass Rate | ${(run.pass_rate ).toFixed()}% |`);
  lines.push(`| Mean Score | ${run.mean_score.toFixed()} |`);
  lines.push(`| Std Dev | ${run.std_dev.toFixed()} |`);
  lines.push(`| pass@k | ${(run.pass_at_k ).toFixed()}% |`);
  lines.push(`| pass^k | ${(run.pass_to_k ).toFixed()}% |`);
  lines.push('');

  lines.push('Trial Results');
  lines.push('');
  lines.push(`| Trial | Status | Score | Duration |`);
  lines.push(`|-------|--------|-------|----------|`);

  for (const trial of run.trials) {
    const status = trial.passed ? 'PASS' : trial.status === 'error' ? 'ERROR' : 'FAIL';
    const duration = trial.transcript.metrics.wall_time_ms;
    lines.push(`| ${trial.trial_number} | ${status} | ${trial.score.toFixed()} | ${(duration / ).toFixed()}s |`);
  }

  // Show grader breakdown for first trial
  if (run.trials.length > && run.trials[].grader_results.length > ) {
    lines.push('');
    lines.push('Grader Breakdown (Trial )');
    lines.push('');
    lines.push(`| Grader | Score | Passed | Weight |`);
    lines.push(`|--------|-------|--------|--------|`);

    for (const result of run.trials[].grader_results) {
      const passed = result.passed ? '' : '';
      lines.push(`| ${result.grader_type} | ${result.score.toFixed()} | ${passed} | ${result.weight} |`);
    }
  }

  return lines.join('\n');
}

// CLI interface
if (import.meta.main) {
  const { values } = parseArgs({
    args: Bun.argv.slice(),
    options: {
      'task-file': { type: 'string', short: 't' },
      trials: { type: 'string', short: 'n', default: '' },
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
  });

  if (values.help || !values['task-file']) {
    console.log(`
TrialRunner - Execute evaluations with multiple trials

Usage:
  bun run TrialRunner.ts -t <task-file> [-n trials]

Options:
  -t, --task-file    Path to task YAML file
  -n, --trials       Number of trials (default: from task or )
  -h, --help         Show this help

Example:
  bun run TrialRunner.ts -t UseCases/coding/fix-auth/task.yaml -n `);
    process.exit();
  }

  console.log('Note: Full execution requires an agent executor to be configured.');
  console.log('This CLI is for testing the runner infrastructure.');
}
