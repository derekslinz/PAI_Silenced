RootCauseAnalysis — Method Selection Guide

When to use which workflow. The method matters — using Whys on a safety-critical problem or FTA on a simple defect both produce bad outcomes.

Decision Flow

```
Is this an incident or a defect?

 Incident (production outage, security event, data loss)
    
     Use Postmortem as wrapper
          Single thread, clear mechanism → Whys inside
          Multiple suspected categories → Fishbone inside
          "Works here not there" subtle → Kepner-Tregoe inside
          Safety/security-critical → Fault Tree Analysis inside

 Defect (recurring bug, quality drift, process failure)
     
      Simple, single-thread → Whys
      Multi-category or brainstorm needed → Fishbone + Pareto
      Deviation from known-good → Kepner-Tregoe IS/IS-NOT
      Novel, never-happened-before → Apollo/RealityCharting
      Complex interacting failures → Fault Tree
```

Quick Decision Table

| Criterion | Whys | Fishbone | FTA | Apollo | KT |
|-----------|--------|----------|-----|--------|-----|
| Problem complexity | Simple-moderate | Moderate-complex | Complex-very complex | Moderate-complex | Moderate |
| Causal structure | Linear (single chain) | Multi-category, parallel | Branching, probabilistic | Branching, evidence-based | IS/IS-NOT deviation |
| Team involvement | Solo or small team | Group brainstorm | Engineers + analysts | Formal panel | Solo or small team |
| Time available | Minutes-hours | Hours | Days-weeks | Hours-days | Hours |
| Safety-critical | No | No | Yes | Yes | No |
| Quantitative probability needed | No | No | Yes | No | No |
| Good for novel failures | Moderate | Yes | Yes | Yes | Moderate |
| Defensible for regulatory | No | Partial | Yes | Yes | Partial |
| Outputs | Causal chain + fix | Category map + Pareto | Cut sets + probabilities | Causal graph + evidence | Distinction + change |

Combining Methods

RCA methods nest and combine — they are not mutually exclusive.

The standard software-ops combination

Postmortem(wrapper) → Whys(per thread) → Swiss Cheese(defensive layers review) → Action item strength ranking
The quality-investigation combination

Fishbone(breadth) → Pareto(prioritize vital few) → Whys(depth on top causes) → Verification
The subtle-defect combination

Kepner-Tregoe(IS/IS-NOT identifies the change) → Whys(go deeper into whythe change wasn't caught) → Corrective action
The safety-critical combination

FTA(top-down deductive map) → FMEA(failure modes ranked by RPN/AP) → Postmortem(if incident occurred) → Action items at multiple layers
Anti-Patterns

Using Whys when Fishbone is right.- Signal: you keep getting stuck because the answer to "why?" has three valid parallel answers
- Switch to Fishbone so you can explore all branches

Using Fishbone when Whys is right.- Signal: you already know the category; you need depth, not breadth
- Use Whys directly

Using FTA when you have no probability data.- Signal: the quantitative benefit is lost; you're just drawing a tree
- Use Fishbone + Whys instead

Using Kepner-Tregoe when there's no baseline.- Signal: no "worked before" state exists; nothing to deviate from
- Use Apollo or Fishbone

Skipping the Postmortem wrapper for "small" incidents.- Signal: you're making exceptions for "it wasn't a big one"
- Run the postmortem anyway — the discipline compounds; the exception never recovers the learning

Method-to-Domain Map

| Domain | Primary method | Secondary |
|--------|----------------|-----------|
| Production software outage | Postmortem + Whys | Swiss Cheese, Fishbone |
| Distributed systems failure | Postmortem + Apollo | FTA |
| Security incident | Postmortem + Swiss Cheese | KT for subtle defects |
| Manufacturing defect | Fishbone + Pareto | Whys |
| Intermittent / environment-specific | Kepner-Tregoe | Whys |
| Safety-critical engineering | FTA | FMEA, Apollo |
| Pre-launch risk analysis | FMEA (proactive) | FTA |
| Process/org failure | Fishbone (P's) | Whys |
| Regulatory investigation | Apollo / RealityCharting | FTA |

Speed vs. Thoroughness Tradeoff

| Situation | Method |
|-----------|--------|
| Time pressure — minutes | Quick Whys |
| hour | Whys + Fishbone |
| Half day | Postmortem + multiple methods |
| Days | Postmortem + FTA + FMEA |
| Regulatory deadline | Apollo with full evidence |

Integration With Other Skills

- SystemsThinking— When multiple postmortems reveal the same structural cause, escalate to Iceberg / FindArchetype. RCA stops at contributing factors; SystemsThinking continues to structure and mental models.
- FirstPrinciples— Decompose a contributing factor to its fundamental truths before designing a fix.
- RedTeam— "How would we cause this again?" is adversarial RCA. Stress-test remediations.
- Science— RCA isthe scientific method applied to failures. Use Science for hypothesis generation during investigation.
