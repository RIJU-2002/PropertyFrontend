'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { CmsTab } from '@/types';
import Link from "next/link";

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
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'enquiries', label: 'Enquiries', icon: '📩', badge: 8 },
  { section: 'Content', isSection: true, label: '', icon: '' },
  { id: 'add', label: 'Add Project', icon: '➕' },
  { id: 'view_agents', label: 'Agents', icon: '👥' },
  { id: 'add_agent', label: 'Add Agent', icon: '👤' },
  { id: 'blogs', label: 'Add Blogs', icon: '➕' },
  { id: 'view_blogs', label: 'View Blogs', icon: '' },
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
  const navRef = useRef<HTMLElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translate(0px, 0px)',
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const updateSlider = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector(
        `[data-nav-id="${activeTab}"]`
      ) as HTMLElement | null;

      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();

        setSliderStyle({
          opacity: 1,
          transform: `translate(${elRect.left - navRect.left}px, ${elRect.top - navRect.top}px)`,
          width: elRect.width,
          height: elRect.height,
        });
      } else {
        setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const raf = requestAnimationFrame(updateSlider);

    const ro = new ResizeObserver(updateSlider);
    if (navRef.current) ro.observe(navRef.current);
    window.addEventListener('resize', updateSlider);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', updateSlider);
    };
  }, [activeTab]);

  return (
    <aside className="cms-sidebar">
      {/* Logo */}
      <Link href="/" className="sidebar-logo-link">
        <div className="sidebar-logo">
          <div className="logo-mark">S</div>
          <div>
            <div className="logo-name">Samriddh CMS</div>
            <div className="logo-sub">Admin Panel</div>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav" ref={navRef}>
        {/* Subtle background so glass blur has something to refract */}
        <div className="nav-glass-bg" aria-hidden="true" />

        {/* Apple-style Glass Slider */}
        <div className="nav-glass-slider" style={sliderStyle} aria-hidden="true">
          <div className="nav-glass-edge" aria-hidden="true" />
          <div className="nav-glass-shimmer" aria-hidden="true" />
        </div>

        {NAV_ITEMS.map((item, idx) => {
          if (item.isSection) {
            return (
              <div key={idx} className="nav-section-label">
                {item.section}
              </div>
            );
          }
          const isActive =
            activeTab === item.id ||
            (item.id === 'view_agents' &&
              (activeTab === 'edit_agent' || activeTab === 'view_agent'));
          return (
            <button
              key={item.id}
              data-nav-id={item.id}
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
          background: #FAFAF9;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 16px 16px;
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #D4AF37, #C9A84C);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          color: #fff;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(201, 168, 76, 0.30);
        }

        .logo-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: -0.01em;
        }

        .logo-sub {
          font-size: 10px;
          color: #B8860B;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 2px;
          font-weight: 500;
        }

        .sidebar-nav {
          flex: 1;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          position: relative;
        }

        /* ── Background for glass blur to refract ── */
        .nav-glass-bg {
          position: absolute;
          inset: 8px;
          border-radius: 12px;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 80%, rgba(201, 168, 76, 0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Apple-Style Glass Slider ── */
        .nav-glass-slider {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 10px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.50) 0%,
            rgba(255, 255, 255, 0.20) 100%
          );
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.50);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.80),
            inset 0 -1px 1px rgba(0, 0, 0, 0.03),
            0 4px 12px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.02);
          pointer-events: none;
          z-index: 1;
          transition:
            transform 0.45s cubic-bezier(0.32, 0.72, 0.35, 1.00),
            width 0.45s cubic-bezier(0.32, 0.72, 0.35, 1.00),
            height 0.45s cubic-bezier(0.32, 0.72, 0.35, 1.00),
            opacity 0.3s ease;
          will-change: transform, width, height;
          overflow: hidden;
        }

        /* Glass edge highlight (top) + depth (bottom) */
        .nav-glass-edge {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border-top: 1px solid rgba(255, 255, 255, 0.90);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          pointer-events: none;
        }

        /* Shimmer sweep across the glass */
        .nav-glass-shimmer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.40) 50%,
            transparent 65%
          );
          background-size: 250% 100%;
          animation: glassShimmer 5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glassShimmer {
          0% { background-position: 250% 0; }
          100% { background-position: -250% 0; }
        }

        .nav-section-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(0, 0, 0, 0.30);
          padding: 8px 8px 4px;
          position: relative;
          z-index: 2;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: rgba(0, 0, 0, 0.50);
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: color 0.25s ease, transform 0.25s cubic-bezier(0.32, 0.72, 0.35, 1.00);
          width: 100%;
          text-align: left;
          position: relative;
          z-index: 2;
          margin: 0;
          outline: none;
        }

        .nav-item:hover {
          color: rgba(0, 0, 0, 0.85);
        }

        /* ── Active: dark gold text + zoom on icon & label ── */
        .nav-item--active {
          color: #8B6914;
          font-weight: 600;
        }

        .nav-item--active .nav-icon {
          transform: scale(1.06);
        }

        .nav-item--active .nav-label {
          transform: scale(1.03);
          transform-origin: left center;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
          flex-shrink: 0;
          font-size: 15px;
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0.35, 1.00);
          display: inline-block;
        }

        .nav-label {
          flex: 1;
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0.35, 1.00);
          display: inline-block;
        }

        .nav-badge {
          background: #C9A84C;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          position: relative;
          z-index: 2;
          box-shadow: 0 1px 3px rgba(201, 168, 76, 0.30);
        }

        .sidebar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .profile-avatar {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.12), rgba(201, 168, 76, 0.06));
          border: 1px solid rgba(201, 168, 76, 0.20);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #B8860B;
          flex-shrink: 0;
        }

        .profile-role {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.35);
          font-weight: 500;
        }

        .profile-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .profile-tier {
          font-size: 10px;
          color: #B8860B;
          margin-top: 1px;
          font-weight: 500;
        }
      `}</style>
    </aside>
  );
}
