import React from 'react';
import { ProjectStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<ProjectStatus, string> = {
    'Draft': 'bg-slate-100 text-slate-700 border-slate-300',
    'Submitted': 'bg-blue-50 text-blue-800 border-blue-200',
    'Under review': 'bg-amber-50 text-amber-800 border-amber-300',
    'Analysis in progress': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'Awaiting student information': 'bg-rose-50 text-rose-800 border-rose-300',
    'Ready for review': 'bg-teal-50 text-teal-800 border-teal-200',
    'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-300',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center rounded border ${styles[status] || 'bg-slate-100 text-slate-700 border-slate-300'} ${sizeStyles[size]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75"></span>
      {status}
    </span>
  );
};
