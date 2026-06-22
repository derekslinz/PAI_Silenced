# Phase 1: Shared Config Caching

## Context Links
- [identity.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/hooks/lib/identity.ts)
- [pulse.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/PULSE/pulse.ts)

## Overview
- **Priority**: High
- **Current Status**: Complete
- **Description**: Avoid redundant parsing of `settings.json` on every hook execution by establishing a fast caching system. Since hooks run as separate processes, they cannot share in-memory cache directly. We will introduce a lightweight pre-parsed Cache file containing only the needed identity parameters, managed and written by the Pulse daemon and read by the hooks.

## Key Insights
- Parsing a 51 KB `settings.json` on every hook execution takes unnecessary CPU cycles.
- The cache file `~/.claude/settings.identity.cache.json` can be kept updated by the Pulse daemon (by watching `settings.json`) or written on daemon start and settings update.
- Reading a 1 KB file of pre-extracted JSON fields is significantly faster.

## Requirements
- Maintain complete compatibility with `getIdentity`, `getPrincipal`, `getObservabilityConfig`, and `getSettings`.
- Do not block startup of hooks if the cache file doesn't exist (fall back to reading `settings.json`).

## Architecture
- Pulse daemon watches `settings.json` using `fs.watch`. On change/start, it parses `settings.json`, extracts `daidentity`, `principal`, and `observability`, and writes it to `~/.claude/settings.identity.cache.json`.
- `identity.ts` checks if `~/.claude/settings.identity.cache.json` exists. If so, it reads it; otherwise, it falls back to `settings.json`.

## Related Code Files
- `.claude/hooks/lib/identity.ts`
- `.claude/PAI/PULSE/pulse.ts`

## Implementation Steps
1. Add `writeIdentityCache` logic in `pulse.ts` on start and on watching `settings.json`.
2. Modify `identity.ts` to check and read `~/.claude/settings.identity.cache.json` if available.
3. Validate that identity information matches settings.

## Todo List
- [ ] Add cache generation to Pulse daemon.
- [ ] Add cache loading to `identity.ts`.
- [ ] Verify correctness.

## Success Criteria
- Hook execution is faster and configuration reading is optimized.
- Identity retrieval matches `settings.json` exactly.

## Risk Assessment
- Cache drift if `settings.json` is modified and the daemon isn't running. Resolved by falling back to `settings.json` modified time check or direct fallback if cache is older or missing.

## Security Considerations
- The cache file contains personal identity data (names), which must remain inside the `config-secrets` containment zone. `settings.identity.cache.json` will be saved under `~/.claude/` which is contained.

## Next Steps
- Proceed to Phase 2.
