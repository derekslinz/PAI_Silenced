CreateCustomAgent Workflow

Creates custom agents with unique personalities and colors using ComposeAgent.
When to Use

{PRINCIPAL.NAME} says:
- "Create custom agents to do X"
- "Spin up custom agents for Y"
- "I need specialized agents with Z expertise"
- "Generate N custom agents to analyze..."

KEY TRIGGER: The word "custom" means truly unique agents - NOT static types (Architect, Engineer, etc.) — always use `general-purpose` with ComposeAgent prompts.
The Workflow

Step : Determine Agent Count & Requirements

Extract from {PRINCIPAL.NAME}'s request:
- How many agents? (Default: if not specified)
- What's the task?
- Are specific traits mentioned? (security, legal, skeptical, thorough, etc.)

Step : For EACH Agent, Run ComposeAgent with DIFFERENT Traits

CRITICAL: Each agent MUST have different trait combinations to get unique personalities and colors.
```bash
Example for custom research agents:

Agent - Enthusiastic Explorer
bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "research,enthusiastic,exploratory" \
  --task "Research quantum computing applications" \
  --output json

Agent - Skeptical Analyst
bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "research,skeptical,systematic" \
  --task "Research quantum computing applications" \
  --output json

Agent - Thorough Synthesizer
bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "research,analytical,synthesizing" \
  --task "Research quantum computing applications" \
  --output json
```

Step : Extract Prompt and Color from Each

ComposeAgent returns JSON with:
```json
{
  "name": "Research Enthusiastic Explorer",
  "color": "FFB",
  "traits": ["research", "enthusiastic", "exploratory"],
  "prompt": "Dynamic Agent: Research Enthusiastic Explorer\n\nYou are a specialized agent..."
}
```

Each agent gets a unique color- use this in the description for visual distinction in the terminal.

Step : Launch Agents with Task Tool

Use a SINGLE message with MULTIPLE Task calls for parallel execution.
CRITICAL: Use `subagent_type: "general-purpose"` - NEVER use static types like "Architect" or "Engineer" for custom agents.
```typescript
// Send all in ONE message:
Task({
  description: "Research agent - enthusiastic",
  prompt: <agent_full_prompt>,
  subagent_type: "general-purpose",
  model: "sonnet"  // or "haiku" for speed
})
Task({
  description: "Research agent - skeptical",
  prompt: <agent_full_prompt>,
  subagent_type: "general-purpose",
  model: "sonnet"
})
Task({
  description: "Research agent - analytical",
  prompt: <agent_full_prompt>,
  subagent_type: "general-purpose",
  model: "sonnet"
})
```

Step : Spotcheck (Optional but Recommended)

After all agents complete, launch one more to verify consistency:

```typescript
Task({
  description: "Spotcheck custom agent results",
  prompt: "Review these results for consistency and completeness: [results]",
  subagent_type: "general-purpose",
  model: "haiku"
})
```

Trait Variation Strategies

When creating multiple custom agents, vary traits to ensure distinct personalities:

For Research Tasks:- Agent : research + enthusiastic + exploratory
- Agent : research + skeptical + thorough
- Agent : research + analytical + systematic
- Agent : research + creative + bold
- Agent : research + empathetic + synthesizing

For Security Analysis:- Agent : security + adversarial + bold
- Agent : security + skeptical + meticulous
- Agent : security + cautious + systematic

For Business Strategy:- Agent : business + bold + rapid
- Agent : business + analytical + comparative
- Agent : business + pragmatic + consultative

Timing & Model Selection

Timing flows from the Algorithm.The main agent validates a timing tier (fast|standard|deep) and passes it to ComposeAgent via `--timing`:

```bash
Pass timing to ComposeAgent for automatic scope in agent prompt:
bun run ComposeAgent.ts --traits "research,enthusiastic" --task "Quick status check" --timing fast --output json
bun run ComposeAgent.ts --traits "security,thorough" --task "Full security audit" --timing deep --output json
```

If `--timing` is omitted, agents get no scope section (backward compatible).

| Timing | Model | Agent Output |
|--------|-------|-------------|
| `fast` | `haiku` | Under words, direct answer |
| `standard` | `sonnet` | Focused work, under words |
| `deep` | `opus` | Comprehensive analysis, no limit |

Parallel custom agents benefit from `sonnet` or `haiku` for speed.
Example Execution

{PRINCIPAL.NAME}:"Create custom science agents to analyze this climate data"

{DA_IDENTITY.NAME}'s Internal Execution:```bash
Agent - Climate Science Enthusiast
bun run ComposeAgent.ts --traits "research,enthusiastic,thorough" --task "Analyze climate data patterns" --output json

Agent - Skeptical Data Analyst
bun run ComposeAgent.ts --traits "data,skeptical,systematic" --task "Analyze climate data patterns" --output json

Agent - Creative Pattern Finder
bun run ComposeAgent.ts --traits "data,creative,exploratory" --task "Analyze climate data patterns" --output json

Agent - Meticulous Validator
bun run ComposeAgent.ts --traits "research,meticulous,comparative" --task "Analyze climate data patterns" --output json

Agent - Synthesizing Strategist
bun run ComposeAgent.ts --traits "research,analytical,synthesizing" --task "Analyze climate data patterns" --output json

Launch all in parallel (single message, Task calls)
Each agent has a unique personality
```

Result:distinct agents with different analytical approaches and unique personalities analyzing the data from different perspectives.

Common Mistakes to Avoid

WRONG: Using same traits for all agents```bash
All agents get the same personality!
bun run ComposeAgent.ts --traits "research,analytical" Agent bun run ComposeAgent.ts --traits "research,analytical" Agent (same personality!)
bun run ComposeAgent.ts --traits "research,analytical" Agent (same personality!)
```

RIGHT: Varying traits for unique personalities```bash
Each agent gets a different personality
bun run ComposeAgent.ts --traits "research,enthusiastic,exploratory"
bun run ComposeAgent.ts --traits "research,skeptical,systematic"
bun run ComposeAgent.ts --traits "research,creative,synthesizing"
```

WRONG: Launching agents sequentially```typescript
// Slow - waits for each to finish
await Task({ ... }); // Agent await Task({ ... }); // Agent (waits for )
await Task({ ... }); // Agent (waits for )
```

RIGHT: Launching agents in parallel```typescript
// Fast - all run simultaneously (single message, multiple calls)
Task({ ... })  // Agent Task({ ... })  // Agent Task({ ... })  // Agent ```

Color Assignment Logic

ComposeAgent deterministically derives a unique color from the sorted trait combination — the same trait set always maps to the same color, and different trait sets map to visually distinct colors for terminal distinction.

Related Workflows

- ListTraits- Show available traits for composition
- SpawnParallelAgents- Launch parallel agents for grunt work (same identity, no custom personality)

References

- Trait definitions: `~/.claude/skills/Agents/Data/Traits.yaml`
- Agent template: `~/.claude/skills/Agents/Templates/DynamicAgent.hbs`
- ComposeAgent tool: `~/.claude/skills/Agents/Tools/ComposeAgent.ts`
- Agent personalities: `~/.claude/skills/Agents/AgentPersonalities.md`
