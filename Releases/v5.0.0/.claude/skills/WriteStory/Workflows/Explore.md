Explore Workflow

Creative divergence engine for generating fresh, original story ideas. Uses multiple agents and the BeCreative skill for wide exploration.

Purpose

When the writer needs ideas — for characters, plot twists, world details, mystery structures, or any story element — this workflow generates multiple creative options through parallel exploration.

When to Use

- Writer says "I'm stuck" or "I need ideas for..."
- A layer in the Story Bible is sparse/empty
- Writer wants to explore "what if" scenarios
- Need fresh alternatives to avoid cliché territory
- Want to combine known-great elements in new ways

Procedure

Step : Define the Exploration Target

Identify what needs creative exploration:
- Which layer? (Character, Plot, Mystery, World, Relationships, Meaning, Prose)
- What constraints exist? (Must fit existing story, must match genre, etc.)
- How wild should it get? (Conservative variations vs. radically different approaches)

Step : Gather Context

Read relevant Story Bible sections (if they exist) to understand:
- What's already decided (constraints)
- What tone/genre the story operates in
- Which characters and plot points are fixed
- The sacred flaw and thematic direction

Step : Launch Creative Exploration

Deploy multiple approaches in parallel using Task tool agents:

Approach A: Combinatorial ExplorationSpawn -agents, each combining different known-great story elements:
```
Agent prompt: "Given these story constraints: [constraints]
Combine elements from [-reference stories] in a fresh way.
Generate ideas for [target layer].
Each idea must: be original, serve the sacred flaw, avoid the cliché list.
SLA: Return in seconds."
```

Approach B: Constraint ReversalSpawn -agents that deliberately invert expectations:
```
Agent prompt: "Given these story constraints: [constraints]
What would the OPPOSITE of the expected [layer element] be?
What if the most obvious choice is wrong?
Generate contrarian ideas that still serve the story.
SLA: Return in seconds."
```

Approach C: BeCreative Deep DiveUse the BeCreative skill for extended thinking on the most promising angle:
```
"Apply extended creative thinking to: [specific creative problem]
Consider: what hasn't been done before in [genre]?
What would make a reader say 'I've never seen that before'?
Use the full thinking budget."
```

Approach D: Cross-Genre PollinationSpawn agents that borrow from other genres/media:
```
Agent prompt: "This is a [genre] story about [premise].
What would a [different genre] storyteller bring to this?
How would a mystery writer handle the character arc?
How would a romance writer handle the political plot?
Generate cross-pollinated ideas.
SLA: Return in seconds."
```

Step : Anti-Cliché Filter

Read `AntiCliche.md` and apply the freshness checks to all generated ideas:
- Does this feel like the first thing anyone would think of?
- Has this been done in major fiction in the last years?
- Could you describe this idea using only genre tropes?

If YES to any → flag it and push for fresher alternatives.

Step : Present Options

Present the best ideas to the writer in this format:

```
Creative Exploration Results: [Target]

Option : [Evocative Name]
The idea:[-sentence description]
Why it works:[How it serves the story/theme/character]
Risk:[What could go wrong with this approach]
Freshness:[What makes this NOT the obvious choice]

Option : [Evocative Name]
[same format]

Option : [Evocative Name]
[same format]

Wild Card: [The Unexpected One]
The idea:[The most daring/unconventional option]
Why it might be genius:[The upside]
Why it might fail:[The risk]
```

Step : Iterate or Integrate

Based on writer's response:
- "I love option "→ Integrate into Story Bible, update relevant layer
- "I like parts of and "→ Combine elements, present synthesis
- "None of these work, but they made me think of..."→ The exploration did its job — capture what it triggered and integrate
- "Go deeper on option "→ Spawn more agents to develop that direction in detail

Step : Update Story Bible

After a direction is chosen:
. Update the relevant layer in the Story Bible PRD
. Create/update ISC criteria for the new elements
. Check for ripple effects on other layers (new character detail may affect plot, mystery, etc.)
. Flag any new gaps created by the change

Exploration Templates by Layer

Character Exploration
- "What if the sacred flaw was [X] instead of [Y]?"
- "What if the origin wound happened differently?"
- "What if this character's arc was negative instead of positive?"

Plot Exploration
- "What if the catalyst was [X] instead of [Y]?"
- "What if the midpoint was a false defeat instead of false victory?"
- "What if the ending was bittersweet instead of triumphant?"

Mystery Exploration
- "What if the reader thinks [X] but it's actually [Y]?"
- "What if the biggest mystery is about [character] rather than [plot event]?"
- "What are five things the reader could be wrong about?"

World Exploration
- "What unique rule/constraint would create the most interesting conflicts?"
- "What if this world's history had one key difference from the obvious?"
- "What cultural detail would most pressure the sacred flaw?"

Relationship Exploration
- "What if these two characters had [unexpected dynamic] instead of [obvious one]?"
- "Who is the unlikely ally? The surprising antagonist?"
- "What relationship would most challenge the protagonist's sacred flaw?"
