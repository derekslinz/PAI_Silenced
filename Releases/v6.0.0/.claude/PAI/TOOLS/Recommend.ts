#!/usr/bin/env bun

/**
 * Recommend — recency-aware picker for restaurants, movies, books.
 *
 * NOTE: The life-OS preference system has been removed. This tool previously
 * read preference files to make recommendations. Those sources no longer
 * exist, so the recommendation source is unavailable. This tool is now a
 * minimal stub that reports the source is no longer available.
 *
 * Usage:
 *   bun Recommend.ts [--category restaurant|movie|book] [--json]
 */

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");

const message =
  "Recommendation source no longer available: the life-OS preference system has been removed. " +
  "Restaurant, movie, and book preferences were previously read from preference files, " +
  "which no longer exist.";

if (jsonOut) {
  console.log(JSON.stringify({ available: false, message }, null, 2));
} else {
  console.log(` Recommend unavailable`);
  console.log(`   ${message}`);
}

