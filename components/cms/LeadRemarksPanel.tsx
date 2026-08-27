'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAddLeadRemark, useLeadRemarks } from '@/hooks/useApi';

interface LeadRemarksPanelProps {
  leadId: number;
  onToast?: (msg: string) => void;
}

export default function LeadRemarksPanel({ leadId, onToast }: LeadRemarksPanelProps) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState('');
  const { data: remarks = [], isLoading } = useLeadRemarks(leadId, true);
  const { mutate: addRemark, isPending } = useAddLeadRemark();

  const submit = () => {
    const body = draft.trim();
    if (!body || isPending) return;

    addRemark(
      { leadId, body },
      {
        onSuccess: () => {
          setDraft('');
          queryClient.invalidateQueries({ queryKey: ['lead-remarks', leadId] });
          onToast?.('✅ Remark added');
        },
        onError: () => onToast?.('❌ Failed to add remark'),
      }
    );
  };

  return (
    <div className="remarks">
      <div className="remarks-label">Conversation remarks</div>
      <p className="remarks-hint">Visible to admin and the assigned agent only.</p>

      {isLoading ? (
        <div className="remarks-empty">Loading remarks…</div>
      ) : remarks.length === 0 ? (
        <div className="remarks-empty">No remarks yet. Log your client conversations here.</div>
      ) : (
        <ul className="remarks-list">
          {remarks.map((r) => (
            <li key={r.id} className="remark-item">
              <div className="remark-meta">
                <span className="remark-author">
                  {r.author?.name || 'User'}
                  <span className="remark-role"> · {r.author?.role === 'ADMIN' ? 'Admin' : 'Agent'}</span>
                </span>
                <time dateTime={r.createdAt}>
                  {new Date(r.createdAt).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
              <p className="remark-body">{r.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="remarks-compose">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write what you discussed with the client…"
          rows={3}
          maxLength={2000}
        />
        <div className="remarks-actions">
          <span className="char-count">{draft.trim().length}/2000</span>
          <button type="button" disabled={!draft.trim() || isPending} onClick={submit}>
            {isPending ? 'Saving…' : 'Add remark'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .remarks {
          padding: 14px 16px 16px;
          background: #faf7f2;
          border-top: 1px solid #f0eae0;
        }
        .remarks-label {
          font-size: 12px;
          font-weight: 600;
          color: #0d1b2a;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .remarks-hint {
          margin: 4px 0 12px;
          font-size: 11px;
          color: #9ca3af;
        }
        .remarks-empty {
          font-size: 12px;
          color: #9ca3af;
          padding: 10px 0 14px;
        }
        .remarks-list {
          list-style: none;
          margin: 0 0 14px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 280px;
          overflow-y: auto;
        }
        .remark-item {
          background: #fff;
          border: 1px solid #f0eae0;
          border-radius: 8px;
          padding: 10px 12px;
        }
        .remark-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 11px;
          color: #9ca3af;
          margin-bottom: 6px;
        }
        .remark-author {
          color: #0d1b2a;
          font-weight: 600;
        }
        .remark-role {
          font-weight: 400;
          color: #9ca3af;
        }
        .remark-body {
          margin: 0;
          font-size: 13px;
          color: #4a4a4a;
          white-space: pre-wrap;
          line-height: 1.45;
        }
        .remarks-compose textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          font-family: inherit;
          resize: vertical;
          min-height: 72px;
          background: #fff;
          color: #0d1b2a;
        }
        .remarks-compose textarea:focus {
          outline: none;
          border-color: #0d1b2a;
        }
        .remarks-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }
        .char-count {
          font-size: 11px;
          color: #9ca3af;
        }
        .remarks-actions button {
          border: none;
          background: #0d1b2a;
          color: #fff;
          border-radius: 6px;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
        }
        .remarks-actions button:disabled {
          opacity: 0.45;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
