import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesify.ng';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Thesify — Academic Project Writing & Quantitative Analysis Platform',
    template: '%s | Thesify',
  },
  description:
    'Complete undergraduate and postgraduate dissertation platform in Nigeria. Choose from Free Topic Guidance, Plan A (Chapters 1-3 Proposal), Plan B (Chapter 4 Statistical Analysis), or Plan C (Full Project Chapters 1-5 from Scratch).',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Thesify Research Operations', url: siteUrl }],
  creator: 'Thesify',
  publisher: 'Thesify',
  keywords: [
    'write project from scratch Nigeria',
    'Chapter 1 to 3 writing service',
    'Chapter Four statistical analysis',
    'full project writing Nigeria',
    'research data analysis',
    'Nigerian university project',
    'free project topic selection',
    'SPSS alternatives Nigeria',
    'hypotheses testing t-test ANOVA',
    'NUC compliant Chapter 4',
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
    title: 'Thesify — Academic Project Writing & Quantitative Analysis Platform',
    description:
      'Choose from Free Topic Guidance, Proposal Chapters 1-3, Chapter 4 Data Analysis, or Full Project Chapters 1-5 written from scratch.',
    siteName: 'Thesify',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Thesify — Academic Project Writing and Quantitative Research Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thesify — Academic Project Writing & Quantitative Analysis Platform',
    description:
      'Choose from Free Topic Guidance, Proposal Chapters 1-3, Chapter 4 Data Analysis, or Full Project Chapters 1-5 from scratch.',
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Anti-flash inline theme loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('thesify_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
