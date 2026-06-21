Visual Taxonomies & Classification Grids Workflow

Hand-drawn classification systems, taxonomies, and reference grids using UL aesthetic.
---

Creates VISUAL TAXONOMIES— organized classification systems like periodic tables, capability matrices, or framework grids with editorial hand-drawn style.

---

Purpose

Visual taxonomies organize concepts into structured classification systems. Unlike technical diagrams (which show flows/relationships) or editorial illustrations (which use metaphors), taxonomies show organized categories and hierarchies.

Use this workflow for:- "The Periodic Table of X"
- Classification grids and matrices
- Capability taxonomies
- Framework reference cards
- Organized typologies
- Systematic categorizations

---

Visual Aesthetic: Structured Yet Hand-Drawn

Think:Hand-drawn periodic table or field guide illustration

Core Characteristics
. Grid structure— Organized cells/boxes in systematic layout
. Hand-drawn imperfection— Boxes wobbly, lines organic, human feel
. Consistent typography— -tier system (Advocate titles, Concourse labels, italic annotations)
. Category organization— Clear groupings with visual hierarchy
. Color coding— Strategic use of purple/teal to show categories
. Editorial aesthetic— Maintains UL flat color, black linework style
. Scannable layout— Easy to reference and navigate

---

Color System for Taxonomies

Same UL palette, organized usage:
Structure
```
Black — All grid lines, cell borders, primary structure
```

Category Differentiation
```
Deep Purple AC — Category headers/highlights
Deep Teal B — Category headers/highlights
Charcoal DDD — All body text and labels
```

Background
```
White FFFFFF or Light Cream FED— For clarity
```

Color Strategy
- Use purple for one category type, teal for another
- Alternate colors by row/column for visual organization
- Keep most content black/charcoal with strategic color accents

---

MANDATORY WORKFLOW STEPS

Step : Define Classification System

Identify what you're classifying:
. What is being categorized?(e.g., AI capabilities, security threats, business models)
. What are the organizing dimensions?(e.g., complexity vs. impact, offensive vs. defensive)
. How many categories?(e.g., types, elements, xgrid)
. What's the hierarchy?(e.g., major categories → subcategories)

Output:```
CLASSIFICATION SUBJECT: [What you're organizing]

ORGANIZING DIMENSIONS:
- Dimension : [e.g., Complexity: Simple → Complex]
- Dimension : [e.g., Impact: Low → High]

CATEGORIES:
. [Category name] — [Description]
. [Category name] — [Description]
. [Category name] — [Description]
...

ITEMS TO CLASSIFY:
- [Item ] belongs to [Category]
- [Item ] belongs to [Category]
...
```

---

Step : Design Grid Layout

Plan the visual organization:
. Layout type:   - Periodic table grid (rows and columns)
   - Matrix (x, x, x)
   - Hierarchical tree
   - Grouped clusters
   - Linear taxonomy (top to bottom)

. Cell structure:   - What information in each cell
   - Size of cells (uniform or varied)
   - How categories are grouped visually

. Color assignment:   - Which categories get purple
   - Which get teal
   - Pattern of color distribution

Output:```
LAYOUT: [Grid type, e.g., xmatrix, Periodic table style]

GRID STRUCTURE:
- [Describe arrangement: "rows by columns, grouped by color into quadrants"]
- Cell size: [Uniform squares, varied rectangles, etc.]
- Groupings: [How categories cluster together]

COLOR CODING:
- Purple: [Category type ]
- Teal: [Category type ]
- Black: [Remaining structure]

TYPOGRAPHY:
- Title (Tier ): "[MAIN TITLE]"
- Category headers (Tier ): [Category names]
- Item labels (Tier ): [Individual items]
```

---

Step : Construct Prompt

Use -tier typography system:
Prompt Template

```
Hand-drawn taxonomy grid in editorial notebook style.

STYLE REFERENCE: Periodic table, field guide illustration, reference card aesthetic

BACKGROUND: [White FFFFFF OR Light Cream FED] — clean, flat

AESTHETIC:
- Hand-drawn imperfect grid lines (slightly wobbly, human quality)
- Variable stroke weight (grid structure in black)
- Cell borders with slight waviness (not perfect rectangles)
- Editorial flat color aesthetic with strategic accents
- Organized layout but hand-crafted feel

LAYOUT TYPE: [Periodic table grid / Matrix / Hierarchical tree / etc.]

GRID STRUCTURE:
[Describe the grid organization, e.g.:]
- rows by columns of cells
- Each cell contains: [category icon/symbol] + [label text]
- Cells grouped by color into [quadrants/categories]
- Clear visual separation between category groups

TYPOGRAPHY SYSTEM (-TIER):

TIER - TAXONOMY HEADER & SUBTITLE (Valkyrie Two-Part System):
Header (Main Title):
- "[Header Text]" — Left-justified at top
- Font: Valkyrie serif italic (elegant, sophisticated)
- Size: Large - -x body text (prominent, commanding attention)
- Style: Italicized, sentence case or title case (NOT all-caps)
- Color: Black (or Purple AC for emphasis)
- Position: Top-left with margin
- Example: "The Periodic Table of AI Capabilities"

Subtitle (Clarifying Detail):
- "[Subtitle Text]" — Below header
- Font: Valkyrie serif regular (warm, readable)
- Size: Small - -.x body text (noticeably smaller than header, supportive)
- Style: Regular (NOT italicized), sentence case (first letter capitalized, rest lowercase except proper nouns)
- Color: Black or Charcoal DDD
- Position: Small gap below header, aligned left
- Example: "Classification of Machine Learning Functions"

TIER - CATEGORY HEADERS (Concourse Sans):
- "[Category ]", "[Category ]", etc.
- Font: Concourse geometric sans-serif, clean, modern
- Size: Medium readable
- Color: Purple AC for Category , Teal B for Category - Example: "Reasoning", "Creativity", "Perception"

TIER - ITEM LABELS (Advocate Condensed):
- Individual items within cells
- Font: Advocate condensed, smaller
- Size: % of Tier - Color: Charcoal DDD
- Example: Item names, abbreviations, symbols

CONTENT TO INCLUDE:
[List all categories and items to be shown, e.g.:]

CATEGORY (Purple AC headers):
- Item A: [label]
- Item B: [label]
- Item C: [label]

CATEGORY (Teal B headers):
- Item D: [label]
- Item E: [label]

[etc.]

COLOR USAGE:
- Black () for all grid structure, cell borders
- Deep Purple (AC) for [Category ] headers and accents
- Deep Teal (B) for [Category ] headers and accents
- Charcoal (DDD) for all item labels and body text

CRITICAL REQUIREMENTS:
- Hand-drawn sketch quality — NOT polished digital grid
- Grid lines wobble slightly (human imperfection)
- Cells roughly aligned but organic (grid-aware not grid-perfect)
- No gradients, no shadows, flat colors only
- Clear typography with -tier hierarchy
- Scannable and reference-friendly layout
- Strategic color coding for categories

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Determine Aspect Ratio

Choose based on taxonomy type:
| Taxonomy Type | Aspect Ratio | Reasoning |
|---------------|--------------|-----------|
| Wide grid (many columns) | :or :| Horizontal periodictable layout |
| Tall hierarchy | :| Vertical tree structure |
| Square matrix | :| Balanced xor xgrid |
| Reference card | :or :| Compact, poster-like |

Default: :(square)— Works for most taxonomy grids

---

Step : Execute Generation

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output /path/to/taxonomy.png
```

Model Recommendation:nano-banana-pro (best text rendering for labels)

Immediately Open:```bash
open /path/to/taxonomy.png
```

---

Step : Validation (MANDATORY)

Open the generated image and check:
Must Have
- [ ] Clear grid structure— Organized layout with visible cells/categories
- [ ] Readable text— All labels legible in -tier hierarchy
- [ ] Hand-drawn aesthetic— Wobbly lines, imperfect cells, human feel
- [ ] Strategic color— Purple/teal differentiate categories, not overwhelming
- [ ] Scannable— Easy to find and reference specific items
- [ ] Hierarchical clarity— Title > Categories > Items is obvious
- [ ] Flat aesthetic— No gradients, maintains UL editorial style

Must NOT Have
- [ ] Perfect straight grid lines
- [ ] Polished vector graphics
- [ ] Gradients or shadows
- [ ] Illegible or tiny text
- [ ] Color chaos (too many colors)
- [ ] Confusing organization

If Validation Fails

| Problem | Fix |
|---------|-----|
| Grid too perfect | Emphasize "wobbly hand-drawn grid lines, organic imperfection" |
| Text unreadable | Increase text size, strengthen typography tier requirements |
| Too colorful | "Strategic color use — purple for [specific], teal for [specific], rest black" |
| Unclear organization | Simplify grid, reduce categories, clarify groupings |
| Looks digital | Reference "hand-drawn field guide, editorial notebook aesthetic" |

---

Example Use Cases

Example : "Periodic Table of AI Capabilities"
- Grid:xmatrix of capabilities
- Categories:Reasoning (purple), Creativity (teal), Perception (black), Action (purple), Memory (teal)
- Items:Each cell = one capability with icon + label
- Aspect::(wide grid)

Example : "Cybersecurity Threat Taxonomy"
- Grid:Hierarchical tree from top (threat types) to bottom (specific attacks)
- Categories:Network threats (purple), Application threats (teal), Human threats (purple)
- Aspect::(tall tree)

Example : "Business Model Classification"
- Grid:xmatrix (complexity vs. scalability)
- Categories:business model archetypes
- Color:Purple for high-scalability, teal for low-complexity
- Aspect::(square reference card)

---

Quick Reference

Taxonomy Formula:```
. Define classification system (what, dimensions, categories)
. Design grid layout (structure, cells, color coding)
. Construct prompt with -tier typography
. Choose aspect ratio for layout type
. Generate with nano-banana-pro
. Validate for clarity and aesthetics
```

Color Strategy:- % Black structure
- % Purple (Category )
- % Teal (Category )
- Text all Charcoal

Typography:- Tier : Massive Advocate title
- Tier : Medium Concourse category headers
- Tier : Small Advocate item labels

---

The workflow: Define → Design → Construct → Generate → Validate → Complete