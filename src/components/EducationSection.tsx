import React from 'react';
import { EducationItem } from '../types';

interface EducationSectionProps {
  educations: EducationItem[];
  onOpenCert: (key: string) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educations,
  onOpenCert,
}) => {
  return (
    <section id="educacao" aria-labelledby="eyebrow-edu" className="mt-11">
      <p className="terminal-eyebrow" id="eyebrow-edu">
        ls educacao/
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {educations.map((edu, idx) => (
          <article
            key={idx}
            className="border border-[#2E3D52] bg-[#16233B] rounded-md p-4 sm:p-4.5"
          >
            <h3 className="m-0 mb-1 text-[15px] text-[#E7ECEE] font-semibold">
              {edu.certKey ? (
                <button
                  type="button"
                  onClick={() => onOpenCert(edu.certKey!)}
                  className="font-inherit text-[15px] font-semibold text-[#E7ECEE] hover:text-[#4FD1C0] underline underline-offset-4 decoration-[#2E3D52] hover:decoration-[#4FD1C0] cursor-pointer text-left transition-colors"
                  aria-label={`Ver certificado ${edu.degree}`}
                >
                  {edu.degree} ↗
                </button>
              ) : (
                edu.degree
              )}
            </h3>

            <div className="text-[12.5px] text-[#5E7282] font-mono mb-2">
              {edu.institution} · concluído em <time>{edu.year}</time>
            </div>

            <p className="m-0 text-[13.5px] text-[#8FA2B0] leading-relaxed">
              {edu.field}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
