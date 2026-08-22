'use client';

type Section = 'overview' | 'growth' | 'distribution' | 'rankings' | 'pricing';

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'overview',     label: 'Overview',      icon: '◈' },
  { id: 'growth',       label: 'Growth',         icon: '📈' },
  { id: 'distribution', label: 'Distribution',  icon: '🗂' },
  { id: 'rankings',     label: 'Rankings',       icon: '🏆' },
  { id: 'pricing',      label: 'Pricing',        icon: '💰' },
];

interface Props {
  activeSection: Section;
  onSection: (s: Section) => void;
  onRefresh: () => void;
  loading: boolean;
  lastUpdated: string;
}

export default function AnalyticsHeader({ activeSection, onSection, onRefresh, loading, lastUpdated }: Props) {
  return (
    <div className="analytics-header">
      <div className="header-top">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-sub">Real-time insights across all 13 data dimensions</p>
        </div>
        <div className="header-actions">
          <span className="last-updated">Last updated: {lastUpdated}</span>
          <button className="btn-refresh" onClick={onRefresh} disabled={loading}>
            {loading ? '⟳ Refreshing…' : '↻ Refresh'}
          </button>
        </div>
      </div>

      <div className="section-tabs">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`stab ${activeSection === s.id ? 'stab--active' : ''}`}
            onClick={() => onSection(s.id)}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        .analytics-header {
          padding: 22px 28px 0;
          background: #fff;
          border-bottom: 1px solid #F0EAE0;
          position: sticky; top: 0; z-index: 40;
        }
        .header-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 16px;
        }
        .page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px; font-weight: 700; color: #0D1B2A;
        }
        .page-sub { font-size: 12px; color: #9CA3AF; margin-top: 3px; }
        .header-actions { display: flex; align-items: center; gap: 14px; }
        .last-updated { font-size: 11px; color: #9CA3AF; }
        .btn-refresh {
          padding: 7px 16px; background: #0D1B2A; color: #fff;
          border: none; border-radius: 6px; font-size: 12px; font-weight: 600;
          font-family: inherit; cursor: pointer; transition: background .15s;
        }
        .btn-refresh:hover:not(:disabled) { background: #1A2F45; }
        .btn-refresh:disabled { opacity: .6; cursor: not-allowed; }
        .section-tabs { display: flex; gap: 2px; }
        .stab {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 18px; border: none; background: transparent;
          font-size: 13px; font-weight: 500; color: #8A8A8A;
          font-family: inherit; cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color .15s, border-color .15s;
        }
        .stab:hover { color: #0D1B2A; }
        .stab--active { color: #C9A84C; border-bottom-color: #C9A84C; font-weight: 600; }
      `}</style>
    </div>
  );
}
