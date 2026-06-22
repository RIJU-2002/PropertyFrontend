export const mockProjects = [
  {
    id: "1",
    name: "DN Fairytale",
    status: "Ready to Move",
    possession_date: "Immediate",
    location: "Patia",
    city: "Bhubaneswar",
    builder: "DN Homes",
    price_min: 8500000,
    propertyType:"APARTMENT",
    bedrooms: 3,
    price_display: "₹85 L - ₹1.2 Cr",
    rera_id: "ORERA-2024-1001",
    bhk_config: "2 & 3 BHK",
    bhk_price: "Starting ₹85 L",
    bhk_availability: "Available",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Club House",
      "Kids Play Area",
      "Power Backup",
    ],
    image_url:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    photo_count: 18,
    video_count: 2,
    is_exclusive: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Z Estates",
    status: "Under Construction",
    possession_date: "Dec 2027",
    location: "Patrapada",
    city: "Bhubaneswar",
    builder: "Z Engineers",
    price_min: 6200000,
    propertyType:"APARTMENT",
    bedrooms: 2,
    price_display: "₹62 L - ₹95 L",
    rera_id: "ORERA-2024-1002",
    bhk_config: "2 & 3 BHK",
    bhk_price: "Starting ₹62 L",
    bhk_availability: "Limited Units",
    amenities: [
      "Gym",
      "Jogging Track",
      "Indoor Games",
      "Security",
      "Community Hall"
    ],
    image_url:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    photo_count: 24,
    video_count: 3,
    is_exclusive: false,
    created_at: new Date().toISOString(),
  },

  {
    id: "3",
    name: "Utkal Heights",
    status: "Ready to Move",
    possession_date: "Immediate",
    location: "Khandagiri",
    city: "Bhubaneswar",
    builder: "Utkal Builders",
    price_min: 7500000,
    price_display: "₹75 L - ₹1.1 Cr",
    propertyType:"APARTMENT",
    bedrooms: 3,
    rera_id: "ORERA-2024-1003",
    bhk_config: "3 BHK",
    bhk_price: "Starting ₹75 L",
    bhk_availability: "Available",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Garden",
      "Parking",
      "Power Backup"
    ],
    image_url:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    photo_count: 16,
    video_count: 1,
    is_exclusive: true,
    created_at: new Date().toISOString(),
  },

  {
    id: "4",
    name: "Metro Kings Court",
    status: "Under Construction",
    possession_date: "Mar 2028",
    location: "Rasulgarh",
    city: "Bhubaneswar",
    builder: "Metro Group",
    price_min: 5400000,
    price_display: "₹54 L - ₹82 L",
    rera_id: "ORERA-2024-1004",
    propertyType:"APARTMENT",
    bedrooms: 3,
    bhk_config: "2 BHK",
    bhk_price: "Starting ₹54 L",
    bhk_availability: "Available",
    amenities: [
      "Club House",
      "Gym",
      "Security",
      "Lift",
      "Parking"
    ],
    image_url:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    photo_count: 14,
    video_count: 2,
    is_exclusive: false,
    created_at: new Date().toISOString(),
  },

  {
    id: "5",
    name: "Evos Alchemy",
    status: "Ready to Move",
    possession_date: "Immediate",
    location: "Infocity",
    city: "Bhubaneswar",
    builder: "Evos Buildtech",
    price_min: 9800000,
    propertyType:"APARTMENT",
    bedrooms: 3,
    price_display: "₹98 L - ₹1.5 Cr",
    rera_id: "ORERA-2024-1005",
    bhk_config: "3 & 4 BHK",
    bhk_price: "Starting ₹98 L",
    bhk_availability: "Premium Units",
    amenities: [
      "Infinity Pool",
      "Gym",
      "Spa",
      "Sky Lounge",
      "Club House"
    ],
    image_url:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    photo_count: 32,
    video_count: 5,
    is_exclusive: true,
    created_at: new Date().toISOString(),
  }
];

export type Project = {
  id: string;
  name: string;
  status: string;
  possession_date: string | null;
  location: string;
  city: string;
  builder: string;
  price_min: number;
  bedrooms: number;
  propertyType: string;
  price_display: string;
  rera_id: string | null;
  bhk_config: string | null;
  bhk_price: string | null;
  bhk_availability: string | null;
  amenities: string[];
  image_url: string | null;
  photo_count: number;
  video_count: number;
  is_exclusive: boolean;
  created_at: string;
};