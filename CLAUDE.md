# PawsNClaws ATX - Claude Code Project Context

This file is automatically read by Claude Code at the start of each session.

---

## Session Quick Start

```bash
git pull
git status          # Check for uncommitted work
git log --oneline -5
```

**Then read:**
1. This file (CLAUDE.md) - required
2. `docs/CURRENT_STATE.md` - what's happening now
3. `docs/SESSION_LOG.md` - recent session history

**Before ending session:**
- Commit and push all work
- Update `docs/CURRENT_STATE.md`
- Add entry to `docs/SESSION_LOG.md`

---

## User Preferences

### Permissions
- **Blanket permission to make changes** - Don't ask for confirmation
- **Work autonomously** - Make good decisions and execute
- **Be direct** - No excessive pleasantries

### Quality Standards
- **Production-quality code**
- **Test before saying done**
- **Don't use emojis** unless requested

---

## Current State (Volatile)

**See `docs/CURRENT_STATE.md`** for:
- Active work and blocking issues
- Recent changes
- Environment status

---

## Project Overview

PawsNClaws ATX is a community resource hub helping Austin's animals. Features include colony mapping, TNR coordination, foster programs, donations, and volunteer management.

### Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1.4, React 19 |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| Maps | Leaflet + OpenStreetMap |
| State | Zustand |
| Hosting | Vercel |

### Repository Structure

```
pawsnclaws-atx/
├── apps/
│   └── web/                    # Next.js app
│       └── src/
│           ├── app/            # Pages (40+ routes)
│           ├── components/     # React components
│           ├── data/           # Content as TypeScript
│           ├── lib/            # Utilities, Supabase client
│           ├── hooks/          # Custom hooks
│           └── config/         # Site configuration
├── supabase/
│   ├── schema.sql              # Database schema
│   └── schema-fixed.sql        # Updated schema
├── docs/
│   ├── PLAYBOOK.md             # Full nonprofit playbook
│   └── CITY_SETUP.md           # Multi-city deployment
├── tools/                      # Logo prompts, research
└── .conductor/                 # Multi-agent tooling
```

---

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/map` | Colony map (Leaflet) |
| `/map/submit` | Submit colony report |
| `/donate` | Donation page (Stripe) |
| `/foster` | Foster program info |
| `/volunteer` | Volunteer signup |
| `/help/*` | Assistance programs (vet fund, deposit help) |
| `/lost-found` | Lost & found board |
| `/admin/*` | Admin dashboard |
| `/resources` | Resource directory |
| `/directory` | Local services |

---

## Key Files

| Purpose | File |
|---------|------|
| Homepage | `apps/web/src/app/page.tsx` |
| Layout | `apps/web/src/app/layout.tsx` |
| Supabase client | `apps/web/src/lib/supabase.ts` |
| Site config | `apps/web/src/config/site.ts` |
| API routes | `apps/web/src/app/api/` |
| Components | `apps/web/src/components/` |

---

## How to Run

```bash
cd apps/web
npm install
npm run dev
```

Visit http://localhost:3000

### Environment Variables

Create `apps/web/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
STRIPE_SECRET_KEY=your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
```

---

## Database (Supabase)

Schema files in `supabase/`:
- `schema.sql` - Original schema
- `schema-fixed.sql` - Updated schema

Key tables (from schema):
- `colonies` - Cat colony locations
- `colony_cats` - Individual cats in colonies
- `foster_applications` - Foster signups
- `donations` - Donation records
- `volunteers` - Volunteer signups
- `events` - Community events

---

## Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Next.js 16 + React 19 | Latest stable, good DX | Jan 2026 |
| Supabase direct (no API layer) | Simpler for nonprofit scale | Jan 2026 |
| Content in TypeScript files | Easy editing, no CMS needed | Jan 2026 |
| Leaflet for maps | Free, open source | Jan 2026 |

---

## Known Gotchas

| Issue | Workaround |
|-------|------------|
| Supabase RLS | Ensure policies allow public reads where needed |
| Stripe webhooks | Must configure endpoint in Stripe dashboard |
| Map SSR | Leaflet must be dynamically imported (no SSR) |

---

## Git Workflow

```bash
git pull
# ... work ...
git add <files>
git commit -m "feat: description"
git push
```

Branch: `master` | Format: `feat:`, `fix:`, `docs:`

---

## Documentation System

| What | Where |
|------|-------|
| Project context | CLAUDE.md (this file) |
| Current status | docs/CURRENT_STATE.md |
| Session history | docs/SESSION_LOG.md |
| Coordination | docs/AGENT_COORDINATION.md |
| Full playbook | docs/PLAYBOOK.md |

---

## Resources

- **Supabase Dashboard**: (configure in .env)
- **Vercel**: (deployment target)
- **Playbook**: `docs/PLAYBOOK.md` - comprehensive nonprofit guide
