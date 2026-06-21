Challenge Workflow

Purpose: Systematically challenge every assumption and constraint, classifying each as hard constraint (physics), soft constraint (choice), or unvalidated assumption.

---

When to Use:
- After Deconstruct, to evaluate what's actually fixed
- When requirements feel overly restrictive
- When "we can't do X" is stated without evidence
- For adversarial analysis (RedTeam, pentesting)
- Before major architecture or strategy decisions

---

The Core Question

For every stated constraint, ask:

> "Is this a law of physics, or is it a choice someone made?"

If it's a choice, it can be changed.

---

Process

Step : List All Stated Constraints

Gather everything that's been presented as a constraint:
- Requirements documents
- "We have to..." statements
- Industry best practices
- Historical decisions
- Budget/timeline limits
- Technical limitations
- Policy requirements

Write: List every constraint without filtering

Step : Classify Each Constraint

For each constraint, determine its type:

| Type | Definition | Test | Examples |
|------|------------|------|----------|
| HARD| Physics/math/reality | Would violating this break laws of nature? | Speed of light, thermodynamics, gravity |
| SOFT| Policy/choice/convention | Could a decision-maker change this? | "We use AWS", "REST APIs only", budget limits |
| ASSUMPTION| Unvalidated belief | Has this been tested? What's the evidence? | "Users won't accept that", "Too expensive" |

Step : Challenge Each Non-Hard Constraint

For SOFT constraints, ask:
- Who made this decision and why?
- What would happen if we violated it?
- What's the cost of keeping vs. removing it?
- Is the original reason still valid?

For ASSUMPTIONS, ask:
- What evidence supports this?
- Has anyone tested the opposite?
- What would prove this wrong?
- Are we confusing correlation with causation?

Step : The "Remove It" Test

For each soft constraint and assumption:

> "If we removed this constraint entirely, what would become possible?"

If removing it unlocks significant value, it's worth challenging.

Step : Find the Hidden Assumptions

Look for implicit constraints that weren't even stated:
- "Of course we need a database" - Do we?
- "Obviously this needs authentication" - Does it?
- "Users expect a web interface" - Do they?

The most dangerous constraints are the ones so assumed they're never stated.

---

Output Template

```markdown
Constraint Analysis: [Subject]

All Stated Constraints
. [Constraint ]
. [Constraint ]
. [Constraint ]
...

Classification

HARD Constraints (Physics/Reality)
| Constraint | Why It's Hard | Cannot Be Changed Because |
|------------|---------------|---------------------------|
| [X] | [Physics law] | [Would violate reality] |

SOFT Constraints (Policy/Choice)
| Constraint | Who Decided | Original Reason | Still Valid? | If Removed? |
|------------|-------------|-----------------|--------------|-------------|
| [X] | [Person/team] | [Why] | [Yes/No/Maybe] | [What's possible] |

ASSUMPTIONS (Unvalidated)
| Assumption | Evidence | Counter-Evidence | Test To Validate |
|------------|----------|------------------|------------------|
| [X] | [What supports it] | [What contradicts] | [How to prove/disprove] |

Hidden Constraints Found
- [Implicit assumption that was never stated]
- [Implicit assumption ]

Constraints Worth Challenging
. [Constraint]: [Why it should be challenged, what becomes possible]
. [Constraint]: [Why it should be challenged, what becomes possible]

Recommended Actions
- [ ] Validate assumption: [X] by [method]
- [ ] Challenge soft constraint: [Y] with [stakeholder]
- [ ] Accept hard constraint: [Z] and design around it
```

---

Challenge Questions Library

For Technical Constraints
- Is this a language/framework limitation or a fundamental limitation?
- Could a different technology remove this constraint?
- Is this "impossible" or just "hard with current approach"?
- What would it take to make this possible?

For Business Constraints
- Is this budget fixed or is it the budget for "the obvious solution"?
- Would a x better solution justify a different budget?
- Is this timeline real or arbitrary?
- What's the actual cost of missing this deadline?

For Security Constraints
- Is this control preventing a real attack or a theoretical one?
- What's the actual threat model?
- Is this security or security theater?
- What would an attacker do if this control didn't exist?

For User Experience Constraints
- Have we tested this with actual users?
- Is "users won't accept this" based on data or assumption?
- Are we confusing user needs with user habits?
- What if users are wrong about what they want?

For Architectural Constraints
- Is this pattern required or just familiar?
- What would we build if we'd never seen the current solution?
- Is this complexity necessary or accumulated?
- Could a simpler solution work?

---

Example: Challenging "Enterprise Software Requirements"

Stated Constraints
. Must support ,concurrent users
. Must have .% uptime
. Must integrate with SAP
. Must pass SOC audit
. Must use approved vendor list
. Must have /support
. Must support IE
Classification

HARD Constraints
| Constraint | Why Hard | Cannot Change |
|------------|----------|---------------|
| (None identified) | - | - |

Note: None of these are physics - all are choices
SOFT Constraints
| Constraint | Who Decided | Original Reason | Still Valid? | If Removed? |
|------------|-------------|-----------------|--------------|-------------|
| k concurrent | Capacity planning | Peak load estimate | Maybe - check actual usage | Right-size infrastructure |
| .% uptime | SLA template | Standard enterprise SLA | Maybe - check actual need | .% = x cheaper |
| SAP integration | Finance team | Existing ERP | Yes - but scope negotiable | Simpler integration |
| SOC | Security policy | Customer requirement | Yes - but scope matters | Focus on relevant controls |
| Approved vendors | Procurement | Risk management | Questionable | Better/cheaper options |
| /support | Sales promise | Customer expectation | Check contract | Business hours might suffice |
| IEsupport | Legacy policy | Old corporate standard | NO - IEis dead | Modern stack, % less effort |

ASSUMPTIONS
| Assumption | Evidence | Counter-Evidence | Test |
|------------|----------|------------------|------|
| "Need k concurrent" | Capacity doc | Actual peak: | Check logs |
| "Customers require .%" | Sales said so | No SLA penalties paid | Review contracts |
| "Must support IE" | policy | IEEOL, .% traffic | Check analytics |

Constraints Worth Challenging
. IESupport: Dead browser, removes % of frontend complexity
. k Concurrent: Actual usage is peak - right-size saves $$$
. .% Uptime: .% is likely sufficient, x cost difference
. Approved Vendor List: May exclude better solutions for no real risk reduction

---

Integration with Other Skills

RedTeam: Use Challenge to attack the assumptions behind any idea
```
→ FirstPrinciples/Challenge on stated security controls
→ FirstPrinciples/Challenge on business model assumptions
```

Pentester: Use Challenge to find real vs. assumed security boundaries
```
→ FirstPrinciples/Challenge on "the firewall protects us"
→ FirstPrinciples/Challenge on trust boundaries
```

Architect: Use Challenge before accepting any requirement
```
→ FirstPrinciples/Challenge on NFRs (non-functional requirements)
→ FirstPrinciples/Challenge on technology choices
```

---

After Challenge

Flow to:
- Reconstruct→ Build solution using only hard constraints
- Back to requester with constraint analysis for decision-making
