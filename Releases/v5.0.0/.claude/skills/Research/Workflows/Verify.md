Verify Workflow

Reusable verification layer for research outputs. Inspired by Nomad's explorer-verifier pattern (arXiv:.). Can be invoked standalone or embedded within other research workflows.

Trigger:Called by other workflows (ExtensiveResearch, DeepInvestigation) or standalone via "verify these findings"

---

Core Principle

> The verifier operates independently from the explorer. It does not have access to the explorer's reasoning, and only receives the final claims for evaluation.
> — Nomad, §.
Verification decomposes findings into atomic sub-claims, then independently validates each. This catches errors that self-verification misses because the verifier has no confirmation bias from the exploration process.

---

Verification Priority

Focus verification effort on the claims most likely to be wrong:

. Quantitative claims(numbers, percentages, dates) — most common hallucination target
. Causal claims("X causes Y") — often asserted without evidence
. Recency claims("as of ") — training data may be stale
. Specificity claims(exact product names, version numbers, API parameters) — easily fabricated

Don't waste verification time on general statements or widely-known facts.

---

Confidence Scoring

Every claim receives a confidence tag based on verification results:

| Tag | Meaning | Criteria |
|-----|---------|----------|
| `[HIGH]` | Independently verified | Sub-claim confirmed via tool call (WebSearch, WebFetch, or document) |
| `[MED]` | Partially verified | Some sub-claims confirmed, others unverifiable but plausible |
| `[LOW]` | Unverified | No independent confirmation found, or contradicted by other sources |
| `[CONFLICT]` | Agents disagree | Two or more agents made contradictory claims on this topic |

Default:Missing confidence metadata = `[LOW]` (safe default).

---

Conflict Detection

When multiple agents' results are available, scan for contradictions:

. Extract claim pairs— for each topic, collect claims from all agents
. Detect contradictions— claims that assert opposite conclusions on the same topic
. Flag with both sides— present both claims with their sources, don't resolve
. Optional escalation— for `[CONFLICT]` items, launch one targeted follow-up query

Conflict output format:```
 CONFLICT on [topic]:
  Agent A (ClaudeResearcher): [claim] — [source]
  Agent B (GrokResearcher): [claim] — [source]
  Resolution: [Unresolved | Resolved by Agent C | Resolved by source priority]
```

---

Verification Methods

Tier : URL/Source Verification (fastest)- Parallel batch curl for HTTP status
- WebFetch for content matching
- Cost: ~-s for batch of -URLs

Tier : Claim Spot-Check (medium)- Pick highest-impact sub-claims (quantitative, causal)
- WebSearch to independently confirm
- Cost: ~-s per claim checked

Tier : Full Independent Verification (slowest)- Spawn dedicated verifier agent with claims only (no reasoning)
- Agent independently researches each sub-claim
- Cost: ~-s (runs in parallel with other agents)

Mode-to-tier mapping:| Research Mode | Verification Tier | Rationale |
|---------------|-------------------|-----------|
| Quick | None | Speed-first, single agent |
| Standard | Tier + synthesis cross-check | Lightweight, <s added |
| Extensive | Tier + Tier (verifier agents) | Full verification within -agent budget |
| Deep | Tier + Tier + Tier | Iterative, verification between rounds |

---

Integration Points

This workflow is designed to be called by:
- ExtensiveResearch.md— of agents run as Tier verifiers
- DeepInvestigation.md— Tier verification between Investigate and Progress Check
- StandardResearch.md— Tier inline during synthesis
- PAIUpgrade— Can call Verify.md to validate upgrade recommendations
- Any skill— Import verification by referencing this workflow

---

Graceful Degradation

- If verifier agent times out → treat all its claims as `[MED]` (not verified, not refuted)
- If URL verification fails → fall back to sequential curl
- If no conflicts detected → skip conflict section entirely (don't output empty sections)
- If only agent returned results → skip cross-check, rely on self-verification only
