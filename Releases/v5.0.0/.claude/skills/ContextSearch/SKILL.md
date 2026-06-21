---
name: ContextSearch
description: "-phase context search across the PAI session registry, work directories, and ISAs for instant cold-start recovery. Phase (always): parallel scan of work.json session registry, session-names.json, MEMORY/WORK/ directory names, and ISA title grep — returns most recent matches per source, loads top-ISA summaries (first lines only). Phase (only if Phase returns fewer than matches): PAI git history + current project git history. Output: compact context block under lines with session slugs, phases, progress, and ISA paths. Reads MEMORY/STATE/work.json (task, phase, progress, effort) and MEMORY/STATE/session-names.json (sessionId, name); uses fd for directory scan with --max-depth and Grep for ISA title matches in files_with_matches mode. Git history searched via `git log --oneline --all --grep` on both PAI and current project repo. Output: session slugs (newest first), ISA summaries (first lines), commit hashes if Phase ran. Standalone mode: present results then ask what to do. Paired mode: execute request informed by found context. USE WHEN context search, prior work, browse sessions, recall, remember, previous sessions, context recovery, what did we do, find session, search history, what was that project, pick up where we left off, continue work, resume, look up old work, find previous session, cold start, what were we building. NOT FOR searching published content (use _CONTENTSEARCH), the Knowledge Archive (use Knowledge), or people/company investigation (use OSINT)."
argument-hint: [topic]
effort: low
---

ContextSearch

Search prior work for: $ARGUMENTS
Usage Modes

. Standalone— Search, present findings, say: "Context loaded on [topic]. Most recent session: [X]. What would you like to do?"
. Paired with request— Search first, then execute the request informed by context.

---

Phase — Fast Index Scan (ALL IN PARALLEL)

Run all four searches simultaneously in a single response:

A. Session RegistryRead `~/.claude/PAI/MEMORY/STATE/work.json`. Match entries where `task`, slug (object key), or `sessionName` contains "$ARGUMENTS" (case-insensitive). Extract: task, phase, progress, effort. Limit to most recentmatches.

B. Session NamesRead `~/.claude/PAI/MEMORY/STATE/session-names.json`. Match entries where name contains "$ARGUMENTS" (case-insensitive). Extract: sessionId, name. Limit to most recent.

C. Work Directory Names```bash
fd -t d -i "$ARGUMENTS" ~/.claude/PAI/MEMORY/WORK/ --max-depth | tail -```

D. ISA Title GrepUse Grep to search for "$ARGUMENTS" across `~/.claude/PAI/MEMORY/WORK/` with glob `/ISA.md`. Use `files_with_matches` mode. Limit to results.

---

Phase — Conditional Deep Dive

SKIP Phase entirely if Phase returned + matches.Phase is usually sufficient.

Only if Phase returned fewer than total matches, run in parallel:

A. PAI Git History```bash
git -C ~/.claude log --oneline --all --grep="$ARGUMENTS" -i -```

B. Current Project Git History```bash
git log --oneline --all --grep="$ARGUMENTS" -i -```

---

After Search: Load ISA Summaries (NOT full ISAs)

From Phase C/D matches, identify the most recent ISAs(by directory date prefix). Read only the first linesof each (title + summary). Do NOT read full ISAs — the main agent can request a full read if needed.

---

Output Format

Compact single list. Omit sections with no results. Keep total output under lines.
```
 CONTEXT: $ARGUMENTS 

SESSIONS (newest first, max ):
  - [slug] — [task] | [phase] | [progress]

ISA SUMMARIES (max ):
  - [dir name]: [first heading from ISA]
    Path: ~/.claude/PAI/MEMORY/WORK/[dir]/ISA.md

COMMITS (if Phase ran):
  - [hash] [message] ([repo])


```

---

After Results

Standalone:"Context loaded on [topic]. Most recent: [X]. What would you like to do?"

Paired:Proceed with the request. If deeper context is needed, Read the specific ISA path shown above.

Gotchas

- Searches PAI session registry, work directories, and ISAs— not published content (use _CONTENTSEARCH for that).
- Phase (fast scan) may miss relevant sessions.If results seem incomplete, use phase (full search).
- Session descriptions in work.json are AI-generated summaries.They may not capture every topic discussed.

Examples

Example : Find prior work```
User: "what did we do with the Telegram bot?"
→ Phase : fast scan of session registry
→ Finds sessions: telegram-monitor-revival, fix-telegram-channels-plugin-broken
→ Returns session summaries with ISA links
```

Example : Resume previous work```
User: "pick up where we left off on the feed system"
→ Searches work directories and ISAs
→ Finds latest ISA with phase/progress state
→ Provides context for cold-start recovery
```

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"ContextSearch","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
