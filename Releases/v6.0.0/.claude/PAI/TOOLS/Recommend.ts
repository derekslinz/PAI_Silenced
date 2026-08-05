#!/usr/bin/env bun

/**
 * Recommend — recency-aware picker for restaurants, movies, books.
 *
 * NOTE: The Telos life-OS system has been removed. This tool previously read
 * preference files from USER/TELOS/ (RESTAURANTS.md, MOVIES.md, BOOKS.md) to
 * make recommendations. That directory no longer exists, so the recommendation
 * source is unavailable. This tool is now a minimal stub that reports the
 * source is no longer available.
 *
 * Usage:
 *   bun Recommend.ts [--category restaurant|movie|book] [--json]
 */

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");

const message =
  "Recommendation source no longer available: the Telos life-OS system (USER/TELOS/) has been removed. " +
  "Restaurant, movie, and book preferences were previously read from USER/TELOS/RESTAURANTS.md, " +
  "USER/TELOS/MOVIES.md, and USER/TELOS/BOOKS.md, which no longer exist.";

if (jsonOut) {
  console.log(JSON.stringify({ available: false, message }, null, 2));
} else {
  console.log(` Recommend unavailable`);
  console.log(`   ${message}`);
}

