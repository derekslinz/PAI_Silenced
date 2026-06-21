Web Scraping Workflow

Web scraping and crawling using WebFetch for simple pages, BrightData MCP for CAPTCHA/blocking, and Apify MCP for social media. Includes HTML parsing, rate limiting, and best practices for ethical scraping.

When to Activate This Skill
- Scrape web pages
- Extract data from websites
- Crawl multiple pages
- Collect web data
- Extract links or content
- Data extraction tasks

Decision Tree

. Simple pages?→ Use WebFetch first
. CAPTCHA/blocking?→ Use BrightData MCP (`mcp__brightdata__`)
. Social media?→ Use Apify MCP

Common Tasks

Extract All Links from Page
. Use WebFetch to get HTML
. Parse HTML for <a> tags
. Extract href attributes

Scrape Product Listings
. Use appropriate tool (WebFetch or BrightData)
. Parse HTML for product containers
. Extract data (title, price, image, etc.)

Crawl Multiple Pages
. Start with index/listing page
. Extract links to detail pages
. Fetch each detail page
. Extract data from each

Best Practices

Do's
Check robots.txt first
Add delays between requests
Handle errors gracefully
Use appropriate tool for site
Cache results when possible

Don'ts
Don't scrape too fast
Don't ignore rate limits
Don't scrape personal data without permission
Don't bypass security maliciously

Rate Limiting
- Add delays between requests (`sleep `)
- Respect robots.txt
- Don't overwhelm servers

Supplementary Resources
For advanced scraping: `read ~/.claude/docs/web-scraping-advanced.md`
For MCP tools: `read ~/.claude/docs/mcp-servers-reference.md`
