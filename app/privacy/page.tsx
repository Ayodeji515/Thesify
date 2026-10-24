import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-xs text-slate-500 hover:text-slate-800 mb-4 space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
          <div className="flex items-center space-x-2 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Effective date: October 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When using Thesify, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Account Information:</strong> Full name, university or institution, faculty, academic department, and email address.</li>
              <li><strong>Project Metadata:</strong> Research title, objectives, questions, hypotheses, and supervisor instructions.</li>
              <li><strong>Research Datasets:</strong> Numerical survey data or experimental recordings uploaded for validation and statistical processing.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How Data Is Used</h2>
            <p>
              Your research data is used exclusively to perform requested statistical calculations, generate validation reports, and draft Chapter Four outputs. We do not sell, trade, or share student research datasets with commercial third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Storage & Row-Level Security</h2>
            <p>
              Uploaded datasets are stored in private cloud storage protected by PostgreSQL Row-Level Security (RLS). Access is restricted to the student who created the project, assigned human analysts for audit purposes, and administrative staff. Public access to uploaded files is permanently disabled.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Respondent Anonymity Notice</h2>
            <p>
              In accordance with academic research ethics, students should ensure respondent privacy by stripping direct personal identifiers (e.g., student matriculation numbers, respondent full names, phone numbers) from spreadsheets prior to uploading.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
            <p>
              For inquiries regarding data retention or account deletion, contact our privacy officer at <span className="text-blue-700 font-medium">privacy@thesify.ng</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
