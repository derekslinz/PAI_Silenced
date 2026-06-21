Iterative Depth — Scientific Foundation

> The practice of examining the same problem from multiple structured angles to extract deeper understanding is one of the most widely validated techniques across human inquiry.

The Core Insight

"Iterative Depth" is not a single named technique — it is a meta-patternthat appears independently across virtually every serious domain of inquiry. The fact that cognitive scientists, AI researchers, requirements engineers, designers, and philosophers all independently converged on this pattern is itself strong evidence of its validity.

The pattern: Examining the same phenomenon N times, each from a systematically different angle, yields understanding that no single examination can achieve.
---

Validated Techniques by Domain

Cognitive Science & Epistemology

. Hermeneutic Circle(Hans-Georg Gadamer, )
Understanding emerges through iterative cycles between parts and whole. Each pass through a text refines pre-understanding, which changes what the next pass reveals. Understanding is "always on the way" — never complete from a single reading.
- Source: Truth and Method (); Stanford Encyclopedia of Philosophy- Maps to: Each iteration refines the "pre-understanding" of what the user wants
. Triangulation(Norman Denzin, )
Using multiple methods, investigators, theories, or data sources to study the same phenomenon. Four types: method triangulation, investigator triangulation, theory triangulation, data source triangulation. Overcomes single-method bias.
- Source: The Research Act (); PMC: Principles, Scope, and Limitations of Methodological Triangulation- Maps to: Each iteration IS a different "method" applied to the same problem
. Cognitive Flexibility Theory(Rand Spiro et al., )
Revisiting the same material from multiple perspectives at different times aids transfer to new situations and deeper understanding. "Criss-crossing the landscape" of a concept from different directions.
- Source: Cognition and Instruction, - Maps to: Each lens is a different "crossing" of the problem landscape
. Dialectical Thinking(Hegel, refined by many)
Thesis-antithesis-synthesis cycles. Examining a proposition, then its negation, then integrating both into a higher understanding. Each cycle deepens the analysis.
- Maps to: Constraint inversion and failure lenses as structured antithesis
. Reflective Equilibrium(John Rawls, ; Nelson Goodman, )
Justified belief emerges from working back and forth between particular judgments and general principles, adjusting each in light of the other until coherence is achieved. Explicitly iterative, with no fixed endpoint.
- Source: A Theory of Justice (); Fact, Fiction, and Forecast (); Stanford Encyclopedia of Philosophy- Maps to: Each pass tests emerging understanding against a new angle, revising until the ISC model coheres
. Equilibration(Jean Piaget, )
Cognitive development proceeds through cycles of disequilibrium and equilibrium. New information conflicting with existing schemas forces accommodation — restructuring mental models. This is THE driver of cognitive growth.
- Source: The Equilibration of Cognitive Structures ()- Maps to: Each new lens creates productive disequilibrium that forces genuine understanding forward
. Abductive Reasoning(Charles Sanders Peirce, )
Generating hypotheses to explain surprising observations, then iteratively testing and revising them. Peirce characterized this as inherently provisional. Different outputs from the same prompt are different abductive hypotheses.
- Source: Harvard Lectures on Pragmatism (); Stanford Encyclopedia of Philosophy- Maps to: Non-determinism in AI is not noise — it's abductive hypothesis generation. A FEATURE, not a defect.
. Progressive Refinement of Mental Models(Gentner & Stevens, )
Mental models develop through iterative elaboration: each pass adds detail, corrects errors, integrates new information. Early passes establish rough structure; later passes add precision and catch edge cases.
- Source: Mental Models (); Johnson-Laird, Mental Models ()- Maps to: The cognitive mechanism for WHY each successive lens pass produces deeper understanding
. Multiple External Representations / DeFT Framework(Shaaron Ainsworth, )
Learning with multiple representations of the same content supports deeper understanding through complementing (different aspects), constraining (limiting errors), and constructing (building abstraction). Critically, representations must be sufficiently different — too similar wastes cycles, too different loses coherence.
- Source: Learning and Instruction, (), -()- Maps to: Directly validates the -pass range as well-calibrated. Also validates that lenses must be structurally different (not just re-runs)
. Perspectivism(Friedrich Nietzsche, ; Ronald Giere, )
"The more eyes, different eyes, we train on the same matter, the more complete will our concept of it be." Giere extended this to scientific modeling — all models are irreducibly perspectival and partial.
- Source: On the Genealogy of Morals (); Scientific Perspectivism ()- Maps to: Each pass is a different "eye" — objectivity comes from accumulating partial views, not from a view from nowhere
AI/ML & Prompt Engineering

. Self-Consistency(Wang et al., )
Sample multiple diverse reasoning paths for the same problem, select the most consistent answer. Achieved +.% on GSMK, +.% on SVAMP, +.% on AQuA over single-path chain-of-thought.
- Source: arXiv:.- Maps to: Multiple reasoning paths = multiple lenses on the same ISC extraction
. Multi-Agent Debate(Du et al., )
Multiple AI agents examine the same problem, debate their findings, and converge on better answers through structured disagreement.
- Source: arXiv:.- Maps to: Each iteration could be a different "agent perspective"
. Ensemble Methods(Breiman, Schapire, Freund)
Combining multiple models/runs yields accuracy no single model achieves. Bagging, boosting, and random forests all exploit diverse perspectives on the same data.
- Maps to: Combining multiple ISC extraction passes = ensemble of requirements
. DiVeRSe (Diverse Verifier on Reasoning Step)(Li et al., )
Generating diverse prompts for the same problem and verifying each reasoning step. Structural diversity in prompting yields better coverage.
- Maps to: Structurally different lenses = diverse prompt engineering
Requirements Engineering

. Viewpoint-Oriented Requirements Engineering(Finkelstein & Nuseibeh, )
Organizing requirements elicitation through multiple stakeholder viewpoints, each encapsulating partial knowledge. Inconsistencies between viewpoints reveal hidden requirements.
- Source: Requirements Engineering Journal; IEEE Conf on RE- Maps to: Each iteration adopts a different stakeholder viewpoint
. Misuse Cases(Sindre & Opdahl, )
Examining the same system from an adversary's perspective to uncover security and safety requirements invisible from the user's viewpoint.
- Maps to: The Failure/Adversarial lens
. Progressive Elaboration(PMBOK/PMI)
Iterative refinement of project understanding over time. Each pass adds detail and precision to requirements that were initially vague.
- Maps to: Each iteration adds precision to ISC criteria
Design Thinking & Problem Solving

. Six Thinking Hats(Edward de Bono, )
Six structured perspectives (facts, emotions, risks, benefits, creativity, process) applied sequentially to the same problem. Forces systematic multi-angle examination.
- Source: Six Thinking Hats ()- Maps to: The direct inspiration for our lenses
. Causal Layered Analysis(Sohail Inayatullah, )
Examining the same phenomenon at four depth layers: litany (surface data), social/structural causes, worldview/discourse, and myth/metaphor (deep archetypes).
- Source: Futures, ; metafuture.org- Maps to: Progressive depth through iterations, not just different angles
. Soft Systems Methodology(Peter Checkland, )
Building multiple "root definitions" of the same situation, each from a different worldview. The CATWOE analysis forces systematic perspective shifts.
- Maps to: Each iteration builds a different "root definition" of ideal state
---

Key Distinction: CS Iterative Deepening vs. Iterative Depth

| Aspect | CS Iterative Deepening (IDDFS) | Iterative Depth (this technique) |
|--------|-------------------------------|----------------------------------|
| Domain| Graph/tree search algorithms | Problem understanding & requirements |
| What iterates| Depth limit of search | Perspective/angle of exploration |
| Same path?| Yes, revisits same nodes | No, structurally different each time |
| Purpose| Find optimal path in state space | Extract complete understanding |
| Invented by| Korf () | Meta-pattern across many fields |
| Output| Single solution path | Enriched set of requirements/criteria |

The CS technique searches the SAME TREE deeper each time. Our technique searches the SAME PROBLEM from DIFFERENT ANGLES each time. Related in spirit (both benefit from re-examination), fundamentally different in mechanism.

---

Why It Works: Three Mechanisms

. Perspective Blindness Compensation— Any single viewpoint has blind spots. Structured rotation through viewpoints covers gaps that no individual pass catches.

. Productive Non-Determinism— Even with the same lens, AI non-determinism means each pass surfaces slightly different aspects. Combined with structural variation, this becomes a feature, not a bug.

. Progressive Pre-Understanding— Each iteration updates the analyst's "pre-understanding" (Gadamer), making subsequent iterations more perceptive. Pass sees things Pass couldn't, because Passes -changed what the analyst knows to look for.
