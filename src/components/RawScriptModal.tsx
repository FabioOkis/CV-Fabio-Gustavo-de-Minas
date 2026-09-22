import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Code2, ExternalLink } from 'lucide-react';

interface RawScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RAW_BASH_SCRIPT = `#!/usr/bin/env bash
# ==============================================================================
# curriculo.sh - Fábio Gustavo de Minas
# Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência
# ==============================================================================

set -e

# Cores ANSI
RESET='\\033[0m'
BOLD='\\033[1m'
GREEN='\\033[38;2;74;222;128m'
CYAN='\\033[38;2;56;189;248m'
PURPLE='\\033[38;2;192;132;252m'
YELLOW='\\033[38;2;251;191;36m'
GRAY='\\033[38;2;148;163;184m'
WHITE='\\033[38;2;248;250;252m'

clear
echo -e "\${CYAN}======================================================================\${RESET}"
echo -e "\${GREEN}\${BOLD}  fabio@infra ~ curriculo.sh\${RESET}"
echo -e "\${GRAY}  Host: infra-corp-prod | Uptime: 19+ anos | Status: ONLINE\${RESET}"
echo -e "\${CYAN}======================================================================\${RESET}"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ whoami\${RESET}"
echo -e "\${WHITE}\${BOLD}FÁBIO GUSTAVO DE MINAS\${RESET}"
echo -e "\${CYAN}Cargo: \${WHITE}Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência\${RESET}"
echo -e "\${GRAY}Localização: \${WHITE}São Paulo, SP | 19+ anos de experiência\${RESET}"
echo ""
echo -e "\${PURPLE}[CONTATOS & LINKS]\${RESET}"
echo -e "  \${GREEN}WhatsApp:\${RESET} https://wa.me/5511954237500"
echo -e "  \${CYAN}Telefone:\${RESET} (11) 95423-7500 (tel:11954237500)"
echo -e "  \${YELLOW}E-mail:\${RESET}   fabiominas@outlook.com (mailto:fabiominas@outlook.com)"
echo -e "  \${CYAN}LinkedIn:\${RESET} https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/"
echo -e "  \${PURPLE}GitHub:\${RESET}   https://github.com/fabiominas"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ cat perfil.txt\${RESET}"
echo -e "\${WHITE}Analista de TI com mais de 19 anos de experiência em suporte técnico e infraestrutura"
echo -e "para ambientes corporativos de alta criticidade e confidencialidade, incluindo grandes escritórios"
echo -e "de advocacia e órgãos públicos. Atuação consultiva e discreta no atendimento a usuários de alto perfil,"
echo -e "com domínio de ecossistema Windows, Apple (macOS/iOS) e gestão de dispositivos móveis via Microsoft"
echo -e "Intune e Entra ID (Azure AD), Active Directory, Microsoft 365, Microsoft Defender, PowerShell e"
echo -e "governança de TI (ITIL), com histórico de suporte a empresas com mais de 1.100 integrantes e"
echo -e "melhoria contínua de SLAs.\${RESET}"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ skills --list\${RESET}"
echo -e "\${GREEN}● COMPETÊNCIAS TÉCNICAS:\${RESET}"
echo -e "  • Windows 11, macOS e dispositivos móveis (iOS/iPadOS, Android)"
echo -e "  • Microsoft Intune, Entra ID (Azure AD), Microsoft Defender — MDM e gestão de dispositivos corporativos"
echo -e "  • Active Directory"
echo -e "  • Microsoft 365 (SharePoint, Teams, OneDrive, Exchange) e iManage"
echo -e "  • PowerShell (nível intermediário) para automação e troubleshooting"
echo -e "  • Ferramentas de ITSM/Service Desk e acesso remoto"
echo -e "  • ITIL v3 — Governança de TI, gestão de incidentes e SLA e HDI technical support"
echo -e "  • iManage — Administração de Data Room e compartilhamento seguro de documentos confidenciais"
echo -e "  • Gestão de backup, inventário de ativos e documentação técnica"
echo ""
echo -e "\${CYAN}● COMPETÊNCIAS COMPORTAMENTAIS:\${RESET}"
echo -e "  • Atendimento consultivo a usuários de alto perfil, com discrição e confidencialidade"
echo -e "  • Comunicação técnica clara com usuários e stakeholders"
echo -e "  • Senso de urgência e priorização em ambientes de alta pressão"
echo -e "  • Resolução de problemas complexos e análise de causa raiz"
echo -e "  • Organização, disciplina e produção de documentação técnica"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ tail -f experiencia.log\${RESET}"
echo -e "  \${GREEN}[Jan/2026 – Atual]\${RESET} \${WHITE}\${BOLD}Netcenter — alocado em Pinheiro Guimarães Advogados · São Paulo, SP\${RESET}"
echo -e "  \${CYAN}  Cargo: Consultor de Suporte II\${RESET}"
echo -e "  \${GRAY}  • Responsável pelo suporte de segundo nível e administração de TI no escritório Pinheiro Guimarães Advogados.\${RESET}"
echo -e "  \${GRAY}  • Administração de usuários, acessos, grupos e políticas de segurança no Active Directory e no ecossistema Microsoft 365 (SharePoint, Teams, OneDrive e Exchange).\${RESET}"
echo -e "  \${GRAY}  • Gestão e suporte avançado ao iManage, sistema de gerenciamento de documentos jurídicos, garantindo organização e confidencialidade de peças e processos.\${RESET}"
echo -e "  \${GRAY}  • Administração de ambientes de Data Room para compartilhamento seguro de documentos em auditorias e transações financeiras.\${RESET}"
echo -e "  \${GRAY}  • Execução e monitoramento de rotinas críticas de TI: políticas de backup, inventário de ativos e documentação técnica para usuários.\${RESET}"
echo -e "  \${GRAY}  • Diagnóstico e resolução de problemas de hardware, software, redes e impressão, com interface direta a fornecedores para demandas complexas.\${RESET}"
echo ""
echo -e "  \${CYAN}[Ago/2018 – Out/2025]\${RESET} \${WHITE}\${BOLD}Pinheiro Neto Advogados · São Paulo, SP\${RESET}"
echo -e "  \${CYAN}  Cargo: Analista de Suporte Pleno\${RESET}"
echo -e "  \${GRAY}  • Liderança no suporte técnico especializado em um dos maiores escritórios de advocacia do Brasil, em ambiente de alta criticidade e confidencialidade.\${RESET}"
echo -e "  \${GRAY}  • Implementação de soluções proativas para problemas recorrentes, reduzindo o volume de chamados repetitivos.\${RESET}"
echo -e "  \${GRAY}  • Administração do Active Directory e Microsoft 365, garantindo acesso seguro e ininterrupto para mais de 1.500 usuários.\${RESET}"
echo ""
echo -e "  \${YELLOW}[Ago/2018 – Ago/2019]\${RESET} \${WHITE}\${BOLD}Grupo Cimcorp — alocado no TRT 2ª Região · São Paulo, SP\${RESET}"
echo -e "  \${CYAN}  Cargo: Analista de Ticket Manage\${RESET}"
echo -e "  \${GRAY}  • Gerenciamento de chamados de 1º e 2º níveis para o Tribunal Regional do Trabalho, com 95% de cumprimento de SLAs.\${RESET}"
echo -e "  \${GRAY}  • Melhoria na documentação de soluções, resultando em redução de 20% no tempo de resolução de tickets recorrentes.\${RESET}"
echo -e "  \${GRAY}  • Suporte remoto e presencial a sistemas críticos do tribunal, minimizando impactos operacionais em períodos de pico.\${RESET}"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ ls educacao/\${RESET}"
echo -e "  • MBA em Gestão de Pessoas — Ênfase em Liderança e Desenvolvimento de Equipes — UNINOVE · São Paulo, SP · Concluído em Junho/2018"
echo -e "  • Graduação e Pós-Graduação em Redes de Computadores — Especialização em Infraestrutura e Segurança — UNINOVE · São Paulo, SP · Concluído em Agosto/2016"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ ls certificacoes/\${RESET}"
echo -e "  • HDI Desktop Support Technician — HDI Brasil, 2018 (certificação internacional em suporte técnico e atendimento ao usuário)"
echo -e "  • ITIL V3 Foundation — Fundação Bradesco, 2017 (fundamentos em gerenciamento estratégico de serviços de TI)"
echo ""

echo -e "\${YELLOW}\${BOLD}fabio@infra:~$ locale --list\${RESET}"
echo -e "  • Inglês Técnico — Nível básico · União Cultural Brasil-Estados Unidos"
echo -e "  • Espanhol — Nível básico"
echo ""
echo -e "\${CYAN}======================================================================\${RESET}"
echo -e "\${GREEN}Fim da execução de curriculo.sh\${RESET}"
`;

export const RawScriptModal: React.FC<RawScriptModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sh' | 'html'>('sh');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (activeTab === 'sh') {
      navigator.clipboard.writeText(RAW_BASH_SCRIPT);
    } else {
      fetch('/curriculo-standalone.html')
        .then((r) => r.text())
        .then((code) => {
          navigator.clipboard.writeText(code);
        })
        .catch(() => {
          navigator.clipboard.writeText('<!DOCTYPE html>...');
        });
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (activeTab === 'sh') {
      const blob = new Blob([RAW_BASH_SCRIPT], { type: 'text/x-sh' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'curriculo.sh';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const a = document.createElement('a');
      a.href = '/curriculo-standalone.html';
      a.download = 'curriculo-fabio-minas.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono">
      <div className="bg-[#10192C] border border-[#2E3D52] rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Modal Topbar */}
        <div className="bg-[#16233B] px-4 py-3 border-b border-[#2E3D52] flex flex-wrap items-center justify-between gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sh')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sh'
                  ? 'bg-[#1E3A37] border border-[#4FD1C0] text-[#4FD1C0] shadow-[0_0_10px_rgba(79,209,192,0.2)]'
                  : 'bg-[#10192C] text-[#8FA2B0] border border-[#2E3D52] hover:text-[#E7ECEE]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>curriculo.sh (Bash)</span>
            </button>

            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-sky-500/20 border border-sky-400/50 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-[#10192C] text-[#8FA2B0] border border-[#2E3D52] hover:text-[#E7ECEE]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>curriculo.html (HTML5 + CSS3)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'html' && (
              <a
                href="/curriculo-standalone.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#10192C] border border-[#2E3D52] hover:bg-[#16233B] text-xs text-sky-300 hover:text-white transition-colors"
                title="Abrir arquivo HTML avulso no navegador"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Abrir Tab</span>
              </a>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#10192C] border border-[#2E3D52] hover:bg-[#16233B] text-xs text-[#8FA2B0] hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4FD1C0]" />
                  <span className="text-[#4FD1C0]">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sky-400" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#10192C] border border-[#2E3D52] hover:bg-[#16233B] text-xs text-[#8FA2B0] hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#E3A857]" />
              <span>Baixar</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#8FA2B0] hover:text-white hover:bg-[#10192C] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content View */}
        <div className="p-4 overflow-y-auto bg-[#0A1122] text-[#8FA2B0] text-xs leading-relaxed max-h-[65vh]">
          {activeTab === 'sh' ? (
            <pre className="font-mono select-all">{RAW_BASH_SCRIPT}</pre>
          ) : (
            <div className="space-y-2">
              <div className="p-2.5 bg-[#16233B] border border-[#2E3D52] rounded text-[#8FA2B0] text-xs flex items-center justify-between">
                <span>Arquivo HTML5 + CSS3 unificados em um único arquivo autônomo.</span>
                <a
                  href="/curriculo-standalone.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4FD1C0] hover:underline flex items-center gap-1"
                >
                  Ver em tela cheia <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <pre className="font-mono select-all text-[11px] text-[#5E7282]">
{`<!-- Salve este arquivo como curriculo.html e abra diretamente em qualquer navegador -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>curriculo.sh - Fábio Gustavo de Minas</title>
  ... (Código HTML5 e CSS3 unificados disponível para download e visualização) ...
</head>`}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-[#16233B] px-4 py-2 border-t border-[#2E3D52] text-[11px] text-[#5E7282] flex items-center justify-between">
          <span>
            {activeTab === 'sh'
              ? 'Execute no terminal com: bash curriculo.sh'
              : 'Arquivo único compatível com qualquer navegador sem dependências'}
          </span>
          <span className="text-[#4FD1C0] font-bold">200 OK</span>
        </div>
      </div>
    </div>
  );
};
