import React from 'react';
import { X, Eye, Upload, Trash2, CheckCircle2, AlertCircle, FileText, Plus, Award, BookOpen } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

interface AllAttachmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  attachments: Record<string, AttachmentItem>;
  isAdmin?: boolean;
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
  isAdmin = false,
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
    category: 'diploma' | 'certificacao' | 'curso';
    subtitle: string;
  }[] = [
    {
      id: 'mba',
      title: 'MBA em Gestão de Pessoas',
      category: 'diploma',
      subtitle: 'UNINOVE · 2018 (Diploma Oficial Anexado)',
    },
    {
      id: 'redes',
      title: 'Pós-Graduação em Redes de Computadores',
      category: 'diploma',
      subtitle: 'UNINOVE · 2016 (Diploma Oficial Anexado)',
    },
    {
      id: 'graduacao',
      title: 'Graduação em Redes de Computadores',
      category: 'diploma',
      subtitle: 'UNINOVE (Diploma Oficial Anexado)',
    },
    {
      id: 'hdi',
      title: 'HDI Desktop Support Technician',
      category: 'certificacao',
      subtitle: 'HDI Brasil · 2018 (Certificação Internacional Oficial - PDF)',
    },
    {
      id: 'itil',
      title: 'ITIL V3 Foundation',
      category: 'certificacao',
      subtitle: 'Fundação Bradesco · 2017 (Certificação Oficial - PDF)',
    },
    {
      id: 'itil4',
      title: 'Fundamentos do ITIL 4',
      category: 'certificacao',
      subtitle: 'Green Treinamentos (Certificado Oficial)',
    },
    {
      id: 'ms900',
      title: 'MS-900: Microsoft 365 Fundamentals',
      category: 'certificacao',
      subtitle: 'Green Treinamentos (Bootcamp Oficial Microsoft 365)',
    },
    {
      id: 'senai',
      title: 'Formação Profissional — SENAI',
      category: 'curso',
      subtitle: 'SENAI (Certificado de Formação Profissional)',
    },
    {
      id: 'cert_redes',
      title: 'Especialização em Redes de Computadores',
      category: 'certificacao',
      subtitle: 'Certificado de Especialização em Redes',
    },
  ];

  const customItems = Object.values(attachments).filter(
    (item) => item.id.startsWith('cert_custom_') || item.id.startsWith('doc_custom_')
  );

  const totalAttached = Object.keys(attachments).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden text-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200/90 bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Central de Documentos &amp; Anexos</span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300">
                  {totalAttached} {totalAttached === 1 ? 'item' : 'itens'}
                </span>
              </h3>
              <p className="text-xs text-slate-300/80 mt-0.5">
                Cartas profissionais, diplomas, certificados e comprovantes oficiais.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar central"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          {/* Cartas Profissionais */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" /> Cartas Profissionais
              </h4>
            </div>
            <div className="space-y-3">
              {letterItems.map((letItem) => {
                const item = attachments[letItem.id];
                const isAttached = !!item;

                return (
                  <div
                    key={letItem.id}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs hover:shadow-md ${
                      isAttached
                        ? 'border-emerald-200/90 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/30 hover:border-emerald-300'
                        : 'border-blue-200/90 bg-gradient-to-r from-blue-50/50 via-white to-slate-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {letItem.title}
                        </h4>
                        {isAttached ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            PDF Anexado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-blue-800 bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 rounded-full">
                            <BookOpen className="w-3 h-3 text-blue-600" /> Texto Pronto
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1 leading-snug">
                        {letItem.subtitle}
                        {item && (
                          <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                            📄 {item.fileName} ({item.fileSize || 'PDF'})
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {letItem.onReadLetter && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            letItem.onReadLetter!();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300/90 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:border-slate-400 active:scale-95"
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/25 border border-blue-400/30 transition-all cursor-pointer active:scale-95"
                            title="Visualizar arquivo anexado"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver PDF</span>
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenAttach(letItem.id, letItem.title, letItem.category)
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 text-xs font-medium transition-colors cursor-pointer active:scale-95"
                              title="Substituir arquivo anexado"
                            >
                              <Upload className="w-3.5 h-3.5 text-slate-500" />
                              <span className="hidden sm:inline">Substituir</span>
                            </button>
                          )}
                        </>
                      ) : isAdmin ? (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenAttach(letItem.id, letItem.title, letItem.category)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/25 border border-blue-400/30 transition-all cursor-pointer active:scale-95"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Anexar PDF</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diplomas e Certificações */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Diplomas &amp; Certificações Acadêmicas
            </h4>
            <div className="space-y-3">
              {standardItems.map((std) => {
                const item = attachments[std.id];
                const isAttached = !!item;

                return (
                  <div
                    key={std.id}
                    className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs hover:shadow-md ${
                      isAttached
                        ? 'border-blue-200/90 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30 hover:border-blue-300'
                        : 'border-slate-200/90 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {std.title}
                        </h4>
                        {isAttached ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Anexado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-amber-800 bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Pendente
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1 leading-snug">
                        {std.subtitle}
                        {item && (
                          <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                            📄 {item.fileName} ({item.fileSize || 'Arquivo'})
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isAttached ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenView(item);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/25 border border-blue-400/30 transition-all cursor-pointer active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver</span>
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenAttach(std.id, std.title, std.category)
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 text-xs font-medium transition-colors cursor-pointer active:scale-95"
                              title="Substituir arquivo"
                            >
                              <Upload className="w-3.5 h-3.5 text-slate-500" />
                              <span className="hidden sm:inline">Substituir</span>
                            </button>
                          )}
                        </>
                      ) : isAdmin ? (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenAttach(std.id, std.title, std.category)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-blue-50/80 text-blue-700 border border-blue-300 hover:border-blue-400 text-xs font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Anexar</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom attachments */}
          {customItems.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Documentos Extras Adicionados
              </h4>
              <div className="space-y-3">
                {customItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-blue-200/90 bg-gradient-to-r from-blue-50/50 via-white to-slate-50 flex items-center justify-between gap-3 shadow-2xs hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-bold text-slate-900 truncate">
                        {item.targetTitle}
                      </h5>
                      <p className="text-[11.5px] text-slate-500 font-mono mt-0.5 truncate">
                        📄 {item.fileName} • {item.fileSize || 'Arquivo'} • {item.uploadedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenView(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/25 border border-blue-400/30 transition-all cursor-pointer active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver</span>
                        </button>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Deseja remover ${item.targetTitle}?`)) {
                                onRemove(item.id);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remover anexo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add extra certificate button - admin only */}
          {isAdmin && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() =>
                  onOpenAttach(
                    `cert_custom_${Date.now()}`,
                    'Certificado Adicional / Treinamento',
                    'certificacao'
                  )
                }
                className="w-full py-3 px-4 border-2 border-dashed border-blue-300/80 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/80 rounded-xl text-xs font-bold text-blue-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Anexar Outro Documento ou Certificado</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200/90 bg-white shrink-0">
          <span className="text-[11.5px] text-slate-500 font-medium hidden sm:inline">
            🔒 Documentos armazenados localmente e criptografados.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300/80 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer active:scale-95 ml-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

