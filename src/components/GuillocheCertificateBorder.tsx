import React, { useMemo } from 'react';

interface GuillocheCertificateBorderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Generates an SVG path for an interlocking guilloché sine wave ribbon tile.
 * Period = 24px, Height = 16px, Amplitude = 6.2px, Center = 8px.
 */
function generateWavePath(phase: number, inverted: boolean = false): string {
  const points: string[] = [];
  const W = 24;
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const x = (i * W) / steps;
    const angle = ((x - phase) / W) * 2 * Math.PI;
    const cosVal = Math.cos(angle);
    const y = inverted ? 8 - 6.2 * cosVal : 8 + 6.2 * cosVal;
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}

/**
 * Generates vertical wave path: swaps X and Y.
 * Width = 16px, Period = 24px, Amplitude = 6.2px, Center = 8px.
 */
function generateVerticalWavePath(phase: number, inverted: boolean = false): string {
  const points: string[] = [];
  const H = 24;
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const y = (i * H) / steps;
    const angle = ((y - phase) / H) * 2 * Math.PI;
    const cosVal = Math.cos(angle);
    const x = inverted ? 8 - 6.2 * cosVal : 8 + 6.2 * cosVal;
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}

export const GuillocheCertificateBorder: React.FC<GuillocheCertificateBorderProps> = ({
  children,
  className = '',
}) => {
  // Generate self-contained data URIs for horizontal and vertical guilloché masks
  const { dataUriH, dataUriV } = useMemo(() => {
    const phases = [0, 3, 6, 9, 12, 15, 18, 21];

    const hPaths = phases
      .map(
        (p) =>
          `<path d='${generateWavePath(p, false)}' fill='none' stroke='black' stroke-width='0.8'/><path d='${generateWavePath(p, true)}' fill='none' stroke='black' stroke-width='0.8'/>`
      )
      .join('');
    const svgH = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16' viewBox='0 0 24 16'><line x1='0' y1='0.5' x2='24' y2='0.5' stroke='black' stroke-width='0.8'/><line x1='0' y1='15.5' x2='24' y2='15.5' stroke='black' stroke-width='0.8'/>${hPaths}</svg>`;

    const vPaths = phases
      .map(
        (p) =>
          `<path d='${generateVerticalWavePath(p, false)}' fill='none' stroke='black' stroke-width='0.8'/><path d='${generateVerticalWavePath(p, true)}' fill='none' stroke='black' stroke-width='0.8'/>`
      )
      .join('');
    const svgV = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24'><line x1='0.5' y1='0' x2='0.5' y2='24' stroke='black' stroke-width='0.8'/><line x1='15.5' y1='0' x2='15.5' y2='24' stroke='black' stroke-width='0.8'/>${vPaths}</svg>`;

    return {
      dataUriH: `data:image/svg+xml,${encodeURIComponent(svgH)}`,
      dataUriV: `data:image/svg+xml,${encodeURIComponent(svgV)}`,
    };
  }, []);

  return (
    <div
      className={`relative bg-white text-slate-900 shadow-xl print:shadow-none print:m-0 print:p-0 ${className}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* ========================================================
          OUTER SECURITY GUILLOCHÉ BORDER FRAME (16px thickness)
          ======================================================== */}
      {/* Top Border Bar (Emerald Green to Azure Blue Gradient) */}
      <div
        className="absolute top-0 left-[16px] right-[16px] h-[16px] pointer-events-none select-none z-10"
        style={{
          background: 'linear-gradient(to right, #10b981 0%, #059669 20%, #06b6d4 50%, #0ea5e9 80%, #0284c7 100%)',
          WebkitMaskImage: `url("${dataUriH}")`,
          maskImage: `url("${dataUriH}")`,
          WebkitMaskRepeat: 'repeat-x',
          maskRepeat: 'repeat-x',
          WebkitMaskSize: '24px 16px',
          maskSize: '24px 16px',
        }}
      />

      {/* Bottom Border Bar (Emerald Green to Azure Blue Gradient) */}
      <div
        className="absolute bottom-0 left-[16px] right-[16px] h-[16px] pointer-events-none select-none z-10"
        style={{
          background: 'linear-gradient(to right, #10b981 0%, #059669 20%, #06b6d4 50%, #0ea5e9 80%, #0284c7 100%)',
          WebkitMaskImage: `url("${dataUriH}")`,
          maskImage: `url("${dataUriH}")`,
          WebkitMaskRepeat: 'repeat-x',
          maskRepeat: 'repeat-x',
          WebkitMaskSize: '24px 16px',
          maskSize: '24px 16px',
        }}
      />

      {/* Left Border Bar (Emerald Green) */}
      <div
        className="absolute top-[16px] bottom-[16px] left-0 w-[16px] pointer-events-none select-none z-10"
        style={{
          backgroundColor: '#10b981',
          WebkitMaskImage: `url("${dataUriV}")`,
          maskImage: `url("${dataUriV}")`,
          WebkitMaskRepeat: 'repeat-y',
          maskRepeat: 'repeat-y',
          WebkitMaskSize: '16px 24px',
          maskSize: '16px 24px',
        }}
      />

      {/* Right Border Bar (Azure Blue) */}
      <div
        className="absolute top-[16px] bottom-[16px] right-0 w-[16px] pointer-events-none select-none z-10"
        style={{
          backgroundColor: '#0284c7',
          WebkitMaskImage: `url("${dataUriV}")`,
          maskImage: `url("${dataUriV}")`,
          WebkitMaskRepeat: 'repeat-y',
          maskRepeat: 'repeat-y',
          WebkitMaskSize: '16px 24px',
          maskSize: '16px 24px',
        }}
      />

      {/* ========================================================
          4 MITERED CORNER ROSETTES (16px x 16px)
          ======================================================== */}
      {/* Top-Left Corner (Emerald Green) */}
      <div className="absolute top-0 left-0 w-[16px] h-[16px] pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full block" viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#10b981" />
          <line x1="0.5" y1="0.5" x2="15.5" y2="0.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0.5" y1="0.5" x2="0.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="16" y2="16" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="4" y1="0" x2="16" y2="12" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="8" y1="0" x2="16" y2="8" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="4" x2="12" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="8" x2="8" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <circle cx="0" cy="0" r="15.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
        </svg>
      </div>

      {/* Top-Right Corner (Azure Blue / Cyan) */}
      <div className="absolute top-0 right-0 w-[16px] h-[16px] pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full block" viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#0284c7" />
          <line x1="0.5" y1="0.5" x2="15.5" y2="0.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="15.5" y1="0.5" x2="15.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="16" y1="0" x2="0" y2="16" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="12" y1="0" x2="0" y2="12" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="8" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="16" y1="8" x2="8" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <circle cx="16" cy="0" r="15.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="16" cy="0" r="11" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
          <circle cx="16" cy="0" r="6" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
        </svg>
      </div>

      {/* Bottom-Left Corner (Emerald Green) */}
      <div className="absolute bottom-0 left-0 w-[16px] h-[16px] pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full block" viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#10b981" />
          <line x1="0.5" y1="15.5" x2="15.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0.5" y1="0.5" x2="0.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0" y1="16" x2="16" y2="0" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="4" y1="16" x2="16" y2="4" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="8" y1="16" x2="16" y2="8" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="12" x2="12" y2="0" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="8" x2="8" y2="0" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <circle cx="0" cy="16" r="15.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="0" cy="16" r="11" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
          <circle cx="0" cy="16" r="6" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
        </svg>
      </div>

      {/* Bottom-Right Corner (Azure Blue / Cyan) */}
      <div className="absolute bottom-0 right-0 w-[16px] h-[16px] pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full block" viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#0284c7" />
          <line x1="0.5" y1="15.5" x2="15.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="15.5" y1="0.5" x2="15.5" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="16" y2="16" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="0" y1="4" x2="12" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="8" x2="8" y2="16" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="4" y1="0" x2="16" y2="12" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <line x1="8" y1="0" x2="16" y2="8" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
          <circle cx="16" cy="16" r="15.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="16" cy="16" r="11" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
          <circle cx="16" cy="16" r="6" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
        </svg>
      </div>

      {/* ========================================================
          INNER BORDER LINE (1.5px gradient stroke inset by 22px)
          16px border + 6px gap = 22px
          ======================================================== */}
      <div
        className="absolute inset-[22px] pointer-events-none z-10 rounded-[1px]"
        style={{
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(135deg, #10b981 0%, #059669 20%, #06b6d4 60%, #0ea5e9 85%, #0284c7 100%) 1',
        }}
      />

      {/* Content wrapper with clean inner padding */}
      <div className="relative z-1 p-6 sm:p-10 md:p-12 print:p-8">
        {children}
      </div>
    </div>
  );
};
