import React from 'react';

export const LocalBusinessJsonLd: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'EducationalOrganization'],
    '@id': 'https://thesify.ng/#organization',
    name: 'Thesify Academic Research & Data Analysis Services',
    alternateName: 'Thesify',
    description:
      'Managed quantitative research data analysis, survey data validation, hypothesis testing, and Chapter Four reporting for university undergraduate and postgraduate students across Nigeria.',
    url: 'https://thesify.ng',
    logo: 'https://thesify.ng/icon.svg',
    image: 'https://thesify.ng/og-image.png',
    telephone: '+234-800-THESIFY',
    email: 'support@thesify.ng',
    priceRange: '₦₦',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Faculty Road, University of Lagos Campus',
      addressLocality: 'Akoka, Lagos',
      addressRegion: 'Lagos State',
      postalCode: '100213',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.5186,
      longitude: 3.3981,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Academic Quantitative Research Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Survey Data Hygiene & Validation',
            description:
              'Automated and analyst-reviewed detection of missing values, coding errors in Likert scales, duplicate survey respondents, and reliability analysis (Cronbach Alpha).',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Deterministic Hypothesis Testing',
            description:
              'Statistical computation of t-tests, One-Way ANOVA, Pearson and Spearman correlation, and regression analysis adhering to 0.05 alpha levels.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Chapter Four Drafting & Reporting',
            description:
              'Structured presentation of numbered APA demographic frequency tables, hypothesis test summaries, and traceable narrative for supervisor submission.',
          },
        },
      ],
    },
    sameAs: [
      'https://twitter.com/thesify_ng',
      'https://linkedin.com/company/thesify-ng',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebSiteJsonLd: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://thesify.ng/#website',
    name: 'Thesify',
    url: 'https://thesify.ng',
    description: 'Research data analysis, made clearer for Nigerian university students.',
    publisher: {
      '@id': 'https://thesify.ng/#organization',
    },
    inLanguage: 'en-NG',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FaqJsonLd: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What file formats can I upload for my analysis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept CSV (.csv) and Microsoft Excel (.xlsx, .xls) files. Files must contain clearly labeled column headers matching your questionnaire items.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if my research design does not have hypotheses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hypotheses are optional. Many descriptive survey projects only require research questions with frequency distributions, percentages, mean scores, and standard deviations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I edit the Chapter Four report after receiving it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Reports can be edited directly inside the platform or exported as Microsoft Word (.docx) files, allowing you to tailor the narrative to your supervisor specific commentary.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is my respondent survey data protected?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your datasets are stored in encrypted, private cloud storage with strict Row-Level Security. We do not sell or share student research data, and personal respondent identifiers should be removed prior to upload.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
