# Agent Coordination Guide

Protocols for managing Claude Code agents on PawsNClaws ATX.

---

## Quick Start for New Agents

### 1. Git Sync
```bash
git pull
git status           # Check for uncommitted work
git log --oneline -5
```

### 2. Read Context (in order)
```
1. CLAUDE.md                  # Project context (REQUIRED)
2. docs/CURRENT_STATE.md      # What's happening now (REQUIRED)
3. docs/SESSION_LOG.md        # Recent history
```

### 3. Verify Environment
```bash
cd apps/web && npm run dev
# Visit http://localhost:3000
```

### 4. Update State
Update `docs/CURRENT_STATE.md` with your focus area.

---

## Session End Protocol

1. **Commit all work**
   ```bash
   git add <files>
   git commit -m "feat: description"
   git push
   ```

2. **Update docs/CURRENT_STATE.md**
   - Update Active Work table
   - Add to Recent Changes

3. **Add entry to docs/SESSION_LOG.md**

---

## Parallel Work

If multiple agents are working:

- **Pull before starting**
- **Push after each feature**
- **Don't modify same files simultaneously**

---

## Recovery After Crash

1. Check `git status` for uncommitted work
2. Check `git log` for last commit
3. Review `docs/SESSION_LOG.md` for context
4. Either commit WIP or discard and start fresh

---

## File Ownership

| File | Updates When |
|------|--------------|
| CLAUDE.md | Decisions made, gotchas found |
| docs/CURRENT_STATE.md | Every session |
| docs/SESSION_LOG.md | Every session (append) |
| docs/PLAYBOOK.md | Nonprofit strategy changes |
