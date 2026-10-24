'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { registerSchema } from '@/lib/validations';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/storage';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    institution: '',
    faculty: '',
    department: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.fullName,
                institution: formData.institution,
                faculty: formData.faculty,
                department: formData.department,
              },
            },
          });
          if (authError) {
            setError(authError.message);
            setIsLoading(false);
            return;
          }
        }
      } else {
        // Prototype demonstration mode
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'thesify_session',
            JSON.stringify({
              email: formData.email,
              fullName: formData.fullName,
              role: 'student',
              institution: formData.institution,
              faculty: formData.faculty,
              department: formData.department,
            })
          );
        }
      }

      router.push('/dashboard');
    } catch {
      setError('An error occurred during account creation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 border border-slate-200 rounded shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 bg-navy-900 rounded items-center justify-center text-white">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create a Student Account</h1>
          <p className="text-xs text-slate-500">
            Submit your research project for quantitative analysis and validation
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Babatunde Adeyemi"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@institution.edu.ng"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password (min 8 chars)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              University / Higher Institution
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. University of Lagos, Obafemi Awolowo University"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Faculty / School
              </label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                placeholder="e.g. Faculty of Social Sciences"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Economics / Mass Comm"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-1">
            By registering, you agree to our{' '}
            <Link href="/terms" className="text-blue-700 hover:underline">
              Terms & Conditions
            </Link>{' '}
            and academic research guidelines.
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full justify-center space-x-1.5"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-800">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
