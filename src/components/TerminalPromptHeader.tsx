import React from 'react';

interface TerminalPromptHeaderProps {
  command: string;
  args?: string;
  timestamp?: string;
}

export const TerminalPromptHeader: React.FC<TerminalPromptHeaderProps> = ({
  command,
  args,
  timestamp,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-sm py-1 border-b border-slate-800/80 mb-3 text-slate-300">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-emerald-400 font-semibold">fabio@infra</span>
        <span className="text-slate-500">:</span>
        <span className="text-sky-400">~</span>
        <span className="text-slate-400">$</span>
        <span className="text-yellow-300 font-bold">{command}</span>
        {args && <span className="text-purple-300">{args}</span>}
      </div>
      {timestamp && (
        <span className="text-[11px] text-slate-500 select-none">
          [{timestamp}]
        </span>
      )}
    </div>
  );
};
