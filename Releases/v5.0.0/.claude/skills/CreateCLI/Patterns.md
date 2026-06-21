Common CLI Patterns

Reusable patterns for TypeScript CLIs based on llcli and production CLIs.
---

CORE PATTERNS

. Configuration Loading

Pattern from llcli:
```typescript
interface Config {
  apiKey: string;
  baseUrl: string;
}

const DEFAULTS = {
  baseUrl: 'https://api.example.com',
  timeout: ,
  limit: ,
} as const;

function loadConfig(): Config {
  const envPath = join(homedir(), '.claude', '.env');

  try {
    const envContent = readFileSync(envPath, 'utf-');
    const apiKey = envContent
      .split('\n')
      .find(line => line.startsWith('API_KEY='))
      ?.split('=')[]
      ?.trim();

    if (!apiKey) {
      console.error('Error: API_KEY not found in ${PAI_DIR}/.env');
      console.error('Add: API_KEY=your_key_here');
      process.exit();
    }

    return {
      apiKey,
      baseUrl: process.env.API_BASE_URL || DEFAULTS.baseUrl,
    };
  } catch (error) {
    console.error('Error: Cannot read ${PAI_DIR}/.env');
    console.error('Create file: touch ${PAI_DIR}/.env');
    process.exit();
  }
}
```

Key principles:- Load from ${PAI_DIR}/.env (PAI standard)
- Clear error messages with resolution steps
- Defaults for optional config
- Type-safe Config interface

---

. API Client Pattern

Fetch wrapper with error handling:
```typescript
async function apiRequest<T>(
  config: Config,
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const queryParams = new URLSearchParams(params);
  const url = `${config.baseUrl}/${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Request failed:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit();
  }
}

// Usage
const data = await apiRequest<ResponseType>(config, 'endpoint', {
  param: 'value',
});
```

---

. Command Function Pattern

One function per command:
```typescript
/ Fetch items by date
  @param date - Date in YYYY-MM-DD format
 @param options - Command options
 /
async function fetchByDate(
  date: string,
  options: { limit?: number } = {}
): Promise<void> {
  const config = loadConfig();

  // Validate input
  if (!/^\d{}-\d{}-\d{}$/.test(date)) {
    console.error('Error: Date must be YYYY-MM-DD format');
    console.error('Example: --');
    process.exit();
  }

  // Build params
  const params = {
    date,
    limit: (options.limit || DEFAULTS.limit).toString(),
  };

  // Make request
  const data = await apiRequest<ApiResponse>(config, 'items', params);

  // Output JSON
  console.log(JSON.stringify(data, null, ));
}
```

Principles:- Clear function signature
- Input validation with helpful errors
- Use loadConfig() inside function
- JSON output to stdout
- Errors to stderr

---

. Argument Parsing Pattern

Manual parsing with validation:
```typescript
function parseArguments(args: string[]): {
  command: string;
  args: string[];
  options: Record<string, string | boolean>;
} {
  if (args.length === ) {
    return { command: 'help', args: [], options: {} };
  }

  const command = args[];
  const options: Record<string, string | boolean> = {};
  const commandArgs: string[] = [];

  for (let i = ; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      // Long option
      const key = arg.slice();
      const next = args[i + ];

      if (next && !next.startsWith('-')) {
        options[key] = next;
        i++; // Skip next
      } else {
        options[key] = true;
      }
    } else if (arg.startsWith('-')) {
      // Short option
      const key = arg.slice();
      options[key] = true;
    } else {
      // Positional argument
      commandArgs.push(arg);
    }
  }

  return { command, args: commandArgs, options };
}
```

---

. Help Text Pattern

Comprehensive, actionable help:
```typescript
function showHelp(): void {
  console.log(`
${CLI_NAME} - ${DESCRIPTION}
${'='.repeat(CLI_NAME.length + DESCRIPTION.length + )}

USAGE:
  ${CLI_NAME} <command> [arguments] [options]

COMMANDS:
  command<arg>               Description of command  command[optional]          Description of command  help, --help, -h             Show this help
  version, --version, -v       Show version

OPTIONS:
  --limit <n>                  Max results (default: )
  --format <type>              Output format (json, csv)
  --verbose                    Verbose logging

EXAMPLES:
  Common use case   $ ${CLI_NAME} commandvalue

  Common use case   $ ${CLI_NAME} command--limit 
  Piping to jq
  $ ${CLI_NAME} commandvalue | jq '.data[]'

OUTPUT:
  JSON to stdout (deterministic)
  Errors to stderr
  Exit code: = success, = error

CONFIGURATION:
  API Key: ${PAI_DIR}/.env (API_KEY=your_key)
  Base URL: ${DEFAULTS.baseUrl}

PHILOSOPHY:
  ${CLI_NAME} follows PAI's CLI-First Architecture:
  - Deterministic: Same input → Same output
  - Clean: Single responsibility
  - Composable: Pipes to jq, grep, etc.
  - Documented: This help + README
  - Testable: Predictable behavior

For full documentation: ~/.claude/Bin/${CLI_NAME}/README.md
Version: ${VERSION}
`);
}
```

---

. Error Handling Pattern

Type-safe custom errors:
```typescript
class CLIError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly hint?: string,
    public readonly exitCode: number =   ) {
    super(message);
    this.name = 'CLIError';
  }
}

function handleError(error: unknown): never {
  if (error instanceof CLIError) {
    console.error(`Error [${error.code}]: ${error.message}`);
    if (error.hint) {
      console.error(`Hint: ${error.hint}`);
    }
    process.exit(error.exitCode);
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error.message);
    if (program.opts().debug) {
      console.error(error.stack);
    }
  } else {
    console.error('Unknown error:', error);
  }

  process.exit();
}

// Usage
throw new CLIError(
  'Configuration file not found',
  'ERR_NO_CONFIG',
  'Run: mycli init'
);

// Global handler
process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);
```

---

. Main Entry Pattern

Structured main with routing:
```typescript
async function main(): Promise<void> {
  const args = process.argv.slice();

  // Help/version shortcuts
  if (!args.length || args[] === 'help' || args[] === '--help') {
    showHelp();
    return;
  }

  if (args[] === 'version' || args[] === '--version') {
    console.log(`${CLI_NAME} version ${VERSION}`);
    return;
  }

  // Parse arguments
  const { command, args: cmdArgs, options } = parseArguments(args);

  // Route to command
  switch (command) {
    case 'command':
      await command(cmdArgs[], options);
      break;

    case 'command':
      await command(cmdArgs, options);
      break;

    default:
      throw new CLIError(
        `Unknown command: ${command}`,
        'ERR_UNKNOWN_COMMAND',
        `Run "${CLI_NAME} --help" for usage`
      );
  }
}

// Execute
main().catch(handleError);
```

---

. File I/O Pattern

Safe file operations:
```typescript
import { readFile, writeFile, access } from 'fs/promises';
import { constants } from 'fs';

async function readJsonFile<T>(path: string): Promise<T> {
  try {
    // Check file exists and is readable
    await access(path, constants.R_OK);

    const content = await readFile(path, 'utf-');
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new CLIError(
        `File not found: ${path}`,
        'ERR_FILE_NOT_FOUND',
        'Check the file path'
      );
    }

    throw new CLIError(
      `Cannot read file: ${path}`,
      'ERR_FILE_READ',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

async function writeJsonFile<T>(path: string, data: T): Promise<void> {
  try {
    const json = JSON.stringify(data, null, );
    await writeFile(path, json, 'utf-');
  } catch (error) {
    throw new CLIError(
      `Cannot write file: ${path}`,
      'ERR_FILE_WRITE',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
```

---

. Progress Indicator Pattern

For long operations:
```typescript
import ora from 'ora';

async function processMany(items: string[]): Promise<void> {
  const spinner = ora({
    text: `Processing ${items.length} items...`,
    spinner: 'dots',
  }).start();

  try {
    for (let i = ; i < items.length; i++) {
      spinner.text = `Processing ${i + }/${items.length}: ${items[i]}`;
      await processItem(items[i]);
    }

    spinner.succeed(`Processed ${items.length} items`);
  } catch (error) {
    spinner.fail('Processing failed');
    throw error;
  }
}
```

---

. Testing Pattern

Vitest for CLIs:
```typescript
import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI', () => {
  it('shows help', async () => {
    const { stdout } = await execAsync('./cli.ts --help');
    expect(stdout).toContain('USAGE:');
    expect(stdout).toContain('COMMANDS:');
  });

  it('handles errors gracefully', async () => {
    await expect(
      execAsync('./cli.ts invalid-command')
    ).rejects.toThrow();
  });

  it('outputs valid JSON', async () => {
    const { stdout } = await execAsync('./cli.ts command test');
    const data = JSON.parse(stdout);
    expect(data).toHaveProperty('result');
  });
});
```

---

PATTERN CHECKLIST

When building a CLI, use these patterns:

- [ ] Configuration loading (from ${PAI_DIR}/.env)
- [ ] API client with error handling
- [ ] One function per command
- [ ] Manual argument parsing (Tier ) or Commander (Tier )
- [ ] Comprehensive help text
- [ ] Custom CLIError class
- [ ] Main entry with routing
- [ ] Safe file I/O (if needed)
- [ ] Progress indicators (if long operations)
- [ ] Tests (Vitest integration)

---

All patterns battle-tested in llcli and production CLIs.