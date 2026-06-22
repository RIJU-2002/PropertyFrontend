import type { DashboardMetric } from '@/types';

interface MetricCardProps {
  metric: DashboardMetric;
}

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{metric.label}</div>
      <div
        className="metric-value"
        style={metric.valueColor ? { color: metric.valueColor } : undefined}
      >
        {metric.value}
      </div>
      <div
        className="metric-trend"
        style={metric.trendColor ? { color: metric.trendColor } : undefined}
      >
        {metric.trend}
      </div>

      <style jsx>{`
        .metric-card {
          background: #fff;
          border-radius: 10px;
          padding: 22px 24px;
          box-shadow: 0 2px 12px rgba(13, 27, 42, 0.07);
          border: 1px solid #F0EAE0;
          transition: box-shadow 0.2s;
        }

        .metric-card:hover {
          box-shadow: 0 6px 24px rgba(13, 27, 42, 0.12);
        }

        .metric-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8A8A8A;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .metric-value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          color: #0D1B2A;
          line-height: 1;
          margin-bottom: 8px;
        }

        .metric-trend {
          font-size: 12px;
          color: #3B6D11;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
