import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Academic Research Plans',
  description:
    'Choose your academic research plan: Free Topic Guidance, Plan A (Chapters 1-3 Proposal), Plan B (Chapter 4 Statistical Analysis), or Plan C (Full Project Chapters 1-5 from Scratch).',
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
