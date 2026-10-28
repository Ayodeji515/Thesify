import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesify.ng';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Thesify — Quantitative Research Data Analysis for Nigerian University Students',
    template: '%s | Thesify',
  },
  description:
    'A managed quantitative data analysis and validation platform for Nigerian undergraduate and postgraduate students. Verified hypothesis testing, survey hygiene, and supervisor-ready Chapter Four reporting.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Thesify Research Operations', url: siteUrl }],
  creator: 'Thesify',
  publisher: 'Thesify',
  keywords: [
    'research data analysis',
    'Nigerian university project',
    'Chapter Four analysis',
    'quantitative research Nigeria',
    'undergraduate project analysis',
    'SPSS alternatives Nigeria',
    'data validation survey',
    'hypotheses testing t-test ANOVA',
    'NUC compliant Chapter 4',
    'University of Lagos project analysis',
    'OAU project data analysis',
  ],
  applicationName: 'Thesify',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/icon.svg', sizes: '180x180' }],
    shortcut: ['/icon.svg'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteUrl,
    title: 'Thesify — Research data analysis, made clearer',
    description:
      'Deterministic statistical computation, survey dataset validation, and supervisor-ready Chapter Four reporting for university researchers.',
    siteName: 'Thesify',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Thesify — Quantitative Research Data Analysis Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thesify — Research data analysis, made clearer',
    description:
      'Deterministic statistical computation, survey validation, and supervisor-ready Chapter Four reporting for university researchers.',
    creator: '@thesify_ng',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {/* Accessibility skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold shadow-md"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
