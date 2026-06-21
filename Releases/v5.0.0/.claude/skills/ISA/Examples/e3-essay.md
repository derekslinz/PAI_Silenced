<!-- Fictitious example. The essay topic is a teaching placeholder; any resemblance to real essays or authors is coincidental. -->

---
task: "Write a -word essay on why most productivity advice fails first-time founders"
slug: -_essay-productivity-fails-founders
project: ProductivityEssay
effort: advanced
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

I have a thesis about why generic productivity advice (`time-blocking`, `deep work`, `eat the frog`) lands wrong for someone running a -month-old startup with no team. The thesis is in my head; it isn't on the page. A draft I started a week ago reads like a list of complaints rather than an argument with a clear shape — opening hook is weak, the through-line dies in the third section, the closing punches air. Without a structural framework, the essay will keep failing the same way.

Vision

A -word essay that a first-time founder reads in eight minutes, recognizes their own situation in the second paragraph, follows a single load-bearing argument through three movements, and arrives at a conclusion that reframes their relationship to productivity advice — not "ignore it" but "ignore most of it for now, and here's how to tell which % applies." Euphoric surprise: a reader closes the tab, opens a notes file, and writes one sentence about which productivity advice they're going to ignore for the next days. They tell one friend.

Out of Scope

- Not a productivity-advice listicle.No "productivity hacks for founders." The essay is structural critique, not new advice.
- Not a manifesto.No "Here's the new way." The conclusion is calibration, not replacement.
- No founder name-checks.No anecdotes that depend on knowing a specific founder's story; the argument has to land for a reader who's never read TechCrunch.
- Not a Twitter thread.Long-form, single document, lands as one continuous read.
- Not a research paper.Zero citations, zero footnotes; the argument's force comes from clarity, not external authority.

Principles

- The reader's recognition in the second paragraph is the load-bearing moment. Without it, nothing else lands.
- One thesis, one through-line. Cut anything that requires the reader to hold a second argument in parallel.
- Concrete > abstract. Every claim has a concrete situation behind it; otherwise the claim reads as platitude.
- The closing must do work — name something the reader will do differently — not just summarize.
- Voice is conversational-direct. No "Here's the thing", no "It turns out". No academic hedging.

Constraints

- words ± (–final).
- Three sections only — opening, middle, close. No subheaders.
- Reading time ≤ minutes at wpm.
- Zero footnotes, zero citations, zero "as <famous person> says".
- No bulleted lists in the body (one allowed in the close if it earns its place; otherwise zero).
- Published as a single Markdown file with frontmatter; no embedded images, no pull quotes.

Goal

Ship a –-word essay in three sections that opens with a concrete first-time-founder situation the reader recognizes within seconds, develops a single thesis ("most productivity advice was built for a different game"), and closes with a calibration tool the reader can apply within hours — a one-question filter for which advice to keep and which to drop.

Criteria

Word count and structure

- [x] ISC-: Final word count ∈ [, ] (probe: `wc -w essay.md` minus frontmatter).
- [x] ISC-: Exactly three top-level sections, no subheaders (probe: `rg -c "^" essay.md` returns — opening header, middle header, close header).
- [ ] ISC-: Each section is –words (probe: word count per section between header lines).
- [ ] ISC-: Reading time ≤ minutes at wpm (computed: `wc -w / `).

Argument structure

- [x] ISC-: Opening section ends with a one-sentence thesis statement (probe: human review confirms last sentence of opening section is the thesis).
- [ ] ISC-: Middle section advances the thesis through ≥ distinct examples (probe: human review confirms three concrete situations, none requiring outside knowledge).
- [ ] ISC-: Close section names a specific calibration tool (the one-question filter) the reader can apply within hours.
- [ ] ISC-: Through-line test: a reader can articulate the thesis in ≤ words after a single read (probe: unfamiliar readers each summarize the thesis; ≥ /land within ±words of the same summary).

Voice and tone

- [x] ISC-: Zero occurrences of "Here's the thing", "It turns out", "Not just X — it's Y" (AI-writing-pattern probe: rg against AI_WRITING_PATTERNS list returns ).
- [ ] ISC-: Zero footnotes, zero numeric citations, zero "as <person> says" formulations (probe: `rg "\[?\^?\d+\]" essay.md` returns ; `rg "as [A-Z]" essay.md` returns ).
- [ ] ISC-: Sentence-length variance: at least one sentence ≤ words and at least one ≥ words in each section (probe: per-section sentence-length histogram).
- [ ] ISC-: First-person plural ("we", "us") count ≤ across the whole essay (probe: `rg -wc "we|us|our" essay.md`).

Antecedent ISCs (preconditions for the target experience)

- [x] ISC-: Antecedent:the second paragraph contains a concrete situation that %+ of first-time founders will recognize as their own within seconds (probe: unfamiliar founder readers, ≥ /mark "yes, that's me" on a post-read -question survey).
- [ ] ISC-: Antecedent:the thesis sentence (end of opening) is hard-to-vary — replacing any noun or verb in it with a synonym detectably weakens the argument (probe: human review of paraphrases shows clear semantic loss).
- [ ] ISC-: Antecedent:the close's calibration tool (the one-question filter) is concrete enough that a reader can apply it without re-reading the essay (probe: readers given only the close section can articulate what to do; ≥ /succeed).

Bitter Pill discipline

- [ ] ISC-: No paragraph could be moved to a different essay without rewriting at least its first sentence (probe: paragraph-portability review — every paragraph has at least one phrase that anchors it to this essay's specific argument).
- [ ] ISC-: No sentence is filler — removing any single sentence detectably weakens the argument or rhythm (probe: read-aloud test, sentences flagged at random, removal test).

Anti-criteria

- [ ] ISC-: Anti: out of scope — the essay does NOT include a numbered list of productivity hacks (probe: `rg "^\d\." essay.md` returns ).
- [ ] ISC-: Anti: regression — no sentence longer than words (probe: longest sentence ≤ words; a single + -word sentence is the canary that the writing has drifted into academic register).
- [ ] ISC-: Anti: voice — the essay does NOT name a specific famous founder (e.g., "as Paul Graham wrote") (probe: `rg -i "paul graham|sam altman|peter thiel|naval|elon|jeff bezos|steve jobs"` returns ).
- [ ] ISC-: Anti: scope — the essay does NOT propose a new productivity framework or system (probe: human review confirms zero "Introducing the X method" formulations).

Iteration discipline

- [ ] ISC-: At least drafts captured in `drafts/` directory before final (probe: `ls drafts/ | wc -l` ≥ ).
- [ ] ISC-: Final draft was read aloud once before publishing (probe: Decisions entry confirming read-aloud pass).
- [ ] ISC-: At least unfamiliar readers (not friends-being-nice) gave first-impression feedback before publishing (probe: Decisions entries citing reader IDs/initials).

Publishing

- [ ] ISC-: Final file is `essay.md` at the project root with frontmatter `title`, `published_at`, `word_count`, `reading_time_min`.
- [ ] ISC-: Markdown renders cleanly on the target publishing platform (probe: preview render shows three sections, no broken formatting).
- [ ] ISC-: A -character pull-quote is captured for social syndication (probe: file `pullquote.txt` exists with content ≤ chars).
- [ ] ISC-: An "if I had to cut more words" note is captured for future re-reads (probe: file `cuts-on-deck.md` lists candidate cuts).

Post-publish euphoric-surprise probes

- [ ] ISC-: Within days, ≥ reader reports they identified one piece of advice they're going to drop (probe: replies/comments/messages search).
- [ ] ISC-: Within days, ≥ reader forwards the essay to a fellow founder unprompted (probe: web analytics referrer or direct report).

Personal discipline

- [ ] ISC-: A "what I cut" file is preserved at `cuts.md` showing what was edited out (probe: file exists, ≥ words of cuts).
- [ ] ISC-: The frontmatter `started` and `published_at` timestamps reflect the actual ≥ -day gestation (probe: timestamps).
- [ ] ISC-: A short Decisions entry captures which paragraph caused the most rewriting and why (lessons for next essay).
- [ ] ISC-: At least one DEAD END Decisions entry exists (a draft direction that was tried and abandoned).

Test Strategy

```yaml
- isc: ISC-  type: word-count
  check: total words in body
  threshold: -  tool: awk '/^---$/{c++; next} c==' essay.md | wc -w

- isc: ISC-  type: reader-comprehension
  check: unfamiliar readers articulate thesis in ≤ words within ±of each other
  threshold: ≥ /cluster
  tool: send essay to reader-test slots, collect -sentence summaries

- isc: ISC-  type: ai-writing-pattern
  check: AI-writing-pattern density
  threshold: occurrences from Plist
  tool: rg -i "here's the thing|it turns out|not just .— it's" essay.md

- isc: ISC-  type: antecedent-probe
  check: founder readers say "yes, that's me" to second paragraph
  threshold: ≥ /  tool: -person reader test, post-read -q survey

- isc: ISC-  type: post-publish
  check: ≥ reader names a specific advice they're dropping
  threshold: within days
  tool: monitor replies, comments, DMs for days
```

Features

```yaml
- name: OpenerSituation
  description: Concrete first-time-founder situation that reader recognizes in s
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false  opener gates everything else

- name: MiddleArgument
  description: Three distinct concrete examples advancing the single thesis
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [OpenerSituation]
  parallelizable: false  the through-line is sequential

- name: CalibrationClose
  description: One-question filter the reader can apply within h
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: [MiddleArgument]
  parallelizable: false

- name: VoicePass
  description: AI-writing-pattern scrub + sentence-length variance + first-person discipline
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [CalibrationClose]
  parallelizable: true  cosmetic pass on full draft

- name: ReaderFeedback
  description: Two unfamiliar reader passes; second-paragraph recognition probe
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [VoicePass]
  parallelizable: true  readers are independent
```

Decisions

- --:: Three sections, no subheaders, locked. The form constraint forces the through-line to be load-bearing.
- --:: DEAD END: Tried opening with a quote from a public figure. Felt borrowed; reader's recognition stayed external. Reverted to a concrete-situation opener. Don't retry.
- --:: refined: ISC-sharpened from "readers find the opening relatable" to "≥ /founder readers mark 'yes, that's me' to the second paragraph specifically." The first phrasing was unfalsifiable; the second isolates the load-bearing moment.
- --:: DEAD END: Tried structuring the middle as five examples instead of three. The fifth and fourth examples started repeating each other; cut to three with one extended. Don't retry.
- --:: refined: ISC-sharpened from "close offers a takeaway" to "close names a specific calibration tool the reader can apply within hours." Vague closes are why most essays of this shape fail to land.
- --:: refined: ISC-added (≤ first-person plural) after a draft read like a "we should all" sermon. The essay is observation, not exhortation.

<!--
Eart ISA. Required sections: Problem, Vision, Out of Scope, Constraints, Goal, Criteria, Features, Test Strategy.
Optional Principles included because the essay is experiential and the principles do real work in the writing pass.
ISC count of exceeds the Efloor of . Three Antecedent ISCs (ISC-, , ) carry the experiential-goal contract: they name the preconditions that reliably produce the target reader experience. Without them, ISC-and ISC-(post-publish reception) would be unfalsifiable hopes rather than testable claims. Anti-criteria (ISC-, , , ) cover scope, regression, voice, and a future-essay-drift trap. The Decisions section shows two DEAD ENDs and three refinements — typical density for a first draft of an essay that knows its shape but is still finding its load-bearing moments.
-->
