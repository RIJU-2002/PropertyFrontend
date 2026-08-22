'use client';

import { useMemo, useState } from 'react';
import { useAgents } from '@/hooks/useApi';

interface ViewAgentsTabProps {
  onAdd: () => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}

export default function ViewAgentsTab({
  onAdd,
  onEdit,
  onView,
}: ViewAgentsTabProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<'ALL' | 'true' | 'false'>('ALL');

  const { data, isLoading } = useAgents({
    page,
    limit: 20,
    ...(verifiedFilter === 'ALL' ? {} : { isVerified: verifiedFilter === 'true' }),
  });

  const agents = data?.data ?? [];
  const pagination = data?.pagination;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return agents;
    return agents.filter((agent: any) => {
      const name = agent.user?.name ?? '';
      const phone = agent.user?.phone ?? '';
      const email = agent.user?.email ?? '';
      const agency = agent.agencyName ?? '';
      const rera = agent.reraNumber ?? '';
      return [name, phone, email, agency, rera].some((value) =>
        String(value).toLowerCase().includes(q)
      );
    });
  }, [agents, search]);

  return (
    <div className="tab-content">
      <div className="page-header">
        <div>
          <h2>Agents</h2>
          <p>View, edit, and manage registered agents.</p>
        </div>
        <button className="btn-gold" onClick={onAdd}>
          + Add Agent
        </button>
      </div>

      <div className="toolbar">
        <input
          className="search"
          placeholder="Search name, phone, agency, RERA..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter"
          value={verifiedFilter}
          onChange={(e) => {
            setPage(1);
            setVerifiedFilter(e.target.value as 'ALL' | 'true' | 'false');
          }}
        >
          <option value="ALL">All statuses</option>
          <option value="true">Verified</option>
          <option value="false">Pending</option>
        </select>
      </div>

      <div className="card">
        <div className="card-head">
          Agent Directory
          {pagination && (
            <span className="card-head-sub"> — {pagination.total} total</span>
          )}
        </div>

        {isLoading ? (
          <div className="empty">Loading agents...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No agents found.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Phone</th>
                  <th>Agency</th>
                  <th>RERA</th>
                  <th>Listings</th>
                  <th>Leads</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((agent: any) => (
                  <tr key={agent.id}>
                    <td>
                      <strong>{agent.user?.name || '—'}</strong>
                      <div className="sub">{agent.user?.email || 'No email'}</div>
                    </td>
                    <td>{agent.user?.phone || '—'}</td>
                    <td>{agent.agencyName || '—'}</td>
                    <td>{agent.reraNumber || '—'}</td>
                    <td>{agent._count?.properties ?? 0}</td>
                    <td>{agent._count?.leads ?? 0}</td>
                    <td>
                      <span className={`badge ${agent.isVerified ? 'verified' : 'pending'}`}>
                        {agent.isVerified ? 'Verified' : 'Pending'}
                      </span>
                      {!agent.isActive && (
                        <span className="badge inactive">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" onClick={() => onEdit(agent.id)}>
                          Edit
                        </button>
                        <button className="action-btn" onClick={() => onView(agent.id)}>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="pager">
            <button
              className="action-btn"
              disabled={!pagination.hasPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className="action-btn"
              disabled={!pagination.hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .tab-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .page-header h2 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: #0D1B2A;
        }
        .page-header p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #8A8A8A;
        }
        .btn-gold {
          padding: 10px 18px;
          background: #C9A84C;
          color: #0D1B2A;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }
        .btn-gold:hover { background: #9B7A2A; color: #fff; }
        .toolbar {
          display: flex;
          gap: 10px;
        }
        .search, .filter {
          padding: 9px 12px;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          background: #fff;
        }
        .search { flex: 1; }
        .search:focus, .filter:focus { border-color: #C9A84C; }
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
          vertical-align: top;
        }
        .data-table tbody tr:hover { background: #FAF7F2; }
        .sub {
          font-size: 11px;
          color: #9CA3AF;
          margin-top: 3px;
        }
        .badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          margin-right: 6px;
        }
        .verified { background: #DCFCE7; color: #166534; }
        .pending { background: #FEF3C7; color: #92400E; }
        .inactive { background: #FEE2E2; color: #991B1B; }
        .action-btns { display: flex; gap: 6px; }
        .action-btn {
          padding: 4px 10px;
          font-size: 11px;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          background: transparent;
          color: #4A4A4A;
          cursor: pointer;
          font-family: inherit;
        }
        .action-btn:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .action-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .pager {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 14px 16px;
          font-size: 12px;
          color: #8A8A8A;
          border-top: 1px solid #F0EAE0;
        }
      `}</style>
    </div>
  );
}
