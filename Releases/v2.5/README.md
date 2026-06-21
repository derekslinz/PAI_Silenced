<div align="center">

<img src="https://github.com/danielmiessler/TheAlgorithm/raw/main/assets/algorithm-blocks.png" alt="PAI v2.5" width="200">

# PAI v2.5.0 — Think Deeper, Execute Faster

**The Algorithm learns to think about how it thinks—and do more work in parallel**

[![GitHub Release](https://img.shields.io/badge/Release-v2.5.0-8B5CF6?style=flat&logo=github)](https://github.com/danielmiessler/PAI/releases/tag/v2.5.0)
[![Skills](https://img.shields.io/badge/Skills-28-22C55E?style=flat)](skills/)
[![Hooks](https://img.shields.io/badge/Hooks-17-3B82F6?style=flat)](hooks/)
[![Workflows](https://img.shields.io/badge/Workflows-356-F97316?style=flat)](skills/)

![Discussions](https://img.shields.io/github/discussions/danielmiessler/PAI?style=flat&logo=github&label=Discussions&color=EAB308)
![Commits/mo](https://img.shields.io/github/commit-activity/m/danielmiessler/PAI?style=flat&logo=git&label=Commits%2Fmo&color=F59E0B)
![Repo Size](https://img.shields.io/github/repo-size/danielmiessler/PAI?style=flat&logo=database&label=Repo%20Size&color=D97706)

</div>

---

## What Changed

v2.4 introduced The Algorithm—a 7-phase approach to problem-solving with verifiable criteria. It worked, but it had blind spots: it picked capabilities based on habit rather than analysis, it skipped thinking tools without justification, and it ran independent tasks one at a time when they could have run simultaneously.

v2.5 fixes all three.

### The Problem v2.5 Solves

v2.4's Algorithm:
```
Pick familiar tools → Execute sequentially → Hope the right capabilities were chosen
```

v2.5's Algorithm:
```
Hook suggests capabilities → Reverse-engineer true intent → Validate suggestions against ISC →
Justify every tool inclusion/exclusion → Execute independent work in parallel → Verify
```

The difference is metacognition. The Algorithm now thinks about *how* it thinks before it acts.

---

## Three Major Features

### 1. Two-Pass Capability Selection

Previously, capability selection happened implicitly—the system defaulted to familiar patterns (usually Engineer + Research) regardless of what the task actually needed.

Now selection happens in two explicit passes:

**Pass 1 — Hook Hints (before the Algorithm starts)**

The FormatReminder hook runs AI inference on the raw prompt and suggests capabilities, skills, and thinking tools. These are draft suggestions—a head start, not a decision.

**Pass 2 — THINK Validation (after OBSERVE completes)**

With the full context of reverse-engineering and ISC criteria, the THINK phase validates every suggestion. Skills get added, removed, or confirmed. Pass 2 is authoritative.

```
SKILL CHECK (validate hook hints against ISC):
│ Hook suggested:   CreateSkill:UpdateSkill
│ ISC requires:     Architecture design (not just skill update)
│ Final skills:     CreateSkill:UpdateSkill + Architect consultation
```

**Why two passes?** The hook gives a head start from the raw prompt. But OBSERVE changes the picture. A request that looks like a simple skill update might actually require architectural decisions, or might rest on questionable assumptions that need First Principles analysis. Pass 2 catches what Pass 1 cannot see.

---

### 2. Thinking Tools with Justify-Exclusion

v2.4 had thinking tools (Council, RedTeam, FirstPrinciples, etc.) but they were rarely used because the default was to skip them. v2.5 inverts this: **thinking tools are opt-OUT, not opt-IN.**

For every request, the Algorithm must evaluate each thinking tool and justify why it is NOT being used:

```
THINKING TOOLS ASSESSMENT (justify exclusion):
│ Council:          EXCLUDE — single clear approach, no alternatives to debate
│ RedTeam:          INCLUDE — proposal could fail in non-obvious ways
│ FirstPrinciples:  INCLUDE — requirement rests on unexamined assumption
│ Science:          EXCLUDE — not iterative/experimental
│ BeCreative:       EXCLUDE — clear requirements, no divergence needed
│ Prompting:        EXCLUDE — not generating prompts
```

The burden of proof is on exclusion. "Too simple" and "already know the answer" are not valid reasons—simple tasks can have hidden assumptions, and confidence without verification is exactly the failure mode this catches.

### The Six Thinking Tools

| Tool | What It Does | Include When |
|------|-------------|--------------|
| **Council** | Multi-agent debate with 3-7 agents | Multiple valid approaches exist |
| **RedTeam** | Adversarial analysis with 32 agents | Claims need stress-testing |
| **FirstPrinciples** | Deconstruct, challenge, reconstruct | Assumptions need examining |
| **Science** | Hypothesis-test-analyze cycles | Iterative experimentation needed |
| **BeCreative** | Extended thinking, 5 diverse options | Creative divergence needed |
| **Prompting** | Meta-prompting with templates | Prompt optimization needed |

---

### 3. Parallel-by-Default Execution

When the Algorithm identifies independent tasks during BUILD/EXECUTE, they now launch simultaneously as concurrent agents in a single message. Serial execution of independent tasks is a failure mode.

```
BEFORE (v2.4):          AFTER (v2.5):
Task A → wait           Task A ─┐
Task B → wait           Task B ─┼─ all at once
Task C → wait           Task C ─┘
Task D → done           Task D → done
```

**The rule is simple:** If tasks don't depend on each other's output, they run at the same time. Period.

This applies automatically to:
- Multiple file edits with no cross-dependencies
- Multiple research queries on different topics
- Multiple audits or scans of independent systems
- Multiple creation tasks with no shared state

Fan-out is the default pattern for 3+ independent workstreams.

---

## Composition Patterns

Capabilities now combine using 7 named patterns, making orchestration explicit and visible:

| Pattern | Shape | Example | When |
|---------|-------|---------|------|
| **Pipeline** | A → B → C | Explore → Architect → Engineer | Sequential domain handoff |
| **TDD Loop** | A B | Engineer QA | Build-verify cycle until ISC passes |
| **Fan-out** | → [A, B, C] | 3 Researchers in parallel | Multiple perspectives needed |
| **Fan-in** | [A, B, C] → D | Researchers → Synthesis | Merging parallel results |
| **Gate** | A → check → B or retry | Engineer → QA → Deploy or fix | Quality gate before progression |
| **Escalation** | A(haiku) → A(sonnet) → A(opus) | Model upgrade on failure | Complexity exceeded model tier |
| **Specialist** | Single A | Pentester for security review | One domain, deep expertise |

The full Capability Selection block in THINK phase now looks like:

```
CAPABILITY SELECTION:
│ Skills:     CreateSkill:UpdateSkill
│ Thinking:   FirstPrinciples, RedTeam
│ Primary:    Architect  — system design decision (ISC #1)
│ Support:    Engineer   — implementation (ISC #2-4)
│ Verify:     QATester   — browser verification (ISC #5)
│ Pattern:    Pipeline
│ Sequence:   Architect → Engineer → QATester
│ Rationale:  Architecture must be decided before implementation begins
```

---

## What's New in v2.5

### Major Features

| Feature | Description |
|---------|-------------|
| **Two-Pass Capability Selection** | Hook hints validated against ISC in THINK phase |
| **Thinking Tools Assessment** | 6 tools evaluated with justify-exclusion principle |
| **Parallel-by-Default Execution** | Independent tasks run concurrently, not sequentially |
| **7 Composition Patterns** | Named patterns for combining capabilities |
| **Mandatory AskUserQuestion** | All user questions use structured tool, not inline text |
| **28 Skills** | Refined from 29—CORE renamed to PAI |
| **17 Hooks** | 2 new hooks for deeper system awareness |
| **356 Workflows** | Expanded automation coverage |

### Algorithm Upgrades (v0.2.23 → v0.2.25)

| Version | Change |
|---------|--------|
| **v0.2.23** | Two-Pass Capability Selection, Skill Check in THINK, FormatReminder hook enrichment |
| **v0.2.24** | Thinking Tools Assessment, justify-exclusion principle, mandatory AskUserQuestion |
| **v0.2.25** | Parallel-by-default execution, fan-out as default pattern |

### Structural Changes

- **CORE → PAI** — The core skill renamed from `CORE` to `PAI` for clarity
- **Consolidated SKILL.md** — Single authoritative source for all PAI components with dynamic context loading
- **INSTALL.ts** — Wizard renamed from `PAIInstallWizard.ts` to `INSTALL.ts`
- **INSTALL.md** — New installation documentation added
- **MEMORY structure** — Updated directory organization for learning capture
- **Settings template** — Cleaner defaults with contextFiles updates

---

## Full Release Contents

```
.claude/
├── INSTALL.ts              # Interactive setup wizard
├── INSTALL.md              # Installation documentation
├── settings.json           # Template configuration
├── statusline-command.sh   # 4-mode responsive status line
├── statusline-debug.sh     # Status line debugging
│
├── hooks/                  # 17 event hooks
│   ├── FormatReminder.hook.ts      # AI-powered depth classification
│   ├── ExplicitRatingCapture.hook.ts
│   ├── ImplicitSentimentCapture.hook.ts
│   ├── RelationshipMemory.hook.ts
│   ├── SoulEvolution.hook.ts
│   └── ... (12 more)
│
├── skills/                 # 28 production skills
│   ├── PAI/                # The Algorithm and system core
│   ├── Agents/             # Agent personalities and spawning
│   ├── Art/                # Visual content creation
│   ├── Browser/            # Playwright automation
│   ├── Research/           # Multi-model parallel research
│   ├── Fabric/             # 235 prompt patterns
│   └── ... (22 more)
│
├── agents/                 # 12 named agent definitions
├── lib/                    # Shared utilities
├── MEMORY/                 # Learning capture system
├── Observability/          # Real-time monitoring dashboard
└── VoiceServer/            # Voice notification server
```

---

## Quick Start

```bash
# 1. Clone the repo (if you haven't already)
git clone https://github.com/danielmiessler/PAI.git
cd PAI/Releases/v2.5

# 2. Backup existing installation (if any)
[ -d ~/.claude ] && mv ~/.claude ~/.claude-backup-$(date +%Y%m%d)

# 3. Copy the complete release
cp -r .claude ~/

# 4. Run the configuration wizard
cd ~/.claude && bun run INSTALL.ts

# 5. Restart Claude Code to activate hooks
```

### The Wizard Will Ask For

| Prompt | Purpose |
|--------|---------|
| **Your name** | Personalization throughout the system |
| **Projects directory** | Where your work lives (default: ~/Projects) |
| **AI name** | What to call your assistant (default: Kai) |
| **Startup catchphrase** | What your DA says on startup |
| **ElevenLabs API key** | Optional voice notifications |

### Shell Support

The wizard auto-detects your shell and configures the appropriate file:
- **zsh** → `~/.zshrc`
- **bash** → `~/.bashrc`

---

## The 28 Skills

### Core System
| Skill | Purpose |
|-------|---------|
| **PAI** | The Algorithm, steering rules, identity, system architecture |
| **Agents** | Agent personalities, spawning, parallel orchestration |
| **PAIUpgrade** | System improvement extraction from content |

### Research & Intelligence
| Skill | Purpose |
|-------|---------|
| **Research** | Multi-model parallel research with synthesis |
| **OSINT** | Open source intelligence gathering |
| **PrivateInvestigator** | Ethical people-finding |
| **AnnualReports** | Security report aggregation |
| **SECUpdates** | Security news monitoring |

### Creative & Analysis
| Skill | Purpose |
|-------|---------|
| **Art** | Visual content, diagrams, icons |
| **BeCreative** | Extended thinking mode |
| **FirstPrinciples** | Fundamental analysis |
| **RedTeam** | Adversarial validation with 32 agents |
| **Council** | Multi-agent debate with 3-7 agents |
| **Prompting** | Meta-prompt generation with templates |

### Development
| Skill | Purpose |
|-------|---------|
| **Browser** | Debug-first Playwright automation |
| **CreateCLI** | TypeScript CLI generation |
| **CreateSkill** | Skill structure creation and validation |
| **Evals** | Agent evaluation framework |
| **Documents** | Document processing |

### Specialized
| Skill | Purpose |
|-------|---------|
| **Telos** | Life goals and project analysis |
| **Recon** | Security reconnaissance |
| **WebAssessment** | Web security testing |
| **PromptInjection** | LLM security testing |
| **BrightData** | Progressive URL scraping |
| **Apify** | Social media and business data scraping |
| **Fabric** | 235 prompt patterns for content analysis |
| **Aphorisms** | Quote management |
| **VoiceServer** | Voice notification control |

---

## Named Agents

12 specialized personalities for focused work:

| Agent | Specialty |
|-------|-----------|
| **Algorithm** | ISC tracking, verification, analysis |
| **Architect** | System design, distributed systems |
| **Engineer** | TDD, implementation patterns, Fortune 10 experience |
| **Artist** | Visual content, prompt engineering, model selection |
| **Designer** | UX/UI, accessibility, shadcn/ui |
| **QATester** | Browser automation, verification |
| **Pentester** | Security testing, vulnerability assessment |
| **Intern** | High-agency generalist, multi-tool problem solver |
| **GeminiResearcher** | Multi-perspective parallel investigations |
| **GrokResearcher** | Contrarian, fact-based analysis |
| **CodexResearcher** | Technical archaeology, curiosity-driven |
| **ClaudeResearcher** | Academic synthesis, scholarly sources |

---

## The Goal: Euphoric Surprise

The target remains **Euphoric Surprise**—results so thorough you're genuinely delighted, not just satisfied.

v2.5 makes this more achievable by addressing three weaknesses in v2.4:

1. **Better tool selection** — Two-pass validation means the right capabilities are chosen based on evidence, not habit
2. **Better metacognition** — Thinking tools catch hidden assumptions and unexplored alternatives
3. **Better throughput** — Parallel execution means complex tasks complete faster without sacrificing quality

The Algorithm's hill-climbing loop (define criteria → execute → verify → learn) now has sharper tools at every stage.

---

## Upgrading from v2.4

v2.5 is an incremental upgrade from v2.4. Recommended approach:

```bash
# 1. Backup your current installation
mv ~/.claude ~/.claude-v2.4-backup

# 2. Install v2.5
cp -r .claude ~/

# 3. Run the wizard
cd ~/.claude && bun run INSTALL.ts

# 4. Migrate personal content
# Copy USER/ and MEMORY/ from backup if desired
```

**Breaking changes:**
- `PAIInstallWizard.ts` → `INSTALL.ts` (wizard renamed)
- `skills/CORE/` → `skills/PAI/` (core skill renamed)
- MEMORY directory structure updated
- `settings.json` contextFiles paths updated (wizard handles migration)

---

## Resources

- **GitHub**: [github.com/danielmiessler/PAI](https://github.com/danielmiessler/PAI)
- **The Algorithm**: [github.com/danielmiessler/TheAlgorithm](https://github.com/danielmiessler/TheAlgorithm)
- **Video**: [PAI Overview](https://youtu.be/Le0DLrn7ta0)
- **Philosophy**: [The Real Internet of Things](https://danielmiessler.com/blog/real-internet-of-things)

---

<div align="center">

**PAI v2.5.0** — Think Deeper, Execute Faster

*The Algorithm that thinks about how it thinks.*

</div>
