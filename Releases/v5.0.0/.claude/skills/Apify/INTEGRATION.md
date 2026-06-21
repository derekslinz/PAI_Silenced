Apify Integration Guide

Status:Production Ready Token Savings:-% vs traditional MCP approach
Execution Time:~seconds typical

Integration with PAI Skills

Social Skill Integration


Updated Section:"Fetching Tweet Content"

The social skill now uses code-based Apify scripts instead of `mcp__apify` MCP tool.

Trigger → Script Mapping:
| User Says | Script to Run |
|-----------|---------------|
| "my latest tweet" | `get-latest-tweet.ts` |
| "my latest thread" | `get-latest-thread.ts` |
| "get tweets from @user" | `get-user-tweets.ts user ` |
| "what has @user been talking about" | `get-user-tweets.ts user ` |

Example Workflow:
. User: "Turn my latest tweet into a LinkedIn post"
. System runs: `bun ~/.claude/filesystem-mcps/apify/get-latest-tweet.ts`
. Script returns: Tweet text + metadata (~tokens)
. System transforms tweet into LinkedIn format
. Token savings: %(vs fetching unfiltered profile data)

Research Skill Integration

Use Case:Monitor influential developers' Twitter activity

```bash
Research what ThePrimeagen is discussing
bun ~/.claude/filesystem-mcps/apify/get-user-tweets.ts ThePrimeagen 
Analyze Paul Graham's recent thoughts
bun ~/.claude/filesystem-mcps/apify/get-user-tweets.ts paulg 
Track Simon Willison's posts
bun ~/.claude/filesystem-mcps/apify/get-user-tweets.ts simonw ```

Token Efficiency:- tweets unfiltered: ~,tokens
- tweets filtered: ~,tokens
- Savings: %
Writing Skill Integration

Use Case:Generate blog content from Twitter discussions

```bash
Get user's thread about AI topic
bun ~/.claude/filesystem-mcps/apify/get-latest-thread.ts

Expand thread into blog post format
Token efficient: only thread content in context
```

Available Scripts Summary

. get-latest-tweet.ts
Purpose:User's most recent single tweet
Usage:`bun get-latest-tweet.ts`
Returns:Text, date, URL, engagement stats
Tokens:~
. get-latest-thread.ts
Purpose:User's most recent Twitter thread
Usage:`bun get-latest-thread.ts`
Returns:All thread tweets chronologically
Tokens:~,(for -tweet thread)
Savings:-% vs unfiltered

. get-user-tweets.ts
Purpose:Any user's recent tweets
Usage:`bun get-user-tweets.ts <username> <limit>`
Returns:Recent tweets with metadata
Tokens:~per tweet
Savings:-% vs unfiltered

. debug-tweet-structure.ts
Purpose:Inspect raw API response
Usage:`bun debug-tweet-structure.ts`
Returns:Full JSON structure + available fields
Use:Development/debugging only

Migration from MCP

Before (MCP Approach)

```typescript
// Step : Search for actors (~,tokens)
mcp__Apify__search-actors("twitter scraper")

// Step : Call actor (~,tokens)
mcp__Apify__call-actor(actorId, input)

// Step : Get output (~,tokens unfiltered!)
mcp__Apify__get-actor-output(runId)

// Total: ~,tokens
```

After (Code-Based Approach)

```typescript
// All in one script, filtering in code
bun ~/.claude/filesystem-mcps/apify/get-latest-tweet.ts

// Returns only filtered result: ~tokens
// Savings: .%
```

Best Practices

DO:
Use appropriate script for the task
Let script filter data before returning
Trust token savings calculations
Run from `~/.claude/filesystem-mcps/apify/` directory or use full path
Check execution time (~seconds expected)

DON'T:
Fall back to MCP tools for Twitter operations
Fetch unfiltered data into model context
Re-implement filtering logic (use existing scripts)
Skip error handling (scripts handle common errors)
Ignore token savings metrics in output

Performance Expectations

Execution Time:- Actor search: Eliminated (hardcoded actor ID)
- Actor execution: ~seconds (Apify platform time)
- Data processing: <second (TypeScript filtering)
- Total: ~seconds
Token Usage:- Single tweet: tokens (vs ,MCP)
- Thread (tweets): ,tokens (vs ,unfiltered)
- User tweets (): ,tokens (vs ,unfiltered)

Rate Limits:- Apify free tier: actor runs/day
- Apify paid tier: Unlimited
- Current usage: Well within limits

Error Handling

Scripts handle common errors automatically:

. Missing APIFY_TOKEN→ Clear error message with setup instructions
. Actor failure→ Reports status and exits cleanly
. No results→ Graceful message, no crash
. Network timeout→ Configurable timeout (s default)

Manual intervention rarely needed.
Future Enhancements

Planned Features:

. Search tweets by topic   - `search-tweets.ts <username> <query> <limit>`
   - Example: Search user's tweets about "AI" from last month

. Thread detection improvements   - Better handling of quote tweets
   - Reply chain analysis
   - Thread continuity verification

. Engagement analytics   - Filter by minimum engagement threshold
   - Sort by engagement metrics
   - Engagement trend analysis

. Export formats   - JSON output for programmatic use
   - Markdown format for documentation
   - CSV for spreadsheet analysis

Migration Candidates:

Other Apify actors worth implementing:
- Instagram scraping
- LinkedIn scraping
- YouTube data extraction
- Generic web scraping

Same pattern applies:Filter in code, %+ token savings expected.

Documentation

For Users:- Quick reference: `~/.claude/`
- Social skill: `~/.claude/`

For Developers:- Implementation: `~/.claude/`
- Standards: `~/.claude/`
- Parent guide: `~/.claude/`

Support

Common Questions:
Q: Why not use MCP?
A: -% token savings, faster execution, better control.

Q: What if script fails?
A: Check `APIFY_TOKEN` in `${PAI_DIR}/.env`, verify network, check Apify status.

Q: Can I add new actors?
A: Yes! Follow `STANDARDS.md` pattern, hardcode actor ID, filter in code.

Q: How do I debug?
A: Use `debug-tweet-structure.ts` to inspect raw data, check console output.

Success Metrics

Achieved:- -% token reduction vs MCP
- ~second execution time
- Production integration in social skill
- production-ready scripts
- Comprehensive documentation

This is now the standard for all Twitter operations in PAI.