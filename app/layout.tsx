import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Thesify — Research data analysis, made clearer',
  description:
    'A managed quantitative data analysis platform for Nigerian university students. Get professional statistical analysis, data validation, and verified Chapter Four reporting.',
  metadataBase: new URL('http://localhost:3000'),
  authors: [{ name: 'Thesify Research Operations' }],
  keywords: [
    'research data analysis',
    'Nigerian university project',
    'Chapter Four analysis',
    'quantitative research',
    'SPSS alternatives',
    'data validation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
