Annotated Screenshots Workflow

Real screenshots with hand-drawn editorial annotations, arrows, and highlights using UL aesthetic.
---

Creates ANNOTATED SCREENSHOTS— actual UI screenshots or code snippets with hand-drawn purple/teal commentary overlays.

---

Purpose

Annotated screenshots combine real artifacts (UI, code, data) with hand-drawn editorial commentary. This hybrid real + illustratedapproach adds voice and insights directly onto actual examples.

Use this workflow for:- Product reviews with annotated screenshots
- Technical tutorials pointing out UI elements
- UX critiques with visual commentary
- Code reviews with illustrated notes
- "THIS IS THE PROBLEM" arrows and callouts

---

Visual Aesthetic: Real + Hand-Drawn Overlay

Think:Screenshot with hand-drawn arrows, circles, and annotations in editorial voice

Core Characteristics
. Real foundation— Actual screenshot or code snippet (not illustrated)
. Hand-drawn overlay— Arrows, circles, highlights, callouts in editorial style
. Typography mix— Real UI text + hand-lettered annotations
. Color accents— Purple/teal for annotations against real screenshot
. Editorial voice— Annotations sound like smart commentary
. Editorial style— Maintains UL imperfect, gestural linework for overlays
. Functional clarity— Annotations enhance understanding, not just decoration

---

Color System for Annotated Screenshots

Real Screenshot Layer
```
Original colors preserved (screenshot remains unmodified)
OR
Slightly desaturated/faded to make annotations pop
```

Annotation Overlay
```
Deep Purple AC — Primary annotations (important callouts)
Deep Teal B — Secondary annotations (supporting notes)
Black — Arrows, circles, underlines
Charcoal DDD — Annotation text (when not purple/teal)
```

Strategy
- Screenshot slightly faded/grayed (% opacity) to let annotations stand out
- Purple for critical annotations ("THIS IS THE ISSUE")
- Teal for helpful context ("here's how it works")
- Black for structural annotations (arrows, circles, boxes)

---

MANDATORY WORKFLOW STEPS

Step : Prepare Screenshot

Get the base image:
. Capture screenshot:   - Take actual screenshot of UI, code, website, etc.
   - Crop to relevant area
   - Ensure text is readable

. Process screenshot:   - Optionally desaturate slightly (makes overlays pop)
   - Resize if needed for clarity
   - Save as base image

Output:```
SCREENSHOT SOURCE: [Path to screenshot file]
SUBJECT: [What the screenshot shows]
KEY AREAS TO ANNOTATE:
- Area : [Description] — [What to call out]
- Area : [Description] — [What to call out]
...
```

---

Step : Plan Annotations

Identify what to mark:
. What are you calling attention to?   - Problem areas
   - Good examples
   - Workflow steps
   - Hidden features

. What type of annotation for each?   - Arrow pointing to element
   - Circle/box highlighting region
   - Underline or bracket
   - Callout with note

. What's the commentary?   - "this is the problem"
   - "should be here instead"
   - "genius design"
   - "completely missed the point"

Output:```
ANNOTATIONS TO ADD:

. [Area/Element]:
   - Type: [Arrow / Circle / Box / Underline]
   - Color: [Purple / Teal / Black]
   - Text: "[Your commentary]"
   - Position: [Where on screenshot]

. [Area/Element]:
   - Type: [Annotation type]
   - Color: [Color choice]
   - Text: "[Commentary]"
   - Position: [Location]

...

EMPHASIS:
- Purple (critical): [Which annotations]
- Teal (helpful): [Which annotations]
```

---

Step : Construct Prompt

Note:This workflow is different - you're adding overlays to an existing image. You may need to:
- Upload screenshot as reference image
- Generate hand-drawn annotation layer separately
- Composite in image editor

OR

- Use prompt to describe "screenshot with annotations" if model can render both

Prompt Template (If Generating Combined Image)

```
Real UI screenshot with hand-drawn editorial annotations overlay.

STYLE: Actual screenshot with imperfect hand-drawn arrows, circles, and notes on top

SCREENSHOT BASE:
- [Describe the screenshot content, e.g.: "ChatGPT interface showing conversation"]
- Slightly desaturated/faded (% opacity) to let annotations stand out
- All original text and UI elements clearly visible

ANNOTATION OVERLAY STYLE:
- Hand-drawn arrows, circles, underlines in editorial style
- Variable stroke weight, wobbly imperfect lines
- Gestural quality (not polished vectors)
- Hand-lettered annotation text

TYPOGRAPHY FOR ANNOTATIONS (Advocate Italic):
- Font: Advocate condensed italic (hand-lettered style)
- Size: Readable against screenshot
- Color: Purple AC or Teal B for emphasis
- Style: Editorial voice — casual, direct, insightful

ANNOTATIONS TO ADD:
[List each annotation, e.g.:]

. PURPLE ARROW pointing to [UI element]:
   - Hand-drawn wobbly arrow in Purple (AC)
   - Text annotation: "THIS IS THE PROBLEM"
   - Thick stroke, clear pointing direction
   - Position: [Location on screenshot]

. TEAL CIRCLE around [UI area]:
   - Hand-drawn imperfect circle in Teal (B)
   - Text annotation: "notice this pattern"
   - Slightly wobbly outline
   - Position: [Area to highlight]

. BLACK UNDERLINE beneath [text]:
   - Hand-drawn wavy underline in Black ()
   - Emphasizes existing screenshot text
   - No additional annotation needed

. PURPLE CALLOUT box:
   - Hand-drawn box with arrow pointing to [element]
   - Text: "should have been here instead"
   - Purple (AC) box outline and text
   - Position: [Near relevant UI element]

[etc. for all annotations]

COLOR USAGE:
- Screenshot: Original colors (or slightly desaturated)
- Purple (AC): Critical annotations, "this is wrong" callouts
- Teal (B): Helpful context, "here's why" explanations
- Black (): Structural annotations (arrows, circles, underlines)
- Charcoal (DDD): General annotation text when not emphasized

CRITICAL REQUIREMENTS:
- Screenshot remains readable and recognizable
- Hand-drawn annotations clearly overlay (not integrated into UI)
- Annotations enhance understanding, point out insights
- Variable stroke weight, imperfect human-drawn quality
- Editorial voice in text ("this", not formal descriptions)
- Strategic color (not every annotation needs color)
- No gradients on annotations

Optional: Sign small in bottom corner in charcoal (DDD).
```

Alternative: Composite Workflow

If generating combined image is difficult:

. Generate annotation layer separately:   - Transparent background
   - Only arrows, circles, text annotations
   - Match screenshot dimensions

. Composite in image editor:   - Layer screenshot (bottom)
   - Layer annotations (top)
   - Adjust annotation opacity if needed

---

Step : Determine Aspect Ratio

Match screenshot aspect ratio:- Screenshot is :→ Use :- Screenshot is vertical phone UI → Use :- Screenshot is square → Use :- Screenshot is wide desktop → Use :
Preserve original screenshot proportions
---

Step : Execute Generation

Option A: Generate combined (if model supports):```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --reference-image /path/to/screenshot.png \
  --prompt "[ANNOTATION PROMPT]" \
  --size K \
  --aspect-ratio [match screenshot] \
  --output /path/to/annotated.png
```

Option B: Generate annotation layer, then composite manually
Immediately Open:```bash
open /path/to/annotated.png
```

---

Step : Validation (MANDATORY)

Must Have
- [ ] Screenshot readable— Original content clearly visible
- [ ] Annotations clear— Arrows/circles/text obviously hand-drawn overlays
- [ ] Editorial voice— Annotations sound like smart commentary
- [ ] Strategic pointing— Annotations highlight key insights, not random decoration
- [ ] Color emphasis— Purple on critical, teal on helpful
- [ ] Hand-drawn quality— Wobbly arrows, imperfect circles, gestural
- [ ] Functional value— Annotations actually enhance understanding

Must NOT Have
- [ ] Unreadable screenshot
- [ ] Polished digital annotation look
- [ ] Generic corporate callouts ("Feature A")
- [ ] Too many annotations (cluttered)
- [ ] Formal voice (should be casual, direct)
- [ ] Perfect straight arrows or circles

If Validation Fails

| Problem | Fix |
|---------|-----|
| Screenshot too dark | Lighten/desaturate screenshot layer, increase annotation contrast |
| Annotations too polished | Emphasize "hand-drawn wobbly arrows, imperfect circles, gestural sketch" |
| Voice too formal | Rewrite annotations in casual voice: "this right here" |
| Can't tell what's being pointed out | Larger/bolder arrows, clearer pointing direction |
| Too cluttered | Reduce annotations to -key insights only |
| Looks corporate | Reference "editorial annotation style, smart person's markup, hand-drawn notes" |

---

Example Use Cases

Example : ChatGPT UI Critique
- Screenshot:ChatGPT conversation interface
- Annotations:  - Purple arrow: "this prompt engineering is bad"
  - Teal circle: "notice how it avoided the question"
  - Black underline: Emphasizing problematic output
- Aspect::
Example : Code Review
- Screenshot:Python code snippet
- Annotations:  - Purple box: "bottleneck right here"
  - Teal arrow: "clever use of list comprehension"
  - Black circle: Highlighting security issue
- Aspect::(code block)

Example : UX Flow Breakdown
- Screenshot:Mobile app workflow (multiple screens)
- Annotations:  - Numbered purple arrows showing flow
  - Teal notes on each step: "where users drop off"
  - Black boxes highlighting UI elements
- Aspect::(vertical phone layout)

---

Quick Reference

Annotated Screenshot Formula:```
. Prepare screenshot (capture, crop, optionally desaturate)
. Plan annotations (what to mark, commentary, colors)
. Construct prompt OR composite manually
. Match screenshot aspect ratio
. Generate/composite annotations
. Validate for clarity and voice
```

Color Strategy:- Screenshot: Original colors (or slightly faded)
- Purple: Critical annotations
- Teal: Helpful context
- Black: Structural marks

Voice:- Casual, direct, editorial commentary
- "this is the issue" not "Area A shows problem"

---

The workflow: Prepare → Plan → Annotate → Generate → Validate → Complete