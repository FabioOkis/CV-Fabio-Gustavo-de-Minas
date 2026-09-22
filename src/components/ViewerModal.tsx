import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCcw, Trash2, Edit3, FileText } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

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

  if (!isOpen || !attachment) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = attachment.dataUrl;
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
            {attachment.fileType === 'image' && (
              <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 mr-2 text-slate-300">
                <button
                  onClick={handleZoomOut}
                  title="Diminuir Zoom"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Resetar Zoom"
                  className="px-2 py-0.5 text-xs font-mono hover:text-white"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Aumentar Zoom"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Ajustar"
                  className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors ml-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Download */}
            <button
              onClick={handleDownload}
              title="Baixar Arquivo"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Substituir</span>
              </button>
            )}

            {/* Remove - admin only */}
            {isAdmin && onRemove && (
              <button
                onClick={() => {
                  if (window.confirm(`Deseja desanexar este documento (${attachment.fileName})?`)) {
                    onRemove(attachment.id);
                    onClose();
                  }
                }}
                title="Remover anexo"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/70 border border-red-800/60 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Remover</span>
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
              aria-label="Fechar visualizador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer body */}
        <div className="relative flex-1 bg-slate-950 overflow-auto flex items-center justify-center p-2 sm:p-4">
          {attachment.fileType === 'image' ? (
            <div className="max-w-full max-h-full flex items-center justify-center transition-transform duration-150">
              <img
                src={attachment.dataUrl}
                alt={attachment.targetTitle}
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                className="max-h-[80vh] max-w-full object-contain rounded shadow-lg select-none"
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <iframe
                src={attachment.dataUrl}
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
