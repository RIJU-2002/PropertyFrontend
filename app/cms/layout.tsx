import type { Metadata } from 'next';
import CmsAuthGuard from '@/components/cms/CmsAuthGuard';

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <CmsAuthGuard>{children}</CmsAuthGuard>;
}
