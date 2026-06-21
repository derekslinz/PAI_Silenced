!/usr/bin/env bun
/ FillFrame — deterministic full-frame enforcement for Art-skill outputs.
  Problem this solves: image models persistently leave -% empty margins
 around the subject, even when the prompt explicitly demands edge-to-edge
 composition. The Essay workflow's MARGIN CHECK was a manual checkbox; this
 tool makes it a deterministic post-process that fires on every Essay/header
 generation.
  What it does:
   . Loads the generated image
   . Detects the subject bounding box (non-background pixels via fuzz match
      to corner samples — works on transparent PNGs and solid-color grounds)
   . Crops to that bbox plus a configurable safety inset (default %)
   . Resizes back to the target square dimension so the subject now fills
      the frame edge-to-edge
   . Reports margin metrics before/after so the workflow knows what shifted
  Usage:
   bun ~/.claude/skills/Art/Tools/FillFrame.ts <input.png> <output.png>
     [--target-size ]
     [--bg-color ""|auto]   color to treat as background; "auto" samples corners
     [--fuzz ]                    tolerance percentage for bg detection
     [--inset ]                   safety padding percentage around detected bbox
     [--max-margin ]              fail if any edge has more than N% empty after fill
     [--report-only]               just print metrics, do not write
  Exit codes:
   — image was already full-frame, OR was successfully refilled
   — refill failed (bbox detection inconclusive, or post-fill margin still > max-margin)
 /

import { $ } from "bun";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

interface Args {
  input: string;
  output: string;
  targetSize: number;
  bgColor: string; // hex or "auto"
  fuzz: number;
  inset: number;
  maxMargin: number;
  reportOnly: boolean;
}

function parseArgs(): Args {
  const argv = Bun.argv.slice();
  if (argv.length < ) {
    console.error("usage: bun FillFrame.ts <input> <output> [--target-size N] [--bg-color HEX|auto] [--fuzz N] [--inset N] [--max-margin N] [--report-only]");
    process.exit();
  }
  const flag = (name: string, fallback: string): string => {
    const i = argv.indexOf(`--${name}`);
    return i >= && argv[i + ] ? argv[i + ]! : fallback;
  };
  const has = (name: string): boolean => argv.includes(`--${name}`);
  return {
    input: resolve(argv[]!),
    output: resolve(argv[]!),
    targetSize: parseInt(flag("target-size", ""), ),
    bgColor: flag("bg-color", "auto"),
    fuzz: parseInt(flag("fuzz", ""), ),
    inset: parseInt(flag("inset", ""), ),
    maxMargin: parseInt(flag("max-margin", ""), ),
    reportOnly: has("report-only"),
  };
}

async function detectBgColor(input: string): Promise<string> {
  // Sample five points (corners + slight inset to avoid jpeg edge artifacts)
  const samples = await Promise.all(
    [",", ",", ",", ",", ","].map(async (p) => {
      const out = await $`magick ${input} -format ${`%[pixel:p{${p}}]`} info:`.quiet().text();
      return out.trim();
    })
  );
  // If + samples agree (within fuzz), use that color; else fall back to first corner
  const counts = new Map<string, number>();
  for (const s of samples) counts.set(s, (counts.get(s) ?? ) + );
  const sorted = [...counts.entries()].sort((a, b) => b[] - a[]);
  return sorted[]![];
}

interface Geometry { width: number; height: number; offsetX: number; offsetY: number; }

async function getBbox(input: string, bgColor: string, fuzzPct: number): Promise<Geometry> {
  // Use -trim to find content bbox; fuzz tolerates near-bg pixels
  // -format "%@" prints the bounding box as "WxH+X+Y"
  const result = await $`magick ${input} -bordercolor ${bgColor} -border -fuzz ${fuzzPct}% -trim -format ${"%@"} info:`.quiet().text();
  const m = result.trim().match(/^(\d+)x(\d+)\+(\d+)\+(\d+)/);
  if (!m) throw new Error(`could not parse bbox from "${result}"`);
  return {
    width: parseInt(m[]!, ),
    height: parseInt(m[]!, ),
    offsetX: parseInt(m[]!, ) - , // subtract the +border we added
    offsetY: parseInt(m[]!, ) - ,
  };
}

async function getDimensions(input: string): Promise<{ w: number; h: number }> {
  const result = await $`magick ${input} -format ${"%w %h"} info:`.quiet().text();
  const [w, h] = result.trim().split(/\s+/).map((n) => parseInt(n!, ));
  return { w: w!, h: h! };
}

function marginPercents(bbox: Geometry, full: { w: number; h: number }) {
  return {
    top: (bbox.offsetY / full.h) ,
    bottom: ((full.h - (bbox.offsetY + bbox.height)) / full.h) ,
    left: (bbox.offsetX / full.w) ,
    right: ((full.w - (bbox.offsetX + bbox.width)) / full.w) ,
  };
}

async function main() {
  const args = parseArgs();
  if (!existsSync(args.input)) {
    console.error(`input not found: ${args.input}`);
    process.exit();
  }
  const full = await getDimensions(args.input);
  const bgColor = args.bgColor === "auto" ? await detectBgColor(args.input) : args.bgColor;
  console.log(`input: ${full.w}x${full.h}  bg-color: ${bgColor}  fuzz: ${args.fuzz}%`);

  let bbox: Geometry;
  try {
    bbox = await getBbox(args.input, bgColor, args.fuzz);
  } catch (e) {
    console.error(`bbox detection failed: ${(e as Error).message}`);
    console.error(`   try a different --bg-color or larger --fuzz`);
    process.exit();
  }

  const before = marginPercents(bbox, full);
  console.log(`before: bbox ${bbox.width}x${bbox.height}+${bbox.offsetX}+${bbox.offsetY}  margins T:${before.top.toFixed()}%  B:${before.bottom.toFixed()}%  L:${before.left.toFixed()}%  R:${before.right.toFixed()}%`);

  const maxMarginBefore = Math.max(before.top, before.bottom, before.left, before.right);
  if (maxMarginBefore <= args.maxMargin) {
    console.log(`already full-frame (max margin ${maxMarginBefore.toFixed()}% ≤ ${args.maxMargin}%)`);
    if (!args.reportOnly && args.input !== args.output) {
      await $`cp ${args.input} ${args.output}`.quiet();
    }
    process.exit();
  }

  if (args.reportOnly) {
    console.log(`️  margins exceed ${args.maxMargin}% threshold — refill needed`);
    process.exit();
  }

  // Apply safety inset (negative — shrink the bbox by inset% so we don't crop subject edges)
  const insetPx = Math.round((Math.min(full.w, full.h) args.inset) / );
  const cropX = Math.max(, bbox.offsetX - insetPx);
  const cropY = Math.max(, bbox.offsetY - insetPx);
  const cropW = Math.min(full.w - cropX, bbox.width + insetPx );
  const cropH = Math.min(full.h - cropY, bbox.height + insetPx );

  // Make the crop square (max of W,H) so the resize keeps proportions and the subject still fills
  const sq = Math.max(cropW, cropH);
  const sqX = Math.max(, cropX - Math.floor((sq - cropW) / ));
  const sqY = Math.max(, cropY - Math.floor((sq - cropH) / ));
  const sqXClamped = Math.min(sqX, full.w - sq);
  const sqYClamped = Math.min(sqY, full.h - sq);

  console.log(`️  cropping to ${sq}x${sq}+${sqXClamped}+${sqYClamped} then resizing to ${args.targetSize}x${args.targetSize}`);

  await $`magick ${args.input} -crop ${`${sq}x${sq}+${sqXClamped}+${sqYClamped}`} +repage -resize ${`${args.targetSize}x${args.targetSize}`} ${args.output}`.quiet();

  // Re-measure on output
  const outFull = await getDimensions(args.output);
  const outBbox = await getBbox(args.output, bgColor, args.fuzz);
  const after = marginPercents(outBbox, outFull);
  console.log(`after:  bbox ${outBbox.width}x${outBbox.height}+${outBbox.offsetX}+${outBbox.offsetY}  margins T:${after.top.toFixed()}%  B:${after.bottom.toFixed()}%  L:${after.left.toFixed()}%  R:${after.right.toFixed()}%`);

  const maxAfter = Math.max(after.top, after.bottom, after.left, after.right);
  if (maxAfter > args.maxMargin) {
    console.error(`margins still exceed ${args.maxMargin}% after refill (max ${maxAfter.toFixed()}%)`);
    process.exit();
  }
  console.log(`refilled to full frame (max margin ${maxAfter.toFixed()}% ≤ ${args.maxMargin}%)`);
  console.log(`   ${args.output} (${(statSync(args.output).size / ).toFixed()} KB)`);
}

main().catch((e) => {
  console.error(`${(e as Error).message}`);
  process.exit();
});
