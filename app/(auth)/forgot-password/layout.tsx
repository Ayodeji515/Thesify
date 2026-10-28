import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Account Password',
  description:
    'Reset your Thesify student account password to regain access to your quantitative research analysis and project reports.',
  alternates: {
    canonical: '/forgot-password',
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
