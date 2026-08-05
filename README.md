# PAI — Personal AI Infrastructure

**PAI = Personal AI Infrastructure = the Life Operating System.** It turns AI from a chatbot you talk to into a system that runs your life — it knows your goals, your people, your workflows, your current state, your ideal state, and continuously hill-climbs you from one to the other.

This is the **Silenced** fork: a hard fork of PAI that keeps the machinery and removes the pageantry. The standard is in [PHILOSOPHY.md](PHILOSOPHY.md) — **usefulness without pageantry, utilitarian.** Every artifact is measured against one question: *is this performing, or is this useful?*

**Get Started:** [Installation](#installation) · [Releases](Releases/) · [Packs](Packs/) · [Philosophy](PHILOSOPHY.md) · [Security](SECURITY.md)

---

## What PAI Is

PAI is a Life Operating System. It captures who you are, what you care about, and where you're trying to go — and then helps you get there using AI that knows you.

- **PAI** — the OS itself. Skills, memory, the Algorithm, your identity files.
- **The Algorithm** — the universal Current State → Ideal State execution loop.
- **Packs** — standalone, AI-installable capabilities you can add to any AI coding harness.

It's designed for individuals first, but the same architecture works for teams, companies, or any entity that wants to articulate what it's trying to be and move toward it.

---

## The Silenced Fork

This is a **hard fork**. It does not track upstream and does not merge back.

Origin PAI optimizes for **presence** — an AI that is felt. Affect, voice, emoji, theatrical mode banners, "euphoric surprise." This fork optimizes for **signal** — an AI that is used. The assistant is an instrument, not a companion.

The machinery is kept: hooks, the Algorithm, memory, determinism. The voice is removed.

**The decision rule** — every artifact, instruction, and output is tested against one question:

> Is this performing, or is this useful?

If it exists to be felt — emoji, voice, decorative banners, enthusiasm scripted into identity — it is pageantry. Cut it. If it exists to do work — a check, a tool, a fact, a transform — keep it, and strip any performance wrapped around it.

When unsure, the answer is silence. The system without its voice is still the system.

---

## Principles

### Humans first, tech second

PAI puts the human at the center, not the tooling. The tech exists to improve people's lives, not the other way around. Every design decision starts from one question: what does this do for the person running it?

### A Life OS, not an agent harness

PAI captures what you care about — goals, work, relationships, health, finances — and helps you pursue your ideal state across all of it. It writes code and runs agents and does the things people associate with AI tooling, but those are capabilities in service of the larger goal. The point is your life, not the tools.

### Ideal State drives everything

The biggest unsolved problem with AI is that nobody can define what "good" or "done" actually means for a given task. PAI is built around the concept of Ideal State — specifically the transition from your current state to your ideal state — and it's woven through every layer.

The primary expression is the **ISA** (Ideal State Artifact). An ISA is similar to a software PRD: it captures what done looks like so you can build toward it. The difference is that an ISA is general — it works for any creative task, from design to art to philosophy to engineering to strategy. The system decomposes the ideal state into discrete **ISCs** (Ideal State Criteria), which populate the document and double as verification items. That's how PAI hill-climbs toward ideal state on any kind of work.

### The standard is the explanation, not the feeling

The bar for "done" is whether the explanation holds up — a hard-to-vary answer instantly recognized as true — not whether it delights. That single frame covers both verifiable pursuits (code, research, decisions) and experiential ones (design, writing, anything that has to *land*), because both are climbing toward explanations that hold up.

---

## Features

### Text over opaque storage

Heavy bias toward plain text and Markdown. PAI avoids SQLite, Postgres, and other opaque stores wherever possible. Everything should be transparent and parsable — by you, by your assistant, by `rg`, by anything else. If you can't read it with `cat`, we don't want it.

### Context scaffolding > model

The mistake most people make with AI is failing to feed it the big picture. PAI is fundamentally a system for handing the smartest models the right context — about you, about what you're trying to accomplish, about the tools they have — so they can actually help you reach your ideal state. The model matters less than what surrounds it.

### Bitter-pilled engineering

The flip side of context scaffolding: as models get stronger, they need fewer instructions on how to do the work. We constantly audit PAI to remove overly prescriptive direction in places where the model can do better with just the right context and tools. The system gets smaller as the models get bigger.

### Filesystem as context, no RAG

PAI has avoided RAG since June 2025. Rich text with cross-references, plus fast search like ripgrep, gives us everything people normally want from RAG — without the embedding complexity, the retrieval flakiness, or the loss of fidelity. Your filesystem is the index.

### Memory that compounds

A text-based memory system that captures what you've done, what you've learned, and what's worth keeping — and feeds it back as input to future work. Three tiers (WORK, KNOWLEDGE, LEARNING) plus a typed graph across people, companies, ideas, and research.

### The Algorithm

A custom algorithm that drives the current → ideal state transition through a seven-phase loop modeled on the scientific method, using Deutsch's framing of hard-to-vary explanations as the standard for "good." It's the gravitational center of PAI — every non-trivial task runs through it.

### Skills as deterministic units

A skill system biased toward deterministic code execution. The hierarchy is: code → CLI to run the code → workflows that prompt the CLI → a SKILL.md that routes between workflows. The skill is the container; SKILL.md is the front door; the actual work is real code wherever possible. Prompts wrap code; code doesn't wrap prompts.

### Thinking skills

A meaningful library of custom thinking skills — first principles, council debates, red team, root cause, systems thinking, iterative depth, aperture oscillation, and more — that the Algorithm pulls from to raise the quality of decisions across the system.

---

## Installation

> [!CAUTION]
> **Project in Active Development** — PAI is evolving rapidly. Expect breaking changes, restructuring, and frequent updates.

### Use your AI to install and run PAI

We very much believe in AI-based installation and modification of PAI. Once you have a working install, point your AI at the system itself — upgrade versions, add skills, modify hooks, change settings, repair anything that breaks. The most important thing your AI can do for you up front is bring all of your existing custom context — notes, project state, preferences, identity, history — into the `PAI/USER/` directory so PAI knows who you are from day one. The system was designed to be operated by AI; lean on it.

### One-line install (recommended)

```bash
curl -sSL https://ourpai.ai/install.sh | bash
```

That's it. The installer wizard handles Bun, Git, and Claude Code verification, identity setup, and validation. An existing `~/.claude/` is auto-backed-up to `~/.claude.backup-{TIMESTAMP}` before anything is overwritten.

**Prefer to inspect first?** [Read the script](https://ourpai.ai/install.sh) before piping it.

### Manual install (clone + run)

```bash
git clone https://github.com/derekslinz/PAI_Silenced.git
cd PAI_Silenced/Releases/v6.0.0
cp -R .claude ~/
cd ~/.claude && ./install.sh
```

**The installer will:**

- Verify Bun, Git, and Claude Code are installed
- Set up identity
- Run validation

### After install

Run `/interview` in Claude Code to bring your context into `PAI/USER/`. This is the most important step — without your goals and context, the system has nothing to optimize against.

---

## PAI Packs

Packs are standalone, AI-installable capabilities you can add to any AI coding harness without installing PAI. Each pack is a self-contained prompt your assistant can read and execute — point it at the pack directory and say "install this," and it handles the rest.

**[Browse all packs →](Packs/)**

---

## FAQ

### How is PAI different from just using Claude Code?

PAI is built natively on Claude Code and designed to stay that way. We chose Claude Code because its hook system, context management, and agentic architecture are the best foundation available for personal AI infrastructure.

PAI isn't a replacement for Claude Code — it's the layer on top that makes Claude Code *yours*:

- **Persistent memory** — remembers past sessions, decisions, and learnings
- **Custom skills** — specialized capabilities for the things you do most
- **Your context** — goals, contacts, preferences—all available without re-explaining
- **Intelligent routing** — say "research this" and the right workflow triggers automatically
- **Self-improvement** — the system modifies itself based on what it learns

Think of it this way: Claude Code is the engine. PAI is everything else that makes it *your* car.

### What's the difference between PAI and Claude Code's built-in features?

Claude Code provides powerful primitives — hooks, slash commands, MCP servers, context files. These are individual building blocks.

PAI is the complete system built on those primitives. It connects everything together: your goals inform your skills, your skills generate memory, your memory improves future responses. PAI turns Claude Code's building blocks into a coherent personal AI platform.

### Is PAI only for Claude Code?

PAI is Claude Code native. We believe Claude Code's hook system, context management, and agentic capabilities make it the best platform for personal AI infrastructure, and PAI is designed to take full advantage of those features.

That said, PAI's concepts (skills, memory, algorithms) are universal, and the code is TypeScript and Bash — so community members are welcome to adapt it for other platforms.

### How is this different from fabric?

[Fabric](https://github.com/danielmiessler/fabric) is a collection of AI prompts (patterns) for specific tasks. It's focused on *what to ask AI*.

PAI is infrastructure for *how your assistant operates* — memory, skills, routing, context, self-improvement. They're complementary. Many PAI users integrate Fabric patterns into their skills.

### What if I break something?

Recovery is straightforward:

- **Back up first** — Before any upgrade: `cp -r ~/.claude ~/.claude-backup-$(date +%Y%m%d)`
- **USER/ is safe** — Your customizations in `USER/` are never touched by the installer or upgrades
- **Settings merge, not overwrite** — The installer only updates identity and version fields; your hooks, statusline, and custom config are preserved
- **Git-backed** — Version control everything, roll back when needed
- **History is preserved** — Memory survives mistakes
- **Re-install** — Run the installer again; it detects existing installations and merges intelligently

---

## Roadmap

| Feature | Description |
| --------- | ------------- |
| **Local Model Support** | Run PAI with local models (Ollama, llama.cpp) for privacy and cost control |
| **Granular Model Routing** | Route different tasks to different models based on complexity |
| **Remote Access** | Access your PAI from anywhere—mobile, web, other devices |
| **External Notifications** | Robust notification system for Email, Discord, Telegram, Slack |

---

## Contributing

We welcome contributions! See our [GitHub Issues](https://github.com/derekslinz/PAI_Silenced/issues) for open tasks.

1. **Fork the repository**
2. **Make your changes** — Bug fixes, new skills, documentation improvements
3. **Test thoroughly** — Install in a fresh system to verify
4. **Submit a PR** with examples and testing evidence

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Related Reading

- [The Real Internet of Things](https://danielmiessler.com/blog/the-real-internet-of-things) — The vision behind PAI
- [AI's Predictable Path: 7 Components](https://danielmiessler.com/blog/ai-predictable-path-7-components-2024) — Visual walkthrough of where AI is heading
- [Building a Personal AI Infrastructure](https://danielmiessler.com/blog/personal-ai-infrastructure) — Full PAI walkthrough with examples
