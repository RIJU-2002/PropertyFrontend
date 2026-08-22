'use client';

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CmsTab } from '@/types';

const TAB_TITLES: Record<CmsTab, string> = {
  dashboard: 'Dashboard',
  add: 'Add New Project',
  add_agent: 'Add Agent',
  view_agents: 'Agents',
  edit_agent: 'Edit Agent',
  view_agent: 'View Agent',
  enquiries: 'Enquiry Manager',
  blogs: 'Add New Blogs',
  view_blogs: 'View Blogs',
  leads: 'Lead Reports',
  media: 'Media Library',
  analytics: 'Analytics',
  edit: 'Edit Project',
  view: 'View Project',
};

interface CmsTopbarProps {
  activeTab: CmsTab;
  onAddProject: () => void; 
}

export default function CmsTopbar({ activeTab }: CmsTopbarProps) {
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

        {/* <Link href="/" className="btn-home">
          Website
          <ArrowUpRight size={16} />
      </Link> */}
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

        // .btn-home{
        //     display:flex;
        //     align-items:center;
        //     gap:8px;

        //     height:40px;
        //     padding:0 18px;

        //     border:1px solid #D4B15A;
        //     border-radius:999px;

        //     background:#fff;
        //     color:#0D1B2A;

        //     text-decoration:none;
        //     font-weight:600;
        //     font-size:14px;

        //     transition:.25s;
        // }

        // .btn-home:hover{
        //     background:#D4B15A;
        //     color:#fff;
        // }
      `}</style>
    </header>
  );
}
