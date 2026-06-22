'use client';

import type { CmsTab } from '@/types';

const TAB_TITLES: Record<CmsTab, string> = {
  dashboard: 'Dashboard',
  add: 'Add New Project',
  enquiries: 'Enquiry Manager',
  leads: 'Lead Reports',
  media: 'Media Library',
};

interface CmsTopbarProps {
  activeTab: CmsTab;
  onAddProject: () => void;
}

export default function CmsTopbar({ activeTab, onAddProject }: CmsTopbarProps) {
  const now = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{TAB_TITLES[activeTab]}</h1>
      </div>
      <div className="topbar-right">
        <span className="topbar-time">Last updated: {now}</span>
        <button className="btn-add" onClick={onAddProject}>
          + Add New Project
        </button>
      </div>

      <style jsx>{`
        .topbar {
          height: 56px;
          background: #fff;
          border-bottom: 1px solid #F0EAE0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .topbar-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 20px;
          color: #0D1B2A;
          font-weight: 600;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .topbar-time {
          font-size: 12px;
          color: #9CA3AF;
        }

        .btn-add {
          background: #C9A84C;
          color: #0D1B2A;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.18s;
          letter-spacing: 0.01em;
        }

        .btn-add:hover {
          background: #9B7A2A;
          color: #fff;
        }
      `}</style>
    </header>
  );
}
