import React, { useState, useRef } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';

interface InteractiveCliProps {
  onRunCommand: (cmd: string) => void;
  activeCommandLog: { command: string; output: string; timestamp: string }[];
}

const SUGGESTED_COMMANDS = [
  'whoami',
  'cat perfil.txt',
  'skills --list',
  'tail -f experiencia.log',
  'ls educacao/',
  'ls certificados/',
  'ls cursos/',
  'locale --list',
  'clear',
  'help',
];

export const InteractiveCli: React.FC<InteractiveCliProps> = ({
  onRunCommand,
  activeCommandLog,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    onRunCommand(trimmed);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = SUGGESTED_COMMANDS.find((cmd) => cmd.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="border border-[#2E3D52] bg-[#16233B] rounded-lg p-4 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-[#2E3D52] text-[#8FA2B0]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#4FD1C0]" />
          <span className="font-semibold text-[#E7ECEE]">Terminal Interativo</span>
          <span className="text-[#5E7282]">|</span>
          <span className="text-[#5E7282] text-[11px]">Digite comandos ou clique nos atalhos</span>
        </div>
      </div>

      {/* Suggested Command Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {SUGGESTED_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => onRunCommand(cmd)}
            className="px-2 py-0.5 rounded text-[11px] bg-[#0A1122] hover:bg-[#1E3A37] text-[#4FD1C0] hover:text-[#E7ECEE] border border-[#2E3D52] hover:border-[#4FD1C0] transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Recent dynamic command logs if any */}
      {activeCommandLog.length > 0 && (
        <div className="mb-3 space-y-2 max-h-56 overflow-y-auto pr-1">
          {activeCommandLog.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-[#0A1122] border border-[#2E3D52] text-xs"
            >
              <div className="flex items-center justify-between text-[#8FA2B0] mb-1 pb-1 border-b border-[#2E3D52]/60 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#4FD1C0]">fabio@infra</span>
                  <span className="text-[#5E7282]">:</span>
                  <span className="text-[#8FA2B0]">~</span>
                  <span className="text-[#5E7282]">$</span>
                  <span className="text-[#E7ECEE] font-bold">{item.command}</span>
                </div>
                <span className="text-[10px] text-[#5E7282]">{item.timestamp}</span>
              </div>
              <pre className="text-[#8FA2B0] whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed">
                {item.output}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Interactive prompt input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-semibold shrink-0 select-none">
          <span className="text-[#4FD1C0]">fabio@infra</span>
          <span className="text-[#5E7282]">:~$</span>
        </div>

        <div className="relative flex-1">
          <input
            id="terminal-interactive-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="digite um comando (ex: whoami, skills, clear, help)..."
            className="w-full bg-[#0A1122] border border-[#2E3D52] focus:border-[#4FD1C0] rounded px-3 py-1.5 text-xs text-[#E7ECEE] placeholder:text-[#5E7282] focus:outline-none font-mono transition-all"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <button
          type="submit"
          id="btn-submit-command"
          className="px-3 py-1.5 rounded bg-[#1E3A37]/50 hover:bg-[#1E3A37] border border-[#4FD1C0]/60 text-[#4FD1C0] text-xs font-medium flex items-center gap-1 transition-all cursor-pointer shrink-0"
        >
          <span>Executar</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
