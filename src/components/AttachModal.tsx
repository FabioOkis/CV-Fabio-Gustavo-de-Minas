import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { AttachmentItem, saveAttachment } from '../utils/attachmentStorage';

interface AttachModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetTitle: string;
  category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta';
  currentAttachment?: AttachmentItem;
  onSaved: (item: AttachmentItem) => void;
}

export const AttachModal: React.FC<AttachModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetTitle,
  category,
  currentAttachment,
  onSaved,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setError(null);
    // Limit to 12MB
    if (file.size > 12 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 12 MB.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      setError('Formato não suportado. Por favor, envie uma imagem (JPG, PNG, WEBP) ou documento PDF.');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleConfirmSave = () => {
    if (!selectedFile || !previewUrl) return;

    setIsProcessing(true);

    const isPdf = selectedFile.type === 'application/pdf';

    const newItem: AttachmentItem = {
      id: targetId,
      category,
      targetTitle,
      fileName: selectedFile.name,
      fileType: isPdf ? 'pdf' : 'image',
      fileSize: formatFileSize(selectedFile.size),
      dataUrl: previewUrl,
      uploadedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isDefault: false,
    };

    saveAttachment(newItem);
    onSaved(newItem);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-attach-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 id="modal-attach-title" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" />
              Anexar {category === 'diploma' ? 'Diploma' : 'Certificado'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{targetTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {currentAttachment && !selectedFile && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Arquivo atual:</strong> {currentAttachment.fileName} ({currentAttachment.fileSize || 'Anexo'})
                </span>
              </div>
              <span className="text-[11px] text-blue-600 font-medium">Substituir abaixo</span>
            </div>
          )}

          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
              dragActive
                ? 'border-blue-500 bg-blue-50/70 scale-[0.99]'
                : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Arraste o arquivo aqui ou <span className="text-blue-600 underline">clique para selecionar</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Formatos aceitos: Imagens (JPG, PNG, WEBP) ou documento PDF (até 12 MB)
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Preview if selected */}
          {selectedFile && previewUrl && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{selectedFile.name}</span>
                  <span className="text-slate-500">({formatFileSize(selectedFile.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-0.5 rounded hover:bg-red-50"
                >
                  Remover
                </button>
              </div>

              {selectedFile.type.startsWith('image/') && (
                <div className="max-h-40 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1">
                  <img
                    src={previewUrl}
                    alt="Pré-visualização do anexo"
                    className="max-h-36 object-contain rounded"
                  />
                </div>
              )}

              {selectedFile.type === 'application/pdf' && (
                <div className="p-3 bg-white rounded border border-slate-200 text-center text-xs text-slate-600">
                  📄 Arquivo PDF pronto para anexar.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!selectedFile || isProcessing}
            onClick={handleConfirmSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isProcessing ? 'Salvando...' : 'Salvar Anexo'}
          </button>
        </div>
      </div>
    </div>
  );
};
