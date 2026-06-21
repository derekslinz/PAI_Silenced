---
task: "Build a CLI tool that extracts arxiv paper metadata into JSONL"
slug: -_arxiv-extractor-cli
project: ArxivExtractor
effort: advanced
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

Researching across arxiv papers means reading abstracts in a browser one at a time. There is no quick "give me the title, authors, abstract, categories, and submission date for these paper IDs as JSONL so I can grep them" tool. The arxiv API exists but its XML response shape is annoying enough that nobody uses it casually.

Vision

A single bun TypeScript CLI: `bun arxiv.ts <id> <id> ... > papers.jsonl`. One paper per line, structured fields, no friction. Euphoric surprise: feeding IDs and getting clean JSONL back in under three seconds.

Out of Scope

- No PDF download. Metadata only.
- No citation graph traversal. Single-paper lookup, no following references.
- No web UI. CLI exclusively.
- No persistent cache. Stateless; every run hits the API.

Constraints

- Bun runtime only. No Node dependency.
- Zero npm dependencies — use Bun's built-in `fetch` and a hand-rolled XML parse.
- Must respect arxiv's API rate limits (requests / second per their TOS).

Goal

Ship a single-file `arxiv.ts` CLI that takes paper IDs as arguments, queries the arxiv Atom API, parses the response, and writes one JSONL row per paper to stdout with fields: `id`, `title`, `authors`, `abstract`, `categories`, `submitted`, `updated`.

Criteria

- [x] ISC-: `arxiv.ts` is a single file at the project root.
- [x] ISC-: Zero entries in `package.json` `dependencies` (probe: `jq '.dependencies | length' package.json` returns ).
- [ ] ISC-: `bun arxiv.ts .` returns exactly one JSONL row to stdout.
- [ ] ISC-: The JSONL row has exactly seven fields: `id, title, authors, abstract, categories, submitted, updated`.
- [x] ISC-: `authors` is an array of strings, never a single concatenated string.
- [ ] ISC-: `categories` is an array of strings (e.g., `["cs.AI", "cs.LG"]`).
- [ ] ISC-: A -ID batch completes in ≤ seconds wall clock (rate-limit-aware throttling).
- [x] ISC-: A bad ID (e.g., `.`) writes a JSONL row with `error` field instead of crashing.
- [ ] ISC-: stderr stays empty on a successful -ID run (no logging clutter).
- [ ] ISC-: `bun arxiv.ts --help` prints usage in ≤ lines.
- [ ] ISC-: Anti: out of scope — `arxiv.ts --download` is not a recognized flag (returns help + exits ).
- [x] ISC-: Anti: regression — never makes more than concurrent requests against arxiv API.

Test Strategy

```yaml
- isc: ISC-  type: cli-probe
  check: stdout has exactly one JSONL row
  threshold: line
  tool: bun arxiv.ts .| wc -l

- isc: ISC-  type: performance
  check: wall-clock for IDs
  threshold: ≤ ms
  tool: time bun arxiv.ts $(cat -ids.txt)

- isc: ISC-  type: error-handling
  check: bad ID does not exit non-zero
  threshold: exit + JSONL row with error field
  tool: bun arxiv.ts .| jq -e '.error'

- isc: ISC-  type: anti-probe
  check: max concurrent requests
  threshold: ≤   tool: instrument fetch with counter
```

Features

```yaml
- name: AtomFetch
  description: Bun fetch + queue with -concurrency throttle
  satisfies: [ISC-, ISC-]
  depends_on: []
  parallelizable: false  core IO layer

- name: AtomParse
  description: Hand-rolled XML → typed object
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [AtomFetch]
  parallelizable: false

- name: CLIInterface
  description: Argument parsing, --help, error formatting
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [AtomParse]
  parallelizable: false  single-file CLI
```

Decisions

- --:: Hand-rolled XML parse over a library — Bun has no built-in XML, the response shape is bounded, and adding a dep would violate the zero-deps constraint.
- --:: DEAD END: Tried Promise.all() with -IDs — arxiv rate-limited after request . Reverted to a -concurrency queue. Don't retry.
