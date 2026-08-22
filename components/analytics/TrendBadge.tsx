interface TrendBadgeProps {
  pct: number;
  label?: string;
}

export default function TrendBadge({ pct, label }: TrendBadgeProps) {
  const up = pct >= 0;
  return (
    <span className={`trend-badge ${up ? 'trend-badge--up' : 'trend-badge--down'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}%{label ? ` ${label}` : ''}
      <style jsx>{`
        .trend-badge {
          display: inline-flex; align-items: center; gap: 3px;
          padding: 3px 8px; border-radius: 20px;
          font-size: 11px; font-weight: 600;
        }
        .trend-badge--up   { background: #DCFCE7; color: #166534; }
        .trend-badge--down { background: #FEE2E2; color: #991B1B; }
      `}</style>
    </span>
  );
}
