# PawsNClaws ATX - Project Brief

**Type:** 501(c)(3) Nonprofit Platform
**Mission:** Help Austin's animals through community coordination, resources, and sustainable funding
**Location:** Austin, TX

---

## Overview

PawsNClaws ATX is a nonprofit platform that coordinates community efforts to help local animals - stray cats, dogs, rescues, and community colonies. The platform connects volunteers, tracks animals being helped, manages donations, and provides resources to the Austin pet community.

**Not a commercial business** - all revenue streams fund the mission directly.

---

## Core Features (Priority 1 - Critical)

### 1. Animal Profiles & Tracking
- Stray/community cat profiles (location, feeding schedule, health status)
- Foster animal listings
- Adoption-ready animals
- Success stories (adopted, TNR'd, rehomed)
- Colony tracking for community cat programs

### 2. Volunteer Coordination
- Feeding route signup and scheduling
- Foster family network
- Event volunteer registration
- Volunteer hours tracking
- Communication/alerts for volunteers

### 3. Donation System
- One-time donations
- Recurring monthly donors ("Guardian Angels")
- Sponsor-a-stray program (sponsor specific animal's care)
- Corporate matching integration
- Donation impact tracking (show exactly where $ goes)
- Tax receipt generation (501c3 compliance)

### 4. Resource Directory
- Low-cost spay/neuter clinics
- Pet food banks
- Emergency vet resources
- TNR (Trap-Neuter-Return) information
- Lost & found pet board

---

## Secondary Features (Priority 2 - High)

### 5. Event Management
- Adoption events
- Fundraiser galas
- Community cat workshops
- Volunteer training sessions
- Event registration and ticketing

### 6. Impact Dashboard (Transparency)
- Animals helped this month/year
- Donations received vs spent
- Volunteer hours contributed
- Spay/neuter count
- Adoptions facilitated
- Public transparency for donors

### 7. Communication Hub
- Volunteer announcements
- Urgent animal alerts (injured stray found, etc.)
- Newsletter signup
- SMS alerts for feeding volunteers

---

## Sustainable Revenue Streams (Priority 3 - Medium)

### 8. Affiliate Partnerships
- Chewy affiliate links (commissions fund animals)
- Amazon Smile integration
- Pet supply partner discounts

### 9. Merchandise Store
- PawsNClaws branded items (shirts, mugs, stickers)
- All proceeds → animal care fund
- Integration with print-on-demand (Printful)

### 10. Grant & Sponsor Management
- Grant application tracking
- Corporate sponsor portal
- Sponsorship tier management
- Impact reports for sponsors

---

## Future Features (Priority 4 - Low)

- Mobile app for feeding route volunteers
- Pet microchip registry integration
- Veterinary partner portal
- AI-powered lost pet matching
- Community cat colony mapping (GIS)

---

## Technology Stack

**Backend:** FastAPI (Python)
**Database:** Supabase (PostgreSQL)
**Auth:** Supabase Auth (email + social login)
**Payments:** Stripe (donations, not marketplace)
**Storage:** Supabase Storage (animal photos)
**Email:** SendGrid (receipts, newsletters)
**SMS:** Twilio (volunteer alerts)
**Frontend:** Next.js (future) or simple React

---

## Database Schema

### Core Tables
- `users` - volunteer/donor accounts
- `animals` - all animals being helped
- `colonies` - community cat colony locations
- `feeding_routes` - scheduled feeding locations
- `feeding_logs` - volunteer feeding check-ins
- `fosters` - foster family profiles
- `foster_placements` - animal-to-foster assignments

### Donations
- `donations` - one-time donations
- `recurring_donations` - monthly donor subscriptions
- `sponsorships` - sponsor-a-stray relationships
- `donation_allocations` - where money was spent

### Volunteers
- `volunteer_profiles` - volunteer details, skills
- `volunteer_shifts` - scheduled volunteer activities
- `volunteer_hours` - hours tracking

### Events
- `events` - adoption events, fundraisers
- `event_registrations` - attendee signups
- `event_tickets` - paid event tickets

### Resources
- `resources` - directory of services (vets, food banks)
- `lost_found` - lost and found pet listings

---

## API Endpoints

### Public
- `GET /animals` - browsable animal profiles
- `GET /animals/{id}` - single animal detail
- `GET /events` - upcoming events
- `GET /resources` - resource directory
- `GET /impact` - public impact stats

### Donations
- `POST /donations` - process one-time donation
- `POST /donations/recurring` - setup monthly donation
- `POST /sponsorships` - sponsor specific animal
- `GET /donations/receipt/{id}` - tax receipt

### Volunteers (authenticated)
- `GET /volunteer/routes` - available feeding routes
- `POST /volunteer/routes/{id}/signup` - join a route
- `POST /volunteer/feeding-log` - log feeding visit
- `GET /volunteer/hours` - my volunteer hours

### Admin
- `POST /admin/animals` - add animal
- `PUT /admin/animals/{id}` - update animal status
- `GET /admin/donations` - donation reports
- `GET /admin/volunteers` - volunteer management

---

## Success Metrics

- Animals helped (TNR'd, fostered, adopted)
- Active volunteers
- Monthly recurring donors
- Donation growth rate
- Volunteer retention rate
- Community colonies stabilized

---

## Constraints

- Must maintain 501(c)(3) compliance
- All financials must be transparent
- No commercial profit motive
- Privacy for volunteer addresses
- Animal welfare as #1 priority in all decisions

---

## Reference Organizations

- Austin Pets Alive!
- Austin Humane Society
- Shadow Cats (TNR focused)
- Alley Cat Allies (national model)

---

*This is a passion project to help Austin's animals. Every feature should ask: "Does this help more animals?"*
