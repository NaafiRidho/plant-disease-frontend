import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlantScan AI — Dashboard',
  description: 'Real-time monitoring dashboard for plant disease detection, growth insights, and environmental analysis.',
};


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
