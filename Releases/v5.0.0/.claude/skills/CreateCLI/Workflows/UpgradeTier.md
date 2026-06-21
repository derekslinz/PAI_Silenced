---
workflow: upgrade-tier
purpose: Migrate CLI from Tier (manual) to Tier (Commander.js)
---

Upgrade Tier Workflow

Migrate from manual parsing to Commander.js when CLI grows complex.
---

PURPOSE

Convert Tier CLI (llcli-style) to Tier (Commander.js) when complexity demands it.

---

WHEN TO USE

Indicators to upgrade:- + commands (switch statement unwieldy)
- Need subcommands (git-style: `cli convert json csv`)
- Plugin architecture needed
- Complex option combinations
- Multiple output formats

Rule:Don't upgrade prematurely. Tier handles -commands fine.

---

MIGRATION STEPS

. Install Commander.js

```bash
cd ~/.claude/Bin/[cli-name]/
bun add commander
```

. Create Commander Structure

```typescript
!/usr/bin/env bun

import { Command } from 'commander';

const program = new Command();

program
  .name('[cli-name]')
  .description('[description from old CLI]')
  .version('..'); // Bump major version
```

. Convert Commands

Before (Tier ):```typescript
async function fetchData(arg: string, limit: number): Promise<void> {
  // ...
}

switch (command) {
  case 'fetch':
    await fetchData(args[], limit);
    break;
}
```

After (Tier ):```typescript
program
  .command('fetch <arg>')
  .option('-l, --limit <number>', 'limit results', '')
  .description('Fetch data')
  .action(async (arg: string, options) => {
    const limit = parseInt(options.limit, );
    await fetchData(arg, limit);
  });
```

. Preserve Help Quality

Don't let auto-generated help be worse than manual help.

```typescript
program
  .command('fetch <query>')
  .description('Search and fetch data')
  .option('-l, --limit <n>', 'max results', '')
  .addHelpText('after', `
Examples:
  $ ${program.name()} fetch "keyword" --limit   $ ${program.name()} fetch "api query"

Output: JSON to stdout
`);
```

. Test All Commands

```bash
./cli.ts --help
./cli.ts fetch test
./cli.ts [each-command]
```

. Update Documentation

```markdown
Breaking Changes (v..)

Now uses Commander.js for better command organization.

Migration:- All commands work the same
- Help text improved
- Added subcommand support

No API changes - drop-in replacement.
```

---

BEFORE/AFTER COMPARISON

Before (Tier )
```typescript
// Manual parsing, ~lines
async function main() {
  const args = process.argv.slice();
  const command = args[];
  switch (command) {
    case 'fetch': /... /
    case 'create': /... /
    // ... more cases
  }
}
```

After (Tier )
```typescript
// Commander.js, ~lines (cleaner)
program
  .command('fetch <query>').action(fetchCommand)
  .command('create <name>').action(createCommand);
  // ... more commands

program.parse();
```

---

CHECKLIST

- [ ] Commander.js installed
- [ ] All commands converted
- [ ] Help text quality maintained
- [ ] All tests pass
- [ ] README updated (breaking changes)
- [ ] Version bumped to ..- [ ] Users notified if published

---

Note:Most CLIs NEVER need this upgrade. Tier is production-ready indefinitely.
