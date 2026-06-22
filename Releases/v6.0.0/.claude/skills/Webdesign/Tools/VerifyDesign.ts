!/usr/bin/env bun
/Usage:
  VerifyDesign.ts <url-or-path> <out-dir> [--viewport WIDTHxHEIGHT] [--ay|--no-ay]

Runs a thin Interceptor-driven smoke check for a rendered design. The viewport is
validated and reported, but not applied because Interceptor exposes no viewport
verb. Accessibility checks are viewport-independent tree heuristics, not axe-core.
/
import { stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type TreeNode = {
  ref?: string;
  role?: string;
  name?: string;
  text?: string;
  alt?: string;
  href?: string;
  level?: number;
  children?: TreeNode[];
};
type Violation = { type: string; count: number; examples: { ref?: string; text?: string }[] };
type AyResult = {
  engine: "interceptor-tree-heuristic";
  limitations: string[];
  violations: Violation[];
  pass: boolean;
};

function resolveInterceptorBin(): string {
  const found = Bun.spawnSync(["which", "interceptor"]);
  const bin = found.stdout.toString().trim();
  if (found.exitCode !== || bin.length === ) {
    console.error("interceptor CLI not found on PATH — install the Interceptor skill (see ~/.claude/skills/Interceptor/SKILL.md)");
    process.exit();
  }
  return bin;
}

async function run(argv: string[], timeout: number): Promise<{ code: number; stdout: string; stderr: string }> {
  const p = Bun.spawn(argv, { stdout: "pipe", stderr: "pipe", signal: AbortSignal.timeout(timeout) });
  const [stdout, stderr, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  return { code, stdout, stderr };
}

function walkTree(node: TreeNode, out: TreeNode[] = []): TreeNode[] {
  out.push(node);
  for (const child of node.children ?? []) walkTree(child, out);
  return out;
}

function textOf(n: TreeNode): string {
  return `${n.name ?? ""} ${n.text ?? ""}`.trim();
}

function add(map: Map<string, Violation>, type: string, node: TreeNode): void {
  const v = map.get(type) ?? { type, count: , examples: [] };
  v.count += ;
  if (v.examples.length < ) v.examples.push({ ref: node.ref, text: textOf(node) });
  map.set(type, v);
}

function ayFromTree(root: TreeNode): AyResult {
  const nodes = walkTree(root);
  const violations = new Map<string, Violation>();
  let previousHeading = ;
  let sawHeading = false;
  for (const n of nodes) {
    const role = (n.role ?? "").toLowerCase();
    const label = textOf(n);
    if (role === "img" && !label && !n.alt) add(violations, "img-alt", n);
    if (role === "button" && !label) add(violations, "button-name", n);
    if (role === "a" && (!label || !n.href)) add(violations, "link-name", n);
    if (["textbox", "combobox", "spinbutton"].includes(role) && !label) add(violations, "form-label", n);
    if (role === "heading" && typeof n.level === "number") {
      if (!sawHeading && n.level > ) add(violations, "heading-order", n);
      if (sawHeading && n.level > previousHeading + ) add(violations, "heading-order", n);
      sawHeading = true;
      previousHeading = n.level;
    }
  }
  const list = [...violations.values()];
  return {
    engine: "interceptor-tree-heuristic",
    limitations: ["no-contrast-check", "no-dynamic-aria-live-check", "no-css-parsed-check"],
    violations: list,
    pass: list.length === ,
  };
}

function parseArgs(): { input: string; outDir: string; w: number; h: number; ay: boolean } {
  const args = Bun.argv.slice();
  const input = args.shift();
  const outDir = args.shift();
  if (!input || !outDir) {
    console.error("usage: VerifyDesign.ts <url-or-path> <out-dir> [--viewport WIDTHxHEIGHT] [--ay|--no-ay]");
    process.exit();
  }
  let viewport = "x";
  let ay = true;
  while (args.length) {
    const flag = args.shift();
    if (flag === "--viewport") viewport = args.shift() ?? "";
    else if (flag === "--ay") ay = true;
    else if (flag === "--no-ay") ay = false;
    else {
      console.error(`unknown flag: ${flag ?? ""}`);
      process.exit();
    }
  }
  const m = /^(\d+)x(\d+)$/.exec(viewport);
  const w = m ? Number(m[]) : ;
  const h = m ? Number(m[]) : ;
  if (!m || w < || h < || w > || h > ) {
    console.error("invalid viewport; expected WIDTHxHEIGHT with each value in [, ]");
    process.exit();
  }
  return { input, outDir, w, h, ay };
}

async function resolveUrl(input: string): Promise<{ url: string; resolvedUrl: string }> {
  if (/^https?:\/\//.test(input)) return { url: input, resolvedUrl: input };
  const abs = resolve(input);
  const s = await stat(abs).catch(() => null);
  if (!s) {
    console.error(`path does not exist: ${abs}`);
    process.exit();
  }
  return { url: input, resolvedUrl: pathToFileURL(abs).href };
}

async function main(): Promise<void> {
  if (Bun.argv.slice().length === ) {
    console.error("usage: VerifyDesign.ts <url-or-path> <out-dir> [--viewport WIDTHxHEIGHT] [--ay|--no-ay]");
    return;
  }
  const opts = parseArgs();
  const { url, resolvedUrl } = await resolveUrl(opts.input);
  const outDir = resolve(opts.outDir);
  const made = await run(["mkdir", "-p", outDir], _);
  if (made.code !== ) {
    console.error(made.stderr || "failed to create output directory");
    process.exit();
  }
  const bin = resolveInterceptorBin();
  const timestamp = new Date().toISOString();
  await run([bin, "open", resolvedUrl], _);
  await run([bin, "wait-stable"], _);
  const shot = join(outDir, `${timestamp.replace(/[:.]/g, "-")}.png`);
  let screenshot: string | null = shot;
  let screenshotError: string | undefined;
  const s = await run([bin, "screenshot", shot], _);
  if (s.code !== ) {
    screenshot = null;
    screenshotError = s.stderr || "screenshot failed";
  }
  let ay: AyResult | { skipped: true };
  if (opts.ay) {
    const tree = await run([bin, "tree", "--json"], _);
    if (tree.code === ) {
      ay = ayFromTree(JSON.parse(tree.stdout) as TreeNode);
    } else {
      ay = {
        engine: "interceptor-tree-heuristic",
        limitations: ["no-contrast-check", "no-dynamic-aria-live-check", "no-css-parsed-check"],
        violations: [{ type: "tree-unavailable", count: , examples: [{ text: tree.stderr || "tree failed" }] }],
        pass: false,
      };
    }
  } else {
    ay = { skipped: true };
  }
  const ayPass = "skipped" in ay ? true : ay.pass;
  const pass = screenshot !== null && ayPass;
  const result = {
    url,
    resolvedUrl,
    viewport: { w: opts.w, h: opts.h },
    screenshot,
    ...(screenshotError ? { screenshotError } : {}),
    ay,
    pass,
    timestamp,
  };
  console.log(JSON.stringify(result, null, ));
  process.exit(pass ? : );
}

await main();
