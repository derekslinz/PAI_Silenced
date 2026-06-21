ConceptMap Workflow — SystemsThinking

Purpose

Build a concept map— a visual network of entities and their labeled relationships — to understand a domain's structure. Unlike causal loop diagrams (which model dynamics), concept maps model relationshipsand semantics. Use them when you're trying to understand "what are the things, and how are they connected?"

Concept maps come from Joseph Novak's work on meaningful learning (Cornell, ). The key invariant: every link is a labeled proposition, not just an arrow.

Invocation

- "Concept map"
- "Map the entities"
- "Relationship map"
- "Novak-style mapping"
- Early-stage domain exploration, onboarding docs, architecture overviews, knowledge capture

Not for:dynamic behavior (use CausalLoop), incident causation (use RootCauseAnalysis), hierarchical decomposition (use an outline or tree).

The Structure

```
[CONCEPT A]  ──"contains"── [CONCEPT B]
    │
    │"interacts with"
    ▼
[CONCEPT C]  ──"depends on"── [CONCEPT D]
```

Components:- Concepts— nodes, usually nouns or noun phrases, enclosed in boxes
- Links— labeled edges, describing the relationship between concepts
- Propositions— concept + link + concept reads as a short statement: "Concept A contains Concept B"
- Cross-links— links between concepts in different parts of the map, revealing non-obvious connections (these are often the most valuable insights)
- Hierarchy— most general concepts at top, specifics at bottom (not strictly required but helpful)

Execution

Step : Define the Focus Question

Every concept map answers a question. Without the question, the map becomes a disorganized bag of concepts.

```
FOCUS QUESTION: [Specific question the map should answer]
```

Good examples:
- "How does authentication flow through our platform?"
- "What are the components of the PAI Algorithm, and how do they relate?"
- "What does Hconsist of, and how do the pieces depend on each other?"

Bad examples:
- "What is authentication?" (too broad)
- "Show me the auth architecture" (not a question)

Step : List Key Concepts

Extract -concepts from the domain. Order by generality — most general first, most specific last.

Concepts should be:
- Nouns or noun phrases— "User session," "JWT token," "OAuth provider"
- At roughly similar levels of abstraction— don't mix "cloud computing" with "HTTP header"
- Concrete enough to have relationships— "good architecture" is too vague to map

Step : Draft the Hierarchy

Arrange concepts from general (top) to specific (bottom). This is the conceptual hierarchy— it gives the map spatial structure.

If no hierarchy emerges, that's a signal: either the concepts are all at the same level (flat map, no hierarchy needed), or you're missing organizing concepts (add them).

Step : Draw Labeled Links

For each pair of related concepts, draw a link labeled with the relationship. Common link types:

```
"contains", "has", "is a", "is part of"
"uses", "depends on", "requires"
"produces", "creates", "results in"
"triggers", "responds to", "listens for"
"reads from", "writes to"
"authenticates", "authorizes", "validates"
"owns", "manages", "monitors"
"extends", "overrides", "implements"
"precedes", "follows", "parallels"
```

Every link must form a valid proposition when read concept-link-concept.If "User session [uses] JWT token" is true, the link is valid.

Step : Find Cross-Links

Cross-links connect concepts in different regions of the map — relationships that aren't obvious from the hierarchy.

Cross-links are the highest-value outputof concept mapping. They reveal non-obvious relationships, hidden dependencies, and unexpected interactions.

Example cross-link in a software architecture map: between "database connection pool" (bottom of data layer) and "request timeout policy" (middle of application layer). The cross-link "feeds back into" reveals that pool exhaustion affects timeout behavior — non-obvious unless the map is drawn.

Step : Review for Completeness

Check:
- Focus question answered?Walk through the map trying to answer the focus question aloud.
- Propositions make sense?Read each link triplet; they should form grammatically valid statements.
- No orphan concepts?Every concept should have at least one link. Orphans suggest missing relationships.
- Cross-links present?If none, you may be missing the valuable non-obvious connections.
- Appropriate granularity?-concepts for most maps. Under is too thin; over is unreadable.

Step : Render

Concept maps benefit enormously from visual rendering. Use the Art skill:

```bash
Skill("Art", "Mermaid concept map with focus question [Q], concepts: [list], labeled links: [list], cross-links: [list]")
```

Mermaid or graphviz both work. Mermaid renders inline in most editors; graphviz produces higher-quality static images.

Output

```
CONCEPT MAP: [topic]

FOCUS QUESTION: [...]

CONCEPTS (general → specific):
- [C], [C], ..., [Cn]

HIERARCHY:
  [C]
    ├─ [C]
    │   └─ [C]
    └─ [C]
        └─ [C]

PROPOSITIONS (concept → [link] → concept):
- [C] → [contains] → [C]
- [C] → [uses] → [C]
- ...

CROSS-LINKS:
- [C] → [feeds back into] → [C] — reveals non-obvious dependency
- [C] → [validates through] → [C] — hidden validation path

KEY INSIGHTS:
- [Insight from cross-link ]
- [Insight from cross-link ]
```

Worked Example — PAI Algorithm Subsystems

```
FOCUS QUESTION: What are the subsystems of the PAI Algorithm, and how do they interact?

CONCEPTS (general → specific):
- Algorithm (root)
- Phases, ISC Quality System, ISA, Capabilities
- OBSERVE, THINK, PLAN, BUILD, EXECUTE, VERIFY, LEARN
- FeedbackMemoryConsult, Advisor, LiveProbe, ConflictSurfacing
- IterativeDepth, ApertureOscillation, FirstPrinciples, Council, RedTeam, Science, SystemsThinking, RootCauseAnalysis

PROPOSITIONS:
- Algorithm → [has phases] → {OBSERVE, THINK, ..., LEARN}
- Algorithm → [uses] → ISA
- Algorithm → [enforces] → ISC Quality System
- OBSERVE → [selects] → Capabilities
- Capabilities → [include thinking skills] → {IterativeDepth, FirstPrinciples, ..., SystemsThinking, RootCauseAnalysis}
- THINK → [invokes] → Thinking skills
- VERIFY → [enforces] → Verification Doctrine
- Verification Doctrine → [includes] → {LiveProbe, Advisor, ConflictSurfacing}
- PLAN → [begins with] → FeedbackMemoryConsult
- LEARN → [writes to] → Knowledge Archive

CROSS-LINKS:
- ISC Quality System → [gates exit of] → OBSERVE  (governance cross-link)
- Advisor → [re-invoked by] → ConflictSurfacing (recursion cross-link)
- LEARN → [informs future] → OBSERVE (next-session cross-link)

INSIGHTS:
- The Algorithm is not linear — OBSERVE and LEARN are connected across sessions via Knowledge Archive.
- The Verification Doctrine has an internal loop (ConflictSurfacing re-invokes Advisor), which is a first-order structural protection against motivated reasoning.
- Thinking capabilities are selected in OBSERVE but invoked in THINK — separation of concerns.
```

Common Mistakes

- Unlabeled arrows.An unlabeled arrow is just "somehow related." The label is the entire value.
- Too many concepts.Over -and the map is unreadable. Split into sub-maps by region.
- Mixed abstraction levels."System" and "semicolon" in the same map is confusing. Keep concepts roughly homogeneous in scale.
- Missing cross-links.The hierarchy is the scaffolding; cross-links are the insight. A map without cross-links usually missed the interesting relationships.
- Trying to show causation.If arrows mean "causes," you want a CausalLoop diagram, not a concept map.
- Concepts that are verbs."Running," "processing," "deploying" are activities, not concepts. Re-noun them: "Deployment," "Processing step."

When to Use vs. Other Diagrams

| Goal | Diagram |
|------|---------|
| Understand what things areand how they relate| Concept Map|
| Understand how behavior is generated over time| CausalLoop |
| Understand why something happened| RCA (Fishbone, Whys) |
| Model hierarchical decomposition| Tree / outline |
| Model sequential steps| Flowchart |
| Model state transitions| State diagram |

Integration

- Feeds Iceberg— Layer (structure) often benefits from a concept map of the actors and relationships
- Feeds CausalLoop— concepts and relationships from the map inform variables and arrows
- Pairs with Knowledgeskill — concept maps make excellent Knowledge Archive entries
- Rendered via Artskill — Mermaid, Graphviz, or d
Attribution

Joseph D. Novak, concept map methodology developed at Cornell University (), building on David Ausubel's theory of meaningful learning. Canonical reference: Learning How to Learn(Novak & Gowin, ). Modern software: CmapTools (IHMC), Miro, d, Mermaid.
