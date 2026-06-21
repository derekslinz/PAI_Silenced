UpdateDaemon Workflow

Purpose:Aggregate PAI system data, apply security filter, preview for approval, then deploy to daemon.example.com and MCP API.

Trigger Phrases

- "update daemon"
- "refresh daemon"
- "update my daemon"
- "sync and update daemon"

Process

Step : Run Aggregator

```bash
bun ${CLAUDE_SKILL_DIR}/Tools/DaemonAggregator.ts --preview --verbose
```

This reads from:
- TELOS (missions, goals, books, movies, wisdom)
- Knowledge archive (recent Ideas — title + thesis only)
- PROJECTS.md (public projects only)
- Recent work sessions (abstracted to topic themes)
- Existing daemon.md (preserves manually curated sections)

The SecurityFilter runs automatically and reports any redactions.

Step : Show Diff Against Current

```bash
bun ${CLAUDE_SKILL_DIR}/Tools/DaemonAggregator.ts --diff ${PAI_USER_DIR}/Daemon/daemon.md
```

Present the diff to the user showing:
- New content added
- Content removed
- Sections updated
- Any security redactions applied

Keep the review to one screen max. Summarize changes by section, don't dump raw content.

Step : Get Approval

Ask the user to confirm the update. Show:
- Section-by-section summary of what changed
- Number of security redactions applied
- Any warnings (stale sections, missing sources)

Do not proceed without explicit approval.
Step : Write Updated daemon.md

```bash
bun ${CLAUDE_SKILL_DIR}/Tools/DaemonAggregator.ts --output ${PAI_USER_DIR}/Daemon/daemon.md
```

Step : Sync to Public Repo

Copy the filtered daemon.md to the public website repo:

```bash
cp ${PAI_USER_DIR}/Daemon/daemon.md ~/Projects/daemon/public/daemon.md
```

Step : Deploy

Run the existing deploy pipeline:

```bash
cd ~/Projects/daemon && git add -A && git commit -m "Update daemon data $(date +%Y-%m-%d)" && git push
```

Then sync to MCP KV:

```bash
cd ${CLAUDE_SKILL_DIR}/Mcp && bun install && bun update-daemon
```

Step : Verify

Confirm both endpoints are live:
- Website: `curl -s -o /dev/null -w "%{http_code}" https://daemon.example.com`
- MCP API: `curl -s https://mcp.daemon.example.com -H "Content-Type: application/json" -d '{"jsonrpc":".","method":"tools/call","params":{"name":"get_about","arguments":{}},"id":}' | head -c `

Example Response

```
Running the UpdateDaemonworkflow in the Daemonskill to aggregate and deploy...

Aggregated PAI data:
  Books: | Movies: | Ideas: | Work themes: | Wisdom: 
Security filter: clean (no redactions needed)

Changes vs current daemon:
  + Added new recent ideas
  + Updated work themes (new, removed)
  ~ Books list merged (new from TELOS)
  = Mission, location, predictions unchanged

Approve this update? [Waiting for the user]

[After approval]
  Wrote daemon.md (,bytes)
  Deployed to Cloudflare Pages
  Synced to MCP KV
  Website: OK
  MCP API: responding
```
