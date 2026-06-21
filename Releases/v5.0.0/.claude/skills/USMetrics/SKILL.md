---
name: USMetrics
description: "Analyze and update US economic and social indicators from five government APIs: FRED, EIA, Treasury FiscalData, BLS, Census. Ten categories: Economic Output & Growth (GDP, industrial production, retail sales), Inflation & Prices (CPI, PCE, gas, oil), Employment & Labor (unemployment, payrolls, jobless claims, quit rate), Housing (home prices, mortgage rates, starts), Consumer & Personal Finance (sentiment, saving rate, credit), Financial Markets (interest rates, Treasury yields, volatility), Trade & International (trade balance, USD index), Government & Fiscal (federal debt, deficit, spending), Demographics & Social (population, inequality, poverty), Health & Crisis (deaths of despair, air quality, life expectancy). Two workflows: UpdateData (fetch live data via FRED_API_KEY and EIA_API_KEY, update US-Common-Metrics.md, us-metrics-current.csv, us-metrics-historical.csv in Substrate dataset), GetCurrentState (y/y/y/y multi-timeframe trend analysis, cross-category correlation, pattern/anomaly detection, research recommendations as structured markdown report). USE WHEN GDP, inflation, unemployment, economic metrics, gas prices, how is the economy, update data, refresh data, get current state, economic overview, FRED, fetch FRED series, generate analysis, update substrate metrics, US metrics, economic trends. NOT FOR state-level pathogen wastewater surveillance (use a dedicated surveillance data skill)."
effort: medium
---

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/USMetrics/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

US Metrics - Economic & Social Indicator Analysis

Purpose:Analyze U.S. economic and social metrics using the Substrate US-Common-Metrics dataset. Provides trend analysis, cross-metric correlation, pattern detection, and research recommendations.

Data Source

All metrics sourced from:
- Location:Configure your data directory path (e.g., `${PAI_DIR}/data/US-Common-Metrics/`)
- Master Document:`US-Common-Metrics.md` (metrics across categories)
- Source Documentation:`source.md` (full methodology)
- Underlying APIs:FRED, EIA, Treasury FiscalData, BLS, Census, CDC, EPA

Workflow Routing

When executing a workflow, output this notification directly:
```
Running the WorkflowNameworkflow in the USMetricsskill to ACTION...
```

Available Workflows

| Workflow | Description | Use When |
|----------|-------------|----------|
| UpdateData| Fetch live data from APIs and update Substrate dataset | "Update metrics", "refresh data", "pull latest", "update Substrate" |
| GetCurrentState| Comprehensive economic overview with multi-timeframe trend analysis | "How is the economy?", "economic overview", "get current state", "US metrics analysis" |

Workflows

UpdateData

Full documentation:`Workflows/UpdateData.md`

Purpose:Fetch live data from FRED, EIA, Treasury APIs and populate the Substrate US-Common-Metrics dataset files. This must run before GetCurrentState to ensure data is current.

Execution:```bash
bun ${CLAUDE_SKILL_DIR}/Tools/UpdateSubstrateMetrics.ts
```

Outputs:- `US-Common-Metrics.md` - Updated with current values
- `us-metrics-current.csv` - Machine-readable snapshot
- `us-metrics-historical.csv` - Appended time series

Trigger phrases:- "Update the US metrics"
- "Refresh the economic data"
- "Pull latest metrics"
- "Update Substrate dataset"

---

GetCurrentState

Full documentation:`Workflows/GetCurrentState.md`

Produces:A comprehensive overview document analyzing:
- -year, -year, -year, and -year trends for all major metrics
- Cross-category interplay analysis
- Pattern detection and anomalies
- Research recommendations

Trigger phrases:- "How is the US economy doing?"
- "Give me an economic overview"
- "What's the current state of US metrics?"
- "Analyze economic trends"
- "US metrics report"

Metric Categories Covered

. Economic Output & Growth- GDP, industrial production, retail sales
. Inflation & Prices- CPI, PCE, gas prices, oil prices
. Employment & Labor- Unemployment, payrolls, jobless claims, quit rate
. Housing- Home prices, mortgage rates, housing starts
. Consumer & Personal Finance- Sentiment, saving rate, credit
. Financial Markets- Interest rates, Treasury yields, volatility
. Trade & International- Trade balance, USD index
. Government & Fiscal- Federal debt, budget deficit, spending
. Demographics & Social- Population, inequality, poverty
. Health & Crisis- Deaths of despair, air quality, life expectancy

API Keys Required

For live data fetching:
- `FRED_API_KEY` - Federal Reserve Economic Data
- `EIA_API_KEY` - Energy Information Administration

Tools

| Tool | Purpose |
|------|---------|
| `tools/UpdateSubstrateMetrics.ts` | Primary- Fetch all metrics, update Substrate files |
| `Tools/FetchFredSeries.ts` | Fetch historical data from FRED API |
| `tools/GenerateAnalysis.ts` | Generate analysis report from Substrate data |

Example Usage

```
User: "How is the US economy doing? Give me a full analysis."

→ Invoke GetCurrentState workflow
→ Fetch current + historical data for all metrics
→ Calculate y/y/y/y trends
→ Analyze cross-metric correlations
→ Identify patterns and anomalies
→ Generate research recommendations
→ Output comprehensive markdown report
```

Output Format

The GetCurrentState workflow produces a structured markdown document:

```markdown
US Economic State Analysis
Generated:[timestamp]
Data Sources:FRED, EIA, Treasury, BLS, Census

Executive Summary
[Key findings in -bullets]

Trend Analysis by Category
Economic Output
[y/y/y/y trends with analysis]
...

Cross-Metric Analysis
[Correlations, leading indicators, divergences]

Pattern Detection
[Anomalies, regime changes, emerging trends]

Research Recommendations
[Suggested areas for deeper investigation]
```

Gotchas

- indicators from agencies(FRED, EIA, Treasury, BLS, Census). Each has its own API rate limits and data freshness.
- Economic data has publication lag.GDP is quarterly with revisions. Jobs data is monthly. Don't present preliminary data as final.
- Cross-metric correlation is suggestive, not causal.Never claim one metric caused another.

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"USMetrics","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
