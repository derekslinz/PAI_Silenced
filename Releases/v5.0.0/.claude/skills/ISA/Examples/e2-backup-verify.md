<!-- Fictitious example. "rsync-verify" is a teaching project name; any resemblance to real tools is coincidental. -->

---
task: "Add SHA-verification to a backup CLI's --verify mode"
slug: -_backup-sha-verify
effort: extended
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

The `rsync-verify` CLI copies a source directory to a backup destination and reports completion. It does not currently verify that the destination bytes match the source. Bit rot, partial copies, and silent FS corruption have caused three "successful" backups in the last quarter to land unrestorable. Operators want a `--verify` mode that hashes both sides and surfaces mismatches before the run reports success.

Goal

Add a `--verify` flag that, after the rsync copy step completes, walks both source and destination, computes SHA-per file, compares hashes, and either exits with a pass summary or exits with a per-file mismatch report. The verification step must not double the run-time of a clean backup more than .×.

Criteria

Verification correctness

- [ ] ISC-: `rsync-verify --verify <src> <dst>` exits when every file in `<src>` has a SHA-match in `<dst>` (probe: integration test against a synthetic -file tree).
- [ ] ISC-: `rsync-verify --verify <src> <dst>` exits when ≥file mismatches (probe: integration test that flips byte in `<dst>` then runs verify).
- [ ] ISC-: The mismatch report lists each diverging file path on stderr, one per line, with `MISMATCH: <path>` prefix.
- [ ] ISC-: A file present in `<src>` but absent in `<dst>` is reported as `MISSING: <path>` and contributes to the exit-count.
- [ ] ISC-: A file present in `<dst>` but absent in `<src>` is reported as `EXTRA: <path>` and is a warning, not a failure (exit stays if no MISMATCH/MISSING).
- [ ] ISC-: Hash computation uses a streaming SHA-(probe: code review confirms no `Buffer.from(file)` for files > KB).

Performance

- [ ] ISC-: Verify-mode wall-clock on a GB tree is ≤ .× the no-verify wall-clock (probe: `time` benchmark with GB synthetic tree).
- [ ] ISC-: Hashing parallelism is bounded by `os.cpus().length` workers (probe: instrument worker pool counter, assert ≤ CPU count).
- [ ] ISC-: Memory usage stays under MB for any single-file hash regardless of file size (probe: `ps -o rss` sampled during hash of GB file).

CLI surface

- [ ] ISC-: `rsync-verify --help` lists `--verify` with a one-sentence description.
- [ ] ISC-: `rsync-verify --verify --json <src> <dst>` emits JSON to stdout with shape `{passed: bool, mismatches: [], missing: [], extra: [], elapsed_ms: number}`.
- [ ] ISC-: `rsync-verify --verify-only <src> <dst>` skips the copy step and only verifies (probe: timing comparison shows no rsync invocation).

Error handling

- [ ] ISC-: Permission-denied on a source file emits `ERROR: cannot read <path>` to stderr and exits (distinct from mismatch exit ).
- [ ] ISC-: Interrupting verify with SIGINT prints `verify aborted at file <N>/<total>` and exits .

Anti-criteria

- [ ] ISC-: Anti: out of scope — `rsync-verify --verify --remote ssh://host/path` does not work (this CLI is local-only; the SSH path is rejected with `ERROR: --verify requires local destination`).
- [ ] ISC-: Anti: regression — `rsync-verify` (no flag) does NOT silently start verifying. Verify is opt-in only (probe: timing benchmark of plain run is unchanged from pre-feature baseline).
- [ ] ISC-: Anti: privacy — verify mode never logs file contents to stdout, stderr, or any log file (only paths and hashes).
- [ ] ISC-: Anti: regression — exit code is reserved for "all files match"; any partial pass (e.g., `--verify --best-effort` if such flag exists later) must use a different exit code so existing scripts don't false-positive.

Test Strategy

```yaml
- isc: ISC-  type: integration
  check: clean backup verifies pass
  threshold: exit   tool: ./test/integration/clean-tree.sh && rsync-verify --verify ./tmp/src ./tmp/dst; echo $?

- isc: ISC-  type: integration
  check: corrupted backup fails verify
  threshold: exit   tool: ./test/integration/clean-tree.sh && printf '\x' >> ./tmp/dst/file.bin && rsync-verify --verify ./tmp/src ./tmp/dst; echo $?

- isc: ISC-  type: performance
  check: verify-mode ≤ .× no-verify
  threshold: ratio ≤ .  tool: bash benchmarks/gb-tree.sh

- isc: ISC-  type: memory
  check: peak RSS during GB hash
  threshold: ≤ MB
  tool: bash benchmarks/large-file-rss.sh

- isc: ISC-  type: anti-probe
  check: --remote rejected with clear error
  threshold: stderr contains "ERROR" + exit   tool: rsync-verify --verify ssh://host/path ./dst >&; echo $?

- isc: ISC-  type: privacy
  check: file contents never appear in any log stream
  threshold: occurrences of test fixture content marker
  tool: rsync-verify --verify ./tmp/src ./tmp/dst >&| rg "TEST_FIXTURE_SENTINEL_BYTES" | wc -l
```

<!--
Emedium ISA. Required sections: Problem, Goal, Criteria, Test Strategy.
Vision, Out of Scope, Principles, Constraints, Features, Decisions, Changelog, Verification omitted — the work surface is single-domain (one CLI, one feature) and the tier completeness gate doesn't require them. ISC count of meets the Efloor of . Four anti-criteria (ISC-, , , ) cover scope, regression, privacy, and a future-compat lock — typical Eanti-criteria density.
-->
