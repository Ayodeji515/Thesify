import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileSpreadsheet,
  CheckCircle2,
  FileText,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Database,
  BarChart3,
  HelpCircle,
  FileCheck2,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FaqJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Thesify — Quantitative Research Data Analysis for Nigerian Students',
  description:
    'A managed quantitative data analysis and validation platform for undergraduate and postgraduate students in Nigeria. Verified hypothesis testing, survey hygiene, and supervisor-ready Chapter Four reporting.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <FaqJsonLd />
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-medium text-slate-300">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Built for Nigerian University Research</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Research data analysis, made clearer.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A managed quantitative analysis platform for undergraduate students. Submit your survey or experimental data, receive rigorous statistical calculations, and obtain a verifiable Chapter Four report audited by human analysts.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/dashboard/projects/new">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border-blue-600 text-white space-x-2">
                  <span>Start a project</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-200 border-slate-700 hover:bg-slate-800">
                  See how it works
                </Button>
              </Link>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deterministic statistical computation</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human analyst review process</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NUC-compliant Chapter Four formats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-700">Workflow</h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">How Thesify Works</p>
            <p className="text-sm text-slate-600">
              A transparent four-step pipeline from raw survey responses to supervisor-ready analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-3">
              <div className="w-8 h-8 rounded bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-base text-slate-900">Project Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your research title, objectives, numbered research questions, hypotheses, and your supervisor specific instructions.
              </p>
            </div>

            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-3">
              <div className="w-8 h-8 rounded bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-base text-slate-900">Dataset Validation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your CSV or Excel dataset. The automated validator identifies missing values, duplicate entries, and variable classifications.
              </p>
            </div>

            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-3">
              <div className="w-8 h-8 rounded bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-base text-slate-900">Statistical Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Python scientific libraries execute the exact parametric or non-parametric tests required by your hypotheses.
              </p>
            </div>

            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-3">
              <div className="w-8 h-8 rounded bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-semibold text-base text-slate-900">Analyst Sign-Off</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A quantitative research analyst audits the outputs, verifies table formatting, and delivers an editable Chapter Four document.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-700">Capabilities</h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">Quantitative Research Services</p>
            <p className="text-sm text-slate-600">
              Targeted analysis tailored to undergraduate requirements in Nigerian faculties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded p-6 space-y-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Data Hygiene & Validation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ensure survey data is clean before analysis. Automatic scans flag missing responses, coding errors in Likert scales, and duplicate survey submissions.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Missing value summary by column</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Duplicate respondent detection</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scale reliability: Cronbach Alpha</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded p-6 space-y-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Hypothesis Testing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Deterministic calculation of test statistics, degrees of freedom, p-values, and decisions for null hypotheses at 0.05 significance levels.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Independent & Paired t-Tests</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>One-Way ANOVA with Post-Hoc</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Regression and Pearson Correlation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded p-6 space-y-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Chapter Four Drafting</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Structured compilation of data presentation tables, demographic profiles, and hypothesis evaluation sections formatted to university guidelines.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Numbered APA style tables</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Traceable interpretation narrative</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exportable to Microsoft Word (.docx)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sample Deliverable Showcase Section */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-400">Sample Deliverable</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">Supervisor-Ready Chapter Four Reporting</p>
            <p className="text-sm text-slate-300">
              Clean, numbered APA 7th edition tables formatted to Nigerian university guidelines with verified statistical calculations and human analyst audit certificates.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
            <Image
              src="/analysis-preview.svg"
              alt="Sample APA-format quantitative analysis table and hypothesis testing summary generated by Thesify"
              width={800}
              height={480}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* 5. Research Integrity Section */}
      <section id="integrity" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>Strict Academic Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Analyst Review and Research Integrity
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thesify does not invent data, generate artificial survey responses, or modify original files to force a desired outcome. Our responsibility is to calculate accurately what your data demonstrates.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-navy-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Immutable Source Datasets</h4>
                    <p className="text-xs text-slate-600">
                      Uploaded files are stored with SHA-256 integrity checksums. Calculations always reference your unedited source file.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-navy-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Human Analyst Verification</h4>
                    <p className="text-xs text-slate-600">
                      Every statistical output is checked by a qualified analyst who ensures test assumptions are satisfied and interpretation text matches the numbers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-navy-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Unbiased Hypothesis Reporting</h4>
                    <p className="text-xs text-slate-600">
                      Non-significant results (where the null hypothesis cannot be rejected) are standard scientific findings and are documented clearly and objectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-8 rounded border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Student Research Agreement</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By submitting a project on Thesify, students confirm that:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Survey or experimental data was collected according to academic ethics guidelines.</li>
                <li>The student retains full intellectual property rights to their research work.</li>
                <li>The analysis report represents a technical calculation of provided data, subject to supervisor review.</li>
              </ul>
              <div className="pt-4 border-t border-slate-800">
                <Link href="/terms" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                  Read full research terms and policies &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-700">Questions</h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>What file formats can I upload for my analysis?</span>
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                We accept CSV (.csv) and Microsoft Excel (.xlsx, .xls) files. Files must contain clearly labeled column headers matching your questionnaire items.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>What if my research design does not have hypotheses?</span>
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Hypotheses are optional. Many descriptive survey projects only require research questions with frequency distributions, percentages, mean scores, and standard deviations.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Can I edit the Chapter Four report after receiving it?</span>
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Yes. Reports can be edited directly inside the platform or exported as Microsoft Word (.docx) files, allowing you to tailor the narrative to your supervisor specific commentary.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>How is my respondent survey data protected?</span>
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Your datasets are stored in encrypted, private cloud storage with strict Row-Level Security. We do not sell or share student research data, and personal respondent identifiers should be removed prior to upload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Footer Banner */}
      <section className="bg-navy-900 text-white py-14 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to analyze your research project?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Set up your project details and research questions to begin dataset validation.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700 border-blue-600 space-x-2">
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
