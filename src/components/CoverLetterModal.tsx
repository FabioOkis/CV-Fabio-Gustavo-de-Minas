import React, { useState } from 'react';
import { X, Printer, Copy, Check, Paperclip, Upload, FileText, Download } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  attachment?: AttachmentItem;
  onOpenAttach: () => void;
  onOpenViewAttachment?: (attachment: AttachmentItem) => void;
  onOpenAttachmentsDrawer: () => void;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
  attachment,
  onOpenAttach,
  onOpenViewAttachment,
  onOpenAttachmentsDrawer,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const letterBody = `FÁBIO GUSTAVO DE MINAS
Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência
São Paulo, SP | (11) 95423-7500 | fabiominas@outlook.com | linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/

À Atenção da Equipe de Recrutamento e Gestores de Tecnologia da Informação,

Prezados(as) Senhores(as),

Apresento minha candidatura para oportunidades na área de Suporte de TI Pleno / Suporte Executivo & VIP. Trago uma trajetória de mais de 19 anos de sólida experiência em ambientes corporativos de alta criticidade e confidencialidade, tendo atuado com destaque em grandes escritórios de advocacia do país — como Pinheiro Guimarães Advogados e Pinheiro Neto Advogados — além de órgãos do setor público (TRT 2ª Região).

Ao longo da minha carreira, especializei-me no atendimento consultivo e reservado a usuários de alto perfil (sócios, diretores e conselheiros), nos quais o tempo de resposta, o sigilo e a assertividade técnica são fatores mandatórios. Possuo domínio prático no ecossistema Microsoft 365 (SharePoint, Exchange, Teams, OneDrive), administração de usuários e políticas em Active Directory e Entra ID (Azure AD), gestão de dispositivos móveis corporativos (MDM) via Microsoft Intune e segurança com Microsoft Defender.

Além da gestão de plataformas jurídicas especializadas como o iManage e administração de Data Rooms para transações financeiras e auditorias, aplico na rotina operacional as melhores práticas de governança de TI fundamentadas no ITIL v3 e HDI Desktop Support Technician, sempre com foco em melhoria contínua dos índices de SLA e mitigação de reincidências de chamados através de diagnósticos de causa raiz e scripts em PowerShell.

Minha formação inclui MBA em Gestão de Pessoas (com ênfase em Liderança e Desenvolvimento de Equipes) e Pós-Graduação em Redes de Computadores pela UNINOVE, proporcionando uma visão ampla que alia rigor técnico à capacidade de comunicação interpessoal empática e clara com stakeholders.

Coloco-me à inteira disposição para uma entrevista na qual poderei detalhar como minha experiência, ética e dedicação podem contribuir imediatamente para os objetivos de sua organização.

Agradeço pela atenção e consideração.

Atenciosamente,

Fábio Gustavo de Minas
(11) 95423-7500 | fabiominas@outlook.com
São Paulo, SP`;

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
          <title>Carta de Apresentação — Fábio Gustavo de Minas</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 20px; font-weight: bold; margin-bottom: 2px; text-transform: uppercase; }
            .subtitle { font-style: italic; color: #475569; font-size: 13px; margin-bottom: 12px; }
            .contact { font-size: 12px; color: #64748b; border-bottom: 1px solid #0f172a; padding-bottom: 12px; margin-bottom: 24px; }
            p { font-size: 13.5px; margin-bottom: 16px; text-align: justify; }
            .signature { margin-top: 36px; }
          </style>
        </head>
        <body>
          <h1>FÁBIO GUSTAVO DE MINAS</h1>
          <div class="subtitle">Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência</div>
          <div class="contact">São Paulo, SP | (11) 95423-7500 | fabiominas@outlook.com | linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/</div>
          
          <p><strong>À Atenção da Equipe de Recrutamento e Gestores de Tecnologia da Informação,</strong></p>
          <p>Prezados(as) Senhores(as),</p>
          <p>Apresento minha candidatura para oportunidades na área de Suporte de TI Pleno / Suporte Executivo & VIP. Trago uma trajetória de mais de 19 anos de sólida experiência em ambientes corporativos de alta criticidade e confidencialidade, tendo atuado com destaque em grandes escritórios de advocacia do país — como Pinheiro Guimarães Advogados e Pinheiro Neto Advogados — além de órgãos do setor público (TRT 2ª Região).</p>
          <p>Ao longo da minha carreira, especializei-me no atendimento consultivo e reservado a usuários de alto perfil (sócios, diretores e conselheiros), nos quais o tempo de resposta, o sigilo e a assertividade técnica são fatores mandatórios. Possuo domínio prático no ecossistema Microsoft 365 (SharePoint, Exchange, Teams, OneDrive), administração de usuários e políticas em Active Directory e Entra ID (Azure AD), gestão de dispositivos móveis corporativos (MDM) via Microsoft Intune e segurança com Microsoft Defender.</p>
          <p>Além da gestão de plataformas jurídicas especializadas como o iManage e administração de Data Rooms para transações financeiras e auditorias, aplico na rotina operacional as melhores práticas de governança de TI fundamentadas no ITIL v3 e HDI Desktop Support Technician, sempre com foco em melhoria contínua dos índices de SLA e mitigação de reincidências de chamados através de diagnósticos de causa raiz e scripts em PowerShell.</p>
          <p>Minha formação inclui MBA em Gestão de Pessoas (com ênfase em Liderança e Desenvolvimento de Equipes) e Pós-Graduação em Redes de Computadores pela UNINOVE, proporcionando uma visão ampla que alia rigor técnico à capacidade de comunicação interpessoal empática e clara com stakeholders.</p>
          <p>Coloco-me à inteira disposição para uma entrevista na qual poderei detalhar como minha experiência, ética e dedicação podem contribuir imediatamente para os objetivos de sua organização.</p>
          <p>Agradeço pela atenção e consideração.</p>
          
          <div class="signature">
            <p>Atenciosamente,</p>
            <p><strong>Fábio Gustavo de Minas</strong><br>
            Analista de Suporte PL<br>
            (11) 95423-7500 | fabiominas@outlook.com</p>
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
      aria-labelledby="cover-letter-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="min-w-0 pr-3">
            <h3 id="cover-letter-title" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
              Carta de Apresentação Profissional
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Fábio Gustavo de Minas • Analista de Suporte PL &amp; Suporte VIP
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
              title="Imprimir Carta de Apresentação"
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

        {/* Attachment Banner if attached */}
        {attachment && (
          <div className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-emerald-50/95 via-teal-50/70 to-slate-50 border-b border-emerald-200/80 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-800 shrink-0 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-emerald-600/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
                <Paperclip className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">
                <strong className="text-slate-900 font-bold">Arquivo original anexado:</strong>{' '}
                <span className="font-medium text-slate-700">{attachment.fileName}</span>{' '}
                <span className="text-[11px] text-slate-500 font-mono">({attachment.fileSize || 'PDF'})</span>
              </span>
            </div>
            {onOpenViewAttachment && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenViewAttachment(attachment);
                }}
                className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 text-white font-semibold text-[11.5px] shadow-sm shadow-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-100 group-hover:text-white transition-colors" />
                <span className="tracking-tight">Ver Arquivo Anexo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse ml-0.5" />
              </button>
            )}
          </div>
        )}

        {/* Letter Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-800 text-[13.5px] sm:text-[14px] leading-relaxed flex-1 font-sans">
          {/* Letterhead */}
          <div className="border-b border-slate-700 pb-3 mb-5">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight">
              FÁBIO GUSTAVO DE MINAS
            </h1>
            <p className="italic text-slate-600 text-xs sm:text-[13px] mt-0.5">
              Analista de Suporte PL — Suporte VIP, Executivo &amp; Ambientes Corporativos de Alta Exigência
            </p>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-2">
              <span>São Paulo, SP</span>
              <span>•</span>
              <span>(11) 95423-7500</span>
              <span>•</span>
              <span>fabiominas@outlook.com</span>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/
              </a>
            </div>
          </div>

          <p className="font-semibold text-slate-900">
            À Atenção da Equipe de Recrutamento e Gestores de Tecnologia da Informação,
          </p>

          <p>
            Prezados(as) Senhores(as),
          </p>

          <p className="text-justify">
            Apresento minha candidatura para oportunidades na área de <strong>Suporte de TI Pleno / Suporte Executivo &amp; VIP</strong>. Trago uma trajetória de <strong>mais de 19 anos de sólida experiência</strong> em ambientes corporativos de alta criticidade e confidencialidade, tendo atuado com destaque em grandes escritórios de advocacia do país — como <strong>Pinheiro Guimarães Advogados</strong> e <strong>Pinheiro Neto Advogados</strong> — além de órgãos do setor público (TRT 2ª Região).
          </p>

          <p className="text-justify">
            Ao longo da minha carreira, especializei-me no atendimento consultivo e reservado a usuários de alto perfil (sócios, diretores e conselheiros), nos quais o tempo de resposta, o sigilo e a assertividade técnica são fatores mandatórios. Possuo domínio prático no ecossistema <strong>Microsoft 365</strong> (SharePoint, Exchange, Teams, OneDrive), administração de usuários e políticas em <strong>Active Directory</strong> e <strong>Entra ID (Azure AD)</strong>, gestão de dispositivos móveis corporativos (MDM) via <strong>Microsoft Intune</strong> e segurança com <strong>Microsoft Defender</strong>.
          </p>

          <p className="text-justify">
            Além da gestão de plataformas jurídicas especializadas como o <strong>iManage</strong> e administração de <strong>Data Rooms</strong> para transações financeiras e auditorias, aplico na rotina operacional as melhores práticas de governança de TI fundamentadas no <strong>ITIL v3</strong> e certificação <strong>HDI Desktop Support Technician</strong>, sempre com foco em melhoria contínua dos índices de SLA e mitigação de reincidências de chamados através de diagnósticos de causa raiz e scripts em <strong>PowerShell</strong>.
          </p>

          <p className="text-justify">
            Minha formação inclui <strong>MBA em Gestão de Pessoas</strong> (com ênfase em Liderança e Desenvolvimento de Equipes) e <strong>Pós-Graduação em Redes de Computadores</strong> pela UNINOVE, proporcionando uma visão ampla que alia rigor técnico à capacidade de comunicação interpessoal empática e clara com stakeholders e membros de equipe.
          </p>

          <p className="text-justify">
            Coloco-me à inteira disposição para uma entrevista na qual poderei detalhar como minha experiência, ética e dedicação podem contribuir imediatamente para os objetivos de sua organização.
          </p>

          <p>Agradeço pela atenção e consideração.</p>

          <div className="pt-4 border-t border-slate-200 mt-6">
            <p className="text-slate-600 text-xs">Atenciosamente,</p>
            <p className="font-bold text-slate-900 text-sm mt-1">Fábio Gustavo de Minas</p>
            <p className="text-xs text-slate-600">Analista de Suporte PL</p>
            <p className="text-xs text-slate-500">(11) 95423-7500 • fabiominas@outlook.com</p>
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
              <span>{attachment ? 'Substituir Documento (PDF)' : 'Anexar PDF da Carta'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAttachmentsDrawer();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Ver Todos os Anexos</span>
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
