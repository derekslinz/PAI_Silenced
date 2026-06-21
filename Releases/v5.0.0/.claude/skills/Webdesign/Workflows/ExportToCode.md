ExportToCode

Claude Design handoff bundle → production code via the `frontend-design` plugin.

Trigger Phrases

"export to code", "ship to code", "send to Claude Code", "process handoff bundle", "turn this into a component"

Inputs

Required — one of:
- Active Claude Design sessionwith a prototype ready to export
- Existing handoff bundle— a directory previously exported from Claude Design

Optional:
- Framework target— overrides the bundle's default framework
- Output directory— where the generated code should land

Workflow

. Export from Claude Design (if not already done)

```bash
OUT=~/Downloads/webdesign/export/$(date +%Y%m%d-%H%M%S)
mkdir -p "$OUT"

bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts export bundle "$OUT/bundle"
```

The `bundle` format produces a directory containing:
- `PROMPT.md` — a structured handoff brief written by Claude Design
- `tokens.json` — design tokens (colors, typography, spacing)
- `components/` — component scaffolds (if applicable)
- `assets/` — images, fonts, icons
- `preview.html` — static reference render

. Parse the Bundle

```bash
bun ~/.claude/skills/Webdesign/Tools/ProcessHandoffBundle.ts "$OUT/bundle" > "$OUT/bundle.json"
bun ~/.claude/skills/Webdesign/Tools/ProcessHandoffBundle.ts "$OUT/bundle" --brief > "$OUT/integration-brief.md"
```

The `--brief` flag emits a markdown summary ready to feed into the next agent (the `frontend-design` plugin).

. Hand Off to the `frontend-design` Plugin

The Anthropic `frontend-design` plugin auto-activates in Claude Code whenever a frontend build request arrives. Feed it the bundle + brief:

> "Build the frontend from this handoff bundle: $OUT/bundle. Follow the integration brief at $OUT/integration-brief.md. Target framework: $FRAMEWORK. Place output in $OUT/code/."

The plugin does the actual code generation — bold aesthetic, distinctive typography, cohesive palette, production-grade — using the tokens and prompt the bundle carries.

. Verify the Generated Code

```bash
Start a local preview (depends on framework)
cd "$OUT/code"
bun install
bun dev &
DEV_PID=$!
sleep 
Screenshot the running app
bun ~/.claude/skills/Webdesign/Tools/VerifyDesign.ts http://localhost:"$OUT/verify"

kill $DEV_PID
```

Compare `$OUT/verify/screenshot.png` against `$OUT/bundle/preview.html` — fidelity should be within visual tolerance. Flag any regressions.

. Accessibility Check

```bash
bun ~/.claude/skills/Webdesign/Tools/VerifyDesign.ts --ay http://localhost:"$OUT/ay"
```

Any critical or serious ay violations block shipping. Fix in code before proceeding.

. Handoff to Next Step

- Integrating into an existing app→ `Workflows/IntegrateIntoApp.md` with `$OUT/code` as source
- Deploying standalone→ `Workflows/DeployDesign.md` with `$OUT/code` as source

Framework-Specific Notes

| Framework | Bundle produces | Typical adjustments |
|-----------|----------------|---------------------|
| React + Vite| `src/` with components, `tailwind.config.ts`, `package.json` | Add routing, state mgmt if needed |
| Next.js| `app/` with pages, layouts, server components | Wire data-fetching, auth |
| Astro| `src/pages/`, `src/components/` with Astro + React islands | Set integrations in `astro.config.mjs` |
| VitePress| `.vitepress/theme/` overrides + custom layout components | Limited — static content only |
| Vue| `src/components/` Vue composition API | Add Pinia/router if needed |
| Vanilla HTML| single `index.html` + `styles.css` + `script.js` | Easiest to drop into static hosts |

Common Pitfalls

- Skipping `ProcessHandoffBundle`— reading the raw bundle into the frontend-design plugin works but loses the structured brief. Always generate the brief first.
- Framework mismatch— if the bundle was exported for React and you feed it to an Astro project, results drift. Re-export with the right framework or use `IntegrateIntoApp` for translation.
- Trusting preview.html as production— `preview.html` is a static one-off render. It is NOT production code. Always run the actual framework build.
- No verification— exported code that "should work" often has subtle issues (missing deps, broken imports, ay regressions). Verify before handing downstream.

Time Estimate

-minutes for bundle parse + plugin handoff. Add -minutes for verification and ay pass.
