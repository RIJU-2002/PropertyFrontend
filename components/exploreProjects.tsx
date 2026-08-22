"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  HardHat,
  Home,
  Building2,
  Trees,
  MapPin,
  Layers3,
  Clock3,
  BedDouble,
  type LucideIcon,
} from "lucide-react";
import {
  getStatusCounts,
  getTypeCounts,
  getPossessionCounts,
  getBhkCounts,
} from "@/hooks/fetchCounts";

type Tone = "gold" | "bronze" | "ink";

interface ExploreCard {
  key: string;
  label: string;
  icon: LucideIcon;
  tone: Tone;
  sheet: string; // architectural sheet reference, e.g. "A-01"
  params: Record<string, string>;
}

/* Accent-only tone system — every card shares the same ivory plate,
   the tone just changes the accent (icon badge, sheet tag, hover rule). */
const TONE_ACCENT: Record<Tone, string> = {
  gold: "#B8863E",
  bronze: "#8B6F2E",
  ink: "#1A1A1A",
};

/* ── Status cards ───────────────────────────────────────── */
const STATUS_CARDS: ExploreCard[] = [
  {
    key: "NEW_LAUNCH",
    label: "New launch",
    icon: Rocket,
    tone: "gold",
    sheet: "A-01",
    params: { isNewLaunch: "true" },
  },
  {
    key: "UNDER_CONSTRUCTION",
    label: "Under construction",
    icon: HardHat,
    tone: "bronze",
    sheet: "A-02",
    params: { possessionStatus: "UNDER_CONSTRUCTION" },
  },
  {
    key: "READY_TO_MOVE",
    label: "Ready to move in",
    icon: Home,
    tone: "ink",
    sheet: "A-03",
    params: { possessionStatus: "READY_TO_MOVE" },
  },
];

/* ── Type cards ─────────────────────────────────────────── */
const TYPE_CARDS: ExploreCard[] = [
  {
    key: "APARTMENT",
    label: "Apartment",
    icon: Building2,
    tone: "gold",
    sheet: "B-01",
    params: { propertyType: "APARTMENT" },
  },
  {
    key: "VILLA",
    label: "Villa",
    icon: Trees,
    tone: "bronze",
    sheet: "B-02",
    params: { propertyType: "VILLA" },
  },
  {
    key: "PLOT",
    label: "Plot",
    icon: MapPin,
    tone: "ink",
    sheet: "B-03",
    params: { propertyType: "PLOT" },
  },
  {
    key: "BUILDER_FLOOR",
    label: "Builder floor",
    icon: Layers3,
    tone: "gold",
    sheet: "B-04",
    params: { propertyType: "BUILDER_FLOOR" },
  },
];

/* ── Possession cards ───────────────────────────────────── */
// ⚠️ These params are NOT handled by your current backend.
// See the note in fetchCounts.ts.
const POSSESSION_CARDS: ExploreCard[] = [
  {
    key: "IMMEDIATE",
    label: "Immediate",
    icon: Clock3,
    tone: "gold",
    sheet: "C-01",
    params: { possession: "IMMEDIATE" },
  },
  {
    key: "WITHIN_6M",
    label: "Within 6 months",
    icon: Clock3,
    tone: "bronze",
    sheet: "C-02",
    params: { possession: "WITHIN_6M" },
  },
  {
    key: "WITHIN_1Y",
    label: "Within 1 year",
    icon: Clock3,
    tone: "ink",
    sheet: "C-03",
    params: { possession: "WITHIN_1Y" },
  },
  {
    key: "BEYOND_1Y",
    label: "2+ years",
    icon: Clock3,
    tone: "gold",
    sheet: "C-04",
    params: { possession: "BEYOND_1Y" },
  },
];

/* ── BHK cards ──────────────────────────────────────────── */
const BHK_TONES: Tone[] = ["gold", "bronze", "ink"];
const BHK_CARDS: ExploreCard[] = ["1", "2", "3", "4", "5+"].map((n, i) => ({
  key: n,
  label: n === "5+" ? "5+ BHK" : `${n} BHK`,
  icon: BedDouble,
  tone: BHK_TONES[i % BHK_TONES.length],
  sheet: `D-0${i + 1}`,
  params: { bhk: n.replace("+", "") },
}));

type TabKey = "status" | "type" | "possession" | "bhk";

const TABS: { key: TabKey; label: string }[] = [
  { key: "status", label: "Project status" },
  { key: "type", label: "Project type" },
  { key: "bhk", label: "BHK" },
];

const CARDS_BY_TAB: Record<TabKey, ExploreCard[]> = {
  status: STATUS_CARDS,
  type: TYPE_CARDS,
  possession: POSSESSION_CARDS,
  bhk: BHK_CARDS,
};

export function ExploreProjects() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("status");
  const [counts, setCounts] = useState<Record<TabKey, Record<string, number>>>({
    status: {},
    type: {},
    possession: {},
    bhk: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [status, type, possession, bhk] = await Promise.all([
          getStatusCounts(),
          getTypeCounts(),
          getPossessionCounts(),
          getBhkCounts(),
        ]);
        if (!cancelled) {
          setCounts({ status, type, possession, bhk });
        }
      } catch {
        /* non-critical */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCards = CARDS_BY_TAB[activeTab];

  const handleCardClick = (card: ExploreCard) => {
    const params = new URLSearchParams(card.params);
    router.push(`/Projects?${params.toString()}`);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F3EFE4" }}>
      {/* faint drafting-grid backdrop, evokes a blueprint sheet, kept very subtle on light ground */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#B8863E 1px, transparent 1px), linear-gradient(90deg, #B8863E 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow + headline */}
        <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8860B]">
                Browse by
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] text-foreground leading-tight">
              Explore Projects
            </h2>
          </div>

        {/* Tabs — a quiet directory rail, not pills */}
        <div
          role="tablist"
          aria-label="Explore projects by"
          className="flex gap-8 sm:gap-10 border-b mb-12  pt-10"
          style={{ borderColor: "rgba(184,134,62,0.25)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative pb-4 text-sm sm:text-base whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863E]/50 rounded-t"
              style={{
                color: activeTab === tab.key ? "#1A1A1A" : "rgba(26,26,26,0.4)",
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="explore-tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-[2px]"
                  style={{ backgroundColor: "#B8863E" }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -8 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            role="tabpanel"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {activeCards.map((card) => {
              const Icon = card.icon;
              const count = counts[activeTab][card.key];
              const accent = TONE_ACCENT[card.tone];

              return (
                <motion.button
                  key={card.key}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="group relative text-left rounded-2xl p-6 overflow-hidden focus-visible:outline-none focus-visible:ring-2 transition-shadow duration-300"
                  style={{
                    backgroundColor: "#FDFBF5",
                    border: "1px solid rgba(26,26,26,0.06)",
                    boxShadow: "0 1px 3px rgba(26,26,26,0.06), 0 8px 20px rgba(26,26,26,0.03)",
                  }}
                >
                  {/* sheet tag, like a drawing reference number */}
                  <span
                    className="absolute top-4 right-5 text-[10px] tracking-[0.15em]"
                    style={{ color: accent, opacity: 0.55}}
                  >
                    {card.sheet}
                  </span>

                  {/* icon badge, echoing the stat-card chips in the hero */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>

                  <div
                    className="text-lg mb-3"
                    style={{ color: "#1A1A1A" }}
                  >
                    {card.label}
                  </div>

                  <div
                    className="h-px w-8 mb-3 transition-all duration-300 group-hover:w-14"
                    style={{ backgroundColor: accent, opacity: 0.6 }}
                  />

                  <div className="text-sm" style={{ color: "#6B6459" }}>
                    {loading ? (
                      <span className="inline-block h-4 w-24 rounded animate-pulse" style={{ backgroundColor: "rgba(26,26,26,0.06)" }} />
                    ) : count !== undefined ? (
                      <>
                        <span
                          style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                          className="text-xl mr-1.5"
                        >
                          {count.toLocaleString("en-IN")}
                        </span>
                        projects
                      </>
                    ) : (
                      "View projects"
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}