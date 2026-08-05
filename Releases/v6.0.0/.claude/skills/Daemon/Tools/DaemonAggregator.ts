#/usr/bin/env bun

/ DaemonAggregator — Reads PAI system data sources and produces
 a security-filtered daemon.md update.
  This tool aggregates from Knowledge, Projects, and Work sessions,
 applies the SecurityFilter, and outputs either a daemon.md file or
 a structured JSON diff for preview.
  Usage:
   bun DaemonAggregator.ts --output <daemon.md>          Write updated daemon.md
   bun DaemonAggregator.ts --preview                     Show what would change
   bun DaemonAggregator.ts --json                        Output as JSON (for pipeline)
   bun DaemonAggregator.ts --diff <current-daemon.md>    Show diff against current
 /

import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { filterContent, filterDaemonData, loadSecurityOverrides } from "./SecurityFilter.ts";

//  Path Resolution 

const HOME = process.env.HOME || process.env.USERPROFILE || "";
const PAI_DIR = process.env.PAI_DIR || join(HOME, ".claude", "PAI");
const USER_DIR = join(PAI_DIR, "USER");
const MEMORY_DIR = join(PAI_DIR, "MEMORY");
const KNOWLEDGE_DIR = join(MEMORY_DIR, "KNOWLEDGE");
const WORK_DIR = join(MEMORY_DIR, "WORK");
const PROJECTS_FILE = join(USER_DIR, "PROJECTS", "PROJECTS.md");
const IDENTITY_FILE = join(USER_DIR, "PRINCIPAL_IDENTITY.md");
const CUSTOMIZATIONS_DIR = join(USER_DIR, "SKILLCUSTOMIZATIONS", "Daemon");
const USER_DAEMON_DIR = join(USER_DIR, "Daemon");

//  Structurally Excluded Paths (NEVER read these) 

const EXCLUDED_PATHS = [
  join(USER_DIR, "CONTACTS.md"),
  join(USER_DIR, "FINANCES"),
  join(USER_DIR, "HEALTH"),
  join(USER_DIR, "BUSINESS"),
  join(USER_DIR, "OUR_STORY.md"),
  join(USER_DIR, "OPINIONS.md"),
  join(KNOWLEDGE_DIR, "People"),
  join(KNOWLEDGE_DIR, "Companies"),
];

function isExcluded(filePath: string): boolean {
  const resolved = resolve(filePath);
  return EXCLUDED_PATHS.some((excluded) => resolved.startsWith(resolve(excluded)));
}

//  Public Projects List 

const PUBLIC_PROJECTS = [
  "Website", "Fabric", "SecLists", "PAI", "Surface",
  "Human .", "UL Site", "Daemon", "Substrate",
  "TheAlgorithm", "FoundryServices", "Ladder", "PAI Marketing",
];

//  Source Readers 

function readFileIfExists(path: string): string | null {
  if (isExcluded(path)) return null;
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-");
}

function readRecentIdeas(limit = ): Array<{ title: string; thesis: string }> {
  const indexPath = join(KNOWLEDGE_DIR, "Ideas", "_index.md");
  const content = readFileIfExists(indexPath);
  if (!content) return [];

  // Extract recently updated ideas from the index
  const recentSection = content.match(/Recently Updated\n([\s\S]?)(?=\n|$)/);
  if (!recentSection) return [];

  const ideaSlugs = recentSection[]
    .split("\n")
    .filter((l) => l.match(/^\s-\s+\[\[/))
    .slice(, limit)
    .map((l) => {
      const slugMatch = l.match(/\[\[([^\]]+)\]\]/);
      const titleMatch = l.match(/"([^"]+)"/);
      return {
        slug: slugMatch?.[] || "",
        title: titleMatch?.[] || "",
      };
    })
    .filter((i) => i.slug && i.title);

  const ideas: Array<{ title: string; thesis: string }> = [];

  for (const { slug, title } of ideaSlugs) {
    const ideaPath = join(KNOWLEDGE_DIR, "Ideas", `${slug}.md`);
    const ideaContent = readFileIfExists(ideaPath);
    if (!ideaContent) {
      ideas.push({ title, thesis: "" });
      continue;
    }

    // Extract thesis section (first paragraph after Thesis)
    const thesisMatch = ideaContent.match(/Thesis\s\n([\s\S]?)(?=\n|$)/);
    const thesis = thesisMatch
      ? thesisMatch[].trim().split("\n")[].trim() // First line only
      : "";

    // Skip ideas that reference internal PAI architecture
    if (
      thesis.match(/PAI\/|hooks\/|MEMORY\/|Algorithm\/|\.hook\.ts/i) ||
      title.match(/^(PAI|Hook|Pulse|Algorithm)\b/i)
    ) {
      continue;
    }

    ideas.push({ title, thesis });
  }

  return ideas;
}

function readPublicProjects(): { technical: string[]; creative: string[]; personal: string[] } {
  const content = readFileIfExists(PROJECTS_FILE);
  if (!content) return { technical: [], creative: [], personal: [] };

  const technical: string[] = [];
  const creative: string[] = [];

  // Parse the projects table
  const lines = content.split("\n");
  for (const line of lines) {
    if (!line.startsWith("|")) continue;
    if (line.includes("---")) continue;
    if (line.includes("Project")) continue;

    // Extract project name
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < ) continue;

    const name = cells[].replace(/\\/g, "").trim();

    if (PUBLIC_PROJECTS.includes(name)) {
      const url = cells[] || "";
      if (url.includes("github.com")) {
        technical.push(`${name} — ${url}`);
      } else if (url) {
        creative.push(`${name} — ${url}`);
      } else {
        technical.push(name);
      }
    }
  }

  return { technical, creative, personal: [] };
}

function readWorkThemes(daysBack = , limit = ): string[] {
  if (!existsSync(WORK_DIR)) return [];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);

  const themes = new Map<string, number>();

  try {
    const dirs = readdirSync(WORK_DIR)
      .filter((d) => d.match(/^\d{}-/))
      .sort()
      .reverse()
      .slice(, ); // Check last sessions max

    for (const dir of dirs) {
      // Extract date from dir name (YYYYMMDD-HHMMSS_description)
      const dateStr = dir.slice(, );
      const year = parseInt(dateStr.slice(, ));
      const month = parseInt(dateStr.slice(, )) - ;
      const day = parseInt(dateStr.slice(, ));
      const dirDate = new Date(year, month, day);

      if (dirDate < cutoff) continue;

      // Extract theme from directory name (after the timestamp_)
      const descPart = dir.replace(/^\d{}-\d{}_/, "");
      if (!descPart) continue;

      // Generalize the theme (remove specific details)
      const theme = generalizeTheme(descPart);
      if (theme) {
        themes.set(theme, (themes.get(theme) || ) + );
      }
    }
  } catch {
    return [];
  }

  // Sort by frequency, return top N
  return Array.from(themes.entries())
    .sort((a, b) => b[] - a[])
    .slice(, limit)
    .map(([theme]) => theme);
}

function generalizeTheme(slug: string): string | null {
  // Convert kebab-case slug to human-readable theme
  const words = slug.replace(/-/g, " ").toLowerCase();

  // Map specific patterns to general themes
  const themeMap: Array<[RegExp, string]> = [
    [/blog|post|writing|draft/, "Writing and content creation"],
    [/security|vuln|pentest|recon/, "Security research and assessment"],
    [/ai|llm|model|prompt/, "AI systems and development"],
    [/deploy|build|ship|release/, "Building and shipping software"],
    [/design|ui|ux|frontend/, "Design and user experience"],
    [/research|investigate|analysis/, "Research and analysis"],
    [/feed|surface|news/, "Content curation and intelligence"],
    [/pai|algorithm|skill|hook/, null], // Internal — exclude
    [/fix|bug|debug|error/, "Debugging and problem-solving"],
    [/newsletter|email|broadcast/, "Newsletter and communications"],
    [/goal|mission/, "Purpose and goal development"],
  ];

  for (const [pattern, theme] of themeMap) {
    if (words.match(pattern)) return theme;
  }

  // If no pattern matches, create a generic theme from the first meaningful words
  const meaningful = words
    .split(" ")
    .filter((w) => w.length > && !["this", "that", "with", "from", "into"].includes(w))
    .slice(, );

  if (meaningful.length >= ) {
    return meaningful.join(" ").replace(/^\w/, (c) => c.toUpperCase());
  }

  return null;
}

function readAbout(): string {
  const content = readFileIfExists(IDENTITY_FILE);
  if (!content) return "";

  // Extract key public information
  const lines = content.split("\n");
  const parts: string[] = [];

  for (const line of lines) {
    if (line.includes("Name:")) {
      continue; // Skip, we'll compose our own
    }
    if (line.includes("Focus:")) {
      const focus = line.replace(/.Focus:\?\?\s/, "").trim();
      parts.push(focus);
    }
    if (line.includes("Online Since:")) {
      const since = line.replace(/.Online Since:\?\?\s/, "").trim();
      parts.push(`Online since ${since}`);
    }
  }

  return parts.join(". ");
}

function readPreferences(): string[] {
  // Read from existing daemon data if available
  const existingDaemon = readExistingDaemon();
  if (existingDaemon.preferences) {
    return typeof existingDaemon.preferences === "string"
      ? existingDaemon.preferences.split("\n").filter(Boolean)
      : (existingDaemon.preferences as string[]);
  }
  return [];
}

function readExistingDaemon(): Record<string, unknown> {
  const daemonPath = join(USER_DAEMON_DIR, "daemon.md");
  if (!existsSync(daemonPath)) {
    // Fall back to old location
    const oldPath = join(HOME, ".claude", "skills", "_DAEMON", "Mcp", "daemon.md");
    if (!existsSync(oldPath)) return {};
    return parseDaemonMd(readFileSync(oldPath, "utf-"));
  }
  return parseDaemonMd(readFileSync(daemonPath, "utf-"));
}

function parseDaemonMd(content: string): Record<string, unknown> {
  const sections: Record<string, string> = {};
  let currentSection: string | null = null;
  let sectionContent: string[] = [];

  for (const line of content.split("\n")) {
    const sectionMatch = line.match(/^\[([A-Z_]+)\]$/);
    if (sectionMatch) {
      if (currentSection) {
        sections[currentSection] = sectionContent.join("\n").trim();
      }
      currentSection = sectionMatch[].toLowerCase();
      sectionContent = [];
    } else if (currentSection && line.trim() && !line.startsWith("")) {
      sectionContent.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = sectionContent.join("\n").trim();
  }

  return sections;
}

//  Aggregation 

interface DaemonUpdate {
  about: string;
  mission: string;
  current_location: string;
  favorite_books: string[];
  favorite_movies: string[];
  predictions: string[];
  preferences: string[];
  daily_routine: string[];
  favorite_podcasts: string[];
  recent_ideas: Array<{ title: string; thesis: string }>;
  projects: { technical: string[]; creative: string[]; personal: string[] };
  work_themes: string[];
  wisdom: string[];
  last_updated: string;
}

export function aggregate(): DaemonUpdate {
  const existing = readExistingDaemon();

  // About: always prefer existing hand-written bio over auto-generated
  const about = (existing.about as string) || readAbout() || "";
  const recentIdeas = readRecentIdeas();
  const projects = readPublicProjects();
  const workThemes = readWorkThemes(, );

  // Preserve existing sections that we don't have PAI sources for
  const predictions = existing.predictions
    ? (typeof existing.predictions === "string"
        ? existing.predictions.split("\n").filter(Boolean).map((l: string) => l.replace(/^[-]\s+/, ""))
        : (existing.predictions as string[]))
    : [];

  const preferences = readPreferences();

  const dailyRoutine = existing.daily_routine
    ? (typeof existing.daily_routine === "string"
        ? existing.daily_routine.split("\n").filter(Boolean).map((l: string) => l.replace(/^[-]\s+/, ""))
        : (existing.daily_routine as string[]))
    : [];

  const podcasts = existing.favorite_podcasts
    ? (typeof existing.favorite_podcasts === "string"
        ? existing.favorite_podcasts.split("\n").filter(Boolean).map((l: string) => l.replace(/^[-]\s+/, ""))
        : (existing.favorite_podcasts as string[]))
    : [];

  // Merge: PAI source books + existing daemon books (deduplicated)
  const existingBooks = existing.favorite_books
    ? (typeof existing.favorite_books === "string"
        ? existing.favorite_books.split("\n").filter(Boolean).map((l: string) => l.replace(/^[-]\s+/, "").replace(/^"(.+)".$/, "$"))
        : (existing.favorite_books as string[]))
    : [];
  const mergedBooks = [...new Set([...books, ...existingBooks])];

  // Merge movies similarly
  const existingMovies = existing.favorite_movies
    ? (typeof existing.favorite_movies === "string"
        ? existing.favorite_movies.split("\n").filter(Boolean).map((l: string) => l.replace(/^[-]\s+/, ""))
        : (existing.favorite_movies as string[]))
    : [];
  const mergedMovies = [...new Set([...movies, ...existingMovies])];

  return {
    about,
    current_location: (existing.current_location as string) || "San Francisco Bay Area",
    favorite_books: mergedBooks,
    favorite_movies: mergedMovies,
    predictions,
    preferences,
    daily_routine: dailyRoutine,
    favorite_podcasts: podcasts,
    recent_ideas: recentIdeas,
    projects,
    work_themes: workThemes,
    wisdom: wisdom.slice(, ), // Top quotes
    last_updated: new Date().toISOString(),
  };
}

//  Output Formatters 

function toDaemonMd(data: DaemonUpdate): string {
  const sections: string[] = [
    "DAEMON DATA FILE",
    "",
    "This file contains personal information for the daemon profile",
    "Format: Section headers are marked with [SECTION_NAME]",
    "Auto-generated by DaemonAggregator from PAI sources",
    "",
  ];

  sections.push("[ABOUT]", "", data.about, "");
  sections.push("[CURRENT_LOCATION]", "", data.current_location, "");
  sections.push("[MISSION]", "", data.mission, "");

  sections.push("[FAVORITE_BOOKS]", "");
  for (const book of data.favorite_books) {
    sections.push(`- ${book}`);
  }
  sections.push("");

  sections.push("[FAVORITE_MOVIES]", "");
  for (const movie of data.favorite_movies) {
    sections.push(`- ${movie}`);
  }
  sections.push("");

  if (data.daily_routine.length > ) {
    sections.push("[DAILY_ROUTINE]", "");
    for (const item of data.daily_routine) {
      sections.push(`- ${item}`);
    }
    sections.push("");
  }

  if (data.preferences.length > ) {
    sections.push("[PREFERENCES]", "");
    for (const pref of data.preferences) {
      sections.push(`- ${pref}`);
    }
    sections.push("");
  }

  if (data.favorite_podcasts.length > ) {
    sections.push("[FAVORITE_PODCASTS]", "");
    for (const pod of data.favorite_podcasts) {
      sections.push(`- ${pod}`);
    }
    sections.push("");
  }

  if (data.predictions.length > ) {
    sections.push("[PREDICTIONS]", "");
    for (const pred of data.predictions) {
      sections.push(`- ${pred}`);
    }
    sections.push("");
  }

  if (data.recent_ideas.length > ) {
    sections.push("[RECENT_IDEAS]", "");
    for (const idea of data.recent_ideas) {
      const line = idea.thesis ? `- ${idea.title}: ${idea.thesis}` : `- ${idea.title}`;
      sections.push(line);
    }
    sections.push("");
  }

  if (data.work_themes.length > ) {
    sections.push("[CURRENTLY_WORKING_ON]", "");
    for (const theme of data.work_themes) {
      sections.push(`- ${theme}`);
    }
    sections.push("");
  }

  if (data.wisdom.length > ) {
    sections.push("[WISDOM]", "");
    for (const quote of data.wisdom) {
      sections.push(`- ${quote}`);
    }
    sections.push("");
  }

  sections.push("Note: PROJECTS are pulled dynamically");
  sections.push("");

  return sections.join("\n");
}

//  CLI 

if (import.meta.main) {
  const args = process.argv.slice();

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
DaemonAggregator — Aggregate PAI data into daemon.md

Usage:
  bun DaemonAggregator.ts --output <path>    Write daemon.md to path
  bun DaemonAggregator.ts --preview          Show aggregated content (no write)
  bun DaemonAggregator.ts --json             Output as JSON
  bun DaemonAggregator.ts --diff <current>   Show diff against current daemon.md
  bun DaemonAggregator.ts --sources          List data sources and their status

Options:
  --filter          Apply SecurityFilter to output (default: on)
  --no-filter       Skip SecurityFilter (for debugging only)
  --verbose         Show aggregation details
`);
    process.exit();
  }

  // Load security overrides if available
  const overridesPath = join(CUSTOMIZATIONS_DIR, "SecurityOverrides.md");
  const overrides = loadSecurityOverrides(overridesPath);

  if (args.includes("--sources")) {
    console.log("Data Source Status:\n");
    const sources = [
      { name: "KNOWLEDGE/Ideas/_index.md", path: join(KNOWLEDGE_DIR, "Ideas", "_index.md") },
      { name: "PROJECTS.md", path: PROJECTS_FILE },
      { name: "PRINCIPAL_IDENTITY.md", path: IDENTITY_FILE },
      { name: "WORK/ (sessions)", path: WORK_DIR },
      { name: "User daemon.md", path: join(USER_DAEMON_DIR, "daemon.md") },
    ];

    for (const s of sources) {
      const exists = existsSync(s.path);
      const excluded = isExcluded(s.path);
      const status = excluded ? "EXCLUDED" : exists ? "OK" : "MISSING";
      const icon = excluded ? "X" : exists ? "+" : "-";
      console.log(`  [${icon}] ${s.name}: ${status}`);
    }
    process.exit();
  }

  console.log("Aggregating PAI data sources...\n");
  const data = aggregate();

  // Apply security filter unless --no-filter
  const skipFilter = args.includes("--no-filter");
  let daemonMd = toDaemonMd(data);

  if (!skipFilter) {
    const result = filterContent(daemonMd, overrides);
    daemonMd = result.clean;

    if (result.redactions.length > ) {
      console.log(`Security filter applied: ${result.redactions.length} redactions`);
      if (args.includes("--verbose")) {
        for (const r of result.redactions) {
          console.log(`  [${r.type}] "${r.original}"`);
        }
      }
    } else {
      console.log("Security filter applied: clean (no redactions needed)");
    }
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(data, null, ));
    process.exit();
  }

  if (args.includes("--preview")) {
    console.log("\n--- PREVIEW ---\n");
    console.log(daemonMd);
    console.log("\n--- END PREVIEW ---");

    // Summary
    console.log("\nSections populated:");
    console.log(`  Books: ${data.favorite_books.length}`);
    console.log(`  Movies: ${data.favorite_movies.length}`);
    console.log(`  Ideas: ${data.recent_ideas.length}`);
    console.log(`  Work themes: ${data.work_themes.length}`);
    console.log(`  Wisdom: ${data.wisdom.length}`);
    console.log(`  Predictions: ${data.predictions.length}`);
    process.exit();
  }

  const diffIdx = args.indexOf("--diff");
  if (diffIdx !== -&& args[diffIdx + ]) {
    const currentPath = args[diffIdx + ];
    if (existsSync(currentPath)) {
      const current = readFileSync(currentPath, "utf-");
      // Simple line-by-line diff summary
      const currentLines = new Set(current.split("\n").map((l) => l.trim()).filter(Boolean));
      const newLines = new Set(daemonMd.split("\n").map((l) => l.trim()).filter(Boolean));

      const added = [...newLines].filter((l) => !currentLines.has(l));
      const removed = [...currentLines].filter((l) => !newLines.has(l));

      console.log(`\nDiff Summary:`);
      console.log(`  Added: ${added.length} lines`);
      console.log(`  Removed: ${removed.length} lines`);

      if (added.length > ) {
        console.log("\n+ Added:");
        for (const line of added.slice(, )) {
          console.log(`  + ${line}`);
        }
        if (added.length > ) console.log(`  ... and ${added.length - } more`);
      }

      if (removed.length > ) {
        console.log("\n- Removed:");
        for (const line of removed.slice(, )) {
          console.log(`  - ${line}`);
        }
        if (removed.length > ) console.log(`  ... and ${removed.length - } more`);
      }
    } else {
      console.log(`Current file not found: ${currentPath}`);
    }
    process.exit();
  }

  const outputIdx = args.indexOf("--output");
  if (outputIdx !== -&& args[outputIdx + ]) {
    const outputPath = args[outputIdx + ];
    writeFileSync(outputPath, daemonMd);
    console.log(`\nWrote daemon.md to: ${outputPath}`);
    console.log(`Size: ${daemonMd.length} bytes`);
    process.exit();
  }

  // Default: preview mode
  console.log(daemonMd);
}
