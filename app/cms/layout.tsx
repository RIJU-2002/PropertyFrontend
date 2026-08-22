'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, token, user } = useAuth();
  const router = useRouter();
  const isAdmin = Boolean(token && user?.role === 'ADMIN');

  useEffect(() => {
    if (isLoading) return;
    if (!isAdmin) {
      router.replace(token ? '/' : '/auth');
    }
  }, [isLoading, isAdmin, token, router]);

  if (isLoading || !isAdmin) {
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
          Checking admin access…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
