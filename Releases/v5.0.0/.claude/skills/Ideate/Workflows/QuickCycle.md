QuickCycle — Compressed -Phase Single Cycle

Use when:you want fast novelty without the full Loop Controller machinery. Single cycle, no META-LEARN, no strategy pivots, no Lamarckian feedback. Trades depth for speed.

Phase set:CONSUME → STEAL → MATE → TEST. Skips DREAM, DAYDREAM, CONTEMPLATE (the perturbation phases) and EVOLVE/META-LEARN (the iteration phases). Output is a single batch of scored candidates.

Inputs

- Problem statement(required)
- domains(optional, defaults to -domains chosen heuristically from the problem)
- target_count(optional, default ): how many scored candidates to return

Steps

. CONSUME
- Invoke `Skill("Research")` in standard mode (NOT extensive — speed matters)
- Pull from -domains (default for QuickCycle): direct domain + -distant domains
- Extract atomic ideas, tag with source domain
- Output: -raw input items

. STEAL
- Invoke `Skill("Research")` targeting foreign domains via random lottery from the standard + domain pool
- For each foreign domain, find -patterns/solutions
- Map each foreign pattern onto the problem
- Output: -borrowed pattern mappings

. MATE
- Combine CONSUME output + STEAL output into one pool
- Fisher-Yates shuffle the pool, pair adjacent items (no cross-phase enforcement at this scale — pool is already mixed)
- For each pair: crossover + dice-roll mutation (mutation operations from `../SKILL.md` § Structural Randomness Engine)
- Skip the cloning-with-drift step (only crossover + mutation in QuickCycle for speed)
- Output: `target_count` × .offspring (-% will be killed in TEST)

. TEST
- judge agents independently score each offspring on dimensions: Feasibility, Novelty, Impact, Elegance
- Final score = average; confidence = inverse of variance
- Each judge: score + -sentence supporting argument + -sentence counterargument
- Skip RedTeam adversarial pass (FullCycle has it; QuickCycle trades depth for speed)
- Skip external validation hooks
- Drop bottom %; return top `target_count` ranked by composite score

Output

Markdown report with:
- Top N candidates ranked by composite score
- Each candidate: scores per dimension, supporting/counter argument, provenance (parent IDs + operation type)
- One-line summary of input pool composition

No Insight Extractor (single cycle has no cross-cycle pattern to extract). No Loop Controller state file.

When NOT to use this

- Need genuinely novel ideas (no DREAM/DAYDREAM = bounded creativity) → use FullCycle
- Need adaptive strategy (no META-LEARN = no learning across cycles) → use FullCycle
- Just need divergent ideas without scoring → use `Skill("BeCreative")` instead

Execution Log

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Ideate","workflow":"QuickCycle","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```
