Structured Investigation Workflow

Level Science - For problems taking hours to days
When Quick Diagnosis isn't enough, or the problem requires systematic exploration. This is the workhorse workflow for most non-trivial problems.

---

When to Use

- Quick Diagnosis escalated (+ minutes without resolution)
- Problem involves multiple systems or unknowns
- Multiple people disagree on the cause
- High stakes - wrong answer costs significant time/resources
- You need to document your investigation for others

Anti-Triggers (Don't Use When)

- Problem can be solved in minutes
- You're doing creative/generative work
- The answer is obvious to domain experts
- Formal process would take longer than just doing the work

---

The Workflow

Phase : Define the Goal (minutes)

Be specific.Vague goals = vague results.

```markdown
Goal Definition

Outcome:[What will exist/change when we succeed?]

Success Criteria:- [ ] [Measurable criterion ]
- [ ] [Measurable criterion ]
- [ ] [Measurable criterion ]

Constraints:- Time: [Deadline or time budget]
- Resources: [What we have available]
- Quality: [Standards that must be maintained]

Anti-Goals (what we're NOT trying to do):- [Explicitly out of scope item ]
- [Explicitly out of scope item ]
```

Quality Check:Can someone else read this and know exactly when we've succeeded?

Phase : Gather Context (-minutes)

Understand before you hypothesize.
```markdown
Current State Observation

What we know:- [Fact - with source/evidence]
- [Fact - with source/evidence]
- [Fact - with source/evidence]

What we don't know:- [Gap - what information would help?]
- [Gap - what information would help?]

What has been tried:- [Previous attempt ] - Result: [outcome]
- [Previous attempt ] - Result: [outcome]

Baseline measurements:- [Metric ]: [current value]
- [Metric ]: [current value]
```

Quality Check:Did we look for disconfirming evidence, not just confirming evidence?

Phase : Generate Hypotheses (minutes)

Minimum hypotheses. Better: -for important problems.
```markdown
Hypotheses

H: [Name]
Claim:[What we believe is happening/will work]
Rationale:[Why we think this]
Evidence For:[What supports this]
Evidence Against:[What challenges this]
Falsification Test:This is WRONG if [observable outcome]
Cost to Test:[Time/resources needed]
Confidence:[Low/Medium/High]

H: [Name]
[Same structure]

H: [Name]
[Same structure]
```

The Plurality Requirement:Single-hypothesis thinking leads to confirmation bias. Force yourself to consider alternatives.

Quality Check:For each hypothesis, can you articulate what would prove it wrong?

Phase : Design Experiments (minutes)

Minimum Viable Experiments - the smallest test that gives meaningful data.
```markdown
Experiment Design

Experiment for H
Method:. [Step ]
. [Step ]
. [Step ]

Measuring:- Primary metric: [What confirms/refutes]
- Secondary metrics: [Supporting data]

Success Criteria:- CONFIRMED if: [condition]
- REFUTED if: [condition]
- INCONCLUSIVE if: [condition]

Duration:[How long to run]
Resources:[What's needed]
```

Prioritization:Order experiments by (likelihood of success) × (cost to test). Cheap, high-likelihood first.

Phase : Execute Experiments

Run experiments. Collect data. Don't peek prematurely.
```markdown
Experiment Execution

Experiment : [Name]
Started:[timestamp]
Status:[Running/Complete]
Raw Observations:- [Observation ]
- [Observation ]
Anomalies:[Anything unexpected]
```

Parallel Execution:When experiments are independent, run them simultaneously.

Phase : Measure Results

Collect data related to success criteria.
```markdown
Results

Experiment Results
| Metric | Expected | Actual | Delta |
|--------|----------|--------|-------|
| [Name] | [Value]  | [Value]| [+/-] |

Qualitative Observations:- [Notable event ]
- [Notable event ]

Data Quality Notes:- [Any issues with collection]
```

Phase : Analyze Against Goal

Compare results to success criteria. Be honest.
```markdown
Analysis

Goal Comparison
| Success Criterion | Required | Achieved | Status |
|-------------------|----------|----------|--------|
| [Criterion ]     | [Value]  | [Value]  | / |
| [Criterion ]     | [Value]  | [Value]  | / |

Hypothesis Status
- H: [CONFIRMED/REFUTED/INCONCLUSIVE] - because [evidence]
- H: [CONFIRMED/REFUTED/INCONCLUSIVE] - because [evidence]
- H: [CONFIRMED/REFUTED/INCONCLUSIVE] - because [evidence]

Key Learnings
. [What we learned that changes our understanding]
. [Surprises - what we didn't expect]
. [New questions that emerged]

Implications
- [How this changes our approach]
- [What to do next]
```

Phase : Iterate

Based on analysis, decide next action.
Options:
. Goal achieved→ Document learnings, done
. Promising hypothesis→ Deeper investigation of that path
. All hypotheses failed→ Generate new hypotheses, new cycle
. Need more data→ Design additional experiments
. Problem reframed→ Return to Phase with new understanding

---

Documentation Artifact

After completing, produce a summary:

```markdown
Investigation Summary: [Problem Name]

Date:[When]
Duration:[How long]

Goal:[What we were trying to achieve]

Key Finding:[One-sentence summary]

Hypotheses Tested:- H: [CONFIRMED/REFUTED]
- H: [CONFIRMED/REFUTED]
- H: [CONFIRMED/REFUTED]

Resolution:[What we did / what we learned]

Learnings for Future:- [Generalizable insight ]
- [Generalizable insight ]
```

---

Escalation to Full Cycle

Escalate to FullCycle workflow when:
- Investigation spans multiple days/weeks
- Multiple stakeholders need to review methodology
- Results will be published or shared externally
- Statistical rigor is required
- The problem is at macro scale (product strategy, architecture)
