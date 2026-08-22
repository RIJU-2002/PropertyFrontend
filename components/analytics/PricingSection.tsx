'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

import SectionCard from './SectionCard';
import type {
  PricingSummary,
  PriceRange,
} from '@/types/analytics';

interface Props {
  summary: PricingSummary;
  ranges: PriceRange[];
}

const BAR_COLORS = [
  '#C9A84C',
  '#B8973E',
  '#A78530',
  '#967322',
  '#856114',
  '#7A5A10',
];

function PricingKPIs({ summary }: { summary: PricingSummary }) {
  return (
    <div className="kpi-strip">
      <div className="kpi-card">
        <div className="icon">💰</div>
        <div className="value">
          ₹{summary.average.toLocaleString('en-IN')}
        </div>
        <div className="label">Average Price</div>
      </div>

      <div className="kpi-card">
        <div className="icon">📉</div>
        <div className="value">
          ₹{summary.minimum.toLocaleString('en-IN')}
        </div>
        <div className="label">Minimum Price</div>
      </div>

      <div className="kpi-card">
        <div className="icon">📈</div>
        <div className="value">
          ₹{summary.maximum.toLocaleString('en-IN')}
        </div>
        <div className="label">Maximum Price</div>
      </div>

      <style jsx>{`
        .kpi-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .kpi-card {
          background: white;
          border: 1px solid #ece7df;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,.04);
        }

        .icon {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .value {
          font-size: 26px;
          font-weight: 700;
          color: #0D1B2A;
        }

        .label {
          margin-top: 6px;
          font-size: 12px;
          color: #777;
        }

        @media (max-width:900px){
          .kpi-strip{
            grid-template-columns:1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function PricingSection({
  summary,
  ranges,
}: Props) {
  return (
    <section>
      <div className="section-label">
        💰 Pricing Analytics
      </div>

      <PricingKPIs summary={summary} />

      <SectionCard
        title="Price Range Distribution"
        subtitle="Projects by Price Bracket"
      >
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={ranges}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="range"
              tick={{ fontSize: 11 }}
            />

            <YAxis />

            <Tooltip
              formatter={(value: number) => [
                `${value} Projects`,
                'Count',
              ]}
            />

            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
            >
              {ranges.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    BAR_COLORS[
                      index % BAR_COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #C9A84C;
        }
      `}</style>
    </section>
  );
}
