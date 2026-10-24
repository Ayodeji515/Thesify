'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { loginSchema } from '@/lib/validations';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/storage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate using Zod schema
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) {
            setError(authError.message);
            setIsLoading(false);
            return;
          }
        }
      } else {
        // Prototype demonstration mode
        // Store current user session in local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'thesify_session',
            JSON.stringify({
              email,
              fullName: email.split('@')[0].replace('.', ' '),
              role: 'student',
              institution: 'University of Lagos',
              faculty: 'Social Sciences',
              department: 'Economics',
            })
          );
        }
      }

      router.push('/dashboard');
    } catch {
      setError('An unexpected error occurred during sign-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 border border-slate-200 rounded shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 bg-navy-900 rounded items-center justify-center text-white">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to Thesify</h1>
          <p className="text-xs text-slate-500">
            Access your research projects and analysis progress
          </p>
        </div>

        {!isSupabaseConfigured() && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
            <span className="font-semibold">Local Prototype Mode:</span> Supabase is not yet configured in <code className="bg-blue-100 px-1 py-0.5 rounded">.env.local</code>. You can sign in with any valid email to test the workflow.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@unilag.edu.ng"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-700 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full justify-center space-x-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
          Do not have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
