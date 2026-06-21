Find Aphorism for Newsletter Content

Purpose:Analyze newsletter or article content to recommend the perfect thematically-aligned aphorism from the database.

---

When to Use:- User provides newsletter draft or URL and requests aphorism
- User describes newsletter theme and wants quote recommendation
- User says "find aphorism for this", "what quote fits this", "suggest quote"
- Working on newsletter and needs opening/closing wisdom quote

Prerequisites:- Aphorism database exists at `~/.claude/skills/aphorisms/Database/aphorisms.md`
- Newsletter content or URL provided by user
- Clear understanding of newsletter theme (if not provided, extract from content)

---

Workflow Steps

Step : Get Newsletter Content

If URL provided:```bash
Use WebFetch to get content
WebFetch(url, "Extract main article content, title, and key themes")
```

If content pasted:- Receive full text directly from user

If theme described:- Work with theme description only (e.g., "newsletter about overcoming setbacks")

Expected Outcome:- Full newsletter text OR clear theme description

---

Step : Analyze Content Themes

Extract Primary Themes:
Use deep thinking for deep thematic analysis. Identify:

. Core Topic- What is the newsletter fundamentally about?
   - Examples: AI safety, personal productivity, security vulnerabilities, market analysis

. Emotional Tone- What's the mood/feeling?
   - Examples: Optimistic, cautionary, reflective, urgent, inspirational

. Key Messages- What are the -main takeaways?
   - Examples: "Persistence matters more than talent", "Question assumptions", "Focus on fundamentals"

. Philosophical Alignment- Which TELOS themes are present?
   - Wisdom & Truth-seeking
   - Rationality & Evidence
   - Human flourishing & Progress
   - Resilience & Growth
   - Learning & Curiosity
   - Stoicism & Control
   - Risk & Action
   - Excellence & Mastery

. Audience Context- Who is this for?
   - newsletter readers (technical, curious, rationalist)
   - Blog readers (varied technical background)
   - Social media audience (quick insights)

Analysis Output:```markdown
Content Analysis
- Core Topic: [Topic]
- Emotional Tone: [Tone]
- Key Messages:
  . [Message ]
  . [Message ]
  . [Message ]
- TELOS Themes: [Theme ], [Theme ], [Theme ]
- Audience: [Context]
```

---

Step : Read Aphorism Database

Load database:```bash
Read ~/.claude/skills/aphorisms/Database/aphorisms.md
```

Review relevant sections:. Check theme index for matching categories
. Review aphorisms in matching theme categories
. Note usage history to avoid recently used quotes

Expected Outcome:- Full database context loaded
- Theme-relevant sections identified

---

Step : Match Aphorisms to Themes

Matching Criteria:
For each potential aphorism, score on:

. Thematic Relevance(-)
   - Does the quote directly address the newsletter's core themes?
   - Strong connection = -   - Tangential connection = -   - Weak connection = -
. Tonal Alignment(-)
   - Does the quote's mood match the newsletter's tone?
   - Perfect match = -   - Compatible = -   - Mismatched = -
. Message Reinforcement(-)
   - Does the quote strengthen the newsletter's key messages?
   - Strongly reinforces = -   - Somewhat supports = -   - Neutral or contradictory = -
. Philosophical Alignment(-)
   - Does the quote embody TELOS philosophy?
   - Deep alignment = -   - Some alignment = -   - Misaligned = -
. Freshness(-)
   - Has this quote been used recently?
   - Not used recently =    - Used + months ago = -   - Used within months = -   - Used within months = -
Total Score:Sum of all criteria (max )

Select Top -Candidates:- All candidates should score + (%)
- Prefer variety in authors
- Balance well-known vs lesser-known quotes

---

Step : Generate Recommendations

Format for Each Recommendation:
```markdown
Recommendation [N]: [Quote Summary]

Quote:"[Full quote text]"

Author:[Author Name]

Why This Fits:- Thematic Relevance: [Specific connection to newsletter themes]
- Tonal Alignment: [How mood/style matches]
- Message Support: [Which key message it reinforces]
- TELOS Alignment: [Which philosophy themes it embodies]

Placement Suggestion:[Opening quote / Closing quote / Section divider] - [Reasoning]

Context (if needed):[Brief background on quote or author if readers might need it]

Score:[X/]
```

Provide -Recommendations:- : Best Overall Match- Highest total score
- : Alternative Strong Match- Second-best or different tone
- : Safe Classic- Well-known, universally resonant
- (optional): Unexpected Choice- High relevance but lesser-known author/quote
- (optional): Philosophical Depth- For readers seeking deeper wisdom

---

Step : Present to User

Summary Format:
```markdown
Aphorism Recommendations for "[Newsletter Title/Theme]"

Content Analysis Summary
[Brief -sentence summary of themes and tone]

Top Recommendations

[Include all recommendations from Step ]

Quick Decision Guide
- For maximum impact: Recommendation - For variety(if author used recently): Recommendation - For broad appeal: Recommendation - For surprise/delight: Recommendation - For philosophical depth: Recommendation 
Usage Tracking
Remember to update usage history in database after selection.
```

---

Advanced Techniques

Multi-Newsletter Analysis

If user has multiple newsletter drafts:
. Analyze all content simultaneously
. Find thematic through-lines
. Recommend aphorisms that span themes
. Ensure variety across newsletters

Seasonal/Temporal Context

Consider:
- Time of year (e.g., New Year = fresh starts, growth quotes)
- Current events (avoid tone-deaf selections)
- Recent newsletter themes (ensure variety)

Author Diversity

Track author usage over time:
- Avoid overusing same author
- Rotate between classical and contemporary
- Balance well-known and obscure thinkers

---

Common Patterns

Pattern : Resilience/Adversity Newsletter
Common Themes:Setbacks, challenges, persistence, growth through difficulty
Go-To Quotes:Rocky Balboa, Marcus Aurelius, Muhammad Ali, Bob Marley
Tone:Inspirational, empowering, realistic about difficulty

Pattern : Learning/Curiosity Newsletter
Common Themes:Knowledge acquisition, continuous improvement, intellectual honesty
Go-To Quotes:Feynman, Aaron Swartz, Confucius, Krishnamurti
Tone:Encouraging, thoughtful, emphasizing growth mindset

Pattern : Action/Risk Newsletter
Common Themes:Taking chances, overcoming fear, experimenting, moving forward
Go-To Quotes:"If you try, you risk failure", Robert Heller (fear = excitement), Tim Grover
Tone:Bold, action-oriented, courage-focused

Pattern : Excellence/Mastery Newsletter
Common Themes:High standards, craft, dedication, results over effort
Go-To Quotes:Tim Grover, Muhammad Ali, Robin Sharma (investment)
Tone:Demanding, uncompromising, focused on outcomes

Pattern : Stoicism/Control Newsletter
Common Themes:Focus on what you can control, acceptance, internal strength
Go-To Quotes:Marcus Aurelius, Spinoza (when added)
Tone:Calm, philosophical, centered

Pattern : Progress/Competition Newsletter
Common Themes:Self-improvement, internal benchmarks, personal growth
Go-To Quotes:Robin Sharma (run your own race), Gandhi (live/learn)
Tone:Encouraging, progress-focused, non-comparative

---

Quality Checks

Before finalizing recommendations:

- [ ] All quotes verified for accuracy (correct text and attribution)
- [ ] Thematic relevance is clear and specific
- [ ] Tonal alignment makes sense (no jarring mismatches)
- [ ] TELOS philosophy alignment is genuine
- [ ] Usage history checked (not recently used)
- [ ] Context provided if quote needs background
- [ ] Placement suggestion is appropriate
- [ ] Author diversity maintained
- [ ] At least recommendations provided
- [ ] Recommendations are ranked/explained clearly

---

Edge Cases

What if No Perfect Match?

Option : Expand search to related themes- Look for adjacent themes (e.g., resilience → strength → adversity)
- Consider complementary rather than identical matches

Option : Research new quotes- Use research-thinker.md workflow to find relevant quotes from key thinkers
- Add new quotes to database and recommend

Option : Use philosophical principles- Match to higher-level TELOS themes (wisdom, rationality, flourishing)
- Recommend quotes that align philosophically even if not directly on-topic

What if User Rejects All Recommendations?

Clarify preferences:- Ask: "What didn't resonate about these options?"
- Understand: Tone issue? Author issue? Message misalignment?
- Adjust: Provide new recommendations based on feedback

Research on demand:- Offer to research specific thinker or theme
- Expand beyond current database
- Find exactly what user envisions

What if Content is Multi-Themed?

Two approaches:
. Pick dominant theme- Recommend quote matching primary theme
. Find unifying quote- Recommend quote that speaks to multiple themes

Example:Newsletter about "AI safety through careful engineering"
- Themes: Safety, caution, excellence, responsibility
- Unifying quote: Feynman on scientific honesty and rigor (when added)
- OR Marcus Aurelius on control and wisdom

---

Integration with Other Workflows

After Recommendation is Selected

Update database:. Use add-aphorism.md to update usage history
. Note: Newsletter date, newsletter theme, placement
. Maintain tracking for future variety

If Quote Not in Database

Add new quote:. User provides or requests research for specific quote
. Use add-aphorism.md to add with full metadata
. Then recommend for current newsletter

If Need Expanded Collection

Research thinkers:. Use research-thinker.md to populate thinker sections
. Focus on themes matching newsletter needs
. Build database for future recommendations

---

Success Criteria

Workflow succeeds when:- User receives -high-quality, relevant recommendations
- Each recommendation has clear rationale
- Thematic relevance is obvious
- User can confidently select a quote
- Selected quote enhances newsletter impact

Quality indicators:- User says "perfect!" or "exactly what I needed"
- Minimal back-and-forth required
- Quote scores + on matching criteria
- TELOS alignment is clear
- Recommendation saves user research time

---

Example Execution

User Input
"I'm writing a newsletter about how major security breaches happen from ignoring basic security hygiene. Find me a good aphorism."

Step : Content Analysis
```markdown
Content Analysis
- Core Topic: Security fundamentals, basics matter
- Emotional Tone: Cautionary, frustrated, emphasizing fundamentals
- Key Messages:
  . Basics matter more than advanced techniques
  . Ignoring fundamentals leads to failure
  . Excellence requires discipline on basics
- TELOS Themes: Excellence & Mastery, Discipline, Learning (back to basics)
- Audience: Security professionals, technical readers
```

Step : Database Search
Read database, identify matches in:
- "Excellence & Mastery" theme
- "Learning & Education" theme (fundamentals)
- Quotes emphasizing discipline and basics

Step : Top Matches
. Tim Grover (hard work = results) - /. Muhammad Ali (suffer now = champion) - /. Confucius (learning + thinking) - /
Step : Recommendations

```markdown
Recommendation : Focus on What Matters (Tim Grover)

Quote:"You don't have to love the hard work. You just have to crave the result so intensely that the hard work becomes irrelevant."

Why This Fits:- Thematic Relevance: Security hygiene IS hard work - tedious, unglamorous, but critical
- Tonal Alignment: Uncompromising, results-focused matches newsletter's emphasis on fundamentals
- Message Support: Reinforces "basics matter" - the "hard work" IS the basics
- TELOS Alignment: Excellence through discipline, results > effort

Placement Suggestion:Opening quote - Sets tone that security fundamentals are non-negotiable hard work

Score:/
Recommendation : The Price of Excellence (Muhammad Ali)

Quote:"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'"

Why This Fits:- Thematic Relevance: Training = security hygiene practice - boring but prevents breaches
- Tonal Alignment: Direct, honest about difficulty, emphasizes long-term payoff
- Message Support: "Suffer now" (do the boring security work) = "live as champion" (avoid breaches)
- TELOS Alignment: Delayed gratification, discipline, mastery

Placement Suggestion:Closing quote - Motivates readers to commit to security fundamentals despite tedium

Score:/
Recommendation : Balance Theory and Practice (Confucius)

Quote:"He who learns but does not think, is lost! He who thinks but does not learn is in great danger."

Why This Fits:- Thematic Relevance: Security requires BOTH knowledge and applied practice (hygiene)
- Tonal Alignment: Warning tone matches cautionary newsletter mood
- Message Support: "Does not learn" (ignores basics) = "great danger" (breaches happen)
- TELOS Alignment: Integration of knowledge and action, wisdom through practice

Placement Suggestion:Section divider - Connects learning about security to actually implementing hygiene

Score:/```

Step : Quick Decision
```markdown
Quick Decision Guide
- For maximum impact on security professionals: (Tim Grover)
- For motivational close: (Muhammad Ali)
- For philosophical depth: (Confucius)
```

User selects:Tim Grover quote

Update tracking:Note usage in database

---

Related Workflows

- add-aphorism.md- Update usage history after selection
- research-thinker.md- Expand database if no good matches
- search-aphorisms.md- Explore database by theme before analysis

---

Last Updated:--