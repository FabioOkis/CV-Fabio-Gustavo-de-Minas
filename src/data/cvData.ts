import {
  ContactInfo,
  SkillGroup,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  CourseItem,
  LanguageItem,
  CertModalInfo,
} from '../types';

export const CV_DATA: {
  contact: ContactInfo;
  summary: string;
  skillGroups: SkillGroup[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  certsModal: Record<string, CertModalInfo>;
} = {
  contact: {
    name: 'FÁBIO GUSTAVO DE MINAS',
    role: 'Analista de Suporte PL — Suporte VIP, Executivo & Ambientes Corporativos de Alta Exigência',
    status: 'Em atividade · Consultor de Suporte',
    location: 'São Paulo, SP',
    experienceYears: '19+ anos',
    uptimeStartYear: 2007,
    phone: '(11) 95423-7500',
    email: 'fabiominas@outlook.com',
    whatsapp: 'https://wa.me/5511954237500',
    linkedin: 'https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/',
    github: 'https://github.com/fabiominas',
  },
  summary:
    'Analista de TI com mais de 19 anos de experiência em suporte técnico e infraestrutura para ambientes corporativos de alta criticidade e confidencialidade, incluindo grandes escritórios de advocacia e órgãos públicos. Atuação consultiva e discreta no atendimento a usuários de alto perfil, com domínio de ecossistema Windows, Apple (macOS/iOS) e gestão de dispositivos móveis via Microsoft Intune e Entra ID (Azure AD), Active Directory, Microsoft 365, Microsoft Defender, PowerShell e governança de TI (ITIL), com histórico de suporte a empresas com mais de 1.100 integrantes e melhoria contínua de SLAs.',
  skillGroups: [
    {
      title: 'COMPETÊNCIAS TÉCNICAS',
      skills: [
        'Windows 11, macOS e dispositivos móveis (iOS/iPadOS, Android)',
        'Microsoft Intune, Entra ID (Azure AD), Microsoft Defender — MDM e gestão de dispositivos corporativos',
        'Active Directory',
        'Microsoft 365 (SharePoint, Teams, OneDrive, Exchange) e iManage',
        'PowerShell (nível intermediário) para automação e troubleshooting',
        'Ferramentas de ITSM/Service Desk e acesso remoto',
        'ITIL v3 — Governança de TI, gestão de incidentes e SLA e HDI technical support',
        'iManage — Administração de Data Room e compartilhamento seguro de documentos confidenciais',
        'Gestão de backup, inventário de ativos e documentação técnica',
      ],
    },
    {
      title: 'COMPETÊNCIAS COMPORTAMENTAIS',
      skills: [
        'Atendimento consultivo a usuários de alto perfil, com discrição e confidencialidade',
        'Comunicação técnica clara com usuários e stakeholders',
        'Senso de urgência e priorização em ambientes de alta pressão',
        'Resolução de problemas complexos e análise de causa raiz',
        'Organização, disciplina e produção de documentação técnica',
      ],
    },
  ],
  experiences: [
    {
      id: 'job-netcenter-pg',
      company: 'Netcenter — alocado em Pinheiro Guimarães Advogados · São Paulo, SP',
      role: 'Consultor de Suporte II',
      period: 'Jan/2026 – Atual',
      current: true,
      highlights: [
        'Responsável pelo suporte de segundo nível e administração de TI no escritório Pinheiro Guimarães Advogados.',
        'Administração de usuários, acessos, grupos e políticas de segurança no Active Directory e no ecossistema Microsoft 365 (SharePoint, Teams, OneDrive e Exchange).',
        'Gestão e suporte avançado ao iManage, sistema de gerenciamento de documentos jurídicos, garantindo organização e confidencialidade de peças e processos.',
        'Administração de ambientes de Data Room para compartilhamento seguro de documentos em auditorias e transações financeiras.',
        'Execução e monitoramento de rotinas críticas de TI: políticas de backup, inventário de ativos e documentação técnica para usuários.',
        'Diagnóstico e resolução de problemas de hardware, software, redes e impressão, com interface direta a fornecedores para demandas complexas.',
      ],
    },
    {
      id: 'job-pinheiro-neto',
      company: 'Pinheiro Neto Advogados · São Paulo, SP',
      role: 'Analista de Suporte Pleno',
      period: 'Ago/2018 – Out/2025',
      current: false,
      highlights: [
        'Liderança no suporte técnico especializado em um dos maiores escritórios de advocacia do Brasil, em ambiente de alta criticidade e confidencialidade.',
        'Implementação de soluções proativas para problemas recorrentes, reduzindo o volume de chamados repetitivos.',
        'Administração do Active Directory e Microsoft 365, garantindo acesso seguro e ininterrupto para mais de 1.500 usuários.',
      ],
    },
    {
      id: 'job-cimcorp-trt',
      company: 'Grupo Cimcorp — alocado no TRT 2ª Região · São Paulo, SP',
      role: 'Analista de Ticket Manage',
      period: 'Ago/2018 – Ago/2019',
      current: false,
      highlights: [
        'Gerenciamento de chamados de 1º e 2º níveis para o Tribunal Regional do Trabalho, com 95% de cumprimento de SLAs.',
        'Melhoria na documentação de soluções, resultando em redução de 20% no tempo de resolução de tickets recorrentes.',
        'Suporte remoto e presencial a sistemas críticos do tribunal, minimizando impactos operacionais em períodos de pico.',
      ],
    },
  ],
  educations: [
    {
      degree: 'MBA em Gestão de Pessoas',
      field: 'Ênfase em Liderança e Desenvolvimento de Equipes',
      institution: 'UNINOVE · São Paulo, SP',
      year: 'Junho/2018',
      certKey: 'mba',
    },
    {
      degree: 'Graduação e Pós-Graduação em Redes de Computadores',
      field: 'Especialização em Infraestrutura e Segurança',
      institution: 'UNINOVE · São Paulo, SP',
      year: 'Agosto/2016',
      certKey: 'redes',
    },
  ],
  certifications: [
    {
      year: '2018',
      title: 'HDI Desktop Support Technician',
      issuer: 'HDI Brasil',
      details: [
        'Certificação internacional em suporte técnico e atendimento ao usuário',
      ],
    },
    {
      year: '2017',
      title: 'ITIL V3 Foundation',
      issuer: 'Fundação Bradesco',
      details: [
        'Fundamentos em gerenciamento estratégico de serviços de TI',
      ],
    },
  ],
  courses: [],
  languages: [
    {
      name: 'Inglês Técnico',
      level: 'Nível básico · União Cultural Brasil-Estados Unidos',
    },
    {
      name: 'Espanhol',
      level: 'Nível básico',
    },
  ],
  certsModal: {
    mba: {
      key: 'mba',
      title: 'Certificado MBA em Gestão de Pessoas — UNINOVE',
      src: '/assets/img/cert-mba.jpeg',
      subTitle: 'UNINOVE · Concluído em Junho/2018',
    },
    redes: {
      key: 'redes',
      title: 'Certificado Pós-graduação em Redes de Computadores — UNINOVE',
      src: '/assets/img/cert-redes.jpeg',
      subTitle: 'UNINOVE · Concluído em Agosto/2016',
    },
    ms900: {
      key: 'ms900',
      title: 'Bootcamp MS-900: Microsoft 365 Fundamentals — Green Treinamentos',
      src: '/assets/img/MS-900.png',
      subTitle: 'Treinamento Oficial Microsoft 365 Fundamentals',
    },
    itil4: {
      key: 'itil4',
      title: 'Certificado Fundamentos ITIL 4 — Green Treinamentos',
      src: '/assets/img/ITIL4.png',
      subTitle: 'Treinamento Oficial Fundamentos do ITIL 4',
    },
  },
};

