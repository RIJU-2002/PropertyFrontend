"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  IndianRupee,
  Percent,
  Clock3,
  Heart,
  Building2,
} from "lucide-react";

import { InvestmentProject } from "@/types/roi";
import { useSavedProject } from "@/hooks/useSavedProperty";

interface ROIProjectCardProps {
  project: InvestmentProject;
  initialSaved?: boolean;
}

const formatPrice = (price: string | null) => {
  if (!price) return "Price on Request";

  const value = Number(price);

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const formatPriceRange = (
  minPrice: string | null,
  maxPrice: string | null
) => {
  if (!minPrice && !maxPrice) {
    return "Price on Request";
  }

  if (minPrice && maxPrice) {
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  }

  return formatPrice(minPrice || maxPrice);
};

export default function ROIProjectCard({
  project,
  initialSaved = false,
}: ROIProjectCardProps) {
  const image =
    project.images.find((img) => img.isCover)?.url ||
    project.images[0]?.url ||
    "/placeholder-property.jpg";

  const location = [project.locality?.name, project.city?.name]
    .filter(Boolean)
    .join(", ");

  const { isSaved, isLoading, toggleSave } = useSavedProject(
    project.id,
    initialSaved
  );

  return (
    <Link
      href={`/Projects/${project.slug}`}
      className="group block"
    >
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-[320px] h-[230px] md:h-[250px] flex-shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 320px"
            />

            {/* Investment Hotspot */}
            {project.isInvestmentHotspot && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow">
                <TrendingUp className="w-3.5 h-3.5" />
                Investment Hotspot
              </div>
            )}

            {/* Save */}
            <button
              onClick={toggleSave}
              disabled={isLoading}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition disabled:opacity-50"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved
                    ? "fill-red-500 text-red-500"
                    : "text-gray-700"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 md:p-6">
            <div className="flex flex-col h-full">
              {/* Title */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {project.name}
                  </h2>

                  <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>
                </div>

                {/* Score */}
                {project.investmentScore !== null && (
                  <div className="flex-shrink-0 text-center">
                    <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center">
                      <span className="text-lg font-semibold text-green-600">
                        {project.investmentScore}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Score
                    </p>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-4">
                <IndianRupee className="w-5 h-5 text-primary" />

                <span className="text-lg font-semibold text-gray-900">
                  {formatPriceRange(
                    project.minPrice,
                    project.maxPrice
                  )}
                </span>
              </div>

              {/* Investment Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Percent className="w-3.5 h-3.5" />
                    Rental Yield
                  </div>

                  <p className="font-semibold text-green-600 mt-1">
                    {project.rentalYield !== null
                      ? `${project.rentalYield}%`
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Appreciation
                  </div>

                  <p className="font-semibold text-green-600 mt-1">
                    {project.appreciationRate !== null
                      ? `${project.appreciationRate}%`
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <IndianRupee className="w-3.5 h-3.5" />
                    Monthly Rent
                  </div>

                  <p className="font-semibold text-gray-900 mt-1">
                    {project.expectedRentMonthly
                      ? `₹${project.expectedRentMonthly.toLocaleString(
                          "en-IN"
                        )}`
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Clock3 className="w-3.5 h-3.5" />
                    Payback
                  </div>

                  <p className="font-semibold text-gray-900 mt-1">
                    {project.paybackYears !== null
                      ? `${project.paybackYears} yrs`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {project.rentalDemand && (
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                      {project.rentalDemand} Rental Demand
                    </span>
                  )}

                  {project.possessionStatus && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      {project.possessionStatus.replaceAll(
                        "_",
                        " "
                      )}
                    </span>
                  )}
                </div>

                {project.investmentTagline && (
                  <span className="text-sm font-medium text-primary">
                    {project.investmentTagline.trim()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
