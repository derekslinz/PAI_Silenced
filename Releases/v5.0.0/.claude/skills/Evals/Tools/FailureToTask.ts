!/usr/bin/env bun
/ Failure to Task Converter
 Convert real failures into evaluation test cases
 Per Anthropic: "-simple tasks drawn from real failures is a great start"
 /

import type { FailureLog, Task, GraderConfig, EvalDomain } from '../Types/index.ts';
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync } from 'fs';
import { join } from 'path';
import { stringify as stringifyYaml } from 'yaml';
import { parseArgs } from 'util';

const EVALS_DIR = join(import.meta.dir, '..');
const FAILURES_LOG = join(EVALS_DIR, 'Data', 'failures.jsonl');
const TASKS_DIR = join(EVALS_DIR, 'UseCases');

/ Ensure directories exist
 /
function ensureDirs(): void {
  const dataDir = join(EVALS_DIR, 'Data');
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  if (!existsSync(TASKS_DIR)) mkdirSync(TASKS_DIR, { recursive: true });
}

/ Log a failure for later conversion
 /
export function logFailure(failure: Omit<FailureLog, 'id' | 'timestamp'>): FailureLog {
  ensureDirs();

  const log: FailureLog = {
    ...failure,
    id: `failure_${Date.now()}_${Math.random().toString().slice(, )}`,
    timestamp: new Date().toISOString(),
  };

  appendFileSync(FAILURES_LOG, JSON.stringify(log) + '\n');

  return log;
}

/ Load all failures
 /
export function loadFailures(): FailureLog[] {
  if (!existsSync(FAILURES_LOG)) return [];

  const content = readFileSync(FAILURES_LOG, 'utf-');
  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line) as FailureLog);
}

/ Load unconverted failures
 /
export function loadUnconvertedFailures(): FailureLog[] {
  return loadFailures().filter(f => !f.converted_to_task);
}

/ Infer domain from failure category
 /
function inferDomain(category: string): EvalDomain {
  const domainMap: Record<string, EvalDomain> = {
    file_targeting: 'coding',
    wrong_file: 'coding',
    partial_edit: 'coding',
    missing_test: 'coding',
    code_quality: 'coding',
    over_engineering: 'coding',
    tool_sequence: 'coding',
    conversation_flow: 'conversational',
    tone: 'conversational',
    empathy: 'conversational',
    research_accuracy: 'research',
    source_quality: 'research',
    hallucination: 'research',
    gui_interaction: 'computer_use',
    screenshot: 'computer_use',
  };

  return domainMap[category.toLowerCase()] ?? 'general';
}

/ Infer graders from failure category
 /
function inferGraders(category: string, failure: FailureLog): GraderConfig[] {
  const graders: GraderConfig[] = [];

  // Always add tool call verification for coding/agent failures
  if (['file_targeting', 'wrong_file', 'tool_sequence'].includes(category)) {
    graders.push({
      type: 'tool_calls',
      weight: .,
      required: true,
      params: {
        required: [{ tool: 'read_file' }, { tool: 'edit_file' }],
        sequence: ['read_file', 'edit_file'],
      },
    });
  }

  // Add state check for outcome verification
  if (failure.expected_behavior) {
    graders.push({
      type: 'state_check',
      weight: .,
      params: {
        check_files: [{ path: '.', contains: [failure.expected_behavior.slice(, )] }],
      },
    });
  }

  // Add LLM rubric for quality assessment
  graders.push({
    type: 'llm_rubric',
    weight: .,
    params: {
      rubric: `The agent should: ${failure.expected_behavior ?? 'complete the task correctly'}

The agent should NOT: ${failure.actual_behavior ?? 'fail the task'}

Evaluate if the agent avoided the failure mode described.`,
      reasoning_first: true,
      scale: '-',
    },
  });

  return graders;
}

/ Convert a failure to a task
 /
export function convertFailureToTask(failure: FailureLog): Task {
  const domain = inferDomain(failure.category);
  const graders = inferGraders(failure.category, failure);

  const task: Task = {
    id: `task_${failure.category}_${Date.now()}`,
    description: failure.description,
    type: 'regression',  // Failures become regression tests
    domain,
    graders,
    tracked_metrics: [
      { type: 'transcript', metrics: ['n_turns', 'n_toolcalls'] },
    ],
    trials: ,
    pass_threshold: .,
    tags: [failure.category, failure.severity, 'from_failure'],
    source: 'failure_log',
    created_at: new Date().toISOString(),
  };

  // Add setup if we have context
  if (failure.task_context) {
    task.setup = {
      working_dir: '.',
    };
  }

  return task;
}

/ Save a task to the filesystem
 /
export function saveTask(task: Task, suiteName?: string): string {
  ensureDirs();

  const suiteDir = suiteName
    ? join(TASKS_DIR, suiteName)
    : join(TASKS_DIR, 'Regression', task.domain ?? 'general');

  if (!existsSync(suiteDir)) mkdirSync(suiteDir, { recursive: true });

  const taskPath = join(suiteDir, `${task.id}.yaml`);
  writeFileSync(taskPath, stringifyYaml(task));

  return taskPath;
}

/ Mark a failure as converted
 /
export function markConverted(failureId: string, taskId: string): void {
  const failures = loadFailures();
  const updated = failures.map(f =>
    f.id === failureId ? { ...f, converted_to_task: taskId } : f
  );

  writeFileSync(FAILURES_LOG, updated.map(f => JSON.stringify(f)).join('\n') + '\n');
}

/ Convert all unconverted failures
 /
export function convertAllFailures(suiteName?: string): Task[] {
  const failures = loadUnconvertedFailures();
  const tasks: Task[] = [];

  for (const failure of failures) {
    const task = convertFailureToTask(failure);
    const path = saveTask(task, suiteName);
    markConverted(failure.id, task.id);
    tasks.push(task);
    console.log(`Converted: ${failure.description.slice(, )}... → ${path}`);
  }

  return tasks;
}

/ Format failure for display
 /
function formatFailure(failure: FailureLog): string {
  const severityIcon = {
    low: '',
    medium: '',
    high: '',
    critical: '',
  }[failure.severity];

  const converted = failure.converted_to_task ? '' : '';

  return `${converted} ${severityIcon} [${failure.category}] ${failure.description.slice(, )}...`;
}

// CLI interface
if (import.meta.main) {
  const { values, positionals } = parseArgs({
    args: Bun.argv.slice(),
    options: {
      category: { type: 'string', short: 'c' },
      severity: { type: 'string', short: 's', default: 'medium' },
      expected: { type: 'string', short: 'e' },
      actual: { type: 'string', short: 'a' },
      suite: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
  });

  const [command, ...args] = positionals;

  if (values.help || !command) {
    console.log(`
FailureToTask - Convert failures into evaluation tasks

Per Anthropic: "-simple tasks drawn from real failures is a great start"

Commands:
  log <description>   Log a new failure
  list                List all failures
  list-unconverted    List failures not yet converted
  convert <id>        Convert a specific failure to task
  convert-all         Convert all unconverted failures
  stats               Show failure statistics

Options:
  -c, --category      Failure category (file_targeting, tool_sequence, etc.)
  -s, --severity      Severity: low, medium, high, critical (default: medium)
  -e, --expected      Expected behavior
  -a, --actual        Actual behavior
  --suite             Suite name for converted tasks
  -h, --help          Show this help

Examples:
  bun run FailureToTask.ts log "Agent edited wrong file" -c file_targeting -s high
  bun run FailureToTask.ts log "Agent skipped tests before commit" -c tool_sequence -e "Run tests first"
  bun run FailureToTask.ts list
  bun run FailureToTask.ts convert-all --suite regression-core
`);
    process.exit();
  }

  switch (command) {
    case 'log': {
      if (!args[]) {
        console.error('Usage: log <description> -c category');
        process.exit();
      }
      const failure = logFailure({
        description: args.join(' '),
        category: values.category ?? 'unknown',
        severity: values.severity as 'low' | 'medium' | 'high' | 'critical',
        expected_behavior: values.expected,
        actual_behavior: values.actual,
      });
      console.log(`Logged failure: ${failure.id}`);
      break;
    }

    case 'list': {
      const failures = loadFailures();
      console.log(`\n${failures.length} Failures:\n`);
      for (const failure of failures) {
        console.log('  ' + formatFailure(failure));
      }
      break;
    }

    case 'list-unconverted': {
      const failures = loadUnconvertedFailures();
      console.log(`\n${failures.length} Unconverted Failures:\n`);
      for (const failure of failures) {
        console.log('  ' + formatFailure(failure));
      }
      break;
    }

    case 'convert': {
      if (!args[]) {
        console.error('Usage: convert <failure-id>');
        process.exit();
      }
      const failures = loadFailures();
      const failure = failures.find(f => f.id === args[]);
      if (!failure) {
        console.error(`Failure not found: ${args[]}`);
        process.exit();
      }
      const task = convertFailureToTask(failure);
      const path = saveTask(task, values.suite);
      markConverted(failure.id, task.id);
      console.log(`Converted to: ${path}`);
      break;
    }

    case 'convert-all': {
      const tasks = convertAllFailures(values.suite);
      console.log(`\nConverted ${tasks.length} failures to tasks`);
      break;
    }

    case 'stats': {
      const failures = loadFailures();
      const categories: Record<string, number> = {};
      const severities: Record<string, number> = {};
      let converted = ;

      for (const f of failures) {
        categories[f.category] = (categories[f.category] ?? ) + ;
        severities[f.severity] = (severities[f.severity] ?? ) + ;
        if (f.converted_to_task) converted++;
      }

      console.log(`\nFailure Statistics:\n`);
      console.log(`  Total: ${failures.length}`);
      console.log(`  Converted: ${converted}`);
      console.log(`  Pending: ${failures.length - converted}`);
      console.log(`\n  By Category:`);
      for (const [cat, count] of Object.entries(categories).sort((a, b) => b[] - a[])) {
        console.log(`    ${cat}: ${count}`);
      }
      console.log(`\n  By Severity:`);
      for (const sev of ['critical', 'high', 'medium', 'low']) {
        if (severities[sev]) console.log(`    ${sev}: ${severities[sev]}`);
      }
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      process.exit();
  }
}
