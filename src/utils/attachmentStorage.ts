export interface AttachmentItem {
  id: string; // 'mba' | 'redes' | 'hdi' | 'itil' | 'carta_apresentacao' | 'carta_recomendacao' | string
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
};

export function loadAttachments(): Record<string, AttachmentItem> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_ATTACHMENTS };
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_ATTACHMENTS, ...parsed };
  } catch (err) {
    console.error('Error loading attachments from localStorage:', err);
    return { ...DEFAULT_ATTACHMENTS };
  }
}

export function saveAttachment(item: AttachmentItem): void {
  try {
    const current = loadAttachments();
    current[item.id] = item;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Error saving attachment to localStorage:', err);
  }
}

export function removeAttachment(id: string): void {
  try {
    const current = loadAttachments();
    delete current[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Error removing attachment from localStorage:', err);
  }
}
