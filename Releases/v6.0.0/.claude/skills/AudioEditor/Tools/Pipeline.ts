!/usr/bin/env bun
/ Pipeline.ts — End-to-end audio editing pipeline
  Chains: transcribe → analyze → edit → (optional) polish
  Usage: bun Pipeline.ts <audio-file> [--polish] [--aggressive] [--preview]
 Output: Edited (and optionally polished) audio file
 /

import { $ } from "bun";
import { existsSync } from "fs";
import { basename, dirname, extname, join } from "path";

const TOOLS_DIR = import.meta.dir;

const args = process.argv.slice();
const positional = args.filter((a) => !a.startsWith("--"));
const audioFile = positional[];
const doPolish = args.includes("--polish");
const aggressive = args.includes("--aggressive");
const preview = args.includes("--preview");
const outputFlag = args.indexOf("--output");
const outputPath = outputFlag !== -? args[outputFlag + ] : undefined;

if (!audioFile) {
  console.error("Usage: bun Pipeline.ts <audio-file> [--polish] [--aggressive] [--preview] [--output <path>]");
  console.error("");
  console.error("Flags:");
  console.error("  --polish      Apply Cleanvoice cloud polish after editing (requires CLEANVOICE_API_KEY)");
  console.error("  --aggressive  Tighter detection thresholds for filler words and pauses");
  console.error("  --preview     Show proposed edits without executing them");
  console.error("  --output      Specify output file path");
  process.exit();
}

if (!existsSync(audioFile)) {
  console.error(`File not found: ${audioFile}`);
  process.exit();
}

const ext = extname(audioFile);
const base = basename(audioFile, ext);
const dir = dirname(audioFile);

console.log("");
console.log("       AudioEditor Pipeline               ");
console.log("");
console.log(`Input: ${audioFile}`);
console.log(`Mode: ${aggressive ? "aggressive" : "standard"}${doPolish ? " + polish" : ""}`);
console.log("");

const startTime = Date.now();

// ===== Step : Transcribe =====
console.log(" Step /: Transcribe ");
const transcriptFile = join(dir, `${base}.transcript.json`);

if (existsSync(transcriptFile)) {
  console.log(`Transcript exists, reusing: ${transcriptFile}`);
} else {
  const transcribeResult = await $`bun ${join(TOOLS_DIR, "Transcribe.ts")} ${audioFile} --output ${transcriptFile}`.nothrow();
  if (transcribeResult.exitCode !== ) {
    console.error("Transcription failed.");
    process.exit();
  }
}

if (!existsSync(transcriptFile)) {
  console.error(`Transcript not found after transcription: ${transcriptFile}`);
  process.exit();
}

console.log("");

// ===== Step : Analyze =====
console.log(" Step /: Analyze ");
const editsFile = join(dir, `${base}.edits.json`);

const analyzeArgs = [join(TOOLS_DIR, "Analyze.ts"), transcriptFile, "--output", editsFile];
if (aggressive) analyzeArgs.push("--aggressive");

const analyzeResult = await $`bun ${analyzeArgs}`.nothrow();
if (analyzeResult.exitCode !== ) {
  console.error("Analysis failed.");
  process.exit();
}

if (!existsSync(editsFile)) {
  console.error(`Edits file not found after analysis: ${editsFile}`);
  process.exit();
}

// Load and display edit summary
const edits = JSON.parse(await Bun.file(editsFile).text());
console.log("");

if (preview) {
  console.log(" Preview Mode ");
  console.log(`Found ${edits.length} proposed edits:\n`);
  for (const edit of edits) {
    const duration = (edit.end - edit.start).toFixed();
    console.log(`  [${formatTime(edit.start)}-${formatTime(edit.end)}] (${duration}s) ${edit.type}`);
    console.log(`    ${edit.reason}`);
    console.log(`    "${edit.context}"`);
    console.log("");
  }
  const totalCut = edits.reduce((sum: number, e: any) => sum + (e.end - e.start), );
  console.log(`Total time to cut: ${totalCut.toFixed()}s (${(totalCut / ).toFixed()} min)`);
  console.log(`\nEdits saved to: ${editsFile}`);
  console.log("Run without --preview to apply these edits.");
  process.exit();
}

// ===== Step : Edit =====
console.log(" Step /: Edit ");
const editedFile = doPolish
  ? join(dir, `${base}_edited_pre-polish${ext}`)
  : outputPath || join(dir, `${base}_edited${ext}`);

const editResult = await $`bun ${join(TOOLS_DIR, "Edit.ts")} ${audioFile} ${editsFile} --output ${editedFile}`.nothrow();
if (editResult.exitCode !== ) {
  console.error("Editing failed.");
  process.exit();
}

if (!existsSync(editedFile)) {
  console.error(`Edited file not found: ${editedFile}`);
  process.exit();
}

console.log("");

// ===== Step : Polish (optional) =====
if (doPolish) {
  console.log(" Step /: Polish ");
  const polishedFile = outputPath || join(dir, `${base}_edited${ext}`);

  const polishResult = await $`bun ${join(TOOLS_DIR, "Polish.ts")} ${editedFile} --output ${polishedFile}`.nothrow();
  if (polishResult.exitCode !== ) {
    console.error("Polish failed. Edited file still available at:", editedFile);
    process.exit();
  }

  // Clean up pre-polish intermediate file
  await $`rm -f ${editedFile}`.quiet();

  console.log("");
} else {
  console.log(" Step /: Polish (skipped) ");
  console.log("Add --polish flag to enable Cleanvoice cloud polish.");
  console.log("");
}

// ===== Summary =====
const elapsed = ((Date.now() - startTime) / ).toFixed();
const finalFile = doPolish
  ? outputPath || join(dir, `${base}_edited${ext}`)
  : editedFile;

console.log("");
console.log("       Pipeline Complete                  ");
console.log("");
console.log(`Output: ${finalFile}`);
console.log(`Elapsed: ${elapsed}s`);
console.log(`Artifacts:`);
console.log(`  Transcript: ${transcriptFile}`);
console.log(`  Edits:      ${editsFile}`);
console.log(`  Audio:      ${finalFile}`);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / );
  const s = seconds % ;
  return `${m}:${s.toFixed().padStart(, "")}`;
}
