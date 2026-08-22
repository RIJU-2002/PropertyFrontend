'use client';

import {
  ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, AreaChart,
} from 'recharts';
import SectionCard from './SectionCard';
import TrendBadge from './TrendBadge';
import type { GrowthData } from '@/types/analytics';

interface Props {
  projects: GrowthData;
  properties: GrowthData;
  leads: GrowthData;
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: GrowthData;
  color: string;
  formatter?: (v: number) => string;
}

function GrowthChart({
  title,
  subtitle,
  data,
  color,
  formatter,
}: ChartCardProps) {
  const fmt =
    formatter ??
    ((v: number) =>
      v.toLocaleString("en-IN"));

  const current =
    data.length > 0
      ? data[data.length - 1].count
      : 0;

  const previous =
    data.length > 1
      ? data[data.length - 2].count
      : 0;

  const percentChange =
    previous === 0
      ? current > 0
        ? 100
        : 0
      : Number(
          (
            ((current - previous) /
              previous) *
            100
          ).toFixed(1)
        );

  const chartData = data.map((item) => ({
    month: item.month,
    value: item.count,
  }));

  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
      action={
        <TrendBadge
          pct={percentChange}
          label="MoM"
        />
      }
    >
      <div className="chart-summary">
        <div className="chart-current">
          {fmt(current)}
        </div>

        <div className="chart-vs">
          vs {fmt(previous)} previous
          month
        </div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer
          width="100%"
          height={160}
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 6,
              right: 4,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id={`grad-${color.replace(
                  "#",
                  ""
                )}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={color}
                  stopOpacity={0.18}
                />

                <stop
                  offset="95%"
                  stopColor={color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F0EAE0"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 10,
                fill: "#9CA3AF",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 10,
                fill: "#9CA3AF",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(v: number) => [
                fmt(v),
                title,
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#grad-${color.replace(
                "#",
                ""
              )})`}
              dot={false}
              activeDot={{
                r: 4,
                fill: color,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .chart-summary {
          margin-bottom: 14px;
        }

        .chart-current {
          font-family: "Playfair Display",
            Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: #0d1b2a;
        }

        .chart-vs {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 2px;
        }

        .chart-wrap {
          margin: 0 -4px;
        }
      `}</style>
    </SectionCard>
  );
}

export default function GrowthSection({ projects, properties, leads }: Props) {
  return (
    <section>
      <div className="section-label">📈 Growth Trends</div>
      <div className="growth-grid">
        <GrowthChart
          title="Projects"
          subtitle="Total listed projects"
          data={projects}
          color="#C9A84C"
        />
        <GrowthChart
          title="Properties"
          subtitle="Individual property units"
          data={properties}
          color="#1A2F45"
        />
        <GrowthChart
          title="Leads"
          subtitle="Enquiries & inbound leads"
          data={leads}
          color="#3B6D11"
        />
      </div>

      <style jsx>{`
        section { display: flex; flex-direction: column; gap: 14px; }
        .section-label {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: .12em; color: #C9A84C;
        }
        .growth-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) {
          .growth-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
