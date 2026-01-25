# PawsNClaws ATX

**A 501(c)(3) nonprofit platform helping Austin's animals**

## Mission

PawsNClaws ATX coordinates community efforts to help local animals - stray cats, dogs, rescues, and community colonies. We connect volunteers, track animals being helped, manage donations, and provide resources to the Austin pet community.

## Features

- **Animal Tracking** - Profiles for strays, fosters, and adoptable animals
- **Volunteer Coordination** - Feeding routes, foster network, event volunteers
- **Donation System** - One-time, recurring, and sponsor-a-stray programs
- **Resource Directory** - Low-cost vet services, food banks, TNR info
- **Events** - Adoption events, fundraisers, community workshops
- **Impact Dashboard** - Transparent reporting of where donations go

## Tech Stack

- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe (donations)
- **Email:** SendGrid
- **SMS:** Twilio

## Getting Started

```bash
# Clone the repo
git clone https://github.com/pawsnclaws-atx/pawsnclaws-atx.git
cd pawsnclaws-atx

# Install dependencies
cd packages/api
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Run the API
uvicorn app.main:app --reload
```

## Contributing

We welcome volunteers! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is open source under the MIT License.

---

*Every feature asks: "Does this help more animals?"*
