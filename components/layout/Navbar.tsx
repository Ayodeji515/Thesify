'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, ArrowRight, LayoutDashboard, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password');

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-navy-900 rounded flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-navy-900 tracking-tight leading-none">Thesify</span>
                <span className="text-[11px] text-slate-500 font-medium tracking-normal mt-0.5">Academic Data Services</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center space-x-7">
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#integrity"
                className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
              >
                Research Integrity
              </Link>
              <Link
                href="/#faq"
                className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-navy-900 flex items-center space-x-1.5 hover:text-blue-700 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Student Portal</span>
              </Link>
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="sm" className="space-x-1.5">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-navy-900 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-navy-900"
          >
            How It Works
          </Link>
          <Link
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-navy-900"
          >
            Services
          </Link>
          <Link
            href="/#integrity"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-navy-900"
          >
            Research Integrity
          </Link>
          <Link
            href="/#faq"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-navy-900"
          >
            FAQ
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-navy-900 font-semibold"
          >
            Student Portal
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/projects/new" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
