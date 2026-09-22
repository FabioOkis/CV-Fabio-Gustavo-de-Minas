import { CV_DATA } from './cvData';

export const CV_DATA_EN = {
  ...CV_DATA,
  contact: {
    ...CV_DATA.contact,
    role: 'IT Support Analyst — Executive & VIP Support for High-Demand Environments',
    status: 'Active · IT Support Consultant',
    experienceYears: '19+ years',
  },
  summary:
    'IT Analyst with over 19 years of experience in technical support and IT infrastructure for high-criticality and high-confidentiality corporate environments, including major law firms and public sector bodies. Trusted, consultative and discrete support for executive/VIP users (partners, directors, board members), with deep hands-on expertise in Windows, Apple (macOS/iOS), Mobile Device Management via Microsoft Intune & Entra ID (Azure AD), Active Directory, Microsoft 365, Microsoft Defender, PowerShell scripting, and ITIL governance.',
  skillGroups: [
    {
      title: 'TECHNICAL COMPETENCIES',
      skills: [
        'Windows 11, macOS, and mobile devices (iOS/iPadOS, Android)',
        'Microsoft Intune, Entra ID (Azure AD), Microsoft Defender — MDM & corporate device management',
        'Active Directory Administration',
        'Microsoft 365 (SharePoint, Teams, OneDrive, Exchange) & iManage DMS',
        'PowerShell scripting for automation & advanced troubleshooting',
        'ITSM / Service Desk tools and remote assistance software',
        'ITIL v3 — IT Governance, Incident Management, SLA & HDI Technical Support',
        'iManage — Data Room administration & secure confidential document sharing',
        'Backup routines, IT asset inventory, and technical documentation',
      ],
    },
    {
      title: 'BEHAVIORAL COMPETENCIES',
      skills: [
        'Consultative support for high-profile executive users with discretion & confidentiality',
        'Clear technical communication with users, directors, and stakeholders',
        'Sense of urgency and effective prioritization under high-pressure environments',
        'Complex problem solving and root cause analysis',
        'Organization, discipline, and high-quality technical documentation',
      ],
    },
  ],
  experiences: [
    {
      id: 'job-netcenter-pg',
      company: 'Netcenter — allocated at Pinheiro Guimarães Advogados · São Paulo, Brazil',
      role: 'IT Support Consultant II',
      period: 'Jan/2026 – Present',
      current: true,
      highlights: [
        'Responsible for L2 technical support and IT administration at Pinheiro Guimarães Advogados.',
        'Administration of users, permissions, groups, and security policies in Active Directory and Microsoft 365 (SharePoint, Teams, OneDrive, Exchange).',
        'Advanced support and management for iManage Legal Document Management System.',
        'Data Room administration for secure document sharing during audits and M&A transactions.',
        'Monitoring and execution of critical IT routines: backups, asset inventory, and technical guides.',
        'Hardware, software, network, and print troubleshooting with direct vendor interface.',
      ],
    },
    {
      id: 'job-pinheiro-neto',
      company: 'Pinheiro Neto Advogados · São Paulo, Brazil',
      role: 'Senior IT Support Analyst',
      period: 'Aug/2018 – Oct/2025',
      current: false,
      highlights: [
        'Specialized technical support leadership in one of Brazil’s top tier law firms in a high-criticality environment.',
        'Implementation of proactive solutions for recurring incidents, reducing repetitive ticket volume.',
        'Active Directory & Microsoft 365 administration for over 1,500 active users.',
      ],
    },
    {
      id: 'job-cimcorp-trt',
      company: 'Grupo Cimcorp — allocated at TRT 2nd Region · São Paulo, Brazil',
      role: 'Ticket Management Analyst',
      period: 'Aug/2018 – Aug/2019',
      current: false,
      highlights: [
        'L1 & L2 ticket management for the Regional Labor Court (TRT 2), achieving a 95% SLA compliance rate.',
        'Improved solution documentation, resulting in a 20% reduction in resolution time for recurring tickets.',
        'Remote and local support for mission-critical court systems.',
      ],
    },
  ],
};
