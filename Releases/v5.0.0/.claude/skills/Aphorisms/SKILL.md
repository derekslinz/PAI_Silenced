---
name: Aphorisms
description: "Manages a curated aphorism collection with full CRUD — content-based matching, themed search, thinker research, and database maintenance. Organizes quotes by author, theme, context, and newsletter usage history to prevent repetition. Four workflows: FindAphorism (analyze newsletter content, match themes, return -ranked recommendations with rationale), AddAphorism (parse quote + author, extract themes, validate uniqueness, update theme index), ResearchThinker (deep research on philosopher, add sourced quotes to database), SearchAphorisms (search by theme, keyword, or author). Database at ~/.claude/skills/aphorisms/Database/aphorisms.md — stores full quote text, author attribution, theme tags, context/background, source reference, and usage history per entry. Theme index supports + categories: Work Ethic, Resilience, Learning, Stoicism, Risk, Wisdom, Truth-seeking, Excellence, Curiosity, Freedom, Rationality, Clarity. Supported thinkers: Hitchens, Feynman, Deutsch, Sam Harris, Spinoza, plus any requested author. Newsletter integration: tracks which quotes used in which issues to enforce variety; content theme extraction drives automated matching. USE WHEN: aphorism, quote, saying, find a quote, research thinker, add aphorism, search aphorisms, quote for newsletter, what did X say about, quotes about [topic], quote bank, find matching quote, quote collection, add this quote, check usage history. NOT FOR general creative writing or social media post generation — those go through dedicated writing/social skills."
effort: low
---

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Aphorisms/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

Workflow Routing

When executing a workflow, output this notification directly:
```
Running the WorkflowNameworkflow in the Aphorismsskill to ACTION...
```

| Request Pattern | Route To |
|---|---|
| Find aphorism, quote for newsletter, match aphorism, suggest quote, aphorism recommendation | `Workflows/FindAphorism.md` |
| Add quote, add aphorism, save quote, new aphorism, store quote | `Workflows/AddAphorism.md` |
| Research thinker, find quotes from, what did X say, thinker quotes on | `Workflows/ResearchThinker.md` |
| Search aphorisms, find quotes on, quotes about, quotes matching, what aphorisms | `Workflows/SearchAphorisms.md` |

---

When to Activate This Skill

Direct Aphorism Requests
- "find aphorism", "find a quote", "find quote for X"
- "search aphorisms", "search quotes", "look up quote"
- "what aphorism", "which quote", "perfect quote for"
- "suggest aphorism", "recommend quote", "match quote to"
- "aphorism for newsletter", "quote for blog post", "quote for article"

Database Management
- "add aphorism", "add quote", "save this quote"
- "new aphorism", "include quote", "store this"
- "update aphorism database", "manage quotes"

Research & Discovery
- "research [thinker] quotes", "find [author] aphorisms"
- "what did [philosopher] say about", "quotes from [thinker]"
- "Hitchens quotes", "Feynman wisdom", "Spinoza aphorisms"
- "Sam Harris on [topic]", "David Deutsch quotes"

Theme-Based Search
- "aphorisms about [theme]", "quotes on [topic]"
- "show quotes about resilience", "wisdom on learning"
- "stoic quotes", "quotes matching [keyword]"

Newsletter Workflow Integration
- User working on newsletter and needs aphorism
- Mentions "newsletter" + "quote" or "aphorism"
- Content analysis for quote matching
- Avoiding previously used quotes

Use Case Indicators
- Need wisdom quote to open/close newsletter
- Want thematically relevant aphorism
- Building quote collection
- Researching philosopher's ideas
- Managing aphorism library

---

Core Capabilities

. Intelligent Quote Matching
Analyze newsletter or article content to find the perfect thematic aphorism:
- Extract key themes from content
- Match themes to aphorism database
- Consider tone and style alignment
- Avoid recently used quotes
- Provide multiple options with rationale

. Comprehensive Database
Curated collection organized by:
- Author- Thinkers aligned with TELOS philosophy
- Theme- Categories like resilience, learning, stoicism, risk, progress
- Context- Background on quote origin and meaning
- Usage History- Track which quotes used in which newsletters

. Thinker Research
Deep research on key philosophers:
- Christopher Hitchens- Rationality, skepticism, intellectual honesty
- David Deutsch- Knowledge creation, optimism, explanations
- Sam Harris- Rationality, meditation, free will, morality
- Baruch Spinoza- Ethics, reason, freedom, nature
- Richard Feynman- Curiosity, scientific thinking, doubt, clarity

. Theme-Based Organization
Aphorisms categorized by themes matching user content:
- Work Ethic & Excellence- Craft, mastery, high standards
- Resilience & Strength- Adversity, persistence, growth
- Learning & Education- Curiosity, continuous improvement
- Stoicism & Control- Internal locus, acceptance, discipline
- Risk & Action- Courage, failure, experimentation
- Wisdom & Truth- Rationality, evidence, honest inquiry

---

Database Structure

Location:`~/.claude/skills/aphorisms/Database/aphorisms.md`

Current Collections:. Initial Collection (Rahil Arora)- curated quotes covering core themes
. Thinkers Aligned with TELOS- Sections for Hitchens, Deutsch, Harris, Spinoza, Feynman (to be populated)
. Theme Index- Quick reference by category
. Newsletter Usage History- Tracking to avoid repetition

Metadata Per Aphorism:- Full quote text
- Author attribution
- Theme tags
- Context and background
- Source reference (when available)

---

Available Workflows

Quote Discovery & Matching

find-aphorism.md- Intelligent newsletter content analysis
- Analyze content themes and tone
- Search database for thematic matches
- Consider usage history
- Provide top -recommendations with rationale
- Include quote, author, and why it fits

Database Management

add-aphorism.md- Structured quote addition
- Accept quote text and author
- Extract or assign themes
- Add context and background
- Update theme index
- Validate uniqueness

Research Operations

research-thinker.md- Deep thinker research
- Research specific philosopher's relevant quotes
- Focus on TELOS-aligned themes
- Add quotes to appropriate database section
- Include context and sources
- Update theme index

Search & Discovery

search-aphorisms.md- Theme and keyword search
- Search by theme, keyword, or author
- Return matching aphorisms
- Sort by relevance or usage
- Provide context for each result

---

Integration Points

Newsletter Content Skill
- Automatic aphorism suggestions when creating newsletter
- Theme analysis from newsletter content
- Usage tracking for variety

Research Skill
- Deep thinker research capabilities
- Web research for quote verification
- Source attribution and context

Writing Skill
- Blog post quote recommendations
- Story explanation enhancement
- Content opening/closing quotes

---

Key Thinkers & Philosophy Alignment

Why These Thinkers?

All five thinkers align with TELOS themes of wisdom, rationality, truth-seeking, and human flourishing:
Christopher Hitchens- Intellectual honesty and skepticism
- Question everything, follow evidence
- "What can be asserted without evidence can be dismissed without evidence"

David Deutsch- Optimistic epistemology - problems are solvable
- Knowledge creation through criticism
- Emphasis on explanations, not just predictions

Sam Harris- Scientific rationality applied to ethics
- Importance of reason and evidence
- Mindfulness and self-awareness

Baruch Spinoza- Ethics based on reason
- Freedom through understanding
- Reality acceptance and wisdom

Richard Feynman- Curiosity-driven learning
- Doubt as a tool for knowledge
- Clarity of thought and explanation
- Scientific honesty

Research Priority

. Immediate: Analyze previous newsletters for aphorism patterns
. Phase : Research Hitchens and Feynman (most quotable, clear style)
. Phase : Research Harris and Deutsch (contemporary, relevant)
. Phase : Research Spinoza (historical, philosophical depth)

---

Usage Examples

Example : Finding Aphorism for Newsletter

User:"I'm writing a newsletter about overcoming setbacks in AI research. Find me a good aphorism."

Skill Response:. Analyze themes: resilience, adversity, persistence, progress
. Search database for matching themes
. Recommend top options:
   - Rocky Balboa quote (direct, powerful on getting hit and moving forward)
   - Bob Marley quote (strength through necessity)
   - Marcus Aurelius quote (stoic control focus)
. Provide rationale for each

Example : Adding New Quote

User:"Add this quote: 'The cure for boredom is curiosity. There is no cure for curiosity.' - Dorothy Parker"

Skill Response:. Parse quote and author
. Identify themes: curiosity, learning, passion
. Add to database with context
. Update theme index
. Confirm addition

Example : Researching Thinker

User:"Research David Deutsch quotes about knowledge and optimism"

Skill Response:. Research Deutsch's works (The Beginning of Infinity, The Fabric of Reality)
. Extract relevant quotes on knowledge creation and optimism
. Add to database with source attribution
. Organize by theme
. Report findings

Example : Theme Search

User:"Show me all aphorisms about learning and education"

Skill Response:. Search database for learning/education theme
. Return matching quotes:
   - Gandhi (live/learn)
   - Krishnamurti (lifelong learning)
   - Confucius (learning + thinking)
   - Aaron Swartz (curiosity)
. Provide context for each

---

Best Practices

Quote Selection for Newsletter
. Match tone- Ensure quote tone aligns with newsletter content
. Thematic relevance- Direct connection to main themes
. Avoid repetition- Check usage history
. Provide variety- Rotate between authors and themes
. Context matters- Consider whether reader needs background

Database Maintenance
. Verify accuracy- Check quote text and attribution
. Add context- Include source and background when possible
. Theme consistently- Use established theme categories
. Track usage- Update history to avoid overuse
. Quality over quantity- Curate, don't just collect

Thinker Research
. Primary sources- Prefer direct quotes from books/speeches
. Context critical- Include enough background for understanding
. Avoid misattribution- Verify quote authenticity
. TELOS alignment- Focus on wisdom, rationality, truth-seeking
. Practical wisdom- Quotes should be actionable or profound

---

Future Enhancements

Planned Features
. Automatic theme detection- ML-based content analysis
. Quote recommendation engine- Collaborative filtering based on past selections
. Integration with previous newsletters- Analyze historical aphorism usage patterns
. Expanded thinker research- Add more philosophers aligned with TELOS
. Mood/tone matching- Match quote emotional tone to content
. Quote formatting- Auto-format for newsletter style

Long-term Vision
- Comprehensive wisdom library covering all content needs
- Predictive recommendations based on newsletter draft
- Historical analysis of most impactful quotes
- Community contributions (vetted)
- Integration with other writing workflows

---

Quick Reference

Most Used Commands:- "Find aphorism for this newsletter" → Analyze content and recommend
- "Add this quote" → Add to database with metadata
- "Research [thinker] quotes" → Deep research and database population
- "Search aphorisms about [theme]" → Theme-based search

Database Location:`~/.claude/skills/aphorisms/Database/aphorisms.md`

Current Collection Size:- initial quotes (Rahil Arora collection)
- thinker sections (to be populated)
- + theme categories

Key Thinkers:Hitchens, Deutsch, Harris, Spinoza, Feynman

---

Related Skills

newsletter-content- Newsletter creation and content suggestions
research- Web research and content analysis
writing- Blog post and content creation
personal- User's philosophy and values context

---

Last Updated: --
Gotchas

- Search by theme, not exact text.The collection is organized by conceptual themes, not keyword matching.
- Always include attribution and source when adding new aphorisms.Unattributed quotes are useless.
- Duplicate detection:Check if the aphorism already exists before adding. Same idea, different wording, still counts as duplicate.

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Aphorisms","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
