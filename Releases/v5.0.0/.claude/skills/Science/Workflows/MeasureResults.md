Measure Results Workflow

Phase of the Scientific Cycle
Collect data from experiments. This workflow ensures measurement is accurate, complete, and unbiased.

---

Data Collection Principles

. Measure What Matters

Only collect data that relates to the goal. More data ≠ better data.

Ask: "Does this measurement help us evaluate the hypothesis against our success criteria?"

. Quantify Where Possible

Numbers enable comparison. "It felt faster" < "Load time dropped %"

But don't force quantification when qualitative insights are what matter.

. Capture Context

Numbers without context are meaningless. Record conditions, anomalies, environment.

. Preserve Raw Data

Always keep raw data. Derived metrics can be recalculated; raw data cannot be recovered.

Never modify original data files.

---

The Measurement Process

Step : Execute Collection Protocol

Follow the plan defined in DesignExperiment.

```markdown
Data Collection Log

Experiment:[Name]
Collection Started:[Timestamp]
Collector:[Who]

| Timestamp | Data Point | Value | Collection Method | Notes |
|-----------|-----------|-------|-------------------|-------|
| [Time]    | [Metric]  | [Value] | [How collected] | [Context] |
| [Time]    | [Metric]  | [Value] | [How collected] | [Context] |
```

Step : Collect Primary Metrics

The main thing you're testing - the direct measure of hypothesis success/failure.

```markdown
Primary Metrics

| Metric | Baseline | Measured | Delta | Method |
|--------|----------|----------|-------|--------|
| [Name] | [Before] | [After]  | [Δ]   | [How]  |
```

Step : Collect Secondary Metrics

Supporting context, early warning indicators, sanity checks.

```markdown
Secondary Metrics

| Metric | Value | Relevance |
|--------|-------|-----------|
| [Name] | [Value] | [Why we tracked this] |
```

Step : Capture Qualitative Data

Observations, feedback, anomalies, surprises.

```markdown
Qualitative Observations

What We Observed:- [Observation ]
- [Observation ]

Feedback Received:- [Source]: "[Quote]"

Anomalies:- [Unexpected event ]
- [Unexpected event ]

Surprises:- [What we didn't expect]
```

Step : Validate Data Quality

```markdown
Data Quality Check

Completeness:- [ ] All planned data points collected
- [ ] No significant gaps in collection

Accuracy:- [ ] Collection methods worked correctly
- [ ] No obvious measurement errors

Outliers:- [List any outliers and whether they're valid or errors]

Issues:- [Any problems with data collection]
```

---

Measurement Timing

During Experiment

- Monitor progress (don't just set and forget)
- Note anomalies in real-time
- Don't peek at aggregate results prematurely (avoid bias)

At Completion

- Collect final measurements
- Verify all planned data captured
- Document any deviations from plan

Post-Collection

- Archive raw data
- Create derived metrics
- Document methodology for reproducibility

---

Domain-Specific Measurement

Code Experiments

```markdown
Code Measurement

Test Results:| Branch | Tests Pass | Coverage | Execution Time |
|--------|-----------|----------|----------------|
| control | [Y/N] | [%] | [time] |
| treatment | [Y/N] | [%] | [time] |

Performance Benchmarks:| Metric | Control | Treatment | Delta |
|--------|---------|-----------|-------|
| [Metric] | [Value] | [Value] | [Δ%] |

Code Quality:| Metric | Control | Treatment | Delta |
|--------|---------|-----------|-------|
| Complexity | [Score] | [Score] | [Δ] |
| LOC | [Lines] | [Lines] | [Δ] |
```

Prompt Experiments

```markdown
Eval Results

Accuracy:| Variant | N | Correct | Accuracy | % CI |
|---------|---|---------|----------|--------|
| baseline | [N] | [count] | [%] | [range] |
| variant-| [N] | [count] | [%] | [range] |

Format Compliance:| Variant | Compliant | Non-Compliant | Rate |
|---------|-----------|---------------|------|
| baseline | [count] | [count] | [%] |
| variant-| [count] | [count] | [%] |
```

Feature Experiments

```markdown
A/B Test Results

Primary Metric:| Group | N | Conversions | Rate | % CI |
|-------|---|-------------|------|--------|
| control | [N] | [count] | [%] | [range] |
| treatment | [N] | [count] | [%] | [range] |

Lift:[%] (p-value: [p])

Secondary Metrics:| Metric | Control | Treatment | Delta |
|--------|---------|-----------|-------|
| [Metric] | [Value] | [Value] | [Δ%] |
```

Research Experiments

```markdown
Evidence Collected

For Hypothesis:| Source | Finding | Quality | Date |
|--------|---------|---------|------|
| [Ref] | [What it says] | [H/M/L] | [When] |

Against Hypothesis:| Source | Finding | Quality | Date |
|--------|---------|---------|------|
| [Ref] | [What it says] | [H/M/L] | [When] |
```

---

Template

```markdown
Results: [Experiment Name]

Experiment Run:[Date range]
Data Collected By:[Who]

Primary Metrics
| Metric | Baseline | Result | Change |
|--------|----------|--------|--------|
| [Name] | [Value]  | [Value]| [Δ]    |

Secondary Metrics
| Metric | Value | Notes |
|--------|-------|-------|
| [Name] | [Value] | [Context] |

Qualitative Observations
- [Observation ]
- [Observation ]

Anomalies
- [Unexpected event ]

Data Quality
- Completeness: [Good/Issues noted]
- Accuracy: [Verified/Concerns]
- Outliers: [None/Listed]

Raw Data Location
[Path to preserved raw data]
```

---

Common Pitfalls

Pitfall : Confirmation Peeking
Checking results early and stopping when they look good
Completing planned data collection before analysis

Pitfall : Selective Reporting
Only recording measurements that support the hypothesis
Recording all measurements, especially unexpected ones

Pitfall : Lost Context
Raw numbers without notes on conditions
Every measurement includes relevant context

Pitfall : Destroyed Raw Data
Only keeping summarized/derived metrics
Preserving original data files unmodified

Pitfall : Measurement Interference
The act of measuring changes the outcome
Using non-intrusive measurement methods

---

Integration with Next Phase

Measurements feed directly into AnalyzeResults.

Well-collected data enables:
- Objective comparison to success criteria
- Statistical analysis where appropriate
- Honest assessment of hypothesis status
- Reproducible conclusions
