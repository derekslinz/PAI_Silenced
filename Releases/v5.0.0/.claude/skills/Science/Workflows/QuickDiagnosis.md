Quick Diagnosis Workflow

Level Science - For problems under minutes
This is Minimum Viable Science. When you've been stuck for + minutes or intuition fails, STOP and run this lightweight diagnostic.

---

When to Use

- You've tried the obvious fix and it didn't work
- You're about to "try random stuff"
- You're pattern-matching without evidence ("I think it's probably...")
- The problem is taking longer than expected

Anti-Triggers (Don't Use When)

- The fix is obvious and takes minutes
- You've solved this exact pattern + times
- You're in creative/generative mode
- Cost of trying < cost of thinking

---

The Workflow (-minutes)

Step : State Your Goal (seconds)

One sentence. What does "fixed" look like?

```
GOAL: [What will be true when this is solved?]
```

Examples:- "User can log in without error"
- "Build passes without TypeScript errors"
- "Component renders the updated data"

Step : Generate Hypotheses (seconds)

MINIMUM THREE.If you can't think of three, you haven't thought hard enough.

```
H: [Most likely cause] - because [evidence/reasoning]
H: [Second possibility] - because [evidence/reasoning]
H: [Third possibility] - because [evidence/reasoning]
```

The Falsification Question:For each hypothesis, ask: "What would prove this WRONG?"

Step : Rank and Test (seconds)

Order by: Fastest to verify× Most likely
```
Test H[X] first because: [it takes seconds to check]
```

Run the test. What did you observe?

Step : Update and Iterate (seconds)

Based on results:
- Hypothesis confirmed→ Fix it, done
- Hypothesis refuted→ Move to next hypothesis
- Inconclusive→ Need more data, design better test

---

One-Liner Version

When you're really pressed for time:

```
"I think [X] because [Y]. If I'm wrong, [Z] would be true. Let me check [Z]."
```

This single sentence contains: hypothesis, rationale, falsification test.

---

Examples

Debugging a Bug

```
GOAL: API returns instead of 
H: Database connection timeout - server logs show DB errors
H: New code introduced regression - deployed yesterday
H: Rate limiting kicked in - sudden traffic spike

Test Hfirst (check logs):
→ Logs show "connection pool exhausted"
→ HCONFIRMED - increase pool size
```

Build Failure

```
GOAL: TypeScript build passes

H: Type mismatch in new code - just edited that file
H: Missing dependency types - added new package
H: Config changed - someone touched tsconfig

Test Hfirst (check error location):
→ Error is in file I edited, line I touched
→ HCONFIRMED - fix the type annotation
```

Content Not Rendering

```
GOAL: Component shows updated data

H: API returning stale data - caching issue
H: Component not re-rendering - state management
H: Data transformation bug - shape mismatch

Test Hfirst (check network tab):
→ API returns correct data
→ HREFUTED, test H→ React DevTools shows state not updating
→ HCONFIRMED - fix dependency array
```

---

The Anti-Pattern to Avoid

Random Flailing:```
"Let me try this... nope. Let me try that... nope.
 Maybe if I restart everything... still broken.
 Let me Google random things..."
```

Structured Diagnosis:```
"Let me form three hypotheses, test the fastest one first,
 and systematically eliminate until I find the cause."
```

---

Exit Criteria

You're done with Quick Diagnosis when:
- Problem is solved
- You need more information than available → escalate to StructuredInvestigation
- Problem is bigger than expected → escalate to StructuredInvestigation

Time limit:If minutes of Quick Diagnosis doesn't solve it, escalate.
