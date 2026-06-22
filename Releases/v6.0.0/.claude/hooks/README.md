# PAI Hook System

> **Lifecycle event handlers that extend Claude Code with memory and security.**

This document is the authoritative reference for PAI's hook system. When modifying any hook, update both the hook's inline documentation AND this README.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Hook Lifecycle Events](#hook-lifecycle-events)
3. [Hook Registry](#hook-registry)
4. [Inter-Hook Dependencies](#inter-hook-dependencies)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Shared Libraries](#shared-libraries)
7. [Configuration](#configuration)
8. [Documentation Standards](#documentation-standards)
9. [Maintenance Checklist](#maintenance-checklist)

---

## Architecture Overview

Hooks are TypeScript scripts that execute at specific lifecycle events in Claude Code. They enable:

- **Memory Capture**: Session summaries, work tracking, learnings
- **Security Validation**: Command filtering, path protection, prompt injection defense
- **Context Injection**: Identity, preferences, format specifications

### Design Principles

1. **Non-blocking by default**: Hooks should not delay the user experience
2. **Fail gracefully**: Errors in one hook must not crash the session
3. **Single responsibility**: Each hook does one thing well
4. **Shared utilities over duplication**: Use `hooks/lib/hook-io.ts` for stdin reading

### Execution Model

```

                        Claude Code Session                          

                                                                     
  SessionStart  LoadContext (dynamic context injection)         
                  KVSync (push work.json to CF KV)              
                                                                     
  UserPromptSubmit  PromptGuard (PromptInspector — no LLM)     
                      RepeatDetection                            
                      PromptProcessing (rating + tab + name)    
                      SatisfactionCapture                        
                                                                     
  PreToolUse  SecurityPipeline (Bash/Edit/Write/MultiEdit/Read) 
                Context Reduction (Bash → compressed commands)   
                AgentGuard (Pulse HTTP: localhost:31337)          
                SkillGuard (Pulse HTTP: localhost:31337)          
                                                                     
  PostToolUse  ContentScanner (injection detection)            
                 TelosSummarySync (Write/Edit)                   
                 ISASync (ISA → work.json + KV sync) [Write/Edit]
                 ToolActivityTracker (global)                    
                                                                     
  PermissionRequest  SmartApprover (trusted/read=approve)         
                                                                     
  PostToolUseFailure  ToolFailureTracker (error logging)          
                                                                     
  Stop  LastResponseCache (cache response for ratings)         
          DocIntegrity (cross-refs + arch summary regen)        
                                                                     
  SubagentStop  (none)                                           
                                                                     
  SessionEnd  WorkCompletionLearning (insight extraction)      
                SessionCleanup (work completion + state clear)   
                RelationshipMemory (relationship notes)          
                UpdateCounts (system counts + usage cache)       
                IntegrityCheck (PAI + doc drift detection)       
                KVSync (push work.json to CF KV)                
                                                                     

```

---

## Hook Lifecycle Events

| Event | When It Fires | Typical Use Cases |
|-------|---------------|-------------------|
| `SessionStart` | Session begins | Context loading, banner display, CLAUDE.md build |
| `UserPromptSubmit` | User sends a message | Sentiment analysis, tab title, session naming |
| `PreToolUse` | Before a tool executes | Security validation, context reduction, UI state |
| `PostToolUse` | After a tool executes | ISA sync, tab state reset |
| `PostToolUseFailure` | Tool execution fails | Error tracking, debugging observability |
| `Stop` | Claude responds | Tab updates, doc integrity |
| `SubagentStart` | Subagent spawned | Agent start tracking, timing |
| `SubagentStop` | Subagent finishes | Duration calculation, hung agent detection |
| `TeammateIdle` | Teammate goes idle | Idle event logging |
| `ConfigChange` | Settings modified | Security audit trail |
| `SessionEnd` | Session terminates | Summary, learning, counts, integrity checks |

### Event Payload Structure

All hooks receive JSON via stdin with event-specific fields:

```typescript
// Common fields
interface BasePayload {
  session_id: string;
  transcript_path: string;
  hook_event_name: string;
}

// UserPromptSubmit
interface UserPromptPayload extends BasePayload {
  prompt: string;
}

// PreToolUse
interface PreToolUsePayload extends BasePayload {
  tool_name: string;
  tool_input: Record<string, any>;
}

// Stop
interface StopPayload extends BasePayload {
  stop_hook_active: boolean;
}
```

---

## Hook Registry

### SessionStart Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `LoadContext.hook.ts` | Inject dynamic context (relationship, learning, work) | Yes (stdout) | `settings.json`, `MEMORY/` |
| `KVSync.hook.ts` | Push work.json to Cloudflare KV | No (async) | `CLOUDFLARE_API_TOKEN_WORKERS_EDIT` or `CLOUDFLARE_API_TOKEN` in `~/.claude/.env` |

### UserPromptSubmit Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `PromptGuard.hook.ts` | Security: PromptInspector (injection/exfil/evasion, no LLM) | Yes | `hooks/security/inspectors/` |
| `RepeatDetection.hook.ts` | Detect repeated asks / repeat-request complaints | Yes | None |
| `PromptProcessing.hook.ts` | Unified: rating + tab title + session name + mode + tier | No (async) | Inference API, `ratings.jsonl`, `session-names.json` |
| `SatisfactionCapture.hook.ts` | User satisfaction signal capture | No (async) | `MEMORY/OBSERVABILITY/` |

### PreToolUse Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `SecurityPipeline.hook.ts` | Inspector pipeline: Pattern(100) → Egress(90) → Rules(50) | Yes (decision) | `patterns.yaml`, `SECURITY_RULES.md`, `MEMORY/SECURITY/` |
| `ContextReduction.hook.sh` | Context reduction — compresses Bash command output via RTK | Yes (updatedInput) | `rtk` binary, `jq` |
| *(Pulse HTTP route)* skill-guard | Prevent erroneous skill invocations — `localhost:31337/hooks/skill-guard` | Yes (decision) | Pulse server |
| *(Pulse HTTP route)* agent-guard | Guard agent spawning — `localhost:31337/hooks/agent-guard` | Yes (decision) | Pulse server |

> **Note:** agent-guard and skill-guard run as Pulse HTTP routes at `localhost:31337`. They are not files on disk — they run as routes within the Pulse server.

### PostToolUse Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `ContentScanner.hook.ts` | Prompt injection detection in tool output (WebFetch/WebSearch + global) | No | `hooks/security/inspectors/` |
| `TelosSummarySync.hook.ts` | Regenerate PRINCIPAL_TELOS.md when TELOS files modified (Write/Edit) | No | `MEMORY/WORK/`, `TOOLS/GenerateTelosSummary.ts` |
| `ISASync.hook.ts` | Sync ISA frontmatter → work.json + KV push (Write/Edit) | No | `MEMORY/WORK/`, `work.json`, `CLOUDFLARE_API_TOKEN_WORKERS_EDIT` or `CLOUDFLARE_API_TOKEN` in `~/.claude/.env` |
| `ToolActivityTracker.hook.ts` | Per-tool event log to `MEMORY/OBSERVABILITY/` (global) | No | `MEMORY/OBSERVABILITY/` |

### PostToolUseFailure Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `ToolFailureTracker.hook.ts` | Log tool failures for debugging observability | No | `MEMORY/OBSERVABILITY/` |

### Stop Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `LastResponseCache.hook.ts` | Cache last response for PromptProcessing bridge | No | None |
| `DocIntegrity.hook.ts` | Cross-ref + semantic drift checks + arch summary regen | No | Inference API |

### SubagentStop Hooks

SubagentStop has no active hooks wired.

### SessionEnd Hooks

| Hook | Purpose | Blocking | Dependencies |
|------|---------|----------|--------------|
| `WorkCompletionLearning.hook.ts` | Extract learnings from work | No | Inference API, `MEMORY/LEARNING/` |
| `SessionCleanup.hook.ts` | Mark work complete + clear state | No | `MEMORY/WORK/`, `current-work.json` |
| `RelationshipMemory.hook.ts` | Capture relationship notes | No | `MEMORY/RELATIONSHIP/` |
| `UpdateCounts.hook.ts` | Update system counts + usage cache | No | `settings.json`, Anthropic API |
| `IntegrityCheck.hook.ts` | PAI change detection + doc drift detection | No | `MEMORY/STATE/integrity-state.json`, handlers/ |
| `KVSync.hook.ts` | Push work.json to Cloudflare KV | No | `CLOUDFLARE_API_TOKEN_WORKERS_EDIT` or `CLOUDFLARE_API_TOKEN` in `~/.claude/.env` |

---

## Inter-Hook Dependencies

### Rating + Tab + Naming Flow (PromptProcessing)

```
User Message
    
    
PromptProcessing  explicit rating "8 - great"?  write rating + exit
     (no explicit match)
     positive praise "great job"?  write rating 8 + exit
     (no fast path)
    
     Set purple/thinking tab title (deterministic)
     Deterministic session name (first prompt only)
    
    
    Single Sonnet inference → rating + tab title + session name + mode + tier
    
     Write rating → ratings.jsonl
     Set orange/working tab title
     Store session name → session-names.json
     Background Sonnet upgrade (first prompt only)
```

**Design**: Single consolidated hook. Fast paths checked first (no inference). Single Sonnet call returns five outputs (rating, tab title, session name, MODE, TIER). Background Sonnet upgrade for session name quality on first prompt only.

### Work Tracking Flow

```
SessionStart
    
    
Algorithm (AI)  Creates WORK/<slug>/ISA.md directly
                                              
                                              
                                   current-work.json (state)
                                              
                                              
SessionEnd  WorkCompletionLearning 
                                              
             SessionCleanup  Marks as COMPLETED
```

**Coordination**: `current-work.json` is the shared state file. The AI creates it during Algorithm execution, SessionCleanup clears it.

### Security Inspector Pipeline Flow

```
PreToolUse (Bash/Edit/Write/Read)
    
    
SecurityPipeline  InspectorPipeline
    
     PatternInspector (100)  patterns.yaml
     EgressInspector (90)  outbound monitoring
     RulesInspector (50)  DISABLED (empty SECURITY_RULES.md)
    
     allow  Tool executes
     require_approval  User prompted
     alert  Logged, tool executes
     deny  Hard block (exit 2)

PostToolUse  ContentScanner  InjectionInspector (WebFetch/WebSearch only)
PermissionRequest  SmartApprover  trusted/read=approve
UserPromptSubmit  PromptGuard  PromptInspector (95) heuristic-only

All events logged to: MEMORY/SECURITY/YYYY/MM/
```

### Tab State Flow

```
UserPromptSubmit
    
    
PromptProcessing
     Sets tab to PURPLE (#5B21B6)  " Processing..."
    
     Single Sonnet inference (sentiment + title + name + mode + tier)
    
     Sets tab to ORANGE (#B35A00)  " Fixing auth..."

Stop
    
    
Stop hooks:
     handlers/TabState.ts → DEFAULT (UL blue)
```

---

## Data Flow Diagrams

### Memory System Integration

```

                         MEMORY/                                  

    WORK/          LEARNING/        STATE/                      
                                                                
      
  Session       SIGNALS/       current-work.json          
  Directories   ratings.jsonl   trending-cache.json        
                               model-cache.txt            
      
                                                             

                                               
                                               

                        HOOKS                                     
                                                                  
  ISASync  work.json + KV     
  KVSync  KV (session sync) 
  PromptProcessing  ratings.jsonl      
  PromptProcessing  session-names.json 
  ToolFailureTracker  OBSERVABILITY/     
  ToolActivityTracker  OBSERVABILITY/     
  WorkCompletionLearning  LEARNING/          
  SessionCleanup  WORK/ + state      
                                                                  

```

---

## Shared Libraries

Located in `hooks/lib/`:

| Library | Purpose | Used By |
|---------|---------|---------|
| `identity.ts` | Get DA name, principal from settings | Most hooks |
| `time.ts` | PST timestamps, ISO formatting | Rating hooks, work hooks |
| `paths.ts` | Canonical path construction | Work hooks, security |
| `notifications.ts` | ntfy push notifications | SessionEnd hooks, StopNotify |
| `output-validators.ts` | Tab title output validation | PromptProcessing, TabState |
| `isa-utils.ts` | ISA/work.json manipulation | SessionAnalysis, ISASync, KVSync |
| `isa-template.ts` | ISA markdown template | Algorithm |
| `hook-io.ts` | Shared stdin reader + transcript parser | All Stop hooks |
| `learning-utils.ts` | Learning categorization | Rating hooks, WorkCompletion |
| `change-detection.ts` | Detect file/code changes | IntegrityCheck |
| `tab-constants.ts` | Tab title colors and states | tab-setter.ts |
| `tab-setter.ts` | Kitty tab title manipulation | Tab-related hooks |

---

## Configuration

Hooks are configured in `settings.json` under the `hooks` key:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "${PAI_DIR}/hooks/LoadContext.hook.ts" },
          { "type": "command", "command": "${PAI_DIR}/hooks/KVSync.hook.ts", "async": true }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "$HOME/.claude/hooks/SecurityPipeline.hook.ts" },
          { "type": "command", "command": "$HOME/.claude/hooks/ContextReduction.hook.sh" }
        ]
      }
    ]
  }
}
```

### Matcher Patterns

For `PreToolUse` hooks, matchers filter by tool name:

- `"Bash"` - Matches Bash tool calls
- `"Edit"` - Matches Edit tool calls
- `"Write"` - Matches Write tool calls
- `"Read"` - Matches Read tool calls
- `"AskUserQuestion"` - Matches question prompts

---

## Documentation Standards

### Hook File Structure

Every hook MUST follow this documentation structure:

```typescript
#!/usr/bin/env bun
/**
 * HookName.hook.ts - [Brief Description] ([Event Type])
 *
 * PURPOSE:
 * [2-3 sentences explaining what this hook does and why it exists]
 *
 * TRIGGER: [Event type, e.g., UserPromptSubmit]
 *
 * INPUT:
 * - [Field]: [Description]
 * - [Field]: [Description]
 *
 * OUTPUT:
 * - stdout: [What gets injected into context, if any]
 * - exit(0): [Normal completion]
 * - exit(2): [Hard block, for security hooks]
 *
 * SIDE EFFECTS:
 * - [File writes]
 * - [External calls]
 * - [State changes]
 *
 * INTER-HOOK RELATIONSHIPS:
 * - DEPENDS ON: [Other hooks this requires]
 * - COORDINATES WITH: [Hooks that share data/state]
 * - MUST RUN BEFORE: [Ordering constraints]
 * - MUST RUN AFTER: [Ordering constraints]
 *
 * ERROR HANDLING:
 * - [How errors are handled]
 * - [What happens on failure]
 *
 * PERFORMANCE:
 * - [Blocking vs async]
 * - [Typical execution time]
 * - [Resource usage notes]
 */

// Implementation follows...
```

### Inline Documentation

Functions should have JSDoc comments explaining:

- What the function does
- Parameters and return values
- Any side effects
- Error conditions

### Update Protocol

When modifying ANY hook:

1. Update the hook's header documentation
2. Update this README's Hook Registry section
3. Update Inter-Hook Dependencies if relationships change
4. Update Data Flow Diagrams if data paths change
5. Test the hook in isolation AND with related hooks

---

## Maintenance Checklist

Use this checklist when adding or modifying hooks:

### Adding a New Hook

- [ ] Create hook file with full documentation header
- [ ] Add to `settings.json` under appropriate event
- [ ] Add to Hook Registry table in this README
- [ ] Document inter-hook dependencies
- [ ] Update Data Flow Diagrams if needed
- [ ] Add to shared library imports if using lib/
- [ ] Test hook in isolation
- [ ] Test hook with related hooks
- [ ] Verify no performance regressions

### Modifying an Existing Hook

- [ ] Update inline documentation
- [ ] Update hook header if behavior changes
- [ ] Update this README if interface changes
- [ ] Update inter-hook docs if dependencies change
- [ ] Test modified hook
- [ ] Test hooks that depend on this hook
- [ ] Verify no performance regressions

### Removing a Hook

- [ ] Remove from `settings.json`
- [ ] Remove from Hook Registry in this README
- [ ] Update inter-hook dependencies
- [ ] Update Data Flow Diagrams
- [ ] Check for orphaned shared state files
- [ ] Delete hook file
- [ ] Test related hooks still function

---

## Troubleshooting

### Hook Not Executing

1. Verify hook is in `settings.json` under correct event
2. Check file is executable: `chmod +x hook.ts` (not needed when using `bun` prefix — all PAI hooks use `bun` prefix)
3. Check shebang: `#!/usr/bin/env bun`
4. Run manually: `echo '{"session_id":"test"}' | bun hooks/HookName.hook.ts`
5. For Pulse HTTP routes (AgentGuard, SkillGuard): verify Pulse is running at `localhost:31337/health`

### Hook Blocking Session

1. Check if hook writes to stdout (only LoadContext/FormatEnforcer should)
2. Verify timeouts are set for external calls
3. Check for infinite loops or blocking I/O

### Security Pipeline Issues

1. Check `patterns.yaml` for matching patterns
2. Check `SECURITY_RULES.md` for user-defined rules
3. Review `MEMORY/SECURITY/YYYY/MM/` for event logs
4. Test pipeline: `echo '{"session_id":"t","tool_name":"Bash","tool_input":{"command":"ls"}}' | bun hooks/SecurityPipeline.hook.ts`
5. Test content scan: `echo '{"session_id":"t","tool_name":"WebFetch","tool_input":{},"tool_result":"test content"}' | bun hooks/ContentScanner.hook.ts`

---

*Last updated: 2026-04-04*
*Events: 9 | Shared libs: 15 | Hook count: auto-computed by UpdateCounts.ts*
