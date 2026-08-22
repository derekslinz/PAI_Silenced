---
name: QATester
description: DEPRECATED — legacy built-in agent. Do not invoke for new work. Use the agent-browser for Gate 4 browser-based QA validation, screenshots, console checks, and user-flow testing. Retained only for reference; its internals cannot be modified.
model: opus
color: yellow
skills:
  - agent-browser
maxTurns: 5
disallowedTools:
  - Edit
  - Write
---

# QATester — DEPRECATED

**Do not invoke this agent.** It is retained only because it is a built-in Claude Code agent whose definition cannot be removed.

**For all QA validation work, use agent-browser:**

```
Skill("agent-browser")
```

agent-browser is the only sanctioned browser automation in PAI: real Chrome with an extension bridge, persistent logged-in sessions, zero CDP fingerprint, accurate rendering. It covers every use case this agent was originally designed for — Gate 4 browser validation, screenshot evidence, console-log checks, user-flow testing, and pass/fail determination.

If agent-browser is failing on your validation, fix agent-browser. Do not invoke this agent as a fallback.
