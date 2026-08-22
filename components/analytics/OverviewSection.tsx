"use client";

import StatCard from "./StatCard";
import type { OverviewData } from "@/types/analytics";

interface Props {
  data: OverviewData;
}

export default function OverviewSection({ data }: Props) {
  return (
    <section>
      {/* Hero KPI Cards */}
      <div className="grid-hero">
        <StatCard
          accent
          label="Inventory Value"
          value={data.totalInventoryValue}
          icon="💰"
          sub="Active Inventory"
        />

        <StatCard
          accent
          label="Avg Property Price"
          value={`₹${Number(data.avgPropertyPrice).toLocaleString("en-IN")}`}
          icon="🏠"
        />

        <StatCard
          accent
          label="Avg Project Price"
          value={`₹${Number(data.avgProjectPrice).toLocaleString("en-IN")}`}
          icon="🏗"
        />

        <StatCard
          accent
          label="Avg Price / Sq.ft"
          value={`₹${Number(data.avgPricePerSqFt).toLocaleString("en-IN")}`}
          icon="📐"
        />
      </div>

      {/* Secondary KPI Cards */}
      <div className="grid-main">
        <StatCard
          label="Projects"
          value={data.projects.total}
          icon="🏗"
          sub={`${data.projects.active} Active`}
        />

        <StatCard
          label="Properties"
          value={data.properties.total}
          icon="🏠"
          sub={`${data.properties.active} Active`}
        />

        <StatCard
          label="Builders"
          value={data.builders.total}
          icon="👷"
          sub={`${data.builders.verified} Verified`}
        />

        <StatCard
          label="Users"
          value={data.users}
          icon="👤"
        />

        <StatCard
          label="Leads This Month"
          value={data.monthlyLeads}
          icon="📩"
        />

        <StatCard
          label="Projects Added"
          value={data.monthlyProjects}
          icon="📈"
        />

        <StatCard
          label="Properties Added"
          value={data.monthlyProperties}
          icon="🏘"
        />

        <StatCard
          label="Lead Conversion"
          value={`${data.conversionRate}%`}
          icon="🎯"
          sub="This Month"
        />

        <StatCard
          label="Featured Projects"
          value={data.projects.featured}
          icon="⭐"
        />

        <StatCard
          label="Trending Projects"
          value={data.projects.trending}
          icon="🔥"
        />

        <StatCard
          label="New Launches"
          value={data.projects.newLaunch}
          icon="🚀"
        />

        <StatCard
          label="Featured Properties"
          value={data.properties.featured}
          icon="🏡"
        />

        <StatCard
          label="Cities"
          value={data.locations.cities}
          icon="🗺"
        />

        <StatCard
          label="Localities"
          value={data.locations.localities}
          icon="📍"
        />

        <StatCard
          label="Articles"
          value={data.articles}
          icon="📰"
        />

        <StatCard
          label="Total Leads"
          value={data.leads}
          icon="📬"
        />
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .grid-hero {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .grid-main {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        @media (max-width: 1200px) {
          .grid-hero,
          .grid-main {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-hero,
          .grid-main {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
