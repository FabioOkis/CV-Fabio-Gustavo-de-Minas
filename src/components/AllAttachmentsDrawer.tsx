import React from 'react';
import { X, Eye, Upload, Trash2, CheckCircle2, AlertCircle, FileText, Plus, Award, BookOpen } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

interface AllAttachmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  attachments: Record<string, AttachmentItem>;
  onOpenAttach: (
    targetId: string,
    targetTitle: string,
    category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta'
  ) => void;
  onOpenView: (attachment: AttachmentItem) => void;
  onRemove: (id: string) => void;
  onOpenCoverLetter?: () => void;
  onOpenRecommendationLetter?: () => void;
}

export const AllAttachmentsDrawer: React.FC<AllAttachmentsDrawerProps> = ({
  isOpen,
  onClose,
  attachments,
  onOpenAttach,
  onOpenView,
  onRemove,
  onOpenCoverLetter,
  onOpenRecommendationLetter,
}) => {
  if (!isOpen) return null;

  const letterItems: {
    id: string;
    title: string;
    category: 'carta';
    subtitle: string;
    icon: 'letter' | 'award';
    onReadLetter?: () => void;
  }[] = [
    {
      id: 'carta_apresentacao',
      title: 'Carta de Apresentação Profissional',
      category: 'carta',
      subtitle: 'Fábio Gustavo de Minas · Suporte PL / Suporte VIP & Executivo',
      icon: 'letter',
      onReadLetter: onOpenCoverLetter,
    },
    {
      id: 'carta_recomendacao',
      title: 'Carta de Recomendação Profissional',
      category: 'carta',
      subtitle: 'Pinheiro Neto Advogados · 7+ Anos (Ago/2018 – Out/2025)',
      icon: 'award',
      onReadLetter: onOpenRecommendationLetter,
    },
  ];

  const standardItems: {
    id: string;
    title: string;
    category: 'diploma' | 'certificacao';
    subtitle: string;
  }[] = [
    {
      id: 'mba',
      title: 'MBA em Gestão de Pessoas',
      category: 'diploma',
      subtitle: 'UNINOVE · 2018 (Diploma / Certificado)',
    },
    {
      id: 'redes',
      title: 'Pós-Graduação em Redes de Computadores',
      category: 'diploma',
      subtitle: 'UNINOVE · 2016 (Diploma / Certificado)',
    },
    {
      id: 'hdi',
      title: 'HDI Desktop Support Technician',
      category: 'certificacao',
      subtitle: 'HDI Brasil · 2018 (Certificação Internacional)',
    },
    {
      id: 'itil',
      title: 'ITIL V3 Foundation',
      category: 'certificacao',
      subtitle: 'Fundação Bradesco · 2017 (Certificação Oficial)',
    },
  ];

  const customItems = Object.values(attachments).filter(
    (item) => item.id.startsWith('cert_custom_') || item.id.startsWith('doc_custom_')
  );

  const totalAttached = Object.keys(attachments).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Central de Documentos &amp; Anexos ({totalAttached})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cartas profissionais, diplomas, certificados e comprovantes oficiais.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Cartas Profissionais */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" /> Cartas Profissionais
            </h4>
            <div className="space-y-2.5">
              {letterItems.map((letItem) => {
                const item = attachments[letItem.id];
                const isAttached = !!item;

                return (
                  <div
                    key={letItem.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                      isAttached
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-blue-200 bg-blue-50/30'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {letItem.title}
                        </h4>
                        {isAttached ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> PDF Anexado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                            <BookOpen className="w-3 h-3" /> Texto Pronto
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {letItem.subtitle}
                        {item && ` • ${item.fileName} (${item.fileSize || 'Arquivo'})`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {letItem.onReadLetter && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            letItem.onReadLetter!();
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                          title="Ler conteúdo formatado"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ler Carta</span>
                        </button>
                      )}

                      {isAttached ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenView(item);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                            title="Visualizar arquivo anexado"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenAttach(letItem.id, letItem.title, letItem.category)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                            title="Substituir arquivo anexado"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Substituir</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenAttach(letItem.id, letItem.title, letItem.category)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Anexar PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diplomas e Certificações */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Diplomas &amp; Certificações Acadêmicas
            </h4>
            <div className="space-y-2.5">
              {standardItems.map((std) => {
                const item = attachments[std.id];
                const isAttached = !!item;

                return (
                  <div
                    key={std.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isAttached
                        ? 'border-blue-200 bg-blue-50/40'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {std.title}
                        </h4>
                        {isAttached ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Anexado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3" /> Pendente
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {std.subtitle}
                        {item && ` • ${item.fileName} (${item.fileSize || 'Arquivo'})`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isAttached ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenView(item);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenAttach(std.id, std.title, std.category)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                            title="Substituir arquivo"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Substituir</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenAttach(std.id, std.title, std.category)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Anexar</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom attachments */}
          {customItems.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Documentos Extras Adicionados
              </h4>
              <div className="space-y-2">
                {customItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-semibold text-slate-900 truncate">
                        {item.targetTitle}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {item.fileName} • {item.fileSize || 'Arquivo'} • {item.uploadedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenView(item);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Deseja remover ${item.targetTitle}?`)) {
                            onRemove(item.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remover anexo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add extra certificate button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                onOpenAttach(
                  `cert_custom_${Date.now()}`,
                  'Certificado Adicional / Treinamento',
                  'certificacao'
                )
              }
              className="w-full py-2.5 px-4 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-blue-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Anexar Outro Documento ou Certificado</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

