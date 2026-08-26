'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, token, user } = useAuth();
  const router = useRouter();
  const isAgent = Boolean(token && user?.role === 'AGENT');

  useEffect(() => {
    if (isLoading) return;
    if (!isAgent) {
      router.replace(token ? '/' : '/auth');
    }
  }, [isLoading, isAgent, token, router]);

  if (isLoading || !isAgent) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F3EF',
        }}
      >
        <p style={{ color: '#6B7280', fontSize: 14 }}>
          Checking agent access…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
