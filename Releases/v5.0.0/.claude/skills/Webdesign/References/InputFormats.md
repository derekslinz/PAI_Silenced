Input Formats

How to prepare briefs, reference materials, and codebases so Claude Design produces the best output on the first pass.

The Ideal Brief

An effective Claude Design brief has five parts:

. Purpose— what the interface does, who uses it (sentence)
. Aesthetic direction— ONE committed choice from the catalog (brutally minimal, maximalist chaos, editorial, retro-futuristic, etc.)
. Constraints— framework, responsive tier, ay tier, dark-mode, specific elements required
. Differentiation— the one memorable detail that makes this not-generic
. Scope— sections, key components, must-haves / must-nots

Template

```
PURPOSE: A [thing] for [audience] that helps them [core job].

AESTHETIC: [one direction — brutalist / editorial / retro-futuristic / minimal / etc.]
Rationale: [why this fits the audience and job]

CONSTRAINTS:
- Framework: [next / astro / vitepress / react-vite / vanilla]
- Responsive: mobile-first, breakpoints at ///- Accessibility: WCAG .AA
- Dark mode: [yes / no / both]
- Typography: [pair or "your choice"]

DIFFERENTIATION: [the one memorable element]

SCOPE:
- Section : [purpose, key content]
- Section : [purpose, key content]
- Must-haves: [list]
- Must-NOTs: [list]
```

Aesthetic Catalog

Use these as starting points, not final prescriptions. Blending two is fine; picking three guarantees muddled output.

| Direction | Feels like | Works for |
|-----------|-----------|-----------|
| Brutally minimal| Raw, unstyled, type-led | Personal sites, essays, manifestos |
| Maximalist chaos| Layered, dense, texture-heavy | Music, fashion, indie games |
| Retro-futuristic| s-s computer-mag energy | Dev tools, infra companies |
| Editorial / magazine| Big photography, grid-breaking | Publications, longform content |
| Brutalist / raw| Concrete textures, stark lines | Indie software, art sites |
| Art deco / geometric| Symmetry, gold, ornamentation | Luxury, finance, legal |
| Soft / pastel| Rounded, warm, approachable | Wellness, health, kids |
| Industrial / utilitarian| Dense info, mono fonts, sharp | Dashboards, admin tools |
| Playful / toy-like| Cartoon, bouncy, vibrant | Consumer apps, games |
| Luxury / refined| Generous space, muted palette, serif | High-end brands, services |
| Editorial newspaper| Serif-led, columnar, dated | Journalism, thinkfluencer |
| Poster / swiss-modernist| Big type, grids, no ornament | Agencies, portfolios |

Avoid Generic Defaults

Claude Design (like any model) defaults to generic when the brief is vague. Explicit directions block:

- Inter / Roboto / Arial / system-ui-only
- Purple gradients on white
- Space Grotesk (overused)
- Identical card-grid layouts
- Timid, evenly-distributed color palettes

Request:

- Distinctive display + body font pair (name both)
- Dominant color + sharp accents (specify hex or named)
- Asymmetric or grid-breaking layout
- One orchestrated animation moment (not scattered micro-interactions)

Reference Images

Feeding -reference images dramatically lifts first-pass quality. Best practices:

- Mood over copy— reference the vibe, not the content. "This kind of gridded editorial feel" not "copy this site."
- Mix sources— one website screenshot + one poster + one architecture photo produces richer outputs than three website screenshots.
- Label each image— "ref--type.png is for typography; ref--color.png is for palette; ref--layout.png is for composition."
- Avoid AI-generated references— they amplify the generic. Use real human-designed sources.

Codebase Preparation (for design-system extraction)

Before feeding a codebase to `ExtractDesignSystem`:

. Curate— don't upload the whole repo. Pull -focused files.
. Include— `tailwind.config.`, `src/styles/`, `src/components/ui/`, primary layout components, `package.json`.
. Exclude— `node_modules/`, `dist/`, `build/`, `.next/`, `public/` (unless it has brand assets), test files.
. Include brand— logos (SVG preferred), custom font files, any brand guide PDF.
. Flag ambiguity— if the codebase has two incompatible button styles or three competing color palettes, tell Claude Design upfront ("the codebase is mid-migration; prefer the newer `.v.` files").

Prompt Length Sweet Spot

- Too short(<words) — generic output, defaults everywhere
- Sweet spot(-words) — directed output, most detail filled
- Too long(>words) — Claude Design starts ignoring parts of the brief

If a brief starts exceeding words, split into phases: first brief for prototype, follow-up refinements for details.

Iteration vs Restart

| Situation | What to do |
|-----------|-----------|
| Prototype is % right, small fixes needed | `RefinePrototype` with specific adjustments |
| Aesthetic is wrong | Restart with a sharper aesthetic direction |
| Structure is wrong (missing sections, wrong flow) | Restart with a fuller scope section in the brief |
| "Just not loving it" | Restart — the brief was underspecified; don't refine your way to the right answer |

Examples of Effective Briefs

Brief — Brutalist portfolio

> PURPOSE: A single-page portfolio for a print-focused graphic designer.
> AESTHETIC: Brutalist. Raw, unstyled, type-led. Think early Ray Gun magazine.
> CONSTRAINTS: Framework astro, mobile-first, ay AA, dark-only, serif display + mono body (no sans).
> DIFFERENTIATION: Oversized page number bleeding off the left edge of every section.
> SCOPE: Hero with name + date, work samples in irregular asymmetric grid, contact strip at bottom. No nav, no footer, no social icons.

Brief — Minimalist SaaS dashboard

> PURPOSE: An admin dashboard for content moderators on a social platform. They review -items per shift.
> AESTHETIC: Industrial minimal. Dense information, mono for data, sans for chrome.
> CONSTRAINTS: React+Vite+shadcn, desktop-first (+ primary), AA contrast, dark default with light toggle, IBM Plex Sans + Plex Mono.
> DIFFERENTIATION: A unified command palette (⌘K) that's visible on first load for seconds, then minimizes — guides users to the keyboard-first workflow.
> SCOPE: Item queue (list + detail split view), filters sidebar, action toolbar, keyboard shortcut legend. No marketing content, no avatars, no "welcome back" chrome.
