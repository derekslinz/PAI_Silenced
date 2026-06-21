Quick Research Workflow

Mode:Single Perplexity researcher, query | Timeout:seconds

When to Use

- User says "quick research" or "minor research"
- Simple, straightforward queries
- Time-sensitive requests
- Just need a fast answer

Workflow

Step : Launch Single Perplexity Agent

ONE Task call - Perplexity researcher with a single focused query:
```typescript
Task({
  subagent_type: "PerplexityResearcher",
  description: "[topic] quick lookup",
  prompt: "Do ONE web search for: [query]. Tag each finding with confidence: [HIGH], [MED], or [LOW]. Return the key findings immediately. Keep it brief and factual."
})
```

Prompt requirements:- Single, well-crafted query
- Instruct to return immediately after first search
- No multi-query exploration

Why Perplexity:Fastest live-web retrieval with built-in citations; best single-agent default for "just tell me what's current."

Step : Return Results

Report findings using standard format:

```markdown
SUMMARY: Quick research on [topic]
ANALYSIS: [Key findings from Perplexity]
ACTIONS: Perplexity query
RESULTS: [Answer]
STATUS: Quick mode - agent, query
CAPTURE: [Key facts]
 NEXT: [Suggest standard research if more depth needed]
STORY EXPLANATION: [-numbered points - keep brief]
COMPLETED: Quick answer on [topic]
```

Speed Target

~-seconds for results
