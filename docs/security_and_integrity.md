# Thesify Security and Research Integrity Protocols

Maintaining absolute research integrity and student data security is the fundamental requirement of Thesify. This document outlines the identified risks and corresponding technical controls.

---

## 1. Research Integrity & Statistical Honesty

### 1.1 The Risk of Result Fabrication or AI Hallucination
- **Risk**: Automated systems might generate plausible-sounding but fictitious statistical figures, degrees of freedom, or p-values to satisfy a student's desired hypothesis outcome.
- **Enforced Control**:
  - Zero generative AI is used for statistical computations. All numbers are produced by deterministic Python libraries (`scipy`, `statsmodels`, `pandas`, `numpy`).
  - Every numerical figure displayed in tables or cited in narrative paragraphs must be dynamically bound to calculated values in `analysis_runs.test_statistics`.
  - Raw source datasets are stored in an immutable, write-once Supabase Storage bucket (`datasets-raw`). The platform forbids any in-place mutation of uploaded research data.

### 1.2 Verifiability and Audit Trail
- **Risk**: A university department or supervisor challenges the methodology or values presented in Chapter Four.
- **Enforced Control**:
  - Every project maintains an append-only log of analysis runs.
  - Each run logs the exact file hash (SHA-256), the timestamp, the Python library versions, the chosen variables, and the mathematical output.
  - The generated Chapter Four contains a standardized, verifiable Methodology Footnote detailing the analytical environment and checksum of the source data.

### 1.3 Preservation of Negative / Non-Significant Findings
- **Risk**: Pressure from students to manipulate or "p-hack" datasets to achieve statistical significance ($p < 0.05$).
- **Enforced Control**:
  - The platform template engine treats non-significant outcomes ($p \ge 0.05$) as standard, valid scientific results.
  - Standardized interpretation templates explain why null hypotheses fail to be rejected without disparaging the student's research or suggesting fraudulent data manipulation.

---

## 2. Application and Data Security

### 2.1 File Upload Protection & Malicious Content
- **Risk**: Uploaded CSV or Excel spreadsheets could contain malicious formulas (CSV Injection / Formula Injection), macros, or embedded malware.
- **Enforced Control**:
  - **Size Limits**: Hard 25MB ceiling on uploaded datasets.
  - **MIME & Extension Enforcement**: Only `.csv`, `.xlsx`, and `.xls` files are accepted.
  - **Macro Stripping**: Excel files are parsed using `openpyxl` with `data_only=True` to extract raw evaluated cell values and ignore any executable VBA macros.
  - **CSV Formula Sanitization**: Cells starting with `=`, `+`, `-`, `@`, `\t`, or `\r` are sanitized or treated strictly as literal strings upon parsing to prevent DDE/spreadsheet execution when opened by analysts.

### 2.2 Private Storage & Object Isolation
- **Risk**: Unauthorized users guessing URLs or accessing research datasets containing sensitive respondent data.
- **Enforced Control**:
  - Storage buckets are private by default. Public read access is completely disabled.
  - File retrieval requires short-lived presigned URLs (maximum 15-minute expiration) generated only after verifying that `auth.uid() = project.student_id` or that the user has an `analyst` or `admin` role.

### 2.3 Row-Level Security (RLS) & Authorization
- **Risk**: Broken Object Level Authorization (BOLA/IDOR) where a student accesses another student's project or analysis results by altering the UUID in the URL.
- **Enforced Control**:
  - PostgreSQL Row-Level Security is active on every single table.
  - The Next.js web application enforces role-based middleware, and the database acts as the definitive security boundary: even if Next.js code had a flaw, the database rejects queries outside the user's tenant scope.

### 2.4 Internal Service Communication Security
- **Risk**: External actors sending unauthorized analysis requests to the Python FastAPI microservice.
- **Enforced Control**:
  - The Python service does not accept direct public web traffic.
  - All internal requests from Next.js require a high-entropy secret token passed in an `X-Internal-Token` header.
  - IP allowlisting is enforced when deployed.

### 2.5 Protection of Student Personal Data (PII)
- **Risk**: Sensitive demographic information of student respondents (e.g., location, income, health disclosures) leaking.
- **Enforced Control**:
  - The validator flags columns that match common PII patterns (names, national ID numbers, email addresses, phone numbers) and advises the student to anonymize the dataset prior to final submission.
  - Data transmission is encrypted at rest (AES-256 in Supabase) and in transit (TLS 1.3).
