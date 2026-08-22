import type { ProjectStatus, EnquiryStatus,ProjectStats } from '@/types';

type BadgeVariant = ProjectStatus | EnquiryStatus | ProjectStats | string;

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Active: { bg: '#DCFCE7', color: '#166534' },
  Draft: { bg: '#F3F4F6', color: '#6B7280' },
  'Sold Out': { bg: '#FEE2E2', color: '#991B1B' },
  'Coming Soon': { bg: '#DBEAFE', color: '#1E40AF' },
  New: { bg: '#DBEAFE', color: '#1E40AF' },
  'In Progress': { bg: '#FEF3C7', color: '#92400E' },
  Contacted: { bg: '#DCFCE7', color: '#166534' },
  'Site Visit': { bg: '#EDE9FE', color: '#5B21B6' },
  Closed: { bg: '#F3F4F6', color: '#6B7280' },
  NEW: { bg: '#DBEAFE', color: '#1E40AF' },
  CONTACTED: { bg: '#DCFCE7', color: '#166534' },
  SITE_VISIT_SCHEDULED: { bg: '#EDE9FE', color: '#5B21B6' },
  NEGOTIATING: { bg: '#FEF3C7', color: '#92400E' },
  CONVERTED: { bg: '#DCFCE7', color: '#166534' },
  LOST: { bg: '#FEE2E2', color: '#991B1B' },
  UNDER_CONSTRUCTION:{ bg: '#FEE2E2', color: '#991B1B' },
  READY_TO_MOVE:{ bg: '#DCFCE7', color: '#166534' },
  NEW_LAUNCH:{ bg: '#DBEAFE', color: '#1E40AF' }
};

interface StatusBadgeProps {
  status: BadgeVariant;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const style = BADGE_STYLES[status] ?? { bg: '#F3F4F6', color: '#6B7280' };

  return (
    <span
      className={`badge ${className}`}
      style={{ background: style.bg, color: style.color }}
    >
      {status}

      <style jsx>{`
        .badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
      `}</style>
    </span>
  );
}
