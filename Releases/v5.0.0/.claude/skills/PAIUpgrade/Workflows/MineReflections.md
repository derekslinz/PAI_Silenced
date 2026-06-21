MineReflections Workflow

Mines internal algorithm reflections for recurring patterns that suggest Algorithm or system upgrades.
Trigger:"mine reflections", "check reflections", "what have we learned", "internal improvements", "reflection insights"

---

Overview

The Algorithm writes a structured reflection after every Standard+ run to `~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl`. Each entry contains three questions focused on algorithm performance:

- Q(Self):What would I have done differently?
- Q(Algorithm):What would a smarter algorithm have done?
- Q(AI):What would a fundamentally smarter AI have done?

This workflow mines those reflections for recurring themesand produces actionable upgrade candidatesfor the Algorithm, skills, hooks, or system architecture.

---

Data Schema

Each JSONL entry contains:

```json
{
  "timestamp": "ISO or epoch",
  "effort_level": "Standard|Extended|Advanced|...",
  "task_description": "What was being done",
  "criteria_count": ,
  "criteria_passed": ,
  "criteria_failed": ,
  "prd_id": "ISA-YYYYMMDD-slug",
  "implied_sentiment": ,
  "reflection_q": "Self-reflection on algorithm execution",
  "reflection_q": "What a smarter algorithm would do differently",
  "reflection_q": "What a fundamentally smarter AI would do",
  "within_budget": true,
  "rework_count": }
```

---

Execution

Step : Read All Reflections

```
Read ~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl

Parse each line as JSON. Collect all entries into an array.
Report: "Found N reflections spanning [date range]"
```

Step : Signal Prioritization

Not all reflections are equally valuable.Weight entries by signal strength:

| Signal | Weight | Rationale |
|--------|--------|-----------|
| `implied_sentiment` <= | HIGH | Low satisfaction = something went wrong worth fixing |
| `implied_sentiment` -| MEDIUM | Room for improvement |
| `implied_sentiment` -| LOW | Things went well — less urgent |
| `within_budget: false` | BOOST | Over-budget = structural issue |
| `criteria_failed > ` | BOOST | Failed criteria = verification gap |
| `rework_count > ` | BOOST | Rework = initial approach was wrong |

Highest signal entries:Low sentiment + substantive Qanswer + over-budget. These are the gold.

Step : Theme Extraction

For each question category (Q, Q, Q), cluster the answers into themes:

QThemes (Algorithm Improvements) — PRIMARY OUTPUT:- Group similar Qanswers together
- Count frequency: how many reflections mention this theme?
- Identify the underlying structural issue each theme points to
- Example themes: "ISC quality gates too lenient", "Phase budgets not enforced", "Capability selection too conservative"

QThemes (Execution Patterns) — SECONDARY:- Recurring execution mistakes (e.g., "should have read file before editing", "agent overhead for simple tasks")
- These suggest workflow guardrails or pre-flight checks

QThemes (Fundamental Improvements) — ASPIRATIONAL:- Patterns in what a smarter AI would do differently
- These inform longer-term architecture decisions

Step : Synthesize Upgrade Candidates

For each theme with + occurrences(or occurrence if sentiment <= ):

```
UPGRADE CANDIDATE: [Theme Name]
  Frequency: N reflections
  Signal strength: HIGH/MEDIUM/LOW
  Supporting reflections:
    - [timestamp] [task_description] — "[relevant Qquote]"
    - [timestamp] [task_description] — "[relevant Qquote]"
  Root cause: [What structural issue causes this pattern]
  Proposed fix: [Specific change to Algorithm, skill, hook, or system]
  Target file(s): [Which PAI files would change]
  Effort estimate: [Instant/Fast/Standard/Extended]
```

Step : Prioritize and Output

Sort upgrade candidates by:
. Frequency (most recurring first)
. Signal strength (highest first)
. Effort estimate (lowest first — quick wins bubble up)

---

Output Format

```
Internal Reflection Mining Report

Source:~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl
Entries analyzed:N
Date range:[earliest] to [latest]
High-signal entries:N (sentiment <= or over-budget or failed criteria)

Top Upgrade Candidates

. [Theme Name] (N occurrences, HIGH signal)
Root cause:...
Proposed fix:...
Target:...
Effort:...
Evidence:- ...

. [Theme Name] ...

Execution Pattern Warnings (from Q)
- [Recurring mistake] — seen N times
- ...

Aspirational Insights (from Q)
- [Fundamental improvement] — seen N times
- ...
```

---

Integration with Upgrade Workflow

This workflow can run:
. Standalone:User says "mine reflections" or "check reflections"
. As Thread in the main Upgrade workflow:Runs in parallel with external source collection, adding an internal perspective to upgrade recommendations
