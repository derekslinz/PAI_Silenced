Upgrade Workflow

Primary workflow for PAIUpgrade skill.Generates prioritized upgrade recommendations by running four parallel agent threads: prior-work audit, user context analysis, source collection, and internal reflection mining.

Trigger:"check for upgrades", "upgrade", "any updates", "check Anthropic", "check YouTube", "pai upgrade"

---

Overview

Four parallel threads, then synthesize:

. Thread (MANDATORY):Prior-Work Audit — inventory current Algorithm, PATTERNS.yaml, hooks, skills, recent ISAs, KNOWLEDGE, feedback memory.
. Thread :User context (TELOS, projects, recent work, PAI state).
. Thread :External sources (Anthropic, YouTube, custom, GitHub trending).
. Thread :Internal reflections (algorithm-reflections.jsonl).
. Synthesize:filter discoveries against Thread inventory; assign Prior Status; emit deltas only.
. Output:prioritized upgrade report — every recommendation row carries Prior Status with file:line evidence.

Thread output gates synthesis. No recommendation may be emitted without a Prior Status tag citing evidence from Thread .

---

Execution

Step : Launch Thread — Prior-Work Audit (MANDATORY)

Spawn parallel agents (`subagent_type=Explore`) to inventory current PAI state. Each returns an inventory with file:line evidence.

Agent a — Algorithm & CapabilitiesRead: `~/.claude/PAI/ALGORITHM/LATEST` + the file it points to, `~/.claude/PAI/ALGORITHM/capabilities.md`, `mode-detection.md`, `~/.claude/PAI/DOCUMENTATION/Algorithm/AlgorithmSystem.md`.
Extract: phase definitions and gates, verification doctrine (advisor rules, live-probe, conflict resolution), preflight gates, capabilities table, mode-detection triggers, browser-first / env-probe / feedback-memory-lookup / parallelization rules.
Return: state inventory with file:line evidence, ≤words.

Agent b — Security Patterns & InspectorsRead: `~/.claude/PAI/USER/SECURITY/PATTERNS.yaml`, `~/.claude/hooks/SecurityPipeline.hook.ts`, `~/.claude/hooks/security/pipeline.ts`, `~/.claude/hooks/security/inspectors/.ts`.
Extract: every pattern category (name + regex summary + action), inspector coverage (Pattern, Egress, Rules, Prompt, Injection), Bash bypass coverage (backslash-escaped flags, /dev/tcp/, /dev/udp/, env-var-prefixed commands, /proc/, git filter-branch, ptrace), deny/ask/allow precedence.
Return: inventory with file:line evidence; flag what's present AND what's missing.

Agent c — Hooks & SettingsRead: `~/.claude/settings.json` (hooks, env, permissions, pai sections); list `~/.claude/hooks/.hook.ts`.
Extract: hook inventory by event (SessionStart, PreToolUse, PostToolUse, Stop, PreCompact, etc.), orphaned hooks (on disk but unwired), empty event arrays, notable env/permission/pai values.
Return: inventory with file:line evidence; flag wiring gaps.

Agent d — Recent Decisions & Feedback MemoryScan: top most-recent `~/.claude/PAI/MEMORY/WORK/` dirs (skim ISAs), `MEMORY/KNOWLEDGE/`, `MEMORY/LEARNING/`, `~/.claude/projects/-$(whoami)--claude/memory/feedback_.md`, `project_.md`.
Extract: recent decisions affecting upgrades (rejected/deferred/completed), relevant feedback entries, KNOWLEDGE entries that explicitly evaluated proposals.
Return: inventory with paths; flag anything that would DENY a future recommendation.

Agent e — Skill SurfaceScan: `~/.claude/skills//SKILL.md` (description fields), `~/.claude/skills/_PAI/TOOLS/.ts`, `~/.claude/skills/CreateSkill/Tools/.ts` (validators).
Extract: skill counts/categories, existence of Monitor/Advisor/PreCompact wrappers, CreateSkill description-length cap, ToolActivityTracker capture scope (diffs? stdout? git state?).
Return: inventory with file:line evidence.

Output of Thread :combined STATE INVENTORY with canonical file:line evidence per capability. Synthesis uses this to assign Prior Status.

Step : Launch Thread — User Context

Spawn parallel agents (`subagent_type=general-purpose`):

Agent — TELOS:read `~/.claude/PAI/USER/TELOS/.md`. Extract current high-priority goals, active focus areas, key challenges, project themes.

Agent — Recent Work:read `~/.claude/PAI/MEMORY/STATE/work.json` and recent `MEMORY/WORK/` dirs (last days). Extract active projects, recurring patterns, open tasks, recent accomplishments.

Agent — PAI State:list `~/.claude/skills/`, `~/.claude/hooks/`, read `~/.claude/settings.json`. Extract installed skills, active hooks, configuration highlights, obvious gaps or opportunities.

Agent — Tech Stack:from PROJECTS.md and recent work, identify primary languages, frameworks, deployment targets, key integrations.

Step : Launch Thread — Source Collection

Spawn parallel agents (`subagent_type=general-purpose`):

Agent — Anthropic SourcesRun: `bun ${CLAUDE_SKILL_DIR}/Tools/Anthropic.ts`.
For each finding (release notes, GitHub commits, doc updates), extract specific techniques: exact syntax/API/configuration, quoted documentation showing usage, which PAI component this improves, before/after code where applicable. Skip findings with no concrete technique. Do NOT return vague "new release available" entries.

Agent — YouTube Channels. Load channel config: `bun ~/.claude/PAI/TOOLS/LoadSkillConfig.ts ../youtube-channels.json`.
. For each channel: `yt-dlp --flat-playlist --dump-json 'https://www.youtube.com/@channelhandle/videos' >/dev/null | head -`.
. Compare against `../State/youtube-videos.json`.
. For new videos: `bun ~/.claude/PAI/TOOLS/GetTranscript.ts '<video-url>'`.
. From each transcript, extract specific techniques: code patterns, configurations, command examples, with timestamps and exact quotes. Skip videos with no extractable techniques.

Agent — Custom SourcesCheck `~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/PAIUpgrade/` for additional source definitions beyond YouTube and GitHub trending. If sources exist, check them for updates. Return findings, or empty list with note "No custom sources configured".

Agent — GitHub Trending. Load `github_trending` config from `~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/PAIUpgrade/user-sources.json`. If `enabled: false` or missing, return `{ github_trending: false, note: "disabled or not configured" }`.
. `LOOKBACK_DATE = today - lookback_days` (default ).
. For each `query` in `github_trending.queries`:
   ```bash
   gh api 'search/repositories?q=QUERY+created:>LOOKBACK_DATE+stars:>MIN_STARS&sort=SORT&order=desc&per_page=RESULTS' \
     --jq '.items[] | {name, stars, description, url, topics, created, language}'
   ```
. Dedup against `../State/github-trending.json`.
. For each NEW repo, read README (`gh api 'repos/OWNER/REPO/readme' --jq '.content' | base-d | head -`). Assess PAI relevance. Extract specific techniques/architectures/patterns. Skip forks, low-quality, irrelevant.
. Save updated seen-list to `../State/github-trending.json`.
. Focus on INSPIRATION (architectural decisions, novel approaches), not just repo names.

Return within s; reduce per_page to if slow.

Step a: Claude Code Freshness Check (parallel with Thread )

Spawn `Agent(subagent_type="claude-code-guide", run_in_background: true)`:

Verify PAI's Claude Code references against the latest API surface. Check: hook event types, slash commands, agent/subagent types, settings.json fields, MCP integration, Agent SDK, Claude API. For each area, return current features, recent additions, deprecated items, and PAI staleness risk (LOW/MEDIUM/HIGH). Focus on changes affecting hooks, skills, or Algorithm. Return within s.

Output feeds Step (Filter and Score) as source type `Claude Code Guide` and is cross-referenced against current PAI files for staleness.

Step b: Launch Thread — Internal Reflection Mining

Spawn parallel agent (`subagent_type=general-purpose`):

Read `~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl`. Full methodology: `Workflows/MineReflections.md`. Quick summary:
. Parse each line as JSON.
. Prioritize entries with `implied_sentiment <= `, `within_budget: false`, or `criteria_failed > `.
. Cluster Qanswers (algorithm improvements) by similarity.
. Cluster Qanswers (execution patterns).
. Themes with + occurrences (or if sentiment ≤ ) become upgrade candidates.

Return: entries analyzed (N), date range, list of upgrade candidates (theme, frequency, signal HIGH/MEDIUM/LOW, root cause, proposed fix, target files, supporting Qquotes), execution warnings (recurring Qmistakes), aspirational insights (Qpatterns).

If file is missing or empty: `{ entries_analyzed: , note: "No reflections found yet — they accumulate after Standard+ Algorithm runs" }`. Return within s.

Step : Wait and Collect

Wait for all agents (prior-work + context + source + reflection). Thread 's STATE INVENTORY is the canonical reference document for synthesis.

Step : Synthesize User Context

Merge Thread results into a unified context object covering: TELOS goals/focus/challenges, recent_work projects/patterns/open_tasks, pai_state skills/hooks/config, tech_stack languages/frameworks/deployment.

Step : Filter, Score, Assign Prior Status

For each discovery from Thread (and candidate from Thread ):

. Prior State match (FIRST GATE)— search Thread inventory for the proposed concept/file/pattern/capability:
- Found with same semantics → DONE→ Skipped Content with evidence.
- Subset present → PARTIAL→ scope to missing delta only.
- Deferred idea in ISA/KNOWLEDGE → DISCUSSED→ only re-surface if reason changed; cite the change.
- Explicit rejection → REJECTED→ skip unless context warrants revisit; name what changed.
- Not found → NEW.

. Relevance check— does this relate to user's tech stack / goals / projects?
. Score relevance(-), impact(-), effort(-, =easy).
. Priority= (relevance × ) + impact + effort.

Filter out relevance < . Filter out DONE (move to Skipped with file:line evidence).

Mandatory before emitting:every recommendation row has a Prior Status tag AND file:line evidence from Thread .

Step : Generate Prioritized Recommendations

Sort by priority and tier:

- CRITICAL— score > , relevance > .
- HIGH— score -, relevance > .
- MEDIUM— score -, relevance > .
- LOW— score < , or relevance -.

Each recommendation: short action name, PAI Relevance (primary framing — WHY it matters), effort (Low/Med/High), files affected.

Step : Output Report

Canonical output format:`../References/OutputFormat.md`. Reference example: `../References/ExampleReport.md`.

Section order: Discoveries → Recommendations → Technique Details → Internal Reflections → Summary → Skipped → Sources Processed.

Print only non-empty Recommendation tiers.Empty tier headers are noise.

Critical output rules:. Discoveries first, recommendations second, details third.
. Discoveries ≠ Recommendations — different orderings (interestingness vs priority).
. PAI Relevance is primary in both tables.
. Every Recommendation has a Prior Status tag with file:line evidence.
. Quote the source (actual content or code).
. Map every technique to a specific PAI file or component.
. Numbered cross-references consistent across Discoveries → Recommendations → Technique Details.
. No watch/read recommendations — extract, don't point.
. Skip boldly — content with no technique → Skipped.
. Two mandatory description fields, ≤sentences each: What It Isand How It Helps PAI.

Step : Registry Update — Feed Discoveries into Algorithm

For each CRITICAL/HIGH recommendation, evaluate against the gate:

. Invokable— concrete way to use it (tool call, slash command, behavioral pattern).
. Useful for Algorithm— would change capability selection.
. Stable— not experimental/alpha (or labeled as such).
. Distinct— not duplicating an existing capability.
. Compact— describable in one ~-word table row.

| Discovery Type | Integration Target | Action |
|----------------|--------------------|--------|
| New Claude Code command/skill | Algorithm Platform Capabilities table | Propose new row |
| Enhancement to existing PAI skill | Relevant SKILL.md description | Propose updated description with workflow guidance |
| Useful behavioral pattern | Algorithm Platform Capabilities (Techniques section) | Propose new technique row |
| Major new capability | New PAI skill | Propose scaffold via CreateSkill |

Output:
```markdown
Registry Update Proposals

| Discovery | Gate Pass? | Integration Target | Proposed Change |
|-----------|-----------|--------------------|-----------------|
| [name] | All | Algorithm table / SKILL.md | [specific text to add] |
```

If none pass: "No registry updates needed this cycle."

Step : Update State

- `State/last-check.json` — updated by Anthropic.ts.
- `State/youtube-videos.json` — add newly processed video IDs.
- `State/github-trending.json` — add newly seen repo full_names.

Step : Memory Redistribution & Cleanup

Scan `~/.claude/projects/-$(whoami)--claude/memory/MEMORY.md` and each referenced memory file. Triage:

| Condition | Action |
|-----------|--------|
| Redundant with system prompt or CLAUDE.md operational notes | Delete file, remove from MEMORY.md |
| Behavioral rule not yet in system prompt | Migrate to PAI_SYSTEM_PROMPT.md (constitutional) or CLAUDE.md (operational), then delete |
| Stale/resolved (problem fixed, project completed, info outdated) | Delete file, remove from MEMORY.md |
| Wrong paths or outdated references | Verify against filesystem; fix or delete |
| Valid project/user/reference, still current | Keep — update if needed |

Version pointer check:- `settings.json pai.algorithmVersion` matches `Algorithm/LATEST`.
- `CLAUDE.md` Algorithm path matches `Algorithm/LATEST`.
- `SYSTEM-README.md` latest version reference matches `Algorithm/LATEST`.

Output:
```
MEMORY MAINTENANCE:
 Scanned: [N] memory files
 Deleted: [N] (redundant/stale/resolved)
 Migrated: [N] (moved to steering rules)
 Kept: [N] (still valid)
 Version pointers: [all consistent / fixed N mismatches]
```

---

Quick Mode

If user says "check Anthropic only" or similar:
- Skip Thread (use cached context if available).
- Run only the relevant Thread agent.
- Lighter filtering.
- Abbreviated report.

Error Handling

- Thread fails → proceed with minimal context, note in output.
- Thread fails → report which sources couldn't be checked.
- No discoveries → "No new updates found" with sources listed.
- All filtered → "Updates found but none relevant to current focus".

Integration

- Triggered automatically (cron) or by user command.
- Discoveries feed `ResearchUpgrade` for deep dives.
- Recommendations can generate todos.
- Can trigger implementation workflows.

---

Reference Example

See `../References/ExampleReport.md` for a complete worked example of the canonical output shape.

---

This workflow implements the core PAIUpgrade value proposition: understanding YOU first, discovering what's new second, then connecting them into actionable, personalized upgrades.