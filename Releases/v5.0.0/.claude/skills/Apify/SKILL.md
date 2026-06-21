---
name: Apify
description: "Scrape social media platforms, business data, and e-commerce via Apify actors — Instagram profiles/posts/hashtags/comments, LinkedIn profiles/jobs/posts, TikTok profiles/hashtags/videos/comments, YouTube channels/search/comments, Facebook posts/groups/comments, Google Maps business search with contact/review/image extraction, Amazon products/reviews/pricing, and general-purpose multi-page web crawling with custom pageFunction extraction logic. File-based TypeScript wrappers (scrapeInstagramProfile, searchGoogleMaps, scrapeAmazonProduct, scrapeWebsite, etc.) filter and transform data in code before returning to model context, achieving -% token savings over direct MCP protocol. Parallel multi-platform queries via Promise.all for social listening dashboards. Lead enrichment pipeline: Google Maps → qualified filter → optional LinkedIn enrichment. Competitive analysis across Instagram, YouTube, and TikTok simultaneously. USE WHEN scrape Instagram, scrape LinkedIn, scrape TikTok, scrape YouTube, scrape Facebook, Google Maps leads, Amazon reviews, business intelligence, multi-platform social listening, competitive analysis, lead generation, social monitoring, Apify actors, web crawl, extract contacts. NOT FOR X/Twitter bookmarks (use a dedicated X-API skill) or progressive scraping (use BrightData)."
effort: medium
---

Customization

Before executing, check for user customizations at:`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Apify/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

Apify - Social Media & Web Scraping

Direct TypeScript access to popular Apify actors with % token savings.

File-Based MCP

This skill is a file-based MCP- a code-first API wrapper that replaces token-heavy MCP protocol calls.

Why file-based?Filter data in code BEFORE returning to model context = .% token savings.

Overview

Direct TypeScript access to the most popular Apify actors without MCP overhead. Filter and transform data in code BEFORE it reaches the model context.

Available Actors

Social Media (platforms)
- Instagram(k users, .★) - Profiles, posts, hashtags, comments
- LinkedIn(k users, .★) - Profiles, jobs, posts
- TikTok(k users, .★) - Profiles, videos, hashtags, comments
- YouTube(k users, .★) - Channels, videos, comments, search
- Facebook(k users, .★) - Posts, groups, comments

Business & Lead Generation
- Google Maps(k users, .★) - HIGHEST VALUE!  - Search businesses, extract contacts, reviews, images
  - Perfect for lead generation

E-commerce
- Amazon(k users, .★) - Products, reviews, pricing

Web Scraping
- Web Scraper(k users, .★) - General-purpose, works with ANY website

Quick Start

Basic Usage Pattern

```typescript
import { scrapeInstagramProfile, searchGoogleMaps } from 'actors'

// . Call the actor wrapper
const profile = await scrapeInstagramProfile({
  username: 'target_username',
  maxPosts: })

// . Filter in code - BEFORE data reaches model!
const viral = profile.latestPosts?.filter(p => p.likesCount > )

// . Only filtered results reach model context
console.log(viral) // ~posts instead of ```

Examples by Use Case

Social Media Monitoring

Instagram - Track engagement:```typescript
import { scrapeInstagramProfile, scrapeInstagramPosts } from 'actors'

// Get profile with recent posts
const profile = await scrapeInstagramProfile({
  username: 'competitor',
  maxPosts: })

// Filter in code - only high-performing posts from last days
const thirtyDaysAgo = Date.now() - ()
const topRecent = profile.latestPosts
  ?.filter(p =>
    new Date(p.timestamp).getTime() > thirtyDaysAgo &&
    p.likesCount >   )
  .sort((a, b) => b.likesCount - a.likesCount)
  .slice(, )

// Only posts reach model instead of !
```

LinkedIn - Job search:```typescript
import { searchLinkedInJobs } from 'actors'

const jobs = await searchLinkedInJobs({
  keywords: 'AI engineer',
  location: 'San Francisco',
  remote: true,
  maxResults: })

// Filter in code - only senior roles at well-funded startups
const topJobs = jobs.filter(j =>
  j.seniority?.includes('Senior') &&
  parseInt(j.applicants || '') > )
```

TikTok - Trend analysis:```typescript
import { scrapeTikTokHashtag } from 'actors'

const videos = await scrapeTikTokHashtag({
  hashtag: 'ai',
  maxResults: })

// Filter in code - only viral content
const viral = videos
  .filter(v => v.playCount > )
  .sort((a, b) => b.playCount - a.playCount)
  .slice(, )
```

Lead Generation (Business Intelligence)

Google Maps - Local business leads:```typescript
import { searchGoogleMaps } from 'actors'

// Search with contact info extraction
const places = await searchGoogleMaps({
  query: 'restaurants in Austin',
  maxResults: ,
  includeReviews: true,
  maxReviewsPerPlace: ,
  scrapeContactInfo: true // Extracts emails from websites!
})

// Filter in code - only highly-rated with email/phone
const qualifiedLeads = places
  .filter(p =>
    p.rating >= .&&
    p.reviewsCount >= &&
    (p.email || p.phone)
  )
  .map(p => ({
    name: p.name,
    rating: p.rating,
    reviews: p.reviewsCount,
    email: p.email,
    phone: p.phone,
    website: p.website,
    address: p.address
  }))

// Export leads - only qualified results!
console.log(`Found ${qualifiedLeads.length} qualified leads`)
```

Google Maps - Review sentiment analysis:```typescript
import { scrapeGoogleMapsReviews } from 'actors'

const reviews = await scrapeGoogleMapsReviews({
  placeUrl: 'https://maps.google.com/maps?cid=',
  maxResults: })

// Filter in code - analyze sentiment by rating
const recentNegative = reviews
  .filter(r => {
    const thirtyDaysAgo = Date.now() - ()
    return (
      r.rating <= &&
      new Date(r.publishedAtDate).getTime() > thirtyDaysAgo &&
      r.text.length >     )
  })

// Identify common complaints
const complaints = recentNegative.map(r => r.text)
```

E-commerce & Competitive Intelligence

Amazon - Price monitoring:```typescript
import { scrapeAmazonProduct } from 'actors'

const product = await scrapeAmazonProduct({
  productUrl: 'https://www.amazon.com/dp/BLVT',
  includeReviews: true,
  maxReviews: })

// Filter in code - only recent negative reviews
const recentNegative = product.reviews
  ?.filter(r => {
    const weekAgo = Date.now() - ()
    return (
      r.rating <= &&
      new Date(r.date).getTime() > weekAgo
    )
  })

console.log(`Price: $${product.price}`)
console.log(`Rating: ${product.rating}/`)
console.log(`Recent issues: ${recentNegative?.length} complaints`)
```

Custom Web Scraping

Any Website - Custom extraction:```typescript
import { scrapeWebsite } from 'actors'

const products = await scrapeWebsite({
  startUrls: ['https://example.com/products'],
  linkSelector: 'a.product-link',
  maxPagesPerCrawl: ,
  pageFunction: `
    async function pageFunction(context) {
      const { request, $, log } = context

      return {
        url: request.url,
        title: $('h.product-title').text(),
        price: $('span.price').text(),
        inStock: $('.in-stock').length > ,
        description: $('.description').text()
      }
    }
  `
})

// Filter in code - only available products under $const affordable = products.filter(p =>
  p.inStock &&
  parseFloat(p.price.replace('$', '')) < )
```

Advanced Patterns

Pattern : Multi-Platform Social Listening

```typescript
import {
  scrapeInstagramHashtag,
  scrapeTikTokHashtag,
  searchYouTube
} from 'actors'

// Run all platforms in parallel
const [instagramPosts, tiktokVideos, youtubeVideos] = await Promise.all([
  scrapeInstagramHashtag({ hashtag: 'ai', maxResults: }),
  scrapeTikTokHashtag({ hashtag: 'ai', maxResults: }),
  searchYouTube({ query: 'ai', maxResults: })
])

// Combine and filter - only viral content across all platforms
const allViral = [
  ...instagramPosts.filter(p => p.likesCount > ),
  ...tiktokVideos.filter(v => v.playCount > ),
  ...youtubeVideos.filter(v => v.viewsCount > )
]

console.log(`Found ${allViral.length} viral posts across platforms`)
```

Pattern : Lead Enrichment Pipeline

```typescript
import { searchGoogleMaps, scrapeLinkedInProfile } from 'actors'

// . Find businesses on Google Maps
const restaurants = await searchGoogleMaps({
  query: 'restaurants in SF',
  maxResults: ,
  scrapeContactInfo: true
})

// . Filter for qualified leads
const qualified = restaurants.filter(r =>
  r.rating >= .&&
  r.email &&
  r.reviewsCount >= )

// . Enrich with LinkedIn data (if available)
const enriched = await Promise.all(
  qualified.map(async (restaurant) => {
    // Try to find LinkedIn company page
    // ... additional enrichment logic
    return restaurant
  })
)
```

Pattern : Competitive Analysis Dashboard

```typescript
import {
  scrapeInstagramProfile,
  scrapeYouTubeChannel,
  scrapeTikTokProfile
} from 'actors'

async function analyzeCompetitor(username: string) {
  // Gather data from all platforms
  const [instagram, youtube, tiktok] = await Promise.all([
    scrapeInstagramProfile({ username, maxPosts: }),
    scrapeYouTubeChannel({ channelUrl: `https://youtube.com/@${username}`, maxVideos: }),
    scrapeTikTokProfile({ username, maxVideos: })
  ])

  // Calculate engagement metrics in code
  return {
    username,
    instagram: {
      followers: instagram.followersCount,
      avgLikes: average(instagram.latestPosts?.map(p => p.likesCount) || []),
      engagementRate: calculateEngagement(instagram)
    },
    youtube: {
      subscribers: youtube.subscribersCount,
      avgViews: average(youtube.videos?.map(v => v.viewsCount) || [])
    },
    tiktok: {
      followers: tiktok.followersCount,
      avgPlays: average(tiktok.videos?.map(v => v.playCount) || [])
    }
  }
}
```

Token Savings Calculator

Example: Instagram profile with posts
MCP Approach:```
. search-actors → ,tokens
. call-actor → ,tokens
. get-actor-output → ,tokens (unfiltered posts)
TOTAL: ~,tokens
```

File-Based Approach:```typescript
const profile = await scrapeInstagramProfile({
  username: 'user',
  maxPosts: })

// Filter in code - only top posts
const top = profile.latestPosts
  ?.sort((a, b) => b.likesCount - a.likesCount)
  .slice(, )

// TOTAL: ~tokens (only filtered posts reach model)
```

Savings: % reduction (,→ tokens)
Actor Reference

Social Media

Instagram
- `scrapeInstagramProfile(input)` - Profile + posts
- `scrapeInstagramPosts(input)` - Posts from user
- `scrapeInstagramHashtag(input)` - Posts by hashtag
- `scrapeInstagramComments(input)` - Comments on post

LinkedIn
- `scrapeLinkedInProfile(input)` - Profile + experience + email
- `searchLinkedInJobs(input)` - Job listings
- `scrapeLinkedInPosts(input)` - Posts from profile/company

TikTok
- `scrapeTikTokProfile(input)` - Profile + videos
- `scrapeTikTokHashtag(input)` - Videos by hashtag
- `scrapeTikTokComments(input)` - Comments on video

YouTube
- `scrapeYouTubeChannel(input)` - Channel + videos
- `searchYouTube(input)` - Search videos
- `scrapeYouTubeComments(input)` - Comments on video

Facebook
- `scrapeFacebookPosts(input)` - Posts from pages
- `scrapeFacebookGroups(input)` - Group posts
- `scrapeFacebookComments(input)` - Post comments

Business & Lead Generation

Google Maps
- `searchGoogleMaps(input)` - Search places (with contact extraction!)
- `scrapeGoogleMapsPlace(input)` - Single place details
- `scrapeGoogleMapsReviews(input)` - Place reviews

E-commerce

Amazon
- `scrapeAmazonProduct(input)` - Product details + reviews
- `scrapeAmazonReviews(input)` - Product reviews only

Web Scraping

General Web
- `scrapeWebsite(input)` - Custom multi-page crawling
- `scrapePage(url, pageFunction)` - Single page extraction

️ Configuration

Environment Variables:```bash
Required - Get from https://console.apify.com/account/integrations
APIFY_TOKEN=apify_api_xxxxx...
```

Actor Run Options:```typescript
{
  memory: ,    // MB: , , , , , ,   timeout: ,    // seconds
  build: 'latest'  // or specific build number
}
```

When to Use This vs MCP

Use File-Based (this skill):- Need to filter large datasets (>results)
- Want to transform/aggregate data in code
- Multiple sequential operations
- Control flow (loops, conditionals)
- Maximum token efficiency

Use MCP:- Simple single operations with small results (<items)
- One-off exploratory queries
- Don't want to write code

Links

- Apify Platform: https://apify.com
- Actor Store: https://apify.com/store
- API Docs: https://docs.apify.com/api/v
---

Remember: Filter data in code BEFORE returning to model context. This is where the % token savings happen!
Gotchas

- Actor selection matters.Each social platform has specific actors — don't use a generic scraper for Instagram when a dedicated Instagram actor exists.
- Rate limits vary by platform and plan.Check actor documentation for limits before running large scrapes.
- Scraped data format varies by actor.Read the actor's output schema before processing results.

Examples

Example : Scrape Instagram profile```
User: "get the recent posts from this Instagram account"
→ Selects Instagram Profile actor
→ Runs with target profile URL
→ Returns structured post data (text, engagement, dates)
```

Example : LinkedIn company scrape```
User: "scrape this company's LinkedIn page"
→ Selects LinkedIn Company actor
→ Returns company info, employee count, recent posts
```

Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Apify","workflow":"WORKFLOW_USED","input":"_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
