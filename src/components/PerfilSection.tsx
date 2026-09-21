import React from 'react';

interface PerfilSectionProps {
  summary: string;
}

export const PerfilSection: React.FC<PerfilSectionProps> = ({ summary }) => {
  return (
    <section id="perfil" aria-labelledby="eyebrow-perfil" className="mt-11">
      <p className="terminal-eyebrow" id="eyebrow-perfil">
        cat perfil.txt
      </p>
      <p className="font-sans text-[15.5px] text-[#8FA2B0] leading-relaxed max-w-[68ch]">
        {summary}
      </p>
    </section>
  );
};
