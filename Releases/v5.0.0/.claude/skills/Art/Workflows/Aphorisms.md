Visual Aphorisms & Quote Cards Workflow

Aphorisms as shareable visual quote cards using editorial aesthetic.
---

Creates VISUAL APHORISM CARDS— insights and quotes as shareable square images with massive typography and minimal hand-drawn accents.

---

Purpose

Visual aphorism cards turn memorable one-liners into shareable social media content. These are typographic statements with personality— the quote IS the visual, with subtle editorial accents.

Use this workflow for:- Social media quote cards (LinkedIn, Instagram, X)
- Newsletter pull quotes
- Aphorisms as standalone images
- Thought leadership visuals
- "HUMANS NEED ENTROPY" style statements
- Memorable insights amplified visually

---

Visual Aesthetic: Typography as Hero

Think:Giant bold typography with subtle hand-drawn accent, not full illustration

Core Characteristics
. Typography dominant— The quote IS the visual (-% of image)
. Massive Advocate— All-caps bold lettering fills the frame
. Minimal illustration— Small subtle accent element (not full scene)
. Square format— :for social media
. High contrast— Black text on light, or white text on dark
. Hand-lettered quality— Imperfect typography, not digital font
. Editorial voice— Punchy, memorable, thought-provoking

---

Color System for Aphorisms

Typography
```
Black — Primary text (most common)
OR
Deep Purple AC — Full text in brand color (alternative)
OR
White FFFFFF — Text on dark background (high contrast)
```

Accent Element
```
Deep Purple AC — Small accent illustration
Deep Teal B — Alternative accent color
```

Background
```
Light Cream FED— Warm neutral (most common)
OR
White FFFFFF — Clean modern
OR
Black — Dark dramatic (white text)
OR
Deep Purple AC — Bold brand (white text)
```

Color Strategy
- High contrast typography— Text must be immediately readable
- Minimal color— Quote + small accent, not busy
- Brand presence— Purple somewhere (text OR accent OR background)

---

MANDATORY WORKFLOW STEPS

Step : Select Aphorism

Choose the quote:
. What's the aphorism?   - The exact quote
   - Must be punchy and memorable
   - Ideal length: -words (fits large on card)

. What's the insight?   - What makes this quote powerful
   - Why is it shareable

. What tiny visual accent supports it?   - NOT a full illustration
   - Small simple element reinforcing the idea
   - Examples: scatter dots for entropy, em dash for typography quote

Output:```
APHORISM: "[Quote in all-caps]"
LENGTH: [X words]

INSIGHT: [Why this quote resonates]

ACCENT ELEMENT: [Tiny illustration, e.g.:]
- "scatter of dots" for entropy
- "em dash symbol" for typography topic
- "lightning bolt" for insight moment
- "simple line drawing" reinforcing concept
```

---

Step : Design Typography Layout

Plan the visual:
. Typography arrangement:   - All one line (short quote)
   - Multiple lines (longer quote)
   - Stacked words (vertical emphasis)
   - Asymmetric layout (dynamic placement)

. Size and weight:   - How large can text go while remaining readable
   - Line breaks for rhythm and emphasis
   - Word hierarchy (which words largest)

. Accent placement:   - Where does small illustration go
   - How does it complement (not compete with) text
   - Size: -% of image area

Output:```
TYPOGRAPHY LAYOUT:
[Describe arrangement, e.g.:]
- "HUMANS NEED" on first line
- "ENTROPY" on second line (larger)
- All-caps Advocate style, massive bold letters
- Fills % of image area
- Hand-lettered imperfection

ACCENT ELEMENT:
- Small scatter of dots (entropy visual)
- Purple (AC) colored
- Position: Bottom right corner
- Size: ~% of image
- Does NOT compete with text

COLOR SCHEME:
- Text: [Black / Purple / White]
- Background: [Cream / White / Black / Purple]
- Accent: [Purple / Teal]
- Signature: Charcoal (optional)
```

---

Step : Construct Prompt

Prompt Template

```
Typographic quote card in editorial hand-lettered style.

STYLE REFERENCE: Bold typography poster, quote card, hand-lettered aphorism

BACKGROUND: [Light Cream FED/ White FFFFFF / Black / Purple AC] — flat, solid

AESTHETIC:
- Typography as the primary visual (dominates composition)
- Hand-lettered Advocate style (imperfect, gestural, bold)
- Massive scale lettering (fills -% of frame)
- Minimal accent illustration (subtle, not competing)
- High contrast for readability
- Square :format

QUOTE CARD STRUCTURE:

TYPOGRAPHY (Advocate Block Display - MASSIVE):
"[APHORISM TEXT IN ALL-CAPS]"

- Font: Advocate style extra bold, hand-lettered, all-caps
- Size: MASSIVE — fills most of image area
- Layout: [Single line / Multi-line / Stacked words]
- Line breaks: [Where breaks occur for rhythm]
  Line : "[FIRST PART]"
  Line : "[SECOND PART]" (optionally larger)
- Color: [Black / Purple AC / White FFFFFF]
- Style: Hand-lettered with imperfections (not perfect digital font)
- Variable letter sizing for emphasis
- Letters should have character and personality

ACCENT ILLUSTRATION (Minimal):
- [Small simple element, e.g., "scattered dots", "small em dash", "lightning bolt"]
- Hand-drawn, simple, editorial style
- Position: [Bottom right / Top left / etc. — does NOT interfere with text]
- Size: -% of image area
- Color: [Purple AC / Teal B]
- Style: Imperfect sketch quality, matches text aesthetic
- Purpose: Subtle visual reinforcement, NOT competing focal point

COLOR USAGE:
- Background: [Color choice] — flat solid fill
- Typography: [Color choice] — high contrast with background
- Accent element: [Purple or Teal]
- Signature: Charcoal (DDD) small in corner (optional)

CRITICAL REQUIREMENTS:
- Typography is HERO (quote fills -% of frame)
- Hand-lettered quality (wobbly lines, imperfect character shapes)
- NOT a digital font — should feel hand-drawn
- Accent illustration MINIMAL (does not distract from quote)
- High contrast readability (text must pop from background)
- Square :aspect ratio
- No gradients, flat colors only
- Shareable social media quality

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Determine Aspect Ratio

Always :(square)— Optimized for social media (Instagram, LinkedIn, X)

---

Step : Execute Generation

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output /path/to/aphorism.png
```

Model Recommendation:nano-banana-pro (best text rendering) or flux (stylistic variety)

Immediately Open:```bash
open /path/to/aphorism.png
```

---

Step : Validation (MANDATORY)

Must Have
- [ ] Quote readable— Instantly legible even at thumbnail size
- [ ] Typography dominant— Quote is -% of visual
- [ ] Hand-lettered— Imperfect, gestural quality (not digital font)
- [ ] High contrast— Text pops from background
- [ ] Minimal accent— Small element supports, doesn't compete
- [ ] Shareable— Works as social media post
- [ ] Brand presence— Purple visible somewhere (text/accent/background)

Must NOT Have
- [ ] Perfect digital font (should be hand-lettered)
- [ ] Busy background or complex illustration
- [ ] Low contrast (can't read text easily)
- [ ] Accent element competing with quote
- [ ] Tiny text (must be readable at thumbnail)
- [ ] Gradients or shadows

If Validation Fails

| Problem | Fix |
|---------|-----|
| Text too small | "MASSIVE hand-lettered typography filling % of frame" |
| Looks like digital font | "Hand-drawn Advocate letters, imperfect wobbly strokes, gestural quality" |
| Accent too busy | "MINIMAL accent: small simple [element], % of image, subtle" |
| Can't read thumbnail | Increase text size, stronger contrast, simplify layout |
| No brand presence | "Purple (AC) on [accent element / text / background]" |
| Too complex | "Typography IS the visual — quote dominant, minimal everything else" |

---

Example Use Cases

Example : "HUMANS NEED ENTROPY"
- Typography:Two lines, "ENTROPY" larger
- Accent:Small scatter of purple dots (bottom right)
- Background:Light cream
- Text:Black
- Use:LinkedIn post, newsletter pull quote

Example : "THE EM DASH IS PERFECT"
- Typography:Stacked words, "EM DASH" emphasized
- Accent:Small purple em dash symbol
- Background:White
- Text:Black
- Use:X post about typography

Example : "AI COPIES HUMAN CREATIVITY"
- Typography:Three lines, "AI" and "CREATIVITY" larger
- Accent:Tiny robot hand + human hand (purple, minimal)
- Background:Black
- Text:White (high contrast)
- Use:Instagram thought leadership post

Example : "SECURITY IS A FEELING"
- Typography:Two lines
- Accent:Small purple shield with heart
- Background:Purple AC
- Text:White
- Use:Bold brand statement

---

Quick Reference

Aphorism Card Formula:```
. Select aphorism (punchy quote, -words ideal)
. Design typography layout (arrangement, emphasis, size)
. Choose minimal accent element (-% of image)
. Construct prompt with massive typography
. Always use :square aspect ratio
. Generate with nano-banana-pro
. Validate for readability and shareability
```

Color Strategy:- High contrast: Black text on cream, or white text on black/purple
- Brand presence: Purple somewhere in composition
- Minimal palette: Quote + accent + background = colors max

Key Principle:- Typography IS the visual— Everything else is subtle support
- Shareable, memorable, instantly readable
- Your voice amplified visually

---

The workflow: Select → Design → Construct → Generate → Validate → Complete