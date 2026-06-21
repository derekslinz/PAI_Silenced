GetCurrentState Workflow

Skill:USMetrics
Purpose:Generate comprehensive U.S. economic overview with multi-timeframe trend analysis

Overview

This workflow produces a detailed analysis document examining all metrics in the US-Common-Metrics dataset across multiple time horizons (year, year, year, year), identifying patterns, correlations, and research opportunities.

IMPORTANT:This workflow reads from the Substrate US-Common-Metrics dataset. Run `UpdateData` workflow first to ensure data is current.

Data Flow

```
. UpdateData workflow (run first)
   └── Fetches from FRED, EIA, Treasury APIs
   └── Writes to Substrate files:
       - US-Common-Metrics.md
       - us-metrics-current.csv
       - us-metrics-historical.csv

. GetCurrentState workflow (this)
   └── Reads from Substrate files
   └── Calculates trends from historical data
   └── Generates analysis report
```

Execution Steps

Step : Initialize

Output the workflow status message:

```
Running GetCurrentStatein USMetrics...
```

Step : Load Metric Definitions

Read the master metrics document:
```
~/Projects/Substrate/Data/US-Common-Metrics/US-Common-Metrics.md
```

Extract the list of all metrics with their:
- FRED series IDs (or other API identifiers)
- Categories
- Update frequencies
- Current values (if populated)

Step : Fetch Historical Data

For each metric with a FRED series ID, fetch historical data spanning + years.

Key FRED Series (Priority Fetch):
| Category | Metric | FRED ID |
|----------|--------|---------|
| GDP | Real GDP | GDPC|
| GDP | GDP Growth Rate (QoQ) | ARLQSBEA |
| Inflation | CPI-U All Items | CPIAUCSL |
| Inflation | Core CPI | CPILFESL |
| Inflation | PCE Price Index | PCEPI |
| Employment | Unemployment Rate (U-) | UNRATE |
| Employment | Nonfarm Payrolls | PAYEMS |
| Employment | Initial Jobless Claims | ICSA |
| Housing | Median Home Price | MSPUS |
| Housing | -Year Mortgage Rate | MORTGAGEUS |
| Consumer | Consumer Sentiment | UMCSENT |
| Consumer | Personal Saving Rate | PSAVERT |
| Markets | Fed Funds Rate | FEDFUNDS |
| Markets | -Year Treasury | DGS|
| Markets | -Year Treasury | DGS|
| Trade | Trade Balance | BOPGSTB |
| Fiscal | Federal Debt | GFDEBTN |

Non-FRED Data (separate APIs):- Gas prices: EIA API (`PET.EMM_EPMR_PTE_NUS_DPG.W`)
- Oil prices: EIA API (`PET.RWTC.W`)
- Federal debt (daily): Treasury FiscalData API

Step : Calculate Trend Statistics

For each metric, calculate:

Timeframe Analysis:- -Year:Compound annual growth rate (CAGR), total change, volatility
- -Year:CAGR, total change, volatility, comparison to -year trend
- -Year:CAGR, total change, recent acceleration/deceleration
- -Year:YoY change, recent momentum, latest value vs. average

Trend Direction:- Rising (↑), Falling (↓), Stable (→)
- Acceleration indicator (speeding up vs. slowing down)

Example Output:```
Unemployment Rate (UNRATE)
├── Current: .% (Nov )
├── -Year: .% → .% (-.pp, ↓ trend)
├── -Year: .% → .% (+.pp, ↑ from pre-COVID low)
├── -Year: .% → .% (+.pp, gradual rise)
├── -Year: .% → .% (+.pp, slight increase)
└── Assessment: Gradually rising from -year lows, still historically low
```

Step : Cross-Category Analysis

Analyze interrelationships between categories:
. Inflation Employment(Phillips Curve dynamics)
   - CPI vs. Unemployment correlation
   - Wage growth vs. inflation relationship

. Monetary Policy Economy   - Fed Funds Rate impact on mortgage rates, housing
   - Yield curve (Y-Y spread) as recession indicator

. Consumer Health Economic Output   - Sentiment vs. retail sales correlation
   - Saving rate vs. consumer spending

. Housing Broader Economy   - Home prices vs. inflation
   - Housing starts as leading indicator

. Energy Inflation   - Oil/gas prices impact on CPI
   - Energy component of consumer budgets

. Fiscal Financial Markets   - Debt growth vs. Treasury yields
   - Deficit spending impact on GDP

Step : Pattern Detection

Identify notable patterns:
. Regime Changes   - Pre/post COVID comparison
   - Pre/post rate hike cycle
   - Historical vs. current levels

. Divergences   - Metrics moving opposite to historical correlation
   - Unusual spreads (e.g., yield curve inversion)

. Extremes   - Metrics at historical highs/lows
   - Metrics multiple standard deviations from mean

. Leading Indicator Signals   - Jobless claims trend
   - Yield curve shape
   - Consumer sentiment direction

Step : Generate Research Recommendations

Based on patterns detected, suggest:

. Areas requiring deeper investigation   - Anomalies that warrant explanation
   - Divergences from historical patterns

. Potential risks to monitor   - Leading indicators suggesting concern
   - Metrics approaching critical thresholds

. Opportunities for analysis   - Correlations that may predict future moves
   - Underexplored relationships

. Data gaps to fill   - Metrics not yet tracked that would improve analysis
   - Higher-frequency data needs

Step : Compile Output Document

Generate structured markdown report:

```markdown
US Economic State Analysis

Generated:[YYYY-MM-DD HH:MM]
Data Period:[years through current]
Sources:FRED, EIA, Treasury FiscalData, BLS, Census

---

Executive Summary

[-bullet points with the most important findings]

---

Current Snapshot

| Category | Key Metric | Value | YoY Δ | Trend |
|----------|------------|-------|-------|-------|
| Economy | Real GDP Growth | X.X% | +X.X | ↑ |
| Inflation | CPI YoY | X.X% | -X.X | ↓ |
| Employment | Unemployment | X.X% | +X.X | → |
| ... | ... | ... | ... | ... |

---

Detailed Trend Analysis

. Economic Output & Growth
[y/y/y/y analysis for GDP, industrial production, retail sales]

. Inflation & Prices
[Analysis for CPI, PCE, gas prices, oil prices]

. Employment & Labor
[Analysis for unemployment, payrolls, claims, participation]

[... continue for all categories]

---

Cross-Metric Analysis

Inflation-Employment Dynamics
[Phillips curve analysis, current relationship]

Monetary Policy Transmission
[Fed funds → mortgages → housing → economy]

Consumer-Economy Linkage
[Sentiment → spending → GDP relationship]

[... additional cross-category analyses]

---

Pattern Detection

Regime Changes
- [Pattern ]
- [Pattern ]

Divergences
- [Divergence ]
- [Divergence ]

Historical Extremes
- [Extreme ]
- [Extreme ]

---

Research Recommendations

High Priority
. [Investigation area ]
. [Investigation area ]

Risks to Monitor
. [Risk ]
. [Risk ]

Data Gaps
. [Gap ]
. [Gap ]

---

Methodology Notes

- Trend calculations use [method]
- Seasonally adjusted data used where available
- All FRED data as of [timestamp]

---

Sources

- Federal Reserve Economic Data (FRED)
- Energy Information Administration (EIA)
- U.S. Treasury FiscalData
- Bureau of Labor Statistics (BLS)
- U.S. Census Bureau
```

Output Location

Save generated report to:
```
~/.claude/History/research/[YYYY-MM]/[YYYY-MM-DD]_US-Economic-State-Analysis.md
```

Error Handling

- If FRED API fails: Note which metrics couldn't be fetched, proceed with available data
- If API key missing: Prompt user to set `FRED_API_KEY` environment variable
- If metric not found: Log missing series, continue with others

Future Enhancements

- [ ] Add visualization generation (charts, graphs)
- [ ] Implement automated scheduling (weekly/monthly reports)
- [ ] Add comparison mode (vs. previous report)
- [ ] Include international context (compare to other economies)
- [ ] Add forecasting section using leading indicators
