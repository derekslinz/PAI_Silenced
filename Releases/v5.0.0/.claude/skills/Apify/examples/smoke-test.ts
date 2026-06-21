!/usr/bin/env bun

/ Smoke Test: Verify Apify Code-First API Works
  Tests basic functionality without executing expensive operations.
 /

import { Apify } from '../index'

async function main() {
  console.log('=== Apify Code-First Smoke Test ===\n')

  if (!process.env.APIFY_TOKEN && !process.env.APIFY_API_KEY) {
    console.error('APIFY_TOKEN or APIFY_API_KEY not set in environment')
    console.error('   Add to ${PAI_DIR}/.env: APIFY_TOKEN=apify_api_xxxxx')
    console.error('   Or: APIFY_API_KEY=apify_api_xxxxx\n')
    process.exit()
  }

  const apify = new Apify()

  try {
    // Test : Search for actors
    console.log('Test : Searching for actors...')
    const actors = await apify.search('web scraper', { limit: })

    if (actors.length === ) {
      console.error('No actors found - API may not be working')
      process.exit()
    }

    console.log(`Found ${actors.length} actors:`)
    actors.forEach((actor, i) => {
      console.log(`   ${i + }. ${actor.username}/${actor.name}`)
      console.log(`      ${actor.title}`)
      if (actor.stats?.totalRuns) {
        console.log(`      Runs: ${actor.stats.totalRuns}`)
      }
    })
    console.log()

    // Test : Verify types
    console.log('Test : Verifying TypeScript types...')
    const firstActor = actors[]
    if (!firstActor.id || !firstActor.name || !firstActor.username) {
      console.error('Actor object missing required fields')
      process.exit()
    }
    console.log('Actor types correct')
    console.log()

    // Test : Test token estimation
    console.log('Test : Token estimation...')
    const estimateTokens = (data: any) => {
      return Math.ceil(JSON.stringify(data).length / )
    }

    const tokens = estimateTokens(actors)
    console.log(`${actors.length} actors = ~${tokens} tokens`)
    console.log()

    console.log('=== ALL TESTS PASSED ===\n')
    console.log('Apify code-first API is working correctly')
    console.log('Ready to use for scraping operations')
    console.log('Token savings will apply when filtering datasets\n')

  } catch (error) {
    console.error('Test failed:', error instanceof Error ? error.message : error)
    process.exit()
  }
}

if (import.meta.main) {
  main()
}

export { main }
