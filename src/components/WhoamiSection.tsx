import React, { useMemo } from 'react';
import { ContactInfo } from '../types';

interface WhoamiSectionProps {
  contact: ContactInfo;
}

export const WhoamiSection: React.FC<WhoamiSectionProps> = ({ contact }) => {
  // Uptime dynamic calculation (from earliest career date Nov 2007 to now)
  const uptimeText = useMemo(() => {
    const startDate = new Date(2007, 10, 1); // Nov 2007
    const now = new Date();
    const totalDays = Math.round((now.getTime() - startDate.getTime()) / 86400000);
    const years = Math.floor(totalDays / 365.25);
    const remDays = totalDays - Math.floor(years * 365.25);
    const months = Math.floor(remDays / 30.44);
    return `${years}a ${months}m em operação contínua`;
  }, []);

  return (
    <header className="mb-10" id="section-whoami">
      {/* Prompt Line */}
      <div className="font-mono text-[13px] text-[#8FA2B0] mb-5 select-none" aria-hidden="true">
        <span className="text-[#4FD1C0]">fabio@infra</span>:~$ whoami
        <span className="animate-cursor-block inline-block w-2 h-3.5 bg-[#4FD1C0] ml-1 align-[-2px]" />
      </div>

      {/* Hero row: Avatar + Name + Role */}
      <div className="flex items-start gap-5 sm:gap-6 mb-6">
        {/* Avatar with Status Indicator */}
        <div className="relative shrink-0 w-20 h-20 sm:w-[84px] sm:h-[84px]">
          <img
            src="/assets/img/foto-fabio.jpg"
            alt={`Foto de ${contact.name}`}
            width={84}
            height={84}
            className="w-full h-full rounded-full object-cover block border-2 border-[#2E3D52] shadow-lg shadow-black/50"
            loading="eager"
            onError={(e) => {
              // fallback if local image is loading
              (e.currentTarget as HTMLImageElement).src = 'http://72.60.250.170:3012/assets/img/foto-fabio.jpg';
            }}
          />
          {/* LED status indicator on avatar corner */}
          <span
            className="absolute right-0.5 bottom-0.5 w-3.5 h-3.5 rounded-full bg-[#E3A857] border-2 border-[#10192C] shadow-[0_0_6px_#E3A857] animate-led"
            title="Status: Em atividade"
          />
        </div>

        {/* Hero text */}
        <div className="flex-1 min-w-0">
          <h1 className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl tracking-[-0.01em] text-[#E7ECEE] m-0 mb-1.5 leading-tight">
            {contact.name}
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] text-[#8FA2B0] m-0 leading-relaxed max-w-2xl">
            {contact.role}
          </p>
        </div>
      </div>

      {/* Status Widget */}
      <div
        className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 sm:gap-y-2.5 items-start sm:items-center border border-[#2E3D52] bg-[#16233B] rounded-md px-3.5 py-3 sm:px-4.5 sm:py-3.5 mb-6 font-mono text-[12px] sm:text-[12.5px] max-w-full"
        role="status"
        aria-label="Status profissional"
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
          <span className="inline-flex items-center gap-1.5 shrink-0">
            <span
              className="inline-block w-2 h-2 rounded-full bg-[#E3A857] shadow-[0_0_8px_#E3A857] animate-led shrink-0"
              aria-hidden="true"
            />
            <span className="text-[#5E7282] uppercase tracking-[0.06em] text-[10.5px]">Status</span>
          </span>
          <span className="text-[#E7ECEE] font-medium break-normal">{contact.status}</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
          <span className="text-[#5E7282] uppercase tracking-[0.06em] text-[10.5px] shrink-0">Tempo em operação</span>
          <span className="text-[#4FD1C0] font-medium break-normal">{uptimeText}</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
          <span className="text-[#5E7282] uppercase tracking-[0.06em] text-[10.5px] shrink-0">Base</span>
          <span className="text-[#E7ECEE] break-normal">{contact.location}</span>
        </div>
      </div>

      {/* Contact Row */}
      <address className="not-italic flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12.5px] text-[#E7ECEE]">
        <a
          href={`tel:+55${contact.phone.replace(/\D/g, '')}`}
          className="text-[#E7ECEE] hover:text-[#4FD1C0] transition-colors flex items-center gap-1.5"
          aria-label={`Telefone: ${contact.phone}`}
        >
          <span>☎</span> <span>{contact.phone}</span>
        </a>

        <a
          href={`mailto:${contact.email}`}
          className="text-[#E7ECEE] hover:text-[#4FD1C0] transition-colors flex items-center gap-1.5"
          aria-label={`E-mail: ${contact.email}`}
        >
          <span>✉</span> <span>{contact.email}</span>
        </a>

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4FD1C0] hover:underline flex items-center gap-1"
          aria-label="Perfil no LinkedIn (abre em nova aba)"
        >
          <span>↗</span> <span>linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/</span>
        </a>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E7ECEE] hover:text-[#4FD1C0] transition-colors flex items-center gap-1.5"
          aria-label="WhatsApp"
        >
          <span>💬</span> <span>WhatsApp</span>
        </a>

        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E7ECEE] hover:text-[#4FD1C0] transition-colors flex items-center gap-1.5"
          aria-label="GitHub"
        >
          <span>🐙</span> <span>github.com/fabiominas</span>
        </a>
      </address>
    </header>
  );
};
