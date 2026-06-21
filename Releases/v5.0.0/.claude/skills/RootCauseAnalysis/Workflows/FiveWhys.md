FiveWhys Workflow — RootCauseAnalysis

Purpose

Walk a causal chain from symptom to systemic cause by repeatedly asking "Why?" The goal is not five questions — it is reaching an actionable systemic cause, which usually requires -iterations with at least one branch.

Originated with Sakichi Toyoda in the s and embedded in the Toyota Production System by Taiichi Ohno as "the basis of Toyota's scientific approach." Simple, fast, low-overhead. Best first tool for most incidents.

Invocation

- "whys," "five whys," "do a whys"
- Single-thread incident with known-proximate cause
- Quick operational triage when time is short
- As a sub-step inside Fishbone (each category bone gets a Whys)

Canonical Procedure

Step : Write the Problem Statement Precisely

A vague statement produces a vague chain.

```
PROBLEM: [Specific, observable, measurable]
```

Bad: "Reliability is down."
Good: "The payments service returned HTTP for minutes starting --:UTC, affecting ,user checkouts."

Step : Ask "Why Did This Occur?"

Record the direct cause. Keep it concrete and mechanical.

```
WHY : [Direct mechanical cause]
```

Step : Ask "Why Did That Occur?"

Now ask why the previous answer is true. Again, mechanical.

```
WHY : [Cause of WHY ]
WHY : [Cause of WHY ]
WHY : [Cause of WHY ]
...
```

Step : Stop When Actionable AND Systemic

Stop condition, both required:- Actionable— you can define a concrete intervention that addresses this cause
- Systemic— the intervention prevents a classof failure, not just this instance

If you have one without the other, keep going.

- Actionable but not systemic ("patch this specific line"): you stopped too shallow
- Systemic but not actionable ("humans make mistakes"): you went too deep; back up one level

Step : Validate by Reading Forward

Read the chain from bottom to top as "Because X, therefore Y, ..., therefore problem."

If the forward read does not hold together, the chain has a logical jump. Fix it before concluding.

Step : Branch Where the Chain Forks

A single-chain Whys is the most common failure mode. At each "Why?" ask: are there multiplevalid answers?

When yes, record both branches:

```
WHY :
  ├─ Branch A: [Cause A]
  │    WHY A: [...]
  │    WHY A: [...]
  └─ Branch B: [Cause B]
       WHY B: [...]
       WHY B: [...]
```

Converging branchesthat share a common ancestor indicate a high-leverage systemic cause — one fix addresses multiple failure paths.

Step : Optional — Five Hows

After identifying the root cause, apply "How do we prevent this?" five times to the solution:

```
HOW : [First intervention]
HOW : [How do we make HOW robust?]
HOW : [How do we prevent HOW from decaying?]
...
```

Ensures the solution is as rigorous as the diagnosis.

Output Format

```
WHYS ANALYSIS: [problem, words]

PROBLEM: [precise statement]

CHAIN:
- WHY : [cause]
- WHY : [cause of WHY ]
- WHY : [cause of WHY ]
- WHY : [cause of WHY ]
- WHY : [cause of WHY — root]

BRANCHES: [if any]
- At WHY N:
  ├─ Branch A: ...
  └─ Branch B: ...

ROOT CAUSE(S): [systemic, actionable]
- [Cause ]
- [Cause ]  ← if branches converged

CORRECTIVE ACTIONS:
- [Specific action — owner — deadline]
- [Specific action — owner — deadline]

VALIDATION (read forward):
Because [root], therefore [WHY ], therefore [WHY ], ..., therefore [problem].
```

Worked Example — Software Incident

```
PROBLEM: Production API returned HTTP on ,requests during --:-:UTC.

CHAIN:
- WHY : The payments database connection pool was exhausted.
- WHY : Query execution time spiked from ms pto ,ms p.
- WHY : Queries were doing a full table scan on orders table.
- WHY : Missing index on `(customer_id, created_at)` — a frequently-joined column pair.
- WHY : Schema migration that added the new join pattern shipped without creating the index.
- (WHY would be):  Migration PR template did not require EXPLAIN ANALYZE on new query patterns.

ROOT CAUSE: Migration review process has no query-plan analysis step.

CORRECTIVE ACTIONS:
- Add `EXPLAIN ANALYZE` output to migration PR template — owner: platform — deadline: Apr - Backfill missing index now — owner: payments oncall — deadline: today
- Add runtime query-plan monitoring with alerting on new full scans — owner: observability — deadline: Apr 
VALIDATION: Because migrations don't require query plans, the index was missed, which caused full scans, which spiked query time, which exhausted the pool, which returned s.
```

Common Mistakes

- Stopping at blame.If the chain ends at "engineer made a mistake," ask one more why. Systems allow mistakes; root cause is in the system.
- Skipping levels.Jumping from symptom to a distant conclusion ("deploys are bad!") sounds deep but skips mechanism. Each "why" must be the directcause of the one above it.
- Single-chain bias.Most real incidents branch. A perfectly linear Whys is suspicious — it usually means you picked the most obvious branch and ignored others.
- Stopping at "that's just how it is."If the answer doesn't suggest an action, it's not the root cause.
- Hindsight bias.You know the outcome. The engineer didn't. Ask "what would this person have reasonably believed at this moment?" not "why didn't they see it?"
- Generating corrective actions that rely on human vigilance."Train people harder" / "remind everyone" are the weakest actions. Prefer automation, checks, or process changes that make the failure hard to repeat.

When NOT to Use Whys

- Safety-critical systems.Use Fault Tree Analysis; Whys cannot give probability estimates.
- Complex distributed systems with crossing service boundaries.Use Apollo/RealityCharting or Fishbone + Postmortem. Single-thread assumption breaks down.
- Subtle "works here but not there" defects.Use Kepner-Tregoe IS/IS-NOT.
- When you don't have the domain knowledge.The method cannot go deeper than the investigator's knowledge. Get experts in the room, or switch to Fishbone where multiple experts contribute.

Integration

- Nests inside Fishbone— each major category bone gets its own Whys for depth
- Nests inside Postmortem— the "causes" section of a postmortem usually uses Whys internally
- Feeds SystemsThinking/Iceberg— if the chain keeps branching into structural causes, escalate to Iceberg analysis

Attribution

Sakichi Toyoda (s, Toyota Industries). Formalized in Taiichi Ohno's Toyota Production System: Beyond Large-Scale Production(). Teruyuki Minoura's critiques on single-chain bias are canonical limits. "Five Hows" variant from lean manufacturing practice.
