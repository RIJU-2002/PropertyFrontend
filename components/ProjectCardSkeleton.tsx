"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300">
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

      <div className="flex flex-col md:flex-row">
        {/* ================= IMAGE ================= */}
        <div className="relative aspect-[4/3] md:w-[320px] md:min-w-[320px] overflow-hidden">
          <Skeleton className="h-full w-full rounded-none bg-[#EEE8DA]" />

          {/* Trending Badge */}
          <div className="absolute top-4 left-0">
            <Skeleton className="h-7 w-24 rounded-r-full rounded-l-none bg-[#E7DFC9]" />
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Skeleton className="h-9 w-9 rounded-full bg-[#E7DFC9]" />
            <Skeleton className="h-9 w-9 rounded-full bg-[#E7DFC9]" />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            {/* Status */}
            <div className="mb-3 flex flex-wrap gap-2">
              <Skeleton className="h-7 w-28 rounded-full bg-[#ECE3D1]" />
              <Skeleton className="h-7 w-36 rounded-full bg-[#ECE3D1]" />
            </div>

            {/* Title */}
            <Skeleton className="mb-2 h-8 w-[70%] rounded-md bg-[#E6DDCB]" />

            {/* RERA */}
            <Skeleton className="mb-4 h-3.5 w-36 rounded bg-[#EFE8D8]" />

            {/* Location */}
            <div className="mb-1 flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full bg-[#E8DFCD]" />
              <Skeleton className="h-4 w-56 rounded bg-[#EFE8D8]" />
            </div>

            {/* Builder */}
            <div className="mb-4 flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full bg-[#E8DFCD]" />
              <Skeleton className="h-4 w-44 rounded bg-[#EFE8D8]" />
            </div>

            {/* Configurations */}
            <div className="mb-4 space-y-2 border-b border-gray-100 pb-4">
              <Skeleton className="h-4 w-full rounded bg-[#ECE4D3]" />
              <Skeleton className="h-4 w-[88%] rounded bg-[#ECE4D3]" />
              <Skeleton className="h-4 w-[76%] rounded bg-[#ECE4D3]" />
            </div>

            {/* Amenities */}
            <div className="mb-4 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-7 w-20 rounded-full bg-[#ECE4D3]"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex gap-3">
            <Skeleton className="h-[42px] flex-1 rounded-full bg-[#E6DDCB]" />
            <Skeleton className="h-[42px] flex-1 rounded-full bg-[#E6DDCB]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
