# Thesify First Working Prototype Acceptance Criteria

Every milestone and release candidate must satisfy the following acceptance criteria prior to sign-off.

---

## 1. Landing Page and Public Web Identity
- [ ] **Branding & Visuals**: Clean academic aesthetic in deep navy, slate gray, and crisp white.
- [ ] **Constraint Compliance**:
  - Zero purple gradients.
  - Zero vague hero copy or hyperbolic slogans.
  - Zero fake reviews, fake client logos, or fabricated metrics.
  - Zero pill-shaped buttons; all buttons use standard rectangular or `rounded-md` corners.
  - Zero emoji icons; all iconography uses Lucide React SVGs.
  - Zero AI-generated illustration placeholders.
  - Zero em dashes in system copy.
  - Zero "Made with AI" tags or disclaimers.
- [ ] **Legal & Compliance Pages**:
  - `/terms`: Terms and Conditions detailing research ethics, student ownership of intellectual property, and service boundaries.
  - `/privacy`: Privacy Policy detailing data handling, file retention, and anonymity rules.
- [ ] **Technical Identity**: Custom favicon loaded properly across browser tabs, and custom domain documentation available.

---

## 2. Authentication and Authorization (RBAC)
- [ ] **Account Creation**: Student registration collects full name, institution, faculty, department, and valid email.
- [ ] **Session Security**: Session tokens maintained in secure HTTP-only cookies; unauthenticated requests to protected paths redirect to `/login`.
- [ ] **Role Segregation**:
  - `student` role users cannot access `/analyst` or `/admin` routes.
  - `student` role users can never query or view projects, datasets, or reports belonging to other students.
  - Attempting to access an unauthorized project ID directly returns an HTTP 404 or 403 Forbidden.

---

## 3. Project Creation and Intake
- [ ] **Structured Metadata**: Intake wizard captures:
  - Project Title.
  - Field of Study, Faculty, and Target Degree.
  - Numbered Research Questions (minimum 1, dynamic additions).
  - Numbered Research Hypotheses linked to research questions with null/alternative designation.
  - Methodology type and specific supervisor guidelines.
- [ ] **Form Validation**: Client and server-side Zod schemas prevent submission of empty or malformed fields.

---

## 4. Dataset Upload and Data Quality Validation
- [ ] **Upload Mechanism**: Supports `.csv`, `.xlsx`, and `.xls` files up to 25MB via presigned Supabase Storage URLs.
- [ ] **Validation Engine Execution**:
  - Accurately reports total row count and column count.
  - Computes exact missing value counts and percentages per column.
  - Detects duplicate rows and provides the exact duplicate count.
  - Flags potential data issues (e.g., non-numeric values in scale columns, extreme outliers).
- [ ] **Error Guidance**: Validation report provides actionable, non-cryptic feedback explaining what needs fixing before statistical testing can begin.

---

## 5. Statistical Analysis Engine & Verifiable Output
- [ ] **Supported Tests (Prototype Scope)**:
  - Descriptive statistics (Frequency, Percentage, Mean, Standard Deviation).
  - Scale reliability (Cronbach's alpha).
  - Independent samples t-test.
  - One-way ANOVA.
  - Pearson correlation coefficient.
  - Simple & Multiple linear regression.
  - Chi-square test of independence.
- [ ] **Mathematical Integrity**:
  - Zero hallucinated or invented results.
  - Automated tests verify computations against published NIST/Stata benchmark datasets to within $10^{-6}$ numerical tolerance.
- [ ] **Traceability**: Every output table includes degrees of freedom, test statistic, p-value, and confidence interval.
- [ ] **Interpretation Rules**: Narrative interpretations are generated through deterministic template mapping that accurately conveys statistical significance at $p < 0.05$ and $p < 0.01$.

---

## 6. Chapter Four Report Generation & Editing
- [ ] **Standard Nigerian University Format**:
  - Section 4.1: Demographic Characteristics of Respondents.
  - Section 4.2: Presentation and Analysis of Research Questions.
  - Section 4.3: Testing of Hypotheses.
  - Section 4.4: Summary of Major Findings.
- [ ] **Editable Interface**: In-browser document editor allows the student or analyst to adjust narrative flow while preserving statistical table figures.
- [ ] **Export Formats**: Ability to download the finalized report as a structured `.docx` document with styled academic tables and captions.

---

## 7. Analyst Review Workflow & Admin Oversight
- [ ] **Analyst Review Queue**: Analysts can view submitted projects awaiting review.
- [ ] **Audit & Feedback**:
  - Analyst can inspect the raw dataset, rerun tests, and verify calculations.
  - Analyst can add internal notes and student-facing revision feedback.
  - Status transitions (`submitted` -> `in_analysis` -> `analyst_review` -> `approved` or `needs_revision`) are strictly logged in `audit_logs`.
- [ ] **Student Notification**: Student dashboard updates immediately when project status changes.

---

## 8. Security & Operational Hardening
- [ ] **Environment Protection**: No API keys, database secrets, or service keys in client bundles or Git repository.
- [ ] **CSV Injection Defense**: Excel and CSV parsing sanitizes leading formula characters (`=`, `+`, `-`, `@`).
- [ ] **Mocked Payments**: Paystack test mode integration points documented and stubbed; no live credit card or billing connections active in prototype.
