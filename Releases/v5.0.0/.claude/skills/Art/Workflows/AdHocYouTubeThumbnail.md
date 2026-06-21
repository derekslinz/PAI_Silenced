Ad-hoc YouTube Thumbnail Workflow

Generate complete YouTube thumbnails from content input with dramatic tech backgrounds and AI-generated headshots.

---

Explicit Criteria

. Dynamic Headshot - FACE ONLY
- Fresh AI-generatedeach time using Nano Banana Pro with reference images
- Reference image is used for likeness, NOT the actual headshot
- Position is dynamic: left, center, or right (based on content/preference)
- FACE ONLY: Forehead to chin, ear to ear - NO shoulders, NO neck, NO body- Face fills % of the image area (ComposeThumbnail auto-crops)
- Transparent background: Must run RemoveBg after generation
- MUST VARYbetween thumbnails (see Variation Requirements below)

. Dramatic Tech Background
- Style: Futuristic, sci-fi aesthetic (hexagonal circuits, glowing edges, D depth)
- Colors: Dark with cyan/blue/purple neon accents (Tokyo Night palette)
- No text, no peoplein the background - pure abstract tech art
- Examples: Blade Runner, Tron, circuit board patterns with glow

. Text - BILLBOARD STYLE
- Title: Up to words, CAPITALIZED, CYANby default (vibrant, not white)
- Subtitle: Up to words, CAPITALIZED, white text
- TEXT FILLS THE SPACE- takes up most of available area opposite headshot
- BOLD STROKE OUTLINE(px title, px subtitle) - visible at px thumbnail size
- Visually centeredin safe zone (NEVER overlaps headshot)
- Grouped as a unit- title and subtitle together as text block

. Colored Border
- Tokyo Night purple(bbaf) default
- px widtharound entire thumbnail
- Creates professional framing

---

Output Specifications

| Element | Value |
|---------|-------|
| Canvas | xpx |
| Border | pxbbaf(Tokyo Night purple) |
| Headshot | FACE ONLY(~px height), auto-cropped (no shoulders/body) |
| Title | ptHelvetica-Bold, pxblack stroke outline |
| Subtitle | ptHelvetica-Bold, pxblack stroke outline |
| Title color | CYAN (dcfff) by default- NEVER plain white |
| Subtitle color | White (FFFFFF) for contrast |
| Text position | FILLSsafe zone opposite headshot (NEVER overlaps) |
| Background | Dramatic futuristic tech art |
| Fresh headshot | MANDATORY- generate new WITH VARIATION each time |
| xtest | MANDATORY- must be readable at YouTube grid size |

Text Color Presets (--title-color, --subtitle-color)

| Name | Hex | Use |
|------|-----|-----|
| cyan | dcfff | DEFAULT- Tech, futuristic |
| white | FFFFFF | High contrast (subtitle default) |
| purple | bbaf| Matches border |
| blue | aaf| Professional |
| magenta | ffc | Bold, attention |
| yellow | eaf| Warning, highlight |
| green | ecea | Success, growth |
| orange | ffe| Energy, urgency |
| red | fe | Alert, danger |

---

Step : Content Analysis

Extract title and subtitle from input content.
Input Types
- Script or article text
- URL (fetch and analyze)
- Topic description
- Video outline

Extraction Prompt

```
Analyze this content and extract:

. TITLE (max words): The attention-grabbing hook
. SUBTITLE (max words): The value promise or context

Guidelines:
- Use power words: "SECRET", "HIDDEN", "REAL", "TRUTH", "WHY", "HOW"
- Create curiosity gaps
- Be specific over generic
- Make a bold claim or promise

Content: [INPUT]
```

---

Step : Background Generation

Generate dramatic futuristic tech background.
Background Prompt Template

```
Dramatic futuristic technology background. Dark hexagonal circuit board pattern
with glowing cyan/blue neon edge lighting. D depth perspective. Metallic dark
grey hexagons with embedded circuit patterns. Glowing cyan (dcfff) and purple
(bbaf) edge highlights. Deep shadows, high contrast. Sci-fi aesthetic like
Blade Runner or Tron. Abstract technology, no text, no people. Dark moody
atmosphere with electric blue glow accents.

Topic context: [EXTRACTED TOPIC]
```

Generate Command

```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model nano-banana-pro \
  --prompt "[BACKGROUND PROMPT]" \
  --size K \
  --aspect-ratio :\
  --output ~/Downloads/yt-bg-$(date +%Y%m%d-%H%M%S).png
```

---

Step : Headshot Generation

MANDATORY: Generate a FRESH, VARIED, FACE-ONLY headshot EVERY time.
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
️  FACE ONLY: Forehead to chin, ear to ear                        ️
️  NO shoulders, NO neck, NO body visible                         ️
️  If shoulders/body visible → REGENERATE IMMEDIATELY             ️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Headshot Variation Requirements

For each thumbnail, RANDOMLY select ONE from each category:
Angle:- Straight-on, looking directly at camera
- Slight /turn, face angled degrees to the right
- Head tilted slightly to the right

Expression:- Confident, authoritative
- Contemplative, thoughtful intensity
- Focused, direct engagement

Lighting:- Soft diffused key light
- Dramatic side lighting with shadow
- Rembrandt lighting pattern

Base Headshot Requirements (always include)
- FACE ONLY- forehead to chin, ear to ear
- NO shoulders, NO neck, NO body- face fills entire frame
- Pure black background (for easy removal)
- Full beard along jawline, NO mustache (clean-shaven upper lip)
- Face fills % of image area

Example FACE-ONLY Prompts

Variation A (confident, straight-on):```
Extreme close-up of the subject's FACE ONLY. Frame shows forehead to chin, ear to ear.
Absolutely NO shoulders, NO neck, NO body visible. Face fills entire image.
Confident, authoritative expression - NOT smiling. Looking directly at camera.
Pure black background. Full beard along jawline with clean-shaven upper lip.
Soft diffused key lighting. Ultra-tight crop on face only.
```

Variation B (contemplative, /angle):```
Extreme close-up of the subject's FACE ONLY. Frame shows forehead to chin, ear to ear.
Absolutely NO shoulders, NO neck, NO body visible. Face fills entire image.
Contemplative, thoughtful expression with subtle intensity - NOT smiling.
Face turned degrees to the right, slight /angle.
Pure black background. Full beard along jawline with clean-shaven upper lip.
Dramatic side lighting creating depth. Ultra-tight crop on face only.
```

Variation C (focused, head tilt):```
Extreme close-up of the subject's FACE ONLY. Frame shows forehead to chin, ear to ear.
Absolutely NO shoulders, NO neck, NO body visible. Face fills entire image.
Focused, direct engagement expression - NOT smiling. Head tilted slightly.
Pure black background. Full beard along jawline with clean-shaven upper lip.
Rembrandt lighting pattern. Looking at camera. Ultra-tight crop on face only.
```

Generate Command

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

bun ~/.claude/skills/<your-headshot-skill>/Tools/Headshot.ts \
  --prompt "[FACE-ONLY HEADSHOT PROMPT]" \
  --reference ~/.claude/skills/<your-headshot-skill>/Examples/reference.png \
  --reference ~/.claude/skills/<your-headshot-skill>/Examples/studio-style.png \
  --reference ~/.claude/skills/<your-headshot-skill>/Examples/clean-smile.png \
  --size K \
  --aspect-ratio :\
  --output ~/Downloads/yt-headshot-${TIMESTAMP}.png
```

Note:Using :aspect ratio forces tighter face crop. ComposeThumbnail will also auto-crop to remove any remaining body.

Remove Background

```bash
bun ~/.claude/PAI/TOOLS/RemoveBg.ts ~/Downloads/yt-headshot-${TIMESTAMP}.png
```

---

Step : Composition

Composite all elements using ComposeThumbnail tool.
Compose Command

```bash
bun ~/.claude/skills/Art/Tools/ComposeThumbnail.ts \
  --background ~/Downloads/yt-bg-${TIMESTAMP}.png \
  --headshot ~/Downloads/yt-headshot-${TIMESTAMP}.png \
  --title "[TITLE]" \
  --subtitle "[SUBTITLE]" \
  --title-color [cyan|purple|magenta|white|etc] \
  --position [left|center|right] \
  --output ~/Downloads/yt-thumbnail-${TIMESTAMP}.png
```

Position Logic
- left: Headshot on left, text centered on right half
- center: Headshot centered, title at top, subtitle at bottom
- right: Headshot on right, text centered on left half

Text Positioning (automatic)
- For left/right: Text block (title + subtitle) centered vertically in opposite half
- For center: Title at top edge, subtitle at bottom edge
- Text uses black stroke outline for readability (no black boxes)

---

Step : Quality Validation

MANDATORY: ALL checks must pass before presenting to the user.
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
️  THE xTEST IS MANDATORY                                  ️
️  If text isn't readable at thumbnail size → FAIL                ️
️  If it looks like ass at any size → FAIL                        ️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Quality Gates (ALL MUST PASS)

| | Check | Pass Criteria |
|---|-------|---------------|
| | Dimensions | Exactly x|
| | FACE-ONLY headshot| NO shoulders, NO neck, NO body visible |
| | Face fills frame | Face is %+ of headshot area |
| | Text fills space | Title is large, bold, FILLS the text zone |
| | Text color | CYAN or vibrant- NOT plain white |
| | Stroke visible | px title / px subtitle - visible at px |
| | No overlap | Text entirely in its safe zone |
| | Variation | Visibly different from previous generation |
| | xreadability| Text readable at YouTube grid size|
| | Overall | Professional, billboard-quality appearance |

Validation Commands

```bash
. Verify dimensions
magick identify -format "%wx%h" ~/Downloads/yt-thumbnail-${TIMESTAMP}.png
Expected: x
. Open for visual inspection at full size
open ~/Downloads/yt-thumbnail-${TIMESTAMP}.png
Confirm: Face only (no body), text fills space, cyan color visible

. MANDATORY: Test at YouTube thumbnail size
magick ~/Downloads/yt-thumbnail-${TIMESTAMP}.png -resize x/tmp/yt-preview.png
open /tmp/yt-preview.png
Confirm: Title READABLE, face RECOGNIZABLE, colors POP
If you can't read the title at x→ FAIL
```

Failure Response

If ANY check fails:. DO NOT present to the user. Identify the specific failure
. Fix the issue:
   - Body visible → Regenerate headshot with FACE-ONLY prompt
   - Text too small → Already fixed (pt/pt)
   - Text not visible at x→ Check color/stroke
   - Text overlapping → Check positioning
. Re-run composition
. Re-verify ALL checks including xtest
. Only present when ALL checks pass
Quality Standards
- Thumbnail is a BILLBOARD- text must dominate, face must dominate
- DO NOT present output that looks broken, garbled, or unprofessional- Iterate until it matches ALL criteria- If it looks like ass, fix it before showing the user- The xtest is the ultimate validation- that's what YouTube shows

---

Quick Reference

Tokyo Night Colors
```
Purple (border):  bbafCyan (accents):   dcfff
Blue (accents):   aafDark base:        ab```

Workflow Summary
```
. ANALYZE content → Extract TITLE + SUBTITLE
. GENERATE background → Dramatic tech art (Nano Banana Pro)
. GENERATE headshot → FACE-ONLY (:aspect), WITH VARIATION + RemoveBg
. COMPOSE → ComposeThumbnail.ts (auto-crops body, cyan text, pt title)
. VALIDATE → ALL gates including xreadability test
```

Philosophy
The thumbnail is a BILLBOARD, not a document.- FACE dominates one side
- TEXT FILLS the other side
- Must be readable at x- Every generation is visibly different

Output Location
All outputs: `~/Downloads/yt-thumbnail-{timestamp}.png`
