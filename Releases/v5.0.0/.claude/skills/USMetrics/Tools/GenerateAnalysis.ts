!/usr/bin/env bun
/ GenerateAnalysis.ts
  Generates the US Economic State Analysis document
 by fetching data and producing the structured markdown report.
  Usage:
   bun run GenerateAnalysis.ts [--output=path]
  Environment:
   FRED_API_KEY - Required for FRED data
   EIA_API_KEY - Required for energy data
 /

import { parseArgs } from "util";

// ============================================================================
// CONFIGURATION
// ============================================================================

const FRED_API_KEY = process.env.FRED_API_KEY;
const EIA_API_KEY = process.env.EIA_API_KEY;

// Priority series for the analysis (most impactful metrics)
const PRIORITY_SERIES = {
  economic: ["GDPC", "ARLQSBEA", "INDPRO", "RSXFS"],
  inflation: ["CPIAUCSL", "CPILFESL", "PCEPI", "PCEPILFE"],
  employment: ["UNRATE", "PAYEMS", "ICSA", "CIVPART", "CES"],
  housing: ["MSPUS", "MORTGAGEUS", "HOUST", "CSUSHPINSA"],
  consumer: ["UMCSENT", "PSAVERT", "TOTALSL", "DRCCLACBS"],
  financial: ["FEDFUNDS", "DGS", "DGS", "VIXCLS"],
  trade: ["BOPGSTB", "DTWEXBGS"],
  fiscal: ["GFDEBTN", "FYFSD"],
};

const SERIES_NAMES: Record<string, string> = {
  "GDPC": "Real GDP",
  "ARLQSBEA": "GDP Growth Rate",
  "INDPRO": "Industrial Production",
  "RSXFS": "Retail Sales",
  "CPIAUCSL": "CPI All Items",
  "CPILFESL": "Core CPI",
  "PCEPI": "PCE Price Index",
  "PCEPILFE": "Core PCE",
  "UNRATE": "Unemployment Rate",
  "PAYEMS": "Nonfarm Payrolls",
  "ICSA": "Initial Jobless Claims",
  "CIVPART": "Labor Force Participation",
  "CES": "Average Hourly Earnings",
  "MSPUS": "Median Home Price",
  "MORTGAGEUS": "-Year Mortgage Rate",
  "HOUST": "Housing Starts",
  "CSUSHPINSA": "Case-Shiller Index",
  "UMCSENT": "Consumer Sentiment",
  "PSAVERT": "Personal Saving Rate",
  "TOTALSL": "Consumer Credit",
  "DRCCLACBS": "Credit Card Delinquency",
  "FEDFUNDS": "Fed Funds Rate",
  "DGS": "-Year Treasury",
  "DGS": "-Year Treasury",
  "VIXCLS": "VIX",
  "BOPGSTB": "Trade Balance",
  "DTWEXBGS": "USD Index",
  "GFDEBTN": "Federal Debt",
  "FYFSD": "Federal Deficit",
};

// ============================================================================
// DATA FETCHING
// ============================================================================

interface Observation {
  date: string;
  value: number;
}

interface SeriesResult {
  id: string;
  name: string;
  observations: Observation[];
  latest: Observation | null;
  trends: {
    "y": TrendStat | null;
    "y": TrendStat | null;
    "y": TrendStat | null;
    "y": TrendStat | null;
  };
}

interface TrendStat {
  start: number;
  end: number;
  change: number;
  pctChange: number;
  direction: "↑" | "↓" | "→";
}

async function fetchFredSeries(seriesId: string, years: number = ): Promise<SeriesResult | null> {
  if (!FRED_API_KEY) {
    console.error("FRED_API_KEY not set");
    return null;
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - years);

  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&observation_start=${startDate.toISOString().split('T')[]}&observation_end=${endDate.toISOString().split('T')[]}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.observations?.length) return null;

    const observations: Observation[] = data.observations
      .filter((o: any) => o.value !== ".")
      .map((o: any) => ({ date: o.date, value: parseFloat(o.value) }));

    const latest = observations[observations.length - ] || null;

    // Calculate trends
    const trends = {
      "y": calculateTrend(observations, ),
      "y": calculateTrend(observations, ),
      "y": calculateTrend(observations, ),
      "y": calculateTrend(observations, ),
    };

    return {
      id: seriesId,
      name: SERIES_NAMES[seriesId] || seriesId,
      observations,
      latest,
      trends,
    };
  } catch (e) {
    console.error(`Error fetching ${seriesId}:`, e);
    return null;
  }
}

function calculateTrend(observations: Observation[], years: number): TrendStat | null {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - years);

  const filtered = observations.filter(o => new Date(o.date) >= cutoff);
  if (filtered.length < ) return null;

  const start = filtered[].value;
  const end = filtered[filtered.length - ].value;
  const change = end - start;
  const pctChange = (change / Math.abs(start)) ;

  let direction: "↑" | "↓" | "→";
  if (Math.abs(pctChange) < ) direction = "→";
  else if (pctChange > ) direction = "↑";
  else direction = "↓";

  return { start, end, change, pctChange, direction };
}

async function fetchEIAGasPrice(): Promise<{ value: number; date: string } | null> {
  if (!EIA_API_KEY) return null;

  const url = `https://api.eia.gov/v/petroleum/pri/gnd/data/?api_key=${EIA_API_KEY}&frequency=weekly&data[]=value&facets[product][]=EPMR&facets[duession][]=Y&sort[][column]=period&sort[][direction]=desc&length=`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    const item = data.response?.data?.[];
    if (!item) return null;

    return { value: parseFloat(item.value), date: item.period };
  } catch (e) {
    return null;
  }
}

// ============================================================================
// ANALYSIS GENERATION
// ============================================================================

function formatValue(value: number, seriesId: string): string {
  // Format based on series type
  if (["UNRATE", "CIVPART", "PSAVERT", "MORTGAGEUS", "FEDFUNDS", "DGS", "DGS", "DRCCLACBS"].includes(seriesId)) {
    return `${value.toFixed()}%`;
  }
  if (["GDPC", "GFDEBTN", "BOPGSTB", "TOTALSL"].includes(seriesId)) {
    return value >= ? `$${(value / ).toFixed()}T` : `$${(value / ).toFixed()}B`;
  }
  if (["MSPUS"].includes(seriesId)) {
    return `$${(value / ).toFixed()}K`;
  }
  if (["PAYEMS", "ICSA"].includes(seriesId)) {
    return value >= ? `${(value / ).toFixed()}M` : `${value.toFixed()}K`;
  }
  return value.toFixed();
}

function generateMarkdown(results: Map<string, SeriesResult>, gasPrice: { value: number; date: string } | null): string {
  const now = new Date().toISOString().replace('T', ' ').split('.')[];

  let md = `US Economic State Analysis

Generated:${now}
Data Period:years through present
Sources:Federal Reserve Economic Data (FRED), Energy Information Administration (EIA)

---

Executive Summary

`;

  // Build summary based on key metrics
  const unrate = results.get("UNRATE");
  const cpi = results.get("CPIAUCSL");
  const gdp = results.get("GDPC");
  const fedfunds = results.get("FEDFUNDS");

  if (unrate?.latest) {
    md += `- Unemploymentat ${formatValue(unrate.latest.value, "UNRATE")} (${unrate.trends["y"]?.direction || "→"} YoY)\n`;
  }
  if (cpi?.trends["y"]) {
    md += `- Inflation (CPI)running ${cpi.trends["y"].pctChange.toFixed()}% YoY\n`;
  }
  if (gdp?.trends["y"]) {
    md += `- Real GDP${gdp.trends["y"].direction} ${Math.abs(gdp.trends["y"].pctChange).toFixed()}% over past year\n`;
  }
  if (fedfunds?.latest) {
    md += `- Fed Funds Rateat ${formatValue(fedfunds.latest.value, "FEDFUNDS")}\n`;
  }
  if (gasPrice) {
    md += `- Gas Pricesat $${gasPrice.value.toFixed()}/gallon (as of ${gasPrice.date})\n`;
  }

  md += `
---

Current Snapshot

| Category | Metric | Current | Y Change | Trend |
|----------|--------|---------|-----------|-------|
`;

  // Snapshot table
  const categories = [
    { name: "Economy", ids: ["GDPC", "ARLQSBEA"] },
    { name: "Inflation", ids: ["CPIAUCSL", "PCEPILFE"] },
    { name: "Employment", ids: ["UNRATE", "PAYEMS"] },
    { name: "Housing", ids: ["MSPUS", "MORTGAGEUS"] },
    { name: "Consumer", ids: ["UMCSENT", "PSAVERT"] },
    { name: "Markets", ids: ["FEDFUNDS", "DGS"] },
  ];

  for (const cat of categories) {
    for (const id of cat.ids) {
      const r = results.get(id);
      if (r?.latest && r.trends["y"]) {
        const changeStr = r.trends["y"].pctChange >=           ? `+${r.trends["y"].pctChange.toFixed()}%`
          : `${r.trends["y"].pctChange.toFixed()}%`;
        md += `| ${cat.name} | ${r.name} | ${formatValue(r.latest.value, id)} | ${changeStr} | ${r.trends["y"].direction} |\n`;
      }
    }
  }

  md += `
---

Detailed Trend Analysis

`;

  // Detailed analysis by category
  const categoryDetails = [
    { title: "Economic Output & Growth", ids: PRIORITY_SERIES.economic },
    { title: "Inflation & Prices", ids: PRIORITY_SERIES.inflation },
    { title: "Employment & Labor", ids: PRIORITY_SERIES.employment },
    { title: "Housing", ids: PRIORITY_SERIES.housing },
    { title: "Consumer & Personal Finance", ids: PRIORITY_SERIES.consumer },
    { title: "Financial Markets", ids: PRIORITY_SERIES.financial },
    { title: "Trade & International", ids: PRIORITY_SERIES.trade },
    { title: "Government & Fiscal", ids: PRIORITY_SERIES.fiscal },
  ];

  for (const cat of categoryDetails) {
    md += `${cat.title}\n\n`;
    md += `| Metric | Current | Y | Y | Y | Y |\n`;
    md += `|--------|---------|-----|----|----|----|\n`;

    for (const id of cat.ids) {
      const r = results.get(id);
      if (r?.latest) {
        const t= r.trends["y"] ? `${r.trends["y"].pctChange >= ? "+" : ""}${r.trends["y"].pctChange.toFixed()}%` : "—";
        const t= r.trends["y"] ? `${r.trends["y"].pctChange >= ? "+" : ""}${r.trends["y"].pctChange.toFixed()}%` : "—";
        const t= r.trends["y"] ? `${r.trends["y"].pctChange >= ? "+" : ""}${r.trends["y"].pctChange.toFixed()}%` : "—";
        const t= r.trends["y"] ? `${r.trends["y"].pctChange >= ? "+" : ""}${r.trends["y"].pctChange.toFixed()}%` : "—";
        md += `| ${r.name} | ${formatValue(r.latest.value, id)} | ${t} | ${t} | ${t} | ${t} |\n`;
      }
    }
    md += `\n`;
  }

  md += `---

Cross-Metric Analysis

Inflation-Employment Dynamics

`;

  if (unrate?.latest && cpi?.trends["y"]) {
    md += `Current unemployment (${formatValue(unrate.latest.value, "UNRATE")}) with CPI change of ${cpi.trends["y"].pctChange.toFixed()}% YoY suggests `;
    if (unrate.latest.value < .&& cpi.trends["y"].pctChange > ) {
      md += `a tight labor market with persistent inflationary pressure.\n`;
    } else if (unrate.latest.value < .&& cpi.trends["y"].pctChange < ) {
      md += `the economy is approaching a "soft landing" scenario.\n`;
    } else {
      md += `moderate labor market conditions.\n`;
    }
  }

  md += `
Yield Curve Status

`;

  const dgs= results.get("DGS");
  const dgs= results.get("DGS");
  if (dgs?.latest && dgs?.latest) {
    const spread = dgs.latest.value - dgs.latest.value;
    md += `- Y Treasury: ${formatValue(dgs.latest.value, "DGS")}\n`;
    md += `- Y Treasury: ${formatValue(dgs.latest.value, "DGS")}\n`;
    md += `- Spread: ${spread.toFixed()}pp (${spread < ? "INVERTED - recessionary signal" : "Normal"})\n`;
  }

  md += `
Housing Affordability

`;

  const homePrice = results.get("MSPUS");
  const mortgage = results.get("MORTGAGEUS");
  if (homePrice?.latest && mortgage?.latest) {
    md += `With median home price at ${formatValue(homePrice.latest.value, "MSPUS")} and mortgage rates at ${formatValue(mortgage.latest.value, "MORTGAGEUS")}, `;
    if (homePrice.latest.value > && mortgage.latest.value > ) {
      md += `housing affordability remains severely stressed.\n`;
    } else {
      md += `housing affordability is challenging but stabilizing.\n`;
    }
  }

  md += `
---

Pattern Detection

Historical Extremes

`;

  // Check for extremes
  const extremes: string[] = [];
  for (const [id, r] of results) {
    if (r.trends["y"]) {
      if (Math.abs(r.trends["y"].pctChange) > ) {
        extremes.push(`- ${r.name}: ${r.trends["y"].pctChange > ? "+" : ""}${r.trends["y"].pctChange.toFixed()}% over years (significant move)`);
      }
    }
  }

  if (extremes.length > ) {
    md += extremes.join("\n") + "\n";
  } else {
    md += "No extreme outliers detected in current data.\n";
  }

  md += `
Recent Momentum Shifts

`;

  // Look for acceleration/deceleration
  const shifts: string[] = [];
  for (const [id, r] of results) {
    if (r.trends["y"] && r.trends["y"]) {
      const fiveYrAnnual = r.trends["y"].pctChange / ;
      const oneYr = r.trends["y"].pctChange;
      if (Math.abs(oneYr) > Math.abs(fiveYrAnnual) && Math.abs(oneYr) > ) {
        shifts.push(`- ${r.name}: Accelerating (Y: ${oneYr.toFixed()}% vs Y avg: ${fiveYrAnnual.toFixed()}%/yr)`);
      } else if (Math.abs(oneYr) < Math.abs(fiveYrAnnual) / && Math.abs(fiveYrAnnual) > ) {
        shifts.push(`- ${r.name}: Decelerating (Y: ${oneYr.toFixed()}% vs Y avg: ${fiveYrAnnual.toFixed()}%/yr)`);
      }
    }
  }

  if (shifts.length > ) {
    md += shifts.join("\n") + "\n";
  } else {
    md += "No significant momentum shifts detected.\n";
  }

  md += `
---

Research Recommendations

High Priority Investigations

. Labor Market Dynamics: Examine the relationship between job openings, quit rate, and wage growth
. Inflation Persistence: Analyze components of CPI to identify sticky inflation drivers
. Housing Market: Investigate regional variations in home prices vs. mortgage rate sensitivity

Risks to Monitor

. Credit Conditions: Watch credit card delinquency and consumer credit growth rates
. Yield Curve: Monitor Y-Y spread for recession signals
. Consumer Sentiment: Track sentiment vs. actual spending divergence

Data Gaps

. Add regional breakdowns for key metrics
. Include leading economic indicators (LEI)
. Add wage growth by sector data

---

Sources

- FRED (Federal Reserve Economic Data): Primary source for most indicators
- EIA (Energy Information Administration): Gas and oil prices
- Treasury FiscalData: Federal debt and deficit data
- BLS (Bureau of Labor Statistics): Employment statistics
- Census Bureau: Housing data

---

Analysis generated by US-Metrics skill using Substrate US-Common-Metrics dataset`;

  return md;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const { values } = parseArgs({
    args: Bun.argv.slice(),
    options: {
      output: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(`
GenerateAnalysis.ts - Generate US Economic State Analysis

Usage:
  bun run GenerateAnalysis.ts [--output=path]

Options:
  --output=PATH  Save to file instead of stdout
  -h, --help     Show this help

Environment:
  FRED_API_KEY   Required for FRED data
  EIA_API_KEY    Optional for gas prices
`);
    process.exit();
  }

  console.error("Fetching data from FRED API...");

  const results = new Map<string, SeriesResult>();

  // Fetch all priority series
  const allSeries = Object.values(PRIORITY_SERIES).flat();
  for (const id of allSeries) {
    console.error(`  Fetching ${id}...`);
    const result = await fetchFredSeries(id, );
    if (result) {
      results.set(id, result);
    }
    // Small delay to be nice to the API
    await new Promise(r => setTimeout(r, ));
  }

  console.error("Fetching gas prices from EIA...");
  const gasPrice = await fetchEIAGasPrice();

  console.error("Generating analysis...");
  const markdown = generateMarkdown(results, gasPrice);

  if (values.output) {
    await Bun.write(values.output, markdown);
    console.error(`Analysis saved to ${values.output}`);
  } else {
    console.log(markdown);
  }
}

main();
