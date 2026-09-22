import React, { useState } from 'react';
import {
  Printer,
  Paperclip,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  FileText,
  Award,
  Menu,
  X,
  UserPlus,
  Globe,
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { downloadVCard } from '../utils/vcard';

interface ExecutiveHeaderBarProps {
  totalAttachments: number;
  lang?: 'pt' | 'en';
  onToggleLang?: () => void;
  onOpenAttachmentsDrawer: () => void;
  onOpenCoverLetter: () => void;
  onOpenRecommendationLetter: () => void;
}

export const ExecutiveHeaderBar: React.FC<ExecutiveHeaderBarProps> = ({
  totalAttachments,
  lang = 'pt',
  onToggleLang,
  onOpenAttachmentsDrawer,
  onOpenCoverLetter,
  onOpenRecommendationLetter,
}) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = `FÁBIO GUSTAVO DE MINAS
Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência
São Paulo, SP | (11) 95423-7500 | fabiominas@outlook.com | linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/

RESUMO PROFISSIONAL
${CV_DATA.summary}

COMPETÊNCIAS TÉCNICAS
• Windows 11, macOS e dispositivos móveis (iOS/iPadOS, Android)
• Microsoft Intune, Entra ID (Azure AD), Microsoft Defender — MDM e gestão de dispositivos corporativos
• Active Directory
• Microsoft 365 (SharePoint, Teams, OneDrive, Exchange) e iManage
• PowerShell (nível intermediário) para automação e troubleshooting
• Ferramentas de ITSM/Service Desk e acesso remoto
• ITIL v3 — Governança de TI, gestão de incidentes e SLA e HDI technical support
• iManage — Administração de Data Room e compartilhamento seguro de documentos confidenciais
• Gestão de backup, inventário de ativos e documentação técnica

COMPETÊNCIAS COMPORTAMENTAIS
• Atendimento consultivo a usuários de alto perfil, com discrição e confidencialidade
• Comunicação técnica clara com usuários e stakeholders
• Senso de urgência e priorização em ambientes de alta pressão
• Resolução de problemas complexos e análise de causa raiz
• Organização, disciplina e produção de documentação técnica

EXPERIÊNCIA PROFISSIONAL
Consultor de Suporte II (Jan/2026 – Atual)
Netcenter — alocado em Pinheiro Guimarães Advogados · São Paulo, SP
• Responsável pelo suporte de segundo nível e administração de TI no escritório Pinheiro Guimarães Advogados.
• Administração de usuários, acessos, grupos e políticas de segurança no Active Directory e no ecossistema Microsoft 365.
• Gestão e suporte avançado ao iManage, sistema de gerenciamento de documentos jurídicos.
• Administração de ambientes de Data Room para compartilhamento seguro de documentos em auditorias e transações financeiras.
• Execução e monitoramento de rotinas críticas de TI: backup, inventário e documentação técnica.
• Diagnóstico e resolução de problemas de hardware, software, redes e impressão.

Analista de Suporte Pleno (Ago/2018 – Out/2025)
Pinheiro Neto Advogados · São Paulo, SP
• Liderança no suporte técnico especializado em ambiente de alta criticidade e confidencialidade.
• Implementação de soluções proativas para problemas recorrentes.
• Administração do Active Directory e Microsoft 365 para mais de 1.500 usuários.

Analista de Ticket Manage (Ago/2018 – Ago/2019)
Grupo Cimcorp — alocado no TRT 2ª Região · São Paulo, SP
• Gerenciamento de chamados de 1º e 2º níveis com 95% de cumprimento de SLAs.
• Redução de 20% no tempo de resolução de tickets recorrentes.
• Suporte a sistemas críticos do tribunal.

FORMAÇÃO ACADÊMICA
• MBA em Gestão de Pessoas — Ênfase em Liderança e Desenvolvimento de Equipes — UNINOVE · São Paulo, SP · Concluído em Junho/2018
• Graduação e Pós-Graduação em Redes de Computadores — Especialização em Infraestrutura e Segurança — UNINOVE · São Paulo, SP · Concluído em Agosto/2016

CERTIFICAÇÕES
• HDI Desktop Support Technician — HDI Brasil, 2018
• ITIL V3 Foundation — Fundação Bradesco, 2017

IDIOMAS
• Inglês Técnico — Nível básico · União Cultural Brasil-Estados Unidos
• Espanhol — Nível básico`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full bg-slate-900/98 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between relative">
        {/* Left identity */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-slate-100 truncate flex items-center gap-1.5 sm:gap-2">
              <span className="truncate">Fábio Gustavo de Minas</span>
              <span className="hidden xl:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-950/70 border border-blue-800/80 text-blue-300 font-normal">
                Currículo Executivo
              </span>
            </h1>
            <p className="text-[10.5px] sm:text-[11px] text-slate-400 truncate hidden lg:block">
              Analista de Suporte PL — Suporte VIP &amp; Alta Exigência
            </p>
          </div>
        </div>

        {/* Centered Action Buttons for Desktop (Positioned to clear left identity) */}
        <div className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2 absolute left-[55%] -translate-x-1/2 pointer-events-auto">
          {/* Anexos button */}
          <button
            type="button"
            onClick={onOpenAttachmentsDrawer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            title="Ver e gerenciar diplomas e certificados anexados"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Anexos</span>
            <span className="bg-blue-800 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {totalAttachments}
            </span>
          </button>


          {/* Imprimir / PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden lg:inline">Imprimir / PDF</span>
          </button>

          {/* Copiar texto */}
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            title="Copiar texto formatado do currículo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline text-emerald-300">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden lg:inline">Copiar</span>
              </>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5511954237500"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition-colors"
            title="Conversar no WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            title="Abrir perfil no LinkedIn"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>

          {/* Language Switcher */}
          {onToggleLang && (
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              title="Alternar Idioma (PT / EN)"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[11px] text-blue-300">{lang === 'en' ? 'EN' : 'PT'}</span>
            </button>
          )}
        </div>

        {/* Right actions - Mobile View */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0 ml-auto">
          {/* Anexos Quick Button on Mobile */}
          <button
            type="button"
            onClick={onOpenAttachmentsDrawer}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ver anexos"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Anexos</span>
            <span className="bg-blue-800 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {totalAttachments}
            </span>
          </button>

          {/* Menu / Ações Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              mobileMenuOpen
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            aria-label="Abrir menu de ações executivas"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Fechar</span>
              </>
            ) : (
              <>
                <Menu className="w-3.5 h-3.5 text-blue-400" />
                <span>Ações</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Actions Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 backdrop-blur-lg px-4 py-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Ações &amp; Cartas Oficiais</span>
            <span className="text-[10px] text-blue-400 font-normal">Fábio Gustavo de Minas</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2.5">
            {/* Carta de Apresentação */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCoverLetter();
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-left transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-blue-900/60 border border-blue-700/60 text-blue-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-100 truncate">Apresentação</div>
                <div className="text-[10px] text-slate-400 truncate">Carta oficial</div>
              </div>
            </button>

            {/* Carta de Recomendação */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecommendationLetter();
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-left transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-amber-900/60 border border-amber-700/60 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-100 truncate">Recomendação</div>
                <div className="text-[10px] text-slate-400 truncate">Pinheiro Neto (7a)</div>
              </div>
            </button>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handlePrint();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-teal-400" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleCopyText();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Currículo</span>
                </>
              )}
            </button>
          </div>

          {/* External Links */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <a
              href="https://wa.me/5511954237500"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
