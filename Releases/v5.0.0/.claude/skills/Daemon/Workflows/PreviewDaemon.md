PreviewDaemon Workflow

Purpose:Show what an UpdateDaemon would change without writing or deploying anything.

Trigger Phrases

- "preview daemon"
- "preview daemon update"
- "what would daemon update look like"
- "daemon diff"

Process

Step : Run Aggregator in Preview Mode

```bash
bun ${CLAUDE_SKILL_DIR}/Tools/DaemonAggregator.ts --diff ${PAI_USER_DIR}/Daemon/daemon.md --verbose
```

Step : Show Section-by-Section Summary

Present changes grouped by section:
- Which sections have new content
- Which sections are unchanged
- How many security redactions would be applied
- Source data freshness per section

Step : Highlight Risks

Flag any sections where:
- Content is older than days
- Security filter made redactions (show what was caught)
- PAI source file is missing

Output Format

```
Daemon Preview — what would change:

  [ABOUT]: unchanged
  [MISSION]: goals updated from TELOS
  [FAVORITE_BOOKS]: +new (from TELOS/BOOKS.md)
  [RECENT_IDEAS]: new ideas (title + thesis)
  [CURRENTLY_WORKING_ON]: themes from last days
  [WISDOM]: quotes added

  Security: redactions needed
  Sources: all present and fresh

  To apply: run "update daemon"
```
