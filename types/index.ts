// ── DATA MODELS ──────────────────────────────────────────────────────────────

export type ProjectStatus = 'Active' | 'Draft' | 'Sold Out' | 'Coming Soon';
export type EnquiryStatus = 'New' | 'In Progress' | 'Contacted' | 'Site Visit' | 'Closed';
export type LeadSource = 'Website' | 'Google Ad' | 'Facebook' | 'Referral' | 'Instagram' | 'Walk-in';
export type PropertyType = 'Residential Apartment' | 'Villa' | 'Plot' | 'Commercial' | 'Mixed Use';
export type ProjectPhase = 'New Launch' | 'Under Construction' | 'Ready to Move' | 'Sold Out';

export interface Configuration {
  type: string;         // e.g. "2 BHK"
  area: string;         // e.g. "875–1050 sq.ft"
  price: string;        // e.g. "₹68L – ₹85L"
  units: number;
}

export interface Project {
  id: string;
  name: string;
  developer: string;
  rera: string;
  location: string;
  mapsLink?: string;
  propertyType: PropertyType;
  projectPhase: ProjectPhase;
  totalUnits: number;
  availableUnits: number;
  possessionDate: string;   // "YYYY-MM"
  launchDate: string;       // "YYYY-MM-DD"
  description: string;
  configurations: Configuration[];
  amenities: string[];
  images: string[];
  metaTitle: string;
  metaDescription: string;
  slug: string;
  leadEmail: string;
  whatsappNumber: string;
  whatsappAlerts: boolean;
  status: ProjectStatus;
  enquiries: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  project: string;
  config: string;
  budget: string;
  source: LeadSource;
  date: string;
  status: EnquiryStatus;
}

export interface LeadSourceStat {
  source: string;
  icon: string;
  leads: number;
  siteVisits: number;
  bookings: number;
  conversionRate: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  trend: string;
  trendColor?: string;
  valueColor?: string;
}

export type CmsTab = 'dashboard' | 'add' | 'enquiries' | 'leads' | 'media';
