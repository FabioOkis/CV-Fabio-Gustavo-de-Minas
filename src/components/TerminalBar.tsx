import React from 'react';
import { Terminal, Printer, FileCode, Download, TerminalSquare } from 'lucide-react';

interface TerminalBarProps {
  onOpenRawScript: () => void;
  onPrint: () => void;
  cliOpen: boolean;
  onToggleCli: () => void;
}

export const TerminalBar: React.FC<TerminalBarProps> = ({
  onOpenRawScript,
  onPrint,
  cliOpen,
  onToggleCli,
}) => {
  return (
    <div className="bg-[#16233B] border-b border-[#2E3D52] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none rounded-t-lg">
      {/* Left: Window dots and terminal prompt title */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#64748b] inline-block opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#b45309] inline-block opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#047857] inline-block opacity-70" />
        </div>

        <div className="font-mono text-xs text-[#5E7282] tracking-wide flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#4FD1C0]" />
          <span>fabio@infra</span>
          <span className="text-[#3E4F64]">~</span>
          <span className="text-[#8FA2B0]">curriculo.sh</span>
        </div>
      </div>

      {/* Right: Quick action buttons */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={onToggleCli}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
            cliOpen
              ? 'bg-[#1E3A37] text-[#4FD1C0] border-[#4FD1C0]'
              : 'border-[#2E3D52] text-[#8FA2B0] hover:text-[#E7ECEE] hover:border-[#4FD1C0]'
          }`}
          title="Abrir terminal interativo"
        >
          <TerminalSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">CLI Shell</span>
        </button>

        <button
          type="button"
          onClick={onOpenRawScript}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2E3D52] text-[#8FA2B0] hover:text-[#E7ECEE] hover:border-[#4FD1C0] transition-colors cursor-pointer"
          title="Ver script shell (.sh)"
        >
          <FileCode className="w-3.5 h-3.5 text-[#4FD1C0]" />
          <span className="hidden sm:inline">curriculo.sh</span>
        </button>

        <a
          href="/curriculo-standalone.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2E3D52] text-[#8FA2B0] hover:text-[#E7ECEE] hover:border-[#4FD1C0] transition-colors"
          title="Abrir versão HTML autônoma"
        >
          <Download className="w-3.5 h-3.5 text-[#E3A857]" />
          <span className="hidden md:inline">HTML Autônomo</span>
        </a>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2E3D52] text-[#8FA2B0] hover:text-[#E7ECEE] hover:border-[#4FD1C0] transition-colors cursor-pointer"
          title="Imprimir ou Salvar como PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / PDF</span>
        </button>
      </div>
    </div>
  );
};
