RootCauseAnalysis — Foundation

Canonical reference on the methods and theorists behind this skill. Load on demand when depth is needed beyond the workflows.

. Five Whys

Origin.Sakichi Toyoda developed the technique in the s as a manufacturing interrogation discipline. Taiichi Ohno embedded it in the Toyota Production System as "the basis of Toyota's scientific approach — by repeating why five times, the nature of the problem as well as its solution becomes clear." Published in Ohno's Toyota Production System: Beyond Large-Scale Production().

Historical note:The technique was originally developed to understand why new features were needed, not as a formal RCA method — a distinction critics cite when evaluating its limits.

Key pitfalls:
- Stopping at blame."Operator error" is never a root cause — always a symptom of a system that made the error possible or likely. If the chain ends with a human, ask one more why.
- Single-chain bias.Real systems have branching causal structures. Each "why" may have multiple valid answers. Treating the chain as strictly linear misses parallel contributing factors.
- Skipping levels.Impatient investigators jump from symptom to distant cause, constructing a chain that feels complete but skips intermediate mechanisms.
- Knowledge ceiling.The method cannot go beyond the investigator's existing knowledge. Different investigators consistently produce different chains for the same problem — the technique lacks repeatability.
- Shallow stop.Teruyuki Minoura, former Toyota managing director of global purchasing, criticized the method as "too basic" for problems requiring deep structural analysis.

Five Hows variant.After identifying the root cause, apply "How do we prevent this?" five times to construct an equally rigorous corrective action chain — ensuring the solution is as deep as the diagnosis.

. Ishikawa / Fishbone Diagram

Origin.Kaoru Ishikawa first used the cause-and-effect diagram at Kawasaki Steel Works in . Formally presented in . Codified in Guide to Quality Control(JUSE Press, ), where he named it one of seven basic quality tools.

Category sets (adapt to context — Ishikawa recommended this):
- M's (Manufacturing):Manpower, Machine, Method, Material, Measurement, Mother Nature
- P's (Service):People, Process, Policies, Procedures
- M's (Extended manufacturing):M's + Management, Maintenance
- P's (Business/marketing):Product, Price, Place, Promotion, People, Process, Physical Evidence, Partners

Canonical combination:Fishbone + Pareto + Whys. Fishbone for breadth, Pareto for prioritization, Whys for depth on the vital few.

. Pareto Analysis

Origin.Vilfredo Pareto's observation that % of Italy's land was owned by % of the population. Joseph Juran applied it to quality management in the s, coining "vital few and trivial many" as a quality prioritization principle.

Critical point.Pareto analysis identifies whichcauses matter most — it does notexplain whythose causes occur. It is a prioritization tool, not an investigation tool. Always follow with a depth method.

. Fault Tree Analysis (FTA)

Origin.Developed at Bell Laboratories in by H.A. Watson for the U.S. Air Force Minuteman missile program. Standardized in IEC , NRC NUREG-(nuclear), SAE ARP(aerospace). Widely used in aerospace, nuclear, chemical, and pharmaceutical industries.

Structure.Top-down, deductive. Start with undesired top event; decompose into contributing events using logical gates (AND/OR/Priority AND/Inhibit); terminate at basic events with known or estimable probabilities.

Key concept — minimal cut sets.The smallest sets of basic events whose joint occurrence causes the top event. Systems with many -event cut sets are fragile. Systems with all cut sets containing + events have strong defense-in-depth.

Independence assumption caveat.Boolean propagation assumes statistical independence of basic events. In real systems, events are often correlated (common-mode failures). When events share a root cause, they are not independent, and the AND gate is far more probable than ∏ suggests. Flag common-mode possibilities explicitly.

. Apollo Root Cause Analysis / RealityCharting

Origin.Dean Gano developed the Apollo method after working on the Three Mile Island nuclear incident analysis in the late s. Published as Apollo Root Cause Analysis: A New Way of Thinking(Apollonian Publications, ; rd ed. ). RealityCharting software implements the method.

Core principle.Problems do not have a single root cause — they have an infinite continuum of causes connected by cause-and-effect relationships. The analyst's job is to build a causal graph that is comprehensive enough to support effective solutions AND bounded at the level where actionable interventions exist.

Key distinctions from Whys:- Evidence requirement — every cause node must have sensed evidence (observation, measurement, data). Causes without evidence are hypotheses, not findings.
- "What caused this?" framing instead of "Why?" — tends to produce mechanistic causes rather than blame assignments.
- Explicit branching instead of single-chain — forces completeness.

. FMEA — Failure Mode and Effects Analysis

Origin.U.S. Military Procedure MIL-P-(). Adopted by NASA (s), automotive industry (AIAG FMEA Manual), codified in IEC . Current automotive standard: AIAG/VDA FMEA Handbook, st ed. .

Relationship to RCA.FMEA is proactive— applied before failures occur to identify and mitigate potential failure modes. RCA is reactive— applied after failure. FMEA findings feed RCA prevention frameworks; RCA findings reveal failure modes that FMEA should have anticipated.

RPN formula:Risk Priority Number = Severity × Occurrence × Detection (each -scale).

Critical caveat:RPN is an ordinal product of three ordinal scales — it is not a ratio metric. The AIAG/VDA handbook replaced RPN as the primary prioritization metric with AP (Action Priority: H/M/L), weighting severity more heavily than the flat multiplicative RPN approach.

Variants:- Design FMEA (DFMEA):product/system design; design engineers; during design phase
- Process FMEA (PFMEA):manufacturing or operational process; process engineers

. Kepner-Tregoe Problem Analysis

Origin.Charles Kepner and Benjamin Tregoe, The Rational Manager(McGraw-Hill, ; updated as The New Rational Manager, ). Developed from behavioral research on how effective managers actually solve problems vs. how they think they solve them.

Core principle.Every problem is a deviation from expected performance, and every deviation has a specific cause that changedsomething. The IS/IS-NOT framework surfaces that change by defining exactly where and when the deviation exists and where it does not.

The critical test.A valid cause must explain allIS entries and be consistent with allIS NOT entries. Causes that can't explain both sides are eliminated. This "explain both sides" test is the heart of KT.

. The Swiss Cheese Model

Origin.James T. Reason, University of Manchester. Human Error(Cambridge University Press, ) and Managing the Risks of Organizational Accidents(Ashgate, ). Applied in aviation (UK CAA), healthcare (IOM To Err Is Human, ), and nuclear safety.

Core model.Every system has multiple defensive layers — procedures, training, automation, monitoring, supervision, physical barriers. Each layer has holes (weaknesses, gaps, failures). Normally holes don't align across layers — a failure in one is caught by another. An accident occurs when holes in multiple layers align simultaneously.

Active failures vs. latent conditions:
- Active failures:Unsafe acts by front-line operators — errors, violations, misjudgments. Directly triggered the incident. Immediately visible.
- Latent conditions:Underlying weaknesses built into the system by designers, managers, maintainers — inadequate training, poor human-machine interface design, production pressure overriding safety culture, understaffing, ambiguous procedures. Present long before the incident. Often invisible until an accident occurs.

The reframe for RCA.Traditional RCA asks "Who made the error?" The Swiss Cheese model asks "Why did the system's defenses fail to catch that error?" This moves blame from front-line operators to systemic conditions.

Reason: "Unlike active failures whose effects are felt almost immediately, latent conditions may lie dormant within the system for many years before they combine with active failures and local triggers to create an accident opportunity."

Implication.Plugging holes in one layer is insufficient if the system relies on that single layer. Effective remediation adds layers or makes existing layers more robust. The most durable fixes address latent conditions — the holes that have been present for years — rather than only the active failure.

. Postmortem Culture

Canonical sources.Site Reliability Engineering(Beyer, Jones, Petoff, Murphy — O'Reilly, ), Chapter : "Postmortem Culture." Google SRE Workbook (), Chapter . Etsy's Debriefing Facilitation Guide (John Allspaw, ), drawing on Sidney Dekker's The Field Guide to Understanding Human Error().

Blameless definition (Google SRE).A written record of an incident, its impact, actions taken to resolve it, root causes, and follow-up actions — conducted without indicting any individual for bad behavior.Goal: systemic learning, not personal accountability.

Why blameless works.When engineers fear blame, they under-report, hide contributing information, and avoid honest analysis. Blameless makes it psychologically safe to expose the full causal picture.

Hindsight bias.Knowing the outcome makes the failure look obvious in retrospect. Investigators unconsciously reconstruct the decision sequence as if the outcome were predictable. Countermeasure: conduct timeline reconstruction forwardfrom before the incident, not backward from the failure. Dekker calls this "studying the sharp end."

Etsy practice."Once you welcome people into the room and set expectations about the mindset they should be in (blameless) and the outcome (learning), there's really only one thing to focus on: discovering the story behind the story."

. Common RCA Mistakes

Stopping at proximate cause.The most frequent failure. Proximate cause is the immediate trigger. Root cause is the systemic condition that made the trigger possible. If your corrective action is "be more careful," you stopped at proximate cause.

Confirmation bias.Investigation teams form a hypothesis within the first hour and then collect confirming evidence. Countermeasure: require all evidence collected before hypotheses formally ranked. Designate "red team" member to argue against leading hypothesis.

Single root cause assumption.Most complex system failures have multiple necessary contributing causes — no single cause was sufficient alone. Use "contributing factors" language. Will Gallego's piece "No, Seriously. Root Cause is a Fallacy" argues this for software systems.

Mistaking correlation for causation.Change A and failure B occurred at the same time — therefore A caused B. Correlation is a candidate, not a conclusion. Require a mechanism.

Blaming humans as root cause."Operator failed to follow procedure" closes the investigation prematurely. Correct next question: Why did the system make it possible to fail to follow that procedure?

Weak corrective actions."Training" and "reminder emails" are the lowest-quality corrective actions. They rely on human memory under pressure — the same mechanism that failed.

. The Actionability Test

A root cause is operationally defined as: the deepest cause in the chain at which you can implement a change that prevents recurrence.Two failure modes:

Stopped too shallow."The deployment failed" — you can't change that. Go deeper until you reach a systemic condition you control.

Gone too deep."Human beings make errors" — true, but not actionable at an organizational level. Back up one level.

Practical test.For each identified cause, ask: "Can I define a specific, implementable intervention that addresses this cause and is within our organization's authority to execute?" If yes — that is your actionable root cause. If not — continue searching.

. RCA in Software Incidents

SRE practice.Google SRE defines RCA as identifying all contributing factors — plural — not a single root cause. Complex distributed systems fail through conjunctionsof conditions.

Distributed systems specifics.Cause and effect frequently cross service boundaries. Tracing requires correlated logs across services (structured logging with trace IDs), distributed tracing (Jaeger, Zipkin, OpenTelemetry), and timeline reconstruction across system clocks (NTP sync issues are a real confounding variable).

Contributing factors framing.Modern SRE postmortem templates list: () proximate cause, () contributing factors, () detection failure (why didn't we know sooner?), () response failure (why did recovery take longer than expected?). Each category has independent corrective actions.

Five Whys in distributed systems.The depth-first, single-chain assumption breaks down completely in microservice architectures. Apollo/RealityCharting approach — explicit branching, evidence required at each node — is more appropriate than simple Whys.

Observability as precondition.You cannot do RCA on a system you cannot observe. Structured logs, distributed traces, metrics with sufficient cardinality, correlation IDs are preconditions for meaningful RCA. First corrective action from any incident where observability was insufficient should be: instrument the system so the next incident of this type is diagnosable.

Canonical Citations

- Ohno, Taiichi. Toyota Production System: Beyond Large-Scale Production. Productivity Press, .
- Ishikawa, Kaoru. Guide to Quality Control. JUSE Press, .
- Kepner, Charles H. and Benjamin B. Tregoe. The New Rational Manager. Princeton Research Press, .
- Reason, James T. Human Error. Cambridge University Press, .
- Reason, James T. Managing the Risks of Organizational Accidents. Ashgate, .
- Gano, Dean L. Apollo Root Cause Analysis: A New Way of Thinking. rd ed. Apollonian Publications, .
- Beyer, Betsy, Chris Jones, Jennifer Petoff, and Niall Richard Murphy. Site Reliability Engineering. O'Reilly Media, . Chapter .
- Allspaw, John. "Debriefing Facilitation Guide." Etsy, .
- Dekker, Sidney. The Field Guide to Understanding Human Error. rd ed. Ashgate, .
- Juran, Joseph M. Juran on Quality by Design. Free Press, .
- Watson, H.A. "Launch Control Safety Study." Bell Telephone Laboratories / U.S. Air Force, .
- IEC : Fault Tree Analysis. International Electrotechnical Commission, .
- AIAG/VDA FMEA Handbook. st ed. .
- Gallego, Will. "No, Seriously. Root Cause is a Fallacy." willgallego.com, .
