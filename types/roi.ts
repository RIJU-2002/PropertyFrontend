export interface InvestmentProject {
  id: number;
  name: string;
  slug: string;
  builderId: number;
  cityId: number;
  localityId: number;

  address: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;

  minPrice: string | null;
  maxPrice: string | null;

  possessionStatus: string;
  launchDate: string | null;
  possessionDate: string | null;

  reraNumber: string | null;
  totalUnits: number | null;
  projectType: string;

  totalFloors: number | null;
  landArea: string | null;

  expectedRentMonthly: number | null;
  appreciationRate: number | null;
  rentalDemand: "HIGH" | "MEDIUM" | "LOW" | null;
  nearbyInfrastructure: string | null;

  rentalYield: number | null;
  investmentScore: number | null;
  paybackYears: number | null;

  isInvestmentHotspot: boolean;
  investmentTagline: string | null;

  isVerified: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isNewLaunch: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  city: {
    name: string;
  };

  locality: {
    name: string;
  };

  images: {
    id: number;
    projectId: number;
    url: string;
    caption: string | null;
    isCover: boolean;
    sortOrder: number;
    createdAt: string;
  }[];

  configs: {
    id: number;
    projectId: number;
    unitType: string;
    buildAreaRange: string | null;
    carpetArea: string | null;
    bastu_Info: string | null;
    bedRoom: string | null;
    livingArea: string | null;
    kitchen: string | null;
    balconies: string | null;
    floorHeight: string | null;
    flooring: string | null;
    facing: string | null;
    pricePerArea: string | null;
    price: string | null;
    units: number | null;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface TopInvestmentProjectsResponse {
  success: boolean;
  data: InvestmentProject[];
}