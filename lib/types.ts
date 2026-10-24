// Thesify Core Types

export type UserRole = 'student' | 'analyst' | 'admin';

export type ProjectStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under review'
  | 'Analysis in progress'
  | 'Awaiting student information'
  | 'Ready for review'
  | 'Completed';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  institution: string;
  faculty: string;
  department: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: string;
}

export interface ResearchQuestion {
  id: string;
  orderIndex: number;
  questionText: string;
}

export interface Hypothesis {
  id: string;
  code: string; // e.g. H01, HA1
  hypothesisText: string;
  isNull: boolean;
  researchQuestionId?: string;
}

export interface Project {
  id: string;
  studentId: string;
  title: string;
  institution: string;
  department: string;
  fieldOfStudy?: string;
  targetDegree: string;
  methodologyType: string;
  objectives: string;
  supervisorGuidelines?: string;
  dataAuthenticityAcknowledged: boolean;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  questions: ResearchQuestion[];
  hypotheses: Hypothesis[];
  dataset?: DatasetSummary;
}

export interface DatasetSummary {
  id: string;
  fileName: string;
  fileSizeBytes: number;
  uploadedAt: string;
  sha256Hash: string;
  totalRows?: number;
  totalColumns?: number;
  status: 'pending_validation' | 'validated' | 'has_issues';
}

export interface ValidationSummary {
  isValid: boolean;
  totalRows: number;
  totalColumns: number;
  duplicateRowsCount: number;
  missingValueSummary: Record<string, { count: number; percentage: number }>;
  detectedIssues: Array<{
    type: 'warning' | 'error' | 'info';
    message: string;
    column?: string;
  }>;
}
