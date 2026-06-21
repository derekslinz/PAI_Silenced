<!-- Fictitious example. "Beacon Health Alliance" is a teaching project name; any resemblance to real products or organizations is coincidental. The portal.beaconhealth.example.org domain is RFC reserved. -->

---
task: "Beacon Health Alliance — multi-region HIPAA patient portal"
slug: -_beaconhealth-portal-vproject: BeaconHealthPortal
effort: comprehensive
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

Beacon Health Alliance — a -hospital regional health system spanning the Pacific Northwest, Mountain, and Midwest census regions, with approximately ,employed clinicians, ,affiliated providers, and a covered patient population of ~.million — currently operates a patient portal forked from a vendor codebase that is end-of-life on --. The legacy portal is a single-region monolith hosted on a tier-colo with no documented disaster recovery RTO better than hours; auth is a homegrown OAuth .a implementation with documented session-fixation issues; the audit log writes to a local Postgres instance with -day retention (HIPAA mandates a defensible -year retention floor in this organization's compliance posture); and the appointment-scheduling subsystem cannot honor the acquisition of the -hospital Cascade Care Group, whose existing records live in a MEDITECH instance that the legacy portal has no integration path to. Patients today see only their primary-region records; clinicians moving between regions cannot view a unified longitudinal chart; auditors run quarterly reports that require manual reconciliation against the source EHR because the portal's audit trail is not authoritative. The replacement is a Q–Qstrategic program with executive sponsorship, a Qcutover deadline driven by the legacy vendor's hard end-of-life date, and a budget gate at the end of Qthat requires Phase (identity + read-only chart access) live in a production canary by --.

Vision

A unified patient portal at `portal.beaconhealth.example.org` serving all hospitals across three regions, where a patient logs in with SSO + step-up MFA, sees their complete longitudinal chart regardless of which hospital generated which record, books an appointment with any in-network clinician in any region, messages their care team through a HIPAA-conformant inbox, views lab results within hours of resulting (CMS Cures Act minimum), receives e-prescriptions handed off to their preferred pharmacy without a portal-side copy of PHI persisted beyond the handoff window, and never sees a "your records from <other region> are unavailable" error. Clinicians see a single chart view independent of source EHR. Auditors see an immutable, queryable, -year-retained audit log that is authoritative for compliance attestation. Euphoric surprise: a patient who moved from the Pacific Northwest region to the Midwest region in , got admitted at a Cascade Care hospital in , and saw her unified chart on day one without having to fax records — and her primary care physician at the originating hospital saw the encounter note within minutes of discharge.

Out of Scope

- No native iOS or Android applications in v.Mobile experience is via responsive web (PWA install on iOS + and Android +); native apps are a separate program scoped for FY.
- No telehealth video integration.The portal links out to the existing telehealth vendor; in-portal video is not part of v.
- No patient self-pay billing UI.Statements and receipts are read-only; payment processing remains in the existing patient-financial-services platform until v.
- No third-party API marketplace.SMART-on-FHIR app launches are deferred to v.; no developer-portal, no app store, no third-party app reviews in v.
- No multi-language UI in v.English only at launch; Spanish ships in v.(Q); additional locales evaluated in .
- No employer / wellness-program integrations.Employer dashboards and population-health analytics are different products owned by the population-health line.
- No research-cohort enrollment flows.Research-data deidentification and export is a separate downstream system; the portal does not initiate research workflows in v.
- No coverage of skilled-nursing or behavioral-health subsidiaries.Those EHRs are out of scope for v; their patients use a legacy portal until v..
- No PHI persisted in the e-prescription handoff path.Prescription objects are signed, transmitted to Surescripts, and the portal-side copy is purged within the handoff TTL window. The portal is not a long-term store for prescription content.

Principles

- Compliance is not a layer; it is a property of the system. Every architectural choice is judged against whether it makes HIPAA, HITRUST, and state-level health-data laws easier or harder to attest to.
- The audit log is authoritative. If an action is not in the audit log it did not happen; if it is in the audit log it cannot be edited. Authoritativeness beats convenience every time.
- Zero-trust between subsystems. Inter-service auth uses short-lived SPIFFE-style identities; no service trusts another service because of network position.
- The patient is the principal. RBAC starts from "the patient owns their record"; clinicians and admins have access by virtue of relationship + role + business justification, not by virtue of being employees.
- Multi-region is a load-balancing concern AND a compliance concern. Data-residency rules, BAA boundaries, and cross-region failover semantics are part of the architecture, not an operational afterthought.
- Operability is a first-class deliverable. A feature is not done when it works; it is done when on-call can diagnose its failures from the dashboards and runbooks.
- Vendor consolidation is not a goal. Best-of-breed where the cost of integration is paid back; "single pane of glass" is a marketing phrase, not an architectural principle.

Constraints

- Hosting:AWS three-region active-active (us-west-, us-east-, us-east-) with primary read traffic served from the closest region; writes go to a regional primary with synchronous replication for compliance-relevant tables and asynchronous replication for the rest.
- Data residency:All PHI persists exclusively within US-region AWS accounts under signed BAAs; no PHI in any non-US region, edge cache, or non-BAA service.
- Identity:Enterprise SSO via the existing Okta tenant federated to Azure AD for Beacon employees; patient identity uses Authwith passwordless email + step-up MFA (TOTP or WebAuthn); no patient passwords in the system.
- EHR integration:FHIR Ragainst Epic (hospitals), MEDITECH Expanse (hospitals from the Cascade acquisition), and Cerner (legacy contracts on the affiliated network). HLvonly as a fallback when FHIR Ris not yet stood up at a particular site.
- Audit log:Append-only, -year minimum retention, queryable for compliance reporting, hash-chained for tamper evidence, replicated to immutable Swith object-lock in compliance mode.
- Session management:-minute idle timeout for clinician/admin/auditor roles (HIPAA minimum-implementation guidance); -minute idle timeout for patient role; absolute session lifetime hours for any role.
- Encryption:TLS .in transit; AES--GCM at rest; PHI fields envelope-encrypted with KMS keys scoped per data domain (clinical, demographic, financial); rotated quarterly.
- BAAs:No vendor in the PHI data path operates without a signed BAA on file with corporate compliance. Vendor onboarding requires a documented BAA SHA reference in the architecture log.
- Performance:Patient-facing pages p≤ .s on G; clinician chart view p≤ .s on hospital LAN; appointment-search autocomplete p≤ ms.
- Accessibility:WCAG .AA across all patient-facing surfaces; clinician surfaces meet WCAG .AA minimum.
- Code base:TypeScript on the application tier (Node ); FHIR adapters in TypeScript with a Rust shim where parsing throughput dominates; infrastructure as Terraform; secrets via AWS Secrets Manager; no roll-your-own crypto.

Goal

Deliver a multi-region active-active patient portal at `portal.beaconhealth.example.org` that replaces the legacy forked codebase before the --vendor end-of-life, unifies records across all hospitals (Epic, MEDITECH, Cerner) into a single longitudinal view, supports patient/clinician/admin/auditor roles with HIPAA-conformant audit logging at -year retention, exposes appointment scheduling and secure messaging across all regions, provides authoritative read-only chart access plus e-prescription handoff to Surescripts, and stays inside the data-residency, BAA, encryption, and session-management constraints across both standard operations and regional failover.

Criteria

Identity and Authentication

- [x] ISC-: Patient login at `/auth/patient` accepts an email, sends a -minute-expiry magic link, and creates a session on callback.
- [x] ISC-: Patient step-up MFA is required before any chart-data action; MFA factor is TOTP, WebAuthn, or SMS (SMS only as fallback for patients without smartphones).
- [x] ISC-: Clinician login at `/auth/clinician` redirects to Okta SAML, returns with a clinician-role session bound to the clinician's NPI.
- [x] ISC-: Admin and auditor logins use Okta with a separate role-claim mapping; admin and auditor sessions cannot be promoted to clinician without a fresh login.
- [x] ISC-: Session cookies are `HttpOnly; Secure; SameSite=Lax`; refresh tokens are stored server-side keyed on a session ID, never in the cookie.
- [x] ISC-: Idle timeout is minutes for clinician/admin/auditor and minutes for patient; absolute session lifetime is hours.
- [x] ISC-: Failed authentication attempts are rate-limited per identifier (/ min for patient email; / min for SSO subject).
- [x] ISC-: A logout invalidates the session in the session store within second; the cookie is cleared client-side.

RBAC and Authorization

- [x] ISC-: Patient role can read only their own chart; queries scoped to `patient_id = session.subject`.
- [x] ISC-: Clinician role can read a patient chart only when a documented clinician-patient relationship exists in the relationship service (encounter, scheduled appointment, referral, or break-glass with audit).
- [x] ISC-: Admin role gates `/admin/` routes; non-admin sessions receive HTTP .
- [x] ISC-: Auditor role can read audit log queries via `/audit/` but cannot read PHI directly.
- [x] ISC-: Break-glass access (clinician without prior relationship) requires a one-line stated reason and writes a high-priority audit event flagged for compliance review.
- [ ] ISC-: Role transitions in a session require re-authentication; a clinician who is also an admin must log in twice to use both surfaces in one day.

Identity-Linkage and Patient Matching

- [x] ISC-: Patient identity at the portal level resolves to a single longitudinal patient record across all hospitals via the enterprise master patient index (eMPI).
- [x] ISC-: When eMPI returns a probable-match below confidence threshold ., the portal does NOT auto-merge; it surfaces a "we need to verify your identity" flow.
- [ ] ISC-: Patient-initiated record-linking offers a verifiable challenge (DOB + last SSN + DL number, or insurance card + verified phone) before merging across regions.

Appointment Scheduling

- [x] ISC-: Appointment search autocomplete returns ≥ candidates in p≤ ms across all hospitals.
- [x] ISC-: Booking an appointment writes to the source EHR via FHIR R`Appointment.create` and returns a confirmation with the EHR-issued appointment ID.
- [x] ISC-: A booking failure (EHR rejection, slot taken) shows a recoverable error and offers the next alternatives.
- [ ] ISC-: Cancellation propagates back to the source EHR within seconds; the patient sees the canceled state immediately.
- [ ] ISC-: Multi-region availability: a patient in the Pacific Northwest can book at any of the Cascade Care (Midwest) hospitals; cross-region booking carries a "this appointment is at <region>" disclosure.

Lab Results and Chart Access

- [x] ISC-: Lab results visible in the portal within hours of EHR resulting (CMS Cures Act floor; the org's internal SLA is hour).
- [x] ISC-: Critical-flag results show an in-app banner and trigger a notification to the patient's preferred channel (push or email; never SMS for content).
- [ ] ISC-: Chart view aggregates encounters across all source EHRs into a single timeline ordered by clinical-effective date.
- [ ] ISC-: Patients can download a Continuity of Care Document (CCD/C-CDA) covering the last years in p≤ seconds.

Secure Messaging

- [x] ISC-: Patient-initiated messages route to the addressed care team's shared inbox in the source EHR within seconds.
- [x] ISC-: Clinician replies appear in the patient's portal inbox within seconds of EHR send.
- [x] ISC-: Messages are end-to-end encrypted in transit and at rest; the portal stores ciphertext keyed to the patient session and the EHR thread ID.
- [ ] ISC-: Messages older than years are purged from the portal store; the EHR remains the long-term system of record for clinical communication.

E-Prescription Handoff

- [ ] ISC-: Prescription objects are signed by the prescribing clinician, transmitted to Surescripts, and the portal-side copy is purged within hours of handoff.
- [ ] ISC-: A patient can view their active prescriptions (read-only summary, sourced live from the EHR pharmacy module — not from a portal copy).
- [ ] ISC-: Refill-request flow returns the patient to the EHR's pharmacy queue within seconds of submission.

Audit Logging

- [x] ISC-: Every read of PHI by any role writes an audit event with `(timestamp, actor_id, actor_role, action, patient_id, data_class, justification, request_id)`.
- [x] ISC-: Audit events are hash-chained; a tampered event breaks the chain and is detected by the integrity-check job within hour.
- [x] ISC-: Audit log retention is ≥ years; daily snapshots replicate to Swith object-lock in compliance mode (cannot be deleted before retention).
- [x] ISC-: Auditor role can query audit events by patient, by actor, or by time window; query results render p≤ seconds for -day windows.
- [ ] ISC-: Compliance attestation report (monthly) is generated automatically and stored at a defensible retrieval path with cryptographic signature.

Multi-Region Failover

- [ ] ISC-: Synthetic regional-failure drill quarterly: a single-region outage in us-west-drains traffic to us-east-within minutes with zero clinical-data loss for committed writes.
- [ ] ISC-: Read traffic during single-region outage maintains platency within .× of steady-state (no full SLO collapse).
- [ ] ISC-: Cross-region replication lag p≤ seconds for compliance-relevant tables (audit, identity, RBAC); ≤ minutes for non-compliance tables.
- [ ] ISC-: A two-region simultaneous outage degrades to read-only mode in the surviving region; writes return HTTP with a "service degraded" page; no PHI loss.

Observability

- [x] ISC-: Every request carries a correlation ID propagated to the EHR adapter and surfaced in support tooling.
- [x] ISC-: Dashboards exist for: identity (login/MFA success/failure rates), authorization (/ break-glass rates), EHR latency (per-source p/p/p), audit log volume + integrity, regional health.
- [x] ISC-: On-call runbooks cover the top alerting scenarios with explicit "this is a false positive when …" notes.
- [ ] ISC-: SLO dashboards visible to the patient ombudsman office show monthly availability against the .% target with breach narratives.

Build, Deploy, Release

- [x] ISC-: Infrastructure provisioned exclusively via Terraform; click-ops in the AWS console is alarmed and reverted.
- [x] ISC-: All deploys are blue/green per region; rollback completes in ≤ seconds.
- [x] ISC-: A failed canary in any region rolls back automatically and pages on-call within seconds.
- [x] ISC-: Production secrets live in AWS Secrets Manager; no secrets in env vars baked into images, no secrets in Terraform state.
- [ ] ISC-: Release notes for every production deploy are auto-generated from PR descriptions and posted to the change-management ticket.

Phase Canary (--budget gate)

- [x] ISC-: Phase scope shipped to canary at `portal.beaconhealth.example.org/canary`: identity + RBAC + read-only chart from Epic for hospital + audit log + observability.
- [x] ISC-: Phase canary serves ≥ enrolled real-patient testers without Pincident over a -day soak.
- [x] ISC-: Phase canary passes a third-party HIPAA risk-assessment audit (HITRUST validated assessor) with zero open high-severity findings.

Phase Cutover from Legacy MEDITECH (Q)

- [ ] ISC-: Cascade Care hospitals (MEDITECH Expanse) integrated via FHIR R; chart unification across Epic + MEDITECH live for ≥ ,enrolled patients.
- [ ] ISC-: Phase cutover plan signed off by Cascade Care CMIO and Beacon CMIO with explicit rollback criteria.
- [ ] ISC-: Legacy MEDITECH portal entry points redirect to the new portal with no patient action required; redirect uptime ≥ .% for days.

Phase (Q)

- [ ] ISC-: % of patient population has access; legacy portal is decommissioned and the legacy database is sealed for archival retention.
- [ ] ISC-: Qaudit by external HITRUST assessor returns "Certified" rating with no MRSAs (Major Required Supplemental Assessor) findings.

Anti-criteria

- [x] ISC-: Anti: PHI in URL — PHI never appears in URL query strings logged by the edge proxy or the WAF (probe: rg "patient_id=|mrn=|dob=" cloudflare-edge.log returns zero matches over a -day window).
- [x] ISC-: Anti: audit log retention floor — audit log retention never falls below years; the daily integrity-check job verifies the oldest retained event is ≥ y - d (alarm fires before retention is lost).
- [x] ISC-: Anti: BAA gap — no vendor in the PHI data path operates without a signed BAA; the architecture log enumerates every vendor with their BAA SHA reference and the reconciliation job alerts on any unrecognized vendor in the data path.
- [x] ISC-: Anti: session timeout — session idle timeout never exceeds minutes for clinician/admin/auditor roles; a config drift that exceeds fails the deploy preflight.
- [x] ISC-: Anti: PHI in non-US region — no PHI persists in any non-US AWS region, edge cache, or non-BAA service (probe: monthly audit of all KMS-encrypted volumes' AWS regions).
- [x] ISC-: Anti: cross-region transit without BAA — PHI in transit between regions traverses only AWS-internal (BAA-covered) network paths; no public internet hops.
- [x] ISC-: Anti: patient password — no patient password is ever stored, hashed or otherwise; passwordless-only is enforced at the auth layer with a deploy-time test that asserts the password column does not exist.
- [x] ISC-: Anti: silent role escalation — no code path elevates a session role without re-authentication; a static analysis rule blocks any in-process role mutation.
- [x] ISC-: Anti: audit-log writability — audit events are never updated or deleted by application code; only the retention-compliance job (running under a separate IAM role) can prune events that have exceeded the -year window, and only by writing a tombstone, never by deletion.

Test Strategy

```yaml
- isc: ISC-  type: auth
  check: magic-link arrives + callback creates session
  threshold: ≤ s end-to-end
  tool: integration test bun run scripts/auth-magic-link.ts

- isc: ISC-  type: session
  check: session expires after m idle for clinician role
  threshold: th-minute request returns   tool: bun run scripts/session-idle-timeout.ts --role clinician

- isc: ISC-  type: identity-resolution
  check: same patient across hospitals resolves to a single eMPI ID
  threshold: patient_id returned
  tool: bun run scripts/empi-cross-region-probe.ts --test-fixture mrn-set-A

- isc: ISC-  type: performance
  check: appointment-search autocomplete p  threshold: ≤ ms across -hospital corpus
  tool: krun load/appointment-autocomplete.js --vus --duration m

- isc: ISC-  type: latency
  check: lab result publish-to-portal-visible latency
  threshold: p≤ h, internal SLA p≤ h
  tool: bun run scripts/lab-latency-audit.ts --window d

- isc: ISC-  type: audit-completeness
  check: every PHI read produces an audit event
  threshold: |reads| == |audit_events| within s window
  tool: SELECT COUNT() FROM phi_reads vs audit_events GROUP BY m bucket

- isc: ISC-  type: audit-integrity
  check: hash chain verifies for full -day window
  threshold: chain breaks
  tool: bun run scripts/audit-chain-verify.ts --window d

- isc: ISC-  type: retention
  check: daily snapshot lands in Swith object-lock compliance mode
  threshold: lock_mode == COMPLIANCE && retain_until >= now+y
  tool: aws sapi get-object-retention --bucket audit-logs --key <today>.parquet

- isc: ISC-  type: failover-drill
  check: regional outage drains in ≤ min with zero committed-write loss
  threshold: drain_time ≤ s; data-loss-events ==   tool: bun run scripts/regional-outage-drill.ts --target us-west-
- isc: ISC-  type: deployment
  check: failed canary auto-rollback + page on-call
  threshold: rollback ≤ s; pager fired ≤ s
  tool: bun run scripts/canary-failure-injection.ts

- isc: ISC-  type: third-party-audit
  check: HITRUST validated assessor returns zero high-severity findings on Phase   threshold: high; ≤ medium with mitigation plans
  tool: external assessor report (manual evidence)

- isc: ISC-  type: anti-probe / phi-in-url
  check: URL query strings in edge logs do not contain PHI markers
  threshold: matches over -day rolling window
  tool: rg "patient_id=|mrn=|dob=|ssn=" /var/log/cloudflare-edge/.log

- isc: ISC-  type: anti-probe / retention
  check: oldest audit event retained
  threshold: oldest_event_age ≥ y - d
  tool: SELECT MIN(timestamp) FROM audit_log_archive

- isc: ISC-  type: anti-probe / baa
  check: every vendor in PHI data path has a recorded BAA SHA
  threshold: |vendors_in_data_path| == |vendors_with_baa_sha|
  tool: bun run scripts/baa-reconciliation.ts

- isc: ISC-  type: anti-probe / session-timeout
  check: clinician/admin/auditor session config <= min idle
  threshold: parsed config value ≤ s for those roles
  tool: deploy-preflight assertion in CI

- isc: ISC-  type: anti-probe / password
  check: no password column exists in identity DB
  threshold: columns matching ^password
  tool: SELECT column_name FROM information_schema.columns WHERE column_name ~ 'password'

- isc: ISC-  type: anti-probe / audit-log-immutability
  check: no UPDATE or DELETE statements against audit_log table from app role
  threshold: occurrences in days of pg_stat_statements
  tool: SELECT FROM pg_stat_statements WHERE query ~ '(UPDATE|DELETE).+audit_log'
```

Features

```yaml
- name: IdentityPatient
  description: Patient passwordless auth with magic link + step-up MFA (TOTP, WebAuthn, SMS-fallback)
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: IdentitySSO
  description: Okta SAML for clinician / admin / auditor with role-claim mapping
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: RBACAndRelationships
  description: Patient/clinician/admin/auditor RBAC with relationship-based access + break-glass
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [IdentityPatient, IdentitySSO]
  parallelizable: false

- name: PatientMatchingEMPI
  description: eMPI-driven longitudinal record resolution across hospitals
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: AppointmentScheduling
  description: Cross-region scheduling with FHIR Rbooking + cancellation
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [PatientMatchingEMPI, RBACAndRelationships]
  parallelizable: true

- name: ChartAndLabs
  description: Unified chart timeline + lab results + CCD/C-CDA export
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: [PatientMatchingEMPI, RBACAndRelationships]
  parallelizable: true

- name: SecureMessaging
  description: Patient-care-team messaging with EE encryption + EHR thread linkage
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: [RBACAndRelationships]
  parallelizable: true

- name: EPrescriptionHandoff
  description: Surescripts handoff with TTL-bounded portal-side state
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [RBACAndRelationships]
  parallelizable: false

- name: AuditLogPlatform
  description: Hash-chained, -year-retained, S-object-locked audit log
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false

- name: MultiRegionInfra
  description: Active-active -region AWS with documented failover and data-residency boundaries
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false

- name: Observability
  description: Correlation IDs + dashboards + runbooks + ombudsman SLO view
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: ReleasePipeline
  description: Terraform-only infra + blue/green per region + auto-rollback + secrets in Secrets Manager
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: ComplianceProgram
  description: BAA reconciliation + HITRUST audit prep + monthly attestation
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [AuditLogPlatform, MultiRegionInfra]
  parallelizable: true

- name: PhaseCanary
  description: Phase read-only chart canary live by --budget gate
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [IdentityPatient, IdentitySSO, RBACAndRelationships, ChartAndLabs, AuditLogPlatform, Observability]
  parallelizable: false

- name: PhaseMEDITECHCutover
  description: Cascade Care -hospital MEDITECH integration in Q  satisfies: [ISC-, ISC-, ISC-]
  depends_on: [PhaseCanary, AppointmentScheduling, ChartAndLabs]
  parallelizable: false

- name: PhaseDecommission
  description: Legacy decommission + HITRUST certification in Q  satisfies: [ISC-, ISC-]
  depends_on: [PhaseMEDITECHCutover, ComplianceProgram]
  parallelizable: false
```

Decisions

- --:: Three-region active-active over two-region active-active because the SLO target (.%) and the -Qcutover deadline both require a topology that survives single-region failure without manual intervention. Cost delta is ~% over two-region; the program steering committee approved the delta on --.
- --:: Authfor patient identity over building on the corporate Okta tenant because patient identity carries different lifecycle / opt-in semantics than employee identity, and mixing them would create role-elevation paths that are hard to audit. Two identity providers, separate trust boundaries, single portal.
- --:: FHIR Ras the EHR integration contract; HLvas fallback only. The -hospital MEDITECH Expanse cohort (Cascade Care) ships FHIR Rin their release; the affiliated Cerner sites are on FHIR Ralready; Epic across the home hospitals already exposes R. Building on Ravoids carrying HLvmappings as a permanent surface.
- --:: DEAD END: Tried using DynamoDB as the audit-log store because of the active-active multi-region story. Hash-chain verification across regions had eventual-consistency windows that broke ISC-'s -hour detection target during synthetic chaos tests; the chain detected as broken when it was just stale. Reverted to per-region Aurora Postgres with cross-region read replicas + Sobject-lock as the immutable archive. Don't retry DynamoDB for hash-chain workloads.
- --:: refined: ISC-sharpened from "lab results visible promptly" to "p≤ h with internal SLA p≤ h." Compliance asked for the floor (Cures Act); the org's clinical leadership asked for the SLA. Both are now ISC fields.
- --:: Break-glass design — clinician without a documented relationship can read a chart with a one-line stated reason; the read writes a high-priority audit event flagged for compliance review within h. The alternative (no break-glass) was rejected because emergency-department workflows require it; the alternative (silent override) was rejected because it defeats the audit log.
- --:: DEAD END: Tried storing patient-uploaded documents (insurance cards, prior records) in a portal-side Sbucket with a -day retention. Two problems: () it created a PHI store outside the EHR's audit perimeter, and () compliance review on --flagged that the -day window left orphaned PHI without a defensible retention policy. Reverted: patient-uploaded documents go to the EHR's document-management subsystem via FHIR `DocumentReference.create`; no portal-side store. Don't retry portal-side document storage.
- --:: refined: ISC-sharpened — e-prescription portal-side state has a -hour TTL, not the original "transient." Surescripts handoff sometimes returns asynchronously and the TTL must be long enough to survive the handoff round-trip without losing the receipt-confirmation surface.
- --:: Vendor decision: Surescripts as the e-prescription handoff partner over rolling our own pharmacy-network integrations. The "no roll-your-own" principle for compliance-relevant integrations applies; Surescripts has a signed BAA on file (SHA recorded in architecture log).
- --:: refined: ISC-quarterly drill cadence formalized after the inaugural drill on --succeeded but exposed a -second gap in correlation-ID propagation during region-drain. Drill cadence is now in the operations runbook with assigned owners.
- --:: DEAD END: Tried using a session JWT containing role + relationship claims to skip a per-request relationship check. Pen-test team demonstrated a stale-relationship attack: a clinician's relationship was revoked at t=but the JWT carried valid claims until t+min. Reverted to per-request relationship check against the relationship service; cached locally with a -second TTL. Don't retry stateless RBAC for relationship-bound clinical access.
- --:: refined: ISC-sharpened — original anti-criterion was "PHI not in URLs"; sharpened to "PHI never appears in URL query strings logged by the edge proxy or the WAF" with a probe over a -day rolling window. The original was not testable; the sharpened version is.
- --:: Phase canary scope finalized: identity + RBAC + read-only chart from Epic for hospital + audit log + observability. The original scope included messaging; messaging deferred to Phase .because the EHR-thread-linkage integration was not ready by --.
- --:: refined: ISC-added cross-region disclosure requirement after a UX research session showed patients were confused when booking at a Midwest hospital from a Pacific Northwest profile. The disclosure is a one-line "this appointment is at <region>" text with the address.
- --:: Phase canary opened to enrolled real-patient testers; HITRUST validated assessor scheduled for --through --. Budget gate review with steering committee --.
- --:: refined: ISC-added explicit requirement that cross-region transit traverses AWS-internal paths only (no public internet hops). The architecture review board found that the original constraint was implicit; making it explicit lets the network-engineering team alarm on any cross-region traffic that exits AWS.

Changelog

- --| conjectured: A multi-region active-active audit log on DynamoDB will simplify the cross-region story by relying on eventually-consistent global tables
  refuted by: synthetic chaos testing showed hash-chain verification flapping between "valid" and "broken" during the eventual-consistency window; the -hour detection target was unhittable
  learned: hash-chain integrity demands strong consistency at the chain-write boundary; eventual consistency turns "broken chain" into a noisy false signal that compliance cannot use
  criterion now: ISC-unchanged in text but the implementation pivoted to per-region Aurora Postgres with strong consistency at write, plus Sobject-lock for the immutable archive; Decisions logs the dead end

- --| conjectured: Patient-uploaded documents can live in a portal-side Swith a -day retention to avoid pushing every upload into the EHR
  refuted by: compliance review flagged that a portal-side PHI store outside the EHR audit perimeter creates a parallel system of record with no defensible retention policy beyond days
  learned: PHI storage outside the EHR's audit perimeter is a recurring temptation that compliance will (correctly) reject every time; the EHR is the system of record for clinical content
  criterion now: no ISC change in text; implementation pivoted to FHIR `DocumentReference.create` against the EHR; Decisions logs the dead end

- --| conjectured: A session JWT with role + relationship claims can skip per-request relationship checks and improve clinician-chart latency
  refuted by: pen-test team demonstrated that a clinician whose relationship was revoked at t=retained access until JWT expiry at t+min — a -minute window of unauthorized access that the audit log captured but the access-control layer did not prevent
  learned: relationship-bound RBAC requires per-request authority checks; caching can shorten the check, but stateless trust over a -minute window is incompatible with the principle that revocation is immediate
  criterion now: ISC-unchanged in text but implementation now performs a per-request check against the relationship service with a -second local cache TTL; the cache invalidates on relationship-revocation events

- --| conjectured: An anti-criterion that says "PHI not in URLs" is sufficient as written
  refuted by: a security review found that "in URLs" was ambiguous (does it mean path? query? fragment? Referer header? edge log?); the security team and the platform team interpreted it differently
  learned: anti-criteria need a single nameable probe; "PHI not in URLs" is a guideline, not a criterion
  criterion now: ISC-sharpened to "PHI never appears in URL query strings logged by the edge proxy or the WAF" with a -day rolling-window probe

- --| conjectured: Cross-region appointment booking is just an appointment booking with a different region attribute
  refuted by: UX research session showed patients booking at a Cascade Care (Midwest) hospital from a Pacific Northwest profile did not realize they had selected a different region until they saw the confirmation; one tester said "I would not have driven ,miles for this"
  learned: cross-region context is a UX surface, not just a backend attribute; the patient must see the region context before confirming, not after
  criterion now: ISC-sharpened — cross-region booking carries a one-line "this appointment is at <region>" disclosure shown before confirmation

Verification

- ISC-: Auth integration test --— magic-link arrives p≤ s, callback creates session within .s
- ISC-: Session idle-timeout drill --— clinician role: th-minute request returned `session-expired`; patient role: st-minute request returned `session-expired`
- ISC-: eMPI cross-region probe --— fixture patients each resolved to one longitudinal ID across hospitals; zero false-merge events
- ISC-: krun --— vus / min — autocomplete pms across -hospital corpus
- ISC-: lab-latency-audit --(-day window) — ph m, internal SLA met
- ISC-: audit-completeness check --— `phi_reads = audit_events` per -min bucket over h, zero gaps
- ISC-: audit-chain-verify --— -day window, zero chain breaks across all three regions
- ISC-: `aws sapi get-object-retention --bucket audit-logs --key --.parquet` — `Mode: COMPLIANCE, RetainUntilDate: --T::Z`
- ISC-: regional outage drill --— drain time m s; data-loss events: - ISC-: canary-failure-injection --— rollback completed in s; pager fired at +s
- ISC-: Phase canary live --at `portal.beaconhealth.example.org/canary`
- ISC-: Phase -day soak --to --— Pincidents, enrolled testers
- ISC-: HITRUST validated-assessor report received --— high-severity findings, medium with mitigation plans accepted
- ISC-: `rg "patient_id=|mrn=|dob=|ssn=" /var/log/cloudflare-edge/.log` -day rolling window --through --— matches
- ISC-: `SELECT column_name FROM information_schema.columns WHERE column_name ~ 'password'` against patient-identity DB — rows
- ISC-: `SELECT FROM pg_stat_statements WHERE query ~ '(UPDATE|DELETE).+audit_log' AND userid = app_role` — rows over -day window
