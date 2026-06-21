<!-- Fictitious example. "ApiBridge" is a teaching project name; any resemblance to real products or organizations is coincidental. The example.org domain is RFC reserved. -->
---
task: "Migrate ApiBridge public API from REST to GraphQL with deprecation runway"
slug: -_apibridge-rest-to-graphql-migration
project: ApiBridge
effort: deep
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

The ApiBridge public API at `api.apibridge.example.org` has accumulated REST endpoints across years of organic growth. Half of them are over-fetching (one read of `/orgs/:id` pulls fields when the dashboard uses ); the other half are under-fetching (rendering a single project page costs sequential GETs because each related resource lives behind its own URL). External consumers — known integrations across partners — repeatedly hit the same N+patterns and route around them with caching that's now stale more often than fresh. Internally, every new product surface argues over which existing endpoint to bend versus which new one to add, and the answer is usually "add another," which makes the surface worse.

A GraphQL endpoint at `api.apibridge.example.org/graphql` lets clients ask for exactly the fields they need in one round trip. The migration is hard because the integrations cannot break — partners will move at their own pace, and at least three of them publish quarterly release trains. The goal is not "GraphQL replaces REST tomorrow." The goal is "GraphQL is preferred, REST is supported for six months with clear deprecation telemetry, and at the end of the window every active consumer has either migrated or is opted into a paid extended-support track."

Vision

A partner integration team opens our docs, sees a single GraphQL playground next to a dimmed REST reference labeled "deprecated April → October ," runs three example queries, and realizes their nightly sync that takes round trips can become one. They migrate their staging environment in an afternoon. Six months later, our REST egress drops to under % of total API traffic, and the cutover ships without a single Sev-.

Out of Scope

- Internal service-to-service traffic. Internal callers continue using gRPC; this migration is for the public boundary only.
- GraphQL subscriptions. Pub/sub realtime is a separate roadmap item; vis queries and mutations only.
- Schema federation. We expose one monolithic GraphQL schema; we are not introducing Apollo Federation, schema stitching, or a gateway tier in this migration.
- Authentication redesign. Existing OAuth .bearer tokens are reused unchanged; no migration to mTLS, no new scopes, no re-issuing keys.
- Webhook redesign. Webhook payloads remain JSON-shaped per existing contracts; this migration does not touch outbound delivery.
- Self-service partner portal. Partners continue to be onboarded by the partnerships team; no portal changes ship as part of this work.

Principles

- Public APIs are contracts, not implementations.A consumer cannot tell us "we'll fix it next quarter" and have us break their build before that quarter ends. Migration windows must respect external release cadence.
- Deprecation is a product, not an event.The deprecation experience — telemetry, sunset headers, dashboard, partner emails, escalation paths — is itself a feature with its own ISCs.
- Every breaking change has a non-breaking adapter.If GraphQL cannot serve a REST shape verbatim, we add a thin REST→GraphQL adapter rather than asking the partner to change shape immediately.
- Performance is part of the contract.GraphQL must not be slower than REST for equivalent queries at p. Latency regressions are bugs.
- Schema is owned by product, not by transport.The shape of `Project`, `Organization`, `User` lives in one place and is consumed by both REST adapters and GraphQL resolvers; we do not duplicate types.

Constraints

- The current REST API at `api.apibridge.example.org/v/` continues to return correct, byte-identical responses for the entire -month deprecation window (April , → October , ). No silent shape changes.
- GraphQL endpoint exposed at `api.apibridge.example.org/graphql` only. No `/v`, no subdomain split, no separate hostname.
- Apollo Server v+ on Node LTS. We do not roll a custom GraphQL implementation. We do not pin to v.
- Schema-first development with codegen. The SDL file at `schema/api.graphql` is the source of truth; resolvers are generated, not hand-written from scratch.
- Every breaking change ships behind a feature flag with a default-off rollout managed by the existing LaunchDarkly account.
- Sunset headers (`Sunset`, `Deprecation`, `Link`) are emitted on every REST response per RFC throughout the deprecation window. No exceptions.
- The migration ships in increments (schema → resolvers → REST adapter layer → deprecation telemetry); no big-bang cutover.
- Documentation site at `docs.apibridge.example.org` must show GraphQL and REST side-by-side for the entire window; "REST docs deleted" is not an option until October , .

Goal

Ship the GraphQL endpoint at `api.apibridge.example.org/graphql` with full coverage of the REST endpoints' read and write surface area, parity-tested under load, with a published -month deprecation runway for REST that emits RFC sunset headers, exposes per-partner deprecation telemetry on an internal dashboard, and lands the cutover without any external integration breaking before its partner-confirmed migration date.

Criteria

- [x] ISC-: `schema/api.graphql` exists, validates against `graphql-schema-linter`, and covers all REST endpoint shapes.
- [x] ISC-: GraphQL endpoint responds with `` and a valid introspection result for `query { __schema { queryType { name } } }`.
- [x] ISC-: All REST endpoints have a corresponding query or mutation in the schema (probe: `node scripts/coverage-check.ts` exits ).
- [x] ISC-: Schema codegen produces typed resolver stubs at `src/generated/resolvers.ts`.
- [x] ISC-: % of read-side resolvers return data byte-identical to the matching REST endpoint for a ,-row golden fixture (probe: `bun test parity/read.test.ts`).
- [ ] ISC-: % of write-side resolvers produce identical database side-effects to the matching REST mutation for the golden fixture (probe: `bun test parity/write.test.ts`).
- [x] ISC-: GraphQL platency for the most common query shapes is ≤ matching REST p+ ms under rps load.
- [ ] ISC-.: GraphQL platency for the next-most-common query shapes is ≤ matching REST p+ ms under rps load.
- [ ] ISC-: GraphQL platency under rps load remains under ms.
- [x] ISC-: REST responses include `Sunset: Wed, Oct ::GMT` header.
- [x] ISC-: REST responses include `Deprecation: true` header.
- [x] ISC-: REST responses include `Link: <https://docs.apibridge.example.org/graphql>; rel="successor-version"`.
- [ ] ISC-: Per-partner deprecation telemetry dashboard at `internal.apibridge.example.org/deprecation` shows REST request count, GraphQL request count, and migration percentage by partner ID.
- [ ] ISC-: Dashboard shows the most-called deprecated REST endpoints by partner.
- [ ] ISC-: Dashboard alerts fire when any partner's REST traffic increases week-over-week after April , .
- [x] ISC-: All known integrations are tagged with a `partner_id` in request logs.
- [ ] ISC-: Migration emails sent to partner technical contacts at T-, T-, T-, T-, T-, T-days from cutover.
- [x] ISC-: GraphQL playground at `api.apibridge.example.org/graphql` loads in a browser with example queries pre-populated.
- [x] ISC-: Documentation site shows GraphQL and REST side-by-side for every endpoint.
- [ ] ISC-: Anti: REST endpoints return shape-changed responses during the deprecation window (probe: `bun test parity/rest-stability.test.ts` runs daily).
- [ ] ISC-: Anti: GraphQL endpoint accepts queries deeper than levels (probe: depth-limit middleware blocks query at depth with ``).
- [ ] ISC-: Anti: GraphQL endpoint accepts queries with cost > (probe: cost analysis middleware blocks high-cost query with ``).
- [ ] ISC-: Anti: introspection is enabled in production (probe: `query { __schema { types { name } } }` returns `` against `api.apibridge.example.org/graphql` with non-admin token).
- [ ] ISC-: Anti: any partner is silently cut off (probe: cutover script requires partner-confirmed migration date in `partner-status.json` for every active partner_id).
- [x] ISC-: Feature flag `graphql_endpoint_enabled` defaults to `false` and is explicitly enabled per environment.
- [x] ISC-: Feature flag `rest_sunset_headers_enabled` defaults to `false` until April , .
- [ ] ISC-: Rollback runbook at `docs/runbooks/graphql-rollback.md` exists and has been dry-run executed in staging.
- [x] ISC-: Schema changes go through PR review with at least one API-team approver (probe: `.github/CODEOWNERS` lists `schema/` under `@api-team`).
- [x] ISC-: Every resolver has a Datadog APM span tagged with `graphql.operation_name` and `graphql.field_name`.
- [ ] ISC-: Authorization middleware enforces the same scopes on GraphQL fields as the matching REST endpoint requires (probe: `bun test auth/scope-parity.test.ts`).
- [ ] ISC-: Rate limits applied per partner at the GraphQL layer match the REST layer (probe: `bun test rate-limit/parity.test.ts`).
- [ ] ISC-: Error responses follow the structured GraphQL error spec with `extensions.code` set per error class.
- [x] ISC-: REST request logs include `Accept-Migration` header value when partner sends it (used to track partners actively testing GraphQL).
- [ ] ISC-: Partner status file `partner-status.json` lists every `partner_id` with fields `confirmed_migration_date`, `last_rest_request`, `first_graphql_request`, `migration_pct`.
- [ ] ISC-: Status file is regenerated nightly from request logs.
- [ ] ISC-: Partner support runbook at `docs/runbooks/partner-migration-support.md` covers the top expected migration questions with copy-paste GraphQL equivalents.
- [ ] ISC-: Public changelog entry posted at `docs.apibridge.example.org/changelog` announcing GraphQL availability with example queries.
- [ ] ISC-: Public changelog entry posted announcing REST deprecation with sunset date.
- [x] ISC-: GraphQL schema is published at `schema.apibridge.example.org/api.graphql` for tooling consumption.
- [ ] ISC-: Schema diff CI gate fails the build if a breaking schema change is introduced without `BREAKING_CHANGE_APPROVED=true` env flag.
- [x] ISC-: Resolvers reuse the existing data-access layer (no duplicate query logic between REST handlers and GraphQL resolvers).
- [ ] ISC-: Load test simulating partner-realistic query patterns (mix of % reads, % writes, % complex nested queries) sustains rps for hour without error rate exceeding .%.
- [x] ISC-: GraphQL endpoint enforces request body size limit of KB.
- [x] ISC-: GraphQL endpoint enforces query timeout of seconds at the resolver layer.
- [ ] ISC-: Anti: REST endpoint `/v/orgs/:id/projects` returns before October , (probe: synthetic monitor pings every minutes).
- [ ] ISC-: Anti: any GraphQL field returns PII not present in the matching REST endpoint (probe: `bun test parity/pii-coverage.test.ts`).
- [ ] ISC-: Cutover dry-run executed at T-against staging with all partner integrations simulated.
- [ ] ISC-: Sentry release tag `graphql-cutover-v` exists.
- [ ] ISC-: PagerDuty escalation policy `graphql-launch` is on-call rotation for the weeks following October , .
- [x] ISC-: GraphQL endpoint logs include `partner_id` extracted from the bearer token claim.
- [x] ISC-: REST adapter layer at `src/rest/adapter.ts` translates REST routes to internal GraphQL execution (single resolver path, two transports).
- [ ] ISC-: Adapter layer adds < ms poverhead vs. direct REST handler.
- [x] ISC-: All REST routes are now served by the adapter (legacy direct handlers deleted).
- [ ] ISC-: Adapter is feature-flagged by `rest_via_adapter_enabled` and rolled out in % increments.
- [ ] ISC-: Adapter rollout reaches % before deprecation telemetry begins (April , ).
- [ ] ISC-: Migration retrospective document at `docs/retrospectives/graphql-migration.md` written by November , .
- [x] ISC-: GraphQL gateway has a circuit breaker that opens when downstream data layer error rate exceeds % over s.
- [ ] ISC-: Circuit-breaker behavior documented in incident response runbook.
- [x] ISC-: Persisted queries are supported via APQ (Automatic Persisted Queries) for partners that opt in.
- [ ] ISC-: At least partners using APQ in production by October , .
- [ ] ISC-: GraphQL access logs are retained for days in the existing log retention bucket.
- [ ] ISC-: Audit log for schema changes is queryable via `bun scripts/schema-history.ts`.
- [x] ISC-: Anti: a single resolver makes more than sequential database calls without batching via DataLoader (probe: lint rule `no-sequential-db-calls` runs in CI).
- [x] ISC-: DataLoader instances are created per-request, not per-process (probe: `bun test dataloader/scope.test.ts`).
- [ ] ISC-: Schema documentation generated from SDL comments and published to docs site.
- [ ] ISC-: Partner-specific cost limits enforced (cost ≤ for free tier, cost ≤ for paid tier, cost ≤ for enterprise tier).
- [x] ISC-: GraphQL errors are scrubbed of internal stack traces in production responses.
- [ ] ISC-: External health check at `api.apibridge.example.org/graphql/health` returns `` with schema version.
- [ ] ISC-: Anti: deprecation cutover proceeds with any partner still showing > REST requests/day in the days before cutover (probe: cutover script blocks).
- [ ] ISC-: Extended support contract template exists at `legal/extended-rest-support-template.md` for partners needing a paid runway past October , .
- [ ] ISC-: At most partners are on extended support after October , .
- [ ] ISC-: Public status page at `status.apibridge.example.org` has a `graphql` component and a `rest` component, each with independent uptime SLOs.
- [ ] ISC-: Final cutover postmortem published to docs site within days of October , .

Test Strategy

```yaml
- isc: ISC-  type: coverage-probe
  check: every REST endpoint maps to a GraphQL field
  threshold: /  tool: node scripts/coverage-check.ts

- isc: ISC-  type: parity-test
  check: GraphQL response body byte-equal to REST response for fixtures
  threshold: /  tool: bun test parity/read.test.ts

- isc: ISC-  type: load
  check: GraphQL pvs REST pfor top-query shapes
  threshold: GraphQL p≤ REST p+ ms at rps
  tool: krun loadtests/p-parity.js

- isc: ISC-  type: header-probe
  check: every REST xx response includes Sunset header
  threshold: % of sampled responses
  tool: synthetic monitor + grep

- isc: ISC-  type: regression-probe
  check: REST shape diff vs frozen golden bodies
  threshold: zero diffs
  tool: bun test parity/rest-stability.test.ts (daily cron)

- isc: ISC-  type: anti-probe
  check: depth-limit middleware blocks deep queries
  threshold: response on depth=  tool: curl + jq

- isc: ISC-  type: anti-probe
  check: introspection disabled in production
  threshold: on __schema query with non-admin token
  tool: bun test security/introspection.test.ts

- isc: ISC-  type: anti-probe
  check: cutover requires partner confirmation
  threshold: cutover.ts exits non-zero if any active partner_id missing confirmed_migration_date
  tool: bun scripts/cutover.ts --dry-run

- isc: ISC-  type: load
  check: -hour soak at rps mixed workload
  threshold: error rate < .%
  tool: krun loadtests/soak.js
```

Features

```yaml
- name: SchemaAndCodegen
  description: Define `schema/api.graphql` covering all endpoint shapes; wire up codegen for typed resolver stubs at `src/generated/resolvers.ts`.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false

- name: ResolverImplementation
  description: Implement read and write resolvers backed by the existing data-access layer; ensure parity with REST responses; enforce auth scopes; per-request DataLoader.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [SchemaAndCodegen]
  parallelizable: true  split by resource group: orgs/projects/users/billing/audit

- name: GatewayHardening
  description: Apollo Server config, depth limit, cost analysis, request size limit, query timeout, circuit breaker, persisted queries, error scrubbing, introspection lock-down.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [ResolverImplementation]
  parallelizable: true

- name: RestAdapter
  description: Build `src/rest/adapter.ts` so the REST routes execute through GraphQL resolvers; flag-rolled to % before deprecation telemetry begins; preserves REST byte-shape.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [ResolverImplementation]
  parallelizable: false

- name: DeprecationTelemetry
  description: Sunset/Deprecation/Link headers, partner_id tagging, internal dashboard, weekly partner status emails, alerting on REST traffic regression, partner-status.json nightly regen.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [RestAdapter]
  parallelizable: true

- name: DocsAndPlayground
  description: GraphQL playground at the live endpoint with pre-populated examples; side-by-side REST/GraphQL docs; public changelog entries; published SDL.
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: [SchemaAndCodegen]
  parallelizable: true

- name: CutoverGovernance
  description: Per-partner confirmed_migration_date tracking, T-/////emails, dry-run at T-, runbooks, status page components, postmortem.
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [DeprecationTelemetry]
  parallelizable: false
```

Decisions

- --:: Apollo Server vover Yoga or a hand-rolled implementation. Existing team familiarity, mature plugin ecosystem, schema-first defaults. Yoga rejected because the persisted-query story is less mature for partners on legacy SDKs.
- --:: Schema-first with codegen rather than code-first. The SDL is the contract the partners read; making it the source of truth means PR diffs on `schema/api.graphql` are reviewable as contract changes by people who don't read TypeScript.
- --:: REST adapter layer (one resolver path, two transports) rather than maintaining REST handlers in parallel. Eliminates parity drift by construction. Cost: adapter overhead measured at ~ms pin early prototype, well under the ISC-budget of ms.
- --:: DEAD END: Tried Apollo Federation vto split the schema across services owned by different product teams. Reverted after week-long spike — gateway introspection added ms poverhead and the team boundary was nominal (all services share the same database). Single monolithic schema, owned by api-team, reviewed by product-team approvers per CODEOWNERS.
- --:: -month deprecation window over months. Partner survey (of responded) showed partners with quarterly release trains where a -month window would force an emergency rollout. Cost is real (longer parity guarantees, more telemetry overhead) but cheaper than angry partners.
- --:: refined: ISC-split into ISC-(top-query shapes, +ms budget) and ISC-.(next-shapes, +ms budget). The two budgets reflect that the top-are tightly optimized REST paths while the next-are over-fetching today and GraphQL will already be faster on those by virtue of asking for fewer fields.
- --:: DEAD END: Considered exposing GraphQL at `api-v.apibridge.example.org` so the cutover would be a DNS swap. Rejected — partner integrations using URL-based service discovery would have to change config rather than client library, and the URL change would have meant more breaking surface than the protocol change.
- --:: APQ for partners that opt in, not mandatory. Mandatory APQ would force every partner to ship a registration step before going live; the migration cost is already non-trivial and APQ value is largest for the high-volume partners who will adopt it voluntarily.
- --:: Cost limits per partner tier (//) calibrated against the most expensive REST endpoints' equivalent cost in the cost-analysis prototype; free-tier cap of is ~x the heaviest current REST call to leave migration headroom without leaving DoS surface.
- --:: refined: added ISC-(synthetic monitor on deprecated endpoint pre-cutover) after partner-success team flagged that "deprecated" and "removed" had been conflated in two earlier migrations.
- --:: Extended-support track capped at partners (ISC-). Operational cost of running parallel REST infrastructure past cutover scales worse than linearly; is the threshold where a separate small REST cluster makes sense vs. ad-hoc bypass.
- --:: refined: ISC-(anti: silent cutoff) hardened — the cutover script now reads `partner-status.json` and exits non-zero if any active partner_id is missing `confirmed_migration_date`. Earlier draft only logged a warning; partner-success caught a near-miss in dry-run where a newly added partner would have been cut off because the field was absent rather than false.

Changelog

- --conjectured: a single +ms pbudget would cover all GraphQL query shapes vs REST. / refuted by: prototype load test (k, rps) showed top-already at +ms while shapes -ranged +ms to +ms — single budget would fail on hot paths and over-budget on long-tail. / learned: REST is irregularly optimized; the top-shapes have hand-tuned indexes, the rest don't. GraphQL inherits this asymmetry. / criterion now: ISC-(top-, +ms) + ISC-.(next-, +ms) — two budgets reflecting the underlying optimization asymmetry.

- --conjectured: a `/v` URL split would make cutover a clean DNS-level swap with no client code changes. / refuted by: partner survey identified integrations using URL-based service discovery (env vars or config files); URL change would force config-file edits and re-deploy, while protocol change touches only the client library. / learned: URL stability is a stronger contract than transport stability for service-discovery-based partners. / criterion now: GraphQL co-located at `api.apibridge.example.org/graphql`; no `/v`, no subdomain split — preserved as a Constraint.

- --conjectured: the deprecation-window guarantee that "REST endpoints continue working" was sufficient. / refuted by: partner-success team review found that "endpoint working" had been ambiguously interpreted in two earlier minor-version cutovers — partners read it as "still routable," ops read it as "still serving the documented payload." / learned: the deprecation contract has to specify byte-shape stability AND endpoint reachability, separately, with separate probes. / criterion now: ISC-(Anti: REST shape changes) plus ISC-(Anti: REST endpoint returns before cutover) — two probes, daily cadence, separate failure modes.

- --conjectured: cutover script logging a warning when a partner_id was missing `confirmed_migration_date` was sufficient governance. / refuted by: dry-run revealed a newly onboarded partner whose record had been created without the field; warning was lost in normal log volume and the script proceeded. / learned: governance gates must hard-fail; partial enforcement of a binary anti-criterion is no enforcement. / criterion now: ISC-hardened — cutover script exits non-zero on missing field; partner-success owns the field-presence check in onboarding.

Verification

- ISC-: `graphql-schema-linter schema/api.graphql` exits ; output `errors, warnings`. Verified --.
- ISC-: `curl -s -X POST api.apibridge.example.org/graphql -H "Authorization: Bearer $T" -d '{"query":"{ __schema { queryType { name } } }"}' | jq -r '.data.__schema.queryType.name'` returns `Query`. Verified --(staging) and --(production behind feature flag).
- ISC-: `node scripts/coverage-check.ts` outputs `/REST endpoints have a matching GraphQL field`. Verified --.
- ISC-: `bun test parity/read.test.ts` reports `passed, failed`. Verified --.
- ISC-: krun output for top-query shapes — REST p: ms / GraphQL p: ms (+ms, well within +ms budget). Verified --.
- ISC-, ISC-, ISC-: `curl -I api.apibridge.example.org/v/orgs/test-org` shows `Sunset: Wed, Oct ::GMT`, `Deprecation: true`, `Link: <https://docs.apibridge.example.org/graphql>; rel="successor-version"`. Verified --.
- ISC-: introspection probe with non-admin token returns `Forbidden` with body `{"errors":[{"message":"Introspection disabled in production","extensions":{"code":"INTROSPECTION_DISABLED"}}]}`. Verified --.
- ISC-, ISC-: `git log --oneline src/rest/handlers/` shows final commit deleting all legacy direct handlers; `src/rest/adapter.ts` is the sole REST entry point. Verified --.
