---
workflow: UpdateModels
mode: loop-compatible
---

Update World Models

Refresh or create world model documents using deep research and user-provided analysis.

When to Use

- User says "update world models," "refresh models," "new analysis for models"
- User provides new information/analysis to incorporate into models
- Models are stale (>days since last update)
- Initial model population (no models exist yet)

Prerequisites

- Model template at `~/.claude/skills/WorldThreatModel/ModelTemplate.md`
- Research skill available for web research

Workflow Steps

Step : Check Existing State

```
Read ~/.claude/PAI/MEMORY/RESEARCH/WorldModels/INDEX.md (if exists)
Inventory which models exist and their last_updated dates
Determine: full creation vs. targeted update
```

Step : Determine Update Scope

Full Creation(no models exist or user says "rebuild all"):
- Create all models from scratch
- Use parallel research agents for efficiency

Targeted Update(models exist, user provides new analysis OR routine refresh):
- If user provided analysis: incorporate into relevant horizons
- If routine refresh: research what's changed since last_updated date
- Update only affected models

Single Horizon(user specifies "update the -year model"):
- Research and update only the specified horizon

Step : Research Current State

For each model being created or updated:

. Invoke Research skill(Standard or Extensive mode depending on scope):
   - Query: "Current global state and projections for {HORIZON} timeframe: geopolitics, AI/technology trajectory, economics, society, environment, security. Focus on developments since {last_updated or 'baseline'}."
   - For near-term (mo-yr): Focus on current events, immediate trends, specific forecasts
   - For mid-term (yr-yr): Focus on trend trajectories, structural shifts, emerging patterns
   - For long-term (yr-yr): Focus on megatrends, demographic forces, technological paradigm shifts

. If user provided analysis: Integrate user's insights as primary source, research as supporting

. Parallel execution: When creating multiple models, spawn parallel agents:
   - Near-term batch: mo, yr, yr, yr (agents)
   - Mid-term batch: yr, yr, yr (agents)
   - Long-term batch: yr, yr, yr, yr (agents)
   - Each agent uses Research skill for its specific horizon

Step : Write Model Documents

For each model, following `ModelTemplate.md`:

. Write frontmatter (horizon, last_updated: today, version: increment, confidence level)
. Write all required sections with minimum word counts
. Ensure hedging language for predictions
. Include specific data points, named entities, cited reasoning
. Write Wildcards section with probability estimates

Save to: `~/.claude/PAI/MEMORY/RESEARCH/WorldModels/{horizon}.md`

Step : Update INDEX

Write/update `~/.claude/PAI/MEMORY/RESEARCH/WorldModels/INDEX.md`:

```markdown
World Threat Models — Index

Last full update: {date}

| Horizon | File | Last Updated | Version | Confidence |
|---------|------|-------------|---------|------------|
| months | -month.md | YYYY-MM-DD | N | high/med/low |
| year | -year.md | YYYY-MM-DD | N | high/med/low |
| ... | ... | ... | ... | ... |

Update History

- YYYY-MM-DD: {what was updated and why}
```

Agent Prompt Template (for parallel model creation)

When spawning agents for model creation, use this prompt structure:

```
CONTEXT: You are creating a world threat model for the {HORIZON} time horizon.
The current date is {TODAY}. This model will be used to test ideas, strategies,
and investments against projected future world states.

TASK: Write a comprehensive world model document following this template:
{INSERT ModelTemplate.md CONTENT}

REQUIREMENTS:
- Minimum ,words across all sections
- Use hedging language for predictions ("likely," "projected," "if trends continue")
- Be specific: name countries, companies, technologies, cite numbers where possible
- Near-term models: heavier on current data extrapolation
- Long-term models: focus on structural forces and megatrends
- Include at least wildcards with probability estimates
- Rate your overall confidence and explain why

RESEARCH: Use WebSearch to find current data, forecasts, and analysis relevant to
this {HORIZON} timeframe across all sections (geopolitics, technology, economics,
society, environment, security).

SLA: Complete within minutes.

OUTPUT: Write the complete model document in markdown format following the template exactly.
Include the frontmatter with horizon, last_updated, version: , and confidence rating.
```

Integration Points

| Skill | Purpose |
|-------|---------|
| Research| Primary data gathering for model content |
| WebSearch| Current events and projections |

State Management (Loop Compatibility)

- Models on disk are the state
- Step reads existing state to determine what needs updating
- Each model is independently updatable
- INDEX.md tracks aggregate state
