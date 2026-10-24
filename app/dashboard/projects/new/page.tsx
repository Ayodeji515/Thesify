'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Project, ResearchQuestion, Hypothesis } from '@/lib/types';
import { saveLocalProject } from '@/lib/storage';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('University of Lagos');
  const [department, setDepartment] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [targetDegree, setTargetDegree] = useState('B.Sc');
  const [methodologyType, setMethodologyType] = useState('Quantitative Survey (Likert Scale)');
  const [objectives, setObjectives] = useState('');
  const [supervisorGuidelines, setSupervisorGuidelines] = useState('');
  const [dataAuthenticityAcknowledged, setDataAuthenticityAcknowledged] = useState(false);

  // Research Questions (dynamic list)
  const [questions, setQuestions] = useState<Array<{ id: string; text: string }>>([
    { id: '1', text: '' },
  ]);

  // Hypotheses (optional dynamic list)
  const [includeHypotheses, setIncludeHypotheses] = useState(true);
  const [hypotheses, setHypotheses] = useState<Array<{ id: string; code: string; text: string; isNull: boolean }>>([
    { id: '1', code: 'H01', text: '', isNull: true },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: String(prev.length + 1), text: '' },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateQuestion = (index: number, val: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index].text = val;
      return copy;
    });
  };

  const addHypothesis = () => {
    const nextCode = `H0${hypotheses.length + 1}`;
    setHypotheses((prev) => [
      ...prev,
      { id: String(prev.length + 1), code: nextCode, text: '', isNull: true },
    ]);
  };

  const removeHypothesis = (index: number) => {
    setHypotheses((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateHypothesis = (index: number, field: 'code' | 'text' | 'isNull', val: any) => {
    setHypotheses((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!title.trim() || title.trim().length < 10) {
      setError('Please provide a descriptive research project title (at least 10 characters).');
      return;
    }
    if (!department.trim()) {
      setError('Academic department is required.');
      return;
    }
    if (!objectives.trim() || objectives.trim().length < 15) {
      setError('Please outline your core research objectives.');
      return;
    }
    const emptyQuestions = questions.filter((q) => !q.text.trim());
    if (emptyQuestions.length > 0) {
      setError('Please complete all added research questions or remove empty ones.');
      return;
    }
    if (includeHypotheses) {
      const emptyHypo = hypotheses.filter((h) => !h.text.trim());
      if (emptyHypo.length > 0) {
        setError('Please complete all added hypothesis statements or disable hypotheses if your design is purely descriptive.');
        return;
      }
    }
    if (!dataAuthenticityAcknowledged) {
      setError('You must confirm the research data authenticity acknowledgement before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const projectId = `proj-${Date.now()}`;
      const newProject: Project = {
        id: projectId,
        studentId: 'student-current',
        title: title.trim(),
        institution: institution.trim(),
        department: department.trim(),
        fieldOfStudy: fieldOfStudy.trim() || 'General Science / Social Science',
        targetDegree,
        methodologyType,
        objectives: objectives.trim(),
        supervisorGuidelines: supervisorGuidelines.trim(),
        dataAuthenticityAcknowledged,
        status: 'Draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        questions: questions.map((q, idx) => ({
          id: `rq-${idx + 1}`,
          orderIndex: idx + 1,
          questionText: q.text.trim(),
        })),
        hypotheses: includeHypotheses
          ? hypotheses.map((h, idx) => ({
              id: `hyp-${idx + 1}`,
              code: h.code.trim(),
              hypothesisText: h.text.trim(),
              isNull: h.isNull,
            }))
          : [],
      };

      saveLocalProject(newProject);
      router.push(`/dashboard/projects/${projectId}`);
    } catch {
      setError('Failed to save project. Please verify inputs.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-14rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs text-slate-500 hover:text-slate-800 mb-3 space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to projects</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Create New Research Project</h1>
          <p className="text-xs text-slate-500">
            Provide the academic parameters and hypotheses for your quantitative data analysis.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-xs text-red-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Institutional & Topic Details */}
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Project Overview & Institutional Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Approved Project Title <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Assessment of Inventory Management Practices on Financial Performance of Manufacturing Firms in Ogun State"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Higher Institution / University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Accounting / Business Administration"
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Degree
                </label>
                <select
                  value={targetDegree}
                  onChange={(e) => setTargetDegree(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                >
                  <option value="B.Sc / B.A (Undergraduate)">B.Sc / B.A (Undergraduate)</option>
                  <option value="HND (Polytechnic)">HND (Polytechnic)</option>
                  <option value="Postgraduate Diploma (PGD)">Postgraduate Diploma (PGD)</option>
                  <option value="M.Sc / MBA (Masters)">M.Sc / MBA (Masters)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Research Methodology Type
                </label>
                <select
                  value={methodologyType}
                  onChange={(e) => setMethodologyType(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                >
                  <option value="Quantitative Survey (Likert Scale)">Quantitative Survey (Likert Scale)</option>
                  <option value="Experimental / Pre-test Post-test">Experimental / Pre-test Post-test</option>
                  <option value="Secondary Time Series / Financial Ratio Data">Secondary Time Series / Financial Ratio Data</option>
                  <option value="Cross-Sectional Observational">Cross-Sectional Observational</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Core Research Objectives <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="State the specific aims of this study (e.g., 1. To examine the effect of JIT inventory on return on assets...)"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                required
              />
            </div>
          </div>

          {/* Section 2: Research Questions */}
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">2. Research Questions</h2>
                <p className="text-xs text-slate-500">Each question will have corresponding statistical frequency or mean tables</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </Button>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-start space-x-2">
                  <span className="text-xs font-semibold text-slate-500 pt-2.5 w-6">
                    {idx + 1}.
                  </span>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) => updateQuestion(idx, e.target.value)}
                      placeholder={`Research Question ${idx + 1} (e.g. To what extent does inventory turnover influence profitability?)`}
                      className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                      required
                    />
                  </div>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(idx)}
                      className="text-slate-400 hover:text-red-600 p-2 focus:outline-none"
                      title="Remove question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Research Hypotheses (Optional) */}
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">3. Research Hypotheses (Optional)</h2>
                <p className="text-xs text-slate-500">
                  Descriptive studies may omit hypotheses. Analytical studies test null hypotheses ($H_0$).
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <label className="inline-flex items-center text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHypotheses}
                    onChange={(e) => setIncludeHypotheses(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-1.5"
                  />
                  <span>Include hypotheses</span>
                </label>
                {includeHypotheses && (
                  <Button type="button" variant="outline" size="sm" onClick={addHypothesis} className="space-x-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Hypothesis</span>
                  </Button>
                )}
              </div>
            </div>

            {includeHypotheses ? (
              <div className="space-y-3">
                {hypotheses.map((h, idx) => (
                  <div key={h.id} className="flex items-start space-x-2">
                    <input
                      type="text"
                      value={h.code}
                      onChange={(e) => updateHypothesis(idx, 'code', e.target.value)}
                      className="w-16 text-xs font-semibold px-2 py-2 border border-slate-300 rounded text-center bg-slate-50 focus:outline-none"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={h.text}
                        onChange={(e) => updateHypothesis(idx, 'text', e.target.value)}
                        placeholder={`Null Hypothesis statement (e.g. There is no significant relationship between inventory management and profitability.)`}
                        className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                      />
                    </div>
                    {hypotheses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHypothesis(idx)}
                        className="text-slate-400 hover:text-red-600 p-2 focus:outline-none"
                        title="Remove hypothesis"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded text-xs text-slate-600 border border-slate-200">
                Hypotheses testing disabled for this project. The analysis will focus strictly on descriptive statistics, frequency tables, and item mean scores.
              </div>
            )}
          </div>

          {/* Section 4: Supervisor Guidelines & Responsibility Checkbox */}
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Supervisor Guidelines & Academic Responsibility
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supervisor Instructions or Preferred Tests (Optional)
              </label>
              <textarea
                rows={2}
                value={supervisorGuidelines}
                onChange={(e) => setSupervisorGuidelines(e.target.value)}
                placeholder="e.g. Supervisor prefers Pearson correlation over Spearman; wants a 4-point benchmark criterion mean of 2.50."
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataAuthenticityAcknowledged}
                  onChange={(e) => setDataAuthenticityAcknowledged(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                  required
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  <strong>Academic Research Acknowledgement:</strong> I confirm that I am responsible for the authenticity and accuracy of all survey or experimental research data submitted for this project. I understand that Thesify performs calculations objectively and does not fabricate data or alter findings to force statistical significance.
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Project & Proceed to Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
