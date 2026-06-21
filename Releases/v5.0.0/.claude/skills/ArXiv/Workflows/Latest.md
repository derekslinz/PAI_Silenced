Latest — Browse Recent Papers by Category

Get the most recent papers in a category or set of categories.

Input

User provides a topic area (e.g., "AI agents", "LLM security", "machine learning"). Map to arXiv categories. If ambiguous, use multiple categories with OR.

Steps

. Map topic to categories
Common mappings:
| Topic | Categories |
|-------|-----------|
| AI, artificial intelligence | `cs.AI` |
| machine learning, ML, deep learning | `cs.LG` |
| LLMs, NLP, language models | `cs.CL` |
| security, cybersecurity | `cs.CR` |
| agents, multi-agent | `cs.MA+OR+cs.AI` |
| software engineering | `cs.SE` |
| robotics | `cs.RO` |
| computer vision | `cs.CV` |
| information retrieval, RAG | `cs.IR` |

If the user specifies a category directly, use it as-is.

. Fetch latest papers
```bash
curl -sL "https://export.arxiv.org/api/query?search_query=cat:CATEGORY&sortBy=lastUpdatedDate&sortOrder=descending&start=&max_results="
```

For multiple categories:
```bash
curl -sL "https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.MA&sortBy=lastUpdatedDate&sortOrder=descending&start=&max_results="
```

. Parse the Atom XML response
Extract from each `<entry>`:
- `<title>` — paper title (strip newlines)
- `<id>` — extract paper ID from URL (e.g., `.`)
- `<published>` — submission date
- `<summary>` — abstract (first -sentences)
- `<author><name>` — first authors + "et al." if more
- `<arxiv:primary_category>` — primary category

. Attempt AlphaXiv enrichment for top -papers
For the most interesting papers (judge by title/abstract relevance to the user's interests — AI agents, security, LLM infrastructure, personal AI):

```bash
curl -s "https://alphaxiv.org/overview/PAPER_ID.md"
```

If : use the enriched overview. If : fall back to the abstract.

. Present results
Format as a scannable list. Lead with the papers most relevant to our work.

```markdown
Latest in {Category} — {Date}

{Paper Title}
{Authors}| {Date} | `{paper_id}`
{-sentence abstract or AlphaXiv summary}
Why it matters:{sentence on relevance to our work}

---
[... more papers ...]
```

For each paper, include:
- The arxiv link: `https://arxiv.org/abs/{paper_id}`
- If AlphaXiv overview exists: `https://alphaxiv.org/abs/{paper_id}`

. Highlight picks
End with a "Papers worth reading" section — -papers most relevant to the user's interests (AI infrastructure, security, agents, LLMs, personal AI systems). Brief explanation of why each matters.
