extract-knowledge

This command intelligently extracts knowledge and signal points from any input source (URLs, YouTube videos, PDFs, presentations, research papers, etc.). It automatically detects content type, fetches content using appropriate methods, analyzes the domain focus, and generates structured insights with actionable recommendations.

Usage

```
/extract-knowledge <source> [--focus=<domain>]
```

Examples:- `/extract-knowledge https://example.com/article` - Extract from web article
- `/extract-knowledge https://youtube.com/watch?v=abc` - Extract from YouTube video
- `/extract-knowledge /path/to/document.pdf` - Extract from PDF
- `/extract-knowledge https://presentation.com/slides --focus=security` - Extract security insights
- `/extract-knowledge "direct text content"` - Analyze text directly

Focus domains:security, business, research, wisdom, general (auto-detected if not specified)

Implementation

When this command is invoked:

Step : Detect Source Type and Fetch Content

YouTube Videos(youtube.com, youtu.be):
```bash
fabric --youtube "<url>"
```

Web URLs(http/https):
```bash
Try fabric first
fabric -u "<url>"
If that fails, use Bright Data MCP
mcp__brightdata__scrape_as_markdown url="<url>"
```

PDFs and Files:
```
Read the file directly using the Read tool
```

Research Papers(arxiv, doi):
Treat as web content but mark as research domain

Step : Analyze Content Domain

If `--focus` is not specified, auto-detect from content:
- Security: vulnerability, hack, exploit, cybersecurity, attack, defense
- Business: money, revenue, profit, market, strategy, business
- Research: study, experiment, methodology, findings, academic
- Wisdom: philosophy, principle, life, wisdom, insight, experience
- General: everything else

Step : Extract Knowledge Using PAI Services

For Security Content:- Use `mcp__pai__extract_primary_problem` and `mcp__pai__extract_primary_solution`
- Extract attack vectors, vulnerabilities, defensive measures
- Generate technical security recommendations

For Business Content:- Use `mcp__pai__extract_primary_problem` and `mcp__pai__extract_primary_solution`
- Extract revenue opportunities, market insights, growth strategies
- Generate business action items

For Research Content:- Use `mcp__pai__analyze_paper` if academic content
- Extract key findings, methodology insights, technical details
- Rate research quality and reproducibility

For Wisdom Content:- Use `mcp__pai__author_wisdom_aphorism` and `mcp__pai__create_quotes`
- Extract life principles, philosophical insights, practical wisdom
- Generate memorable quotes and aphorisms

For General Content:- Use `mcp__pai__create_expanded_summary` and `mcp__pai__rate`
- Extract key concepts, important facts, learning opportunities

Step : Structure Output

Generate structured knowledge extraction with:

```
KNOWLEDGE EXTRACTION RESULTS

Source: <source>
Type: <detected_type>
Domain: <detected_domain>
Quality Rating: <->/Confidence: <->/
CONTENT SUMMARY:
<-sentence summary>

KEY INSIGHTS:
• <insight >
• <insight >
• <insight >

SIGNAL POINTS:
• <signal point >
• <signal point >
• <signal point >

ACTIONABLE RECOMMENDATIONS:
<recommendation >
<recommendation >
<recommendation >

RELATED CONCEPTS:
<comma-separated list of key terms>

[Optional sections based on domain:]
EXTRACTED WISDOM: (for wisdom content)
"<key quotes and insights>"

 TECHNICAL DETAILS: (for security/research content)
• <technical detail >
• <technical detail >


```

Domain-Specific Signal Points

Security Domain:- New attack vectors identified
- Defensive strategies recommended
- Vulnerability assessment techniques
- Security tools and frameworks mentioned

Business Domain:- Revenue opportunities identified
- Market insights discovered
- Business strategies outlined
- Growth tactics documented

Research Domain:- Research findings summarized
- Methodology insights extracted
- Key contributions identified
- Future work directions noted

Wisdom Domain:- Life principles identified
- Philosophical insights extracted
- Practical wisdom discovered
- Universal truths highlighted

Quality Rating Criteria

- -: Comprehensive, actionable, high-value insights
- -: Good insights with clear recommendations
- -: Moderate value, some useful information
- -: Limited insights, basic information
- -: Poor quality or insufficient content
