!/usr/bin/env bun

/ generate-midjourney-image - Midjourney Image Generation CLI
  Generate images using Midjourney via Discord bot integration.
 Follows llcli pattern for deterministic, composable CLI design.
  Usage:
   generate-midjourney-image --prompt "..." --aspect-ratio :--output /tmp/image.png
  @see ~/.claude/skills/art/SKILL.md
 /

import { DiscordBotClient } from '../lib/discord-bot.js';
import { MidjourneyClient, MidjourneyError } from '../lib/midjourney-client.js';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
}

// ============================================================================
// Types
// ============================================================================

interface CLIArgs {
  prompt: string;
  aspectRatio: string;
  version: string;
  stylize: number;
  quality: number;
  chaos?: number;
  weird?: number;
  tile: boolean;
  output: string;
  timeout: number;
}

// ============================================================================
// Configuration
// ============================================================================

const DEFAULTS = {
  aspectRatio: ':',
  version: process.env.MIDJOURNEY_DEFAULT_VERSION || '.',
  stylize: parseInt(process.env.MIDJOURNEY_DEFAULT_STYLIZE || ''),
  quality: parseInt(process.env.MIDJOURNEY_DEFAULT_QUALITY || ''),
  tile: false,
  output: '/tmp/midjourney-image.png',
  timeout: ,
};

// ============================================================================
// Error Handling
// ============================================================================

class CLIError extends Error {
  constructor(message: string, public exitCode: number = ) {
    super(message);
    this.name = 'CLIError';
  }
}

function handleError(error: unknown): never {
  if (error instanceof MidjourneyError) {
    console.error(`\nMidjourney Error: ${error.message}`);
    console.error(`   Type: ${error.type}`);
    if (error.originalPrompt) {
      console.error(`   Prompt: ${error.originalPrompt}`);
    }
    if (error.suggestion) {
      console.error(`   Suggestion: ${error.suggestion}`);
    }
    process.exit();
  }

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
// Help Text
// ============================================================================

function showHelp(): void {
  console.log(`
generate-midjourney-image - Midjourney Image Generation CLI

Generate images using Midjourney via Discord bot integration.

USAGE:
  generate-midjourney-image --prompt "<prompt>" [OPTIONS]

REQUIRED:
  --prompt <text>         Image generation prompt (quote if contains spaces)

OPTIONS:
  --aspect-ratio <ratio>  Aspect ratio (default: :)
                          Valid: :, :, :, :, :, :, :, :, :, :, :, :, :  --version <version>     Midjourney version (default: ${DEFAULTS.version})
                          Valid: ., , ., ., , niji, niji   --stylize <value>       Stylization -(default: ${DEFAULTS.stylize})
  --quality <value>       Quality: ., ., , (default: ${DEFAULTS.quality})
  --chaos <value>         Chaos -(optional)
  --weird <value>         Weird -(optional)
  --tile                  Enable tiling mode (default: false)
  --output <path>         Output file path (default: ${DEFAULTS.output})
  --timeout <seconds>     Max wait time (default: ${DEFAULTS.timeout})

ENVIRONMENT VARIABLES:
  DISCORD_BOT_TOKEN           Discord bot token (required)
  MIDJOURNEY_CHANNEL_ID       Channel ID for Midjourney (required)
  MIDJOURNEY_DEFAULT_VERSION  Default Midjourney version
  MIDJOURNEY_DEFAULT_QUALITY  Default quality setting
  MIDJOURNEY_DEFAULT_STYLIZE  Default stylize setting

EXAMPLES:
  Standard blog header
  generate-midjourney-image \\
    --prompt "abstract flowing data streams, minimal shapes, Tokyo Night colors" \\
    --aspect-ratio :\\
    --output /tmp/header.png

  High quality square image
  generate-midjourney-image \\
    --prompt "geometric network visualization, abstract tech concept" \\
    --aspect-ratio :\\
    --quality \\
    --output /tmp/square.png

  Creative with high stylization
  generate-midjourney-image \\
    --prompt "flowing organic shapes, data visualization" \\
    --stylize \\
    --weird `);
}

// ============================================================================
// Argument Parsing
// ============================================================================

function parseArgs(args: string[]): CLIArgs {
  const result: Partial<CLIArgs> = {
    aspectRatio: DEFAULTS.aspectRatio,
    version: DEFAULTS.version,
    stylize: DEFAULTS.stylize,
    quality: DEFAULTS.quality,
    tile: DEFAULTS.tile,
    output: DEFAULTS.output,
    timeout: DEFAULTS.timeout,
  };

  for (let i = ; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--help':
      case '-h':
        showHelp();
        process.exit();
        break;

      case '--prompt':
        result.prompt = args[++i];
        break;

      case '--aspect-ratio':
      case '--ar':
        result.aspectRatio = args[++i];
        break;

      case '--version':
      case '-v':
        result.version = args[++i];
        break;

      case '--stylize':
      case '-s':
        result.stylize = parseInt(args[++i]);
        break;

      case '--quality':
      case '-q':
        result.quality = parseFloat(args[++i]);
        break;

      case '--chaos':
        result.chaos = parseInt(args[++i]);
        break;

      case '--weird':
        result.weird = parseInt(args[++i]);
        break;

      case '--tile':
        result.tile = true;
        break;

      case '--output':
      case '-o':
        result.output = args[++i];
        break;

      case '--timeout':
        result.timeout = parseInt(args[++i]);
        break;

      default:
        throw new CLIError(`Unknown argument: ${arg}`);
    }
  }

  // Validate required args
  if (!result.prompt) {
    throw new CLIError('Missing required argument: --prompt');
  }

  return result as CLIArgs;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  try {
    // Load API keys from ${PAI_DIR}/.env
    await loadEnv();

    // Parse arguments
    const args = parseArgs(process.argv.slice());

    // Validate environment variables
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.MIDJOURNEY_CHANNEL_ID;

    if (!botToken) {
      throw new CLIError(
        'Missing DISCORD_BOT_TOKEN environment variable. Add it to ${PAI_DIR}/.env'
      );
    }

    if (!channelId) {
      throw new CLIError(
        'Missing MIDJOURNEY_CHANNEL_ID environment variable. Add it to ${PAI_DIR}/.env'
      );
    }

    // Validate Midjourney options
    MidjourneyClient.validateOptions({
      prompt: args.prompt,
      aspectRatio: args.aspectRatio,
      version: args.version,
      stylize: args.stylize,
      quality: args.quality,
      chaos: args.chaos,
      weird: args.weird,
      tile: args.tile,
      timeout: args.timeout,
    });

    console.log('Midjourney Image Generation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Prompt: ${args.prompt}`);
    console.log(`Aspect Ratio: ${args.aspectRatio}`);
    console.log(`Version: ${args.version}`);
    console.log(`Stylize: ${args.stylize}`);
    console.log(`Quality: ${args.quality}`);
    if (args.chaos) console.log(`Chaos: ${args.chaos}`);
    if (args.weird) console.log(`Weird: ${args.weird}`);
    if (args.tile) console.log(`Tile: enabled`);
    console.log(`Output: ${args.output}`);
    console.log(`Timeout: ${args.timeout}s`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Initialize Discord bot
    const discordBot = new DiscordBotClient({
      token: botToken,
      channelId: channelId,
    });

    // Initialize Midjourney client
    const midjourneyClient = new MidjourneyClient(discordBot);

    try {
      // Connect to Discord
      await discordBot.connect();

      // Generate image
      const result = await midjourneyClient.generateImage({
        prompt: args.prompt,
        aspectRatio: args.aspectRatio,
        version: args.version,
        stylize: args.stylize,
        quality: args.quality,
        chaos: args.chaos,
        weird: args.weird,
        tile: args.tile,
        timeout: args.timeout,
      });

      // Download image
      await discordBot.downloadImage(result.imageUrl, args.output);

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Success!');
      console.log(`   Image URL: ${result.imageUrl}`);
      console.log(`   Saved to: ${args.output}`);
      console.log(`   Message ID: ${result.messageId}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Disconnect
      await discordBot.disconnect();

      process.exit();
    } catch (error) {
      // Ensure we disconnect even on error
      await discordBot.disconnect();
      throw error;
    }
  } catch (error) {
    handleError(error);
  }
}

// Run
main();
