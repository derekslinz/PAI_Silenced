---
name: Sales
description: "Transforms product documentation into sales-ready narrative packages combining story explanation, charcoal gestural sketch art, and talking points. Pipeline: extract narrative arc → determine emotional register (wonder, determination, hope) → derive visual scene → generate assets. Three workflows: CreateSalesPackage (full pipeline — narrative + charcoal sketch visual + key talking points), CreateNarrative (story only, -numbered points in first-person conversational voice, captures why-it-matters not what-it-does), CreateVisual (charcoal gestural sketch with transparent background for presentation versatility). Charcoal gestural sketch is the mandatory visual style — minimalist composition with breathing space. Output is tied directly to what's being sold — clear, succinct, effective. Integrates StoryExplanation (for narrative arc extraction) and Art essay-art workflow (for visual generation) internally. USE WHEN: sales, proposal, pitch deck, value proposition, sales narrative, sales deck, sales package, turn this into a pitch, create a sales story, sales materials, product pitch, transform docs to sales, sales script. NOT FOR Hormozi $M frameworks, value equation, irresistible offer, or VOC mining (use _SALESHORMOZI). NOT FOR standalone diagrams or illustrations (use Art)."
effort: medium
---

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Sales/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

Sales Skill

Transform product documentation into compelling sales narratives and visual assets.
Takes technical documentation, product information, or feature descriptions and produces:
. Sales Narratives- Story explanations that capture the value proposition
. Visual Assets- Charcoal sketch art that conveys the concept visually
. Scripts- Clear, succinct, effective messaging tied to what you're selling

---

The Pipeline

```
PRODUCT DOCUMENTATION
        ↓
[] STORY EXPLANATION — Extract the narrative arc (what's the real value?)
        ↓
[] EMOTIONAL REGISTER — What feeling should this evoke? (wonder, determination, hope, etc.)
        ↓
[] VISUAL CONCEPT — Derive scene from narrative + emotion
        ↓
[] GENERATE ASSETS — Create visual + narrative package
        ↓
SALES-READY OUTPUT
```

---

Workflows

Full Sales Package → `Workflows/CreateSalesPackage.md`
The complete pipeline.Takes product docs and produces:
- Sales narrative (story explanation)
- Visual asset (charcoal sketch)
- Key talking points

Sales Narrative Only → `Workflows/CreateNarrative.md`
Just the story.Converts technical docs into compelling narrative.

Visual Asset Only → `Workflows/CreateVisual.md`
Just the visual.Creates charcoal sketch art for existing narrative.

---

Output Format

Sales Narrative
- -point story explanation
- First person, conversational
- Captures the "why this matters" not just "what it does"
- Ready for sales scripts, presentations, pitches

Visual Asset
- Charcoal gestural sketch aesthetic
- Minimalist composition with breathing space
- Transparent background for versatility
- Captures the emotional core of the value proposition

---

Example

Input:Technical documentation about AI code review tool

Output:- Narrative:"This tool doesn't just find bugs—it understands your codebase like a senior engineer who's been there for years. It catches the subtle issues that slip through PR reviews..."
- Visual:Gestural sketch of human developer and AI figure collaborating, both examining the same code output
- Talking Points:  . Senior engineer understanding, not just pattern matching
  . Catches what humans miss in PR reviews
  . Learns your specific codebase patterns

---

Integration

This skill combines:
- storyexplanation skill- For narrative extraction
- art skill (essay-art workflow)- For visual generation
- Sales-specific framing- Value proposition focus

---

The goal:Sales teams get materials that are highly tied to what they're selling, clear, succinct, and effective.

---

Examples

Example : Full sales package from docs```
User: "create a sales package for this product" [provides docs]
→ Extracts narrative arc using storyexplanation
→ Determines emotional register (wonder, determination, hope)
→ Generates charcoal sketch visual + narrative + talking points
```

Example : Sales narrative only```
User: "turn this technical doc into a sales pitch"
→ Reads documentation and extracts value proposition
→ Creates -point story explanation in first person
→ Returns conversational narrative ready for sales scripts
```

Example : Visual asset for existing narrative```
User: "create a visual for this sales story"
→ Analyzes narrative for emotional core
→ Derives scene concept from story + emotion
→ Generates charcoal gestural sketch with transparent background
```

Gotchas

- Charcoal sketch art is the visual style for sales assets.Don't use other art styles unless explicitly asked.
- Pitch decks must tell a STORY, not list features.Narrative arc matters more than bullet points.
- NOT for Hormozi frameworks— use _SALESHORMOZI for $M Offers/Leads methodology.

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Sales","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
