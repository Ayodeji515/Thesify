import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Project Analysis & Validation',
  description:
    'Detailed quantitative data validation audit, hypothesis calculation decisions, and Chapter Four draft reporting on Thesify.',
};

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
