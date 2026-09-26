import React, { useState, useEffect, useCallback } from 'react';
import { ExecutiveHeaderBar } from './components/ExecutiveHeaderBar';
import { CurriculumLanding } from './components/CurriculumLanding';
import { AttachModal } from './components/AttachModal';
import { ViewerModal } from './components/ViewerModal';
import { AllAttachmentsDrawer } from './components/AllAttachmentsDrawer';
import { CoverLetterModal } from './components/CoverLetterModal';
import { RecommendationLetterModal } from './components/RecommendationLetterModal';
import { AdminPinModal } from './components/AdminPinModal';
import { ExecutiveFooter } from './components/ExecutiveFooter';
import {
  AttachmentItem,
  loadAttachments,
  removeAttachment as removeStorageAttachment,
} from './utils/attachmentStorage';

export default function App() {
  const [attachments, setAttachments] = useState<Record<string, AttachmentItem>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  const [attachModal, setAttachModal] = useState<{
    isOpen: boolean;
    targetId: string;
    targetTitle: string;
    category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta';
  }>({
    isOpen: false,
    targetId: '',
    targetTitle: '',
    category: 'diploma',
  });

  const [viewerModal, setViewerModal] = useState<{
    isOpen: boolean;
    attachment: AttachmentItem | null;
  }>({
    isOpen: false,
    attachment: null,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [recommendationLetterOpen, setRecommendationLetterOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [certificateBorder, setCertificateBorder] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cv_certificate_border');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const handleToggleCertificateBorder = () => {
    setCertificateBorder((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('cv_certificate_border', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Load attachments on initial mount
  useEffect(() => {
    const data = loadAttachments();
    setAttachments(data);
  }, []);

  // ─── Admin PIN ─────────────────────────────────────────────────────────────
  const handleRequestAdmin = useCallback(() => {
    setAdminModalOpen(true);
  }, []);

  const handleAdminSuccess = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // ─── Attach actions (admin-only) ───────────────────────────────────────────
  const handleOpenAttach = (
    targetId: string,
    targetTitle: string,
    category: 'diploma' | 'certificacao' | 'curso' | 'documento' | 'carta'
  ) => {
    if (!isAdmin) {
      handleRequestAdmin();
      return;
    }
    setAttachModal({
      isOpen: true,
      targetId,
      targetTitle,
      category,
    });
  };

  const handleCloseAttach = () => {
    setAttachModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAttachmentSaved = (item: AttachmentItem) => {
    setAttachments((prev) => ({
      ...prev,
      [item.id]: item,
    }));
  };

  const handleOpenView = (attachment: AttachmentItem) => {
    setViewerModal({
      isOpen: true,
      attachment,
    });
  };

  const handleCloseView = () => {
    setViewerModal({
      isOpen: false,
      attachment: null,
    });
  };

  const handleRemoveAttachment = (id: string) => {
    if (!isAdmin) return;
    removeStorageAttachment(id);
    setAttachments((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    // Re-load to restore defaults
    setAttachments(loadAttachments());
  };

  const totalAttachments = Object.keys(attachments).length;

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans print:bg-white print:min-h-0">
      {/* Executive Top Action Bar */}
      <ExecutiveHeaderBar
        totalAttachments={totalAttachments}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenAttachmentsDrawer={() => setDrawerOpen(true)}
        onOpenCoverLetter={() => setCoverLetterOpen(true)}
        onOpenRecommendationLetter={() => setRecommendationLetterOpen(true)}
        isAdmin={isAdmin}
        onRequestAdmin={handleRequestAdmin}
        certificateBorder={certificateBorder}
        onToggleCertificateBorder={handleToggleCertificateBorder}
      />

      {/* Main Container / Paper Sheet */}
      <main className="flex-1 py-4 sm:py-10 px-2 sm:px-4 print:p-0 print:m-0 flex justify-center">
        <CurriculumLanding
          attachments={attachments}
          lang={lang}
          isAdmin={isAdmin}
          showCertificateBorder={certificateBorder}
          onOpenAttach={handleOpenAttach}
          onOpenView={handleOpenView}
          onOpenCoverLetter={() => setCoverLetterOpen(true)}
          onOpenRecommendationLetter={() => setRecommendationLetterOpen(true)}
          onOpenAttachmentsDrawer={() => setDrawerOpen(true)}
        />
      </main>

      {/* Executive Footer with ISO 27001 & LGPD compliance */}
      <ExecutiveFooter
        onOpenCoverLetter={() => setCoverLetterOpen(true)}
        onOpenRecommendationLetter={() => setRecommendationLetterOpen(true)}
        isAdmin={isAdmin}
        onRequestAdmin={handleRequestAdmin}
      />

      {/* Modals */}
      <CoverLetterModal
        isOpen={coverLetterOpen}
        onClose={() => setCoverLetterOpen(false)}
        attachment={attachments['carta_apresentacao']}
        onOpenAttach={() =>
          handleOpenAttach('carta_apresentacao', 'Carta de Apresentação Profissional', 'carta')
        }
        onOpenViewAttachment={handleOpenView}
        onOpenAttachmentsDrawer={() => setDrawerOpen(true)}
        isAdmin={isAdmin}
      />

      <RecommendationLetterModal
        isOpen={recommendationLetterOpen}
        onClose={() => setRecommendationLetterOpen(false)}
        attachment={attachments['carta_recomendacao']}
        onOpenAttach={() =>
          handleOpenAttach(
            'carta_recomendacao',
            'Carta de Recomendação — Pinheiro Neto Advogados',
            'carta'
          )
        }
        onOpenViewAttachment={handleOpenView}
        onOpenAttachmentsDrawer={() => setDrawerOpen(true)}
        isAdmin={isAdmin}
      />

      <AttachModal
        isOpen={attachModal.isOpen}
        onClose={handleCloseAttach}
        targetId={attachModal.targetId}
        targetTitle={attachModal.targetTitle}
        category={attachModal.category}
        currentAttachment={attachments[attachModal.targetId]}
        onSaved={handleAttachmentSaved}
      />

      <ViewerModal
        isOpen={viewerModal.isOpen}
        onClose={handleCloseView}
        attachment={viewerModal.attachment}
        isAdmin={isAdmin}
        onRemove={handleRemoveAttachment}
        onReplace={(item) => {
          handleOpenAttach(item.id, item.targetTitle, item.category);
        }}
      />

      <AllAttachmentsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        attachments={attachments}
        isAdmin={isAdmin}
        onOpenAttach={handleOpenAttach}
        onOpenView={handleOpenView}
        onRemove={handleRemoveAttachment}
        onOpenCoverLetter={() => setCoverLetterOpen(true)}
        onOpenRecommendationLetter={() => setRecommendationLetterOpen(true)}
      />

      <AdminPinModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onSuccess={handleAdminSuccess}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}
