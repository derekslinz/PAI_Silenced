Create <brand> wallpaper

Generate branded wallpapers with embedded logo concepts for Kitty terminal and macOS desktop.
---

Creates K :wallpapersthat integrate <brand> logos as organic design elements — emblazoned, embossed, or woven into the composition.

---

Purpose

Generate cohesive wallpapers that:
- Match the existing <brand> wallpaper aesthetic (dark tech, circuits, geometric patterns)
- Embed logo shapes/concepts as integral design elements (not just overlaid)
- Work for both Kitty terminal backgrounds (with .tint) and macOS desktop
- Maintain the blue/purple/teal color palette

---

Prerequisites

Logos Directory:`~/Projects/Logos/`
Place logo files (PNG, SVG) here. The workflow will use these as reference for shape/concept integration.

Wallpaper Output:`~/Projects/Wallpaper/`
Generated wallpapers are saved here and immediately available via `k -w <name>`.

Reference Wallpapers:`~/Projects/Wallpaper/`
Existing wallpapers to match aesthetic:
- `blue-lines.png` - Abstract flowing lines
- `blue-purple-circuits.png` - Circuit board pattern
- `blue-purple-squares.png` - Geometric squares
- `circuit-board.png` - Dense circuit traces

---

Workflow Steps

Step : Gather Input

Required from user:. Logo selection— Which logo from `~/Projects/Logos/` to embed
. Style direction— Circuit, geometric, abstract, flowing, etc.
. Integration style— How logo appears:
   - Emblazoned— Logo shape as glowing focal point
   - Embossed— Logo as subtle raised/pressed texture
   - Woven— Logo dissolved into pattern (circuits flow through it)
   - Negative space— Logo revealed by absence of pattern
. Output name— Filename for the wallpaper (kebab-case, no extension)

If no specific direction given:- Default to "woven" integration (most subtle)
- Match closest existing wallpaper style
- Use primary <brand> logo if available

Step : Analyze Logo

Read the selected logo file to understand:
- Primary shapes and forms
- Key geometric elements
- Aspect ratio and proportions

```bash
List available logos
ls ~/Projects/Logos/

View selected logo
open ~/Projects/Logos/<logo-name>.png
```

Step : Load Reference Wallpaper

View an existing wallpaper to match the aesthetic:

```bash
open ~/Projects/Wallpaper/blue-purple-circuits.png
```

Key aesthetic elements to maintain:- Dark background (aaf to aae)
- Blue (ad), Purple (bcf), Teal (bd) accents
- Tech/digital feel (circuits, data streams, geometric patterns)
- Depth through blur and glow effects
- High contrast accent lines/nodes

Step : Construct Prompt

Base prompt template:
```
Dark tech wallpaper for terminal/desktop, :K resolution.

BACKGROUND: Deep dark blue-black gradient (aaf to aae)

INTEGRATION: [LOGO_NAME] logo shape [INTEGRATION_STYLE]:
- [Describe how logo integrates with the pattern]
- [Logo should feel organic to the design, not overlaid]
- [Shape emerges from or defines the pattern flow]

PATTERN STYLE: [STYLE_DIRECTION]
- [Specific pattern elements matching style]
- [How pattern interacts with logo shape]

COLOR PALETTE:
- Primary: Electric blue (ad) — main circuit lines/elements
- Secondary: Deep purple (bcf) — accent glows, key nodes
- Tertiary: Cyan/teal (bd) — highlights, energy points
- Background: Near-black with subtle blue undertone

EFFECTS:
- Subtle depth of field (sharper center, soft edges)
- Glow effects on key nodes and accent points
- Fine detail in circuit traces/patterns
- Atmospheric haze in corners

CRITICAL:
- Logo shape is INTEGRAL to design, not overlaid
- Must work as terminal background with % dark tint overlay
- No text, no watermarks
- High contrast details for visibility through tint
- Professional, sophisticated tech aesthetic
```

Step : Generate Wallpaper

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[CONSTRUCTED_PROMPT]" \
  --size K \
  --aspect-ratio :\
  --reference-image ~/Projects/Logos/<selected-logo>.png \
  --output ~/Projects/Wallpaper/<output-name>.png
```

Parameters:- `--size K` — Maximum resolution
- `--aspect-ratio :` — Standard widescreen
- `--reference-image` — Logo file for shape guidance

Step : Preview and Validate

Open the generated wallpaper:```bash
open ~/Projects/Wallpaper/<output-name>.png
```

Validation checklist:- [ ] Logo shape is recognizable but integrated (not pasted on)
- [ ] Color palette matches <brand> aesthetic (blue/purple/teal on dark)
- [ ] Pattern has enough contrast to show through Kitty tint
- [ ] No artifacts, text, or watermarks
- [ ] Professional quality suitable for desktop/terminal

If validation fails:- Adjust prompt specificity for logo integration
- Try different integration style
- Regenerate with refined prompt

Step : Apply Wallpaper

Once validated, apply immediately:

```bash
k -w <output-name>
```

This sets both Kitty terminal and macOS desktop backgrounds.

---

Integration Styles Reference

Emblazoned
Logo as the glowing focal point— circuits/patterns radiate outward from it.
```
Logo shape as central glowing element, circuit traces emanating outward from its edges,
energy nodes at key logo vertices, pattern density increases near logo
```

Embossed
Logo as subtle texture— raised or pressed into the pattern layer.
```
Logo shape visible as subtle raised/depressed region in the pattern,
same color palette but slightly different luminosity, discoverable not obvious
```

Woven
Logo shape defines pattern flow— elements flow through/around it.
```
Circuit traces and geometric elements flow through and around logo shape,
logo boundary influences pattern direction, shape emerges from negative space
```

Negative Space
Logo revealed by absence— pattern stops at logo boundaries.
```
Dense pattern everywhere except logo shape, logo appears as void/window,
subtle glow at logo edges where pattern meets empty space
```

---

Style Directions Reference

Circuit
Dense circuit board traces, nodes, and connection points.
```
PCB-style traces with right-angle turns, solder points as nodes,
varying trace widths, layer depth with traces at different z-levels
```

Geometric
Abstract geometric shapes, grids, and mathematical patterns.
```
Interlocking geometric shapes, hexagonal grids, triangular tessellation,
isometric depth, clean edges with subtle glow
```

Flowing
Organic flowing lines, data streams, particle flows.
```
Smooth curved lines suggesting data flow, particle streams,
gradient intensity along flow direction, organic movement feel
```

Abstract
Non-representational artistic interpretation.
```
Abstract color fields, gradient washes, subtle texture,
artistic interpretation of tech aesthetic, minimal but sophisticated
```

---

Example Prompts

Example : <brand> logo Woven into Circuits
```
Dark tech wallpaper for terminal/desktop, :K resolution.

BACKGROUND: Deep dark blue-black gradient (aaf to aae)

INTEGRATION: <brand> logo shape woven into circuit pattern:
- Circuit traces flow through and around the logo silhouette
- Logo boundary subtly influences trace direction
- Shape emerges naturally from the pattern density changes
- Not overlaid — the pattern DEFINES the logo through flow

PATTERN STYLE: Dense circuit board
- Fine PCB-style traces with right-angle routing
- Glowing nodes at trace intersections
- Multiple depth layers (foreground sharp, background soft)
- Trace density varies to create visual interest

COLOR PALETTE:
- Primary: Electric blue (ad) — main traces
- Secondary: Deep purple (bcf) — key nodes, logo edge glow
- Tertiary: Cyan (bd) — energy highlights
- Background: Near-black (aaf)

EFFECTS:
- Depth of field blur at edges
- Subtle purple glow where logo shape meets pattern
- Fine detail in traces (visible at K)
- Atmospheric corner vignette

CRITICAL: Logo integrated into design, not overlaid. Must show through % dark tint.
```

Example : Logo Emblazoned in Geometric Field
```
Dark tech wallpaper for terminal/desktop, :K resolution.

BACKGROUND: Deep space gradient (aaf to aae)

INTEGRATION: <brand> logo as central emblazoned element:
- Logo shape glows at center with purple (bcf) core
- Geometric patterns radiate outward from logo edges
- Energy lines connect logo vertices to outer pattern
- Logo is the source/origin of all pattern elements

PATTERN STYLE: Geometric hexagonal grid
- Hexagonal tessellation extending from logo
- Grid density increases toward edges
- Subtle isometric depth
- Clean geometric precision

COLOR PALETTE:
- Primary: Electric blue (ad) — grid lines
- Secondary: Deep purple (bcf) — logo glow, accent nodes
- Tertiary: Cyan (bd) — energy connections
- Background: Near-black with blue undertone

EFFECTS:
- Central glow around logo
- Sharp center, soft edges
- Subtle particle effects
- Corner vignette

CRITICAL: Logo as design origin point, not pasted overlay. High contrast for tint visibility.
```

---

Quick Reference

| Parameter | Value |
|-----------|-------|
| Model | nano-banana-pro |
| Size | K |
| Aspect Ratio | :|
| Output Directory | ~/Projects/Wallpaper/ |
| Logo Source | ~/Projects/Logos/ |
| Apply Command | `k -w <name>` |

Color Palette:- Background: aaf to aae
- Blue: ad- Purple: bcf- Teal/Cyan: bd
Integration Styles:Emblazoned, Embossed, Woven, Negative Space

Pattern Styles:Circuit, Geometric, Flowing, Abstract
