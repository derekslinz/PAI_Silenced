Search Aphorisms

Purpose:Search aphorism database by theme, keyword, author, or topic to discover relevant quotes.

---

When to Use:- User wants to explore quotes on specific theme
- User says "search aphorisms about [topic]", "find quotes on [theme]", "show me [keyword] quotes"
- Browsing database for inspiration
- Finding quotes before knowing exact newsletter theme
- Discovering what's available in database

Prerequisites:- Aphorism database exists at `~/.claude/skills/aphorisms/Database/aphorisms.md`
- Search query or theme provided
- Database Read for comprehensive search

---

Workflow Steps

Step : Parse Search Query

Identify Search Type:
. Theme Search```
User: "Search aphorisms about resilience"
User: "Find quotes on learning"
User: "Show stoicism quotes"
```
→ Search by established theme categories

. Keyword Search```
User: "Search for quotes with 'curiosity'"
User: "Find aphorisms mentioning 'fear'"
User: "Quotes about 'action'"
```
→ Search quote text for specific words

. Author Search```
User: "Show me all Feynman quotes"
User: "What do we have from Hitchens?"
User: "Marcus Aurelius aphorisms"
```
→ Filter by specific author

. Topic Search```
User: "Quotes about overcoming setbacks"
User: "Aphorisms for newsletter about AI hype"
User: "Wisdom on decision-making"
```
→ Semantic search across themes and content

. Combination Search```
User: "Feynman quotes about learning"
User: "Stoic quotes on control"
User: "Short quotes about action"
```
→ Multiple filters applied

---

Step : Read Database

```bash
Read ~/.claude/skills/aphorisms/Database/aphorisms.md
```

Load full context:- All aphorisms with metadata
- Theme index
- Thinker sections
- Usage history

---

Step : Execute Search

Theme Search

Match to established themes:- Work Ethic & Excellence
- Resilience & Strength
- Fear & Mindset
- Passion & Enthusiasm
- Competition & Progress
- Curiosity & Intelligence
- Investment & Self-Development
- Present Moment & Enjoyment
- Learning & Education
- Stoicism & Control
- Risk & Action
- Adversity

Process:. Identify which theme(s) match search query
. May match multiple themes (e.g., "growth" matches Resilience + Learning)
. Extract all quotes tagged with matching theme(s)

Example:```
Query: "Search aphorisms about resilience"

Matching Themes: Resilience & Strength, Adversity

Results:
- Bob Marley (strength through necessity)
- Rocky Balboa (getting hit and moving forward)
- Muhammad Ali (suffer now, champion later)
- Unknown (pain → strength)
```

---

Keyword Search

Search quote text directly:```
For each aphorism in database:
  If keyword appears in quote text:
    Add to results
```

Case-insensitive:- "curiosity" matches "Curiosity", "CURIOSITY", "curious"

Partial matches:- "learn" matches "learning", "learned", "learner"

Context awareness:- Also check author names and contexts for keyword

Example:```
Query: "Find aphorisms mentioning 'fear'"

Results:
- Robert Heller: "Fear is excitement without breath"
- (Any other quotes with "fear" in text or context)
```

---

Author Search

Filter by author name:```
For each aphorism in database:
  If author matches search:
    Add to results
```

Flexible matching:- "Feynman" matches "Richard Feynman"
- "Marcus Aurelius" matches "Aurelius"
- "Ali" matches "Muhammad Ali"

Result organization:- Group by theme if author has multiple quotes
- Chronological if known
- By source if documented

Example:```
Query: "Show me all Marcus Aurelius quotes"

Results:
Marcus Aurelius (quote):

Stoicism & Control:- "You have power over your mind - not outside events. Realize this, and you will find strength."
```

---

Topic Search (Semantic)

More complex - requires understanding:
Process:. Analyze topic semantically
. Identify related themes
. Look for keyword variations
. Check quote contexts for relevance

Example:```
Query: "Quotes about overcoming setbacks"

Analysis:
- Primary themes: Resilience, Adversity, Strength
- Related concepts: Persistence, growth, difficulty
- Keywords: setback, challenge, overcome, persist, adversity

Search:
. Themes: Resilience & Strength, Adversity
. Keywords: "setback", "challenge", "adversity", "difficulty"
. Context: Any mention of overcoming challenges

Results: [Combined theme + keyword matches]
```

---

Combination Search

Apply multiple filters:
Example:```
Query: "Feynman quotes about learning"

Filters:
. Author = Feynman
. Theme = Learning & Education OR Curiosity & Intelligence

Process:
- Get all Feynman quotes
- Filter for those tagged with learning/curiosity themes
- Return intersection

Results: [Feynman quotes specifically about learning]
```

---

Step : Rank Results

Ranking Criteria:
. Relevance Score (-)- Exact theme match: - Keyword in quote: -- Keyword in context: -- Related theme: -- Tangential: -
. Quotability (-)- Clear, concise: -- Needs some context: -- Complex or long: -
. Freshness (-)- Never used: - Used >months ago: -- Used recently: -- Used very recently: -
Total Score:Sum (max )

Sort results:- Highest score first
- Break ties by quotability
- Secondary sort by author diversity

---

Step : Format Results

Standard Format:
```markdown
Search Results: "[Query]"

Found [N] matching aphorisms
---

Result : [Quote Summary/First Few Words]

"[Full quote text]"
Author:[Author Name]
Themes:[Theme ], [Theme ]
Context:[Brief context]

Why This Matches:[Specific relevance to search query]

Usage:[Last used: date / Never used]

Score:[X/]

---

Result : [Quote Summary]

[Same format...]

---

[All results...]

---

Summary

Total Results:[N]
By Theme:- [Theme ]: [N] quotes
- [Theme ]: [N] quotes

By Author:- [Author ]: [N] quotes
- [Author ]: [N] quotes

Top Recommendation:[Result title]
```

---

Step : Present Options

Provide user with:. Full results formatted
. Summary statistics
. Top recommendation
. Related searches suggestions

Related Searches:```markdown
You Might Also Like

Based on your search for "[Query]", you might also be interested in:
- [Related theme ]
- [Related theme ]
- Quotes from [Related author]
```

---

Advanced Search Features

Exclude Filter

```
User: "Search resilience quotes but not Rocky Balboa"

Process:
. Get all resilience quotes
. Filter out Rocky Balboa quotes
. Return remaining results
```

Recency Filter

```
User: "Show me unused quotes about learning"

Process:
. Get all learning quotes
. Filter for usage = never OR >months
. Return fresh quotes
```

Length Filter

```
User: "Short quotes about action"

Process:
. Get all action quotes
. Filter for character count < . Return concise options
```

Source Filter

```
User: "Quotes from books, not movies"

Process:
. Check context/source metadata
. Filter for literary sources
. Exclude film quotes
```

---

Search by Use Case

Newsletter Topic Matching

```
User: "I'm writing about AI safety. What quotes do we have?"

Process:
. Analyze topic: AI safety = caution, wisdom, responsibility, careful thinking
. Map to themes: Stoicism & Control, Wisdom & Truth-Seeking, Risk & Action (cautious side)
. Search across multiple themes
. Rank by relevance to "careful, wise decision-making"

Results:
- Marcus Aurelius (control what you can)
- Confucius (learning + thinking balance)
- Feynman (if available - on scientific rigor)
```

Mood Matching

```
User: "I need an inspiring quote"

Process:
. Identify "inspiring" mood
. Themes: Excellence, Resilience, Progress, Action
. Filter for positive, empowering tone
. Avoid darker or cautionary quotes

Results:
- Tim Grover, Muhammad Ali, Robin Sharma quotes
- Focus on achievement and growth
```

Audience Matching

```
User: "Quote for technical audience"

Process:
. Identify technical audience preference
. Favor: Feynman, Deutsch, scientific thinkers
. Avoid: Pop culture references, sports figures
. Emphasize: Rationality, evidence, rigorous thinking

Results:
- Feynman quotes on curiosity and doubt
- Deutsch on knowledge creation
- Harris on rationality
```

---

Quality Checks

Before returning results:

- [ ] All results genuinely match search query
- [ ] Relevance scores accurately reflect match quality
- [ ] Results ranked appropriately
- [ ] Variety in authors if possible
- [ ] Context explains why each quote matches
- [ ] Usage history noted for freshness
- [ ] Related searches are actually relevant
- [ ] Formatting is clear and scannable

---

Edge Cases

No Results Found

```markdown
Search Results: "[Query]"

No matching aphorisms found.
Suggestions:. Broaden search- Try related themes:
   - [Related theme ]
   - [Related theme ]

. Research new quotes- Would you like me to research quotes about "[topic]"?

. Similar searches that would work:   - [Alternative query ]
   - [Alternative query ]

Available themes in database:- [List all themes]
```

Too Many Results

```
Query: "Search for quotes"
(No specific criteria - matches everything)

Response:
"Your search is very broad. Database contains [N] total aphorisms.

Would you like to:
. Browse by theme (show theme index)
. Browse by author (show author list)
. Search by specific topic (ask: what topic?)
. Show random sampling (diverse quotes)"
```

Ambiguous Query

```
Query: "Search for quotes about change"

Issue: "Change" could mean:
- Personal transformation (growth)
- Taking action (doing something different)
- Accepting reality (stoic acceptance)
- Progress and innovation

Response:
"'Change' can mean several things. Which are you most interested in?
. Personal growth and transformation
. Taking action and making things happen
. Accepting reality and what you can't control
. Progress and innovation

Or should I show results from all categories?"
```

Contradictory Search

```
Query: "Stoic quotes about taking big risks"

Issue: Stoicism emphasizes control and caution; big risks are opposite

Response:
"Stoicism and big risk-taking are somewhat contradictory philosophies.

Would you prefer:
. Stoic quotes about calculated risk (wisdom + action)
. Risk-taking quotes from non-stoic sources
. Quotes balancing wisdom with action

Or explain what you're looking for and I'll find the best match?"
```

---

Integration with Other Workflows

After Search Results

Next Actions:
. Use in newsletter:- Results feed directly into find-aphorism.md analysis
- User can request: "Use result for my newsletter"

. Expand research:- If user likes specific author: "Research more [Author] quotes"
- Uses research-thinker.md workflow

. Add new quotes:- If search reveals gap: "Research quotes about [missing theme]"
- Uses research-thinker.md then add-aphorism.md

---

Saved Searches

Track common searches:- Newsletter topics frequently covered
- Most-searched themes
- Recurring patterns

Optimize database:- Expand themes that get searched often
- Research thinkers for frequently requested topics

---

Success Criteria

Search succeeds when:- Results accurately match user query
- User finds relevant quote(s) from results
- Ranking makes sense (best matches first)
- Variety in results when possible
- Clear explanation of why each quote matches
- User can quickly decide which quote to use

Quality indicators:- User says "perfect, exactly what I needed"
- User selects from results without requesting more searches
- Relevance scores align with user perception
- Results are diverse and interesting

---

Example Execution

User Input
"Search aphorisms about learning and curiosity"

Step : Parse Query
- Type:Theme search + Keyword
- Themes:Learning & Education, Curiosity & Intelligence
- Keywords:"learn", "learning", "curious", "curiosity"

Step : Read Database
Load full database context

Step : Execute Search

Theme matches:- Curiosity & Intelligence theme: Aaron Swartz, Dorothy Parker (if added), Einstein (if added)
- Learning & Education theme: Gandhi, Krishnamurti, Confucius

Keyword matches:- Any quotes with "learn", "curious", "curiosity" in text

Results:. Aaron Swartz (curiosity = intelligence)
. Gandhi (live/learn)
. Krishnamurti (lifelong learning)
. Confucius (learning + thinking)
. Einstein (if added - questioning and curiosity)

Step : Rank Results

Scores:. Aaron Swartz - /(exact theme match + keyword + never used)
. Einstein - /(exact theme + keyword + highly quotable)
. Krishnamurti - /(theme match + keyword + context)
. Confucius - /(theme match + keyword)
. Gandhi - /(theme match + indirect keyword)

Step : Format Results

```markdown
Search Results: "learning and curiosity"

Found matching aphorisms
---

Result : Curiosity = Intelligence

"Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity."
Author:Aaron Swartz
Themes:Curiosity & Intelligence
Context:Internet activist defining intelligence as active curiosity

Why This Matches:Direct hit on both "curiosity" and learning-oriented message. Reframes intelligence as curiosity in action.

Usage:Never used

Score:/
---

Result : Never Stop Questioning

"The important thing is not to stop questioning. Curiosity has its own reason for existing."
Author:Albert Einstein
Themes:Curiosity & Intelligence, Learning & Education
Context:From interview "Old Man's Advice to Youth"

Why This Matches:Directly mentions questioning and curiosity. Emphasizes intrinsic value of curiosity.

Usage:Never used

Score:/
---

[Results -formatted similarly...]

---

Summary

Total Results:By Theme:- Curiosity & Intelligence: quotes
- Learning & Education: quotes (some overlap)

By Author:- Swartz: - Einstein: - Krishnamurti: - Confucius: - Gandhi: 
Top Recommendation:Aaron Swartz (Result )

You Might Also Like

Based on your search for "learning and curiosity", you might also be interested in:
- Feynman quotes (when added - perfect match for this theme)
- Quotes about "intellectual honesty"
- Quotes about "questioning assumptions"
```

Step : Present
User reviews results and selects Aaron Swartz quote for newsletter

---

Related Workflows

- find-aphorism.md- Use search results for newsletter matching
- research-thinker.md- Expand database if search reveals gaps
- add-aphorism.md- Add discovered quotes during research

---

Last Updated:--