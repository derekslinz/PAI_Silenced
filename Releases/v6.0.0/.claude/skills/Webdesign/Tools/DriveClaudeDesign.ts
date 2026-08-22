!/usr/bin/env bun
/Usage: DriveClaudeDesign.ts open | prompt "<brief>" | screenshot <out-path>
       DriveClaudeDesign.ts export <html|pdf|pptx|canva|url> <out-dir>
       DriveClaudeDesign.ts bundle <out-dir>
Prereqs: `agent-browser` on PATH and an authenticated claude.ai session.
Examples: DriveClaudeDesign.ts open
          DriveClaudeDesign.ts prompt "Create a concise launch deck."
          DriveClaudeDesign.ts export pdf ./handoff
Thin agent-browser wrapper. UI targeting uses loud accessibility-tree heuristics.
/
import { mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

type TreeNode = { ref?: string; role?: string; name?: string; text?: string; contenteditable?: boolean | string; children?: TreeNode[] };

function resolveAgentBrowserBin(): string {
  const found = Bun.spawnSync(["which", "agent-browser"]);
  const bin = found.stdout.toString().trim();
  if (found.exitCode !== || bin.length === ) {
    console.error("agent-browser CLI not found on PATH — install the Browser skill (see ~/.claude/skills/Browser/SKILL.md)");
    process.exit();
  }
  return bin;
}

async function run(argv: string[], timeout = _): Promise<{ code: number; stdout: string; stderr: string }> {
  const p = Bun.spawn(argv, { stdout: "pipe", stderr: "pipe", signal: AbortSignal.timeout(timeout) });
  const [stdout, stderr, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  return { code, stdout, stderr };
}

function walkTree(node: TreeNode, out: TreeNode[] = []): TreeNode[] {
  out.push(node);
  for (const child of node.children ?? []) walkTree(child, out);
  return out;
}

async function getTree(bin: string): Promise<{ raw: string; nodes: TreeNode[] }> {
  const result = await run([bin, "tree", "--json"]);
  if (result.code !== ) throw new Error(result.stderr || "agent-browser tree failed");
  const parsed = JSON.parse(result.stdout) as TreeNode;
  return { raw: result.stdout, nodes: walkTree(parsed) };
}

function labelOf(n: TreeNode): string {
  return `${n.name ?? ""} ${n.text ?? ""}`.trim();
}

async function dumpMiss(raw: string): Promise<never> {
  const out = `/tmp/claude-design-tree-${Date.now()}.json`;
  await writeFile(out, raw);
  console.error(`Claude Design control heuristic missed; tree dumped to ${out}`);
  process.exit();
}

async function commandOpen(bin: string): Promise<number> {
  const r = await run([bin, "open", "https://claude.ai/design"]);
  if (r.stderr) console.error(r.stderr.trim());
  return r.code;
}

async function commandPrompt(bin: string, brief?: string): Promise<number> {
  if (!brief) {
    console.error("usage: DriveClaudeDesign.ts prompt <brief>");
    return ;
  }
  const tree = await getTree(bin);
  // Composer heuristic: Claude Design exposes prompt input as textbox or contenteditable.
  // Choose the first such node with an agent-browser ref.
  const composer = tree.nodes.find((n) => n.ref && (n.role === "textbox" || n.contenteditable === true || n.contenteditable === "true"));
  if (!composer?.ref) await dumpMiss(tree.raw);
  const typed = await run([bin, "type", composer.ref, brief]);
  if (typed.code !== ) return typed.code;
  const buttons = tree.nodes.filter((n) => n.ref && n.role === "button");
  // Send heuristic: prefer explicit Send text; icon-only UIs may expose submit-like
  // text, and a single-button composer is the last resort.
  const send = buttons.find((n) => /send|submit|arrow/i.test(labelOf(n))) ?? (buttons.length === ? buttons[] : undefined);
  if (!send?.ref) await dumpMiss(tree.raw);
  const clicked = await run([bin, "click", send.ref]);
  return clicked.code;
}

async function commandScreenshot(bin: string, outPath?: string): Promise<number> {
  if (!outPath) {
    console.error("usage: DriveClaudeDesign.ts screenshot <out-path>");
    return ;
  }
  const target = resolve(outPath);
  await mkdir(resolve(target, ".."), { recursive: true }).catch(() => undefined);
  const r = await run([bin, "screenshot", target], _);
  if (r.stdout) console.log(r.stdout.trim());
  if (r.stderr) console.error(r.stderr.trim());
  return r.code;
}

async function newestDownload(seconds: number, ext?: RegExp): Promise<string | null> {
  const dir = join(Bun.env.HOME ?? "", "Downloads");
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const min = Date.now() - seconds ;
  let best: { path: string; mtime: number } | null = null;
  for (const entry of entries) {
    if (!entry.isFile() || entry.name.startsWith(".")) continue;
    if (ext && !ext.test(entry.name)) continue;
    const p = join(dir, entry.name);
    const s = await stat(p).catch(() => null);
    if (!s || s.mtimeMs < min) continue;
    if (!best || s.mtimeMs > best.mtime) best = { path: p, mtime: s.mtimeMs };
  }
  return best?.path ?? null;
}

async function commandExport(bin: string, format?: string, outDir?: string): Promise<number> {
  const allowed = ["html", "pdf", "pptx", "canva", "url"];
  if (!format || !outDir || !allowed.includes(format)) {
    console.error("usage: DriveClaudeDesign.ts export <html|pdf|pptx|canva|url> <out-dir>");
    return ;
  }
  const tree = await getTree(bin);
  // Export heuristic: target Export by accessible text, then a menu item/button
  // containing the requested format text after the menu opens.
  const exportButton = tree.nodes.find((n) => n.ref && n.role === "button" && /export/i.test(labelOf(n)));
  if (!exportButton?.ref) await dumpMiss(tree.raw);
  let r = await run([bin, "click", exportButton.ref]);
  if (r.code !== ) return r.code;
  await Bun.sleep();
  const menu = await getTree(bin);
  const item = menu.nodes.find((n) => n.ref && /menuitem|button|link/i.test(n.role ?? "") && labelOf(n).toLowerCase().includes(format.toLowerCase()));
  if (!item?.ref) await dumpMiss(menu.raw);
  r = await run([bin, "click", item.ref]);
  if (r.code !== ) return r.code;
  await Bun.sleep();
  const downloaded = await newestDownload();
  if (!downloaded) {
    console.error("No recent download found after export.");
    return ;
  }
  const dir = resolve(outDir);
  await mkdir(dir, { recursive: true });
  const target = join(dir, basename(downloaded));
  await rename(downloaded, target);
  console.log(target);
  return ;
}

async function commandBundle(bin: string, outDir?: string): Promise<number> {
  if (!outDir) {
    console.error("usage: DriveClaudeDesign.ts bundle <out-dir>");
    return ;
  }
  const tree = await getTree(bin);
  // Handoff heuristic: Claude Design has varied handoff copy, so match several
  // public-facing labels and require a clickable ref.
  const handoff = tree.nodes.find((n) => n.ref && /Claude Code|handoff|Send to Claude/i.test(labelOf(n)));
  if (!handoff?.ref) await dumpMiss(tree.raw);
  const clicked = await run([bin, "click", handoff.ref]);
  if (clicked.code !== ) return clicked.code;
  await Bun.sleep();
  const zip = await newestDownload(, /\.zip$/i);
  if (!zip) {
    console.error("No recent handoff ZIP found.");
    return ;
  }
  const dir = resolve(outDir);
  await mkdir(dir, { recursive: true });
  const unzip = await run(["unzip", "-q", zip, "-d", dir]);
  if (unzip.code !== ) {
    console.error(unzip.stderr || "unzip failed");
    return ;
  }
  await rm(zip).catch(() => undefined);
  console.log(dir);
  return ;
}

async function main(): Promise<void> {
  const [verb, ...args] = Bun.argv.slice();
  if (!verb) {
    console.error("usage: DriveClaudeDesign.ts <open|prompt|screenshot|export|bundle> ...");
    return;
  }
  const bin = resolveAgentBrowserBin();
  let code = ;
  if (verb === "open") code = await commandOpen(bin);
  else if (verb === "prompt") code = await commandPrompt(bin, args.join(" "));
  else if (verb === "screenshot") code = await commandScreenshot(bin, args[]);
  else if (verb === "export") code = await commandExport(bin, args[], args[]);
  else if (verb === "bundle") code = await commandBundle(bin, args[]);
  else console.error("usage: DriveClaudeDesign.ts <open|prompt|screenshot|export|bundle> ...");
  process.exit(code);
}

await main();
