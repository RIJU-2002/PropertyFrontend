'use client';

import { useState, useEffect, useCallback } from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import OverviewSection from './OverviewSection';
import GrowthSection from './GrowthSection';
import DistributionSection from './DistributionSection';
import RankingsSection from './RankingsSection';
import PricingSection from './PricingSection';
import SkeletonLoader from './SkeletonLoader';
import type { DashboardAnalytics } from '@/types/analytics';

type Section = 'overview' | 'growth' | 'distribution' | 'rankings' | 'pricing';

// Toggle this to false when your real API is ready
const USE_MOCK = false;

async function loadAnalytics(): Promise<DashboardAnalytics> {
  const { fetchDashboardAnalytics } = await import(
    '@/lib/analyticsApi'
  );

  return fetchDashboardAnalytics();
}

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [section, setSection] = useState<Section>('overview');
  const [lastUpdated, setLastUpdated] = useState('—');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await loadAnalytics();
      setData(result);
      setLastUpdated(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      );
    } catch (e) {
      setError((e as Error).message ?? 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  console.log("Analytics Data:", data);
  return (
    <div className="analytics-shell">
      <AnalyticsHeader
        activeSection={section}
        onSection={setSection}
        onRefresh={refresh}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      {error && (
        <div className="error-banner">
          ⚠️ {error} &nbsp;
          <button onClick={refresh}>Retry</button>
        </div>
      )}

      {loading && !data ? (
        <SkeletonLoader />
      ) : data ? (
        <div className="analytics-body">
          {section === 'overview' && (
            <OverviewSection data={data.overview} />
          )}
          {section === 'growth' && (
            <GrowthSection
                projects={data.growth.projects}
                properties={data.growth.properties}
                leads={data.growth.leads}
            />
          )}
          {section === 'distribution' && (
            <DistributionSection
                cities={data.distribution.cities}
                localities={data.distribution.localities}
                propertyTypes={data.distribution.propertyTypes}
                possession={data.distribution.possession}
            />
          )}
          {section === 'rankings' && (
            <RankingsSection
                builders={data.rankings.builders}
                cities={data.rankings.cities}
                localities={data.rankings.localities}
            />
          )}
          {section === 'pricing' && (
            <PricingSection
                summary={data.pricing.summary}
                ranges={data.pricing.ranges}
            />
          )}
        </div>
      ) : null}

      <style jsx>{`
        .analytics-shell { display: flex; flex-direction: column; min-height: 100vh; background: #F5F3EF; }
        .analytics-body { padding: 28px; display: flex; flex-direction: column; gap: 32px; }
        .error-banner {
          margin: 16px 28px; padding: 12px 18px;
          background: #FEE2E2; color: #991B1B;
          border-radius: 8px; font-size: 13px;
          display: flex; align-items: center; gap: 10px;
        }
        .error-banner button {
          padding: 4px 12px; background: #991B1B; color: #fff;
          border: none; border-radius: 4px; font-size: 12px;
          font-family: inherit; cursor: pointer;
        }
      `}</style>
    </div>
  );
}
