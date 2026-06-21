<!-- Fictitious example. "WattWatch" is a teaching project name; any resemblance to real products or organizations is coincidental. The wattwatch.example.org domain is RFC reserved. -->

---
task: "WattWatch — local-first home energy monitoring desktop app"
slug: -_wattwatch-vproject: WattWatch
effort: comprehensive
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

People with rooftop solar, home batteries, and smart-plug-instrumented circuits have access to real-time energy data, but the data lives in five vendor walled gardens. Shelly's app shows Shelly devices. Emporia shows Emporia. Sense shows Sense. Tesla's app shows Powerwall. None of them speak to each other; none of them produce a coherent house-level picture; all of them require a vendor cloud round-trip even for "is the heat pump on right now" questions answered by a sensor sitting on the homeowner's own LAN. Anyone who actually wants to optimize home electricity ends up running a Home Assistant install, hand-writing YAML for each integration, and accepting that the result is a hobbyist toolkit rather than a finished product. The middle ground — a polished desktop application that aggregates the major US residential energy sensors into one local-first picture — does not exist in .

Vision

A native desktop application (macOS-first, Linux next, Windows last) that the homeowner installs from a signed `.dmg`, points at their LAN, and within ten minutes is watching live whole-house power flow with per-circuit attribution, per-device drill-down, and a six-month historical archive — all stored locally on the homeowner's own disk. Euphoric surprise: the user opens the app on a hot afternoon, sees the heat pump pull .kW while the solar array produces .kW, and watches the Powerwall charge with the surplus in real time — without a single packet leaving the home network. They send a screenshot to a friend. The friend installs the app the same night.

Out of Scope

- No mandatory cloud account.The app runs fully offline against LAN-only sensors. Cloud sync is opt-in and disabled by default.
- No utility-bill integration.Reading PDFs from the utility company's portal is a different product. We aggregate sensor data, not billing data.
- No HVAC or appliance control.WattWatch reads. It never writes. No "turn off the dryer at pm" automation in v.
- No mobile apps.Desktop only. A future read-only web view served from the desktop app is plausible; a native iOS/Android client is not v.
- No commercial / multi-tenant deployments.Single home, single user, single machine. No fleet management, no landlord-tenant separation.
- No support for vendor-encrypted protocols we cannot legitimately decode.Shelly local HTTP API: yes. Emporia Vue local UDP: yes. Sense reverse-engineered cloud-only protocol: deferred until Sense ships a documented local API.
- No real-time price arbitrage / battery-dispatch optimization.Visualizing the data is v. Acting on it is vor never.

Principles

- Local-first is not a feature, it is the entire posture. If a feature requires the cloud to function, it is a different product.
- Sensor data is the homeowner's data. The app does not phone home, does not ship anonymized telemetry, does not embed third-party SDKs in the read path.
- A polished single-user desktop application is a legitimate product category in ; "just use Home Assistant" is not the answer for a non-developer audience.
- Hardware integrations are slow, fragile, and vendor-specific by nature. The app is honest about partial coverage rather than pretending all sensors are equal.
- Historical data is sacred. The user's six-month archive must survive app updates, sensor changes, and vendor API churn without manual export-import dances.

Constraints

- TypeScript + Bun for tooling; the desktop shell is Tauri .x (Rust + system webview), not Electron. Bundle target ≤ MB compressed.
- All sensor data persists in a local SQLite database at `${APP_DATA}/wattwatch/db.sqlite`. No remote primary store.
- The app supports macOS + as tier-, Linux x_/aarch(AppImage + .deb) as tier-, Windows + as tier-. Tier-must be production-quality; tier-may have known issues documented in release notes.
- All authentication is local (single password, Argonid, stored in OS keychain). No SSO, no OAuth, no account servers.
- Optional cloud-sync (off by default) uses end-to-end encryption with a user-derived key; the sync server is a thin relay that cannot read content.
- Sensor poll cadence is configurable but bounded: minimum second, maximum minutes, default seconds for whole-house and seconds for per-device.
- The UI must remain responsive (fps scroll, ≤ ms interaction latency p) on a MacBook Air with GB RAM and days of accumulated data.

Goal

Ship a Tauri-based desktop application — code-named WattWatch and distributed via signed installers from `wattwatch.example.org` — that aggregates Shelly, Emporia Vue, Sense, and Tesla Powerwall sensor data into a unified local SQLite store, presents a real-time whole-house energy view with per-device attribution and a six-month historical archive, and operates fully offline by default with optional end-to-end-encrypted cloud sync.

Criteria

Build & Distribution

- [x] ISC-: `bun run tauri build` produces signed `.dmg` (macOS arm), `.AppImage` (Linux x_), and `.msi` (Windows x) artifacts.
- [x] ISC-: macOS `.dmg` is notarized; `spctl --assess --verbose` reports `accepted (source=Notarized Developer ID)`.
- [x] ISC-: All three platform artifacts ≤ MB compressed.
- [x] ISC-: `wattwatch.example.org/download` serves the latest signed artifacts with SHA-checksums posted alongside.
- [x] ISC-: `wattwatch --version` prints semver matching the `package.json` version.

First-Run & Onboarding

- [x] ISC-: First-launch wizard completes in ≤ minutes for a user with one Shelly device and one Powerwall.
- [x] ISC-: LAN scan auto-detects Shelly devices via mDNS (`_shelly._tcp.local`) within seconds.
- [x] ISC-: Emporia Vue setup accepts the homeowner's local credentials and verifies UDP port is reachable.
- [x] ISC-: Tesla Powerwall setup accepts the gateway IP and the customer-set password (no Tesla cloud account required).
- [x] ISC-: Sense integration is gated behind a "experimental — cloud-only" disclaimer that the user must dismiss before enabling.
- [ ] ISC-: Onboarding stores zero credentials in plaintext on disk; all secrets land in OS keychain (Keychain on macOS, libsecret on Linux, Credential Manager on Windows).

Sensor Drivers

- [x] ISC-: Shelly driver polls Genand Gendevices via local HTTP API (`/status` and `/rpc/Shelly.GetStatus`).
- [x] ISC-: Emporia Vue driver decodes the local UDP broadcast and maps the circuit channels to user-named labels.
- [x] ISC-: Tesla Powerwall driver authenticates against `/api/login/Basic` and polls `/api/meters/aggregates` and `/api/system_status/soe` every seconds.
- [ ] ISC-: Sense driver (experimental) authenticates against the documented WebSocket and warns the user that this path requires a Sense cloud round-trip.
- [x] ISC-: A driver that fails three consecutive polls is marked `degraded` in the UI; ten consecutive failures marks it `offline` and pauses polling for seconds.
- [x] ISC-: Driver poll latency p≤ ms on LAN sensors; cloud sensors (Sense) p≤ ms.

Data Model & Storage

- [x] ISC-: SQLite schema: `device`, `sensor_reading`, `circuit`, `aggregate_min`, `aggregate_hourly`, `aggregate_daily`, `event`, `user_pref`.
- [x] ISC-: `sensor_reading` rolls up to `aggregate_min` continuously; older raw readings are pruned after days.
- [x] ISC-: `aggregate_hourly` retained months; `aggregate_daily` retained indefinitely.
- [x] ISC-: Database integrity check (`PRAGMA integrity_check`) runs at startup; failure shows recovery wizard, never silently ignores.
- [x] ISC-: A user-triggered `Export → JSON` writes the full history to a timestamped file in ≤ seconds for a -month archive.

UI / Real-Time View

- [x] ISC-: Live dashboard shows whole-house power, solar production, battery state-of-charge, and grid import/export with values updated every seconds.
- [x] ISC-: Per-circuit panel lists all Emporia Vue circuits sorted by current draw with sparklines for the last minutes.
- [x] ISC-: Energy-flow diagram (Sankey) renders solar → home / battery / grid splits in real time.
- [ ] ISC-: Drill-down view for any circuit shows raw readings, hourly aggregates, and daily aggregates with zoom and pan.
- [x] ISC-: UI maintains fps scroll on a MacBook Air (GB) with days of data loaded.
- [x] ISC-: Interaction latency (click → first paint) p≤ ms on tier-hardware.

Alerts

- [x] ISC-: User can define rules of the form `if <metric> <op> <threshold> for <duration>`.
- [x] ISC-: When a rule fires, the app shows a system notification and writes an `event` row.
- [x] ISC-: Alert state persists across app restarts; an alert that fires while the app is closed shows on next launch.
- [ ] ISC-: Notification permission failure is handled gracefully — the alert still writes to the in-app log even if the OS denies notifications.

Auth (local password)

- [x] ISC-: First launch prompts the user to set a local password (Argonid, m=MB, t=, p=).
- [x] ISC-: The local password unlocks the SQLite encryption key (SQLCipher) at app start.
- [x] ISC-: Five failed unlock attempts triggers a -minute cooldown.
- [x] ISC-: Password reset requires the user to confirm they will lose access to existing encrypted data; there is no recovery key in v.

Cloud Sync (optional, disabled by default)

- [ ] ISC-: Cloud sync is OFF in default settings; turning it on shows a single-screen explanation of what data leaves the device.
- [ ] ISC-: When enabled, the app derives a sync key from the local password using HKDF and a stable per-install salt.
- [ ] ISC-: Synced payloads are encrypted with AES--GCM client-side; the relay server stores ciphertext only.
- [ ] ISC-: A second device with the same password and email can pair within seconds and resume showing the user's data.
- [ ] ISC-: Disabling cloud sync deletes all server-side ciphertext within hours; the app shows a confirmation when deletion completes.

Updates

- [x] ISC-: The app checks `wattwatch.example.org/api/release/latest` once per hours; updates are applied only after the user clicks "Install."
- [x] ISC-: Update payloads are signed; an unsigned or tampered payload aborts the update with a visible error.

Operational

- [x] ISC-: A diagnostic export bundles the SQLite schema (no rows), driver logs (last h), and OS info into a `.zip` for support.
- [x] ISC-: Crash reporter is opt-in and shows the user the exact bytes that would be sent before transmission.

Anti-criteria

- [x] ISC-: Anti: privacy — the app makes zero outbound network requests on first launch before the user explicitly enables cloud sync (verified via packet capture).
- [x] ISC-: Anti: out of scope — there is no `Control` button anywhere in the UI; sensor write paths are not wired up.
- [x] ISC-: Anti: data loss — an app update never overwrites or migrates the SQLite database without first writing a `.bak` copy with timestamp suffix.
- [x] ISC-: Anti: dependency creep — no Electron in the build graph; `bun pm ls | grep electron` returns empty.
- [x] ISC-: Anti: telemetry — `rg "google-analytics|sentry|mixpanel|posthog|fullstory" src/` returns zero matches.

Test Strategy

```yaml
- isc: ISC-  type: notarization
  check: macOS Gatekeeper accepts the signed .dmg
  threshold: spctl reports "accepted (source=Notarized Developer ID)"
  tool: spctl --assess --verbose dist/WattWatch.dmg

- isc: ISC-  type: bundle-size
  check: artifact size after compression
  threshold: ≤ MB
  tool: du -m dist/WattWatch.dmg dist/WattWatch.AppImage dist/WattWatch.msi

- isc: ISC-  type: lan-discovery
  check: mDNS scan returns Shelly devices in test rig
  threshold: ≥ device discovered in ≤ s
  tool: bun run scripts/mdns-probe.ts

- isc: ISC-  type: driver-integration
  check: Powerwall driver reads /api/meters/aggregates with valid auth
  threshold: returns site/load/solar/battery values
  tool: bun run scripts/powerwall-probe.ts --gateway ..x.x

- isc: ISC-  type: db-integrity
  check: PRAGMA integrity_check on existing db
  threshold: returns "ok"
  tool: sqlite${APP_DATA}/wattwatch/db.sqlite "PRAGMA integrity_check"

- isc: ISC-  type: performance
  check: fps scroll with days loaded
  threshold: median frame time ≤ .ms
  tool: tauri devtools performance recorder

- isc: ISC-  type: interaction-latency
  check: click → first paint p  threshold: ≤ ms
  tool: bun run scripts/ui-latency.ts --runs 
- isc: ISC-  type: crypto
  check: synced payload is AES--GCM ciphertext, not plaintext
  threshold: payload entropy ≥ .bits/byte
  tool: bun run scripts/sync-payload-entropy.ts

- isc: ISC-  type: anti-probe
  check: outbound packets on first launch before consent
  threshold: packets to non-LAN destinations
  tool: tcpdump -i en'not net .../and not net .../and not net .../' for s

- isc: ISC-  type: anti-dep
  check: no Electron in dependency tree
  threshold: empty match
  tool: bun pm ls | rg -i electron

- isc: ISC-  type: anti-telemetry
  check: no third-party telemetry SDK strings in source
  threshold: matches
  tool: rg "google-analytics|sentry|mixpanel|posthog|fullstory" src/
```

Features

```yaml
- name: SensorDriverShelly
  description: Local HTTP polling for Shelly Gen/Gendevices with mDNS discovery
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: SensorDriverEmporia
  description: UDP broadcast decoder + -channel circuit mapping
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: SensorDriverPowerwall
  description: Local Tesla Gateway auth + meter/battery polling
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: SensorDriverSense
  description: Experimental WebSocket integration with cloud-required disclaimer
  satisfies: [ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: LocalStorage
  description: SQLCipher-backed SQLite with rollups, retention, and integrity checks
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: false

- name: AuthLocal
  description: Argonid password + OS keychain + cooldown
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [LocalStorage]
  parallelizable: false

- name: LiveDashboard
  description: Real-time whole-house view + Sankey + per-circuit panel
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [SensorDriverShelly, SensorDriverEmporia, SensorDriverPowerwall, LocalStorage]
  parallelizable: false

- name: Alerts
  description: Rule engine, system notifications, persisted alert state
  satisfies: [ISC-, ISC-, ISC-, ISC-]
  depends_on: [LocalStorage]
  parallelizable: true

- name: CloudSyncOptional
  description: EE-encrypted optional sync via thin relay
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: [AuthLocal, LocalStorage]
  parallelizable: false

- name: Updater
  description: Signed update channel with explicit user opt-in per install
  satisfies: [ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: Distribution
  description: Tauri build pipeline, notarization, downloads page
  satisfies: [ISC-, ISC-, ISC-, ISC-, ISC-]
  depends_on: []
  parallelizable: true

- name: Diagnostics
  description: Diagnostic export + opt-in crash reporter
  satisfies: [ISC-, ISC-]
  depends_on: [LocalStorage]
  parallelizable: true
```

Decisions

- --:: Tauri .x over Electron because the bundle-size constraint (≤ MB) is impossible with Electron's Chromium baseline (~MB minimum) and because system-webview reuse improves cold-start latency materially on tier-macOS hardware.
- --:: SQLite + SQLCipher over a custom encrypted KV because the data shape is genuinely relational (devices, circuits, readings, aggregates) and the homeowner-export use case demands a portable file format.
- --:: DEAD END: Tried polling all four sensor families from a single Worker thread to simplify the scheduler. Result: a stalled Sense WebSocket blocked Shelly polls and dashboard latency exceeded ISC-by ×. Reverted to per-driver dedicated workers with isolated event loops. Don't retry.
- --:: refined: ISC-retention policy split — original "raw readings retained indefinitely" was naive; -day raw + -month hourly + indefinite daily is the actual storage shape that survives months on a GB Mac.
- --:: DEAD END: Tried using vendor cloud APIs as a fallback when LAN auth failed. This violated the local-first principle and introduced a hidden cloud dependency that some users would not notice. Reverted to honest "this sensor is offline" UI. Don't retry.
- --:: Cloud sync deferred from vto v.— the threat model around the relay server is non-trivial and shipping the local-first product first is more honest than shipping cloud sync alongside it.
- --:: refined: ISC-sharpened from "no telemetry" to "zero outbound packets to non-LAN destinations on first launch before user opts in" after a packet-capture review found a Tauri auto-update probe firing pre-consent. Updater check now waits until the user has finished onboarding.
- --:: Sense driver kept in vas `experimental` rather than dropped, because user-research showed Sense owners are the most underserved by existing tools. The cloud-required disclaimer + ISC-'s explicit warning is the honest compromise.
- --:: refined: ISC-bundle target tightened from MB to MB after Tauri .x's release notes on system-webview reuse landed; the original MB target was generous.

Changelog

- --| conjectured: A single polling worker with all four drivers will simplify the architecture without measurable cost
  refuted by: a stalled Sense WebSocket blocked Shelly polls and dashboard interaction latency exceeded ISC-by ×
  learned: per-driver isolation is required when one driver's failure mode is a hung connection rather than an error response
  criterion now: ISC-split into LAN sensor budget (≤ ms) and cloud sensor budget (≤ ms); driver implementation moved to per-driver workers

- --| conjectured: days of raw readings is enough for power-user drill-down
  refuted by: beta tester filed a bug saying he wanted to look at -minute resolution from days ago for a heat-pump diagnostic
  learned: -minute aggregates are the right "drill-down" resolution; raw -second readings are only useful within a week
  criterion now: ISC-sharpened — raw retained days, -minute aggregates retained months, daily indefinitely

- --| conjectured: Falling back to vendor cloud when LAN auth fails is a kindness to the user
  refuted by: the fallback was invisible and one tester ran for weeks on cloud-fallback without noticing — exactly the failure mode the local-first principle exists to prevent
  learned: silent fallbacks across trust boundaries violate the user's mental model; the honest UI is "your sensor is offline, here's why"
  criterion now: no change to ISCs; Decisions logs the dead end and the principle is sharpened in code review checklist

- --| conjectured: Tauri's default auto-update probe is a reasonable thing to ship pre-consent
  refuted by: packet-capture audit found the probe firing on first launch before the user had even seen the welcome screen, contradicting "zero outbound packets before consent"
  learned: "no telemetry" is not enough; the audit must include framework-default network behavior, not just our own code
  criterion now: ISC-sharpened from "no telemetry" to "zero outbound packets to non-LAN destinations on first launch before user opts in"; updater check deferred until post-onboarding

Verification

- ISC-: `spctl --assess --verbose dist/WattWatch.dmg` — `dist/WattWatch.dmg: accepted (source=Notarized Developer ID)`
- ISC-: `du -m dist/WattWatch.dmg` — `M`; `du -m dist/WattWatch.AppImage` — `M`; `du -m dist/WattWatch.msi` — `M`
- ISC-: mdns-probe.ts run on test LAN with Shelly Gendevices — discovered all in .s
- ISC-: powerwall-probe.ts against test gateway — `{site_now: -, load_now: , solar_now: , battery_now: , percentage_charged: .}`
- ISC-: `sqlitedb.sqlite "PRAGMA integrity_check"` — `ok`
- ISC-: Tauri devtools recorder, -day dataset on MacBook Air — median frame time .ms during scroll
- ISC-: ui-latency.ts runs on tier-hardware — pclick-to-paint ms
- ISC-: -second tcpdump on first launch before consent — packets to non-LAN destinations
- ISC-: `bun pm ls | rg -i electron` — empty
- ISC-: `rg "google-analytics|sentry|mixpanel|posthog|fullstory" src/` — empty
