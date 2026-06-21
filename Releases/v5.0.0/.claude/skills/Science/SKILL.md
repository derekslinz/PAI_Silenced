---
name: Science
description: "The scientific method as a universal problem-solving algorithm — goal-first, hypothesis-plural, falsifiable experiments, honest measurement. Seven core workflows: DefineGoal, GenerateHypotheses (minimum required — single-hypothesis testing is confirmation bias), DesignExperiment, MeasureResults, AnalyzeResults, Iterate, and FullCycle. Two diagnostic shortcuts: QuickDiagnosis (-minute rule for fast debugging) and StructuredInvestigation (complex multi-factor issues). Scales across micro (TDD, minutes), meso (feature validation, hours-days), and macro (MVP launch, weeks-months). Reference files: METHODOLOGY.md (deep dive on each phase), Protocol.md (how other skills invoke Science), Templates.md (goal/hypothesis/experiment/results templates), Examples.md (worked examples across scales). Integrates with Council (hypothesis validation), Evals (measurement), Development (parallel experiment worktrees), and RedTeam (stress-test hypotheses). RootCauseAnalysis applies Science to failure investigation — pair them when investigating incidents. NOT FOR multi-angle lens passes on requirements (use IterativeDepth for pre-build exploration). USE WHEN think about, figure out, experiment, iterate, improve, optimize, hypothesis, science, full cycle, quick diagnosis, structured investigation, what might work, how do we test, what happened, analyze results."
effort: high
---

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Science/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

Science - The Universal Algorithm

The scientific method applied to everything. The meta-skill that governs all other skills.
The Universal Cycle

```
GOAL -----> What does success look like?
   |
OBSERVE --> What is the current state?
   |
HYPOTHESIZE -> What might work? (Generate MULTIPLE)
   |
EXPERIMENT -> Design and run the test
   |
MEASURE --> What happened? (Data collection)
   |
ANALYZE --> How does it compare to the goal?
   |
ITERATE --> Adjust hypothesis and repeat
   |
   +------> Back to HYPOTHESIZE
```

The goal is CRITICAL.Without clear success criteria, you cannot judge results.

---

Workflow Routing

Output when executing:`Running the WorkflowNameworkflow in the Scienceskill to ACTION...`

Core Workflows

| Trigger | Workflow |
|---------|----------|
| "define the goal", "what are we trying to achieve" | `Workflows/DefineGoal.md` |
| "what might work", "ideas", "hypotheses" | `Workflows/GenerateHypotheses.md` |
| "how do we test", "experiment design" | `Workflows/DesignExperiment.md` |
| "what happened", "measure", "results" | `Workflows/MeasureResults.md` |
| "analyze", "compare to goal" | `Workflows/AnalyzeResults.md` |
| "iterate", "try again", "next cycle" | `Workflows/Iterate.md` |
| Full structured cycle | `Workflows/FullCycle.md` |

Diagnostic Workflows

| Trigger | Workflow |
|---------|----------|
| Quick debugging (-min rule) | `Workflows/QuickDiagnosis.md` |
| Complex investigation | `Workflows/StructuredInvestigation.md` |

---

Resource Index

| Resource | Description |
|----------|-------------|
| `METHODOLOGY.md` | Deep dive into each phase |
| `Protocol.md` | How skills implement Science |
| `Templates.md` | Goal, Hypothesis, Experiment, Results templates |
| `Examples.md` | Worked examples across scales |

---

Domain Applications

| Domain | Manifestation | Related Skill |
|--------|---------------|---------------|
| Coding| TDD (Red-Green-Refactor) | Development |
| Products| MVP -> Measure -> Iterate | Development |
| Research| Question -> Study -> Analyze | Research |
| Prompts| Prompt -> Eval -> Iterate | Evals |
| Decisions| Options -> Council -> Choose | Council |

---

Scale of Application

| Level | Cycle Time | Example |
|-------|-----------|---------|
| Micro| Minutes | TDD: test, code, refactor |
| Meso| Hours-Days | Feature: spec, implement, validate |
| Macro| Weeks-Months | Product: MVP, launch, measure PMF |

---

Integration Points

| Phase | Skills to Invoke |
|-------|-----------------|
| Goal| Council for validation |
| Observe| Research for context |
| Hypothesize| Council for ideas, RedTeam for stress-test |
| Experiment| Development (Worktrees) for parallel tests |
| Measure| Evals for structured measurement |
| Analyze| Council for multi-perspective analysis |

---

Key Principles (Quick Reference)

. Goal-First- Define success before starting
. Hypothesis Plurality- NEVER just one idea (minimum )
. Minimum Viable Experiments- Smallest test that teaches
. Falsifiability- Experiments must be able to fail
. Measure What Matters- Only goal-relevant data
. Honest Analysis- Compare to goal, not expectations
. Rapid Iteration- Cycle speed > perfect experiments

---

Anti-Patterns

| Bad | Good |
|-----|------|
| "Make it better" | "Reduce load time from s to s" |
| "I think X will work" | "Here are approaches: X, Y, Z" |
| "Prove I'm right" | "Design test that could disprove" |
| "Pretend failure didn't happen" | "What did we learn?" |
| "Keep experimenting forever" | "Ship and learn from production" |

---

Quick Start

. Goal- What does success look like?
. Observe- What do we know?
. Hypothesize- At least ideas
. Experiment- Minimum viable tests
. Measure- Collect goal-relevant data
. Analyze- Compare to success criteria
. Iterate- Adjust and repeat

The answer emerges from the cycle, not from guessing.
Gotchas

- Hypothesis-test-analyze is the core loop.Don't skip the hypothesis step — going straight to testing is just trial-and-error, not science.
- Minimum hypotheses before testing.Single-hypothesis testing is confirmation bias.
- Measurements must be specific and reproducible."It seems better" is not a measurement.
- Full cycle is for systematic investigation.For quick debugging, use quick diagnosis mode.

Examples

Example : Quick diagnosis```
User: "figure out why Surface time filters show stale items"
→ Quick diagnosis mode
→ Hypothesis: timestamp format mismatch in D→ Test: query Dfor actual stored format
→ Analyze: compare stored vs expected format
→ Result: ISO string vs Unix timestamp mismatch
```

Example : Full systematic investigation```
User: "experiment with different prompt structures for better output"
→ Full cycle mode
→ + hypotheses generated
→ Controlled experiments with measurements
→ Analysis identifies winning approach
→ Iterates until convergence
```

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Science","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
