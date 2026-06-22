"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Home,
  BedDouble,
  ChevronDown,
  IndianRupee,
  X
} from "lucide-react";

interface SearchBarProps {
  initialLocation?: string;
  initialType?: string;
  initialPrice?: string;
  initialBedroom?: string;
}

const propertyTypes = [
  "All Types",
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "PLOT",
  "COMMERCIAL",
];

const priceRanges = [
  "Any Price",
  "Under ₹50L",
  "₹50L - ₹1Cr",
  "₹1Cr - ₹2Cr",
  "₹2Cr+",
];

const bedrooms = ["Any", "1", "2", "3", "4", "5+"];

export function SearchBar({
  initialLocation = "",
  initialType = "All Types",
  initialPrice = "Any Price",
  initialBedroom = "Any",
}: SearchBarProps) {
  const router = useRouter();

  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialType);
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [bedroom, setBedroom] = useState(initialBedroom);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setLocation(initialLocation);
    setPropertyType(initialType);
    setPriceRange(initialPrice);
    setBedroom(initialBedroom);
  }, [
    initialLocation,
    initialType,
    initialPrice,
    initialBedroom,
  ]);

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const hasActiveFilters =
  location.trim() !== "" ||
  propertyType !== "All Types" ||
  priceRange !== "Any Price" ||
  bedroom !== "Any";

  const clearFilters = () => {
    setLocation("");
    setPropertyType("All Types");
    setPriceRange("Any Price");
    setBedroom("Any");
  };

  const activeFilterCount = [
    location.trim() !== "",
    propertyType !== "All Types",
    priceRange !== "Any Price",
    bedroom !== "Any",
  ].filter(Boolean).length;

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location);
    }

    if (propertyType !== "All Types") {
      params.set("type", propertyType);
    }

    if (priceRange !== "Any Price") {
      params.set("price", priceRange);
    }

    if (bedroom !== "Any") {
      params.set("beds", bedroom);
    }

    router.push(`/Projects?${params.toString()}`);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Location */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-muted-foreground mb-2">
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Enter city or neighborhood"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Property Type
              </label>

              <button
                type="button"
                onClick={() => handleDropdownToggle("type")}
                className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              >
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-muted-foreground" />
                  <span>{propertyType}</span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openDropdown === "type" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "type" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setPropertyType(type);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Price Range
              </label>

              <button
                type="button"
                onClick={() => handleDropdownToggle("price")}
                className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              >
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-muted-foreground" />
                  <span className="truncate">{priceRange}</span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openDropdown === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "price" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20">
                  {priceRanges.map((price) => (
                    <button
                      key={price}
                      type="button"
                      onClick={() => {
                        setPriceRange(price);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {price}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bedrooms */}
            <div className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Bedrooms
              </label>

              <button
                type="button"
                onClick={() => handleDropdownToggle("beds")}
                className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              >
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {bedroom === "Any"
                      ? "Any"
                      : `${bedroom} Bed${bedroom === "1" ? "" : "s"}`}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openDropdown === "beds" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "beds" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20">
                  {bedrooms.map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => {
                        setBedroom(bed);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {bed === "Any"
                        ? "Any"
                        : `${bed} Bedroom${bed === "1" ? "" : "s"}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Clear Filters */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              Reset
            </label>

            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full h-[50px]"
            >
              <X className="w-4 h-4 mr-2" />
              {activeFilterCount > 0
                ? `Clear (${activeFilterCount})`
                : "Clear"}
            </Button>
          </div>

          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}