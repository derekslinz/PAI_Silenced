Technical Diagram Workflow

Clean Excalidraw-style technical diagrams with custom typography aesthetic.
---

Purpose

Technical diagrams for system architectures, process flows, and board presentations.

Use for:Architecture diagrams, process flows, pipelines, infrastructure maps, board presentations.

---

Visual Aesthetic

Style:Clean Excalidraw diagrams — professional, approachable, no grid background.

Core Rules

. Excalidraw style— Clean lines, slightly organic, professional
. Pure sepia EAEDF background— NO grid lines, NO texture, NO decorations
. Custom fonts— Specific typography hierarchy (see below)
. Strategic color— Purple AC for key elements, Teal B for flows
. White primary— % of elements in grey/black colors, color is accent only

MANDATORY: BOLD / HIGH-CONTRAST / SATURATED 
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
️  Nano Banana Pro DEFAULTS to thin/pastel — REJECTED by the user. ️
️  You MUST push the prompt HARD for bold, saturated, crisp.     ️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Every technical-diagram prompt MUST repeat the following directives (multiple times if needed) or the output will come back bleached and rejected:

- BOLD BLACK INK(or near-black) for primary linework — like a thick drafting pen or black sharpie, NOT a light pencil
- DEEP SATURATED royal purple AC— must read as rich royal purple, NOT lilac, NOT lavender, NOT pastel
- DEEP SATURATED teal B— rich teal, NOT pale seafoam, NOT washed blue-green
- HIGH CONTRASTbetween ink and cream paper — the image should feel CRISP, not soft
- LARGE BOLD UPPERCASE labels— must be readable at thumbnail size without squinting
- THICK, CONFIDENT arrowheads— no hesitation, no faint lines
- Professional technical illustration quality— Tufte precision, architect's drafting plate, NOT a rough student sketch
- Hand-drawn imperfection is OK but strokes MUST be BOLD and DELIBERATE, never thin and uncertain
- Explicitly rejectthe words "light", "faint", "pastel", "thin", "sketchy", "rough" from the prompt — they bias the model toward washed-out output

When a diagram comes back bleached, thin, or pastel: regenerate immediately with stronger directives. For stubborn cases, switch to `--model flux` — Flux tends to produce crisper, more finished technical illustration than nano-banana-pro.

Title/Subtitle Rule

The workflow template below includes a title + subtitle block. Override this when the diagram is being used as a blog header where the page already has the title.For blog headers specifically, remove the title and subtitle from the prompt entirely — the image is visual only. For standalone diagrams (slides, presentations, social images), include title + subtitle as the template specifies.

Example image
Ignore for now
~/.claude/skills/Art/WorkflowExamples/TechnicalDiagrams/example.png

---

Typography System (Butterick Fonts)

Three font families with specific visual characteristics:
TIER : Headers & Subtitles — Valkyrie Serif

Valkyrie characteristics for AI prompt:- Elegant serif with wedge-shaped serifs (like Palatino but more refined)
- High stroke contrast (thick/thin variation)
- Sophisticated, warm, readable
- NOT generic serif — specifically elegant wedge serifs

Header (Main Title):- Font: Elegant wedge-serif italic (Valkyrie-style)
- Size: Medium-large, -x body text
- Style: Italic, title case
- Color: Black - Position: Top-left of image, left-justified

Subtitle:- Font: Elegant wedge-serif regular (Valkyrie-style)
- Size: Smaller, .x body text
- Style: Regular (not italic), sentence case, no period at the end
- Color: Charcoal DDD
- Position: Below header, left-justified

---

TIER : Labels — Concourse TGeometric Sans

Concourse Tcharacteristics for AI prompt:- Geometric sans-serif (like Avenir/Futura but warmer)
- Clean, technical, precise
- Even stroke weight
- Professional, no-nonsense
- NOT generic sans — specifically geometric with slight warmth

Usage:- Box labels, node names, technical identifiers
- Size: Medium, readable
- Color: Charcoal DDD or Black - Examples: "API Gateway", "Database", "Services"

---

TIER : Insights — Advocate Condensed Italic

Advocate characteristics for AI prompt:- Condensed italic sans-serif
- Sporty, editorial feel (like sports jerseys or magazine callouts)
- Narrow letter spacing, italic slant
- Voice-forward, attention-grabbing
- NOT generic italic — specifically condensed sporty italic

Usage:- Key insights, commentary, callouts
- Size: Smaller, -% of labels
- Color: Purple AC (primary) or Teal B
- Style: Always italic, always asterisks around text
- Examples: "this is the bottleneck", "critical path"

---

Color Palette

```
Sepia EAEDF      - Background
Purple AC     — Key components, insights (%)
Teal B       — Flows, connections (%)
Charcoal DDD   — Text, labels (%)
White FFFFFF      — Primary Structure
```

---

Composition construction

Create a consistent, styled technical diagram using ALL of the styling guidelines here.

BACKGROUND: Pure Black — absolutely NO grid lines, NO texture, completely clean black.

STYLE: Architect aesthetic — like an architect artist did it on the whiteboard

TYPOGRAPHY (CRITICAL - use these exact font styles):

HEADER: Elegant wedge-serif italic font (like Palatino but more refined, with distinctive wedge-shaped serifs and high stroke contrast). Large size, black color, top-left position, title case.

SUBTITLE: Same elegant wedge-serif but regular weight (not italic). Smaller size, charcoal DDD color, directly below header, sentence case.

LABELS: Geometric sans-serif font (like Avenir or Futura but slightly warmer, clean and technical with even stroke weight). Medium size, charcoal DDD color, used for all box labels and component names. Hand drawn versions of this.

INSIGHTS: Condensed italic sans-serif font (sporty editorial style like sports jerseys or magazine callouts, narrow and slanted). Smaller size, Purple AC color, used for callouts with asterisks like "key insight".Hand drawn versions of this.

DIAGRAM CONTENT:
Title: '[TITLE]' (Top left, left-justified)
Subtitle: '[SUBTITLE]' (left justified to the Header, slightly below)
Art and labels and such should look like Excalidraw, but hand drawn by a talented Architect Artist that mimics our fonts.

Have -insights for each image created.

Object Styling

When you must use everyday objects to help the visual, use technically-drawn, non-cartoon-like drawing. This means:

- NOT Cartoony
- Like they're drawn by an architect / artist type

Overall look and feel

The whole image should look like it was made on a whiteboard by an extremely talented artist with Architect training, using all the styling above. Like Excalidraw, but more Architect / Artistic.

All the art components, labels, and such should mostly look hand-drawn, similar to Excalidraw. But roughly in the style of our fonts. 

Execution

. Run /cse on the input content
. Think deeply about how to construct that into a technical diagram
. Create the composition in your mind that will perfectly render that
. Create a PROMPT that will render that composition perfectly
. Before creating the image, make absolutely certain that the PROMPT you've created mind takes into account everything in these instructions. No exceptions. Then proceed to .
. Confirm this mentally for full second
. Create the image using intent-to-flag mapping and the CLI tool

Intent-to-Flag Mapping

Interpret user request and select appropriate flags:
Model Selection

| User Says | Flag | When to Use |
|-----------|------|-------------|
| "fast", "quick", "draft" | `--model nano-banana` | Faster iteration, slightly lower quality |
| (default), "best", "high quality" | `--model nano-banana-pro` | Best quality + text rendering (recommended) |
| "flux", "stylistic variety" | `--model flux` | Different aesthetic, stylistic variety |

Size Selection

| User Says | Flag | Resolution |
|-----------|------|------------|
| "draft", "preview" | `--size K` | Quick iterations |
| (default), "standard" | `--size K` | Standard output |
| "high res", "print", "large" | `--size K` | Maximum resolution |

Aspect Ratio

| User Says | Flag | Use Case |
|-----------|------|----------|
| "wide", "slide", "presentation" | `--aspect-ratio :` | Default for diagrams |
| "square" | `--aspect-ratio :` | Social media, compact |
| "ultrawide", "panoramic" | `--aspect-ratio :` | Wide system diagrams |

Post-Processing

| User Says | Flag | Effect |
|-----------|------|--------|
| "blog", "website" | `--thumbnail` | Creates transparent + thumb versions |
| "transparent" | `--remove-bg` | Removes background for compositing |
| "variations", "options" | `--creative-variations ` | Multiple versions |

Generate Command

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model [SELECTED_MODEL] \
  --prompt "[PROMPT]" \
  --size [SELECTED_SIZE] \
  --aspect-ratio [SELECTED_RATIO] \
  [--thumbnail if for blog] \
  --output /path/to/diagram.png
```

Validation

After rendering, ensure that you have executed properly by checking this list of musts and must-nots.

Must have:- [ ] Pure sepia background EAEDF (NO grid or decorations)
- [ ] Elegant wedge-serif for both headers (Valkyrie-style)
- [ ] Geometric sans labels (Concourse-style)
- [ ] A title and subtitle in the top left 
- [ ] -Condensed italic insights (Advocate-style)
- [ ] Strategic color usage (for accents, % different shades of grey and black)
- [ ] Highly technical, stylish, Architect-style look and feel, Excalidraw with style!

Must NOT have:- [ ] Grid lines or texture on background
- [ ] Generic or ugly fonts
- [ ] Cartoony or overly casual shapes or styling
- [ ] Over-coloring (everything purple/teal)

