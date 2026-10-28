import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const fullItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? (item.href.startsWith('http') ? item.href : `https://thesify.ng${item.href}`) : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs text-slate-500 py-2.5 overflow-x-auto no-scrollbar ${className}`}
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1 || item.current;
            const isFirst = index === 0;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center space-x-1.5 sm:space-x-2">
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-slate-400 shrink-0 select-none"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center hover:text-blue-700 transition-colors text-slate-600 font-medium"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 mr-1 text-slate-400" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
