# Phase 4: Server-Sent Events (SSE) Observability Dashboard

## Context Links
- [observability.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/PULSE/Observability/observability.ts)
- [usePAIEvents.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/PULSE/Observability/src/hooks/usePAIEvents.ts)

## Overview
- **Priority**: Medium
- **Current Status**: Complete
- **Description**: Replace the 3-second client polling interval in the Observability dashboard with a long-lived Server-Sent Events (SSE) connection `/api/events/stream` served by the Pulse daemon.

## Key Insights
- Constant polling of `/api/events/recent` triggers continuous disk reads of `.jsonl` files every 3 seconds even when the system is idle.
- Pushing updates via SSE only when files in `MEMORY/OBSERVABILITY` actually change reduces idle CPU/Disk overhead to zero.

## Requirements
- Stream endpoint: `GET /api/events/stream`.
- Stream must push the initial state immediately upon connection.
- File watcher must use `fs.watch` to detect writes/updates to `tool-failures.jsonl`, `tool-activity.jsonl`, and `subagent-events.jsonl` dynamically.
- Client must support graceful connection failure recovery (fall back to polling if SSE fails).

## Architecture
- **Server**:
  - Keep a `Set` of active connection controllers.
  - Set up a debounced `fs.watch` on the observability folder.
  - When triggered, compute the new recent events list and push `data: <JSON>\n\n` to all controllers.
  - Clean up client connections on disconnect.
- **Client**:
  - In `usePAIEvents.ts`, attempt `new EventSource("/api/events/stream")`.
  - Fall back to traditional 3-second polling if SSE is not supported or connection fails.

## Related Code Files
- `.claude/PAI/PULSE/Observability/observability.ts`
- `.claude/PAI/PULSE/Observability/src/hooks/usePAIEvents.ts`

## Implementation Steps
1. Add `/api/events/stream` handler in `observability.ts` returning a `ReadableStream`.
2. Implement file watching and push mechanism in `observability.ts`.
3. Modify `usePAIEvents.ts` to connect via `EventSource` with a fallback mechanism.
4. Run Next.js static build to compile the updated dashboard.

## Todo List
- [ ] Implement SSE endpoint in `observability.ts`.
- [ ] Implement file watcher and push notifications in Pulse.
- [ ] Implement EventSource client in `usePAIEvents.ts`.
- [ ] Build and verify Next.js dashboard app.

## Success Criteria
- Active dashboard connection maintains a single long-lived HTTP connection.
- Dashboard updates in real-time when new events are logged.
- Disk usage/polling drops to zero when PAI is idle.
