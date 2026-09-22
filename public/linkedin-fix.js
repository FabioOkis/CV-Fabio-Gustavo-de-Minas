(() => {
  const linkedinUrl = 'https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/';
  const updateLinkedInLinks = () => {
    document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => {
      link.setAttribute('href', linkedinUrl);
    });
  };

  // Run once after React has mounted. Do not observe DOM mutations here:
  // changing link text inside a MutationObserver would continuously retrigger it.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLinkedInLinks, { once: true });
  } else {
    updateLinkedInLinks();
  }
})();
