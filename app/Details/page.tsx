"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import EnquiryModal from "@/components/project-details/EnquiryModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Config {
  type: string;
  area: string;
  price: string;
  avail: string;
  warn?: boolean;
  sqft: number;
}

interface SpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface Amenity {
  icon: string;
  name: string;
}

interface FloorPlan {
  label: string;
  sqft: number;
}

interface NearbyPlace {
  icon: string;
  name: string;
  dist: string;
}

interface ProgressStep {
  label: string;
  value: string;
  status: "done" | "active" | "pending";
}

interface TimelineEvent {
  date: string;
  title: string;
  sub: string;
  status: "done" | "active" | "pending";
  pct?: string;
}

interface SimilarProject {
  name: string;
  location: string;
  price: string;
  badge: string;
  badgeColor: string;
  gradient: string;
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  toast: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const CONFIGS: Config[] = [
  { type: "2 BHK", area: "875 – 1050 sq.ft", price: "₹68L – ₹85L",   avail: "✓ 28 Units Available", sqft: 875 },
  { type: "3 BHK", area: "1200 – 1450 sq.ft", price: "₹98L – ₹1.18Cr", avail: "✓ 18 Units Available", sqft: 1200 },
  { type: "3 BHK+", area: "1450 – 1650 sq.ft", price: "₹1.18Cr – ₹1.35Cr", avail: "⚠ 6 Units Left", warn: true, sqft: 1450 },
];

const SPECS: SpecRow[] = [
  { label: "Unit Type",          value: "2 BHK (Selected)",        highlight: true },
  { label: "Super Built-up Area",value: "875 – 1050 sq.ft" },
  { label: "Carpet Area",        value: "590 – 710 sq.ft (RERA)" },
  { label: "Bedrooms",           value: "2 Bedrooms + 2 Bathrooms" },
  { label: "Living / Dining",    value: "Combined, 240 sq.ft approx." },
  { label: "Kitchen",            value: "Semi-modular with utility area" },
  { label: "Balconies",          value: "2 (Living + Master Bedroom)" },
  { label: "Floor Height",       value: "10 ft (Floor to Floor)" },
  { label: "Flooring",           value: "Vitrified tiles · Master BD: Wooden laminate" },
  { label: "Facing",             value: "North-East / South-West options" },
  { label: "Price per sq.ft",    value: "₹7,772 – ₹8,095",         highlight: true },
];

const AMENITIES: Amenity[] = [
  { icon: "🏊", name: "Swimming Pool" },
  { icon: "🏋️", name: "Gymnasium" },
  { icon: "🏸", name: "Badminton Court" },
  { icon: "👶", name: "Children's Play Area" },
  { icon: "🚗", name: "Covered Parking" },
  { icon: "🔒", name: "24×7 Security" },
  { icon: "🌳", name: "Landscaped Garden" },
  { icon: "⚡", name: "Power Backup" },
  { icon: "🛗", name: "High-Speed Lifts" },
  { icon: "📡", name: "Smart Home Ready" },
  { icon: "☀️", name: "Solar Panels" },
  { icon: "🚰", name: "24H Water Supply" },
  { icon: "🧹", name: "Waste Management" },
  { icon: "🌐", name: "Fibre-ready" },
  { icon: "🧘", name: "Yoga Deck" },
  { icon: "🎭", name: "Community Hall" },
];

const FLOOR_PLANS: FloorPlan[] = [
  { label: "2 BHK — 875 sq.ft",  sqft: 875 },
  { label: "2 BHK — 1050 sq.ft", sqft: 1050 },
  { label: "3 BHK — 1200 sq.ft", sqft: 1200 },
  { label: "3 BHK — 1450 sq.ft", sqft: 1450 },
  { label: "3 BHK+ — 1650 sq.ft",sqft: 1650 },
];

const NEARBY: NearbyPlace[] = [
  { icon: "🚇", name: "New Town Metro",         dist: "1.2 km · 4 min" },
  { icon: "✈️", name: "Netaji S.C. Airport",    dist: "12 km · 20 min" },
  { icon: "🏥", name: "Apollo Hospital",          dist: "3.5 km · 8 min" },
  { icon: "🏫", name: "DPS New Town",             dist: "1.8 km · 5 min" },
  { icon: "🛍️", name: "City Centre 2",           dist: "2.1 km · 6 min" },
  { icon: "💼", name: "Sector V IT Hub",          dist: "5 km · 12 min" },
  { icon: "🏦", name: "HDFC Bank ATM",            dist: "0.4 km · 2 min" },
  { icon: "🌿", name: "Eco Park",                 dist: "2.8 km · 7 min" },
];

const PROGRESS_STEPS: ProgressStep[] = [
  { label: "Foundation",            value: "Completed",   status: "done" },
  { label: "Structure",             value: "7F Complete", status: "done" },
  { label: "Flooring & Finishing",  value: "In Progress", status: "active" },
  { label: "Amenities",             value: "Dec 2025",    status: "pending" },
  { label: "Possession",            value: "Dec 2026",    status: "pending" },
];

const TIMELINE: TimelineEvent[] = [
  {
    date: "March 2024", status: "done",
    title: "Foundation & Excavation Complete",
    sub: "Pile foundation completed with structural audit approval from WBHIDCO certified engineers.",
    pct: "100% Complete",
  },
  {
    date: "October 2024", status: "done",
    title: "Podium Structure Finished",
    sub: "Ground + 4 floors completed. Basement parking slab cast. Utilities duct installed.",
    pct: "100% Complete",
  },
  {
    date: "April 2025", status: "done",
    title: "7th Floor Slab Complete",
    sub: "Structural frame up to Floor 7. Brickwork underway in Floors 3–5. Lift shaft erected.",
    pct: "100% Complete",
  },
  {
    date: "June 2026 · Current", status: "active",
    title: "Internal Finishing in Progress (Floors 3–7)",
    sub: "Plastering, tiling, and MEP rough-in underway in lower floors. Structure continuing above.",
    pct: "62% Complete",
  },
  {
    date: "September 2026 · Upcoming", status: "pending",
    title: "Amenity Deck & Landscaping",
    sub: "Pool, gymnasium, children's area and landscaped podium scheduled for September 2026.",
  },
  {
    date: "December 2026 · Target", status: "pending",
    title: "OC & Possession",
    sub: "Occupancy certificate expected. Possession handover ceremonies planned for December 2026.",
  },
];

const SIMILAR: SimilarProject[] = [
  {
    name: "Samriddh Grandeur", location: "📍 Howrah, Shibpur",
    price: "₹95 Lakh", badge: "READY TO MOVE",
    badgeColor: "#3B6D11", gradient: "linear-gradient(135deg,#2A1845,#1A0D37)",
  },
  {
    name: "Samriddh Crown", location: "📍 Rajarhat, Action Area I",
    price: "₹1.45 Cr", badge: "LUXURY",
    badgeColor: "#C9A84C", gradient: "linear-gradient(135deg,#3A2000,#5A3500)",
  },
  {
    name: "Samriddh Nest", location: "📍 Durgapur, Bengal Silicon",
    price: "₹38 Lakh", badge: "AFFORDABLE",
    badgeColor: "#185FA5", gradient: "linear-gradient(135deg,#003A2A,#001A10)",
  },
];

const CONTACTS: ContactItem[] = [
  { icon: "📞", label: "Call Us",   value: "+91 98XXX XXXXX", toast: "Calling +91 98XXX XXXXX…" },
  { icon: "💬", label: "WhatsApp", value: "Chat Now →",       toast: "Opening WhatsApp chat…" },
  { icon: "📧", label: "Email",    value: "info@samriddhrealty.in", toast: "Opening email client…" },
  { icon: "📄", label: "Brochure", value: "Download PDF →",   toast: "📥 Downloading brochure…" },
];

const SECTION_IDS = [
  "overview", "configs", "amenities", "floorplan", "location", "emi", "updates",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const TAB_LABELS: Record<SectionId, string> = {
  overview:   "Overview",
  configs:    "Configurations",
  amenities:  "Amenities",
  floorplan:  "Floor Plan",
  location:   "Location",
  emi:        "EMI Calculator",
  updates:    "Construction Updates",
};

// ─── Utility ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function calcEmi(principal: number, ratePa: number, years: number): {
  emi: number; interest: number; total: number;
} {
  const r = ratePa / 12 / 100;
  const n = years * 12;
  const emi = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const total = emi * n;
  const interest = total - principal;
  return { emi, interest, total };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className={styles.toast}>{message}</div>;
}

function FloorPlanSvg() {
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none"
      stroke="#C9A84C" strokeWidth="1.5" opacity="0.6">
      <rect x="10" y="10" width="60" height="45" rx="1" />
      <text x="33" y="36" fontSize="8" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">Living</text>
      <rect x="75" y="10" width="55" height="40" rx="1" />
      <text x="87" y="33" fontSize="8" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">Master BD</text>
      <rect x="75" y="55" width="55" height="35" rx="1" />
      <text x="88" y="75" fontSize="8" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">BD 2</text>
      <rect x="10" y="60" width="30" height="30" rx="1" />
      <text x="15" y="78" fontSize="7" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">Kitchen</text>
      <rect x="44" y="60" width="27" height="14" rx="1" />
      <text x="48" y="70" fontSize="6" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">Bath 1</text>
      <rect x="44" y="78" width="27" height="12" rx="1" />
      <text x="48" y="87" fontSize="6" fill="#C9A84C" opacity=".6" fontFamily="DM Sans">Bath 2</text>
      <rect x="10" y="94" width="60" height="16" rx="1" strokeDasharray="3 2" />
      <text x="30" y="105" fontSize="7" fill="#C9A84C" opacity=".5" fontFamily="DM Sans">Balcony</text>
    </svg>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function SamriddhHeightsPage() {
  // ── State ──
  const [activeConfig, setActiveConfig]     = useState(0);
  const [activeTab, setActiveTab]           = useState<SectionId>("overview");
  const [activeFloor, setActiveFloor]       = useState(0);
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalProp, setModalProp]           = useState("Samriddh Heights, New Town");
  const [toast, setToast]                   = useState<string | null>(null);
  const [loanAmt, setLoanAmt]               = useState(5_440_000);
  const [loanRate, setLoanRate]             = useState(8.5);
  const [loanTenure, setLoanTenure]         = useState(20);

  const { emi, interest, total } = calcEmi(loanAmt, loanRate, loanTenure);

  // ── Helpers ──
  const openModal = (name: string) => { setModalProp(name); setModalOpen(true); };
  const showToast = useCallback((msg: string) => { setToast(msg); }, []);

  // ── Scroll-spy ──
  useEffect(() => {
    const handler = () => {
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top < 160) {
          setActiveTab(SECTION_IDS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: SectionId) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Step dot class ──
  const dotClass = (status: ProgressStep["status"]) =>
    `${styles.stepDot} ${status === "done" ? styles.stepDotDone : status === "active" ? styles.stepDotActive : styles.stepDotPending}`;

  const tlDotClass = (status: TimelineEvent["status"]) =>
    `${styles.timelineDot} ${status === "done" ? styles.dotDone : status === "active" ? styles.dotActive : styles.dotPending}`;

  // ── Current floor plan info ──
  const fp = FLOOR_PLANS[activeFloor];
  const carpet = Math.round(fp.sqft * 0.67);

  // ── Selected config for spec table ──
  const cfg = CONFIGS[activeConfig];

  return (
    <>
      {/* ── FONT PRELOAD ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #FAF7F2; color: #1A1A1A; overflow-x: hidden; }
        h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAF7F2; }
        ::-webkit-scrollbar-thumb { background: #E8D5A0; border-radius: 3px; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.navLogoMark}>S</div>
          <div className={styles.navBrand}>
            Samriddh Realty
            <small>Authorised Marketing Partner</small>
          </div>
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">← All Projects</Link></li>
          <li><Link href="#">New Launch</Link></li>
          <li><Link href="#">Ready to Move</Link></li>
          <li><Link href="#">Loan Calculator</Link></li>
          <li><Link href="#">About</Link></li>
        </ul>
        <div className={styles.navCta}>
          <button className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => openModal("Samriddh Heights")}>
            Schedule Visit
          </button>
          <button className={`${styles.btn} ${styles.btnGold}`}
            onClick={() => openModal("Samriddh Heights")}>
            📞 Enquire Now
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className={styles.projHero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.sep}>›</span>
          <Link href="/projects">Projects</Link>
          <span className={styles.sep}>›</span>
          <Link href="/projects?location=new-town">New Town, Kolkata</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.active}>Samriddh Heights</span>
        </nav>

        <div className={styles.projHeader}>
          <div>
            <div className={styles.projBadges}>
              <span className={`${styles.projBadge} ${styles.pbNew}`}>🔥 New Launch</span>
              <span className={`${styles.projBadge} ${styles.pbRera}`}>✓ RERA: WBRERA/P/KOL/2024/001</span>
            </div>
            <h1 className={styles.projTitle}>Samriddh Heights</h1>
            <div className={styles.projMeta}>
              <span className={styles.projMetaItem}>📍 <strong>New Town, Action Area II, Kolkata</strong></span>
              <span className={styles.projMetaItem}>🏗️ By <strong>Samriddh Developers</strong></span>
              <span className={styles.projMetaItem}>📅 Possession: <strong>December 2026</strong></span>
              <span className={styles.projMetaItem}>🏢 <strong>G+14 Floors · 120 Units</strong></span>
              <span className={styles.projMetaItem}>
                ⭐ <strong style={{ color: "var(--gold)" }}>4.8 / 5</strong>&nbsp;<strong>(82 Reviews)</strong>
              </span>
            </div>
          </div>

          <div className={styles.projPriceBlock}>
            <div className={styles.priceLabel}>Starting From</div>
            <div className={styles.price}>₹68 Lakh</div>
            <div className={styles.priceConfig}>Onwards · 2 BHK · 875 sq.ft</div>
            <button className={`${styles.btn} ${styles.btnGold} ${styles.btnFull} ${styles.btnLg}`}
              onClick={() => openModal("Samriddh Heights")}>
              Get Best Price
            </button>
            <div className={styles.ctaRow}>
              <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                onClick={() => showToast("📅 Site visit request sent! We'll confirm within 2 hours.")}>
                🗓 Schedule Visit
              </button>
              <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                onClick={() => showToast("📄 Brochure link sent to your WhatsApp!")}>
                📄 Brochure
              </button>
            </div>
            <div className={styles.ctaNote}>🔒 No spam. Free callback in 30 min.</div>
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className={styles.progressWrap}>
        {PROGRESS_STEPS.map((step, i) => (
          <div key={i}
            className={`${styles.progressStep} ${step.status === "pending" ? styles.pending : ""}`}>
            <div className={dotClass(step.status)}>
              {step.status === "done" ? "✓" : step.status === "active" ? "≈" : "○"}
            </div>
            <div>
              <div className={styles.stepLabel}>{step.label}</div>
              <div className={styles.stepVal}>{step.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── GALLERY ── */}
      <div className={styles.gallery}>
        {[
          { gradient: "linear-gradient(135deg,#1A2F45,#0D4A3A)", label: "Main Exterior View", isMain: true },
          { gradient: "linear-gradient(135deg,#2A1845,#0D1B2A)", label: "Living Room" },
          { gradient: "linear-gradient(135deg,#3A2000,#1A1000)", label: "Master Bedroom" },
          { gradient: "linear-gradient(135deg,#003A2A,#001A10)", label: "Modular Kitchen" },
          { gradient: "linear-gradient(135deg,#2A0020,#1A0810)", label: "Pool & Amenities" },
        ].map((item, i) => (
          <div key={i} className={styles.galleryItem}>
            <div className={styles.galleryBg} style={{ background: item.gradient }}>
              {item.isMain && (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="1.2" opacity=".2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              )}
              <span className={styles.galleryLabel}>{item.label}</span>
            </div>
            <div className={styles.galleryOverlay}>
              <span>{item.isMain ? "View Gallery" : "View"}</span>
            </div>
            {item.isMain && (
              <div className={styles.galleryCount}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                32 Photos
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div className={styles.tabs}>
        {SECTION_IDS.map((id) => (
          <button key={id}
            className={`${styles.tab} ${activeTab === id ? styles.tabActive : ""}`}
            onClick={() => scrollTo(id)}>
            {TAB_LABELS[id]}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className={styles.projBody}>
        <main className={styles.projMain}>

          {/* OVERVIEW */}
          <section className={styles.card} id="overview">
            <div className={styles.cardHead}>About the Project</div>
            <p className={styles.prose}>
              Samriddh Heights is a premium residential development located in the heart of New
              Town&apos;s Action Area II — Kolkata&apos;s fastest-growing urban precinct. Designed
              for modern families seeking comfort, connectivity, and an elevated lifestyle, this
              G+14 tower offers meticulously planned 2 and 3 BHK apartments with superior
              specifications and world-class amenities.
            </p>
            <p className={styles.prose} style={{ marginBottom: 20 }}>
              Located minutes from the IT hub, top schools, hospitals, and the New Town metro
              corridor, Samriddh Heights perfectly balances urban vibrancy with serene residential
              living. Each apartment is designed for optimal natural light, cross-ventilation, and
              privacy.
            </p>
            <div className={styles.highlightsGrid}>
              {[
                { icon: "🌿", title: "Green Building Certified",  sub: "IGBC pre-certified with 40% open landscape area" },
                { icon: "🔐", title: "Smart Security",             sub: "Video door phone, CCTV & biometric access in every unit" },
                { icon: "⚡", title: "100% Power Backup",          sub: "DG backup for all apartments and common areas" },
                { icon: "🚇", title: "Metro Connectivity",         sub: "1.2 km from proposed New Town Metro Station" },
              ].map((h) => (
                <div key={h.title} className={styles.highlightItem}>
                  <div className={styles.hlIcon}>{h.icon}</div>
                  <div>
                    <div className={styles.hlTitle}>{h.title}</div>
                    <div className={styles.hlSub}>{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONFIGURATIONS */}
          <section className={styles.card} id="configs">
            <div className={styles.cardHead}>
              Available Configurations
              <span className={styles.cardHeadSub}>Click to explore each type</span>
            </div>
            <div className={styles.configGrid}>
              {CONFIGS.map((c, i) => (
                <div key={c.type}
                  className={`${styles.configItem} ${activeConfig === i ? styles.configItemActive : ""}`}
                  onClick={() => setActiveConfig(i)}>
                  <div className={styles.configType}>{c.type}</div>
                  <div className={styles.configArea}>{c.area}</div>
                  <div className={styles.configPrice}>{c.price}</div>
                  <div className={c.warn ? styles.configAvailWarn : styles.configAvail}>{c.avail}</div>
                </div>
              ))}
            </div>

            <table className={styles.specTable}>
              <tbody>
                {SPECS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    <td className={row.highlight ? styles.specHighlight : ""}>
                      {i === 0 ? `${cfg.type} (Selected)` : i === SPECS.length - 1
                        ? `₹${Math.round(cfg.sqft * 7772 / cfg.sqft).toLocaleString("en-IN")} – ₹${Math.round(cfg.sqft * 8095 / 875 * (cfg.sqft / 875)).toLocaleString("en-IN")}`
                        : row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* AMENITIES */}
          <section className={styles.card} id="amenities">
            <div className={styles.cardHead}>Amenities &amp; Features</div>
            <div className={styles.amenityGrid}>
              {AMENITIES.map((a) => (
                <div key={a.name} className={styles.amenity}>
                  <div className={styles.amenityIcon}>{a.icon}</div>
                  <div>{a.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FLOOR PLAN */}
          <section className={styles.card} id="floorplan">
            <div className={styles.cardHead}>
              Floor Plan
              <button className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`}
                onClick={() => showToast("📥 Floor plan PDF downloading…")}>
                ⬇ Download PDF
              </button>
            </div>
            <div className={styles.floorTabs}>
              {FLOOR_PLANS.map((f, i) => (
                <button key={f.label}
                  className={`${styles.floorTab} ${activeFloor === i ? styles.floorTabActive : ""}`}
                  onClick={() => setActiveFloor(i)}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.floorPlanViewer}>
              <FloorPlanSvg />
              <div className={styles.floorPlanLabel}>
                {fp.label} · Unit Type {String.fromCharCode(65 + activeFloor)} · Ground to 14th Floor
              </div>
              <div className={styles.floorPlanSize}>
                Super Built-up: {fp.sqft} sq.ft · Carpet: {carpet} sq.ft
              </div>
            </div>
            <div className={styles.floorPlanActions}>
              <button className={`${styles.btn} ${styles.btnNavy}`}
                onClick={() => showToast("🗓 Site visit scheduled! Check your email.")}>
                🏠 Book Site Visit
              </button>
              <button className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => showToast("📤 Floor plan sent to your WhatsApp!")}>
                📤 Share via WhatsApp
              </button>
              <button className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => showToast("📧 Brochure sent to your email!")}>
                📧 Email Brochure
              </button>
            </div>
          </section>

          {/* LOCATION */}
          <section className={styles.card} id="location">
            <div className={styles.cardHead}>Location &amp; Connectivity</div>
            <div className={styles.locationMap}>
              <div className={styles.mapPin}>
                <span className={styles.mapPinInner}>📍</span>
              </div>
              <div className={styles.mapText}>
                New Town, Action Area II<br />Kolkata – 700156
              </div>
            </div>
            <div className={styles.nearbyGrid}>
              {NEARBY.map((n) => (
                <div key={n.name} className={styles.nearbyItem}>
                  <span className={styles.nearbyIcon}>{n.icon}</span>
                  <div>
                    <div className={styles.nearbyLabel}>{n.name}</div>
                    <div className={styles.nearbyDist}>{n.dist}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EMI CALCULATOR */}
          <section className={styles.card} id="emi">
            <div className={styles.cardHead}>EMI Calculator for this Project</div>
            <div className={styles.loanWrap}>
              <div>
                {/* Loan Amount */}
                <div className={styles.loanField}>
                  <div className={styles.loanLabel}>
                    <span>Loan Amount</span>
                    <span className={styles.loanValue}>{fmtINR(loanAmt)}</span>
                  </div>
                  <input type="range" className={styles.rangeInput}
                    min={2_000_000} max={12_000_000} step={100_000}
                    value={loanAmt} onChange={(e) => setLoanAmt(+e.target.value)} />
                  <div className={styles.rangeHints}><span>₹20L</span><span>₹1.2Cr</span></div>
                </div>
                {/* Interest Rate */}
                <div className={styles.loanField}>
                  <div className={styles.loanLabel}>
                    <span>Interest Rate</span>
                    <span className={styles.loanValue}>{loanRate.toFixed(1)}%</span>
                  </div>
                  <input type="range" className={styles.rangeInput}
                    min={6} max={15} step={0.1}
                    value={loanRate} onChange={(e) => setLoanRate(+e.target.value)} />
                  <div className={styles.rangeHints}><span>6%</span><span>15%</span></div>
                </div>
                {/* Tenure */}
                <div className={styles.loanField} style={{ marginBottom: 0 }}>
                  <div className={styles.loanLabel}>
                    <span>Loan Tenure</span>
                    <span className={styles.loanValue}>{loanTenure} Years</span>
                  </div>
                  <input type="range" className={styles.rangeInput}
                    min={5} max={30} step={1}
                    value={loanTenure} onChange={(e) => setLoanTenure(+e.target.value)} />
                  <div className={styles.rangeHints}><span>5 Yrs</span><span>30 Yrs</span></div>
                </div>
              </div>

              <div className={styles.emiResult}>
                <div className={styles.emiLabel}>Monthly EMI</div>
                <div className={styles.emiValue}>{fmtINR(emi)}</div>
                <div className={styles.emiNote}>Based on 80% loan · {fmtINR(loanAmt)}</div>
                <button className={`${styles.btn} ${styles.btnGold} ${styles.btnFull}`}
                  onClick={() => openModal("Samriddh Heights — Home Loan Assistance")}>
                  Get Loan Assistance
                </button>
                <div className={styles.emiBreakdown}>
                  <div className={styles.emiRow}>
                    <span className={styles.emiRowLabel}>Principal</span>
                    <span className={styles.emiRowValue}>{fmtINR(loanAmt)}</span>
                  </div>
                  <div className={styles.emiRow}>
                    <span className={styles.emiRowLabel}>Total Interest</span>
                    <span className={styles.emiRowGold}>{fmtINR(interest)}</span>
                  </div>
                  <div className={styles.emiRow}>
                    <span className={styles.emiRowLabel}>Total Payable</span>
                    <span className={styles.emiRowValue}>{fmtINR(total)}</span>
                  </div>
                </div>
                <div className={styles.bankNote}>
                  Partner banks: SBI · HDFC · ICICI · Axis · PNB
                </div>
              </div>
            </div>
          </section>

          {/* CONSTRUCTION UPDATES */}
          <section className={styles.card} id="updates">
            <div className={styles.cardHead}>
              Construction Updates
              <span className={styles.cardHeadSub}>Last updated: June 2026</span>
            </div>
            <div className={styles.timeline}>
              {TIMELINE.map((ev, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={tlDotClass(ev.status)}>
                    {ev.status === "done" ? "✓" : ev.status === "active" ? "≈" : "○"}
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>{ev.date}</div>
                    <div className={styles.timelineTitle}>{ev.title}</div>
                    <div className={styles.timelineSub}>{ev.sub}</div>
                    {ev.pct && <span className={styles.timelinePct}>{ev.pct}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarEnq}>
            <h3 className={styles.sidebarTitle}>Interested?</h3>
            <p className={styles.sidebarSub}>Our advisor will call you within 30 minutes</p>
            <div className={styles.formGroup}>
              <label>Your Name *</label>
              <input className={styles.formInput} type="text" placeholder="Full name" />
            </div>
            <div className={styles.formGroup}>
              <label>Phone *</label>
              <input className={styles.formInput} type="tel" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className={styles.formGroup}>
              <label>Configuration</label>
              <select className={styles.formSelect}>
                <option>2 BHK (₹68L–₹85L)</option>
                <option>3 BHK (₹98L–₹1.18Cr)</option>
                <option>3 BHK+ (₹1.18Cr–₹1.35Cr)</option>
                <option>Not Sure</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Best Time to Call</label>
              <select className={styles.formSelect}>
                <option>Morning (9am–12pm)</option>
                <option>Afternoon (12–4pm)</option>
                <option>Evening (4–8pm)</option>
              </select>
            </div>
            <button className={`${styles.btn} ${styles.btnGold} ${styles.btnFull} ${styles.btnLg}`}
              onClick={() => showToast("✅ Enquiry submitted! We'll call within 30 minutes.")}>
              📞 Request Callback
            </button>
            <p className={styles.formNote}>🔒 No spam. 100% confidential.</p>
          </div>

          <div className={styles.sidebarContact}>
            <div className={styles.scHead}>📞 Direct Contact</div>
            {CONTACTS.map((c) => (
              <div key={c.label} className={styles.scContact}
                onClick={() => showToast(c.toast)}>
                <div className={styles.scIcon}>{c.icon}</div>
                <div>
                  <div className={styles.scLabel}>{c.label}</div>
                  <div className={styles.scVal}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.trustGrid}>
            {[
              { num: "500+", label: "Units Sold" },
              { num: "12+",  label: "Years Trust" },
              { num: "₹0",   label: "Brokerage" },
              { num: "4.8★", label: "Rating" },
            ].map((t) => (
              <div key={t.label} className={styles.trustItem}>
                <div className={styles.trustNum}>{t.num}</div>
                <div className={styles.trustLabel}>{t.label}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ── SIMILAR PROJECTS ── */}
      <section className={styles.similarSection}>
        <div className={styles.similarHead}>
          <div>
            <div className={styles.sectionTag}>You May Also Like</div>
            <div className={styles.sectionTitle}>Similar Projects Nearby</div>
          </div>
          <button className={`${styles.btn} ${styles.btnNavy}`}>View All Projects →</button>
        </div>
        <div className={styles.similarGrid}>
          {SIMILAR.map((p) => (
            <div key={p.name} className={styles.propCard}
              onClick={() => openModal(p.name)}>
              <div className={styles.propImg}>
                <div className={styles.propImgBg} style={{ background: p.gradient }} />
                <span className={styles.propBadge}
                  style={{ background: p.badgeColor, color: p.name === "Samriddh Crown" ? "#0D1B2A" : "#fff" }}>
                  {p.badge}
                </span>
              </div>
              <div className={styles.propBody}>
                <div className={styles.propName}>{p.name}</div>
                <div className={styles.propLoc}>{p.location}</div>
                <div className={styles.propFooter}>
                  <div className={styles.propPrice}>{p.price} <sub>Onwards</sub></div>
                  <button className={`${styles.btn} ${styles.btnOutline}`}
                    style={{ fontSize: 11, padding: "5px 12px" }}
                    onClick={(e) => { e.stopPropagation(); openModal(p.name); }}>
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.reraBar}>
          ⚖️ All properties listed are RERA registered under West Bengal Real Estate Regulatory
          Authority (WBRERA). Samriddh Realty is an authorised marketing partner and does not own
          the properties listed. RERA Reg: WBRERA/P/KOL/2024/001. Details subject to change.
        </div>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className={styles.navLogoMark}>S</div>
              <div className={styles.navBrand} style={{ color: "#fff" }}>
                Samriddh Realty
                <small style={{ color: "var(--gold)" }}>Authorised Marketing Partner</small>
              </div>
            </div>
            <p>Helping families find their dream homes across West Bengal since 2012.
              Zero brokerage, complete transparency, lifelong trust.</p>
            <div className={styles.footerSocial}>
              {["📘", "📸", "💼", "🐦", "📺"].map((icon, i) => (
                <button key={i} className={styles.socialIcon}>{icon}</button>
              ))}
            </div>
          </div>
          {[
            { title: "Projects",  items: ["New Launch", "Ready to Move", "Under Construction", "Luxury Homes", "Affordable Homes", "Commercial"] },
            { title: "Locations", items: ["Kolkata", "New Town", "Rajarhat", "Salt Lake", "Howrah", "Durgapur"] },
            { title: "Services",  items: ["Home Loan Assistance", "Legal Verification", "Site Visits", "RERA Guidance", "Resale Properties", "NRI Services"] },
          ].map((col) => (
            <div key={col.title} className={styles.footerCol}>
              <h4>{col.title}</h4>
              <ul>{col.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Samriddh Realty. All rights reserved. | Powered by Digital Media Tech</span>
          <span>Privacy Policy · Terms · RERA Disclosure</span>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modalOpen && (
        <EnquiryModal
          propName={modalProp}
          source="details_page"
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* ── TOAST ── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
