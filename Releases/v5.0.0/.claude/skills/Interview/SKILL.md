---
name: Interview
description: "Runs a phased conversational interview across all PAI context files using InterviewScan.ts, which orders targets by PHASE and assigns conversation mode per file. Phase (foundational TELOS) always runs first regardless of completeness: MISSION, GOALS, PROBLEMS, STRATEGIES, CHALLENGES, NARRATIVES, SPARKS, BELIEFS, WISDOM, MODELS, FRAMES in leverage order. Phase : IDEAL_STATE (HEALTH, MONEY, FREEDOM, RELATIONSHIPS, CREATIVE) in Fill mode. Phase : preferences (BOOKS, AUTHORS, BANDS, MOVIES, RESTAURANTS, FOOD_PREFERENCES, LEARNING, MEETUPS, CIVIC) in mixed mode. Phase : light touch on CURRENT_STATE/SNAPSHOT and PRINCIPAL_IDENTITY. Phase (RHYTHMS) deferred. Review mode (≥%) reads file then asks targeted questions one at a time — still accurate, outdated, missing, sharpen? Fill mode (<%) walks scanner prompts one at a time. The principal answers in natural language; the DA formats into file structure. Confirm on actual changes only. Stop signals respected immediately. Target vs. north-star type confirmed per entry. Timestamped backup to TELOS/Backups/ before multi-edit at ≥% of a file. TelosRenderer.ts regenerates PRINCIPAL_TELOS.md after foundational changes. USE WHEN /interview, resume interview, continue interview, start the interview, review TELOS, fill in context, what's missing in setup, conversational review, phased review, TELOS walkthrough, quarterly context refresh. NOT FOR single-file edits (use Telos Update workflow), intaking external content (use Migrate), identity edits (use _PROFILE)."
---

What this skill does

Runs a phased conversational interviewacross every PAI context file. Phase (foundational TELOS) is the core — the DA always reviews it first, even if files look "complete," because foundational context is never actually done. Only after Phase does the interview move to IDEAL_STATE dimensions, preferences, and identity.

The phases

| Phase | Scope | Mode default |
|---|---|---|
| Phase | Foundational TELOS context — MISSION, GOALS, PROBLEMS, STRATEGIES, CHALLENGES, NARRATIVES, SPARKS, BELIEFS, WISDOM, MODELS, FRAMES | Review (files are typically already populated — surface updates/refinements) |
| Phase | IDEAL_STATE dimensions (minus RHYTHMS) — HEALTH, MONEY, FREEDOM, RELATIONSHIPS, CREATIVE | Fill (typically sparse — walk through prompts) |
| Phase | Preferences — BOOKS, AUTHORS, BANDS, MOVIES, RESTAURANTS, FOOD_PREFERENCES, LEARNING, MEETUPS, CIVIC | Mix — depends on completeness |
| Phase | CURRENT_STATE/SNAPSHOT + PRINCIPAL_IDENTITY | Light touch |
| Phase | Deferred — RHYTHMS (skipped in normal flow) | — |

Review vs. Fill mode

- Fill mode(completeness < %): walk through the scanner's prompts, write answers to the file's structured slots.
- Review mode(completeness ≥ %): read the file contents to the principal first, then ask targeted questions — "Anything outdated? Anything missing? Sharpen or refine any of these?"

The scanner marks each target's mode based on completeness. The DA respects that mode in the conversation.

Workflow

Step — Scan

Run the scanner to see phase breakdown and current state:

```bash
bun ~/.claude/PAI/TOOLS/InterviewScan.ts
```

The scanner orders items phase-first (Phase always before Phase ). Present the per-phase summary to the principal:

> "Your setup is % overall. Phase foundational TELOS is at % — but every file is worth a review pass. Phase IDEAL_STATE is at %. Phase preferences mostly good except FOOD_PREFERENCES at %. Starting with Phase : MISSION. Ready?"

Step — Walk Phase first

Do not skip Phase .Even if every foundational TELOS file scores %, walk through each in priority order. These files are never truly "done" — a quarterly review pass is what keeps them current.

Phase order (by leverage): MISSION → GOALS → PROBLEMS → STRATEGIES → CHALLENGES → NARRATIVES → SPARKS → BELIEFS → WISDOM → MODELS → FRAMES.

For each file:

. Get the per-file detail:
   ```bash
   bun ~/.claude/PAI/TOOLS/InterviewScan.ts --file <NAME>
   ```
. Check the mode:
   - `REVIEW mode` (≥% complete) → read the file contents to the principal first, then ask review questions
   - `FILL mode` (<% complete) → walk through the scanner's prompts
. Run the conversation loop (below)
. When the principal says "next" or "done with this one," move to the next Phase file

Step — Conversation loop (per file)

Review mode(for Phase files at ≥%):
. Read the file with the Read tool.
. Summarize what's there to the principal in -sentences (text).
. Ask targeted review questions ONE AT A TIME:
   - "Is <specific item> still accurate?"
   - "Anything outdated to retire?"
   - "Any recent thinking that belongs here but isn't captured?"
   - "Anything you'd sharpen, reframe, or expand?"
. The principal answers.
. If the principal wants a change, the DA writes it via Edit tool — precise old_string/new_string, preserve surrounding structure.
. Confirm in text only on actual changes: "Updated <FILE> — captured the refinement."
. Ask: "Anything else for <FILE>, or move on?"

Fill mode(for files below %):
. Ask the first scanner prompt — one at a time, never a firehose.
. The principal answers.
. The DA writes the answer into the correct slot in the file — replacing TBD markers, filling empty sections, appending items.
. Confirm what got captured.
. Next prompt. Repeat until done with this file or the principal says "next."

Step — Phase transitions

After Phase completes:
. Tell the principal: "Phase done. Ready for Phase IDEAL_STATE, or break here?"
. If the principal says continue, proceed to Phase top priority (usually HEALTH).
. If the principal says stop, run final scan, give a summary of what changed, say goodbye.

Same pattern Phase → Phase → Phase .

Step — Regenerate PRINCIPAL_TELOS.md

After foundational changes, regenerate the startup summary so future sessions pick up the updates:

```bash
bun ~/.claude/PAI/TOOLS/TelosRenderer.ts >/dev/null || true
```

Rules

- One question at a time.Never dump all prompts at once.
- The principal never types schema.They speak/type the answer in their own words; the DA formats it into the file's structure.
- Always show the principal what got writtenbefore moving on. One brief line of text.
- Respect stop signals."Enough" / "stop" / "later" → save progress (state is already persistent in the files themselves), end gracefully.
- Don't ask again about filled fields.The scanner's completeness score decides what's still gap-worthy.
- Narrative dimensions stay narrative.For CREATIVE/RELATIONSHIPS, don't coerce answers into metrics — write prose that matches the principal's words.
- Target/North-Star classification.After writing a target's entries, ask once: "Is this a concrete achievable target, or a north-star orientation?" Update the `type:` field accordingly. (Default `target`.)
- Back up before multi-edit.If about to rewrite ≥% of a file, save timestamped backup to `TELOS/Backups/FILENAME-YYYYMMDD-HHMMSS.md` first.

Examples

User: `/interview`

The DA runs InterviewScan, presents top gaps, asks the principal to pick.

User: `/interview --resume`

The DA runs scan (same as above — state is in the files themselves, no separate session to resume).

User: `/interview health`

The DA skips the full scan, jumps straight to the IDEAL_STATE/HEALTH interview.

User: "next area" (mid-interview)

The DA marks current section progress via file state (already saved by Edit tool), re-scans, asks the principal to pick next highest-priority or auto-continue.

Related

- `/migrate` — intake content from other sources (not an interview, a one-shot classification)
- `/Telos` — edit a single TELOS file directly with backup
- `/_PROFILE` — manage PRINCIPAL_IDENTITY directly
