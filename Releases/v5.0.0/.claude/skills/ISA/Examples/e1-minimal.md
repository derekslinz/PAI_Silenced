<!-- Fictitious example. "ColorlessCLI" is a teaching project name; any resemblance to real products or organizations is coincidental. -->

---
task: "Add a --no-color flag to a CLI tool"
slug: -_no-color-flag
effort: standard
effort_source: auto
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Goal

Add a `--no-color` flag to the `dump.ts` CLI so output strips ANSI escape codes when the flag is present (or when `NO_COLOR` env is set, per the no-color.org convention).

Criteria

- [ ] ISC-: `dump.ts --no-color | cat | head -` produces output containing zero ANSI escape sequences (probe: `dump.ts --no-color | rg -c $'\xb\['` returns ).
- [ ] ISC-: `NO_COLOR=dump.ts | rg -c $'\xb\['` returns (env-var path also strips).
- [ ] ISC-: Default `dump.ts` (no flag, no env) still emits color codes when stdout is a TTY (probe: `script -q /dev/null dump.ts | rg -c $'\xb\['` returns ≥).
- [ ] ISC-: Anti: `dump.ts --no-color` does not emit any new warning to stderr (probe: `dump.ts --no-color >&>/dev/null | wc -c` returns ).

<!--
Eminimal ISA. Required sections at this tier: Goal + Criteria.
Problem / Vision / Out of Scope / Principles / Constraints / Test Strategy / Features / Decisions / Changelog / Verification all omitted — the task is small enough that the Goal sentence plus four binary probes carries the entire articulation. The Anti-criterion (ISC-) is what keeps a sloppy implementation from passing — adding a "color disabled" log line would technically meet ISC-while breaking the silent-by-default expectation.
-->
