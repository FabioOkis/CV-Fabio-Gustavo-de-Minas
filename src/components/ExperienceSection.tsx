import React, { useState } from 'react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [showAllJobs, setShowAllJobs] = useState(false);

  const visibleJobs = experiences.filter((j) => !j.hiddenByDefault || showAllJobs);
  const hiddenCount = experiences.filter((j) => j.hiddenByDefault).length;

  return (
    <section id="experiencia" aria-labelledby="eyebrow-exp" className="mt-11">
      <p className="terminal-eyebrow" id="eyebrow-exp">
        tail -f experiencia.log
      </p>

      <div className="space-y-0">
        {visibleJobs.map((job) => (
          <article
            key={job.id}
            className="job-item"
            aria-label={`${job.role} na ${job.company}`}
          >
            <span className="job-marker" aria-hidden="true" />

            <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5 mb-1.5">
              <span className="text-[16.5px] font-semibold text-[#E7ECEE]">
                {job.role}
                {job.current && (
                  <span className="font-mono text-[10.5px] font-medium text-[#4FD1C0] border border-[#2C5850] bg-[rgba(79,209,192,0.08)] px-1.5 py-0.5 rounded ml-2 align-middle tracking-[0.03em]">
                    ● atual
                  </span>
                )}
              </span>

              <span className="text-[14px] text-[#8FA2B0]">
                {job.company}
              </span>

              <span className="font-mono text-[11.5px] text-[#5E7282] border border-[#2E3D52] bg-[#16233B]/50 rounded px-2 py-0.5 ml-auto">
                {job.period}
              </span>
            </div>

            <ul className="mt-2 pl-4.5 space-y-1 list-disc marker:text-[#4FD1C0]">
              {job.highlights.map((highlight, idx) => (
                <li key={idx} className="text-[#8FA2B0] text-[14.5px] leading-relaxed">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Toggle button: Exibir todo o histórico (somente se houver cargos ocultos) */}
      {hiddenCount > 0 && (
        <div className="mt-2 pl-[22px]">
          <button
            onClick={() => setShowAllJobs((prev) => !prev)}
            className="inline-flex items-center gap-2 font-mono text-[12.5px] text-[#4FD1C0] bg-transparent border border-[#1E3A37] hover:border-[#4FD1C0] hover:bg-[rgba(79,209,192,0.08)] rounded px-3.5 py-1.5 cursor-pointer transition-colors duration-200"
            aria-expanded={showAllJobs}
          >
            <span className={`text-[10px] transition-transform duration-250 ${showAllJobs ? 'rotate-180' : ''}`}>
              ▼
            </span>
            <span>{showAllJobs ? 'Recolher histórico' : 'Exibir todo o histórico'}</span>
            {!showAllJobs && (
              <span className="text-[#5E7282]">(+{hiddenCount} cargos)</span>
            )}
          </button>
        </div>
      )}
    </section>
  );
};
