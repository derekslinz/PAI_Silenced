Fishbone Workflow — RootCauseAnalysis

Purpose

Construct a fishbone (Ishikawa) diagram— a cause-and-effect map that organizes contributing factors into named categories. Unlike Whys, which follows a single linear chain, Fishbone is deliberately breadth-first: it forces you to consider all categories of cause before drilling down.

Best tool when multiple stakeholders contribute domain knowledge, the problem plausibly has causes in more than one category, or you need a structured brainstorm before narrowing.

Invocation

- "Fishbone," "Ishikawa," "cause-and-effect diagram"
- "What are all the things that could contribute to this?"
- Multiple stakeholders need to contribute
- Before running Whys — to avoid fixating on one cause category prematurely
- Quality / defect investigation where the failure mode could come from several sources

The Structure

```
                  People              Process             Material
                     │                   │                   │
               ┌─────┴─────┐       ┌─────┴─────┐       ┌─────┴─────┐
               │           │       │           │       │           │
               │           │       │           │       │           │
        ─ ─ ─ ─┴─ ─ ─ ─ ─ ─┴─ ─ ─ ─┴─ ─ ─ ─ ─ ─┴─ ─ ─ ─┴─ ─ ─ ─ ─ ─┼─ ─ ─ ─ PROBLEM
                                                                    │
               │           │       │           │       │           │
               │           │       │           │       │           │
               └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
                     │                   │                   │
                  Machine           Measurement         Environment
```

Problem at the "head" (right). Categories as major "bones." Specific causes as sub-bones within each category.

Choosing a Category Set

Ishikawa himself recommended adapting categories to context. Standard sets:

M's — Manufacturing / Technical Systems (default for software)

| Category | Covers |
|----------|--------|
| Manpower (People)| Skills, training, experience, fatigue, motivation, staffing levels |
| Machine (Equipment)| Hardware, software, tooling, calibration, version, configuration |
| Method (Process)| Procedures, workflows, instructions, algorithms, runbooks |
| Material| Inputs, dependencies, third-party libraries, data quality |
| Measurement| Metrics, monitoring, testing, instrumentation accuracy |
| Mother Nature (Environment)| Network conditions, load, ambient variables, seasonal effects |

P's — Service / Customer-Facing Industries

| Category | Covers |
|----------|--------|
| People| Staff, customers, stakeholders |
| Process| Workflows, procedures, SLAs |
| Policies| Rules, standards, governance |
| Procedures| Specific runbooks, scripts |

M's — Extended Manufacturing

M's + Management(decisions, priorities, resource allocation) + Maintenance(upkeep, patching, lifecycle)

P's — Business / Marketing Strategy

Product/Service, Price, Place, Promotion, People, Process, Physical Evidence, Partners

For software incidents, M's is almost always the right starting point. Adapt if the problem is clearly not fitting (e.g., pure process failure → use P's).

Execution

Step : Write the Problem Statement

Place at the head of the fish. Must be measurable and specific.

```
PROBLEM: [Precise, observable statement]
```

Step : Select Category Set

Based on problem type. Document the choice in output.

Step : Brainstorm Causes Within Each Category

Rules:- No evaluation during brainstorm.Every candidate is captured.
- Multiple stakeholders contribute.Different expertise surfaces different categories.
- Use sticky notes / whiteboard.Visual helps.
- Empty category is a signal.If People has zero causes, either this isn't a People problem or you need different experts in the room.

For each category, ask:
- What in this category could have contributed?
- What is unusual, stressed, or recently changed in this category?
- What would need to be true for this category to be a cause?

Step : Develop Sub-Bones (Nested Whys)

For each cause, ask "Why does this happen?" -times. This is where Whys nests inside Fishbone— each category branch gets its own small Whys chain.

```
Category: Process
  ├─ Cause: Deploy runbook missing
  │    └─ Why: Template predates current architecture
  │         └─ Why: No owner for runbook maintenance
  ├─ Cause: Rollback procedure untested
  │    └─ Why: Never run in prod
  │         └─ Why: Fear of causing secondary incident
```

Step : Prioritize Using Pareto

Not all identified causes matter equally. Apply Pareto analysis:

. Quantifyeach cause — frequency from incident history, estimated impact, or expert estimate.
. Sort descendingby quantity.
. Calculate cumulative percentage.. Identify the vital few(typically top -causes that account for % of impact).
. Focus remediation on the vital few; park the rest.

Critical:Pareto identifies whichcauses to focus on; it does not tell you whythose causes occur. Always follow with Whys depth on the vital few.

Step : Verify the Top Causes

Do not assume causation.For each vital-few cause, plan verification:

```
CAUSE: [description]
VERIFICATION PLAN: [how we'll test whether this is actually a contributing cause]
- Evidence needed: [data/observation required]
- Test: [experiment or historical query]
- Expected outcome if cause is real: [prediction]
```

Output Format

```
FISHBONE ANALYSIS: [problem]

PROBLEM: [precise statement]
CATEGORY SET: [M / P / M / P / custom]

CAUSE MAP:

People:
- [Cause A]
  └─ Why: [depth]
- [Cause A]

Machine:
- [Cause B]
- [Cause B]

Method:
- [Cause C]
  └─ Why: [depth]
    └─ Why: [depth]

Material:
- [Cause D]

Measurement:
- [Cause E]

Environment:
- [Cause F]

PARETO (top causes by impact):
| Cause | Impact | Cumulative % |
|-------|--------|--------------|
| [C]  | %    | %          |
| [B]  | %    | %          |
| [A]  | %    | %          |  ← % threshold above this line
| [D]  | %    | %          |
| ...   | ...    | ...          |

VITAL FEW (primary focus):
. [Cause] — verification plan: [...]
. [Cause] — verification plan: [...]
. [Cause] — verification plan: [...]

CORRECTIVE ACTIONS: [after verification, each verified cause gets an action]
```

Worked Example — Elevated pLatency Post-Deploy

```
PROBLEM: Checkout service platency spiked from ms to ,ms after deploy on --.

CATEGORY SET: M's

CAUSE MAP:

Manpower (People):
- Deploying engineer was new to this service; unfamiliar with async-only pattern
- Reviewer approved the PR without running benchmarks

Machine:
- Instance type selected in Terraform was t.small (underpowered for new workload)
- Connection pool sized for previous traffic pattern

Method:
- No canary release process — % of traffic shifted at once
- No pre-deploy performance smoke test

Material:
- New dependency introduced a synchronous external API call (was async in prior version)
- Shared library version upgraded; deprecated async API

Measurement:
- Percentile latency not in pre-deploy runbook check (only mean latency)
- No alert on pdeviation during rollout

Environment:
- Deploy occurred during peak traffic window (:UTC)
- External dependency had elevated latency that day (not factored in)

PARETO:
| Cause | Est. impact | Cumulative |
|-------|-------------|------------|
| Synchronous external call (Material) | % | % |
| No canary (Method) | % | % |
| t.small instance (Machine) | % | % |
| Peak deploy window (Environment) | % | % |
| Others | % | % |

VITAL FEW:
. Synchronous external call — verification: review diff; run local benchmark comparing sync vs. async
. No canary process — verification: historical: have past full-traffic deploys also spiked?
. Instance type — verification: redeploy to t.medium; compare

CORRECTIVE ACTIONS:
- Convert external call back to async — owner: checkout — deadline: Apr - Implement canary (% → % → % with pgate) — owner: platform — deadline: Apr - Instance sizing in Terraform per-service review — owner: infra — deadline: May ```

Common Mistakes

- Forcing causes into categories.If a cause doesn't fit any category, consider adding a new one — don't distort the cause.
- Empty categories ignored.An empty category often means you need a different expert. Don't just move on.
- Pareto skipped.Without prioritization, you try to fix everything and fix nothing.
- Verification skipped.A cause on the diagram is a hypothesis, not a conclusion. Test the top candidates before committing to remediation.
- Category choice wrong.M's for a pure policy problem produces a distorted diagram. Pick (or adapt) the right categories.
- Single-session work.For complex incidents, the initial fishbone is draft . New evidence in subsequent sessions often reshapes the diagram.

Integration

- Whys nests inside— each sub-bone can become its own Whys chain
- Pareto nests inside— quantitative prioritization step
- Postmortem wraps Fishbone— Postmortem uses Fishbone for the "contributing factors" section
- Feeds SystemsThinking— if multiple fishbone causes point to structural issues, escalate to Iceberg

Attribution

Kaoru Ishikawa, first used at Kawasaki Steel Works (), formally presented , codified in Guide to Quality Control(JUSE Press, ) as one of the seven basic quality tools. Category-set variants from American Society for Quality (ASQ) training literature and AIAG manufacturing standards.
