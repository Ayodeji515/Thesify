import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Student Research Account',
  description:
    'Register for a student research account on Thesify. Submit project metadata, upload survey data, and receive verified quantitative analysis.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
