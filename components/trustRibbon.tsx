"use client"

import { ShieldCheck, HandCoins, Scale, BadgeCheck, Headset, Gem } from "lucide-react"

const badges = [
  {
    icon: ShieldCheck,
    label: "RERA Verified",
  },
  {
    icon: HandCoins,
    label: "Zero Brokerage",
  },
  {
    icon: Scale,
    label: "Legal Support",
  },
  {
    icon: BadgeCheck,
    label: "Verified Listings",
  },
  {
    icon: Headset,
    label: "End-to-End Assistance",
  },
  {
    icon: Gem,
    label: 'Best Prices'
  }
]

function BadgeItem({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 mx-6">
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30">
        <Icon className="w-4 h-4 text-[#C9A84C]" />
      </span>
      <span className="text-sm font-medium tracking-wide text-[#FAF7F2] whitespace-nowrap">
        {label}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 ml-6" />
    </div>
  )
}

export function TrustRibbon() {
  return (
    <div className="relative bg-[#0D1B2A] overflow-hidden">
      {/* top gold hairline, matches header ornament */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[linear-gradient(90deg,#c9a84c_0%,#f5e6a7_25%,#c9a84c_50%,#f5e6a7_75%,#c9a84c_100%)] opacity-90" />

      <div className="marquee-mask py-4">
        <div className="marquee-track flex items-center w-max">
          {/* two copies back to back so the loop is seamless */}
          <div className="flex items-center">
            {badges.map((badge, i) => (
              <BadgeItem key={`a-${i}`} {...badge} />
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {badges.map((badge, i) => (
              <BadgeItem key={`b-${i}`} {...badge} />
            ))}
          </div>
        </div>
      </div>

      {/* bottom gold hairline */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[linear-gradient(90deg,#c9a84c_0%,#f5e6a7_25%,#c9a84c_50%,#f5e6a7_75%,#c9a84c_100%)] opacity-90" />

      <style jsx>{`
        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 5%,
            #000 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 5%,
            #000 95%,
            transparent 100%
          );
        }
        .marquee-track {
          animation: marquee 22s linear infinite;
        }
        .marquee-mask:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
