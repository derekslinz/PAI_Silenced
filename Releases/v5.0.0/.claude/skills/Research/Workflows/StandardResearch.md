Standard Research Workflow

Mode:different researcher types, query each | Timeout:minutes

CRITICAL: URL Verification Required

BEFORE delivering any research results with URLs:. Verify EVERY URL using WebFetch or curl
. Confirm the content matches what you're citing
. NEVER include unverified URLs - research agents HALLUCINATE URLs
. A single broken link is a CATASTROPHIC FAILURE

See `SKILL.md` for full URL Verification Protocol.

When to Use

- Default mode for most research requests
- User says "do research" or "research this"
- Need multiple perspectives quickly

Workflow

Step : Craft One Query Per Researcher

Create ONE focused query optimized for each researcher's strengths:
- Claude: Academic depth, detailed analysis, scholarly sources
- Gemini: Multi-perspective synthesis, cross-domain connections
- Grok: Contrarian, fact-based perspective; long-term truth over short-term trend; social/political nuance
- Perplexity: Live-web retrieval with citations; fastest current-state snapshot

Step : Launch Agents in Parallel (of each type)

SINGLE message with Task calls:
```typescript
Task({
  subagent_type: "ClaudeResearcher",
  description: "[topic] analysis",
  prompt: "Do ONE search for: [query optimized for depth/analysis]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings immediately."
})

Task({
  subagent_type: "GeminiResearcher",
  description: "[topic] perspectives",
  prompt: "Do ONE search for: [query optimized for breadth/perspectives]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings immediately."
})

Task({
  subagent_type: "GrokResearcher",
  description: "[topic] contrarian take",
  prompt: "Do ONE search for: [query optimized for contrarian/long-term-truth angle]. Prefer counter-consensus signal and durable facts over trending narrative. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings immediately."
})

Task({
  subagent_type: "PerplexityResearcher",
  description: "[topic] current state",
  prompt: "Do ONE search for: [query optimized for live-web current state with citations]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings immediately."
})
```

Each agent:- Gets ONE query
- Does ONE search
- Returns immediately

Step : Cross-Check Synthesis

Combine the two perspectives with confidence scoring and conflict detection:
. Cross-reference findings:Where both agents report the same fact → tag `[HIGH]`
. Flag unique findings:Findings from only one agent → tag `[MED]`
. Detect contradictions:Where agents disagree → tag `[CONFLICT]` with both sides
. Quantitative check:Any number cited by one agent — did the other agent's sources confirm it?

This adds ~-seconds to synthesis (reading both results with conflict lens) — well within the <s budget.

Step : Parallel URL Verification

Agents now self-verify URLs before returning. For any remaining unverified URLs, batch-verify in parallel:

```bash
Parallel URL check (not sequential)
for url in "${urls[@]}"; do curl -s -o /dev/null -w "%{http_code} $url\n" -L "$url" & done; wait
```

If URL fails:Remove it. If the finding was `[HIGH]` based on cross-reference, downgrade to `[MED]`.

Step : Return Results

```markdown
SUMMARY: Research on [topic]
ANALYSIS: [Key findings with confidence tags: [HIGH] [MED] [LOW] [CONFLICT]]
ACTIONS: researchers × query each + cross-check synthesis
RESULTS: [Synthesized answer]
STATUS: Standard mode - agents, cross-checked
CAPTURE: [Key verified facts]
️ NEXT: [Suggest extensive if CONFLICT items need resolution]
STORY EXPLANATION: [-numbered points]
COMPLETED: Research on [topic] complete
```

Speed Target

~-seconds for results
