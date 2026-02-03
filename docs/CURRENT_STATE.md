# Current Project State

**This is the AUTHORITATIVE source for volatile project state.**

**Last Updated**: 2026-02-02
**Updated By**: Claude Opus 4.5 (Scroll fix + design session)

---

## Active Work

| Area | Status | Agent | Notes |
|------|--------|-------|-------|
| Scroll-to-top | Complete | - | Fixed navigation scroll issue |
| Design/Spacing | Complete | - | Tightened hero-to-stats spacing |
| Form Validation | Complete | - | All forms migrated to useFormValidation |
| Web | Clean | - | Build passes, lint clean |
| Deployment | Auto | - | GitHub connected to Vercel for auto-deploy |

---

## Blocking Issues

| Issue | Severity | Required Action |
|-------|----------|-----------------|
| ~~Vercel auto-deploy~~ | Resolved | GitHub connected via CLI |
| Supabase schema | Unknown | Verify schema applied to database |

---

## Recent Changes (Last 7 Days)

| Date | Change | Commit |
|------|--------|--------|
| 2026-02-02 | Tighter hero/section spacing on city pages | 5736ee0 |
| 2026-02-02 | Tighter hero-to-stats spacing on homepage | d5463d5 |
| 2026-02-02 | Fixed scroll-to-top on navigation | d05b10d |
| 2026-02-02 | Complete form validation migration | 97bb194 |
| 2026-02-02 | Documentation system established | 68f6e2b |

---

## Environment Status

| Service | URL | Status |
|---------|-----|--------|
| Web (prod) | https://pawsandclawsatx.com | Live |
| Web (local) | http://localhost:3000 | Run with `cd apps/web && npm run dev` |
| Supabase | (from .env) | Check dashboard |
| Stripe | (from .env) | Check dashboard |

---

## Quick Commands

```bash
# Start web
cd apps/web && npm run dev

# Type check
cd apps/web && npm run typecheck

# Build
cd apps/web && npm run build

# Deploy to production (REQUIRED - auto-deploy not configured)
cd apps/web && npx vercel --prod

# Check git state
git status && git log --oneline -5
```

---

## Notes for Next Agent

- **Vercel auto-deploy enabled**: GitHub is connected. Pushes to master will auto-deploy.
- Scroll-to-top fix uses `scroll={false}` on Links + ScrollToTop component
- ScrollToTop.tsx in components handles scrolling to 0 on route change
- Removed `scroll-behavior: smooth` from globals.css (was interfering with scroll)
- Hero padding reduced to `py-12 lg:py-16`, stats section uses `pt-8 pb-16`
- Same spacing applied to /cities and /cities/charlotte pages
- All forms use useFormValidation hook with Zod schemas
- Build and lint both pass cleanly
