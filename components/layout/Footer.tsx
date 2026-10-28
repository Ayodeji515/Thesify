import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white"
                aria-hidden="true"
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Thesify</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Research data analysis, made clearer. A managed quantitative analysis service for undergraduate and postgraduate university research across Nigeria.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Strict Academic Integrity Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Quantitative Analysis
                </Link>
              </li>
              <li>
                <Link href="/#integrity" className="hover:text-white transition-colors">
                  Research Integrity
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/projects/new" className="hover:text-white transition-colors">
                  Submit a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Methodologies */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Supported Methods</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Descriptive Statistics & Likert Scales</li>
              <li>Independent & Paired t-Tests</li>
              <li>One-Way ANOVA & Post-Hoc Tests</li>
              <li>Pearson & Spearman Correlation</li>
              <li>Multiple Linear Regression</li>
              <li>Scale Reliability (Cronbach Alpha)</li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Policies & Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-start space-x-2 text-slate-400 pt-2">
                <Mail className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" aria-hidden="true" />
                <a href="mailto:support@thesify.ng" className="hover:text-white transition-colors">
                  support@thesify.ng
                </a>
              </li>
              <li className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" aria-hidden="true" />
                <span>Lagos / Abuja, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Thesify. All rights reserved.
          </p>
          <p>Designed for university research compliance and professional statistical analysis.</p>
        </div>
      </div>
    </footer>
  );
};
