SpawnTeam Workflow

Launches a predefined team of specialist agents to collaborate on domain-specific work.
---

When to Use

{PRINCIPAL.NAME} says:
- "Engineering team: refactor the auth module"
- "Get the security team on the new API"
- "Architecture team — design the feed system"
- "Marketing team, plan the launch"
- "Just the QA lead and senior engineer on this"

KEY TRIGGER: "[team name] team" followed by a task = predefined specialist team.
Available Teams

| Team | Domain | Members | Config |
|------|--------|---------|--------|
| Engineering| Building, shipping code | Senior Engineer, QA Lead, Performance Engineer, DevOps | `Data/Teams/engineering.yaml` |
| Architecture| System design, tech decisions | Systems Architect, Infrastructure Architect, API Designer, Data Architect | `Data/Teams/architecture.yaml` |
| Marketing| Launches, growth, positioning | Growth Strategist, Positioning Expert, Community Manager, Analytics Lead | `Data/Teams/marketing.yaml` |
| Design| UX/UI, visual, interactions | UX Lead, Visual Designer, Interaction Designer, Accessibility Specialist | `Data/Teams/design.yaml` |
| Security| Assessment, threat modeling | Threat Modeler, AppSec Engineer, Red Teamer, Compliance Analyst | `Data/Teams/security.yaml` |
| Research| Deep investigation, evaluation | Primary Researcher, Contrarian Analyst, Technical Evaluator, Synthesis Writer | `Data/Teams/research.yaml` |
| Content| Writing, editorial, distribution | Editor-in-Chief, Staff Writer, Audience Analyst, Distribution Strategist | `Data/Teams/content.yaml` |
| Strategy| Business decisions, planning | Strategist, Operator, Financial Analyst, Risk Assessor, Contrarian | `Data/Teams/strategy.yaml` |

The Workflow

Step : Identify Team & Task

Parse {PRINCIPAL.NAME}'s request:
- Which team? (Match by name or domain)
- What's the task? (The work to be done)
- Subset? (Specific members requested, or full team)
- Model preference? (Default: sonnet for most, opus for architecture/strategy)

Step : Load Team Config

Read the team's YAML config from `~/.claude/skills/Agents/Data/Teams/{team}.yaml`:

```bash
cat ~/.claude/skills/Agents/Data/Teams/engineering.yaml
```

Extract:
- Member definitions (role, traits, focus, bias, objective, evidence standards, red lines)
- Tension pairs
- Expertise path

Step : Load Expertise (if exists)

Check if the team has accumulated expertise:

```bash
cat ~/.claude/PAI/MEMORY/TEAMS/{team}/expertise.md
```

If it exists, include relevant past context in each member's prompt. This is what makes teams better over time.

Step : Compose Each Member via ComposeAgent

For each team member (or requested subset), run ComposeAgent:

```bash
Example for Engineering team's QA Lead
bun run ~/.claude/skills/Agents/Tools/ComposeAgent.ts \
  --traits "technical,skeptical,thorough" \
  --task "QA review of auth module refactor" \
  --output json
```

Step : Enhance Prompts with Team Context

Append to each member's ComposeAgent prompt:

```markdown
Team Role: {role}

You are the {role}on the {team name}.

Your focus:{focus}
Your bias:{bias}
Your objective:{objective}
Your time horizon:{time_horizon}

Evidence standards:- Convinced by: {convinced_by}
- Not convinced by: {not_convinced_by}

Red lines (you will not cross these):{red_lines}

Tension partners:You are in productive tension with {tension_partner}
about {tension_description}. This tension improves the team's output.

The Task
{task_description}

Team Expertise (from prior sessions)
{expertise_content or "First session — no prior expertise."}

Instructions
. Do your part of the work from your role's perspective
. Be specific about what you'd approve, flag, or block
. Reference your evidence standards when making claims
. Note any tension with other roles' likely positions
. Deliver concrete output, not just opinions
```

Step : Launch All Members in Parallel

CRITICAL: Single message, multiple Task calls for parallel execution.
```typescript
// All team members launch simultaneously:
Task({
  description: "Engineering: Senior Engineer - auth refactor",
  prompt: <senior_engineer_enhanced_prompt>,
  subagent_type: "general-purpose",
  model: "sonnet",
  run_in_background: true
})
Task({
  description: "Engineering: QA Lead - auth refactor",
  prompt: <qa_lead_enhanced_prompt>,
  subagent_type: "general-purpose",
  model: "sonnet",
  run_in_background: true
})
// ... remaining members
```

Step : Coordinate & Synthesize

After all members return:

. Collect outputs— Read each member's response
. Identify tensions— Where do members disagree? (This is the valuable part)
. Resolve or document— If tensions can be resolved, resolve them. If not, document both sides.
. Synthesize— Combine into a unified deliverable:
   - What the team agrees on
   - Where tensions exist and why
   - Concrete recommendations
   - Red line violations flagged by any member
. Deliver— Present the unified output to {PRINCIPAL.NAME}

Step : Update Expertise (Optional)

If the session produced valuable patterns, update the team's expertise file:

```bash
Append new learnings
echo "Session: YYYY-MM-DD - {task summary}
- Key decision: {what was decided}
- Tension resolved: {which tension, how}
- Pattern noted: {reusable insight}
" >> ~/.claude/PAI/MEMORY/TEAMS/{team}/expertise.md
```

Subset Selection

When {PRINCIPAL.NAME} requests specific members:

```
"Just the QA lead and senior engineer on this"
→ Filter to only those members from engineering.yaml

"Security team but skip compliance — this is internal only"
→ Load security.yaml, exclude Compliance Analyst

"Architecture team, just the API and data architects"
→ Filter to API Designer + Data Architect only
```

Parse member names case-insensitively. Match on role name or reasonable abbreviation.

Model Selection

| Team | Default Model | Reasoning |
|------|--------------|-----------|
| Engineering | sonnet | Balanced speed/quality for code work |
| Architecture | opus | Deep reasoning for system design |
| Marketing | sonnet | Creative + analytical balance |
| Design | sonnet | Creative work, fast iteration |
| Security | sonnet | Technical analysis, good enough for most |
| Research | sonnet | Research speed, upgrade to opus for deep dives |
| Content | sonnet | Writing quality, fast turnaround |
| Strategy | opus | Complex multi-factor decisions |

Override with: "Use opus for the engineering team on this" or "haiku is fine for this research."

Example Executions

Example : Engineering Team

{PRINCIPAL.NAME}:"Engineering team: refactor the auth module in the feed system"

Execution:. Load `engineering.yaml` — members
. Load expertise from `~/.claude/`
. Compose each: Senior Engineer (technical,pragmatic,systematic), QA Lead (technical,skeptical,thorough), Performance Engineer (technical,analytical,systematic), DevOps (technical,cautious,consultative)
. Enhance prompts with role context + task
. Launch agents in parallel on sonnet
. Collect: Senior Engineer's refactor plan, QA Lead's test concerns, Performance Engineer's hotspot analysis, DevOps' deploy considerations
. Synthesize: Unified refactor plan with test coverage requirements, performance benchmarks, and deploy strategy
. Deliver

Example : Security Team (Subset)

{PRINCIPAL.NAME}:"Just the threat modeler and red teamer on the new API endpoints"

Execution:. Load `security.yaml` — filter to Threat Modeler + Red Teamer only
. Compose agents with their respective traits
. Launch in parallel
. Collect: Threat model + attempted exploitation findings
. Synthesize: Combined threat assessment
. Deliver

Example : Strategy Team

{PRINCIPAL.NAME}:"Strategy team: should I accept the conference speaking offer?"

Execution:. Load `strategy.yaml` — members
. Ask for structured brief if not provided (Situation/Stakes/Constraints/Key Question)
. Compose all with enhanced role prompts
. Launch on opus (strategy decisions need deep reasoning)
. Collect positions from all , noting Contrarian's challenge to consensus
. Synthesize: Ranked recommendation with dissent documented
. Deliver

Common Mistakes to Avoid

Wrong: Composing team members without role context```bash
Just traits, no team role enhancement
bun run ComposeAgent.ts --traits "technical,skeptical,thorough"
Missing: focus, bias, objective, evidence standards, red lines, tensions
```

Right: Enhance with full team context```bash
Compose base, then append team role section
bun run ComposeAgent.ts --traits "technical,skeptical,thorough" --output json
Then add Team Role section with all YAML-defined attributes
```

Wrong: Sequential member execution```typescript
await Task({ ... }) // Member (blocks)
await Task({ ... }) // Member (waits)
```

Right: Parallel execution```typescript
// Single message, all members simultaneously
Task({ ... }) // Member Task({ ... }) // Member Task({ ... }) // Member ```

Related Workflows

- CreateCustomAgent— For one-off custom agents (not predefined teams)
- SpawnParallelAgents— For grunt work (same task, different inputs)
- ListTraits— Show available traits for custom composition

References

- Team configs: `~/.claude/skills/Agents/Data/Teams/.yaml`
- Team expertise: `~/.claude/PAI/MEMORY/TEAMS//expertise.md`
- ComposeAgent: `~/.claude/skills/Agents/Tools/ComposeAgent.ts`
- Traits: `~/.claude/skills/Agents/Data/Traits.yaml`
