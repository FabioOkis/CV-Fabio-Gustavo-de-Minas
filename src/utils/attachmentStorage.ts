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

const STORAGE_KEY = 'fabio_cv_attachments_v2';

// ─── PIN de administrador ────────────────────────────────────────────────────
// Mude este valor para definir seu PIN pessoal de acesso.
const ADMIN_PIN = '1412';

export function checkAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

// ─── Anexos padrão fixos (sempre visíveis para todos) ───────────────────────
export const DEFAULT_ATTACHMENTS: Record<string, AttachmentItem> = {
  mba: {
    id: 'mba',
    category: 'diploma',
    targetTitle: 'MBA em Gestão de Pessoas — UNINOVE (2018)',
    fileName: 'cert-mba.jpeg',
    fileType: 'image',
    fileSize: '480 KB',
    dataUrl: '/assets/img/cert-mba.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  redes: {
    id: 'redes',
    category: 'diploma',
    targetTitle: 'Graduação e Pós-Graduação em Redes de Computadores — UNINOVE (2016)',
    fileName: 'cert-redes.jpeg',
    fileType: 'image',
    fileSize: '512 KB',
    dataUrl: '/assets/img/cert-redes.jpeg',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  itil: {
    id: 'itil',
    category: 'certificacao',
    targetTitle: 'ITIL V3 Foundation — Fundação Bradesco (2017)',
    fileName: 'ITIL4.png',
    fileType: 'image',
    fileSize: '387 KB',
    dataUrl: '/assets/img/ITIL4.png',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
  hdi: {
    id: 'hdi',
    category: 'certificacao',
    targetTitle: 'MS-900: Microsoft 365 Fundamentals',
    fileName: 'MS-900.png',
    fileType: 'image',
    fileSize: '318 KB',
    dataUrl: '/assets/img/MS-900.png',
    uploadedAt: 'Original anexado',
    isDefault: true,
  },
};

export function loadAttachments(): Record<string, AttachmentItem> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_ATTACHMENTS };
    }
    const parsed = JSON.parse(raw);
    // Default attachments always override localStorage for the same IDs
    return { ...parsed, ...DEFAULT_ATTACHMENTS };
  } catch (err) {
    console.error('Error loading attachments from localStorage:', err);
    return { ...DEFAULT_ATTACHMENTS };
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
