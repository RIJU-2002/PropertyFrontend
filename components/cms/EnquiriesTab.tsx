'use client';

import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { mockEnquiries } from '@/data/mockData';
import type { EnquiryStatus } from '@/types';

const STATUS_TABS: { label: string; status: EnquiryStatus | 'All' }[] = [
  { label: 'All (24)', status: 'All' },
  { label: 'New (8)', status: 'New' },
  { label: 'In Progress (6)', status: 'In Progress' },
  { label: 'Contacted (7)', status: 'Contacted' },
  { label: 'Site Visit (2)', status: 'Site Visit' },
  { label: 'Closed (1)', status: 'Closed' },
];

interface EnquiriesTabProps {
  onToast: (msg: string) => void;
}

export default function EnquiriesTab({ onToast }: EnquiriesTabProps) {
  const [activeStatus, setActiveStatus] = useState<EnquiryStatus | 'All'>('All');

  const filtered =
    activeStatus === 'All'
      ? mockEnquiries
      : mockEnquiries.filter((e) => e.status === activeStatus);

  return (
    <div className="tab-content">
      {/* Status Tabs */}
      <div className="status-tabs">
        {STATUS_TABS.map((t) => (
          <button
            key={t.label}
            className={`stab ${activeStatus === t.status ? 'stab--active' : ''}`}
            onClick={() => setActiveStatus(t.status)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          All Enquiries{' '}
          <button
            className="btn-export"
            onClick={() => onToast('📥 CSV export started!')}
          >
            Export CSV
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Project</th>
                <th>Config</th>
                <th>Budget</th>
                <th>Source</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((enq) => (
                <tr key={enq.id}>
                  <td><strong>{enq.name}</strong></td>
                  <td>{enq.phone}</td>
                  <td>{enq.project}</td>
                  <td>{enq.config}</td>
                  <td>{enq.budget}</td>
                  <td>{enq.source}</td>
                  <td>{enq.date}</td>
                  <td><StatusBadge status={enq.status} /></td>
                  <td>
                    <div className="action-btns">
                      <ActionButton
                        label="Call"
                        onClick={() => onToast(`📞 Calling ${enq.name}...`)}
                      />
                      {enq.status === 'Site Visit' ? (
                        <ActionButton
                          label="Confirm"
                          onClick={() => onToast(`✅ Visit confirmed for ${enq.name}`)}
                        />
                      ) : (
                        <ActionButton
                          label="WhatsApp"
                          onClick={() => onToast(`💬 Opening WhatsApp for ${enq.name}`)}
                        />
                      )}
                      <ActionButton
                        label="Update"
                        onClick={() => onToast(`✏️ Updating ${enq.name}'s status`)}
                      />
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
          transition: all 0.18s;
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
        }

        .btn-export {
          padding: 5px 12px;
          background: #0D1B2A;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-export:hover {
          background: #1A2F45;
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

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tbody tr:hover {
          background: #FAF7F2;
        }

        .action-btns {
          display: flex;
          gap: 5px;
        }
      `}</style>
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="action-btn" onClick={onClick}>
      {label}
      <style jsx>{`
        .action-btn {
          padding: 4px 9px;
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
    </button>
  );
}
