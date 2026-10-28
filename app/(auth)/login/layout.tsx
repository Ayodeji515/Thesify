import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In to Student Research Portal',
  description:
    'Sign in to your Thesify student account to manage research projects, review data validation reports, and track Chapter Four progress.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
