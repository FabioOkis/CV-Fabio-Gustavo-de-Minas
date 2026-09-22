(() => {
  const linkedinUrl = 'https://www.linkedin.com/in/f%C3%A1bio-minas-fgm-3951629b/';
  const oldProfile = 'fabio-gustavo-de-minas-3951629b';

  const updateLinkedInLinks = () => {
    document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => {
      const anchor = link;
      if (anchor.href.includes(oldProfile) || anchor.href.includes('linkedin.com/in/')) {
        anchor.href = linkedinUrl;
        anchor.textContent = anchor.textContent.replace(
          /linkedin\.com\/in\/[^\s]+/i,
          'linkedin.com/in/fábio-minas-fgm-3951629b'
        );
      }
    });
  };

  updateLinkedInLinks();
  new MutationObserver(updateLinkedInLinks).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
