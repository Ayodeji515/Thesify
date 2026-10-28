import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit New Research Project',
  description:
    'Configure study objectives, enter research questions, formulate hypotheses, and upload survey data for validation and Chapter Four reporting.',
  alternates: {
    canonical: '/dashboard/projects/new',
  },
};

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
