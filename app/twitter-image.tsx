import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Thesify — Quantitative Research Analysis and Chapter Four Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0b1120',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: '#2563eb',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 28,
              fontWeight: 800,
              marginRight: 18,
            }}
          >
            T
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Thesify
            </span>
            <span style={{ fontSize: 16, color: '#94a3b8', fontWeight: 500 }}>
              Academic Data Services
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '1000px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: 8,
              padding: '6px 16px',
              color: '#60a5fa',
              fontSize: 16,
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            Verified Statistical Computation
          </div>

          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Research data analysis, made clearer.
          </h1>

          <p
            style={{
              fontSize: 22,
              color: '#cbd5e1',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Quantitative analysis, dataset validation, and supervisor-ready Chapter Four reports for Nigerian university researchers.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #1e293b',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', gap: 32, color: '#94a3b8', fontSize: 18, fontWeight: 500 }}>
            <span>• Data Validation</span>
            <span>• Hypothesis Testing</span>
            <span>• Chapter Four Drafts</span>
          </div>

          <div
            style={{
              color: '#38bdf8',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            @thesify_ng
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
