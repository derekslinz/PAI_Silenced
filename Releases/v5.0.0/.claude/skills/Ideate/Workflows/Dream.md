Dream — DREAM Phase Only (Free-Association Recombination)

Use when:you want pure unconstrained recombination of input material with NO awareness of the problem. The connection-to-problem step is left to a downstream consumer (you, or a follow-up Mate/Test workflow).

Phase invoked:DREAM only (noise=.). No CONSUME (caller supplies inputs), no scoring, no iteration.

Inputs

- Input pool(required): a list of atomic ideas, facts, patterns. -items recommended.
- Agent count(optional, default ): how many Dreamer agents run in parallel
- Subset ratio(optional, default .): each agent gets `pool_size × ratio` random items

Steps

. Structural randomness:for each Dreamer agent, generate a random subset of `floor(pool_size × subset_ratio)` items via Fisher-Yates shuffle with a cryptographic seed (NOT LLM-selected). Different agents see different subsets.

. Spawn `agent_count` Dreamer agents in parallelvia Task tool. Each receives:
   - Its random subset
   - The instruction: "Forget any problem context. Just combine these inputs freely. What connections do you see that nobody has made? What if X was Y? What if you turned Z inside out?"   - Trait composition: `creative + visionary + unconventional`
   - Invoke `Skill("BeCreative")` MaximumCreativity workflow inside each agent

. Each agent produces -dream fragments. Output is markdown with:
   - Fragment text (-sentences each)
   - Source-input IDs that contributed (provenance)
   - No fitness evaluation — dreams are not judged here

Output

```markdown
Dream Fragments

Agent — The Dreamer (subset: ideas , , , , )

. [Fragment text]
   Provenance: ideas +
. [Fragment text]
   Provenance: ideas +
...

Agent — The Dreamer (subset: ideas , , , , )

...
```

Distinguishing Notes

- DREAM has NO awareness of the problem.If you want gentle problem-tethering, use `Daydream.md` instead (noise=., problem held loosely).
- Structural randomness is the point.Two agents with the same input will produce more similar output than two agents with genuinely different random subsets. The randomness comes from WHICH ideas they see, not from LLM temperature.
- Output is raw material, not solutions.Downstream consumers (Mate, Test, or a human reviewer) judge applicability.

Execution Log

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Ideate","workflow":"Dream","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```
