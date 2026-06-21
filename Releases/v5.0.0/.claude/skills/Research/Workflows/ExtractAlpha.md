Extract Alpha

Extract the highest-alpha ideas from content using deep deep thinking analysis.

Finds the most surprising, insightful, and novel ideas through systematic deep reasoning.
Focuses on what's genuinely new, counterintuitive, and profound.

USE WHEN analyzing podcasts, videos, articles, essays, or any content where you want to capture
the most important and surprising insights without missing subtle but profound ideas.

Extract Alpha - Deep Content Analysis

Core Philosophy

Based on Claude Shannon's information theory: real information is what's different, not what's the same.
This skill finds:
- Net new ideas and novel presentations
- New frameworks for combining ideas
- Surprising insights that challenge assumptions
- Subtle but profound observations
- Non-obvious connections and implications

The Problem This Solves:Standard extraction often misses:
- Subtle philosophical implications
- Non-obvious connections between ideas
- Counterintuitive observations buried in conversation
- Novel frameworks that aren't explicitly stated
- Surprising reframings of common concepts
- Low-probability but brilliant insights

When to Activate This Skill

- Analyzing YouTube videos, podcasts, interviews
- Processing essays, articles, blog posts
- Deep content analysis where missing insights is unacceptable
- User says "extract the most important ideas"
- Need to find alpha/novelty in dense content
- Standard patterns failed to capture key insights
- User explicitly requests "extract alpha" or "deep analysis"

The Five-Step Process

Step : Content Extraction

For YouTube videos:```bash
fabric -y "YOUTUBE_URL"
```

For other content:- Paste text directly
- Use WebFetch for articles
- Read from files

Step : Deep deep thinking Analysis

Before extracting anything, engage in extended deep thinking using the deep thinking protocol:

deep thinking Protocol:```
DEEP THINKING DEEP ANALYSIS MODE:

Think deeply and extensively about this content:

. SURFACE SCAN - What are the obvious main points?
. DEPTH PROBE - What implications aren't explicitly stated?
. CONNECTION MAP - What unusual connections exist between ideas?
   - WONDER TRIGGER: What makes you stop and think "wait, how does THAT work?"
   - CROSS-DOMAIN PATTERNS: What seemingly different things (human/AI, biology/ML, physics/economics) share the same underlying principle?
   - PERSONAL RELEVANCE: What applies to YOUR life in a surprising way?
   - AHA MOMENTS: What connections make you see familiar things differently?
. ASSUMPTION CHALLENGE - What conventional wisdom is being questioned?
. NOVELTY DETECTION - What's genuinely new or surprising here?
. FRAMEWORK EXTRACTION - What mental models or frameworks emerge?
. SUBTLE INSIGHTS - What quiet observations carry profound weight?
. CONTRARIAN ANGLES - What goes against common thinking?
. FUTURE IMPLICATIONS - What does this suggest about what's coming?
. SYNTHESIS - What are the highest-alpha ideas across all dimensions?

Allow thinking to wander and make unexpected connections.
Question every assumption about what's "important."
Look for ideas that make you pause and reconsider.
Prioritize novelty and surprise over comprehensiveness.
```

Step : Extract Insights

After deep thinking, extract the highest-alpha insights:

Extraction Protocol:```
Generate -highest-alpha ideas from your deep analysis.

For each insight:
- Write in -word bullets (allow flexibility for clarity)
- Use approachable Paul Graham style
- Prioritize ideas that are:
  Make you pause and think "wait, WHAT?"
  Spark curiosity or wonder
  Reveal cross-domain patterns (same principle across human/AI, biology/ML, etc.)
  Expose underlying associations that weren't obvious
  Feel personally relevant or change how you see yourself
  Challenge how you understand familiar things
  Make you want to tell someone else
  Create "holy shit" or "aha!" moments
  Include specific details WHEN they enhance the surprise/insight
  Make you reconsider your assumptions about the world

Focus on low-probability insights that are coherent and valuable.
Avoid obvious takeaways and surface-level observations.
Capture the subtle genius buried in the content.
```

Step : File Organization - Scratch → History Pattern

CRITICAL:Follow the proper file organization pattern for all extractalpha work:

Working Files (Temporary Analysis)

Use the current work item directory for all working files during analysis:
```bash
~/.claude/PAI/MEMORY/WORK/{current_work}/
```

To get the current work directory:. Read `~/.claude/`
. Extract the `work_dir` value
. Use `~/.claude/PAI/MEMORY/WORK/{work_dir}/` for temporary artifacts

What goes in the work item directory:- Raw transcripts from fabric -y
- Intermediate analysis notes
- deep thinking working thoughts
- Draft versions of insights
- Any temporary files during the extraction process

Why this pattern:- Ties iterative work artifacts to the work item for learning
- System can analyze how research progresses over time
- Working artifacts provide context for the final outputs

Example work item structure:```
~/.claude/PAI/MEMORY/WORK/-_extract-alpha-analysis/
 raw-transcript.txt
 deep thinking-notes.md
 draft-insights.md
 working-analysis.md
```

Permanent Output (Final Research)

Save final outputs to permanent history:
```bash
~/.claude/History/research/YYYY-MM-DD_description/
```

What goes in history/research/:- extract_alpha.md- The final -insights (formatted output)
- deep thinking-analysis.md- Full deep thinking deep analysis (all dimensions)
- README.md- Documentation of the research session
- Source metadata (URL, title, date analyzed, content type)

Example history structure:```
~/.claude/History/research/--_podcast-analysis/
 README.md                  Research session documentation
 extract_alpha.md           Final -insights
 deep thinking-analysis.md     Full deep analysis
 metadata.json              Source info, timestamps, etc.
```

README.md Template

Create a README.md in the history directory documenting the research:

```markdown
Extract Alpha - [Content Title]

Source Information
- URL/Title:[Source URL or title]
- Content Type:[YouTube video / Article / Podcast / Essay]
- Date Analyzed:YYYY-MM-DD
- Analysis Duration:[Time spent]

Analysis Method
- deep thinking Deep Analysis (-dimension framework)
- Focus on low-probability but brilliant insights

Key Findings Summary
[-sentence summary of the most important insights discovered]

Output Files
- `extract_alpha.md` - Final -highest-alpha insights
- `deep thinking-analysis.md` - Complete deep thinking analysis
- `metadata.json` - Structured source and analysis metadata

Notes
[Any important observations about the analysis process or content]
```

Verification Step (MANDATORY)

ALWAYS verify output is properly captured:
. Check if hooks captured the output:   ```bash
   Check most recent history entries
   ls -lt ~/.claude/History/research/ | head -
   Verify your research directory exists
   ls ~/.claude/History/research/YYYY-MM-DD_description/
   ```

. If hooks did NOT capture automatically:   ```bash
   Create directory structure manually
   mkdir -p ~/.claude/History/research/YYYY-MM-DD_description/

   Save extract_alpha.md (final insights)
   Save deep thinking-analysis.md (full analysis)
   Create README.md (documentation)
   Add metadata.json (source info)
   ```

. Confirm all files saved:   ```bash
   ls -lah ~/.claude/History/research/YYYY-MM-DD_description/
   Should show: README.md, extract_alpha.md, deep thinking-analysis.md, metadata.json
   ```

Complete Workflow Example

```bash
. Get current work directory
WORK_DIR=$(jq -r '.work_dir' ~/.claude/PAI/MEMORY/STATE/current-work.json)

. Work in current work item directory
cd ~/.claude/PAI/MEMORY/WORK/${WORK_DIR}/

. Extract content to work item directory
fabric -y "YOUTUBE_URL" > raw-transcript.txt

. Perform deep thinking analysis (working notes in work item directory)
[Deep thinking happens here, notes saved to work item directory]

. Extract insights
[Extract -insights from deep thinking analysis, draft in work item directory]

. Create permanent history directory
mkdir -p ~/.claude/History/research/$(date +%Y-%m-%d)_podcast-analysis/

. Save final outputs to history
- extract_alpha.md (final insights)
- deep thinking-analysis.md (full deep thinking)
- README.md (documentation)
- metadata.json (source info)

. Verify hooks captured it
ls -lah ~/.claude/History/research/$(date +%Y-%m-%d)_podcast-analysis/

. Note: working artifacts remain tied to work item for learning
(Don't delete working files - they provide context for the work item)
```

Why This Pattern Matters

. Work item integration:Working artifacts are tied to the work item for learning
. System intelligence:PAI can analyze how research progresses over time
. Context preservation:Working files provide context for final outputs
. Proper documentation:README ensures context is preserved in history
. Hook verification:Ensures nothing is lost if hooks fail
. deep thinking preservation:Full deep analysis is saved, not just final insights
. Research continuity:Can revisit analysis methodology later

Output Format

Simple markdown list with blank lines between items for readability:

```markdown
EXTRACT ALPHA

- First high-alpha insight in approachable style

- Second surprising idea that challenges assumptions

- Novel framework or mental model discovered

- Non-obvious connection between concepts

- Counterintuitive observation with implications

- Subtle but profound philosophical point

[... continue for -items total ...]
```

Quality over quantity:If content only has truly novel insights, extract . Don't pad with obvious ideas.

What to Look For

HIGH-ALPHA SIGNALS:
- Makes you stop and reconsider something you thought you knew
- Connects ideas from different domains unexpectedly
- Challenges industry consensus or common wisdom
- Reframes a familiar concept in a surprising way
- Has second-order implications not explicitly stated
- Feels counterintuitive but makes sense upon reflection
- Represents a novel mental model or framework
- Captures a subtle observation with profound weight

LOW-ALPHA SIGNALS (avoid):
- Restates common knowledge
- Obvious implications or direct quotes of main points
- Generic advice that could apply to anything
- Surface-level observations without depth
- Ideas you've heard many times before
- Purely factual information without insight

Comparison to Standard Patterns

extract_wisdom:- Comprehensive: IDEAS, INSIGHTS, QUOTES, HABITS, FACTS, REFERENCES
- Structured -word bullets
- Captures breadth
- Can miss subtle depth

extract_alpha (original):- items, -word bullets
- Focuses on novelty
- Paul Graham style
- Can miss ideas due to mode collapse

extractalpha (this skill):- -items, -word bullets (flexible)
- Deep deep thinking analysis first
- Focuses on low-probability but brilliant insights
- Specifically designed to NOT miss subtle profound ideas
- Prioritizes surprise and novelty over comprehensiveness

Usage Examples

Example : YouTube Video Analysis

```bash
Step : Extract transcript
fabric -y "https://youtu.be/VIDEO_ID"

Step & : Apply this skill (PAI does this automatically)
- Deep deep thinking analysis
- Extract insights
- Output -highest-alpha insights
```

Example : Article Analysis

```typescript
// User provides article URL or text
// PAI:
// . Fetches content (WebFetch or direct paste)
// . Applies deep thinking protocol
// . Extracts insights
// . Returns high-alpha list
```

Integration with PAI

When this skill activates, PAI should:

. Load contentvia appropriate method (fabric -y, WebFetch, Read, or paste)
. Get current work directory- Read `~/.claude/` for `work_dir`
. Use work item directory- Work in `~/.claude/PAI/MEMORY/WORK/{work_dir}/`
. Engage deep thinking mode- Deep extended thinking through all dimensions
. Extract insights- Extract -highest-alpha ideas focusing on low-probability brilliant insights
. Save to history- Final outputs to `~/.claude/History/research/YYYY-MM-DD_description/`
. Verify capture- Ensure hooks captured or manually save all files
. Output simple list- Unformatted markdown, Paul Graham style, -words each
. Prioritize surprise- Novel ideas over obvious takeaways
. Optional verification- For insights with quantitative claims, spot-check via `Workflows/Verify.md` Tier 
Internal Prompt Pattern

```
<instructions>
STEP - DEEP THINKING DEEP ANALYSIS:
Think deeply and extensively about this content:
- What makes you stop and think "wait, WHAT?"
- What feels personally relevant in a surprising way?
- What changes how you see familiar things?
- What sparks genuine curiosity or wonder?
- What would make you want to tell someone about it?
- What creates "holy shit" or "aha!" moments?
- What cross-domain patterns exist (same principle across human/AI, biology/ML, physics/economics)?
- What underlying associations connect seemingly unrelated things?
- What implications aren't explicitly stated?
- What unusual connections exist between ideas?
- What conventional wisdom is being questioned?
- What's genuinely new or surprising?
- What mental models or frameworks emerge?
- What quiet observations carry profound weight?
- What goes against common thinking?
- What does this suggest about the future?

Explore the full conceptual space. Make unexpected connections.
Question assumptions about what's "important."
Prioritize insights that create WONDER, CURIOSITY, PERSONAL RELEVANCE, and CROSS-DOMAIN PATTERNS.
Focus on what's INTERESTING/SURPRISING/INSIGHTFUL, not just technical or comprehensive.

STEP - EXTRACT INSIGHTS:
Generate -highest-alpha insights from your deep analysis.

Focus on:
- Low-probability but brilliant insights
- Ideas that make you pause and think "whoa"
- Cross-domain patterns that reveal same principles across fields
- Underlying associations between seemingly unrelated things
- Connections that feel personally relevant
- Observations that spark wonder or curiosity
- Ideas that make you see familiar things differently
- Insights you'd want to share with someone
- Counterintuitive ideas that challenge assumptions
- Subtle observations with profound emotional weight

For each insight:
- Write in approachable -word bullets (Paul Graham style)
- Avoid surface-level observations
- Capture what's INTERESTING, SURPRISING, and INSIGHTFUL
- Reveal cross-domain patterns and underlying associations
- Include specific details WHEN they enhance the wonder/surprise
- Focus on emotional impact and personal relevance
- Include ideas standard patterns would miss

Output Format:
EXTRACT ALPHA

- [Insight ]

- [Insight ]

[... -total items with blank lines between each ...]
</instructions>

[CONTENT TO ANALYZE]
```

Example Output Quality

What standard extract_alpha might miss:- "We're not building animals, we're building ghosts" (profound reframing)
- "Pre-training is like crappy evolution" (novel framework)
- "Context window is working memory, weights are hazy recollection" (powerful analogy)
- "In-context learning might implement gradient descent internally" (deep technical insight)
- "Agents are trying to get the full thing too early" (historical pattern observation)

What extractalpha (this skill) captures:ALL of the above plus more subtle implications and connections.

Key Principles

. Think first, extract second- deep thinking before output
. Focus on low-probability insights- Don't just grab obvious ideas
. Prioritize surprise- Novel > comprehensive
. Capture subtlety- Profound quiet observations matter
. Challenge assumptions- What's the conventional wisdom being questioned?
. Find connections- Non-obvious links between ideas
. Flexible length- -words, whatever achieves clarity
. Quality threshold- Better brilliant insights than padded ones
. Cross-domain patterns- Same principles across different fields
. Personal relevance- What changes how you see things?

Common Failure Modes to Avoid

. Mode collapse- Only extracting high-probability obvious ideas
. Surface skimming- Missing depth for breadth
. Quote collection- Restating without extracting insight
. Comprehensiveness trap- Trying to capture everything instead of highest alpha
. Rigid formatting- Forcing words when would be clearer
. Obvious takeaways- Extracting main points instead of surprising implications

Success Criteria

You've succeeded with this skill when:
- User says "YES! That's exactly the insight I was thinking about!"
- Extracted ideas include subtle observations you almost missed
- Low-probability but profound insights are captured
- Novel frameworks and mental models are identified
- Reading the extraction makes you reconsider your understanding
- No important surprising ideas are missing from the output

Quick Reference

Four-step process:. Extract content (fabric -y, WebFetch, Read, paste)
. Deep deep thinking (-dimension analysis) - work in work item directory
. Extract insights (-highest-alpha ideas, -words)
. Save to history (verify hooks captured output) - working artifacts stay with work item

Output format:- Simple markdown list with blank lines between items
- Paul Graham approachable style
- -word bullets (flexible)
- Prioritize novelty and surprise

Remember:- Real information is what's different
- Think deeply before extracting
- Focus on low-probability but brilliant insights
- Capture subtle profound observations
- Novel frameworks over obvious takeaways
- Quality over quantity
