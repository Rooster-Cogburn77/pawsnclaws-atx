-- PawsNClaws ATX - Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables

-- =============================================
-- VOLUNTEERS & FOSTERS
-- =============================================
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  skills TEXT[] DEFAULT '{}',
  availability TEXT,
  is_foster_approved BOOLEAN DEFAULT FALSE,
  background_check BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'rejected')),
  notes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_status ON volunteers(status);

-- =============================================
-- DEPOSIT ASSISTANCE
-- =============================================
CREATE TABLE IF NOT EXISTS deposit_assistance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  pet_name TEXT NOT NULL,
  pet_species TEXT,
  landlord_name TEXT,
  landlord_contact TEXT,
  deposit_amount INTEGER NOT NULL, -- in cents
  amount_approved INTEGER, -- in cents
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'disbursed', 'repaid')),
  notes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deposit_status ON deposit_assistance(status);

-- =============================================
-- SURRENDER PREVENTION
-- =============================================
CREATE TABLE IF NOT EXISTS surrender_prevention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT NOT NULL,
  pet_info TEXT NOT NULL,
  reason TEXT NOT NULL,
  assistance_needed TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'surrendered', 'closed')),
  assigned_volunteer UUID REFERENCES volunteers(id),
  notes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_surrender_status ON surrender_prevention(status);

-- =============================================
-- VET FUND REQUESTS
-- =============================================
CREATE TABLE IF NOT EXISTS vet_fund_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requestor_name TEXT NOT NULL,
  requestor_email TEXT NOT NULL,
  requestor_phone TEXT,
  pet_name TEXT NOT NULL,
  pet_species TEXT,
  vet_clinic TEXT,
  diagnosis TEXT NOT NULL,
  estimated_cost INTEGER NOT NULL, -- in cents
  amount_approved INTEGER, -- in cents
  proof_of_income TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'paid', 'closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vet_fund_status ON vet_fund_requests(status);

-- =============================================
-- LOST & FOUND
-- =============================================
CREATE TABLE IF NOT EXISTS lost_found (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  species TEXT NOT NULL,
  breed TEXT,
  name TEXT,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  location_last_seen TEXT,
  location_found TEXT,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  microchip_id TEXT,
  photos TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reunited', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lost_found_type ON lost_found(type);
CREATE INDEX idx_lost_found_status ON lost_found(status);
CREATE INDEX idx_lost_found_species ON lost_found(species);

-- =============================================
-- SPONSORS
-- =============================================
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  website TEXT,
  logo_url TEXT,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum', 'champion')),
  is_active BOOLEAN DEFAULT FALSE,
  display_on_site BOOLEAN DEFAULT FALSE,
  start_date DATE,
  end_date DATE,
  benefits JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sponsors_active ON sponsors(is_active);
CREATE INDEX idx_sponsors_tier ON sponsors(tier);

-- =============================================
-- DONATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  donor_name TEXT,
  donor_email TEXT,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  donation_type TEXT DEFAULT 'one-time' CHECK (donation_type IN ('one-time', 'monthly', 'campaign')),
  campaign_id UUID,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_type ON donations(donation_type);
CREATE INDEX idx_donations_created ON donations(created_at);

-- =============================================
-- CAMPAIGNS (Fundraising)
-- =============================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  goal_amount INTEGER NOT NULL, -- in cents
  current_amount INTEGER DEFAULT 0, -- in cents
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_active ON campaigns(is_active);
CREATE INDEX idx_campaigns_slug ON campaigns(slug);

-- =============================================
-- CONTACT MESSAGES
-- =============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  reason TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);

-- =============================================
-- NEWSLETTER SUBSCRIBERS
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- =============================================
-- EVENTS
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('volunteer', 'community', 'training', 'adoption', 'fundraiser')),
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  max_spots INTEGER,
  current_signups INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_active ON events(is_active);

-- =============================================
-- EVENT SIGNUPS
-- =============================================
CREATE TABLE IF NOT EXISTS event_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  notes TEXT,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no_show', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_signups_event ON event_signups(event_id);

-- =============================================
-- FOOD STATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS food_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  hours TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_food_stations_active ON food_stations(is_active);

-- =============================================
-- TRIGGER: Update updated_at timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'updated_at'
    AND table_schema = 'public'
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;
      CREATE TRIGGER update_%I_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', t, t, t, t);
  END LOOP;
END;
$$ language 'plpgsql';

-- =============================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =============================================
-- Enable RLS on all tables
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposit_assistance ENABLE ROW LEVEL SECURITY;
ALTER TABLE surrender_prevention ENABLE ROW LEVEL SECURITY;
ALTER TABLE vet_fund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_found ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_stations ENABLE ROW LEVEL SECURITY;

-- Public read access for certain tables
CREATE POLICY "Public can view active lost_found" ON lost_found
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view active campaigns" ON campaigns
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active sponsors" ON sponsors
  FOR SELECT USING (is_active = true AND display_on_site = true);

CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active food stations" ON food_stations
  FOR SELECT USING (is_active = true);

-- Anyone can insert (for form submissions)
CREATE POLICY "Anyone can submit volunteer application" ON volunteers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit deposit assistance" ON deposit_assistance
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit surrender prevention" ON surrender_prevention
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit vet fund request" ON vet_fund_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit lost/found report" ON lost_found
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit sponsor inquiry" ON sponsors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit contact message" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can sign up for events" ON event_signups
  FOR INSERT WITH CHECK (true);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role has full access to volunteers" ON volunteers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to deposit_assistance" ON deposit_assistance
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to surrender_prevention" ON surrender_prevention
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to vet_fund_requests" ON vet_fund_requests
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to lost_found" ON lost_found
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to sponsors" ON sponsors
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to donations" ON donations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to campaigns" ON campaigns
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to contact_messages" ON contact_messages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to newsletter_subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to events" ON events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to event_signups" ON event_signups
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to food_stations" ON food_stations
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================
-- Uncomment and run separately if you want sample data

/*
-- Sample campaigns
INSERT INTO campaigns (title, slug, description, goal_amount, current_amount, is_active) VALUES
('Emergency Vet Fund 2025', 'emergency-vet-fund-2025', 'Help us cover emergency veterinary costs for pets in need.', 1000000, 450000, true),
('Summer TNR Blitz', 'summer-tnr-blitz', 'Fund our summer trap-neuter-return program to help community cats.', 500000, 125000, true);

-- Sample food stations
INSERT INTO food_stations (name, address, lat, lng, hours, is_active) VALUES
('Del Valle Community Center', '3614 FM 973, Del Valle, TX 78617', 30.1847, -97.6081, 'Mon-Fri 9am-5pm', true),
('St. Johns Neighborhood Station', '7500 Blessing Ave, Austin, TX 78752', 30.3431, -97.7022, 'Always available', true),
('Rundberg Station', '1000 E Rundberg Ln, Austin, TX 78753', 30.3569, -97.6893, 'Sat 10am-2pm', true);
*/
