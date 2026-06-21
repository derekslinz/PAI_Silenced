Explore Workflow — Iterative Depth

Purpose

Run N structured exploration passes over the same problem, each from a different lens, to extract richer ISC criteria than single-pass analysis produces.

Invocation

This workflow is invoked:
. Directlyby the user: "use iterative depth on this problem"
. By the Algorithmduring OBSERVE phase when the Capability Audit selects IterativeDepth
. By other skillsthat need enhanced requirement extraction

Inputs

- Problem/Request:The original user request or problem statement
- Context:Any available context (conversation history, codebase state, prior work)
- Depth:Determined by SLA or explicit user request

Execution

Step : Determine Depth

```
IF SLA = Instant → SKIP (return immediately, no iterative depth)
IF SLA = Fast → N = (Literal + Failure)
IF SLA = Standard → N = (Literal + Stakeholder + Failure + Experiential)
IF SLA = Deep → N = (All lenses)
IF user specifies a number → N = that number (-)
```

Step : Load Lenses

Read `TheLenses.md` for the lens definitions being used this run.

For domain-specific tasks, the ordering may be overridden:
- Security tasks: Failure, Stakeholder, Temporal, Constraint Inversion
- UX tasks: Experiential, Stakeholder, Literal, Analogical
- Architecture tasks: Temporal, Constraint Inversion, Analogical, Meta
- Ambiguous requests: Meta, Stakeholder, Literal, Failure

Step : Execute Passes

For each lens (through N):
```

 ITERATIVE DEPTH — Pass {i}/{N}: {LENS_NAME}                      
                                                                       
 Lens Question: "{The lens's core question}"                          
                                                                       
 Exploring from this angle...                                         
                                                                       
 Findings:                                                            
 - [Finding — potential ISC criterion]                              
 - [Finding — potential ISC criterion]                              
 - [Finding — refinement of existing criterion]                     
                                                                       
 New/Refined ISC:                                                     
 + C{N}: [new criterion, -words, state not action]               
 ~ C{M}: [refined criterion, was X, now Y]                           
 + A{N}: [new anti-criterion]                                         

```

Execution modes by SLA:
- Fast (lenses):Run both lenses inline as structured thought. No agents spawned. Output directly into the Algorithm's OBSERVE phase.

- Standard (lenses):Run lenses -inline, then spawn background agents for lenses -in parallel. Merge results.

- Deep (lenses):Spawn pairs of background agents (or individual agents) for maximum parallelization. Each agent gets:
  - The original problem/request
  - Their assigned lens definition
  - Current ISC criteria so far (from earlier lenses)
  - Instruction: "Return -new ISC criteria or refinements from this lens"
  - SLA: "Complete within seconds"

Step : Synthesize

After all passes complete:

. Deduplicate:Remove criteria that are semantically identical across lenses
. Merge refinements:If multiple lenses refined the same criterion, take the most specific version
. Prioritize:Order criteria by how many lenses surfaced them (consensus = high priority)
. Format:Output all new/refined criteria in ISC format (-words, state not action, binary testable)

Step : Integrate

Return the enriched criteria to the calling context:
- If called from Algorithm OBSERVE: Feed directly into TaskCreate calls
- If called standalone: Present the enriched criteria set to the user

Output Format

```
ITERATIVE DEPTH COMPLETE ({N} lenses applied)

Coverage:
- Lenses used: {list of lens names}
- New criteria discovered: {count}
- Existing criteria refined: {count}
- Anti-criteria discovered: {count}

NEW ISC CRITERIA:
[Use TaskCreate for each, prefixed "ISC-"]

REFINED ISC CRITERIA:
[Use TaskUpdate for each, with evidence of what changed]

NEW ANTI-CRITERIA:
[Use TaskCreate for each, prefixed "ISC-A"]

Key Insight: [The most surprising finding across all lenses — the thing single-pass analysis would have missed]
```

Agent Prompt Template (for Deep SLA)

When spawning agents for individual lenses:

```
CONTEXT: You are performing Iterative Depth analysis — examining a problem from a specific structured angle to discover requirements that other angles miss.

PROBLEM: {original user request / problem statement}

YOUR LENS: {lens name} — {lens description}
YOUR QUESTION: {lens core question}

CURRENT ISC (from prior lenses):
{list of criteria already discovered}

TASK: Explore this problem EXCLUSIVELY through your assigned lens. Do NOT repeat criteria already found. Find what only YOUR lens can see.

OUTPUT FORMAT:
- -new ISC criteria (-words each, state not action, binary testable)
- -refinements to existing criteria (what changed and why)
- -anti-criteria (what must NOT happen)

SLA: Complete within seconds.
```

Integration with Algorithm OBSERVE Phase

When the Capability Audit selects IterativeDepth (Skills match), it runs AFTER the initial Reverse Engineering block but BEFORE ISC CREATION. The flow becomes:

```
OBSERVE Phase:
. Reverse Engineering (standard — what they said/implied/don't want)
. Capability Audit (standard — /scan)
. >>> ITERATIVE DEPTH (if selected) <<<
   - Takes Reverse Engineering output as input
   - Runs N lenses over it
   - Produces enriched requirement understanding
. ISC CREATION (now informed by iterative depth findings)
. ISC Quality Gate (standard)
```

This means ISC criteria benefit from multi-angle exploration BEFORE they're created, rather than being corrected after the fact.
