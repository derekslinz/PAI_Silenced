Crawl Workflow

Purpose:Crawl multiple pages from a website — following links, extracting content, and returning structured results. Two modes: Light Crawl(agent-driven, using MCP batch scraping) and Full Crawl(Bright Data Crawl API for entire sites).

---

Prerequisites

- Starting URL (required)
- Crawl scope: specific section, depth limit, or full site
- Output format preference (markdown, HTML, JSON)
- For Full Crawl: Bright Data API key (set in environment)

---

Mode Selection

Choose based on scale:
| Mode | Pages | Method | Cost | Best For |
|------|-------|--------|------|----------|
| Light Crawl| -pages | MCP `scrape_batch` + link extraction loop | ~$./page | Section of a site, specific content |
| Full Crawl| -unlimited | Bright Data Crawl API (HTTP POST) | $./K pages | Entire site maps, comprehensive extraction |

Decision logic:- User says "crawl this section" or "get all pages under /docs" → Light Crawl- User says "crawl the entire site" or "map this whole site" → Full Crawl- User says "crawl" without scope → Askhow many pages or what section, then choose

---

Light Crawl (Agent-Driven)

Uses MCP `scrape_batch` (up to URLs per call) with iterative link discovery.

Step : Scrape the Starting URL

Use the FourTierScrape workflow to fetch the starting URL. Extract all internal links from the page content.

```
Scrape starting URL → Extract all <a href="..."> links → Filter to same-domain only
```

Link filtering rules:- Same domain only (no external links unless user requests it)
- Respect URL path scope if user specified one (e.g., only links under `/docs/`)
- Deduplicate URLs (normalize trailing slashes, query params)
- Skip: anchors (), mailto:, tel:, javascript:, static assets (.css, .js, .png, .jpg, .svg, .pdf)

Step : Batch Scrape Discovered Links

Use `mcp__Brightdata__scrape_as_markdown` or `scrape_batch` to fetch pages in batches of up to .

```
For each batch of up to unvisited URLs:
  . Call scrape_batch with the URLs
  . Extract new internal links from results
  . Add new links to the queue (if not already visited)
  . Store page content in results collection
  . Repeat until: queue empty OR page limit reached OR depth limit reached
```

Depth tracking:- Starting URL = depth - Links found on starting URL = depth - Links found on depth pages = depth - Default max depth: (override with user preference)

Page limit:- Default: pages
- User can specify: "crawl up to pages"
- Hard cap: pages per Light Crawl (for cost/time control)

Step : Compile Results

Assemble all crawled pages into a structured output:

```markdown
Crawl Results: [domain]
Pages crawled:[N]
Depth reached:[N]
Starting URL:[URL]

Site Map
- [URL ] (depth )
  - [URL ] (depth )
  - [URL ] (depth )
    - [URL ] (depth )

Page Contents

[URL ]
[markdown content]

[URL ]
[markdown content]
...
```

Light Crawl Error Handling

- If a page fails all tiers → log it as failed, continue crawling other pages
- If >% of pages fail → warn user, suggest Full Crawl instead
- If rate limited → add -second delay between batches

---

Full Crawl (Bright Data Crawl API)

For large-scale site crawling. Uses Bright Data's dedicated Crawl API via HTTP POST.

Step : Configure the Crawl

Build the API request based on user requirements:

```bash
curl -X POST "https://api.brightdata.com/datasets/v/trigger?dataset_id=CRAWL_DATASET_ID&format=json" \
  -H "Authorization: Bearer ${BRIGHT_DATA_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '[{
    "url": "[STARTING_URL]",
    "crawl_depth": [DEPTH],
    "url_filter": "[REGEX_PATTERN]",
    "format": "markdown"
  }]'
```

Key parameters:- `url` — Starting URL for the crawl
- `crawl_depth` — How many link hops to follow (default: )
- `url_filter` — Regex to restrict which URLs to crawl (e.g., `"https://example\\.com/docs/."`)
- `format` — Output format: `markdown`, `html`, `json`, `ld_json`
- `include_errors` — Set to `true` for detailed error logs

Step : Monitor Progress

The API returns a `snapshot_id`. Poll for completion:

```bash
curl -X GET "https://api.brightdata.com/datasets/v/progress/${SNAPSHOT_ID}" \
  -H "Authorization: Bearer ${BRIGHT_DATA_API_KEY}"
```

Status values:`running`, `ready`, `failed`

- Poll every seconds
- Timeout after minutes for small sites, minutes for large
- Report progress to user: "Crawling in progress... X pages collected so far"

Step : Retrieve Results

Once status is `ready`:

```bash
curl -X GET "https://api.brightdata.com/datasets/v/snapshot/${SNAPSHOT_ID}?format=json" \
  -H "Authorization: Bearer ${BRIGHT_DATA_API_KEY}"
```

Results come as an array of page objects, each with URL and content.

Step : Present Results

Same structured output format as Light Crawl, plus:
- Total pages crawled
- Total cost estimate ($./K pages)
- Any errors encountered
- Site map derived from crawled URLs

Full Crawl Error Handling

- API auth failure → check `BRIGHT_DATA_API_KEY` environment variable
- Timeout → offer to increase wait time or try Light Crawl for smaller scope
- Partial failure → deliver what was crawled, list failed URLs

---

Output & Verification

For both modes:

. Present site map— hierarchical URL tree showing crawl structure
. Present content— each page's content in the requested format
. Summary stats— pages crawled, depth, time taken, cost
. Quality check— flag any pages that returned empty or error content
. Offer export— if large result set, offer to write to a file

---

Cost Considerations

| Mode | Cost | Time |
|------|------|------|
| Light Crawl (pages) | ~$.| -seconds |
| Light Crawl (pages) | ~$.| -minutes |
| Light Crawl (pages) | ~$.| -minutes |
| Full Crawl (pages) | ~$.| -minutes |
| Full Crawl (pages) | ~$.| -minutes |
| Full Crawl (K pages) | ~$.| -minutes |

Always confirm with user before:- Light Crawl exceeding pages
- Any Full Crawl (involves Bright Data API costs)

---

Examples

Example : Crawl a Documentation Section
User: "Crawl all the pages under https://docs.example.com/api/"

. Mode: Light Crawl(section-scoped)
. Start URL: `https://docs.example.com/api/`
. URL filter: only links matching `/api/` path
. Depth: . Page limit: . Scrape starting page → find links under /api/
. Batch scrape , then → find more sub-pages
. Batch scrape → no new links
. Total: pages crawled in ~seconds
. Return structured content + site map

Example : Map an Entire Site
User: "Crawl the entire site at https://smallbusiness.com"

. Mode: Full Crawl(entire site)
. Confirm with user: "This will use the Bright Data Crawl API. Estimated cost depends on site size. Proceed?"
. POST to Crawl API with depth , no URL filter
. Poll for completion
. Retrieve results (e.g., pages)
. Present site map + content summary
. Cost: ~$.
Example : Competitive Research Crawl
User: "Crawl competitor.com and get all their product pages"

. Mode: Full Crawlwith URL filter
. URL filter regex: `"https://competitor\\.com/products/."`
. Depth: (products are usually -levels deep)
. Crawl API handles bot detection automatically
. Return structured product page content

---

Related Workflows

- FourTierScrape.md— Single-page scraping (used internally by Light Crawl for the starting URL and as fallback)
