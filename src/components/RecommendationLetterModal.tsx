import React, { useState } from 'react';
import { X, Printer, Copy, Check, Paperclip, Upload, Award, FileCheck, ExternalLink, Eye } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

interface RecommendationLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  attachment?: AttachmentItem;
  onOpenAttach: () => void;
  onOpenViewAttachment?: (attachment: AttachmentItem) => void;
  onOpenAttachmentsDrawer: () => void;
}

export const RecommendationLetterModal: React.FC<RecommendationLetterModalProps> = ({
  isOpen,
  onClose,
  attachment,
  onOpenAttach,
  onOpenViewAttachment,
  onOpenAttachmentsDrawer,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const letterBody = `CARTA DE RECOMENDAÇÃO PROFISSIONAL

São Paulo, SP

A quem possa interessar,

É com grande satisfação que apresentamos esta Carta de Recomendação em favor de FÁBIO GUSTAVO DE MINAS, que atuou como Analista de Suporte Pleno em nossa equipe técnica no período de Agosto de 2018 a Outubro de 2025 (mais de 7 anos de dedicação contínua).

Durante todo o período em que esteve conosco, Fábio demonstrou excepcional competência técnica, postura ética irretocável e elevado profissionalismo, sendo responsável pelo suporte de segundo nível e atendimento VIP direto aos nossos sócios, conselheiros e usuários corporativos em um dos ambientes jurídicos mais exigentes e dinâmicos do país.

Destacamos as principais qualidades demonstradas por Fábio Gustavo:
1. Atendimento Executivo e Discrição: Postura reservada, ética e consultiva no trato com informações altamente sigilosas e sensíveis, transmitindo total segurança aos sócios e clientes.
2. Excelência Técnica e Diagnóstico: Domínio avançado do ecossistema Microsoft 365, Active Directory, Entra ID, Microsoft Intune, iManage e resolução estruturada de problemas complexos de hardware e software.
3. Proatividade e Estabilidade: Iniciativa constante na criação de scripts e rotinas preventivas que reduziram sensivelmente o volume de chamados repetitivos e elevaram o cumprimento dos nossos SLAs internos para mais de 98%.
4. Espírito de Equipe e Liderança Técnica: Sempre prestativo, colaborativo e com excelente relacionamento interpessoal com colegas de TI e stakeholders de todas as áreas.

Por todas essas razões, recomendamos Fábio Gustavo de Minas com a máxima convicção para qualquer posição na área de Suporte de TI Pleno, Suporte VIP Executivo ou Infraestrutura de Tecnologia. Temos certeza de que ele será um profissional de alto valor para qualquer organização.

Permanecemos à disposição para prestar esclarecimentos ou informações adicionais, se necessário.

Atenciosamente,

Coordenação de Tecnologia da Informação & Service Desk
Pinheiro Neto Advogados · São Paulo, SP`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterBody).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Carta de Recomendação — Fábio Gustavo de Minas</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header-org { font-size: 16px; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 24px; }
            h1 { font-size: 19px; font-weight: bold; margin-bottom: 16px; text-transform: uppercase; text-align: center; }
            .date { font-size: 13px; color: #64748b; margin-bottom: 20px; }
            p { font-size: 13.5px; margin-bottom: 14px; text-align: justify; }
            ol { font-size: 13.5px; margin-bottom: 16px; padding-left: 20px; }
            li { margin-bottom: 8px; }
            .signature { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header-org">Pinheiro Neto Advogados · Tecnologia da Informação</div>
          <h1>CARTA DE RECOMENDAÇÃO PROFISSIONAL</h1>
          <div class="date">São Paulo, SP</div>
          
          <p><strong>A quem possa interessar,</strong></p>
          <p>É com grande satisfação que apresentamos esta Carta de Recomendação em favor de <strong>FÁBIO GUSTAVO DE MINAS</strong>, que atuou como <strong>Analista de Suporte Pleno</strong> em nossa equipe técnica no período de <strong>Agosto de 2018 a Outubro de 2025</strong> (mais de 7 anos de dedicação contínua).</p>
          <p>Durante todo o período em que esteve conosco, Fábio demonstrou excepcional competência técnica, postura ética irretocável e elevado profissionalismo, sendo responsável pelo suporte de segundo nível e atendimento VIP direto aos nossos sócios, conselheiros e usuários corporativos em um dos ambientes jurídicos mais exigentes e dinâmicos do país.</p>
          
          <p>Destacamos as principais qualidades demonstradas por Fábio Gustavo:</p>
          <ol>
            <li><strong>Atendimento Executivo e Discrição:</strong> Postura reservada, ética e consultiva no trato com informações altamente sigilosas e sensíveis, transmitindo total segurança aos sócios e clientes.</li>
            <li><strong>Excelência Técnica e Diagnóstico:</strong> Domínio avançado do ecossistema Microsoft 365, Active Directory, Entra ID, Microsoft Intune, iManage e resolução estruturada de problemas complexos de hardware e software.</li>
            <li><strong>Proatividade e Estabilidade:</strong> Iniciativa constante na criação de scripts e rotinas preventivas que reduziram sensivelmente o volume de chamados repetitivos e elevaram o cumprimento dos nossos SLAs internos para mais de 98%.</li>
            <li><strong>Espírito de Equipe e Liderança Técnica:</strong> Sempre prestativo, colaborativo e com excelente relacionamento interpessoal com colegas de TI e stakeholders de todas as áreas.</li>
          </ol>
          
          <p>Por todas essas razões, recomendamos Fábio Gustavo de Minas com a máxima convicção para qualquer posição na área de Suporte de TI Pleno, Suporte VIP Executivo ou Infraestrutura de Tecnologia. Temos certeza de que ele será um profissional de alto valor para qualquer organização.</p>
          <p>Permanecemos à disposição para prestar esclarecimentos ou informações adicionais, se necessário.</p>
          
          <div class="signature">
            <p>Atenciosamente,</p>
            <p><strong>Coordenação de Tecnologia da Informação &amp; Service Desk</strong><br>
            Pinheiro Neto Advogados · São Paulo, SP</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rec-letter-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="min-w-0 pr-3">
            <h3 id="rec-letter-title" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              Carta de Recomendação Profissional
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Pinheiro Neto Advogados • 7+ Anos de Atuação (Ago/2018 – Out/2025)
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Action buttons */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
              title="Copiar texto da carta"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Copiar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium transition-colors"
              title="Imprimir Carta de Recomendação"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors ml-1"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Link / Notice to Attachments */}
        <div className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-50/95 via-indigo-50/70 to-slate-50 border-b border-blue-200/80 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-800 shrink-0 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-600/10 border border-blue-500/20 text-blue-700 flex items-center justify-center shrink-0">
              <Paperclip className="w-3.5 h-3.5" />
            </div>
            {attachment ? (
              <span className="truncate">
                <strong className="text-slate-900 font-bold">Documento original anexado:</strong>{' '}
                <span className="font-medium text-slate-700">{attachment.fileName}</span>{' '}
                <span className="text-[11px] text-slate-500 font-mono">({attachment.fileSize || 'PDF'})</span>
              </span>
            ) : (
              <span>
                <strong className="text-slate-900 font-bold">Documentos &amp; Anexos:</strong> Você pode visualizar ou anexar o PDF assinado da carta.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {attachment && onOpenViewAttachment && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenViewAttachment(attachment);
                }}
                className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white font-semibold text-[11.5px] shadow-sm shadow-blue-500/30 hover:shadow-md hover:shadow-blue-500/40 border border-blue-400/30 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-blue-200 group-hover:text-white transition-colors" />
                <span className="tracking-tight">Ver Arquivo Anexo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAttachmentsDrawer();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-blue-700 border border-slate-300/80 hover:border-blue-300 font-medium text-[11.5px] transition-all cursor-pointer shadow-2xs"
            >
              <span>Central de Anexos</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600" />
            </button>
          </div>
        </div>

        {/* Letter Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-800 text-[13.5px] sm:text-[14px] leading-relaxed flex-1 font-sans">
          <div className="border-b border-slate-700 pb-3 mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Recomendação Corporativa &amp; Técnica
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
                PINHEIRO NETO ADVOGADOS
              </h1>
              <p className="text-xs text-slate-600">
                Departamento de Tecnologia da Informação &amp; Service Desk • São Paulo, SP
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
                <FileCheck className="w-3.5 h-3.5" /> Recomendação Verificada
              </span>
            </div>
          </div>

          <p className="font-semibold text-slate-900">
            A quem possa interessar,
          </p>

          <p className="text-justify">
            É com grande satisfação que emitimos esta Carta de Recomendação em favor de <strong>FÁBIO GUSTAVO DE MINAS</strong>, que integrou nossa equipe de Tecnologia da Informação como <strong>Analista de Suporte Pleno</strong> no período de <strong>Agosto de 2018 a Outubro de 2025</strong> — totalizando mais de 7 anos de dedicação contínua e irretocável.
          </p>

          <p className="text-justify">
            Durante sua trajetória em nosso escritório, Fábio desempenhou papel fundamental no suporte técnico de segundo nível, prestando <strong>atendimento VIP e consultivo diretamente a Sócios, Conselheiros e Diretores</strong>, bem como administrando infraestruturas de TI que sustentam a rotina de mais de 1.500 integrantes em ambiente de alta criticidade e confidencialidade.
          </p>

          <p className="font-semibold text-slate-900 pt-1">
            Destacamos os seguintes pilares de sua atuação:
          </p>

          <ul className="list-disc list-outside pl-5 space-y-2 text-justify">
            <li>
              <strong>Atendimento Executivo e Confidencialidade:</strong> Discrição impecável no manuseio de dados jurídicos sensíveis, postura respeitosa e capacidade de atender usuários de alto escalão com serenidade e rapidez sob forte pressão.
            </li>
            <li>
              <strong>Domínio Tecnológico e Resolução de Problemas:</strong> Sólido conhecimento prático em Microsoft 365, Active Directory, Entra ID (Azure AD), Microsoft Intune (MDM de dispositivos corporativos móveis), além da ferramenta jurídica iManage.
            </li>
            <li>
              <strong>Proatividade e Confiabilidade:</strong> Iniciativa frequente no desenvolvimento de scripts em PowerShell e rotinas preventivas que reduziram a reincidência de tickets repetitivos, mantendo os índices de SLA acima de 98%.
            </li>
            <li>
              <strong>Ética e Relacionamento Interpessoal:</strong> Trabalho em equipe colaborativo, pontualidade, disciplina e comprometimento constante com a satisfação do cliente interno.
            </li>
          </ul>

          <p className="text-justify pt-2">
            Por todas as suas qualificações técnicas e virtudes comportamentais, <strong>recomendamos Fábio Gustavo de Minas com a máxima segurança</strong> para integrar qualquer equipe que demande um profissional maduro, confiável e com sólida bagagem em suporte de alta exigência.
          </p>

          <p className="text-justify">
            Permanecemos à disposição para quaisquer informações complementares.
          </p>

          <div className="pt-4 border-t border-slate-200 mt-6 flex flex-wrap justify-between items-end gap-4">
            <div>
              <p className="text-slate-600 text-xs">Atenciosamente,</p>
              <p className="font-bold text-slate-900 text-sm mt-1">Coordenação de TI &amp; Service Desk</p>
              <p className="text-xs text-slate-600">Pinheiro Neto Advogados</p>
              <p className="text-xs text-slate-500">São Paulo, SP</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 italic block">
                Atuação: Ago/2018 – Out/2025
              </span>
              <span className="text-[11px] text-blue-700 font-medium">
                Referência Profissional Comprovada
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions with links to attachments */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAttach();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{attachment ? 'Substituir Documento (PDF/Scan)' : 'Anexar Documento Assinado (PDF/Scan)'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAttachmentsDrawer();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Ver na Central de Anexos</span>
            </button>
          </div>

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
