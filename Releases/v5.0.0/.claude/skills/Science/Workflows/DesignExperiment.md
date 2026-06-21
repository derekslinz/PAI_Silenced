Design Experiment Workflow

Phase of the Scientific Cycle
Design the smallest experiment that meaningfully tests the hypothesis. This workflow ensures experiments are efficient, valid, and actionable.

---

The Core Principle

Minimum Viable Experiment
Not every experiment needs to be comprehensive. The goal is LEARNING, not perfection.

Ask:
- What's the fastestway to learn if this works?
- What's the cheapestway to get meaningful data?
- What would DISPROVEthe hypothesis?
- What's the minimum sample sizefor confidence?

---

The Experiment Design Process

Step : Define Success Criteria

Before running, know what outcomes mean.
```markdown
Success Criteria

Hypothesis CONFIRMED if:[Specific observable outcome that supports the hypothesis]

Hypothesis REFUTED if:[Specific observable outcome that contradicts the hypothesis]

INCONCLUSIVE if:[Conditions that mean we need more data]
```

The key insight:Define these BEFORE running the experiment. This prevents post-hoc rationalization.

Step : Identify Variables

```markdown
Variables

Independent Variable (what we're changing):[The thing we're manipulating]

Dependent Variable (what we're measuring):[The outcome we're observing]

Control Variables (what we're holding constant):- [Variable ]: held at [value]
- [Variable ]: held at [value]

Confounding Variables (what might skew results):- [Potential confounder ]: mitigated by [strategy]
- [Potential confounder ]: mitigated by [strategy]
```

Step : Design the Test

```markdown
Experiment Design

Method:. [Step ]
. [Step ]
. [Step ]

Control (baseline):[What we're comparing against]

Treatment:[What we're testing]

Measurement Approach:- Primary metric: [What we're measuring]
- How measured: [Collection method]
- When measured: [Timing]
- By whom: [Who collects]
```

Step : Plan Data Collection

```markdown
Data Collection Plan

Data Points:- [Metric ]: collected via [method]
- [Metric ]: collected via [method]

Sample Size:[How many data points needed]

Duration:[How long to run]

Collection Schedule:[When/how often to collect]

Data Storage:[Where raw data will be preserved]
```

Step : Define Stopping Rules

```markdown
Stopping Rules

Stop early if:- [Condition for early success]
- [Condition for early failure]
- [Safety condition]

Continue until:- [Minimum duration/sample reached]

Declare done when:- [Clear endpoint condition]
```

---

Experiment Quality Checklist

| Criterion | Question | |
|-----------|----------|---|
| Minimal| Is this the smallest test that gives meaningful data? | |
| Falsifiable| Could this experiment prove the hypothesis wrong? | |
| Measurable| Do we know exactly what we're measuring? | |
| Controlled| Have we isolated the variable we're testing? | |
| Reproducible| Could someone else run this experiment? | |
| Pre-committed| Are success criteria defined before running? | |

---

Domain-Specific Experiment Patterns

Code Experiments

Tool:Worktrees for parallel experiments

```markdown
Code Experiment Design

Hypothesis:[Implementation approach X will work]

Branches:- control: Current implementation
- treatment-: Approach A
- treatment-: Approach B

Test Method:- Run test suite on each branch
- Measure performance benchmarks
- Compare code complexity metrics

Success Criteria:- All tests pass
- Performance meets threshold
- Complexity doesn't increase
```

Prompt Experiments

Tool:Evals Skill (MANDATORY)

For ALL prompt experiments, invoke the Evals skill directly.
Evals implements the Science Protocol for prompt engineering. Don't reinvent evaluation - use the battle-tested methodology.

Invocation:```
→ Invoke Evals skill, ComparePrompts workflow
→ Follow Evals' Science Protocol Alignment checklist
→ Use Evals' statistical rigor (SEM, confidence intervals)
```

What Evals Provides:- Position swapping (mitigates LLM positional bias)
- Multi-judge panels (reduces individual model quirks)
- Statistical significance testing
- Pre-commitment enforcement
- Paradigm check when stuck

```markdown
Prompt Experiment Design

Hypothesis:[Prompt variant X will perform better]
Falsified if:[Variant X performance ≤ baseline, or improvement < threshold]

Variants (aim for +):- baseline: Current prompt
- variant-: [Modified prompt A]
- variant-: [Modified prompt B]
- variant-: [Modified prompt C - different direction]

Eval Method (via Evals skill):- Run eval suite with each variant
- N=samples per variant
- Position swapping enabled
- Measure accuracy, format compliance

Success Criteria (pre-committed):- Variant exceeds baseline by > %
- Statistical significance p < .- No regression on secondary metrics
```

CLI Quick Reference:```bash
Run prompt comparison via Evals skill
bun run ~/.claude/skills/Evals/EvalServer/cli-run.ts \
  --use-case <name> \
  --compare prompts/baseline.md prompts/variant-.md \
  --position-swap
```

Feature Experiments

Tool:Feature flags, A/B tests

```markdown
Feature Experiment Design

Hypothesis:[Feature X will improve metric Y]

Groups:- control: % of users (no feature)
- treatment: % of users (with feature)

Measurement:- Primary: [Conversion rate]
- Secondary: [Engagement, retention]

Duration:weeks minimum

Success Criteria:- Lift > % with % confidence
- No degradation in secondary metrics
```

Research Experiments

Tool:Parallel research agents

```markdown
Research Experiment Design

Hypothesis:[Theory X explains phenomenon Y]

Investigation Approach:- Agent : Search for supporting evidence
- Agent : Search for contradicting evidence
- Agent : Search for alternative explanations

Evidence Evaluation:- Source quality rating
- Recency
- Consensus level

Success Criteria:- Preponderance of high-quality evidence
- No strong contradicting evidence
```

---

Parallel Experiment Design

When hypotheses are independent, design experiments to run simultaneously.

```
Hypothesis  Experiment  Results 
                                                   
Hypothesis  Experiment  Results  Analysis
                                                   
Hypothesis  Experiment  Results 
```

Benefits:- Faster time to insight
- Reduces sequential bias
- Enables direct comparison

Requirements:- Experiments must be independent
- Resources available for parallel execution
- Results can be meaningfully compared

---

Template

```markdown
Experiment Design: [Name]

Testing Hypothesis:[Which hypothesis]
Date:[When designed]

Success Criteria
- CONFIRMED if: [condition]
- REFUTED if: [condition]
- INCONCLUSIVE if: [condition]

Variables
- Independent:[What we change]
- Dependent:[What we measure]
- Controls:[What we hold constant]

Method
. [Step ]
. [Step ]
. [Step ]

Data Collection
- Metrics:[What we collect]
- Sample Size:[How many]
- Duration:[How long]

Stopping Rules
- Stop early if: [condition]
- Continue until: [condition]

Resources Needed
- [Resource ]
- [Resource ]
```

---

Common Pitfalls

Pitfall : Over-Engineering
Building elaborate test infrastructure for a simple question
Finding the minimum viable test that answers the question

Pitfall : Confirmation Design
Designing tests that can only succeed
Designing tests that could definitively fail

Pitfall : Moving Targets
Changing success criteria after seeing results
Pre-committing to criteria before running

Pitfall : Ignoring Confounders
Assuming all differences are due to the treatment
Identifying and controlling for other variables

Pitfall : Insufficient Sample
Declaring results from N=Understanding minimum sample for statistical validity

---

Integration with Next Phases

A well-designed experiment enables:
- Clear execution- steps are defined
- Objective measurement- metrics are specified
- Honest analysis- success criteria are pre-committed
- Efficient iteration- learn quickly, move on
