import MetricCard from './MetricCard';
import { mockLeadSources } from '@/data/mockData';
import type { DashboardMetric } from '@/types';

const LEAD_METRICS: DashboardMetric[] = [
  { label: 'Total Leads (Month)', value: 87, trend: '↑ 23% vs last month' },
  { label: 'Site Visits', value: 34, trend: '↑ 12% conversion' },
  { label: 'Bookings', value: 8, trend: '↑ Excellent month', trendColor: '#3B6D11' },
  { label: 'Revenue Pipeline', value: '₹6.4Cr', trend: 'From 8 bookings' },
];

export default function LeadReportsTab() {
  return (
    <div className="tab-content">
      <div className="metrics-grid">
        {LEAD_METRICS.map((m) => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </div>

      <div className="card">
        <div className="card-head">Lead Source Breakdown</div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Leads</th>
                <th>Site Visits</th>
                <th>Bookings</th>
                <th>Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {mockLeadSources.map((src) => (
                <tr key={src.source}>
                  <td>
                    <span className="source-icon">{src.icon}</span> {src.source}
                  </td>
                  <td>{src.leads}</td>
                  <td>{src.siteVisits}</td>
                  <td>{src.bookings}</td>
                  <td>
                    <span
                      className="conv-rate"
                      style={{
                        color:
                          parseFloat(src.conversionRate) > 0
                            ? '#3B6D11'
                            : '#854F0B',
                      }}
                    >
                      {src.conversionRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="card">
        <div className="card-head">Leads by Source — Visual</div>
        <div className="bar-chart">
          {mockLeadSources.map((src) => {
            const maxLeads = Math.max(...mockLeadSources.map((s) => s.leads));
            const pct = (src.leads / maxLeads) * 100;
            return (
              <div key={src.source} className="bar-row">
                <div className="bar-label">
                  {src.icon} {src.source}
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="bar-count">{src.leads}</div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .tab-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(13, 27, 42, 0.07);
          border: 1px solid #F0EAE0;
          overflow: hidden;
        }

        .card-head {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 17px;
          color: #0D1B2A;
          padding: 16px 22px;
          border-bottom: 1px solid #F0EAE0;
          font-weight: 600;
        }

        .table-wrap {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .data-table thead {
          background: #FAF7F2;
        }

        .data-table th {
          text-align: left;
          padding: 10px 20px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #8A8A8A;
          font-weight: 600;
        }

        .data-table td {
          padding: 14px 20px;
          color: #4A4A4A;
          border-bottom: 1px solid #FAF7F2;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tbody tr:hover {
          background: #FAF7F2;
        }

        .source-icon {
          margin-right: 4px;
        }

        .conv-rate {
          font-weight: 600;
        }

        .bar-chart {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bar-row {
          display: grid;
          grid-template-columns: 160px 1fr 40px;
          align-items: center;
          gap: 14px;
        }

        .bar-label {
          font-size: 13px;
          color: #4A4A4A;
        }

        .bar-track {
          height: 10px;
          background: #F0EAE0;
          border-radius: 5px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A84C, #9B7A2A);
          border-radius: 5px;
          transition: width 0.4s ease;
        }

        .bar-count {
          font-size: 13px;
          font-weight: 600;
          color: #0D1B2A;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
