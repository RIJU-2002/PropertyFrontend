'use client';

import { useState } from 'react';
import AgentSidebar from '@/components/agent/AgentSidebar';
import AgentProfileTab from '@/components/agent/AgentProfileTab';
import AgentLeadsTab from '@/components/agent/AgentLeadsTab';

type AgentTab = 'profile' | 'leads';

export default function AgentPanelPage() {
  const [activeTab, setActiveTab] = useState<AgentTab>('profile');

  return (
    <div className="shell">
      <AgentSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="body">
        <header className="topbar">
          <h1>{activeTab === 'profile' ? 'My details' : 'Assigned leads'}</h1>
        </header>
        <main className="main">
          {activeTab === 'profile' ? <AgentProfileTab /> : <AgentLeadsTab />}
        </main>
      </div>
      <style jsx>{`
        .shell { display: flex; min-height: 100vh; background: #f5f3ef; }
        .body { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .topbar {
          height: 56px;
          background: #fff;
          border-bottom: 1px solid #f0eae0;
          display: flex;
          align-items: center;
          padding: 0 28px;
        }
        h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #0d1b2a;
        }
        .main { padding: 24px 28px; }
      `}</style>
    </div>
  );
}
