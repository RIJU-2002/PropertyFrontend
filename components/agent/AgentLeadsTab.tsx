'use client';

import { Fragment, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMyAgentLeads, useUpdateLeadStatus } from '@/hooks/useApi';
import StatusBadge from '@/components/cms/StatusBadge';
import LeadRemarksPanel from '@/components/cms/LeadRemarksPanel';

const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'SITE_VISIT_SCHEDULED',
  'NEGOTIATING',
  'CONVERTED',
  'LOST',
] as const;

function leadName(lead: any) {
  return lead.guestName || lead.buyer?.name || 'Guest';
}

function leadPhone(lead: any) {
  return lead.guestPhone || lead.buyer?.phone || '—';
}

export default function AgentLeadsTab() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [expandedLeadId, setExpandedLeadId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { data, isLoading } = useMyAgentLeads({
    page,
    limit: 20,
    ...(status !== 'ALL' ? { status } : {}),
  });

  const { mutate: updateStatus } = useUpdateLeadStatus();
  const leads = data?.data ?? [];
  const pagination = data?.pagination;

  const tabs = useMemo(
    () => [
      { label: 'All', value: 'ALL' },
      ...LEAD_STATUSES.map((value) => ({
        label: value.replaceAll('_', ' '),
        value,
      })),
    ],
    []
  );

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  return (
    <div>
      {toast ? <div className="toast">{toast}</div> : null}

      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t.value}
            className={`tab ${status === t.value ? 'tab--active' : ''}`}
            onClick={() => {
              setPage(1);
              setStatus(t.value);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="head">
          Assigned leads
          {pagination ? <span className="count">{pagination.total}</span> : null}
        </div>

        {isLoading ? (
          <div className="empty">Loading leads…</div>
        ) : leads.length === 0 ? (
          <div className="empty">No leads assigned yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Project / Property</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead: any) => {
                  const open = expandedLeadId === lead.id;
                  return (
                    <Fragment key={lead.id}>
                      <tr>
                        <td><strong>{leadName(lead)}</strong></td>
                        <td>{leadPhone(lead)}</td>
                        <td>{lead.project?.name || lead.property?.title || 'General'}</td>
                        <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                        <td>
                          <div className="status-cell">
                            <StatusBadge status={lead.status} />
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                updateStatus(
                                  { leadId: lead.id, status: e.target.value },
                                  {
                                    onSuccess: () => {
                                      queryClient.invalidateQueries({ queryKey: ['agent-me-leads'] });
                                      queryClient.invalidateQueries({ queryKey: ['agent-me'] });
                                    },
                                  }
                                );
                              }}
                            >
                              {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {s.replaceAll('_', ' ')}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`remarks-toggle ${open ? 'remarks-toggle--open' : ''}`}
                            onClick={() => setExpandedLeadId(open ? null : lead.id)}
                          >
                            {open ? 'Hide' : 'Notes'}
                          </button>
                        </td>
                      </tr>
                      {open ? (
                        <tr className="remarks-row">
                          <td colSpan={6}>
                            <LeadRemarksPanel leadId={lead.id} onToast={showToast} />
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="pager">
            <button disabled={!pagination.hasPrev} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .toast {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 50;
          background: #0d1b2a;
          color: #fff;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
        }
        .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .tab {
          border: 1px solid #f0eae0;
          background: #fff;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
          color: #6b7280;
        }
        .tab--active { background: #0d1b2a; color: #fff; border-color: #0d1b2a; }
        .card {
          background: #fff;
          border: 1px solid #f0eae0;
          border-radius: 12px;
          overflow: hidden;
        }
        .head {
          padding: 16px 20px;
          border-bottom: 1px solid #f0eae0;
          font-weight: 600;
          color: #0d1b2a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .count {
          font-size: 12px;
          background: #f5f3ef;
          color: #6b7280;
          border-radius: 999px;
          padding: 2px 8px;
        }
        .empty { padding: 48px 20px; text-align: center; color: #6b7280; }
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th, td { text-align: left; padding: 12px 16px; border-bottom: 1px solid #f8f5ef; }
        th { color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
        .status-cell { display: flex; align-items: center; gap: 8px; }
        select { font-size: 12px; padding: 4px 6px; }
        .remarks-toggle {
          border: 1px solid #f0eae0;
          background: #fff;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 11px;
          cursor: pointer;
          color: #4a4a4a;
        }
        .remarks-toggle--open,
        .remarks-toggle:hover {
          background: #0d1b2a;
          color: #fff;
          border-color: #0d1b2a;
        }
        .remarks-row td {
          padding: 0 !important;
          border-bottom: 1px solid #f0eae0;
        }
        .pager {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          font-size: 13px;
          color: #6b7280;
        }
        .pager button {
          border: 1px solid #f0eae0;
          background: #fff;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
        }
        .pager button:disabled { opacity: 0.4; cursor: default; }
      `}</style>
    </div>
  );
}
