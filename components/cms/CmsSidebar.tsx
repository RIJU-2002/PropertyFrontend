'use client';

import type { CmsTab } from '@/types';

interface NavItem {
  id?: CmsTab;
  label: string;
  icon: string;
  badge?: number;
  section?: string;
}

const NAV_ITEMS: (NavItem & { isSection?: boolean })[] = [
  { section: 'Main', isSection: true, label: '', icon: '' },
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'enquiries', label: 'Enquiries', icon: '📩', badge: 8 },
  { section: 'Content', isSection: true, label: '', icon: '' },
  { id: 'add', label: 'Add Project', icon: '➕' },
  { id: 'media', label: 'Media Library', icon: '🖼' },
  { id: 'leads', label: 'Lead Reports', icon: '📊' },
];

const SETTINGS_ITEMS = [
  { label: 'Site Settings', icon: '⚙️' },
  { label: 'Admin Users', icon: '👤' },
];

interface CmsSidebarProps {
  activeTab: CmsTab;
  onTabChange: (tab: CmsTab) => void;
}

export default function CmsSidebar({ activeTab, onTabChange }: CmsSidebarProps) {
  return (
    <aside className="cms-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">S</div>
        <div>
          <div className="logo-name">Samriddh CMS</div>
          <div className="logo-sub">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, idx) => {
          if (item.isSection) {
            return (
              <div key={idx} className="nav-section-label">
                {item.section}
              </div>
            );
          }
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={() => item.id && onTabChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge !== undefined && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}

        <div className="nav-section-label">Settings</div>
        {SETTINGS_ITEMS.map((item) => (
          <button key={item.label} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Admin Profile */}
      <div className="sidebar-profile">
        <div className="profile-avatar">R</div>
        <div>
          <div className="profile-role">Admin</div>
          <div className="profile-name">Rahul Samriddh</div>
          <div className="profile-tier">Super Admin</div>
        </div>
      </div>

      <style jsx>{`
        .cms-sidebar {
          width: 232px;
          min-height: 100vh;
          background: #0D1B2A;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 16px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          background: #C9A84C;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          color: #0D1B2A;
          font-size: 18px;
          flex-shrink: 0;
        }

        .logo-name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
        }

        .logo-sub {
          font-size: 10px;
          color: #C9A84C;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 1px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-section-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.28);
          padding: 12px 8px 5px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 10px;
          border-radius: 7px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.58);
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.85);
        }

        .nav-item--active {
          background: rgba(201, 168, 76, 0.14);
          color: #C9A84C;
        }

        .nav-item--active:hover {
          background: rgba(201, 168, 76, 0.18);
          color: #C9A84C;
        }

        .nav-icon {
          width: 18px;
          text-align: center;
          flex-shrink: 0;
          font-size: 14px;
        }

        .nav-label {
          flex: 1;
        }

        .nav-badge {
          background: #E94560;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
        }

        .sidebar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .profile-avatar {
          width: 34px;
          height: 34px;
          background: rgba(201, 168, 76, 0.2);
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #C9A84C;
          flex-shrink: 0;
        }

        .profile-role {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        .profile-name {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
        }

        .profile-tier {
          font-size: 10px;
          color: #C9A84C;
          margin-top: 1px;
        }
      `}</style>
    </aside>
  );
}
