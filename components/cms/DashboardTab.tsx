import MetricCard from './MetricCard';
import StatusBadge from './StatusBadge';
import { mockDashboardMetrics, mockProjects, mockEnquiries } from '@/data/mockData';

export default function DashboardTab() {
  return (
    <div className="tab-content">
      {/* Metrics Grid */}
      <div className="metrics-grid">
        {mockDashboardMetrics.map((m) => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="card">
        <div className="card-head">
          Recent Enquiries{' '}
          <span className="card-head-sub">— 8 new since yesterday</span>
        </div>
        <div className="enq-list">
          {mockEnquiries.slice(0, 4).map((enq) => (
            <div className="enq-row" key={enq.id}>
              <div className="enq-avatar">{enq.name.charAt(0)}</div>
              <div className="enq-info">
                <div className="enq-name">{enq.name}</div>
                <div className="enq-detail">
                  📞 {enq.phone} &nbsp;|&nbsp; {enq.config} &nbsp;|&nbsp; {enq.budget} &nbsp;|&nbsp; {enq.project}
                </div>
              </div>
              <div className="enq-meta">
                <div className="enq-time">{enq.date}</div>
                <StatusBadge status={enq.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Overview Table */}
      <div className="card">
        <div className="card-head">Project Status Overview</div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Units</th>
                <th>Available</th>
                <th>Enquiries</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.location.split(',')[0]}</td>
                  <td>{p.propertyType.replace(' Apartment', '')}</td>
                  <td>{p.totalUnits}</td>
                  <td>{p.availableUnits}</td>
                  <td>{p.enquiries}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          padding: 18px 22px;
          border-bottom: 1px solid #F0EAE0;
          font-weight: 600;
        }

        .card-head-sub {
          font-size: 12px;
          font-weight: 400;
          color: #9CA3AF;
          font-family: 'DM Sans', sans-serif;
        }

        .enq-list {
          display: flex;
          flex-direction: column;
        }

        .enq-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 22px;
          border-bottom: 1px solid #FAF7F2;
          transition: background 0.15s;
        }

        .enq-row:last-child {
          border-bottom: none;
        }

        .enq-row:hover {
          background: #FAF7F2;
        }

        .enq-avatar {
          width: 36px;
          height: 36px;
          background: rgba(201, 168, 76, 0.12);
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #C9A84C;
          flex-shrink: 0;
        }

        .enq-info {
          flex: 1;
          min-width: 0;
        }

        .enq-name {
          font-size: 13px;
          font-weight: 600;
          color: #0D1B2A;
          margin-bottom: 3px;
        }

        .enq-detail {
          font-size: 11px;
          color: #8A8A8A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .enq-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          flex-shrink: 0;
        }

        .enq-time {
          font-size: 11px;
          color: #9CA3AF;
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
          padding: 10px 16px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #8A8A8A;
          font-weight: 600;
          white-space: nowrap;
        }

        .data-table td {
          padding: 13px 16px;
          color: #4A4A4A;
          border-bottom: 1px solid #FAF7F2;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tbody tr:hover {
          background: #FAF7F2;
        }

        .action-btns {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          padding: 4px 10px;
          font-size: 11px;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          background: transparent;
          color: #4A4A4A;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }

        .action-btn:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
      `}</style>
    </div>
  );
}
