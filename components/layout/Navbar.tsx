'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Guard against null pathname during initial hydration to prevent runtime console errors
  const isAuthPage = Boolean(
    pathname &&
      (pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/forgot-password'))
  );

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded p-1 group"
              aria-label="Thesify Home — Academic Research Data Analysis"
            >
              <div
                className="w-9 h-9 bg-navy-900 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-navy-900 dark:text-white tracking-tight leading-none">Thesify</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-0.5">Academic Project Services</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-7" aria-label="Main Navigation">
              <Link
                href="/pricing"
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plans & Pricing</span>
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#integrity"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                Research Integrity
              </Link>
              <Link
                href="/#faq"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-navy-900 dark:text-slate-200 flex items-center space-x-1.5 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Portal</span>
              </Link>
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="sm" className="space-x-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 border-blue-600 text-white shadow-sm">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu and toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <nav
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3 shadow-lg"
          aria-label="Mobile Navigation"
        >
          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-blue-600 dark:text-blue-400"
          >
            ★ Plans & Pricing (Chapters 1-5)
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white"
          >
            How It Works
          </Link>
          <Link
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/#integrity"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white"
          >
            Research Integrity
          </Link>
          <Link
            href="/#faq"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-navy-900 dark:text-white font-semibold"
          >
            Student Portal
          </Link>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center dark:border-slate-700 dark:text-slate-200">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/projects/new" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white">
                Start a Project
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
