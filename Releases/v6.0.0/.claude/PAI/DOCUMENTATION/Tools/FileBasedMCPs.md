# File-Based MCPs — Architecture Pattern

**Pattern:** Code-first API wrappers that replace token-heavy MCP protocol calls with direct TypeScript functions.

## Why File-Based?

**Filter data in code BEFORE returning to model context = 95-99% token savings.**

Traditional MCP protocol returns full API responses (thousands of tokens). File-based MCPs:
1. Call the API in TypeScript
2. Filter/transform in code
3. Return only what the model needs

## Structure

```
skills/<SkillName>/
├── src/
│   ├── Tools/
│   │   ├── <ActorName>.ts      # Direct API wrapper
│   │   └── <ActorName>.help.md # Usage reference
│   └── Workflows/
│       └── <Workflow>.md       # High-level workflows
```

## Key Principles

| Traditional MCP | File-Based MCP |
|-----------------|----------------|
| Returns raw JSON | Returns filtered summary |
| Model parses | Code parses |
| 1000s tokens | 10s tokens |
| Protocol overhead | Direct function call |

## Example Pattern

```typescript
// tools/InstagramProfile.ts
export async function scrapeInstagramProfile(username: string) {
  const raw = await apifyClient.run("apify/instagram-profile-scraper", { username });
  // Filter in code - only return what's useful
  return {
    username: raw.username,
    followers: raw.followersCount,
    bio: raw.biography,
    recentPosts: raw.latestPosts.slice(0, 5).map(p => ({ caption: p.caption, likes: p.likesCount }))
  };
}
```

## Benefits

1. **Token efficiency** - 95-99% reduction
2. **Type safety** - TypeScript interfaces
3. **Composability** - Chain multiple actors
4. **Error handling** - Native try/catch
5. **Caching** - In-memory or disk

## Related

- `CliFirstArchitecture.md` — CLI-first architecture for file-based tools
- `Tools.md` — General tools reference
