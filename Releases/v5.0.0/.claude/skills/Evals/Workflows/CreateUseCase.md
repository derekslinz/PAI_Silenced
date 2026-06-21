CreateUseCase Workflow

Create a new evaluation use case with test cases and scoring criteria.

---

Prerequisites

- Clear understanding of what you're evaluating
- Example inputs and expected outputs
- Quality criteria defined

Execution

Step : Gather Requirements

Ask the user:
. What is this use case evaluating? (prompt, model, task)
. What does "good" output look like?
. What specific criteria matter? (accuracy, format, style, etc.)
. Do you have example inputs and outputs?

Step : Create Use Case Directory

```bash
mkdir -p ~/.claude/skills/Evals/UseCases/<name>/{test-cases,golden-outputs,prompts}
```

Step : Create Config File

Create `~/.claude/skills/Evals/UseCases/<name>/config.yaml`:

```yaml
name: <use_case_name>
description: |
  <What this use case evaluates and why>

version: ".."

What we're testing
target:
  type: prompt  or "model", "agent"
  path: prompts/v...md  relative path

Scoring criteria
criteria:
  deterministic:
    - scorer: "sentence-counter"
      weight: .      params:
        min:         max:     - scorer: "format-validator"
      weight: .      params:
        required_sections: ["summary", "analysis"]
    - scorer: "voice-validator"
      weight: .      params:
        forbidden_words: ["unveils", "plummeted", "groundbreaking"]
        check_contractions: true

  ai_based:
    - scorer: "llm-judge-accuracy"
      weight: .      params:
        judge_model: "claude---sonnet-"
        reasoning_first: true
        scale: "-"
    - scorer: "llm-judge-style"
      weight: .      params:
        judge_model: "claude---sonnet-"
        reasoning_first: true
        scale: "-"

Pass/fail threshold
pass_threshold: .
Models to evaluate against
models:
  - claude---sonnet-  - claude---haiku-  - gpt-o
```

Step : Create Initial Prompt Version

Create `~/.claude/skills/Evals/UseCases/<name>/prompts/v...md`:

```markdown
<Task Name> Prompt v..
System Context

<System prompt or context>

Task Instructions

<Specific instructions for the task>

Output Format

<Expected output format specification>

Examples (Optional)

<Few-shot examples if applicable>
```

Step : Create Test Cases

Create test cases in `~/.claude/skills/Evals/UseCases/<name>/test-cases/`:

Each test case is a YAML file:

```yaml
test-cases/-basic.yaml
id: "-basic"
name: "Basic functionality test"
description: "Tests standard use case"
priority: high

input:
  content: |
    <The input content to test>
  variables:
    key: value

expected:
  format: "structured"  or "freeform"
  contains:
    - "expected phrase "
    - "expected phrase "
  excludes:
    - "unwanted phrase"
  length:
    min_words:     max_words: 
golden_output: "../golden-outputs/-basic.md"  Optional reference
```

Recommended Test Case Distribution:- -Easycases (standard inputs, clear expectations)
- -Mediumcases (typical edge cases)
- -Hardcases (ambiguous inputs, tricky scenarios)

Step : Create Golden Outputs (Optional)

If you have reference "perfect" outputs, add them:

```bash
golden-outputs/-basic.md
<The ideal output for test case >
```

Golden outputs serve as:
- Reference for AI judges
- Baseline for comparison
- Documentation of expected behavior

Step : Create README

Create `~/.claude/skills/Evals/UseCases/<name>/README.md`:

```markdown
<Use Case Name>

Purpose

<What this use case evaluates and why it matters>

Target

<What's being tested - prompt, model, agent>

Quality Criteria

Deterministic (%)
- Sentence Count(%): -sentences per summary
- Format(%): Required sections present
- Voice(%): Matches target style

AI-Based (%)
- Accuracy(%): Factual correctness
- Style(%): Voice authenticity

Test Cases

| ID | Name | Priority | Description |
|----|------|----------|-------------|
| | Basic | High | Standard input |
| | Edge | Medium | Edge case handling |
| ... | ... | ... | ... |

Running Evaluations

\`\`\`bash
bun run ~/.claude/skills/Evals/EvalServer/cli-run.ts --use-case <name>
\`\`\`

Version History

- v..: Initial version
```

Step : Validate Use Case

```bash
Check structure
ls -la ~/.claude/skills/Evals/UseCases/<name>/

Validate config
bun run ~/.claude/skills/Evals/EvalServer/cli.ts use-case show <name>
```

Step : Run Initial Eval

```bash
Run first evaluation to verify setup
bun run ~/.claude/skills/Evals/EvalServer/cli-run.ts \
  --use-case <name> \
  --test-id -basic \
  --verbose
```

Review:
- Does the scorer configuration work?
- Are test cases properly formatted?
- Do AI judges produce valid output?

Best Practices

Test Case Design

. Cover the distribution: Easy, medium, and hard cases
. Include edge cases: Empty inputs, very long inputs, malformed data
. Version inputs: Track which test cases apply to which prompt versions
. Document failures: When tests fail, understand why before fixing

Criteria Weights

| Pattern | Deterministic | AI-Based |
|---------|---------------|----------|
| Format-critical | -% | -% |
| Quality-critical | -% | -% |
| Balanced | % | % |

Prompt Versioning

Use semantic versioning:
- v..→ v..: Bug fix, minor wording change
- v..→ v..: New feature, added section
- v..→ v..: Major rewrite, breaking changes

Directory Structure

```
UseCases/<name>/
├── config.yaml          Scoring configuration
├── README.md            Documentation
├── test-cases/          Test case definitions
│   ├── -basic.yaml
│   ├── -edge.yaml
│   └── ...
├── golden-outputs/      Reference outputs (optional)
│   ├── -basic.md
│   └── ...
└── prompts/             Versioned prompts
    ├── v...md
    └── v...md
```

Done

Use case created and validated. Ready to run evaluations.
