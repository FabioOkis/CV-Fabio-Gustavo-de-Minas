export interface ContactInfo {
  name: string;
  role: string;
  location: string;
  experienceYears: string;
  status: string;
  whatsapp: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  uptimeStartYear: number;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  companySubtitle?: string;
  role: string;
  period: string;
  current?: boolean;
  hiddenByDefault?: boolean;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  year: string;
  certKey?: 'mba' | 'redes';
}

export interface CertificationItem {
  year?: string;
  title: string;
  issuer: string;
  details: string[];
}

export interface CourseItem {
  title: string;
  issuer: string;
  description: string;
  certKey?: 'ms900' | 'itil4';
  pdfUrl?: string;
  hiddenByDefault?: boolean;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface CertModalInfo {
  key: string;
  title: string;
  src: string;
  subTitle?: string;
}
