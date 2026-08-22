"use client";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex-1">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4" />

            <div className="h-10 w-96 bg-gray-200 rounded mb-5" />

            <div className="flex gap-3 flex-wrap">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="w-full lg:w-80 border rounded-xl p-5">
            <div className="h-4 w-28 bg-gray-200 rounded mb-3" />

            <div className="h-10 w-36 bg-gray-200 rounded mb-4" />

            <div className="h-4 w-24 bg-gray-200 rounded mb-6" />

            <div className="h-12 bg-gray-200 rounded mb-3" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2 h-80 rounded-xl bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        {/* Left */}
        <div className="flex-1 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-6"
            >
              <div className="h-6 w-48 bg-gray-200 rounded mb-5" />

              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-80 hidden lg:block">
          <div className="border rounded-xl p-5">
            <div className="h-8 w-36 bg-gray-200 rounded mb-5" />

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 rounded mb-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
