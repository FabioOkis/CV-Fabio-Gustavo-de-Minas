import React, { useEffect } from 'react';
import { CertModalInfo } from '../types';

interface CertLightboxProps {
  cert: CertModalInfo | null;
  onClose: () => void;
}

export const CertLightbox: React.FC<CertLightboxProps> = ({ cert, onClose }) => {
  useEffect(() => {
    if (!cert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(8,11,13,0.88)] backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de certificado"
      onClick={onClose}
    >
      <div
        className="max-w-[920px] w-full bg-[#10192C] border border-[#2E3D52] rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex justify-between items-center px-3.5 py-2.5 bg-[#16233B] border-b border-[#2E3D52] font-mono text-xs text-[#8FA2B0]">
          <span className="truncate pr-2 font-medium">{cert.title}</span>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 font-mono text-xs text-[#8FA2B0] hover:text-[#E7ECEE] hover:border-[#4FD1C0] border border-[#2E3D52] rounded px-2 py-0.5 cursor-pointer transition-colors"
            aria-label="Fechar visualizador de certificado"
          >
            fechar ✕
          </button>
        </div>

        {/* Image */}
        <div className="p-2 bg-[#0A1122] flex justify-center items-center max-h-[75vh] overflow-auto">
          <img
            src={cert.src}
            alt={cert.title}
            className="block max-w-full max-h-[72vh] w-auto h-auto object-contain rounded"
            onError={(e) => {
              // fallback to remote reference server if needed
              const filename = cert.src.split('/').pop();
              if (filename) {
                (e.currentTarget as HTMLImageElement).src = `http://72.60.250.170:3012/assets/img/${filename}`;
              }
            }}
          />
        </div>

        {/* Note */}
        <div className="px-4 py-2.5 font-mono text-[11px] text-[#5E7282] border-t border-[#2E3D52] bg-[#10192C] flex items-center justify-between">
          <span>RG e data de nascimento ocultados nesta versão pública por segurança.</span>
          <span className="hidden sm:inline text-[#4FD1C0]">ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};
