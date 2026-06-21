ContentToAnimation Workflow

Transform any content into professional PAI-themed animations.

Triggers

- "animate this content"
- "create animations for"
- "video overlay for"
- "animate my blog post"
- "animate this YouTube video"

Input Types

This workflow handles ANY input via the Parser skill:

| Input Type | Detection | Extraction Method |
|------------|-----------|-------------------|
| YouTube URL | `youtube.com`, `youtu.be` | Parser: ExtractYoutube → transcript |
| Article URL | HTTP(S) URL | Parser: ExtractArticle → text |
| Blog file | `.md` file path | Direct read → markdown content |
| PDF file | `.pdf` file path | Parser: ExtractPdf → text |
| Tweet/Thread | `twitter.com`, `x.com` | Parser: ExtractTwitter → thread |
| Raw text | No URL/path detected | Use directly |

Execution Steps

. Extract Content

```

 STEP : CONTENT EXTRACTION                                                  

 . Detect input type (URL, file path, or raw text)                         
 . Route to appropriate Parser workflow OR read directly                    
 . Extract: title, sections, key points, quotes, data                      

```

For YouTube:```bash
Get transcript via Parser skill
Load: ~/.claude/skills/Parser/Workflows/ExtractYoutube.md
```

For articles/blogs:```bash
Read file directly for .md
Or use Parser: ExtractArticle for URLs
```

. Analyze Structure

```

 STEP : STRUCTURE ANALYSIS                                                  

 Extract these elements for animation:                                       
                                                                             
 • Title & subtitle                                                          
 • Section headers (H, H)                                                  
 • Key points (-main takeaways)                                          
 • Quotes or callouts                                                        
 • Data/statistics (numbers, percentages)                                    
 • Lists or steps                                                            
 • Conclusion/summary                                                        

```

Output structure:```typescript
interface ContentStructure {
  title: string
  subtitle?: string
  sections: {
    heading: string
    keyPoints: string[]
    quotes?: string[]
    data?: { label: string; value: string }[]
  }[]
  conclusion?: string
  duration: number  // Calculated based on content length
}
```

. Generate Animation Plan

```

 STEP : ANIMATION PLANNING                                                  

 Map content to animation scenes:                                            
                                                                             
 Scene : Title Card (seconds)                                            
   → Title fade in with spring scale                                        
   → Subtitle fade in with delay                                            
                                                                             
 Scene -N: Content Sections (-seconds each)                             
   → Section header slide in                                                
   → Key points stagger in                                                  
   → Data visualizations animate                                            
                                                                             
 Scene N+: Conclusion (seconds)                                          
   → Summary points                                                          
   → Call to action                                                          

```

Timing formula:- Title: frames (seconds at fps)
- Per section: -frames (-seconds)
- Conclusion: frames (seconds)
- Total = + (sections × ) + 
.Verify Logical Coherence  CRITICAL GATE

```

 STEP .: LOGICAL COHERENCE VERIFICATION                                    

 BEFORE generating React components, verify the animation plan makes sense.  
                                                                             
 This checks LOGICAL coherence, not just functional capability.              
                                                                             
 If these checks FAIL, the video would render but be confusing/wrong.        
 Block early to save compute and prevent bad outputs.                        

```

. NARRATIVE COHERENCE CHECKS
Verify the story flows logically:

| Check | What It Tests | Failure Example |
|-------|---------------|-----------------|
| Section connectivity| Adjacent sections share ≥% concepts | Section "Authentication" → Section "Database Schema" with % overlap |
| Context completeness| No forward references to undefined concepts | Scene uses "ISC" acronym before defining it in Scene |
| Transition bridges| Last point of section N relates to first point of section N+| Jarring topic jump with no conceptual bridge |
| Story arc validity| Sections follow recognizable narrative pattern | Random sequence with no setup→development→resolution |
| Title-content alignment| Content delivers what title promises | Title: "Ways to..." but only covered |
| Conclusion validity| Conclusion only references introduced concepts | Conclusion mentions "OWASP" never discussed in content |

Test method:```typescript
// Pseudo-code for verification
const narrativeChecks = {
  sectionConnectivity: verifySectionOverlap(sections) >= .,
  contextCompleteness: noForwardReferences(sections),
  transitionBridges: hasConceptualBridges(sections),
  storyArc: matchesValidPattern(sections),
  titleAlignment: contentMatchesTitle(title, sections),
  conclusionValidity: conclusionReferencesContent(conclusion, sections)
}

if (Object.values(narrativeChecks).some(check => !check)) {
  throw new Error('Narrative coherence check failed - see details above')
}
```

. TIMING VERIFICATION CHECKS
Verify timing adapts to content density:

| Check | What It Tests | Failure Example |
|-------|---------------|-----------------|
| Reading speed validation| Text duration allows comfortable reading (≤words/second) | -word paragraph shown for seconds (.wps) |
| Content-density adaptation| Duration scales with word count, key points, data items | Simple -word title gets same s as complex -word title |
| Data comprehension time| Statistics get -seconds per item for mental processing | data points crammed into seconds |
| Content-type multipliers| Quotes get .x, data gets .x base duration | Reflective quote rushed at same pace as simple list |
| Duration bounds| Timing stays within -seconds per point | Critical concept: s, Minor detail: s |

Test method:```typescript
// Calculate adaptive timing based on content density
function calculateSectionDuration(section: Section): number {
  const WORDS_PER_SECOND = . // Research: -WPM
  const SECONDS_PER_POINT =   const SECONDS_PER_DATA = .
  const wordCount = countWords(section.keyPoints)
  const baseDuration = (
    wordCount / WORDS_PER_SECOND +
    section.keyPoints.length SECONDS_PER_POINT +
    (section.data?.length || ) SECONDS_PER_DATA
  )

  // Apply content-type multiplier
  const typeMultiplier = section.quotes ? .: .  const duration = baseDuration typeMultiplier

  // Enforce bounds
  const minDuration = section.keyPoints.length   const maxDuration = section.keyPoints.length 
  return Math.max(minDuration, Math.min(maxDuration, duration))
}
```

. SCENE TYPE SELECTION VALIDATION
Verify correct scene template chosen for content:

| Check | What It Tests | Failure Example |
|-------|---------------|-----------------|
| Data scene validation| DataScene only used when `data` array exists with items | DataScene receives empty data array → blank screen |
| Numeric content detection| Statistics in text trigger DataScene, not KeyPointsScene | "M users, % accuracy" shown as bullet points |
| KeyPoints scene validation| KeyPointsScene used for + text items without numeric data | Single quote forced into KeyPointsScene template |
| Quote handling| Quotes get appropriate visual treatment | Quote buried in bullet list with no emphasis |

Selection logic:```typescript
function selectSceneType(section: Section): SceneType {
  // Priority : Has structured data? → DataScene
  if (section.data && section.data.length > ) {
    return 'DataScene'
  }

  // Priority : Detect numeric patterns in text → extract to DataScene
  if (hasNumericPatterns(section.keyPoints)) {
    section.data = extractDataFromText(section.keyPoints)
    return 'DataScene'
  }

  // Priority : Has quote and few/no key points? → QuoteScene
  if (section.quotes && section.keyPoints.length < ) {
    return 'QuoteScene'
  }

  // Default: Key points list
  if (section.keyPoints.length >= ) {
    return 'KeyPointsScene'
  }

  // Fallback: Simple text
  return 'TitleScene'
}

// Validation guards
function validateSceneSelection(scene: SceneType, section: Section): void {
  if (scene === 'DataScene') {
    assert(section.data && section.data.length > ,
      'DataScene requires data array with at least item')
  }

  if (scene === 'KeyPointsScene') {
    assert(section.keyPoints.length >= ,
      'KeyPointsScene requires at least key points')
    assert(!hasNumericPatterns(section.keyPoints),
      'Numeric data should use DataScene, not KeyPointsScene')
  }
}
```

. DECISION LOGIC: FAIL FAST OR WARN
```typescript
interface VerificationResult {
  passed: boolean
  errors: string[]    // Block rendering
  warnings: string[]  // Show but allow proceeding
}

function verifyAnimationPlan(
  structure: ContentStructure,
  plan: AnimationPlan
): VerificationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Run all verification checks
  const narrativeResult = verifyNarrativeCoherence(structure)
  const timingResult = verifyTimingLogic(plan)
  const sceneResult = verifySceneSelection(plan)

  errors.push(...narrativeResult.errors, ...timingResult.errors, ...sceneResult.errors)
  warnings.push(...narrativeResult.warnings, ...timingResult.warnings, ...sceneResult.warnings)

  return { passed: errors.length === , errors, warnings }
}

// In workflow execution:
const verification = verifyAnimationPlan(structure, plan)

if (!verification.passed) {
  console.error('LOGICAL COHERENCE CHECK FAILED:')
  verification.errors.forEach(err => console.error(`  - ${err}`))
  throw new Error('Cannot proceed - fix logical issues before rendering')
}

if (verification.warnings.length > ) {
  console.warn('  COHERENCE WARNINGS (review recommended):')
  verification.warnings.forEach(warn => console.warn(`  - ${warn}`))
}

console.log('Logical coherence verified - proceeding to component generation')
```

Example output:
PASS:```
Logical coherence verified - proceeding to component generation

Checks passed:
   Narrative flow: All sections connect logically
   Timing: Adapted to content density (avg .words/sec)
   Scene selection: All templates match content types
```

FAIL:```
LOGICAL COHERENCE CHECK FAILED:

  - Narrative: Section → weak connection (% overlap, need ≥%)
  - Timing: Scene text too fast to read (.words/sec, max .)
  - Scene selection: DataScene assigned but section.data is empty
  - Conclusion: References "ISC methodology" never introduced in content

Cannot proceed - fix logical issues before rendering
```

WARN:```
  COHERENCE WARNINGS (review recommended):

  - Narrative: Section → transition lacks bridge concept
  - Timing: Scene duration near minimum bound (.s per point)

Logical coherence verified - proceeding to component generation
```

Why this matters:
| Without Verification | With Verification |
|---------------------|-------------------|
| Video renders successfully | Video renders successfully |
| -word text shown for s → unreadable | Timing adapted to s → readable |
| Conclusion references undefined "ISC" → confusing | Blocked: "ISC mentioned but never defined" |
| Statistics shown as bullet points → wrong format | Converted to DataScene → proper visualization |
| Section jump from auth to database → jarring | Blocked: "% overlap, need transitional content" |

Bottom line:Verification prevents technically-correct but logically-broken videos from being generated.

. Generate Remotion Components

```

 STEP : COMPONENT GENERATION                                                

 Create project at: /tmp/remotion-{timestamp}/                              
                                                                             
 Files to generate:                                                          
 • package.json                                                              
 • src/Root.tsx (composition registration)                                   
 • src/Video.tsx (main composition)                                          
 • src/scenes/TitleScene.tsx                                                
 • src/scenes/SectionScene.tsx                                              
 • src/scenes/ConclusionScene.tsx                                           
 • src/theme.ts (copy from skill)                                           

```

MANDATORY: Apply PAI Theme```typescript
import { PAI_THEME } from '~/.claude/skills/Remotion/theme'

// All components MUST use:
// - PAI_THEME.colors for all colors
// - PAI_THEME.typography for text styles
// - PAI_THEME.animation for spring configs
// - PAI_THEME.spacing for layout
```

. Render Output

```

 STEP : RENDER                                                              

 . Install dependencies: npm install                                        
 . Render: npx remotion render {composition-id} ~/Downloads/{name}.mp    
 . Open for preview: open ~/Downloads/{name}.mp                          

```

Scene Templates

TitleScene

```typescript
const TitleScene: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleOpacity = interpolate(frame, [, ], [, ], { extrapolateRight: 'clamp' })
  const titleScale = spring({ frame, fps, config: PAI_THEME.animation.springDefault })
  const subtitleOpacity = interpolate(frame, [, ], [, ], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{
      backgroundColor: PAI_THEME.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <hstyle={{
        ...PAI_THEME.typography.title,
        color: PAI_THEME.colors.accent,
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        textAlign: 'center',
        maxWidth: '%',
      }}>
        {title}
      </h>
      {subtitle && (
        <p style={{
          ...PAI_THEME.typography.subtitle,
          color: PAI_THEME.colors.textMuted,
          opacity: subtitleOpacity,
          marginTop: ,
        }}>
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  )
}
```

KeyPointsScene

```typescript
const KeyPointsScene: React.FC<{ heading: string; points: string[] }> = ({ heading, points }) => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{
      backgroundColor: PAI_THEME.colors.background,
      padding: PAI_THEME.spacing.page,
    }}>
      <hstyle={{
        ...PAI_THEME.typography.heading,
        color: PAI_THEME.colors.text,
        opacity: interpolate(frame, [, ], [, ], { extrapolateRight: 'clamp' }),
        marginBottom: PAI_THEME.spacing.section,
      }}>
        {heading}
      </h>

      {points.map((point, i) => {
        const delay = + (i PAI_THEME.animation.staggerDelay)
        const opacity = interpolate(frame, [delay, delay + ], [, ], { extrapolateRight: 'clamp' })
        const x = interpolate(frame, [delay, delay + ], [-, ], { extrapolateRight: 'clamp' })

        return (
          <div key={i} style={{
            ...PAI_THEME.typography.body,
            color: PAI_THEME.colors.text,
            opacity,
            transform: `translateX(${x}px)`,
            marginBottom: PAI_THEME.spacing.element,
            display: 'flex',
            alignItems: 'flex-start',
          }}>
            <span style={{ color: PAI_THEME.colors.accent, marginRight: }}></span>
            {point}
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
```

DataScene

```typescript
const DataScene: React.FC<{ data: { label: string; value: string }[] }> = ({ data }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{
      backgroundColor: PAI_THEME.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: PAI_THEME.spacing.section,
    }}>
      {data.map((item, i) => {
        const delay = i         const scale = spring({ frame: Math.max(, frame - delay), fps, config: PAI_THEME.animation.springBouncy })

        return (
          <div key={i} style={{
            textAlign: 'center',
            transform: `scale(${scale})`,
          }}>
            <div style={{
              fontSize: ,
              fontWeight: 'bold',
              color: PAI_THEME.colors.accent,
            }}>
              {item.value}
            </div>
            <div style={{
              ...PAI_THEME.typography.body,
              color: PAI_THEME.colors.textMuted,
            }}>
              {item.label}
            </div>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
```

Output Formats

| Format | Dimensions | Use Case |
|--------|------------|----------|
| YouTube landscape | x| Default, blog content |
| YouTube Shorts | x| Vertical clips |
| Square | x| Instagram, social |

Example Usage

Blog post:```
User: animate my blog post at ~/LocalProjects/Website/cms/blog/skills-vs-agents.md
```

YouTube video:```
User: create animations for https://youtube.com/watch?v=xyz```

Raw text:```
User: animate this content: "The three pillars of AI safety are..."
```

Integration with Art Skill

This workflow inherits visual theming from Art preferences:
- Load: `~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/Art/PREFERENCES.md`
- Apply: Charcoal aesthetic, purple accents, organic animations
- Reference: `~/.claude/`
