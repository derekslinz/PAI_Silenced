Deconstruct Workflow

Purpose: Break down any problem, system, or concept into its fundamental constituent parts and irreducible truths.

---

When to Use:
- Starting any first principles analysis
- When a problem seems intractable
- When costs/complexity seem fixed
- When inherited solutions feel wrong but you can't articulate why

---

Process

Step : Identify the Subject

What are we deconstructing?
- A problem to solve
- A system to understand
- A cost to reduce
- A constraint to examine
- An architecture to evaluate

Write: "We are deconstructing: [subject]"

Step : List Stated Components

What does everyone say this is made of?

Ask:
- What are the commonly accepted parts of this?
- What does the market/industry say this includes?
- What would a typical description list?

Write: List all stated components without judgment

Step : Go Deeper - Actual Constituents

For each component, ask: "What is THIS actually made of?"

Key Questions:
- What are the material/physical constituents?
- What are the actual inputs required?
- What is the minimum viable version of this component?
- If we bought the raw materials, what would they cost?

Example - Battery Pack:
- Stated: "Battery pack = $/kWh"
- Deeper: Cobalt + Nickel + Aluminum + Carbon + Polymers + Seal
- Actual: Raw materials on commodity market = ~$/kWh
- Insight: % of cost is assembly/margin, not fundamental

Step : Identify the Fundamental Truths

What remains when you can't decompose further?

Fundamental truths are:
- Laws of physics
- Mathematical certainties
- Empirically verified facts
- Irreducible requirements

NOT fundamental truths:
- Industry best practices
- "How it's always been done"
- Market prices
- Conventional wisdom

Write: List only the irreducible truths

Step : Map the Gap

Compare stated vs actual:

| Stated Component | Actual Constituents | Gap/Insight |
|------------------|---------------------|-------------|
| [Market view] | [Fundamental parts] | [What we learned] |

---

Output Template

```markdown
Deconstruction: [Subject]

What We're Told
[Common description of the subject]

Stated Components
. [Component ]
. [Component ]
. [Component ]

Actual Constituents
For each stated component, the fundamental parts:

[Component ]:
- Actual parts: [list]
- Real cost/value: [amount]
- Insight: [what's different from stated]

[Component ]:
- Actual parts: [list]
- Real cost/value: [amount]
- Insight: [what's different from stated]

Fundamental Truths (Irreducible)
. [Truth - cannot be decomposed further]
. [Truth - physics/math/verified fact]
. [Truth - actual hard requirement]

Key Gaps Identified
| Stated | Actual | Gap |
|--------|--------|-----|
| [X costs $Y] | [Materials cost $Z] | [$Y-Z is not fundamental] |

Implications
- [What this means for our approach]
- [What becomes possible now]
```

---

Example: Deconstructing "Rocket Launch Costs"

What We're Told
"Launching a rocket to orbit costs $million because aerospace is expensive"

Stated Components
. Rocket vehicle
. Fuel
. Launch operations
. Aerospace-grade engineering

Actual Constituents

Rocket Vehicle:
- Actual parts: Aluminum alloys, titanium, copper, carbon fiber
- Real cost: ~% of typical rocket price on commodity markets
- Insight: % of vehicle cost is not materials

Fuel:
- Actual parts: Liquid oxygen, RP-kerosene
- Real cost: ~$,per launch
- Insight: Fuel is negligible in total cost

Launch Operations:
- Actual parts: Pad rental, personnel, range safety
- Real cost: Variable but not fundamentally $M+
- Insight: Most "operations cost" is amortized development

Aerospace-grade Engineering:
- Actual need: Reliability, not gold-plating
- Real requirement: Physics of reaching orbit
- Insight: "Aerospace-grade" is often convention, not physics

Fundamental Truths (Irreducible)
. Must achieve ~.km/s delta-v to reach orbit (physics)
. Must survive aerodynamic and thermal loads (physics)
. Must carry payload mass (requirement)
. Propellant mass ratio governed by rocket equation (physics)

Key Gaps Identified
| Stated | Actual | Gap |
|--------|--------|-----|
| Vehicle: $M | Materials: $M | $M is not fundamental |
| "Rockets are expensive" | Physics doesn't require $M | Convention, not constraint |

Implications
- We can build rockets for dramatically less if we start from materials
- "Aerospace-grade" practices should be challenged individually
- Vertical integration recaptures the % margin
- This insight created SpaceX
---

Integration Notes

After Deconstruct, typically flow to:
- Challenge→ Question each constraint classification
- Reconstruct→ Build optimal solution from fundamental truths

Other skills can invoke:
```
→ FirstPrinciples/Deconstruct on [security model / architecture / cost structure]
```
