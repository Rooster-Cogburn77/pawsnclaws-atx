# Current Project State

**This is the AUTHORITATIVE source for volatile project state.**

**Last Updated**: 2026-02-03
**Updated By**: Claude Opus 4.5 (501(c)(3) filing session)

---

## Legal Status

| Item | Status | Details |
|------|--------|---------|
| Texas Nonprofit Corp | Done | Filed March 2025 |
| EIN | Done | **41-4047996** |
| 501(c)(3) | Pending | Filed 2/3/26, Tracking ID: 77286221872 |
| Legal Name | Set | Paws and Claws ATX |
| Registered Agent | Bryan Moore | 206 Waller St, Austin, TX 78702 |

---

## Master Checklist

### Tech (Website/Systems)

- [x] Website live at pawsandclawsatx.com
- [x] Vercel auto-deploy from GitHub
- [x] Form validation on all forms
- [x] EIN added to site (41-4047996)
- [x] 501(c)(3) claims updated to "pending"
- [ ] Supabase database - verify schema applied, test connection
- [ ] Stripe payments - add real keys, test donation flow
- [ ] Map - test with real colony submission
- [ ] Form submissions - verify API routes save data
- [ ] Email service - set up Resend/SendGrid for transactional email
- [ ] Domain email - hello@pawsandclawsatx.com via Google Workspace
- [ ] Analytics - confirm Vercel Analytics working
- [ ] Charlotte expansion - decide: launch or remove pages
- [ ] Update site when 501(c)(3) approved (remove "pending")

### Operations (Physical/Charity)

- [ ] Open bank account (use EIN 41-4047996)
- [ ] Board of Directors - confirm 3 members minimum per bylaws
- [ ] Recruit first volunteers
- [ ] Recruit first foster families
- [ ] Contact TNR partners (Austin Humane Society, Emancipet, AAC)
- [ ] Establish vet partner relationships
- [ ] Set up food supply/donation pipeline
- [ ] Build first outdoor feeding station
- [ ] Document first colony
- [ ] Create social media presence (Instagram, Facebook)
- [ ] Get nonprofit liability insurance
- [ ] Set up donation tracking system for receipts/990

### Legal/Admin (Future)

- [ ] Annual Texas filing (due annually to TX SOS)
- [ ] Form 990 (due after first fiscal year ends Dec 31)
- [ ] 501(c)(3) determination letter (expected 2-6 months from 2/3/26)

---

## Active Work

| Area | Status | Notes |
|------|--------|-------|
| 501(c)(3) | Pending | Filed 2/3/26, wait for IRS |
| Bank Account | Next | Open with Mercury or Chase |
| Website | Clean | Build passes, lint clean |
| Deployment | Auto | GitHub → Vercel working |

---

## Blocking Issues

| Issue | Severity | Required Action |
|-------|----------|-----------------|
| No bank account | High | Can't accept donations properly |
| 501(c)(3) pending | Medium | Can't claim tax-deductible yet |
| Supabase schema | Unknown | Verify schema applied to database |

---

## Recent Changes

| Date | Change | Commit |
|------|--------|--------|
| 2026-02-03 | 501(c)(3) status pending, EIN added | 9dc302f |
| 2026-02-02 | Tighter hero/section spacing on city pages | 5736ee0 |
| 2026-02-02 | Vercel.json for monorepo auto-deploy | 51b7dd2 |
| 2026-02-02 | Fixed scroll-to-top on navigation | d05b10d |
| 2026-02-02 | Complete form validation migration | 97bb194 |

---

## Environment Status

| Service | URL | Status |
|---------|-----|--------|
| Web (prod) | https://pawsandclawsatx.com | Live |
| Web (local) | http://localhost:3000 | `cd apps/web && npm run dev` |
| Supabase | (from .env) | Needs verification |
| Stripe | (from .env) | Needs real keys |

---

## Quick Commands

```bash
# Start web
cd apps/web && npm run dev

# Type check
cd apps/web && npm run typecheck

# Build
cd apps/web && npm run build

# Check git state
git status && git log --oneline -5
```

---

## Key Info for Reference

```
EIN: 41-4047996
Legal Name: Paws and Claws ATX
501(c)(3) Tracking ID: 77286221872
501(c)(3) Pay.gov ID: 27V9KTE7
Filed: February 3, 2026
Expected Approval: April-August 2026
```

---

## Notes for Next Agent

- 501(c)(3) filed via Form 1023-EZ on 2/3/26
- Site updated to say "501(c)(3) status pending" everywhere
- EIN 41-4047996 replaced all XX-XXXXXXX placeholders
- User needs to open bank account next
- Texas nonprofit registration done March 2025
- Vercel auto-deploy working - pushes to master deploy automatically
