Analyze Results Workflow

Phase of the Scientific Cycle
Compare results to the goal. This workflow ensures honest, objective analysis without confirmation bias.

---

The Core Question

"Did we achieve what we set out to achieve?"
Compare results to PRE-DEFINED success criteria. Not to your expectations. Not to what you hoped for. To what you committed to before starting.

---

The Analysis Process

Step : Compare to Success Criteria

Pull up the goals defined in DefineGoal. Compare directly.

```markdown
Goal Comparison

| Success Criterion | Required | Actual | Status |
|-------------------|----------|--------|--------|
| [Criterion ]     | [Value]  | [Value] | /|
| [Criterion ]     | [Value]  | [Value] | /|
| [Criterion ]     | [Value]  | [Value] | /|

Overall Goal Status:[ACHIEVED / PARTIALLY ACHIEVED / NOT ACHIEVED]
```

Step : Determine Hypothesis Status

For each hypothesis tested:

```markdown
Hypothesis Verdicts

H: [Name]
Status:[CONFIRMED / REFUTED / INCONCLUSIVE]

Evidence:- [What the data showed]
- [How it relates to falsification criteria]

Confidence:[High/Medium/Low] because [reasoning]

H: [Name]
[Same structure]
```

Decision Framework:
| Evidence vs Prediction | Verdict |
|------------------------|---------|
| Data matches prediction | CONFIRMED |
| Data contradicts prediction | REFUTED |
| Data unclear/insufficient | INCONCLUSIVE |

Step : Identify Learnings

What did we learn, beyond the hypothesis verdict?

```markdown
Key Learnings

What We Learned:. [Insight that changes our understanding]
. [Something we now know that we didn't before]

What Surprised Us:. [Unexpected finding ]
. [Unexpected finding ]

What Changed About Our Mental Model:- [Before: We thought X]
- [After: We now understand Y]
```

Step : Acknowledge Limitations

Be honest about what the data can and cannot tell us.

```markdown
Limitations

Methodological Limitations:- [Limitation - how it affects conclusions]
- [Limitation - how it affects conclusions]

Generalizability:- [Can we generalize these results? Why/why not?]

Alternative Interpretations:- [Other explanations for the data]
- [What would change our interpretation?]
```

Step : Generate New Questions

Good analysis raises new questions.

```markdown
New Questions

Questions That Emerged:. [New question from the findings]
. [Follow-up investigation needed]

Hypotheses for Next Cycle:- [New hypothesis suggested by data]
- [Refinement of existing hypothesis]
```

---

Confirmation Bias Countermeasures

. Check Against Pre-Registered Criteria

Did you define success criteria before gathering data? Compare ONLY to those.

If you find yourself saying "Well, we didn't hit the metric, but..." — that's a red flag.

. Consider the Opposite

Ask: "If I wanted to argue the opposite conclusion, what would I say?"

. Seek Disconfirming Interpretation

Ask: "What interpretation of this data would make me LESS confident in my conclusion?"

. Steel-Man the Failure

If hypothesis was refuted, don't dismiss. Ask: "What can we learn from this failure?"

. Red Team Your Analysis

Use RedTeam skill to attack your conclusions.

---

Statistical Considerations

When sample sizes and quantitative data warrant it:

```markdown
Statistical Analysis

Test Used:[Name and justification]

Results:- Test statistic: [Value]
- p-value: [Value]
- Effect size: [Value and interpretation]
- Confidence interval: [Range]

Interpretation:- [What this means in practical terms]

Caveats:- [Statistical limitations]
- [Assumption violations if any]
```

Rules of Thumb:- p < .is conventional significance, but effect size matters more
- Large samples can make tiny effects "significant"
- Small samples can hide real effects
- Confidence intervals tell you more than p-values

---

Analysis Quality Checklist

| Criterion | Question | |
|-----------|----------|---|
| Pre-Committed| Comparing to criteria defined before data? | |
| Objective| Letting data speak, not forcing interpretation? | |
| Honest| Acknowledging negative or null results? | |
| Complete| Considering all the data, not cherry-picking? | |
| Humble| Acknowledging limitations and alternatives? | |
| Learning-Focused| Extracting insights, not just verdicts? | |

---

Template

```markdown
Analysis: [Experiment Name]

Analysis Date:[When]
Analyst:[Who]

Goal Comparison
| Criterion | Required | Achieved | Status |
|-----------|----------|----------|--------|
| [Crit ]  | [Value]  | [Value]  | / |

Overall:[ACHIEVED / NOT ACHIEVED]

Hypothesis Verdicts
- H:[CONFIRMED/REFUTED/INCONCLUSIVE] - [brief reasoning]
- H:[CONFIRMED/REFUTED/INCONCLUSIVE] - [brief reasoning]

Key Learnings
. [Main insight]
. [Secondary insight]

Surprises
- [What we didn't expect]

Limitations
- [Methodological concern]

New Questions
. [Follow-up question]

Recommendations
- [What to do next]
```

---

Common Pitfalls

Pitfall : Moving Goalposts
"We didn't hit the number, but qualitatively it's better..."
"We didn't hit the number. That's a failure. What did we learn?"

Pitfall : Cherry-Picking
Highlighting only data that supports the hypothesis
Presenting all data, including contradictory evidence

Pitfall : Over-Interpreting
Drawing sweeping conclusions from limited data
Matching confidence to evidence strength

Pitfall : Dismissing Failures
"The experiment didn't work, let's move on"
"The experiment failed - why? What does that teach us?"

Pitfall : Confirmation Interpretation
Interpreting ambiguous data as supporting your belief
Explicitly considering alternative interpretations

---

Integration with Next Phase

Analysis feeds into Iterate.

Based on analysis:
- Goal achieved → Document, ship, move on
- Hypothesis confirmed → Implement and monitor
- Hypothesis refuted → Try next hypothesis or generate new ones
- Inconclusive → Design better experiment
- Paradigm shift needed → Return to fundamentals

The cycle continues until the goal is achieved or explicitly abandoned.
