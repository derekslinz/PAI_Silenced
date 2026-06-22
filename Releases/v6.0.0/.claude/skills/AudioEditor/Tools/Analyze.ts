!/usr/bin/env bun
/ Analyze.ts — LLM-powered edit classification
  Reads a word-level transcript and uses Claude to classify segments as:
 KEEP, CUT_FILLER, CUT_FALSE_START, CUT_EDIT_MARKER, CUT_STUTTER, CUT_DEAD_AIR
  Distinguishes rhetorical emphasis from accidental repetition.
  Usage: bun Analyze.ts <transcript.json> [--output <path>] [--aggressive]
 Output: JSON edit decision list at <transcript>.edits.json
 /

import { existsSync } from "fs";
import { inference } from "../../../PAI/TOOLS/Inference.ts";

interface Chunk {
  text: string;
  timestamp: [number, number | null];
}

interface EditDecision {
  type: string;
  start: number;
  end: number;
  reason: string;
  context: string;
  confidence: number;
}

const args = process.argv.slice();
const inputFile = args.find((a) => !a.startsWith("--"));
const outputFlag = args.indexOf("--output");
const outputPath = outputFlag !== -? args[outputFlag + ] : undefined;
const aggressive = args.includes("--aggressive");

if (!inputFile) {
  console.error("Usage: bun Analyze.ts <transcript.json> [--output <path>] [--aggressive]");
  process.exit();
}

if (!existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit();
}

const outFile =
  outputPath || inputFile.replace(/\.transcript\.json$/, ".edits.json").replace(/\.json$/, ".edits.json");

console.log(`Analyzing: ${inputFile}`);
console.log(`Mode: ${aggressive ? "aggressive" : "standard"}`);

// Load transcript
const transcript = JSON.parse(await Bun.file(inputFile).text());
const chunks: Chunk[] = transcript.chunks || [];

if (chunks.length === ) {
  console.error("No word chunks found in transcript");
  process.exit();
}

// ===== Phase : Detect long pauses (no LLM needed) =====
const pauseEdits: EditDecision[] = [];
const pauseThreshold = aggressive ? .: .;
const keepPause = .; // Keep s of any long pause

for (let i = ; i < chunks.length; i++) {
  const prevEnd = chunks[i - ].timestamp[] || chunks[i - ].timestamp[];
  const currStart = chunks[i].timestamp[];
  const gap = currStart - prevEnd;

  if (gap > pauseThreshold) {
    const cutStart = prevEnd + keepPause;
    const cutEnd = currStart;
    if (cutEnd - cutStart > .) {
      const ctx = chunks
        .slice(Math.max(, i - ), i + )
        .map((c) => c.text.trim())
        .join(" ");
      pauseEdits.push({
        type: "CUT_DEAD_AIR",
        start: Math.round(cutStart ) / ,
        end: Math.round(cutEnd ) / ,
        reason: `${gap.toFixed()}s pause (keeping ${keepPause}s)`,
        context: ctx,
        confidence: .,
      });
    }
  }
}

console.log(`Found ${pauseEdits.length} long pauses (>${pauseThreshold}s)`);

// ===== Phase : Build windowed transcript for LLM analysis =====
// Process in ~-word windows with overlap for context
const WINDOW_SIZE = ;
const OVERLAP = ;
const allEdits: EditDecision[] = [...pauseEdits];

// Build text windows with timestamp markers
function buildWindow(startIdx: number, endIdx: number): string {
  const lines: string[] = [];
  let currentLine = "";
  let lineStartTime = chunks[startIdx].timestamp[];

  for (let i = startIdx; i < endIdx && i < chunks.length; i++) {
    const word = chunks[i].text;
    currentLine += word;

    // Break into ~-word lines with timestamps
    const wordCount = currentLine.trim().split(/\s+/).length;
    if (wordCount >= || i === endIdx - || i === chunks.length - ) {
      const endTime = chunks[i].timestamp[] || chunks[i].timestamp[];
      lines.push(`[${formatTime(lineStartTime)}-${formatTime(endTime)}] ${currentLine.trim()}`);
      currentLine = "";
      if (i + < chunks.length) {
        lineStartTime = chunks[i + ].timestamp[];
      }
    }
  }

  return lines.join("\n");
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / );
  const s = seconds % ;
  return `${m}:${s.toFixed().padStart(, "")}`;
}

const aggressiveInstructions = aggressive
  ? `\n- Be MORE aggressive: cut single filler words like isolated "like", "right", "so" when used as verbal tics
- Cut pauses longer than .seconds
- Cut any word repetition that isn't clearly emphatic`
  : `\n- Be CONSERVATIVE: only cut clear mistakes, not natural speech patterns
- Keep rhetorical devices: parallel structures, lists, emphatic repetition
- When in doubt, classify as KEEP`;

const systemPrompt = `You are an expert audio editor analyzing a podcast transcript to identify sections that should be cut. The transcript has timestamps in [MM:SS.ss-MM:SS.ss] format.

Classify problematic sections. Return a JSON array of edits. Each edit has:
- "type": one of CUT_FILLER, CUT_FALSE_START, CUT_EDIT_MARKER, CUT_STUTTER, CUT_SELF_CORRECTION
- "start": start timestamp in seconds (decimal)
- "end": end timestamp in seconds (decimal)
- "reason": brief description
- "context": the problematic text
- "confidence": .-.
What to CUT

CUT_EDIT_MARKER: Speaker says "edit" as a verbal cue to mark cut points. Cut the word "edit" and any surrounding pause. This is the HIGHEST PRIORITY — these are explicit instructions from the speaker to cut here.

CUT_STUTTER: Unintentional word repetition like "the the", "I I", "with, with". NOT emphatic repetition like "very very important" or "many many people".

CUT_FALSE_START: Speaker starts a sentence, abandons it, and restarts. Example: "So the thing is— so what I was saying is..." — cut "So the thing is—".

CUT_SELF_CORRECTION: Speaker says something wrong then corrects. Example: "Not distill it. Well, they actually..." — cut "Not distill it."

CUT_FILLER: Filler word clusters: "um", "uh", "ah". Only cut when they are standalone hesitations, not when embedded naturally in speech flow.

What to KEEP

- Intentional parallel structures: "Here's the tools. Here's the decisions. Here's the sign-offs."
- Emphatic repetition: "massive, massive reduction", "really, really important"
- Rhetorical lists: "You're the best trainer. You're the best coach."
- Natural discourse markers in flowing speech
- "blah blah blah" (intentional shorthand)
- "I mean" when used naturally in a flowing sentence${aggressiveInstructions}

Output Format

Return ONLY a JSON array. No markdown, no explanation. Example:
[{"type":"CUT_EDIT_MARKER","start":.,"end":.,"reason":"Verbal edit marker","context":"edit. We're talking about","confidence":.}]

If no edits found in a section, return: []`;

// Process in windows
const totalWindows = Math.ceil(chunks.length / (WINDOW_SIZE - OVERLAP));
console.log(`Processing ${chunks.length} words in ${totalWindows} windows...`);

for (let windowStart = ; windowStart < chunks.length; windowStart += WINDOW_SIZE - OVERLAP) {
  const windowEnd = Math.min(windowStart + WINDOW_SIZE, chunks.length);
  const windowNum = Math.floor(windowStart / (WINDOW_SIZE - OVERLAP)) + ;
  const windowText = buildWindow(windowStart, windowEnd);

  const startTime = chunks[windowStart].timestamp[];
  const endTime = chunks[Math.min(windowEnd - , chunks.length - )].timestamp[] ||
    chunks[Math.min(windowEnd - , chunks.length - )].timestamp[];

  process.stdout.write(
    `  Window ${windowNum}/${totalWindows} [${formatTime(startTime)}-${formatTime(endTime)}]...`
  );

  try {
    const result = await inference({
      systemPrompt,
      userPrompt: `Analyze this transcript section and return the JSON array of edits:\n\n${windowText}`,
      level: "standard",
      timeout: _,
    });

    if (!result.success) {
      console.error(`\n  Inference error: ${result.error}`);
      continue;
    }

    const text = result.output || "[]";

    let edits: EditDecision[];
    try {
      const jsonMatch = text.match(/\[[\s\S]\]/);
      edits = jsonMatch ? JSON.parse(jsonMatch[]) : [];
    } catch {
      console.error(` parse error`);
      continue;
    }

    // Deduplicate against existing edits (from overlap regions)
    let added = ;
    for (const edit of edits) {
      const isDuplicate = allEdits.some(
        (e) => Math.abs(e.start - edit.start) < .&& Math.abs(e.end - edit.end) < .      );
      if (!isDuplicate && edit.confidence >= .) {
        allEdits.push(edit);
        added++;
      }
    }

    console.log(` ${added} edits`);
  } catch (err) {
    console.error(` error: ${err}`);
  }
}

// ===== Phase : Sort and merge overlapping edits =====
allEdits.sort((a, b) => a.start - b.start);

const merged: EditDecision[] = [];
for (const edit of allEdits) {
  if (merged.length > && edit.start < merged[merged.length - ].end + .) {
    // Merge overlapping edits
    const prev = merged[merged.length - ];
    prev.end = Math.max(prev.end, edit.end);
    prev.type = prev.type.includes("+") ? prev.type : `${prev.type}+${edit.type}`;
    prev.reason = `${prev.reason}; ${edit.reason}`;
  } else {
    merged.push({ ...edit });
  }
}

// ===== Summary =====
const totalCut = merged.reduce((sum, e) => sum + (e.end - e.start), );
const byType: Record<string, number> = {};
for (const e of merged) {
  const baseType = e.type.split("+")[];
  byType[baseType] = (byType[baseType] || ) + ;
}

console.log(`\n=== Analysis Complete ===`);
console.log(`Total edits: ${merged.length}`);
console.log(`Total time to cut: ${totalCut.toFixed()}s (${(totalCut / ).toFixed()} min)`);
console.log(`By type:`);
for (const [type, count] of Object.entries(byType).sort((a, b) => b[] - a[])) {
  console.log(`  ${type}: ${count}`);
}

// Save
await Bun.write(outFile, JSON.stringify(merged, null, ));
console.log(`\nSaved: ${outFile}`);
