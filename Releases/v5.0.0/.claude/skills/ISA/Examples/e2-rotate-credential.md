<!-- Fictitious example. The CI pipeline and credential surfaces here are teaching placeholders. -->

---
task: "Rotate the production deploy credential in the CI pipeline"
slug: -_rotate-deploy-credential
effort: extended
effort_source: explicit
phase: execute
progress: /mode: interactive
started: --T::Z
updated: --T::Z
---

Problem

The production deploy credential (a long-lived API token stored in CI as `DEPLOY_API_TOKEN`) was provisioned months ago, has never been rotated, and grants broad write scope on the deploy target. Per the org's quarterly rotation policy this is overdue. We need to rotate it without breaking the next deploy and without leaving the old token live longer than necessary.

Goal

Rotate `DEPLOY_API_TOKEN` end-to-end: provision a new token with the same scope, update the CI secret, run a verification deploy on a non-production branch, then revoke the old token. The next production deploy after this rotation must succeed, and the old token must be inactive within four hours of the new one going live.

Criteria

Pre-rotation

- [ ] ISC-: New token provisioned via the deploy target's API with scope `deploy:write` only — no broader scopes (probe: `curl -H "Authorization: Bearer $NEW_TOKEN" /v/me` returns scopes `["deploy:write"]` exactly).
- [ ] ISC-: New token expires in days (probe: `curl /v/tokens/<id>` shows `expires_at` ≤ days from now).
- [ ] ISC-: New token's `created_by` is the rotation runbook service account, not an individual user (probe: token metadata).

CI update

- [ ] ISC-: `DEPLOY_API_TOKEN` secret in the CI provider is updated to the new value (probe: `gh secret list --repo <org>/<repo>` shows updated `updated_at` within last minutes).
- [ ] ISC-: No commit, log line, or artifact contains the new token value as a string (probe: `gh run view <run-id> --log | rg "$(echo $NEW_TOKEN | head -c )" | wc -l` returns ).

Verification

- [ ] ISC-: A test deploy on a `rotation-test` branch using the new token completes successfully (probe: deploy job exit , deploy target's API confirms new artifact registered).
- [ ] ISC-: The verification deploy creates an artifact tagged `rotation-test-<timestamp>` that is removable post-verify (probe: `curl /v/artifacts?tag=rotation-test` lists the artifact).
- [ ] ISC-: Post-verify cleanup removes the test artifact within minutes (probe: `curl /v/artifacts/<id>` returns after cleanup).

Old token revocation

- [ ] ISC-: Old token is revoked via the deploy target's API ≤ hours after new token activation (probe: `curl /v/tokens/<old-id>` returns `revoked_at` populated).
- [ ] ISC-: A deploy attempt with the old token returns within s of revocation (probe: `curl -H "Authorization: Bearer $OLD_TOKEN" /v/deploys -X POST` returns ).
- [ ] ISC-: The revocation is logged in the org's auth audit log with actor, time, reason (probe: SIEM query for `token_revoked` event in last hour).

Documentation

- [ ] ISC-: `docs/runbooks/credential-rotation.md` is updated with the new token's ID and the rotation date.
- [ ] ISC-: The next-rotation reminder is scheduled in the team calendar for `now + days - days` (early warning).

Anti-criteria

- [ ] ISC-: Anti: privacy — neither token value appears in any commit message, PR description, Slack/email message, or CI log (probe: `git log --all -S "$(echo $NEW_TOKEN | head -c )" --oneline` returns empty; same for old).
- [ ] ISC-: Anti: scope creep — new token does NOT have `admin:write`, `users:write`, or any scope beyond `deploy:write` (probe: token metadata scope-list comparison).
- [ ] ISC-: Anti: rollback safety — old token stays active for ≥ minutes after new token deploys to verify, so a failed rotation can re-pin the old token (probe: timestamps on activation/revocation events show ≥ min gap).

Test Strategy

```yaml
- isc: ISC-  type: api-probe
  check: new token's scope list is exactly [deploy:write]
  threshold: scopes == ["deploy:write"]
  tool: curl -s -H "Authorization: Bearer $NEW_TOKEN" https://deploy.example.org/v/me | jq -r '.scopes | sort | join(",")'

- isc: ISC-  type: log-grep
  check: new token value never appears in CI logs
  threshold: matches
  tool: gh run view --log | rg "$(echo $NEW_TOKEN | head -c )"

- isc: ISC-  type: integration
  check: test deploy with new token succeeds
  threshold: exit   tool: gh workflow run deploy.yml --ref rotation-test && wait-for-completion

- isc: ISC-  type: api-probe
  check: old token is rejected
  threshold: HTTP   tool: curl -i -H "Authorization: Bearer $OLD_TOKEN" -X POST https://deploy.example.org/v/deploys

- isc: ISC-  type: privacy
  check: neither token's first chars appear in any tracked log/commit/artifact
  threshold: matches across all surfaces
  tool: bash scripts/credential-leak-audit.sh

- isc: ISC-  type: timing
  check: gap between new-token-active and old-token-revoked ≥ min
  threshold: ≥ s
  tool: jq '.activated - .revoked' rotation-log.json
```

<!--
Eops ISA. Required sections: Problem, Goal, Criteria, Test Strategy.
Demonstrates the ISA primitive applied to an ops/runbook task — the same shape as a code task. ISC count of hits the Efloor exactly. Anti-criteria (ISC-, , ) cover privacy, scope, and rollback safety — typical ops-task regression-prevention concerns. Note ISC-explicitly preserves a safety window — a real-world lesson learned from prior bungled rotations.
-->
