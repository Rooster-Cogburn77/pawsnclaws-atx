# Documentation Architecture

How PawsNClaws ATX documentation is organized.

---

## Principles

1. **Single Source of Truth** - Each piece of info lives in one place
2. **Reference, Don't Duplicate** - Link to source, never copy
3. **Separate Stable from Volatile** - Context vs current state

---

## Document Hierarchy

```
CLAUDE.md (STABLE - project identity)
├── Tech stack, structure, decisions, gotchas
└── Links to other docs

docs/
├── CURRENT_STATE.md (VOLATILE - updates every session)
│   └── Active work, blocking issues, recent changes
│
├── SESSION_LOG.md (APPEND-ONLY)
│   └── Chronological session history
│
├── AGENT_COORDINATION.md (STABLE - process)
│   └── How agents work together
│
├── PLAYBOOK.md (STABLE - nonprofit strategy)
│   └── Full operational guide
│
└── CITY_SETUP.md (STABLE - deployment)
    └── Multi-city setup guide
```

---

## Single Source of Truth

| Information | Authoritative Source |
|-------------|---------------------|
| Project context | CLAUDE.md |
| Current work status | docs/CURRENT_STATE.md |
| Session history | docs/SESSION_LOG.md |
| Coordination process | docs/AGENT_COORDINATION.md |
| Nonprofit operations | docs/PLAYBOOK.md |
| Decisions | CLAUDE.md (Decisions Log) |
| Gotchas | CLAUDE.md (Known Gotchas) |

---

## Update Responsibilities

| Event | Update |
|-------|--------|
| Session start | Note focus in CURRENT_STATE.md |
| Session end | SESSION_LOG.md + CURRENT_STATE.md |
| Decision made | CLAUDE.md Decisions Log |
| Gotcha found | CLAUDE.md Known Gotchas |

---

## For Other Projects

To use this system elsewhere:
1. Copy CLAUDE.md template
2. Copy docs/ structure
3. Adapt to project's tech stack
4. Follow the principles
