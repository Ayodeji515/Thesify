import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions & Academic Service Agreement',
  description:
    'Academic service terms, intellectual property ownership, and statistical integrity standards governing student quantitative research analysis on Thesify.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={[{ label: 'Terms and Conditions', current: true }]} />

        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs text-slate-500 hover:text-slate-800 mb-3 space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to home</span>
          </Link>
          <div className="flex items-center space-x-2 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Academic Service Agreement</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Terms and Conditions</h1>
          <p className="text-xs text-slate-500 mt-1">Effective date: October 2026</p>
        </div>

        <article className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By creating an account, submitting research metadata, or uploading data to Thesify, you agree to comply with and be bound by these Terms and Conditions. These terms govern the relationship between you (the student researcher) and Thesify regarding the managed data analysis service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Nature of Service</h2>
            <p>
              Thesify provides technical statistical computation, dataset validation, and formatted Chapter Four (Data Presentation and Analysis) draft reporting based on data submitted by students. Thesify does not write theoretical chapters (Chapters One, Two, Three, or Five), does not create simulated data, and does not conduct field survey distribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Student Responsibilities and Data Authenticity</h2>
            <p>Students are strictly responsible for:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                Ensuring that uploaded datasets are authentic, gathered in accordance with departmental guidelines, and free from fabricated entries.
              </li>
              <li>
                Removing direct personally identifiable information (such as respondent names, phone numbers, and street addresses) prior to file upload.
              </li>
              <li>
                Verifying that the chosen statistical methodology meets the approval of their designated university project supervisor.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
            <p>
              The student retains 100% ownership and intellectual property rights in their research topic, objectives, raw datasets, and final dissertation document. Thesify does not claim ownership or co-authorship of student academic work.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">5. Statistical Integrity & Academic Disclaimer</h2>
            <p>
              Calculations are deterministic and objective. Thesify does not guarantee that research hypotheses will achieve statistical significance (p &lt; 0.05). Non-significant results will be reported accurately as the data indicates. Acceptance of the final chapter draft by university project supervisors remains the student responsibility.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">6. Prototype Phase</h2>
            <p>
              The current service operates in development prototype mode. No real monetary transactions or production credit card billing occur during this verification stage.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
