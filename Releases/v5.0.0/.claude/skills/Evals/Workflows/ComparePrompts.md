ComparePrompts Workflow

A/B test two prompt versions to determine which performs better.

This workflow implements the Science Protocol for prompt experimentation.
---

Science Protocol Alignment

Before running any comparison, ensure you're following scientific rigor:

Pre-Commitment (BEFORE running):
- [ ] Success criteria defined (what score/metric means "better"?)
- [ ] Pass threshold locked (what difference is meaningful?)
- [ ] Hypothesis is falsifiable (what result would DISPROVE it?)

Falsifiability Check:
For every hypothesis, answer:
> "What result would prove that Variant B is NOT better than Variant A?"
Example:- Hypothesis: "v..improves accuracy due to source verification instructions"
- Falsifiable if: "v..accuracy ≤ v..accuracy, or difference < %"

If you cannot articulate what would disprove your hypothesis, STOP- you don't have a scientific hypothesis.

Consider Three Variants:
A/B tests are good. A/B/C tests are often better.
- Reduces confirmation bias toward "the first alternative"
- Explores more of the solution space
- Reveals if there's a different direction entirely

---

Prerequisites

- Existing use case with test cases
- Two (or more) prompt versions to compare
- Understanding of what "better" means for this use case
- Falsifiable hypothesis with pre-committed success threshold
Execution

Step : Identify Comparison (Science: Goal + Hypothesize)

Ask the user:
. Which use case?
. Which prompt versions? (consider + variants)
. What's the hypothesis? (Why might one be better?)
. What would DISPROVE this hypothesis?← Critical
. Which metrics matter most?
. What threshold defines "significantly better"?

Step : Validate Both Prompts Exist

```bash
Check prompts exist
ls ~/.claude/skills/Evals/UseCases/<name>/prompts/

Should see both versions:
v...md
v...md
```

Step : Create Comparison Config

Create `~/.claude/skills/Evals/UseCases/<name>/comparisons/<comparison-name>.yaml`:

```yaml
comparison:
  name: "v..vs v.."
  hypothesis: |
    v..should produce more accurate summaries due to
    added context about source verification.

  variants:
    a:
      name: "v..(Baseline)"
      description: "Original prompt without source instructions"
      prompt: "prompts/v...md"
    b:
      name: "v..(Candidate)"
      description: "Added source verification instructions"
      prompt: "prompts/v...md"

  Use all test cases, or specify subset
  test_cases: all  or ["-basic", "-edge", "-hard"]

  Judge configuration
  judges:
    - name: "Accuracy Judge"
      model: "claude---sonnet-"
      focus: "accuracy"
    - name: "Style Judge"
      model: "gpt-o"
      focus: "style"

  settings:
    position_swap: true      Mitigate position bias
    num_runs:              Runs per test case
    confidence_level: .  For statistical significance
    model: "claude---sonnet-"  Model to generate outputs
```

Step : Run Comparison

Option A: Via CLI
```bash
bun run ~/.claude/skills/Evals/EvalServer/cli-run.ts \
  --use-case <name> \
  --compare prompts/v...md prompts/v...md \
  --position-swap
```

Option B: Via Web UI
. Open http://localhost:. Select use case
. Click "Compare" tab
. Select both prompt versions
. Enable position swapping
. Run comparison

Step : Position Swapping Protocol

If `position_swap: true`:

For each test case:
. Run : Variant A = "Option ", Variant B = "Option "
. Run : Variant B = "Option ", Variant A = "Option "
. Average scores to eliminate position bias

This addresses the known bias where LLMs favor the first option presented.

Step : Collect Results

Results stored in:
- `Results/<use-case>/comparisons/<comparison-name>/<run-id>.json`

Results structure:
```json
{
  "comparison_name": "v..vs v..",
  "run_id": "---",
  "variants": {
    "a": { "name": "v..", "wins": , "avg_score": .},
    "b": { "name": "v..", "wins": , "avg_score": .}
  },
  "per_test_case": [...],
  "statistical_significance": {
    "p_value": .,
    "significant": true,
    "confidence_interval": [., .]
  }
}
```

Step : Interpret Results

Report Format:
```markdown
A/B Test Results: v..vs v..
Summary

| Metric | v..(A) | v..(B) |
|--------|------------|------------|
| Win Rate | % | % |
| Avg Score | .| .|
| Std Dev | .| .|

Statistical Significance

- p-value: .- Significant at %: Yes
- Confidence Interval: [., .]

Per-Dimension Breakdown

| Dimension | A Wins | B Wins | Tie |
|-----------|--------|--------|-----|
| Accuracy | | | |
| Style | | | |
| Format | | | |

Conclusion

Winner: v..(Candidate)
Confidence: High (p < .)
Recommendation: Deploy v..to production
```

Step : Make Decision

Based on results:

| Outcome | Action |
|---------|--------|
| B significantly better | Deploy B, archive A |
| A significantly better | Keep A, iterate on B |
| No significant difference | Keep simpler prompt, or gather more data |
| Mixed results (A wins some, B wins others) | Consider hybrid approach |

Step : Document Decision

Update use case README with comparison results:

```markdown
Comparison History

v..vs v..(--)

Hypothesis: v..improves accuracy with source verification.

Result: v..significantly better (p=.)
- Accuracy: +%
- Style: No change
- Format: No change

Decision: Deployed v..as new baseline.
```

Best Practices

Sample Size

- Minimum: test cases (statistically weak)
- Recommended: -test cases (good power)
- Ideal: + test cases (high confidence)

Position Swapping

Always enablefor pairwise comparisons. Research shows LLMs have strong position bias (prefer first option).

Judge Selection

Use different modelthan the one generating outputs:
- If testing Claude prompts → Use GPT-o as judge
- If testing GPT prompts → Use Claude as judge

This prevents self-serving bias.

Statistical Significance

| p-value | Interpretation |
|---------|----------------|
| < .| Strong evidence |
| .-.| Moderate evidence |
| .-.| Weak evidence |
| > .| Not significant |

Don't deploy based on weak evidence unless the improvement is large.

Common Patterns

Testing Instruction Changes

```yaml
hypothesis: "More explicit formatting instructions improve structure"
variants:
  a: { prompt: "v...md" }  Implicit formatting
  b: { prompt: "v...md" }  Explicit section headers
focus: "format"
```

Testing Few-Shot Examples

```yaml
hypothesis: "Adding examples improves accuracy"
variants:
  a: { prompt: "v...md" }  Zero-shot
  b: { prompt: "v...md" }  Two-shot
focus: "accuracy"
```

Testing Persona/Role Changes

```yaml
hypothesis: "Expert persona produces more detailed analysis"
variants:
  a: { prompt: "v...md" }  Generic assistant
  b: { prompt: "v...md" }  Domain expert persona
focus: "depth"
```

Render Comparison Template

For detailed comparison setup, use the Comparison template:

```bash
bun run ~/.claude/Templates/Tools/RenderTemplate.ts \
  -t Evals/Comparison.hbs \
  -d ~/.claude/skills/Evals/UseCases/<name>/comparisons/<name>.yaml \
  -o ~/.claude/skills/Evals/UseCases/<name>/comparisons/<name>-setup.md \
  --preview
```

Paradigm Check (When Iterations Stall)

If you've run + comparisons without meaningful improvement, STOP and ask:

Are we testing the right thing?
| Signal | Question to Ask |
|--------|-----------------|
| All variants score similarly | Is the metric actually measuring what matters? |
| Scores are high but output feels wrong | Is there a dimension we're not measuring? |
| Improvements don't compound | Is the base prompt fundamentally limited? |
| Test cases all behave the same | Do we need more diverse/challenging cases? |

Paradigm Shift Indicators:- The eval criteria might be wrong (measuring the wrong thing)
- The test cases might be too easy or too homogeneous
- The entire approach might need rethinking (different architecture)

When stuck, invoke explicit Science workflow: `Science/Workflows/StructuredInvestigation.md`

This forces stepping back from the eval loop to question the frame itself.

---

Done

Comparison completed. Results documented. Decision made.
