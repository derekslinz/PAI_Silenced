RunEval Workflow

Run evaluations for a specific use case.

---

Prerequisites

- Use case must exist in `UseCases/<name>/`
- Test cases defined in use case
- Config.yaml with scoring criteria

Execution

Step : Validate Use Case

```bash
Check use case exists
ls ~/.claude/skills/Evals/UseCases/<use-case>/config.yaml
```

If missing, redirect to `CreateUseCase.md` workflow.

Step : Check EvalServer Status

```bash
Check if server is running
curl -s http://localhost:> /dev/null >&&& echo "Running" || echo "Not running"
```

If not running, start it:
```bash
cd ~/.claude/skills/Evals/EvalServer && bun run dev &
```

Step : Run Evaluation

Option A: Web UI (Recommended). Open http://localhost:. Select use case from dropdown
. Choose model(s) to evaluate
. Click "Run Evaluation"
. Watch real-time streaming results

Option B: CLI```bash
bun run ~/.claude/skills/Evals/EvalServer/cli-run.ts \
  --use-case <name> \
  --model claude---sonnet-```

Step : Collect Results

Results are stored in:
- `Results/<use-case>/<run-id>/results.json`
- `EvalServer/storage/evals.db` (queryable)

Step : Report Summary

Use structured response format:

```markdown
SUMMARY: Evaluation completed for <use-case>

STATUS:
| Metric | Value |
|--------|-------|
| Pass Rate | X% |
| Mean Score | X.XX |
| Failed Tests | X |

STORY EXPLANATION:
. Ran evaluation against <N> test cases
. Deterministic scorers completed first
. AI judges evaluated accuracy and style
. Calculated weighted scores
. Compared against pass threshold
. <Key finding >
. <Key finding >
. <Recommendation>

COMPLETED: Evaluation finished with X% pass rate.
```

Error Handling

If eval fails:. Check model API key is configured
. Verify test cases have valid inputs
. Check scorer configurations in config.yaml
. Review error logs in terminal

Done

Evaluation complete. Results available in UI and files.
