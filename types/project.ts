export interface Config {
  type: string;
  area: string;
  price: string;
  avail: string;
  warn?: boolean;
  sqft: number;
}

export interface SpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Amenity {
  icon: string;
  name: string;
}

export interface FloorPlan {
  label: string;
  sqft: number;
}

export interface NearbyPlace {
  icon: string;
  name: string;
  dist: string;
}

export interface ProgressStep {
  label: string;
  value: string;
  status: "done" | "active" | "pending";
}

export interface TimelineEvent {
  date: string;
  title: string;
  sub: string;
  status: "done" | "active" | "pending";
  pct?: string;
}

export interface SimilarProject {
  name: string;
  location: string;
  price: string;
  badge: string;
  badgeColor: string;
  gradient: string;
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  toast: string;
}