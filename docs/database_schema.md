# Thesify Database Schema and Security Specifications

## 1. Overview

Thesify utilizes PostgreSQL managed by Supabase. Row-Level Security (RLS) is enabled on every table to guarantee strict isolation between students, analysts, and system administrators.

---

## 2. User Roles and RBAC Hierarchy

User authentication is handled by `auth.users`. Each user has an associated record in `public.profiles`.

The system defines three distinct roles:
1. `student`:
   - Can create, view, edit, and delete their own research projects in `draft` status.
   - Can upload datasets and view validation reports for their own projects.
   - Can view analysis results and download finalized Chapter Four documents.
   - Cannot view internal analyst review notes or access other students' records.
2. `analyst`:
   - Can view projects assigned to them or unassigned projects in the review queue.
   - Can trigger re-analysis and edit Chapter Four draft text.
   - Can record review comments, validation flags, and approve project deliverables.
   - Cannot modify system settings or delete student accounts.
3. `admin`:
   - Full read/write access across all tables.
   - Can assign projects to analysts, manage user roles, and inspect system audit logs.

---

## 3. Custom Types and Enums

```sql
-- User role enum
CREATE TYPE user_role AS ENUM (
    'student',
    'analyst',
    'admin'
);

-- Project workflow status
CREATE TYPE project_status AS ENUM (
    'draft',
    'submitted',
    'validating',
    'needs_revision',
    'analysis_ready',
    'in_analysis',
    'analyst_review',
    'approved',
    'completed'
);

-- Quantitative analysis types supported in prototype
CREATE TYPE analysis_type AS ENUM (
    'descriptive_frequency',
    'descriptive_mean_sd',
    'cronbach_alpha',
    'independent_t_test',
    'paired_t_test',
    'one_way_anova',
    'pearson_correlation',
    'spearman_correlation',
    'chi_square_independence',
    'simple_linear_regression',
    'multiple_linear_regression'
);

-- Hypothesis decision enum
CREATE TYPE hypothesis_decision AS ENUM (
    'supported',
    'not_supported',
    'inconclusive'
);
```

---

## 4. Table Definitions

### 4.1 Profiles Table (`public.profiles`)
Links directly to `auth.users.id`.
```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    institution TEXT, -- e.g., University of Lagos, Ahmadu Bello University, etc.
    faculty TEXT,
    department TEXT,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.2 Research Projects (`public.projects`)
Stores metadata about the research submission.
```sql
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    assigned_analyst_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    target_degree TEXT NOT NULL DEFAULT 'B.Sc / B.A',
    methodology_type TEXT NOT NULL DEFAULT 'Quantitative Survey',
    supervisor_guidelines TEXT,
    status project_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX idx_projects_student ON public.projects(student_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_analyst ON public.projects(assigned_analyst_id);
```

### 4.3 Research Questions & Hypotheses
Stores the academic components to guarantee every statistical test answers an explicit question.
```sql
CREATE TABLE public.research_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    order_index INT NOT NULL DEFAULT 1,
    question_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE public.hypotheses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    research_question_id UUID REFERENCES public.research_questions(id) ON DELETE SET NULL,
    code TEXT NOT NULL, -- e.g., 'H01', 'HA1'
    hypothesis_text TEXT NOT NULL,
    is_null BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.4 Datasets (`public.datasets`)
Tracks uploaded raw files and their immutability checksums.
```sql
CREATE TABLE public.datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Storage bucket path
    file_size_bytes BIGINT NOT NULL,
    sha256_hash TEXT NOT NULL, -- Verification hash for data integrity
    mime_type TEXT NOT NULL,
    total_rows INT,
    total_columns INT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.5 Validation Reports (`public.validation_reports`)
Output of automated data quality checks.
```sql
CREATE TABLE public.validation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
    is_valid BOOLEAN NOT NULL,
    total_rows INT NOT NULL,
    total_columns INT NOT NULL,
    duplicate_rows_count INT NOT NULL DEFAULT 0,
    missing_value_summary JSONB NOT NULL DEFAULT '{}',
    column_type_summary JSONB NOT NULL DEFAULT '{}',
    detected_issues JSONB NOT NULL DEFAULT '[]', -- List of warnings or blocking errors
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.6 Analysis Runs (`public.analysis_runs`)
Records each executed statistical test and its mathematical parameters.
```sql
CREATE TABLE public.analysis_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE RESTRICT,
    hypothesis_id UUID REFERENCES public.hypotheses(id) ON DELETE SET NULL,
    analysis_type analysis_type NOT NULL,
    parameters JSONB NOT NULL DEFAULT '{}', -- Independent, dependent, group variables
    results_tables JSONB NOT NULL DEFAULT '{}', -- Tabular data for display
    test_statistics JSONB NOT NULL DEFAULT '{}', -- F, t, r, p-value, df, effect size
    interpretation_text TEXT NOT NULL, -- Verifiable, template-driven interpretation
    decision hypothesis_decision,
    executed_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.7 Chapter Four Drafts (`public.chapter_four_drafts`)
Contains the synthesized report with editable sections.
```sql
CREATE TABLE public.chapter_four_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    version INT NOT NULL DEFAULT 1,
    title TEXT NOT NULL DEFAULT 'Chapter Four: Data Presentation and Analysis',
    introduction_text TEXT NOT NULL,
    demographic_analysis_text TEXT NOT NULL,
    research_questions_analysis_text TEXT NOT NULL,
    hypotheses_testing_text TEXT NOT NULL,
    summary_of_findings_text TEXT NOT NULL,
    raw_document_state JSONB NOT NULL DEFAULT '{}', -- Structured block-level state
    last_edited_by UUID REFERENCES public.profiles(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 4.8 Analyst Reviews & Audit Logs
```sql
CREATE TABLE public.analyst_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    analyst_id UUID NOT NULL REFERENCES public.profiles(id),
    status_applied project_status NOT NULL,
    internal_notes TEXT,
    student_feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    metadata JSONB NOT NULL DEFAULT '{}',
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

---

## 5. Row-Level Security (RLS) Policies

All tables have RLS enabled:
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_four_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyst_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
```

### Example Policy Rules:
1. **Profiles**:
   - `SELECT`: Users can view their own profile. Analysts and Admins can view all student profiles.
   - `UPDATE`: Users can update their own profile (name, phone, institution). Only Admins can update roles.
2. **Projects**:
   - `SELECT`: Students can select projects where `student_id = auth.uid()`. Analysts and Admins can select all projects.
   - `INSERT`: Authenticated users can insert projects with `student_id = auth.uid()` and initial status `draft`.
   - `UPDATE`: Students can update only their own projects while status is `draft` or `needs_revision`. Analysts and Admins can update status and review data.
3. **Datasets & Validation Reports**:
   - Students can only view and insert datasets linked to their own projects.
   - Datasets are immutable once inserted (no updates allowed; new version requires new dataset record).
