'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

type AgentTab = 'profile' | 'leads';

interface AgentSidebarProps {
  activeTab: AgentTab;
  onTabChange: (tab: AgentTab) => void;
}

export default function AgentSidebar({ activeTab, onTabChange }: AgentSidebarProps) {
  const { user } = useAuth();
  const initial = (user?.name?.trim()?.[0] || user?.phone?.slice(-1) || 'A').toUpperCase();

  return (
    <aside className="sidebar">
      <Link href="/" className="logo-link">
        <div className="logo">
          <div className="mark">S</div>
          <div>
            <div className="name">Samriddh</div>
            <div className="sub">Agent Panel</div>
          </div>
        </div>
      </Link>

      <nav className="nav">
        <button
          className={`item ${activeTab === 'profile' ? 'item--active' : ''}`}
          onClick={() => onTabChange('profile')}
        >
          My details
        </button>
        <button
          className={`item ${activeTab === 'leads' ? 'item--active' : ''}`}
          onClick={() => onTabChange('leads')}
        >
          Assigned leads
        </button>
      </nav>

      <div className="profile">
        <div className="avatar">{initial}</div>
        <div>
          <div className="role">Agent</div>
          <div className="pname">{user?.name || user?.phone || 'Agent'}</div>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 232px;
          min-height: 100vh;
          background: #fafaf9;
          border-right: 1px solid #f0eae0;
          display: flex;
          flex-direction: column;
          padding: 20px 16px;
        }
        .logo-link { text-decoration: none; color: inherit; }
        .logo { display: flex; gap: 10px; align-items: center; margin-bottom: 28px; }
        .mark {
          width: 36px; height: 36px; border-radius: 8px;
          background: #0d1b2a; color: #d4b15a;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
        }
        .name { font-weight: 700; color: #0d1b2a; font-size: 14px; }
        .sub { font-size: 11px; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; }
        .nav { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .item {
          text-align: left;
          border: none;
          background: transparent;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #4b5563;
          cursor: pointer;
        }
        .item--active, .item:hover { background: #fff; color: #0d1b2a; font-weight: 600; }
        .profile {
          display: flex; gap: 10px; align-items: center;
          padding-top: 16px; border-top: 1px solid #f0eae0;
        }
        .avatar {
          width: 36px; height: 36px; border-radius: 999px;
          background: #0d1b2a; color: #d4b15a;
          display: flex; align-items: center; justify-content: center;
          font-weight: 600;
        }
        .role { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
        .pname { font-size: 13px; color: #0d1b2a; font-weight: 600; }
      `}</style>
    </aside>
  );
}
