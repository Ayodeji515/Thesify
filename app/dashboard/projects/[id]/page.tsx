'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  BarChart2,
  ShieldCheck,
  Info,
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Project, ProjectStatus } from '@/lib/types';
import { getLocalProjectById, saveLocalProject } from '@/lib/storage';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const p = getLocalProjectById(id);
      if (p) {
        setProject(p);
      }
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (!validExtensions.includes(fileExt)) {
        setErrorMessage('Please upload a valid .csv, .xlsx, or .xls spreadsheet.');
        setSelectedFile(null);
        return;
      }

      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds the 25MB limit.');
        setSelectedFile(null);
        return;
      }

      setErrorMessage(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !project) return;

    setIsUploading(true);
    setErrorMessage(null);

    // Simulate dataset validation and state transition
    setTimeout(() => {
      const updatedProject: Project = {
        ...project,
        status: 'Submitted',
        dataset: {
          id: `ds-${Date.now()}`,
          fileName: selectedFile.name,
          fileSizeBytes: selectedFile.size,
          uploadedAt: new Date().toISOString(),
          sha256Hash: 'a71b269e8b7c3905e3b8a1c9371078435d883b27b102919837192837482910ab',
          totalRows: 250,
          totalColumns: 18,
          status: 'validated',
        },
        updatedAt: new Date().toISOString(),
      };

      saveLocalProject(updatedProject);
      setProject(updatedProject);
      setIsUploading(false);
      setUploadSuccess(true);
      setSelectedFile(null);
    }, 1200);
  };

  if (!project) {
    return (
      <div className="py-16 text-center space-y-4 bg-slate-50 min-h-[calc(100vh-14rem)]">
        <p className="text-sm text-slate-500">Project record not found.</p>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const workflowSteps: Array<{ label: ProjectStatus; desc: string }> = [
    { label: 'Draft', desc: 'Project metadata entered' },
    { label: 'Submitted', desc: 'Dataset uploaded for checks' },
    { label: 'Under review', desc: 'Analyst inspecting parameters' },
    { label: 'Analysis in progress', desc: 'Statistical computation executing' },
    { label: 'Ready for review', desc: 'Chapter Four draft compiled' },
    { label: 'Completed', desc: 'Final deliverables approved' },
  ];

  const currentStepIndex = workflowSteps.findIndex((s) => s.label === project.status);

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-[calc(100vh-14rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Student Portal', href: '/dashboard' },
            { label: project.title, current: true },
          ]}
        />

        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs text-slate-500 hover:text-slate-800 space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Current Status:</span>
            <StatusBadge status={project.status} size="md" />
          </div>
        </div>

        {/* Project Header Banner */}
        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{project.institution}</span>
            <span>&bull;</span>
            <span>{project.department}</span>
            <span>&bull;</span>
            <span>{project.targetDegree}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {project.title}
          </h1>

          <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created {new Date(project.createdAt).toLocaleDateString('en-GB')}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
              <span>Methodology: {project.methodologyType}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Authenticity Acknowledged</span>
            </span>
          </div>
        </div>

        {/* Workflow Progress Tracker */}
        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Analysis Workflow & Review Pipeline
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2">
            {workflowSteps.map((step, idx) => {
              const isPast = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;

              return (
                <div
                  key={step.label}
                  className={`p-3 rounded border text-center space-y-1 ${
                    isCurrent
                      ? 'border-blue-600 bg-blue-50/50'
                      : isPast
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-slate-200 bg-slate-50/50 opacity-60'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Step {idx + 1}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-blue-900' : isPast ? 'text-emerald-900' : 'text-slate-700'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Grid: Details & Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Research Specification (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Objectives */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Research Objectives
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {project.objectives}
              </p>
            </div>

            {/* Research Questions */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Research Questions ({project.questions?.length || 0})
              </h3>
              <div className="space-y-2">
                {project.questions?.map((q, idx) => (
                  <div key={q.id || idx} className="text-xs text-slate-800 flex items-start space-x-2">
                    <span className="font-semibold text-blue-700 shrink-0">RQ{idx + 1}:</span>
                    <span>{q.questionText}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hypotheses */}
            {project.hypotheses && project.hypotheses.length > 0 && (
              <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Research Hypotheses ({project.hypotheses.length})
                </h3>
                <div className="space-y-2">
                  {project.hypotheses.map((h, idx) => (
                    <div key={h.id || idx} className="text-xs text-slate-800 flex items-start space-x-2">
                      <span className="font-bold text-navy-900 px-1.5 py-0.5 bg-slate-100 rounded text-[11px] shrink-0">
                        {h.code}
                      </span>
                      <span>{h.hypothesisText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supervisor Guidance */}
            {project.supervisorGuidelines && (
              <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Supervisor Instructions
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {project.supervisorGuidelines}
                </p>
              </div>
            )}
          </div>

          {/* Right: Dataset & Deliverables Section (1 Col) */}
          <div className="space-y-6">
            {/* Dataset Upload Card */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <UploadCloud className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Research Dataset</h3>
              </div>

              {project.dataset ? (
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-emerald-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Dataset Uploaded & Verified</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-mono break-all pt-1">
                      {project.dataset.fileName}
                    </p>
                    <div className="pt-1 text-[11px] text-slate-600 flex justify-between">
                      <span>Rows: {project.dataset.totalRows || '250'}</span>
                      <span>Cols: {project.dataset.totalColumns || '18'}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p className="font-semibold text-slate-700">Integrity Hash (SHA-256):</p>
                    <p className="font-mono text-[10px] break-all bg-slate-50 p-1.5 rounded border border-slate-200">
                      {project.dataset.sha256Hash}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      The original source dataset is protected in private cloud storage and cannot be altered.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upload your survey responses or experimental data in CSV or Excel format (max 25MB).
                  </p>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 text-xs text-red-700 flex items-start space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-xs text-emerald-700 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dataset uploaded successfully.</span>
                    </div>
                  )}

                  <div className="border-2 border-dashed border-slate-300 rounded p-4 text-center hover:border-slate-400 transition-colors">
                    <input
                      type="file"
                      id="dataset-upload"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="dataset-upload" className="cursor-pointer space-y-2 block">
                      <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-xs text-slate-700">
                        {selectedFile ? (
                          <span className="font-semibold text-blue-700">{selectedFile.name}</span>
                        ) : (
                          <span>Choose a CSV or Excel file</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">.csv, .xlsx up to 25MB</p>
                    </label>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    disabled={!selectedFile || isUploading}
                    isLoading={isUploading}
                    onClick={handleUpload}
                  >
                    Validate & Submit Dataset
                  </Button>
                </div>
              )}
            </div>

            {/* Analysis & Chapter Four Deliverables Card */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <BarChart2 className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900">Analysis & Chapter Four Deliverables</h3>
              </div>

              {project.status === 'Completed' ? (
                <div className="space-y-3 text-xs">
                  <p className="text-emerald-700 font-semibold">Your Chapter Four report is ready for download.</p>
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    Download Chapter Four (.docx)
                  </Button>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Awaiting Analyst Computation & Approval</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Statistical calculations and Chapter Four draft documents will be published here once data validation is completed and approved by the assigned research analyst.
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    Per research integrity protocols, results are never fabricated or generated prior to statistical execution.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
