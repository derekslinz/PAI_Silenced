BuildBible Workflow

Construct the comprehensive Story Bible — a PRD-based plan that maps the entire story across all seven layers from start to finish.

Purpose

The Story Bible is the central artifact of the WriteStory system. It IS the ISC for the story — a comprehensive, layered plan that becomes the verification criteria for every chapter written. This is what transforms scattered ideas into a structured, writable narrative.

Prerequisites

- Structured input from Interview workflow (or equivalent user-provided content)
- Read `StoryLayers.md` for layer definitions
- Read `StorrFramework.md` for character construction protocol
- Read `PressfieldFramework.md` for concept, hook, theme-question, villain design
- Read `PhasesAndEvents.md` for three-act phases and mandatory event positions
- Read `StoryStructures.md` for additional framework perspectives

Procedure

Step : Establish Story Parameters and Pressfield Foundation

From the Interview output or user input, confirm:
- Scope:Short story / Novella / Novel / Series
- Genre:Primary + secondary genres
- Aesthetic Profile:From AestheticProfiles.md
- POV:First person / Third limited / Third omniscient / Second / Multiple POV
- Tense:Past / Present

Then establish the Pressfield foundation (from `PressfieldFramework.md`):
- Concept:One sentence — the clothesline everything hangs from
- High Concept test:Does the one-sentence pitch get "I'd read that"?
- Theme-Question:The inquiry the story investigates (yes/no or either/or)
- Hook:How does the opening promise the concept?
- Villain design:Who/what embodies the counter-argument to the theme?
- The Gift:What wisdom will the hero bring back?

Step : Build Character Architecture

For EACH major character, follow the Storr Character Construction Protocol (from StorrFramework.md):

. Define the sacred flaw
. Establish the origin wound
. Set the external want
. Set the internal need (inverse of flaw)
. Define the philosophical purpose (how they connect to theme)
. Map the crisis point
. Choose arc direction (positive/negative/flat)
. Design status dynamics
. Plant mystery hooks
. Connect to theme

Create ISC criteria for each major character's arc:
```
TaskCreate: "ISC-CHAR-[Name]: [Character] transforms from [flaw state] to [new state]"
TaskCreate: "ISC-CHAR-[Name]: Sacred flaw [flaw] is established through behavior by [beat]"
TaskCreate: "ISC-CHAR-[Name]: Crisis forces choice between [flaw] and [need] at [beat]"
```

Step : Map the Plot Skeleton

Using the Phases and Events map (`PhasesAndEvents.md`) as scaffolding, map the plot through all three acts and their phases:

For EACH mandatory event in the Master Event Table:
. What event occurs?
. What causes it? (causal chain from previous event)
. What does it cause? (leads to next event)
. Which character decisions drive it?
. Does this scene hang from the Clothesline? (Pressfield test)

Create ISC criteria for major plot beats:
```
TaskCreate: "ISC-PLOT: Catalyst event [event] disrupts [character]'s world at ~%"
TaskCreate: "ISC-PLOT: Midpoint [false victory/defeat] raises stakes at ~%"
TaskCreate: "ISC-PLOT: All Is Lost moment exposes [character]'s sacred flaw at ~%"
```

Step : Design the Mystery Architecture

Map information management across the narrative:

. Primary mystery:What central question drives the whole story?
. Mystery timeline:When is each piece of information revealed?
. Clue plants:What must be planted early for later payoff?
. Red herrings:What false trails maintain uncertainty?
. Reveal cascade:How do revelations build on each other?

For each mystery element, track:
- Plant point (when/where it's introduced)
- Development points (when it gets complicated/redirected)
- Resolution point (when it's answered)
- Reader state (what the reader believes at each point)

Create ISC criteria:
```
TaskCreate: "ISC-MYSTERY: Primary mystery [question] introduced by [beat]"
TaskCreate: "ISC-MYSTERY: [N] clues planted before reveal at [beat]"
TaskCreate: "ISC-MYSTERY: At least [N] micro-mysteries active at any point"
```

Step : Build the World Framework

Map world elements needed for the story:

. Physical geography (only what the story visits/references)
. Political/power structures (only what affects characters)
. Rules/magic systems (if applicable — apply Sanderson's Laws)
. Cultural details (only what drives character behavior or conflict)
. History (only what matters to the present story)

Rule:Every world element must serve the story. If you can remove it and nothing changes, remove it.

Step : Map Relationship Arcs

For each key relationship:

. Initial state (how they meet, first dynamic)
. Tension points (disagreements, challenges)
. Deepening moments (vulnerability, shared experience)
. Crisis point (relationship tested)
. Resolution (new equilibrium)

Special attention to the Influence Characterrelationship — this is the relationship that most directly challenges the protagonist's sacred flaw.

Step : Define Prose Strategy

Based on the Aesthetic Profile:

. Which rhetorical figures to use at key moments
. Sentence length and complexity patterns
. POV consistency rules
. Dialogue voice guidelines per character
. Description density by scene type

Step : Assemble the Full Beat Map

Now create the FULL beat map — every major story beat with ALL seven layers mapped:

```markdown
Beat Map

Beat : Opening Image (-%)
- MEANING:[thematic element present]
- CHARACTER:[sacred flaw visible through behavior]
- PLOT:[establishing event]
- MYSTERY:[first question planted]
- WORLD:[initial setting established]
- RELATIONSHIP:[key bond introduced]
- PROSE:[register, tone, key figures planned]

Beat : Setup / Theme Stated (-%)
[same structure]

Beat : Catalyst (%)
[same structure]

... [continue for all beats]

Beat : Final Image (-%)
[same structure]
```

Step : Create the Story Bible PRD

Write the Story Bible as a PRD file:

Location:Project directory `.prd/` or `~/.claude/plans/`

```markdown
---
prd: true
id: PRD-{YYYYMMDD}-{story-slug}
status: IN_PROGRESS
created: {date}
updated: {date}
iteration: scope: [short-story | novella | novel | series]
genre: [primary genre]
aesthetic: [profile name]
parent: null
children: []
---

Story Bible: [Title]

> [One sentence: what this story is about thematically]

STATUS
| What | State |
|------|-------|
| Progress | /{N} criteria passing |
| Scope | [scope] |
| Next action | [first writing action] |

CHARACTERS
[Full character profiles with sacred flaws, wants, needs]

BEAT MAP
[Full -beat map with all layers per beat]

MYSTERY ARCHITECTURE
[Information management timeline]

WORLD FRAMEWORK
[Essential world elements]

RELATIONSHIP ARCS
[Key relationship timelines]

PROSE STRATEGY
[Aesthetic profile, figure deployment plan]

CRITERIA
- [ ] C: [First story criterion]
- [ ] C: [Second story criterion]
... [all ISC criteria from steps -]

LOG
[Session entries]
```

Step : Scale for Series (if applicable)

For multi-book series:
. Create a PARENT PRD for the series
. Create CHILD PRDs for each book
. Map cross-book arcs (character change that spans books)
. Track series-level mysteries and their per-book development
. Ensure each book works as a satisfying standalone AND advances the series

```
Parent: PRD-{date}-{series-slug}.md
Children:
  - PRD-{date}-{series-slug}--book-.md
  - PRD-{date}-{series-slug}--book-.md
  - PRD-{date}-{series-slug}--book-.md
```

Step : Output and Next Steps

Present the Story Bible to the writer with:
. Summary of what's been mapped
. Any gaps or decisions still needed
. Recommendations for which chapters to write first
. Option to run Exploreworkflow for any layer that needs creative development
. Option to jump directly to WriteChapterfor the strongest section

The Story Bible is now the living document that guides all writing.
