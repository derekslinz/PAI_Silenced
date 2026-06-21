UpdateSkill Workflow

Purpose:Add workflows or modify an existing skill while maintaining canonical structure and TitleCase naming.

---

Step : Read the Authoritative Source

REQUIRED FIRST:Read the canonical structure:

```
~/.claude/PAI/SkillSystem.md
```

---

Step : Read the Current Skill

```bash
~/.claude/skills/[SkillName]/SKILL.md
```

Understand the current:
- Description (single-line with USE WHEN)
- Workflow routing (in markdown body)
- Existing TitleCase naming

---

Step : Understand the Update

What needs to change?
- Adding a new workflow?
- Modifying the description/triggers?
- Updating documentation?

---

Step : Make Changes

To Add a New Workflow:

. Determine TitleCase name:   - ✓ `Create.md`, `UpdateDaemonInfo.md`, `SyncRepo.md`
   - ✗ `create.md`, `update-daemon-info.md`, `SYNC_REPO.md`

. Create the workflow file:```bash
touch ~/.claude/skills/[SkillName]/Workflows/[WorkflowName].md
```

Example:
```bash
touch ~/.claude/skills/_DAEMON/Workflows/UpdatePublicRepo.md
```

. Add entry to `Workflow Routing` section in SKILL.md:```markdown
Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| ExistingWorkflow| "existing trigger" | `Workflows/ExistingWorkflow.md` |
| NewWorkflow| "new trigger" | `Workflows/NewWorkflow.md` |
```

. Write the workflow content
To Update Triggers:

Modify the single-line `description` in YAML frontmatter:
```yaml
description: [What it does]. USE WHEN [updated intent triggers using OR]. [Capabilities].
```

To Add a Tool:

. Create TitleCase tool file:```bash
touch ~/.claude/skills/[SkillName]/Tools/ToolName.ts
touch ~/.claude/skills/[SkillName]/Tools/ToolName.help.md
```

. Ensure Tools/ directory exists:```bash
mkdir -p ~/.claude/skills/[SkillName]/Tools
```

---

Step : Verify TitleCase

After making changes, verify naming:

```bash
ls ~/.claude/skills/[SkillName]/Workflows/
ls ~/.claude/skills/[SkillName]/Tools/
```

All files must use TitleCase:
- ✓ `WorkflowName.md`
- ✓ `ToolName.ts`, `ToolName.help.md`
- ✗ `workflow-name.md`, `tool_name.ts`

---

Step : Final Checklist

Naming
- [ ] New workflow files use TitleCase
- [ ] New tool files use TitleCase
- [ ] Routing table names match file names exactly

Structure
- [ ] YAML still has single-line description with USE WHEN
- [ ] No separate `triggers:` or `workflows:` arrays in YAML
- [ ] Markdown body has `Workflow Routing` section
- [ ] All routes point to existing files
- [ ] New workflow files have routing entries

---

Done

Skill updated while maintaining canonical structure and TitleCase naming.
