# USER/ — Your Identity Layer

This directory holds everything PAI knows about you: identity,
goals, projects, work context. Files here are loaded by `CLAUDE.md`
@-imports at every session start, so the assistant boots aware of who you
are and what you're working on.

## Layout

```
PAI/USER/
 PRINCIPAL_IDENTITY.md   # Concise identity (loaded at startup)
 PROJECTS/PROJECTS.md    # Project registry + routing aliases (loaded at startup)
 Config/PAI_CONFIG.yaml  # Credentials and config keys
 RESUME.md               # Career detail
 CONTACTS.md             # People you work with
 WRITINGSTYLE.md         # How you write
 RHETORICALSTYLE.md      # How you argue
 OPINIONS.md             # The assistant's opinions on working with you
 OUR_STORY.md            # The relationship between you and your assistant
 DEFINITIONS.md          # Canonical terms in your vocabulary
 CORECONTENT.md          # The themes you write/talk about
 AI_WRITING_PATTERNS.md  # Writing patterns to avoid
 ARCHITECTURE.md         # How your PAI fits together
 FEED.md                 # Sources you read
 PRONUNCIATIONS.md       # Words the assistant needs to say correctly
 (subdirs) BUSINESS/, FINANCES/, HEALTH/
```

## Bootstrap


## Privacy

Everything in this directory is **private** and never ships in any PAI
release. The release builder (`skills/_PAI/Tools/ShadowRelease.ts`)
deletes the entire `USER/` tree from staging and overlays generic
scaffolds in its place.
