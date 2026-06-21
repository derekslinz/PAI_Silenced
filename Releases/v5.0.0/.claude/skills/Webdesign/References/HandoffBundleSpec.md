Handoff Bundle Specification

Reference for the structure and semantics of a Claude Design → Claude Code handoff bundle.

Bundle Layout

```
<bundle-root>/
 PROMPT.md                    REQUIRED. Structured brief for the frontend-design plugin.
 tokens.json                  REQUIRED. Design tokens in JSON.
 preview.html                 REQUIRED. Static preview render.
 README.md                    RECOMMENDED. Bundle metadata.
 manifest.json                RECOMMENDED. Framework + version metadata.
 components/                  OPTIONAL. Component scaffolds.
    <component>.{tsx,jsx,vue,astro,html}
 pages/                       OPTIONAL. Page scaffolds (multi-page bundles).
    <route>.{tsx,jsx,vue,astro,html}
 assets/                      OPTIONAL. Binary assets.
    images/
    fonts/
    icons/
    logos/
 integration/                 OPTIONAL. Framework-specific config.
     tailwind.config.ts
     astro.config.mjs
     ...
```

File Semantics

PROMPT.md

Frontmatter + structured markdown body. This is the primary contract between Claude Design and the code consumer.

```markdown
---
generated_by: claude-design
generated_at: --T::Z
claude_design_session: <uuid>
framework: astro
design_system: <name-or-default>
handoff_type: full | partial | token-only
---

Project Purpose

One paragraph describing what this interface is for.

Audience

Who uses this, primary jobs-to-be-done.

Aesthetic Direction

The chosen aesthetic (brutalist, editorial, retro-futuristic, etc.) with rationale.

Framework Target

The target framework and any version constraints. Existing project path if integrating.

Sections

For a page:
- Section : purpose + key elements
- Section : purpose + key elements
- ...

For a component:
- Purpose
- Props / variants
- States (default / hover / focus / active / disabled)

Component Inventory

List of components this bundle scaffolds or references.

Integration Notes

Specific instructions for the code consumer. Token overrides, expected imports, responsive breakpoints, ay requirements, dark-mode behavior.

Must-Preserve

Any copy, structure, or elements that MUST land verbatim in the final code.

Must-NOT

Anti-requirements. Patterns or elements explicitly forbidden.
```

tokens.json

Design tokens in a framework-agnostic JSON schema. Consumers translate to their format.

```json
{
  "$schema": "https://claude.ai/design/tokens.schema.json",
  "version": "",
  "metadata": {
    "name": "<design-system-name>",
    "source": "claude-design",
    "generated_at": "ISO"
  },
  "color": {
    "primary": { "": "ffff", "": "eae", "": "cae" },
    "neutral": { "": "ffffff", "": "fafafa", "": "fff", "": "", "": "" },
    "accent": { "": "feb" },
    "semantic": {
      "success": "b",
      "warning": "feb",
      "error": "ef",
      "info": "bf"
    }
  },
  "typography": {
    "display": {
      "family": "Fraunces",
      "weights": [, , ],
      "scale": { "sm": , "md": , "lg": , "xl": , "xl": }
    },
    "body": {
      "family": "Inter Tight",
      "weights": [, , ],
      "scale": { "xs": , "sm": , "md": , "lg": , "xl": },
      "lineHeight": { "tight": ., "normal": ., "loose": .}
    },
    "mono": {
      "family": "JetBrains Mono",
      "weights": [, ],
      "scale": { "sm": , "md": , "lg": }
    }
  },
  "spacing": {
    "unit": ,
    "scale": [, , , , , , , , , , , , , ]
  },
  "radius": { "none": , "sm": , "md": , "lg": , "xl": , "full": },
  "shadow": {
    "sm": "px px rgba(,,,.)",
    "md": "px px rgba(,,,.)",
    "lg": "px px rgba(,,,.)"
  },
  "motion": {
    "duration": { "fast": , "normal": , "slow": },
    "easing": {
      "standard": "cubic-bezier(., , ., )",
      "enter": "cubic-bezier(, , ., )",
      "exit": "cubic-bezier(., , , )"
    }
  }
}
```

preview.html

A single-file static render that approximates the final design. Useful for:
- Visual diff against generated code
- Fallback when framework translation fails
- Email attachment for stakeholder review

NOT suitable as production code — it is not responsive beyond what Claude Design could inline, and it has no framework integration.

manifest.json

```json
{
  "$schema": "https://claude.ai/design/manifest.schema.json",
  "version": "",
  "framework": {
    "name": "astro",
    "version_constraint": ">=.."
  },
  "required_packages": {
    "tailwindcss": ">=..",
    "@tailwindcss/typography": ">=.."
  },
  "components_count": ,
  "pages_count": ,
  "assets_total_bytes": ,
  "design_system_ref": "<name-or-inline>",
  "claude_design_url": "https://claude.ai/design/<session-id>"
}
```

Framework-Specific Scaffolds

Claude Design emits framework-specific files depending on the `framework` field:

| Framework | Primary files | Config |
|-----------|--------------|--------|
| astro| `pages/.astro`, `components/.astro`, `layouts/.astro` | `astro.config.mjs`, `tailwind.config.ts` |
| next| `app//page.tsx`, `components/.tsx` | `next.config.js`, `tailwind.config.ts` |
| react-vite| `src/components/.tsx`, `src/App.tsx` | `vite.config.ts`, `tailwind.config.ts` |
| vue| `src/components/.vue`, `src/App.vue` | `vite.config.ts`, `tailwind.config.ts` |
| vitepress| `.vitepress/theme/components/.vue`, `.vitepress/theme/index.ts` | `.vitepress/config.ts` |
| vanilla| `index.html`, `styles.css`, `script.js` | none |

Bundle Validation

Before feeding a bundle to Claude Code, validate structure:

```bash
bun ~/.claude/skills/Webdesign/Tools/ProcessHandoffBundle.ts <bundle-dir>
```

The tool checks:
- `PROMPT.md` exists and has required frontmatter
- `tokens.json` parses and matches schema
- `preview.html` exists
- Framework-claimed files exist (if manifest.json present)
- Assets referenced in components exist in `assets/`
- No secrets or API keys in any text file

Consuming a Bundle

Two paths:

Path A — Full code generation (ExportToCode workflow)

Feed the bundle to Claude Code. The `frontend-design` plugin auto-activates, reads PROMPT.md, applies tokens.json, and produces production code.

Path B — Integration into existing app (IntegrateIntoApp workflow)

Translate the bundle against the target app's conventions. Produces a diff instead of new files. Reuses existing tokens where possible, flags conflicts explicitly.

Versioning

The bundle schema is versioned. The current version is ``. Future versions will be backward-compatible or gated by the `version` field in `manifest.json` and `tokens.json`.
