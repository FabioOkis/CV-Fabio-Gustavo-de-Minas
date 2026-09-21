import React from 'react';
import { SkillGroup } from '../types';

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillGroups }) => {
  return (
    <section id="habilidades" aria-labelledby="eyebrow-skills" className="mt-11">
      <p className="terminal-eyebrow" id="eyebrow-skills">
        skills --list
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="border border-[#2E3D52] bg-[#16233B] rounded-md p-4 sm:p-5"
          >
            <h3 className="font-mono text-[12px] text-[#4FD1C0] uppercase tracking-[0.06em] mb-3.5 font-semibold flex items-center gap-2">
              <span className="text-[#5E7282]">#</span>
              <span>{group.title}</span>
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0" aria-label={`Habilidades de ${group.title}`}>
              {group.skills.map((skill, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13.5px] sm:text-[14px] leading-relaxed text-[#E7ECEE]"
                >
                  <span className="text-[#4FD1C0] select-none shrink-0 mt-0.5">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
