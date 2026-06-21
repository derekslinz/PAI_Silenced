---
name: Research
description: "Comprehensive research and content extraction with depth modes: Quick (Perplexity agent, ~-s), Standard (agents — Claude + Gemini + Grok + Perplexity, cross-checked, ~-s), Extensive (explorers + independent verifiers, ~-s), Deep Investigation (progressive iteration with persistent MEMORY/RESEARCH/ vault, loop-compatible, ~-min). Every URL verified before delivery — hallucinated links are a catastrophic failure. Verification architecture: per-agent self-verification, cross-check synthesis, and independent verifier agents (Extensive/Deep). Confidence-tagged output: [HIGH] [MED] [LOW] [CONFLICT]. Additional workflows: ExtractAlpha (highest-signal insights), Retrieve (CAPTCHA/bot-blocked content), YoutubeExtraction (fabric -y), WebScraping, InterviewResearch (Tyler Cowen style), AnalyzeAiTrends, Fabric (+ patterns), Enhance, ExtractKnowledge. USE WHEN research, do research, quick research, extensive research, deep investigation, find information, investigate, extract alpha, analyze content, retrieve content, AI trends, enhance content, extract knowledge, interview research, web scraping, YouTube extraction, map landscape, competitive analysis. NOT FOR people/company/entity deep background (use OSINT), academic paper search (use ArXiv), or structured JSON parsing (use Parser)."
effort: high
context: fork
---

 MANDATORY TRIGGER

When user says "research" (in any form), ALWAYS invoke this skill.
| User Says | Action |
|-----------|--------|
| "research" / "do research" / "research this" | → Standard mode (agents: Claude + Gemini + Grok + Perplexity + cross-check) |
| "quick research" / "minor research" | → Quick mode (Perplexity agent) |
| "extensive research" / "deep research" | → Extensive mode (explorers + verifiers) |
| "deep investigation" / "investigate [topic]" / "map the [X] landscape" | → Deep Investigation (iterative + verification) |

"Research" alone = Standard mode. No exceptions.
Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Research/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

Research Skill

Comprehensive research, analysis, and content extraction system.

MANDATORY: URL Verification

READ:`UrlVerificationProtocol.md` - Every URL must be verified before delivery.

Research agents hallucinate URLs. A single broken link is a catastrophic failure.

---

Workflow Routing

Route to the appropriate workflow based on the request.

CRITICAL:For due diligence, company/person background checks, or vetting -> INVOKE OSINT SKILL INSTEAD
Research Modes (Primary Workflows)
- Quick/minor research (Perplexity, query) -> `Workflows/QuickResearch.md`
- Standard research - DEFAULT (agents: Claude + Gemini + Grok + Perplexity, cross-checked) -> `Workflows/StandardResearch.md`
- Extensive research (explorers + verifiers = agents) -> `Workflows/ExtensiveResearch.md`
- Deep investigation / iterative research (progressive deepening + verification, loop-compatible) -> `Workflows/DeepInvestigation.md`

Verification
- Verify research findings / cross-check claims / confidence scoring -> `Workflows/Verify.md`

Deep Content Analysis
- Extract alpha / deep analysis / highest-alpha insights -> `Workflows/ExtractAlpha.md`

Content Retrieval
- Difficulty accessing content (CAPTCHA, bot detection, blocking) -> `Workflows/Retrieve.md`
- YouTube URL extraction (use `fabric -y URL` immediately) -> `Workflows/YoutubeExtraction.md`
- Web scraping -> `Workflows/WebScraping.md`

Specific Research Types
- Claude WebSearch only (free, no API keys) -> `Workflows/ClaudeResearch.md`
- Perplexity API research (use Quick for single-agent) -> `Workflows/QuickResearch.md`
- Interview preparation (Tyler Cowen style) -> `Workflows/InterviewResearch.md`
- AI trends analysis -> `Workflows/AnalyzeAiTrends.md`

Fabric Pattern Processing
- Use Fabric patterns (+ specialized prompts) -> `Workflows/Fabric.md`

Content Enhancement
- Enhance/improve content -> `Workflows/Enhance.md`
- Extract knowledge from content -> `Workflows/ExtractKnowledge.md`

---

Quick Reference

READ:`QuickReference.md` for detailed examples and mode comparison.

| Trigger | Mode | Speed |
|---------|------|-------|
| "quick research" | Claude agent | ~-s |
| "do research" | agents + cross-check | ~-s |
| "extensive research" | explorers + verifiers | ~-s |
| "deep investigation" | Progressive iteration + verification | ~-min |

Verification Architecture

Inspired by Nomad (arXiv:.). Three layers of verification, zero added latency:

| Layer | What | Where | Cost |
|-------|------|-------|------|
| Self-Verification| Each agent verifies own URLs and tags confidence before returning | All agents | s (inside parallel window) |
| Cross-Check| Synthesis step detects conflicts and cross-references findings | Standard, Extensive, Deep | -s (within synthesis) |
| Independent Verification| Dedicated verifier agents with no access to explorer reasoning | Extensive, Deep only | s (parallel with explorers) |

Confidence tags in output:`[HIGH]` `[MED]` `[LOW]` `[CONFLICT]`

See `Workflows/Verify.md` for full verification protocol.

---

Integration

Feeds Into
- blogging- Research for blog posts
- newsletter- Research for newsletters
- xpost- Create posts from research

Uses
- be-creative- deep thinking for extract alpha
- OSINT- MANDATORY for company/people comprehensive research
- BrightData MCP- CAPTCHA solving, advanced scraping
- Apify MCP- RAG browser, specialized site scrapers

---

Deep Investigation Mode

Progressive iterative researchthat builds a persistent knowledge vault. Works in both single-run (one cycle) and loop mode (Algorithm-driven iterations).

Concept:Broad landscape → discover entities → score importance/effort → deep-dive one at a time → loop until coverage complete.

Domain template packscustomize the investigation for specific domains:
- `Templates/MarketResearch.md` — Companies, Products, People, Technologies, Trends, Investors
- `Templates/ThreatLandscape.md` — Threat Actors, Campaigns, TTPs, Vulnerabilities, Tools, Defenders
- No template? The workflow creates entity categories dynamically from the landscape research.

Example invocation:```
"Do a deep investigation of the AI agent market"
→ Loads MarketResearch.md template
→ Iteration : Broad landscape + first entity deep-dive
→ Loop mode: Each iteration deep-dives the next highest-priority entity
→ Exit: When all CRITICAL/HIGH entities researched + all categories covered
```

Artifacts persistat `~/.claude/PAI/MEMORY/RESEARCH/{date}_{topic}/` — the vault survives across sessions.

See `Workflows/DeepInvestigation.md` for full workflow details.

---

File Organization

Working files (temporary work artifacts):`~/.claude/PAI/MEMORY/WORK/{current_work}/`
- Read `~/.claude/` to get the `work_dir` value
- All iterative work artifacts go in the current work item directory
- This ties research artifacts to the work item for learning and context

History (permanent):`~/.claude/History/research/YYYY-MM/YYYY-MM-DD_[topic]/`

Gotchas

- Research agents hallucinate URLs.EVERY URL must be verified before delivery. A single broken link is a catastrophic failure.
- "research" alone = Standard mode (agents + cross-check). Never default to Quick.Users saying "research this" expect thorough results.
- Due diligence, background checks, people lookup → OSINT skill, NOT Research.Research handles general investigation; OSINT handles entity-specific deep investigation.
- Don't spawn redundant research agents when you already have the answer in context.If prior work in the session already covers the topic, skip agent spawning.
- "extract alpha" routes to ExtractAlpha workflow — not the ExtractWisdom skill.Different things.
- YouTube extraction uses `fabric -y URL` directly— don't try to scrape YouTube pages with WebFetch.

Examples

Example : Quick lookup```
User: "quick research on Hono SSR middleware patterns"
→ Invokes QuickResearch workflow (Claude agent)
→ Returns summary with key patterns and links
→ ~-seconds
```

Example : Standard multi-source research```
User: "research the current state of AI agent frameworks"
→ Invokes StandardResearch workflow (agents: Claude + Gemini, cross-checked)
→ Cross-references findings, confidence-tags, verifies URLs
→ Returns synthesized report with citations
→ ~-seconds
```

Example : Deep investigation```
User: "do a deep investigation of the AI agent market"
→ Invokes DeepInvestigation workflow
→ Broad landscape scan → entity discovery → priority scoring → deep-dives
→ Builds persistent knowledge vault in MEMORY/RESEARCH/
→ Loop-compatible for multi-session investigation
```

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Research","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
