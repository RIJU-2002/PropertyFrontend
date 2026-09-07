import type { Metadata } from 'next';
import AgentAuthGuard from '@/components/agent/AgentAuthGuard';

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return <AgentAuthGuard>{children}</AgentAuthGuard>;
}
