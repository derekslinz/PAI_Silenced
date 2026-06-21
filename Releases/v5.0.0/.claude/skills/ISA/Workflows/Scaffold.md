Scaffold Workflow

Generate a fresh ISA from a prompt at a specified effort tier. The output is a populated ISA file at the canonical location with all required sections per tier.

When to invoke

- The Algorithm at OBSERVE: `Skill("ISA", "scaffold from prompt: <user message> at tier <tier>")`
- User directly: `Skill("ISA", "scaffold from prompt: <prompt>")` — defaults tier to Eif unspecified
- Ephemeral feature mode: `Skill("ISA", "extract feature <name> as ephemeral file from <master-isa-path>")`

Inputs

| Input | Required | Description |
|-------|----------|-------------|
| prompt | yes | The user's request — verbatim or distilled |
| tier | yes | E/ E/ E/ E/ E|
| project | no | If task targets a known project from PROJECTS.md, the project ISA path is used; otherwise a task ISA at `MEMORY/WORK/{slug}/ISA.md` |
| ephemeral_feature | no | If set, scaffold a feature-file excerpt instead of a full ISA |

Output

A markdown file at one of:
- `<project-root>/ISA.md` — when `project` is supplied (existing project ISA is read-extended, not overwritten)
- `~/.claude/PAI/MEMORY/WORK/{slug}/ISA.md` — when no project (slug = `YYYYMMDD-HHMMSS_kebab-task-description`)
- `~/.claude/PAI/MEMORY/WORK/{slug}/_ephemeral/<feature>.md` — when `ephemeral_feature` is set

Procedure

Step — Pick the canonical template

Always start by reading `~/.claude/skills/ISA/Examples/canonical-isa.md` for section headers and tone. For Ereference, read `e-minimal.md`. For Ereference, read `e-comprehensive.md`.

Step — Reverse-engineer the prompt

Distill into:
- Explicit wants (what user said they want)
- Explicit not-wants (what user said they don't want — these become Out of Scope)
- Implied not-wants (industry/context inference — these become Out of Scope)
- Constraints implied by the domain (these become Constraints)
- Principles implied by the user's TELOS (responsiveness, information density, operator-first, etc. — these become Principles)

Step — Write frontmatter

```yaml
---
task: "word task description"
slug: YYYYMMDD-HHMMSS_kebab-description
project: <name>            only when targeting a known project
effort: <tier>
effort_source: <auto|explicit|gate-floor>
phase: observe
progress: /<isc-count>
mode: interactive
started: <ISO->
updated: <ISO->
---
```

Step — Write required sections per tier

| Tier | Required Sections |
|------|-------------------|
| E| Goal, Criteria |
| E| Problem, Goal, Criteria, Test Strategy |
| E| Problem, Vision, Out of Scope, Constraints, Goal, Criteria, Features, Test Strategy |
| E| All twelve sections |
| E| All twelve sections + run Interview workflow before BUILD |

Project ISA override:if `<project>/ISA.md` is the target, require E+ sections regardless of the active task's tier.

Step — Apply the Splitting Test to every ISC

Each ISC must satisfy the granularity rule: one binary tool probe per criterion.

| Test | Split when... |
|------|--------------|
| "And"/"With" | Joins two verifiable things |
| Independent failure | Part A can pass while B fails |
| Scope words | "all", "every", "complete" → enumerate |
| Domain boundary | Crosses UI/API/data/logic → one per boundary |
| No nameable probe| You can't say which tool would verify it |

Step — Anti-criteria reminder

Before finishing, ask: what must NOT happen?At least one `Anti:` ISC is required. Anti-criteria typically derive from the Out of Scope section + regression-prevention concerns.

Step — Antecedent (when goal is experiential)

If the goal is experiential — art, design, content, anything that has to "land" — at least one `Antecedent:` ISC is required. The antecedent names a precondition that reliably produces the target experience.

Step — Run CheckCompleteness

Before returning, invoke `Workflows/CheckCompleteness.md` against the new ISA at the requested tier. If any required section is missing, fill it before declaring the scaffold complete.

Step — Return the path

Output the absolute path of the created ISA file. Algorithm OBSERVE consumes this path.

Ephemeral feature mode

When `ephemeral_feature` is set:

. Read the master ISA at `master_isa_path`.
. Locate the feature in `Features` matching `name == ephemeral_feature`.
. Extract:
   - `Vision` and `Goal` from master (read-only context)
   - `Constraints` filtered to those relevant to this feature
   - `Criteria` ISCs whose IDs appear in the feature's `satisfies:` list, with stable IDs preserved
   - `Test Strategy` entries matching those ISCs
   - `Decisions` filtered to entries mentioning this feature's ISC IDs (optional)
   - Empty `Verification` section ready to populate
. Write to `MEMORY/WORK/{slug}/_ephemeral/<feature>.md`.
. Add a header comment: `<!-- EPHEMERAL FEATURE FILE — derived from <master-isa-path>. Reconcile via Skill("ISA", "reconcile <this-path> → <master-path>"). Do not hand-edit master from this file. -->`

Failure modes

- Tier mismatch:caller asks for Esections but request is clearly Ework. Surface the mismatch; let the Algorithm decide the correct tier.
- Missing required section:CheckCompleteness blocks the return until filled.
- ISC count under tier floor:at E+, the ISC count must meet the soft floor (E≥, E≥, E≥, E≥). If under, either keep splitting or document the under-decomposition in `Decisions`.
- ID collision in ephemeral mode:if the feature's ISC IDs don't exist in master, abort and surface the inconsistency — this is a master-ISA error, not a Scaffold error.
