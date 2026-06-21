Template Integration

Available Templates

```
~/.claude/Templates/Evals/
├── Judge.hbs       Configurable LLM-as-Judge prompts
├── Rubric.hbs      Evaluation criteria definitions
├── TestCase.hbs    Test case specifications
├── Comparison.hbs  A/B testing templates
└── Report.hbs      Statistical result reports
```

---

Creating Custom Judges

Use the JUDGE template for custom evaluation:

```bash
bun run ~/.claude/Templates/Tools/RenderTemplate.ts \
  -t Evals/Judge.hbs \
  -d ~/.claude/skills/Evals/UseCases/<name>/judge-config.yaml \
  -o ~/.claude/skills/Evals/UseCases/<name>/judge-prompt.md
```

Judge Config Example

```yaml
judge:
  name: Content Quality Judge
  focus: accuracy
  scale:
    type: -  criteria:
    - name: Factual Accuracy
      description: Information matches source material
      weight: .    - name: Completeness
      description: Covers all key points
      weight: .    - name: Clarity
      description: Easy to understand
      weight: .  reasoning_required: true
  position_swap: true
output:
  format: json
```

---

Creating Rubrics

Use the RUBRIC template for scoring criteria:

```bash
bun run ~/.claude/Templates/Tools/RenderTemplate.ts \
  -t Evals/Rubric.hbs \
  -d ~/.claude/skills/Evals/UseCases/<name>/rubric.yaml \
  -o ~/.claude/skills/Evals/UseCases/<name>/rubric.md
```

---

LLM-as-Judge Best Practices

. Reasoning before scoring: Always require explanation first
. Use -scale: Most reliable, avoid -. Different judge model: Don't self-judge
. Position swapping: Average A-first and B-first results
. Multi-judge panels: -models, x cheaper than large single judge
