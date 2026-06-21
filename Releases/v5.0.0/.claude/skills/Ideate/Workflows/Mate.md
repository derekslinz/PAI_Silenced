Mate — MATE Phase Only (Genetic Recombination)

Use when:you have a pool of existing ideas and want to breed novel offspring via crossover + mutation. No new research, no scoring — pure recombination.

Phase invoked:MATE only.

Inputs

- Idea pool(required): list of existing ideas to breed (typically -items)
- Phase tags(optional): mark each input idea with its origin phase (e.g. "Dream", "Steal", "Contemplate") to enable cross-phase pairing enforcement
- Offspring count(optional, default ): minimum number of offspring to produce
- Cross-phase ratio(optional, default .): proportion of pairings forced cross-phase

Steps

. Pair selection via Fisher-Yates shuffle:   - Bucket inputs by phase tag (if provided)
   - Pre-allocate `cross_phase_ratio × offspring_count` slots — these are forced cross-phase pairs (one input from each of two different phase buckets, randomized within bucket)
   - Remaining slots: shuffle the full pool, pair adjacent items
   - Critical: do NOT ask the LLM to pick "interesting pairs" — structural randomness defeats LLM bias toward training-distribution-favored pairings

. Spawn Matchmaker agents in parallelvia Task tool. Each receives a subset of the pairs. For each pair, the agent performs THREE operations:

   - Crossover:"Take element A from idea , element B from idea . Combine into a new idea."
   - Mutation:Roll an -sided die. Apply the corresponding mutation operation:
     . Flip one assumption
     . Invert the constraint
     . Change the scale (× bigger or smaller)
     . Change the time horizon
     . Merge with a random element from another idea in the pool
     . Apply a constraint from a random domain
     . Remove the most complex component
     . Add an adversarial requirement
   - Cloning with drift:"Copy one parent idea with small random modifications."

   Trait composition: `creative + combinatorial + bold`

. Explicitly instruct agents to produce BAD ideas too— selection is not happening here, so don't pre-filter. Diversity matters more than quality at this phase.

. Aggregate offspringwith full provenance:
   - Parent IDs
   - Operation type (crossover / mutation / clone)
   - Mutation die-roll (if mutation was applied)
   - Phase-bucket origins of parents

Output

```json
[
  {
    "id": "offspring-",
    "text": "Apply mycelial chemical-gradient signaling to API rate limiting",
    "provenance": {
      "parents": ["idea-", "idea-"],
      "operation": "crossover",
      "mutation_die_roll": null,
      "parent_phases": ["Steal", "Contemplate"],
      "is_cross_phase": true
    }
  },
  {
    "id": "offspring-",
    "text": "...",
    "provenance": { "parents": ["idea-"], "operation": "clone-with-drift", ... }
  }
]
```

Distinguishing Notes

- Pairing randomness defeats LLM bias."Interesting pairs" picked by an LLM converge on training-distribution patterns. Random pairs surface the surprises.
- Cross-phase enforcement is the convergence brake.Without it, the gene pool narrows to one phase's flavor. The % floor is empirical.
- Bad offspring are wanted here.Selection is downstream. Filtering at MATE collapses diversity.

Execution Log

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Ideate","workflow":"Mate","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```
