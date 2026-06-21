FaultTree Workflow — RootCauseAnalysis

Purpose

Construct a Fault Tree Analysis (FTA)— a top-down, deductive, Boolean-logic diagram that decomposes an undesired top event into its contributing events using logic gates. Developed at Bell Laboratories in for the Minuteman missile program; standardized in IEC , NRC NUREG-(nuclear), SAE ARP(aerospace).

Unlike Whys (linear) or Fishbone (categorical), FTA captures Boolean structure: which combinations of events mustoccur for the top event to happen. The key insight: incidents rarely have one cause; they have minimal cut sets— the smallest sets of basic events whose joint occurrence produces the top event.

Invocation

- "Fault tree," "FTA," "fault tree analysis"
- Safety-critical or security-critical system
- Complex multi-path failure where multiple defenses could each have prevented it
- Need quantitative probability estimate for a failure mode
- Systems with redundancy — need to reason about which defense combinations must all fail

Not for:fast operational triage. FTA is thorough but time-intensive; construction typically -hours.

The Structure

```
                       [ TOP EVENT ]
                            │
                          (Gate)
                   ┌────────┼────────┐
                   │        │        │
              [Event A] [Event B] [Event C]
                   │
                 (Gate)
              ┌────┴────┐
              │         │
         [Basic ]  [Basic ]
```

Terminology:- Top event— the undesired outcome at the root of the tree
- Intermediate events— internal nodes, decomposed further
- Basic events— leaf nodes; cannot or need not be decomposed further; have assignable probabilities
- Gates— Boolean operators between levels

The Logic Gates

OR Gate

Symbol:Shape resembling a plus / pointed top.

Semantics:Top event occurs if anyinput occurs.

```
Top
 │
(OR)
 ├── A
 ├── B
 └── C

Top occurs if A OR B OR C.
```

Meaning:Each input alone is sufficient. No redundancy.Models single-point-of-failure structures.

AND Gate

Symbol:Flat-bottom, rounded top.

Semantics:Top event occurs only if allinputs occur (usually simultaneously).

```
Top
 │
(AND)
 ├── A
 ├── B
 └── C

Top occurs only if A AND B AND C (all three).
```

Meaning:All defenses must fail. Defense-in-depth.Models redundant protection.

Priority AND Gate

Semantics:All inputs must occur in a specific sequence. Order matters.

Useful when "A before B causes the problem" but "B before A does not."

Inhibit Gate

Semantics:Output occurs only if input occurs AND a conditioning eventis present.

Models conditional failures — a failure mode that's only exposed under certain conditions.

Exclusive OR

Rare in FTA — used when top event occurs if exactly one (but not both) of two inputs occurs.

Execution

Step : Define the Top Event Precisely

The top event must be specific, observable, and measurable. Vague top events produce incoherent trees.

```
TOP EVENT: [specific undesired outcome]
```

Good: "User's payment is charged but order is not recorded."
Bad: "Payment problems."

Step : Identify Immediate Causes and Logic

For the top event, ask: "What direct causes produce this event, and in what logical combination?"

- Are all causes necessary together? → AND- Is any one cause sufficient alone? → OR- Is there a priority sequence? → Priority AND- Is there a conditioning factor? → Inhibit
Draw the gate and its inputs. Do not decompose further yet — just one level deep.

Step : Recursive Decomposition

For each non-basic intermediate event, repeat Step . Ask: what causes thisevent?

Continue until every leaf is a basic event:
- A basic event has a known or estimable probability
- OR a basic event is at the appropriate level of abstraction for this analysis

Stop conditions for a branch:- Reach a physical component failure with a known probability
- Reach a human error with a statistical rate
- Reach a condition outside the system boundary (environmental, supply chain)
- Reach a level where further decomposition adds no analytical value

Step : Identify Minimal Cut Sets

A cut setis a set of basic events whose joint occurrence causes the top event. A minimal cut setis a cut set from which no member can be removed without breaking the causation.

Why it matters:Minimal cut sets identify the smallest combinations of failures that cause the top event. A system with many -event cut sets is fragile. A system with all cut sets containing + events has strong defense-in-depth.

How to find them(for small trees, by hand):
- Under an OR gate, each input generates its own cut sets
- Under an AND gate, combine cut sets from each input (Cartesian product)
- For large trees, use MOCUS algorithm or FTA software

Step : Quantitative Analysis (if probabilities available)

For each basic event, assign a probability P(event). Propagate upward using Boolean algebra:

- OR gate:P(output) = - ∏(- P(input_i))
  (Approximate for small probabilities: P(output) ≈ Σ P(input_i))
- AND gate:P(output) = ∏ P(input_i)  (assuming independence)

Critical caveat:Boolean propagation assumes statistical independenceof basic events. In real systems, events are often correlated (common-mode failures). When events share a root cause, they are not independent, and the AND gate is far more probable than ∏ suggests. Flag common-mode possibilities explicitly.

Step : Prioritize Mitigation

For each minimal cut set:
- Quantify: what is P(cut set)?
- Rank: which cut sets have highest probability?
- Identify leverage: can any single basic event within the cut set be dramatically reduced?

Key insight:Eliminating one basic event from a -event cut set collapsesits probability dramatically. Focus mitigation on the cheapest-to-eliminate basic event within the highest-probability cut set.

Output Format

```
FAULT TREE ANALYSIS: [top event]

TOP EVENT: [...]

TREE:
  [Top]
    │
   (OR)
    ├── Intermediate A
    │     │
    │    (AND)
    │     ├── Basic  (P = .)
    │     └── Basic  (P = .)
    │
    ├── Intermediate B
    │     │
    │    (OR)
    │     ├── Basic  (P = .)
    │     └── Basic  (P = .)
    │
    └── Basic (P = .)

MINIMAL CUT SETS:
. {Basic , Basic } — P = .e-. {Basic } — P = .. {Basic } — P = .. {Basic } — P = .e-
TOP EVENT PROBABILITY (approx): ~.per event exposure

PRIORITY MITIGATION:
. Basic — highest single-event cut set; eliminate or reduce
. Basic — second-highest single; same logic
. {Basic , Basic } — -event AND, acceptable if independence holds
   Common-mode check: are and truly independent?

COMMON-MODE FAILURES (flagged):
- [Potential correlated failure between events, explained]

RECOMMENDED ACTIONS:
- Eliminate single-event cut sets first
- Harden against common-mode failures
- Add defenses that raise smallest cut-set size
```

Worked Example — Payment Processing Unavailable

```
TOP EVENT: User payment processing unavailable for > seconds.

TREE:
  [Payment unavailable]
     │
    (OR)
     ├── API gateway failure
     │     │
     │    (OR)
     │     ├── Gateway service down (P=.)
     │     └── DNS resolution failure (P=.)
     │
     ├── Payment service failure
     │     │
     │    (OR)
     │     ├── Service crash (P=.)
     │     └── Config pushed wrong (P=.)
     │
     └── Database unavailable
           │
          (AND)
           ├── Primary DB failure (P=.)
           ├── Replica promotion failure (P=.)
           └── Manual intervention not executed in SLA (P=.)

MINIMAL CUT SETS:
. {Gateway service down} — P = .e-. {DNS resolution failure} — P = .e-. {Service crash} — P = .e-. {Config pushed wrong} — P = .e-. {Primary DB, Replica promotion, Manual intervention} — P = .e-
INSIGHT:
- The AND gate on DB failure collapses its probability to e-(defense-in-depth working)
- The OR gates on API gateway and payment service are weak (-event cut sets)
- Payment service crash is the single highest-probability cut set (P = e-)

PRIORITY:
. Reduce P(payment service crash) — add crash watchdog, faster restart, circuit breaker
. Reduce P(gateway service down) — redundant gateway instances
. Replica promotion failure is high (P=.) — improve promotion automation, but AND gate makes this lower priority
```

Common Mistakes

- Confusing OR with AND.OR = single point of failure; AND = defense-in-depth. Getting this wrong inverts the analysis.
- Assuming independence.Real failures have common modes — shared deploys, shared dependencies, shared power. An AND gate is only as strong as its independence assumption.
- Decomposing too deep."Electron did the wrong thing" is not a useful basic event. Stop at components with known failure rates.
- Using FTA for non-quantitative problems.If you have no probability data, the quantitative benefit is lost; Whys or Fishbone may suffice.
- Neglecting human-error basic events.Software FTA often skips human errors (deploy mistakes, misconfigurations) — these are frequently the largest basic-event probabilities.
- Static tree.FTA must be updated as the system changes. An old tree analyzing an old architecture is misleading.

When to Use FTA

| Use FTA when... | Use alternative when... |
|-----------------|--------------------------|
| Safety- or security-critical | Everyday operational issue |
| Probability estimates needed | Qualitative understanding sufficient |
| Complex multi-path failures | Single-thread failures |
| Redundant defenses exist | No redundancy — OR gate dominates |
| Time permits (hours-days) | Triage (minutes) |

Tool Support

For non-trivial trees, use dedicated FTA software:
- SAPHIRE(free, NRC-distributed) — nuclear/aerospace
- FaultTree+(commercial) — engineering
- EC FTA(open source) — research
- Graphviz/d/Mermaid— sketching only; no cut set calculation

For simple trees (< basic events), manual analysis is feasible.

Integration

- Entry from Postmortem— when the incident has redundant defenses that all failed
- Pairs with FMEA— FMEA enumerates failure modes; FTA traces consequences
- Feeds SystemsThinking— if common-mode failures keep appearing, the structure is generating them; escalate to CausalLoop / Archetypes

Attribution

H.A. Watson, Bell Telephone Laboratories (), original FTA development for U.S. Air Force Minuteman program. Formalized in IEC (Fault tree analysis), NRC NUREG-, SAE ARP(aerospace safety). Canonical modern reference: W.E. Vesely et al., Fault Tree Handbook(NUREG-, NRC, ).
