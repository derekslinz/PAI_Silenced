<!-- Fictitious example. "Cardinal" is a teaching project name; any resemblance to real products or organizations is coincidental. The example.com domain is RFC reserved. -->
---
task: "Build the Cardinal brand identity system from blank canvas to first surfaces"
slug: -_cardinal-brand-identity-launch
project: Cardinal
effort: deep
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

Cardinal is a six-person fintech startup at `cardinal.example.com` building a single-purpose product: helping new immigrants in the US open their first investment account in under minutes. They have a working product, three angel investors, and a logo their cofounder drew on a napkin. The napkin logo does not survive contact with a px favicon, the website uses three different shades of blue depending on which page you land on, and the most recent investor email signed off with a tone the founder describes as "bank-stiff" while the homepage hero copy describes the product as "your most encouraging financial friend." Every surface contradicts the others.

The product is good. The first users love it. But Cardinal is about to do its first proper marketing push — App Store launch, Hacker News post, paid social on three platforms, partner co-marketing with two community organizations — and the brand cannot sustain that level of exposure. A user who taps the App Store icon, lands on the website, opens the welcome email, and reads the founder's tweet should feel like all four were written and designed by the same intentional person. Right now, four random pieces of clip art communicating four random feelings.

Vision

The founder's mom — who has never used the product and doesn't know what it does — sees the new logo on a coffee shop sticker, says "oh, that's pretty," and a week later texts her son a photo of the same logo on a bus shelter ad asking "is that yours?" That recognition with no prior priming is the target. When the founder opens the brand kit on launch day and clicks through the homepage, the App Store screenshots, the welcome email, the partner one-pager, and the launch tweet, the experience reads as a single voice across five surfaces. Euphoric surprise: the cofounder who drew the napkin logo says "I don't even miss it."

Out of Scope

- Product UI redesign. The brand work informs the existing app's color and type tokens but does not redesign the in-app onboarding flows.
- Naming. The name "Cardinal" stays. No naming exploration, no trademark refile.
- Internationalization of brand voice. English only for v; Spanish-language voice work happens after launch.
- Motion design system. Static brand only. After-effects, Lottie, and animated logos are post-launch.
- Photography library. Stock placeholders are acceptable for the first five surfaces; bespoke photo direction comes later.
- Sub-brand exploration. No "Cardinal for Business," "Cardinal Pro," "Cardinal Wealth" — single master brand only.
- Print collateral beyond the partner one-pager. No business cards, no event signage, no swag.

Principles

- A brand is a recognition system, not a logo.The logo is one of seven elements; the system is the contract.
- Constraint produces character.A two-color palette with one weight of one typeface usually beats six colors and three weights. We start under-decorated and earn additions.
- Voice lives in word choice, not in adjectives about voice."Direct, warm, never patronizing" is what we write under our own paragraph; the test is that someone given the guide can write a paragraph indistinguishable from the founder's.
- Every artifact must survive its smallest size.If the logo doesn't read at px, it doesn't read. If the type system doesn't work in a px form label, it doesn't work.
- Open-source defaults.Type, palette, and icon system must work without paid foundry licenses for early-stage runway, and remain swap-in compatible with paid alternatives later.
- The brand is borrowed from the user, not invented for them.Voice and tone derive from the language the first users use to describe the product, not from a moodboard.

Constraints

- Single sans-serif type family for the entire system (display + body + UI). Two weights maximum.
- Two-color core palette plus a neutral scale of steps. No third hue introduced before launch.
- Logo must remain recognizable at ×px and in -bit black-and-white.
- Type family must have an SIL Open Font License (OFL) version available; no paid-only foundry dependencies in v.
- Voice guide ships as a single page with worked examples; no -page brand book.
- Brand kit is delivered as a Figma file at `figma.com/cardinal-brand-v` and a GitHub repo at `github.example.com/cardinal/brand-v` (mirrored, both public).
- Color contrast must pass WCAG .AA for all text + background combinations the system can produce.
- All five launch surfaces (homepage hero, App Store screenshot set, welcome email, partner one-pager, launch tweet) ship from the same kit on the same day.
- No AI-generated illustrations in the launch surfaces. Hand-drawn or geometric only.

Goal

Deliver a complete Cardinal brand identity v— logo (lockups), type system (family, weights, sizes), color palette (hues + -step neutral), voice and tone guide (page with worked rewrites), and the first marketing surfaces (homepage hero, App Store screenshot set, welcome email, partner one-pager, launch tweet) — all designed against constraints that survive the smallest-size and -bit tests, packaged as a Figma file and a public GitHub repo, ready to ship together on the founder-confirmed launch date of April , .

Criteria

- [x] ISC-: Wordmark and standalone mark exist as separate Figma components with shared baseline.
- [x] ISC-: Three logo lockups in the kit: horizontal wordmark, stacked wordmark + mark, mark-only.
- [x] ISC-: Antecedent: logo wordmark renders legibly at ×px (probe: Skill('Interceptor') screenshot at `cardinal.example.com/favicon.ico` — three unfamiliar viewers identify "Cardinal" within seconds, ≥/succeed).
- [x] ISC-: Antecedent: logo mark survives -bit black-and-white conversion without losing recognizability (probe: viewer test — people shown -bit version next to color version, ≥/say "same logo").
- [x] ISC-: Logo files exported to SVG (master), PNG @x/@x/@x, and ICO favicon.
- [ ] ISC-: Logo clear-space rule documented (≥ ½ × cap height on all sides).
- [x] ISC-: Type family selected with confirmed OFL license (probe: `head -fonts/<family>/LICENSE.txt` shows SIL OFL .).
- [x] ISC-: Type system defines exactly sizes: , , , , , (px on web; pt on print).
- [x] ISC-: Type system uses exactly weights: Regular and Semibold .
- [ ] ISC-: Antecedent: body copy at px renders cleanly at .× line-height across Chrome, Safari, Firefox latest (probe: Interceptor screenshot diff per browser, no kerning regressions).
- [x] ISC-: Color palette defines exactly hue tokens: `cardinal-red-` (primary) and `dawn-` (secondary).
- [x] ISC-: Neutral scale defines exactly steps: `ink-`, `ink-`, `ink-`, `ink-`, `ink-`.
- [x] ISC-: Color palette exported as CSS custom properties at `tokens/colors.css`.
- [ ] ISC-: Color palette exported as Figma styles in the kit file.
- [x] ISC-: WCAG .AA contrast confirmed for all foreground/background pairs the system permits (probe: `bun scripts/contrast-check.ts` exits ).
- [ ] ISC-: Voice guide exists at `brand/voice.md`, fits on one printed page (≤ lines).
- [ ] ISC-: Voice guide includes worked rewrites — the same sentence in "off-brand" and "on-brand" form for: confirmation, error, marketing headline, support reply, social caption, legal disclosure.
- [ ] ISC-: Antecedent: the founder, given a fresh paragraph drafted by an outsider against the voice guide, cannot tell which sentence the outsider wrote vs the founder rewrote (probe: blind A/B test with founder, target ≥ % confusion across trials).
- [ ] ISC-: Voice guide explicitly names things voice does NOT do (anti-voice prompts).
- [x] ISC-: Homepage hero (`cardinal.example.com/`) uses the new logo, type, and color tokens — no legacy assets.
- [ ] ISC-: App Store screenshot set (screens) designed in the kit, exported at App Store-required resolutions for iPhone ." and .".
- [ ] ISC-: Welcome email template (`emails/welcome.html`) renders with brand fidelity in Gmail, Apple Mail, Outlook (probe: Litmus screenshot diff across clients).
- [ ] ISC-: Partner one-pager exists at `brand/partner-one-pager.pdf`, page, prints correctly on US Letter and A.
- [ ] ISC-: Launch tweet draft is in the kit at `brand/launch-tweet.md` with associated ×image.
- [ ] ISC-: All launch surfaces use the same logo lockup — no variant drift.
- [ ] ISC-: All launch surfaces use the same hex value for the primary brand color (probe: `bun scripts/surface-color-audit.ts` reports zero deviations from `cardinal-red-`).
- [ ] ISC-: All launch surfaces use the same type family at the same weight scale.
- [ ] ISC-: Anti: the logo mark resembles a generic compass, leaf, or arrow more than the chosen form (probe: viewer test — show mark to people unfamiliar with the brand, ask "what does it look like?", fewer than mention generic shapes).
- [ ] ISC-: Anti: any launch surface uses a color not in the published palette (probe: surface-color-audit script).
- [ ] ISC-: Anti: the chosen typeface lacks an OFL or otherwise-redistributable alternative (probe: license header check).
- [ ] ISC-: Anti: the voice guide reads as so prescriptive that the founder's own writing fails it (probe: founder writes a -paragraph product update without referring to the guide; voice guide author scores it; ≤ violation).
- [ ] ISC-: Anti: the App Store screenshots use placeholder text like "Lorem ipsum" or "Your headline here" anywhere visible.
- [ ] ISC-: Anti: any surface includes the cofounder's napkin logo (probe: visual diff against retired-asset folder).
- [ ] ISC-: Anti: the welcome email signs off with the same first-line greeting as any other Cardinal email template (probe: `rg "^Hi there" emails/` returns ≤ match).
- [x] ISC-: Figma kit file is shared with edit access for the founder and read access for the cofounder + angels.
- [ ] ISC-: GitHub repo `github.example.com/cardinal/brand-v` mirrors the Figma kit's exported assets (logo SVG/PNG, color tokens, type tokens, voice guide).
- [ ] ISC-: README in the brand repo includes a "How to use this kit" section with examples: web, email, print, social.
- [ ] ISC-: Brand assets repo includes a `LICENSE` for the assets (CC BY .for marketing usage; logo trademark notice separate).
- [ ] ISC-: Logo SVG validates as well-formed (probe: `xmllint --noout brand/logo.svg`).
- [ ] ISC-: Logo SVG file size ≤ KB.
- [ ] ISC-: Favicon at ×, ×, ×packed into a single .ico file at `cardinal.example.com/favicon.ico`.
- [ ] ISC-: Apple touch icon at ×served at `cardinal.example.com/apple-touch-icon.png`.
- [ ] ISC-: Open Graph image at ×served at `cardinal.example.com/og.png` using the launch lockup.
- [ ] ISC-: Internal "voice gut-check" form exists in the kit — -question checklist anyone on the team runs against any draft before publishing (Is it direct? Warm without being cute? Specific instead of generic? Free of jargon the user wouldn't say?).
- [ ] ISC-: Tone-by-context table exists in the voice guide: marketing, transactional, error, support, legal — one row each, with do/don't examples.
- [ ] ISC-: Anti: voice guide adjectives appear as the only definition of voice with zero worked examples (probe: voice guide must contain ≥ sentence-level rewrites in addition to any descriptors).
- [ ] ISC-: Brand guideline page rendered at `cardinal.example.com/brand` and crawlable.
- [ ] ISC-: Press kit downloadable as a single ZIP at `cardinal.example.com/press`, includes logos in formats and a -word company description.
- [ ] ISC-: Antecedent: the launch tweet image, when posted to X without context text, draws ≥ unprompted DM replies asking "what's Cardinal?" within hours of test post (probe: founder dry-run on personal account days pre-launch).
- [ ] ISC-: Three angel investors, given the kit cold (no walkthrough), can identify which surface is on-brand vs a planted decoy in of trials.
- [ ] ISC-: Cofounder (the napkin-logo author) signs off in writing on the new mark.
- [x] ISC-: All retired assets (napkin logo, three legacy blues, prior tagline) moved to `brand/_retired/` with a README explaining why.
- [ ] ISC-: Anti: more than two new colors or new type weights are introduced between vlock and launch (probe: git diff on tokens/ between freeze tag and launch tag — line count ≤ additions).
- [ ] ISC-: A "vfreeze" tag is cut on the brand repo at least days before launch.
- [ ] ISC-: Launch retrospective scheduled for May , , with the founder, cofounder, and the brand designer.
- [ ] ISC-: Antecedent: the founder reports the "I don't miss the napkin logo" feeling — captured verbatim in retro notes (probe: retro doc, search for the exact quote or a paraphrase the founder confirms).

Test Strategy

```yaml
- isc: ISC-  type: experiential-probe
  check: legibility at px favicon
  threshold: ≥/unfamiliar viewers identify "Cardinal" within seconds
  tool: Skill('Interceptor') screenshot + -viewer survey

- isc: ISC-  type: experiential-probe
  check: -bit B&W recognizability
  threshold: ≥/viewers say "same logo" as color version
  tool: viewer survey

- isc: ISC-  type: license-probe
  check: typeface OFL .  threshold: license header matches "SIL OPEN FONT LICENSE Version ."
  tool: head fonts/<family>/LICENSE.txt

- isc: ISC-  type: contrast
  check: WCAG .AA across all permitted FG/BG pairs
  threshold: zero violations
  tool: bun scripts/contrast-check.ts

- isc: ISC-  type: experiential-probe
  check: voice guide reproducibility
  threshold: ≥% founder confusion across blind A/B trials
  tool: blind A/B test (Outsider draft + Founder rewrite vs Founder draft)

- isc: ISC-  type: visual-audit
  check: primary color hex consistency across launch surfaces
  threshold: zero deviations from cardinal-red-  tool: bun scripts/surface-color-audit.ts

- isc: ISC-  type: anti-probe
  check: voice guide must not over-prescribe
  threshold: ≤voice violation in founder's own unguided -paragraph draft
  tool: voice author scores founder draft

- isc: ISC-  type: experiential-probe
  check: launch tweet image draws unprompted curiosity
  threshold: ≥DM replies asking "what is this" within hours
  tool: founder dry-run on personal X account, days pre-launch

- isc: ISC-  type: experiential-probe
  check: angels can sort on-brand vs decoy
  threshold: of correct identifications
  tool: -trial sort with planted decoys (off-brand color, off-brand voice, off-brand lockup)
```

Features

```yaml
- name: LogoSystem
  description: Wordmark, standalone mark, three lockups; export pipeline to SVG/PNG/ICO; px and -bit survival; cofounder sign-off on retired napkin logo.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false

- name: TypeAndColorTokens
  description: Single OFL typeface with weights and sizes; -hue palette plus -step neutral; CSS custom properties + Figma styles; WCAG AA contrast across all permitted pairs.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: VoiceAndTone
  description: One-page voice guide with worked rewrites, anti-voice list, tone-by-context table, voice gut-check checklist; founder reproducibility test.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: LaunchSurfaces
  description: Homepage hero, App Store screenshot set, welcome email, partner one-pager, launch tweet — all built from the kit, all using the same lockup, color, and type weight scale.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [LogoSystem, TypeAndColorTokens, VoiceAndTone]
  parallelizable: true

- name: KitDistribution
  description: Figma kit file with appropriate access; mirrored GitHub repo with assets + tokens + voice guide + LICENSE; README with usage examples; brand page on the marketing site; downloadable press ZIP.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [LaunchSurfaces]
  parallelizable: false

- name: LaunchGovernance
  description: vfreeze tag days pre-launch; angel-investor sort test; founder reproducibility check; anti-drift audits; retrospective scheduled and run; the "I don't miss the napkin logo" capture.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [KitDistribution]
  parallelizable: false
```

Decisions

- --:: Single typeface for the whole system over a display + body pairing. The product is small, the team is small, the budget is small, and most "two-typeface" systems reduce to "one of these typefaces does % of the work." Pick the one that does both jobs and own the constraint as character.
- --:: Two-hue palette over a richer multi-hue system. The ten Cardinal users we asked described the brand feeling as "warm and not cluttered." A wider palette makes "not cluttered" harder to keep, not easier.
- --:: Voice derives from corpus mining, not from adjectives. Pulled user-written reviews and support replies, ran them through extraction, found that users describe the product with the words "patient," "specific," and "doesn't talk down." Those three words now anchor the guide. Adjectives the founder originally wanted ("bold," "trustworthy," "modern") were rejected because no user used them.
- --:: DEAD END: Tried building a custom serif display companion to the sans body — days of exploration. Killed because none of the candidate serifs survived the px favicon test, and pairing forced lockup variants that broke the "all five surfaces use the same lockup" constraint. The single-typeface decision held.
- --:: refined: ISC-and ISC-promoted to Antecedent prefix. They are not just probes; they are the preconditions that produce the recognition-without-priming experience the Vision describes. If they fail, the Vision is unreachable regardless of what else passes.
- --:: DEAD END: Considered a paid foundry license for a typeface the founder loved. Rejected after pricing — $,/year for the weights we'd need at the user count we'd reach. Rolled back to OFL alternatives, found one that passed every probe within a week of evaluation, and the founder now prefers it. The constraint produced the better answer.
- --:: refined: added ISC-after the cofounder asked "but how do we know the launch tweet will actually work?" Founder dry-run on personal X account is the only honest probe. If the image doesn't draw curiosity from people who don't know what Cardinal is, the brand isn't doing its job, regardless of how much we like it.
- --:: refined: ISC-added after the first voice guide draft was so prescriptive that the founder's own writing failed it. The guide must describe the floor of voice, not the ceiling — the founder's natural writing must clear it without effort.
- --:: Cofounder signed off on the new mark in writing. Logged the napkin logo retirement to `_retired/README.md` with the cofounder's quote: "It served us. The new one is the one we needed."
- --:: refined: ISC-added — three angels given the kit cold, asked to sort on-brand vs planted decoys. If people who paid for this brand can't tell on-brand from off-brand without a walkthrough, the brand isn't a system yet.

Changelog

- --conjectured: a custom serif display face paired with the OFL sans body would give Cardinal a more distinctive editorial voice on marketing surfaces while keeping product UI clean. / refuted by: days of exploration produced no serif candidate that survived the px favicon test or the -bit survival test; pairing also forced two extra lockups for surfaces where serifs and sans collided, breaking the "single lockup across surfaces" constraint. / learned: the constraints we'd already locked in (px legibility, -bit survival, surface lockup consistency) implicitly forbade dual-typeface systems for our scale. The constraints did the deciding before the moodboard did. / criterion now: ISC-/ ISC-/ ISC-stand — single OFL family, weights, sizes — and the rejected pairing is documented in `_retired/typeface-exploration.md`.

- --conjectured: legibility at px and -bit survival were ordinary verifiable ISCs. / refuted by: the Vision section names a specific experience — recognition without prior priming — and that experience is impossible if the logo can't survive a coffee-shop sticker glance or a low-fidelity reproduction. The probes aren't just verifying; they're naming the precondition for the Vision to be reachable at all. / learned: experiential goals require Antecedent ISCs — preconditions that must hold for the target experience to even be possible. Without them, the Vision is decoupled from the criteria. / criterion now: ISC-and ISC-carry the `Antecedent:` prefix; ISC-, ISC-, ISC-, ISC-added as additional Antecedents anchoring other Vision claims.

- --conjectured: the brand could afford a paid foundry license for a typeface the founder personally preferred. / refuted by: pricing for the weights and seats we'd need across the lifetime of the early-stage runway came to $,/year — disproportionate to the design value gained over OFL alternatives that pass every probe equally well. / learned: paid-only typeface dependencies are a hidden lock-in that compounds at every team-size and surface-count milestone; the OFL constraint isn't a downgrade, it's a future-proofing decision. / criterion now: ISC-(OFL license confirmed) is now a hard Constraint; ISC-(Anti: typeface lacks OFL alternative) backstops it.

- --conjectured: the voice guide could safely be prescriptive — the more specific the rules, the more reproducible the voice. / refuted by: the founder's own unguided -paragraph product update failed the first draft of the guide on of sentences. A guide that the natural voice fails is a guide that isn't describing the natural voice — it's inventing one. / learned: voice guides describe the floor of acceptable, not the ceiling of ideal. The probe for the guide is whether the person whose voice you're capturing clears it without trying. / criterion now: ISC-(Anti: founder's own unguided draft fails the guide) added as a hard probe; voice guide rewritten against this constraint and re-tested.

Verification

- ISC-: Figma file `cardinal-brand-v` shows wordmark and standalone mark as separate components, confirmed via component inspector. Verified --.
- ISC-: Interceptor screenshot of `cardinal.example.com/favicon.ico` rendered in browsers; viewer survey of unfamiliar designers — /identified "Cardinal" within seconds. Verified --.
- ISC-: -bit B&W viewer test — /viewers said "same logo." Verified --.
- ISC-: `ls brand/logo/` shows `cardinal.svg` (master), `cardinal@x.png`, `cardinal@x.png`, `cardinal@x.png`, `favicon.ico`. Verified --.
- ISC-: `head -fonts/<family>/LICENSE.txt` returns `SIL OPEN FONT LICENSE Version .- February `. Verified --.
- ISC-: `cat tokens/colors.css` shows seven `--cardinal-` and `--ink-` custom properties matching palette spec. Verified --.
- ISC-: `bun scripts/contrast-check.ts` exits ; output confirms /permitted FG/BG pairs pass WCAG .AA. Verified --.
- ISC-: Homepage screenshot diff against staging shows new logo, type tokens, and color tokens; legacy assets purged from `public/`. Verified --.
- ISC-: Figma share dialog screenshot confirms founder has Edit, cofounder + angels have Read. Verified --.
- ISC-: `ls brand/_retired/` shows `napkin-logo.png`, `legacy-blues.css`, `prior-tagline.md`, and `README.md` with retirement rationale. Verified --.
