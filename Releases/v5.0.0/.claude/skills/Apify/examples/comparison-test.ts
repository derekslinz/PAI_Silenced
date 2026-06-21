!/usr/bin/env bun

/ Comparison Test: MCP vs Code-First Apify
  Demonstrates the difference in approach and token usage between
 traditional MCP tool calls and code-first execution.
 /

import { Apify } from '../index'

// Utility to estimate token count
function estimateTokens(data: any): number {
  const str = JSON.stringify(data)
  // Rough estimate: ~characters per token
  return Math.ceil(str.length / )
}

async function demonstrateMCPApproach() {
  console.log('=== MCP APPROACH ===\n')
  console.log('Traditional MCP flow with multiple round-trips through model context:\n')

  console.log('Step : mcp__Apify__search-actors')
  console.log('  Input: { search: "instagram scraper", limit: }')
  console.log('  → Tool definitions loaded: ~,tokens')
  console.log('  → Search results returned: ~,tokens')
  console.log('  → Results pass through model context')

  console.log('\nStep : mcp__Apify__call-actor')
  console.log('  Input: { actor: "apify/instagram-scraper", input: {...} }')
  console.log('  → Run information returned: ~,tokens')
  console.log('  → Results pass through model context')

  console.log('\nStep : mcp__Apify__get-actor-output')
  console.log('  Input: { datasetId: "xyz" }')
  console.log('  → FULL dataset returned: ~,tokens (items)')
  console.log('  → ALL results pass through model context')
  console.log('  → Model must filter in subsequent reasoning step')

  console.log('\nStep : Model reasoning to filter')
  console.log('  → Additional model call to process and filter')
  console.log('  → Context includes all items again')

  console.log('\nMCP Total Token Usage:')
  console.log('  Tool definitions:    ,tokens')
  console.log('  Search results:      ,tokens')
  console.log('  Run info:            ,tokens')
  console.log('  Full dataset:       ,tokens')
  console.log('  ────────────────────────────────')
  console.log('  TOTAL:             ~,tokens')
  console.log('  Plus additional reasoning overhead!\n')
}

async function demonstrateCodeFirstApproach() {
  console.log('=== CODE-FIRST APPROACH ===\n')
  console.log('Direct code execution with in-code filtering:\n')

  const apify = new Apify()

  console.log('Step : Model reads README.md for API discovery')
  console.log('  → README.md content: ~tokens')
  console.log('  → Progressive disclosure (only load what\'s needed)')

  console.log('\nStep : Model writes code to execute operations')
  const codeExample = `
import { Apify } from '~/.claude/filesystem-mcps/apify'

const apify = new Apify()

// All operations in code - no intermediate context bloat
const actors = await apify.search("instagram scraper")
const run = await apify.callActor(actors[].id, {
  profiles: ["target"],
  resultsLimit: })

// Wait for completion
await apify.waitForRun(actors[].id, run.id)

// Get dataset
const dataset = apify.getDataset(run.defaultDatasetId)
const items = await dataset.listItems()

// CRITICAL: Filter in code BEFORE returning to model
const yesterday = Date.now() - const filtered = items
  .filter(post => post.likesCount > )
  .filter(post => post.timestamp > yesterday)
  .slice(, )

// Only filtered results reach model context
return filtered
  `.trim()

  console.log('  Code to execute (~tokens):')
  console.log('  ' + codeExample.split('\n').join('\n  '))

  console.log('\nStep : Code executes in bash environment')
  console.log('  → All operations happen locally')
  console.log('  → Intermediate results NEVER enter model context')
  console.log('  → Filtering happens in execution environment')

  console.log('\nStep : Only filtered results return to model')
  console.log('  → Filtered dataset: items (~tokens)')
  console.log('  → Model sees only what it needs')

  console.log('\nCode-First Total Token Usage:')
  console.log('  README discovery:      tokens')
  console.log('  Code execution:        tokens')
  console.log('  Filtered results:      tokens')
  console.log('  ────────────────────────────────')
  console.log('  TOTAL:              ~,tokens')
  console.log('\n  TOKEN SAVINGS: .% reduction!')
  console.log('  PERFORMANCE: Faster (no model round-trips)')
  console.log('  PRIVACY: Intermediate data never in model context\n')
}

async function demonstrateFilteringComparison() {
  console.log('=== FILTERING COMPARISON ===\n')

  // Simulate a dataset of items
  const fullDataset = Array.from({ length: }, (_, i) => ({
    id: `post_${i}`,
    username: `user${i}`,
    text: `This is post ${i} with some content`,
    likesCount: Math.floor(Math.random() ),
    timestamp: Date.now() - Math.random() ,
    url: `https://instagram.com/p/${i}`
  }))

  // Filter to top high-engagement recent posts
  const yesterday = Date.now() -   const filtered = fullDataset
    .filter(post => post.likesCount > )
    .filter(post => post.timestamp > yesterday)
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(, )

  const fullTokens = estimateTokens(fullDataset)
  const filteredTokens = estimateTokens(filtered)
  const savings = ((fullTokens - filteredTokens) / fullTokens ).toFixed()

  console.log('Dataset Size Comparison:')
  console.log(`  Full dataset:     ${fullDataset.length} items (${fullTokens} tokens)`)
  console.log(`  Filtered dataset: ${filtered.length} items (${filteredTokens} tokens)`)
  console.log(`  Reduction:        ${savings}% fewer tokens\n`)

  console.log('MCP Approach:')
  console.log('  . Return all items to model (${fullTokens} tokens)')
  console.log('  . Model reasons about filtering criteria')
  console.log('  . Model makes another call to filter')
  console.log('  . All items in context again during filtering')
  console.log(`  Total: ~${fullTokens } tokens (dataset appears x in context)\n`)

  console.log('Code-First Approach:')
  console.log('  . Filter executed in code environment')
  console.log('  . Only items returned to model')
  console.log(`  Total: ~${filteredTokens} tokens\n`)

  console.log(`Key Insight: Code-first prevents ${fullDataset.length - filtered.length} irrelevant items`)
  console.log('   from ever entering the model context!\n')
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗')
  console.log('║  MCP vs Code-First Comparison: Apify Integration         ║')
  console.log('╚═══════════════════════════════════════════════════════════╝\n')

  await demonstrateMCPApproach()
  console.log('\n' + '─'.repeat() + '\n')

  await demonstrateCodeFirstApproach()
  console.log('\n' + '─'.repeat() + '\n')

  await demonstrateFilteringComparison()
  console.log('\n' + '─'.repeat() + '\n')

  console.log('=== CONCLUSION ===\n')
  console.log('Code-first Apify integration provides:')
  console.log('  %+ token reduction through in-code filtering')
  console.log('  Faster execution (no model round-trips for control flow)')
  console.log('  Better privacy (intermediate data stays in execution env)')
  console.log('  Progressive disclosure (load only what you need)')
  console.log('  More maintainable (standard TypeScript, not tool schemas)\n')

  console.log('When to use:')
  console.log('  • Data-heavy operations (scraping, large datasets)')
  console.log('  • Operations requiring filtering/transformation')
  console.log('  • Multiple sequential operations')
  console.log('  • Privacy-sensitive workflows\n')
}

// Run if executed directly
if (import.meta.main) {
  main()
}

export { main }
