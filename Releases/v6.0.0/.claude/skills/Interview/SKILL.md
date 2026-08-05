---
name: Interview
description: "Conducts a conversational interview to capture and refresh the principal's personal context directly across the remaining identity, projects, and preferences files in PAI/USER/ (ABOUTME, BASICINFO, PRINCIPAL_IDENTITY, WRITINGSTYLE, TECHSTACKPREFERENCES, OPINIONS, CONTACTS, WORK, BUSINESS, and any category files). The assistant leads the conversation itself — one question at a time, natural language answers, formatted into the file's existing structure. Review mode reads the file first then asks targeted questions; Fill mode walks through empty slots one prompt at a time. Timestamped backup before any multi-edit of a file. Stop signals respected immediately. USE WHEN /interview, resume interview, continue interview, start the interview, review my context, fill in context, what's missing in setup, conversational review, phased review, context walkthrough, quarterly context refresh, refresh my profile. NOT FOR single-file edits (use direct Edit), intaking external content (use Migrate), or targeted identity edits."
---

# Interview — phased conversational context review + fill

## MANDATORY: Voice Notification

Before running the workflow, send:

```bash
curl -s -X POST http://localhost:31337/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Starting the interview. Scanning phases first."}' \
  > /dev/null 2>&1 &
```

## What this skill does

Runs a **conversational interview** to capture or refresh the principal's personal context. It works through the context files in `PAI/USER/` — identity, background, projects, preferences, and writing style — one file at a time. The assistant conducts the conversation directly: it reads each file, asks targeted questions one at a time, and writes the answers back into the file's existing structure. No external tooling required.

### The files

The interview covers the context files present in `PAI/USER/` (read the directory to see what exists):

| Scope | Example files |
|---|---|
| **Identity & background** | `PRINCIPAL_IDENTITY.md`, `ABOUTME.md`, `BASICINFO.md`, `PRONUNCIATIONS.md` |
| **Projects & work** | `WORK/`, `BUSINESS/`, `RESUME.md`, `CORECONTENT.md` |
| **Preferences** | `WRITINGSTYLE.md`, `AI_WRITING_PATTERNS.md`, `TECHSTACKPREFERENCES.md`, `OPINIONS.md`, `CONTACTS.md` |

### Review vs. Fill mode

- **Fill mode** (file is sparse or has empty/TBD slots): walk through each missing slot one prompt at a time, write the answer into the file's structure.
- **Review mode** (file is already populated): read the file contents to the principal first, then ask targeted questions — "Anything outdated? Anything missing? Sharpen or refine any of these?"

## Workflow

### Step 1 — Take stock

List `PAI/USER/` and read each candidate file to gauge its current state. Present a brief per-file summary to the principal and ask which area to start with:

> "I looked at your context files. ABOUTME looks complete, PRINCIPAL_IDENTITY has a few open fields, WRITINGSTYLE is sparse. Where would you like to start?"

### Step 2 — Walk the chosen file

For the file under review:

1. Read the file with the Read tool.
2. Determine the mode (sparse → Fill, populated → Review).
3. Run the conversation loop (below).
4. When the principal says "next" or "done with this one," move to the next file.

### Step 3 — Conversation loop (per file)

**Review mode** (populated file):
1. Summarize what's there to the principal in 2-3 sentences. No voice here — text only.
2. Ask targeted review questions ONE AT A TIME:
   - "Is <specific item> still accurate?"
   - "Anything outdated to retire?"
   - "Any recent thinking that belongs here but isn't captured?"
   - "Anything you'd sharpen, reframe, or expand?"
3. The principal answers by voice or text.
4. If the principal wants a change, write it via the Edit tool — precise old_string/new_string, preserve surrounding structure.
5. Voice-confirm only on actual changes:
   ```bash
   curl -s -X POST http://localhost:31337/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Updated <FILE> — captured the refinement."}' \
     > /dev/null 2>&1 &
   ```
6. Ask: "Anything else for <FILE>, or move on?"

**Fill mode** (sparse file):
1. Ask one open field at a time — never a firehose.
2. The principal answers (voice or typed).
3. Write the answer into the correct slot in the file — replacing TBD markers, filling empty sections, appending items.
4. Voice-confirm what got captured.
5. Next prompt. Repeat until done with this file or the principal says "next."

### Step 4 — Phase transitions

After a file completes, ask: "Ready for the next area, or break here?" If the principal says continue, proceed to the next file in the order from Step 1. If the principal says stop, voice a short summary of what changed, say goodbye.

## Rules

- **One question at a time.** Never dump all prompts at once.
- **The principal never types schema.** They speak/type the answer in their own words; the assistant formats it into the file's structure.
- **Always show the principal what got written** before moving on. Brief voice + one line text.
- **Respect stop signals.** "Enough" / "stop" / "later" → save progress (state is already persistent in the files themselves), end gracefully.
- **Don't ask again about filled fields.** If a slot is already complete, move on rather than re-asking.
- **Prose areas stay prose.** For narrative files, don't coerce answers into metrics — write prose that matches the principal's words.
- **Back up before multi-edit.** If about to rewrite ≥50% of a file, save a timestamped backup next to the file (e.g. `FILE-YYYYMMDD-HHMMSS.md`) first.

## Examples

### User: `/interview`

Take stock of the context files, present a summary, and ask the principal where to start.

### User: `/interview --resume`

Take stock again (state is in the files themselves, no separate session to resume), then continue from the least-complete file.

### User: `/interview identity`

Jump straight to the identity files (`PRINCIPAL_IDENTITY.md`, `ABOUTME.md`, `BASICINFO.md`).

### User: "next area" (mid-interview)

Mark the current file done (already saved by the Edit tool), then ask the principal to pick the next area or auto-continue in priority order.

## Related

- `/migrate` — intake content from other sources (not an interview, a one-shot classification)
- `/_PROFILE` — manage PRINCIPAL_IDENTITY directly
