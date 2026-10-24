-- Thesify Database Schema and Row Level Security Migration
-- Version: 20261024000000_init_thesify.sql

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('student', 'analyst', 'admin');

CREATE TYPE project_status AS ENUM (
    'Draft',
    'Submitted',
    'Under review',
    'Analysis in progress',
    'Awaiting student information',
    'Ready for review',
    'Completed'
);

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

-- 2. Create Profiles Table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    institution TEXT NOT NULL,
    faculty TEXT NOT NULL,
    department TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 3. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    assigned_analyst_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    institution TEXT NOT NULL,
    department TEXT NOT NULL,
    field_of_study TEXT,
    target_degree TEXT NOT NULL DEFAULT 'B.Sc / B.A',
    methodology_type TEXT NOT NULL,
    objectives TEXT NOT NULL,
    supervisor_guidelines TEXT,
    data_authenticity_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
    status project_status NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_projects_student ON public.projects(student_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- 4. Create Research Questions Table
CREATE TABLE IF NOT EXISTS public.research_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    order_index INT NOT NULL DEFAULT 1,
    question_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_rq_project ON public.research_questions(project_id);

-- 5. Create Hypotheses Table (optional for descriptive studies)
CREATE TABLE IF NOT EXISTS public.hypotheses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    research_question_id UUID REFERENCES public.research_questions(id) ON DELETE SET NULL,
    code TEXT NOT NULL,
    hypothesis_text TEXT NOT NULL,
    is_null BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_hypo_project ON public.hypotheses(project_id);

-- 6. Create Datasets Table (immutable raw files)
CREATE TABLE IF NOT EXISTS public.datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    sha256_hash TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    total_rows INT,
    total_columns INT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. Create Validation Reports Table
CREATE TABLE IF NOT EXISTS public.validation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
    is_valid BOOLEAN NOT NULL,
    total_rows INT NOT NULL,
    total_columns INT NOT NULL,
    duplicate_rows_count INT NOT NULL DEFAULT 0,
    missing_value_summary JSONB NOT NULL DEFAULT '{}',
    column_type_summary JSONB NOT NULL DEFAULT '{}',
    detected_issues JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 8. Enable Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validation_reports ENABLE ROW LEVEL SECURITY;

-- 9. Row-Level Security Policies
-- Profiles: Users see own, Admins see all
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Projects: Students access only their own projects
CREATE POLICY "Students can view own projects" 
ON public.projects FOR SELECT 
USING (
    student_id = auth.uid() 
    OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('analyst', 'admin')
    )
);

CREATE POLICY "Students can insert own projects in Draft status" 
ON public.projects FOR INSERT 
WITH CHECK (
    student_id = auth.uid() 
    AND status IN ('Draft', 'Submitted')
);

CREATE POLICY "Students can update own projects when Draft or Awaiting student information" 
ON public.projects FOR UPDATE 
USING (
    student_id = auth.uid() 
    AND status IN ('Draft', 'Awaiting student information')
);

-- Research questions and hypotheses inherit access from projects
CREATE POLICY "Questions inherit project access" 
ON public.research_questions FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = research_questions.project_id 
        AND (
            projects.student_id = auth.uid() 
            OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('analyst', 'admin'))
        )
    )
);

CREATE POLICY "Hypotheses inherit project access" 
ON public.hypotheses FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = hypotheses.project_id 
        AND (
            projects.student_id = auth.uid() 
            OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('analyst', 'admin'))
        )
    )
);

-- Datasets and validation reports
CREATE POLICY "Datasets inherit project access" 
ON public.datasets FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = datasets.project_id 
        AND (
            projects.student_id = auth.uid() 
            OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('analyst', 'admin'))
        )
    )
);

-- 10. Automated profile creation trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, institution, faculty, department, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Student User'),
        COALESCE(new.raw_user_meta_data->>'institution', 'Nigerian University'),
        COALESCE(new.raw_user_meta_data->>'faculty', 'Social Sciences / Science'),
        COALESCE(new.raw_user_meta_data->>'department', 'General Studies'),
        'student'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
