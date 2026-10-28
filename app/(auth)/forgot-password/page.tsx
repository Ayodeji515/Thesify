'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/storage';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
          });
          if (resetError) {
            setError(resetError.message);
            setIsLoading(false);
            return;
          }
        }
      }
      setIsSubmitted(true);
    } catch {
      setError('Unable to initiate password reset at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full mb-3">
        <Breadcrumbs
          items={[
            { label: 'Sign In', href: '/login' },
            { label: 'Reset Password', current: true },
          ]}
        />
      </div>
      <div className="max-w-md w-full space-y-6 bg-white p-8 border border-slate-200 rounded shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 bg-navy-900 rounded items-center justify-center text-white">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-xs text-slate-500">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-emerald-800 space-y-3">
            <div className="flex items-center space-x-2 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reset link dispatched</span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-700">
              If an account with <span className="font-semibold">{email}</span> exists, password recovery instructions have been sent. Please inspect your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  Return to sign in
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSupabaseConfigured() && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
                <span className="font-semibold">Authentication Notice:</span> Supabase email service is operating in local demonstration mode. Submitting this form tests the recovery validation flow.
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@institution.edu.ng"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full justify-center"
            >
              Send Password Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center text-xs text-slate-600 hover:text-slate-900 space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
