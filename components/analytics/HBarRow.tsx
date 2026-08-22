interface HBarRowProps {
  label: string;
  value: number;      // raw count
  pct: number;        // 0–100
  maxPct?: number;    // normalise bar width against this max (default 100)
  sub?: string;       // e.g. "₹720 Cr"
  color?: string;
  rank?: number;
}

const PALETTE = [
  '#C9A84C','#B8973E','#A78530','#967322','#856114',
  '#7A5A10','#6E520E','#62490C','#56400A','#4A3808',
];

export default function HBarRow({ label, value, pct, maxPct = 100, sub, color, rank }: HBarRowProps) {
  const barWidth = Math.min((pct / maxPct) * 100, 100);
  const fillColor = color ?? PALETTE[(rank ?? 1) - 1] ?? PALETTE[0];

  return (
    <div className="hbar-row">
      <div className="hbar-meta">
        {rank !== undefined && <span className="hbar-rank">#{rank}</span>}
        <span className="hbar-label">{label}</span>
        <span className="hbar-count">{value.toLocaleString('en-IN')}</span>
      </div>
      <div className="hbar-track">
        <div className="hbar-fill" style={{ width: `${barWidth}%`, background: fillColor }} />
      </div>
      <div className="hbar-right">
        <span className="hbar-pct">{pct}%</span>
        {sub && <span className="hbar-sub">{sub}</span>}
      </div>

      <style jsx>{`
        .hbar-row { display: flex; flex-direction: column; gap: 6px; }
        .hbar-meta { display: flex; align-items: center; gap: 7px; }
        .hbar-rank {
          font-size: 10px; font-weight: 700; color: #C9A84C;
          background: rgba(201,168,76,.1); padding: 1px 5px;
          border-radius: 4px; min-width: 24px; text-align: center;
        }
        .hbar-label { font-size: 13px; color: #1A1A1A; font-weight: 500; flex: 1; }
        .hbar-count { font-size: 12px; color: #8A8A8A; }
        .hbar-track {
          height: 8px; background: #F0EAE0;
          border-radius: 4px; overflow: hidden;
        }
        .hbar-fill { height: 100%; border-radius: 4px; transition: width .5s ease; }
        .hbar-right { display: flex; align-items: center; gap: 10px; }
        .hbar-pct { font-size: 12px; font-weight: 600; color: #0D1B2A; }
        .hbar-sub { font-size: 11px; color: #C9A84C; font-weight: 500; }
      `}</style>
    </div>
  );
}
