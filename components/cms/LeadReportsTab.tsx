'use client';

import MetricCard from './MetricCard';
import { useLeadSummary } from '@/hooks/useApi';

export default function LeadReportsTab() {
  const { data: summary, isLoading } = useLeadSummary();

  const statusCount = (status: string) =>
    summary?.byStatus?.find((row: any) => row.status === status)?.count ?? 0;

  const metrics = [
    {
      label: 'Total Leads',
      value: summary?.total ?? 0,
      trend: `${summary?.unassigned ?? 0} unassigned`,
    },
    {
      label: 'New',
      value: statusCount('NEW'),
      trend: 'Awaiting contact',
    },
    {
      label: 'Site Visits',
      value: statusCount('SITE_VISIT_SCHEDULED'),
      trend: 'Scheduled',
    },
    {
      label: 'Converted',
      value: statusCount('CONVERTED'),
      trend: `${statusCount('LOST')} lost`,
    },
  ];

  const byAgent = summary?.byAgent ?? [];
  const maxCount = Math.max(1, ...byAgent.map((row: any) => row.count));

  return (
    <div className="tab-content">
      <div className="metrics-grid">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            trend={m.trend}
          />
        ))}
      </div>

      <div className="card">
        <div className="card-head">Leads by Agent</div>
        {isLoading ? (
          <div className="empty">Loading report...</div>
        ) : byAgent.length === 0 ? (
          <div className="empty">No leads yet.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Agency</th>
                  <th>Leads</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {byAgent.map((row: any) => (
                  <tr key={row.agentId ?? 'unassigned'}>
                    <td>
                      <strong>
                        {row.agent?.user?.name ||
                          (row.agentId ? `Agent #${row.agentId}` : 'Unassigned')}
                      </strong>
                    </td>
                    <td>{row.agent?.agencyName || '—'}</td>
                    <td>{row.count}</td>
                    <td>
                      {summary?.total
                        ? `${Math.round((row.count / summary.total) * 100)}%`
                        : '0%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">Leads by Agent — Visual</div>
        <div className="bar-chart">
          {byAgent.map((row: any) => {
            const pct = (row.count / maxCount) * 100;
            const label =
              row.agent?.user?.name ||
              (row.agentId ? `Agent #${row.agentId}` : 'Unassigned');
            return (
              <div key={row.agentId ?? 'unassigned'} className="bar-row">
                <div className="bar-label">{label}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="bar-count">{row.count}</div>
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
        .empty {
          padding: 36px 22px;
          text-align: center;
          color: #9CA3AF;
          font-size: 13px;
        }
        .table-wrap { overflow-x: auto; }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .data-table thead { background: #FAF7F2; }
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
