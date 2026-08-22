import { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  noPad?: boolean;
}

export default function SectionCard({ title, subtitle, children, action, noPad }: SectionCardProps) {
  return (
    <div className="section-card">
      <div className="section-head">
        <div>
          <div className="section-title">{title}</div>
          {subtitle && <div className="section-sub">{subtitle}</div>}
        </div>
        {action && <div className="section-action">{action}</div>}
      </div>
      <div className={noPad ? '' : 'section-body'}>{children}</div>

      <style jsx>{`
        .section-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #F0EAE0;
          box-shadow: 0 2px 12px rgba(13,27,42,.06);
          overflow: hidden;
        }
        .section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 18px 22px 16px;
          border-bottom: 1px solid #F5F0E8;
        }
        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px;
          font-weight: 600;
          color: #0D1B2A;
        }
        .section-sub { font-size: 11px; color: #9CA3AF; margin-top: 3px; }
        .section-action { flex-shrink: 0; }
        .section-body { padding: 20px 22px; }
      `}</style>
    </div>
  );
}
