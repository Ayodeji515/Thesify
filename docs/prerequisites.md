# Thesify Prerequisites and External Account Configuration

This guide details all necessary software runtimes, cloud services, and external credentials required to develop and deploy Thesify.

---

## 1. Local Development Runtimes

Before running the application locally, ensure the following tools are installed:

| Tool | Recommended Version | Verification Command | Purpose |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v20.x` or `v22.x` (LTS) | `node -v` | Next.js web application runtime |
| **npm / pnpm** | `v10.x` / `v9.x` | `npm -v` | JavaScript dependency management |
| **Python** | `3.11.x` or `3.12.x` | `python --version` | Scientific analysis engine |
| **Git** | `2.40+` | `git --version` | Version control |
| **Supabase CLI** | Latest | `supabase -v` | Local PostgreSQL and migrations (optional but recommended) |

---

## 2. External Cloud Accounts & Configuration

### 2.1 Supabase Account (Required for Core Application)
- **Account Creation**: Sign up at [supabase.com](https://supabase.com).
- **New Project**: Create a new project (e.g., `thesify-dev`) in the nearest region (e.g., EU-West / London or US-East).
- **Credentials to Extract**:
  1. `NEXT_PUBLIC_SUPABASE_URL`: Project URL found under Settings -> API.
  2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anonymous API key.
  3. `SUPABASE_SERVICE_ROLE_KEY`: Secret service role key (kept on server only; never exposed to browser).
  4. `DATABASE_URL`: PostgreSQL connection string found under Settings -> Database.
- **Storage Configuration**:
  - Create two private buckets:
    - `datasets-raw`: Private bucket with upload size limit set to 25MB.
    - `reports-generated`: Private bucket for generated DOCX/PDF artifacts.

### 2.2 Custom Domain & DNS (Required for Production Identity)
- **Registrar**: Any domain registrar (Namecheap, Porkbun, Cloudflare, Whogohost).
- **DNS Records to Configure**:
  - `thesify.ng` or `thesify.com.ng`:
    - `A` Record or `CNAME` pointing to hosting provider (e.g., Vercel / Railway).
    - `TXT` records for domain ownership verification.
  - Subdomain for Analysis API (optional if decoupled): `api.thesify.ng` pointing to FastAPI service.

### 2.3 Hosting Platforms (For Staging & Prototype Deployment)
- **Web Application**: Vercel or Render.
- **Python Engine**: Railway, Render, or Fly.io (supports containerized Python 3.11 with `numpy`/`scipy` binaries).

### 2.4 Paystack Account (Deferred Until Milestone 8)
- **Note**: Real financial transactions are strictly disabled during this prototype phase.
- **Test Mode Setup**:
  1. Sign up for a free developer account at [paystack.com](https://paystack.com).
  2. Retrieve `PAYSTACK_TEST_PUBLIC_KEY` and `PAYSTACK_TEST_SECRET_KEY` from Settings -> API Keys & Webhooks.
  3. Set transaction currency to `NGN` (Nigerian Naira).

---

## 3. Environment Variable Template

### Web Application (`apps/web/.env.local`)
```env
# Web application configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Thesify

# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>

# Internal communication to Python Analysis Engine
ANALYSIS_ENGINE_URL=http://127.0.0.1:8000
ANALYSIS_ENGINE_SECRET_TOKEN=<your-internal-secret-token>

# Paystack test credentials (mocked / deferred)
NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY=<your-paystack-test-public-key>
PAYSTACK_TEST_SECRET_KEY=<your-paystack-test-secret-key>
```

### Analysis Engine (`services/analysis-engine/.env`)
```env
APP_ENV=development
PORT=8000
INTERNAL_SECRET_TOKEN=<your-internal-secret-token>

# Supabase direct access (for downloading raw files server-to-server)
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
```
