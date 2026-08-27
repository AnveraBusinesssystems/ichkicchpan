const header = document.getElementById('siteHeader');
const menu = document.getElementById('mobileMenu');
const menuButton = document.getElementById('menuButton');
const menuClose = document.getElementById('menuClose');
const langButton = document.getElementById('langButton');

function syncHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 40);
}

function openMenu() {
  menu?.classList.add('open');
  menu?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  menuClose?.focus();
}

function closeMenu() {
  menu?.classList.remove('open');
  menu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  menuButton?.focus();
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });
menuButton?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) closeMenu();
});

function syncGalleryLinks() {
  document.querySelectorAll('.desktop-nav a:last-child,.mobile-menu nav a:last-child').forEach(link => {
    link.href = 'gallery.html';
  });
}

const copy = {
  en: {
    title: 'Ichkiichpan — Bacalar Lagoon Retreat',
    description: 'Ichkiichpan is a private Bacalar lagoon retreat with five bedrooms, seven beds and direct water access for groups of up to 14 guests.',
    navRetreat: 'The Retreat', navStay: 'Your Stay', navLagoon: 'The Experience', navGallery: 'Gallery',
    planStay: 'Plan your stay', heroLine: 'BETWEEN JUNGLE AND LAGOON',
    heroSummary: 'A private lagoon retreat for groups of up to 14.',
    glanceLabel: 'At a glance', glanceTitle: 'A place<br><em>of your own.</em>',
    factPrivate: 'Private', factEntireRetreat: 'Entire retreat', factGuests: 'Guests', factBedrooms: 'Bedrooms', factBeds: 'Beds', factDirect: 'Direct', factLagoon: 'Lagoon access',
    lagoonLabel: 'The lagoon', lagoonTitle: 'A different blue<br><em>at every hour.</em>',
    lagoonBody: 'Swim in the morning, drift out by kayak, or stay still at the end of the dock and let the day pass slowly.',
    exploreLagoon: 'Explore the lagoon experience →', statDocks: 'private docks', statKayaks: 'Kayaks', statIncluded: 'included', statDirect: 'Direct', statAccess: 'water access',
    spacesLabel: 'Inside Ichkiichpan', spacesTitle: 'Three ways<br><em>to settle in.</em>',
    sleepTitle: 'Sleep', sleepBody: 'Five bedrooms and seven beds give everyone room to settle in comfortably.', exploreBedrooms: 'Explore the bedrooms →',
    gatherTitle: 'Gather', gatherBody: 'Shared living spaces and an equipped kitchen make group time effortless.', discoverRetreat: 'Discover the retreat →',
    outsideTitle: 'Live outside', outsideBody: 'Docks, palapas and open-air spaces keep the lagoon close throughout the day.', seeExperience: 'See the experience →',
    practicalLabel: 'The essentials', practicalTitle: 'Everything you need.<br><em>Nothing you don’t.</em>',
    privateTitle: 'Entirely yours', privateBody: 'The whole retreat stays private for your group.',
    comfortTitle: 'Everyday comforts', comfortBody: 'Wi-Fi, free parking, an equipped kitchen and coffee maker.',
    waterTitle: 'The lagoon included', waterBody: 'Direct water access, two docks and kayaks for guest use.',
    galleryLabel: 'A closer look', galleryTitle: 'Light, water, wood<br><em>and the jungle around you.</em>', viewGallery: 'View the full gallery →',
    galleryCtaLabel: 'The full story', galleryCtaTitle: 'See every room,<br>dock and detail.',
    closingLabel: 'Your stay', closingTitle: 'Come together.<br><em>Then make the place your own.</em>', closingAssurance: 'Five bedrooms · Seven beds · Up to 14 guests',
    close: 'Close ×', languageLabel: 'Change language',
    heroImageAlt: 'Sunset over the Bacalar lagoon from Ichkiichpan', propertyHighlightsAria: 'Property highlights', glanceBedroomAlt: 'Spacious bedroom at Ichkiichpan', glancePropertyAlt: 'Ichkiichpan cabin surrounded by tropical vegetation',
    lagoonImageAlt: 'Aerial view of Ichkiichpan and its lagoon docks', sleepAlt: 'Double-bed room at Ichkiichpan', gatherAlt: 'Spacious interior beneath the palapa roof', outsideAlt: 'Ichkiichpan cabin and open-air living spaces',
    galleryDockAlt: 'Private dock framed by jungle foliage', galleryWaterAlt: 'Turquoise Bacalar lagoon', gallerySunsetAlt: 'Private dock at sunset',
    galleryCabinAlt: 'Ichkiichpan cabin in the jungle', galleryOutdoorAlt: 'Lagoon-side outdoor living at Ichkiichpan', galleryHouseAlt: 'Main Ichkiichpan cabin among tropical trees'
  },
  es: {
    title: 'Ichkiichpan — Retiro privado en la Laguna de Bacalar',
    description: 'Ichkiichpan es un retiro privado en la Laguna de Bacalar con cinco habitaciones, siete camas y acceso directo al agua para grupos de hasta 14 huéspedes.',
    navRetreat: 'El Refugio', navStay: 'Tu Estancia', navLagoon: 'La Experiencia', navGallery: 'Galería',
    planStay: 'Planea tu estancia', heroLine: 'ENTRE LA SELVA Y LA LAGUNA',
    heroSummary: 'Un retiro privado junto a la laguna para grupos de hasta 14 personas.',
    glanceLabel: 'De un vistazo', glanceTitle: 'Un lugar<br><em>solo para ustedes.</em>',
    factPrivate: 'Privado', factEntireRetreat: 'Todo el retiro', factGuests: 'Huéspedes', factBedrooms: 'Habitaciones', factBeds: 'Camas', factDirect: 'Directo', factLagoon: 'Acceso a la laguna',
    lagoonLabel: 'La laguna', lagoonTitle: 'Un azul distinto<br><em>a cada hora.</em>',
    lagoonBody: 'Naden por la mañana, salgan en kayak o quédense al final del muelle y dejen que el día pase despacio.',
    exploreLagoon: 'Explora la experiencia en la laguna →', statDocks: 'muelles privados', statKayaks: 'Kayaks', statIncluded: 'incluidos', statDirect: 'Directo', statAccess: 'acceso al agua',
    spacesLabel: 'Dentro de Ichkiichpan', spacesTitle: 'Tres formas<br><em>de disfrutarlo.</em>',
    sleepTitle: 'Descansen', sleepBody: 'Cinco habitaciones y siete camas dan a todos espacio para instalarse con comodidad.', exploreBedrooms: 'Explora las habitaciones →',
    gatherTitle: 'Reúnanse', gatherBody: 'Las áreas comunes y la cocina equipada hacen que compartir en grupo sea sencillo.', discoverRetreat: 'Descubre el refugio →',
    outsideTitle: 'Vivan al aire libre', outsideBody: 'Muelles, palapas y espacios abiertos mantienen la laguna cerca durante todo el día.', seeExperience: 'Descubre la experiencia →',
    practicalLabel: 'Lo esencial', practicalTitle: 'Todo lo necesario.<br><em>Nada de más.</em>',
    privateTitle: 'Todo para ustedes', privateBody: 'El retiro completo permanece privado para su grupo.',
    comfortTitle: 'Comodidades diarias', comfortBody: 'Wi-Fi, estacionamiento gratuito, cocina equipada y cafetera.',
    waterTitle: 'La laguna incluida', waterBody: 'Acceso directo al agua, dos muelles y kayaks para huéspedes.',
    galleryLabel: 'Más de cerca', galleryTitle: 'Luz, agua, madera<br><em>y selva alrededor.</em>', viewGallery: 'Ver la galería completa →',
    galleryCtaLabel: 'La historia completa', galleryCtaTitle: 'Descubre cada habitación,<br>muelle y detalle.',
    closingLabel: 'Tu estancia', closingTitle: 'Vengan juntos.<br><em>Luego hagan suyo el lugar.</em>', closingAssurance: 'Cinco habitaciones · Siete camas · Hasta 14 huéspedes',
    close: 'Cerrar ×', languageLabel: 'Cambiar idioma',
    heroImageAlt: 'Atardecer sobre la Laguna de Bacalar desde Ichkiichpan', propertyHighlightsAria: 'Datos principales de la propiedad', glanceBedroomAlt: 'Habitación amplia en Ichkiichpan', glancePropertyAlt: 'Cabaña Ichkiichpan rodeada de vegetación tropical',
    lagoonImageAlt: 'Vista aérea de Ichkiichpan y sus muelles en la laguna', sleepAlt: 'Habitación con camas dobles en Ichkiichpan', gatherAlt: 'Interior amplio bajo el techo de palapa', outsideAlt: 'Cabaña Ichkiichpan y sus espacios al aire libre',
    galleryDockAlt: 'Muelle privado enmarcado por vegetación tropical', galleryWaterAlt: 'Agua turquesa de la Laguna de Bacalar', gallerySunsetAlt: 'Muelle privado al atardecer',
    galleryCabinAlt: 'Cabaña Ichkiichpan entre la selva', galleryOutdoorAlt: 'Espacio exterior de Ichkiichpan junto a la laguna', galleryHouseAlt: 'Cabaña principal de Ichkiichpan entre árboles tropicales'
  }
};

let language = localStorage.getItem('ichkiichpan-language') || 'en';

function applyLanguage(lang) {
  language = copy[lang] ? lang : 'en';
  const translated = copy[language];
  document.documentElement.lang = language;
  document.title = translated.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = translated.description;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = translated[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = translated[element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute('aria-label', value);
  });
  if (langButton) {
    langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
    langButton.setAttribute('aria-label', translated.languageLabel);
  }
  localStorage.setItem('ichkiichpan-language', language);
  syncGalleryLinks();
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));
applyLanguage(language);
