(() => {
  const footer = document.querySelector('.site-footer');
  const social = document.querySelector('.social-float');
  const pageName = location.pathname.split('/').pop();
  const fullyTranslatedPages = new Set(['', 'index.html', 'the-retreat.html']);
  const supportsFullTranslation = fullyTranslatedPages.has(pageName);

  if (!supportsFullTranslation) {
    document.documentElement.lang = 'en';
    document.querySelector('.lang-button')?.setAttribute('hidden', '');
  }

  const text = {
    en: {
      explore: 'Explore',
      retreat: 'The Retreat',
      stay: 'Your Stay',
      experience: 'The Experience',
      gallery: 'Gallery',
      plan: 'Plan your stay',
      planLink: 'Plan your stay',
      manage: 'Manage my stay',
      contact: 'Contact on WhatsApp',
      instagram: 'Instagram',
      footerLine: 'Private lagoon retreat',
      back: 'Back to top ↑',
      language: 'Change language',
      menu: 'Open menu',
      close: 'Close ×',
      contactGroup: 'Contact Ichkiichpan',
      instagramAria: 'Open Ichkiichpan on Instagram',
      whatsappAria: 'Message Ichkiichpan on WhatsApp',
      whatsappMessage: "Hi! I'm interested in staying at Ichkiichpan."
    },
    es: {
      explore: 'Explora',
      retreat: 'El Refugio',
      stay: 'Tu Estancia',
      experience: 'La Experiencia',
      gallery: 'Galería',
      plan: 'Planea tu estancia',
      planLink: 'Planea tu estancia',
      manage: 'Gestiona tu estancia',
      contact: 'Contacto por WhatsApp',
      instagram: 'Instagram',
      footerLine: 'Retiro privado junto a la laguna',
      back: 'Volver arriba ↑',
      language: 'Cambiar idioma',
      menu: 'Abrir menú',
      close: 'Cerrar ×',
      contactGroup: 'Contactar a Ichkiichpan',
      instagramAria: 'Abrir Ichkiichpan en Instagram',
      whatsappAria: 'Enviar un mensaje a Ichkiichpan por WhatsApp',
      whatsappMessage: '¡Hola! Me interesa hospedarme en Ichkiichpan.'
    }
  };

  if (footer) {
    footer.innerHTML = `
      <div class="footer-brand">
        <strong>ICHKIICHPAN</strong>
        <span>BACALAR · QUINTANA ROO · MÉXICO</span>
      </div>
      <div class="footer-nav-column">
        <p class="footer-column-label" data-shared="explore">Explore</p>
        <div class="footer-links">
          <a href="the-retreat.html" data-shared="retreat">The Retreat</a>
          <a href="your-stay.html" data-shared="stay">Your Stay</a>
          <a href="the-experience.html" data-shared="experience">The Experience</a>
          <a href="gallery.html" data-shared="gallery">Gallery</a>
        </div>
      </div>
      <div class="footer-contact-column">
        <p class="footer-column-label" data-shared="plan">Plan your stay</p>
        <div class="footer-contact">
          <a href="reservations.html#book" data-shared="planLink">Plan your stay</a>
          <a href="guest-portal.html" data-shared="manage">Manage my stay</a>
          <a class="footer-whatsapp" href="#" target="_blank" rel="noopener noreferrer" data-shared="contact">Contact on WhatsApp</a>
          <a href="https://www.instagram.com/ichkiichpan.cabana/" target="_blank" rel="noopener noreferrer" data-shared="instagram">Instagram</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-shared="footerLine">Private lagoon retreat</span>
        <span>© ${new Date().getFullYear()} ICHKIICHPAN</span>
        <a href="#top" data-shared="back">Back to top ↑</a>
      </div>`;
  }

  function updateSharedUi() {
    const lang = supportsFullTranslation && document.documentElement.lang === 'es' ? 'es' : 'en';
    const translated = text[lang];
    document.querySelectorAll('[data-shared]').forEach(element => {
      const value = translated[element.dataset.shared];
      if (value) element.textContent = value;
    });
    const navigationLabels = [translated.retreat, translated.stay, translated.experience, translated.gallery];
    document.querySelectorAll('.desktop-nav, .mobile-menu nav').forEach(navigation => {
      navigation.querySelectorAll('a').forEach((link, index) => {
        if (navigationLabels[index]) link.textContent = navigationLabels[index];
      });
    });
    document.querySelectorAll('.site-header .outline-button, .mobile-menu > .solid-button, .shared-closing .solid-button, .stay-closing .solid-button').forEach(link => {
      link.textContent = translated.planLink;
    });
    const languageButton = document.querySelector('.lang-button');
    const menuButton = document.querySelector('.menu-button');
    languageButton?.setAttribute('aria-label', translated.language);
    menuButton?.setAttribute('aria-label', translated.menu);
    const menuClose = document.querySelector('.mobile-close');
    if (menuClose) menuClose.textContent = translated.close;
    social?.setAttribute('aria-label', translated.contactGroup);
    const instagram = social?.querySelector('.instagram');
    const whatsapp = social?.querySelector('.whatsapp');
    instagram?.setAttribute('aria-label', translated.instagramAria);
    whatsapp?.setAttribute('aria-label', translated.whatsappAria);
    const whatsappUrl = `https://wa.me/19563393012?text=${encodeURIComponent(translated.whatsappMessage)}`;
    if (whatsapp) whatsapp.href = whatsappUrl;
    const footerWhatsapp = footer?.querySelector('.footer-whatsapp');
    if (footerWhatsapp) footerWhatsapp.href = whatsappUrl;
  }

  updateSharedUi();
  new MutationObserver(updateSharedUi).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if (footer && social && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      social.classList.toggle('footer-visible', entries.some(entry => entry.isIntersecting));
    }, { threshold: .08 }).observe(footer);
  }
})();
