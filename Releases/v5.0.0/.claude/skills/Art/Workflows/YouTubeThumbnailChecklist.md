YouTube Thumbnail Generation Checklists

Two-phase validation: Before generation and after generation
---

PRE-GENERATION CHECKLIST

Complete this BEFORE running any generation commands. If ANY item fails, STOP and fix it.
Phase : Reference Analysis

```
 Opened BOTH example thumbnails AND SPECIFICATIONS.md
 Viewing example thumbnail in Preview/Finder at % size
 Identified which example thumbnail most closely matches this use case
 Screenshot or note exact colors from example using Digital Color Meter
 Measured text positions in example using ruler/measurement tool
 Identified exact font weight in example (not just family)
 Noted border thickness and color from example
 Checked logo size and exact position in example
```

Phase : Content Preparation

```
 Determined thumbnail type (Main/Audio/Sponsored)
 Extracted title text from content (-words max)
 Identified content mood/tone for headshot selection
 Selected specific headshot file from HeadshotExamples/ OR
 Planned to generate NEW headshot using Headshot skill
 Determined if background art exists OR needs generation
 If generating art: wrote specific dark-palette prompt
```

Phase : Font Verification

```
 Ran: magick -list font | grep -i [font-name]
 Confirmed exact font name available in ImageMagick
 Confirmed font weights available (Bold, ExtraBold, Medium)
 If fonts missing: installed required fonts first
 Test rendered sample text to verify font appearance
```

Phase : Specification Confirmation

Check each specification against example:
```
 Canvas size: xconfirmed
 Background color: [HEX] confirmed from example
 Border color: [HEX] confirmed from example
 Border thickness: [N]px confirmed from example
 Corner radius: [N]px confirmed from example
 Logo position: [X]px from right, [Y]px from top confirmed
 Logo size: [W]x[H]px confirmed
 Line position: [Y]px from top confirmed
 Line size: [N]px confirmed
 Line color: [HEX] confirmed
 Line position: [Y]px from top confirmed
 Line size: [N]px confirmed
 Line color: [HEX] confirmed
 Line position: [Y]px from top confirmed
 Line size: [N]px confirmed
 Line color: [HEX] confirmed
 Line position: [Y]px from top confirmed
 Line size: [N]px confirmed
 Line color: [HEX] confirmed
 Headshot width: ~[N]% of canvas confirmed
 Headshot height: ~[N]% of canvas confirmed
 Headshot position: [X]px from edge confirmed
 Art opacity: [N]% confirmed from example
```

Phase : Asset Generation Plan

For Background Art:```
 Art type determined (diagram/code/generated)
 If generated: prompt includes "dark navy background A"
 If generated: prompt includes "deep purple AC accents"
 If generated: prompt explicitly states "NO light backgrounds, NO beige"
 If generated: prompt specifies "left-weighted composition"
 Generation command ready with correct parameters
```

For Headshot:```
 If using existing: confirmed exact file path
 If using existing: confirmed headshot matches content mood
 If generating new: Headshot skill will be used (NOT nano-banana-pro)
 If generating new: reference photo identified for likeness
 If generating new: expression/mood specified in prompt
```

Phase : Command Validation

Before running ImageMagick command:```
 All file paths confirmed to exist
 All hex colors confirmed from example (not from memory)
 All font names confirmed available in ImageMagick
 All pixel positions confirmed from measurement
 All sizes confirmed from measurement
 Kerning/letter-spacing values match example
 Layer order correct (background → art → headshot → text → border → logo)
 Output path is ~/Downloads/
 Output filename includes timestamp
```

---

POST-GENERATION VALIDATION CHECKLIST

Complete this AFTER generating thumbnail. If ANY item fails, regenerate with corrections.
Phase : File Validation

```
 File exists at specified path
 File size is reasonable (not corrupted)
 File opens in Preview/Finder
 Resolution is EXACTLY xpixels
 File format is PNG
```

Phase : Side-by-Side Visual Comparison

Open example thumbnail AND your generated thumbnail side-by-side in Finder
```
 Opened example thumbnail: [filename]
 Opened generated thumbnail: [filename]
 Viewing both at same zoom level (%)
 Can see both simultaneously
```

Phase : Border & Canvas Validation

Compare border pixel-by-pixel:```
 Border color matches example EXACTLY (use Digital Color Meter)
 Border thickness matches example EXACTLY
 Corner radius matches example EXACTLY
 Border is consistent on all four sides
 No anti-aliasing artifacts or jagged edges
```

Compare background:```
 Background color matches example EXACTLY
 No visible gradient unless example has gradient
 Background fills entire canvas
```

Phase : Logo Validation

```
 Logo is present
 Logo matches example style (TI: mark, not UL logo)
 Logo size matches example (measure in pixels)
 Logo position matches example (measure from edges)
 Logo color correct for thumbnail type
```

Phase : Typography Validation

For each text line, validate against example:
Line :```
 Font family matches example (geometric sans, not Helvetica)
 Font weight matches example (Bold )
 Font size matches example (±px tolerance)
 Text color matches example EXACTLY
 Letter spacing matches example
 Position from top matches example (±px tolerance)
 Position from left matches example (±px tolerance)
 Text transform matches (UPPERCASE vs Title Case)
```

Line :```
 Font family matches example
 Font weight matches example (Extra Bold )
 Font size matches example (±px tolerance)
 Text color matches example EXACTLY
 Letter spacing matches example
 Position from top matches example (±px tolerance)
 Position from left matches example (±px tolerance)
 Text transform matches
```

Line :```
 Font family matches example
 Font weight matches example (Bold )
 Font size matches example (±px tolerance)
 Text color matches example EXACTLY
 Letter spacing matches example
 Position from top matches example (±px tolerance)
 Position from left matches example (±px tolerance)
 Text transform matches
```

Line :```
 Font family matches example
 Font weight matches example (Medium )
 Font size matches example (±px tolerance)
 Text color matches example EXACTLY
 Letter spacing matches example
 Position from top matches example (±px tolerance)
 Position from left matches example (±px tolerance)
 Text transform matches
```

Phase : Headshot Validation

```
 Headshot is present
 Headshot is NEW/CUSTOM (not reused from previous thumbnails) OR
 Headshot is appropriate existing photo from HeadshotExamples/
 Headshot matches content mood/tone
 Headshot size matches example proportion (~-% width)
 Headshot position matches example (right side)
 Headshot vertical alignment matches example
 Background removed cleanly (no artifacts)
 Lighting quality matches example
 No blur or quality degradation
```

Phase : Background Art Validation

```
 Background art is present
 Background art is NEW/CUSTOM (not reused) OR
 Background art is appropriate existing asset
 Art uses dark color palette (no light backgrounds)
 Art opacity allows text to be readable
 Art positioned correctly (left/center)
 Art doesn't compete with text or headshot
 Art blends naturally with background
 Art coverage matches example proportion
```

Phase : Composition Validation

Overall layout check:```
 Text block occupies left ~% of frame (matches example)
 Headshot occupies right ~% of frame (matches example)
 White space and breathing room matches example
 No elements are crowded or overlapping incorrectly
 Visual hierarchy matches example (what draws eye first)
 Balance between text/art/headshot matches example
```

Phase : Color Accuracy Validation

Use Digital Color Meter to sample colors from both images:
```
 Background: Generated [HEX] vs Example [HEX] - MATCH
 Border: Generated [HEX] vs Example [HEX] - MATCH
 Line text: Generated [HEX] vs Example [HEX] - MATCH
 Line text: Generated [HEX] vs Example [HEX] - MATCH
 Line text: Generated [HEX] vs Example [HEX] - MATCH
 Line text: Generated [HEX] vs Example [HEX] - MATCH
 Logo: Generated [HEX] vs Example [HEX] - MATCH
```

Phase : Readability Validation

Test thumbnail at YouTube display sizes:
```
 Created small preview: magick [file] -resize x[preview-file]
 Opened small preview (simulates YouTube sidebar)
 Main title is readable at small size
 Headshot is recognizable at small size
 Overall composition is clear at small size
 Colors have sufficient contrast at small size
```

Phase : Professional Quality Validation

```
 No pixelation or compression artifacts
 Text is sharp and crisp
 Headshot is high quality
 Colors are vibrant but not oversaturated
 Professional polish matches example quality
 No amateur mistakes (wrong fonts, bad spacing, etc.)
 Would be acceptable for public YouTube upload
```

---

VALIDATION DECISION TREE

```
ALL POST-GENERATION CHECKS PASSED?
    ↓ YES → Thumbnail is complete
    ↓ NO  → Continue below

WHICH PHASE FAILED?
    ↓
     Phase (Border/Canvas) → Fix border/background, regenerate
     Phase (Logo) → Fix logo size/position/style, regenerate
     Phase (Typography) → Fix fonts/sizes/positions, regenerate
     Phase (Headshot) → Generate new headshot, recompose
     Phase (Background Art) → Generate new art, recompose
     Phase (Composition) → Adjust layout, regenerate
     Phase (Colors) → Fix hex values, regenerate
     Phase (Readability) → Increase font size, simplify, regenerate

AFTER FIX → RERUN ENTIRE POST-GENERATION CHECKLIST
```

---

CRITICAL FAILURE MODES TO AVOID

These are the most common ways thumbnails fail. Check these TWICE:
. Wrong Font Family   - Using Helvetica instead of Inter/Montserrat
   - Using system serif instead of Playfair Display (Audio)
   - Confirm font name with: `magick -list font | grep [name]`

. Wrong Font Weight   - Using Bold () when should be Extra Bold ()
   - Using Regular when should be Bold
   - Check example closely for weight

. Wrong Border Color   - Using bf(too bright) instead of AD   - Using FFat % (neon) instead of subtle green
   - Use Digital Color Meter to sample exact hex from example

. Wrong Canvas Size   - Using xinstead of x   - Confirm with: `magick identify [file]`

. Reused Headshot   - Using same headshot from previous thumbnail
   - Not generating custom headshot for this specific thumbnail
   - Generate NEW headshot OR select appropriate existing photo

. Reused Background Art   - Using same art from previous thumbnail
   - Generic art that doesn't match topic
   - Generate NEW art specific to this thumbnail's topic

. Light Background Art   - Art with beige/cream/light colors
   - Art that doesn't blend with dark navy background
   - Explicitly specify dark palette in generation prompt

. Wrong Text Positioning   - Text too high (not enough top padding)
   - Text too cramped (insufficient line spacing)
   - Measure exact Y positions from example

. Wrong Logo   - Using UL logo instead of TI: mark
   - Wrong logo size or position
   - Check example for exact logo style and placement

. Insufficient Validation    - Calling thumbnail "done" without side-by-side comparison
    - Not checking at small size
    - Complete ENTIRE post-generation checklist

---

MANDATORY WORKFLOW

```
BEFORE GENERATION:
    Complete Pre-Generation Checklist → All boxes checked → Proceed

DURING GENERATION:
    Generate Background Art (if needed) → Validate art before continuing
    Generate Headshot (if needed) → Validate headshot before continuing
    Compose Thumbnail → Use exact specifications

AFTER GENERATION:
    Complete Post-Generation Checklist → All boxes checked → Done
    If any checks fail → Identify issue → Fix → Regenerate → Revalidate
```

---

NO THUMBNAIL IS COMPLETE UNTIL EVERY CHECKLIST ITEM PASSES.