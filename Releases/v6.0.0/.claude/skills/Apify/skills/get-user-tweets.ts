!/usr/bin/env bun

/ Get latest tweets from any Twitter user using code-first Apify
 /

import { Apify } from '../index'

async function main() {
  const username = process.argv[]
  const limit = parseInt(process.argv[] || '')

  if (!username) {
    console.error('Usage: bun get-user-tweets.ts <username> [limit]')
    console.error('Example: bun get-user-tweets.ts ThePrimeagen ')
    process.exit()
  }

  console.log(`=== Getting Latest ${limit} Tweets from @${username} ===\n`)

  const apify = new Apify()

  try {
    // Use known working actor: apidojo/twitter-scraper-lite
    const TWITTER_ACTOR_ID = 'apidojo/twitter-scraper-lite'

    console.log(`. Scraping @${username} profile...`)

    const input = {
      username,
      max_posts: limit,
      maxTweets: limit,
      maxItems: limit,
      resultsLimit: limit,
      tweetsDesired: limit,
      searchTerms: [`from:${username}`],
      startUrls: [`https://twitter.com/${username}`]
    }

    console.log(`   Fetching last ${limit} tweets...`)
    console.log('   (this may take -seconds)...')

    const run = await apify.callActor(TWITTER_ACTOR_ID, input, {
      memory: ,
      timeout:     })

    console.log(`   Run ID: ${run.id}`)
    console.log()

    // Step : Wait for completion
    console.log('. Waiting for scraper to finish...')
    await apify.waitForRun(run.id, { waitSecs: })

    const finalRun = await apify.getRun(run.id)
    console.log(`   Status: ${finalRun.status}`)

    if (finalRun.status !== 'SUCCEEDED') {
      console.error('   Actor run did not succeed!')
      console.error('   Status:', finalRun.status)
      process.exit()
    }
    console.log()

    // Step : Get results
    console.log('. Fetching results...')
    const dataset = apify.getDataset(finalRun.defaultDatasetId)
    const items = await dataset.listItems({ limit })

    console.log(`   Retrieved ${items.length} tweets`)
    console.log()

    if (items.length === ) {
      console.log('   No tweets found.')
      return
    }

    // Step : Show the tweets
    console.log('. Latest tweets:')
    console.log('   ')
    console.log()

    items.forEach((tweet, i) => {
      console.log(`   ${i + }/${items.length}:`)
      console.log(`   ${tweet.text || tweet.fullText}`)
      console.log()
      console.log(`   Posted: ${tweet.createdAt}`)
      if (tweet.url) {
        console.log(`   URL: ${tweet.url}`)
      }
      console.log('   ')
      console.log()
    })

    // Step : Show token savings
    const estimateTokens = (data: any) => {
      return Math.ceil(JSON.stringify(data).length / )
    }

    const totalTokens = estimateTokens(items)
    console.log('. Token efficiency:')
    console.log(`   ${items.length} tweets: ~${totalTokens} tokens`)
    console.log(`   Filtered in code before model context`)
    console.log()

    console.log('Successfully retrieved tweets using code-first Apify!')

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    if (error instanceof Error && error.stack) {
      console.error('\nStack:', error.stack)
    }
    process.exit()
  }
}

if (import.meta.main) {
  main()
}

export { main }
