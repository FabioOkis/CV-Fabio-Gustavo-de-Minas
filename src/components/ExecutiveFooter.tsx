import React, { useState, useEffect, useRef } from 'react';
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
  UserPlus,
  Eye,
  Globe,
} from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

// ─── Global Visit Counter ───────────────────────────────────────────────────
const GLOBAL_KEY = 'cv-fabio-minas-views';
const CACHE_KEY = 'cv_global_visits_cache';
const SESSION_KEY = 'cv_global_visit_counted';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

function getCachedCount(): number {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}
// ────────────────────────────────────────────────────────────────────────────

interface ExecutiveFooterProps {
  onOpenCoverLetter?: () => void;
  onOpenRecommendationLetter?: () => void;
  isAdmin?: boolean;
  onRequestAdmin?: () => void;
}

export const ExecutiveFooter: React.FC<ExecutiveFooterProps> = ({
  onOpenCoverLetter,
  onOpenRecommendationLetter,
  isAdmin = false,
  onRequestAdmin: _onRequestAdmin,
}) => {
  const currentYear = new Date().getFullYear();
  const [visitCount, setVisitCount] = useState<number>(() => getCachedCount());
  const [showVisitPop, setShowVisitPop] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowVisitPop(false);
      }
    }
    if (showVisitPop) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVisitPop]);

  useEffect(() => {
    let isMounted = true;

    async function recordVisit() {
      try {
        const hasSessionCounted = sessionStorage.getItem(SESSION_KEY);
        // Only increment once per session; page refreshes fetch current count
        const endpoint = hasSessionCounted ? 'get' : 'hit';
        const res = await fetch(`${API_BASE}/${endpoint}/${GLOBAL_KEY}`, {
          cache: 'no-store',
        });

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value === 'number') {
            if (isMounted) {
              setVisitCount(data.value);
            }
            try {
              localStorage.setItem(CACHE_KEY, String(data.value));
              sessionStorage.setItem(SESSION_KEY, 'true');
            } catch {
              // ignore storage errors
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Contador global: falha ao sincronizar online, usando cache.', err);
      }

      // Fallback local se a API estiver temporariamente inacessível
      const cached = getCachedCount();
      if (cached > 0 && isMounted) {
        setVisitCount(cached);
      }
    }

    recordVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdminSetCount = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const promptVal = window.prompt(
      'Definir número global de visitas:',
      String(visitCount)
    );
    if (!promptVal) return;
    const num = parseInt(promptVal.trim(), 10);
    if (isNaN(num) || num < 0) {
      alert('Por favor, informe um número válido maior ou igual a zero.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/set/${GLOBAL_KEY}?value=${num}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        const finalVal = typeof data.value === 'number' ? data.value : num;
        setVisitCount(finalVal);
        localStorage.setItem(CACHE_KEY, String(finalVal));
        alert(`Contador atualizado para ${finalVal.toLocaleString('pt-BR')} visitas!`);
      } else {
        alert('Erro ao atualizar contador no servidor.');
      }
    } catch {
      alert('Falha na conexão com o servidor de contagem.');
    }
  };

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
              href="https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 text-blue-300 border border-slate-700/60 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={downloadVCard}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/70 hover:bg-amber-900/90 text-amber-300 border border-amber-800/60 transition-colors whitespace-nowrap cursor-pointer"
              title="Baixar vCard / Salvar contato"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>vCard</span>
            </button>

            {/* Visit Counter Button */}
            <div className="relative inline-flex" ref={popoverRef}>
              <button
                type="button"
                onClick={() => setShowVisitPop(v => !v)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-950/70 hover:bg-violet-900/80 text-violet-300 border border-violet-800/60 transition-colors whitespace-nowrap cursor-pointer group"
                title="Visitas ao currículo (Acessos globais em tempo real)"
              >
                <Eye className="w-3.5 h-3.5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                <span className="font-mono tabular-nums font-semibold">
                  {visitCount > 0 ? visitCount.toLocaleString('pt-BR') : '...'}
                </span>
                <span className="hidden sm:inline text-[10px] text-violet-400/80 font-normal">visitas</span>
              </button>

              {/* Tooltip Popover */}
              {showVisitPop && (
                <div
                  className="absolute bottom-full mb-2 right-0 z-50 w-56 rounded-xl bg-slate-900 border border-violet-800/60 shadow-2xl p-3 text-left animate-in fade-in slide-in-from-bottom-1 duration-150"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1.5 border-b border-violet-900/50">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-[11px] font-bold text-violet-200 uppercase tracking-wide">
                        Acessos Globais
                      </span>
                    </div>
                    <span className="flex h-2 w-2 relative" title="Sincronizado">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Este currículo recebeu
                    <span className="mx-1 font-mono font-bold text-violet-300">
                      {visitCount.toLocaleString('pt-BR')}
                    </span>
                    {visitCount === 1 ? 'visita' : 'visitas'} no total.
                  </p>

                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Contagem sincronizada em nuvem (agregando acessos de todos os dispositivos e locais).
                  </p>

                  {isAdmin && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[9.5px] text-amber-400/90 font-mono">Modo Admin</span>
                      <button
                        type="button"
                        onClick={handleAdminSetCount}
                        className="text-[10px] px-2 py-0.5 rounded bg-violet-900/60 hover:bg-violet-800 text-violet-200 border border-violet-700/60 cursor-pointer transition-colors"
                      >
                        Ajustar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
