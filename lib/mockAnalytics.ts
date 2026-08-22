import type {
  OverviewData,
  GrowthData,
  DistributionData,
  RankingsData,
  PricingSummary,
  PricingRangesData,
} from '@/types/analytics';

// ── overview ────────────────────────────────────────────────────────────────
export const mockOverview: OverviewData = {
  totalProjects: 25,
  totalProperties: 1_840,
  totalLeads: 4_312,
  activeListings: 18,
  totalBuilders: 11,
  citiesCovered: 6,
  avgPricePerSqft: 5_480,
  totalInventoryValue: '₹1,240 Cr',
  conversionRate: 9.2,
  newLeadsToday: 14,
  siteVisitsThisMonth: 34,
  bookingsThisMonth: 8,
};

// ── growth helpers ───────────────────────────────────────────────────────────
const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

function makeSeries(base: number, variance: number) {
  return months.map((m, i) => {
    const val = Math.round(base + (i * variance) + (Math.sin(i) * variance * 0.6));
    return { month: `${m} '24`, value: val };
  });
}

export const mockGrowthProjects: GrowthData = {
  current: 25, previous: 22, percentChange: 13.6, trend: 'up',
  series: makeSeries(14, 1),
};

export const mockGrowthProperties: GrowthData = {
  current: 1840, previous: 1620, percentChange: 13.6, trend: 'up',
  series: makeSeries(1200, 60),
};

export const mockGrowthLeads: GrowthData = {
  current: 4312, previous: 3510, percentChange: 22.8, trend: 'up',
  series: makeSeries(2400, 185),
};

// ── distributions ────────────────────────────────────────────────────────────
export const mockDistCities: DistributionData = {
  total: 25,
  items: [
    { label: 'Kolkata', count: 14, percentage: 56, value: '₹720 Cr' },
    { label: 'Bhubaneswar', count: 5, percentage: 20, value: '₹260 Cr' },
    { label: 'Howrah', count: 3, percentage: 12, value: '₹140 Cr' },
    { label: 'Cuttack', count: 2, percentage: 8, value: '₹80 Cr' },
    { label: 'Durgapur', count: 1, percentage: 4, value: '₹40 Cr' },
  ],
};

export const mockDistLocalities: DistributionData = {
  total: 25,
  items: [
    { label: 'New Town', count: 6, percentage: 24 },
    { label: 'Rajarhat', count: 4, percentage: 16 },
    { label: 'Salt Lake', count: 3, percentage: 12 },
    { label: 'Patia', count: 3, percentage: 12 },
    { label: 'Howrah', count: 3, percentage: 12 },
    { label: 'Nayapalli', count: 2, percentage: 8 },
    { label: 'Garia', count: 2, percentage: 8 },
    { label: 'Others', count: 2, percentage: 8 },
  ],
};

export const mockDistPropertyTypes: DistributionData = {
  total: 25,
  items: [
    { label: 'Residential Apt', count: 16, percentage: 64 },
    { label: 'Villa', count: 4, percentage: 16 },
    { label: 'Commercial', count: 3, percentage: 12 },
    { label: 'Plot', count: 1, percentage: 4 },
    { label: 'Mixed Use', count: 1, percentage: 4 },
  ],
};

export const mockDistPossession: DistributionData = {
  total: 25,
  items: [
    { label: 'Ready to Move', count: 7, percentage: 28 },
    { label: 'Dec 2024 – Mar 2025', count: 4, percentage: 16 },
    { label: 'Apr 2025 – Dec 2025', count: 5, percentage: 20 },
    { label: '2026', count: 6, percentage: 24 },
    { label: '2027+', count: 3, percentage: 12 },
  ],
};

// ── rankings ─────────────────────────────────────────────────────────────────
export const mockRankBuilders: RankingsData = {
  items: [
    { rank: 1, name: 'Samriddh Developers', count: 9, leads: 1240, revenue: '₹480 Cr', conversionRate: 11.2, badge: 'top' },
    { rank: 2, name: 'Merlin Projects', count: 5, leads: 820, revenue: '₹310 Cr', conversionRate: 9.8 },
    { rank: 3, name: 'PS Group', count: 4, leads: 710, revenue: '₹265 Cr', conversionRate: 8.4 },
    { rank: 4, name: 'Ambuja Neotia', count: 3, leads: 510, revenue: '₹190 Cr', conversionRate: 7.6 },
    { rank: 5, name: 'Magnolia Projects', count: 2, leads: 380, revenue: '₹125 Cr', conversionRate: 6.2, badge: 'rising' },
    { rank: 6, name: 'Ideal Group', count: 2, leads: 290, revenue: '₹110 Cr', conversionRate: 5.8 },
  ],
};

export const mockRankCities: RankingsData = {
  items: [
    { rank: 1, name: 'Kolkata', count: 14, leads: 2480, avgPrice: '₹5,850/sqft', conversionRate: 10.1, badge: 'top' },
    { rank: 2, name: 'Bhubaneswar', count: 5, leads: 980, avgPrice: '₹4,920/sqft', conversionRate: 8.6, badge: 'rising' },
    { rank: 3, name: 'Howrah', count: 3, leads: 520, avgPrice: '₹4,100/sqft', conversionRate: 7.2 },
    { rank: 4, name: 'Cuttack', count: 2, leads: 210, avgPrice: '₹3,750/sqft', conversionRate: 5.9 },
    { rank: 5, name: 'Durgapur', count: 1, leads: 122, avgPrice: '₹3,200/sqft', conversionRate: 4.4, badge: 'new' },
  ],
};

export const mockRankLocalities: RankingsData = {
  items: [
    { rank: 1, name: 'New Town, Kolkata', count: 6, leads: 980, avgPrice: '₹6,200/sqft', badge: 'top' },
    { rank: 2, name: 'Rajarhat, Kolkata', count: 4, leads: 760, avgPrice: '₹5,800/sqft' },
    { rank: 3, name: 'Patia, Bhubaneswar', count: 3, leads: 540, avgPrice: '₹5,100/sqft', badge: 'rising' },
    { rank: 4, name: 'Salt Lake, Kolkata', count: 3, leads: 490, avgPrice: '₹7,100/sqft' },
    { rank: 5, name: 'Nayapalli, BBSR', count: 2, leads: 310, avgPrice: '₹4,900/sqft' },
    { rank: 6, name: 'Garia, Kolkata', count: 2, leads: 230, avgPrice: '₹4,500/sqft' },
  ],
};

// ── pricing ──────────────────────────────────────────────────────────────────
export const mockPricingSummary: PricingSummary = {
  avgPricePerSqft: 5_480,
  medianPrice: '₹82 Lakh',
  priceRange: { min: '₹28 Lakh', max: '₹4.8 Cr' },
  avgProjectSize: 1_240,
  luxuryShare: 22,
  affordableShare: 31,
  midSegmentShare: 47,
  yoyPriceGrowth: 8.4,
};

export const mockPricingRanges: PricingRangesData = {
  buckets: [
    { range: 'Under ₹40L',    count: 180, percentage: 10 },
    { range: '₹40L – ₹60L',  count: 360, percentage: 20 },
    { range: '₹60L – ₹90L',  count: 468, percentage: 26 },
    { range: '₹90L – ₹1.2Cr',count: 324, percentage: 18 },
    { range: '₹1.2Cr – ₹2Cr',count: 288, percentage: 16 },
    { range: 'Above ₹2Cr',   count: 180, percentage: 10 },
  ],
};

// ── All together ─────────────────────────────────────────────────────────────
export const mockAllAnalytics = {
  overview:          mockOverview,
  growthProjects:    mockGrowthProjects,
  growthProperties:  mockGrowthProperties,
  growthLeads:       mockGrowthLeads,
  distCities:        mockDistCities,
  distLocalities:    mockDistLocalities,
  distPropertyTypes: mockDistPropertyTypes,
  distPossession:    mockDistPossession,
  rankBuilders:      mockRankBuilders,
  rankCities:        mockRankCities,
  rankLocalities:    mockRankLocalities,
  pricingSummary:    mockPricingSummary,
  pricingRanges:     mockPricingRanges,
};
