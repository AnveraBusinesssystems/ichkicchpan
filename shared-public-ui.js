(() => {
  const footer = document.querySelector('.site-footer');
  const social = document.querySelector('.social-float');
  const header = document.getElementById('siteHeader');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuButton = document.getElementById('menuButton');
  const languageButton = document.getElementById('langButton');
  const pageName = location.pathname.split('/').pop();
  const fullyTranslatedPages = new Set(['', 'index.html', 'the-retreat.html', 'your-stay.html', 'the-experience.html', 'gallery.html', 'reservations.html']);
  const supportsFullTranslation = fullyTranslatedPages.has(pageName);

  if (!supportsFullTranslation) {
    document.documentElement.lang = 'en';
    document.querySelector('.lang-button')?.setAttribute('hidden', '');
  }

  const text = {
    en: {
      explore: 'Explore',
      home: 'Home',
      retreat: 'The Retreat',
      stay: 'Your Stay',
      experience: 'The Experience',
      gallery: 'Gallery',
      reservations: 'Reservations',
      portal: 'Guest Portal',
      availability: 'Check availability',
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
      home: 'Inicio',
      retreat: 'El Refugio',
      stay: 'Tu Estancia',
      experience: 'La Experiencia',
      gallery: 'Galería',
      reservations: 'Reservaciones',
      portal: 'Portal del huésped',
      availability: 'Consultar disponibilidad',
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

  const mobileNavigation = [
    { href: 'index.html', label: 'home', pages: ['', 'index.html'] },
    { href: 'the-retreat.html', label: 'retreat', pages: ['the-retreat.html'] },
    { href: 'your-stay.html', label: 'stay', pages: ['your-stay.html'] },
    { href: 'the-experience.html', label: 'experience', pages: ['the-experience.html'] },
    { href: 'gallery.html', label: 'gallery', pages: ['gallery.html'] },
    { href: 'reservations.html#book', label: 'reservations', pages: ['reservations.html'] },
    { href: 'guest-portal.html', label: 'portal', pages: ['guest-portal.html'] }
  ];

  if (mobileMenu) {
    const bookingHref = pageName === 'reservations.html' ? '#book' : 'reservations.html#book';
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-modal', 'true');
    mobileMenu.innerHTML = `
      <div class="mobile-menu-top">
        <a class="mobile-menu-wordmark" href="index.html" aria-label="Ichkiichpan home"></a>
        <button class="mobile-close" id="menuClose" type="button" data-shared="close">Close ×</button>
      </div>
      <nav aria-label="Mobile navigation"></nav>
      <div class="mobile-menu-actions">
        <button class="mobile-lang-button" type="button" data-mobile-language aria-label="Change language">EN <span>·</span> ES</button>
        <a class="solid-button" href="${bookingHref}" data-shared="availability">Check availability</a>
      </div>`;

    const navigation = mobileMenu.querySelector('nav');
    navigation.innerHTML = mobileNavigation.map(item => {
      const current = item.pages.includes(pageName) ? ' aria-current="page"' : '';
      return `<a href="${item.href}" data-shared="${item.label}"${current}>${text.en[item.label]}</a>`;
    }).join('');
  }

  function syncHeader() {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  }

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuButton?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileMenu.querySelector('.mobile-close')?.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (restoreFocus) menuButton?.focus();
  }

  menuButton?.setAttribute('aria-controls', 'mobileMenu');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.addEventListener('click', openMenu);
  mobileMenu?.querySelector('.mobile-close')?.addEventListener('click', () => closeMenu());
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu({ restoreFocus: false })));
  mobileMenu?.querySelector('[data-mobile-language]')?.addEventListener('click', () => languageButton?.click());
  document.addEventListener('keydown', event => {
    if (!mobileMenu?.classList.contains('open')) return;
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...mobileMenu.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const lazyBackgrounds = [...document.querySelectorAll('.mobile-lazy-bg')];
  if (lazyBackgrounds.length) {
    if (!window.matchMedia('(max-width: 760px)').matches || !('IntersectionObserver' in window)) {
      lazyBackgrounds.forEach(element => element.classList.add('is-loaded'));
    } else {
      const backgroundObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-loaded');
          backgroundObserver.unobserve(entry.target);
        });
      }, { rootMargin: '500px 0px' });
      lazyBackgrounds.forEach(element => backgroundObserver.observe(element));
    }
  }

  if (document.querySelector('.mobile-booking-bar')) document.body.classList.add('has-mobile-booking-bar');

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
    document.querySelectorAll('.desktop-nav').forEach(navigation => {
      navigation.querySelectorAll('a').forEach((link, index) => {
        if (navigationLabels[index]) link.textContent = navigationLabels[index];
      });
    });
    document.querySelectorAll('.site-header .outline-button:not(.booking-current):not([data-shared]):not([data-i18n]), .shared-closing .solid-button:not([data-shared]):not([data-i18n]), .stay-closing .solid-button:not([data-shared]):not([data-i18n])').forEach(link => {
      link.textContent = translated.planLink;
    });
    languageButton?.setAttribute('aria-label', translated.language);
    menuButton?.setAttribute('aria-label', translated.menu);
    const menuClose = document.querySelector('.mobile-close');
    if (menuClose) menuClose.textContent = translated.close;
    const mobileLanguageButton = mobileMenu?.querySelector('[data-mobile-language]');
    if (mobileLanguageButton) {
      mobileLanguageButton.innerHTML = lang === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
      mobileLanguageButton.setAttribute('aria-label', translated.language);
    }
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
