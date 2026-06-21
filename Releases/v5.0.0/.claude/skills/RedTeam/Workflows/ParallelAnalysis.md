Red Team Parallel Analysis Workflow

Overview

Military-grade adversarial analysis using parallel agent deployment. Breaks arguments into atomic components, attacks from different expert perspectives simultaneously, synthesizes findings, and produces the ultimate counter-argument.

Key Philosophy:This is NOT about nitpicking or being contrarian. It's about finding the fundamental flaw in an argument's logic - the assumption that, if challenged, causes the entire structure to collapse.

---

The Five Phases

PHASE : DECOMPOSITION
Break the argument into atomic claims using storyexplanation methodology.

PHASE : PARALLEL ANALYSIS
Launch specialized agents (each: engineers, architects, pentesters, interns) with unique personalities to examine BOTH strengths AND weaknesses from their perspective.

PHASE : SYNTHESIS
Collect all analyses and identify convergent insights (both supporting and opposing).

PHASE : STEELMAN
Produce an -point story explanation (-words each) representing the STRONGEST possible version of the original argument.

PHASE : COUNTER-ARGUMENT
Produce an -point story explanation (-words each) representing the strongest possible rebuttal.

---

PHASE : Decomposition Protocol

Step .: First Principles Deconstruction (NEW)
Before traditional decomposition, invoke FirstPrinciples/Deconstruct:
```
→ FirstPrinciples/Deconstruct on the argument
```

This surfaces:
- What the argument is actually made of (constituent parts)
- The fundamental truths vs. assumed truths
- The gap between stated components and actual components

Output feeds into Step ..

Step .: Extract the Core Argument
Read the content and identify:
- The central thesis (one sentence)
- The key supporting claims (numbered list)
- The implicit assumptions (what must be true for this to work)
- The logical chain (A → B → C → conclusion)

Step .: Break Into Atomic Pieces
Using storyexplanation methodology, decompose the argument into exactly discrete claims:

```
CLAIM : [First atomic claim from the argument]
CLAIM : [Second atomic claim]
...
CLAIM : [Twenty-fourth atomic claim]
```

Each claim should be:
- Self-contained (understandable without other claims)
- Specific (not vague or general)
- Attackable (a competent critic could challenge it)

---

PHASE : Parallel Agent Deployment

Launch Protocol
Deploy agents in a SINGLE message with multiple Task tool calls. Each agent receives:
. The full original argument
. The -claim decomposition
. Their specific personality and attack angle
. Instructions to return a focused critique

Agent Roster: Engineers

Each focuses on technical and logical rigor:

| Agent | Personality | Attack Angle |
|-------|-------------|--------------|
| EN-| The Skeptical Systems Thinker- years building distributed systems. Trusts nothing. | "Where does this break at scale?" |
| EN-| The Evidence Demander- Won't accept claims without data. | "Show me the numbers that prove this." |
| EN-| The Edge Case Hunter- Finds the % scenario that destroys assumptions. | "What happens when X is not true?" |
| EN-| The Historical Pattern Matcher- Has seen every failure mode. | "We tried this in and here's what happened." |
| EN-| The Complexity Realist- Knows simple solutions hide hard problems. | "This is harder than it sounds because..." |
| EN-| The Dependency Tracer- Follows assumptions to their roots. | "This assumes X, which assumes Y, which is false." |
| EN-| The Failure Mode Analyst- Thinks only about how things break. | "Here are ways this fails catastrophically." |
| EN-| The Technical Debt Accountant- Calculates hidden costs. | "The real price of this approach is..." |

Agent Roster: Architects

Each focuses on structural and systemic issues:

| Agent | Personality | Attack Angle |
|-------|-------------|--------------|
| AR-| The Big Picture Thinker- Sees how pieces connect (or don't). | "This ignores how it fits into the larger system." |
| AR-| The Trade-off Illuminator- Nothing is free. | "You gain X but lose Y, and Y matters more." |
| AR-| The Abstraction Questioner- Challenges categorical thinking. | "These aren't the same category of problem." |
| AR-| The Incentive Mapper- Follows the money and motivation. | "Who benefits from this being true?" |
| AR-| The Second-Order Effects Tracker- Thinks three moves ahead. | "This causes A, which causes B, which destroys C." |
| AR-| The Integration Pessimist- Knows interfaces are where things break. | "This doesn't compose with existing reality." |
| AR-| The Scalability Skeptic- What works for doesn't work for ,. | "This can't scale because..." |
| AR-| The Reversibility Analyst- Some decisions can't be undone. | "Once you do this, you can't go back, and here's why that's bad." |

Agent Roster: Pentesters

Each focuses on adversarial and security thinking:

| Agent | Personality | Attack Angle |
|-------|-------------|--------------|
| PT-| The Red Team Lead- Thinks like an attacker /. | "Here's how I'd exploit this logic." |
| PT-| The Assumption Breaker- Finds the weak link in the chain. | "This depends on X, and X is false." |
| PT-| The Game Theorist- Models rational adversaries. | "A smart opponent would simply..." |
| PT-| The Social Engineer- Knows humans are the weak point. | "People will route around this because..." |
| PT-| The Precedent Finder- Has seen this pattern before. | "This is just [past example] in a new dress." |
| PT-| The Defense Evaluator- Judges if mitigations actually work. | "This defense fails because attackers can..." |
| PT-| The Threat Modeler- Maps attack surfaces systematically. | "You've left this entire surface undefended." |
| PT-| The Asymmetry Spotter- Finds where defenders are outmatched. | "Attackers have unlimited time; defenders don't." |

Agent Roster: Interns

Each brings fresh eyes and unconventional perspectives:

| Agent | Personality | Attack Angle |
|-------|-------------|--------------|
| IN-| The Naive Questioner- Asks "why" until it breaks. | "But why do we assume X in the first place?" |
| IN-| The Analogy Finder- Connects to seemingly unrelated fields. | "This is just like [other field] where it failed." |
| IN-| The Contrarian- Takes the opposite position instinctively. | "What if the exact opposite is true?" |
| IN-| The Common Sense Checker- If it sounds too clever, it's wrong. | "This violates basic intuition because..." |
| IN-| The Zeitgeist Reader- Knows what's actually happening on the ground. | "In practice, nobody actually does this because..." |
| IN-| The Simplicity Advocate- Occam's razor everything. | "The simpler explanation is..." |
| IN-| The Edge Lord- Pushes every argument to its absurd conclusion. | "If this is true, then [absurd consequence] must also be true." |
| IN-| The Devil's Intern- Finds the argument the author hoped nobody would make. | "The uncomfortable truth nobody wants to say is..." |

Agent Prompt Template

Each agent receives this prompt (customized with their personality):

```
BALANCED ANALYSIS - [AGENT ID]: [PERSONALITY NAME]

You are [PERSONALITY DESCRIPTION]. Your perspective is: "[PERSPECTIVE]"

THE ARGUMENT TO ANALYZE:
[Full original argument]

DECOMPOSED INTO CLAIMS:
[-claim breakdown]

YOUR MISSION:
Using your specific personality and perspective, provide an INDEPENDENT BALANCED ANALYSIS examining BOTH the strengths AND weaknesses of this argument.

PART A - STRENGTHS (What's RIGHT about this argument):
. Which claim(s) are strongest? (cite claim numbers)
. What evidence or logic supports them? (-sentences)
. Why should we take this seriously? (sentence)

PART B - WEAKNESSES (What's WRONG about this argument):
. Which claim(s) are weakest? (cite claim numbers)
. What's the flaw? (-sentences)
. Why is this a problem? (sentence)

OUTPUT FORMAT:
Return exactly this structure:

[AGENT ID] ANALYSIS:
Strongest Point FOR the Argument:[Claim X]
[-sentences on why this is valid/compelling]
Take seriously because: [sentence]

Strongest Point AGAINST the Argument:[Claim Y]
[-sentences on the flaw]
Problematic because: [sentence]

Overall Assessment:[One sentence - your independent verdict on the argument's merit]

Be intellectually honest. Find REAL strengths, not strawmen to knock down.
Find REAL weaknesses, not nitpicks.
Your job is balanced analysis from your unique perspective.
```

---

PHASE : Synthesis Protocol

Step .: Collect All Analyses
Wait for all agents to complete. Compile their outputs.

Step .: Identify Convergent STRENGTHS
Look for supporting points that multiple agents independently identified:
- If + agents validated the same point → STRONG FOUNDATION
- If -agents validated the same point → NOTABLE STRENGTH
- If -agents found a unique strength → INTERESTING SUPPORT

Step .: Identify Convergent WEAKNESSES
Look for critiques that multiple agents independently identified:
- If + agents hit the same point → CRITICAL WEAKNESS
- If -agents hit the same point → SIGNIFICANT WEAKNESS
- If -agents hit a unique point → NOTABLE INSIGHT

Step .: Categorize Insights
Group by type:
STRENGTHS:. Valid Evidence- Claims with solid support
. Sound Logic- Reasoning that follows
. Real Problem Identified- Genuine issue being addressed
. Historical Support- Precedents that validate

WEAKNESSES:. Logical Fallacies- Flawed reasoning structure
. Missing Evidence- Claims without support
. Hidden Assumptions- Unstated premises that may be false
. Counterexamples- Cases where the argument fails
. Precedent Contradictions- History says otherwise
. Second-Order Effects- Consequences the argument ignores

Step .: Identify Core Thesis Validity
Determine: Is the core thesis fundamentally sound with flawed execution, or fundamentally flawed despite good intentions?

---

PHASE : Steelman Protocol

Purpose
Before attacking, construct the STRONGEST possible version of the argument. This ensures intellectual honesty and prevents strawmanning.

Step .: Identify Best Evidence
From the synthesis, what are the strongest supporting points?

Step .: Reconstruct Optimal Argument
If the author had made their case PERFECTLY, what would it look like?

Step .: Output Format (points, -words each)

```
STEELMAN

The Position (Best Version):[One sentence - the strongest formulation]

The Strongest Case FOR This Argument:
. [-words - the most compelling opening point]

. [-words - strong supporting evidence]

. [-words - historical precedent or analogy that supports]

. [-words - valid concern being addressed]

. [-words - what the critics get wrong]

. [-words - the real risk if ignored]

. [-words - why smart people believe this]

. [-words - the strongest single reason to take this seriously]

Validity Assessment:[One sentence on the legitimate core concern]
```

---

PHASE : Counter-Argument

First Principles Analysis

Before finalizing the counter-argument, invoke FirstPrinciples/Challenge:
```
→ FirstPrinciples/Challenge on all stated constraints and assumptions
```

This classifies every constraint as:
- HARD(physics/reality - cannot attack)
- SOFT(policy/choice - can be challenged)
- ASSUMPTION(unvalidated - prime attack target)

The most devastating critiques target assumptions classified as HARD that are actually SOFT.
Then apply these additional checks:

Step : Identify the argument's core claim type:- Causal ("X causes Y")
- Comparative ("X is better/worse than Y")
- Categorical ("X belongs to category Y")
- Predictive ("X will lead to Y")
- Normative ("We should/shouldn't do X")

Step : Surface hidden assumptions (from FirstPrinciples/Challenge output):- What must be true for this argument to work?
- What does the author take for granted?
- What evidence is assumed but not provided?
- Which "constraints" are actually choices?

Step : Check for historical precedent:- Has this exact argument been made before in another domain?
- What was the outcome when people accepted it?
- What was the outcome when people rejected it?

Step : Test logical validity:- Does the conclusion actually follow from the premises?
- Are there logical fallacies present?
- Is correlation being presented as causation?

Step : Ensure counter-argument defeats the STEELMAN:- Does it address the STRONGEST version of the argument?
- Or does it only defeat a weaker strawman?
- Would a proponent say "that's not what I meant"?

Output Format: -Point Story Explanation

The final output must be exactly numbered points, each -words:

```
RED TEAM VERDICT

The Position:[One sentence summary of what was red-teamed]

The Counter-Argument:
. [First key point - -words - establishes the fundamental flaw]

. [Second point - -words - develops the core weakness]

. [Third point - -words - provides historical precedent or analogy]

. [Fourth point - -words - addresses the hidden assumption]

. [Fifth point - -words - shows the counterexample or exception]

. [Sixth point - -words - reveals what's conveniently ignored]

. [Seventh point - -words - exposes the second-order effects]

. [Eighth point - -words - delivers the knockout conclusion]

Assessment:[One sentence on the argument's fundamental soundness after analysis]
```

Quality Criteria for Final Output

Each point should:
- Be self-contained and comprehensible alone
- Attack a real weakness, not a strawman
- Use plain language, not jargon
- Follow logically from previous points
- Build toward the devastating conclusion

The -point sequence should:
- Tell a coherent counter-narrative
- Escalate in impact
- End with the strongest possible objection
- Make the reader say "I hadn't thought of that"

---

Execution Checklist

```
 PHASE : Decomposition
   Invoke FirstPrinciples/Deconstruct on the argument (NEW)
   Read and understand the full argument
   Extract central thesis
   Identify supporting claims
   Surface hidden assumptions
   Break into exactly atomic claims

 PHASE : Parallel Analysis
   Prepare agent prompts with unique personalities
   Launch ALL agents in a SINGLE message (parallel)
   Each agent: engineer, architect, pentester, or intern type
   Each agent examines BOTH strengths AND weaknesses
   Wait for all agents to complete

 PHASE : Synthesis
   Collect all analyses
   Identify convergent STRENGTHS (+ agents = strong foundation)
   Identify convergent WEAKNESSES (+ agents = critical weakness)
   Categorize by type
   Determine core thesis validity

 PHASE : Steelman
   Identify best supporting evidence from synthesis
   Reconstruct optimal version of the argument
   Draft -point steelman explanation
   Each point: -words
   Present the STRONGEST case FOR the argument

 PHASE : Counter-Argument
   Invoke FirstPrinciples/Challenge on all constraints (NEW)
   Classify constraints as HARD/SOFT/ASSUMPTION
   Apply first-principles analysis (claim type, assumptions, precedent, validity)
   Draft -point counter-argument
   Each point: -words
   Verify logical flow and escalation
   End with knockout conclusion that addresses the steelman
```

---

Example: First Principles Pattern Recognition

Argument:"We should delay this product launch by six months to add more features."

First Principles Analysis:- Claim type:Normative ("we should do X")
- Hidden assumptions:More features = more success; competitors won't act; market timing is flexible
- Historical precedent:Many products failed by over-engineering; many succeeded by shipping MVP fast
- Logical validity:Doesn't follow that delay improves outcome without evidence on feature-value tradeoff

Steelman (points, -words each):
. Shipping incomplete products damages brand reputation in ways that take years to recover from.
. Customer acquisition cost is wasted if users churn due to missing core functionality they expected.
. Apple's delayed product releases consistently outperform rushed competitors on customer satisfaction metrics.
. The features we're adding directly address the top three complaints from our beta user research.
. Critics ignore that our competitors have those features—parity is table stakes, not gold-plating.
. Six months of development costs less than one year of customer support for a broken product.
. Engineering teams lose motivation when forced to ship work they know is incomplete and buggy.
. The real risk isn't delay—it's launching something we'll have to apologize for publicly later.

Counter-Argument (points, -words each):
. This assumes we know which features matter—but only real users reveal what actually drives value.
. Every month of delay is a month competitors can capture market share we'll never recover.
. Amazon, Google, and Facebook all shipped embarrassingly incomplete vproducts that dominated their markets.
. The argument conflates "more features" with "better product"—complexity often destroys rather than creates value.
. Six months assumes accurate estimation—software projects routinely take -x longer than predicted anyway.
. We can add features after launch; we cannot add back the time lost to a delayed launch.
. Customer feedback on a live product is worth more than six months of internal speculation.
. The fundamental error: treating product development as a single bet rather than an iterative learning process.

---

Integration Notes

This workflow requires:- Task tool for launching parallel agents
- Ability to launch + agents simultaneously
- Synthesis capability to process multiple agent outputs
- FirstPrinciples skillfor Deconstruct (Phase ) and Challenge (Phase )

Pairs well with:- `FirstPrinciples/Deconstruct` - breaks argument into fundamental parts (Phase )
- `FirstPrinciples/Challenge` - classifies constraints as HARD/SOFT/ASSUMPTION (Phase )
- `storyexplanation` skill for initial decomposition
- `extractalpha` for finding highest-signal critiques
- `research` skill for finding counterexamples and precedents

Time estimate:- Phase : -minutes (decomposition)
- Phase : -minutes (parallel execution)
- Phase : -minutes (synthesis)
- Phase : -minutes (final output)
- Total: ~-minutes for comprehensive red team

---

Last Updated:--