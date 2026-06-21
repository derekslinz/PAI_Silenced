PAIUpgrade — Canonical Output Format

This is the single source of truth for PAIUpgrade output structure.Both `SKILL.md` and `Workflows/Upgrade.md` reference this file rather than inlining their own copies.

Section order (NON-NEGOTIABLE)

. Discoveries— what was found, ranked by interestingness
. Recommendations— what to do, ranked by priority tier
. Technique Details— full extraction with code/quotes
. Internal Reflections— upgrade candidates from algorithm reflections (Thread )
. Summary— one-line totals
.  Skipped Content— already-done / rejected with file:line evidence
. Sources Processed— count footer

Print only non-empty tiersin Recommendations. If no CRITICAL items, omit that header entirely.

---

Header

```markdown
PAI Upgrade Report
Generated:[timestamp]
Sources Processed:[N] release notes | [N] videos | [N] docs | [N] GitHub queries
Findings:[N] techniques extracted | [N] skipped
```

---

Discoveries

Ranked by interestingness, NOT implementation priority. A LOW-priority item can be Discovery if it's the most "whoa" finding.

| | Discovery | Source | Why It's Interesting | PAI Relevance |
|---|-----------|--------|----------------------|---------------|
| | [name] | [source] | [≤sentences] | [≤sentence] |

---

Recommendations

Every row MUST carry a Prior Status tag with file:line evidence from Thread .

Prior Status legend:- NEW— no prior trace in Algorithm, PATTERNS.yaml, hooks, ISAs, KNOWLEDGE, or MEMORY
- PARTIAL— partially implemented; row scopes only the missing delta
- DISCUSSED— appears in ISA/session/KNOWLEDGE but not shipped; confirm not deferred-by-decision
- REJECTED— previously decided against; only re-surface if context changed (state what changed)
- DONE— already implemented; goes to Skipped Content with evidence, NOT here

CRITICAL — Integrate immediately
Fixes gaps, security issues, or unlocks capabilities PAI should already have.

| | Recommendation | Prior Status | Evidence | PAI Relevance | Effort | Files Affected |
|---|---------------|-------------|----------|---------------|--------|----------------|

HIGH — Integrate this week
Significantly improves PAI capabilities or efficiency.

MEDIUM — Integrate when convenient
Useful capabilities or ecosystem alignment.

LOW — Awareness / future reference
Nice-to-know or will become relevant later.

(Emit only the tiers that have items.)

---

Technique Details

Numbered to match Recommendations. One block per technique.

```markdown
From [Source Type]

[N]. [Technique Name]
Source:[exact source with version/timestamp]
Priority:CRITICAL | HIGH | MEDIUM | LOW

What It Is:[≤sentences, concrete and specific — what the technique does, how it works, what capability it provides]

How It Helps PAI:[≤sentences, concrete and specific — which component improves, what gap it fills]

The Technique:> [QUOTE or CODE BLOCK — actual content, not a summary]

Applies To:`[file path]`, [component name]
Implementation:```[language]
// [Before/after or new code]
```
```

From GitHub Trending Projects (variant)

```markdown
[N]. [Project Name] ([stars] )
Source:GitHub: [owner/repo] — [category query that found it]
Priority:| | | 
What It Is:[≤sentences]
How It Helps PAI:[≤sentences]

Inspiration Techniques:> [Specific architectural pattern from README or code]

Applies To:`[PAI file path]`, [component]
Potential Integration:[key insight to borrow — not a full implementation]
```

---

Internal Reflections (Thread )

```markdown
Source:~/.claude/PAI/MEMORY/LEARNING/REFLECTIONS/algorithm-reflections.jsonl
Entries analyzed:[N] | High-signal:[N] (low sentiment, over-budget, or failed criteria)

[Theme Name] ([N] occurrences, [HIGH/MEDIUM/LOW] signal)
Root cause:[structural issue]
Proposed fix:[concrete change]
Target:[PAI files affected]
Evidence:- [timestamp] [task] — "[Qquote]"
```

If no reflections yet:
> No reflections found yet — they accumulate after Standard+ Algorithm runs.

---

Summary

| | Technique | Source | Priority | PAI Component | Effort |
|---|-----------|--------|----------|---------------|--------|

Totals:[N] Critical | [N] High | [N] Medium | [N] Low | [N] Skipped | [N] Internal

---

 Skipped Content

| Content | Source | Why Skipped | Evidence |
|---------|--------|-------------|----------|

Already-done items MUST appear here with file:line evidence, never in Recommendations. This is how the skill proves the Prior-Work Audit (Thread ) ran.

---

Sources Processed

One-line digest of source counts and routing.

---

Hard rules

. Discoveries first, recommendations second, details third— never reorder.
. Discoveries ≠ Recommendations— different orderings (interestingness vs priority).
. PAI Relevance is primaryin both Discoveries and Recommendations — explain WHY this matters for PAI.
. Every Recommendation has a Prior Status tag with file:line evidence.No exceptions.
. Quote the source.Every technique includes actual quoted content or code.
. Map to PAI.Every technique names a specific PAI file or component.
. No watch/read recommendations.Extract the technique; don't point to content.
. Skip boldly.Content with no extractable technique → Skipped, not diluted.
. Numbered cross-referencesare consistent across Discoveries, Recommendations, and Technique Details.
. Print only non-empty tiers.Empty tier headers are noise.
