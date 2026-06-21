ViewResults Workflow

Query and display evaluation results, generate reports, and track trends.

---

Prerequisites

- Evaluations have been run
- Results exist in Results/ directory or SQLite database

Execution

Step : Identify Query

Ask the user:
. Which use case?
. What time range? (latest, last week, specific run)
. What to show? (summary, details, comparison, trends)
. What format? (table, report, chart)

Step : Quick Status Check

Latest Results for Use Case:
```bash
Show most recent run
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --use-case <name> \
  --latest
```

All Recent Runs:
```bash
List last runs
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --use-case <name> \
  --limit ```

Step : View Detailed Results

Single Run Details:
```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --run-id <run-id> \
  --verbose
```

Per-Test-Case Breakdown:
```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --run-id <run-id> \
  --show-cases
```

Step : Generate Report

Standard Report:
```bash
Generate markdown report
bun run ~/.claude/skills/Evals/EvalServer/cli.ts report \
  --run-id <run-id> \
  --output ~/.claude/skills/Evals/Results/<use-case>/<run-id>/report.md
```

Using Report Template:
```bash
Render with template
bun run ~/.claude/Templates/Tools/RenderTemplate.ts \
  -t Evals/Report.hbs \
  -d ~/.claude/skills/Evals/Results/<use-case>/<run-id>/results.yaml \
  -o ~/.claude/skills/Evals/Results/<use-case>/<run-id>/report.md
```

Step : Query Database

Direct SQLite Queries:
```bash
cd ~/.claude/skills/Evals/EvalServer

Recent runs by use case
sqlitestorage/evals.db "
  SELECT run_id, model, pass_rate, mean_score, created_at
  FROM eval_runs
  WHERE use_case = '<name>'
  ORDER BY created_at DESC
  LIMIT "

Failed test cases
sqlitestorage/evals.db "
  SELECT test_id, score, failure_reason
  FROM eval_results
  WHERE run_id = '<run-id>' AND passed = "

Score trends over time
sqlitestorage/evals.db "
  SELECT date(created_at), avg(mean_score)
  FROM eval_runs
  WHERE use_case = '<name>'
  GROUP BY date(created_at)
  ORDER BY created_at
"
```

Step : Compare Runs

Two Runs Side-by-Side:
```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts compare \
  --run-a <run-id-> \
  --run-b <run-id->
```

Trend Analysis:
```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts trend \
  --use-case <name> \
  --days ```

Step : Report Summary

Use structured response format:

```markdown
SUMMARY: Evaluation results for <use-case>

STATUS:
| Metric | Value |
|--------|-------|
| Run ID | <run-id> |
| Date | <date> |
| Model | <model> |
| Pass Rate | X% |
| Mean Score | X.XX |
| Total Tests | N |
| Passed | N |
| Failed | N |

STORY EXPLANATION:
. Retrieved evaluation run from <date>
. <N> test cases were evaluated
. Deterministic scorers ran first (format, length, voice)
. AI judges evaluated accuracy and style
. Weighted scores calculated
. <Pass rate>% passed the .threshold
. <Key finding about top/bottom performers>
. <Recommendation based on results>

COMPLETED: Results retrieved for <use-case>, <pass-rate>% pass rate.
```

Query Patterns

By Time Range

```bash
Last hours
--since "hours ago"

Last week
--since "days ago"

Specific date range
--from "--" --to "--"
```

By Score Threshold

```bash
Only failed runs
--min-pass-rate --max-pass-rate .
Only excellent runs
--min-pass-rate .```

By Model

```bash
Specific model
--model claude---sonnet-
Compare models
--compare-models
```

By Test Case

```bash
Specific test
--test-id -basic

All failures
--failures-only
```

Output Formats

Table (Default)

```

 Run ID    Model                       Pass Rate  Mean Score 

 abc   claude---sonnet- %        .       
 def   gpt-o                      %        .       

```

JSON

```bash
--format json
```

```json
{
  "run_id": "abc",
  "use_case": "newsletter_summaries",
  "model": "claude---sonnet-",
  "summary": {
    "total_cases": ,
    "passed": ,
    "failed": ,
    "pass_rate": .,
    "mean_score": .,
    "std_dev": .  },
  "per_test_case": [...]
}
```

Markdown Report

```bash
--format markdown
```

Uses Report.hbs template to generate full report.

CSV Export

```bash
--format csv --output results.csv
```

For spreadsheet analysis.

Trend Analysis

Regression Detection

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts trend \
  --use-case <name> \
  --detect-regression \
  --threshold . Alert if >% drop
```

Performance Over Time

```
Trend: newsletter_summaries (last days)

Date       | Pass Rate | Mean Score | Change
-----------|-----------|------------|--------
--| %       | .       | +%
--| %       | .       | -%
--| %       | .       | baseline

Trend: ↑ Improving
Alert: None
```

Web UI Options

Dashboard View

. Open http://localhost:. Select use case from sidebar
. View:
   - Latest run summary
   - Pass rate trend chart
   - Failing test cases
   - Model comparison

Run Details

. Click on specific run
. View:
   - Per-test-case scores
   - Judge reasoning
   - Output samples
   - Diff against baseline

Export Options

- Download JSON
- Export to CSV
- Generate PDF report

Common Queries

"How did the last eval go?"

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --use-case <name> \
  --latest \
  --summary
```

"Why did test X fail?"

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --run-id <run-id> \
  --test-id <test-id> \
  --verbose
```

"Is performance improving or declining?"

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts trend \
  --use-case <name> \
  --days ```

"Which model is best for this task?"

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts compare \
  --use-case <name> \
  --compare-models \
  --recent
```

"Show me all failures this week"

```bash
bun run ~/.claude/skills/Evals/EvalServer/cli.ts results \
  --use-case <name> \
  --since "days ago" \
  --failures-only
```

Done

Results retrieved and reported. Use findings to guide prompt/model decisions.
