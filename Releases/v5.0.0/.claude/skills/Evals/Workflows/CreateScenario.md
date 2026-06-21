CreateScenario

Author a new multi-turn agent scenario file for the simulation-based testing pipeline (langwatch `scenario` framework wrapped into Evals).

When to use

- A user wants to test whether a multi-turn agent handles a specific interaction flow.
- A failure was caught in production that needs a regression test covering the conversation pattern that triggered it.
- A capability eval is needed where the agent must sustain quality across + turns.

NOT for:single-shot prompt comparisons → use `CreateUseCase`.

Inputs needed from the user

Ask for and confirm:

. Scenario name(kebab-case, e.g. `refund-dispute`)
. Description(what happens — the user simulator reads this to drive the conversation)
. System promptfor the agent under test (or "use the default")
. Success criteria(-plain-English bullet points the judge will evaluate)
. Max turns(default )
. Inference levelfor the agent under test: `fast` | `standard` | `smart` (default `standard`)

Steps

. Scaffold the fileat `Scenarios/<name>.scenario.ts`:

   ```ts
   import { anthropic } from '@ai-sdk/anthropic';
   import scenario, { type ScenarioConfig } from '@langwatch/scenario';
   import { PAIAgentAdapter } from '../Tools/PAIAgentAdapter.ts';

   const judgeModel = anthropic('claude-sonnet--');

   const config: ScenarioConfig = {
     name: '<scenario-name>',
     description: '<what happens in plain English>',
     agents: [
       new PAIAgentAdapter({
         name: '<agent-name>',
         systemPrompt: '<system prompt for the agent under test>',
         level: 'standard',
       }),
       scenario.userSimulatorAgent({ model: judgeModel }),
       scenario.judgeAgent({
         model: judgeModel,
         criteria: [
           '<criterion >',
           '<criterion >',
         ],
       }),
     ],
     script: [scenario.user(), scenario.agent(), scenario.judge()],
     maxTurns: ,
   };

   export default config;
   ```

. Save the fileunder `Scenarios/<name>.scenario.ts` (kebab-case, `.scenario.ts` suffix required so `ScenarioRunner` identifiers derive cleanly).

. Smoke-test the scenariowith a single trial:
   ```bash
   bun run ${CLAUDE_SKILL_DIR}/Tools/ScenarioRunner.ts --scenario ${CLAUDE_SKILL_DIR}/Scenarios/<name>.scenario.ts
   ```

. Iterate on the criteriauntil the judge's pass/fail decisions align with expert human judgment. Vague criteria cause judge flakiness; prefer specific, testable statements.

. When stable, hand off to `RunScenario`for regression running (trials ≥ ).

Authoring guidance

- Keep criteria narrow and testable."Assistant is helpful" is too vague. "Assistant offers to escalate to a human when user expresses frustration" is specific.
- maxTurns is a ceiling, not a target.Most scenarios should resolve in -turns.
- Use `scenario.user("exact starting message")` for a deterministic first turnif the conversation should always start the same way; use `scenario.user()` (no arg) to let the simulator generate organically from the description.
- Match `level` to cost tolerance.`fast` (Haiku) is fine for most testing; `smart` (Opus) only when the agent under test genuinely needs deep reasoning.
- Scripts can inject checkpoints:`scenario.judge({ criteria: [...] })` mid-script fails the scenario early if criteria are unmet at that turn — useful for multi-stage flows.

Structure

```
skills/Evals/
 Scenarios/                       authored scenarios live here
    <name>.scenario.ts
 Tools/
    PAIAgentAdapter.ts           wraps Inference.ts as scenario AgentAdapter
    ScenarioRunner.ts            CLI entrypoint
    ScenarioToTranscript.ts      result → Evals types
```

See also

- `Workflows/RunScenario.md` — execute the scenario once authored
- `Workflows/CreateUseCase.md` — single-turn alternative
- `Workflows/ViewResults.md` — inspect results alongside other evals
