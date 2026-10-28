import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Research Dashboard',
  description:
    'Manage your quantitative research submissions, review data hygiene checks, track analyst audit progress, and access supervisor-ready Chapter Four reports.',
  alternates: {
    canonical: '/dashboard',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
