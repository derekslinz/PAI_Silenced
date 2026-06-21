Adaptive Content Visualization Workflow

Intelligent multi-modal visualization combining optimal approaches based on content analysis.
---

Creates ADAPTIVE VISUALIZATIONS— analyzes content to select and orchestrate the best combination of visualization techniques, from pure data viz to mixed-media infographics to multi-panel compositions.

---

Purpose

The Visualize workflow is the intelligent visualization orchestrator. Unlike the specialized workflows (which each serve specific purposes), Visualize analyzes your content and chooses the optimal visualization strategy — which may be one approach, or a sophisticated combination of multiple techniques.

Use this workflow when:- You have content but aren't sure what visualization approach to use
- The content has multiple dimensions (data + narrative + concepts)
- You want the most effective visualization, not a predetermined format
- You're asking "what's the best way to visualize this?"
- You want to leverage Nano Banana Pro's full capabilities

This workflow DOES NOT use:- Predetermined templates
- One-size-fits-all approaches
- Single-mode visualizations when combinations would be better

---

INFOGRAPHICS: Use Excalidraw Whiteboard Style

Infographics use the EXCALIDRAW whiteboard sketch aesthetic— hand-drawn with wobbly boxes, sketchy lines, and imperfect organic shapes. This is the same style as mermaid.md technical diagrams but with richer graphics and narrative.

Key principle:Infographics = Excalidraw aesthetic + Rich graphics + Visual narrative

Excalidraw Infographic Aesthetic

```
STYLE: Excalidraw whiteboard sketch with rich graphics
- WOBBLY BOXES — rectangles with rough, hand-drawn edges (not perfect)
- SKETCHY LINES — arrows and connections with slight wobble
- IMPERFECT SHAPES — circles slightly oval, diamonds asymmetric
- HAND-LETTERED TEXT — labels look handwritten, not typed
- WHITEBOARD FEEL — looks like someone drew this on a whiteboard
- VARIABLE LINE WEIGHT — heavier for boxes, lighter for details
- RICH GRAPHICS — icons, illustrations, visual metaphors (all sketchy)
```

What Makes a Good Excalidraw Infographic

. Hand-Drawn Feel— Everything looks sketched, not digital
. Wobbly Shapes— No perfect rectangles, circles, or lines
. Rich Graphics— Icons and illustrations in sketchy style
. Visual Narrative— Panels flow and tell a story
. Strategic Color— Purple/teal accents on key elements, mostly black

AVOID

```
Perfect geometric shapes
Ruler-straight lines and arrows
Digital precision
Smooth polished vectors
Perfect alignment
Clean corporate infographic style
```

Color Usage

```
- Black (): All primary structure (boxes, arrows, icons)
- Deep Purple (AC): Critical elements, key stats, title (-%)
- Deep Teal (B): Secondary highlights (-%)
- Charcoal (DDD): All text labels
- Background: Light Cream FEDor White FFFFFF
```

Background Rules

```
DEFAULT: Light Cream/Sepia FED(matches blog aesthetic)
WHITE ONLY IF: User explicitly requests "white background" in prompt
TRANSPARENT: Use Images skill to remove background for overlay use
```

Light Cream (FED) is the DEFAULT background.Only use white (FFFFFF) if the user explicitly requests it.

For transparent background— use the Images skillfor background removal:

```bash
bun ~/.claude/PAI/TOOLS/RemoveBg.ts /path/to/visualization.png
```

Title/Subtitle Alignment

```
ALWAYS LEFT-JUSTIFIED — Never centered
- Title: Top-left with margin
- Subtitle: Below title, aligned left
```

Infographic Prompt Template

```
Excalidraw-style whiteboard infographic with rich hand-drawn graphics.

STYLE: Excalidraw whiteboard sketch aesthetic
- Wobbly rectangles with rough edges (not perfect boxes)
- Sketchy arrows with slight wobble (not ruler-straight)
- Imperfect shapes throughout (circles slightly oval)
- Hand-lettered text labels (natural slant, imperfect)
- Variable line weight (boxes thicker, details thinner)
- Whiteboard/sketch paper feel

BACKGROUND: Light Cream FED(DEFAULT) — only use White FFFFFF if explicitly requested

TYPOGRAPHY SYSTEM (-TIER):

TIER - TITLE & SUBTITLE (Valkyrie):
Title:
- "[Title]"
- Font: Valkyrie serif ITALIC
- Position: LEFT-JUSTIFIED, top-left with margin
- Color: Purple AC (or Black )
- Size: Large, -x body text

Subtitle:
- "[Subtitle]"
- Font: Valkyrie serif REGULAR (NOT italic)
- Position: LEFT-JUSTIFIED, below title
- Color: Charcoal DDD
- Size: Small, -.x body text

TIER - PANEL HEADERS & LABELS (Concourse + Valkyrie):
Panel Headers:
- Font: Concourse geometric sans-serif, bold
- Color: Black - Style: Uppercase

Content Labels:
- Technical labels: Concourse geometric sans
- Descriptions: Valkyrie serif
- Color: Charcoal DDD

TIER - ANNOTATIONS (Advocate):
- Font: Advocate condensed italic
- Color: Purple AC or Teal B
- Style: Smaller, insight/commentary voice

[Describe each panel with SKETCHY VISUAL ELEMENTS:]
- Hand-drawn icons and illustrations (wobbly, organic)
- Data visualized with sketchy charts/graphics
- Panels as wobbly boxes with headers
- Flow shown with sketchy arrows

COLOR USAGE:
- Black: All primary structure and most elements
- Purple: Title, key stats, critical accents
- Teal: Secondary highlights
- Charcoal: All body text

CRITICAL:
- Excalidraw hand-drawn whiteboard aesthetic throughout
- All shapes imperfect, all lines wobbly
- Title/subtitle LEFT-JUSTIFIED, not centered
- Use proper font hierarchy (Valkyrie, Concourse, Advocate)
```

Reference:See `mermaid.md` for complete Excalidraw aesthetic specification.

---

Nano Banana Pro Capabilities

Understanding what's possible:
Core Strengths
. Exceptional text rendering— Clean typography, readable labels, multiple text tiers
. Data visualization— Charts, graphs, quantitative displays
. Infographic composition— Multi-element layouts, mixed media
. Iconic illustration— Simple recognizable symbols and icons
. Multi-panel layouts— Grids, sequences, comparative layouts
. Hybrid compositions— Data + illustration + typography together
. Slide-quality output— Presentation-ready visualizations

What Nano Banana Pro Excels At
- Text-heavy compositions— Infographics with lots of labels
- Data + context— Numbers with explanatory illustrations
- Icon systems— Repeated simplified icons showing quantities
- Multi-tier typography— Clear hierarchies (titles, labels, annotations)
- Mixed media— Charts alongside illustrations
- Grid layouts— Organized multi-element compositions
- Comparative panels— Side-by-side or sequential comparisons

---

MANDATORY WORKFLOW STEPS

Step : Deep Content Analysis (MANDATORY - Use deep thinking)

CRITICAL: Use extended thinking to analyze content thoroughly before proceeding.
Analyze the content across these dimensions:

A. Content Type Identification
What types of information are present?
- [ ] Quantitative data (numbers, statistics, metrics)
- [ ] Qualitative concepts (ideas, principles, arguments)
- [ ] Narrative elements (stories, sequences, transformations)
- [ ] Comparative elements (X vs Y, before/after, tradeoffs)
- [ ] Hierarchical structures (taxonomies, frameworks, levels)
- [ ] Temporal elements (timelines, evolution, progressions)
- [ ] Spatial relationships (maps, territories, domains)
- [ ] Process flows (steps, recipes, methodologies)

B. Communication Goal
What's the primary purpose?
- Explain a complex concept → Conceptual visualization
- Show data insights → Data visualization dominant
- Compare alternatives → Comparison/split approach
- Tell a story → Sequential/narrative visualization
- Organize information → Taxonomy/grid approach
- Guide action → Process/recipe format
- Make memorable → Metaphor + data hybrid

C. Audience Context
Who's this for?
- Technical audience → More data, precision, structure
- General audience → More metaphor, simplification, narrative
- Executive audience → High-level insights, clear takeaways
- Social media → Punchy, scannable, shareable
- Consulting deliverable → Professional, multi-faceted, comprehensive

D. Complexity Assessment
How much information needs to be conveyed?
- Simple (-key points):Single focused visualization
- Medium (-dimensions):Hybrid or two-element composition
- Complex (+ dimensions):Multi-panel infographic or dashboard

Output from Analysis:```
CONTENT TYPE: [Primary and secondary types from above]
INFORMATION DENSITY: [Simple / Medium / Complex]
COMMUNICATION GOAL: [Primary purpose]
AUDIENCE: [Who this is for]

KEY ELEMENTS TO VISUALIZE:
. [Element type: data/concept/narrative/etc.]
. [Element type]
. [Element type]
...

VISUALIZATION OPPORTUNITIES:
- Data points that could be charts/graphs
- Concepts that need metaphors or icons
- Comparisons that need side-by-side
- Sequences that need panels or flow
- Hierarchies that need taxonomies or frameworks
```

---

Step : Visualization Strategy Selection (MANDATORY - Use deep thinking)

Based on Step analysis, determine the optimal approach:
Strategy Options

A. SINGLE-MODE (Use one specialized workflow)When content clearly fits one visualization type:
- Pure data → Create data visualization
- Pure concept → Use editorial illustration or framework
- Pure comparison → Use comparison workflow
- Pure process → Use recipe card workflow

B. HYBRID COMPOSITION (Combine -elements)When content has multiple dimensions:
- Data + Metaphor:Chart/graph with editorial illustration accent
- Data + Process:Numbers showing outcomes at each step
- Concept + Structure:Framework with illustrated metaphors in quadrants
- Timeline + Data:Progression with quantitative milestones
- Comparison + Data:Split screen with metrics on each side

C. MULTI-PANEL INFOGRAPHIC (Dashboard approach)When content is complex and multifaceted:
- Grid layout:-panels each showing different aspect
- Layered composition:Top section data, middle concepts, bottom process
- Dashboard:Multiple charts/graphs with unified design
- Slide series:Sequential slides each focusing on one dimension

Decision Framework

```
IF content has primary dimension:
  → Use specialized workflow directly

IF content has -dimensions of equal importance:
  → Design HYBRID composition

IF content has + distinct dimensions:
  → Design MULTI-PANEL infographic

IF content is primarily quantitative:
  → Lead with DATA VISUALIZATION
  → Add conceptual elements as context

IF content is primarily conceptual:
  → Lead with METAPHOR/FRAMEWORK
  → Add data as supporting evidence

IF content tells a story:
  → Use SEQUENTIAL approach
  → Could be comic, timeline, or multi-step
```

Output from Strategy Selection:```
VISUALIZATION STRATEGY: [Single-mode / Hybrid / Multi-panel]

CHOSEN APPROACH:
[Describe the specific visualization approach]

COMPOSITION ELEMENTS:
Primary element (-%): [Type and purpose]
Secondary element (-%): [Type and purpose]
Tertiary element (%): [Type and purpose - optional]

LAYOUT STRUCTURE:
[Describe how elements are arranged spatially]

ASPECT RATIO: [:/ :/ :/ :]
Rationale: [Why this ratio for this content]
```

---

Step : Design Composition (MANDATORY - Use deep thinking)

Plan the visual hierarchy and spatial organization:
A. Spatial Layout
Design how elements occupy the canvas:

For Single-Mode:- Follow the specialized workflow's layout guidelines
- Optimize for Nano Banana Pro's strengths

For Hybrid Composition:```
Example: Data + Metaphor
┌─────────────────────────────────────┐
│                                     │
│    [TITLE - Advocate Block]         │
│                                     │
│  ┌───────────┐   ┌──────────────┐  │
│  │           │   │              │  │
│  │   DATA    │   │  METAPHOR    │  │
│  │   CHART   │   │ ILLUSTRATION │  │
│  │           │   │              │  │
│  └───────────┘   └──────────────┘  │
│        %              %         │
│                                     │
│  [Explanatory text - %]          │
│                                     │
└─────────────────────────────────────┘
```

For Multi-Panel Infographic:```
Example: Dashboard Grid
┌─────────────────────────────────────┐
│  [OVERALL TITLE]                    │
├─────────────┬───────────────────────┤
│  Panel :   │   Panel :            │
│  Data viz   │   Concept diagram     │
├─────────────┼───────────────────────┤
│  Panel :   │   Panel :            │
│  Timeline   │   Key stat + icon     │
├─────────────┴───────────────────────┤
│  [Synthesis/Conclusion panel]       │
└─────────────────────────────────────┘
```

B. Visual Hierarchy
Establish information priority:
. Primary (Immediate attention):-% of visual weight
. Secondary (Supporting context):-% of visual weight
. Tertiary (Details/annotations):-% of visual weight

C. Typography System
Apply -tier system across all elements:
- Tier (Advocate Block):Main title, section headers
- Tier (Concourse Sans):Data labels, chart axes, element labels
- Tier (Advocate Condensed Italic):Annotations, insights, editorial voice

D. Color Strategy
Maintain UL aesthetic while supporting information hierarchy:
- Black :Primary structure (chart axes, borders, main elements)
- Purple AC:Critical insights, key data points, optimal zones
- Teal B:Secondary data, supporting elements, context
- Charcoal DDD:All body text and labels
- Background:Light Cream FED(DEFAULT — only use white if explicitly requested)

Strategic color use:
- Don't color everything
- Purple for "look here" moments
- Teal for supporting information
- Black for structure and clarity

Output from Design:```
COMPOSITION LAYOUT:
[Detailed spatial description or ASCII diagram]

VISUAL HIERARCHY:
Primary (-%): [Element and placement]
Secondary (-%): [Element and placement]
Tertiary (-%): [Element and placement]

TYPOGRAPHY ASSIGNMENTS:
Tier : [Where used - titles, headers]
Tier : [Where used - labels, axes]
Tier : [Where used - annotations, insights]

COLOR CODING:
Purple: [Specific elements to highlight]
Teal: [Supporting elements]
Black: [Structural elements]
Text: All charcoal

ELEMENT SPECIFICATIONS:
[For each major element, specify:]
- Type (chart/icon/illustration/text)
- Size (% of canvas)
- Position (coordinates or relative placement)
- Style (data viz / editorial / typographic)
```

---

Step : Construct Comprehensive Prompt (MANDATORY - Use deep thinking)

Build the generation prompt leveraging Nano Banana Pro's capabilities:
Prompt Structure Template

```
[VISUALIZATION TYPE] in editorial infographic style optimized for Nano Banana Pro.

OVERALL CONCEPT: "[What this visualization communicates]"

STYLE REFERENCE: [Professional infographic / Data journalism / Editorial slide / Mixed media visualization]

BACKGROUND: Light Cream FED(DEFAULT) — only use White FFFFFF if user explicitly requests it

AESTHETIC:
- Professional infographic quality (deliverable standard)
- Hand-drawn editorial elements where appropriate
- Clean data visualization where precise
- Variable stroke weight (thicker for structure, thinner for details)
- Flat colors, no gradients or shadows
- Readable at multiple scales (works as thumbnail and full-size)

ASPECT RATIO: [:/ :/ :/ :]

COMPOSITION STRUCTURE:
[Detailed description of spatial layout]

TYPOGRAPHY SYSTEM (-TIER HIERARCHY):

TIER - VISUALIZATION HEADER & SUBTITLE (Valkyrie Two-Part System):
Header (Main Title):
- "[Header Text]"
- Font: Valkyrie serif italic (elegant, sophisticated)
- Size: Large - -x body text (prominent, commanding attention)
- Style: Italicized, sentence case or title case (NOT all-caps)
- Color: Black (or Purple AC for emphasis)
- Position: Top-left with margin

Subtitle (Clarifying Detail):
- "[Subtitle Text]"
- Font: Valkyrie serif regular (warm, readable)
- Size: Small - -.x body text (noticeably smaller than header, supportive)
- Style: Regular (NOT italicized), sentence case (first letter capitalized, rest lowercase except proper nouns)
- Color: Black or Charcoal DDD
- Position: Small gap below header, aligned left

TIER - ELEMENT LABELS (Concourse Sans):
- [List all labels: chart axes, data labels, section headers]
- Font: Concourse geometric sans-serif, clean, modern
- Size: Medium readable
- Color: Charcoal DDD
- Positions: [Specify for each]

TIER - ANNOTATIONS (Advocate Condensed Italic):
- [List all annotations and insights]
- Font: Advocate condensed italic (editorial voice)
- Size: Small (% of Tier )
- Color: Purple AC (insights) or Teal B (technical notes)
- Positions: [Near relevant elements]

[FOR EACH MAJOR ELEMENT IN COMPOSITION:]

ELEMENT : [TYPE - e.g., Bar Chart / Line Graph / Icon Grid]
- Purpose: [What this element communicates]
- Position: [Location in composition]
- Size: [Dimensions or % of canvas]
- Data to show: [Specific data points or values]
- Style: [Precise data viz / Hand-drawn editorial / Hybrid]
- Color: Black structure, Purple highlights on [specific], Teal on [specific]
- Labels: [Tier typography for all labels]
- Details: [Any specific styling notes]

ELEMENT : [TYPE - e.g., Editorial Illustration / Framework Diagram]
- Purpose: [What this element communicates]
- Position: [Location in composition]
- Size: [Dimensions or % of canvas]
- Content: [What to illustrate]
- Style: [Hand-drawn / Iconic / Metaphorical]
- Color: Black linework, Purple accents on [specific]
- Integration: [How it relates to other elements]

[Continue for all elements...]

COLOR USAGE (Strategic, not overwhelming):
- Black (): [All primary structure, chart elements, borders]
- Deep Purple (AC): [Critical data points, key insights, optimal zones]
- Deep Teal (B): [Secondary data, supporting elements]
- Charcoal (DDD): [All text labels and annotations]
- Background: Light Cream FED(DEFAULT — white only if explicitly requested)

CRITICAL REQUIREMENTS FOR NANO BANANA PRO:
- Exceptional text rendering required (multiple labels, clean typography)
- Data precision where needed (accurate chart rendering)
- Hand-drawn editorial quality where appropriate
- Multi-element composition with clear visual hierarchy
- Professional infographic / slide quality
- Readable at both thumbnail and full resolution
- No gradients, flat colors only
- Strategic color (not every element colored)
- All elements work together as unified composition

VALIDATION CHECKPOINTS:
- Is the primary message immediately clear?
- Can each element be read/understood independently?
- Do elements work together to tell complete story?
- Is typography hierarchy obvious?
- Are data elements accurate and precise?
- Do editorial elements enhance (not distract from) information?

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Generate with Nano Banana Pro

Execute the visualization using intent-to-flag mapping:
Intent-to-Flag Mapping

Interpret user request and select appropriate flags:
| User Says | Flag | When to Use |
|-----------|------|-------------|
| "fast", "quick", "draft" | `--model nano-banana` | Faster iteration, slightly lower quality |
| (default), "best", "high quality" | `--model nano-banana-pro` | Best quality + text rendering (recommended) |
| "flux", "stylistic variety" | `--model flux` | Different aesthetic, stylistic variety |

| User Says | Flag | Resolution |
|-----------|------|------------|
| "draft", "preview" | `--size K` | Quick iterations |
| (default), "standard" | `--size K` | Standard output |
| "high res", "print", "large" | `--size K` | Maximum resolution |

| User Says | Flag | Use Case |
|-----------|------|----------|
| "square", "social" | `--aspect-ratio :` | Social media, grids |
| "wide", "slide", "presentation" | `--aspect-ratio :` | Slides, presentations |
| "portrait", "mobile" | `--aspect-ratio :` | Mobile, vertical |
| "blog header" | `--thumbnail` | Creates transparent + thumb versions |
| "variations", "options" | `--creative-variations ` | Multiple versions |

Construct command based on intent:
```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model [SELECTED_MODEL] \
  --prompt "[YOUR COMPREHENSIVE PROMPT]" \
  --size [SELECTED_SIZE] \
  --aspect-ratio [chosen ratio] \
  [--thumbnail if for blog] \
  [--creative-variations N if variations requested] \
  --output /path/to/visualization.png
```

Why Nano Banana Pro for this workflow:- Best text rendering among all models (critical for infographics)
- Handles complex multi-element compositions well
- Excellent at data visualization elements
- Can combine precise (charts) with expressive (editorial) styles
- Reliable for professional deliverable quality

Immediately open for review:```bash
open /path/to/visualization.png
```

---

Step : Comprehensive Validation (MANDATORY)

Validate across multiple dimensions:
Information Effectiveness
- [ ] Primary message clear:Main insight obvious within seconds
- [ ] Data accuracy:Numbers, proportions, relationships accurate
- [ ] Visual hierarchy works:Eye flows from primary → secondary → tertiary
- [ ] All elements readable:Text legible, charts clear, icons recognizable
- [ ] Story cohesion:Elements work together, not competing

Design Quality
- [ ] Professional deliverable:Client/publication ready
- [ ] UL aesthetic maintained:Flat colors, appropriate hand-drawn vs precise
- [ ] Typography hierarchy clear:tiers obviously distinct
- [ ] Color strategic:Purple/teal highlight key elements, not overwhelming
- [ ] Composition balanced:Visual weight distributed appropriately

Technical Execution
- [ ] Text rendering clean:No blurry or malformed letters
- [ ] Data viz precision:Charts/graphs accurate and clear
- [ ] Scale works:Readable as thumbnail AND full-size
- [ ] No gradients/shadows:Flat aesthetic maintained
- [ ] Aspect ratio appropriate:Format suits content and use case

Audience Appropriateness
- [ ] Matches audience sophistication:Not too simple or too complex
- [ ] Serves communication goal:Actually achieves intended purpose
- [ ] Platform optimized:Works for intended distribution (social/email/presentation)

If Validation Fails

Common issues and fixes:
| Problem | Diagnosis | Fix |
|---------|-----------|-----|
| Too cluttered| Too many elements competing | Simplify: reduce to -main elements, increase whitespace |
| Message unclear| No clear visual hierarchy | Strengthen primary element (make larger, add purple), reduce secondary |
| Text unreadable| Font too small or wrong tier | Increase label sizes, strengthen typography tier differentiation |
| Data imprecise| Chart rendering issues | Add specific data points in prompt, request precision explicitly |
| Looks generic| Missing UL aesthetic | Add hand-drawn editorial elements, strategic purple/teal, flatten any gradients |
| Elements disconnected| Poor composition | Redesign spatial layout, add visual connectors (arrows, borders, grouping) |
| Color chaos| Too much color everywhere | Limit purple to -key elements, teal to -supporting, rest black/charcoal |
| Not professional| Too sketchy or too rigid | Balance: data viz precise, editorial elements hand-drawn, clean typography |

Regeneration Process:. Identify specific validation failures
. Update prompt with targeted fixes
. Regenerate with refined prompt
. Re-validate against all checkpoints
. Repeat until ALL validation criteria pass

CRITICAL: Do not declare completion until validation passes.
---

Visualization Pattern Library

Common effective combinations:
Pattern : Data + Metaphor Hybrid
When:Data needs conceptual context
Layout:% data visualization + % editorial illustration + % explanatory text
Example:Growth chart with rocket ship illustration showing trajectory
Aspect::or :
Pattern : Comparative Dashboard
When:Analyzing multiple dimensions of comparison
Layout:Split or grid with data on each side/panel
Example:"Before AI vs After AI" with metrics and illustrations for each state
Aspect::(split) or :(grid)

Pattern : Process + Outcomes
When:Showing methodology with results
Layout:Vertical or horizontal flow with data at key milestones
Example:-step recipe with success metrics at each step
Aspect::(vertical) or :(horizontal)

Pattern : Icon Quantification
When:Showing quantities through repeated visual elements
Layout:Grid of icons where quantity = visual count
Example:"out of developers" shown as purple icons + gray icons
Aspect::or :
Pattern : Annotated Data Story
When:Data needs narrative explanation
Layout:Primary chart with hand-drawn annotations explaining insights
Example:Timeline chart with purple arrows: "this is when everything changed"
Aspect::or :
Pattern : Multi-Chart Dashboard
When:Multiple related datasets
Layout:Grid of -charts with unified design language
Example:-panel view: bar chart, line graph, pie chart, key stat
Aspect::or :
Pattern : Framework + Data
When:Conceptual model with quantitative evidence
Layout:Framework structure (x, Venn, pyramid) with data in each zone
Example:xmatrix with percentage of companies in each quadrant
Aspect::
Pattern : Infographic Slide
When:Comprehensive content for presentation
Layout:Title + multiple small visualizations + key takeaway
Example:Slide with mini-charts + key stats + insight annotation
Aspect::(slide format)

---

Decision Tree Summary

```
START: Analyze content deeply (Step )
   ↓
Is content primarily ONE dimension?
   ├─ YES → Use specialized workflow directly
   │         (Editorial / Technical / Timeline / etc.)
   │
   └─ NO → Content has multiple dimensions
             ↓
       Are there -equal dimensions?
          ├─ YES → HYBRID composition
          │         Design complementary elements
          │         (Data + Metaphor, Process + Outcomes, etc.)
          │
          └─ NO → + dimensions or very complex
                    ↓
                  MULTI-PANEL infographic
                  Grid or layered dashboard approach
                  Each panel addresses one dimension

For HYBRID or MULTI-PANEL:
   ↓
Design composition (Step )
   → Spatial layout
   → Visual hierarchy
   → Typography tiers
   → Color strategy
   ↓
Construct comprehensive prompt (Step )
   → Detailed element specifications
   → Leverage Nano Banana Pro strengths
   → Clear validation checkpoints
   ↓
Generate with nano-banana-pro (Step )
   ↓
VALIDATE comprehensively (Step )
   → Information effectiveness
   → Design quality
   → Technical execution
   → Audience appropriateness
   ↓
PASS? → Complete
FAIL? → Diagnose, fix, regenerate
```

---

Quick Reference

When to Use Visualize Workflow
- Content has multiple dimensions to visualize
- You want optimal approach, not predetermined format
- Combining data + concepts + narrative
- Creating professional infographics or slides
- Need sophisticated composition beyond single workflow

Nano Banana Pro Advantages
- Best text rendering (critical for labels/annotations)
- Multi-element composition handling
- Data visualization capabilities
- Professional infographic quality
- Hybrid precision + expressiveness

Core Principles
. Analyze first— Deep content analysis before choosing approach
. Strategic combination— Use hybrid only when it serves content
. Visual hierarchy— Clear primary/secondary/tertiary structure
. Color discipline— Purple/teal strategic, not everywhere
. Professional quality— Deliverable to clients/publications
. Validate thoroughly— Information + design + technical + audience

---

The workflow: Analyze → Strategy → Design → Prompt → Generate → Validate → Complete
The meta-principle: Let content dictate form. Use the full power of Nano Banana Pro to create the most effective visualization, whether that's one approach or a sophisticated orchestration of multiple techniques.