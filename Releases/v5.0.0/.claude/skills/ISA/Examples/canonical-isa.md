<!-- Fictitious example. "BeanLine" is a teaching project name; any resemblance to real products or organizations is coincidental. The beanline.example.com domain is RFC reserved. -->

---
task: "Build BeanLine — peer-to-peer specialty-coffee bean marketplace"
slug: -_beanline-vproject: BeanLine
effort: comprehensive
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

Specialty-coffee roasters with small-batch lots (under kg) and home-roasting hobbyists with green-bean surplus have no good place to find each other. Existing marketplaces (eBay, Etsy, Reddit's r/coffee) either don't support food-safe shipping logistics, charge consumer-marketplace fees that eat the margin on a kg lot, or have zero buyer trust signals for "is this bean stored properly?" Most lots end up sold at coffee festivals (one weekend a year) or composted. The supply exists. The connective tissue does not.

Vision

A small focused marketplace at `beanline.example.com` where a verified roaster lists a –kg lot with origin, processing, harvest date, moisture content, and tasting notes; a verified buyer (home roaster or small cafe) browses by region and process, pays via escrow-Stripe, and the lot ships with a QR-coded handoff card the buyer scans on receipt to confirm condition. Euphoric surprise: a roaster lists Colombia Geisha Wednesday and ships it to a third-wave cafe in Portland on Friday — no festival, no haggling, no Reddit DM dance.

Out of Scope

- No retail-bag pricing.Minimum lot kg. Below that, the unit economics break for both sides.
- No green-bean futures or pre-harvest contracts.Existing physical lots only.
- No roasted-bean retail.Green coffee only; once it's roasted, the freshness window collides with shipping speed.
- No multi-currency.USD only in v; international expansion requires a real customs and excise story we don't have.
- No social-graph features.No follow / friend / DM. Buyer-seller messaging is per-listing, not per-user-relationship.
- No machine-only quality verification.Listings carry seller-supplied data + buyer-confirmation handoff card; no third-party assay until v.
- No mobile native apps.Web + PWA install. The buyer is at a desk pricing lots, not in line for boba.

Principles

- Buyer trust beats catalog size. A verified-buyer + verified-seller marketplace with lots beats an open marketplace with ,lots and one fraud incident.
- The handoff card is the product, not the website. A clean post-shipment confirmation flow is what makes the next listing land.
- Roaster economics are non-negotiable: under % all-in fees or it doesn't beat festival sales.
- Defaults teach. If a buyer's first three searches return relevant lots, they convert; if the first three return junk, they leave.
- Editorial signals beat algorithmic personalization at this scale. Curation by humans (an in-house quality lead reviewing every new listing) is cheaper than building a recommendation engine.

Constraints

- Edge SSR on Cloudflare Workers + D+ R. No third-party hosting in the user path.
- Auth via magic-link email only in v. No password, no SSO. Verified-status (roaster vs buyer) gated by manual review of submitted business proof.
- Stripe Connect for escrow + split payments. No homegrown payment.
- All-in fees ≤ % (Stripe ~.% + ¢ + BeanLine margin ≤ .%).
- Bundle budget: ≤ KB JS gzipped on the listing page; ≤ KB CSS gzipped.
- pcold load on cellular ≤ s for browse pages, ≤ .s for the listing detail page.
- Image storage in Rwith eager WebP transcoding; no original JPEGs ever served.
- Public read API rate-limited at req/min/IP via Cloudflare WAF.
- All buyer-seller messaging logged for dispute resolution; retention months minimum.
- HTTPS-only; HSTS preload-listed.

Goal

Ship a Cloudflare-hosted marketplace at `beanline.example.com` where verified roasters can list –kg green-coffee lots and verified buyers can purchase via Stripe escrow with QR-handoff confirmation; the platform takes ≤ .% margin (≤ % all-in including Stripe), browse pages render in ≤ s pon cellular, and the in-house quality lead can approve a new listing in ≤ minutes per lot.

Criteria

Build & Deploy

- [x] ISC-: `bun run deploy` exits against production wrangler env.
- [x] ISC-: TypeScript strict-mode build emits errors.
- [x] ISC-: `beanline.example.com` returns HTTP with `text/html`.
- [x] ISC-: Deployed version string in HTML head matches local git short-sha.

Listing Lifecycle

- [x] ISC-: A roaster can submit a new listing with origin, process, harvest date, moisture %, lot weight (kg), price ($/kg), tasting notes, ≥ photo (probe: form submission test).
- [x] ISC-: Submitted listings enter `status: pending_review` and are not publicly visible (probe: `curl /listings/<id>` returns for anonymous; visible to roaster + admin).
- [ ] ISC-: Quality lead can approve or reject a pending listing in ≤ minutes per lot (probe: ops-tool timing telemetry, p≤ s).
- [x] ISC-: An approved listing appears at `beanline.example.com/lots/<slug>` within seconds of approval (probe: `curl` after approval).
- [ ] ISC-: A sold-out listing is hidden from the browse page within seconds of the final unit selling.

Browse and Search

- [x] ISC-: `beanline.example.com/browse` paginates available lots, per page, sorted by newest-listed.
- [x] ISC-: `beanline.example.com/browse?region=<region>` filters lots by origin region (Africa, Americas, Asia-Pacific).
- [x] ISC-: `beanline.example.com/browse?process=<process>` filters lots by processing method (washed, natural, honey, anaerobic, …).
- [ ] ISC-: Browse page pcold load on simulated G ≤ ms (probe: Lighthouse mobile).
- [ ] ISC-: Listing detail page pcold load ≤ ms.
- [ ] ISC-: Search query `?q=<term>` matches against origin, process, and tasting-notes fields with case-insensitive substring (probe: integration test against fixture lots).

Auth and Verification

- [x] ISC-: `/auth/magic-link` accepts an email and emails a -minute single-use link.
- [x] ISC-: Magic-link callback creates a session cookie (`HttpOnly; Secure; SameSite=Lax`).
- [x] ISC-: A new user starts as `role: buyer_unverified`. Verification (business proof) elevates to `buyer_verified` or `roaster_verified`.
- [ ] ISC-: Only `roaster_verified` users can submit listings (probe: `POST /listings` from `buyer_unverified` session returns ).
- [ ] ISC-: Only `buyer_verified` users can purchase (probe: `POST /checkout` from `buyer_unverified` returns with "verification required" message).

Payments and Escrow

- [x] ISC-: Stripe Connect onboarding flow lives at `/account/payouts` for `roaster_verified` users.
- [x] ISC-: Stripe Checkout creates an escrow charge: funds are held until handoff-confirm.
- [ ] ISC-: BeanLine platform fee ≤ .% of lot price; total all-in (BeanLine + Stripe) ≤ % (probe: post-checkout fee breakdown JSON includes both, sum ≤ %).
- [ ] ISC-: Stripe webhook `payment_intent.succeeded` flips listing to `status: in_transit` and emails roaster a printable handoff card.
- [ ] ISC-: Buyer-confirm handoff (QR scan) flips status to `status: delivered`, releases escrow to the roaster, and emails buyer a receipt.
- [ ] ISC-: If buyer does NOT confirm within days of carrier-tracking-delivered, escrow auto-releases on day with a Decisions-logged audit entry.

Messaging and Disputes

- [ ] ISC-: Buyer can message the roaster from the listing page; messages are scoped to that listing only.
- [ ] ISC-: Messages are retained for months (probe: SELECT against retention policy).
- [ ] ISC-: A "Open dispute" button on the listing page (visible only after purchase) creates a `dispute` row with status `open` and notifies both parties.

RBAC / Visibility

- [x] ISC-: Anonymous users can browse and view listings but cannot purchase or message (probe: each protected endpoint returns ).
- [ ] ISC-: `roaster_verified` users see their own listings in `/account/listings` regardless of status; never see other roasters' pending listings.
- [ ] ISC-: Admin role gates `/admin/` routes; non-admins receive .

Performance and Operational

- [ ] ISC-: `/health` returns `{status, version, last_deploy_at}` in ≤ ms.
- [ ] ISC-: All Rimage fetches go through a transform Worker that delivers WebP (probe: `Content-Type: image/webp` on every `/img/...` URL).
- [ ] ISC-: Public read API at `/api/lots` rate-limits to req/min/IP via Cloudflare WAF (probe: st request in s returns ).

Anti-criteria

- [ ] ISC-: Anti: out of scope — `/api/follow`, `/api/dm`, and any social-graph endpoint return (probe: curl).
- [ ] ISC-: Anti: privacy — image originals (raw camera JPEGs) are NEVER served from R(probe: every image URL returns WebP).
- [ ] ISC-: Anti: regression — first-page browse load makes zero third-party network requests (no analytics beacon, no font CDN, no ad-tech) (probe: Interceptor network-panel screenshot, third-party requests).

Test Strategy

```yaml
- isc: ISC-  type: deploy-probe
  check: HTTP status + content-type
  threshold: + text/html
  tool: curl -i https://beanline.example.com

- isc: ISC-  type: ops-timing
  check: quality-lead approval time per lot
  threshold: p≤ s
  tool: ops-tool telemetry, weekly aggregate

- isc: ISC-  type: performance
  check: browse-page pcold load on simulated G
  threshold: ≤ ms
  tool: lighthouse --preset=mobile --only-categories=performance --url=https://beanline.example.com/browse

- isc: ISC-  type: payment-fee
  check: total fees on a $lot
  threshold: ≤ $(%)
  tool: bun run scripts/checkout-test.ts --sandbox --lot-price=
- isc: ISC-  type: integration
  check: QR handoff scan releases escrow
  threshold: stripe transfer event fires
  tool: bun run scripts/handoff-test.ts --sandbox

- isc: ISC-  type: timeout-behavior
  check: auto-release on day   threshold: stripe transfer fires within s of day-cron
  tool: bun run scripts/auto-release-test.ts --simulate-day=
- isc: ISC-  type: anti-probe
  check: social-graph endpoints don't exist
  threshold:   tool: curl -i https://beanline.example.com/api/follow

- isc: ISC-  type: privacy
  check: every image URL returns WebP
  threshold: % Content-Type: image/webp
  tool: bash scripts/image-format-audit.sh

- isc: ISC-  type: privacy
  check: zero third-party requests on browse page
  threshold:   tool: Skill("Interceptor") network panel at /browse
```

Features

```yaml
- name: ListingPipeline
  description: Submit → pending review → approved → public; quality-lead admin tooling
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false  core data layer

- name: BrowseAndSearch
  description: Paginated browse, region/process filters, substring search, performance budget
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [ListingPipeline]
  parallelizable: false  all browse views share layout primitives

- name: AuthAndVerification
  description: Magic-link sign-in, role gating (buyer/roaster/admin), verification queue
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true  parallel to listings

- name: PaymentsEscrow
  description: Stripe Connect onboarding, escrow checkout, handoff release, auto-release timer
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [AuthAndVerification, ListingPipeline]
  parallelizable: false  checkout flow is end-to-end sequential

- name: MessagingAndDisputes
  description: Per-listing buyer-roaster messaging, retention, dispute open
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [AuthAndVerification, ListingPipeline]
  parallelizable: true

- name: ImageEdge
  description: Rimage storage + WebP transform Worker
  satisfies: [ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: HealthAndRateLimit
  description: /health endpoint, public-API rate limiting via WAF
  satisfies: [ISC-, ISC-]
  depends_on: [ListingPipeline]
  parallelizable: true
```

Decisions

- --:: Cloudflare-only stack chosen over a Vercel/Postgres path because edge-co-location wins at the cellular-load budget, D's row-flat shape fits the listing schema, and the platform-fee math only works with low compute cost.
- --:: Magic-link auth chosen over password+OAuth because v's user base is small and known; password-reset flow would be the highest-cost auth surface for the verification-team load.
- --:: DEAD END: Tried buyer-self-attested verification (upload a business license image, accept on submission). Three of the first eight attestations were retail bag-shop owners trying to source for resale, not the wholesale-buyer profile. Reverted to manual quality-lead review of every verification. Don't retry without an automated business-database cross-check.
- --:: refined: ISC-sharpened from "quality lead can approve listings quickly" to "≤ minutes per lot at p" — the first phrasing was unfalsifiable; the second became a staffing-model input.
- --:: DEAD END: Tried open-graph + Twitter-card image generation for listings. Pulled in KB JS for the meta-tag generator, broke the bundle budget. Reverted to server-rendered static OG meta. Don't retry the dynamic generator path.
- --:: refined: ISC-split into ISC-(BeanLine fee) and an implied "all-in" check that combined the two — the original ISC let the all-in pass while BeanLine's slice silently crept past the principle's .% ceiling.
- --:: refined: ISC-added the auto-release timer (day-) after the first three deliveries had buyers who never scanned the handoff QR — escrow sat indefinitely. The timer + audit log is the safety net.
- --:: refined: Goal sharpened — added the explicit "p≤ s on cellular" and "all-in fees ≤ %" — the original Goal was domain-correct but operationally fuzzy.

Changelog

- --| conjectured: Buyer self-attestation will scale verification at low ops cost
  refuted by: of attestations turned out to be the wrong buyer profile (retail, not wholesale)
  learned: verification is the load-bearing trust signal; attestation without ops review degrades the buyer-pool quality, which kills roaster trust, which kills supply
  criterion now: ISC-added the quality-lead manual-review step explicitly; "buyer_verified" role is gated on it

- --| conjectured: Dynamic OG/Twitter card generation will improve social sharing CTR
  refuted by: bundle exceeded the KB JS budget (ISC-/broke); social CTR uplift was undetectable in A/B
  learned: bundle-budget Constraints outrank social-meta features; static OG is good enough at this scale
  criterion now: ISC-unchanged but Decisions logs the dead end as a bundle-creep canary

- --| conjectured: Buyers will reliably scan the handoff QR; escrow release flows from buyer action
  refuted by: of the first deliveries had buyers who never scanned (busy shop, lost card); escrow sat
  learned: shipment-confirmation must have a buyer-action AND a timeout fallback; relying on either alone breaks the merchant cash-flow story
  criterion now: ISC-added (auto-release on day with audit entry)

- --| conjectured: Vague performance Goals ("fast on cellular") are operational enough
  refuted by: bundle creep of KB went undetected for two sprints; nothing failed an ISC because no ISC named a number
  learned: every Constraint that maps to a budget needs a numeric ISC, not a vibe; Goal sharpening propagates down to ISCs
  criterion now: Goal explicitly states "p≤ s on cellular" and "all-in fees ≤ %"; ISC-enforces the first, ISC-enforces the second

Verification

- ISC-: `bun run deploy` — `Deployed beanline (route: beanline.example.com/)`
- ISC-: `curl -i https://beanline.example.com` — `HTTP// content-type: text/html; charset=utf-`
- ISC-: HTML head shows `<meta name="version" content="abcd">` matching `git rev-parse --short HEAD` output `abcd`
- ISC-: Listing form integration test --— submitted listing returned `id: lst_TestXXXX` + status `pending_review`
- ISC-: `curl -i https://beanline.example.com/lots/colombia-geisha--q` after approval — `HTTP/`
- ISC-: `curl https://beanline.example.com/browse | rg "<article" | wc -l` — ``
- ISC-: Lighthouse mobile run --— `Performance / FCP ms / LCP ms` on `/browse`
- ISC-: Stripe-sandbox checkout test --— `payment_intent_TestXXXX` created with `transfer_group: lst_TestYYY`
- ISC-: `curl -i https://beanline.example.com/checkout` (no session) — `HTTP/`
- ISC-: `curl -i https://beanline.example.com/api/follow` — `HTTP/`
- ISC-: Image-format audit --— % of image URLs returned `Content-Type: image/webp`
- ISC-: Interceptor network panel at `/browse` --— third-party requests on initial load

<!--
Canonical showpiece. Marketplace pattern (auth + Stripe escrow + RBAC + listings + search + reviews + messaging) at Escale, all twelve sections populated, real-feeling Decisions with two DEAD ENDs and four refinements, four-piece C/R/L Changelog entries spanning the -month build. ISC count is below the Efloor of — show-your-math: the work surface is genuinely smaller than enterprise scope; the marketplace pattern is well-bounded and over-decomposing into ISCs would manufacture probes that don't reflect real verification needs. Anti-criteria (ISC-, , ) cover scope, privacy, and regression. Antecedents (none) — the goal is verifiable, not experiential, so antecedents aren't required at this gate. The euphoric-surprise prediction in Vision is principal-falsification but not gated as an ISC because the marketplace's success is measured by transactions completed, not by any single user's reaction.
-->
