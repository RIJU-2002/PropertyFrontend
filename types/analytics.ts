// ============================================================================
// Analytics Types
// Matches GET /analytics/dashboard
// ============================================================================

// ----------------------------------------------------------------------------
// Overview
// ----------------------------------------------------------------------------

export interface OverviewData {
  projects: {
    total: number;
    active: number;
    featured: number;
    trending: number;
    newLaunch: number;
  };

  properties: {
    total: number;
    active: number;
    featured: number;
  };

  builders: {
    total: number;
    verified: number;
  };

  locations: {
    cities: number;
    localities: number;
  };

  users: number;
  leads: number;
  articles: number;

  totalInventoryValue: string;
  avgPropertyPrice: number;
  avgProjectPrice: number;
  avgPricePerSqFt: number;

  monthlyProjects: number;
  monthlyProperties: number;
  monthlyLeads: number;

  conversionRate: number;
}

// ----------------------------------------------------------------------------
// Growth
// ----------------------------------------------------------------------------

export interface GrowthPoint {
  month: string;
  count: number;
}

export type GrowthData = GrowthPoint[];

// ----------------------------------------------------------------------------
// Distribution
// ----------------------------------------------------------------------------

export interface CityDistribution {
  city: string;
  projects: number;
}

export interface LocalityDistribution {
  localityId: number;
  locality: string;
  city: string;
  projects: number;
  properties: number;
  total: number;
}

export interface PropertyTypeDistribution {
  propertyType: string;
  count: number;
}

export interface PossessionDistribution {
  status: string;
  count: number;
}

// ----------------------------------------------------------------------------
// Rankings
// ----------------------------------------------------------------------------

export interface BuilderRanking {
  rank: number;
  builderId: number;
  builder: string;
  verified: boolean;
  projects: number;
  properties: number;
}

export interface CityRanking {
  rank: number;
  cityId: number;
  city: string;
  projects: number;
  properties: number;
}

export interface LocalityRanking {
  rank: number;
  localityId: number;
  locality: string;
  city: string;
  projects: number;
  properties: number;
}

// ----------------------------------------------------------------------------
// Pricing
// ----------------------------------------------------------------------------

export interface PricingSummary {
  average: number;
  minimum: number;
  maximum: number;
}

export interface PriceRange {
  range: string;
  count: number;
}

// ----------------------------------------------------------------------------
// Dashboard Analytics
// ----------------------------------------------------------------------------

export interface DashboardAnalytics {
  overview: OverviewData;

  growth: {
    projects: GrowthData;
    properties: GrowthData;
    leads: GrowthData;
  };

  distribution: {
    cities: CityDistribution[];
    localities: LocalityDistribution[];
    propertyTypes: PropertyTypeDistribution[];
    possession: PossessionDistribution[];
  };

  rankings: {
    builders: BuilderRanking[];
    cities: CityRanking[];
    localities: LocalityRanking[];
  };

  pricing: {
    summary: PricingSummary;
    ranges: PriceRange[];
  };
}

// ----------------------------------------------------------------------------
// CMS Tabs
// ----------------------------------------------------------------------------

export type CmsTab =
  | "dashboard"
  | "add"
  | "enquiries"
  | "leads"
  | "media"
  | "analytics";