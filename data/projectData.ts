import {
  Amenity,
  Config,
  FloorPlan,
  NearbyPlace,
  ProgressStep,
  SimilarProject,
  SpecRow,
  TimelineEvent,
  ContactItem,
} from "@/types/project";

export const CONFIGS: Config[] = [
  {
    type: "2 BHK",
    area: "875 – 1050 sq.ft",
    price: "₹68L – ₹85L",
    avail: "✓ 28 Units Available",
    sqft: 875,
  },
  {
    type: "3 BHK",
    area: "1200 – 1450 sq.ft",
    price: "₹98L – ₹1.18Cr",
    avail: "✓ 18 Units Available",
    sqft: 1200,
  },
  {
    type: "3 BHK+",
    area: "1450 – 1650 sq.ft",
    price: "₹1.18Cr – ₹1.35Cr",
    avail: "⚠ 6 Units Left",
    warn: true,
    sqft: 1450,
  },
];

export const SPECS: SpecRow[] = [
  {
    label: "Unit Type",
    value: "2 BHK",
    highlight: true,
  },
  {
    label: "Super Built-up Area",
    value: "875 – 1050 sq.ft",
  },
  {
    label: "Carpet Area",
    value: "590 – 710 sq.ft",
  },
  {
    label: "Bedrooms",
    value: "2 Bedrooms + 2 Bathrooms",
  },
  {
    label: "Living / Dining",
    value: "Combined, 240 sq.ft",
  },
  {
    label: "Kitchen",
    value: "Semi-modular with utility",
  },
  {
    label: "Balconies",
    value: "2",
  },
  {
    label: "Floor Height",
    value: "10 ft",
  },
  {
    label: "Flooring",
    value: "Vitrified Tiles",
  },
  {
    label: "Facing",
    value: "North-East / South-West",
  },
  {
    label: "Price per sq.ft",
    value: "₹7,772 – ₹8,095",
    highlight: true,
  },
];

export const AMENITIES: Amenity[] = [
  {
    icon: "🏊",
    name: "Swimming Pool",
  },
  {
    icon: "🏋️",
    name: "Gymnasium",
  },
  {
    icon: "🏸",
    name: "Badminton Court",
  },
  {
    icon: "👶",
    name: "Children's Play Area",
  },
  {
    icon: "🚗",
    name: "Covered Parking",
  },
  {
    icon: "🔒",
    name: "24×7 Security",
  },
  {
    icon: "🌳",
    name: "Landscaped Garden",
  },
  {
    icon: "⚡",
    name: "Power Backup",
  },
  {
    icon: "🛗",
    name: "High-Speed Lifts",
  },
  {
    icon: "📡",
    name: "Smart Home Ready",
  },
  {
    icon: "☀️",
    name: "Solar Panels",
  },
  {
    icon: "🚰",
    name: "24H Water Supply",
  },
];

export const FLOOR_PLANS: FloorPlan[] = [
  {
    label: "2 BHK — 875 sq.ft",
    sqft: 875,
  },
  {
    label: "2 BHK — 1050 sq.ft",
    sqft: 1050,
  },
  {
    label: "3 BHK — 1200 sq.ft",
    sqft: 1200,
  },
  {
    label: "3 BHK — 1450 sq.ft",
    sqft: 1450,
  },
  {
    label: "3 BHK+ — 1650 sq.ft",
    sqft: 1650,
  },
];

export const NEARBY: NearbyPlace[] = [
  {
    icon: "🚇",
    name: "New Town Metro",
    dist: "1.2 km · 4 min",
  },
  {
    icon: "✈️",
    name: "Airport",
    dist: "12 km · 20 min",
  },
  {
    icon: "🏥",
    name: "Apollo Hospital",
    dist: "3.5 km · 8 min",
  },
  {
    icon: "🏫",
    name: "DPS School",
    dist: "1.8 km · 5 min",
  },
  {
    icon: "🛍️",
    name: "City Centre 2",
    dist: "2.1 km · 6 min",
  },
  {
    icon: "💼",
    name: "Sector V",
    dist: "5 km · 12 min",
  },
];

export const PROGRESS_STEPS: ProgressStep[] = [
  {
    label: "Foundation",
    value: "Completed",
    status: "done",
  },
  {
    label: "Structure",
    value: "7F Complete",
    status: "done",
  },
  {
    label: "Finishing",
    value: "In Progress",
    status: "active",
  },
  {
    label: "Amenities",
    value: "Dec 2026",
    status: "pending",
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    date: "March 2024",
    title: "Foundation Complete",
    sub: "Foundation work completed.",
    status: "done",
    pct: "100%",
  },
  {
    date: "October 2024",
    title: "Podium Complete",
    sub: "Podium structure completed.",
    status: "done",
    pct: "100%",
  },
  {
    date: "June 2026",
    title: "Internal Finishing",
    sub: "Work currently underway.",
    status: "active",
    pct: "62%",
  },
  {
    date: "December 2026",
    title: "Possession",
    sub: "Expected possession date.",
    status: "pending",
  },
];

export const SIMILAR: SimilarProject[] = [
  {
    name: "Samriddh Grandeur",
    location: "Howrah",
    price: "₹95 Lakh",
    badge: "READY TO MOVE",
    badgeColor: "#3B6D11",
    gradient:
      "linear-gradient(135deg,#2A1845,#1A0D37)",
  },
  {
    name: "Samriddh Crown",
    location: "Rajarhat",
    price: "₹1.45 Cr",
    badge: "LUXURY",
    badgeColor: "#C9A84C",
    gradient:
      "linear-gradient(135deg,#3A2000,#5A3500)",
  },
];

export const CONTACTS: ContactItem[] = [
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 98XXX XXXXX",
    toast: "Calling...",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "Chat Now",
    toast: "Opening WhatsApp...",
  },
  {
    icon: "📧",
    label: "Email",
    value: "info@example.com",
    toast: "Opening Email...",
  },
];