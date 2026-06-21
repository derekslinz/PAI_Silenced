CLI Framework Comparison

Comprehensive analysis of TypeScript CLI frameworks for informed tier selection
---

Quick Recommendation Matrix

| Use Case | Framework | Why |
|----------|-----------|-----|
| API Client(-commands) | Manual Parsing (Tier ) | Zero deps, lines, production-ready |
| File Processor(simple args) | Manual Parsing (Tier ) | Fast development, type-safe, composable |
| Multi-Tool(+ commands) | Commander.js (Tier ) | Subcommands, auto-help, proven |
| Plugin System(extensible) | oclif (Tier ) | Enterprise-grade, reference only |

Rule:Default to Manual → escalate to Commander → reference oclif only

---

Framework Comparison Table

| Framework | Stars | Bundle Size | TypeScript | Best For | Tier |
|-----------|-------|-------------|------------|----------|----------|
| Manual Parsing| N/A | KB | Native | Simple CLIs (llcli) | Tier DEFAULT |
| Commander.js| K+ | ~KB | Built-in | General CLIs | Tier |
| oclif| K+ | + MB | First-class | Enterprise plugins | Tier (ref only) |
| cleye| N/A | Small | Schema inference | Modern TS CLIs | Alternative |
| citty| N/A | Moderate | Discriminated unions | Complex type safety | Alternative |
| Yargs| K+ | Larger | @types | Config-heavy | Not recommended |

---

⃣ TIER : Manual Parsing (llcli Pattern)

Pattern

```typescript
!/usr/bin/env bun

async function main() {
  const args = process.argv.slice();

  if (args.length === || args[] === '--help') {
    showHelp();
    return;
  }

  const command = args[];

  switch (command) {
    case 'today':
      await fetchToday();
      break;
    case 'date':
      if (!args[]) {
        console.error('Error: date requires YYYY-MM-DD argument');
        process.exit();
      }
      await fetchDate(args[]);
      break;
    case 'search':
      const keyword = args[];
      const limitIdx = args.indexOf('--limit');
      const limit = limitIdx !== -? parseInt(args[limitIdx + ]) : ;
      await fetchSearch(keyword, limit);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      process.exit();
  }
}

main().catch(error => {
  console.error('Fatal:', error);
  process.exit();
});
```

Pros
- Zero dependencies (no node_modules bloat)
- Complete control over parsing logic
- Type-safe with TypeScript interfaces
- -lines total (easy to understand)
- Fast development (no framework learning curve)
- Proven pattern (llcli is production-ready)
- Perfect for Bun runtime
- Deterministic behavior

Cons
- Manual help text (but this ensures quality)
- Manual argument parsing (but simple)
- No built-in subcommand routing (use Tier if needed)
- Repetitive for + commands (escalate at that point)

When to Use (DEFAULT)
- -commands
- API client wrappers
- Data transformers
- File processors
- Simple automation tools
- JSON output only
- Fast development priority

Reference Implementation
Location:`~/.claude/Bin/llcli/llcli.ts` (lines)
Commands:today, date, search
Pattern:Exactly what this tier generates

---

⃣ TIER : Commander.js

Pattern

```typescript
!/usr/bin/env bun

import { Command } from 'commander';

const program = new Command();

program
  .name('mycli')
  .description('Production CLI tool')
  .version('..');

program
  .command('convert <format> <input>')
  .option('-o, --output <file>', 'output file')
  .option('--verbose', 'verbose logging')
  .action((format: string, input: string, options) => {
    console.log(`Converting ${input} to ${format}`);
    if (options.output) {
      console.log(`Output: ${options.output}`);
    }
  });

program
  .command('validate')
  .argument('<file>', 'file to validate')
  .option('--strict', 'strict mode')
  .action((file: string, options) => {
    console.log(`Validating ${file}`);
  });

program.parse();
```

Pros
- Auto-generated help (from command definitions)
- Subcommand routing built-in
- Fluent API (readable, chainable)
- TypeScript definitions included
- Large community (K+ stars)
- Well-documented
- Option parsing automatic
- Lightweight (~KB, zero sub-dependencies)

Cons
- Framework dependency (not zero-dep like Tier )
- Learning curve (need to understand API)
- Opinionated structure
- Overkill for simple CLIs (use Tier instead)
- Bun may prefer zero-dep approach

When to Use (ESCALATION)
- + commands needing organization
- Subcommands (e.g., `cli convert json csv` vs `cli convert csv json`)
- Plugin architecture needed
- Complex option combinations
- Multiple output format engines
- Git-style command groups

Example Use Case
```bash
Data transformation CLI with subcommands
data-cli convert json csv input.json --output data.csv
data-cli convert csv json input.csv
data-cli validate schema data.json --strict
data-cli analyze stats data.csv
data-cli analyze trends data.csv --window d
```

Pattern:Commands naturally group into categories (convert, validate, analyze)

---

⃣ TIER : oclif (Reference Only)

Pattern

```typescript
import { Command, Flags, Args } from '@oclif/core';

export default class Hello extends Command {
  static description = 'Say hello';

  static examples = [
    '<%= config.bin %> <%= command.id %> --name World',
  ];

  static flags = {
    name: Flags.string({
      char: 'n',
      description: 'name to greet',
      required: true,
    }),
    verbose: Flags.boolean({ char: 'v' }),
  };

  static args = {
    file: Args.string({ description: 'file to process' }),
  };

  async run() {
    const { flags, args } = await this.parse(Hello);
    this.log(`Hello ${flags.name}!`);
  }
}
```

Pros
- Enterprise-grade plugin system
- Code generation (`oclif generate command`)
- Topics for hierarchical commands
- Auto-updates mechanism
- Multi-command CLIs (Heroku, Salesforce scale)
- Class-based commands (OOP style)
- ES modules + CommonJS compatible

Cons
- Heavy bundle size (+ MB)
- Steep learning curve
- Complex setup
- Overkill for % of CLIs
- Not aligned with PAI's minimal approach

When to Reference (RARE)
- Enterprise plugin systems (Heroku CLI scale)
- + commands with complex organization
- Auto-update mechanisms critical
- Multi-tenant CLI platforms

Note:This skill does NOT generate oclif CLIs. Documentation only for reference.

---

RESEARCH FINDINGS: Type-Safe Frameworks

cleye (Schema-Driven Inference)

Pattern:```typescript
import { cli } from 'cleye';

const argv = cli({
  name: 'mycli',
  flags: {
    noCache: {
      type: Boolean,
      description: 'Disable cache',
    },
    tsconfig: {
      type: String,
      description: 'Path to tsconfig',
    },
  },
  parameters: ['<script path>'],
});

// argv.flags.noCache → boolean
// argv.flags.tsconfig → string | undefined
// argv._.scriptPath → string | undefined
```

Key Insight:TypeScript infers full shape from flag definitions (zero manual typing)

Use When:- Zero boilerplate preference
- Modern TypeScript CLI
- Full type inference needed

Trade-off vs Tier :- + Type inference automatic
- - Framework dependency
- - Less control over parsing

---

citty (Discriminated Unions)

Pattern:```typescript
import { defineCommand, runMain } from 'citty';

const convert = defineCommand({
  meta: {
    name: 'convert',
    description: 'Convert files',
  },
  args: {
    format: {
      type: 'positional',
      description: 'Output format',
      required: true,
    },
    strict: {
      type: 'boolean',
      description: 'Strict mode',
    },
  },
  async run({ args }) {
    // args.format → string (required)
    // args.strict → boolean | undefined
    console.log(`Converting to ${args.format}`);
  },
});

runMain(convert);
```

Key Insight:Discriminated unions provide exhaustive type checking

Use When:- Complex command trees
- Type safety critical
- Argument validation needed

Trade-off vs Tier :- + Advanced type safety
- - Framework abstraction
- - Additional dependency

---

DECISION CRITERIA

Choose Manual Parsing (Tier ) If:
- [ ] CLI has -simple commands
- [ ] Commands take basic arguments (strings, numbers, flags)
- [ ] Output is JSON only
- [ ] No subcommand grouping needed
- [ ] Zero dependencies preferred
- [ ] Fast development critical
- [ ] Following llcli pattern

→ % of CLIs should use Tier 
---

Choose Commander.js (Tier ) If:
- [ ] CLI has + commands needing organization
- [ ] Subcommands required (git-style: `cli category command`)
- [ ] Complex nested options
- [ ] Plugin architecture planned
- [ ] Multiple output formats (JSON, table, CSV)
- [ ] Auto-generated help essential

→ % of CLIs need Tier 
---

Reference oclif (Tier ) If:
- [ ] Enterprise plugin system (Heroku/Salesforce scale)
- [ ] + commands with topics
- [ ] Auto-update mechanism
- [ ] Multi-tenant platform

→ % of CLIs (NOT generated by this skill)
---

llcli Pattern Analysis

Why Manual Parsing Works

llcli demonstrates:. lines total- Complete CLI with docs
. Zero dependencies- No node_modules needed
. Type-safe- Full TypeScript interfaces
. Production-ready- Error handling, help, validation
. Composable- JSON output pipes everywhere
. Documented- README explains philosophy

Key Insight:For API wrappers and simple tools, manual parsing is SUPERIOR to frameworks because:
- Complete control over behavior
- No framework magic to debug
- Easier to understand and modify
- Faster to develop (no API to learn)
- Deterministic (no framework updates breaking things)

When llcli Pattern Breaks Down

Indicators to escalate:- + commands making switch statement unwieldy
- Need for subcommand grouping (convert json csv vs convert csv json)
- Plugin/extension system required
- Complex option validation across commands

At that point → Tier (Commander.js)
---

Best Practices

. Start Tier , Escalate When ProvenDon't guess complexity. Build simple first.

. Frameworks Are Not FreeEvery dependency is debt. Justify it.

. Type Safety > FrameworksManual parsing with TypeScript beats framework without types.

. Help Text Quality MattersAuto-generated help is convenient but often poor quality. Manual help (like llcli) is better.

. Composability > FeaturesJSON output + pipes > built-in table rendering.

. Test ImmediatelyRun `--help` before declaring framework choice successful.

. Read Real CodeStudy llcli, not just framework docs.

. Benchmark SizeCheck dist/ folder size. Tier CLIs are <KB.

---

Additional Research

Yargs (NOT Recommended for PAI)

Why not recommended:- Larger bundle size than Commander
- Less TypeScript-friendly
- Verbose syntax
- Async typing issues

Use Commander.js instead if escalating from Tier .
---

Ink (NOT Recommended for General CLIs)

Why not recommended:- React-based (massive overhead)
- Interactive UIs (not deterministic)
- Large bundle size
- Overkill for data processing

Use for:Dashboard UIs, dev servers with live updates

Not for:API clients, file processors, automation

---

Final Recommendation

For PAI createcli skill:
. Default:Tier (Manual Parsing / llcli pattern)
. Escalation:Tier (Commander.js) when decision tree indicates
. Reference:Tier (oclif) for documentation only

Philosophy:The best framework is no framework until proven otherwise.

---

Sources:- llcli production implementation (~/.claude/Bin/llcli/)
- Commander.js .x documentation
- oclif core documentation
- Perplexity research (sub-queries on CLI frameworks)
- Codex research (tsx, vite, next, bun CLI analysis)
