/**
 * PAI Installer v6.0 — Validation
 * Verifies installation completeness after all steps run.
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
import type { InstallState, ValidationCheck, InstallSummary, EngineEventHandler } from "./types";
import { PAI_VERSION } from "./types";
import { homedir } from "os";

/**
 * Run the SecurityPipeline.hook.ts as Claude Code would, with a benign Bash
 * payload. The hook MUST exit 0 (allow) and MUST NOT print "patterns file
 * missing — fail-closed". A failure here means PATTERNS.yaml is unreachable
 * to the hook at runtime even if the file appears to exist on disk — the
 * exact bug that left fresh installs unable to run any Bash command.
 *
 * Returns { passed, detail }. `passed=false` is CRITICAL: every Bash call
 * the user makes will be denied until this is fixed.
 */
function checkSecurityHookSmoke(paiDir: string): { passed: boolean; detail: string } {
  const hookPath = join(paiDir, "hooks", "SecurityPipeline.hook.ts");
  if (!existsSync(hookPath)) {
    return { passed: false, detail: "Hook not found at hooks/SecurityPipeline.hook.ts" };
  }
  const patternsPath = join(paiDir, "PAI", "USER", "SECURITY", "PATTERNS.yaml");
  if (!existsSync(patternsPath)) {
    return { passed: false, detail: `PATTERNS.yaml not found at ${patternsPath} — hook will fail-close on every Bash call` };
  }
  // Synthetic benign payload that should ALWAYS be allowed. Mirrors Claude Code's hook input shape.
  const payload = JSON.stringify({
    session_id: "smoke-test",
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    tool_input: { command: "echo pai-smoke-test" },
  });
  try {
    const res = spawnSync(process.execPath, [hookPath], {
      input: payload,
      encoding: "utf-8",
      timeout: 8000,
      // Match Claude Code: no inherited zshrc, minimal env. HOME and PATH only.
      env: { HOME: homedir(), PATH: process.env.PATH || "" },
    });
    const stderr = (res.stderr || "").toString();
    if (res.status !== 0) {
      return { passed: false, detail: `Hook exited ${res.status}: ${stderr.trim().slice(0, 160) || "no stderr"}` };
    }
    if (/patterns file missing|fail-closed/i.test(stderr)) {
      return { passed: false, detail: `Hook printed fail-closed message: ${stderr.trim().slice(0, 160)}` };
    }
    return { passed: true, detail: "echo allowed; PATTERNS.yaml loaded; no fail-closed message" };
  } catch (err: any) {
    return { passed: false, detail: `Hook execution threw: ${err?.message || String(err)}` };
  }
}

/**
 * Run all validation checks against the current state.
 */
export async function runValidation(state: InstallState, emit?: EngineEventHandler): Promise<ValidationCheck[]> {
  if (emit) {
    await emit({ event: "step_start", step: "validation" });
    await emit({
      event: "section_header",
      sectionId: "FINAL-VALIDATION",
      title: "FINAL VALIDATION",
      subtitle: "Verifying the install before handing control back to you",
      stepNumber: 7,
    });
  }

  const paiDir = state.detection?.paiDir || join(homedir(), ".claude");
  const checks: ValidationCheck[] = [];

  // 1. settings.json exists and is valid JSON
  const settingsPath = join(paiDir, "settings.json");
  const settingsExists = existsSync(settingsPath);
  let settingsValid = false;
  let settings: any = null;

  if (settingsExists) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf-8"));
      settingsValid = true;
    } catch {
      settingsValid = false;
    }
  }

  checks.push({
    name: "settings.json",
    passed: settingsExists && settingsValid,
    detail: settingsValid
      ? "Valid configuration file"
      : settingsExists
        ? "File exists but invalid JSON"
        : "File not found",
    critical: true,
  });

  // 2. Required settings fields
  if (settings) {
    checks.push({
      name: "Principal name",
      passed: !!settings.principal?.name,
      detail: settings.principal?.name ? `Set to: ${settings.principal.name}` : "Not configured",
      critical: true,
    });

    checks.push({
      name: "AI identity",
      passed: !!settings.daidentity?.name,
      detail: settings.daidentity?.name ? `Set to: ${settings.daidentity.name}` : "Not configured",
      critical: true,
    });

    checks.push({
      name: "PAI version",
      passed: !!settings.pai?.version,
      detail: settings.pai?.version ? `v${settings.pai.version}` : "Not set",
      critical: false,
    });

    checks.push({
      name: "Timezone",
      passed: !!settings.principal?.timezone,
      detail: settings.principal?.timezone || "Not configured",
      critical: false,
    });
  }

  // 3. Directory structure
  const requiredDirs = [
    { path: "skills", name: "Skills directory" },
    { path: "MEMORY", name: "Memory directory" },
    { path: "MEMORY/STATE", name: "State directory" },
    { path: "MEMORY/WORK", name: "Work directory" },
    { path: "hooks", name: "Hooks directory" },
    { path: "Plans", name: "Plans directory" },
  ];

  for (const dir of requiredDirs) {
    const fullPath = join(paiDir, dir.path);
    checks.push({
      name: dir.name,
      passed: existsSync(fullPath),
      detail: existsSync(fullPath) ? "Present" : "Missing",
      critical: dir.path === "skills" || dir.path === "MEMORY",
    });
  }

  // 4. PAI skill present
  const skillPath = join(paiDir, "skills", "PAI", "SKILL.md");
  checks.push({
    name: "PAI core skill",
    passed: existsSync(skillPath),
    detail: existsSync(skillPath) ? "Present" : "Not found — clone PAI repo to enable",
    critical: false,
  });

  // 5. Zsh alias configured
  const zshrcPath = join(homedir(), ".zshrc");
  let aliasConfigured = false;
  if (existsSync(zshrcPath)) {
    try {
      const zshContent = readFileSync(zshrcPath, "utf-8");
      aliasConfigured = zshContent.includes("# PAI alias") && zshContent.includes("alias pai=");
    } catch {}
  }

  checks.push({
    name: "Shell alias (pai)",
    passed: aliasConfigured,
    detail: aliasConfigured ? "Configured in .zshrc" : "Not found — run: source ~/.zshrc",
    critical: true,
  });

  // 6. SecurityPipeline smoke test — runs the actual hook with a benign Bash
  // payload. Catches the v5.0 fail-closed regression where PATTERNS.yaml was
  // missing from the public template, leaving every fresh install unable to
  // execute Bash commands. CRITICAL — if this fails, the install is broken.
  const securitySmoke = checkSecurityHookSmoke(paiDir);
  checks.push({
    name: "SecurityPipeline hook (smoke test)",
    passed: securitySmoke.passed,
    detail: securitySmoke.detail,
    critical: true,
  });

  return checks;
}

/**
 * Generate install summary from state.
 */
export function generateSummary(state: InstallState): InstallSummary {
  return {
    paiVersion: PAI_VERSION,
    principalName: state.collected.principalName || "User",
    aiName: state.collected.aiName || "PAI",
    timezone: state.collected.timezone || "UTC",
    catchphrase: state.collected.catchphrase || "",
    installType: state.installType || "fresh",
    completedSteps: state.completedSteps.length,
    totalSteps: 7,
  };
}
