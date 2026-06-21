<!-- Fictitious example. "duck" is a teaching placeholder for an existing CLI tool whose --help output we are redesigning. -->

---
task: "Redesign the duck CLI's --help output for first-encounter clarity"
slug: -_duck-help-redesign
project: DuckHelpRedesign
effort: advanced
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

The `duck` CLI's `--help` output is lines, formatted as one block per flag in declaration order, with usage examples buried at line . New users land on it, scan for seconds, hit Ctrl-C, and `man duck` instead. We track help-to-first-command time at seconds (median for new installs) and the dominant time-sink in those seconds is "scrolling through --help and giving up." The reference content is fine; the layout is not.

Vision

A `duck --help` that a first-time user can read top-to-bottom in seconds and walk away knowing: (a) what duck does in one sentence, (b) the two most-common invocations, (c) where to find more — and only after that, the full flag reference. Euphoric surprise: a new user lands on the redesigned help, types one of the example invocations within seconds, and it works. They never visit the man page on their first session.

Out of Scope

- No new flags or behavior.Reference content stays identical; only layout, ordering, and density change.
- No man-page redesign.`man duck` is the deep reference; this work is the front door, not the library.
- No interactive help (`duck help`).Stays a one-shot stdout dump like every other Unix CLI.
- No color support added or removed.Existing color behavior stays; this is content-and-layout work.
- No localization.English only, same as the rest of duck.

Principles

- The first seconds are the entire user experience for % of new users. The output is optimized for them, not for power users (who use `man` or `--help <flag>`).
- A help screen is a teaching surface, not a reference dump. Reference belongs in `man`.
- Whitespace is a feature. Density alone is not friendliness.
- Examples teach faster than prose. The first concrete invocation goes above the first flag definition.
- Progressive disclosure: highest-information-per-pixel content first, full flag table last.

Constraints

- Output stays plain text suitable for piping to `less`, `grep`, etc. — no terminal-control escapes for the layout itself.
- Total length ≤ lines (current: lines).
- Renders correctly at -column width (no wrapped lines that break alignment).
- Must include every flag the current help includes — no flag omissions.
- Build process: `duck --help` reads from a single template file at compile time; the redesign updates that template, not the runtime renderer.
- Backwards-compat: `duck --help | rg <flag-name>` continues to find each flag (so existing scripts that grep --help don't break).

Goal

Ship a redesigned `duck --help` template (≤ lines, -col safe) that opens with a one-sentence project summary, shows the two most-common usages as concrete examples, lists the flag reference grouped by category (not declaration order), and ends with a "see also" footer pointing at man + docs URL — all reference content preserved, all flags still grep-able, first-time-user help-to-first-command time drops from s median to ≤ s median.

Criteria

Length and layout

- [x] ISC-: `duck --help | wc -l` returns ≤ lines (current baseline ).
- [x] ISC-: Every line in `duck --help` is ≤ columns (probe: `awk 'length>' < (duck --help) | wc -l` returns ).
- [ ] ISC-: Output has exactly three top-level sections: Summary+Examples block, Flag Reference, See Also (probe: count of section header rules `═` or `─`).

Top-section content

- [x] ISC-: First non-blank line is a one-sentence description ≤ chars (probe: line length, sentence-end period).
- [ ] ISC-: Examples block contains exactly invocations, each annotated with a one-line "what this does" gloss.
- [ ] ISC-: Each example invocation is a real, currently-supported command (probe: copy-paste each example, run it, assert exit against test fixtures).

Flag reference

- [ ] ISC-: Flags are grouped into ≤ categories with clear headers (e.g., `Common`, `Output Control`, `Filtering`, `Diagnostics`).
- [ ] ISC-: Each flag's entry is exactly lines: `--flag, -f <ARG>` on line (left-aligned, fixed-width), description on line indented spaces.
- [ ] ISC-: Within each category, flags are alphabetized.
- [ ] ISC-: Every flag from the current -line help is present in the new layout (probe: `diff <(rg "^  --" old-help.txt | sort -u) <(rg "^  --" new-help.txt | sort -u)` returns empty).

See-also footer

- [ ] ISC-: Footer contains exactly: man page reference, docs URL, version + build short-sha.
- [ ] ISC-: Footer URL is on a single line and ≤ chars.

Backwards-compat

- [x] ISC-: `duck --help | rg "\-\-each-flag-name"` returns ≥ line for every flag (verified across all flags).
- [x] ISC-: `duck --help` exit code stays (probe: `duck --help; echo $?`).
- [ ] ISC-: Pre-existing `man duck` still references "see `--help` for usage" — and the reference still resolves to a useful Examples block.

Performance

- [ ] ISC-: First-time-user help-to-first-command time drops from s median to ≤ s (probe: new-user usability sessions, time from `duck --help` to first non-help command).
- [ ] ISC-: Help-screen render time stays < ms (template is compiled-in, not parsed at runtime).

Antecedent ISCs (experiential preconditions)

- [ ] ISC-: Antecedent:the one-sentence description (line ) is hard-to-vary — replacing any verb or noun with a synonym makes the description either inaccurate or weaker (probe: paraphrase attempts reviewed, all detectably worse).
- [ ] ISC-: Antecedent:the two examples in the Examples block are the two highest-frequency invocations from the last days of telemetry (probe: cross-reference invocation-frequency log).
- [ ] ISC-: Antecedent:the flag categories are intuitive — given only the four category names, a new user can guess which category contains a randomly-chosen flag with ≥ % accuracy (probe: users, random flags each, ≥ % category-guess accuracy).

Voice and tone

- [ ] ISC-: Each flag description is ≤ chars and reads as imperative (e.g., "Print version and exit", not "This flag prints the version").
- [ ] ISC-: Zero "Note:" preambles (probe: `rg "^    Note:" new-help.txt` returns ).
- [ ] ISC-: Zero "Please" appearances (probe: `rg -wi "please" new-help.txt` returns ).

Anti-criteria

- [ ] ISC-: Anti: out of scope — no new flag was introduced (probe: flag count is unchanged from baseline).
- [ ] ISC-: Anti: regression — `duck --help -h` and `duck -h` and `duck help` all still produce the same output (probe: `diff <(duck --help) <(duck -h) <(duck help)` returns identical).
- [ ] ISC-: Anti: footer drift — version + build sha line is automatically generated, not hand-edited (probe: source template uses `{{VERSION}}` `{{SHA}}` placeholders, build pipeline injects).
- [ ] ISC-: Anti: density creep — no flag description is split across two description lines (probe: every description is exactly line of ≤ chars).

Migration discipline

- [ ] ISC-: A diff between old and new template is captured in `docs/help-redesign-diff.md`.
- [ ] ISC-: A blog post or release note draft (≤ words) explaining the redesign exists at `docs/release-notes/help-redesign.md`.
- [ ] ISC-: The user-test session recordings (anonymized) are saved at `research/user-tests/help-redesign--/`.

Bitter Pill discipline

- [ ] ISC-: No section of the new help is shorter than lines or longer than lines (probe: per-section line count).
- [ ] ISC-: Examples block does NOT include a "useful flag combinations" appendix (probe: human review — the discipline is two examples, not five).

Publishing

- [ ] ISC-: New template is committed to `templates/help.txt` with a commit message linking the redesign decision in Decisions.
- [ ] ISC-: The change ships behind a build flag for one release before becoming default (probe: build flag exists, default-on commit lands one release after introduction).
- [ ] ISC-: Pre-existing CI test `test/help-grep.sh` (which greps for each flag) passes against the new template.

Long-tail observation

- [ ] ISC-: days post-ship, help-to-first-command median time has dropped to the ISC-threshold and stays there (probe: telemetry comparison day-vs day-).

Test Strategy

```yaml
- isc: ISC-  type: line-count
  check: --help line count
  threshold: ≤   tool: duck --help | wc -l

- isc: ISC-  type: integration
  check: each example actually runs
  threshold: exit on all
  tool: bash test/help-examples.sh

- isc: ISC-  type: completeness
  check: every old flag is in new help
  threshold: empty diff
  tool: diff <(rg "^\s--" old-help.txt | sort -u) <(rg "^\s--" new-help.txt | sort -u)

- isc: ISC-  type: usability-test
  check: median help-to-first-command time
  threshold: ≤ s median across users
  tool: user-test sessions, time-stamped recordings

- isc: ISC-  type: antecedent
  check: one-sentence description is hard-to-vary
  threshold: paraphrase attempts all detectably worse
  tool: human review by unfamiliar reviewers

- isc: ISC-  type: antecedent
  check: category names are intuitive
  threshold: ≥ % guess accuracy across users × flags
  tool: structured user test

- isc: ISC-  type: backwards-compat
  check: --help -h and help all match
  threshold: identical output
  tool: diff <(duck --help) <(duck -h) <(duck help)
```

Features

```yaml
- name: TopSection
  description: One-sentence summary + example invocations with annotations
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false  the opener gates everything

- name: FlagReference
  description: Reorder flags into ≤ categories, alphabetize within, -line entries
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [TopSection]
  parallelizable: false

- name: SeeAlsoFooter
  description: Man-page ref + docs URL + version/sha
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [FlagReference]
  parallelizable: true

- name: BackwardsCompat
  description: --help -h and help all produce same output; flag-grep still works
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [FlagReference, SeeAlsoFooter]
  parallelizable: true

- name: UsabilityValidation
  description: user-test sessions for help-to-first-command + category intuition
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [TopSection, FlagReference, SeeAlsoFooter]
  parallelizable: true
```

Decisions

- --:: Three top-level sections — Summary+Examples / Flag Reference / See Also — locked. Resists the "one more category" temptation that ate the last help redesign attempt.
- --:: DEAD END: Tried categories instead of . Users in pilot test split /on which category three flags belonged to. Reverted to categories with clearer names. Don't retry.
- --:: refined: ISC-sharpened from "examples reflect common usage" to "examples are the two highest-frequency invocations from -day telemetry" — the first phrasing let me cherry-pick aspirational examples; the second forced honesty.
- --:: refined: ISC-sharpened from "flags formatted clearly" to "exactly lines per flag, line fixed-width, line indented spaces" — vague aesthetic claims are how help screens drift back to inconsistent layout over time.
- --:: DEAD END: Tried inline color highlighting for flag names. Broke piping to `grep` and `less` for users without color-aware pagers. Reverted to plain text. Don't retry.
- --:: refined: ISC-added a -day post-ship probe (ISC-) — without it, the redesign passes its launch test but could regress in days as new flags are added without category discipline.

<!--
Edesign ISA. Required sections: Problem, Vision, Out of Scope, Constraints, Goal, Criteria, Features, Test Strategy.
Optional Principles included — the design has experiential goals (first seconds, recognition, intuition) and principles do real work in the design pass.
ISC count of exceeds the Efloor of . Three Antecedent ISCs (ISC-, , ) carry the experiential contract: hard-to-vary one-sentence summary, telemetry-grounded examples, and intuitive categories. Anti-criteria (ISC-, , , ) cover scope, regression, drift, and density. The Decisions section shows two DEAD ENDs and three refinements — typical for a redesign where every aesthetic temptation needs to be tested against actual users.
-->
