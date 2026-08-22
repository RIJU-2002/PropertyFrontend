interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  trendUp?: boolean;
  accent?: boolean; // gold highlight
  icon?: string;
}

export default function StatCard({ label, value, sub, trend, trendUp, accent, icon }: StatCardProps) {
  return (
    <div className={`stat-card ${accent ? 'stat-card--accent' : ''}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
      {trend && (
        <div className={`stat-trend ${trendUp ? 'stat-trend--up' : 'stat-trend--down'}`}>
          {trendUp ? '▲' : '▼'} {trend}
        </div>
      )}

      <style jsx>{`
        .stat-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px 22px 18px;
          border: 1px solid #F0EAE0;
          box-shadow: 0 2px 12px rgba(13,27,42,.06);
          transition: box-shadow .2s, transform .2s;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #F0EAE0;
        }
        .stat-card--accent::before { background: linear-gradient(90deg,#C9A84C,#9B7A2A); }
        .stat-card:hover { box-shadow: 0 8px 28px rgba(13,27,42,.12); transform: translateY(-2px); }
        .stat-icon { font-size: 22px; margin-bottom: 10px; }
        .stat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #8A8A8A;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          color: #0D1B2A;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-card--accent .stat-value { color: #C9A84C; }
        .stat-sub { font-size: 11px; color: #9CA3AF; margin-bottom: 6px; }
        .stat-trend { font-size: 12px; font-weight: 600; margin-top: 6px; }
        .stat-trend--up { color: #3B6D11; }
        .stat-trend--down { color: #A32D2D; }
      `}</style>
    </div>
  );
}
