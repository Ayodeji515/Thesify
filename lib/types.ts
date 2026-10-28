// Thesify Core Types & Plans

export type UserRole = 'student' | 'analyst' | 'admin';

export type ProjectStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under review'
  | 'Analysis in progress'
  | 'Awaiting student information'
  | 'Ready for review'
  | 'Completed';

export type ProjectPlanId = 'free' | 'plan_a' | 'plan_b' | 'plan_c';

export type PaymentStatus = 'free_tier' | 'unpaid' | 'pending_verification' | 'paid';

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface ServicePlan {
  id: ProjectPlanId;
  name: string;
  tagline: string;
  code: string;
  priceNGN: number;
  originalPriceNGN?: number;
  deliveryDays: string;
  chaptersCovered: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: PlanFeature[];
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'free',
    name: 'Free Guidance Plan',
    code: 'FREE',
    tagline: 'Topic Selection & Research Direction',
    priceNGN: 0,
    deliveryDays: 'Instant Access',
    chaptersCovered: 'Topic & Outline Formulation',
    badge: '100% Free Forever',
    isPopular: false,
    description:
      'Perfect for students starting out. Get professional assistance formulating 3 approved research topics, background rationale justifications, and structured questionnaire guidelines.',
    features: [
      { text: '3 Curated University Research Topics', included: true },
      { text: 'Background Justification & Problem Rationale', included: true },
      { text: 'Supervisor Proposal Guidelines & Alignment', included: true },
      { text: 'Preliminary Questionnaire Outline Advice', included: true },
      { text: 'Chapters 1 to 3 Full Writing', included: false },
      { text: 'Statistical Dataset Computation (Chapter 4)', included: false },
      { text: 'APA 7th Chapter 5 & References', included: false },
    ],
  },
  {
    id: 'plan_a',
    name: 'Plan A: Proposal & Foundation',
    code: 'PLAN_A',
    tagline: 'Chapters 1, 2 & 3 from Scratch',
    priceNGN: 25000,
    originalPriceNGN: 35000,
    deliveryDays: '4 – 6 Business Days',
    chaptersCovered: 'Chapters 1, 2 and 3',
    badge: 'Foundation Package',
    isPopular: false,
    description:
      'Complete undergraduate or postgraduate proposal drafting from scratch. Background of study, problem statement, objectives, full empirical & theoretical literature review, and rigorous Chapter 3 methodology.',
    features: [
      { text: 'Chapter 1: Introduction, Problem & Objectives', included: true },
      { text: 'Chapter 2: Conceptual, Theoretical & Empirical Review', included: true },
      { text: 'Chapter 3: Research Design, Population & Sampling', included: true },
      { text: 'Sample Size Calculation (Yamane/Cochran formula)', included: true },
      { text: 'Constructed Survey Questionnaire Tool (Likert scale)', included: true },
      { text: 'APA 7th Referencing & Citation Verification', included: true },
      { text: 'Chapter 4 Statistical Analysis & Calculation', included: false },
      { text: 'Full Chapters 1-5 Final Binding Review', included: false },
    ],
  },
  {
    id: 'plan_b',
    name: 'Plan B: Data Analysis & Findings',
    code: 'PLAN_B',
    tagline: 'Chapter 4 Statistical Analysis',
    priceNGN: 20000,
    originalPriceNGN: 30000,
    deliveryDays: '48 – 72 Hours',
    chaptersCovered: 'Chapter 4 (Presentation & Analysis)',
    badge: 'Most Selected for Analysis',
    isPopular: true,
    description:
      'For students with existing survey responses or field data. Automated data hygiene validation, parametric/non-parametric hypothesis testing, APA formatted tables, and analyst audit sign-off.',
    features: [
      { text: 'Automated CSV/Excel Data Hygiene & Duplicate Cleaning', included: true },
      { text: 'Scale Reliability Test (Cronbach’s Alpha α)', included: true },
      { text: 'Deterministic Hypotheses Testing (t-Test, ANOVA, Regression)', included: true },
      { text: 'APA 7th Formatted Demographic & Frequency Tables', included: true },
      { text: 'Traceable Narrative Interpretation for Supervisor Defense', included: true },
      { text: 'Human Quantitative Analyst Audit Sign-Off', included: true },
      { text: 'Exportable to Microsoft Word (.docx)', included: true },
      { text: 'Chapters 1-3 Proposal Drafting', included: false },
    ],
  },
  {
    id: 'plan_c',
    name: 'Plan C: Complete End-to-End',
    code: 'PLAN_C',
    tagline: 'Full Project (Chapters 1 to 5) from Scratch',
    priceNGN: 45000,
    originalPriceNGN: 65000,
    deliveryDays: '7 – 10 Business Days',
    chaptersCovered: 'Complete Project: Chapters 1, 2, 3, 4 & 5',
    badge: 'Best Value • All Inclusive',
    isPopular: false,
    description:
      'The comprehensive all-in-one package from conception to final dissertation binding. Topic selection, proposal chapters, questionnaire creation, data collection assistance, Chapter 4 statistical analysis, Chapter 5 conclusions & recommendations.',
    features: [
      { text: 'Everything in Plan A (Chapters 1 to 3 from Scratch)', included: true, highlight: true },
      { text: 'Everything in Plan B (Complete Chapter 4 Data Analysis)', included: true, highlight: true },
      { text: 'Chapter 5: Summary, Discussion, Conclusions & Recommendations', included: true },
      { text: 'Preliminary Pages (Abstract, Certification, Dedication, TOC)', included: true },
      { text: 'Complete APA 7th Bibliography & Reference Compilation', included: true },
      { text: 'Plagiarism Audit Certificate (Turnitin < 15%)', included: true },
      { text: 'Supervisor Correction & Revision Support (Unlimited)', included: true },
      { text: 'Defense Presentation Slide Deck Summary (PowerPoint)', included: true },
    ],
  },
];

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
  selectedPlan: ProjectPlanId;
  paymentStatus: PaymentStatus;
  planAmountNGN: number;
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
