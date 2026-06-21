Four-Tier URL Content Scraping

---

Purpose:Progressive escalation strategy to retrieve URL content using four fallback tiers

When to Use:- User requests scraping or fetching content from any URL
- Standard methods are failing or blocked
- Site has bot detection or access restrictions
- Need reliable content extraction in markdown format

Prerequisites:- URL to scrape (provided by user)
- WebFetch tool (built-in)
- Bash tool for curl commands
- Browser automation capability (agent-browser — Playwright is banned)
- Bright Data MCP available

---

Workflow Steps

Step : Tier - WebFetch (Fast & Simple)

Description:Attempt to fetch URL using Claude Code's built-in WebFetch tool

Actions:```
Use WebFetch tool with:
- URL: [user-provided URL]
- Prompt: "Extract all content from this page and convert to markdown"
```

Expected Outcomes:- Success:Content retrieved in markdown format → Skip to Step (Output)
- Failure:WebFetch blocked, timeout, or error → Proceed to Step (Tier )

Typical Success Cases:- Public websites without bot detection
- Simple content sites
- Sites with permissive access policies

Typical Failure Cases:- Sites with user-agent filtering
- Sites with basic bot detection
- Sites requiring specific headers

---

Step : Tier - Customized Curl (Chrome-like Headers)

Description:Use curl with comprehensive Chrome browser headers to bypass basic bot detection

Actions:```bash
curl -L -A "Mozilla/.(Macintosh; Intel Mac OS X __) AppleWebKit/.(KHTML, like Gecko) Chrome/...Safari/." \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=.,image/avif,image/webp,image/apng,/;q=." \
  -H "Accept-Language: en-US,en;q=." \
  -H "Accept-Encoding: gzip, deflate, br" \
  -H "DNT: " \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: " \
  -H "Sec-Fetch-Dest: document" \
  -H "Sec-Fetch-Mode: navigate" \
  -H "Sec-Fetch-Site: none" \
  -H "Sec-Fetch-User: ?" \
  -H "Cache-Control: max-age=" \
  --compressed \
  "[URL]"
```

Header Explanation:- User-Agent:Latest Chrome on macOS (most common, least suspicious)
- Accept headers:Legitimate browser accept patterns
- Sec-Fetch-headers:Chrome's security headers (critical for bypassing detection)
- DNT:Do Not Track (common privacy setting)
- --compressed:Handle gzip/br encoding like real browsers

Expected Outcomes:- Success:HTML content retrieved → Convert to markdown → Skip to Step (Output)
- Failure:Still blocked, CAPTCHA, or JavaScript required → Proceed to Step (Tier )

Typical Success Cases:- Sites with basic user-agent checking
- Sites with simple header validation
- Sites without JavaScript rendering requirements

Typical Failure Cases:- Sites with CAPTCHA
- Sites requiring JavaScript execution
- Sites with advanced fingerprinting
- Sites with IP-based rate limiting

---

Step : Tier - Browser Automation (agent-browser)

Description:Use headless browser automation via agent-browser (Rust CLI daemon) to handle JavaScript-heavy sites. Playwright is banned across PAI.

Actions:```bash
Use agent-browser to navigate and extract rendered content
agent-browser --session scrape open "<url>"
agent-browser --session scrape text
```

What Browser Automation Provides:- Real browser execution (Chrome/Firefox)
- Full JavaScript rendering and execution
- DOM manipulation and dynamic content loading
- Cookie/session handling
- Screenshot and PDF capabilities
- Network request interception
- Proper browser fingerprinting

Expected Outcomes:- Success:Content extracted from fully rendered page → Convert to markdown → Skip to Step (Output)
- Failure:CAPTCHA or advanced bot detection → Proceed to Step (Tier )

Typical Success Cases:- Single-page applications (SPAs)
- Sites with heavy JavaScript frameworks (React, Vue, Angular)
- Sites with dynamic content loading
- Sites requiring cookies/sessions
- Sites with complex DOM structures

Typical Failure Cases:- Sites with CAPTCHA challenges
- Sites with advanced bot detection that fingerprint browser automation
- Sites requiring residential IP addresses
- Sites with aggressive rate limiting based on datacenter IPs

---

Step : Tier - Bright Data MCP (Professional Scraping)

Description:Use Bright Data MCP's professional scraping service with bot detection bypass

Actions:```
Use mcp__Brightdata__scrape_as_markdown tool with:
- URL: [user-provided URL]
```

What Bright Data Provides:- Residential proxy network (real IP addresses)
- Automatic CAPTCHA solving
- JavaScript rendering (headless browser)
- Anti-bot detection bypass
- Automatic retry logic
- Content extraction and markdown conversion

Expected Outcomes:- Success:Content retrieved in markdown format → Proceed to Step (Output)
- Failure:Extremely rare - site may be completely inaccessible or down

Typical Success Cases:- Sites with CAPTCHA challenges
- Sites with advanced bot detection and fingerprinting
- Sites requiring residential IP addresses
- Sites with aggressive rate limiting
- Any site that blocked Tiers , , and 
Typical Failure Cases:- Site is completely down
- Site requires authentication (login)
- Site has legal restrictions (e.g., paywall, geographic restrictions)

---

Step : Output & Verification

Description:Present retrieved content to user with tier information

Actions:- Present content in markdown format
- Indicate which tier was successful
- Provide any warnings or notes about content quality

Verification:- Content is readable and properly formatted
- Content matches expected URL
- No major sections missing

Example Output:```markdown
Successfully retrieved content from [URL] using Tier [///]

[Content in markdown format...]
```

---

Outputs

Primary Output:- URL content in markdown format
- Includes title, headers, paragraphs, links, images (as markdown)

Metadata:- Which tier was successful
- Any warnings or notes
- Execution time

Where outputs are stored:- Returned directly to user in conversation
- No persistent storage (unless user requests it)

---

Decision Logic

```
START
  ↓
Attempt Tier (WebFetch)
  ↓
Success? → Yes → Return content 
  ↓
  No
  ↓
Attempt Tier (Curl + Chrome Headers)
  ↓
Success? → Yes → Return content 
  ↓
  No
  ↓
Attempt Tier (Browser Automation)
  ↓
Success? → Yes → Return content 
  ↓
  No
  ↓
Attempt Tier (Bright Data MCP)
  ↓
Success? → Yes → Return content 
  ↓
  No
  ↓
Report failure + suggest alternatives
```

---

Error Handling

If Tier Fails:- Log failure reason (blocked, timeout, error)
- Automatically proceed to Tier - No user intervention required

If Tier Fails:- Log failure reason
- Automatically proceed to Tier - No user intervention required

If Tier Fails:- Log failure reason
- Automatically proceed to Tier - No user intervention required

If Tier Fails:- Report to user that site is inaccessible
- Suggest alternatives:
  - Check if URL is correct
  - Check if site requires authentication
  - Check if site has geographic restrictions
  - Try accessing manually in browser to verify site is up

---

Optimization Notes

When to Skip Tiers:- If user explicitly requests "use Bright Data" → Skip directly to Tier - If user explicitly requests "use browser" → Skip to Tier - If previous scrape of same domain failed at Tier → Start at Tier - If URL is known SPA or JavaScript-heavy → Consider starting at Tier - If URL is known difficult site with CAPTCHA → Consider starting at Tier 
Cost Considerations:- Tier : Free (built-in)
- Tier : Free (built-in)
- Tier : Free (local browser automation)
- Tier : Uses Bright Data credits (minimal cost per scrape)
- Always try cheaper tiers first unless user specifies otherwise

Performance:- Tier : ~-seconds
- Tier : ~-seconds
- Tier : ~-seconds
- Tier : ~-seconds
- Total worst-case: ~seconds for all four attempts

---

Related Workflows

- None (this is the primary workflow for brightdata skill)

Future Enhancements:- Add caching layer to avoid re-scraping same URLs
- Add batch scraping for multiple URLs
- Add domain-specific optimizations (known difficult sites)
- Add custom header profiles for different site types

---

Examples

Example : Public Site (Tier Success)
Input: https://example.com

Process:
. Attempt Tier (WebFetch)
. Success in seconds
. Return content

Output:
```markdown
Successfully retrieved content from https://example.com using Tier (WebFetch)

Example Domain

This domain is for use in illustrative examples...
```

Example : JavaScript-Heavy Site (Tier Success)
Input: https://spa-site.com

Process:
. Attempt Tier (WebFetch) → Blocked ()
. Attempt Tier (Curl) → Returns empty (JavaScript required)
. Attempt Tier (Browser Automation) → Success in seconds
. Return content

Output:
```markdown
Successfully retrieved content from https://spa-site.com using Tier (Browser Automation)

Note: This site requires JavaScript rendering. Content was retrieved using agent-browser.

SPA Site Content

[Content retrieved successfully...]
```

Example : Protected Site with CAPTCHA (Tier Success)
Input: https://protected-site.com

Process:
. Attempt Tier (WebFetch) → Blocked ()
. Attempt Tier (Curl) → Blocked (bot detection)
. Attempt Tier (Browser Automation) → Blocked (CAPTCHA)
. Attempt Tier (Bright Data) → Success in seconds
. Return content

Output:
```markdown
Successfully retrieved content from https://protected-site.com using Tier (Bright Data MCP)

Note: This site has advanced bot detection and CAPTCHA. Content was retrieved using professional scraping service.

Protected Site Content

[Content retrieved successfully...]
```

Example : Explicit Bright Data Request
Input: "Use Bright Data to fetch https://any-site.com"

Process:
. User explicitly requested Bright Data
. Skip directly to Tier . Success in seconds
. Return content

Output:
```markdown
Retrieved content from https://any-site.com using Tier (Bright Data MCP) as requested

[Content...]
```

---

Last Updated:--