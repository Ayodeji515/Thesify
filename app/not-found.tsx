import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Home, LayoutDashboard, FolderPlus, ArrowLeft, HelpCircle, Mail, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The requested academic research page or project link could not be located on Thesify.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-16rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <Breadcrumbs items={[{ label: '404 Error', current: true }]} className="mb-2" />

        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 mx-auto">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-semibold rounded-full uppercase tracking-wider">
              Error 404
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              The research page, project dataset, or resource you are looking for does not exist or has been relocated.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full justify-center space-x-2">
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Return to Home</span>
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full justify-center space-x-2">
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                <span>Go to Student Portal</span>
              </Button>
            </Link>
            <Link href="/dashboard/projects/new" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full justify-center space-x-2 text-slate-700 hover:text-navy-900">
                <FolderPlus className="w-4 h-4" aria-hidden="true" />
                <span>Start a Project</span>
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <HelpCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>Frequently Asked Questions</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Read how dataset ingestion, SPSS alternatives, and Chapter Four reporting operate.
              </p>
              <Link href="/#faq" className="inline-block text-xs text-blue-700 hover:underline pt-1 font-medium">
                View FAQ &rarr;
              </Link>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <Mail className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>Research Desk Support</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Need help locating a submitted research submission or dataset?
              </p>
              <a href="mailto:support@thesify.ng" className="inline-block text-xs text-blue-700 hover:underline pt-1 font-medium">
                support@thesify.ng &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
