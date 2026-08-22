type BadgeType = 'top' | 'rising' | 'new';

const CONFIG: Record<BadgeType, { label: string; bg: string; color: string; icon: string }> = {
  top:    { label: 'Top',    bg: '#FEF3C7', color: '#92400E', icon: '🏆' },
  rising: { label: 'Rising', bg: '#DBEAFE', color: '#1E40AF', icon: '🚀' },
  new:    { label: 'New',    bg: '#DCFCE7', color: '#166534', icon: '✨' },
};

export default function RankBadge({ type }: { type: BadgeType }) {
  const c = CONFIG[type];
  return (
    <span className="rank-badge" style={{ background: c.bg, color: c.color }}>
      {c.icon} {c.label}
      <style jsx>{`
        .rank-badge {
          display: inline-flex; align-items: center; gap: 3px;
          padding: 2px 8px; border-radius: 20px;
          font-size: 10px; font-weight: 600;
        }
      `}</style>
    </span>
  );
}
