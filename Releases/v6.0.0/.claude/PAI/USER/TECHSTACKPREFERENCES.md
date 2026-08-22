# Tech Stack Preferences

> Languages, tools, and conventions you prefer — the assistant uses these when suggesting or writing code.

## Languages

- **Primary:** TypeScript
- **Runtime:** bun (never npm/npx)
- **Allowed:** 
- **Avoid:** 

## CLI Tools

Three layers — pick the right one for the context:

- **In-tool (Claude tool calls):** Built-in `Grep` (ripgrep-backed), `Glob`, `Read`. Faster than shelling out; no subprocess.
- **In Bash (terminal / one-shot pipelines):** `rg` over `grep`, `fd` over `find`, `bat` over `cat`, `eza` over `ls`.
- **In portable skill code (ships to other users):** prefer language-native fs APIs (Bun `fs`, Node `fs/promises`); if shelling out, prefer `find` — `fd` is not guaranteed installed.
- **Preferred shell:** 

## Conventions

- **Paths:** Use `$HOME`, `${PAI_DIR}`, relative paths — never hardcode user paths
- **Comments:** Minimal — code should explain itself via naming
- **Error handling:** Explicit. Never silently swallow errors.
- **Config:** 

---
*These preferences shape every code suggestion, refactor, and tool selection. The assistant consults this file before invoking any code-writing capability.*
