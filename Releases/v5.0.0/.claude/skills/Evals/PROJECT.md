System-Evals - AI Evaluation Framework

Tool Name: `evals`
Architecture: CLI-First (deterministic code execution with AI orchestration)
Storage: File-based (source of truth) + SQLite (query optimization)
Philosophy: Build deterministic tools, wrap with prompting

---

Overview

Evals is a comprehensive AI evaluation framework for testing both models and prompts across different use cases. It follows the CLI-First Architecture pattern: deterministic CLI commands wrapped with AI orchestration for consistency and reliability.

---

Requirements

Core Operations

. Use Case Management   - Create new use cases
   - List all use cases
   - Show use case details
   - Update use case configuration
   - Delete use cases

. Test Case Management   - Add test cases to use cases
   - List test cases for a use case
   - Show test case details
   - Update test cases
   - Delete test cases

. Golden Output Management   - Add golden outputs for test cases
   - Update golden outputs
   - Show golden output
   - Delete golden outputs

. Prompt Management   - Create new prompt version
   - List prompts for use case
   - Show prompt content
   - Update prompt
   - Delete prompt version

. Scorer Management   - List available scorers
   - Show scorer details
   - Test scorer on sample data

. Evaluation Execution   - Run evaluations for use case
   - Run with specific model
   - Run with specific prompt version
   - Run specific test case only
   - Run all models comparison
   - Run all prompts comparison

. Results Querying   - Query runs by use case
   - Query runs by model
   - Query runs by prompt version
   - Query runs by score range
   - Query runs by date range
   - Query runs by pass/fail status
   - Show run details
   - Show individual test results

. Comparison Operations   - Compare two specific runs
   - Compare models (same prompt)
   - Compare prompts (same model)
   - Compare across versions

. Data Management   - Rebuild SQLite database from files
   - Export results (JSON, CSV)
   - Clean old runs
   - Backup data

---

Complete CLI Interface

Global Options

```bash
--help, -h          Show help
--version, -v       Show version
--json              Output as JSON
--verbose           Verbose output
--quiet, -q         Minimal output
--config <path>     Custom config file
```

---

Command Reference

. Use Case Commands

`evals use-case create`
Create a new evaluation use case.

```bash
evals use-case create \
  --name <name> \
  --description <desc> \
  [--template <template-name>]

Examples:
evals use-case create --name newsletter-summary --description "Evaluate newsletter summaries"
evals use-case create --name blog-post --template summarization
```

Outputs:
- Creates `use-cases/<name>/` directory
- Creates `config.yaml` with default structure
- Creates `prompts/`, `test-cases/`, `golden-outputs/` subdirectories
- Prints success message with next steps

`evals use-case list`
List all use cases.

```bash
evals use-case list [--json]

Example output:
newsletter-summary    Evaluate newsletter summaries (tests, prompts)
blog-post             Evaluate blog posts (tests, prompts)
```

`evals use-case show`
Show detailed information about a use case.

```bash
evals use-case show --name <name> [--json]

Example:
evals use-case show --name newsletter-summary

Output:
Use Case: newsletter-summary
Description: Evaluate newsletter summaries
Test Cases: Prompts: versions (v.., v.., v..)
Models: (claude---sonnet, gpt-o)
Criteria: scorers (deterministic, AI-based)
Last Run: --:(passed /tests, score: .)
```

`evals use-case update`
Update use case configuration.

```bash
evals use-case update --name <name> --config <yaml-file>

Example:
evals use-case update --name newsletter-summary --config new-config.yaml
```

`evals use-case delete`
Delete a use case.

```bash
evals use-case delete --name <name> [--force]

Example:
evals use-case delete --name old-use-case --force
```

---

. Test Case Commands

`evals test-case add`
Add a test case to a use case.

```bash
evals test-case add \
  --use-case <name> \
  --id <test-id> \
  --input <json-file> \
  [--golden <md-file>]

Examples:
evals test-case add --use-case newsletter-summary --id --input test-.json
evals test-case add --use-case newsletter-summary --id --input test-.json --golden expected-.md
```

Input JSON Structure:
```json
{
  "id": "-tech-article",
  "description": "Tech news article summary",
  "category": "tech",
  "difficulty": "medium",
  "input": {
    "article": "Full article text...",
    "style": "casual",
    "target_length": "-sentences"
  },
  "metadata": {
    "tags": ["ai", "tech", "news"]
  }
}
```

`evals test-case list`
List test cases for a use case.

```bash
evals test-case list --use-case <name> [--json]

Example:
evals test-case list --use-case newsletter-summary

Output:
-tech-article     Tech news article summary (medium)
-long-form        Long-form content summary (hard)
-edge-case        Edge case testing (easy)
```

`evals test-case show`
Show test case details.

```bash
evals test-case show --use-case <name> --id <test-id> [--json]

Example:
evals test-case show --use-case newsletter-summary --id ```

`evals test-case update`
Update a test case.

```bash
evals test-case update \
  --use-case <name> \
  --id <test-id> \
  --input <json-file>

Example:
evals test-case update --use-case newsletter-summary --id --input updated-.json
```

`evals test-case delete`
Delete a test case.

```bash
evals test-case delete --use-case <name> --id <test-id> [--force]
```

---

. Golden Output Commands

`evals golden add`
Add a golden (expected) output for a test case.

```bash
evals golden add \
  --use-case <name> \
  --test-id <test-id> \
  --file <md-file>

Example:
evals golden add --use-case newsletter-summary --test-id --file expected-.md
```

`evals golden update`
Update a golden output.

```bash
evals golden update \
  --use-case <name> \
  --test-id <test-id> \
  --file <md-file>

Example:
evals golden update --use-case newsletter-summary --test-id --file new-expected-.md
```

`evals golden show`
Show golden output content.

```bash
evals golden show --use-case <name> --test-id <test-id>

Example:
evals golden show --use-case newsletter-summary --test-id ```

`evals golden delete`
Delete a golden output.

```bash
evals golden delete --use-case <name> --test-id <test-id> [--force]
```

---

. Prompt Commands

`evals prompt create`
Create a new prompt version.

```bash
evals prompt create \
  --use-case <name> \
  --version <version> \
  --file <txt-file> \
  [--description <desc>]

Examples:
evals prompt create --use-case newsletter-summary --version v..--file prompt.txt
evals prompt create --use-case newsletter-summary --version v..--file prompt-v..txt --description "Added tone guidance"
```

Version Format: Semantic versioning (v.., v.., v..)

`evals prompt list`
List prompts for a use case.

```bash
evals prompt list --use-case <name> [--json]

Example:
evals prompt list --use-case newsletter-summary

Output:
v..   Initial prompt (--)
v..   Added tone guidance (--)
v..   Restructured for clarity (--)
```

`evals prompt show`
Show prompt content.

```bash
evals prompt show --use-case <name> --version <version>

Example:
evals prompt show --use-case newsletter-summary --version v..```

`evals prompt update`
Update a prompt version.

```bash
evals prompt update \
  --use-case <name> \
  --version <version> \
  --file <txt-file>

Example:
evals prompt update --use-case newsletter-summary --version v..--file updated-prompt.txt
```

`evals prompt delete`
Delete a prompt version.

```bash
evals prompt delete --use-case <name> --version <version> [--force]
```

---

. Scorer Commands

`evals scorer list`
List all available scorers.

```bash
evals scorer list [--type <deterministic|ai-based|custom>] [--json]

Example output:
DETERMINISTIC:
  sentence-counter      Count sentences in output
  word-counter          Count words in output
  link-counter          Count links in output
  format-validator      Validate output format
AI-BASED:
  llm-judge            LLM-as-judge evaluation
  semantic-similarity  Semantic similarity to expected
  style-matcher        Match writing style
CUSTOM:
  newsletter-tone      Newsletter-specific tone evaluation
```

`evals scorer show`
Show scorer details and configuration.

```bash
evals scorer show --name <scorer-name> [--json]

Example:
evals scorer show --name sentence-counter

Output:
Scorer: sentence-counter
Type: deterministic
Description: Count sentences in output
Parameters:
  min (number): Minimum sentence count
  max (number): Maximum sentence count
Example:
  evals run --use-case foo --scorer sentence-counter --params '{"min":,"max":}'
```

`evals scorer test`
Test a scorer on sample data.

```bash
evals scorer test \
  --name <scorer-name> \
  --output <text-file> \
  --expected <expected-file> \
  [--params <json>]

Example:
evals scorer test --name sentence-counter --output sample.txt --params '{"min":,"max":}'

Output:
Scorer: sentence-counter
Score: .Pass: true
Details:
  Measured: sentences
  Expected: -sentences
  Explanation: Found sentences (expected -)
```

---

. Run Commands

`evals run`
Run evaluations.

```bash
evals run \
  --use-case <name> \
  [--model <model-id>] \
  [--prompt <version>] \
  [--test-case <test-id>] \
  [--all-models] \
  [--all-prompts] \
  [--dry-run] \
  [--verbose]

Examples:
Run with default model and latest prompt
evals run --use-case newsletter-summary

Run with specific model and prompt
evals run --use-case newsletter-summary --model claude---sonnet --prompt v..
Run specific test case only
evals run --use-case newsletter-summary --test-case 
Run all models with same prompt
evals run --use-case newsletter-summary --all-models --prompt v..
Run all prompts with same model
evals run --use-case newsletter-summary --all-prompts --model gpt-o

Dry run (show what would be tested)
evals run --use-case newsletter-summary --dry-run
```

Output:
```
Running evaluation: newsletter-summary
Model: claude---sonnet-Prompt: v..Test Cases: 
Test -tech-article............... PASS (score: .)
Test -long-form.................. PASS (score: .)
Test -edge-case.................. FAIL (score: .)
Test -technical.................. PASS (score: .)
Test -casual..................... PASS (score: .)

Results:
  Total:   Passed: (%)
  Failed: (%)
  Avg Score: .  Run ID: --__claude---sonnet_v..
Saved to: results/newsletter-summary/--__claude---sonnet_v../
```

---

. Query Commands

`evals query runs`
Query evaluation runs.

```bash
evals query runs \
  [--use-case <name>] \
  [--model <model-id>] \
  [--prompt <version>] \
  [--score-min <float>] \
  [--score-max <float>] \
  [--status <completed|failed|running>] \
  [--since <date>] \
  [--until <date>] \
  [--limit <n>] \
  [--offset <n>] \
  [--sort <field>] \
  [--json]

Examples:
Recent runs for use case
evals query runs --use-case newsletter-summary --limit 
Runs with score above threshold
evals query runs --score-min .
Runs for specific model
evals query runs --model claude---sonnet

Runs in date range
evals query runs --since ----until --
Failed runs
evals query runs --status failed

Combined filters
evals query runs --use-case newsletter-summary --model gpt-o --score-min .--limit ```

Output:
```
Found runs:

--: newsletter-summary  claude---sonnet  v.. . /passed
--: newsletter-summary  gpt-o             v.. . /passed
--: newsletter-summary  claude---sonnet  v.. . /passed
```

`evals query results`
Query individual test results.

```bash
evals query results \
  --run-id <run-id> \
  [--test-case <test-id>] \
  [--passed|--failed] \
  [--scorer <scorer-name>] \
  [--json]

Examples:
All results for a run
evals query results --run-id --__claude---sonnet_v..
Only failed tests
evals query results --run-id --__claude---sonnet_v..--failed

Specific test case
evals query results --run-id --__claude---sonnet_v..--test-case 
Results for specific scorer
evals query results --run-id --__claude---sonnet_v..--scorer llm-judge
```

---

. Compare Commands

`evals compare runs`
Compare two specific runs.

```bash
evals compare runs --run-a <run-id> --run-b <run-id> [--json]

Example:
evals compare runs \
  --run-a --__claude---sonnet_v..\
  --run-b --__gpt-o_v..
Output:
Comparing Runs:
  Run A: claude---sonnet v..(score: ., /passed)
  Run B: gpt-o v..(score: ., /passed)
Test-by-Test Comparison:
  -tech-article:    Run A: .  Run B: .  (Δ +.)
  -long-form:       Run A: .  Run B: .  (Δ +.)
  -edge-case:       Run A: .  Run B: .  (Δ -.)
  -technical:       Run A: .  Run B: .  (Δ +.)
  -casual:          Run A: .  Run B: .  (Δ +.)
Summary:
  Run A won on /tests
  Avg score difference: +.in favor of Run A
```

`evals compare models`
Compare models on same prompt.

```bash
evals compare models \
  --use-case <name> \
  --prompt <version> \
  [--models <model,model,...>] \
  [--json]

Example:
evals compare models --use-case newsletter-summary --prompt v..
Automatically finds most recent run for each model

Output:
Comparing Models on newsletter-summary (prompt v..):
  claude---sonnet:  . /passed  (--:)
  gpt-o:             . /passed  (--:)
  o-preview:         . /passed  (--:)
Winner: claude---sonnet (Δ +.vs nd place)
```

`evals compare prompts`
Compare prompts on same model.

```bash
evals compare prompts \
  --use-case <name> \
  --model <model-id> \
  [--versions <v,v,...>] \
  [--json]

Example:
evals compare prompts --use-case newsletter-summary --model claude---sonnet

Output:
Comparing Prompts on newsletter-summary (model claude---sonnet):
  v..:  . /passed  (--)
  v..:  . /passed  (--)
  v..:  . /passed  (--)
Best: v..(Δ +.vs baseline v..)
Progression: +.(v..→v..), +.(v..→v..)
```

---

. Data Commands

`evals db rebuild`
Rebuild SQLite database from files.

```bash
evals db rebuild [--force] [--verbose]

Example:
evals db rebuild --force

Output:
Rebuilding database from files...
Scanning use-cases/...
Found use cases
Found test results
Indexed runs
Database rebuilt successfully
```

`evals export`
Export results to various formats.

```bash
evals export \
  --run-id <run-id> \
  --format <json|csv|md> \
  --output <file>

Examples:
evals export --run-id --__claude---sonnet_v..--format json --output results.json
evals export --run-id --__claude---sonnet_v..--format csv --output results.csv
evals export --run-id --__claude---sonnet_v..--format md --output results.md
```

`evals clean`
Clean old runs.

```bash
evals clean \
  [--older-than <days>] \
  [--keep <n>] \
  [--use-case <name>] \
  [--dry-run]

Examples:
Delete runs older than days
evals clean --older-than 
Keep only last runs per use case
evals clean --keep 
Clean specific use case
evals clean --use-case newsletter-summary --older-than 
Show what would be deleted (don't actually delete)
evals clean --older-than --dry-run
```

`evals backup`
Backup all data.

```bash
evals backup --output <backup-file>

Example:
evals backup --output evals-backup---.tar.gz

Creates tarball of:
- use-cases/ directory
- results/ directory
- evals.db SQLite file
```

---

File Structure

```
~/.claude/skills/evals/
 PROJECT.md                    This file
 SKILL.md                      Skill definition

 cli/                          CLI implementation
    index.ts                  Main entry point
    commands/
       use-case.ts          Use case commands
       test-case.ts         Test case commands
       golden.ts            Golden output commands
       prompt.ts            Prompt commands
       scorer.ts            Scorer commands
       run.ts               Run commands
       query.ts             Query commands
       compare.ts           Compare commands
       data.ts              Data management commands
    lib/
        storage.ts           File + DB storage
        runner.ts            Evaluation runner
        output.ts            Output formatting
        validation.ts        Input validation

 scorers/                      Scorer implementations
    index.ts
    base.ts
    deterministic/
       sentence-counter.ts
       word-counter.ts
       link-counter.ts
       format-validator.ts
    ai-based/
       llm-judge.ts
       semantic-similarity.ts
       style-matcher.ts
    custom/
        newsletter-tone.ts

 use-cases/                    Evaluation use cases
    newsletter-summary/
       config.yaml
       prompts/
          v...txt
          v...txt
       test-cases/
          -tech-article.json
          -long-form.json
       golden-outputs/
           -expected.md
           -expected.md
    [other-use-cases]/

 results/                      Evaluation results (Git-ignored)
    newsletter-summary/
        --__claude---sonnet_v../
            run.json
            summary.json
            tests/
                -tech-article.json
                -long-form.json

 storage/
    evals.db                 SQLite database (query cache)
    schema.sql               Database schema

 types/                        TypeScript types
    use-case.ts
    scorer.ts
    result.ts
    config.ts

 package.json
 tsconfig.json
 README.md
```

---

Storage Strategy

Files (Source of Truth)
- Use case configs: `use-cases/<name>/config.yaml`
- Test cases: `use-cases/<name>/test-cases/.json`
- Golden outputs: `use-cases/<name>/golden-outputs/.md`
- Prompts: `use-cases/<name>/prompts/.txt`
- Results: `results/<use-case>/<run-id>/`

SQLite (Query Optimization)
- Tables: `eval_runs`, `test_results`, `scorer_results`
- Used ONLY for fast queries and analytics
- Can be rebuilt from files: `evals db rebuild`
- Enables complex queries without scanning JSON files

---

Implementation Phases

Phase : Core CLI (Week )
- [ ] CLI framework setup (Commander.js)
- [ ] Use case commands (create, list, show)
- [ ] Test case commands (add, list, show)
- [ ] Golden output commands (add, show)
- [ ] Prompt commands (create, list, show)
- [ ] File storage implementation
- [ ] SQLite schema and basic queries

Phase : Scorers & Runners (Week )
- [ ] Base scorer interface
- [ ] Deterministic scorers (types)
- [ ] AI-based scorers (LLM-judge, semantic similarity)
- [ ] Scorer pipeline
- [ ] Run command implementation
- [ ] Results storage (files + DB)

Phase : Query & Compare (Week )
- [ ] Query commands (runs, results)
- [ ] Compare commands (runs, models, prompts)
- [ ] Advanced SQLite queries
- [ ] Output formatters (human, JSON, CSV)

Phase : Data Management (Week )
- [ ] DB rebuild command
- [ ] Export commands
- [ ] Clean command
- [ ] Backup command
- [ ] Validation and error handling

---

Next Steps

. Implement core CLI framework with Commander.js
. Build use case management commands
. Implement file-based storage layer
. Set up SQLite database with schema
. Create deterministic scorers
. Build evaluation runner
. Implement query and compare commands

---

This design follows CLI-First Architecture: deterministic tools wrapped with AI orchestration.