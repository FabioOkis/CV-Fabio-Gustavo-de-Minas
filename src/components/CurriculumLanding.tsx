import React, { useState } from 'react';
import { Paperclip, Eye, Upload, CheckCircle2, Award, GraduationCap, FileText, ShieldCheck, UserPlus, Filter, Sparkles } from 'lucide-react';
import { AttachmentItem } from '../utils/attachmentStorage';
import { CV_DATA_EN } from '../data/cvDataEN';
import { CV_DATA } from '../data/cvData';
import { downloadVCard } from '../utils/vcard';

interface CurriculumLandingProps {
  attachments: Record<string, AttachmentItem>;
  lang?: 'pt' | 'en';
  onOpenAttach: (
    targetId: string,
    targetTitle: string,
    category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta'
  ) => void;
  onOpenView: (attachment: AttachmentItem) => void;
  onOpenCoverLetter?: () => void;
  onOpenRecommendationLetter?: () => void;
  onOpenAttachmentsDrawer?: () => void;
}

export const CurriculumLanding: React.FC<CurriculumLandingProps> = ({
  attachments,
  lang = 'pt',
  onOpenAttach,
  onOpenView,
  onOpenCoverLetter,
  onOpenRecommendationLetter,
  onOpenAttachmentsDrawer,
}) => {
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const totalAttachments = Object.keys(attachments).length;
  const cvContent = lang === 'en' ? CV_DATA_EN : CV_DATA;

  const keyTechSkills = [
    'Active Directory',
    'Microsoft Intune',
    'Entra ID',
    'Microsoft 365',
    'iManage',
    'PowerShell',
    'ITIL',
    'Windows 11',
    'macOS',
    'Data Room',
  ];
  return (
    <div className="w-full max-w-[860px] mx-auto bg-white text-slate-900 shadow-xl sm:rounded-sm border border-slate-200/80 px-6 py-8 sm:px-12 sm:py-12 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-full font-sans">
      {/* ================= HEADER ================= */}
      <header className="text-center pb-3">
        <h1 className="text-xl sm:text-[26px] font-bold tracking-normal text-slate-900 leading-tight uppercase font-sans">
          FÁBIO GUSTAVO DE MINAS
        </h1>

        <p className="italic text-slate-700 text-[13.5px] sm:text-[14.5px] mt-1 font-medium">
          Analista de Suporte PL — Suporte VIP, Executivo &amp; Ambientes Corporativos de Alta Exigência
        </p>

        <address className="not-italic text-slate-600 text-[12.5px] sm:text-[13px] mt-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
          <span>São Paulo, SP</span>
          <span className="text-slate-400">|</span>
          <a
            href="tel:+5511954237500"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            (11) 95423-7500
          </a>
          <span className="text-slate-400">|</span>
          <a
            href="mailto:fabiominas@outlook.com"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            fabiominas@outlook.com
          </a>
          <span className="text-slate-400">|</span>
          <a
            href="https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 hover:underline text-blue-700 font-medium transition-colors"
          >
            linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/
          </a>
        </address>

        {/* Executive Document & Letters Hub (print:hidden) */}
        <div className="mt-4 mb-1 print:hidden w-full max-w-2xl mx-auto">
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs">
            <div className="flex items-center justify-between px-1 mb-2 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Documentos &amp; Cartas Oficiais
              </span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                Acesso imediato para visualização e download
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {/* Carta de Apresentação */}
              {onOpenCoverLetter && (
                <button
                  type="button"
                  onClick={onOpenCoverLetter}
                  className="group w-full inline-flex items-center justify-center sm:justify-start gap-2 px-2.5 py-2 rounded-lg bg-white hover:bg-blue-50/60 text-slate-800 hover:text-blue-900 border border-slate-200/90 hover:border-blue-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  title="Visualizar Carta de Apresentação Profissional"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">Apresentação</span>
                </button>
              )}

              {/* Carta de Recomendação */}
              {onOpenRecommendationLetter && (
                <button
                  type="button"
                  onClick={onOpenRecommendationLetter}
                  className="group w-full inline-flex items-center justify-center sm:justify-start gap-2 px-2.5 py-2 rounded-lg bg-white hover:bg-amber-50/60 text-slate-800 hover:text-amber-900 border border-slate-200/90 hover:border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  title="Visualizar Carta de Recomendação (Pinheiro Neto Advogados)"
                >
                  <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">Recomendação</span>
                </button>
              )}

              {/* Anexos */}
              {onOpenAttachmentsDrawer && (
                <button
                  type="button"
                  onClick={onOpenAttachmentsDrawer}
                  className="group w-full inline-flex items-center justify-center sm:justify-start gap-2 px-2.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  title="Ver diplomas, certificados e anexos"
                >
                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                    <Paperclip className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">Anexos ({totalAttachments})</span>
                </button>
              )}

              {/* Salvar Contato (vCard) */}
              <button
                type="button"
                onClick={downloadVCard}
                className="group w-full inline-flex items-center justify-center sm:justify-start gap-2 px-2.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white border border-amber-600/80 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Salvar vCard direto no celular"
              >
                <div className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Salvar vCard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Divider Line */}
      <hr className="border-t border-slate-700 my-3.5" />

      {/* ================= RESUMO PROFISSIONAL ================= */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase mb-1">
          {lang === 'en' ? 'PROFESSIONAL SUMMARY' : 'RESUMO PROFISSIONAL'}
        </h2>
        <p className="text-[12.5px] sm:text-[13px] text-slate-800 leading-relaxed text-justify">
          {cvContent.summary}
        </p>

        {/* Executive KPI Metric Cards (print:hidden) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 print:hidden">
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs hover:border-blue-300 transition-colors">
            <div className="text-base sm:text-lg font-extrabold text-blue-700 font-mono">19+ Anos</div>
            <div className="text-[10.5px] text-slate-600 font-medium">Experiência em TI</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono">1.500+</div>
            <div className="text-[10.5px] text-slate-600 font-medium">Usuários Suportados</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs hover:border-teal-300 transition-colors">
            <div className="text-base sm:text-lg font-extrabold text-teal-700 font-mono">95%+ SLA</div>
            <div className="text-[10.5px] text-slate-600 font-medium">Resolução &amp; Qualidade</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs hover:border-amber-300 transition-colors">
            <div className="text-base sm:text-lg font-extrabold text-amber-700 font-mono">VIP / Executivo</div>
            <div className="text-[10.5px] text-slate-600 font-medium">Suporte Reservado</div>
          </div>
        </div>
      </section>

      {/* ================= COMPETÊNCIAS TÉCNICAS ================= */}
      <section className="mb-4">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
            {lang === 'en' ? 'TECHNICAL COMPETENCIES' : 'COMPETÊNCIAS TÉCNICAS'}
          </h2>
          {activeSkillFilter && (
            <button
              type="button"
              onClick={() => setActiveSkillFilter(null)}
              className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer print:hidden"
            >
              Limpar filtro ("{activeSkillFilter}") ✕
            </button>
          )}
        </div>
        <hr className="border-t border-slate-300 my-1" />

        {/* Interactive Skill Tags (print:hidden) */}
        <div className="mb-2 print:hidden">
          <div className="text-[10.5px] text-slate-500 font-medium mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-blue-600" />
            <span>Clique em qualquer tecnologia abaixo para filtrar as experiências onde ela foi utilizada:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keyTechSkills.map((skill, idx) => {
              const isActive = activeSkillFilter === skill;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSkillFilter(isActive ? null : skill)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-bold ring-2 ring-blue-300'
                      : 'bg-slate-100 hover:bg-blue-50 text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="list-disc list-outside pl-4 space-y-0.5 text-[12.5px] sm:text-[13px] text-slate-800 leading-normal">
          {cvContent.skillGroups[0].skills.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* ================= COMPETÊNCIAS COMPORTAMENTAIS ================= */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
          {lang === 'en' ? 'BEHAVIORAL COMPETENCIES' : 'COMPETÊNCIAS COMPORTAMENTAIS'}
        </h2>
        <hr className="border-t border-slate-300 my-1" />
        <ul className="list-disc list-outside pl-4 space-y-0.5 text-[12.5px] sm:text-[13px] text-slate-800 leading-normal">
          {cvContent.skillGroups[1].skills.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* ================= EXPERIÊNCIA PROFISSIONAL ================= */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
          {lang === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'EXPERIÊNCIA PROFISSIONAL'}
        </h2>
        <hr className="border-t border-slate-300 my-1" />

        {cvContent.experiences.map((exp) => (
          <div key={exp.id} className="mb-3.5">
            <div className="flex justify-between items-baseline flex-wrap gap-x-2">
              <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900">
                {exp.role}
              </h3>
              <span className="italic text-slate-600 text-[12px] sm:text-[12.5px]">
                {exp.period}
              </span>
            </div>
            <p className="italic text-slate-700 text-[12px] sm:text-[12.5px] mb-1">
              {exp.company}
            </p>
            <ul className="list-disc list-outside pl-4 space-y-0.5 text-[12px] sm:text-[12.5px] text-slate-800 leading-normal">
              {exp.highlights.map((bullet, bIdx) => {
                const isMatch =
                  activeSkillFilter &&
                  bullet.toLowerCase().includes(activeSkillFilter.toLowerCase());
                return (
                  <li
                    key={bIdx}
                    className={
                      isMatch
                        ? 'bg-blue-50/90 border-l-4 border-blue-600 pl-2 py-0.5 my-1 text-blue-950 font-medium rounded-r-md shadow-2xs'
                        : ''
                    }
                  >
                    {bullet}
                    {isMatch && (
                      <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white uppercase tracking-wider">
                        <Sparkles className="w-2.5 h-2.5" /> Relevante: {activeSkillFilter}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Recommendation Letter Quick Button for Pinheiro Neto */}
            {exp.id === 'job-pinheiro-neto' && (
              <div className="no-print flex items-center gap-2 pt-2 flex-wrap">
                {onOpenRecommendationLetter && (
                  <button
                    type="button"
                    onClick={onOpenRecommendationLetter}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-300/80 text-[11.5px] font-semibold transition-all cursor-pointer shadow-2xs"
                    title="Abrir Carta de Recomendação Oficial de Pinheiro Neto Advogados"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Carta de Recomendação Oficial</span>
                  </button>
                )}
                {attachments['carta_recomendacao'] && (
                  <button
                    type="button"
                    onClick={() => onOpenView(attachments['carta_recomendacao'])}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11.5px] font-medium transition-all cursor-pointer shadow-2xs"
                    title="Visualizar documento assinado anexado"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PDF Anexo Assinado</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= FORMAÇÃO ACADÊMICA ================= */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
          FORMAÇÃO ACADÊMICA
        </h2>
        <hr className="border-t border-slate-300 my-1" />

        <div className="space-y-3 pt-0.5 text-[12.5px] sm:text-[13px] text-slate-800">
          {/* MBA Item */}
          <div className="space-y-1">
            <p className="leading-snug">
              <strong className="font-bold text-slate-900">MBA em Gestão de Pessoas</strong> — Ênfase em Liderança e Desenvolvimento de Equipes —{' '}
              <span className="italic text-slate-700">UNINOVE · São Paulo, SP · Concluído em Junho/2018</span>
            </p>

            {/* Attachment Actions (hidden in print) */}
            <div className="no-print flex items-center gap-2 pt-0.5">
              {attachments['mba'] ? (
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenView(attachments['mba'])}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar Diploma / Certificado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAttach(
                        'mba',
                        'MBA em Gestão de Pessoas — UNINOVE (2018)',
                        'diploma'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                    title="Substituir por outro arquivo"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Substituir</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Anexado
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onOpenAttach(
                      'mba',
                      'MBA em Gestão de Pessoas — UNINOVE (2018)',
                      'diploma'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 hover:border-blue-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                  <span>Anexar Diploma (PDF ou Imagem)</span>
                </button>
              )}
            </div>
          </div>

          {/* Redes Item */}
          <div className="space-y-1">
            <p className="leading-snug">
              <strong className="font-bold text-slate-900">Graduação e Pós-Graduação em Redes de Computadores</strong> — Especialização em Infraestrutura e Segurança —{' '}
              <span className="italic text-slate-700">UNINOVE · São Paulo, SP · Concluído em Agosto/2016</span>
            </p>

            {/* Attachment Actions (hidden in print) */}
            <div className="no-print flex items-center gap-2 pt-0.5">
              {attachments['redes'] ? (
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenView(attachments['redes'])}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar Diploma / Certificado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAttach(
                        'redes',
                        'Graduação e Pós-Graduação em Redes — UNINOVE (2016)',
                        'diploma'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                    title="Substituir por outro arquivo"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Substituir</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Anexado
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onOpenAttach(
                      'redes',
                      'Graduação e Pós-Graduação em Redes — UNINOVE (2016)',
                      'diploma'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 hover:border-blue-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                  <span>Anexar Diploma (PDF ou Imagem)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICAÇÕES ================= */}
      <section className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
            CERTIFICAÇÕES
          </h2>
          <button
            type="button"
            onClick={() =>
              onOpenAttach(
                `cert_custom_${Date.now()}`,
                'Certificado Adicional / Treinamento',
                'certificacao'
              )
            }
            className="no-print inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>+ Anexar Outro Certificado</span>
          </button>
        </div>
        <hr className="border-t border-slate-300 my-1" />

        <ul className="space-y-2 text-[12.5px] sm:text-[13px] text-slate-800">
          {/* HDI */}
          <li className="list-disc list-outside ml-4 leading-normal">
            <span>
              HDI Desktop Support Technician — HDI Brasil, 2018 (certificação internacional em suporte técnico e atendimento ao usuário)
            </span>
            <div className="no-print mt-1">
              {attachments['hdi'] ? (
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenView(attachments['hdi'])}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Visualizar Certificado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAttach(
                        'hdi',
                        'HDI Desktop Support Technician — HDI Brasil',
                        'certificacao'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Substituir</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Anexado
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onOpenAttach(
                      'hdi',
                      'HDI Desktop Support Technician — HDI Brasil',
                      'certificacao'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 text-xs font-medium cursor-pointer"
                >
                  <Paperclip className="w-3 h-3 text-blue-600" />
                  <span>Anexar Certificado HDI (PDF ou Imagem)</span>
                </button>
              )}
            </div>
          </li>

          {/* ITIL V3 */}
          <li className="list-disc list-outside ml-4 leading-normal">
            <span>
              ITIL V3 Foundation — Fundação Bradesco, 2017 (fundamentos em gerenciamento estratégico de serviços de TI)
            </span>
            <div className="no-print mt-1">
              {attachments['itil'] ? (
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenView(attachments['itil'])}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Visualizar Certificado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAttach(
                        'itil',
                        'ITIL V3 Foundation — Fundação Bradesco',
                        'certificacao'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Substituir</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Anexado
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onOpenAttach(
                      'itil',
                      'ITIL V3 Foundation — Fundação Bradesco',
                      'certificacao'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 text-xs font-medium cursor-pointer"
                >
                  <Paperclip className="w-3 h-3 text-blue-600" />
                  <span>Anexar Certificado ITIL V3 (PDF ou Imagem)</span>
                </button>
              )}
            </div>
          </li>

          {/* Custom user attached certificates */}
          {Object.values(attachments)
            .filter((item) => item.id.startsWith('cert_custom_'))
            .map((item) => (
              <li key={item.id} className="list-disc list-outside ml-4 leading-normal">
                <span>{item.targetTitle}</span>
                <div className="no-print mt-1 inline-flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenView(item)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Visualizar ({item.fileName})</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Anexado
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </section>

      {/* ================= IDIOMAS ================= */}
      <section>
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 tracking-wide uppercase">
          IDIOMAS
        </h2>
        <hr className="border-t border-slate-300 my-1" />
        <div className="space-y-0.5 text-[12.5px] sm:text-[13px] text-slate-800">
          <p>Inglês Técnico — Nível básico · União Cultural Brasil-Estados Unidos</p>
          <p>Espanhol — Nível básico</p>
        </div>
      </section>
    </div>
  );
};
