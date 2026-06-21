---
name: WriteStory
description: "Constructs fiction across seven simultaneous narrative layers (Meaning, Character Change, Plot, Mystery, World, Relationships, Prose) powered by Will Storr's Science of Storytelling, Pressfield's structure framework (Concept/Hook/Clothesline/Theme-as-question/Villain/Gift), and Mark Forsyth's Elements of Eloquence for rhetorical figures. Character arcs follow Storr's sacred flaw → crisis → transformation model. Anti-cliche system bans generic AI patterns. Story Bible is PRD-based — maps all layers from first scene to final beat. Scales from short story to multi-book series. Aesthetic is configurable per project (Adams, Tolkien, sparse sci-fi, etc.). Five workflows: Interview (extract story ideas), BuildBible (full layered plan), Explore (brainstorm/what-if), WriteChapter (prose with rhetorical devices), Revise (edit/polish/rewrite). USE WHEN: write story, fiction, novel, short story, book, chapter, story bible, character arc, plot outline, creative writing, worldbuilding, dialogue, prose, interview, build bible, brainstorm, explore ideas, what if, write chapter, write scene, write prose, revise, edit, improve, polish, rewrite, Will Storr, rhetorical figures, draft story, create story plan. NOT FOR narrative summaries of real content (use a narrative-explanation skill). NOT FOR AI-ism auditing (use a writing-audit skill)."
effort: high
---

WriteStory

Voice:`PAI/USER/WRITINGSTYLE.md` | AI patterns:`PAI/USER/AI_WRITING_PATTERNS.md`

Layered fiction writing system that constructs stories across seven simultaneous narrative dimensions, powered by Will Storr's The Science of Storytellingand Mark Forsyth's The Elements of Eloquence.

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/WriteStory/`

If this directory exists, load and apply:
- `PREFERENCES.md` - User preferences, default genre, aesthetic, voice
- Additional files specific to the skill

Workflow Routing

Route to the appropriate workflow based on the request.

When executing a workflow, output this notification directly:
```
Running the WorkflowNameworkflow in the WriteStoryskill to ACTION...
```

| Workflow | Trigger | File |
|----------|---------|------|
| Interview| "interview me", "extract my story ideas", "help me plan a story" | `Workflows/Interview.md` |
| BuildBible| "build story bible", "create story plan", "map the story" | `Workflows/BuildBible.md` |
| Explore| "explore ideas", "brainstorm", "creative exploration", "what if" | `Workflows/Explore.md` |
| WriteChapter| "write chapter", "write scene", "write prose", "draft" | `Workflows/WriteChapter.md` |
| Revise| "revise", "edit", "improve", "polish", "rewrite" | `Workflows/Revise.md` |

The Seven Story Layers

Every story in this system is constructed across seven simultaneous layers:

. Meaning— Theme, philosophical argument, lesson
. Character Change— Sacred flaw -> transformation arc (Storr)
. Plot— Cause-and-effect chain of events
. Mystery— Information management (reader knows vs. doesn't)
. World— Setting, politics, physical environment, rules
. Relationships— How key bonds evolve and pressure characters
. Prose— Rhetorical figures, voice, aesthetic, style

Core References

| Reference | File | Purpose |
|-----------|------|---------|
| Layer Architecture | `StoryLayers.md` | Seven-layer system definition |
| Storr Framework | `StorrFramework.md` | Character change, sacred flaw, mystery |
| Pressfield Framework | `PressfieldFramework.md` | Concept, Hook, Clothesline, Theme-as-question, Villain, Gift |
| Phases and Events | `PhasesAndEvents.md` | Three-act structure, phases, mandatory events with positions |
| Rhetorical Figures | `RhetoricalFigures.md` | Comprehensive rhetorical figures catalogue |
| Anti-Cliche System | `AntiCliche.md` | Freshness enforcement, banned patterns |
| Story Structures | `StoryStructures.md` | Dramatica, Story Grid, Sanderson, Hero's Journey |
| Aesthetic Profiles | `AestheticProfiles.md` | Genre and style configuration |
| Critic Profiles | `Critics.md` | Multi-pass review system for prose refinement |

Quick Reference

- Theoretical Foundation:Storr (character science) + Pressfield (concept/structure) + Forsyth (rhetoric) + classical rhetoric
- Story Bible:PRD-based plan mapping all layers start-to-finish
- Scale:Short story (s of ISC) to multi-book series (,s of ISC)
- Anti-Cliche:Built-in freshness system bans generic AI patterns
- Aesthetic:Configurable per project (Adams, Tolkien, sparse sci-fi, etc.)

Examples

Example : Starting from scratch```
User: "I have an idea for a fantasy novel about an elven princess raised by orcs"
→ Invokes Interview workflow
→ Extracts character concepts, world details, themes
→ Maps ideas across seven story layers
→ Produces structured input for BuildBible
```

Example : Building the full story plan```
User: "Build the story bible for my novel"
→ Invokes BuildBible workflow
→ Creates Story Bible PRD with all layers mapped start-to-finish
→ Identifies milestones, character transformations, mystery reveals
→ Outputs comprehensive layered narrative plan
```

Example : Writing actual prose```
User: "Write chapter based on the story bible"
→ Invokes WriteChapter workflow
→ Reads Story Bible PRD for chapter milestones across all layers
→ Deploys rhetorical figures for memorable dialogue
→ Produces fresh, anti-cliche prose in configured aesthetic
```

Gotchas

- Uses Will Storr's storytelling science— not generic creative writing. The methodology matters.
- Story bibles are the source of truth for series continuity.Always read the bible before writing new content.
- Rhetorical figures are specific literary devices— use them precisely, not as decoration.
- Character arcs follow Storr's model(flawed belief → crisis → transformation). Don't simplify to "character grows."

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"WriteStory","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
