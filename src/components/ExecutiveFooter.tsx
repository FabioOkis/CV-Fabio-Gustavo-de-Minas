import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Mail,
  Phone,
  Printer,
  FileText,
  Award,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface ExecutiveFooterProps {
  onOpenCoverLetter?: () => void;
  onOpenRecommendationLetter?: () => void;
}

export const ExecutiveFooter: React.FC<ExecutiveFooterProps> = ({
  onOpenCoverLetter,
  onOpenRecommendationLetter,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print bg-slate-900 text-slate-300 border-t border-slate-800 mt-12 py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Compliance & Security Badges (ISO 27001 & LGPD) */}
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Conformidade, Governança &amp; Segurança da Informação</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Ambientes de Alta Criticidade &amp; VIP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* ISO 27001 Badge Card */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-100">
                    ISO/IEC 27001 — Segurança da Informação
                  </h4>
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800/60 font-medium">
                    SGSI
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                  Compromisso com os pilares de confidencialidade, integridade e disponibilidade.
                  Experiência na administração de controles de acesso (Active Directory, Entra ID,
                  iManage Data Room) e gestão segura de dados em escritórios de grande porte.
                </p>
              </div>
            </div>

            {/* LGPD Badge Card */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-100">
                    LGPD — Lei Geral de Proteção de Dados
                  </h4>
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                    Lei 13.709/18
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                  Atendimento discreto e consultivo no tratamento de informações sigilosas e dados
                  pessoais sensíveis de executivos, sócios e órgãos públicos (TRT), assegurando
                  conformidade regulatória e boas práticas de privacidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Pills & Links (Responsive & Unbreakable on Mobile) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          {onOpenCoverLetter && (
            <button
              type="button"
              onClick={onOpenCoverLetter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Carta de Apresentação</span>
            </button>
          )}

          {onOpenRecommendationLetter && (
            <button
              type="button"
              onClick={onOpenRecommendationLetter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Carta de Recomendação</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Imprimir Currículo</span>
          </button>
        </div>

        {/* Contact Links & Copyright (No awkward wraps) */}
        <div className="pt-4 border-t border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-200">
              © {currentYear} Fábio Gustavo de Minas
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Analista de Suporte PL — Suporte VIP &amp; Alta Exigência
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:fabiominas@outlook.com"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[11.5px]">fabiominas@outlook.com</span>
            </a>

            <a
              href="tel:+5511954237500"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11.5px]">(11) 95423-7500</span>
            </a>

            <a
              href="https://wa.me/5511954237500"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.linkedin.com/in/fabio-gustavo-de-minas-3951629b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 text-blue-300 border border-slate-700/60 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
