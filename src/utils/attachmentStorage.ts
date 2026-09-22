export interface AttachmentItem {
  id: string;
  category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta';
  targetTitle: string;
  fileName: string;
  fileType: 'image' | 'pdf';
  fileSize?: string;
  dataUrl: string;
  uploadedAt: string;
  isDefault?: boolean;
}

const STORAGE_KEY = 'fabio_cv_attachments_v4';

// ─── PIN de administrador ────────────────────────────────────────────────────
// Mude este valor para definir seu PIN pessoal de acesso.
const ADMIN_PIN = '1412';

export function checkAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

/**
 * Resolves attachment URLs relative to the current site base path.
 * Essential for GitHub Pages where the site is hosted under /repository-name/
 */
export function resolveAttachmentUrl(url: string): string {
  if (!url) return '';
  if (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
  }
  // Strip leading slash if any
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;
  const rawBase = import.meta.env.BASE_URL || './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${base}${cleanPath}`;
}

// ─── Anexos padrão fixos (sempre visíveis para todos) ───────────────────────
export const DEFAULT_ATTACHMENTS: Record<string, AttachmentItem> = {
  mba: {
    id: 'mba',
    category: 'diploma',
    targetTitle: 'MBA em Gestão de Pessoas — UNINOVE (2018)',
    fileName: 'Diploma MBA em Gestão de Pessoas.jpeg',
    fileType: 'image',
    fileSize: '137 KB',
    dataUrl: 'documentos/diplomas/diploma-mba.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  redes: {
    id: 'redes',
    category: 'diploma',
    targetTitle: 'Pós-Graduação em Redes de Computadores — UNINOVE (2016)',
    fileName: 'Diploma Pós em Redes de computadores.jpeg',
    fileType: 'image',
    fileSize: '135 KB',
    dataUrl: 'documentos/diplomas/diploma-pos-redes.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  graduacao: {
    id: 'graduacao',
    category: 'diploma',
    targetTitle: 'Graduação em Redes de Computadores — UNINOVE',
    fileName: 'Diploma graduação.jpeg',
    fileType: 'image',
    fileSize: '167 KB',
    dataUrl: 'documentos/diplomas/diploma-graduacao.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  hdi: {
    id: 'hdi',
    category: 'certificacao',
    targetTitle: 'HDI Desktop Support Technician — HDI Brasil (2018)',
    fileName: 'Certificação HDI-DST.pdf',
    fileType: 'pdf',
    fileSize: '255 KB',
    dataUrl: 'documentos/certificados/certificacao-hdi-dst.pdf',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  itil: {
    id: 'itil',
    category: 'certificacao',
    targetTitle: 'ITIL V3 Foundation — Fundação Bradesco (2017)',
    fileName: 'Certificado Bradesco ITIL.pdf',
    fileType: 'pdf',
    fileSize: '286 KB',
    dataUrl: 'documentos/certificados/certificado-bradesco-itil.pdf',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  itil4: {
    id: 'itil4',
    category: 'certificacao',
    targetTitle: 'Fundamentos do ITIL 4 — Green Treinamentos',
    fileName: 'ITIL4.png',
    fileType: 'image',
    fileSize: '396 KB',
    dataUrl: 'documentos/certificados/itil4.png',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  ms900: {
    id: 'ms900',
    category: 'certificacao',
    targetTitle: 'Bootcamp MS-900: Microsoft 365 Fundamentals — Green Treinamentos',
    fileName: 'MS-900.png',
    fileType: 'image',
    fileSize: '325 KB',
    dataUrl: 'documentos/certificados/ms-900.png',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  senai: {
    id: 'senai',
    category: 'curso',
    targetTitle: 'Certificado de Formação Profissional — SENAI',
    fileName: 'Certificado Senai.jpeg',
    fileType: 'image',
    fileSize: '133 KB',
    dataUrl: 'documentos/certificados/certificado-senai.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  cert_redes: {
    id: 'cert_redes',
    category: 'certificacao',
    targetTitle: 'Certificado em Redes de Computadores',
    fileName: 'Certificado Redes.jpeg',
    fileType: 'image',
    fileSize: '116 KB',
    dataUrl: 'documentos/certificados/certificado-redes.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
};

export function loadAttachments(): Record<string, AttachmentItem> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    // Default attachments always override localStorage for default IDs
    const merged = { ...parsed, ...DEFAULT_ATTACHMENTS };
    const resolved: Record<string, AttachmentItem> = {};
    for (const [key, item] of Object.entries(merged)) {
      resolved[key] = {
        ...(item as AttachmentItem),
        dataUrl: resolveAttachmentUrl((item as AttachmentItem).dataUrl),
      };
    }
    return resolved;
  } catch (err) {
    console.error('Error loading attachments from localStorage:', err);
    const resolved: Record<string, AttachmentItem> = {};
    for (const [key, item] of Object.entries(DEFAULT_ATTACHMENTS)) {
      resolved[key] = {
        ...item,
        dataUrl: resolveAttachmentUrl(item.dataUrl),
      };
    }
    return resolved;
  }
}

export function saveAttachment(item: AttachmentItem): void {
  try {
    const current = loadAttachments();
    // Never overwrite a default attachment in localStorage
    if (DEFAULT_ATTACHMENTS[item.id]) return;
    current[item.id] = item;
    // Only persist non-default items
    const toSave: Record<string, AttachmentItem> = {};
    for (const [key, val] of Object.entries(current)) {
      if (!val.isDefault) toSave[key] = val;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Error saving attachment to localStorage:', err);
  }
}

export function removeAttachment(id: string): void {
  try {
    // Never allow removing default attachments
    if (DEFAULT_ATTACHMENTS[id]) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    delete parsed[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (err) {
    console.error('Error removing attachment from localStorage:', err);
  }
}
