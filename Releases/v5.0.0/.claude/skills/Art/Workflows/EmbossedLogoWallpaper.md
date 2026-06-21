Embossed Logo Wallpaper

Generate sophisticated wallpapers with logo physically embossed into the design.
---

Creates wallpapers where the <brand> logo is integrated as an embossed texture within the visual content — not overlaid, not floating in empty space.

---

Purpose

Generate wallpapers that:
- Integrate the logo as a physical embossed element within the design
- Use the <brand> color palette (blue/purple/cyan only)
- Match sophisticated reference wallpapers in quality
- Position logo small in bottom left, surrounded by visual content

---

Prerequisites

Logo Source:`~/Projects/Logos/ul-blue.png`
Style References:`~/Projects/Wallpaper/` (blue-purple-circuits.png, circuit-board.png)
Output Directory:`~/Projects/Wallpaper/`

---

Critical Lessons Learned (Validation Checklist)

COMMON FAILURES TO AVOID

. Wrong Logo Treatment- Literal text of the brand name instead of the logo shape
- Logo overlaid/floating instead of embossed into surface
- Logo placed in empty/blank area instead of integrated into design
- Logo too large and prominent
- Logo glowing or different color than surroundings
- CORRECT: Logo shape from reference image, embossed as texture, small, within visual content

. Wrong Colors- Matrix green (ff)
- Pink/magenta neon
- Bright saturated neons
- Any colors outside the <brand> palette
- CORRECT: Blue (ador muted aaa), Purple (bcfor muted bc), Cyan (bdor muted aaa)

. Wrong Style- Simple, cartoony, flat vector art
- Too bright, loud, gaudy
- Clean lines without texture or depth
- CORRECT: Sophisticated, photorealistic or stylized with depth, muted/subdued, dense detail

. Wrong Composition- Logo in empty/blank corner
- Visual content clustered in center with empty edges
- Logo too prominent/centered
- CORRECT: Visual content fills entire canvas, logo small in bottom left WITHIN the design

. Missing Reference Images- Not using ul-blue.png as reference for logo shape
- Not checking existing wallpapers for quality benchmark
- CORRECT: Always use --reference-image with the logo file

---

Workflow Steps

Step : Gather Requirements

Ask about:
. Style direction— Photorealistic circuit, cyberpunk/hacker, abstract, etc.
. Tone— Bright and energetic OR muted and subdued
. Output name— Filename (kebab-case)

Step : Load References

```bash
Verify logo exists
ls ~/Projects/Logos/ul-blue.png

View style reference wallpapers
open ~/Projects/Wallpaper/circuit-board.png
open ~/Projects/Wallpaper/blue-purple-circuits.png
```

Study reference wallpapers for:- Level of visual sophistication and detail
- Color palette application
- Depth and atmospheric effects
- Texture and material quality

Step : Construct Prompt

Required prompt sections:
```
. AESTHETIC - Define the visual style (cyberpunk, circuit, etc.)

. VISUAL COMPLEXITY - Specify density, layers, detail level

. TONE - Muted/subdued OR bright (usually muted is better)

. COLOR PALETTE (STRICT):
   - Deep black base (aaf)
   - Blue (ador muted aaa)
   - Purple (bcfor muted bc)
   - Cyan (bdor muted aaa)
   - NO GREEN, NO PINK, NO OTHER COLORS

. LOGO INTEGRATION (CRITICAL):
   - Connected-nodes logo from reference
   - EMBOSSED into surface (raised/pressed texture)
   - Position: bottom left WITHIN the visual content
   - Size: -% of image width (SMALL)
   - Same materials/colors as surroundings
   - Slight luminosity difference only
   - NOT overlaid, NOT floating, NOT glowing
   - Must be surrounded by design elements

. COMPOSITION:
   - Visual content fills ENTIRE canvas
   - NO empty corners or blank areas
   - Logo area has visual content WITH logo embossed into it

. CRITICAL reminders:
   - Logo integrated INTO design
   - Logo SMALL and SUBTLE
   - Entire image has visual content
   - Correct color palette only
```

Step : Generate

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[CONSTRUCTED_PROMPT]" \
  --size K \
  --aspect-ratio :\
  --reference-image ~/Projects/Logos/ul-blue.png \
  --output ~/Projects/Wallpaper/<output-name>.png
```

Step : Validate (CRITICAL)

Open the generated image and check EVERY item:

```bash
open -a "Dia" ~/Projects/Wallpaper/<output-name>.png
```

Validation Checklist:
| Check | Pass/Fail |
|-------|-----------|
| Logo is the correct shape (connected nodes), not text | |
| Logo is EMBOSSED (texture), not overlaid or floating | |
| Logo is in bottom left corner | |
| Logo is SMALL (-% width) | |
| Logo is WITHIN visual content, not in empty space | |
| Logo is same color palette as surroundings | |
| Colors are ONLY blue/purple/cyan (no green, pink, etc.) | |
| Style is sophisticated, not cartoony or simple | |
| Tone matches request (muted if requested) | |
| Visual content fills entire canvas (no blank areas) | |
| Quality matches reference wallpapers | |
| Image dimensions are K+ (×or similar) | |

If ANY check fails → regenerate with adjusted prompt
Step : Iterate if Needed

Common fixes:
- Logo in wrong place → Emphasize "WITHIN the visual content" and "NO empty corners"
- Logo too big → Specify exact percentage "-% of image width"
- Wrong colors → List exact hex codes and explicitly say "NO GREEN, NO PINK"
- Too bright → Add "MUTED, SUBDUED, desaturated"
- Too simple → Describe sophistication level, reference existing wallpapers

Step : Save and Apply

```bash
Verify saved
ls -la ~/Projects/Wallpaper/<output-name>.png

Apply to Kitty + macOS
k -w <output-name>
```

---

Example Prompt (Muted Cyberpunk)

```
Cyberpunk hacker wallpaper, :K resolution. SUBDUED AND MUTED.

AESTHETIC:
- Dense layers of data streams and neural network architecture
- Sophisticated cyberpunk atmosphere - Ghost in the Shell / Lain
- Japanese anime styling - mature, serious, detailed

VISUAL COMPLEXITY:
- Thousands of tiny particles and data points
- Overlapping translucent layers of circuit geometry
- Dense but organized chaos throughout THE ENTIRE IMAGE
- Visual content should extend to ALL edges including bottom left
- NO empty or blank areas anywhere

TONE (SUBDUED AND HUMBLE):
- MUTED colors - desaturated, not neon bright
- DARK overall - near-black dominates
- Subtle glows instead of bright neon
- Quiet sophistication, not loud
- Moody and atmospheric

COLOR PALETTE (MUTED BRAND):
- Deep black void dominates (aaf)
- Desaturated blue (aaa) - muted
- Muted purple (bc) - subtle
- Soft cyan (aaa) - hints only

LOGO INTEGRATION (CRITICAL):
- The connected-nodes logo (from reference) must be EMBOSSED INTO the visual content
- Position: bottom left, but WITHIN the circuit/data design, not in empty space
- The logo should be part of the circuit architecture - traces flow through it
- SMALL - about -% of image width
- Same visual treatment as surrounding elements - muted, subtle
- Embossed texture - slight depth/luminosity difference only
- Should look like it was manufactured into the circuit board
- NOT floating in empty space - surrounded by and integrated with the design

COMPOSITION:
- Visual activity and detail must cover the ENTIRE canvas
- Bottom left corner has circuit detail WITH the logo embossed into it
- No blank corners or empty zones
- Uniform density of visual interest

CRITICAL:
- Logo MUST be integrated INTO the design, not placed in empty space
- Logo must be SMALL and SUBTLE
- Entire image should have visual content - no blank areas
- Subdued, muted, sophisticated
```

---

Quick Reference

| Parameter | Value |
|-----------|-------|
| Model | nano-banana-pro |
| Size | K |
| Aspect Ratio | :|
| Logo Reference | ~/Projects/Logos/ul-blue.png |
| Output Directory | ~/Projects/Wallpaper/ |
| Logo Size | -% of image width |
| Logo Position | Bottom left, WITHIN design |

Color Palette (Muted):- Black: aaf
- Blue: aaa
- Purple: bc- Cyan: aaa

Color Palette (Bright):- Black: aaf
- Blue: ad- Purple: bcf- Cyan: bd