# Thesify Architecture Specification

## 1. Executive Summary

Thesify is a managed quantitative research analysis platform designed for Nigerian university undergraduate and postgraduate students. It bridges the gap between raw student survey/experimental datasets and rigorous, institution-compliant Chapter Four (Data Presentation and Analysis) reports.

The platform provides:
1. Structured research project intake (research questions, hypotheses, methodology, and supervisor directives).
2. Deterministic, verifiable data validation and statistical computation (using Python's scientific stack).
3. Traceable interpretation generation where every numerical statement points directly to the statistical output that generated it.
4. A human-in-the-loop analyst review and approval workflow before any deliverable is finalized.

---

## 2. High-Level System Architecture

The system is organized into three decoupled subsystems:

1. **Frontend and Orchestration Layer (Next.js Web Application)**
   - Framework: Next.js 15+ (App Router), TypeScript, Tailwind CSS.
   - Purpose: Student portal, intake wizard, dataset upload interface, report editor, analyst workspace, and admin dashboard.
   - Execution: Server Actions and Next.js Route Handlers for server-side logic; React Client Components for interactive tables and document editing.

2. **Backend Services & Persistence (Supabase)**
   - Database: Managed PostgreSQL 15+ with Row-Level Security (RLS) on all tables.
   - Authentication: Supabase Auth (JWT-based email/password sessions with secure HTTP-only cookies).
   - Object Storage: Supabase Storage (private buckets for raw dataset uploads and generated export artifacts).

3. **Quantitative Analysis Engine (Python FastAPI Microservice)**
   - Runtime: Python 3.11+ with FastAPI, pandas, NumPy, SciPy, and statsmodels.
   - Purpose: Dataset hygiene checks, descriptive statistics, parametric and non-parametric hypothesis testing, regression modeling, reliability analysis (Cronbach's alpha), and structured JSON output generation.
   - Execution: Stateless HTTP service invoked by Next.js server actions using a shared internal secret key (HMAC / Bearer Token).

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT BROWSERS                                   |
|   (Students, University Analysts, Administrative Staff)                           |
+-----------------------------------------------------------------------------------+
                                         |
                                  HTTPS (TLS 1.3)
                                         v
+-----------------------------------------------------------------------------------+
|                        NEXT.JS WEB APPLICATION (Vercel / Node)                    |
|                                                                                   |
|  - App Router (Public Landing, Legal, Student Portal, Analyst Desk, Admin)        |
|  - Server Actions & Route Handlers (Orchestration, Access Checks)                 |
|  - Client Components (Lucide Icons, Standard Rounded Buttons, Clean Academic UI)  |
+--------------------+------------------------------------------+-------------------+
                     |                                          |
        JWT Auth & PostgREST / RPC                        Internal Token / HMAC
                     |                                          |
                     v                                          v
+------------------------------------+    +-----------------------------------------+
|        SUPABASE PLATFORM           |    |     PYTHON ANALYSIS ENGINE (FastAPI)    |
|                                    |    |                                         |
|  - PostgreSQL with RLS             |    |  - Dataset Validator (Missing, Types)   |
|  - Supabase Auth (RBAC Roles)      |    |  - Descriptive Stats (Mean, SD, Freq)   |
|  - Private Storage Buckets:        |    |  - Hypothesis Testing (t-test, ANOVA)   |
|      * datasets-raw (immutable)    |    |  - Correlation & Regression Analysis    |
|      * reports-generated           |    |  - Reliability (Cronbach's Alpha)       |
+------------------------------------+    |  - Audit Trace Engine                   |
                                          +-----------------------------------------+
```

---

## 3. Component Communication Workflow

### 3.1 Dataset Upload and Validation Flow
1. **Intake Step**: The student fills in project metadata (title, objectives, research questions, hypotheses, methodology).
2. **Presigned Upload**: Next.js requests a signed upload URL from Supabase Storage for the private bucket `datasets-raw`.
3. **Upload**: The client uploads the CSV or Excel file directly to Supabase Storage using the signed URL.
4. **Validation Trigger**: Next.js triggers the internal `/api/v1/validate` endpoint on the Python FastAPI service, passing the file storage reference and expected schema metadata.
5. **Validation Processing**:
   - The Python service retrieves the file directly from Supabase Storage using the service client.
   - It validates file format, parses headers, calculates missing-value counts, checks for duplicate rows, evaluates data types, and flags potential outliers.
6. **Report Storage**: The validation summary is stored in PostgreSQL (`validation_reports` table) and returned to the student with clear warnings or errors.

### 3.2 Quantitative Analysis and Execution Flow
1. **Analysis Configuration**: The student or analyst maps research variables to survey columns and selects the appropriate statistical test (e.g., Independent Samples t-test, One-Way ANOVA, Pearson Correlation, Multiple Linear Regression, Chi-Square Test of Independence).
2. **Analysis Trigger**: Next.js invokes the `/api/v1/analyze` endpoint on the Python service.
3. **Deterministic Calculation**:
   - The analysis service loads the original, immutable dataset.
   - It computes the test statistics, degrees of freedom, p-values, effect sizes, and confidence intervals.
   - It generates structured JSON results including raw summary tables, test outputs, and rule-based academic interpretation text templates.
4. **Persistence & Audit Trail**: Next.js stores the output in `analysis_runs` with a complete snapshot of the parameters used, ensuring zero chance of unrecorded modifications.

### 3.3 Chapter Four Draft Generation Flow
1. **Template Assembly**: Next.js pulls the project's research questions, statistical findings, and demographic summaries.
2. **Report Drafting**: The system compiles a structured Chapter Four layout conforming to standard Nigerian university research formats:
   - Section 4.1: Demographic and Background Information.
   - Section 4.2: Presentation of Data According to Research Questions.
   - Section 4.3: Testing of Hypotheses.
   - Section 4.4: Summary of Findings.
3. **Analyst Review**: The draft enters the `analyst_review` state. An analyst verifies calculations, adjusts narrative explanations, adds supervisor-specific notes, and signs off.
4. **Student Delivery**: Once approved, the student views and downloads the verified Chapter Four document in DOCX and PDF formats.

---

## 4. Design and UI Principles

To maintain strict academic authority and professional credibility:
- **No AI Aesthetic Tropes**: Avoid purple gradients, glassmorphism excess, vague hero headlines, fake testimonial carousels, or pill-shaped buttons.
- **Academic Palette**: Deep navy blue (`#0f2027` / `#1e3a8a`), slate gray (`#475569`), crisp white (`#ffffff`), and subdued forest green accents for status indicators (`#166534`).
- **Typography**: Clean, readable sans-serif (Inter / Plus Jakarta Sans) paired with a traditional serif for report previews (Merriweather / Source Serif Pro).
- **Icons**: Lucide React SVG icons only. No emoji icons in buttons, labels, or navigation.
- **Copywriting**: Direct, factual, and institutionally grounded. All references respect Nigerian university guidelines (NUC standards, departmental formatting conventions).
