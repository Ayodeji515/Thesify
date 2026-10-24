# Thesify Milestone-by-Milestone Implementation Plan

This implementation plan enforces single-milestone execution. Each milestone must pass its automated test suites, linting, and development verifications before subsequent work begins.

---

## Milestone 1: Quantitative Analysis Engine Core & Benchmark Testing
**Goal**: Build the independent, verifiable mathematical core in Python with complete test coverage against published statistical benchmarks.
- **Tasks**:
  1. Initialize `services/analysis-engine` with Python 3.11, virtual environment, and pinned requirements (`fastapi`, `uvicorn`, `pandas`, `numpy`, `scipy`, `statsmodels`).
  2. Implement `validator.py`: CSV/Excel reader (`openpyxl`), missing value detection, duplicate detection, column type classification (numeric, categorical, scale), and outlier flags.
  3. Implement `statistics.py`:
     - Descriptive statistics (mean, median, standard deviation, skewness, frequency distribution).
     - Scale reliability (Cronbach's alpha).
     - Independent two-sample t-test and paired t-test with Levene's test for equality of variances.
     - One-way ANOVA with post-hoc Tukey HSD.
     - Pearson and Spearman rank correlation with significance levels.
     - Multiple linear regression with R-squared, F-statistic, t-statistics, p-values, and collinearity diagnostics (VIF).
     - Chi-square test of independence.
  4. Implement `interpretations.py`: Deterministic academic phrasing engine mapping test results directly into standard university research language.
  5. Implement FastAPI router (`/validate`, `/analyze/descriptive`, `/analyze/hypothesis`, `/analyze/reliability`) with Bearer token authentication.
  6. Unit and benchmark test suite using `pytest`:
     - Test calculations against known published benchmark datasets (e.g., NIST StRD datasets for ANOVA and Linear Regression).
     - Test malformed CSVs, empty files, non-numeric column errors, and missing value edge cases.
- **Verification Gate**: 100% of statistical tests pass with mathematical tolerances under $10^{-6}$.

---

## Milestone 2: Next.js Application Scaffold, Design System & Public Pages
**Goal**: Establish the web frontend foundation, academic aesthetic, navigation, and regulatory legal pages.
- **Tasks**:
  1. Initialize `apps/web` with Next.js 15+ (App Router), TypeScript, and Tailwind CSS.
  2. Configure design tokens: Deep navy primary (`#0f2027` / `#1e3a8a`), slate gray neutrals, crisp white surfaces, and dark forest green accents.
  3. Establish base UI component library:
     - Standard rectangular and subtly rounded buttons (no pill buttons).
     - Input fields, text areas, select dropdowns with validation error states.
     - Table components for academic results.
     - Lucide React icon integration (no emojis).
  4. Create static public pages:
     - Institutional Landing Page: Direct, factual explanation of the analysis process, supported statistical methodologies, and security standards (no vague marketing claims or fake stats).
     - Terms and Conditions (`/terms`): Clear research integrity terms, ownership statement, student responsibilities, and analytical scope.
     - Privacy Policy (`/privacy`): Data retention rules, anonymity guarantees, and secure dataset lifecycle.
     - Custom domain configuration documentation (`CNAME` / DNS records guide).
     - Academic favicon and manifest setup.
- **Verification Gate**: Web app builds with zero TypeScript or ESLint errors; responsive layouts verified on desktop and mobile viewports.

---

## Milestone 3: Supabase Authentication, Database Schema & Storage
**Goal**: Provision PostgreSQL schemas, Row-Level Security policies, and secure private storage buckets.
- **Tasks**:
  1. Write and test Supabase migration scripts for `profiles`, `projects`, `research_questions`, `hypotheses`, `datasets`, `validation_reports`, `analysis_runs`, `chapter_four_drafts`, `analyst_reviews`, and `audit_logs`.
  2. Implement and test RLS policies for `student`, `analyst`, and `admin` roles.
  3. Configure private Supabase Storage buckets: `datasets-raw` and `reports-generated` with strict object ownership rules.
  4. Build authentication pages in Next.js:
     - Student registration with university/faculty/department collection.
     - Login, password reset, and session management via Supabase Auth SSR cookies.
     - Protected route middleware restricting access based on user role.
- **Verification Gate**: Role-based access verification tests confirm that a student cannot view another user's projects or datasets.

---

## Milestone 4: Project Intake Wizard & Dataset Validation UI
**Goal**: Enable students to specify research parameters, upload datasets, and receive immediate data quality feedback.
- **Tasks**:
  1. Build multi-step project creation wizard:
     - Step 1: Project Title, Degree, Faculty, Department, and Supervisor Guidelines.
     - Step 2: Research Questions (numbered list).
     - Step 3: Research Hypotheses (H0/HA paired with research questions).
     - Step 4: Survey/Dataset Upload (CSV or XLSX up to 25MB).
  2. Implement direct-to-storage secure upload using presigned URLs.
  3. Connect Next.js server actions to the Python Analysis Engine `/validate` endpoint.
  4. Render Data Quality Report:
     - Missing values by column with percentage and impact warnings.
     - Duplicate response detection.
     - Variable type mapping (Likert scales, continuous numerical, categorical).
     - Actionable guidance for unresolved data issues before analysis can proceed.
- **Verification Gate**: End-to-end test verifying a 500-row synthetic survey dataset is uploaded, validated, and flagged with accurate missing value counts.

---

## Milestone 5: Statistical Analysis Execution & Verification Dashboard
**Goal**: Allow students and analysts to execute selected statistical tests and inspect verifiable results tables.
- **Tasks**:
  1. Create the Analysis Configuration Interface:
     - Variable selection (Independent variable, Dependent variable, Grouping variable).
     - Test selection based on research hypothesis structure.
  2. Connect to the Python engine `/analyze/hypothesis` endpoints.
  3. Render academic results tables:
     - Descriptive summary tables (Means, Standard Deviations, Sample Sizes).
     - Test statistics tables (t-values, F-ratios, correlation coefficients, p-values).
     - Hypothesis evaluation card displaying decision (Supported / Not Supported at $\alpha = 0.05$ or $0.01$).
  4. Ensure numerical claims provide an audit tooltip showing the exact formula and parameter inputs used.
- **Verification Gate**: Tests demonstrate that running an independent t-test on benchmark data yields exact t and p values matching the Python test suite.

---

## Milestone 6: Chapter Four Report Generator & Interactive Editor
**Goal**: Automatically synthesize results into an academic Chapter Four draft following Nigerian university formatting standards.
- **Tasks**:
  1. Implement Chapter Four template compiler:
     - 4.1 Introduction & Response Rate Summary.
     - 4.2 Demographic Profile of Respondents.
     - 4.3 Analysis of Research Questions.
     - 4.4 Test of Research Hypotheses.
     - 4.5 Discussion and Summary of Findings.
  2. Build in-browser rich-text editor allowing students and analysts to review, refine narrative phrasing, and insert supervisor-mandated adjustments without corrupting calculated tables.
  3. Export generator: Download formatted report as `.docx` (Microsoft Word) and `.pdf`.
- **Verification Gate**: Generated Word document opens cleanly, includes properly labeled tables (Table 4.1, Table 4.2), and contains complete audit metadata.

---

## Milestone 7: Analyst Review Portal & Status Management
**Goal**: Provide analysts with a dedicated workspace to audit calculations, leave feedback, and approve deliverables.
- **Tasks**:
  1. Build Analyst Workspace:
     - Review queue showing submitted projects sorted by submission date.
     - Side-by-side inspection of student research questions, raw dataset preview, and calculated outputs.
     - Commenting and revision request mechanism (`needs_revision` status with specific instructions).
     - Final sign-off and approval workflow (`approved` status).
  2. Build Administrative Dashboard:
     - Global project activity overview.
     - Analyst assignment manager.
     - System audit trail log viewer.
- **Verification Gate**: An analyst can successfully reject a submission with notes, the student receives the notice, uploads corrected data, and the analyst performs final approval.

---

## Milestone 8: End-to-End Integration, Paystack Test Hook & Production Hardening
**Goal**: Complete end-to-end testing, security audits, and prepare the prototype for demonstration.
- **Tasks**:
  1. Conduct full security pass: SQL injection, CSV formula injection, rate limiting, and authorization edge cases.
  2. Implement Paystack test-mode integration stub:
     - Webhook receiver verifying transaction signatures in test mode.
     - Mock transaction trigger to simulate payment confirmation before deliverable release.
  3. Create comprehensive automated end-to-end integration test.
  4. Produce final developer runbook and operational documentation.
- **Verification Gate**: Complete end-to-end run from user registration to finalized Chapter Four export executes smoothly in a clean local environment.
