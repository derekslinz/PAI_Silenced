#!/usr/bin/env bun
/**
 * PromptProcessingWorker.ts — Background inference leg for PromptProcessing.hook.ts
 *
 * PURPOSE:
 * Spawned as a detached child process by PromptProcessing.hook.ts immediately after
 * the hook emits its deterministic outputs and exits. Performs the ~1-1.5s Haiku
 * inference call off the critical path, then persists:
 *   • Final session name (session-names.json + work.json + JSONL)
 *   • Updated tab title (state: working)
 *   • Telemetry (prompt-processing.jsonl)
 *
 * INPUT: JSON on stdin (WorkerPayload shape)
 * OUTPUT: none to stdout; progress logged to stderr (captured by Pulse if desired)
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import { inference } from '../PAI/TOOLS/Inference';
import { getIdentity, getPrincipal } from './lib/identity';
import { isValidWorkingTitle, getWorkingFallback, trimToValidTitle } from './lib/output-validators';
import { setTabState } from './lib/tab-setter';
import { paiPath } from './lib/paths';
import { updateSessionNameInWorkJson, upsertSession } from './lib/isa-utils';

// Re-import the shared vocabulary needed for name validation / title derivation.
// These are small pure functions; duplicating the import is the right call over
// making the hook file export dozens of constants.

//  Types

interface WorkerPayload {
  sessionId: string;
  isFirstPrompt: boolean;
  cleanPrompt: string;
  transcriptPath: string;
  prefix: string;
  deterministicTitle: string | null;
  pendingFallbackName: string | null;
}

interface InferenceResult {
  tab_title: string | null;
  session_name: string | null;
  mode: 'MINIMAL' | 'NATIVE' | 'ALGORITHM' | null;
  tier: 1 | 2 | 3 | 4 | 5 | null;
  mode_reason: string | null;
}

type Mode = 'MINIMAL' | 'NATIVE' | 'ALGORITHM';

//  Re-used helpers (kept in sync with hook file)

const SESSION_NAMES_PATH = paiPath('MEMORY', 'STATE', 'session-names.json');
const LOCK_PATH = SESSION_NAMES_PATH + '.lock';
const LOCK_TIMEOUT = 3000;
const LOCK_STALE = 10000;

interface SessionNames { [sessionId: string]: string; }

function acquireLock(): boolean {
  const deadline = Date.now() + LOCK_TIMEOUT;
  while (Date.now() < deadline) {
    try { mkdirSync(LOCK_PATH); return true; }
    catch {
      try {
        const stat = statSync(LOCK_PATH);
        if (Date.now() - stat.mtimeMs > LOCK_STALE) {
          try { rmdirSync(LOCK_PATH); } catch {} continue;
        }
      } catch {}
      Bun.sleepSync(50);
    }
  }
  return false;
}

function releaseLock(): void { try { rmdirSync(LOCK_PATH); } catch {} }

function readSessionNames(): SessionNames {
  try {
    if (existsSync(SESSION_NAMES_PATH)) return JSON.parse(readFileSync(SESSION_NAMES_PATH, 'utf-8'));
  } catch {
    try {
      const bakPath = SESSION_NAMES_PATH + '.bak';
      if (existsSync(bakPath)) return JSON.parse(readFileSync(bakPath, 'utf-8'));
    } catch {}
  }
  return {};
}

function writeSessionNames(names: SessionNames): void {
  const dir = dirname(SESSION_NAMES_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  try {
    if (existsSync(SESSION_NAMES_PATH)) {
      writeFileSync(SESSION_NAMES_PATH + '.bak', readFileSync(SESSION_NAMES_PATH), 'utf-8');
    }
  } catch {}
  const tmpPath = SESSION_NAMES_PATH + '.tmp.' + process.pid;
  writeFileSync(tmpPath, JSON.stringify(names, null, 2), 'utf-8');
  renameSync(tmpPath, SESSION_NAMES_PATH);
}

function disambiguateLabel(sessionId: string, label: string, names: SessionNames): string {
  const isTaken = (candidate: string) =>
    Object.entries(names).some(([id, v]) => id !== sessionId && v === candidate);
  if (!isTaken(label)) return label;
  for (let n = 2; n <= 9; n++) {
    const candidate = `${label} ${n}`;
    if (!isTaken(candidate)) return candidate;
  }
  const shortHash = sessionId.replace(/-/g, '').slice(0, 6);
  return `${label} #${shortHash}`;
}

/** Find Claude Code's session JSONL path for a given session ID. */
function findSessionJsonl(sessionId: string): string | null {
  try {
    for (const dir of [paiPath('projects'), paiPath('Projects')]) {
      if (!existsSync(dir)) continue;
      const r = Bun.spawnSync(['find', dir, '-maxdepth', '2', '-name', `${sessionId}.jsonl`],
        { stdout: 'pipe', stderr: 'pipe', timeout: 2000 });
      const p = r.stdout.toString().trim().split('\n')[0];
      if (p && existsSync(p)) return p;
    }
  } catch {}
  return null;
}

function syncNameToJsonl(sessionId: string, title: string): void {
  const jsonlPath = findSessionJsonl(sessionId);
  if (!jsonlPath) return;
  try {
    appendFileSync(jsonlPath, JSON.stringify({ type: 'custom-title', customTitle: title, sessionId }) + '\n', 'utf-8');
  } catch {}
}

function storeName(sessionId: string, label: string, source: string): void {
  const locked = acquireLock();
  if (!locked) console.error('[PPWorker] Lock timeout — writing anyway');
  let finalLabel = label;
  try {
    const names = readSessionNames();
    finalLabel = disambiguateLabel(sessionId, label, names);
    if (finalLabel !== label) {
      console.error(`[PPWorker] Disambiguated "${label}" → "${finalLabel}"`);
    }
    names[sessionId] = finalLabel;
    writeSessionNames(names);
  } finally {
    if (locked) releaseLock();
  }
  const cacheContent = `cached_session_id='${sessionId}'\ncached_session_label='${finalLabel}'\n`;
  writeFileSync(paiPath('MEMORY', 'STATE', 'session-name-cache.sh'), cacheContent, 'utf-8');
  updateSessionNameInWorkJson(sessionId, finalLabel);
  syncNameToJsonl(sessionId, finalLabel);
  console.error(`[PPWorker] Named session: "${finalLabel}" (${source})`);
}

function appendTelemetry(entry: Record<string, unknown>): void {
  try {
    const logPath = paiPath('MEMORY', 'OBSERVABILITY', 'prompt-processing.jsonl');
    const serialized = JSON.stringify(entry);
    if (serialized.includes('\n')) return;
    appendFileSync(logPath, `${serialized}\n`, 'utf-8');
  } catch {}
}

function titleCase(w: string): string {
  if (w.length >= 2 && w.length <= 8 && /^[A-Z]+$/.test(w)) return w;
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

const ACTION_VERBS = new Set([
  'fix', 'build', 'create', 'deploy', 'debug', 'add', 'remove', 'update',
  'delete', 'refactor', 'migrate', 'implement', 'design', 'test', 'check',
  'review', 'analyze', 'research', 'investigate', 'configure', 'setup',
  'install', 'uninstall', 'restore', 'optimize', 'improve', 'clean',
  'sync', 'push', 'pull', 'merge', 'revert', 'launch', 'stop', 'start',
  'restart', 'monitor', 'diagnose', 'trace', 'profile', 'audit', 'scan',
  'export', 'import', 'generate', 'write', 'read', 'send', 'fetch',
  'search', 'find', 'replace', 'rename', 'move', 'copy', 'list',
  'show', 'hide', 'enable', 'disable', 'upgrade', 'downgrade', 'publish',
  'draft', 'edit', 'rewrite', 'shrink', 'expand', 'reduce', 'bump',
  'extract', 'compile', 'run', 'execute', 'schedule', 'automate',
  'connect', 'disconnect', 'authenticate', 'authorize', 'validate',
  'open', 'close', 'compare', 'evaluate', 'assess', 'explore', 'discover', 'resolve',
  'redesign', 'rebuild', 'rethink', 'modernize', 'simplify', 'consolidate',
]);

const META_VERBS = new Set([
  'pull', 'show', 'see', 'find', 'look', 'list', 'read', 'open',
  'check', 'view', 'display', 'bring', 'give', 'tell', 'help',
  'continue', 'resume', 'recall', 'remember', 'repeat', 'finish',
  'complete', 'redo', 'grab', 'load', 'fetch', 'retrieve', 'access',
]);

const BANNED_SESSION_LEAD = new Set([
  'pull', 'show', 'see', 'look', 'view', 'display', 'bring', 'give', 'tell', 'help',
  'continue', 'resume', 'recall', 'remember', 'repeat', 'finish', 'complete', 'redo',
  'grab', 'load', 'retrieve', 'access', 'list',
]);

const NOISE_WORDS = new Set([
  'the', 'a', 'an', 'i', 'my', 'me', 'we', 'you', 'your', 'it', 'its',
  'this', 'that', 'these', 'those', 'he', 'she', 'they', 'them', 'our',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from', 'by', 'about',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did',
  'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might',
  'have', 'has', 'had', 'just', 'please', 'okay', 'hey', 'hello', 'hi',
  'now', 'also', 'very', 'really', 'actually', 'basically', 'literally',
  'some', 'any', 'all', 'every', 'each', 'not', 'but', 'and', 'or',
  'so', 'if', 'then', 'than', 'like', 'well', 'yeah', 'yes', 'no',
  'here', 'there', 'where', 'when', 'how', 'what', 'which', 'who', 'why',
  'need', 'want', 'going', 'got', 'get', 'getting', 'thing', 'things',
  'stuff', 'way', 'lot', 'bit', 'kind', 'sort', 'feel', 'think', 'know',
  'say', 'said', 'tell', 'told', 'look', 'looking', 'keep', 'keeps',
  'let', 'lets', 'put', 'take', 'took', 'try', 'tried', 'trying',
  'happened', 'happening', 'doing', 'done', 'went', 'gone', 'came',
  'coming', 'made', 'making', 'seems', 'seem', 'seemed', 'works',
  'worked', 'working', 'else', 'still', 'already', 'again', 'back',
  'same', 'different', 'other', 'another', 'much', 'many', 'more',
  'most', 'less', 'last', 'first', 'next', 'new', 'old', 'only',
  'even', 'around', 'before', 'after', 'between', 'through', 'into',
  'don', 'doesn', 'didn', 'won', 'wouldn', 'couldn', 'shouldn',
  'isn', 'aren', 'wasn', 'weren', 'hasn', 'haven', 'hadn', 've', 'll', 're',
  'fuck', 'fucking', 'fucked', 'fucker', 'shit', 'shitty', 'damn', 'damned',
  'ass', 'bitch', 'crap', 'wtf', 'cunt', 'dumb', 'stupid', 'goddamn',
  'hell', 'bastard', 'bullshit',
  'though', 'although', 'however', 'therefore', 'moreover', 'furthermore',
  'unless', 'despite', 'whereas', 'whether', 'nevertheless', 'hence',
  'under', 'over', 'above', 'below', 'within', 'without', 'during',
  'against', 'upon', 'toward', 'towards', 'along', 'across', 'behind',
  'beside', 'beneath', 'among', 'throughout', 'beyond', 'except',
]);

const PROFANITY_WORDS = new Set([
  'fuck', 'fucking', 'fucked', 'fucker', 'shit', 'shitty', 'damn', 'damned',
  'ass', 'bitch', 'crap', 'wtf', 'cunt', 'dumb', 'stupid', 'goddamn',
  'hell', 'bastard', 'bullshit',
]);

function isValidSessionName(name: string): boolean {
  const words = name.split(/\s+/).filter(w => w.length > 0);
  if (words.length !== 5) return false;
  if (/[,;:/\\]/.test(name)) return false;
  const first = words[0].toLowerCase();
  if (!ACTION_VERBS.has(first) || BANNED_SESSION_LEAD.has(first)) return false;
  for (let i = 1; i < words.length; i++) {
    if (/^[A-Z]{2,8}$/.test(words[i])) continue;
    if (NOISE_WORDS.has(words[i].toLowerCase())) return false;
  }
  return true;
}

function toGerund(verb: string): string {
  const v = verb.toLowerCase();
  if (v.endsWith('ing')) return v;
  if (v.endsWith('ie')) return v.slice(0, -2) + 'ying';
  if (v.endsWith('e') && !v.endsWith('ee') && !v.endsWith('ye')) return v.slice(0, -1) + 'ing';
  if (/^[a-z]+[bcdfghlmnprstvwz]$/.test(v) && v.length <= 5
      && 'aeiou'.includes(v[v.length - 2])) return v + v.slice(-1) + 'ing';
  return v + 'ing';
}

function sessionNameToTabTitle(name: string): string | null {
  const words = name.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 2) return null;
  const first = words[0].toLowerCase();
  if (!ACTION_VERBS.has(first) && !META_VERBS.has(first)) return null;
  const gerund = toGerund(first);
  const cap = gerund.charAt(0).toUpperCase() + gerund.slice(1);
  const titleWords = [cap, ...words.slice(1, 4)];
  return trimToValidTitle(titleWords, isValidWorkingTitle);
}

function getRecentContext(transcriptPath: string, maxTurns: number = 6, includeAssistant: boolean = false): string {
  try {
    if (!transcriptPath || !existsSync(transcriptPath)) return '';
    const content = readFileSync(transcriptPath, 'utf-8');
    const lines = content.trim().split('\n');
    const turns: { role: string; text: string }[] = [];
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'user' && entry.message?.content) {
          let text = '';
          if (typeof entry.message.content === 'string') text = entry.message.content;
          else if (Array.isArray(entry.message.content))
            text = entry.message.content.filter((c: any) => c.type === 'text').map((c: any) => c.text).join(' ');
          if (text.trim()) turns.push({ role: 'User', text: text.slice(0, 200) });
        }
        if (includeAssistant && entry.type === 'assistant' && entry.message?.content) {
          const text = typeof entry.message.content === 'string'
            ? entry.message.content
            : Array.isArray(entry.message.content)
              ? entry.message.content.filter((c: any) => c.type === 'text').map((c: any) => c.text).join(' ')
              : '';
          if (text) {
            const summaryMatch = text.match(/SUMMARY:\s*([^\n]+)/i);
            turns.push({ role: 'Assistant', text: summaryMatch ? summaryMatch[1] : text.slice(0, 150) });
          }
        }
      } catch {}
    }
    const recent = turns.slice(-maxTurns);
    return recent.length > 0 ? recent.map(t => `${t.role}: ${t.text}`).join('\n') : '';
  } catch { return ''; }
}

//  Prompt builder (same as hook — kept in sync)

const PRINCIPAL_NAME = getPrincipal().name;
const ASSISTANT_NAME = getIdentity().name;

function buildContextPrompt(includeSessionName: boolean): string {
  return `You analyze user messages to extract what WORK is being done. ${PRINCIPAL_NAME} is the only user. The AI assistant is ${ASSISTANT_NAME}.

## TASK 1: TAB TITLE
Create a 2-4 word gerund phrase describing what WORK is being done — the project/feature/system being worked on, NOT how the user asked.
Rules: Start with gerund (-ing verb), include the specific subject/project, end with period, max 4 words.
CRITICAL: Extract the SUBJECT of the work, not the user's instruction. "Pull up the PAI TUI" → "Building PAI TUI." (the work), NOT "Pulling up work." (the instruction).
GOOD: "Fixing auth bug.", "Building PAI dashboard.", "Debugging feed system.", "Researching pet stores."
BAD: "Pulling up work.", "Completing the task.", "Showing session data.", "Working on it.", "Whering are pet."
QUESTIONS: If the message is a question (Where/What/How/Why/When), use "Researching [subject]." — e.g., "Where are pet stores?" → "Researching pet stores."
${includeSessionName ? `
## TASK 2: SESSION NAME
The session name is a HANDLE. ${PRINCIPAL_NAME} should be able to scan it in a task list weeks from now and instantly recognize: "this is the session where I {goal}." It must answer three nested questions in one 5-word phrase:
  (1) What is the prompt about? (the topic surface)
  (2) What is the session for? (the work being done)
  (3) What is the goal? (the outcome ${PRINCIPAL_NAME} wants)

If the name doesn't answer all three, it's a keyword label and it's wrong. Re-read the prompt and find the goal.

THINK FIRST: What is ${PRINCIPAL_NAME} actually trying to ACCOMPLISH? Not what words appear, not how he asked, not what surface tokens are present — what is the GOAL?
- Words appearing in the prompt are EVIDENCE, not the answer. The goal lives in ${PRINCIPAL_NAME}'s actual question or instruction.
- Ignore HOW they asked (pull up, show me, continue with, look at, hey, thanks) — those are interaction tokens, not work.
- Focus on the GOAL (what outcome is being pursued: a decision, a fix, a build, a piece of research, an evaluation).
- The name should be a complete imperative phrase. Read it aloud — it should sound like "${PRINCIPAL_NAME} needs to ___" filled in coherently.
- **Pasted content rule:** If the user pastes an email, letter, message, quote, document, or any block of text that someone ELSE wrote, the GOAL is ${PRINCIPAL_NAME}'s question or instruction WRAPPED AROUND that content. Find ${PRINCIPAL_NAME}'s actual question and name the session from THAT.
- **Decision rule:** If the prompt is "Should I X or Y?" or "Is 20% fair?" the goal is a DECISION. Name it: "Decide [Subject] [Aspect]" or "Evaluate [Subject] [Aspect]".
- **Question rule:** If the prompt is "What is X?" / "How does X work?" the goal is RESEARCH. Name it: "Research [Subject] [Aspect]".
- **Build rule:** If the prompt is "Build/Fix/Refactor X" the goal is BUILD. Name it: "[Verb] [Subject] [Aspect]".

Structure: [Base-form Verb] [Modifier or Project] [Subject] [Modifier] [Object/Aspect]
Rules:
- Exactly 5 words. Not 4, not 6. Five.
- Title Case. No articles (a/an/the). No commas, hyphens, slashes, or other punctuation inside the name.
- Start with a base-form action verb (Fix, Build, Debug, Refactor, Migrate, Research, Analyze — NOT Fixing, Building).
- Preserve acronyms in ALL CAPS (PAI, TUI, API, UL, CLI, ISC, ISA, BPE).
- Every word must carry meaning. No filler adverbs, no lone conjunctions, no fragment scraps.
- Reads as a grammatical phrase.

GOOD: "Fix Session Naming Word Count", "Build PAI TUI Dataviz Module", "Deploy Git Server Update Hook", "Research South Bay Pet Stores"
BAD: "Fix" (one word), "Make Sure" (two words), "Analyze ISD ISC BPE" (four words), "Pull Work See Continue Now" (instruction words)` : ''}

## TASK 3: MODE + TIER CLASSIFICATION
Classify the prompt into a response mode for ${ASSISTANT_NAME}.

Mode rules:
- MINIMAL: greetings, ratings, single-token acknowledgments ("ok", "thanks", "8/10", "sounds good") — UNLESS context shows the prompt is approving a multi-step plan from prior turns.
- NATIVE: a single fact lookup, a single-line edit on a named file, or one command run — AND no new artifact is created — AND no multi-step plan is required.
- ALGORITHM: everything else. Always pick ALGORITHM for: any build/create/make/implement/design/develop/scaffold/prototype/architect/refactor/migrate/integrate request, anything touching multiple files, anything ambiguous in scope, anything affecting doctrine / system-prompt / hooks / CLAUDE.md / Algorithm / ISA, anything spanning multiple projects, anything that requires investigation or audit.

Tier (only when mode is ALGORITHM; null otherwise):
- 1 Standard: trivial single-file work that creates something new (~<90s).
- 2 Extended: single-domain task spanning a few files, quality must be extraordinary (~3min).
- 3 Advanced: substantial multi-file work, multi-step plan, root-cause investigation (~10min).
- 4 Deep: cross-cutting design, doctrine changes, architecture changes, cross-vendor audit needed (~30min).
- 5 Comprehensive: research / build with no time pressure (>2h).

Bias: when in doubt between NATIVE and ALGORITHM-1, pick ALGORITHM-1. When in doubt between two ALGORITHM tiers, pick the higher one.

OUTPUT FORMAT (JSON only, single object on one line, no prose, no markdown):
{
  "tab_title": "<2-4 word gerund sentence ending with period>",${includeSessionName ? `
  "session_name": "<exactly 5 words in Title Case, grammatical task phrase>",` : ''}
  "mode": "MINIMAL" | "NATIVE" | "ALGORITHM",
  "tier": 1 | 2 | 3 | 4 | 5 | null,
  "mode_reason": "<one short sentence>"
}`;
}

//  Main worker logic

async function main() {
  const inferenceStart = Date.now();
  let payload: WorkerPayload;
  try {
    const raw = await new Promise<string>((resolve, reject) => {
      let data = '';
      process.stdin.on('data', chunk => { data += chunk.toString(); });
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
    payload = JSON.parse(raw);
  } catch (err) {
    console.error(`[PPWorker] Failed to parse payload: ${err}`);
    process.exit(1);
  }

  const { sessionId, isFirstPrompt, cleanPrompt, transcriptPath, prefix, deterministicTitle, pendingFallbackName } = payload;

  console.error('[PPWorker] Running inference (tab title' + (isFirstPrompt ? ' + session name)...' : ')...'));

  const context = getRecentContext(transcriptPath, 6, !isFirstPrompt);
  const userPrompt = context ? `CONTEXT:\n${context}\n\nCURRENT MESSAGE:\n${cleanPrompt}` : cleanPrompt;

  try {
    const result = await inference({
      systemPrompt: buildContextPrompt(isFirstPrompt),
      userPrompt,
      expectJson: true,
      timeout: 25000,
      level: 'standard',
    });

    if (result.success && result.parsed) {
      const r = result.parsed as InferenceResult;

      //  Update tab title with inference result
      let finalTitle = deterministicTitle && isValidWorkingTitle(deterministicTitle) ? deterministicTitle : getWorkingFallback();
      if (r.tab_title) {
        const inferredWords = r.tab_title.split(/\s+/);
        const validated = trimToValidTitle(inferredWords, isValidWorkingTitle);
        if (validated) finalTitle = validated;
      }
      if (isFirstPrompt && r.session_name && !/[*`<>{}[\]]/.test(r.session_name)) {
        const derived = sessionNameToTabTitle(r.session_name);
        if (derived) finalTitle = derived;
      }
      setTabState({ title: ` ${prefix}${finalTitle}`, state: 'working', sessionId });

      //  Persist session name (first prompt only)
      let inferenceNameStored = false;
      if (isFirstPrompt && r.session_name) {
        if (/[*`<>{}[\]]/.test(r.session_name)) {
          console.error('[PPWorker] Rejected session name with artifacts');
        } else {
          const nameWords = r.session_name.trim().split(/\s+/).slice(0, 5);
          const label = nameWords.map(w => titleCase(w)).join(' ');
          const hasProfanity = nameWords.some(w => PROFANITY_WORDS.has(w.toLowerCase()));
          if (label && nameWords.length >= 5 && nameWords.every(w => w.length >= 2) && !hasProfanity && isValidSessionName(label)) {
            storeName(sessionId, label, 'inference-haiku');
            inferenceNameStored = true;
          } else if (label) {
            console.error(`[PPWorker] Rejected invalid session name: "${label}"`);
          }
        }
      }
      if (isFirstPrompt && !inferenceNameStored && pendingFallbackName) {
        storeName(sessionId, pendingFallbackName, 'deterministic-fallback');
      }

      //  Telemetry
      const validModes: Mode[] = ['MINIMAL', 'NATIVE', 'ALGORITHM'];
      const finalMode: Mode = (r.mode && validModes.includes(r.mode as Mode)) ? (r.mode as Mode) : 'ALGORITHM';
      const finalTier: number | null = (finalMode === 'ALGORITHM')
        ? (typeof r.tier === 'number' && r.tier >= 1 && r.tier <= 5 ? r.tier : 3)
        : null;
      const finalReason: string = (typeof r.mode_reason === 'string' && r.mode_reason.length > 0)
        ? r.mode_reason.slice(0, 200)
        : 'classifier';
      appendTelemetry({
        timestamp: new Date().toISOString(),
        session_id: sessionId,
        prompt_excerpt: cleanPrompt.slice(0, 120),
        tab_title: r.tab_title ?? null,
        session_name: isFirstPrompt ? (r.session_name ?? null) : null,
        mode: finalMode,
        tier: finalTier,
        mode_reason: finalReason,
        source: 'classifier-background',
        latency_ms: Date.now() - inferenceStart,
      });
      console.error(`[PPWorker] Done — mode=${finalMode} tier=${finalTier} latency=${Date.now() - inferenceStart}ms`);

    } else {
      console.error(`[PPWorker] Inference failed: ${result.error}`);
      if (isFirstPrompt && pendingFallbackName) {
        storeName(sessionId, pendingFallbackName, 'deterministic-fallback');
      }
      const fallbackTitle = deterministicTitle && isValidWorkingTitle(deterministicTitle) ? deterministicTitle : getWorkingFallback();
      setTabState({ title: ` ${prefix}${fallbackTitle}`, state: 'working', sessionId });
      appendTelemetry({
        timestamp: new Date().toISOString(), session_id: sessionId,
        prompt_excerpt: cleanPrompt.slice(0, 120), mode: 'ALGORITHM', tier: 3,
        mode_reason: `inference failed: ${result.error ?? 'unknown'}`,
        source: 'fail-safe-background', latency_ms: Date.now() - inferenceStart,
      });
    }
  } catch (err) {
    console.error(`[PPWorker] Inference error: ${err}`);
    if (isFirstPrompt && pendingFallbackName) {
      storeName(sessionId, pendingFallbackName, 'deterministic-fallback');
    }
    const fallbackTitle = deterministicTitle && isValidWorkingTitle(deterministicTitle) ? deterministicTitle : getWorkingFallback();
    setTabState({ title: ` ${prefix}${fallbackTitle}`, state: 'working', sessionId });
    appendTelemetry({
      timestamp: new Date().toISOString(), session_id: sessionId,
      prompt_excerpt: cleanPrompt.slice(0, 120), mode: 'ALGORITHM', tier: 3,
      mode_reason: `inference error: ${String(err).slice(0, 80)}`,
      source: 'fail-safe-background', latency_ms: Date.now() - inferenceStart,
    });
  }

  process.exit(0);
}

main();
