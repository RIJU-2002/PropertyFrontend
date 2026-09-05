"use client"

import Image from "next/image"

const REPEAT_COUNT = 12

function BandContent() {
  return (
    <div className="flex items-center flex-nowrap">
      {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0 px-6">
          <Image
            src="/images/logo.jpeg"
            alt="Samriddh"
            width={22}
            height={22}
            className="rounded-sm shrink-0"
          />
          <span className="text-[#0D1B2A] font-semibold tracking-[0.25em] text-sm whitespace-nowrap uppercase">
            Samriddh
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D1B2A]/40 shrink-0" />
        </div>
      ))}
    </div>
  )
}

/**
 * Standalone section — safe to drop directly between other <section>/component
 * siblings in a page (it owns its own `relative` container and height).
 * Single diagonal gold band, tiled with logo + wordmark.
 */
export function CrissCrossBand() {
  return (
    <div className="relative w-full h-16 md:h-[4.5rem] overflow-hidden bg-background">
      <div
        className="absolute left-1/2 top-1/2 w-[180%] h-12 -translate-x-1/2 -translate-y-1/2  shadow-[0_6px_24px_rgba(0,0,0,.25)]"
        style={{
          background:
            "linear-gradient(90deg,#c9a84c 0%,#f5e6a7 25%,#c9a84c 50%,#f5e6a7 75%,#c9a84c 100%)",
        }}
      >
        <div className="flex items-center h-full overflow-hidden">
          <BandContent />
        </div>
      </div>
    </div>
  )
}
