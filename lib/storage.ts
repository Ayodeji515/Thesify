import { createClient } from '@supabase/supabase-js';
import { Project, UserProfile } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if Supabase is properly configured with non-placeholder values
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl.length > 0 &&
    !supabaseUrl.includes('<your-project') &&
    supabaseAnonKey.length > 0 &&
    !supabaseAnonKey.includes('<your-supabase')
  );
};

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Default seed project for offline/prototype demonstration
export const INITIAL_DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-001-lagos-banking',
    studentId: 'student-demo-001',
    title: 'Impact of Digital Banking Channels on Customer Retention Among Commercial Bank Customers in Lagos State',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    fieldOfStudy: 'Management Sciences',
    targetDegree: 'B.Sc. Banking & Finance',
    methodologyType: 'Descriptive Survey (5-point Likert Scale)',
    objectives: 'To evaluate the relationship between mobile banking reliability and customer retention, and assess the moderating role of transaction security.',
    supervisorGuidelines: 'Use Pearson correlation for bivariate relationships and multiple linear regression for hypothesis testing. Report mean and standard deviation for all Likert survey items.',
    selectedPlan: 'plan_b',
    paymentStatus: 'paid',
    planAmountNGN: 20000,
    dataAuthenticityAcknowledged: true,
    status: 'Submitted',
    createdAt: '2026-10-18T10:14:00Z',
    updatedAt: '2026-10-20T14:30:00Z',
    questions: [
      {
        id: 'rq-1',
        orderIndex: 1,
        questionText: 'What is the effect of mobile banking service reliability on customer retention in commercial banks in Lagos State?',
      },
      {
        id: 'rq-2',
        orderIndex: 2,
        questionText: 'How does transaction security influence customer trust and continued patronage?',
      },
    ],
    hypotheses: [
      {
        id: 'hyp-1',
        code: 'H01',
        hypothesisText: 'There is no significant relationship between mobile banking service reliability and customer retention in commercial banks in Lagos State.',
        isNull: true,
        researchQuestionId: 'rq-1',
      },
      {
        id: 'hyp-2',
        code: 'H02',
        hypothesisText: 'Transaction security has no significant effect on customer trust and patronage.',
        isNull: true,
        researchQuestionId: 'rq-2',
      },
    ],
    dataset: {
      id: 'ds-001',
      fileName: 'commercial_bank_customer_survey_n384.csv',
      fileSizeBytes: 142580,
      uploadedAt: '2026-10-18T10:20:00Z',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      totalRows: 384,
      totalColumns: 24,
      status: 'validated',
    },
  },
];

// Helper to access projects from localStorage when Supabase is not connected
export const getLocalProjects = (): Project[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_PROJECTS;
  const stored = localStorage.getItem('thesify_projects');
  if (!stored) {
    localStorage.setItem('thesify_projects', JSON.stringify(INITIAL_DEMO_PROJECTS));
    return INITIAL_DEMO_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMO_PROJECTS;
  }
};

export const saveLocalProject = (project: Project): void => {
  if (typeof window === 'undefined') return;
  const current = getLocalProjects();
  const existingIdx = current.findIndex((p) => p.id === project.id);
  let updated: Project[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = project;
  } else {
    updated = [project, ...current];
  }
  localStorage.setItem('thesify_projects', JSON.stringify(updated));
};

export const getLocalProjectById = (id: string): Project | undefined => {
  const projects = getLocalProjects();
  return projects.find((p) => p.id === id);
};
