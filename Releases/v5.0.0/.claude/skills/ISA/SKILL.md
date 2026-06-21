---
name: ISA
description: "Owns the Ideal State Artifact — the universal primitive that holds the articulated ideal state of any thing (project, task, application, library, infrastructure, work session) as a hard-to-vary explanation. The ISA is a single document that articulates the ideal state, drives the build, verifies the build, and records the evolution of understanding. Five workflows: Scaffold (generate a fresh ISA from a prompt at a specified effort tier), Interview (adaptive question-and-answer to fill in or deepen sections), CheckCompleteness (score an existing ISA against the tier completeness gate and report gaps), Reconcile (deterministic merge of an ephemeral feature-file excerpt back into the master ISA, keyed on stable ISC IDs), Seed (bootstrap a draft project ISA from an existing repository's README, code structure, and recent commits). Examples directory contains canonical-isa.md (the showpiece reference, fully populated across all twelve sections), e-minimal.md (-second task — Goal + Criteria only), e-project.md (mid-size project with eight sections), e-comprehensive.md (full application with all twelve sections plus a populated changelog history). Twelve-section body order is locked: Problem, Vision, Out of Scope, Principles, Constraints, Goal, Criteria, Test Strategy, Features, Decisions, Changelog, Verification. The skill is invoked automatically by the Algorithm at OBSERVE for any non-trivial task and may also be invoked directly by the user to scaffold or audit an ISA outside an Algorithm run. USE WHEN: any prompt mentions ideal state, ISA, ISC, ideal state criteria, ideal state artifact, project specification, hill-climb on a task, articulating done, scaffolding an ISA, interviewing for an ISA, checking ISA completeness, reconciling an ephemeral feature file back to a master ISA, or seeding an ISA from an existing project. NOT FOR creating new skills (use CreateSkill), running the Algorithm itself (the Algorithm invokes this skill), generating non-ISA artifacts (this skill owns the ISA primitive only), or after-the-fact write-ups like postmortems, decision logs, or engineering journals (those are retrospective; the ISA is a commitment-time scaffold for ideal state)."
effort: medium
---

ISA — Ideal State Artifact

The ISA is the single document that articulates "done" for any thing whose ideal state we are pursuing — a project, an application, a library, infrastructure, a work session, an art piece, a strategic decision. It serves five identities simultaneously: ideal state articulation, test harness, build verification, done condition, system of record.

This skill owns the canonical template, the workflows that generate and refine ISAs, and the example library.

---

The Twelve-Section Body (locked v..)

Every ISA may have up to twelve body sections. The tier completeness gate decides which are required at which effort tier; sections never appear empty. Order is fixed.

| | Section | Purpose | Written At |
|---|---------|---------|------------|
| | `Problem` | What is broken or missing right now that makes the ideal state worth pursuing | OBSERVE |
| | `Vision` | What euphoric surprise looks like — experiential intent, –sentences | OBSERVE |
| | `Out of Scope` | Anti-vision — what is notincluded in this ideal state, declared upfront in prose | OBSERVE |
| | `Principles` | Substrate-independent truths (Deutsch reach) the work must respect | OBSERVE |
| | `Constraints` | Immovable architectural mandates that bound the solution space | OBSERVE |
| | `Goal` | The hard-to-vary spine — –sentences naming verifiable done | OBSERVE |
| | `Criteria` | Atomic ISCs (Ideal State Criteria) — one binary tool probe each, including derived `Anti:` ISCs | OBSERVE → EXECUTE |
| | `Test Strategy` | Per-ISC verification approach — `isc | type | check | threshold | tool` | OBSERVE/PLAN |
| | `Features` | Work breakdown — `name | description | satisfies: [ISC-N…] | depends_on: [feature…] | parallelizable: bool` | PLAN |
| | `Decisions` | Timestamped decision log including dead ends; `refined:` prefix for Goal/ISC restructures | any phase |
| | `Changelog` | Conjecture / refuted-by / learned / criterion-now entries — Deutsch error-correction trail | LEARN |
| | `Verification` | Evidence that each ISC passed — quoted command output, file content, screenshot path | VERIFY |

---

Three-Guardrail Taxonomy (Principles vs Constraints vs Anti-criteria)

Adjacent concepts. Distinguished by who they bind.

| Guardrail | Binds | Tone | Example | Lives In |
|-----------|-------|------|---------|----------|
| Principles| The thinking| Aspirational, generalizable | "User-facing systems prioritize responsiveness." | `Principles` |
| Constraints| The solution space| Immovable, non-negotiable | "We do not roll our own cryptography — OAuth via industry-standard libraries only." | `Constraints` |
| Out of Scope| The vision| Declared, explicit, prose | "Mobile native apps are not part of v." | `Out of Scope` |
| Anti-criteria| The test surface| Granular, testable, yes/no | "Anti: /admin returns in vbuild." | `Criteria` (with `Anti:` prefix) |

The first three are author-stated (declarative). Anti-criteria are derived — they are how Out of Scope, Constraints, and Principles become probe-able.

---

Tier Completeness Gate (HARD at all tiers)

Mirrors the v..thinking-floor non-relaxability. Required sections per tier:

| Tier | Required Sections |
|------|-------------------|
| E| Goal, Criteria |
| E| Problem, Goal, Criteria, Test Strategy |
| E| Problem, Vision, Out of Scope, Constraints, Goal, Criteria, Features, Test Strategy |
| E| All twelve sections |
| E| All twelve + active Interview workflow run before BUILD |

Project ISA override:any `<project>/ISA.md` requires E+ structure regardless of the active task's tier. The project file is the long-lived source of truth; one transient Etask must not downgrade it.

`CheckCompleteness` workflow enforces this gate. A miss blocks `phase: complete` until the missing sections are filled in.

---

Workflow Routing

Match the verb in the request to a workflow. When ambiguous, default to Scaffold for new ISAs and CheckCompleteness for audits.

| Verb / Intent | Workflow | File |
|---------------|----------|------|
| "scaffold", "create", "generate", "new ISA from this prompt", "extract feature as ephemeral" | Scaffold| `Workflows/Scaffold.md` |
| "interview me", "fill in the ISA", "deepen", "ask me questions" | Interview| `Workflows/Interview.md` |
| "check", "audit", "score this ISA", "is it complete?" | CheckCompleteness| `Workflows/CheckCompleteness.md` |
| "reconcile", "merge feature file back", "ephemeral → master" | Reconcile| `Workflows/Reconcile.md` |
| "seed", "bootstrap from this repo", "draft an ISA from existing code" | Seed| `Workflows/Seed.md` |
| "append decision", "append changelog", "append verification", "record C/R/L entry" | Append| `Workflows/Append.md` |

When executing a workflow, output this notification directly:
```
Running the WorkflowNameworkflow in the ISAskill to ACTION...
```

---

Gotchas

The highest-information-density part of this skill. Each entry captures a non-obvious failure mode that has bitten real ISA work.

- ID-stability is the cornerstone of Reconcile — never re-number on edit.When the Splitting Test produces a finer-grained version of `ISC-`, preserve `ISC-` as the parent and add `ISC-.`, `ISC-.`, etc. Even when an ISC is dropped, leave a tombstone (`- [ ] ISC-N: [DROPPED — see Decisions YYYY-MM-DD]`). Reconcile keys on stable IDs; renumbering breaks ephemeral feature-file merges silently and the failure mode looks like "the worker's checkmarks didn't land in master."
- Ephemeral files are derived views, never sources of truth.Scaffold's `--ephemeral` mode produces a slice of the master ISA at `MEMORY/WORK/{slug}/_ephemeral/<feature>.md`. Workers operate against that slice; Reconcile merges back. Hand-editing master content from an ephemeral file is policy-forbidden — the master is what persists; the ephemeral is what gets archived.
- The Changelog format is non-negotiable.Every entry needs all four pieces (`conjectured`, `refuted by`, `learned`, `criterion now`) in that order. Append refuses to write a partial C/R/L; if any of the four is missing, the entry is a Decision, not a Changelog. The format is what makes the Deutsch error-correction trail auditable across sessions.
- Project ISAs upgrade tier to `max(declared, E)` regardless of the active task's tier.A `<project>/ISA.md` is the long-lived system of record for a thing with persistent identity. One transient Etask on the project must NOT downgrade the structural minimum. CheckCompleteness applies this override automatically.
- Empty sections never appear.The twelve-section body is a capacity, not a requirementat every tier. Sections required-but-empty for the tier are populated; sections not required and not yet written are simply absent from the file. CheckCompleteness distinguishes `present` / `thin` / `missing` / `empty` and only `empty` is acceptable for `Verification` before VERIFY phase.
- Anti-criteria are derived from Out of Scope plus regression-prevention concerns.They are how the prose-guardrails (Out of Scope, Constraints, Principles) become probe-able. At least one is required at every tier; the absence of an anti-criterion at OBSERVE is a hard CheckCompleteness failure.
- Antecedents are required when the goal is experiential.For art, design, content, and anything that has to "land," at least one ISC must use the `Antecedent:` prefix to name a precondition that reliably produces the target experience. Verifiable goals (build, deploy, schema) don't need antecedents; experiential goals always do.
- Reconcile is deterministic — there are no conflicts to resolve.Either an ISC ID exists in master (mechanical merge) or it doesn't (abort with ID-stability violation). If the ephemeral made structural changes (split ISC-into ISC-./ISC-.), those structural changes belong in master via a separate Edit by the user beforeReconcile runs.
- The format spec wins on contradiction.`IsaFormat.md` is the file-shape contract. If this skill's prose ever drifts from the format spec, the spec is canonical and the skill updates to match — not the reverse.

---

Examples

The `Examples/` directory holds twelve reference ISAs spanning the tier (E–E) × domain (code / art / design / ops / marketplace / enterprise) matrix. Always start by reading the canonical showpiece before scaffolding a new ISA — copy its section headers, then populate. Pick the example closest to your domain + scale as a template.

Showpiece
| File | Purpose |
|------|---------|
| `Examples/canonical-isa.md` | BeanLine— peer-to-peer specialty-coffee marketplace. The showpiece reference, fully populated across all twelve sections with real-feeling Decisions and a four-piece C/R/L Changelog. Read this first. |

Code
| File | Tier | Purpose |
|------|------|---------|
| `Examples/e-minimal.md` | E| Add a `--no-color` flag to a CLI tool. <s task, Goal + ISCs only. Demonstrates the fast-path floor. |
| `Examples/e-backup-verify.md` | E| Add SHA-verification to a backup CLI's `--verify` mode. Single-domain, ISCs. |
| `Examples/e-project.md` | E| Build an arxiv metadata extractor CLI. Mid-size project, ISCs, eight sections. |
| `Examples/e-api-migration.md` | E| Migrate a public API from REST to GraphQL with -month backwards-compat. Cross-cutting, ISCs, all twelve sections. |
| `Examples/e-desktop-app.md` | E| WattWatch— open-source desktop app for personal home-energy monitoring. Single-user app pattern, ISCs, populated Changelog. |

Art (experiential — antecedents required)
| File | Tier | Purpose |
|------|------|---------|
| `Examples/e-essay.md` | E| Write a -word essay on a specific thesis. Experiential goal, antecedent ISCs, post-publish reception probes. |
| `Examples/e-album.md` | E| Mariner Frequencies— produce a -track instrumental album over months. Long-form experiential, multi-act Changelog. |

Design (experiential)
| File | Tier | Purpose |
|------|------|---------|
| `Examples/e-help-redesign.md` | E| Redesign a CLI tool's `--help` output for first-encounter clarity. Antecedents + usability tests. |
| `Examples/e-brand-identity.md` | E| Cardinal— brand identity for a small fintech startup (logo + type + color + voice + first marketing surfaces). ISCs, antecedents. |

Ops
| File | Tier | Purpose |
|------|------|---------|
| `Examples/e-rotate-credential.md` | E| Rotate a production deploy credential in CI. Demonstrates the ISA primitive applied to ops/runbook work. ISCs. |

Enterprise
| File | Tier | Purpose |
|------|------|---------|
| `Examples/e-enterprise.md` | E| Beacon Health Alliance— multi-region HIPAA-compliant patient portal for a -hospital network. Compliance anti-criteria, multi-team parallelizable features, ISCs across all twelve sections. |

---

ID Stability Rule

ISC IDs never re-number on edit.When the Splitting Test produces a finer-grained version of `ISC-`, the original number is preserved as the parent and children become `ISC-.`, `ISC-.`, etc. Do not collapse the numbering even if the ISC is dropped — leave a tombstone marker so historical references in Decisions, Changelog, and Verification remain valid.

This rule exists because `Reconcile` is keyed on ISC IDs. If IDs renumber across edits, ephemeral feature-file reconciliation breaks silently. The renumbering ban is what makes feature-file workflows safe.

---

Ephemeral Feature Files (Ralph Loop / Maestro pattern)

When a feature is to be worked in an isolated context (Ralph Loop, Maestro, parallel coding-agent instances), the Algorithm invokes:

```
Skill("ISA", "extract feature <name> as ephemeral file")
```

`Scaffold` (with `--ephemeral` mode) produces a derived view at `MEMORY/WORK/{slug}/_ephemeral/<feature>.md` containing only the slice relevant to that feature: the Vision and Goal as read-only context, the relevant Constraints, the ISCs in the feature's `satisfies:` list with stable IDs, the matching Test Strategy entries, and an empty Verification section.

A fresh-context agent operates against the ephemeral file alone. At completion, `Reconcile` deterministically merges ISC checkmarks, Verification evidence, Decisions entries, and any new Changelog entries back to master, then archives the ephemeral file under `_ephemeral/.archive/`.

Ephemeral files are derived views. They are never sources of truth. They are never hand-edited as policy. The master ISA is what persists.
---

Relationship to the Algorithm

The Algorithm at OBSERVE invokes this skill to scaffold or read an ISA. The skill does not run the Algorithm — it owns the artifact the Algorithm operates on.

- OBSERVE: `Skill("ISA", "scaffold from prompt at tier T")` → returns populated ISA at canonical location.
- OBSERVE: `Skill("ISA", "check completeness of <path> at tier T")` → pass/fail + gap report.
- PLAN: `Skill("ISA", "extract feature <name> as ephemeral file")` → ephemeral excerpt.
- LEARN: `Skill("ISA", "reconcile <ephemeral-path> → <master-path>")` → deterministic merge.

The Algorithm doctrine spec at `~/.claude/PAI/ALGORITHM/v...md` (or LATEST) governs invocation cadence. This skill is invocation-agnostic — it works the same whether called by the Algorithm or directly by the user.

---

Format spec cross-reference

The full ISA format spec lives at `~/.claude/PAI/DOCUMENTATION/IsaFormat.md`. This skill implements that spec; if there is ever a contradiction, the format spec wins and this skill is updated to match.

The system-architecture doc — five identities, three-guardrail taxonomy, twelve-section body, six workflows, two homes, subsystem relationships — lives at `~/.claude/PAI/DOCUMENTATION/Isa/IsaSystem.md`. Read that for the conceptual frame; read this file (and `IsaFormat.md`) for the operational contract.
