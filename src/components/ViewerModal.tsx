import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Trash2,
  Edit3,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { AttachmentItem, resolveAttachmentUrl } from '../utils/attachmentStorage';

interface ViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  attachment: AttachmentItem | null;
  isAdmin?: boolean;
  onRemove?: (id: string) => void;
  onReplace?: (item: AttachmentItem) => void;
}

export const ViewerModal: React.FC<ViewerModalProps> = ({
  isOpen,
  onClose,
  attachment,
  isAdmin = false,
  onRemove,
  onReplace,
}) => {
  const [zoom, setZoom] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setZoom(1);
  }, [attachment?.id]);

  if (!isOpen || !attachment) return null;

  const fileSrc = resolveAttachmentUrl(attachment.dataUrl);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileSrc;
    link.download = attachment.fileName || `${attachment.id}-documento`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-700/80 bg-slate-900/90 text-white shrink-0">
          <div className="min-w-0 pr-4">
            <h3 id="viewer-title" className="text-sm sm:text-base font-semibold text-slate-100 truncate flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400 shrink-0" />
              {attachment.targetTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              {attachment.fileName} {attachment.fileSize ? `• ${attachment.fileSize}` : ''} • {attachment.uploadedAt}
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom controls for images */}
            {attachment.fileType === 'image' && !imgError && (
              <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 mr-2 text-slate-300">
                <button
                  onClick={handleZoomOut}
                  title="Diminuir Zoom"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Resetar Zoom"
                  className="px-2 py-0.5 text-xs font-mono hover:text-white cursor-pointer"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Aumentar Zoom"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Ajustar"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors ml-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Download */}
            <button
              onClick={handleDownload}
              title="Baixar Arquivo"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Baixar</span>
            </button>

            {/* Replace - admin only */}
            {isAdmin && onReplace && (
              <button
                onClick={() => {
                  onClose();
                  onReplace(attachment);
                }}
                title="Substituir por outro arquivo"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-300 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Substituir</span>
              </button>
            )}

            {/* Remove - admin only (and not default) */}
            {isAdmin && onRemove && !attachment.isDefault && (
              <button
                onClick={() => {
                  if (confirm(`Remover anexo "${attachment.targetTitle}"?`)) {
                    onRemove(attachment.id);
                    onClose();
                  }
                }}
                title="Remover anexo"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-950/50 hover:bg-red-900/50 border border-red-800/60 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Remover</span>
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
              aria-label="Fechar visualizador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer body */}
        <div className="relative flex-1 bg-slate-950 overflow-auto flex items-center justify-center p-2 sm:p-4">
          {attachment.fileType === 'image' ? (
            imgError ? (
              <div className="flex flex-col items-center justify-center p-8 text-center max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl">
                <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  Arquivo do Documento
                </h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {attachment.fileName}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={fileSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir Documento</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-full max-h-full flex items-center justify-center transition-transform duration-150">
                <img
                  src={fileSrc}
                  alt={attachment.targetTitle}
                  onError={() => setImgError(true)}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="max-h-[80vh] max-w-full object-contain rounded shadow-lg select-none"
                />
              </div>
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <iframe
                src={fileSrc}
                title={attachment.targetTitle}
                className="w-full h-full rounded border-0 bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
