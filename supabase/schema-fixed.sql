-- PawsNClaws ATX Database Schema (Fixed order)
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES (no dependencies first)
-- ============================================

-- Donors / Users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_corporate BOOLEAN DEFAULT FALSE,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANIMALS & COLONIES
-- ============================================

CREATE TABLE colonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location_name TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  cat_count INTEGER DEFAULT 0,
  all_tnr BOOLEAN DEFAULT FALSE,
  caretaker_id UUID REFERENCES profiles(id),
  monthly_food_cost INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'monitoring', 'relocated', 'inactive')),
  photos JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE animals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  species TEXT DEFAULT 'cat' CHECK (species IN ('cat', 'dog', 'other')),
  breed TEXT,
  age_estimate TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'unknown')),
  description TEXT,
  photos JSONB DEFAULT '[]',
  colony_id UUID REFERENCES colonies(id),
  status TEXT DEFAULT 'community' CHECK (status IN ('community', 'foster', 'adoptable', 'adopted', 'medical', 'deceased')),
  is_tnr BOOLEAN DEFAULT FALSE,
  tnr_date DATE,
  medical_notes TEXT,
  intake_date DATE,
  adoption_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Animal updates (for sponsors to see progress)
CREATE TABLE animal_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
  colony_id UUID REFERENCES colonies(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  photos JSONB DEFAULT '[]',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DONATION SYSTEM
-- ============================================

-- Donation campaigns (emergency vet bills, specific causes)
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  goal_amount INTEGER NOT NULL,
  raised_amount INTEGER DEFAULT 0,
  image_url TEXT,
  animal_id UUID REFERENCES animals(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'funded', 'closed')),
  urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  funded_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- All donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES profiles(id),
  campaign_id UUID REFERENCES campaigns(id),
  amount INTEGER NOT NULL,
  fee_covered BOOLEAN DEFAULT FALSE,
  donation_type TEXT DEFAULT 'one_time' CHECK (donation_type IN ('one_time', 'recurring', 'stock', 'crypto', 'daf')),
  payment_method TEXT,
  stripe_payment_id TEXT,
  stripe_subscription_id TEXT,
  donor_name TEXT,
  donor_email TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recurring donation subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES profiles(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,
  interval TEXT DEFAULT 'month' CHECK (interval IN ('month', 'year')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  tier TEXT,
  colony_id UUID REFERENCES colonies(id),
  animal_id UUID REFERENCES animals(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);

-- ============================================
-- CORPORATE SPONSORS
-- ============================================

CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  company_name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  monthly_amount INTEGER,
  stripe_subscription_id TEXT,
  benefits JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  display_on_site BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Round-up partners
CREATE TABLE roundup_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  business_name TEXT NOT NULL,
  location TEXT,
  pos_system TEXT,
  integration_status TEXT DEFAULT 'pending',
  total_raised INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMERGENCY & ASSISTANCE
-- ============================================

-- Pet deposit assistance loans
CREATE TABLE deposit_assistance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  pet_name TEXT,
  pet_species TEXT,
  landlord_name TEXT,
  deposit_amount INTEGER NOT NULL,
  monthly_repayment INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'paid_off', 'defaulted', 'denied')),
  amount_paid INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  paid_off_at TIMESTAMPTZ
);

-- Surrender prevention cases
CREATE TABLE surrender_prevention (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  pet_info TEXT,
  reason TEXT,
  assistance_needed TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'surrendered', 'closed')),
  outcome TEXT,
  resources_provided JSONB DEFAULT '[]',
  assigned_to UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Emergency vet fund requests
CREATE TABLE vet_fund_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id),
  requestor_name TEXT NOT NULL,
  requestor_email TEXT NOT NULL,
  requestor_phone TEXT,
  pet_name TEXT NOT NULL,
  pet_species TEXT,
  vet_clinic TEXT,
  diagnosis TEXT,
  estimated_cost INTEGER NOT NULL,
  amount_approved INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'funded', 'denied', 'cancelled')),
  vet_invoice_url TEXT,
  proof_of_income BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LOST & FOUND
-- ============================================

CREATE TABLE lost_found (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  species TEXT NOT NULL,
  breed TEXT,
  color TEXT,
  name TEXT,
  description TEXT,
  location_found TEXT,
  location_last_seen TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  photos JSONB DEFAULT '[]',
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  microchip_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reunited', 'closed')),
  reunited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PET FOOD STATIONS
-- ============================================

CREATE TABLE food_stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  host_business TEXT,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  needs_restock BOOLEAN DEFAULT FALSE,
  last_restocked TIMESTAMPTZ,
  volunteer_id UUID REFERENCES profiles(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VOLUNTEERS & FOSTERS
-- ============================================

CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills JSONB DEFAULT '[]',
  availability TEXT,
  is_foster_approved BOOLEAN DEFAULT FALSE,
  background_check BOOLEAN DEFAULT FALSE,
  hours_logged INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE foster_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  volunteer_id UUID REFERENCES volunteers(id),
  animal_id UUID REFERENCES animals(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  notes TEXT,
  supplies_provided JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- IMPACT TRACKING
-- ============================================

CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE NOT NULL,
  animals_helped INTEGER DEFAULT 0,
  tnr_count INTEGER DEFAULT 0,
  adoptions INTEGER DEFAULT 0,
  surrenders_prevented INTEGER DEFAULT 0,
  meals_provided INTEGER DEFAULT 0,
  vet_bills_paid INTEGER DEFAULT 0,
  deposits_assisted INTEGER DEFAULT 0,
  volunteers_active INTEGER DEFAULT 0,
  colonies_managed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE colonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_updates ENABLE ROW LEVEL SECURITY;

-- Public read access for campaigns, animals, colonies
CREATE POLICY "Public can view active campaigns" ON campaigns FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view animals" ON animals FOR SELECT USING (true);
CREATE POLICY "Public can view colonies" ON colonies FOR SELECT USING (true);
CREATE POLICY "Public can view animal updates" ON animal_updates FOR SELECT USING (true);

-- Users can view their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own donations" ON donations FOR SELECT USING (auth.uid() = donor_id);
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = donor_id);

-- Admins can do everything
CREATE POLICY "Admins full access profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins full access donations" ON donations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins full access campaigns" ON campaigns FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins full access animals" ON animals FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins full access colonies" ON colonies FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER colonies_updated_at BEFORE UPDATE ON colonies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER animals_updated_at BEFORE UPDATE ON animals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Update campaign raised_amount when donation is made
CREATE OR REPLACE FUNCTION update_campaign_raised()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.campaign_id IS NOT NULL THEN
    UPDATE campaigns
    SET raised_amount = raised_amount + NEW.amount,
        status = CASE WHEN raised_amount + NEW.amount >= goal_amount THEN 'funded' ELSE status END,
        funded_at = CASE WHEN raised_amount + NEW.amount >= goal_amount THEN NOW() ELSE funded_at END
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donation_updates_campaign
  AFTER INSERT OR UPDATE ON donations
  FOR EACH ROW EXECUTE FUNCTION update_campaign_raised();

-- Create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- COMMUNICATIONS & FORMS
-- ============================================

-- Contact form messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  reason TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  city TEXT,
  subscribed BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event signups
CREATE TABLE event_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests INTEGER DEFAULT 1,
  notes TEXT,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled', 'no_show')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foster applications
CREATE TABLE foster_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  housing_type TEXT,
  has_yard BOOLEAN,
  other_pets TEXT,
  experience TEXT,
  foster_type TEXT,
  availability TEXT,
  emergency_vet BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'waitlist')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteer applications
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  roles JSONB DEFAULT '[]',
  experience TEXT,
  availability TEXT,
  interests TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  how_heard TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'inactive')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Colony submissions (pending review)
CREATE TABLE colony_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  colony_name TEXT,
  location_description TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  estimated_cats INTEGER NOT NULL,
  tnr_status TEXT,
  has_caretaker BOOLEAN DEFAULT FALSE,
  caretaker_contact TEXT,
  feeding_schedule TEXT,
  urgent_needs TEXT,
  additional_info TEXT,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  submitter_phone TEXT,
  submitter_relation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'merged')),
  merged_to_colony_id UUID REFERENCES colonies(id),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsor inquiries
CREATE TABLE sponsor_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  tier TEXT,
  interests JSONB DEFAULT '[]',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiating', 'closed_won', 'closed_lost')),
  notes TEXT,
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_donations_campaign ON donations(campaign_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_created ON donations(created_at DESC);
CREATE INDEX idx_subscriptions_donor ON subscriptions(donor_id);
CREATE INDEX idx_animals_colony ON animals(colony_id);
CREATE INDEX idx_animals_status ON animals(status);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_lost_found_type_status ON lost_found(type, status);
CREATE INDEX idx_colonies_location ON colonies(latitude, longitude);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_event_signups_event ON event_signups(event_id);
CREATE INDEX idx_foster_applications_status ON foster_applications(status);
CREATE INDEX idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX idx_colony_submissions_status ON colony_submissions(status);
CREATE INDEX idx_sponsor_inquiries_status ON sponsor_inquiries(status);
