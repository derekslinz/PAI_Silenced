Extensive Research Workflow

Mode:explorers + verifiers (total agents) | Timeout:seconds

Architecture: Explorer-Verifier Pattern

Inspired by Nomad (arXiv:.). Instead of undifferentiated explorers, we use explorersfor breadth and verifiersfor trustworthiness — same total agent count, dramatically better output quality.

```
All agents launch simultaneously in one message.
Verifier prompts are topic-level (not claim-level) so they work without explorer results.
Synthesis cross-references explorer findings against verifier findings with confidence tags.
```

CRITICAL: URL Verification

Agents now self-verify URLs before returning (see agent Self-Verification sections). The post-hoc URL verification step is replaced by parallel batch verification during synthesis.

When to Use

- User says "extensive research" or "do extensive research"
- Deep-dive analysis needed
- Comprehensive multi-domain coverage required

Workflow

Step : Generate Creative Research Angles (deep thinking)

Think deeply about the research topic:
- Explore multiple unusual perspectives and domains
- Question assumptions about what's relevant
- Make unexpected connections across fields
- Consider edge cases, controversies, emerging trends

Generate unique explorer angles+ verification angles(total).
- Explorer angles: diverse research directions
- Verification angles: "verify the most important claims about [topic]" and "find contradictory evidence about [topic]"

Step : Launch All Agents in Parallel

SINGLE message launching all agents:
```typescript
// === EXPLORERS (agents) ===

// Claude - threads (academic depth, strategic analysis)
Task({ subagent_type: "ClaudeResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })
Task({ subagent_type: "ClaudeResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })

// Gemini - threads (multi-perspective, cross-domain)
Task({ subagent_type: "GeminiResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })
Task({ subagent_type: "GeminiResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })
Task({ subagent_type: "GeminiResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })

// Grok - threads (contrarian, fact-based)
Task({ subagent_type: "GrokResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })
Task({ subagent_type: "GrokResearcher", description: "[topic] angle ", prompt: "Search for: [angle ]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return findings." })

// === VERIFIERS (agents) ===
// These independently check the most important claims about the topic.
// They have NO access to explorer reasoning — only the topic and their own research.

Task({ subagent_type: "PerplexityResearcher", description: "verify [topic] claims", prompt: "Independently verify the most commonly cited facts, statistics, and claims about [topic]. For each claim you find, check if it's supported by primary sources. Tag each as [HIGH] (confirmed), [MED] (plausible), or [LOW] (unconfirmed). Focus on quantitative claims and dates — these are most likely to be wrong." })
Task({ subagent_type: "ClaudeResearcher", description: "find contradictions about [topic]", prompt: "Search for contradictory evidence, debunked claims, and common misconceptions about [topic]. What do people get wrong? What's the contrarian view with evidence? Tag each finding with confidence: [HIGH], [MED], or [LOW]." })
```

Each agent:- Gets ONE focused angle
- Self-verifies URLs before returning (per agent Self-Verification protocol)
- Tags findings with confidence levels
- Returns as soon as it has findings

Step : Collect Results (SECOND TIMEOUT)

- All agents run in parallel
- Most return within -seconds
- HARD TIMEOUT: seconds— proceed with whatever has returned
- Note non-responsive agents

Step : Verified Synthesis

This is where the explorer-verifier pattern pays off.Cross-reference explorer findings against verifier results:

. Match claims:For each explorer finding, check if verifiers confirmed, contradicted, or didn't cover it
. Upgrade/downgrade confidence:Explorer claim `[MED]` + verifier confirmed → `[HIGH]`. Explorer claim `[HIGH]` + verifier contradicted → `[CONFLICT]`
. Detect conflicts:When explorers disagree with each other OR with verifiers, flag both sides
. Parallel URL batch check:For any remaining unverified URLs, run batch curl:
   ```bash
   Parallel URL verification (all at once, not sequential)
   for url in "${urls[@]}"; do curl -s -o /dev/null -w "%{http_code} $url\n" -L "$url" & done; wait
   ```

Synthesis structure:```markdown
Executive Summary
[-sentence overview]

Verified Findings
[Theme ]
- [HIGH] Finding (confirmed by: explorer + verifier)
- [MED] Finding (single source, not independently verified)

[Theme ]
- [HIGH] Finding (multiple explorers agree)
- [CONFLICT] Finding A vs Finding B (see Conflicts section)

Unique Insights by Source
- Claude: [analytical depth]
- Gemini: [cross-domain connections]
- Grok: [contrarian perspectives]
- Verifiers: [what was confirmed/refuted]

Conflicts & Low-Confidence Items
 CONFLICT on [topic]:
  Explorer (GrokResearcher): [claim] — [source]
  Verifier (PerplexityResearcher): [contradicting claim] — [source]
  Status: Unresolved

LOW CONFIDENCE:
- [claim] — could not independently verify
```

Step : Return Results

```markdown
SUMMARY: Extensive research on [topic]
ANALYSIS: [Comprehensive verified findings by theme]
ACTIONS: explorers + verifiers = parallel agents
RESULTS: [Full synthesized report with confidence tags]
STATUS: Extensive mode - explorer-verifier pattern
CAPTURE: [Key verified discoveries]
 NEXT: [Follow-up recommendations, especially for CONFLICT items]
STORY EXPLANATION: [numbered points]
COMPLETED: Extensive research on [topic] complete

RESEARCH METRICS:
- Total Agents: (explorers + verifiers)
- Explorer Types: Claude(), Gemini(), Grok()
- Verifier Types: Perplexity(), Claude()
- Findings: N HIGH | N MED | N LOW | N CONFLICT
- URLs verified: N/N
```

Speed Target

~-seconds for results (parallel execution, same as before)
Verification adds seconds — verifiers run in parallel with explorers.

Graceful Degradation

- If verifier agents time out → all findings stay at explorer-assigned confidence (no downgrade)
- If only explorer returns → skip cross-check, use self-verification only
- If URL batch check fails → fall back to sequential curl
