Create Sales Package

Full pipeline: Transform product documentation into sales narrative + visual asset.
---

MANDATORY STEPS — EXECUTE IN ORDER

```
PRODUCT DOCUMENTATION
        ↓
[] STORY EXPLANATION — Extract narrative arc with StoryExplanation Skill
        ↓
[] EMOTIONAL REGISTER — Match to emotion from aesthetic vocabulary
        ↓
[] VISUAL CONCEPT — Derive scene from narrative + emotion
        ↓
[] GENERATE VISUAL — Create charcoal sketch with Art Skill
        ↓
[] COMPILE OUTPUT — Narrative + visual + talking points
```

---

Step : Extract Narrative with Story Explanation

Use the StoryExplanation Skill to extract the narrative arc.
```
Invoke StoryExplanation Skill with -item length for [product documentation]
```

Focus on:- What's the REAL value proposition?
- Why does this MATTER to the customer?
- What problem does this SOLVE?
- What's the transformation (before → after)?

Output:-point story explanation capturing the value proposition.

---

Step : Identify Emotional Register

Match the product/value proposition to an emotional register.

| Value Proposition Type | Emotional Register | Warm:Cool |
|------------------------|-------------------|-----------|
| Solves painful problem| HOPE / POSSIBILITY | :|
| Prevents disaster/risk| URGENCY / WARNING | :|
| Enables new capabilities| WONDER / DISCOVERY | :|
| Saves time/effort| DETERMINATION / EFFORT | :|
| Deep expertise/insight| CONTEMPLATION | :|
| Team/collaboration| CONNECTION | :|
| Replaces legacy/old way| MELANCHOLY (for old) + HOPE (for new) | :|

Output:Selected emotional register with specific vocabulary.

---

Step : Derive Visual Concept

Translate narrative + emotion into a specific visual scene.
Key Questions

. What are the CONCRETE SUBJECTS?   - Extract specific nouns from the value proposition
   - Human figure? AI/robot figure? Both?
   - What objects represent the product/outcome?

. What's the VISUAL METAPHOR?   - What scene captures the transformation?
   - What shows the value in action?
   - What would make someone "get it" instantly?

. What's the COMPOSITION?   - Minimalist with breathing space
   - Centered subjects floating in empty space
   - Few elements, each intentional

Scene Construction Template

```
VALUE PROPOSITION: [One sentence summary of what matters]
CONCRETE SUBJECTS: [Specific nouns that MUST appear visually]
VISUAL METAPHOR: [What scene captures this value?]
EMOTIONAL REGISTER: [From Step ]
WARM:COOL RATIO: [From emotion table]
```

Output:Specific visual scene that captures the value proposition.

---

Step : Generate Visual Asset

Use the Art Skill (essay-art workflow) to create the image.
Invoke Art Skill

```
Invoke Art Skill → essay-art workflow
```

Prompt Template

```
Sophisticated charcoal architectural sketch. [ARTIST REFERENCE] influence.

EMOTIONAL REGISTER: [From Step ]

SCENE:
[Visual scene from Step ]

MINIMALIST COMPOSITION:
- Subject(s) CENTERED in the frame
- Empty/negative space around — NO filled-in backgrounds
- Clean, gallery-worthy simplicity
- Supporting objects that serve the narrative (gestural, minimal)

CONCRETE SUBJECTS:
[List specific subjects that MUST appear]

HUMAN FIGURE — GESTURAL ABSTRACTED SKETCH:
- MULTIPLE OVERLAPPING LINES suggesting the form
- Quick, confident, ENERGETIC gestural marks
- Burnt Sienna (B) WASH accent touches

[If AI/tech figure:]
ROBOT/TECH FIGURE — GESTURAL ANGULAR SKETCH:
- Angular rigid gestural marks
- Deep Purple (AC) WASH accent touches

LINEWORK:
- Loose charcoal/graphite pencil strokes
- Visible hatching and gestural marks
- NOT clean vectors, NOT smooth

COLOR — CHARCOAL DOMINANT:
- CHARCOAL AND GRAY DOMINANT — %
- Sienna accents on human elements
- Purple accents on tech elements
- Background is EMPTY — white/cream negative space
- Transparent background

CRITICAL:
- MINIMALIST composition
- Visual captures the VALUE PROPOSITION
- Gallery-worthy gestural sketch aesthetic

Sign {DA_IDENTITY.NAME} small in charcoal bottom right.
NO other text.
```

Generate with CLI

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output /path/to/output.png
```

Output:Charcoal sketch visual asset with transparent background.

---

Step : Compile Sales Package

Assemble the complete output.
Output Format

```markdown
Sales Package: [Product/Feature Name]

Sales Narrative

[-point story explanation from Step ]

Visual Asset

[Image path or embedded image]

Key Talking Points

. [First major value point]
. [Second major value point]
. [Third major value point]

Emotional Hook

Register:[Emotional register used]
Core Message:[One sentence that captures the feeling]

Script Snippet

"[-sentence elevator pitch version of the narrative]"
```

---

Validation Checklist

Before delivering:

- [ ] Narrative captures VALUE— not just features, but why it matters
- [ ] Visual matches narrative— someone could connect them
- [ ] Emotional register consistent— narrative and visual aligned
- [ ] Talking points actionable— sales team can use immediately
- [ ] Script is natural— sounds like something you'd actually say

---

Example Execution

Input:Documentation for AI code review tool

Step Output (Narrative):. Code review is broken — PRs get rubber-stamped
. Junior devs miss subtle bugs, seniors don't have time
. This tool understands your codebase like a -year veteran
. It catches the issues that slip through human review
. Not pattern matching — actual understanding of your patterns
. Learns your specific conventions and flags deviations
. Integrates into existing workflow — no context switching
. Result: fewer production bugs, faster reviews, happier teams

Step Output:WONDER / DISCOVERY (:warm:cool) — "it actually understands"

Step Output:- VALUE: AI that understands code like a senior engineer
- SUBJECTS: Human developer + AI figure, both examining code
- METAPHOR: Two figures producing the same insight — you can't tell who caught the bug
- COMPOSITION: Minimalist, centered, code/output flowing between them

Step Output:Charcoal sketch of human and AI both examining same code output

Step Output:Complete sales package with narrative, visual, talking points, and script

---

The workflow: Story Explanation → Emotion → Visual Concept → Generate → Compile