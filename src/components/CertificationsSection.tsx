import React, { useState } from 'react';
import { CertificationItem, CourseItem, LanguageItem } from '../types';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  onOpenCert: (key: string) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  courses,
  languages,
  onOpenCert,
}) => {
  const [showAllCourses, setShowAllCourses] = useState(false);

  const visibleCourses = courses.filter((c) => !c.hiddenByDefault || showAllCourses);
  const hiddenCoursesCount = courses.filter((c) => c.hiddenByDefault).length;

  return (
    <>
      {/* Seção: Certificados */}
      <section id="certificados" aria-labelledby="eyebrow-certs" className="mt-11">
        <p className="terminal-eyebrow" id="eyebrow-certs">
          ls certificados/
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <article
              key={cert.title}
              className="border border-[#2E3D52] bg-[#16233B] rounded-md p-4 sm:p-4.5"
            >
              {cert.year && (
                <span className="inline-block font-mono text-[10.5px] text-[#E3A857] border border-[#4A3C24] bg-[rgba(227,168,87,0.08)] px-1.5 py-0.5 rounded mb-2 tracking-[0.03em]">
                  {cert.year}
                </span>
              )}

              <h3 className="m-0 mb-1 text-[15px] font-semibold text-[#E7ECEE]">
                {cert.title}
              </h3>

              <div className="text-[12.5px] text-[#5E7282] font-mono mb-2">
                {cert.issuer}
              </div>

              <ul className="mt-1.5 pl-4 space-y-1 list-disc marker:text-[#4FD1C0]">
                {cert.details.map((detail, idx) => (
                  <li key={idx} className="text-[13.5px] text-[#8FA2B0] leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Seção: Cursos Profissionalizantes (se existirem) */}
      {courses.length > 0 && (
        <section id="cursos" aria-labelledby="eyebrow-cursos" className="mt-11">
          <p className="terminal-eyebrow" id="eyebrow-cursos">
            ls cursos/
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleCourses.map((course, idx) => (
              <article
                key={idx}
                className="border border-[#2E3D52] bg-[#16233B] rounded-md p-4 sm:p-4.5"
              >
                <h3 className="m-0 mb-1 text-[15px] font-semibold text-[#E7ECEE]">
                  {course.certKey ? (
                    <button
                      type="button"
                      onClick={() => onOpenCert(course.certKey!)}
                      className="font-inherit text-[15px] font-semibold text-[#E7ECEE] hover:text-[#4FD1C0] underline underline-offset-4 decoration-[#2E3D52] hover:decoration-[#4FD1C0] cursor-pointer text-left transition-colors"
                      aria-label={`Ver certificado ${course.title} (Imagem)`}
                    >
                      {course.title} ↗
                    </button>
                  ) : (
                    course.title
                  )}
                </h3>

                <div className="text-[12.5px] text-[#5E7282] font-mono mb-2">
                  {course.issuer}
                </div>

                <p className="m-0 text-[13.5px] text-[#8FA2B0] leading-relaxed">
                  {course.description}
                </p>
              </article>
            ))}
          </div>

          {/* Toggle Cursos */}
          {hiddenCoursesCount > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowAllCourses((prev) => !prev)}
                className="inline-flex items-center gap-2 font-mono text-[12.5px] text-[#4FD1C0] bg-transparent border border-[#1E3A37] hover:border-[#4FD1C0] hover:bg-[rgba(79,209,192,0.08)] rounded px-3.5 py-1.5 cursor-pointer transition-colors duration-200"
                aria-expanded={showAllCourses}
              >
                <span
                  className={`text-[10px] transition-transform duration-250 ${
                    showAllCourses ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
                <span>{showAllCourses ? 'Recolher histórico' : 'Exibir todo o histórico'}</span>
                {!showAllCourses && (
                  <span className="text-[#5E7282]">(+{hiddenCoursesCount} cursos)</span>
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Seção: Idiomas */}
      <section id="idiomas" aria-labelledby="eyebrow-lang" className="mt-11">
        <p className="terminal-eyebrow" id="eyebrow-lang">
          locale --list
        </p>

        <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Idiomas">
          {languages.map((lang) => (
            <li
              key={lang.name}
              className="font-mono text-[12.5px] text-[#E7ECEE] border border-[#2E3D52] bg-[#16233B] px-2.5 py-1.5 rounded"
            >
              {lang.name} — {lang.level}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
