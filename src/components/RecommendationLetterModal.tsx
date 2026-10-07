import React, { useState } from 'react';
import { X, Printer, Copy, Check, Paperclip, Upload, Award, FileCheck, ExternalLink, Eye } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

interface RecommendationLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  pnaAttachment?: AttachmentItem;
  netcenterAttachment?: AttachmentItem;
  isAdmin?: boolean;
  onOpenAttach: () => void;
  onOpenViewAttachment?: (attachment: AttachmentItem) => void;
  onOpenAttachmentsDrawer: () => void;
}

export const RecommendationLetterModal: React.FC<RecommendationLetterModalProps> = ({
  isOpen,
  onClose,
  pnaAttachment,
  netcenterAttachment,
  isAdmin = false,
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
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors ml-1"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-800 text-[13.5px] sm:text-[14px] leading-relaxed flex-1 font-sans">
          <p className="mb-4 text-slate-600">
            Selecione uma das cartas de recomendação abaixo para visualizar o documento original em formato PDF.
          </p>
          
          <div className="flex flex-col gap-3">
            {/* PNA Letter */}
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Pinheiro Neto Advogados</h4>
                  <p className="text-xs text-slate-500">Carta de Recomendação • PDF</p>
                </div>
              </div>
              {pnaAttachment && onOpenViewAttachment && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenViewAttachment(pnaAttachment);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar PDF
                </button>
              )}
            </div>

            {/* NetCenter Letter */}
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">NetCenter</h4>
                  <p className="text-xs text-slate-500">Carta de Referência • PDF</p>
                </div>
              </div>
              {netcenterAttachment && onOpenViewAttachment && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenViewAttachment(netcenterAttachment);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar PDF
                </button>
              )}
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
