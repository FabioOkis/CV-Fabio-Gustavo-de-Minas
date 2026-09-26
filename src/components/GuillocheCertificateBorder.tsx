import React, { useId } from 'react';

interface GuillocheCertificateBorderProps {
  children: React.ReactNode;
  enabled?: boolean;
  showWatermark?: boolean;
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
  enabled = true,
  showWatermark = true,
  className = '',
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '_');
  const gradHId = `d4_grad_h_${uid}`;
  const gradDiagId = `d4_grad_diag_${uid}`;
  const patternHId = `d4_pat_h_${uid}`;
  const patternVId = `d4_pat_v_${uid}`;
  const maskTopId = `d4_mask_top_${uid}`;
  const maskBottomId = `d4_mask_bot_${uid}`;
  const maskLeftId = `d4_mask_l_${uid}`;
  const maskRightId = `d4_mask_r_${uid}`;

  // If disabled, render normal children with standard container styling
  if (!enabled) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  // 8 forward and 8 reverse phase-shifted waves for diamond guilloché mesh
  const phases = [0, 3, 6, 9, 12, 15, 18, 21];

  return (
    <div
      className={`relative bg-white text-slate-900 shadow-2xl transition-all duration-300 print:shadow-none print:m-0 print:p-0 ${className}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* ================= SVG DEFS & MASKS ================= */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Authentic D4Sign Signature Certificate Gradient: Emerald Green to Azure Blue */}
          <linearGradient id={gradHId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="18%" stopColor="#059669" />
            <stop offset="48%" stopColor="#06b6d4" />
            <stop offset="78%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Diagonal Gradient for corners and inner frame line */}
          <linearGradient id={gradDiagId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="25%" stopColor="#059669" />
            <stop offset="55%" stopColor="#06b6d4" />
            <stop offset="85%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Horizontal Guilloché Mask Pattern (White strokes on black background) */}
          <pattern
            id={patternHId}
            width="24"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="16" fill="#000000" />
            {/* Guide outer boundaries */}
            <line x1="0" y1="0.5" x2="24" y2="0.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="0" y1="15.5" x2="24" y2="15.5" stroke="#ffffff" strokeWidth="0.8" />

            {/* Interlaced diamond weave waves */}
            {phases.map((phase) => (
              <React.Fragment key={`h_${phase}`}>
                <path
                  d={generateWavePath(phase, false)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
                <path
                  d={generateWavePath(phase, true)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              </React.Fragment>
            ))}
          </pattern>

          {/* Vertical Guilloché Mask Pattern */}
          <pattern
            id={patternVId}
            width="16"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="16" height="24" fill="#000000" />
            <line x1="0.5" y1="0" x2="0.5" y2="24" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="15.5" y1="0" x2="15.5" y2="24" stroke="#ffffff" strokeWidth="0.8" />

            {phases.map((phase) => (
              <React.Fragment key={`v_${phase}`}>
                <path
                  d={generateVerticalWavePath(phase, false)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
                <path
                  d={generateVerticalWavePath(phase, true)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              </React.Fragment>
            ))}
          </pattern>

          {/* Masks using the Guilloché Patterns */}
          <mask id={maskTopId} maskUnits="objectBoundingBox">
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternHId})`} />
          </mask>
          <mask id={maskBottomId} maskUnits="objectBoundingBox">
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternHId})`} />
          </mask>
          <mask id={maskLeftId} maskUnits="objectBoundingBox">
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternVId})`} />
          </mask>
          <mask id={maskRightId} maskUnits="objectBoundingBox">
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternVId})`} />
          </mask>
        </defs>
      </svg>

      {/* ========================================================
          OUTER SECURITY GUILLOCHÉ BORDER FRAME (16px thickness)
          ======================================================== */}
      {/* Top Border Bar */}
      <div className="absolute top-0 left-[14px] sm:left-[16px] right-[14px] sm:right-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden select-none z-10 print:h-[16px] print:left-[16px] print:right-[16px]">
        <svg className="w-full h-full block" preserveAspectRatio="none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${gradHId})`}
            mask={`url(#${maskTopId})`}
          />
        </svg>
      </div>

      {/* Bottom Border Bar */}
      <div className="absolute bottom-0 left-[14px] sm:left-[16px] right-[14px] sm:right-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden select-none z-10 print:h-[16px] print:left-[16px] print:right-[16px]">
        <svg className="w-full h-full block" preserveAspectRatio="none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${gradHId})`}
            mask={`url(#${maskBottomId})`}
          />
        </svg>
      </div>

      {/* Left Border Bar (Emerald Green) */}
      <div className="absolute top-[14px] sm:top-[16px] bottom-[14px] sm:bottom-[16px] left-0 w-[14px] sm:w-[16px] pointer-events-none overflow-hidden select-none z-10 print:w-[16px] print:top-[16px] print:bottom-[16px]">
        <svg className="w-full h-full block" preserveAspectRatio="none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#10b981"
            mask={`url(#${maskLeftId})`}
          />
        </svg>
      </div>

      {/* Right Border Bar (Azure Blue / Cyan) */}
      <div className="absolute top-[14px] sm:top-[16px] bottom-[14px] sm:bottom-[16px] right-0 w-[14px] sm:w-[16px] pointer-events-none overflow-hidden select-none z-10 print:w-[16px] print:top-[16px] print:bottom-[16px]">
        <svg className="w-full h-full block" preserveAspectRatio="none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#0284c7"
            mask={`url(#${maskRightId})`}
          />
        </svg>
      </div>

      {/* ========================================================
          4 MITERED CORNER ROSETTES
          ======================================================== */}
      {/* Top-Left Corner (Emerald Green) */}
      <div className="absolute top-0 left-0 w-[14px] sm:w-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden z-10 print:w-[16px] print:h-[16px]">
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
      <div className="absolute top-0 right-0 w-[14px] sm:w-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden z-10 print:w-[16px] print:h-[16px]">
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
      <div className="absolute bottom-0 left-0 w-[14px] sm:w-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden z-10 print:w-[16px] print:h-[16px]">
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
      <div className="absolute bottom-0 right-0 w-[14px] sm:w-[16px] h-[14px] sm:h-[16px] pointer-events-none overflow-hidden z-10 print:w-[16px] print:h-[16px]">
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
          INNER BORDER LINE (1.5px gradient stroke)
          16px border + 6px gap = 22px on desktop / 19px on mobile
          ======================================================== */}
      <div
        className="absolute inset-[18px] sm:inset-[22px] pointer-events-none z-10 rounded-[1px] print:inset-[22px]"
        style={{
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(135deg, #10b981 0%, #059669 20%, #06b6d4 60%, #0ea5e9 85%, #0284c7 100%) 1',
        }}
      />

      {/* ========================================================
          FAINT SECURITY WATERMARK WAVES (Background Texture)
          ======================================================== */}
      {showWatermark && (
        <div className="absolute inset-[20px] sm:inset-[24px] pointer-events-none overflow-hidden opacity-[0.032] select-none z-0">
          <svg className="w-full h-full block" preserveAspectRatio="none" viewBox="0 0 800 1100">
            {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020].map((yBase, idx) => (
              <path
                key={`watermark_${idx}`}
                d={`M 0 ${yBase} C 200 ${yBase - 35 + (idx % 3) * 15} 400 ${yBase + 35 - (idx % 2) * 20} 600 ${yBase - 25} T 800 ${yBase}`}
                fill="none"
                stroke={idx % 2 === 0 ? '#0284c7' : '#059669'}
                strokeWidth="1.2"
              />
            ))}
          </svg>
        </div>
      )}

      {/* Content wrapper with appropriate inner padding */}
      <div className="relative z-1 p-4 sm:p-7 md:p-9 print:p-6">
        {children}
      </div>
    </div>
  );
};
