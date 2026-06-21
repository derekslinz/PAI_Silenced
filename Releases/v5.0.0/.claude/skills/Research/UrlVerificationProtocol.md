URL Verification Protocol

MANDATORY for all research workflows in this skill.
Critical Warning

```
---------------------------------------------------------------
  EVERY URL MUST BE VERIFIED BEFORE INCLUDING IN RESULTS
  Research agents HALLUCINATE URLs - NEVER trust them blindly
  A single broken link is a CATASTROPHIC FAILURE
---------------------------------------------------------------
```

Why This Matters

Research agents (Perplexity, Gemini, Claude, Grok) frequently HALLUCINATE URLs that look plausible but don't exist. This includes:
- URLs with correct domain but wrong path
- URLs with plausible article titles that were never published
- URLs combining real domains with fabricated paths
- URLs to articles that were deleted or moved

Verification Workflow

Before including ANY URL in research results:

. Verify with WebFetch- Actually fetch the URL and confirm it returns content (not , , or error)
. Confirm content matches claim- The fetched content must actually support what you're citing it for
. Use curl as backup- `curl -s -o /dev/null -w "%{http_code}" -L URL` to check HTTP status
. NEVER include unverified URLs- If you can't verify it, DON'T include it

```bash
Step : Check HTTP status
curl -s -o /dev/null -w "%{http_code}" -L "https://example.com/article"

Step : If , verify content with WebFetch
WebFetch(url, "Confirm this article exists and summarize its main point")

Step : Only include if BOTH checks pass
```

Acceptable vs Unacceptable

| Acceptable | Unacceptable |
|------------|--------------|
| URL verified via WebFetch returns actual content | URL from research agent without verification |
| URL returns AND content matches citation | URL returns //|
| URL content actually supports the claim | URL exists but content doesn't match |

Broken links destroy credibility. Verify EVERY URL.
Parallel Verification (for multi-agent modes)

When verifying many URLs (Extensive mode can produce -+), use parallel batch curl instead of sequential:

```bash
Parallel batch verification — all URLs checked simultaneously
urls=("url" "url" "url" ...)
for url in "${urls[@]}"; do
  curl -s -o /dev/null -w "%{http_code} $url\n" -L "$url" &
done
wait
Parse results: any non-→ remove from output
```

Fallback:If parallel verification fails (e.g., too many concurrent connections), fall back to sequential.

Agent Self-Verification

As of v., all researcher agents include a Self-Verification section that requires URL verification before returning results. This means most URLs should already be verified when the orchestrator receives them. The orchestrator's batch check is a safety net, not the primary verification layer.
