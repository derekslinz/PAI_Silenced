# Phase 3: SQLite Cache in MemoryRetriever

## Context Links
- [MemoryRetriever.ts](file:///Users/lderek/GitHub/Personal_AI_Infrastructure/Releases/v5.0.0/.claude/PAI/TOOLS/MemoryRetriever.ts)

## Overview
- **Priority**: High
- **Current Status**: Complete
- **Description**: Replace the $O(N)$ text scanning in `MemoryRetriever.ts` on every query with an incremental SQLite cache database (`knowledge_cache.db`) using Bun's native `bun:sqlite` module.

## Key Insights
- The current implementation reads and parses every markdown file in the knowledge repository on *every* run.
- With an SQLite-backed index, we check `fs.statSync(file).mtimeMs`. If it matches our cached DB record, we skip file I/O and parsing entirely.
- By caching the parsed frontmatter, word count, and body, we retrieve the full index in <5ms.

## Requirements
- Maintain exact compatibility with the BM25-lite scoring, excerpt extraction, and CLI flags of `MemoryRetriever.ts`.
- Cache database must reside in the allowed containment zone `PAI/MEMORY/KNOWLEDGE/`.
- Handle deleted files by pruning missing paths from the database.

## Architecture
- SQLite Table:
  ```sql
  CREATE TABLE IF NOT EXISTS notes (
    filepath TEXT PRIMARY KEY,
    mtime INTEGER,
    title TEXT,
    type TEXT,
    tags TEXT,
    related TEXT,
    body TEXT,
    word_count INTEGER
  );
  ```
- Function `discoverNotes()` is modified to:
  1. Open/initialize the SQLite database.
  2. Scan directories.
  3. Compare file modified times with cached mtimes in DB.
  4. Perform incremental reads/updates for new or changed files.
  5. Delete cached records of removed files.
  6. Return the array of all notes from the database.

## Related Code Files
- `.claude/PAI/TOOLS/MemoryRetriever.ts`

## Implementation Steps
1. Import `bun:sqlite` in `MemoryRetriever.ts`.
2. Write the SQLite cache setup and sync logic.
3. Update `discoverNotes()` to return cached data.
4. Run tests and compare scoring output before and after changes.

## Todo List
- [ ] Implement SQLite indexing in `MemoryRetriever.ts`.
- [ ] Benchmark execution time on empty vs warm cache.
- [ ] Verify search results are identical to original.

## Success Criteria
- Warm cache execution takes <10ms for note discovery.
- Search scores are 100% identical to the original search logic.
