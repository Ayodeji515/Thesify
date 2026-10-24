# Thesify Project Folder Structure

The project is structured as a clear, modular workspace with separation between the web presentation application, the analytical computational engine, and deployment/database migrations.

```
Thesify/
├── .github/
│   └── workflows/
│       ├── test-web.yml               # Next.js linting and TypeScript checks
│       └── test-engine.yml            # Python pytest execution
├── apps/
│   └── web/                           # Next.js 15+ Web Application
│       ├── app/                       # App Router routes
│       │   ├── (auth)/                # Auth group (login, register, forgot-password)
│       │   ├── (marketing)/           # Landing page, about, methodology
│       │   │   ├── page.tsx           # Institutional landing page (clean, credible)
│       │   │   ├── terms/page.tsx     # Terms and Conditions
│       │   │   └── privacy/page.tsx   # Privacy Policy
│       │   ├── dashboard/             # Student portal
│       │   │   ├── page.tsx           # Projects list & status tracker
│       │   │   └── projects/
│       │   │       ├── new/           # Structured intake wizard
│       │   │       └── [id]/          # Project detail, upload, & report view
│       │   ├── analyst/               # Analyst portal (review, inspect, verify)
│       │   ├── admin/                 # Role management & audit logs
│       │   ├── api/                   # Server endpoints (webhooks, proxy handlers)
│       │   ├── favicon.ico            # Academic themed SVG/ICO favicon
│       │   ├── layout.tsx             # Root layout with font definitions & navigation
│       │   └── globals.css            # Tailwind CSS base & typography styles
│       ├── components/                # Reusable UI components
│       │   ├── ui/                    # Base components (Button, Input, Card, Modal)
│       │   ├── layout/                # Header, Footer, Sidebar, PageContainer
│       │   ├── intake/                # Questionnaire & hypothesis entry forms
│       │   ├── upload/                # Dataset dropzone & progress indicator
│       │   ├── validation/            # Missing value & duplicate summary cards
│       │   ├── analysis/              # Data tables, test statistics, and charts
│       │   └── report/                # Chapter Four document editor & export toolbar
│       ├── lib/                       # Utilities and integrations
│       │   ├── supabase/              # Supabase browser, server, and middleware clients
│       │   ├── api-client.ts          # Authenticated caller to Python analysis engine
│       │   ├── utils.ts               # Formatting (dates, numbers, currency)
│       │   └── validations.ts         # Zod schemas for forms and API payloads
│       ├── public/                    # Static assets, institutional marks
│       ├── package.json               # Dependencies and scripts
│       ├── tailwind.config.ts         # Curated academic theme (Navy/Slate/Forest)
│       ├── tsconfig.json              # Strict TypeScript configuration
│       └── next.config.ts
├── services/
│   └── analysis-engine/               # Quantitative Analysis Microservice (Python)
│       ├── app/
│       │   ├── __init__.py
│       │   ├── main.py                # FastAPI entry point & CORS configuration
│       │   ├── config.py              # Environment variables & security tokens
│       │   ├── api/
│       │   │   └── v1/
│       │   │       ├── routes.py      # /validate, /descriptive, /hypothesis, /report
│       │   │       └── deps.py        # Token validation & storage service client
│       │   ├── core/
│       │   │   ├── validator.py       # Dataset structure, missing value & duplicate checks
│       │   │   ├── statistics.py      # Parametric & non-parametric tests (scipy/statsmodels)
│       │   │   ├── reliability.py    # Cronbach's alpha calculation
│       │   │   ├── interpretations.py # Deterministic, template-driven findings generator
│       │   │   └── exporter.py        # DOCX / tabular data compiler
│       │   └── schemas/
│       │       └── payload.py         # Pydantic models for inputs and outputs
│       ├── tests/
│       │   ├── conftest.py            # Test fixtures and benchmark data loaders
│       │   ├── test_validator.py      # Tests for missing values, duplicates, and malformed files
│       │   ├── test_statistics.py     # Verified against Stata/NIST benchmark outputs
│       │   ├── test_reliability.py    # Verification against standard scale datasets
│       │   └── test_api.py            # Integration tests for FastAPI endpoints
│       ├── requirements.txt           # Pinned production dependencies
│       ├── requirements-dev.txt       # pytest, flake8, mypy, black
│       └── Dockerfile                 # Container definition for containerized deployment
├── supabase/
│   ├── migrations/                    # Versioned SQL migrations for schema & RLS
│   │   └── 20261024000000_init.sql
│   ├── seed.sql                       # Synthetic test users and mock project data
│   └── config.toml                    # Supabase local CLI configuration
├── docs/                              # Project architecture, plans, and criteria
│   ├── architecture.md
│   ├── database_schema.md
│   ├── folder_structure.md
│   ├── implementation_plan.md
│   ├── security_and_integrity.md
│   ├── prerequisites.md
│   └── acceptance_criteria.md
├── README.md                          # Quickstart and overview
└── .gitignore                         # Comprehensive ignore rules for Node, Python, and envs
```
