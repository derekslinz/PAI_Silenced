WriteReport Workflow

Purpose:Generate a McKinsey-style professional consulting report from TELOS analysis content, rendered as a dark-themed web-based document with custom Practical Typography fonts and automatic light-mode print support.

---

Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  . ANALYZE        . NARRATIVE       . STRUCTURE      . RENDER  │
│  Run TELOS         Generate story     Map to McKinsey   Output as  │
│  analysis          via CreateNarra-   report sections   web report │
│                    tivePoints                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

Input Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `source` | Yes | - | TELOS directory or analysis context |
| `client_name` | Yes | - | Client/project name for the report title |
| `output_dir` | No | `{source}/report` | Where to generate the report |

---

Artifact-Based Pipeline

CRITICAL: This workflow consumes artifacts produced by the assessment workflow.
Source → Assessment → Report Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SOURCE FILES (you edit)         ARTIFACTS (generated)    REPORT (output)  │
│                                                                             │
│  {source}/                       {source}/artifacts/      {source}/report/ │
│  ├── FINDINGS.md            →    ├── findings.json   →   lib/report-data.ts│
│  ├── CRITICAL_ISSUES.md          ├── narrative.json                        │
│  ├── BLOCKERS.md                 ├── recommendations.json                  │
│  ├── VISION.md                   ├── roadmap.json                          │
│  ├── SOLUTION_NARRATIVE.md       └── methodology.json                      │
│  └── telos/.md                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

Artifact Schema

findings.json:```json
{
  "findings": [
    {
      "id": "F",
      "title": "Finding Title",
      "description": "Description of the finding",
      "evidence": "Evidence supporting this finding",
      "source": "Role-based source (not names)",
      "severity": "critical|high|medium|low"
    }
  ]
}
```

recommendations.json:```json
{
  "recommendations": [
    {
      "id": "R",
      "title": "Recommendation Title",
      "description": "Description",
      "priority": "immediate|short-term|long-term"
    }
  ]
}
```

roadmap.json:```json
{
  "phases": [
    {
      "phase": "Phase ",
      "title": "Phase Title",
      "description": "Phase description",
      "duration": "Weeks -"
    }
  ]
}
```

methodology.json:```json
{
  "interviewCount": ,
  "roles": ["CEO", "CTO", "VP Product", "Product Managers ()"]
}
```

narrative.json:```json
{
  "context": "Executive summary context",
  "clientAsk": "What the client asked for",
  "currentState": "Current state description",
  "whyNow": "Why this matters now",
  "existentialRisks": ["Risk ", "Risk "],
  "competitiveThreats": ["Threat ", "Threat "],
  "timelinePressures": "Timeline pressure description",
  "goodNews": "The pivot - the solution exists",
  "requirements": ["Requirement ", "Requirement "],
  "targetStateDescription": "Vision description",
  "keyCapabilities": ["Capability ", "Capability "],
  "successMetrics": ["Metric ", "Metric "],
  "immediateSteps": ["Step ", "Step "],
  "decisionPoints": ["Decision ", "Decision "],
  "commitmentRequired": "What courage looks like"
}
```

Regeneration Flow

When you edit source files and say "regenerate the report":

. Assessment Workflowreads source files → produces `artifacts/.json`
. Report Workflowreads `artifacts/.json` → generates `report/lib/report-data.ts`
. Dev serverhot-reloads → updated report visible

The artifacts/ directory is the contract between assessment and report workflows.
---

Execution Steps

Step : Verify Artifacts Exist

Check that the assessment workflow has produced artifacts:

```bash
ls {source}/artifacts/
Should contain: findings.json, recommendations.json, roadmap.json, methodology.json, narrative.json
```

If artifacts don't exist, run the assessment workflow first (CreateNarrativePoints or AnalyzeProjectWithGemini).

Step : Copy Report Template

```bash
Copy template to output directory (if not already done)
cp -r ~/.claude/skills/_TELOS/report-template/{output_dir}/

Install dependencies
cd {output_dir} && bun install
```

Step : Generate report-data.ts from Artifacts

Read each artifact file and assemble into the ReportData structure:

```typescript
// Read artifacts
const findings = JSON.parse(fs.readFileSync('{source}/artifacts/findings.json'))
const recommendations = JSON.parse(fs.readFileSync('{source}/artifacts/recommendations.json'))
const roadmap = JSON.parse(fs.readFileSync('{source}/artifacts/roadmap.json'))
const methodology = JSON.parse(fs.readFileSync('{source}/artifacts/methodology.json'))
const narrative = JSON.parse(fs.readFileSync('{source}/artifacts/narrative.json'))

// Assemble ReportData
const reportData = {
  clientName: "{client_name}",
  reportTitle: "Strategic Assessment & Transformation Roadmap",
  reportDate: "December ",
  classification: "CONFIDENTIAL",
  executiveSummary: {
    context: narrative.context,
    methodology: methodology,
    keyFindings: narrative.keyFindings || findings.findings.slice(,).map(f => f.title),
    primaryRecommendation: recommendations.recommendations[]?.description || "",
    expectedOutcomes: narrative.expectedOutcomes || []
  },
  situationAssessment: {
    currentState: narrative.currentState,
    clientAsk: narrative.clientAsk,
    whyNow: narrative.whyNow
  },
  findings: findings.findings,
  riskAnalysis: {
    existentialRisks: narrative.existentialRisks,
    competitiveThreats: narrative.competitiveThreats,
    timelinePressures: narrative.timelinePressures
  },
  strategicOpportunity: {
    goodNews: narrative.goodNews,
    requirements: narrative.requirements
  },
  recommendations: recommendations.recommendations,
  targetState: {
    description: narrative.targetStateDescription,
    keyCapabilities: narrative.keyCapabilities,
    successMetrics: narrative.successMetrics
  },
  roadmap: roadmap.phases,
  callToAction: {
    immediateSteps: narrative.immediateSteps,
    decisionPoints: narrative.decisionPoints,
    commitmentRequired: narrative.commitmentRequired
  }
}
```

Write the assembled data to `{output_dir}/lib/report-data.ts`.

Step : Start Dev Server

```bash
cd {output_dir} && bun dev
```

The report will hot-reload as you regenerate.

Regeneration Shortcut

When {PRINCIPAL.NAME} edits source files and says "regenerate the report":

. Run assessment workflow to update artifacts
. Re-run Step to regenerate report-data.ts
. Dev server hot-reloads automatically

---

Report Structure

. Cover Page
- Confidential classification at top (Heliotrope Caps, red)
- Centered content block:  - UL logo(x, left-justified with -ml-) - `/ul-icon.png`
  - "TELOS Assessment"label (Heliotrope Caps, primary blue, tracking-[.em])
  - Report title (Advocate Wide font)
  - "Prepared for {Client Name}" - CUSTOMIZE per engagement- Footer: Date + "<ORG_NAME> Consulting"

. Executive Summary (page)
- Methodology exhibit- Interview count and roles interviewed (by role, not by name)
- Situation overview
- Key findings (-bullets)
- Primary recommendation
- Expected outcomes

. Situation Assessment
- Current state analysis
- Context and background
- What the client asked for
- Why this matters now

. Key Findings
- Each finding as a distinct section
- Evidence supporting each finding
- Severity/impact indicator
- Source attribution (see Board-Ready Reports section below)

. Risk Analysis
- Existential risks identified
- Probability and impact matrix
- Competitive threats
- Timeline pressures

. Strategic Recommendations
- Primary recommendation
- Supporting recommendations
- Required organizational changes
- Resource requirements

. Target State Vision
- Future state description
- Architecture/approach overview
- Key capabilities enabled
- Success metrics

. Implementation Roadmap
- Phased approach
- Quick wins vs long-term initiatives
- Dependencies
- Milestones

. Call to Action
- Immediate next steps
- Decision points required
- Success criteria
- Commitment required

---

Design Specifications

Typography (Practical Typography Fonts)

CRITICAL: Use Matthew Butterick's Practical Typography fonts (see font source below)
The report-template includes these fonts in `public/fonts/`. The font stack is:

```css
/Font Families /
--font-display: 'Advocate Wide', 'Advocate', sans-serif;
--font-heading: 'Concourse Medium', 'Concourse', sans-serif;
--font-body: 'Valkyrie', Georgia, serif;
--font-accent: 'Heliotrope Caps', 'Heliotrope', sans-serif;
--font-sans: 'Concourse', system-ui, sans-serif;
```

Font Usage:
| Element | Font | Weight | Example |
|---------|------|--------|---------|
| Cover title | Advocate Wide | | Report title on cover page |
| Section headings | Concourse Medium | | "Executive Summary", "Key Findings" |
| Body text | Valkyrie | | Paragraphs, descriptions, evidence |
| Labels/badges | Heliotrope Caps | | "EXHIBIT ", "KEY TAKEAWAY", "CRITICAL" |
| UI elements | Concourse | /| Dates, metadata, badges |

Branding Assets Required:
```
public/
├── ul-icon.png                    UL connected nodes logo (blue)
```

Font Files Required:
```
public/fonts/
├── advocate__narr_reg.woff     Advocate (narrow)
├── advocate__wide_reg.woff     Advocate Wide (display)
├── concourse__regular.woff      Concourse (sans)
├── concourse__bold.woff         Concourse Bold
├── concourse__regular.woff      Concourse Medium
├── concourse__bold.woff         Concourse Medium Bold
├── valkyrie_a_regular.woff       Valkyrie (serif body)
├── valkyrie_a_bold.woff          Valkyrie Bold
├── valkyrie_a_italic.woff        Valkyrie Italic
├── heliotrope__regular.woff     Heliotrope
└── heliotrope__caps_regular.woffHeliotrope Caps (labels)
```

Color Palette (Dark Theme)

The report uses a professional super-dark blue background with brightened accent colors for optimal contrast:

```css
/Dark Theme - Super Dark Blue Background /
--background: BD;           /Primary background - deep navy /
--background-secondary: D;  /Section backgrounds /
--background-tertiary: C;   /Elevated elements /
--background-elevated: E;   /Cards, modals /

/Text - Light on Dark /
--foreground: FFF;           /Primary text /
--muted: AAA;                /Secondary text /
--muted-dark: BB;           /Tertiary text /

/Borders /
--border: rgba(, , , .);
--border-subtle: rgba(, , , .);
--border-emphasis: rgba(, , , .);

/Accents - Brightened for dark mode /
--primary: AEF;              /Headers, key metrics, links /
--primary-glow: rgba(, , , .);
--accent: BAFF;               /Highlights, callouts /
--accent-glow: rgba(, , , .);
--success: ADE;              /Positive indicators /
--warning: FBBF;              /Caution indicators /
--destructive: F;          /Risk/critical indicators /

/Section backgrounds /
--section-bg: D;           /Section backgrounds /
--callout-bg: rgba(, , , .);  /Blue tinted callouts /
```

Print Mode:When printed (Cmd+P), the report automatically switches to a light theme for better paper output:
- White background (ffffff)
- Dark text (ab)
- Standard accent colors for ink efficiency

McKinsey Visual Elements

. Exhibit Boxes- Numbered figures with Heliotrope Caps labels and sources
. Key Takeaway Callouts- Blue-accented boxes with Heliotrope Caps headers
. Severity Indicators- Color-coded tags (Critical/High/Medium/Low) in Concourse
. Progress Bars- For metrics and completion percentages
. Timeline Graphics- For roadmaps and phases with Heliotrope Caps phase labels
. Quote Blocks- For interview evidence with Valkyrie italic

Layout Principles

- White space: Generous margins, breathing room between sections
- Hierarchy: Clear visual hierarchy through typography and spacing
- Consistency: Same patterns repeated throughout
- Professional: Clean, corporate, trustworthy aesthetic
- Printable: Optimized for both screen and print (PDF-ready)

---

Output Files

The workflow generates a complete Next.js app:

```
{output_dir}/
├── public/
│   └── fonts/              Practical Typography fonts (wofffiles)
├── app/
│   ├── layout.tsx          Report shell with print styles
│   ├── page.tsx            Full report content
│   └── globals.css         Font-face declarations + McKinsey styling
├── components/
│   ├── cover-page.tsx      Report cover (Advocate Wide title)
│   ├── section.tsx         Reusable section component
│   ├── finding-card.tsx    Individual finding display
│   ├── exhibit.tsx         Numbered figure/exhibit
│   ├── callout.tsx         Key takeaway box
│   ├── severity-badge.tsx  Risk/severity indicator
│   ├── timeline.tsx        Roadmap visualization
│   ├── quote-block.tsx     Interview quote display
│   └── recommendation-card.tsx  Priority-coded recommendations
├── lib/
│   ├── report-data.ts      Generated report content (CUSTOMIZE THIS)
│   └── utils.ts            Utility functions
├── package.json
├── tailwind.config.ts      Font family definitions
├── tsconfig.json
└── postcss.config.js
```

---

Example Command Flow

```bash
User: "Create a TELOS report for Acme Corp"

Step : {DA_IDENTITY.NAME} runs TELOS analysis on source directory
Step : {DA_IDENTITY.NAME} executes CreateNarrativePoints workflow
Step : {DA_IDENTITY.NAME} copies report-template to output directory
Step : {DA_IDENTITY.NAME} generates report-data.ts with content
Step : {DA_IDENTITY.NAME} runs bun install && bun dev

To view:
cd {output_dir} && bun dev
Opens at http://localhost:
To print:
Use browser print (Cmd+P) - print styles are included
```

---

Template Location

CRITICAL: The report template lives at:
```
~/.claude/skills/_TELOS/report-template/
```

This template includes:
- All Practical Typography font files
- Pre-configured globals.css with @font-face declarations
- Tailwind config with font family definitions
- All McKinsey-style components
- Placeholder report-data.ts

When generating a report:
. Copy the entire template to the output directory
. Generate `lib/report-data.ts` with client-specific content:
   - `clientName`: The customer name (e.g., "Quorum Cyber", "Acme Corp")
   - `reportTitle`: The engagement title
   - `reportDate`: Current month/year
   - All findings, recommendations, roadmap from TELOS analysis
. Update `app/layout.tsx` metadata with client name

---

Integration Notes

Prerequisite Workflow:- CreateNarrativePoints MUST run first to generate narrative content

Font Source:- Fonts should be sourced from Practical Typography or your project's font directory
- Already included in report-template for convenience

Works with:- InterviewExtraction output (provides evidence quotes)
- AnalyzeProjectWithGeminioutput (provides deep analysis)
- Direct TELOS directory analysis

Output designed for:- Board presentations
- Executive briefings
- Client deliverables
- Strategic planning sessions
- Investment reviews

---

Quality Checklist

Before finalizing the report:

- [ ] UL logo displays correctly (x, left-justified)
- [ ] "TELOS Assessment" label visible above title
- [ ] Cover page has correct client name and date
- [ ] Cover title uses Advocate Wide font
- [ ] Section headings use Concourse Medium font
- [ ] Body text uses Valkyrie font (readable, elegant)
- [ ] Labels use Heliotrope Caps font
- [ ] Executive summary fits on one page
- [ ] Methodology exhibit shows interview count and roles
- [ ] All findings have evidence/sources (role-based, not names)
- [ ] Recommendations are specific and actionable
- [ ] Vision section is compelling and concrete
- [ ] Roadmap has realistic phases
- [ ] Call to action is clear
- [ ] All exhibits are numbered and titled
- [ ] Color usage is subtle and professional
- [ ] Report is printable (PDF-ready)
- [ ] No sensitive data exposed inappropriately
- [ ] Confidentiality notice included

---

Voice & Tone

This is McKinsey-style professional consulting:
- Direct, confident assertions
- Evidence-backed claims
- Strategic framing
- Executive-appropriate language
- No hedging or waffling
- Clear recommendations
- Actionable insights

Avoid:- Casual language
- Technical jargon (unless client-appropriate)
- Vague statements
- Unsubstantiated claims
- Overly academic tone

---

Board-Ready Reports

When the report will be presented to a board or executive audience:
Source Anonymization

CRITICAL: Remove all individual names from source attributions.
Sources should reference roles, not people:
- "John Smith interview"
- "Feedback from Sarah Jones"
- "Executive interviews"
- "Product team interviews ()"
- "Engineering leadership feedback"
- "Customer success team assessment"

Why:Boards should evaluate findings on merit, not attribute blame or credit to individuals. Role-based sourcing maintains credibility while protecting interviewees.

Methodology Section

The Executive Summary MUST include:
- Interview count- Total number of interviews conducted
- Roles interviewed- List by role category, not by name

Example:
```
Interviews Conducted: Roles Interviewed:
- Chief Executive Officer
- Chief Technology Officer
- VP of Product
- Product Managers ()
- Engineering Leadership ()
- Customer Success Leadership
- SOC Leadership
- Sales Leadership
```

Content Review Checklist

Before board presentation:
- [ ] All individual names removed from sources
- [ ] Sources reference roles/teams only
- [ ] Methodology section shows interview count and roles
- [ ] No internal references to "board" in the content (they ARE the board)
- [ ] Findings are evidence-backed, not opinion
- [ ] Recommendations are actionable and measurable

---

Maintenance

To update fonts:```bash
Copy latest fonts from ULSite
cp ~/Projects/[your-site]/public/fonts/.woff~/.claude/skills/Telos/ReportTemplate/public/fonts/
```

To update template components:Edit files in `~/.claude/skills/_TELOS/report-template/components/`

To change color scheme: