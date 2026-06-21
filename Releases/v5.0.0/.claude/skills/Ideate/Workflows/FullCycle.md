FullCycle — All Phases via Loop Controller

Default Ideate workflow.Runs the full evolutionary cycle through all phases (CONSUME → DREAM → DAYDREAM → CONTEMPLATE → STEAL → MATE → TEST → EVOLVE → META-LEARN), with a Loop Controller that decides continue / pivot / stop after each cycle.

Inputs

- Problem statement(required): the question or challenge to ideate against
- time_scale(optional, default `weeks`): `hours | days | weeks | months | years | decades` → maps to time budget
- domains(optional): seed list of domains to consume from
- seed_urls / seed_ideas(optional): starting material for cycle - Loop config(optional): see Configuration in `../SKILL.md`

Phase Flow

Phases run sequentially within a cycle(each phase consumes the previous phase's output). Agents within a phase run in parallel(Council pattern). Two mid-cycle checkpoints gate progression. The Loop Controller decides cycle-boundary actions.

Phase : CONSUME (Ingest)

Input:Problem statement + optional seeds. On cycle +, also receives survivors from EVOLVE, research questions from META-LEARN, and domain weight adjustments.

How:- Invoke `Skill("Research")` in standard or extensive mode across problem-adjacent and problem-distant domains
- Require minimum distinct domains per cycle (prevents monoculture)
- Domain selection is weighted by Meta-Learner output but includes a random lottery element
- Extract atomic ideas (one concept per item); tag each with source domain, confidence, surprise factor
- Diversity requirement: span at least of: direct domain, adjacent domain, distant domain, historical, contrarian

Agent:The Glutton — voracious, omnivorous. Trait composition: `enthusiastic + research + thorough`

Phase : DREAM (Perturb at noise=.)

Input:Raw Input Pool from CONSUME

How:- Invoke `Skill("BeCreative")` MaximumCreativity workflow
- Each agent receives a random subset of the Input Pool (default N/) selected by Fisher-Yates shuffle with cryptographic seed (NOT LLM-selected — structural randomness)
- Instruction: "Forget the problem. Just combine these inputs freely. What connections do you see that nobody has made?"
- agents × -fragments = -dream fragments per cycle

Distinguishing feature:DREAM has NO awareness of the problem. Pure free-association on random input subsets.

Agent:The Dreamer — wild, poetic. Trait composition: `creative + visionary + unconventional`

Phase : DAYDREAM (Perturb at noise=.)

Input:Raw Input Pool + Dream Fragments + Problem Statement (loosely held)

How:- Agents receive accumulated material PLUS a gentle reminder of the problem
- Instruction: "The problem exists in the background. You're not trying to solve it. You're wandering. What catches your eye?"
- -agents × -tangential insights each

Distinguishing feature:DAYDREAM knows about the problem but isn't trying to solve it. The constraint relaxation IS the mechanism.

Agent:The Wanderer — curious, easily distracted. Trait composition: `curious + exploratory + playful`

Phase : CONTEMPLATE (Perturb at noise=.) — MANDATORY

ENFORCEMENT:Skipping CONTEMPLATE is a hard error. Without it, STEAL and MATE operate on disconnected material.

Input:Everything accumulated so far (Input Pool + Dream Fragments + Tangential Insights + Problem Statement front-and-center)

How:- Invoke `Skill("IterativeDepth")` with lenses: Literal, Failure, Analogical, Constraint Inversion
- Instruction: "Given everything you've seen — now think seriously. What patterns emerge? What would a structured approach look like?"
- -agents × -structured analyses each

Mid-Cycle Checkpoint A:- Gate: "Do at least % of structured analyses reference the original problem statement?"
- If FAIL: re-run CONTEMPLATE with problem statement injected more prominently

Agent:The Sage — deep, methodical. Trait composition: `analytical + systematic + precise`

Phase : STEAL (Cross-Pollinate)

Input:Problem Statement + Structured Analyses

How:- Invoke `Skill("Research")` targeting domains selected via weighted random lottery from the + candidate domain pool
- Each cycle's STEAL must include at least domain NOT used in the previous cycle (forced exploration)
- For each foreign domain, find -patterns/solutions/approaches that solve analogous problems
- Map each foreign pattern onto the problem: "In [foreign domain], they solve [analogous problem] by [technique]. Applied to our problem: [mapping]."
- -agents × different foreign domain each

Agent:The Thief — street-smart, no respect for domain boundaries. Trait composition: `resourceful + cross-domain + opportunistic`

Phase : MATE (Genetic Recombination)

Input:ALL accumulated ideas from phases -
How:- Select idea pairs using Fisher-Yates shuffle (structural randomness, not LLM-selected)
- Pre-allocated cross-phase slots: first % of pairs are forced cross-phase (e.g. Dream Fragment + Borrowed Pattern)
- For each pair, perform THREE operations:
  - Crossover:element A from idea + element B from idea   - Mutation:dice-roll from mutation operations (see Structural Randomness Engine in `../SKILL.md`)
  - Cloning with drift:copy one parent with small random modifications
- Each agent produces -offspring; minimum offspring per cycle (prevents premature convergence)
- Explicitly instruct agents to produce BAD ideas too — selection happens in TEST

Agent:The Matchmaker — sees compatibility where others don't. Trait composition: `creative + combinatorial + bold`

Phase : TEST (Select)

Input:All Offspring Ideas from MATE + Problem Statement (as fitness function)

Scoring dimensions (each -):Feasibility, Novelty, Impact, Elegance

How:- Invoke `Skill("RedTeam")` to adversarially attack each candidate
- -judge agents independently score each candidate on all dimensions
- Final score = average across judges; confidence = inverse of variance
- Each judge provides: score, -sentence supporting argument, -sentence counterargument
- External validation(optional): pluggable hooks add real-world signal as score modifiers

Mid-Cycle Checkpoint B:- Gate: "Is this cycle's avg composite score >= previous cycle's avg − points?"
- If FAIL: increment `stagnation_counter` in Loop Controller. If counter ≥ , Meta-Learner is triggered to propose strategy pivot before EVOLVE.

Agent:The Judge — harsh, fair. Trait composition: `critical + analytical + skeptical`

Phase : EVOLVE (Iterate)

Input:Scored Candidates from TEST

How:- Selection:Rank by composite score (adjusted for external validation if enabled)
- Kill threshold:Bottom % eliminated (no carry-forward)
- Elitism:Top % carry forward UNCHANGED
- Mutation:Remaining % carry forward with dice-roll mutations from defined operations
- Diversity injection:Add -completely new random ideas (immigrants) to prevent gene pool collapse
- Output report:ideas in, ideas out, average fitness, diversity index, top candidates
- Feed forward:Survivors + full scoring data passed to META-LEARN

Agent:The Curator — cold, efficient. Trait composition: `strategic + decisive + unsentimental`

Phase : META-LEARN (Lamarckian Learning)

Input:Full cycle results — survivors, killed ideas, scoring data, provenance chains, phase contribution stats

How:
. Fitness landscape analysis:which parent domains produced highest-scoring offspring? which phases contributed most to survivors? what scoring dimensions are hardest to satisfy?

. Strategy adjustments (JSON output):   ```json
   {
     "domain_weights": {"biology": ., "history": .},
     "phase_weights": {"DREAM": ., "STEAL": .},
     "noise_adjustment": -.,
     "new_domains_to_explore": ["game-theory", "logistics"],
     "kill_threshold_adjustment": .,
     "breeding_strategy": "favor cross-domain over within-domain"
   }
   ```

. Question generation:synthesizes -specific research questions based on what this cycle revealed; these seed the next cycle's CONSUME phase

Agent:The Scientist — meta-analytical. Trait composition: `meta-analytical + strategic + adaptive`

Loop Controller Decision

After META-LEARN completes, the Loop Controller evaluates:

```
IF budget_seconds_remaining <= :
    STOP (budget exhausted)
ELIF stagnation_counter >= :
    IF strategy_pivots_remaining > :
        PIVOT (shift domains, noise levels, agent composition)
    ELSE:
        STOP (exhausted all strategies)
ELIF fitness_history[-].diversity_index < .:
    PIVOT (diversity collapse — inject immigrants and widen search)
ELIF fitness_history[-].top_score >= target_score (if set):
    STOP (target reached)
ELSE:
    CONTINUE
```

On STOP, invoke the Insight Extractor (The Historian) for post-loop analysis.

Post-Loop: Insight Extractor

Runs once after the Loop Controller issues STOP. Analyzes the entire evolutionary run.

Output sections:- Dominant Lineages (which idea families dominated, common ancestors of top scorers)
- Fertile Combinations (which domain pairings produced breakthrough offspring)
- Fitness Landscape (peaks, valleys, unexplored regions)
- Problem Understanding (what the process revealed about the problem itself)
- Recommendations for Further Exploration

Agent:The Historian — retrospective, sees the forest. Trait composition: `archival + synthesizing + retrospective`

State Persistence

Each run persists to `~/.claude/PAI/MEMORY/WORK/{slug}/ideate/`. See `../SKILL.md` § "State Persistence" for the full directory layout and idea data structure.

Final Output

See `../SKILL.md` § "Final Output Format" for the markdown template.

Execution Log

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Ideate","workflow":"FullCycle","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```
