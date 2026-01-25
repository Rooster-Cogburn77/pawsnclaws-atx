# PawsNClaws Community Cat Nonprofit Playbook

A complete guide to launching and running a community cat support nonprofit, from code to cats.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Tech Stack](#tech-stack)
3. [Programs](#programs)
4. [Funding](#funding)
5. [Partnerships](#partnerships)
6. [Operations](#operations)
7. [Growth](#growth)

---

## Philosophy

### Why Community Cats?

An estimated **60-70 million** community (feral/stray) cats live in the United States. Traditional catch-and-kill approaches have failed for decades. TNR (Trap-Neuter-Return) is proven to:

- Humanely reduce populations over time
- Eliminate nuisance behaviors (spraying, fighting, yowling)
- Cost less than repeated removal
- Build community support and volunteer engagement

### Our Approach

1. **Support existing caretakers** - Most colonies already have someone feeding them
2. **Connect resources** - Link caretakers to TNR programs, food banks, vet care
3. **Track and coordinate** - Map colonies to prevent duplication and identify needs
4. **Educate** - Change public perception from "pest" to "community member"
5. **Prevent** - Keep cats in homes through surrender prevention programs

### No Judgment

We never blame caretakers or communities. Everyone is doing their best with what they have. We're here to help, not judge.

---

## Tech Stack

### Why This Stack?

- **Free or near-free** at startup scale
- **No coding required** after initial setup
- **Scales** as you grow
- **Modern** and maintainable

### Components

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Next.js on Vercel | Free |
| Database | Supabase | Free tier |
| Payments | Stripe | 2.9% + $0.30 per transaction |
| Email | (Your choice) | Varies |
| Maps | Leaflet + OpenStreetMap | Free |
| Analytics | Vercel Analytics | Free tier |

### Total Monthly Cost at Launch: $0

You only pay Stripe fees when you receive donations.

---

## Programs

### 1. Colony Mapping & Support

**Goal**: Know where every colony is, who's caring for it, what they need.

**How It Works**:
- Public submits colony reports via website
- Admin reviews and approves
- Approved colonies appear on map
- Caretakers can request supplies, TNR help, vet care

**Metrics to Track**:
- Total colonies mapped
- Total cats tracked
- Colonies with active caretakers
- TNR completion rate

### 2. TNR Coordination

**Goal**: Get every community cat fixed.

**How It Works**:
- Identify colonies needing TNR
- Connect caretakers with local TNR programs
- Track ear-tipped (fixed) vs unfixed cats
- Provide traps on loan

**Local Partners to Find**:
- City/county animal services (often free TNR)
- Low-cost spay/neuter clinics
- Humane societies with community cat programs

### 3. Food & Supply Support

**Goal**: No caretaker should struggle to feed their colony.

**How It Works**:
- Accept food donations (drives, wish lists, corporate)
- Set up food station network at partner businesses
- Distribute to caretakers in need
- Track monthly food costs per colony

**Food Station Model**:
1. Partner with local business (coffee shop, vet, pet store)
2. They host a donation bin
3. Volunteers collect weekly
4. Distribute to caretakers

### 4. Emergency Vet Fund

**Goal**: No community cat dies from a treatable condition.

**How It Works**:
- Caretakers apply for assistance
- Verify need and colony status
- Pay vet directly (not caretaker)
- Cap per cat/per colony/per year

**Suggested Caps**:
- $200 per cat
- $500 per colony per year
- Emergency only (not routine care)

### 5. Foster Program

**Goal**: Place friendly strays and socialized kittens in homes.

**How It Works**:
- Application and vetting process
- Provide supplies (starter kit, ongoing food)
- Support fosters with resources and community
- Coordinate with adoption partners

**Not Every Cat Is Adoptable**:
- True ferals → TNR and return
- Friendly strays → Foster and adopt
- Kittens under 8 weeks → Can be socialized

### 6. Surrender Prevention

**Goal**: Keep cats in homes when possible.

**How It Works**:
- Owner contacts us before surrendering
- We identify the actual problem (cost, housing, behavior)
- Provide targeted support (vet fund, supplies, resources)
- Only accept surrender as last resort

**Common Issues We Can Help With**:
- Can't afford vet care → Vet fund / low-cost referrals
- Moving and can't take cat → Housing resources / temporary foster
- Behavior problems → Education and resources
- Allergies → Air purifiers, grooming tips, sometimes rehoming

### 7. Pet Deposit Assistance

**Goal**: Housing shouldn't separate families.

**How It Works**:
- Renter applies when facing large pet deposit
- We verify need and lease terms
- Provide one-time grant toward deposit
- Funds go directly to landlord

**This Prevents**:
- Cats surrendered due to moving
- Cats abandoned at old address
- New outdoor cats becoming new colonies

---

## Funding

### Donation Tiers

| Tier | Amount | What It Covers |
|------|--------|----------------|
| Kibble | $10 | 1 week of food for 1 cat |
| Colony Supporter | $25/mo | Food for a small colony |
| TNR Hero | $75 | Spay/neuter 1 cat |
| Colony Sponsor | $150/mo | Full support for 1 colony |
| Emergency Fund | Any | Vet care for sick/injured cats |

### Revenue Streams

1. **Individual Donations** - One-time and recurring
2. **Corporate Matching** - Double donations through employer programs
3. **Corporate Sponsorship** - Businesses sponsor colonies or programs
4. **Grants** - PetSmart Charities, Petco Love, local foundations
5. **Fundraising Events** - Cat cafes, adoption events, galas
6. **Merchandise** - T-shirts, stickers, etc. (low margin, good for awareness)

### Corporate Partnership Tiers

| Tier | Annual | Benefits |
|------|--------|----------|
| Bronze | $1,000 | Logo on website, social shoutout |
| Silver | $2,500 | + Event recognition, newsletter feature |
| Gold | $5,000 | + Named colony sponsorship, volunteer events |
| Platinum | $10,000+ | + Custom partnership, board recognition |

---

## Partnerships

### Who to Partner With

**Animal Services**:
- City/county shelters (TNR programs, transfer animals)
- Humane societies (resources, adoptions, spay/neuter)
- Other rescues (foster network, shared resources)

**Veterinary**:
- Low-cost clinics (discounted care)
- Emergency vets (after-hours protocols)
- Mobile clinics (colony-site TNR)

**Businesses**:
- Pet stores (food donations, adoption events)
- Coffee shops/cafes (food stations, awareness)
- Corporate sponsors (funding, volunteers, matching)

**Community**:
- Neighborhood associations (colony caretaker networks)
- Property managers (TNR education, prevention)
- Schools (education programs)

### Partnership Pitch Template

> Hi [Name],
>
> I'm reaching out from [Org Name], a local nonprofit supporting community cats through TNR, colony care, and foster programs.
>
> We're looking for partners who [specific ask - host food station / sponsor colony / etc.].
>
> In return, we offer [specific benefit - recognition / volunteer events / good PR].
>
> Would you have 15 minutes to chat about how we might work together?
>
> Best,
> [Your name]

---

## Operations

### Volunteer Roles

| Role | Time | Skills |
|------|------|--------|
| Colony Caretaker | Daily | Feeding, monitoring |
| TNR Trapper | As needed | Physical, early mornings |
| Transport | As needed | Vehicle, flexibility |
| Foster | Ongoing | Space, patience |
| Admin/Data | Weekly | Computer, detail-oriented |
| Events | Monthly | People skills, logistics |
| Social Media | Weekly | Writing, creativity |

### Admin Dashboard

Your site includes admin pages at `/admin/*`:

- `/admin` - Overview dashboard
- `/admin/colonies` - Review colony submissions
- `/admin/fosters` - Foster applications
- `/admin/donations` - Donation records
- `/admin/volunteers` - Volunteer signups
- `/admin/events` - Event management

### Metrics That Matter

**Impact**:
- Cats TNR'd
- Colonies fully fixed
- Fosters placed
- Surrenders prevented

**Health**:
- Monthly recurring donations
- Donor retention rate
- Volunteer retention rate
- Cost per cat helped

---

## Growth

### Phase 1: Foundation (Months 1-3)

- [ ] Launch website
- [ ] Set up donation processing
- [ ] Map first 10 colonies
- [ ] Recruit 5 volunteers
- [ ] Partner with 1 TNR provider
- [ ] First social media presence

### Phase 2: Operations (Months 4-6)

- [ ] Process first 50 TNRs
- [ ] Launch foster program
- [ ] Set up 3 food stations
- [ ] $1,000/month in donations
- [ ] First corporate sponsor
- [ ] First community event

### Phase 3: Scale (Months 7-12)

- [ ] 50+ colonies mapped
- [ ] 10+ active fosters
- [ ] 10+ food stations
- [ ] $5,000/month in donations
- [ ] 3+ corporate sponsors
- [ ] Apply for grants
- [ ] Consider 501(c)(3) status

### Phase 4: Sustainability (Year 2+)

- [ ] 100+ colonies mapped
- [ ] Full-time coordinator (paid)
- [ ] Multiple revenue streams
- [ ] Regional recognition
- [ ] Help other cities launch

---

## Resources

### TNR Best Practices
- [Alley Cat Allies](https://www.alleycat.org/)
- [Best Friends Animal Society](https://bestfriends.org/community-cats)

### Nonprofit Management
- [National Council of Nonprofits](https://www.councilofnonprofits.org/)
- [Guidestar/Candid](https://www.guidestar.org/)

### Grants for Animal Welfare
- PetSmart Charities
- Petco Love
- ASPCA Grants
- Maddie's Fund
- Local community foundations

### This Codebase
- [City Setup Guide](./CITY_SETUP.md)
- [Logo Prompts](/tools/logo-prompts.md)
- [Corporate Research](/tools/corporate-partnership-research.md)

---

## License

This playbook and the associated codebase are open source under the MIT License. Use it, modify it, share it. Help the cats.

---

*Built with love in Austin, TX by PawsNClaws ATX*
