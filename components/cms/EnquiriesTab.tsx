'use client';

import { Fragment, useMemo, useState } from 'react';
import StatusBadge from './StatusBadge';
import LeadRemarksPanel from './LeadRemarksPanel';
import {
  useAdminLeads,
  useAgents,
  useAssignLead,
  useUpdateLeadStatus,
} from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'SITE_VISIT_SCHEDULED',
  'NEGOTIATING',
  'CONVERTED',
  'LOST',
] as const;

interface EnquiriesTabProps {
  onToast: (msg: string) => void;
}

function leadName(lead: any) {
  return lead.guestName || lead.buyer?.name || 'Guest';
}

function leadPhone(lead: any) {
  return lead.guestPhone || lead.buyer?.phone || '—';
}

function formatBudget(budget: unknown) {
  if (budget === null || budget === undefined || budget === '') return '—';
  const n = Number(budget);
  if (Number.isNaN(n)) return String(budget);
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function EnquiriesTab({ onToast }: EnquiriesTabProps) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string>('ALL');
  const [agentFilter, setAgentFilter] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [expandedLeadId, setExpandedLeadId] = useState<number | null>(null);

  const { data: agentsData } = useAgents({ page: 1, limit: 100 });
  const agents = agentsData?.data ?? [];

  const { data, isLoading } = useAdminLeads({
    page,
    limit: 20,
    ...(status !== 'ALL' ? { status } : {}),
    ...(agentFilter === 'UNASSIGNED'
      ? { unassigned: true }
      : agentFilter !== 'ALL'
        ? { agentId: Number(agentFilter) }
        : {}),
  });

  const leads = data?.data ?? [];
  const pagination = data?.pagination;
  const { mutate: assignLead } = useAssignLead();
  const { mutate: updateStatus } = useUpdateLeadStatus();

  const statusTabs = useMemo(
    () => [
      { label: 'All', value: 'ALL' },
      ...LEAD_STATUSES.map((value) => ({
        label: value.replaceAll('_', ' '),
        value,
      })),
    ],
    []
  );

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
    queryClient.invalidateQueries({ queryKey: ['lead-summary'] });
    queryClient.invalidateQueries({ queryKey: ['agents'] });
  };

  return (
    <div className="tab-content">
      <div className="status-tabs">
        {statusTabs.map((t) => (
          <button
            key={t.value}
            className={`stab ${status === t.value ? 'stab--active' : ''}`}
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
        <div className="card-head">
          All Enquiries
          <div className="head-tools">
            <span className="rr-hint">New enquiries auto-assign round-robin</span>
            <select
              className="filter"
              value={agentFilter}
              onChange={(e) => {
                setPage(1);
                setAgentFilter(e.target.value);
              }}
            >
              <option value="ALL">All agents</option>
              <option value="UNASSIGNED">Unassigned</option>
              {agents.map((agent: any) => (
                <option key={agent.id} value={agent.id}>
                  {agent.user?.name || agent.agencyName || `Agent #${agent.id}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="empty">Loading enquiries...</div>
        ) : leads.length === 0 ? (
          <div className="empty">No enquiries found.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Project / Property</th>
                  <th>Budget</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Agent</th>
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
                        <td>{formatBudget(lead.budget)}</td>
                        <td>{lead.source || '—'}</td>
                        <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                        <td>
                          <select
                            className="inline-select"
                            value={lead.agent?.id ?? ''}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const agentId = raw === '' ? null : Number(raw);
                              if (agentId !== null && !agentId) return;
                              assignLead(
                                { leadId: lead.id, agentId },
                                {
                                  onSuccess: () => {
                                    invalidate();
                                    onToast(
                                      agentId === null
                                        ? '✅ Lead unassigned'
                                        : '✅ Lead reassigned'
                                    );
                                  },
                                  onError: () => onToast('❌ Failed to update assignment'),
                                }
                              );
                            }}
                          >
                            <option value="">Unassigned</option>
                            {agents.map((agent: any) => (
                              <option key={agent.id} value={agent.id}>
                                {agent.user?.name || agent.agencyName || `Agent #${agent.id}`}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <div className="status-cell">
                            <StatusBadge status={lead.status} />
                            <select
                              className="inline-select"
                              value={lead.status}
                              onChange={(e) => {
                                updateStatus(
                                  { leadId: lead.id, status: e.target.value },
                                  {
                                    onSuccess: () => {
                                      invalidate();
                                      onToast('✅ Status updated');
                                    },
                                    onError: () => onToast('❌ Failed to update status'),
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
                            onClick={() =>
                              setExpandedLeadId(open ? null : lead.id)
                            }
                          >
                            {open ? 'Hide' : 'Notes'}
                          </button>
                        </td>
                      </tr>
                      {open ? (
                        <tr className="remarks-row">
                          <td colSpan={9}>
                            <LeadRemarksPanel leadId={lead.id} onToast={onToast} />
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
            <button
              className="inline-select"
              disabled={!pagination.hasPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className="inline-select"
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
        .status-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .stab {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid #E5E7EB;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: #fff;
          color: #4A4A4A;
          font-family: inherit;
        }
        .stab:hover,
        .stab--active {
          background: #0D1B2A;
          color: #fff;
          border-color: #0D1B2A;
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .head-tools {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rr-hint {
          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          color: #9CA3AF;
          letter-spacing: 0.02em;
        }
        .filter, .inline-select {
          padding: 6px 8px;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          font-size: 12px;
          font-family: inherit;
          background: #fff;
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
          padding: 10px 14px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #8A8A8A;
          font-weight: 600;
          white-space: nowrap;
        }
        .data-table td {
          padding: 13px 14px;
          color: #4A4A4A;
          border-bottom: 1px solid #FAF7F2;
          white-space: nowrap;
        }
        .status-cell {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .remarks-toggle {
          padding: 5px 10px;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          background: #fff;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
          color: #4A4A4A;
          white-space: nowrap;
        }
        .remarks-toggle:hover,
        .remarks-toggle--open {
          background: #0D1B2A;
          color: #fff;
          border-color: #0D1B2A;
        }
        .remarks-row td {
          padding: 0 !important;
          white-space: normal !important;
          border-bottom: 1px solid #F0EAE0;
        }
        .pager {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          font-size: 12px;
          color: #8A8A8A;
        }
      `}</style>
    </div>
  );
}
