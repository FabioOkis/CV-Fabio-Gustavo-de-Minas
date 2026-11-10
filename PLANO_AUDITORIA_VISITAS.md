# Plano Futuro — Auditoria e Rastreamento de Visitas do Currículo

Documento de referência com o planejamento para evoluir o botão contador de visitas (`ExecutiveFooter.tsx`) em um **Painel de Auditoria de Acessos protegido por senha (PIN)**.

---

## 1. Situação Atual
- **Arquivo principal:** `src/components/ExecutiveFooter.tsx`
- **Funcionamento atual:** Utiliza a API pública `countapi.mileshilliard.com` (chave `cv-fabio-minas-views`) para incrementar `+1` a cada sessão (`sessionStorage`) e exibir o total acumulado.
- **Autenticação existente:** O projeto já possui o modal `src/components/AdminPinModal.tsx` e a função `checkAdminPin` em `src/utils/attachmentStorage.ts` (PIN padrão atual: `1412`).

---

## 2. O que será capturado AUTOMATICAMENTE em cada visita
Sem que o visitante precise preencher nada, ao abrir o currículo o sistema consultará uma API gratuita de geolocalização de IP (`ipwho.is` ou `ipapi.co`) combinada com dados do navegador (`navigator.userAgent` e `document.referrer`):

- **Data e Hora exatas** do acesso (fuso horário de Brasília);
- **Localização aproximada:** Cidade, Estado (UF) e País;
- **Provedor / Rede / Organização (ASN/ISP):** Nome da operadora ou rede corporativa da empresa (quando o acesso parte de um link dedicado corporativo);
- **Dispositivo e Sistema Operacional:** Mobile (iOS/Android) ou Desktop (Windows/macOS/Linux) + Navegador utilizado;
- **Origem do tráfego (Referrer):** Se veio do LinkedIn, acesso direto, WhatsApp, etc.

---

## 3. Como identificar "Nome da Pessoa" e "Empresa"
Por restrições de privacidade dos navegadores e LGPD, sites não têm acesso automático ao nome pessoal ou conta do LinkedIn do visitante. A identificação será feita combinando **duas estratégias**:

### Estratégia A — Links Rastreados Personalizados (Silencioso)
- Suporte a parâmetros na URL, como:
  - `https://fabiookis.github.io/CV-Fabio-Gustavo-de-Minas/?empresa=PinheiroNeto&nome=Maria_RH`
  - ou `?ref=Vaga_Analista_Senior_Itau`
- Quando o destinatário abrir o link, o sistema associará automaticamente aquele acesso (data, hora, cidade, dispositivo) ao **Nome** e **Empresa** definidos no link.
- **Gerador de Link no Modo Admin:** Ferramenta dentro do painel administrativo onde você digita o nome do recrutador/empresa e copia o link pronto com 1 clique.

### Estratégia B — Check-in Opcional de Recrutador / Visitante
- Um botão ou card discreto e executivo (ex.: *"Recrutador(a)? Registre sua visita ou solicite contato prioritário"*), permitindo que o visitante informe opcionalmente **Nome**, **Empresa** e **E-mail/WhatsApp**.

---

## 4. Proteção por Senha (Acesso Exclusivo)
- O botão de visitas no rodapé continuará exibindo apenas o número total para visitantes comuns (ou poderá exigir senha imediatamente ao clicar).
- Ao autenticar com o **PIN de Administrador**, será liberado o **Painel de Auditoria de Acessos**, contendo:
  - Tabela completa com histórico de visitas (Data/Hora, Nome/Tag, Empresa/Provedor, Cidade/UF, Dispositivo);
  - Filtro de busca e botão para exportar em CSV/Excel;
  - Gerador de links rastreados;
  - Controle para limpar ou ajustar a contagem.

---

## 5. Opções de Armazenamento em Nuvem (para funcionar no GitHub Pages)
Como o GitHub Pages hospeda arquivos estáticos, o histórico precisa ser salvo em um serviço externo gratuito para que você consiga consultar de qualquer computador ou celular:

1. **Opção 1 — Google Sheets via Google Apps Script (Gratuito e Vitalício):**
   - Cada visita grava uma linha automaticamente em uma Planilha Google privada sua, e o painel Admin do site lê os dados direto dela.
2. **Opção 2 — Supabase / Firebase (Banco de Dados Gratuito em Tempo Real):**
   - Banco em nuvem gratuito com leitura e gravação instantâneas no painel do currículo.
3. **Opção 3 — Notificação Instantânea (Webhook / E-mail / Telegram):**
   - Além do histórico no painel, envia um alerta sempre que um link rastreado de recrutador for aberto.

---

## 6. Próximos Passos (Quando formos implementar)
1. Escolher onde salvar os logs (Google Sheets, Supabase/Firebase ou serviço de nuvem chaveado);
2. Definir se o botão de visitas ficará público (com detalhes bloqueados por senha) ou 100% restrito ao PIN;
3. Criar o componente `VisitAuditModal.tsx` integrado ao `AdminPinModal.tsx` e ao `ExecutiveFooter.tsx`.

