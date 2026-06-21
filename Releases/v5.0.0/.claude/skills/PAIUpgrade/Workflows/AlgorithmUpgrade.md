AlgorithmUpgrade Workflow

Dedicated self-improvement workflow for the PAI Algorithm.Combines internal reflection mining with Algorithm spec analysis to produce concrete, section-targeted upgrade proposals.

Trigger:"algorithm upgrade", "upgrade algorithm", "improve the algorithm", "algorithm improvements", "what should we fix in the algorithm"

---

Overview

This workflow closes the ultimate feedback loop: the Algorithm reflects on its own performance after every run, and this workflow mines those reflections to propose upgrades to the Algorithm itself.

```
Algorithm Reflections (JSONL)     Current Algorithm Spec
┌──────────────────────────┐     ┌──────────────────────────┐
│ Q: Execution mistakes   │     │ Version + Changelog      │
│ Q: Algorithm fixes      │     │ Phase definitions        │
│ Q: Fundamental gaps     │     │ ISC requirements         │
│ Sentiment + budget data  │     │ Capability matrix        │
└──────────────────────────┘     │ Quality gates            │
           │                     │ ISA integration          │
           └──────────┬──────────┘
                      ▼
        ┌─────────────────────────────┐
        │  SECTION-TARGETED UPGRADES  │
        │  (specific diffs proposed)   │
        └─────────────────────────────┘
```

---

Algorithm Section Map

Reflections map to Algorithm sections. This is the routing table for where fixes land:

| Theme Pattern | Algorithm Section | File Location |
|---------------|-------------------|---------------|
| ISC quality, criteria vague, wrong count | ISC Requirements, Quality Gate | `Ideal State Criteria Requirements`, `Ideal State Criteria Quality Gate` |
| Phase timing, budget, over-budget | Effort Level, Phase Budgets | `RESPONSE DEPTH SELECTION`, phase budget tables |
| Capability selection, wrong tools | Capabilities Selection | `CAPABILITIES SELECTION` |
| Agent overhead, wrong parallelization | Agent Instructions | `Agent Instructions` |
| Context recovery, prior work missed | OBSERVE phase | `━━━ OBSERVE ━━━`, `CONTEXT RECOVERY` |
| Verification gaps, claims without proof | VERIFY phase | `━━━ VERIFY ━━━` |
| Plan mode, exploration depth | PLAN phase, Plan Mode | `━━━ PLAN ━━━`, `Plan Mode Integration` |
| ISA issues, sync problems | ISA Integration | `ISA Integration` |
| Phase merging, discrete violations | Phase Discipline | `Discrete Phase Enforcement`, `Phase Discipline Checklist` |
| Notifications | System Notifications | `System Notifications` |
| Loop mode, iteration | Loop Mode, ISA Status | `Multi-Iteration`, ISA status progression |
| Silent stalls, hanging | No Silent Stalls | `No Silent Stalls` |

---

Execution

Step : Read & Deeply Understand Current Algorithm

The algorithm changes frequently. Every upgrade analysis MUST start by reading and internalizing the current version — not from memory, not from assumptions.

```
. Read PAI/ALGORITHM/LATEST to get current version string (e.g., "v..")
. Read PAI/ALGORITHM/v{VERSION}.md — the FULL spec, every line
. Produce a structured digest:

   ALGORITHM DIGEST: v{VERSION}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Phases: [list each phase with its key mandate]
   Quality Gates: [list each gate with its pass/fail criteria]
   ISC Rules: [summarize ISC construction and verification rules]
   Effort Levels: [list levels and their budget constraints]
   Capability System: [how capabilities are selected]
   Agent Rules: [when/how subagents are spawned]
   ISA Integration: [how ISAs are created and tracked]
   Notification: [notification rules]
   Loop Mode: [multi-iteration rules]
   Key Guardrails: [rules that constrain behavior — phase discipline, no silent stalls, etc.]

   DESIGN DECISIONS (important for upgrade analysis):
   - [List -deliberate design choices visible in the spec,
      e.g., "OBSERVE must complete before PLAN", "ISC requires anti-criteria",
      "Extended effort gets agent parallelization"]

This digest is the baseline. Every upgrade proposal must be compared against it
to avoid proposing changes that contradict existing design intent.
```

Step : Gather All Learning Signals

The learning system captures signals across multiple sources. Read ALL of them — not just reflections.

a: Algorithm Reflections (primary)

```
Read ~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl
Parse each line as JSON. This is the richest source — Q/Q/Qself-reflection after each Algorithm run.
```

b: Rating Signals

```
Read ~/.claude/PAI/MEMORY/LEARNING/SIGNALS/ratings.jsonl
Focus on entries with rating <= . Extract the response_preview and sentiment_summary
to understand WHAT went wrong from the user's perspective (not just the algorithm's self-assessment).
```

c: Algorithm-Specific Learnings

```
Read all files in ~/.claude/PAI/MEMORY/LEARNING/ALGORITHM/ (latest month first, then previous month)
These are detailed learning captures from low-sentiment sessions — they contain root cause analysis
that reflections alone may miss.
```

d: Failure Patterns

```
Read ~/.claude/PAI/MEMORY/LEARNING/FAILURES/ (latest month, plus ROOT_CAUSE_ANALYSIS.md)
These capture recurring failure patterns. Cross-reference against the Algorithm digest from Step to identify which Algorithm rules SHOULD have prevented these failures but didn't.
```

Step : Classify All Signals Against Current Algorithm

Using the Algorithm digest from Step and ALL learning data from Step , spawn agent:

```
Use Agent tool with subagent_type=general-purpose:

"Analyze all learning signals against the current Algorithm spec.

You have four data sources to analyze:

SOURCE : algorithm-reflections.jsonl (Step a)
Read ~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl
Parse each line as JSON.
For EACH entry, analyze Q(algorithm improvements).

SOURCE : Low-rated sessions from ratings.jsonl (Step b)
Read ~/.claude/PAI/MEMORY/LEARNING/SIGNALS/ratings.jsonl
Filter to rating <= . For each, extract what went wrong.

SOURCE : Algorithm learning files (Step c)
Read files in ~/.claude/PAI/MEMORY/LEARNING/ALGORITHM/ (-/ then -/)

SOURCE : Failure patterns (Step d)
Read ~/.claude/PAI/MEMORY/LEARNING/FAILURES/ latest month + ROOT_CAUSE_ANALYSIS.md

For EACH signal across ALL sources, classify the theme using this routing table:

SECTION ROUTING:
- ISC quality/criteria issues → 'ISC'
- Phase timing/budget issues → 'EFFORT_LEVELS'
- Capability selection issues → 'CAPABILITIES'
- Agent/parallelization issues → 'AGENTS'
- Context recovery issues → 'OBSERVE'
- Verification gaps → 'VERIFY'
- Plan mode issues → 'PLAN'
- ISA/sync issues → 'ISA'
- Phase discipline issues → 'PHASE_DISCIPLINE'
- Notification issues → 'NOTIFICATIONS'
- Loop/iteration issues → 'LOOP'
- Silent stall issues → 'NO_STALLS'
- Other → 'OTHER'

Weight by signal:
- implied_sentiment <= → HIGH signal
- within_budget: false → BOOST
- criteria_failed > → BOOST

Return format:
{
  'entries_analyzed': N,
  'date_range': '[earliest] to [latest]',
  'section_hits': {
    'ISC': { 'count': N, 'quotes': ['...'], 'signal': 'HIGH/MED/LOW' },
    'CAPABILITIES': { 'count': N, 'quotes': ['...'], 'signal': '...' },
    ...
  },
  'top_themes': [
    {
      'section': 'ISC',
      'theme': '[specific issue]',
      'frequency': N,
      'signal': 'HIGH',
      'root_cause': '[why this keeps happening]',
      'quotes': ['[Qexcerpts with timestamps]']
    }
  ],
  'q_insights': ['[fundamental improvement ideas from Q]']
}

If file doesn't exist or is empty, return { 'entries_analyzed': }

EFFORT LEVEL: Return within seconds."
```

Step .: Claude Code Freshness Validation

Before proposing Algorithm changes, verify that the Algorithm's Claude Code references (Platform Capabilities table, agent types, hook events, slash commands) are current:

```
Use Agent tool with subagent_type=claude-code-guide:

"The PAI Algorithm has a Platform Capabilities table referencing Claude Code features.
Read the current Algorithm spec at ~/.claude/PAI/ALGORITHM/v{VERSION}.md (get version from ~/.claude/PAI/ALGORITHM/LATEST).

Verify that:
. All subagent_type values in the table are valid current types
. All slash commands referenced (e.g., /simplify, /batch, /debug) still exist
. Hook event types referenced match the current Claude Code hook API
. Any Claude Code features mentioned are current (not deprecated or renamed)
. Any MISSING Claude Code features that should be in the Algorithm's awareness

Return:
{
  'stale_references': [{'reference': '...', 'current_state': '...', 'fix': '...'}],
  'missing_features': [{'feature': '...', 'why_relevant': '...', 'proposed_entry': '...'}],
  'confirmed_current': ['list of references that are still accurate']
}

EFFORT LEVEL: Return within seconds."
```

Include any stale references or missing features as additional upgrade proposals in Step , tagged with source `claude-code-guide` and priority based on staleness impact.

Step : Cross-Reference Signals Against Current Algorithm Spec

For each theme from Step , using the Algorithm digest from Step :

. Locate the sectionin the current Algorithm spec (v{VERSION}.md) using the routing table
. Read the current textof that section — quote it exactly
. Compare against the digest's Design Decisions— is this a known design choice being violated, or a genuine gap?
. Identify the gap— what does the spec say vs. what actually goes wrong? Is the rule missing, too weak, ambiguous, or just not enforced?
. Draft the fix— specific text changes to the Algorithm spec, with before/after

IMPORTANT: Do not propose changes that contradict existing design decisions
unless the learning data shows those decisions are fundamentally wrong.
A rule that exists but isn't followed needs enforcement, not removal.

Step : Generate Upgrade Proposals

For each theme with + occurrences across ALL sources (or if HIGH signal):

```
ALGORITHM UPGRADE PROPOSAL {N}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section: [Algorithm section name]
Priority: [CRITICAL / HIGH / MEDIUM / LOW]
Signal: [N reflections, {HIGH/MED/LOW} average signal]

Problem: [What keeps going wrong, in -sentences]

Current spec says:
> [Quote the relevant current Algorithm text]

Proposed change:
> [New text that would fix the issue]

Why this helps:
[-sentences explaining how this change prevents the recurring issue]

Evidence:
- [{timestamp}] {task} — "{Qquote}"
- [{timestamp}] {task} — "{Qquote}"
```

Step : Version Bump Assessment

Based on upgrade proposals:

| Change Type | Version Bump | Threshold |
|-------------|-------------|-----------|
| New phase rules, new sections | Minor (.X.) | + CRITICAL proposals |
| Clarifications, guardrails, wording | Patch (.X.Y) | Any proposals |
| No actionable proposals | None | Reflections too few or all positive |

---

Output Format

```markdown
Algorithm Self-Upgrade Report

Current Version:v{VERSION}
Reflections Analyzed:{N} entries spanning {date range}
High-Signal Entries:{N}
Upgrade Proposals:{N} ({N} critical, {N} high, {N} medium, {N} low)
Recommended Version Bump:v{NEW_VERSION} ({patch/minor/none})

---

Section Heat Map

Which Algorithm sections have the most recurring issues:

| Section | Hits | Signal | Top Theme |
|---------|------|--------|-----------|
| [Section] | [N] | [HIGH/MED/LOW] | [Theme] |

---

Upgrade Proposals

[Proposals from Step , sorted by priority then frequency]

---

Aspirational Insights (from Q)

Ideas that require fundamental changes, not just spec edits:
- [Qpattern with frequency]

---

Next Steps

- [ ] Review proposals
- [ ] Apply approved changes to Algorithm spec
- [ ] Bump version if warranted
- [ ] `PAI_ARCHITECTURE_SUMMARY.md` auto-regenerates via DocIntegrity on Stop; no manual rebuild
```

---

Integration Notes

- Standalone:User says "algorithm upgrade" or "improve the algorithm"
- From MineReflections:If MineReflections finds Algorithm-related themes, it can suggest running this workflow for deeper analysis
- From Upgrade:The main Upgrade workflow's Thread provides a summary; this workflow goes deeper with section-level mapping
