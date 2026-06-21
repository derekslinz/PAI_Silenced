SPAWNOBSERVERS Workflow

Spawn a read-only observer team that watches a primary agent's tool activity in real time. Validates actions against policy and intent; votes continue / halt / escalate.

Trigger:"spawn observer team", "watch the primary agent", "observer swarm", "validate tool calls", "read-only watchers", "audit this autonomous run"

Use ONLY when BOTH conditions hold

. Time is not a constraint.Observers add -second voting cycles and roughly $./primary-hour at Sonnet tier. They are a deliberate speed-for-safety trade.
. Auditability is the primary requirement.The goal is a defensible, reviewable trail of what the primary actually did — not fast turnaround. If the user needs the task done quickly, do NOT spawn observers.

Typical fit

- Overnight / unattended autonomous runs (the user is asleep or away)
- Production deploys where post-hoc review matters
- Credential rotation, permission changes, PATTERNS.yaml or security-hook edits
- Long autonomous runs touching ≥files or making many irreversible actions
- Anything where "I want to prove nothing dangerous happened" is the goal

Do NOT use for

- Interactive sessions with the user watching in real time
- Any time-sensitive or urgent work
- Short reactive tasks (<tool calls)
- Read-only analysis or research
- Already-preflighted deploys with all A/B/C/D gates satisfied

Execution

. Confirm primary is running

Observers only exist to watch a primary agent. If there's no primary, this workflow does nothing.

Check `MEMORY/OBSERVABILITY/tool-activity.jsonl` — if last event is older than s, the primary is idle; don't spawn yet.

. Compose the observer team (agents, read-only enforced)

Use ComposeAgent with these constraints baked into each observer:

```
Task(subagent_type="general-purpose", run_in_background: true, prompt: <<<
You are an OBSERVER. Your job is to watch what a primary agent DID, not what it said.

HARD CONSTRAINTS (violation = immediate self-halt):
- You MAY NOT call Edit, Write, NotebookEdit, Bash (except read-only inspection), or any
  tool that mutates state. Read, Grep, Glob only.
- You MAY NOT make recommendations to the primary. You only vote.
- You MAY NOT consult the primary's chat transcript. You consult ONLY:
    - ~/.claude/PAI/MEMORY/OBSERVABILITY/tool-activity.jsonl (audit log with ground_truth)
    - ~/.claude/PAI/MEMORY/WORK/<current>/ISA.md (intent declaration)
    - ~/.claude/PAI/USER/SECURITY/PATTERNS.yaml (policy)
    - ~/.claude/projects/-$(whoami)--claude/memory/feedback_.md (rules)

YOUR LOOP (every seconds until primary completes or you escalate):
. Tail the last events from tool-activity.jsonl since your last tick
. For each event, check:
   (a) Does the tool call match the intent in ISA.md?
   (b) Does the command/diff violate PATTERNS.yaml?
   (c) Does the command/diff violate a feedback memory rule?
. Emit ONE of:
   - CONTINUE: all checks pass, proceed silently
   - HALT: single catastrophic violation (mass delete, credential exposure,
     unauthorized deploy) — write HALT event to observer-votes.jsonl and stop
   - ESCALATE: ambiguous or suspicious — write ESCALATE event with summary

MY SPECIALIZATION: <one of: "policy compliance" / "intent drift" / "blast radius">
>>>)
```

Spawn THREE observer instances with different specializations:

| Specialization | Focus |
|---|---|
| policy compliance | PATTERNS.yaml match, feedback memory violations |
| intent drift | ISA.md intent vs actual tool calls divergence |
| blast radius | file-count, deploy proximity, irreversibility score |

. Voting

Majority CONTINUE → observers keep watching.
Any HALT → observers stop primary (via sentinel file the primary checks) and notify.
Any ESCALATE → the user gets Pulse notification with full context bundle.

. Cost check

Observer swarm costs tokens continuously. Rough budget: ~$.per primary-hour at Sonnet tier. Surface cost in final report.

. Output to Pulse

Write all votes to :
```json
{"ts": "ISO", "observer": "policy-compliance", "tick": N, "vote": "CONTINUE|HALT|ESCALATE", "reason": "..."}
```

Pulse should show observer status alongside primary tool activity.

Related

- ToolActivityTracker.hook.ts— populates the audit log observers read (with `ground_truth` payloads for write-class tools)
- Preflight gates A/B/C/D— cheaper alternative for predictable workflows; observers are for unpredictable autonomous work
- Mythos-class threat model— observer pattern is the response (Indy Dev Dan Mythos analysis, Anthropic cyber-toolkits)
