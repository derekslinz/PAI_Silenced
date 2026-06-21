Retrieve Workflow

Intelligent multi-layer content retrieval system for DIFFICULT content retrieval. Uses built-in tools (WebFetch, WebSearch), BrightData MCP (CAPTCHA handling, advanced scraping), and Apify MCP (RAG browser, Actor ecosystem). USE ONLY WHEN user indicates difficulty: 'can't get this', 'having trouble', 'site is blocking', 'protected site', 'keeps giving CAPTCHA', 'won't let me scrape'. DO NOT use for simple 'read this page' or 'get content from' without indication of difficulty.

When to Use This Skill

️ IMPORTANT:This skill is for CHALLENGING content retrieval only, not routine fetching.

DO USE this skill when user indicates difficulty:- "I can't get this content"
- "Having trouble retrieving this"
- "Site is blocking me"
- "Protected site" / "CloudFlare protected"
- "Keeps giving me CAPTCHA"
- "Won't let me scrape this"
- "Bot detection blocking me"
- "Rate limited when trying to get this"
- "Tried to fetch but failed"
- "Need advanced scraping for this"

DO NOT use this skill for simple requests:- "Read this page" → Use WebFetch directly
- "Get content from [URL]" → Use WebFetch directly
- "What does this site say" → Use WebFetch directly
- "Fetch this article" → Use WebFetch directly
- "Check this URL" → Use WebFetch directly

Simple rule:Only activate when user signals DIFFICULTY, not for routine content requests.

NOT for research questions- use the research skill instead for "research X" or "find information about X"

Intelligent Retrieval Strategy

The Retrieve skill uses a -layer fallback strategyto ensure content can always be retrieved:

```
Layer : Built-in Tools (Fast, Simple)
  ↓ (If blocked, rate-limited, or fails)
Layer : BrightData MCP (CAPTCHA handling, advanced scraping)
  ↓ (If specialized scraping needed)
Layer : Apify MCP (RAG browser, Actor ecosystem)
```

Decision Tree: Which Layer to Use?

Start with Layer (Built-in) if:- Simple public webpage
- No known bot detection
- Standard HTML content
- Quick one-off fetch

Use Layer (BrightData) if:- Layer blocked or failed
- Known bot detection (CloudFlare, etc.)
- CAPTCHA protection
- Rate limiting encountered
- Multiple pages from same domain
- Search engine results needed (Google, Bing, Yandex)

Use Layer (Apify) if:- Need specialized extraction (social media, e-commerce)
- Complex JavaScript rendering required
- Specific Actor exists for the site
- Layer and both failed
- Need RAG-optimized content (markdown format for LLM processing)

Layer : Built-in Tools

WebFetch Tool

Best for:Simple HTML pages, public content, one-off fetches

Usage:```typescript
// Fetch and extract specific information
WebFetch({
  url: "https://example.com/page",
  prompt: "Extract the main article content and author name"
})
```

When it fails:- Returns error about blocked request
- Gets rate-limited (status)
- Receives CAPTCHA challenge
- Returns empty/broken content
→ Escalate to Layer (BrightData)
WebSearch Tool

Best for:Finding content when you have keywords but not URLs

Usage:```typescript
// Search for content, get URLs, then fetch them
WebSearch({
  query: "latest React features documentation",
  allowed_domains: ["react.dev"]
})
```

When it fails:- Need more comprehensive search results
- Need specific search engine (Google, Bing, Yandex)
→ Escalate to Layer (BrightData search_engine)
Layer : BrightData MCP

scrape_as_markdown Tool

Best for:Sites with bot protection, CAPTCHA, JavaScript rendering

Key Features:- Bypasses CloudFlare, bot detection, CAPTCHAs
- Returns clean markdown (perfect for LLM consumption)
- Handles JavaScript-heavy sites
- Residential proxy network

Usage:```typescript
// Single URL scraping with bot protection bypass
mcp__Brightdata__scrape_as_markdown({
  url: "https://protected-site.com/article"
})

// Multiple URLs in parallel (up to )
mcp__Brightdata__scrape_batch({
  urls: [
    "https://site.com/page",
    "https://site.com/page",
    "https://site.com/page"
  ]
})
```

When to use:- Layer WebFetch failed with blocking/CAPTCHA
- Known protected sites (CloudFlare, etc.)
- Need batch scraping from same domain
- Want markdown output for LLM processing

When it fails:- Site requires very specialized extraction logic
- Need social media specific scraping
→ Escalate to Layer (Apify Actors)
search_engine Tool

Best for:Getting search results from Google, Bing, Yandex

Usage:```typescript
// Search Google for results
mcp__Brightdata__search_engine({
  engine: "google",
  query: "React server components"
})

// Search multiple engines in parallel
mcp__Brightdata__search_engine_batch({
  queries: [
    { engine: "google", query: "React features" },
    { engine: "bing", query: "React features" },
    { engine: "yandex", query: "React features" }
  ]
})
```

Output format:- Google: JSON with structured results
- Bing/Yandex: Markdown with URLs, titles, descriptions

When to use:- Need search engine results (not just website content)
- Want multiple search engines for comprehensive coverage
- Layer WebSearch insufficient

Layer : Apify MCP

RAG Web Browser Actor

Best for:Content optimized for RAG/LLM consumption, general browsing

Key Features:- Google Search + scraping in one Actor
- Returns markdown optimized for LLM context
- Can scrape individual URLs or search results
- Top N results from search

Usage:```typescript
// Search Google and scrape top results
mcp__Apify__apify-slash-rag-web-browser({
  query: "React server components",
  maxResults: ,
  outputFormats: ["markdown"]
})

// Scrape specific URL (query is URL)
mcp__Apify__apify-slash-rag-web-browser({
  query: "https://react.dev/blog////react-",
  maxResults: ,
  outputFormats: ["markdown", "text", "html"]
})
```

When to use:- Need content formatted for LLM consumption
- Want search + scraping in one operation
- Layer and failed or insufficient

Output:Returns datasetId for full results

To get full output:```typescript
mcp__Apify__get-actor-output({
  datasetId: "abcxyz",
  fields: "markdown,url,title"  // Optional: specific fields
})
```

Specialized Actors

Best for:Site-specific scraping (Instagram, Twitter, LinkedIn, etc.)

Finding Actors:```typescript
// Search for specialized Actor
mcp__Apify__search-actors({
  search: "instagram posts scraper",
  limit: })

// Get Actor details and input schema
mcp__Apify__fetch-actor-details({
  actor: "apify/instagram-scraper"
})
```

Using Actors (-step workflow):```typescript
// Step : Get Actor info and input schema
mcp__Apify__call-actor({
  actor: "apify/instagram-scraper",
  step: "info"
})

// Step : Run Actor with proper input
mcp__Apify__call-actor({
  actor: "apify/instagram-scraper",
  step: "call",
  input: {
    username: "example",
    resultsLimit:   }
})
```

When to use:- Specialized site needs (social media, e-commerce)
- Layer and failed
- Need platform-specific extraction logic

Complete Retrieval Workflow

Example: Retrieve Article Content

User request:"Get me the content from https://example.com/article"

Execution:
```typescript
// . Try Layer (Built-in) first
WebFetch({
  url: "https://example.com/article",
  prompt: "Extract the main article content, title, author, and published date"
})

// . If Layer fails (blocked/CAPTCHA):
mcp__Brightdata__scrape_as_markdown({
  url: "https://example.com/article"
})

// . If Layer fails (needs specialized extraction):
mcp__Apify__apify-slash-rag-web-browser({
  query: "https://example.com/article",
  maxResults: ,
  outputFormats: ["markdown"]
})

// . Get full output from Apify:
mcp__Apify__get-actor-output({
  datasetId: "[from previous response]"
})
```

Example: Search + Scrape Multiple Pages

User request:"Get content about React from the top search results"

Execution:
```typescript
// . Try Layer for search:
WebSearch({
  query: "React features documentation",
  allowed_domains: ["react.dev"]
})
// Extract URLs from results

// . Fetch each URL with Layer :
WebFetch({ url: url, prompt: "Extract main content" })
WebFetch({ url: url, prompt: "Extract main content" })
// ... (can run in parallel)

// . If any Layer fetches fail, use Layer batch:
mcp__Brightdata__scrape_batch({
  urls: [url, url, url, url, url]
})

// . OR use Layer for all-in-one search + scrape:
mcp__Apify__apify-slash-rag-web-browser({
  query: "React features documentation",
  maxResults: ,
  outputFormats: ["markdown"]
})
// Then get full output with get-actor-output
```

Example: Protected Site Scraping

User request:"Scrape this CloudFlare-protected site"

Execution:
```typescript
// Skip Layer (known to fail on protected sites)
// Start with Layer :
mcp__Brightdata__scrape_as_markdown({
  url: "https://cloudflare-protected-site.com"
})

// If Layer fails, try Layer :
mcp__Apify__apify-slash-rag-web-browser({
  query: "https://cloudflare-protected-site.com",
  maxResults: ,
  outputFormats: ["markdown"]
})
```

Layer Comparison Matrix

| Feature | Layer (Built-in) | Layer (BrightData) | Layer (Apify) |
|---------|-------------------|----------------------|-----------------|
| Speed| Fast (< s) | Medium (-s) | Slower (-s) |
| Bot Detection Bypass| No | Yes | Yes |
| CAPTCHA Handling| No | Yes | Yes |
| JavaScript Rendering| ️ Limited | Full | Full |
| Batch Operations| Manual | Up to | Unlimited |
| Search Integration| Basic | Multi-engine | Google only |
| Markdown Output| Yes | Yes | Optimized |
| Specialized Extraction| No | No | Yes (Actors) |
| Cost| Free | Paid | Paid |
| Best For| Simple pages | Protected sites | Specialized scraping |

Error Handling & Escalation

Layer Errors → Escalate to Layer :- HTTP (Forbidden)
- HTTP (Rate Limited)
- HTTP (Service Unavailable)
- Empty content returned
- CAPTCHA challenge detected
- Bot detection messages

Layer Errors → Escalate to Layer :- Scraping failed after retries
- Site requires very specialized logic
- Need social media specific extraction
- Platform-specific data structures needed

Layer Errors → Report to User:- All layers exhausted
- Site technically impossible to scrape
- Requires manual intervention or login
- Legal/ethical concerns with scraping

Working Files → History Pattern

Working Directory:`~/.claude/PAI/MEMORY/WORK/{current_work}/`

Getting Current Work Directory:. Read `~/.claude/`
. Extract the `work_dir` value
. Use `~/.claude/PAI/MEMORY/WORK/{work_dir}/` for temporary artifacts

Process:
. Working Files (Temporary):   - All retrieval work artifacts go in current work item directory
   - Store raw scraped content (HTML, markdown, JSON)
   - Keep intermediate processing notes
   - Save error logs and retry attempts
   - Draft extracted data and transformations
   - Ties retrieval artifacts to work item for learning
. History (Permanent Archive):
   - Move to `~/.claude/History/research/YYYY-MM-DD_[description]/` when complete
   - Include: `README.md`, final extracted content, metadata
   - Archive for future reference and reuse

. Verification (MANDATORY):   - Check if hooks captured output to history automatically
   - If hooks failed, manually save to history
   - Confirm all files present in history directory
   - Note:Working artifacts remain tied to work item (don't delete)

File Structure Example:
Working files (in current work item directory):```
~/.claude/PAI/MEMORY/WORK/-_retrieve-react-docs/
├── raw-content/
│   ├── page.md (Layer output)
│   ├── page.md (Layer output)
│   └── page.md (Layer output)
├── processed/
│   ├── combined-content.md
│   └── extracted-features.json
├── metadata.json (URLs, layers used, timestamps)
└── errors.log (failed attempts, escalations)
```

History (permanent archive):```
~/.claude/History/research/--_react-documentation/
├── README.md (retrieval documentation)
├── content.md (final extracted content)
├── metadata.json (sources, layers used, timestamps)
└── summary.md (key extracted information)
```

README.md Template:```markdown
Retrieval: [Site/Topic]

Date:YYYY-MM-DD
Target:[URLs or site description]
Layers Used:Layer / Layer / Layer 
Retrieval Request
[Original request]

URLs Retrieved
- URL - URL - URL 
Layers & Tools Used
- Layer : WebFetch (success/failed)
- Layer : BrightData scrape_as_markdown (success/failed)
- Layer : Apify RAG browser (success/failed)

Challenges Encountered
- Bot detection: Yes/No
- CAPTCHA: Yes/No
- JavaScript rendering: Yes/No
- Rate limiting: Yes/No

Output Files
- content.md: Final extracted content
- metadata.json: Source tracking
- summary.md: Key information extracted

Notes
[Any limitations, challenges, or follow-up needed]
```

Quick Reference Card

Start with Layer (Built-in):- Simple public webpages
- Quick one-off fetches
- Basic search queries

Use Layer (BrightData):- Bot detection blocking Layer - CAPTCHA protection
- Rate limiting encountered
- Need batch scraping (-URLs)
- Search engine results needed

Use Layer (Apify):- Specialized site scraping (social media, e-commerce)
- Layer and both failed
- Need RAG-optimized markdown
- Complex extraction logic required

Remember:- Always try simplest approach first (Layer )
- Escalate only when previous layer fails
- Document which layers were used and why
- Work artifacts go in current work item directory
- Final valuable content goes to history
- Working artifacts stay tied to work item for learning
