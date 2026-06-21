Conceptual Timelines & Progressions Workflow

Hand-drawn timelines showing evolution, trends, and transformations using UL aesthetic.
---

Creates ILLUSTRATED TIMELINES— chronological progressions with visual metaphors for each stage, combining narrative arc with temporal information.

---

Purpose

Conceptual timelines show change over time through illustrated progression. Unlike simple date lists, these timelines use visual metaphors at each stageto show transformation, evolution, or historical development.

Use this workflow for:- "The Evolution of X"
- Trend analysis over time
- Historical perspectives
- Before → During → After progressions
- Transformation journeys
- Era comparisons

---

Visual Aesthetic: Illustrated Progression

Think:Hand-drawn timeline with small illustrations at each milestone

Core Characteristics
. Temporal flow— Clear left-to-right or top-to-bottom progression
. Illustrated milestones— Small visual metaphor at each point
. Hand-drawn timeline— Organic line connecting events (not ruler-straight)
. Typography hierarchy— -tier system for dates, labels, annotations
. Narrative arc— Shows transformation, not just chronology
. Editorial style— Maintains UL flat color, black linework aesthetic
. Scannable progression— Easy to follow the flow of time

---

Color System for Timelines

Structure
```
Black — Timeline spine/line, all primary structure
```

Emphasis & Progression
```
Deep Purple AC — Key turning points, critical milestones
Deep Teal B — Secondary events, supporting milestones
Charcoal DDD — All text (dates, labels, annotations)
```

Background
```
White FFFFFF or Light Cream FED```

Color Strategy
- Timeline line in black
- -most important milestones in purple
- Supporting milestones in teal
- Most events remain black with charcoal text

---

MANDATORY WORKFLOW STEPS

Step : Define Timeline Structure

Identify what you're showing:
. What's evolving?(e.g., AI development, security paradigms, organizational thinking)
. Time span?(e.g., -, past years, projected future)
. Key milestones?(List -major points - too many becomes cluttered)
. What's the narrative arc?(e.g., collapse → crisis → renewal, winter → spring → summer)

Output:```
SUBJECT: [What's changing over time]
TIME SPAN: [Start year] → [End year]

NARRATIVE ARC: [The transformation story, e.g., "From hype to disillusionment to practical value"]

KEY MILESTONES:
. [Year/Period]: [Event] — [Metaphor for this stage]
. [Year/Period]: [Event] — [Metaphor for this stage]
. [Year/Period]: [Event] — [Metaphor for this stage]
. [Year/Period]: [Event] — [Metaphor for this stage]
...

TURNING POINTS (Purple highlights):
- [Which -milestones are most critical]
```

---

Step : Design Timeline Layout

Plan the visual flow:
. Orientation:   - Horizontal (left-to-right): Traditional, good for desktop/wide
   - Vertical (top-to-bottom): Mobile-friendly, scrollable
   - Curved/organic: More artistic, less rigid

. Milestone representation:   - What small illustration represents each stage
   - How milestones connect to timeline (above/below, branching)
   - Size variation (bigger for more important events)

. Spacing:   - Even spacing (visual balance)
   - Proportional spacing (matches actual time)
   - Clustered spacing (groups related events)

Output:```
ORIENTATION: [Horizontal / Vertical / Curved]

TIMELINE STRUCTURE:
- Main line: [Black hand-drawn line, slightly wobbly]
- Milestones: [Small illustrated circles/nodes along line]
- Labels: [Above or below timeline]

MILESTONE ILLUSTRATIONS:
. [Year]: [Small icon/metaphor] — [e.g., "seedling" for beginning]
. [Year]: [Small icon/metaphor] — [e.g., "storm" for crisis]
. [Year]: [Small icon/metaphor] — [e.g., "sunrise" for renewal]
...

SPACING: [Even / Proportional / Clustered]

COLOR HIGHLIGHTS:
- Purple: [Critical milestone(s)]
- Teal: [Supporting milestone(s)]
- Black: [Standard milestones]
```

---

Step : Construct Prompt

Prompt Template

```
Hand-drawn conceptual timeline in editorial illustration style.

STYLE REFERENCE: Illustrated history timeline, hand-drawn progress chart, editorial time progression

BACKGROUND: [White FFFFFF OR Light Cream FED] — clean, flat

AESTHETIC:
- Hand-drawn timeline (organic line, slightly wobbly, not ruler-straight)
- Small illustrated metaphors at each milestone
- Variable stroke weight (timeline thicker, details thinner)
- Editorial flat color with strategic purple/teal accents
- Imperfect but intentional placement

ORIENTATION: [Horizontal left-to-right / Vertical top-to-bottom]

TIMELINE STRUCTURE:
- Black () timeline spine running [horizontally/vertically]
- [Number] milestone points along timeline
- Each milestone has: small circle/node + illustration + label
- Hand-drawn connecting line with slight organic waviness

TYPOGRAPHY SYSTEM (-TIER):

TIER - TIMELINE TITLE (Advocate Block Display):
- "[TIMELINE TITLE IN ALL-CAPS]"
- Font: Advocate style, extra bold, hand-lettered, all-caps
- Size: x larger than body text
- Color: Black - Position: Top or left side
- Example: "THE EVOLUTION OF ARTIFICIAL INTELLIGENCE"

TIER - DATES/PERIODS (Concourse Sans):
- "[]", "[]", "[]", etc.
- Font: Concourse geometric sans-serif
- Size: Medium readable
- Color: Charcoal DDD
- Position: Along timeline at each milestone

TIER - MILESTONE DESCRIPTIONS (Advocate Condensed Italic):
- "symbolic AI era", "deep learning breakthrough", etc.
- Font: Advocate condensed italic
- Size: % of Tier - Color: Charcoal DDD (or Purple/Teal for highlighted events)
- Position: Near each milestone node

MILESTONES TO ILLUSTRATE:
[List each point chronologically, e.g.:]

. [Year]: [Event name]
   - Illustration: [Small hand-drawn icon/metaphor, e.g., "tiny seed sprouting"]
   - Color: Black node with charcoal text
   - Position: [Along timeline at this point]

. [Year]: [Critical event]
   - Illustration: [Metaphor, e.g., "lightning bolt"]
   - Color: Purple (AC) node and illustration — KEY TURNING POINT
   - Position: [Emphasized size, highlighted]

. [Year]: [Event name]
   - Illustration: [Metaphor]
   - Color: Teal (B) node
   - Position: [Along timeline]

[etc. for all milestones]

VISUAL METAPHORS:
- Each milestone illustrated with small simple icon
- Metaphors show the nature/feeling of that era
- Hand-drawn sketch quality, not detailed illustrations
- Examples: seedling, storm cloud, rising sun, mountain peak, valley, crossroads

COLOR USAGE:
- Black () for timeline spine and most milestone nodes
- Deep Purple (AC) for [-critical turning points] — nodes and illustrations
- Deep Teal (B) for [supporting important events]
- Charcoal (DDD) for all text

CRITICAL REQUIREMENTS:
- Hand-drawn timeline (NOT straight digital line)
- Clear temporal progression [left-to-right / top-to-bottom]
- Small illustrated metaphors at each point (simple, sketchy)
- -tier typography hierarchy
- Strategic color on key milestones only
- No gradients, flat colors only
- Maintains editorial illustration aesthetic
- Easy to scan and follow progression

Optional: Sign small in bottom right corner in charcoal (DDD).
```

---

Step : Determine Aspect Ratio

| Timeline Type | Aspect Ratio | Reasoning |
|---------------|--------------|-----------|
| Horizontal timeline | :or :| Wide format for left-to-right flow |
| Vertical timeline | :| Tall format for top-to-bottom progression |
| Balanced/compact | :| Square for shorter timelines |
| Long historical | :| Maximum width for many events |

Default: :(horizontal)— Classic timeline orientation

---

Step : Execute Generation

```bash
bun run ~/.claude/skills/art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output /path/to/timeline.png
```

Model Recommendation:nano-banana-pro (best for dates/text rendering)

Immediately Open:```bash
open /path/to/timeline.png
```

---

Step : Validation (MANDATORY)

Must Have
- [ ] Clear temporal flow— Obviously progresses through time
- [ ] Readable dates/labels— All text legible in hierarchy
- [ ] Illustrated milestones— Visual metaphors at each point
- [ ] Hand-drawn timeline— Organic line, not digital/straight
- [ ] Narrative arc visible— Shows transformation, not just dates
- [ ] Strategic color— Purple on critical moments, not everywhere
- [ ] Scannable— Easy to follow progression at a glance

Must NOT Have
- [ ] Perfectly straight timeline
- [ ] Generic boring milestone markers (just dots)
- [ ] Illegible dates or cluttered text
- [ ] Too many milestones (overwhelming)
- [ ] Color chaos (everything highlighted)
- [ ] Looks like Gantt chart or business timeline

If Validation Fails

| Problem | Fix |
|---------|-----|
| Timeline too straight | "Organic hand-drawn line, slight waviness, imperfect curve" |
| No visual interest | "Small illustrated metaphors at each milestone showing the era's character" |
| Text unreadable | Increase spacing, strengthen typography tier sizes |
| Too cluttered | Reduce milestones to -key points, simplify |
| Looks corporate | Reference "editorial illustration style, hand-drawn sketch aesthetic" |
| Missing narrative | Emphasize metaphors that show transformation: "seedling → storm → sunrise" |

---

Example Use Cases

Example : "AI Winter → Spring → Summer"
- Timeline:s → → Future
- Milestones:Winter (snowflake), Thaw (ice melting), Spring (bud), Summer (sun)
- Color:Purple on "Deep Learning Breakthrough" ()
- Orientation:Horizontal :
Example : "Security Thinking Evolution"
- Timeline:→ Present
- Milestones:Each era with metaphor (fortress → ecosystem → adaptive)
- Color:Purple on paradigm shifts
- Orientation:Vertical :
Example : "Startup Journey: Idea to Scale"
- Timeline:Year → Year - Milestones:Seedling → Sprout → Tree → Forest
- Color:Teal on funding rounds, purple on profitability
- Orientation:Horizontal :
---

Quick Reference

Timeline Formula:```
. Define timeline structure (subject, span, milestones, narrative)
. Design layout (orientation, metaphors, spacing)
. Construct prompt with illustrated progression
. Choose aspect ratio for orientation
. Generate with nano-banana-pro
. Validate for clarity and visual narrative
```

Color Strategy:- Timeline spine: Black
- -critical moments: Purple
- Supporting events: Teal
- Text: Charcoal

Metaphor Selection:- Choose simple, recognizable icons for each era
- Icons should show the FEELING/CHARACTER of that period
- Progression should tell a visual story

---

The workflow: Define → Design → Construct → Generate → Validate → Complete