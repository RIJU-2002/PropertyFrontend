export default function SkeletonLoader() {
  return (
    <div className="skeleton-wrap">
      <div className="skel-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skel-card">
            <div className="skel-line skel-line--sm" />
            <div className="skel-line skel-line--lg" />
            <div className="skel-line skel-line--xs" />
          </div>
        ))}
      </div>
      <div className="skel-chart" />
      <div className="skel-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skel-card skel-card--tall" />
        ))}
      </div>

      <style jsx>{`
        .skeleton-wrap { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .skel-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .skel-card {
          background: #fff; border-radius: 12px; padding: 22px;
          border: 1px solid #F0EAE0; display: flex; flex-direction: column; gap: 12px;
        }
        .skel-card--tall { min-height: 200px; }
        .skel-line {
          background: linear-gradient(90deg, #F0EAE0 25%, #FAF7F2 50%, #F0EAE0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 4px;
        }
        .skel-line--xs  { height: 10px; width: 40%; }
        .skel-line--sm  { height: 12px; width: 60%; }
        .skel-line--lg  { height: 36px; width: 50%; }
        .skel-chart {
          height: 200px; background: #fff; border-radius: 12px;
          border: 1px solid #F0EAE0;
          background: linear-gradient(90deg, #F0EAE0 25%, #FAF7F2 50%, #F0EAE0 75%);
          background-size: 200% 100%; animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
