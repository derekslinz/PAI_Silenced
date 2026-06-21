CheckCompleteness Workflow

Score an existing ISA against the tier completeness gate and return a structured pass/fail + gap report. Drives the hard tier gate at all tiers.

When to invoke

- Algorithm at end of OBSERVE: confirm the scaffolded ISA meets tier requirements.
- Algorithm at start of VERIFY: confirm the ISA is still complete after any structural changes.
- User directly: `Skill("ISA", "check completeness of <isa-path> at tier <tier>")`
- Internal call from Scaffold or Interview workflows.

Inputs

| Input | Required | Description |
|-------|----------|-------------|
| isa_path | yes | Path to the ISA to score |
| tier | yes | The completeness bar to score against (E/ E/ E/ E/ E) |
| strict | no | Default true. If false, downgrade hard fails to soft warnings. |

Output

```yaml
status: pass | fail
tier: Erequired_sections:
  Problem: present
  Vision: present
  Out of Scope: missing
  Principles: thin       ≤ sentence
  Constraints: present
  Goal: present
  Criteria: present
  Test Strategy: present
  Features: present
  Decisions: present
  Changelog: missing
  Verification: empty    acceptable until VERIFY phase
gaps:
  - section: Out of Scope
    severity: hard
    reason: required at E, missing entirely
  - section: Principles
    severity: hard
    reason: thin — only one bullet
  - section: Changelog
    severity: hard
    reason: required at E, missing entirely
isc_quality:
  total:   tier_floor:   under_floor: true
  granularity_violations:   anti_criteria_count:   antecedent_present: true
  id_stability_violations: ```

Procedure

Step — Read the ISA

Load `isa_path`. Parse frontmatter and section headers.

Step — Look up tier requirements

| Tier | Required Sections |
|------|-------------------|
| E| Goal, Criteria |
| E| Problem, Goal, Criteria, Test Strategy |
| E| Problem, Vision, Out of Scope, Constraints, Goal, Criteria, Features, Test Strategy |
| E| All twelve sections |
| E| All twelve sections + Interview workflow ran before BUILD |

Project ISA (`<project>/ISA.md`) — bump tier to max(declared-tier, E).

Step — Classify each required section

For each required section:

| Classification | Test |
|----------------|------|
| `present` | Section header exists and body is ≥ sentences (or ≥ bullets) |
| `thin` | Section header exists but body is ≤ sentence (or ≤ bullets) |
| `missing` | Section header doesn't exist |
| `empty` | Section header exists, body is whitespace only — only acceptable for `Verification` before VERIFY phase |

Step — Audit ISC quality

Walk every ISC in `Criteria`:

- Granularity— every ISC names a single binary tool probe (or has one inferable from its phrasing). Compound "and/with" criteria fail.
- Tier floor— at E+, total ISC count meets the floor (E≥, E≥, E≥, E≥). Soft fail if under.
- Anti-criteria— at least one ISC has the `Anti:` prefix.
- Antecedent— when the goal is experiential, at least one ISC has the `Antecedent:` prefix.
- ID stability— every ISC has a unique sequential ID. No collisions, no gaps from renumbering. Tombstones (e.g., `ISC-: [DROPPED — see Decisions --]`) are valid.

Step — Compose the report

Emit the structured YAML output above. Set `status: pass` only when zero hard severity gaps. `strict: false` downgrades hard severity to warnings (used during interview when the user is mid-stream).

Step — Block phase: complete on hard gaps

When invoked from VERIFY-phase doctrine, hard gaps block the `phase: complete` transition. The Algorithm must fill the gaps before declaring done.

Severity table

| Gap | Severity at E| E| E| E| E|
|-----|----------------|----|----|----|----|
| Goal missing | hard | hard | hard | hard | hard |
| Criteria missing | hard | hard | hard | hard | hard |
| Problem missing | — | hard | hard | hard | hard |
| Test Strategy missing | — | hard | hard | hard | hard |
| Vision missing | — | — | hard | hard | hard |
| Out of Scope missing | — | — | hard | hard | hard |
| Constraints missing | — | — | hard | hard | hard |
| Features missing | — | — | hard | hard | hard |
| Principles missing | — | — | — | hard | hard |
| Decisions missing | — | — | — | hard | hard |
| Changelog missing | — | — | — | hard | hard |
| Interview not run pre-BUILD | — | — | — | — | hard |
| Anti-criteria count = | hard | hard | hard | hard | hard |
| Antecedent missing (experiential) | hard | hard | hard | hard | hard |
| ID-stability violation | hard | hard | hard | hard | hard |
| ISC count under tier floor | — | soft | soft | soft | soft |
| Granularity violation | hard | hard | hard | hard | hard |

Failure modes

- Frontmatter missing or malformed:abort with explicit error. The frontmatter is non-negotiable.
- Project ISA scored at task tier:override to max(tier, E). Report the override in the output.
- ISC body parsing fails:treat as zero ISCs and surface the parse error.
