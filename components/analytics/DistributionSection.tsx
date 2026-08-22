'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SectionCard from './SectionCard';
import HBarRow from './HBarRow';
import type {
  CityDistribution,
  LocalityDistribution,
  PropertyTypeDistribution,
  PossessionDistribution,
} from "@/types/analytics";

interface Props {
  cities: CityDistribution[];
  localities: LocalityDistribution[];
  propertyTypes: PropertyTypeDistribution[];
  possession: PossessionDistribution[];
}

const PIE_COLORS = ['#C9A84C','#1A2F45','#3B6D11','#854F0B','#4B5563','#7C3AED','#1E40AF','#991B1B'];

function DonutPanel({
  data,
  title,
  subtitle
}: {
  data: { label: string; count: number }[];
  title: string;
  subtitle: string;
}) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={3}
            dataKey="count"
            nameKey="label"
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={
                  PIE_COLORS[
                    i % PIE_COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}

function HBarPanel({
  data,
  title,
  subtitle,
  showValue = false,
}: {
  data: {
    label: string;
    count: number;
  }[];
  title: string;
  subtitle?: string;
  showValue?: boolean;
}) {
  const max = Math.max(
    ...data.map((x) => x.count),
    1
  );

  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
      noPad
    >
      <div className="hbar-list">
        {data.map((item, i) => (
          <HBarRow
            key={item.label}
            rank={i + 1}
            label={item.label}
            value={item.count}
            pct={(item.count / max) * 100}
            maxPct={100}
            sub={
              showValue
                ? `${item.count} Projects`
                : undefined
            }
          />
        ))}
      </div>

      <style jsx>{`
        .hbar-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 18px 22px;
        }
      `}</style>
    </SectionCard>
  );
}

export default function DistributionSection({ cities, localities, propertyTypes, possession }: Props) {
  const cityData = cities.map((c) => ({
  label: c.city,
  count: c.projects,
}));

const localityData =
  localities.map((l) => ({
    label: l.locality,
    count: l.total,
  }));

const propertyTypeData =
  propertyTypes.map((p) => ({
    label: p.propertyType,
    count: p.count,
  }));

const possessionData =
  possession.map((p) => ({
    label: p.status.replaceAll(
      "_",
      " "
    ),
    count: p.count,
  }));
  return (
    <section>
      <div className="section-label">🗂 Distribution Breakdown</div>
      <div className="dist-grid">
        <HBarPanel data={cityData}        title="By City"          subtitle="Project distribution" showValue />
        <HBarPanel data={localityData}    title="By Locality"      subtitle="Top micro-markets" />
        <DonutPanel data={propertyTypeData} title="By Property Type" subtitle="Segment split" />
        <DonutPanel data={possessionData}   title="By Possession"    subtitle="Delivery timeline" />
      </div>

      <style jsx>{`
        section { display: flex; flex-direction: column; gap: 14px; }
        .section-label {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: .12em; color: #C9A84C;
        }
        .dist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (max-width: 900px) {
          .dist-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
