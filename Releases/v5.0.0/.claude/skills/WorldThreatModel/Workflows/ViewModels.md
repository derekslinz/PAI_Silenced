---
workflow: ViewModels
mode: single-run
---

View World Models

Read and display the current state of world threat models.

When to Use

- User says "view world models," "show models," "current models," "model status"
- User wants to understand what's in the current models
- User wants to check model freshness before running TestIdea

Workflow Steps

Step : Read INDEX

Read `~/.claude/PAI/MEMORY/RESEARCH/WorldModels/INDEX.md`.
If it doesn't exist: "No world models found. Run 'update world models' to create them."

Step : Determine View Scope

Overview(default — no specific horizon mentioned):
- Display the INDEX table with all horizons, dates, versions, confidence
- For each model, show -sentence Executive Summary excerpt
- Flag any models older than days as stale

Single Horizon(user says "show me the -year model"):
- Read and display the full model document for that horizon
- Include all sections

Comparison(user says "compare near-term vs long-term"):
- Side-by-side key themes from selected horizons
- Highlight where short-term and long-term trends conflict

Step : Staleness Check

For each model, compare `last_updated` to today:
- < days: Fresh
- -days: Current
- -days: Aging — recommend refresh
- > days: Stale — strongly recommend update

Step : Output

```markdown
World Threat Model Status

| Horizon | Last Updated | Version | Confidence | Freshness |
|---------|-------------|---------|------------|-----------|
| months | YYYY-MM-DD | N | HIGH | Fresh |
| year | YYYY-MM-DD | N | MEDIUM | Current |
| ... | ... | ... | ... | ... |

Summaries

-Month Horizon
{-sentence executive summary excerpt}

-Year Horizon
{-sentence executive summary excerpt}

...

Recommendations
- {Any models needing refresh}
- {Any notable changes since last update}
```

Integration Points

None — this is a read-only workflow.
