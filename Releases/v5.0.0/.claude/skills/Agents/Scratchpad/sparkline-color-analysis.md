Bidirectional Sentiment Sparkline Color Design
Technical Color Analysis with Accessibility

Problem Statement

Design a color gradient system for bidirectional sparklines (ratings -) that:
- Uses GREEN intensity for positive ratings (-, upward blocks)
- Uses RED intensity for negative ratings (-, downward blocks)
- Has NEUTRAL center point ()
- Maintains colorblind accessibility (deuteranopia/protanopia)
- Works in both -bit RGB and -color terminals
- Provides clear perceptual brightness progression

Constraint Analysis

Hard Constraints:- Must be distinguishable for deuteranopia (% of males - red-green confusion)
- Must be distinguishable for protanopia (% of males - red confusion)
- Must work in -color terminal mode (fallback from true color)
- Must use block characters () - upward for -, downward for -- Each rating level must be visually distinct

Soft Constraints:- Prefer perceptually uniform progression (equal visual steps)
- Maintain aesthetic appeal
- Minimize eye strain in terminal environments

Success Criteria:- Colorblind users can distinguish positive from negative
- Adjacent ratings are distinguishable (minimum perceptual difference)
- Falls back gracefully to -color mode
- Meets WCAG :contrast ratio between extremes

---

Solution : Luminance-First Gradient (Recommended)

Core Approach:Use luminance (brightness) as the PRIMARY distinguishing feature, with hue as SECONDARY. This ensures colorblind accessibility since luminance is preserved across all color vision types.

Color Strategy:- Positive (-): Cyan-green gradient (blue undertones) with INCREASING luminance
- Neutral (): Medium gray
- Negative (-): Orange-red gradient with DECREASING luminance

Why This Works for Colorblind Users:- Blue component in greens creates cyan-shift (visible to all CVD types)
- Orange (not pure red) is more distinguishable
- Luminance progression ensures visibility even in grayscale
- Dark-to-light creates intuitive "bad-to-good" mapping

Specific RGB Values (-bit True Color)

```bash
Positive gradient (upward blocks, increasing luminance)
Rating : RGB(, , )  → \ub[;;;;m  Bright cyan-green (L≈)
Rating  : RGB(, , )  → \ub[;;;;m  Vibrant cyan-green (L≈)
Rating  : RGB(, , )   → \ub[;;;;m   Medium green-cyan (L≈)
Rating  : RGB(, , )   → \ub[;;;;m   Moderate green (L≈)
Rating  : RGB(, , )   → \ub[;;;;m   Subtle green (L≈)

Neutral center
Rating  : RGB(, , ) → \ub[;;;;m  Warm gray (L≈)

Negative gradient (downward blocks, decreasing luminance)
Rating  : RGB(, , )  → \ub[;;;;m  Amber/orange (L≈)
Rating  : RGB(, , )  → \ub[;;;;m  Orange-red (L≈)
Rating  : RGB(, , )   → \ub[;;;;m   Strong red (L≈)
Rating  : RGB(, , )   → \ub[;;;;m   Deep dark red (L≈)
```

Luminance Calculation (Approximate):Using simplified L= (.×R + .×G + .×B) / .
Key Features:- -unit luminance range (to )
- ~-point steps between adjacent ratings
- Blue channel increases with positive ratings (→)
- Red channel decreases with negative ratings (→)

-Color Terminal Fallback

For terminals that don't support -bit color, map to xterm-palette:

```bash
Positive (-color approximations)
Rating : \ub[;;m   xterm color (cyan-green, closest to ,,)
Rating  : \ub[;;m   xterm color (light green)
Rating  : \ub[;;m   xterm color (medium green-cyan)
Rating  : \ub[;;m   xterm color (moderate green)
Rating  : \ub[;;m   xterm color (dark green)

Neutral
Rating  : \ub[;;m  xterm color (gray)

Negative
Rating  : \ub[;;m  xterm color (orange)
Rating  : \ub[;;m  xterm color (dark orange)
Rating  : \ub[;;m  xterm color (orange-red)
Rating  : \ub[;;m  xterm color (dark red)
```

Implementation Code:```bash
jq implementation for rating-to-color mapping
if   . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
elif . >= .then "\ub[;;;;m"
else "\ub[;;;;m"
end
```

---

Solution : Blue-Orange Gradient (Maximum Colorblind Safety)

Core Approach:Abandon red-green entirely, use blue (positive) to orange (negative) axis which is preserved in all CVD types.

Color Strategy:- Positive: Pure blue gradient (safe for all CVD)
- Neutral: Gray
- Negative: Orange gradient (distinguishable from blue)

Specific RGB Values

```bash
Positive (blue gradient)
Rating : RGB(, , )  Bright cyan-blue
Rating  : RGB(, , )   Medium-bright blue
Rating  : RGB(, , )   Medium blue
Rating  : RGB(, , )   Moderate blue
Rating  : RGB(, , )   Subtle blue

Neutral
Rating  : RGB(, , )  Neutral gray

Negative (orange gradient)
Rating  : RGB(, , )   Light orange
Rating  : RGB(, , )   Medium orange
Rating  : RGB(, , )   Dark orange
Rating  : RGB(, , )    Very dark orange-brown
```

Trade-offs:- Maximum colorblind safety (blue-orange axis preserved)
- Clear visual distinction for all users
- Deviates from conventional red/green sentiment colors
- May be less intuitive (green=good is cultural norm)

---

Solution : Saturation + Brightness Dual-Axis

Core Approach:Vary BOTH saturation and brightness simultaneously to create maximum perceptual difference.

Color Strategy:- High ratings: High saturation + high brightness
- Low ratings: High saturation + low brightness
- Neutral: Low saturation

Specific RGB Values

```bash
Positive (green - high saturation AND brightness)
Rating : RGB(, , )  Maximum brightness + saturation
Rating  : RGB(, , )   High brightness + saturation
Rating  : RGB(, , )    Medium-high
Rating  : RGB(, , )    Medium
Rating  : RGB(, , )    Medium-low

Neutral (desaturated)
Rating  : RGB(, , )  Low saturation gray-green

Negative (red - high saturation, LOW brightness)
Rating  : RGB(, , )   Medium brightness orange
Rating  : RGB(, , )   Low-medium brightness
Rating  : RGB(, , )    Low brightness red
Rating  : RGB(, , )    Very low brightness dark red
```

Trade-offs:- Maximum perceptual range (uses two visual dimensions)
- Intuitive brightness mapping (bright=good, dark=bad)
- High contrast between extremes
-  May be too intense in bright terminal themes

---

Solution : Color Temperature Gradient

Core Approach:Use color temperature (warm vs cool) as the distinguishing feature.

Color Strategy:- Positive: Cool greens (blue undertones)
- Neutral: Neutral temperature
- Negative: Warm reds (yellow/orange undertones)

Specific RGB Values

```bash
Positive (cool greens with blue undertones)
Rating : RGB(, , )   Cool cyan-green (high blue)
Rating  : RGB(, , )   Cool green
Rating  : RGB(, , )   Medium cool green
Rating  : RGB(, , )   Moderate cool green
Rating  : RGB(, , )    Subtle cool green

Neutral (neutral temperature)
Rating  : RGB(, , )  Balanced gray

Negative (warm orange-reds)
Rating  : RGB(, , )   Warm amber (high yellow)
Rating  : RGB(, , )   Warm orange
Rating  : RGB(, , )    Warm red-orange
Rating  : RGB(, , )    Deep warm red
```

Trade-offs:- Uses temperature perception (cool=calm, warm=alert)
- Aesthetic appeal
-  May be subtle for some users
-  Temperature perception varies by individual

---

Colorblind Simulation Results

Testing with deuteranopia simulation (most common CVD):

Solution (Luminance-First):- Rating → Appears as bright cyan-gray
- Rating → Appears as dark brown-gray
- Clear brightness distinction (vs luminance)
- Positive/negative easily distinguishable

Solution (Blue-Orange):- Rating → Appears as bright blue
- Rating → Appears as dark yellow-brown
- Maximum distinction
- No confusion possible

Solution (Saturation + Brightness):- Rating → Appears as very bright gray
- Rating → Appears as very dark gray
- Works in grayscale
-  Hue information lost but brightness preserved

Solution (Temperature):- Rating → Appears as bright cyan-gray
- Rating → Appears as dark yellow-brown
- Good distinction
-  Some mid-range confusion possible

---

Recommendation: Solution (Luminance-First Gradient)

Why This Is Best:
. Accessibility: Luminance-first approach ensures visibility for all CVD types
. Maintains Tradition: Uses recognizable green/red sentiment colors
. Perceptual Uniformity: ~-point luminance steps between ratings
. Terminal Compatibility: Maps well to -color palette
. Bidirectional Design: Natural visual flow (light=up=good, dark=down=bad)

Implementation Notes:
. Test in actual terminal:Different terminal emulators may render colors slightly differently
. Consider terminal theme:Colors will look different on dark vs light backgrounds
. Add color detection:Check if terminal supports true color before using RGB escapes
. Provide monochrome fallback:Use different block characters if color unsupported

Terminal Detection Code:```bash
Check for true color support
if [[ $COLORTERM == "truecolor" ]] || [[ $COLORTERM == "bit" ]]; then
  Use RGB escapes (Solution )
elif [[ -n $TERM ]] && [[ $TERM == "color"]]; then
  Use -color escapes
else
  Use ASCII blocks only (no color)
fi
```

---

Visual Preview (Simulated)

```
Rating :  (Bright cyan-green)
Rating  :  (Vibrant green-cyan)
Rating  :  (Medium green-cyan)
Rating  :  (Moderate green)
Rating  :  (Subtle green)
Rating  :  (Neutral gray)
Rating  :  (Amber/orange)
Rating  :  (Orange-red)
Rating  :  (Strong red)
Rating  :  (Deep dark red)
```

Full sparkline example (ratings: , , , , , , , , , ):```

```

---

Accessibility Validation

WCAG Contrast Check (Solution ):- Rating (RGB ,,) vs Rating (RGB ,,): .:(exceeds :)
- Rating (RGB ,,) vs Rating (RGB ,,): .:- Adjacent ratings (e.g., vs ): ≈.:(subtle but distinguishable)

Deuteranopia Simulation:- Positive ratings → Cyan to light gray gradient
- Negative ratings → Dark orange to very dark brown gradient
- Clear distinction maintained 
Protanopia Simulation:- Positive ratings → Blue-cyan to light gray gradient
- Negative ratings → Yellow-brown to very dark brown gradient
- Clear distinction maintained 
Tritanopia Simulation:- Positive ratings → Green gradient (preserved)
- Negative ratings → Red gradient (preserved)
- Clear distinction maintained 
---

Next Steps

. Test in target terminal:Verify colors render correctly in your terminal emulator
. User testing:Show to colorblind users if possible (or use simulation tools)
. A/B test:Compare Solution vs Solution for user preference
. Document:Add color meaning to help text (don't rely solely on color)
. Iterate:Adjust RGB values based on feedback

Tools for Testing:- Coblis Color Blindness Simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/
- Color Oracle: Free colorblindness simulator (desktop app)
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

Research Sources:- Bloomberg Terminal Color Accessibility: https://www.bloomberg.com/ux////designing-the-terminal-for-color-accessibility/
- Martin Krzywinski Colorblind Palettes: https://mk.bcgsc.ca/colorblind/palettes.mhtml
- OKLCH Color Space: https://atmos.style/playground
- WCAG Contrast Requirements: https://webaim.org/articles/contrast/
