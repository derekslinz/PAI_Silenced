---
workflow: TestIdea
mode: single-run
---

Test Idea Against World Threat Models

Test any idea, strategy, investment, brand, or concept against all persistent world models
to assess viability across time horizons.

When to Use

- User says "test this idea," "how will this hold up," "test my strategy," "stress test this"
- User provides an idea/strategy/investment and wants temporal viability analysis
- User wants to understand when an idea breaks or thrives

Prerequisites

- World models must exist at `~/.claude/PAI/MEMORY/RESEARCH/WorldModels/`
- If models don't exist, prompt user to run UpdateModels workflow first

Tier Detection

Detect from user prompt:
- "fast"or "quick"→ Fast tier
- "deep"or "thorough"or "comprehensive"→ Deep tier
- No modifier→ Standard tier (default)

Workflow Steps

Step : Validate Models Exist

```
Check ~/.claude/PAI/MEMORY/RESEARCH/WorldModels/ for all model files.
If any missing: "World models incomplete. Run 'update world models' first."
If models older than days: warn user but proceed.
```

Step : Extract and Decompose the Idea

Before hitting it with world models, decompose the idea:

. State the ideain -sentences
. Identify core assumptionsthe idea relies on (market conditions, technology state, cultural norms, regulatory environment, competitive landscape)
. Identify success dependencies— what must remain true for this to work?

For Standard and Deep tiers:Invoke FirstPrinciples skill to classify assumptions:
- Hard constraints (physics, demographics, math)
- Soft constraints (policy, regulation, cultural norms)
- Assumptions (unvalidated beliefs the idea depends on)

Step : Run Against World Models

Read all model files from `~/.claude/PAI/MEMORY/RESEARCH/WorldModels/`.

Fast Tier (~min)
Single-agent analysis:
. Read all models sequentially
. For each horizon, generate: Verdict (//) + -bullet points
. Write Executive Verdict
. Output using abbreviated format from OutputFormat.md

Standard Tier (~min)
Parallel agent analysis:
. Spawn up to parallel agents (Task tool, `run_in_background: true`)
. Each agent:
   - Reads ONE world model document
   - Analyzes the idea against that specific horizon
   - Tests each assumption against the horizon's conditions
   - Returns: Verdict, Key Factors, Analysis, Assumptions Tested
. After all agents return, invoke RedTeam skillwith:
   - Prompt: "Attack this idea across all time horizons. Here are the per-horizon analyses: {results}"
   - Extract adversarial findings per horizon
. Synthesize Cross-Horizon Synthesis section
. Output using full format from OutputFormat.md

Deep Tier (up to hr)
Full capability invocation:
. FirstPrinciples(if not already run): Full deconstruct → challenge → reconstruct cycle on the idea
. Research update check: For each horizon, run quick Research check for any new developments that affect this specific idea
. Parallel horizon analysis: Same as Standard but with deeper prompts and longer analysis per horizon
. RedTeam(agents): Full adversarial analysis of the idea across all horizons
. Council: Multi-agent debate on the idea's long-term viability
   - Prompt: "Debate the viability of {idea} across time horizons from months to years. Consider: {per-horizon results}"
   - Extract Council Deliberation section
. Synthesize all findings
. Output using complete format from OutputFormat.md (all sections)

Step : Format Output

Use the template in `OutputFormat.md` (loaded from skill root). Ensure:
- Each horizon is clearly separated with its own section header
- Verdicts use consistent emoji indicators
- Confidence levels reflect model confidence × analysis certainty
- Adversarial findings attribute to specific horizon contexts

Output Format

See `OutputFormat.md` in the skill root directory.

Integration Points

| Skill | Tier | Purpose |
|-------|------|---------|
| FirstPrinciples| Standard, Deep | Decompose idea assumptions before testing |
| RedTeam| Standard, Deep | Adversarial attack on idea across horizons |
| Council| Deep only | Multi-perspective debate on viability |
| Research| Deep only | Quick refresh of horizon-relevant current events |

Error Handling

- If a parallel agent fails: continue with remaining agents, note missing horizon in output
- If a skill invocation fails: degrade gracefully (e.g., skip Council section, note in footer)
- If models are stale (>days): prominently warn in header, recommend update
