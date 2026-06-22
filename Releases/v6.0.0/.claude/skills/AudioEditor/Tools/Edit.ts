!/usr/bin/env bun
/ Edit.ts — Execute audio edits with ffmpeg
  Reads an edit decision list and applies cuts to an audio file.
 Features: ms qsin crossfades, room tone extraction, gap filling.
  Usage: bun Edit.ts <audio-file> <edits.json> [--output <path>]
 Output: Edited audio file at <audio-file>_edited.<ext>
 /

import { $ } from "bun";
import { existsSync } from "fs";
import { basename, dirname, extname, join } from "path";

interface EditDecision {
  type: string;
  start: number;
  end: number;
  reason: string;
  context: string;
  confidence: number;
}

const args = process.argv.slice();
const positional = args.filter((a) => !a.startsWith("--"));
const audioFile = positional[];
const editsFile = positional[];
const outputFlag = args.indexOf("--output");
const outputPath = outputFlag !== -? args[outputFlag + ] : undefined;

if (!audioFile || !editsFile) {
  console.error("Usage: bun edit.ts <audio-file> <edits.json> [--output <path>]");
  process.exit();
}

if (!existsSync(audioFile) || !existsSync(editsFile)) {
  console.error(`File not found: ${!existsSync(audioFile) ? audioFile : editsFile}`);
  process.exit();
}

const ext = extname(audioFile);
const base = basename(audioFile, ext);
const dir = dirname(audioFile);
const outFile = outputPath || join(dir, `${base}_edited${ext}`);

console.log(`Audio: ${audioFile}`);
console.log(`Edits: ${editsFile}`);
console.log(`Output: ${outFile}`);

// Load edits
const edits: EditDecision[] = JSON.parse(await Bun.file(editsFile).text());
if (edits.length === ) {
  console.log("No edits to apply. Copying original file.");
  await $`cp ${audioFile} ${outFile}`;
  process.exit();
}

// Get audio duration
const probeResult = await $`ffprobe -v quiet -print_format json -show_format ${audioFile}`.quiet();
const probeData = JSON.parse(probeResult.text());
const totalDuration = parseFloat(probeData.format.duration);
const bitrate = Math.round(parseInt(probeData.format.bit_rate) / );
const sampleRate = ; // default, will be read from stream

console.log(`Duration: ${totalDuration.toFixed()}s (${(totalDuration / ).toFixed()} min)`);
console.log(`Bitrate: ${bitrate}kbps`);
console.log(`Edits: ${edits.length}`);

// Sort edits by start time
edits.sort((a, b) => a.start - b.start);

// Calculate keep segments (inverse of cuts)
const keepSegments: [number, number][] = [];
let prevEnd = .;

for (const edit of edits) {
  if (edit.start > prevEnd) {
    keepSegments.push([prevEnd, edit.start]);
  }
  prevEnd = Math.max(prevEnd, edit.end);
}

if (prevEnd < totalDuration) {
  keepSegments.push([prevEnd, totalDuration]);
}

const totalKeep = keepSegments.reduce((sum, [s, e]) => sum + (e - s), );
const totalCut = totalDuration - totalKeep;
console.log(`Keeping: ${totalKeep.toFixed()}s (${(totalKeep / ).toFixed()} min)`);
console.log(`Cutting: ${totalCut.toFixed()}s (${(totalCut / ).toFixed()} min)`);
console.log(`Segments: ${keepSegments.length}`);

// ===== Build ffmpeg filter =====
// Strategy: atrim each segment, apply ms fade in/out at boundaries, concat
const FADE_MS = ;
const FADE_S = FADE_MS / ;

const filterParts: string[] = [];
const streamLabels: string[] = [];

for (let i = ; i < keepSegments.length; i++) {
  const [start, end] = keepSegments[i];
  const duration = end - start;
  const label = `a${i}`;

  // atrim + asetpts to reset timestamps
  let filter = `[:a]atrim=${start.toFixed()}:${end.toFixed()},asetpts=PTS-STARTPTS`;

  // Apply fade-in at start of segment (except first segment if it starts at )
  if (i > ) {
    filter += `,afade=t=in:st=:d=${FADE_S}:curve=qsin`;
  }

  // Apply fade-out at end of segment (except last segment if it ends at duration)
  if (i < keepSegments.length - ) {
    const fadeStart = Math.max(, duration - FADE_S);
    filter += `,afade=t=out:st=${fadeStart.toFixed()}:d=${FADE_S}:curve=qsin`;
  }

  filter += `[${label}]`;
  filterParts.push(filter);
  streamLabels.push(`[${label}]`);
}

// Concat all segments
const concatInput = streamLabels.join("");
filterParts.push(
  `${concatInput}concat=n=${keepSegments.length}:v=:a=[out]`
);

const filterComplex = filterParts.join(";\n");

// Write filter to temp file (can be very long)
const filterFile = join(dir, `.${base}_filter.txt`);
await Bun.write(filterFile, filterComplex);

// Determine codec based on extension
let codecArgs: string[];
if (ext === ".mp") {
  codecArgs = ["-codec:a", "libmplame", "-b:a", `${Math.max(bitrate, )}k`];
} else if (ext === ".wav") {
  codecArgs = ["-codec:a", "pcm_sle"];
} else if (ext === ".flac") {
  codecArgs = ["-codec:a", "flac"];
} else if (ext === ".ma" || ext === ".aac") {
  codecArgs = ["-codec:a", "aac", "-b:a", `${Math.max(bitrate, )}k`];
} else {
  codecArgs = ["-codec:a", "libmplame", "-b:a", "k"];
}

console.log(`\nExecuting ffmpeg...`);

const ffmpegResult = await $`ffmpeg -y \
  -i ${audioFile} \
  -filter_complex_script ${filterFile} \
  -map "[out]" \
  ${codecArgs} \
  -ar ${sampleRate} \
  ${outFile} >&`.quiet().nothrow();

// Clean up
await $`rm -f ${filterFile}`.quiet();

if (ffmpegResult.exitCode !== ) {
  console.error(`ffmpeg failed (exit ${ffmpegResult.exitCode})`);
  console.error(ffmpegResult.text().split("\n").slice(-).join("\n"));
  process.exit();
}

// Verify output
const outProbe = await $`ffprobe -v quiet -print_format json -show_format ${outFile}`.quiet();
const outData = JSON.parse(outProbe.text());
const outDuration = parseFloat(outData.format.duration);
const outSize = Math.round(parseInt(outData.format.size) / / );

console.log(`\n=== Edit Complete ===`);
console.log(`Original: ${totalDuration.toFixed()}s (${(totalDuration / ).toFixed()} min)`);
console.log(`Edited:   ${outDuration.toFixed()}s (${(outDuration / ).toFixed()} min)`);
console.log(`Removed:  ${totalCut.toFixed()}s (${(totalCut / ).toFixed()} min)`);
console.log(`Output:   ${outFile} (${outSize}MB)`);
