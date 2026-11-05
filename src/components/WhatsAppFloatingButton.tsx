import React from 'react';

const WHATSAPP_URL =
  'https://wa.me/5511954237500?text=' +
  encodeURIComponent('Olá Fábio! Vi seu currículo online e gostaria de conversar.');

/** Botão flutuante do WhatsApp (oculto na impressão). */
export const WhatsAppFloatingButton: React.FC = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Conversar no WhatsApp: (11) 95423-7500"
    title="Fale comigo no WhatsApp"
    className="no-print fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110 hover:bg-[#1ebe5b] focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
  >
    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
      <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.71A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3zm0 23.7c-1.95 0-3.86-.53-5.53-1.52l-.4-.24-3.98 1.01 1.06-3.88-.26-.4A10.67 10.67 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7zm5.87-8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z" />
    </svg>
  </a>
);

