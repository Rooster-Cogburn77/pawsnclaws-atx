# PawsNClaws ATX

**A community resource hub helping Austin's animals**

## What This Is

A simple website connecting Austin residents with resources to help local animals:

- **Resource Directory** - Low-cost vets, pet food assistance, TNR programs, emergency services
- **Ways to Help** - Links to volunteer, foster, donate, and adopt
- **Information** - About community cats, local shelters, and how to help strays

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (planned)

## Getting Started

```bash
cd apps/web
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
pawsnclaws-atx/
  apps/
    web/                  # Next.js site
      src/
        app/              # Pages (home, resources, get-involved, about)
        components/       # Shared components
        data/             # Content as TypeScript (easy to edit)
  docs/                   # Documentation
```

## Updating Content

All content lives in `apps/web/src/data/`:

- `resources.ts` - Austin-area resources (vets, shelters, etc.)
- `ways-to-help.ts` - Volunteer/donate/foster information
- `site-config.ts` - Site-wide configuration

Just edit these files - no database needed.

## Deployment

```bash
cd apps/web
npm run build   # Creates static export
```

Deploy the `apps/web/.next` folder to any static host (Vercel, Netlify, GitHub Pages).

## Future Ideas

- Contact form (probably Formspree)
- Lost & found board
- Volunteer coordination features
- Community cat colony map

## License

MIT
