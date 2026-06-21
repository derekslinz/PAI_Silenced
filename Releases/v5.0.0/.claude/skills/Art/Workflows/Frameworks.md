Visual Mental Models & Frameworks Workflow

Hand-drawn frameworks, mental models, and conceptual diagrams using UL aesthetic.
---

Creates VISUAL FRAMEWORKS— signature mental models illustrated as memorable diagrams with editorial hand-drawn style.

---

Purpose

Visual frameworks illustrate mental models, thinking frameworks, and conceptual relationships. These are signature frameworksmade visual — xmatrices, Venn diagrams, conceptual maps with personality and editorial style.

Use this workflow for:- xmatrices and quadrant models
- Venn diagrams with editorial flair
- Conceptual relationship maps
- "The [Your Name] Framework for X"
- Mental models and thinking tools
- Decision frameworks

---

Visual Aesthetic: Structured Concepts with Editorial Style

Think:Smart conceptual diagram, but hand-drawn and visually interesting

Core Characteristics
. Clear structure— Framework shape is recognizable (x, Venn, pyramid, etc.)
. Hand-drawn organic— Imperfect lines, wobbly circles, human touch
. Editorial aesthetic— Flat colors, black linework, UL palette
. Labels integrated— Typography part of visual design
. Conceptual clarity— Framework immediately understandable
. Memorable visual— Becomes THE reference image for this framework
. Thoughtful color— Strategic use of purple/teal to show relationships

---

Color System for Frameworks

Structure
```
Black — All framework structure (axes, circles, boxes)
```

Concept Differentiation
```
Deep Purple AC — Concept area or optimal quadrant
Deep Teal B — Concept area or contrast quadrant
Charcoal DDD — All text and labels
```

Background
```
White FFFFFF or Light Cream FED```

Color Strategy
- Framework lines/structure in black
- Purple for "ideal" or primary concept
- Teal for "secondary" or contrast concept
- Subtle fills or accents, not solid color blocks

---

MANDATORY WORKFLOW STEPS

Step : Define Framework Structure

Identify the mental model:
. What framework type?   - xmatrix (four quadrants)
   - Venn diagram (overlapping circles)
   - Pyramid/hierarchy
   - Spectrum/continuum
   - Triangle (three-way balance)
   - Other conceptual shape

. What are the dimensions/concepts?   - For x: X-axis concept, Y-axis concept
   - For Venn: Circle concept, Circle concept, overlap meaning
   - For pyramid: Levels from bottom to top

. What are the quadrants/areas/zones?   - Name and describe each region
   - Which is "optimal" or most important?

Output:```
FRAMEWORK TYPE: [xMatrix / Venn Diagram / Pyramid / etc.]

FRAMEWORK NAME: "The [Your Name] Framework for [Topic]"

DIMENSIONS:
- X-axis: [Concept] (Low → High)
- Y-axis: [Concept] (Low → High)

QUADRANTS/AREAS:
. [Name]: [Description] — [Color if highlighted]
. [Name]: [Description] — [Color if highlighted]
. [Name]: [Description]
. [Name]: [Description]

OPTIMAL ZONE: [Which quadrant/area is ideal]
```

---

Step : Design Framework Visual

Plan the visual representation:
. Framework geometry:   - How large is each element
   - Proportions and spacing
   - Symmetry or intentional asymmetry

. Labeling strategy:   - Where axis labels go
   - Where quadrant names go
   - Additional annotations

. Color assignment:   - Which quadrant gets purple (optimal)
   - Which gets teal (contrast or secondary)
   - Rest remain black/white

Output:```
VISUAL STRUCTURE:
[Describe the framework shape, e.g.:]
- Two intersecting axes forming four quadrants
- X-axis labeled [left] to [right]
- Y-axis labeled [bottom] to [top]
- Each quadrant labeled with concept name

COLOR CODING:
- Top-right quadrant (optimal): Purple AC accent
- Bottom-left quadrant (contrast): Teal B accent
- Other quadrants: Black structure only

TYPOGRAPHY PLACEMENT:
- Title (Tier ): Top center
- Axis labels (Tier ): Along axes
- Quadrant labels (Tier ): Inside each quadrant
- Annotations (Tier ): Strategic notes on key quadrants
```

---

Step : Construct Prompt

Prompt Template

```
Hand-drawn conceptual framework diagram in editorial style.

STYLE REFERENCE: Mental model illustration, conceptual diagram with personality, smart person's framework sketch

BACKGROUND: [White FFFFFF OR Light Cream FED] — clean, flat

AESTHETIC:
- Hand-drawn framework structure (wobbly lines, organic shapes)
- Variable stroke weight (axes thicker, details thinner)
- Imperfect but intentional geometry (circles not perfect, axes slightly wavy)
- Editorial flat color with strategic purple/teal accents
- Clear conceptual structure with human touch

FRAMEWORK TYPE: [xMatrix / Venn Diagram / Pyramid / Spectrum / etc.]

FRAMEWORK STRUCTURE:
[Describe the specific framework geometry, e.g.:]
- Two hand-drawn perpendicular axes (black) forming cross
- X-axis: [Low concept] on left → [High concept] on right
- Y-axis: [Low concept] on bottom → [High concept] on top
- Four quadrants created by intersection

TYPOGRAPHY SYSTEM (-TIER):

TIER - FRAMEWORK TITLE (Advocate Block Display):
- "[FRAMEWORK NAME IN ALL-CAPS]"
- Font: Advocate style, extra bold, hand-lettered, all-caps
- Size: x larger than body text
- Color: Black - Position: Top center
- Example: "THE SECURITY VS CONVENIENCE FRAMEWORK"

TIER - LABELS & CONCEPTS (Concourse Sans):
- Axis labels: "[X-axis concept]", "[Y-axis concept]"
- Quadrant names: "[Quadrant ]", "[Quadrant ]", etc.
- Font: Concourse geometric sans-serif
- Size: Medium readable
- Color: Charcoal DDD
- Position: Along axes and inside quadrants

TIER - ANNOTATIONS (Advocate Condensed Italic):
- Insight notes: "optimal zone", "avoid this quadrant"
- Font: Advocate condensed italic
- Size: % of Tier - Color: Purple AC or Teal B for emphasis
- Position: Near relevant quadrants/areas

QUADRANTS/AREAS TO SHOW:
[List each region with description, e.g.:]

TOP-RIGHT QUADRANT:
- Label: "[Name]"
- Description: [What this represents]
- Color: Purple (AC) subtle accent/highlight — OPTIMAL ZONE
- Annotation: "ideal state" in purple italic

TOP-LEFT QUADRANT:
- Label: "[Name]"
- Description: [What this represents]
- Color: Black structure only

BOTTOM-RIGHT QUADRANT:
- Label: "[Name]"
- Description: [What this represents]
- Color: Teal (B) subtle accent — CONTRAST ZONE

BOTTOM-LEFT QUADRANT:
- Label: "[Name]"
- Description: [What this represents]
- Color: Black structure only

[Adjust based on framework type - Venn would describe circles, pyramid would describe levels, etc.]

COLOR USAGE:
- Black () for all framework structure (axes, circles, lines)
- Deep Purple (AC) for [optimal zone] — subtle fill or accent
- Deep Teal (B) for [contrast zone] — subtle accent
- Charcoal (DDD) for all text except emphasized annotations

CRITICAL REQUIREMENTS:
- Hand-drawn imperfect geometry (NOT digital precision)
- Framework structure immediately recognizable
- Clear labels in -tier typography hierarchy
- Strategic color on -key zones only (subtle, not solid fills)
- No gradients, flat colors only
- Editorial illustration aesthetic maintained
- Conceptually clear and memorable

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Determine Aspect Ratio

| Framework Type | Aspect Ratio | Reasoning |
|----------------|--------------|-----------|
| xMatrix | :| Square for balanced quadrants |
| Venn Diagram | :| Square for circular symmetry |
| Pyramid | :or :| Vertical emphasis |
| Horizontal spectrum | :| Wide for left-right continuum |
| Triangle | :| Balanced for three concepts |

Default: :(square)— Works for most framework types

---

Step : Execute Generation

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output /path/to/framework.png
```

Model Recommendation:nano-banana-pro (best text rendering for labels)

Immediately Open:```bash
open /path/to/framework.png
```

---

Step : Validation (MANDATORY)

Must Have
- [ ] Framework structure clear— x/ Venn / Pyramid immediately recognizable
- [ ] Readable labels— All text legible in -tier hierarchy
- [ ] Hand-drawn aesthetic— Imperfect lines, organic shapes, human quality
- [ ] Strategic color— Purple on optimal zone, teal on contrast, not everywhere
- [ ] Conceptually memorable— This becomes THE reference image for framework
- [ ] Editorial style— Maintains UL flat color, black linework aesthetic

Must NOT Have
- [ ] Perfect digital geometry (too clean)
- [ ] Illegible or cluttered text
- [ ] Color overload (solid fills everywhere)
- [ ] Confusing structure (can't identify framework type)
- [ ] Corporate/boring diagram look
- [ ] Gradients or shadows

If Validation Fails

| Problem | Fix |
|---------|-----|
| Too precise/digital | "Hand-drawn wobbly axes, organic imperfect circles, human sketch quality" |
| Text unreadable | Increase label sizes, simplify annotations |
| Over-colored | "Subtle purple accent on optimal zone only, rest black structure" |
| Confusing structure | Simplify framework, stronger geometry cues |
| Looks corporate | Reference "editorial conceptual illustration, Saul Steinberg style" |
| Not memorable | Add strategic annotation showing the insight: "this is the sweet spot" |

---

Example Use Cases

Example : "Security vs Convenience Framework"
- Type:xmatrix
- Axes:Security (low → high), Convenience (low → high)
- Quadrants:Vulnerable, Fortress, Balanced (purple), Abandoned
- Color:Purple on "Balanced" optimal quadrant
- Aspect::
Example : "Human .Capability Venn"
- Type:Venn diagram (circles)
- Circles:Human abilities, AI capabilities, Tools
- Overlap:Where magic happens (purple)
- Color:Purple on center overlap
- Aspect::
Example : "Threat Modeling Pyramid"
- Type:Pyramid (levels)
- Levels:Assets (bottom) → Threats → Vulnerabilities → Mitigations (top)
- Color:Purple on top level (actions), teal on bottom (foundation)
- Aspect::
---

Quick Reference

Framework Formula:```
. Define framework structure (type, dimensions, quadrants)
. Design visual (geometry, labeling, color assignment)
. Construct prompt with clear structure
. Choose square aspect ratio (usually :)
. Generate with nano-banana-pro
. Validate for clarity and memorability
```

Color Strategy:- Framework structure: Black
- Optimal zone: Purple (subtle accent)
- Contrast zone: Teal (subtle accent)
- Text: Charcoal (except emphasized annotations)

Key Principle:- This becomes THE reference image people remember for this framework
- Must be conceptually clear AND visually distinctive

---

The workflow: Define → Design → Construct → Generate → Validate → Complete