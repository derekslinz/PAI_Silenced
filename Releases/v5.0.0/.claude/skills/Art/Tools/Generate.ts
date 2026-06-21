!/usr/bin/env bun

/ generate - UL Image Generation CLI
  Generate branded images using Flux .Pro, Nano Banana, Nano Banana Pro, or GPT-image-.
 Follows llcli pattern for deterministic, composable CLI design.
  Usage:
   generate --model nano-banana-pro --prompt "..." --size :--output /tmp/image.png
  @see ~/.claude/skills/art/README.md
 /

import Replicate from "replicate";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

// ============================================================================
// Environment Loading
// ============================================================================

/ Load environment variables from ${PAI_DIR}/.env
 This ensures API keys are available regardless of how the CLI is invoked
 /
async function loadEnv(): Promise<void> {
  const paiDir = process.env.PAI_DIR || resolve(process.env.HOME!, '.claude');
  const envPath = resolve(paiDir, '.env');
  try {
    const envContent = await readFile(envPath, 'utf-');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -) continue;
      const key = trimmed.slice(, eqIndex).trim();
      let value = trimmed.slice(eqIndex + ).trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(, -);
      }
      // Only set if not already defined (allow overrides from shell)
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    // Silently continue if .env doesn't exist - rely on shell env vars
  }

  // Canonical key aliases — {{PRINCIPAL_NAME}}'s .env uses _OPTIN suffix variants for some
  // providers (data-usage opt-in keys). Tools that look up the bare name
  // must transparently get the OPTIN value when no bare key is set.
  // Add new aliases here when a provider has a suffix variant in the env.
  const aliases: Record<string, string> = {
    OPENAI_API_KEY: "OPENAI_API_KEY_OPTIN",
  };
  for (const [bare, suffixed] of Object.entries(aliases)) {
    if (!process.env[bare] && process.env[suffixed]) {
      process.env[bare] = process.env[suffixed];
    }
  }
}

// ============================================================================
// Types
// ============================================================================

type Model = "flux" | "nano-banana" | "nano-banana-pro" | "gpt-image-" | "gpt-image-" | "compare";
type ReplicateSize = ":" | ":" | ":" | ":" | ":" | ":" | ":" | ":" | ":";
type OpenAISize = "x" | "x" | "x";
type OpenAISize= "x" | "x" | "x" | "x" | "auto";
type GeminiSize = "K" | "K" | "K";
type Quality = "low" | "medium" | "high" | "auto";
type Size = ReplicateSize | OpenAISize | OpenAISize| GeminiSize;

interface CLIArgs {
  model: Model;
  prompt: string;
  size: Size;
  output: string;
  creativeVariations?: number;
  aspectRatio?: ReplicateSize; // For Gemini models and compare mode (nano-banana side)
  quality?: Quality; // For gpt-image-only
  transparent?: boolean; // Enable transparent background
  referenceImages?: string[]; // Reference image paths (Nano Banana Pro only) - up to total
  removeBg?: boolean; // Remove background after generation using local rembg
  addBg?: string; // Add background color (hex) to transparent image
  thumbnail?: boolean; // Generate additional thumbnail with EAEDF background for social previews
}

// ============================================================================
// Configuration
// ============================================================================

const DEFAULTS = {
  model: "flux" as Model,
  size: ":" as Size,
  output: `${process.env.HOME}/Downloads/ul-image.png`,
};

const REPLICATE_SIZES: ReplicateSize[] = [":", ":", ":", ":", ":", ":", ":", ":", ":", ":"];
const OPENAI_SIZES: OpenAISize[] = ["x", "x", "x"];
const OPENAI_V_SIZES: OpenAISize[] = ["x", "x", "x", "x", "auto"];
const GEMINI_SIZES: GeminiSize[] = ["K", "K", "K"];
const QUALITY_VALUES: Quality[] = ["low", "medium", "high", "auto"];

// Aspect ratio mapping for Gemini (used with image size like K)
const GEMINI_ASPECT_RATIOS: ReplicateSize[] = [":", ":", ":", ":", ":", ":", ":", ":", ":", ":"];

// ============================================================================
// Error Handling
// ============================================================================

class CLIError extends Error {
  constructor(message: string, public exitCode: number = ) {
    super(message);
    this.name = "CLIError";
  }
}

function handleError(error: unknown): never {
  if (error instanceof CLIError) {
    console.error(`Error: ${error.message}`);
    process.exit(error.exitCode);
  }

  if (error instanceof Error) {
    console.error(`Unexpected error: ${error.message}`);
    console.error(error.stack);
    process.exit();
  }

  console.error(`Unknown error:`, error);
  process.exit();
}

// ============================================================================
// Image Format Detection
// ============================================================================

/ Detect actual image format from magic bytes.
 Prevents MIME type mismatch when API returns different format than requested.
 /
function detectImageFormat(data: Buffer | UintArray): { format: string; ext: string; mime: string } | null {
  if (data.length < ) return null;
  if (data[] === x&& data[] === x&& data[] === xe && data[] === x)
    return { format: "png", ext: ".png", mime: "image/png" };
  if (data[] === xff && data[] === xd&& data[] === xff)
    return { format: "jpeg", ext: ".jpg", mime: "image/jpeg" };
  if (data[] === x&& data[] === x&& data[] === x&& data[] === x&&
      data[] === x&& data[] === x&& data[] === x&& data[] === x)
    return { format: "webp", ext: ".webp", mime: "image/webp" };
  if (data[] === x&& data[] === x&& data[] === x)
    return { format: "gif", ext: ".gif", mime: "image/gif" };
  return null;
}

/ Save image data with correct file extension based on actual content format.
 Returns the final path (may differ from requested if format mismatch detected).
 /
async function saveImage(data: Buffer | UintArray | any, requestedPath: string): Promise<string> {
  const buffer = data instanceof Buffer ? data : Buffer.from(data as any);
  const detected = detectImageFormat(buffer);
  if (detected) {
    const requestedExt = extname(requestedPath).toLowerCase();
    if (requestedExt && requestedExt !== detected.ext) {
      const correctedPath = requestedPath.replace(/\.[^.]+$/, detected.ext);
      console.warn(`️ API returned ${detected.format.toUpperCase()} data (requested ${requestedExt.slice().toUpperCase()}). Saving as ${correctedPath}`);
      await writeFile(correctedPath, buffer);
      return correctedPath;
    }
  }
  await writeFile(requestedPath, buffer);
  return requestedPath;
}

/ Detect MIME type from image file content (magic bytes), falling back to extension.
 /
async function detectMimeType(filePath: string): Promise<string> {
  try {
    const data = await readFile(filePath);
    const detected = detectImageFormat(data);
    if (detected) return detected.mime;
  } catch {
    // Fall through to extension-based detection
  }
  const ext = extname(filePath).toLowerCase();
  switch (ext) {
    case ".png": return "image/png";
    case ".jpg": case ".jpeg": return "image/jpeg";
    case ".webp": return "image/webp";
    default: throw new CLIError(`Unsupported image format: ${ext}. Supported: .png, .jpg, .jpeg, .webp`);
  }
}

// ============================================================================
// Help Text
// ============================================================================

// PAI directory for documentation paths
const PAI_DIR = process.env.PAI_DIR || `${process.env.HOME}/.claude`;

function showHelp(): void {
  console.log(`
generate - UL Image Generation CLI

Generate branded images using Flux .Pro, Nano Banana, or GPT-image-.

USAGE:
  generate --model <model> --prompt "<prompt>" [OPTIONS]

REQUIRED:
  --model <model>      Model to use: flux, nano-banana, nano-banana-pro, gpt-image-, gpt-image-, compare
                       "compare" runs gpt-image-+ nano-banana side-by-side for comparison
  --prompt <text>      Image generation prompt (quote if contains spaces)

OPTIONS:
  --size <size>              Image size/aspect ratio (default varies by model)
                             Replicate (flux, nano-banana): :, :, :, :, :, :, :, :, :, :                             OpenAI gpt-image-: x, x, x                             OpenAI gpt-image-: x, x, x, x, auto
                             Gemini (nano-banana-pro): K, K, K (resolution); aspect ratio inferred or :                             compare mode: pass gpt-image-size here; nano side uses --aspect-ratio
  --aspect-ratio <ratio>     Aspect ratio for Gemini nano-banana-pro AND compare-mode nano-banana side
                             Options: :, :, :, :, :, :, :, :, :, :(default :)
  --quality <level>          Quality for gpt-image-only: low, medium, high, auto (default: high)
  --output <path>            Output file path (default: /tmp/ul-image.png)
  --reference-image <path>   Reference image for style/character consistency (Nano Banana Pro only)
                             Can specify MULTIPLE times for improved consistency
                             Accepts: PNG, JPEG, WebP images
                             API Limits: Up to human refs, object refs, total max
  --transparent              Enable transparent background (adds transparency instructions to prompt)
                             Note: Not all models support transparency natively; may require post-processing
  --remove-bg                Remove background after generation using local rembg
                             Creates true transparency by removing the generated background
  --add-bg <hex>             Add background color to a transparent image (e.g., "EAEDF")
                             Useful for creating thumbnails/social previews from transparent images
  --thumbnail                Generate BOTH transparent AND thumbnail versions for blog headers
                             Creates: output.png (transparent) + output-thumb.png (EAEDF background)
                             Automatically enables --remove-bg
  --creative-variations <n>  Generate N variations (appends -v, -v, etc. to output filename)
                             Use with the be-creative skill for true prompt diversity
                             CLI mode: generates N images with same prompt (tests model variability)
  --help, -h                 Show this help message

EXAMPLES:
  Generate blog header with Nano Banana Pro (:, K quality)
  generate --model nano-banana-pro --prompt "Abstract UL illustration..." --size K --aspect-ratio :
  Generate high-res K image with Nano Banana Pro
  generate --model nano-banana-pro --prompt "Editorial cover..." --size K --aspect-ratio :
  Generate blog header with original Nano Banana (:)
  generate --model nano-banana --prompt "Abstract UL illustration..." --size :
  Generate square image with Flux
  generate --model flux --prompt "Minimal geometric art..." --size :--output /tmp/header.png

  Generate portrait with GPT-image-  generate --model gpt-image---prompt "Editorial cover..." --size x
  Generate with NEW gpt-image-(ChatGPT Images .) at K with high quality
  generate --model gpt-image---prompt "Editorial cover..." --size x--quality high

  Compare mode: images from gpt-image-+ from nano-banana side-by-side
  generate --model compare --prompt "Abstract illustration..." \\
    --creative-variations --size x--aspect-ratio :\\
    --output /tmp/shootout.png
  Outputs: /tmp/shootout-gpt-{,,}.png + /tmp/shootout-nano-{,,}.png

  Generate creative variations (for testing model variability)
  generate --model gpt-image---prompt "..." --creative-variations --output /tmp/essay.png
  Outputs: /tmp/essay-v.png, /tmp/essay-v.png, /tmp/essay-v.png

  Single reference image for style guidance (Nano Banana Pro only)
  generate --model nano-banana-pro --prompt "Tokyo Night themed illustration..." \\
    --reference-image /tmp/style-reference.png --size K --aspect-ratio :
  MULTIPLE reference images for character consistency (Nano Banana Pro only)
  generate --model nano-banana-pro --prompt "Person from references at a party..." \\
    --reference-image face.jpg --reference-image face.jpg --reference-image face.jpg \\
    --size K --aspect-ratio :
NOTE: For true creative diversity with different prompts, use the creative workflow which
integrates the be-creative skill. CLI creative mode generates multiple images with the SAME prompt.

MULTI-REFERENCE LIMITS (Gemini API):
  - Up to human reference images for character consistency
  - Up to object reference images
  - Maximum total reference images per request

ENVIRONMENT VARIABLES:
  REPLICATE_API_TOKEN  Required for flux and nano-banana models
  OPENAI_API_KEY       Required for gpt-image-model
  GOOGLE_API_KEY       Required for nano-banana-pro model
  REMBG_BIN            Optional override for rembg binary path (default: ~/.local/bin/rembg)

ERROR CODES:
   Success
   General error (invalid arguments, API error, file write error)

MORE INFO:
  Documentation: ${PAI_DIR}/skills/Art/README.md
  Source: ${PAI_DIR}/skills/Art/Tools/Generate.ts
`);
  process.exit();
}

// ============================================================================
// Argument Parsing
// ============================================================================

function parseArgs(argv: string[]): CLIArgs {
  const args = argv.slice();

  // Check for help flag
  if (args.includes("--help") || args.includes("-h") || args.length === ) {
    showHelp();
  }

  const parsed: Partial<CLIArgs> = {
    model: DEFAULTS.model,
    output: DEFAULTS.output,
  };

  // Collect reference images into array
  const referenceImages: string[] = [];

  // Parse arguments
  for (let i = ; i < args.length; i++) {
    const flag = args[i];

    if (!flag.startsWith("--")) {
      throw new CLIError(`Invalid flag: ${flag}. Flags must start with --`);
    }

    const key = flag.slice();

    // Handle boolean flags (no value)
    if (key === "transparent") {
      parsed.transparent = true;
      continue;
    }
    if (key === "remove-bg") {
      parsed.removeBg = true;
      continue;
    }
    if (key === "thumbnail") {
      parsed.thumbnail = true;
      parsed.removeBg = true; // Thumbnail mode requires remove-bg
      continue;
    }

    // Handle flags with values
    const value = args[i + ];
    if (!value || value.startsWith("--")) {
      throw new CLIError(`Missing value for flag: ${flag}`);
    }

    switch (key) {
      case "model":
        if (
          value !== "flux" &&
          value !== "nano-banana" &&
          value !== "nano-banana-pro" &&
          value !== "gpt-image-" &&
          value !== "compare"
        ) {
          if (value === "gpt-image-") {
            throw new CLIError(
              `gpt-image-is DEPRECATED per OpenAI docs. Use --model gpt-image-instead (current OpenAI image model, released Apr , on Artificial Analysis Image Arena).`
            );
          }
          throw new CLIError(
            `Invalid model: ${value}. Must be: flux, nano-banana, nano-banana-pro, gpt-image-, or compare`
          );
        }
        parsed.model = value;
        i++; // Skip next arg (value)
        break;
      case "quality":
        if (!QUALITY_VALUES.includes(value as Quality)) {
          throw new CLIError(`Invalid quality: ${value}. Must be: ${QUALITY_VALUES.join(", ")}`);
        }
        parsed.quality = value as Quality;
        i++;
        break;
      case "prompt":
        parsed.prompt = value;
        i++; // Skip next arg (value)
        break;
      case "size":
        parsed.size = value as Size;
        i++; // Skip next arg (value)
        break;
      case "aspect-ratio":
        parsed.aspectRatio = value as ReplicateSize;
        i++; // Skip next arg (value)
        break;
      case "output":
        parsed.output = value;
        i++; // Skip next arg (value)
        break;
      case "reference-image":
        // Collect multiple reference images into array
        referenceImages.push(value);
        i++; // Skip next arg (value)
        break;
      case "creative-variations":
        const variations = parseInt(value, );
        if (isNaN(variations) || variations < || variations > ) {
          throw new CLIError(`Invalid creative-variations: ${value}. Must be -`);
        }
        parsed.creativeVariations = variations;
        i++; // Skip next arg (value)
        break;
      case "add-bg":
        // Validate hex color format
        if (!/^[-A-Fa-f]{}$/.test(value)) {
          throw new CLIError(`Invalid hex color: ${value}. Must be in format RRGGBB (e.g., EAEDF)`);
        }
        parsed.addBg = value;
        i++; // Skip next arg (value)
        break;
      default:
        throw new CLIError(`Unknown flag: ${flag}`);
    }
  }

  // Assign collected reference images if any
  if (referenceImages.length > ) {
    parsed.referenceImages = referenceImages;
  }

  // Validate required arguments
  if (!parsed.prompt) {
    throw new CLIError("Missing required argument: --prompt");
  }

  if (!parsed.model) {
    throw new CLIError("Missing required argument: --model");
  }

  // Validate reference-image is only used with nano-banana-pro
  if (parsed.referenceImages && parsed.referenceImages.length > && parsed.model !== "nano-banana-pro") {
    throw new CLIError("--reference-image is only supported with --model nano-banana-pro");
  }

  // Validate reference image count (API limits: human, object, total max)
  if (parsed.referenceImages && parsed.referenceImages.length > ) {
    throw new CLIError(`Too many reference images: ${parsed.referenceImages.length}. Maximum is total (human, object)`);
  }

  // Quality is only valid for gpt-image-  if (parsed.quality && parsed.model !== "gpt-image-" && parsed.model !== "compare") {
    throw new CLIError(`--quality is only supported with --model gpt-image-(or compare)`);
  }

  // Set model-appropriate default size if not explicitly provided
  if (!parsed.size) {
    switch (parsed.model) {
      case "gpt-image-":
        parsed.size = "x";
        break;
      case "nano-banana-pro":
        parsed.size = "K";
        break;
      case "compare":
        // compare mode: use aspect-ratio for nano side, gpt-image-size default
        parsed.size = "x";
        break;
      default: // flux, nano-banana
        parsed.size = ":";
        break;
    }
  }

  // Validate size based on model
  if (parsed.model === "gpt-image-") {
    if (!OPENAI_V_SIZES.includes(parsed.size as OpenAISize)) {
      throw new CLIError(`Invalid size for gpt-image-: ${parsed.size}. Must be: ${OPENAI_V_SIZES.join(", ")}`);
    }
  } else if (parsed.model === "compare") {
    if (!OPENAI_V_SIZES.includes(parsed.size as OpenAISize)) {
      throw new CLIError(`Invalid size for compare (gpt-image-side): ${parsed.size}. Must be: ${OPENAI_V_SIZES.join(", ")}`);
    }
    if (parsed.aspectRatio && !REPLICATE_SIZES.includes(parsed.aspectRatio as ReplicateSize)) {
      throw new CLIError(`Invalid aspect-ratio for compare (nano-banana side): ${parsed.aspectRatio}. Must be: ${REPLICATE_SIZES.join(", ")}`);
    }
    if (!parsed.aspectRatio) parsed.aspectRatio = ":";
  } else if (parsed.model === "nano-banana-pro") {
    if (!GEMINI_SIZES.includes(parsed.size as GeminiSize)) {
      throw new CLIError(`Invalid size for nano-banana-pro: ${parsed.size}. Must be: ${GEMINI_SIZES.join(", ")}`);
    }
    // Validate aspect ratio if provided
    if (parsed.aspectRatio && !GEMINI_ASPECT_RATIOS.includes(parsed.aspectRatio)) {
      throw new CLIError(`Invalid aspect-ratio for nano-banana-pro: ${parsed.aspectRatio}. Must be: ${GEMINI_ASPECT_RATIOS.join(", ")}`);
    }
    // Default to :if not specified
    if (!parsed.aspectRatio) {
      parsed.aspectRatio = ":";
    }
  } else {
    if (!REPLICATE_SIZES.includes(parsed.size as ReplicateSize)) {
      throw new CLIError(`Invalid size for ${parsed.model}: ${parsed.size}. Must be: ${REPLICATE_SIZES.join(", ")}`);
    }
  }

  return parsed as CLIArgs;
}

// ============================================================================
// Prompt Enhancement
// ============================================================================

function enhancePromptForTransparency(prompt: string): string {
  const transparencyPrefix = "CRITICAL: Transparent background (PNG with alpha channel) - NO background color, pure transparency. Object floating in transparent space. ";
  return transparencyPrefix + prompt;
}

// ============================================================================
// Background Removal
// ============================================================================

import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

// ============================================================================
// Background Operations
// ============================================================================

/ Add a solid background color to a transparent PNG image
 Uses ImageMagick to composite the transparent image onto a colored background
 /
async function addBackgroundColor(inputPath: string, outputPath: string, hexColor: string): Promise<void> {
  console.log(`Adding background color ${hexColor} to image...`);

  // Use ImageMagick to composite the transparent image onto a colored background
  // -background sets the fill color, -flatten composites onto that background
  const command = `magick "${inputPath}" -background "${hexColor}" -flatten "${outputPath}"`;

  try {
    await execAsync(command);
    console.log(`Thumbnail saved to ${outputPath}`);
  } catch (error) {
    throw new CLIError(`Failed to add background color: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function removeBackground(imagePath: string): Promise<string> {
  const home = process.env.HOME;
  if (!home) throw new CLIError("HOME not set; cannot resolve rembg binary");
  const rembgBin = process.env.REMBG_BIN || resolve(home, ".local/bin/rembg");

  const { existsSync } = await import("node:fs");
  if (!existsSync(rembgBin)) {
    throw new CLIError(
      `rembg not found at ${rembgBin}. Install: pipx install rembg (or set REMBG_BIN env var to override path).`
    );
  }

  console.log("Removing background with local rembg...");

  // rembg always emits PNG. Force the output path to .png so we don't end up
  // with PNG bytes inside a .jpg extension.
  const currentExt = extname(imagePath).toLowerCase();
  const finalPath = currentExt === ".png" ? imagePath : imagePath.replace(/\.[^.]+$/, ".png");

  // rembg truncates output before reading input, so input == output corrupts
  // the file. Always write to a temp path, then rename.
  const tempPath = finalPath.replace(/\.png$/, `.rembg-tmp.png`);

  const { spawn } = await import("node:child_process");
  await new Promise<void>((resolveFn, rejectFn) => {
    const proc = spawn(rembgBin, ["i", imagePath, tempPath], { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    proc.on("error", (err) => rejectFn(new CLIError(`Failed to launch rembg: ${err.message}`)));
    proc.on("close", (code) => {
      if (code === ) resolveFn();
      else rejectFn(new CLIError(`rembg exited ${code}: ${stderr.trim()}`));
    });
  });

  const { unlink, rename } = await import("node:fs/promises");
  // Drop the original (whether .jpg or the .png we're about to overwrite)
  try { await unlink(imagePath); } catch {}
  await rename(tempPath, finalPath);

  if (finalPath !== imagePath) {
    console.log(`   renamed ${currentExt} → .png (transparency requires PNG): ${finalPath}`);
  }

  // Validate output is actually PNG with alpha
  const result = await readFile(finalPath);
  const detected = detectImageFormat(result);
  if (!detected || detected.format !== "png") {
    throw new CLIError(
      `rembg produced non-PNG output (got ${detected?.format ?? "unknown"}). Transparency requires PNG.`
    );
  }

  console.log("Background removed successfully");
  return finalPath;
}

// ============================================================================
// Image Generation
// ============================================================================

async function generateWithFlux(prompt: string, size: ReplicateSize, output: string): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new CLIError("Missing environment variable: REPLICATE_API_TOKEN");
  }

  const replicate = new Replicate({ auth: token });

  console.log("Generating with Flux .Pro...");

  const result = await replicate.run("black-forest-labs/flux-.-pro", {
    input: {
      prompt,
      aspect_ratio: size,
      output_format: "png",
      output_quality: ,
      prompt_upsampling: false,
    },
  });

  // Replicate SDK may return a FileOutput object with a url() method or toString()
  let imageData: Buffer;
  if (result && typeof (result as any).blob === "function") {
    // FileOutput (Replicate SDK v+) — has blob() method
    const blob = await (result as any).blob();
    imageData = Buffer.from(await blob.arrayBuffer());
  } else if (result && typeof (result as any).url === "function") {
    const url = (result as any).url().href ?? (result as any).url();
    const resp = await fetch(url);
    imageData = Buffer.from(await resp.arrayBuffer());
  } else if (result && typeof (result as any).arrayBuffer === "function") {
    imageData = Buffer.from(await (result as any).arrayBuffer());
  } else if (typeof result === "string" && result.startsWith("http")) {
    const resp = await fetch(result);
    imageData = Buffer.from(await resp.arrayBuffer());
  } else {
    imageData = result as Buffer;
  }

  const finalPath = await saveImage(imageData, output);
  console.log(`Image saved to ${finalPath}`);
  return finalPath;
}

async function generateWithNanoBanana(prompt: string, size: ReplicateSize, output: string): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new CLIError("Missing environment variable: REPLICATE_API_TOKEN");
  }

  const replicate = new Replicate({ auth: token });

  console.log("Generating with Nano Banana...");

  const result = await replicate.run("google/nano-banana", {
    input: {
      prompt,
      aspect_ratio: size,
      output_format: "png",
    },
  });

  // Handle FileOutput from Replicate SDK v+
  let imageData: Buffer;
  if (result && typeof (result as any).blob === "function") {
    const blob = await (result as any).blob();
    imageData = Buffer.from(await blob.arrayBuffer());
  } else if (result && typeof (result as any).url === "function") {
    const url = (result as any).url().href ?? (result as any).url();
    const resp = await fetch(url);
    imageData = Buffer.from(await resp.arrayBuffer());
  } else if (typeof result === "string" && (result as string).startsWith("http")) {
    const resp = await fetch(result as string);
    imageData = Buffer.from(await resp.arrayBuffer());
  } else {
    imageData = result as Buffer;
  }
  const finalPath = await saveImage(imageData, output);
  console.log(`Image saved to ${finalPath}`);
  return finalPath;
}

async function generateWithGPTImage(prompt: string, size: OpenAISize, output: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new CLIError("Missing environment variable: OPENAI_API_KEY");
  }

  const openai = new OpenAI({ apiKey });

  console.log("Generating with GPT-image-...");

  const response = await openai.images.generate({
    model: "gpt-image-",
    prompt,
    size,
    n: ,
  });

  const imageData = response.data[].b_json;
  if (!imageData) {
    throw new CLIError("No image data returned from OpenAI API");
  }

  const imageBuffer = Buffer.from(imageData, "base");
  const finalPath = await saveImage(imageBuffer, output);
  console.log(`Image saved to ${finalPath}`);
  return finalPath;
}

async function generateWithGPTImage(
  prompt: string,
  size: OpenAISize,
  quality: Quality,
  n: number,
  outputBase: string
): Promise<string[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new CLIError("Missing environment variable: OPENAI_API_KEY");
  }

  const openai = new OpenAI({ apiKey });

  console.log(`Generating with gpt-image-(ChatGPT Images .) — size=${size} quality=${quality} n=${n}...`);

  const response = await openai.images.generate({
    model: "gpt-image-",
    prompt,
    size,
    quality,
    n,
  } as any);

  const data = (response as any).data;
  if (!Array.isArray(data) || data.length === ) {
    throw new CLIError("No image data returned from OpenAI gpt-image-API");
  }

  const paths: string[] = [];
  for (let i = ; i < data.length; i++) {
    const item = data[i];
    let buffer: Buffer;
    if (item.b_json) {
      buffer = Buffer.from(item.b_json, "base");
    } else if (item.url) {
      const resp = await fetch(item.url);
      buffer = Buffer.from(await resp.arrayBuffer());
    } else {
      throw new CLIError(`gpt-image-returned image ${i + } with neither b_json nor url`);
    }
    const target = data.length === ? outputBase : outputBase.replace(/\.[^.]+$/, `-${i + }.png`);
    const finalPath = await saveImage(buffer, target);
    console.log(`gpt-image-image saved to ${finalPath}`);
    paths.push(finalPath);
  }
  return paths;
}

async function generateWithNanoBananaPro(
  prompt: string,
  size: GeminiSize,
  aspectRatio: ReplicateSize,
  output: string,
  referenceImages?: string[]
): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new CLIError("Missing environment variable: GOOGLE_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  if (referenceImages && referenceImages.length > ) {
    console.log(`Generating with Nano Banana Pro (Gemini Pro) at ${size} ${aspectRatio} with ${referenceImages.length} reference image(s)...`);
  } else {
    console.log(`Generating with Nano Banana Pro (Gemini Pro) at ${size} ${aspectRatio}...`);
  }

  // Prepare content parts
  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

  // Add all reference images if provided
  if (referenceImages && referenceImages.length > ) {
    for (const referenceImage of referenceImages) {
      // Read image file
      const imageBuffer = await readFile(referenceImage);
      const imageBase= imageBuffer.toString("base");

      // Detect MIME type from actual file content (magic bytes), not just extension
      const mimeType = await detectMimeType(referenceImage);

      parts.push({
        inlineData: {
          mimeType,
          data: imageBase,
        },
      });
    }
  }

  // Add text prompt
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: "gemini--pro-image-preview",
    contents: [{ parts }],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: aspectRatio,
        imageSize: size,
      },
    },
  });

  // Extract image data from response
  let imageData: string | undefined;

  if (response.candidates && response.candidates.length > ) {
    const parts = response.candidates[].content.parts;
    for (const part of parts) {
      // Check if this part contains inline image data
      if (part.inlineData && part.inlineData.data) {
        imageData = part.inlineData.data;
        break;
      }
    }
  }

  if (!imageData) {
    throw new CLIError("No image data returned from Gemini API");
  }

  const imageBuffer = Buffer.from(imageData, "base");
  const finalPath = await saveImage(imageBuffer, output);
  console.log(`Image saved to ${finalPath}`);
  return finalPath;
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  try {
    // Load API keys from ${PAI_DIR}/.env
    await loadEnv();

    const args = parseArgs(process.argv);

    // Enhance prompt for transparency if requested
    const finalPrompt = args.transparent
      ? enhancePromptForTransparency(args.prompt)
      : args.prompt;

    if (args.transparent) {
      console.log("Transparent background mode enabled");
      console.log("Note: Not all models support transparency natively; may require post-processing\n");
    }

    const n = args.creativeVariations && args.creativeVariations > ? args.creativeVariations : ;
    const quality: Quality = args.quality ?? "high";

    // Compare mode: generate N images with gpt-image-+ N with nano-banana, side-by-side
    if (args.model === "compare") {
      console.log(`️  Compare Mode: ${n} image(s) from gpt-image-+ ${n} from nano-banana (total ${n })`);
      const basePath = args.output.replace(/\.[^.]+$/, "");
      const gptBase = `${basePath}-gpt.png`;
      const nanoBase = `${basePath}-nano.png`;

      const gptPromise = generateWithGPTImage(
        finalPrompt,
        args.size as OpenAISize,
        quality,
        n,
        gptBase
      ).catch((err) => {
        console.error(`gpt-image-side failed: ${err instanceof Error ? err.message : err}`);
        return [] as string[];
      });

      const nanoPromises: Promise<string>[] = [];
      for (let i = ; i <= n; i++) {
        const nanoOutput = n === ? nanoBase : `${basePath}-nano-${i}.png`;
        nanoPromises.push(
          generateWithNanoBanana(finalPrompt, args.aspectRatio!, nanoOutput).catch((err) => {
            console.error(`nano-banana variation ${i} failed: ${err instanceof Error ? err.message : err}`);
            return "";
          })
        );
      }

      const [gptPaths, nanoPathsRaw] = await Promise.all([gptPromise, Promise.all(nanoPromises)]);
      const nanoPaths = nanoPathsRaw.filter(Boolean);
      console.log(`\nCompare complete — gpt-image-: ${gptPaths.length}/${n}, nano-banana: ${nanoPaths.length}/${n}`);
      console.log(`   gpt-image-: ${gptPaths.join(", ") || "(none)"}`);
      console.log(`   nano-banana: ${nanoPaths.join(", ") || "(none)"}`);
      return;
    }

    // Single-model multi-image (creative-variations) path
    if (n > ) {
      console.log(`Creative Mode: Generating ${n} variations with ${args.model}...`);
      console.log(`Note: CLI mode uses same prompt for all variations (tests model variability)`);
      console.log(`   For true creative diversity, use the creative workflow with be-creative skill\n`);

      const basePath = args.output.replace(/\.[^.]+$/, "");

      // gpt-image-supports batch n natively — single API call
      if (args.model === "gpt-image-") {
        const paths = await generateWithGPTImage(
          finalPrompt,
          args.size as OpenAISize,
          quality,
          n,
          `${basePath}.png`
        );
        console.log(`\nGenerated ${paths.length} variation(s)`);
        console.log(`   Files: ${paths.join(", ")}`);
        return;
      }

      // Other models: fan out in parallel
      const promises: Promise<string>[] = [];
      for (let i = ; i <= n; i++) {
        const varOutput = `${basePath}-v${i}.png`;
        console.log(`Variation ${i}/${n}: ${varOutput}`);

        if (args.model === "flux") {
          promises.push(generateWithFlux(finalPrompt, args.size as ReplicateSize, varOutput));
        } else if (args.model === "nano-banana") {
          promises.push(generateWithNanoBanana(finalPrompt, args.size as ReplicateSize, varOutput));
        } else if (args.model === "nano-banana-pro") {
          promises.push(
            generateWithNanoBananaPro(
              finalPrompt,
              args.size as GeminiSize,
              args.aspectRatio!,
              varOutput,
              args.referenceImages
            )
          );
        } else if (args.model === "gpt-image-") {
          promises.push(generateWithGPTImage(finalPrompt, args.size as OpenAISize, varOutput));
        }
      }

      const actualPaths = await Promise.all(promises);
      console.log(`\nGenerated ${n} variations`);
      console.log(`   Files: ${actualPaths.join(", ")}`);
      return;
    }

    // Standard single image generation — track actual output path (may differ if format corrected)
    let actualOutput: string = args.output;
    if (args.model === "flux") {
      actualOutput = await generateWithFlux(finalPrompt, args.size as ReplicateSize, args.output);
    } else if (args.model === "nano-banana") {
      actualOutput = await generateWithNanoBanana(finalPrompt, args.size as ReplicateSize, args.output);
    } else if (args.model === "nano-banana-pro") {
      actualOutput = await generateWithNanoBananaPro(
        finalPrompt,
        args.size as GeminiSize,
        args.aspectRatio!,
        args.output,
        args.referenceImages
      );
    } else if (args.model === "gpt-image-") {
      actualOutput = await generateWithGPTImage(finalPrompt, args.size as OpenAISize, args.output);
    } else if (args.model === "gpt-image-") {
      const paths = await generateWithGPTImage(
        finalPrompt,
        args.size as OpenAISize,
        quality,
        ,
        args.output
      );
      actualOutput = paths[];
    }

    // Remove background if requested (use actual output path)
    // May return a renamed path (e.g., .jpg → .png) since rembg returns PNG.
    if (args.removeBg) {
      actualOutput = await removeBackground(actualOutput);
    }

    // Add background color if requested (standalone mode)
    if (args.addBg && !args.thumbnail) {
      // For standalone --add-bg, modify the image in place
      const tempPath = actualOutput.replace(/\.[^.]+$/, "-temp.png");
      await addBackgroundColor(actualOutput, tempPath, args.addBg);
      // Replace original with the one with background
      const { rename } = await import("node:fs/promises");
      await rename(tempPath, actualOutput);
    }

    // Generate thumbnail with background color if requested (blog header mode)
    if (args.thumbnail) {
      const thumbPath = actualOutput.replace(/\.[^.]+$/, "-thumb.png");
      const THUMBNAIL_BG_COLOR = "EAEDF"; // UL brand background color for social previews
      await addBackgroundColor(actualOutput, thumbPath, THUMBNAIL_BG_COLOR);
      console.log(`\nBlog header mode: Created both versions`);
      console.log(`   Transparent: ${actualOutput}`);
      console.log(`   Thumbnail:   ${thumbPath}`);
    }
  } catch (error) {
    handleError(error);
  }
}

main();
