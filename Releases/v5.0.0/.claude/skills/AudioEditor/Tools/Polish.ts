!/usr/bin/env bun
/ Polish.ts — Cleanvoice API cloud polish
  Uploads audio to Cleanvoice API for final cleanup:
 - Mouth sound removal
 - Remaining filler detection
 - Loudness normalization
  Usage: bun Polish.ts <audio-file> [--output <path>]
 Output: Polished audio file at <audio-file>_polished.<ext>
  Requires: CLEANVOICE_API_KEY env var
 Get key at: https://cleanvoice.ai → Dashboard → Settings → API Key
 /

import { existsSync, readFileSync } from "fs";
import { basename, dirname, extname, join, resolve } from "path";
import { homedir } from "os";

// ============================================================================
// Environment Loading — keys from ~/.claude/.env
// ============================================================================

function loadEnv(): void {
  const envPath = process.env.PAI_CONFIG_DIR
    ? resolve(process.env.PAI_CONFIG_DIR, ".env")
    : resolve(homedir(), ".claude/.env");
  try {
    const content = readFileSync(envPath, "utf-");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -) continue;
      const key = trimmed.slice(, eqIndex).trim();
      let value = trimmed.slice(eqIndex + ).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(, -);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Silently continue if .env doesn't exist
  }
}

loadEnv();

const args = process.argv.slice();
const positional = args.filter((a) => !a.startsWith("--"));
const audioFile = positional[];
const outputFlag = args.indexOf("--output");
const outputPath = outputFlag !== -? args[outputFlag + ] : undefined;

if (!audioFile) {
  console.error("Usage: bun Polish.ts <audio-file> [--output <path>]");
  process.exit();
}

if (!existsSync(audioFile)) {
  console.error(`File not found: ${audioFile}`);
  process.exit();
}

const apiKey = process.env.CLEANVOICE_API_KEY;
if (!apiKey) {
  console.error("CLEANVOICE_API_KEY not found. Set it in ~/.claude/.env");
  console.error("Get key at: https://cleanvoice.ai → Dashboard → Settings → API Key");
  process.exit();
}

const ext = extname(audioFile);
const base = basename(audioFile, ext);
const dir = dirname(audioFile);
const outFile = outputPath || join(dir, `${base}_polished${ext}`);

console.log(`Audio: ${audioFile}`);
console.log(`Output: ${outFile}`);

const API_BASE = "https://api.cleanvoice.ai/v";

// Step : Upload the file
console.log("\nUploading to Cleanvoice...");

const fileData = await Bun.file(audioFile).arrayBuffer();
const formData = new FormData();
formData.append("file", new Blob([fileData]), basename(audioFile));

const uploadResponse = await fetch(`${API_BASE}/upload`, {
  method: "POST",
  headers: {
    "X-API-Key": apiKey,
  },
  body: formData,
});

if (!uploadResponse.ok) {
  const err = await uploadResponse.text();
  console.error(`Upload failed: ${uploadResponse.status} ${err}`);
  process.exit();
}

const uploadData = (await uploadResponse.json()) as any;
const fileId = uploadData.id || uploadData.file_id;
console.log(`Uploaded: ${fileId}`);

// Step : Start processing
console.log("Starting Cleanvoice processing...");

const editResponse = await fetch(`${API_BASE}/edit`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": apiKey,
  },
  body: JSON.stringify({
    input: { files: [fileId] },
    config: {
      filler_words: true,
      mouth_sounds: true,
      deadair: false, // We handle this ourselves
      normalize: true,
    },
  }),
});

if (!editResponse.ok) {
  const err = await editResponse.text();
  console.error(`Edit request failed: ${editResponse.status} ${err}`);
  process.exit();
}

const editData = (await editResponse.json()) as any;
const editId = editData.id || editData.edit_id;
console.log(`Edit job: ${editId}`);

// Step : Poll for completion
console.log("Processing...");
const POLL_INTERVAL = ; // seconds
const MAX_POLLS = ; // minutes max

for (let i = ; i < MAX_POLLS; i++) {
  await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));

  const statusResponse = await fetch(`${API_BASE}/edit/${editId}`, {
    headers: { "X-API-Key": apiKey },
  });

  if (!statusResponse.ok) {
    console.error(`Status check failed: ${statusResponse.status}`);
    continue;
  }

  const statusData = (await statusResponse.json()) as any;
  const status = statusData.status;

  if (status === "completed" || status === "done") {
    console.log("Processing complete.");

    // Download the result
    const downloadUrl = statusData.result?.url || statusData.download_url || statusData.output?.url;
    if (!downloadUrl) {
      console.error("No download URL in response:", JSON.stringify(statusData, null, ));
      process.exit();
    }

    console.log("Downloading polished audio...");
    const downloadResponse = await fetch(downloadUrl);
    if (!downloadResponse.ok) {
      console.error(`Download failed: ${downloadResponse.status}`);
      process.exit();
    }

    const outputData = await downloadResponse.arrayBuffer();
    await Bun.write(outFile, outputData);

    const sizeMB = Math.round(outputData.byteLength / / );
    console.log(`\n=== Polish Complete ===`);
    console.log(`Output: ${outFile} (${sizeMB}MB)`);
    process.exit();
  } else if (status === "failed" || status === "error") {
    console.error(`Processing failed: ${statusData.error || "unknown error"}`);
    process.exit();
  } else {
    const elapsed = ((i + ) POLL_INTERVAL / ).toFixed();
    process.stdout.write(`\r  Status: ${status} (${elapsed}s elapsed)`);
  }
}

console.error("\nTimeout: processing took too long (>min)");
process.exit();
