Create Sales Visual

Create a charcoal sketch visual asset for an existing sales narrative.
---

Purpose

Takes a sales narrative or value proposition and creates a matching visual asset — charcoal gestural sketch that captures the emotional core of the value proposition.

---

Process

Step : Gather Input

Requires:- Sales narrative OR value proposition summary
- Target emotional response (optional — will derive if not provided)

Step : Identify Emotional Register

If not provided, derive from the narrative:
| Value Proposition Type | Emotional Register | Warm:Cool |
|------------------------|-------------------|-----------|
| Solves painful problem| HOPE / POSSIBILITY | :|
| Prevents disaster/risk| URGENCY / WARNING | :|
| Enables new capabilities| WONDER / DISCOVERY | :|
| Saves time/effort| DETERMINATION / EFFORT | :|
| Deep expertise/insight| CONTEMPLATION | :|
| Team/collaboration| CONNECTION | :|


Step : Derive Visual Concept

Key Questions:
. What are the CONCRETE SUBJECTS?   - Human figure? AI/robot figure? Both?
   - What objects represent the product/outcome?
   - What's physically present in the scene?

. What's the VISUAL METAPHOR?   - What scene captures the transformation?
   - What would make someone "get it" instantly?
   - What's the single image that tells the story?

. What's the COMPOSITION?   - Minimalist with breathing space
   - Centered subjects floating in empty space
   - Few elements, each intentional

Step : Construct Prompt

Use the Art Skill essay-art template:
```
Sophisticated charcoal architectural sketch. [ARTIST REFERENCE] influence.

EMOTIONAL REGISTER: [From Step ]

SCENE:
[Visual concept from Step ]

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

Step : Generate Image

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output /path/to/output.png
```

Step : Validate

Check:- [ ] Visual matches the narrative emotionally
- [ ] Concrete subjects are visible
- [ ] Minimalist composition with empty space
- [ ] Charcoal sketch aesthetic (not clean vectors)
- [ ] Transparent background
- [ ] Someone could connect the visual to the value proposition

If validation fails:Regenerate with adjusted prompt.

---

Output

- PNG image with transparent background
- Charcoal gestural sketch aesthetic
- Captures the emotional core of the value proposition
- Ready for sales decks, presentations, collateral

---

The goal:A visual that makes the value proposition instantly graspable.
