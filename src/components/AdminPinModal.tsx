import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  LogOut,
  CheckCircle,
} from 'lucide-react';
import { checkAdminPin } from '../utils/attachmentStorage';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onSuccess: () => void;
  onLogout: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onSuccess,
  onLogout,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setShowPin(false);
      setShake(false);
      if (!isAdmin) {
        // Auto-focus input when opened in non-admin mode
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, isAdmin]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPin(pin.trim())) {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl p-6 text-slate-100 overflow-hidden ${
          shake ? 'animate-bounce' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {isAdmin ? (
          /* Logged In (Admin Active) View */
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
              <Unlock className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-1.5">
              <span>Modo Administrador Ativo</span>
            </h3>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Você está autenticado. Os botões de upload, substituição e remoção de documentos e cartas estão liberados.
            </p>

            <div className="w-full p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-5 text-left flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11.5px] text-slate-300">
                <span className="font-semibold text-white">Privilégios liberados:</span>
                <ul className="mt-1 space-y-0.5 text-slate-400 text-[11px] list-disc list-inside">
                  <li>Upload e alteração de diplomas e certificados</li>
                  <li>Atualização de cartas e documentos oficiais</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col w-full gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-semibold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Encerrar Sessão de Administrador</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          /* PIN Input View */
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 shadow-lg shadow-blue-500/10">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Acesso Administrativo
            </h3>

            <p className="text-xs text-slate-400 text-center mb-5 leading-relaxed">
              Digite o PIN de segurança para gerenciar anexos, diplomas e documentos oficiais do currículo.
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>

                  <input
                    ref={inputRef}
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Digite o PIN de segurança"
                    maxLength={10}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-800/90 border text-slate-100 placeholder-slate-500 text-sm tracking-widest focus:outline-none transition-all ${
                      error
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    aria-label={showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                  >
                    {showPin ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {error && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>PIN incorreto. Tente novamente.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={!pin.trim()}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Acessar</span>
                </button>
              </div>
            </form>

            <div className="mt-5 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span>Proteção de integridade documental</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
