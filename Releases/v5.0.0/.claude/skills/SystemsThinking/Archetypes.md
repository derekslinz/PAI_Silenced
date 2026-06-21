SystemsThinking — Archetypes Reference

The ten canonical systems archetypes (Senge, Goodman, Kiefer, Kemeny, codified in The Fifth Discipline, ; expanded by Braun, ). Each archetype is a template— recognizing the template suggests the intervention.

Structure-first: every archetype is defined by its feedback-loop shape, not by its surface symptoms. Two different archetypes can have similar-looking symptoms but different generating structures.

---

. Fixes That Fail

Loop structure:B (symptom fix) + R with delay (unintended consequence).

Behavior:Quick fix relieves symptom short-term. Delayed side effects worsen the underlying problem. More fixes required. Side effects compound.

Recognition:"We keep fixing this and it keeps coming back bigger." Each fix requires more force than the last. Energy spent on remediation rather than prevention.

Example — Manufacturing:Antibiotics for viral respiratory infections. Symptom relief (real). No pathogen addressed (fix fails underlying problem). Repeated prescribing selects for antibiotic resistance (unintended consequence).

Example — Software:Adding timeouts to flaky distributed calls. Short-term: calls complete. Long-term: timeouts mask real latency; services drift to worse performance; eventually total outage.

Example — Business:Cutting engineering headcount to hit Qmargins → reduces short-term burn → increases engineering bottleneck → product velocity drops → revenue falls → need deeper cuts.

Canonical intervention:- Surface and accept the delay explicitly. Ask "what are the second-order effects of this fix in months?" before implementing.
- Find a fundamental solution that doesn't trigger the consequence.
- Accept short-term pain to stop the cycle.
- If a quick fix is unavoidable, explicitly time-box it and commit to a fundamental solution on a deadline.

---

. Shifting the Burden

Loop structure:Two balancing loops (symptomatic B + fundamental B) + one reinforcing loop where the symptomatic solution atrophies the fundamental capability.

Behavior:Symptomatic solution is fast and feels effective. It atrophies the fundamental solution capability. The more successful the symptomatic solution, the less capable the system becomes of addressing root causes. Eventually the system is entirely dependent on the symptomatic fix.

Recognition:"We'll do it properly once we get through this crisis." The crisis never ends. "The hack became the system." "Only Alice knows how to run it."

Example — Medical:Opioids for chronic pain. Fast symptomatic relief. Atrophies patient's investment in physical therapy, behavioral change (fundamental). Dependency develops.

Example — Software:Technical ops team firefighting production incidents. Symptomatic: on-call engineers fix issues manually. Fundamental: proper observability, automated remediation, root-cause engineering. The more symptomatic succeeds (fires put out), the less organizational pressure to invest in fundamental. On-call burns out; system becomes fragile.

Example — Business:Consultants hired to solve what should be internal capability. Over time, internal capability atrophies. Consultant dependency increases. Cost increases. Internal capability never develops.

Canonical intervention:- Sunset dates on symptomatic solutions.
- Explicit investment in fundamental capability even while symptomatic fix is in place.
- Measure the atrophy explicitly — track whether fundamental capacity is growing or shrinking.

---

. Limits to Growth (a.k.a. Limits to Success)

Loop structure:R (growth engine) + B (limiting constraint, often delayed).

Behavior:System grows initially, then growth slows as limiting constraint activates. If actors push harder (trying to maintain growth by pushing on the growth engine), growth continues briefly then collapses.

Recognition:"We used to x. Now we barely .x. Nothing we try helps." "We just need to push harder and growth will come back."

Example — Startup:Growth hitting hiring capacity (see `Workflows/CausalLoop.md` worked example). Each new hire costs more in coordination than they contribute in output once past size -.

Example — Sales:Sales team pushing harder as growth slows — not realizing the constraint is delivery capacity. More sales = more delivery failures = reputation damage = harder to sell.

Example — Product:SaaS product growth hitting infrastructure limits; team velocity hitting cognitive load limits.

Canonical intervention:- The leverage is neveron the reinforcing loop. It is on the limiting constraint.
- Identify the limit (balancing loop) before it activates.
- Attack the limit directly — change the constraint, raise the ceiling.
- Pushing harder on the growth engine always makes the eventual collision with the limit more severe.

---

. Tragedy of the Commons

Loop structure:Each actor has R (individual gain from shared resource) + B (resource degradation from total use). Actors experience own gain immediately but share degradation cost collectively.

Behavior:Rational individual actors over-exploit shared resource until it collapses. No actor is irrational. The system structure produces the outcome regardless of intentions.

Recognition:Shared resource (staging environment, shared service, common infrastructure). Each team optimizes locally; resource degrades for all. "Nobody owns it." "Everyone is extracting too much but no one wants to go first in cutting back."

Example — Environmental:Overfishing. Groundwater depletion.

Example — Software:Shared engineering resources in large organizations (everyone requests more compute from the shared cluster; no one individually restrains use). Open-source maintainer burnout (everyone consumes, few contribute back). Shared test database (each dev writes data; nobody cleans up; tests get slower).

Example — Ops:Shared QA environment in a software organization. Each team schedules tests when needed. Total test runs exceed capacity. Queue grows. Feedback slows. Everyone's velocity drops — but no one team individually caused it.

Canonical intervention:- Privatize the commons (each actor manages own resource). Partition, quota, per-team instance.
- Visibility into shared resource consumption + governance (usage limits, taxation, quotas, pricing).
- Assign ownership with budget and authority.

---

. Escalation

Loop structure:Two reinforcing loops, each driven by one actor's position relative to the other's.

Behavior:Actor A's actions perceived as threatening by Actor B. B responds. A perceives B's response as escalation. A escalates further. Loop accelerates.

Recognition:"Both sides are doing more, nobody is winning." "We're just responding to what they did."

Example — Competition:Arms races. Pricing wars. Vendor lock-in negotiation spirals.

Example — Software:Feature parity races with a competitor — each adding features to match the other, neither driven by user need, both making their products bloated. Alerting system bloat — every postmortem adds alerts; alert fatigue increases; incidents missed; postmortems add more alerts.

Example — HR:Salary ratchet between two companies competing for the same talent pool.

Canonical intervention:- Unilateral de-escalation (break the symmetry; one side absorbs a round without responding, with explicit signaling).
- Reframe the goal (compete on a different axis).
- Find a higher-order cooperation (both sides benefit from stopping).
- Recognition that the loop is operating — naming it publicly changes behavior.

---

. Success to the Successful

Loop structure:Two reinforcing loops sharing a finite resource, competing.

Behavior:Initial small advantages compound into structural dominance. The winner wins bigger over time. The loser's resource atrophy is self-confirming.

Recognition:"The rich get richer" operating as a structural feature, not an accident. "Team A has PMs and Team B has none, even though Team B is more strategic."

Example — Finance:Capital markets (returns attract capital, larger capital base earns larger returns). Network effects (larger network more valuable, attracts more users).

Example — Organizational:Teams with good reputations get allocated the interesting projects, develop more skill, get better reputations. Teams with poor reputations get the maintenance work, further eroding reputation.

Example — Products:Two products sharing an engineering team. Product A ships fast, gets more engineers, ships faster. Product B starves despite strategic importance.

Canonical intervention:- Change allocation from competitive (winner takes more) to independent (each gets what it needs).
- Explicit portfolio policy; rotation requirements; resource floor.
- Measure absolute value, not relative — prevent relative comparison from determining allocation.
- External regulations (antitrust) are attempts to break this loop at scale.

---

. Drifting Goals (a.k.a. Eroding Goals)

Loop structure:Two balancing loops — one improving performance, one reducing the goal.

Behavior:Goal is set. Reality falls short. Instead of closing the gap, the goal is lowered. Repeated indefinitely, "quality" or "standard" drifts downward. The path of least resistance is always lowering the goal.

Recognition:"We've had to be realistic about what's achievable" — repeated over years. "We used to care about X, but we've learned to be realistic."

Example — Software:Customer response time SLAs. Target was hours. Consistently missing. Quietly raised to hours. Missing that. Raised to hours. Customer churn begins — the degradation was invisible inside the loop.

Example — Software quality:Team sets defect-per-release target of . Release ships with . Instead of fixing process (hard), team reclassifies as "known issues" (easy). Next release targets . Standards drift downward indefinitely.

Example — Ops:Test suite runtime used to be min; drifted to min; now nobody tests locally.

Canonical intervention:- Anchor goals to external reference points (industry benchmark, competitor, first-principles calculation).
- Make drift visible — dashboard the historical goal line; show the erosion.
- Build capacity to close the gap rather than lower the goal.
- Separate the goal-revision process from the performance process.
- Require explicit approval for goal changes at a level above those affected by the gap.

---

. Growth and Underinvestment

Loop structure:R (growth) + B (limiting constraint) + second B (capacity investment that could expand the limit, but only if investment is made).

Behavior:Growth is strong, approaches limits. If investment in capacity is made, limits recede, growth continues. If investment is not made (because limits haven't fully activated yet, or because short-term costs are visible while long-term benefits are not), limits bite hard. Growth stalls. Investment no longer feels justified.

Recognition:"We'll invest in capacity after we see the growth sustain." Onboarding is overwhelmed; support queue always behind.

Example — Infrastructure:Cloud infrastructure scaling decisions. Team that doesn't expand capacity until performance degrades. By the time it degrades, investment timeline (hiring, training, provisioning) is -months.

Example — Support:Customer support team stays flat as user base x's. Response times crater. Churn rises. Growth stalls. "No need for more support, growth is flat."

Example — Talent:Talent pipeline investment. Technical platform investment as product grows.

Canonical intervention:- Invest in capacity beforeit is needed, using leading indicators of the limiting constraint rather than lagging indicators of its activation.
- Measure capacity as a leading indicator, not a lagging one.
- Accept that capacity investment must exceed current load.
- Investment triggers tied to forward-looking metrics, not lagging performance metrics.

---

. Accidental Adversaries

Loop structure:Two parties who should cooperate have hidden reinforcing loops working against each other.

Behavior:Two parties with aligned goals end up working against each other. Each party's local fix creates friction for the other. Communication collapses into blame.

Recognition:"Infra and product used to work together. Now each protects its own territory."

Example — Org:Platform team optimizes for stability (rejects risky launches); product team optimizes for velocity (works around platform). Each action makes the other's job harder.

Example — Platform/ecosystem:Platform adds features to compete with developer apps (captures more value). Developers lose revenue, trust platform less, invest less in ecosystem. Platform loses ecosystem richness. Platform doubles down on first-party features. Spiral.

Canonical intervention:- Surface the hidden dependency.
- Make shared goal explicit and measurable.
- Create a shared scoreboard where both succeed or fail together.
- Explicit interfaces and contracts replace informal cooperation.

---

. Policy Resistance

Loop structure:A policy / intervention is resisted by the system — multiple actors adjust behavior to neutralize it. Net effect: little or no change, often with negative side effects.

Behavior:Intervention had no measurable effect. Unintended workarounds appeared. Metric is gamed.

Recognition:"We added the control; nothing changed; people just routed around it." Goodhart's Law in action.

Example — Software:Code review policy to reduce bugs. Developers add LGTM without reading. Bug rate unchanged.

Example — Public policy:Speed cameras cause drivers to accelerate between them. Performance management systems produce metric-gaming rather than performance improvement.

Example — Product:Rate limit to stop abuse creates workarounds (sign up accounts, distribute load) rather than stopping abuse.

Canonical intervention:- Understand who is resisting and why (their incentives).
- Align with the resistors' incentives rather than fighting them.
- Change the goal, not the control.
- Redesign the measurement so it captures the true quality, not a proxy.

---

Recognition Guide

| Observed behavior | First archetype to check |
|-------------------|--------------------------|
| Same thing keeps recurring, fixes required | Fixes That Fail |
| Dependency on workaround; fundamental capability atrophied | Shifting the Burden |
| Growth slowed; pushing harder doesn't work | Limits to Growth |
| Shared resource degrading; "nobody owns it" | Tragedy of the Commons |
| Both sides doing more, nobody winning | Escalation |
| Winner-take-all dynamics; rich-get-richer | Success to the Successful |
| Standards drift downward over time | Drifting Goals |
| Growth stalls; investment always "just about to happen" | Growth and Underinvestment |
| Allies becoming adversaries | Accidental Adversaries |
| Policy had no effect; behavior routed around it | Policy Resistance |

Attribution

Systems archetypes: Peter Senge, The Fifth Discipline(); Senge, Goodman, Kiefer, Kemeny codification. William Braun, The System Archetypes(MIT CTL, ). Original case studies: System Dynamics Society; Pegasus Communications.
