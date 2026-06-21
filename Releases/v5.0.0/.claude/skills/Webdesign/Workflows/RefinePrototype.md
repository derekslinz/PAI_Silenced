RefinePrototype

Iterate on an existing Claude Design prototype via inline comments, direct text edits, and adjustment knobs.

Trigger Phrases

"iterate on this", "refine the prototype", "adjust spacing", "change the color", "make it more minimal", "smaller hero", "different typography"

Inputs

Required:
- Active Claude Design session— a prototype must already exist in the current claude.ai/design workspace (produced by `CreatePrototype` or `WebsiteToRedesign`)
- Refinement request— free-form text describing the change

Workflow

. Verify Session

```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts screenshot /tmp/current.png
```

Confirm a live prototype is visible. If not, the session expired or was closed — restart with `CreatePrototype`.

. Pick the Refinement Mode

Claude Design supports three refinement modes:

| Mode | When to use | How it lands |
|------|-------------|--------------|
| Inline comment| Specific element, surgical change | Click element → comment box → type intent |
| Direct edit| Text content changes, copy tweaks | Click text → edit in place |
| Adjustment knob| Spacing, color, layout, typography scale | Side panel sliders — live, non-destructive |
| Conversational prompt| Structural changes, new sections, different aesthetic | Main chat input |

Use adjustment knobs first (they're fastest and reversible). Fall back to conversational prompts only for structural changes.

. Apply the Refinement

Adjustment knob (most refinements fit here):```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts adjust --property "spacing" --delta "+%"
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts adjust --property "primary-color" --value "DAF"
```

Inline comment:```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts comment --selector "hero-section" --text "Make this % shorter and shift the CTA left-aligned"
```

Conversational prompt:```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts prompt "Remove the testimonial section. Add a pricing comparison table above the footer. Keep the current aesthetic."
```

. Wait for Regeneration

-seconds depending on change scope. Adjustment knobs apply live (<s); conversational prompts trigger full regeneration.

. Screenshot and Compare

```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts screenshot "$OUT/v${N}.png"
```

Use `compare` flag for before/after:
```bash
bun ~/.claude/skills/Webdesign/Tools/DriveClaudeDesign.ts compare /tmp/current.png "$OUT/v${N}.png"
```

. Loop or Export

If more refinements needed, repeat from step . When satisfied, hand back to `CreatePrototype` step (Export) or direct to `ExportToCode` / `IntegrateIntoApp`.

Refinement Request Patterns

Effective refinement prompts are specific and bounded:

| Good | Bad |
|------|-----|
| "Reduce hero padding by %" | "Make it tighter" |
| "Use Playfair Display for headings, keep body font" | "Better typography" |
| "Move the CTA button from center to top-right of the hero" | "Fix the CTA" |
| "Shift the palette ° warmer, keep the same saturation" | "Warmer colors" |
| "Remove the testimonial section entirely" | "Clean it up" |

Common Pitfalls

- Vague refinements— "make it better" produces drift, not improvement. Be specific.
- Too many simultaneous changes— multiple requests in one prompt compound errors. One change at a time for precision.
- Switching aesthetic mid-iteration— see feedback `stay_in_named_workflow.md` in the canonical PAI memory: if you chose brutalist, "make it better" means better-within-brutalist, not switch to minimalist. Be explicit if switching aesthetic.
- Refining past the point of return— if + refinement rounds haven't converged, the original brief was wrong. Restart from `CreatePrototype` with a sharper brief.

Time Estimate

seconds per adjustment-knob change. -minutes per conversational refinement. A typical refinement session is -rounds.
