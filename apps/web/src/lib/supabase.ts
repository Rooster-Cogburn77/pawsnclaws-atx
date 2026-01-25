import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

// Mock query builder interface for build-time compatibility
interface MockQueryBuilder {
  select: (columns?: string) => MockQueryBuilder;
  insert: (data: unknown) => Promise<{ data: null; error: null }>;
  update: (data?: unknown) => MockQueryBuilder;
  upsert: (data: unknown, opts?: unknown) => Promise<{ data: null; error: null }>;
  delete: () => MockQueryBuilder;
  eq: (column: string, value: unknown) => MockQueryBuilder;
  neq: (column: string, value: unknown) => MockQueryBuilder;
  gt: (column: string, value: unknown) => MockQueryBuilder;
  gte: (column: string, value: unknown) => MockQueryBuilder;
  lt: (column: string, value: unknown) => MockQueryBuilder;
  lte: (column: string, value: unknown) => MockQueryBuilder;
  like: (column: string, value: unknown) => MockQueryBuilder;
  ilike: (column: string, value: unknown) => MockQueryBuilder;
  is: (column: string, value: unknown) => MockQueryBuilder;
  in: (column: string, values: unknown[]) => MockQueryBuilder;
  contains: (column: string, value: unknown) => MockQueryBuilder;
  containedBy: (column: string, value: unknown) => MockQueryBuilder;
  order: (column: string, opts?: { ascending?: boolean }) => MockQueryBuilder;
  limit: (count: number) => MockQueryBuilder;
  range: (from: number, to: number) => MockQueryBuilder;
  single: () => Promise<{ data: null; error: null }>;
  maybeSingle: () => Promise<{ data: null; error: null }>;
  then: <T>(resolve: (value: { data: unknown[]; error: null }) => T) => Promise<T>;
}

// Create a chainable mock query builder for build-time compatibility
const createMockQueryBuilder = (table: string): MockQueryBuilder => {
  const mockResult = { data: [] as unknown[], error: null };

  const builder: MockQueryBuilder = {
    select: () => builder,
    insert: async (data: unknown) => {
      console.log(`[Mock] Would insert into ${table}:`, data);
      return { data: null, error: null };
    },
    update: () => builder,
    upsert: async () => ({ data: null, error: null }),
    delete: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    is: () => builder,
    in: () => builder,
    contains: () => builder,
    containedBy: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: async () => ({ data: null, error: null }),
    maybeSingle: async () => ({ data: null, error: null }),
    then: (resolve) => Promise.resolve(mockResult).then(resolve),
  };

  return builder;
};

// Client-side Supabase (lazy initialization)
export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials not configured");
      return null;
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// For backwards compatibility
export const supabase = {
  from: (table: string) => {
    const client = getSupabase();
    if (!client) {
      // Return chainable mock
      return createMockQueryBuilder(table);
    }
    return client.from(table);
  },
};

// Server-side client with service role (for admin operations)
export const createServerSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase server credentials not configured");
    // Return a mock client with chainable query builder
    return {
      from: (table: string) => createMockQueryBuilder(table),
    };
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Types generated from our schema
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  is_admin: boolean;
  is_corporate: boolean;
  company_name?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  goal_amount: number;
  raised_amount: number;
  image_url?: string;
  animal_id?: string;
  status: "active" | "funded" | "closed";
  urgent: boolean;
  created_at: string;
  funded_at?: string;
  expires_at?: string;
  animal?: Animal;
}

export interface Donation {
  id: string;
  donor_id?: string;
  campaign_id?: string;
  amount: number;
  fee_covered: boolean;
  donation_type: "one_time" | "recurring" | "stock" | "crypto" | "daf";
  payment_method?: string;
  stripe_payment_id?: string;
  donor_name?: string;
  donor_email?: string;
  is_anonymous: boolean;
  message?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
}

export interface Subscription {
  id: string;
  donor_id?: string;
  stripe_subscription_id?: string;
  amount: number;
  interval: "month" | "year";
  status: "active" | "paused" | "cancelled";
  tier?: string;
  colony_id?: string;
  animal_id?: string;
  created_at: string;
}

export interface Sponsor {
  id: string;
  company_name: string;
  logo_url?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  monthly_amount?: number;
  is_active: boolean;
  display_on_site: boolean;
  created_at: string;
}

export interface Colony {
  id: string;
  name: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  cat_count: number;
  all_tnr: boolean;
  caretaker_id?: string;
  monthly_food_cost?: number;
  status: "active" | "monitoring" | "relocated" | "inactive";
  photos: string[];
  created_at: string;
}

export interface Animal {
  id: string;
  name?: string;
  species: "cat" | "dog" | "other";
  breed?: string;
  age_estimate?: string;
  gender?: "male" | "female" | "unknown";
  description?: string;
  photos: string[];
  colony_id?: string;
  status: "community" | "foster" | "adoptable" | "adopted" | "medical" | "deceased";
  is_tnr: boolean;
  tnr_date?: string;
  medical_notes?: string;
  created_at: string;
}

export interface LostFound {
  id: string;
  type: "lost" | "found";
  species: string;
  breed?: string;
  color?: string;
  name?: string;
  description?: string;
  location_found?: string;
  location_last_seen?: string;
  latitude?: number;
  longitude?: number;
  photos: string[];
  contact_name: string;
  contact_phone?: string;
  contact_email?: string;
  status: "active" | "reunited" | "closed";
  created_at: string;
}

export interface FoodStation {
  id: string;
  name: string;
  host_business?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  needs_restock: boolean;
  last_restocked?: string;
  is_active: boolean;
}

export interface ImpactMetrics {
  animals_helped: number;
  tnr_count: number;
  adoptions: number;
  surrenders_prevented: number;
  meals_provided: number;
  vet_bills_paid: number;
  deposits_assisted: number;
  volunteers_active: number;
  colonies_managed: number;
}
