'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  CreditCard,
  Lock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SERVICE_PLANS, ProjectPlanId } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ThreeDCard } from '@/components/ui/ThreeDCard';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'standard' | 'milestone'>('standard');

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: 'Plans & Pricing', current: true }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Undergraduate & Postgraduate Project Plans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clear, Transparent Academic Service Plans
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Choose exactly what you need: from free project topic selection, to proposal writing (Chapters 1–3), specialized quantitative data analysis (Chapter 4), or complete end-to-end dissertation writing from scratch.
          </p>

          {/* Guarantee Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>NUC Guidelines Compliant</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-blue-500 shrink-0" />
              <span>100% Confidential Data</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Secure Paystack & Card Ready</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {SERVICE_PLANS.map((plan) => {
            const isFree = plan.priceNGN === 0;

            return (
              <ThreeDCard
                key={plan.id}
                depth={12}
                glowColor={
                  plan.isPopular
                    ? 'rgba(139, 92, 246, 0.3)'
                    : plan.id === 'plan_c'
                    ? 'rgba(16, 185, 129, 0.3)'
                    : isFree
                    ? 'rgba(56, 189, 248, 0.3)'
                    : 'rgba(59, 130, 246, 0.3)'
                }
                className={`flex flex-col h-full border ${
                  plan.isPopular
                    ? 'border-purple-500 dark:border-purple-500 ring-2 ring-purple-500/20'
                    : plan.id === 'plan_c'
                    ? 'border-emerald-500 dark:border-emerald-500'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  {/* Top Badge & Code */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-semibold">
                        {plan.code}
                      </span>
                      {plan.badge && (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            plan.isPopular
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
                              : plan.id === 'plan_c'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                              : isFree
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {plan.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {isFree ? 'Free' : `₦${plan.priceNGN.toLocaleString()}`}
                      </span>
                      {!isFree && plan.originalPriceNGN && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                          ₦{plan.originalPriceNGN.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      Delivery: {plan.deliveryDays}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 flex-1">
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          {feature.included ? (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                feature.highlight
                                  ? 'text-emerald-500 font-bold'
                                  : 'text-blue-600 dark:text-blue-400'
                              }`}
                            />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feature.included
                                ? feature.highlight
                                  ? 'font-bold text-slate-900 dark:text-white'
                                  : 'text-slate-700 dark:text-slate-200'
                                : 'text-slate-400 dark:text-slate-500 line-through'
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Link href={`/dashboard/projects/new?plan=${plan.id}`}>
                      <Button
                        variant={plan.isPopular ? 'primary' : plan.id === 'plan_c' ? 'primary' : 'outline'}
                        className={`w-full justify-center space-x-1.5 ${
                          plan.isPopular
                            ? 'bg-purple-600 hover:bg-purple-700 border-purple-600 text-white'
                            : plan.id === 'plan_c'
                            ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white'
                            : ''
                        }`}
                      >
                        <span>{isFree ? 'Get Free Guidance' : `Select ${plan.name.split(':')[0]}`}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Full Plan Deliverables Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verify which chapters and technical analyses are included with each tier
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 font-semibold">Service Deliverable</th>
                  <th className="py-3 px-4 font-semibold text-center">Free Plan</th>
                  <th className="py-3 px-4 font-semibold text-center">Plan A (Ch 1-3)</th>
                  <th className="py-3 px-4 font-semibold text-center">Plan B (Ch 4 Data)</th>
                  <th className="py-3 px-4 font-semibold text-center text-emerald-600 dark:text-emerald-400">
                    Plan C (Full Project)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
                <tr>
                  <td className="py-3 px-4 font-medium">Topic Formulation & Supervisor Rationale</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chapter 1 (Introduction, Objectives, Hypotheses)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chapter 2 (Theoretical & Empirical Literature)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chapter 3 (Methodology & Sample Size Formula)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Constructed Questionnaire Item Tool</td>
                  <td className="py-3 px-4 text-center text-slate-500">Outline Only</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chapter 4 (Statistical Computation & Testing)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">APA 7th Formatted Demographic Tables</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chapter 5 (Summary, Recommendations, Conclusions)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Plagiarism Check Report (Turnitin &lt; 15%)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Supervisor Corrections & Revisions</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-500">1 Round</td>
                  <td className="py-3 px-4 text-center text-slate-500">1 Round</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment & Security Assurance */}
        <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-indigo-950 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-300 bg-blue-900/60 px-2.5 py-1 rounded">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Gateway Bridge</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready for Seamless Card & Bank Transfer Payments
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Thesify supports automated checkout through Paystack and Flutterwave, debit cards (Mastercard, Visa, Verve), USSD, and bank transfers with instant student receipt generation.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/dashboard/projects/new">
              <Button variant="primary" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-blue-500 space-x-2">
                <span>Start Your Project Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
