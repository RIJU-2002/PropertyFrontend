export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: {
    latitude: number
    longitude: number
    address: string
  }
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface SendOtpRequest {
  mobileNumber: string
}

export interface VerifyOtpRequest {
  mobileNumber: string
  otp: string
}

export interface AuthResponse {
  token: string
   user: {
    id: number
    phone: string
    name: string | null
    email: string | null
    role: "ADMIN" | "BUYER" | "AGENT"
    avatarUrl: string | null
    isActive: boolean
  }
}


export interface GeocodeResponse {
  address: string;
  latitude: number;
  longitude: number;
  localityName: string | null;
  cityName: string | null;
  cityId: number | null;
  stateName: string | null;
  stateId: number | null;
  country: string | null;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  category: string;
}

export interface ProjectAmenity {
  projectId: number;
  amenityId: number;
  amenity: Amenity;
}

export interface FloorPlan {
  id: number;
  bhkType: number;
  name: string;
  carpetArea?: number;
  builtUpArea?: number;
  superArea?: number;
  price?: string;
  imageUrl?: string | null;
}


export interface ProjectConfig {
  id: number;
  unitType: string;
  buildAreaRange: string;
  carpetArea: string;
  bastu_Info: string;
  bedRoom: string;
  livingArea: string;
  kitchen: string;
  balconies: string;
  floorHeight: string;
  flooring: string;
  facing: string;
  pricePerArea: string;
  price: string;
  units: number;
}

import { ProjectStats } from '@/types/index';
export interface Project {
  id: number;
  name: string;
  slug: string;

  address: string;
  description: string;
  projectType:String;
  possessionStatus: ProjectStats;
  launchDate:String;
  possessionDate:string;
  reraNumber:String;
  isFeatured: boolean;
  isVerified: boolean;
  isTrending: boolean;
  isNewLaunch: boolean;

  city: {
    name: string;
    slug: string;
  };

  locality: {
    name: string;
    slug: string;
  };

  builder: {
    name: string;
    slug: string;
    isVerified: boolean;
  };

  images: {
    id: number;
    url: string;
    isCover: boolean;
  }[];
  configs: ProjectConfig[];
  amenities: ProjectAmenity[];
  floorPlans:FloorPlan[];
}
export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}


export interface FeaturedProjectsResponse {
  success: boolean;
  projects: Project[];
}



// ─── Shared article types ─────────────────────────────────────────────────────
// Import from here in both components and Next.js page files:
//   import type { ArticleDetail, ArticleSummary } from "@/components/article/article.types";

export interface ArticleCategory {
  name: string;
  slug: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

/** Lightweight shape used in listing/grid views */
export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  readTimeMin: number | null;
  views: number;
  category: ArticleCategory | null;
  tags: ArticleTag[];
}
export interface ArticlesResponse {
  articles: ArticleSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
/** Full shape used on the article detail page */
export interface ArticleDetail extends ArticleSummary {
  content: string; // HTML string from your rich text editor
}
