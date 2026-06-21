Illustrated Statistics Workflow

Single striking statistics illustrated as visual data points using UL aesthetic.
---

Creates ILLUSTRATED STAT CARDS— one number/statistic made visual with simple illustration and editorial style.

---

Purpose

Illustrated statistics turn data points into memorable visuals. These are single-stat cards— one striking number with a small illustration showing what it means, designed for newsletters and social media.

Use this workflow for:- Newsletter "by the numbers" sections
- Social media stat cards
- Quick visual facts
- Data highlights
- "% of developers use AI daily" style visuals
- Attention-grabbing numbers

---

Visual Aesthetic: Number + Tiny Context Illustration

Think:Bold number dominates, small illustration shows what it means

Core Characteristics
. Number dominant— The statistic is the hero (-% of visual)
. Massive typography— Large bold number immediately visible
. Small illustration— Tiny visual showing what stat represents (-%)
. Context text— Brief description of what number means
. Hand-drawn— Imperfect number rendering, editorial illustration
. Square or horizontal— Social/newsletter friendly
. Scannable— Number jumps out immediately

---

Color System for Stats

Number Typography
```
Deep Purple AC — Primary number (most common)
OR
Black — Alternative bold number
```

Illustration
```
Black — Small illustration linework
Deep Purple AC — Accents on illustration
Deep Teal B — Alternative accents
```

Background
```
Light Cream FED— Warm neutral
OR
White FFFFFF — Clean modern
```

Text
```
Charcoal DDD — Context description text
```

Color Strategy
- Number in purple (brand emphasis) or black (classic)
- Illustration primarily black with purple accents
- Background light for contrast
- Keep it simple: -colors total

---

MANDATORY WORKFLOW STEPS

Step : Select Statistic

Identify the data point:
. What's the statistic?   - The exact number and metric
   - Must be striking or surprising

. What does it represent?   - Context explanation
   - Why it matters

. What tiny illustration shows it?   - Simple visual representing what stat measures
   - Not complex scene, just small icon/illustration
   - Should clarify or amplify the meaning

Output:```
STATISTIC: [Number + unit, e.g., "%", "$.B", ".X"]
METRIC: [What's being measured]

CONTEXT: [What this number represents]

ILLUSTRATION: [Small visual element, e.g.:]
- "Tiny developer at computer" for developer stat
- "Stack of coins" for money stat
- "Growing arrow" for growth stat
- Size: -% of image, simple, not detailed
```

---

Step : Design Stat Card Layout

Plan the visual:
. Number placement:   - Center dominant (number in middle)
   - Left number, right illustration
   - Top number, bottom illustration

. Number size:   - How large can it go
   - Should fill -% of image height

. Illustration placement:   - Where relative to number
   - How it interacts with number (near, below, beside)

. Text placement:   - Metric description above or below number
   - Context note if needed

Output:```
LAYOUT STRUCTURE:
- Number: [Placement, e.g., "Center dominant"]
- Size: [% of image height]
- Illustration: [Placement, e.g., "Bottom right, % of image"]
- Metric text: [Above number]
- Context: [Below number in smaller text]

VISUAL RELATIONSHIP:
[How number and illustration interact, e.g.:]
- "%" in massive purple
- Small illustrated developer sitting on top of "%" symbol
- Text above: "of developers"
- Text below: "use AI tools daily"

COLOR SCHEME:
- Number: Purple (AC)
- Illustration: Black linework with purple accents
- Background: Light cream
- Text: Charcoal
```

---

Step : Construct Prompt

Prompt Template

```
Illustrated statistic card in editorial style.

STYLE REFERENCE: Data visualization, stat card, number + icon illustration

BACKGROUND: [Light Cream FED/ White FFFFFF] — flat, clean

AESTHETIC:
- Number as dominant visual element (massive typography)
- Small simple illustration providing context
- Hand-drawn imperfect number rendering (not digital font)
- Editorial flat color with strategic purple emphasis
- Scannable, immediate impact

STAT CARD STRUCTURE:

NUMBER TYPOGRAPHY (Advocate Block Display - MASSIVE):
"[STATISTIC]"

- Font: Advocate style extra bold, hand-lettered
- Size: MASSIVE — -% of image area
- Color: [Deep Purple AC / Black ]
- Style: Hand-lettered with imperfections (wobbly lines, character)
- Position: [Center / Left / Top]
- Example: "%" in giant purple hand-lettered numbers

METRIC TEXT (Concourse Sans - Medium):
"[what the stat measures]"

- Font: Concourse geometric sans-serif
- Size: Medium readable (-% of number size)
- Color: Charcoal (DDD)
- Position: [Above / Below number]
- Example: "of developers" above the %

CONTEXT TEXT (Advocate Condensed - Small):
"[additional context]"

- Font: Advocate condensed
- Size: Small (-% of number size)
- Color: Charcoal (DDD)
- Position: [Below number / Bottom of card]
- Example: "use AI tools daily" below the number

ILLUSTRATION (Small, Simple):
[Describe the tiny illustration, e.g.:]
- Small hand-drawn [icon/figure]
- Hand-drawn black () linework
- Purple (AC) accents on [specific elements]
- Position: [Bottom right / Next to number / etc.]
- Size: -% of image area
- Style: Simple sketch, not detailed
- Represents: [What the stat is about]
- Example: "Tiny developer sitting at computer with code on screen"

VISUAL INTERACTION:
[How illustration and number relate, e.g.:]
- Illustration positioned [near/on/beside] the number
- Creates visual story: "Developer represents the %"
- Illustration does NOT compete with number (stays small)

COLOR USAGE:
- Number: Deep Purple (AC) OR Black ()
- Illustration linework: Black ()
- Illustration accents: Purple (AC) OR Teal (B)
- Metric/context text: Charcoal (DDD)
- Background: Light Cream (FED) OR White (FFFFFF)

CRITICAL REQUIREMENTS:
- Number is HERO (dominates composition, -%)
- Hand-lettered number quality (NOT digital font)
- Illustration SMALL and SIMPLE (supporting role, -%)
- High contrast for readability
- Strategic purple emphasis (number OR illustration accents)
- No gradients, flat colors only
- Immediately scannable (number jumps out at thumbnail)
- Square :or horizontal :format

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Determine Aspect Ratio

| Use Case | Aspect Ratio | Reasoning |
|----------|--------------|-----------|
| Social media post | :| Instagram/LinkedIn friendly |
| Newsletter inline | :| Horizontal fits email width |
| Vertical mobile | :| Instagram story format |
| Balanced | :| Works everywhere |

Default: :(square)— Most versatile for social/newsletter

---

Step : Execute Generation

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output /path/to/stat-card.png
```

Model Recommendation:nano-banana-pro (excellent for rendering numbers clearly)

Immediately Open:```bash
open /path/to/stat-card.png
```

---

Step : Validation (MANDATORY)

Must Have
- [ ] Number dominant— Statistic is -% of visual, immediately visible
- [ ] Readable number— Clear even at thumbnail size
- [ ] Hand-lettered— Imperfect, gestural quality (not digital font)
- [ ] Illustration simple— Small supporting visual, not complex scene
- [ ] Context clear— Metric/context text explains what number means
- [ ] High contrast— Purple or black number pops from background
- [ ] Scannable— Number jumps out immediately

Must NOT Have
- [ ] Number too small (should dominate)
- [ ] Digital font rendering (should be hand-lettered)
- [ ] Complex detailed illustration (should be simple icon)
- [ ] Illustration competing with number
- [ ] Low contrast (can't read number)
- [ ] Missing context (unclear what stat represents)

If Validation Fails

| Problem | Fix |
|---------|-----|
| Number too small | "MASSIVE hand-lettered number filling % of image height" |
| Looks digital | "Hand-drawn Advocate style number, wobbly imperfect strokes" |
| Illustration too complex | "SMALL SIMPLE illustration, minimal detail, % of image size" |
| Can't read thumbnail | Increase number size, stronger contrast |
| Unclear meaning | Add metric text above: "of [X]", context below: "[what they do]" |
| No visual interest | "Small illustrated [icon] showing what stat represents" |

---

Example Use Cases

Example : "% of developers use AI daily"
- Number:"%" in massive purple hand-lettering
- Metric:"of developers" above number
- Context:"use AI tools daily" below
- Illustration:Tiny developer at computer with AI sparkles (bottom right, %)
- Aspect::
Example : "$.B invested in AI safety"
- Number:"$.B" in giant black hand-lettering
- Metric:"invested in" above
- Context:"AI safety research" below
- Illustration:Small stack of coins with shield symbol (purple accents)
- Aspect::
Example : ".X growth in AI adoption"
- Number:".X" in massive purple
- Metric:"growth in" above
- Context:"enterprise AI adoption" below
- Illustration:Upward arrow with small building icon
- Aspect::(horizontal for newsletter)

Example : "% of security breaches involve humans"
- Number:"%" in black bold hand-lettering
- Metric:"of breaches" above
- Context:"involve human error" below
- Illustration:Tiny person with open door/lock symbol (purple accents)
- Aspect::
---

Quick Reference

Illustrated Stat Formula:```
. Select statistic (number, metric, context)
. Design layout (number dominant, illustration placement)
. Choose simple illustration (what stat represents)
. Construct prompt with massive number
. Use :square aspect ratio (usually)
. Generate with nano-banana-pro
. Validate for dominance and readability
```

Color Strategy:- Number: Purple (emphasis) or Black (classic)
- Illustration: Black linework + purple accents
- Text: Charcoal
- Background: Light cream or white

Key Principle:- Number IS the visual— Illustration is small supporting context
- Immediate impact, scannable at thumbnail
- Context makes meaning clear

---

The workflow: Select → Design → Construct → Generate → Validate → Complete