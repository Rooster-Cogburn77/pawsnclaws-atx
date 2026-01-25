# City Setup Guide

Launch a community cat nonprofit website for your city in under an hour.

## Quick Start

### 1. Fork the Repository

```bash
# Clone the repo
git clone https://github.com/pawsnclaws/pawsnclaws-template.git pawsnclaws-[yourcity]
cd pawsnclaws-[yourcity]

# Install dependencies
cd apps/web
npm install
```

### 2. Configure Your City

Edit `apps/web/src/config/city.ts`:

```typescript
export const cityConfig: CityConfig = {
  city: "Denver",
  state: "Colorado",
  stateAbbrev: "CO",
  region: "Front Range",
  tagline: "Helping Denver's community cats thrive",

  orgName: "Paws N Claws Denver",
  orgNameShort: "PawsNClaws DEN",
  email: "hello@pawsnclawsdenver.org",

  map: {
    center: [39.7392, -104.9903], // Denver coordinates
    defaultZoom: 12,
  },

  resources: {
    shelterName: "Denver Animal Shelter",
    shelterUrl: "https://www.denvergov.org/shelters",
    tnrProgram: "Denver Dumb Friends League TNR",
    tnrUrl: "https://www.ddfl.org/tnr",
  },

  // Enable/disable features based on your capacity
  features: {
    donations: true,
    fostering: true,
    colonyMap: true,
    foodStations: false, // Enable when ready
    lostAndFound: true,
    events: true,
    corporate: false, // Enable when you have corporate partnerships
    surrenderPrevention: true,
    vetFund: true,
    depositAssistance: true,
  },

  // ... rest of config
};
```

### 3. Set Up Services (Free Tiers Available)

#### Vercel (Hosting) - Free
1. Create account at [vercel.com](https://vercel.com)
2. Import your forked repo
3. Deploy

#### Supabase (Database) - Free tier
1. Create project at [supabase.com](https://supabase.com)
2. Run the SQL migrations from `/supabase/migrations/`
3. Copy your project URL and anon key to `.env.local`

#### Stripe (Donations) - Free until you process payments
1. Create account at [stripe.com](https://stripe.com)
2. Get your publishable key and secret key
3. Add to `.env.local`

### 4. Environment Variables

Create `apps/web/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Site
NEXT_PUBLIC_SITE_URL=https://pawsnclaws-denver.vercel.app
```

### 5. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 6. Custom Domain (Optional)

1. Buy a domain (e.g., pawsnclawsdenver.org)
2. Add to Vercel project settings
3. Update DNS records as instructed

---

## Feature Guide

### Colony Map
- Public can submit colony reports at `/map/submit`
- Admin reviews at `/admin/colonies`
- Approved colonies appear on public map at `/map`
- Uses Leaflet (free, no API key needed)

### Donations
- Powered by Stripe
- One-time and monthly recurring
- Multiple preset amounts
- Corporate matching info

### Foster Program
- Application form at `/foster`
- Admin review at `/admin/fosters`
- Foster resources and supplies

### Events
- List events at `/events`
- Signup forms
- Admin management at `/admin/events`

### Lost & Found
- Report lost/found pets at `/lost-found/report`
- Browse listings at `/lost-found`
- Admin moderation at `/admin/lost-found`

### Corporate Partnerships
- Landing page at `/corporate`
- Matching gifts tool
- Workplace giving info
- Volunteer events
- Foster Friendly certification

---

## Customization

### Colors
The site uses Tailwind CSS. Primary color is configurable:

```typescript
branding: {
  primaryColor: "amber", // Try: blue, green, rose, purple
}
```

### Logo
1. Generate using prompts in `/tools/logo-prompts.md`
2. Add to `public/logo.svg`
3. Update config:
```typescript
branding: {
  logoUrl: "/logo.svg",
  faviconUrl: "/favicon.ico",
}
```

### Content
Most content is in the page files under `apps/web/src/app/`. Edit directly or use the config system for dynamic content.

---

## Database Schema

See `/supabase/migrations/` for full schema. Key tables:

- `colonies` - Approved colony locations
- `colony_submissions` - Pending submissions
- `donations` - Donation records
- `fosters` - Foster applications
- `events` - Event listings
- `volunteers` - Volunteer signups

---

## Legal Considerations

### Operating as Your Own 501(c)(3)
- File for your own tax-exempt status
- Complete independence
- Full control over funds and operations

### Fiscal Sponsorship (Recommended for Quick Start)
- Partner with existing 501(c)(3) in your area
- They handle tax-exempt status, you handle operations
- Can "graduate" to own status later

### Affiliation with PawsNClaws Network
- Share resources and best practices
- No formal legal relationship required
- Join our Discord for support

---

## Support

- **GitHub Issues**: Technical problems
- **Discord**: Community support (link TBD)
- **Email**: opensource@pawsandclawsatx.com

---

## Contributing Back

Found a bug? Added a feature? We'd love your contributions:

1. Fork the main template repo
2. Make your changes
3. Submit a pull request

All improvements benefit every city using the template.
