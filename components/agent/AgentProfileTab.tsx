'use client';

import { useMyAgentProfile } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

export default function AgentProfileTab() {
  const { user } = useAuth();
  const { data: agent, isLoading, error } = useMyAgentProfile();

  if (isLoading) {
    return <div className="state">Loading your profile…</div>;
  }

  if (error || !agent) {
    return <div className="state">Could not load agent profile.</div>;
  }

  const rows = [
    ['Name', agent.user?.name || user?.name || '—'],
    ['Phone', agent.user?.phone || user?.phone || '—'],
    ['Email', agent.user?.email || user?.email || '—'],
    ['Agency', agent.agencyName || '—'],
    ['RERA number', agent.reraNumber || '—'],
    ['Verified', agent.isVerified ? 'Yes' : 'No'],
    ['Active', agent.isActive ? 'Yes' : 'No'],
    ['Assigned leads', String(agent._count?.leads ?? 0)],
  ];

  return (
    <div className="card">
      <div className="head">Agent details</div>
      <dl className="grid">
        {rows.map(([label, value]) => (
          <div key={label} className="row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <style jsx>{`
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
        }
        .grid { margin: 0; }
        .row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid #f8f5ef;
        }
        .row:last-child { border-bottom: none; }
        dt { color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
        dd { margin: 0; color: #0d1b2a; font-size: 14px; font-weight: 500; }
        .state { padding: 40px; text-align: center; color: #6b7280; }
      `}</style>
    </div>
  );
}
