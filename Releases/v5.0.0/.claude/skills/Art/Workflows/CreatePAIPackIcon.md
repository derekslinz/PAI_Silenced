PAI Pack Icon Workflow

Generate xtransparent PNG icons for PAI packs.
---

Purpose

Create consistent, professional icons for PAI packs following the established visual identity.

Use for:New pack icons, icon refreshes, icon regeneration.

---

Visual Specifications

Required Specs

| Spec | Value |
|------|-------|
| Dimensions| xpixels |
| Format| PNG with transparency |
| Background| ACTUAL transparent (not checkerboard) |
| Primary Color| Electric blue ad|
| Accent Color| Purple bcf(-% max) |
| Style| Simple, flat, readable at x|

Color Palette

```
Background:     Transparent (actual transparency, not pattern)
Primary:        Electric Blue ad(dominant color)
Accent:         Purple bcf(sparingly, -% of design)
Optional Dark:  Dark aaf (for contrast elements if needed)
```

Design Rules

. Simple geometry- Icon must be readable at xpixels
. Conceptual- Represent the pack's core function visually
. Consistent style- Match existing PAI pack icons
. No text- Icons should work without labels
. Centered- Icon should be centered in the xcanvas

---

Workflow Steps

Step : Understand Pack Purpose

Before generating, understand:
- What does this pack do?
- What visual metaphor represents it?
- How should it relate to other pack icons?

Good icon concepts:- `pai-hook-system` → Hook shape, event trigger
- `pai-core-install` → Download/install arrow
- `pai-skill-system` → Brain/routing/capability
- `pai-agent-system` → Robot/assistant figure
- `pai-voice-system` → Sound wave/speaker

Step : Construct Prompt

Build a prompt that specifies:
. The visual concept
. The style (simple flat icon)
. The color palette
. The size requirements

Prompt template:```
[VISUAL CONCEPT representing {pack function}], simple flat icon design, xpixels.
COLOR PALETTE: Primary electric blue (ad), Accent purple (bcf) sparingly.
STYLE: Modern flat icon, simple enough to read at x, no text, centered.
BACKGROUND: Dark (aaf) - will be removed for transparency.
```

Step : Generate Icon

Command:```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[YOUR_PROMPT]" \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output ${PROJECTS_DIR}/PAI/Packs/icons/[PACK_NAME].png
```

Flags explained:- `--model nano-banana-pro` - Best quality for icons
- `--size K` - Small file, fast generation
- `--aspect-ratio :` - Square for icons
- `--remove-bg` - Creates actual transparency

Step : Verify Output

Check the generated icon:
```bash
Verify file exists and size
ls -la ${PROJECTS_DIR}/PAI/Packs/icons/[PACK_NAME].png

Check dimensions (requires imagemagick)
file ${PROJECTS_DIR}/PAI/Packs/icons/[PACK_NAME].png
```

Verification checklist:- [ ] File exists at correct location
- [ ] PNG format
- [ ] Approximately xdimensions
- [ ] Has transparency (no solid background)
- [ ] Uses blue/purple palette
- [ ] Readable at small size

---

Examples

Example : Hook System Pack

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "A stylized hook or fishing hook shape representing event hooks in software, simple flat icon design, xpixels. COLOR PALETTE: Primary electric blue (ad), Accent purple (bcf) sparingly. STYLE: Modern flat icon, simple enough to read at x, no text, centered. BACKGROUND: Dark (aaf)." \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output ${PROJECTS_DIR}/PAI/Packs/icons/pai-hook-system.png
```

Example : Core Install Pack

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "A download arrow pointing into a foundation/base structure representing core installation, simple flat icon design, xpixels. COLOR PALETTE: Primary electric blue (ad), Accent purple (bcf) sparingly. STYLE: Modern flat icon, simple enough to read at x, no text, centered. BACKGROUND: Dark (aaf)." \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output ${PROJECTS_DIR}/PAI/Packs/icons/pai-core-install.png
```

Example : Memory System Pack

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "A brain with memory/data flowing in and out representing an AI memory system, simple flat icon design, xpixels. COLOR PALETTE: Primary electric blue (ad), Accent purple (bcf) sparingly. STYLE: Modern flat icon, simple enough to read at x, no text, centered. BACKGROUND: Dark (aaf)." \
  --size K \
  --aspect-ratio :\
  --remove-bg \
  --output ${PROJECTS_DIR}/PAI/Packs/icons/pai-memory-system.png
```

---

Output Location

All PAI pack icons go to:
```
${PROJECTS_DIR}/PAI/Packs/icons/[PACK_NAME].png
```

Naming convention:Match the pack directory name exactly.
- Pack: `Packs/pai-hook-system/`
- Icon: `Packs/icons/pai-hook-system.png`

---

Regeneration

If an icon needs to be regenerated:

. Delete the old icon
. Run the generate command with updated prompt
. Verify the new icon
. Update README if icon changed significantly

---

Validation Checklist

Before marking icon complete:

- [ ] Existsat `${PROJECTS_DIR}/PAI/Packs/icons/[PACK_NAME].png`
- [ ] Formatis PNG with transparency
- [ ] Sizeapproximately x- [ ] Colorsuse blue primary, purple accent
- [ ] Readableat xsize
- [ ] Conceptual- represents pack function
- [ ] Consistent- matches other PAI icons in style

---

Related Workflows

- `~/.claude/skills/_PAI/Workflows/CreateRelease.md` - Release workflow (may include icon generation)

Note: Previously referenced CreatePack.md, ValidatePack.md, and PAIIntegrityCheck.md have been removed.
---

Last Updated:--