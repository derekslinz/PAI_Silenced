Generate Hypotheses Workflow

Phase of the Scientific Cycle
Never test just one idea. This workflow ensures you generate multiple competing hypotheses before experimentation.

---

The Plurality Principle

NEVER generate just one hypothesis.
Single-hypothesis thinking leads to:
- Confirmation bias- you'll see evidence that supports it
- Missed alternatives- better solutions exist
- Overinvestment- sunk cost in one approach
- Narrow framing- the real solution might be orthogonal

Minimum: hypotheses. Better: -for important problems.
---

The Hypothesis Generation Process

Step : Divergent Phase (Quantity > Quality)

Generate as many ideas as possible without judgment.
Techniques:
- Brainstorming- rapid idea generation
- Reverse brainstorming- "How could we make this worse?"
- Analogy- "How do other domains solve this?"
- Constraint removal- "If we had unlimited [time/money/expertise]..."
- Orthogonal thinking- "What if the entire frame is wrong?"

```markdown
Raw Hypothesis List
. [Idea ]
. [Idea ]
. [Idea ]
...
[Generate -before filtering]
```

Use Council Skillfor multi-perspective brainstorming.
Use parallel agentsto generate ideas from different angles.

Step : Categorization Phase

Group hypotheses by type and approach.
```markdown
Hypothesis Categories

Root Cause Hypotheses:- [The problem is X because of Y]

Solution Hypotheses:- [Approach A would solve this]
- [Approach B would solve this]

Paradigm Hypotheses:- [The entire framing is wrong because...]

Null Hypothesis:- [Nothing is actually wrong / current state is optimal]
```

Step : Refinement Phase

Make each hypothesis specific and testable.
For each hypothesis:

```markdown
Hypothesis: [Short Name]

Claim:[Precise statement of what we believe]

Rationale:[Why we think this might be true]

Testable Prediction:If this hypothesis is correct, then [observable outcome]

Falsification Criteria:This hypothesis is WRONG if [observable outcome]

Cost to Test:[Time/resources needed]

Confidence Level:[Low/Medium/High] - [Why]
```

Step : Prioritization Phase

Rank hypotheses for testing order.
```markdown
Prioritized Hypothesis List

| Rank | Hypothesis | Likelihood | Impact | Test Cost | Priority Score |
|------|-----------|------------|--------|-----------|----------------|
|    | [Name]    | [H/M/L]    | [H/M/L] | [H/M/L]  | [L×I/C]       |
|    | [Name]    | [H/M/L]    | [H/M/L] | [H/M/L]  | [Score]       |
|    | [Name]    | [H/M/L]    | [H/M/L] | [H/M/L]  | [Score]       |
```

Priority Formula:(Likelihood × Impact) / Cost to Test

Test cheap, high-likelihood hypotheses first.

---

Hypothesis Quality Checklist

For each hypothesis, verify:

| Criterion | Question | |
|-----------|----------|---|
| Specific| Is it clear what this claims? | |
| Testable| Can we design an experiment? | |
| Falsifiable| Could evidence disprove it? | |
| Distinct| Does it differ from other hypotheses? | |
| Actionable| Would confirming it tell us what to do? | |

---

The Falsification Focus

Don't ask "How can I prove I'm right?"Ask "How can I prove I'm wrong?"
For each hypothesis, complete this sentence:
> "This hypothesis would be DISPROVEN if [specific observable outcome]"

If you can't complete this sentence, the hypothesis isn't testable.

---

Confirmation Bias Countermeasures

. Pre-Mortem
Before testing: "Imagine this hypothesis failed completely. What went wrong?"

. Devil's Advocate
Actively argue AGAINST your favorite hypothesis.

. Seek Disconfirming Evidence
For each hypothesis, ask: "What evidence would make me LESS confident?"

. Red Team
Use RedTeam skill to attack your hypotheses from angles.

. Consider the Null
Always include: "Maybe nothing is wrong" or "Maybe the current approach is optimal"

---

Multi-Agent Hypothesis Generation

For important problems, use parallel agents:

```
Agent : "Generate hypotheses from a technical perspective"
Agent : "Generate hypotheses from a user perspective"
Agent : "Generate hypotheses that challenge our assumptions"
Agent : "Generate orthogonal hypotheses from analogous domains"
```

Merge and deduplicate the results.

---

Template

```markdown
Hypothesis Document: [Problem Name]

Goal:[Reference to defined goal]
Date:[When generated]

Hypothesis Set

H: [Name]
Claim:[What we believe]
Rationale:[Why we think this]
Evidence For:[Supporting data]
Evidence Against:[Challenging data]
Falsification:WRONG if [outcome]
Test Cost:[Time/resources]
Confidence:[L/M/H]

H: [Name]
[Same structure]

H: [Name]
[Same structure]

[Minimum , preferably +]

Prioritization
. [H] - highest priority because [reason]
. [H] - second because [reason]
. [H] - third because [reason]

Null Hypothesis
[What if nothing needs to change?]
```

---

Common Pitfalls

Pitfall : Single Hypothesis
"I think it's the database"
"It could be: database, cache, API, or client-side rendering"

Pitfall : Unfalsifiable Hypotheses
"The code quality is poor"
"Specific module X has cyclomatic complexity > "

Pitfall : Confirmation Bias
Looking only for evidence that supports your favorite idea
Actively seeking evidence that would disprove each hypothesis

Pitfall : Attachment to Initial Hypothesis
"I'm % sure it's H, so let's focus on that"
"Let's test the cheapest hypotheses first regardless of confidence"

Pitfall : Missing the Null
Assuming something is definitely wrong
Considering: "What if this is working as intended?"

---

Integration with Next Phase

Hypotheses feed into DesignExperiment.

Each hypothesis should have:
- A clear falsification test
- Known cost to test
- Priority ranking

This enables efficient experiment design - test cheap, high-value hypotheses first.
