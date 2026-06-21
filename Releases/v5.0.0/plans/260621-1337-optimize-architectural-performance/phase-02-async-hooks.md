# Phase 2: Asynchronous Hooks and Daemon Refactoring

## Context Links
- [observability.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/PULSE/Observability/observability.ts)
- [user-index.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/PULSE/modules/user-index.ts)
- [RestoreContext.hook.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/hooks/RestoreContext.hook.ts)

## Overview
- **Priority**: Medium-High
- **Current Status**: Complete
- **Description**: Transition blocking sync I/O in the hooks pipeline and Pulse daemon modules to asynchronous I/O (`fs.promises` or Bun's native `Bun.file()`).
- **Goal**: Prevent the single-threaded event loop in the Pulse daemon from stalling during HTTP queries or concurrent hook executions.

## Key Insights
- Subprocess hooks are executed sequentially by Claude Code, but the Pulse daemon runs a single process. Sync reads in `observability.ts` (e.g. `readJsonlTail`, reading `settings.json`, directory scanning) block the HTTP server loop.
- Bun's `Bun.file(path).json()` and `Bun.file(path).text()` are fully async, native, and extremely fast.

## Requirements
- Replace `fs.readFileSync` with `fs.promises.readFile` or `Bun.file().text()` in daemon modules.
- Ensure error handling is robust (using try-catch blocks) to avoid crashing the daemon on missing files.

## Architecture
- In `observability.ts` and `user-index.ts`, refactor synchronous file utility functions (`readJsonlTail`, `safeRead`, etc.) to return `Promise` and use async file/directory reads.
- Update route handlers to be `async` and `await` the file operations.

## Related Code Files
- `.claude/PAI/PULSE/Observability/observability.ts`
- `.claude/PAI/PULSE/modules/user-index.ts`
- `.claude/hooks/RestoreContext.hook.ts`
- `.claude/hooks/lib/identity.ts`

## Implementation Steps
1. Refactor file helper functions in `observability.ts` to use async `Bun.file` APIs.
2. Update the API route handlers in `observability.ts` to be async.
3. Apply similar async file reads in `user-index.ts`.
4. Update `RestoreContext.hook.ts` to use async operations.

## Todo List
- [ ] Refactor `observability.ts` sync functions to async.
- [ ] Refactor `user-index.ts` sync functions to async.
- [ ] Verify that HTTP routes return identical payloads.

## Success Criteria
- The Pulse daemon does not block during disk-heavy queries.
- Dashboard queries compile and serve quickly without blocking concurrent hook notifications.

## Risk Assessment
- Introducing unhandled promise rejections if error catches are missing. Fixed by using safe wraps and standard defaults (`[]` or `{}`) in `catch` blocks.

## Next Steps
- Proceed to Phase 3.
