'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderPlus,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Filter,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Project } from '@/lib/types';
import { getLocalProjects } from '@/lib/storage';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [userName, setUserName] = useState<string>('Student');

  useEffect(() => {
    // Load projects and session info
    const localProjects = getLocalProjects();
    setProjects(localProjects);

    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('thesify_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed.fullName) setUserName(parsed.fullName);
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  const totalProjects = projects.length;
  const inProgressCount = projects.filter(
    (p) => p.status === 'Under review' || p.status === 'Analysis in progress' || p.status === 'Submitted'
  ).length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const actionRequiredCount = projects.filter((p) => p.status === 'Awaiting student information' || p.status === 'Draft').length;

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'active') return p.status !== 'Completed';
    if (filter === 'completed') return p.status === 'Completed';
    return true;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-14rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Student Research Portal
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {userName}
            </h1>
            <p className="text-xs text-slate-500">
              Manage your quantitative research submissions, review data validation reports, and track Chapter Four progress.
            </p>
          </div>
          <div>
            <Link href="/dashboard/projects/new">
              <Button variant="primary" className="space-x-1.5 w-full sm:w-auto">
                <FolderPlus className="w-4 h-4" />
                <span>Create New Project</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
              <span>Total Submissions</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
            <p className="text-[11px] text-slate-500">Research projects on record</p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-blue-700 text-xs font-medium">
              <span>In Analysis / Review</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900">{inProgressCount}</p>
            <p className="text-[11px] text-slate-500">Being audited by analysts</p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-emerald-700 text-xs font-medium">
              <span>Completed Deliverables</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900">{completedCount}</p>
            <p className="text-[11px] text-slate-500">Chapter Four finalized</p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-amber-700 text-xs font-medium">
              <span>Action Needed</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900">{actionRequiredCount}</p>
            <p className="text-[11px] text-slate-500">Drafts or questions pending</p>
          </div>
        </div>

        {/* Project List Section */}
        <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Research Projects</h2>
              <p className="text-xs text-slate-500">
                Track each project from intake through dataset validation and analyst sign-off
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1.5 text-xs bg-slate-100 p-1 rounded border border-slate-200">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === 'all' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === 'active' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === 'completed' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Project List / Empty State */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900">No research projects found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You have not submitted any projects yet. Click the button below to specify your research questions and upload your dataset.
                </p>
              </div>
              <Link href="/dashboard/projects/new">
                <Button variant="primary" size="sm" className="space-x-1.5">
                  <FolderPlus className="w-4 h-4" />
                  <span>Start your first project</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={project.status} />
                      <span className="text-xs text-slate-400">&bull;</span>
                      <span className="text-xs font-medium text-slate-600">{project.institution}</span>
                      <span className="text-xs text-slate-400">&bull;</span>
                      <span className="text-xs text-slate-500">{project.department}</span>
                    </div>

                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="text-base font-semibold text-slate-900 hover:text-blue-700 transition-colors block"
                    >
                      {project.title}
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>Questions: <strong className="text-slate-700">{project.questions?.length || 0}</strong></span>
                      <span>Hypotheses: <strong className="text-slate-700">{project.hypotheses?.length || 0}</strong></span>
                      <span>Method: <span className="text-slate-700">{project.methodologyType}</span></span>
                      <span>Created: {new Date(project.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="space-x-1">
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
