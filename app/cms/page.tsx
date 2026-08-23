'use client';

import { useState, useCallback } from 'react';
import CmsSidebar from '@/components/cms/CmsSidebar';
import CmsTopbar from '@/components/cms/CmsTopbar';
import DashboardTab from '@/components/cms/DashboardTab';
import AddProjectTab from '@/components/cms/AddProjectTab';
import AddAgentTab from '@/components/cms/AddAgentTab';
import ViewAgentsTab from '@/components/cms/ViewAgentsTab';
import EnquiriesTab from '@/components/cms/EnquiriesTab';
import LeadReportsTab from '@/components/cms/LeadReportsTab';
import MediaLibraryTab from '@/components/cms/MediaLibraryTab';
import AddArticleTab from '@/components/blog/AddArticleTab';
import Toast from '@/components/cms/Toast';
import AnalyticsPage from '@/components/analytics/AnalyticsPage';
import ViewBlogsTab from '@/components/cms/ViewBlogs';
import type { CmsTab } from '@/types';
import { API_BASE } from '@/lib/apiUrl';

const DUMMY_CATEGORIES = [
  { id: "cat-1", name: "Market Updates", slug: "market-updates" },
  { id: "cat-2", name: "Buying Guide", slug: "buying-guide" },
  { id: "cat-3", name: "Investment Tips", slug: "investment-tips" },
  { id: "cat-4", name: "Legal & Finance", slug: "legal-finance" },
];

const DUMMY_TAGS = [
  { id: "tag-1", name: "Bhubaneswar", slug: "bhubaneswar" },
  { id: "tag-2", name: "Kolkata", slug: "kolkata" },
  { id: "tag-3", name: "Odisha", slug: "odisha" },
  { id: "tag-4", name: "Residential", slug: "residential" },
  { id: "tag-5", name: "Commercial", slug: "commercial" },
  { id: "tag-6", name: "RERA", slug: "rera" },
  { id: "tag-7", name: "Home Loan", slug: "home-loan" },
  { id: "tag-8", name: "Investment", slug: "investment" },
];

export default function CmsPage() {
  const [activeTab, setActiveTab] = useState<CmsTab>('dashboard');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // const handleAddProject = () => setActiveTab('add');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  // const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const handleEditProject = (id: number) => {
      setSelectedProjectId(id);
      setActiveTab("edit");
    };

    const handleViewProject = (id: number) => {
      setSelectedProjectId(id);
      // setSelectedProjectSlug(null);
      setActiveTab("view");
    };

    const handleAddProject = () => {
      setSelectedProjectId(null);
      // setSelectedProjectSlug(null);
      setActiveTab("add");
    };

    const handleAddAgent = () => {
      setSelectedAgentId(null);
      setActiveTab("add_agent");
    };

    const handleEditAgent = (id: number) => {
      setSelectedAgentId(id);
      setActiveTab("edit_agent");
    };

    const handleViewAgent = (id: number) => {
      setSelectedAgentId(id);
      setActiveTab("view_agent");
    };
  // const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <div className="cms-shell">
      <CmsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="cms-body">
        <CmsTopbar activeTab={activeTab} onAddProject={handleAddProject} />

        <main className="cms-main">
          {activeTab === "dashboard" && (
            <DashboardTab
              onEditProject={handleEditProject}
              onViewProject={handleViewProject}
            />
          )}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === "add" && (
            <AddProjectTab
              mode="create"
              onToast={showToast}
            />
          )}

          {activeTab === "edit" && selectedProjectId && (
            <AddProjectTab
              mode="edit"
              projectId={selectedProjectId}
              onToast={showToast}
            />
          )}

          {activeTab === "view" && selectedProjectId && (
            <AddProjectTab
              mode="view"
              projectId={selectedProjectId}
              onToast={showToast}
              onEdit={() => setActiveTab("edit")}
             />
          )}
          {activeTab === "add_agent" && (
            <AddAgentTab
              mode="create"
              onToast={showToast}
              onSaved={() => setActiveTab("view_agents")}
            />
          )}
          {activeTab === "view_agents" && (
            <ViewAgentsTab
              onAdd={handleAddAgent}
              onEdit={handleEditAgent}
              onView={handleViewAgent}
            />
          )}
          {activeTab === "edit_agent" && selectedAgentId && (
            <AddAgentTab
              mode="edit"
              agentId={selectedAgentId}
              onToast={showToast}
              onSaved={() => setActiveTab("view_agents")}
            />
          )}
          {activeTab === "view_agent" && selectedAgentId && (
            <AddAgentTab
              mode="view"
              agentId={selectedAgentId}
              onToast={showToast}
              onEdit={() => setActiveTab("edit_agent")}
            />
          )}
          {activeTab === 'enquiries' && <EnquiriesTab onToast={showToast} />}
          {activeTab === 'leads' && <LeadReportsTab />}
          {activeTab === "view_blogs" && (<ViewBlogsTab />)}
          {activeTab === 'media' && <MediaLibraryTab onToast={showToast} />}
          {activeTab === 'blogs' && (
          <AddArticleTab
            apiUrl={API_BASE}
            categories={DUMMY_CATEGORIES}
            tags={DUMMY_TAGS}
            onSaved={(id) => {
              showToast("Article saved!");
            }}
          />
        )}
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
