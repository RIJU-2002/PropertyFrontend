"use client";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Home,
  BedDouble,
  ChevronDown,
  IndianRupee,
  X,
  Loader2,
  Square,
} from "lucide-react";
import PriceSlider, {
  PRICE_MIN,
  PRICE_MAX,
  DEFAULT_PRICE_RANGE,
  formatPrice,
} from "@/components/ui/price-slider";
import { useCitySearch, CitySuggestion } from "@/hooks/citySearch";

// Shown when the location field is focused but empty — swap for whatever
// your actual top localities are.
const POPULAR_LOCALITIES = [
  "New Town, Kolkata",
  "Salt Lake, Kolkata",
  "Rajarhat, Kolkata",
  "Patia, Bhubaneswar",
  "Chandrasekharpur, Bhubaneswar",
];

// Plots have no bedroom count — bedroom filter is disabled for them.
const NO_BEDROOM_TYPES = ["PLOT"];

const COMMERCIAL_TYPES = ["COMMERCIAL_OFFICE", "COMMERCIAL_SHOP", "WAREHOUSE"];

const AREA_RANGES = [
  { label: "Any", min: "", max: "" },
  { label: "Up to 500", min: "", max: "500" },
  { label: "500 – 1,000", min: "500", max: "1000" },
  { label: "1,000 – 2,000", min: "1000", max: "2000" },
  { label: "2,000 – 5,000", min: "2000", max: "5000" },
  { label: "5,000+", min: "5000", max: "" },
] as const;

function areaLabelFromBounds(minArea: string, maxArea: string) {
  const match = AREA_RANGES.find((r) => r.min === minArea && r.max === maxArea);
  return match?.label ?? "Any";
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

interface SearchBarProps {
  initialLocation?: string;
  initialType?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  initialBedroom?: string;
  initialMinArea?: string;
  initialMaxArea?: string;
}

const propertyTypes = [
  "All Types",
  "APARTMENT",
  "VILLA",
  "PLOT",
  "INDEPENDENT_HOUSE",
  "BUILDER_FLOOR",
  "PENTHOUSE",
  "STUDIO",
  "COMMERCIAL_OFFICE",
  "COMMERCIAL_SHOP",
  "WAREHOUSE",
];

const bedrooms = ["Any", "1", "2", "3", "4", "5+"];

function formatPropertyType(type: string) {
  if (type === "All Types") return type;
  return type
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function SearchBar({
  initialLocation = "",
  initialType = "All Types",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialBedroom = "Any",
  initialMinArea = "",
  initialMaxArea = "",
}: SearchBarProps) {
  const router = useRouter();

  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialType);
  const [price, setPrice] = useState<number[]>(DEFAULT_PRICE_RANGE);
  const [bedroom, setBedroom] = useState(initialBedroom);
  const [area, setArea] = useState(areaLabelFromBounds(initialMinArea, initialMaxArea));
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { results: citySuggestions, loading: cityLoading, error: cityError } =
    useCitySearch(location);

  const showPopular = location.trim().length < 2;
  const suggestionList: (CitySuggestion | string)[] = showPopular
    ? POPULAR_LOCALITIES
    : citySuggestions;

  const suggestionLabel = (s: CitySuggestion | string) =>
    typeof s === "string" ? s : s.state ? `${s.name}, ${s.state}` : s.name;

  const bedroomDisabled = NO_BEDROOM_TYPES.includes(propertyType);
  const isCommercial = COMMERCIAL_TYPES.includes(propertyType);
  const selectedArea = AREA_RANGES.find((r) => r.label === area) ?? AREA_RANGES[0];
  const areaActive = isCommercial && area !== "Any";

  // Sync from URL/parent-provided initial values.
  // minPrice/maxPrice arrive in rupees (as set by handleSearch below),
  // so convert back to lakhs for the slider.
  useEffect(() => {
    setLocation(initialLocation);
    setPropertyType(initialType);
    setBedroom(NO_BEDROOM_TYPES.includes(initialType) || COMMERCIAL_TYPES.includes(initialType) ? "Any" : initialBedroom);
    setArea(
      COMMERCIAL_TYPES.includes(initialType)
        ? areaLabelFromBounds(initialMinArea, initialMaxArea)
        : "Any"
    );

    const min = initialMinPrice ? Number(initialMinPrice) / 100000 : PRICE_MIN;
    const max = initialMaxPrice ? Number(initialMaxPrice) / 100000 : PRICE_MAX;

    setPrice([
      Number.isFinite(min) ? min : PRICE_MIN,
      Number.isFinite(max) ? max : PRICE_MAX,
    ]);
  }, [initialLocation, initialType, initialMinPrice, initialMaxPrice, initialBedroom, initialMinArea, initialMaxArea]);

  // Close any open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  const handleDropdownToggle = (dropdown: string) => {
    if (dropdown === "beds" && bedroomDisabled) return;
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const isPriceDefault =
    price[0] === DEFAULT_PRICE_RANGE[0] && price[1] === DEFAULT_PRICE_RANGE[1];

  const hasActiveFilters =
    location.trim() !== "" ||
    propertyType !== "All Types" ||
    !isPriceDefault ||
    (bedroom !== "Any" && !bedroomDisabled && !isCommercial) ||
    areaActive;

  const activeFilterCount = [
    location.trim() !== "",
    propertyType !== "All Types",
    !isPriceDefault,
    bedroom !== "Any" && !bedroomDisabled && !isCommercial,
    areaActive,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setLocation("");
    setPropertyType("All Types");
    setPrice(DEFAULT_PRICE_RANGE);
    setBedroom("Any");
    setArea("Any");
    setOpenDropdown(null);
    setActiveSuggestion(-1);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (propertyType !== "All Types") {
      params.set("propertyType", propertyType);
    }

    if (!isPriceDefault) {
      params.set("minPrice", String(price[0] * 100000));
      params.set("maxPrice", String(price[1] * 100000));
    }

    if (bedroom !== "Any" && !bedroomDisabled && !isCommercial) {
      params.set("bhk", bedroom.replace("+", ""));
    }

    if (areaActive) {
      if (selectedArea.min) params.set("minArea", selectedArea.min);
      if (selectedArea.max) params.set("maxArea", selectedArea.max);
    }

    setOpenDropdown(null);
    router.push(`/Projects?${params.toString()}`);
  };

  const selectLocation = (value: string) => {
    setLocation(value);
    setOpenDropdown(null);
    setActiveSuggestion(-1);
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isOpen = openDropdown === "location" && suggestionList.length > 0;

    if (e.key === "ArrowDown") {
      if (!isOpen) return;
      e.preventDefault();
      setActiveSuggestion((prev) => (prev + 1) % suggestionList.length);
      return;
    }

    if (e.key === "ArrowUp") {
      if (!isOpen) return;
      e.preventDefault();
      setActiveSuggestion((prev) => (prev <= 0 ? suggestionList.length - 1 : prev - 1));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeSuggestion >= 0) {
        selectLocation(suggestionLabel(suggestionList[activeSuggestion]));
      } else {
        setOpenDropdown(null);
        handleSearch();
      }
      return;
    }

    if (e.key === "Escape") {
      setOpenDropdown(null);
      setActiveSuggestion(-1);
    }
  };

  return (
    <section className="relative z-30 py-8 px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-card border border-border rounded-2xl p-6 shadow-xl"
        >
          {/* Search Fields */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
          >
            {/* Location */}
            <motion.div variants={item} className="lg:col-span-2">
              <label htmlFor="search-location" className="block text-sm text-muted-foreground mb-2">
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />

                <input
                  id="search-location"
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={openDropdown === "location"}
                  autoComplete="off"
                  placeholder="Enter city or neighborhood"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setActiveSuggestion(-1);
                    setOpenDropdown("location");
                  }}
                  onFocus={() => setOpenDropdown("location")}
                  onKeyDown={handleLocationKeyDown}
                  className="
                  w-full
                  pl-10
                  pr-9
                  py-3
                  rounded-xl
                  border
                  border-border
                  bg-input
                  transition-all
                  duration-300
                  focus:border-primary
                  focus:ring-0
                  focus:shadow-lg
                  focus:shadow-primary/10
                  hover:border-primary/40
                  hover:bg-primary/5
                  "
                />

                {cityLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
                )}

                <AnimatePresence>
                  {openDropdown === "location" &&
                    (suggestionList.length > 0 || cityError || (cityLoading && !showPopular)) && (
                      <motion.div
                        role="listbox"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-20"
                      >
                        {showPopular && (
                          <div className="px-4 pt-2 pb-1 text-xs font-medium text-muted-foreground">
                            Popular localities
                          </div>
                        )}

                        {cityError && !showPopular && (
                          <div className="px-4 py-3 text-sm text-muted-foreground">
                            {cityError}
                          </div>
                        )}

                        {!cityError && !showPopular && !cityLoading && suggestionList.length === 0 && (
                          <div className="px-4 py-3 text-sm text-muted-foreground">
                            No matches — try a different spelling
                          </div>
                        )}

                        {suggestionList.map((s, i) => (
                          <button
                            key={typeof s === "string" ? s : s.id ?? suggestionLabel(s)}
                            type="button"
                            role="option"
                            aria-selected={activeSuggestion === i}
                            onMouseEnter={() => setActiveSuggestion(i)}
                            onClick={() => selectLocation(suggestionLabel(s))}
                            className={`w-full flex items-center gap-2 px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                              activeSuggestion === i ? "bg-secondary" : ""
                            }`}
                          >
                            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="truncate">{suggestionLabel(s)}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Property Type */}
            <motion.div variants={item} className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Property Type
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "type"}
                onClick={() => handleDropdownToggle("type")}
                className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              >
                <div className="flex items-center gap-2 truncate">
                  <Home className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="truncate">{formatPropertyType(propertyType)}</span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                    openDropdown === "type" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "type" && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-20"
                  >
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        role="option"
                        aria-selected={propertyType === type}
                        onClick={() => {
                          setPropertyType(type);
                          setOpenDropdown(null);
                          if (COMMERCIAL_TYPES.includes(type)) {
                            setBedroom("Any");
                          } else {
                            setArea("Any");
                            if (NO_BEDROOM_TYPES.includes(type)) {
                              setBedroom("Any");
                            }
                          }
                        }}
                        className={`w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          propertyType === type ? "bg-secondary/60 font-medium" : ""
                        }`}
                      >
                        {formatPropertyType(type)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Price Range */}
            <motion.div variants={item} className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Price
              </label>

              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={openDropdown === "price"}
                onClick={() => handleDropdownToggle("price")}
                className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-xl bg-input"
              >
                <div className="flex items-center gap-2 truncate">
                  <IndianRupee className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="truncate">
                    {formatPrice(price[0])} - {formatPrice(price[1])}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    openDropdown === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "price" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="
                      absolute
                      top-full
                      left-0
                      mt-2
                      w-[calc(100vw-3rem)]
                      max-w-80
                      rounded-2xl
                      border
                      border-border
                      bg-card
                      p-5
                      shadow-2xl
                      z-50
                    "
                  >
                    <PriceSlider value={price} onChange={setPrice} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {isCommercial ? (
            /* Area (commercial) */
            <motion.div variants={item} className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Area (in Sq ft)
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "area"}
                onClick={() => handleDropdownToggle("area")}
                className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="truncate">
                    {area === "Any" ? "Any" : `${area} sq ft`}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                    openDropdown === "area" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "area" && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20"
                  >
                    {AREA_RANGES.map((range) => (
                      <button
                        key={range.label}
                        type="button"
                        role="option"
                        aria-selected={area === range.label}
                        onClick={() => {
                          setArea(range.label);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          area === range.label ? "bg-secondary/60 font-medium" : ""
                        }`}
                      >
                        {range.label === "Any" ? "Any" : `${range.label} sq ft`}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            ) : (
            /* Bedrooms */
            <motion.div variants={item} className="relative">
              <label className="block text-sm text-muted-foreground mb-2">
                Bedrooms
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "beds"}
                aria-disabled={bedroomDisabled}
                disabled={bedroomDisabled}
                onClick={() => handleDropdownToggle("beds")}
                title={bedroomDisabled ? "Not applicable for this property type" : undefined}
                className={`w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-lg text-foreground transition-opacity ${
                  bedroomDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>
                    {bedroomDisabled
                      ? "N/A"
                      : bedroom === "Any"
                      ? "Any"
                      : `${bedroom} Bed${bedroom === "1" ? "" : "s"}`}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                    openDropdown === "beds" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "beds" && !bedroomDisabled && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20"
                  >
                    {bedrooms.map((bed) => (
                      <button
                        key={bed}
                        type="button"
                        role="option"
                        aria-selected={bedroom === bed}
                        onClick={() => {
                          setBedroom(bed);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          bedroom === bed ? "bg-secondary/60 font-medium" : ""
                        }`}
                      >
                        {bed === "Any" ? "Any" : `${bed} Bedroom${bed === "1" ? "" : "s"}`}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            )}

            {/* Clear Filters */}
            <motion.div variants={item}>
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
                {activeFilterCount > 0 ? `Clear (${activeFilterCount})` : "Clear"}
              </Button>
            </motion.div>
          </motion.div>

          {/* Search Button */}
          <motion.div variants={item} className="mt-6 flex justify-center">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleSearch}
                className="
                  w-full
                  md:w-auto
                  px-12
                  h-14
                  rounded-xl
                  text-base
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}