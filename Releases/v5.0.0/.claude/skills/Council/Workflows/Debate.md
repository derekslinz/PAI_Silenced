Debate Workflow

Full structured multi-agent debate with rounds and visible transcript.

Prerequisites

- Topic or question to debate
- Optional: Custom council member descriptions (otherwise auto-composed)

CRITICAL: Agent Composition

ALL council members MUST be custom-composed agents via the Agents skill's ComposeAgent tool. NEVER use built-in agent types (Architect, Designer, Engineer, PerplexityResearcher, Silas, etc.).
Built-in types are generic and topic-ignorant. Council debates require agents with domain-specific knowledge, unique voices, and distinct analytical approaches tailored to the debate topic.

See `CouncilMembers.md` for full instructions on composing agents.

Execution

Step : Compose Council Members

Before any debate rounds, compose custom agents tailored to the topic using ComposeAgent:

```bash
Analyze the topic and determine what perspectives create productive friction
Then compose each agent with topic-specific traits:

bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "[domain],enthusiastic,systematic" \
  --task "[debate topic]" \
  --output json

bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "[domain],skeptical,meticulous" \
  --task "[debate topic]" \
  --output json

bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "[domain],pragmatic,analytical" \
  --task "[debate topic]" \
  --output json

bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "research,analytical,comparative" \
  --task "[debate topic]" \
  --output json
```

Each agent gets a unique name, color, and personality prompt.

Step : Announce the Council

Output the debate header with the composed agent names:

```markdown
Council Debate: [Topic]

Council Members:[List composed agent names with their trait descriptions]
Rounds:(Positions -> Responses -> Synthesis)
```

Step : Round - Initial Positions

Launch parallel Agent calls (one per composed council member).

CRITICAL: Use `subagent_type: "general-purpose"` for ALL agents. NEVER use built-in types.
Each agent prompt includes the composed agent's full prompt PLUS:
```markdown
COUNCIL DEBATE - ROUND : INITIAL POSITIONS

Topic: [The topic being debated]

[Full topic context — include relevant background, data, quotes, etc. that the agent needs to form an informed opinion]

Give your initial position on this topic from your specialized perspective.
- Speak in first person as your character
- Be specific and substantive (-words)
- State your key concern, recommendation, or insight
- You'll respond to other council members in Round ```

Output each response as it completes:
```markdown
Round : Initial Positions

[Agent Name] ([trait description]):[Response]

[Agent Name] ([trait description]):[Response]

[Agent Name] ([trait description]):[Response]

[Agent Name] ([trait description]):[Response]
```

Step : Round - Responses & Challenges

Launch parallel Agent calls with Round transcript included.

Each agent prompt includes the composed agent's full prompt PLUS:
```markdown
COUNCIL DEBATE - ROUND : RESPONSES & CHALLENGES

Topic: [The topic being debated]

Here's what the council said in Round :
[Full Round transcript]

Now respond to the other council members:
- Reference specific points they made ("I disagree with [Name]'s point about X...")
- Challenge assumptions or add nuance
- Build on points you agree with
- Maintain your specialized perspective
- -words

The value is in genuine intellectual friction -- engage with their actual arguments.
```

Step : Round - Synthesis

Launch parallel Agent calls with Round + Round transcripts.

Each agent prompt includes the composed agent's full prompt PLUS:
```markdown
COUNCIL DEBATE - ROUND : SYNTHESIS

Topic: [The topic being debated]

Full debate transcript so far:
[Round + Round transcripts]

Final synthesis from your perspective:
- Where does the council agree?
- Where do you still disagree with others?
- What's your final recommendation given the full discussion?
- -words

Be honest about remaining disagreements -- forced consensus is worse than acknowledged tension.
```

Step : Council Synthesis

After all rounds complete, synthesize the debate:

```markdown
Council Synthesis

Areas of Convergence:- [Points where + agents agreed]
- [Shared concerns or recommendations]

Remaining Disagreements:- [Points still contested between agents]
- [Trade-offs that couldn't be resolved]

Recommended Path:[Based on convergence and weight of arguments, the recommended approach is...]
```

Timing

- Agent Composition: ~-seconds (ComposeAgent calls)
- Round : ~-seconds (parallel)
- Round : ~-seconds (parallel)
- Round : ~-seconds (parallel)
- Synthesis: ~seconds

Total: -seconds for full debate

Done

Debate complete. The transcript shows the full intellectual journey from initial positions through challenges to synthesis.
