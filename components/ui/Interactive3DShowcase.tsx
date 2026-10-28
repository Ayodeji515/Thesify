'use client';

import React, { useState } from 'react';
import { BookOpen, Layers, CheckCircle2, ShieldCheck, Sparkles, FileText, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { ProjectPlanId } from '@/lib/types';

export const Interactive3DShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectPlanId>('plan_c');
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: -8, y: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -20,
      y: (x / rect.width) * 20,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: -8, y: 12 });
  };

  const planDetails: Record<
    ProjectPlanId,
    { title: string; chapters: string[]; badge: string; color: string; desc: string; price: string }
  > = {
    free: {
      title: 'Topic & Research Outline',
      badge: 'Free Guidance',
      color: '#38bdf8',
      desc: 'Formulate 3 approved research topics, background problem rationale, and questionnaire blueprint.',
      chapters: ['Topic 1: Digital Channel Adoption', 'Topic 2: Financial Performance Metrics', 'Topic 3: Supply Chain Volatility'],
      price: 'Free',
    },
    plan_a: {
      title: 'Proposal & Methodology (Ch 1 – 3)',
      badge: 'Plan A • Chapters 1-3',
      color: '#3b82f6',
      desc: 'Written from scratch: Background, Statement of Problem, Objectives, Literature Review & Research Methodology.',
      chapters: ['Chapter 1: Introduction & Scope', 'Chapter 2: Conceptual & Empirical Review', 'Chapter 3: Research Methodology & Sampling'],
      price: '₦25,000',
    },
    plan_b: {
      title: 'Data Analysis & Findings (Ch 4)',
      badge: 'Plan B • Chapter 4',
      color: '#8b5cf6',
      desc: 'Quantitative computations, survey hygiene, parametric hypotheses testing, APA 7th tables & analyst verification.',
      chapters: ['Data Validation & Screening', 'Demographic APA Tables', 'Hypotheses Decision Summary (p < 0.05)'],
      price: '₦20,000',
    },
    plan_c: {
      title: 'Complete Dissertation (Ch 1 – 5)',
      badge: 'Plan C • Complete Project',
      color: '#10b981',
      desc: 'End-to-end dissertation writing from scratch: Proposal, Full Literature Review, Methodology, Data Analysis & Recommendations.',
      chapters: [
        'Chapter 1: Background & Objectives',
        'Chapter 2: Theoretical & Empirical Review',
        'Chapter 3: Research Methodology & Tool',
        'Chapter 4: Statistical Analysis & APA Tables',
        'Chapter 5: Summary, Conclusions & Recommendations',
      ],
      price: '₦45,000',
    },
  };

  const current = planDetails[activeTab];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Plan Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 z-20 relative">
        {(['free', 'plan_a', 'plan_b', 'plan_c'] as ProjectPlanId[]).map((planId) => {
          const isActive = activeTab === planId;
          const p = planDetails[planId];
          return (
            <button
              key={planId}
              onClick={() => setActiveTab(planId)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-2 border shadow-sm ${
                isActive
                  ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-400 shadow-blue-500/30 scale-105'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span>{p.badge}</span>
              <span className="opacity-75 font-normal">({p.price})</span>
            </button>
          );
        })}
      </div>

      {/* 3D Scene Viewport */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1400px' }}
        className="relative w-full min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      >
        {/* Ambient Glowing Background Orb */}
        <div
          className="absolute w-72 h-72 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: current.color }}
        />

        {/* 3D Rotatable Multi-Layer Card Container */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-7 sm:p-9 rounded-2xl border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-white backdrop-blur-xl"
        >
          {/* 3D Depth Layer 1: Floating Header & Badge */}
          <div
            style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
            className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors duration-500"
                style={{ backgroundColor: current.color }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase opacity-75 text-blue-400">
                  {current.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {current.title}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {current.price}
              </div>
              <span className="text-[11px] text-slate-400">Academic Project Rate</span>
            </div>
          </div>

          {/* 3D Depth Layer 2: Description Box */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-6 backdrop-blur-md"
          >
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* 3D Depth Layer 3: Interactive Chapter Stack */}
          <div
            style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }}
            className="space-y-2.5 mb-6"
          >
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Deliverables Included in this Plan:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {current.chapters.map((chapter, index) => (
                <div
                  key={index}
                  style={{ transform: `translateZ(${20 + index * 8}px)` }}
                  className="flex items-center space-x-2.5 p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 shadow-md hover:border-blue-500/60 transition-all duration-300 group"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: current.color }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    {chapter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Depth Layer 4: Action Footer */}
          <div
            style={{ transform: 'translateZ(65px)' }}
            className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NUC Guidelines & Supervisor Review Guaranteed</span>
            </div>

            <Link href={`/dashboard/projects/new?plan=${activeTab}`}>
              <button
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110 flex items-center justify-center space-x-2 cursor-pointer"
                style={{ backgroundColor: current.color }}
              >
                <span>Select {current.badge}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
        💡 Hover & move your cursor over the 3D showcase card to inspect dimensional chapter depth
      </p>
    </div>
  );
};
