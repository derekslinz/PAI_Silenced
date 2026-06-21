---
name: WorldThreatModel
description: "Persistent world-model harness that stress-tests ideas, strategies, and investments against time horizons from months to years. Each horizon model is a deep (~page) analysis of geopolitics, technology, economics, society, environment, security, and wildcards stored at PAI_DIR/MEMORY/RESEARCH/WorldModels/. Three execution tiers: Fast (~min, single synthesizing agent), Standard (~min, parallel horizon agents + RedTeam + FirstPrinciples), Deep (up to hr, adds per-horizon Research + Council). Four workflows: TestIdea (test any input across all horizons, returns probability-weighted scenario matrix), UpdateModels (refresh model content with new research), ViewModels (read and summarize current state), TestScenario (test against alternative future models like great-correction-). Context files: ModelTemplate.md (structure for horizon model documents), OutputFormat.md (template for TestIdea results). Scenario models stored at WorldModels/Scenarios/. Orchestrates RedTeam, FirstPrinciples, Council, and Research internally. USE WHEN threat model, world model, test idea, test strategy, future analysis, test investment, time horizon analysis, update models, stress test against future, how does this hold up, long-term risk, what could go wrong over time, horizon analysis, crash scenario, view models, model status."
effort: high
---

World Threat Model Harness

A system of persistent world models spanning months to years. Each model is a deep (~page)
analysis of geopolitics, technology, economics, society, environment, security, and wildcards for that
time horizon. Ideas, strategies, and investments are tested against ALL horizons simultaneously using
adversarial analysis (RedTeam, FirstPrinciples, Council).

Workflow Routing

| Trigger | Workflow | Description |
|---------|----------|-------------|
| "test idea", "test strategy", "test investment", "how will this hold up", "stress test", "test against future" | `Workflows/TestIdea.md` | Test any input against all world models |
| "update world model", "update models", "refresh models", "new analysis" | `Workflows/UpdateModels.md` | Refresh world model content with new research/analysis |
| "view world model", "show models", "current models", "model status" | `Workflows/ViewModels.md` | Read and summarize current world model state |

Tier System

All workflows support three execution tiers:

| Tier | Target Time | Strategy | When to Use |
|------|-------------|----------|-------------|
| Fast| ~min | Single agent synthesizes across all models | Quick gut-check, casual exploration |
| Standard| ~min | parallel agents + RedTeam + FirstPrinciples | Most use cases, good depth/speed balance |
| Deep| Up to hr | parallel agents + per-horizon Research + RedTeam + Council + FirstPrinciples | High-stakes decisions, major investments |

Default tier:Standard. User specifies with "fast", "deep", or tier defaults to Standard.

World Model Storage

Models are stored at: `$PAI_DIR/MEMORY/RESEARCH/WorldModels/`

Horizon Models (base views)

| File | Horizon |
|------|---------|
| `INDEX.md` | Summary of all models with last-updated dates |
| `-month.md` | -month outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |
| `-year.md` | -year outlook |

Scenario Models (alternative futures)

Stored at: `$PAI_DIR/MEMORY/RESEARCH/WorldModels/Scenarios/`

| File | Scenario |
|------|----------|
| `great-correction-.md` | Severe US crash (± mo) — AI capex burst + housing + credit cascade |

Context Files

| File | Purpose |
|------|---------|
| `ModelTemplate.md` | Template structure for world model documents |
| `OutputFormat.md` | Template for TestIdea results output |

Skill Integrations

This skill orchestrates multiple PAI capabilities:

- RedTeam— Adversarial stress testing of ideas against each horizon
- FirstPrinciples— Decompose idea assumptions into hard/soft/assumption constraints
- Council— Multi-perspective debate on idea viability across horizons
- Research— Deep research for model creation and updates

Customization Check

Before execution, check for user customizations at:
`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/WorldThreatModelHarness/`

Gotchas

- time horizons (mo-yr).Don't over-index on short-term predictions — the value is in long-term structural analysis.
- Threat models are hypothetical.Present as scenarios with probability ranges, not predictions.
- Update models when major world events occur.Static threat models decay in accuracy.

Examples

Example : Test an investment thesis```
User: "threat model my bet on AI-first content creation"
→ Analyzes across time horizons (mo to yr)
→ Identifies structural risks at each horizon
→ Returns probability-weighted scenario matrix
```

Example : Stress test a strategy```
User: "what could go wrong with our newsletter business model?"
→ Maps threat vectors: market, technology, regulatory, competitive
→ Returns prioritized risk register with mitigations
```

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"WorldThreatModel","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
