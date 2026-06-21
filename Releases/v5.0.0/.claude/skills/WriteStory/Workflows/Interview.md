Interview Workflow

Extract the writer's vision, ideas, and preferences into structured input for the Story Bible.

Purpose

This is the entry point for writers who have ideas — ranging from a single character concept to years of accumulated notes — but need help structuring them into a layered narrative plan.

Procedure

Step : Consume Available Input

If the writer has provided content (text, notes, outlines, character descriptions, world details), read ALL of it first.

Extract and categorize everything into the seven layers:
- Meaning signals:What themes, lessons, or philosophical questions are present?
- Character signals:Who are the characters? What flaws, desires, fears?
- Plot signals:What events, conflicts, sequences are described?
- Mystery signals:What questions does the story raise? What's hidden?
- World signals:Setting details, rules, politics, geography?
- Relationship signals:Key bonds, rivalries, romances, mentorships?
- Prose signals:What voice/style does the writer seem to favor?

Step : Assess Completeness

For each layer, rate completeness on a scale:
- Rich(%+ fleshed out) — Writer has clear vision here
- Partial(-%) — Some ideas but gaps remain
- Sparse(< %) — Nearly empty, needs significant development
- Empty— No signal at all

Step : Interview for Missing Layers

Use AskUserQuestion to fill gaps. Interview in this priority order:

Priority : Character Change (if not rich)```
Questions to ask:
- "Who is your main character, and what is their deepest flaw —
   the thing they believe about themselves or the world that holds them back?"
- "How do you want them to be different by the end?"
- "What's the worst thing that could happen to them? (This often reveals the crisis point)"
```

Priority : Meaning (if not rich)```
Questions to ask:
- "What do you want the reader to FEEL when they finish this story?"
- "If someone asked 'what is this story about?' and you couldn't mention the plot, what would you say?"
- "What stories have made you feel the way you want your readers to feel?"
```

Priority : Plot (if not rich)```
Questions to ask:
- "What's the first big thing that happens to disrupt the main character's life?"
- "What's the climactic moment you see most clearly?"
- "How does the story end? (Even a rough sense: triumph? bittersweet? tragic?)"
```

Priority : Mystery (if not rich)```
Questions to ask:
- "What's the big question that should keep the reader turning pages?"
- "Are there secrets that characters are keeping from each other?"
- "What reveal are you most excited about?"
```

Priority : World (if sparse/empty)```
Questions to ask:
- "What kind of world is this? (Time period, technology level, magic?)"
- "What are the key power structures? (Who's in charge? Who's oppressed?)"
- "What makes this world different from every other fantasy/sci-fi world?"
```

Priority : Relationships (if sparse/empty)```
Questions to ask:
- "Who is the most important relationship for your main character?"
- "Is there a character who challenges the protagonist's worldview?"
- "Any key friendships, romances, rivalries, or mentorships?"
```

Priority : Prose/Aesthetic (if sparse/empty)```
Questions to ask:
- "What writers do you love? Whose style would you want this to feel like?"
- "Should this be funny, dark, lyrical, sparse, epic?"
- "How long do you envision this? (Short story, novel, series?)"
```

Step : Favorite Stories Analysis

Ask the writer:
```
"What are your -favorite stories (books, films, shows, games)?
For each: what specifically did you love about them?"
```

Analyze their answers to extract:
- Aesthetic preferences (what kind of prose/pacing they respond to)
- Thematic interests (what themes recur in their favorites)
- Structural patterns (do they like mysteries? epic journeys? character studies?)
- Emotional targets (do they love tragedy? triumph? bittersweet?)

Step : Ideal Reader Experience

Ask directly:
```
"Imagine someone finishes reading your story. What do you want them to feel?
Would they cry? Be blown away by a twist? Feel hope? Question everything?
Describe the IDEAL emotional reaction."
```

This answer becomes a critical ISC criterion.

Step : Scope Assessment

Based on everything gathered, assess scope:

| Scope | Length | ISC Scale | Layers Detail |
|-------|--------|-----------|--------------|
| Short Story| ,-,words | -criteria | Focused — -layers primary |
| Novella| ,-,words | -criteria | -layers active |
| Novel| ,-,words | -,criteria | All layers active |
| Epic Novel| ,-,words | ,-,criteria | All layers deep |
| Series| ,+ words total | ,-,criteria | All layers + cross-book arcs |

Use AskUserQuestion to confirm scope with the writer.

Step : Compile Structured Output

Create a structured summary organized by layer:

```markdown
Story Concept: [Working Title]

Scope: [Short Story / Novella / Novel / Series]
Aesthetic: [Primary profile + any blending]

Layer : Meaning
[Everything extracted about theme]

Layer : Character Change
Main Character
- Name: [if known]
- Sacred Flaw: [the misbelief]
- External Want: [what they pursue]
- Internal Need: [what they actually need]
- Origin Wound: [what created the flaw]
- Arc Direction: [positive/negative/flat]

[Other major characters with same structure]

Layer : Plot
[Known events, conflicts, sequences, ending]

Layer : Mystery
[Known questions, secrets, reveals]

Layer : World
[Setting, rules, politics, geography]

Layer : Relationships
[Key bonds and their dynamics]

Layer : Prose
[Style preferences, aesthetic profile, voice]

Ideal Reader Experience
[What the reader should feel at the end]

Favorite Stories Analysis
[What the writer's favorites tell us about their taste]
```

Step : Handoff

Output the structured summary and recommend next step:
- If enough detail exists for major beats → recommend BuildBibleworkflow
- If the writer wants to explore ideas further → recommend Exploreworkflow
- If they want to start writing immediately from what exists → recommend WriteChapterworkflow

Store the structured output as the foundation for the Story Bible PRD.
