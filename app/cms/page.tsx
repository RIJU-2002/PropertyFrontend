'use client';

import { useState, useCallback } from 'react';
import CmsSidebar from '@/components/cms/CmsSidebar';
import CmsTopbar from '@/components/cms/CmsTopbar';
import DashboardTab from '@/components/cms/DashboardTab';
import AddProjectTab from '@/components/cms/AddProjectTab';
import EnquiriesTab from '@/components/cms/EnquiriesTab';
import LeadReportsTab from '@/components/cms/LeadReportsTab';
import MediaLibraryTab from '@/components/cms/MediaLibraryTab';
import Toast from '@/components/cms/Toast';
import type { CmsTab } from '@/types';

export default function CmsPage() {
  const [activeTab, setActiveTab] = useState<CmsTab>('dashboard');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleAddProject = () => setActiveTab('add');

  return (
    <div className="cms-shell">
      <CmsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="cms-body">
        <CmsTopbar activeTab={activeTab} onAddProject={handleAddProject} />

        <main className="cms-main">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'add' && <AddProjectTab onToast={showToast} />}
          {activeTab === 'enquiries' && <EnquiriesTab onToast={showToast} />}
          {activeTab === 'leads' && <LeadReportsTab />}
          {activeTab === 'media' && <MediaLibraryTab onToast={showToast} />}
        </main>
      </div>

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

      <style jsx>{`
        .cms-shell {
          display: flex;
          min-height: 100vh;
          background: #F5F3EF;
        }

        .cms-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }

        .cms-main {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
