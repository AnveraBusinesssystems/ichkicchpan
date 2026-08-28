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

const copy = {
  en: {
    title: 'Your Stay — Ichkiichpan',
    description: 'Explore five bedrooms, seven beds, shared living spaces and lagoon-side amenities at Ichkiichpan in Bacalar.',
    ogTitle: 'Your Stay — Ichkiichpan',
    ogDescription: 'Five bedrooms, seven beds and shared spaces for groups of up to 14 guests on the Bacalar Lagoon.',
    heroLabel: 'Your stay', heroTitle: 'Five bedrooms.<br><em>Space for everyone.</em>',
    heroBody: 'Five private bedrooms and seven beds let groups stay together without giving up personal space.',
    glanceLabel: 'At a glance', glanceTitle: 'Stay together.<br><em>Sleep your own way.</em>',
    glanceBody: 'A flexible mix of double, king and queen rooms for families and groups.',
    guests: 'Guests', bedrooms: 'Bedrooms', beds: 'Beds', livingAreas: 'Living areas',
    doubleLabel: 'Double-bed rooms', doubleTitle: 'Made for<br><em>sharing.</em>',
    doubleBody: 'Two double beds, warm wood details and hand-painted murals give these rooms their own character.',
    doubleMeta: 'Bedrooms · 2 double beds in each',
    kingLabel: 'King room', kingTitle: 'The most open room<br><em>in the house.</em>',
    kingBody: 'An airy room beneath the palapa roof, with a king bed, sitting area and views into the surrounding greenery.',
    kingMeta: 'Bedroom · 1 king bed · sitting area',
    queenLabel: 'Queen-bed rooms', queenTitle: 'Quiet, simple<br><em>and tucked into the trees.</em>',
    queenBody: 'A queen bed, natural textures and filtered jungle light create a calmer, more intimate sleeping space.',
    queenMeta: 'Bedrooms · 1 queen bed in each',
    summaryLabel: 'Sleeping arrangements', summaryTitle: 'Five rooms.<br><em>Seven beds.</em>',
    summaryAssurance: 'Five bedrooms · Seven beds · Up to 14 guests', datesCta: 'Explore dates for your group →',
    summaryDoubleTitle: '2 bedrooms', summaryDoubleBody: '2 double beds in each',
    summaryKingTitle: '1 bedroom', summaryKingBody: '1 king bed',
    summaryQueenTitle: '2 bedrooms', summaryQueenBody: '1 queen bed in each',
    gatherLabel: 'Beyond the bedrooms', gatherTitle: 'The spaces between<br><em>matter too.</em>',
    gatherBody: 'An equipped kitchen, two living areas and direct outdoor access give the group places to cook, gather and spend time together throughout the day.',
    outdoorTitle: 'Live outside', outdoorBody: 'Open-air spaces keep the lagoon and tropical surroundings close.',
    gatherCardTitle: 'Gather', gatherCardBody: 'Two living areas make it easy to spend time together.',
    restTitle: 'Rest', restBody: 'Five bedrooms give the group room to recharge.',
    experienceCta: 'Discover the lagoon experience →',
    amenitiesLabel: 'Confirmed amenities', amenitiesTitle: 'Simple things that<br><em>make the stay easier.</em>',
    essentialsTitle: 'Essentials', essentialsBody: 'Wi-Fi · free parking · equipped kitchen · coffee maker',
    waterTitle: 'Lagoon', waterBody: 'Direct lagoon access · two docks · kayaks for guest use',
    outdoorsTitle: 'Shared spaces', outdoorsBody: 'Two living areas · private grounds · outdoor living spaces',
    planningLabel: 'Before you arrive', planningTitle: 'A little planning<br><em>goes a long way.</em>',
    planningBody: 'Ichkiichpan is intentionally removed from Bacalar’s busiest areas. We recommend purchasing groceries before arrival; the nearest store is approximately 10 minutes away.',
    closingLabel: 'Your stay', closingTitle: 'Come together.<br><em>Then make the place your own.</em>',
    closingAssurance: 'Five bedrooms · Seven beds · Up to 14 guests', planStay: 'Plan your stay',
    languageLabel: 'Change language', previousPhoto: 'Previous photo', nextPhoto: 'Next photo',
    choosePhoto: 'Choose photo', showPhoto: 'Show photo',
    heroImageAlt: 'Shared living room at Ichkiichpan with a Frida Kahlo mural',
    doubleCarouselLabel: 'Double-bed room photos',
    doubleImage1Alt: 'Double-bed bedroom with hand-painted tropical mural',
    doubleImage2Alt: 'Double-bed room showing wood details and private entrance',
    doubleImage3Alt: 'Prepared double beds inside an Ichkiichpan bedroom',
    kingCarouselLabel: 'King room photos', kingImage1Alt: 'Spacious king bedroom beneath a palapa roof',
    kingImage2Alt: 'King bed and sitting area with jungle-facing windows',
    kingImage3Alt: 'Warm wood details inside the king bedroom',
    queenCarouselLabel: 'Queen room photo', queenImage1Alt: 'Queen bedroom surrounded by filtered jungle light',
    outdoorImageAlt: 'Private dock opening onto the Bacalar Lagoon',
    gatherImageAlt: 'Shared living room at Ichkiichpan', restImageAlt: 'Prepared bedroom at Ichkiichpan',
    closingImageAlt: 'Private Ichkiichpan dock at sunset'
  },
  es: {
    title: 'Tu Estancia — Ichkiichpan',
    description: 'Descubre las cinco habitaciones, siete camas, áreas comunes y amenidades junto a la laguna en Ichkiichpan, Bacalar.',
    ogTitle: 'Tu Estancia — Ichkiichpan',
    ogDescription: 'Cinco habitaciones, siete camas y áreas comunes para grupos de hasta 14 huéspedes junto a la Laguna de Bacalar.',
    heroLabel: 'Tu estancia', heroTitle: 'Cinco habitaciones.<br><em>Espacio para todos.</em>',
    heroBody: 'Cinco habitaciones privadas y siete camas permiten que el grupo permanezca unido sin renunciar al espacio personal.',
    glanceLabel: 'De un vistazo', glanceTitle: 'Juntos durante el día.<br><em>Cada quien descansa a su manera.</em>',
    glanceBody: 'Una combinación flexible de habitaciones dobles, king y queen para familias y grupos.',
    guests: 'Huéspedes', bedrooms: 'Habitaciones', beds: 'Camas', livingAreas: 'Salas',
    doubleLabel: 'Habitaciones con camas dobles', doubleTitle: 'Hechas para<br><em>compartir.</em>',
    doubleBody: 'Dos camas dobles, detalles de madera y murales pintados a mano dan a estas habitaciones un carácter propio.',
    doubleMeta: 'Habitaciones · 2 camas dobles en cada una',
    kingLabel: 'Habitación king', kingTitle: 'La habitación más abierta<br><em>de la casa.</em>',
    kingBody: 'Una habitación amplia bajo el techo de palapa, con cama king, sala de estar y vistas hacia la vegetación.',
    kingMeta: 'Habitación · 1 cama king · sala de estar',
    queenLabel: 'Habitaciones queen', queenTitle: 'Tranquilas y sencillas<br><em>entre los árboles.</em>',
    queenBody: 'Una cama queen, texturas naturales y luz filtrada por la selva crean un espacio más tranquilo e íntimo.',
    queenMeta: 'Habitaciones · 1 cama queen en cada una',
    summaryLabel: 'Distribución para dormir', summaryTitle: 'Cinco habitaciones.<br><em>Siete camas.</em>',
    summaryAssurance: 'Cinco habitaciones · Siete camas · Hasta 14 huéspedes', datesCta: 'Explora fechas para tu grupo →',
    summaryDoubleTitle: '2 habitaciones', summaryDoubleBody: '2 camas dobles en cada una',
    summaryKingTitle: '1 habitación', summaryKingBody: '1 cama king',
    summaryQueenTitle: '2 habitaciones', summaryQueenBody: '1 cama queen en cada una',
    gatherLabel: 'Más allá de las habitaciones', gatherTitle: 'Los espacios compartidos<br><em>también importan.</em>',
    gatherBody: 'Una cocina equipada, dos salas y acceso directo al exterior ofrecen lugares para cocinar, reunirse y compartir durante todo el día.',
    outdoorTitle: 'Vivir al aire libre', outdoorBody: 'Los espacios abiertos mantienen cerca la laguna y el entorno tropical.',
    gatherCardTitle: 'Reunirse', gatherCardBody: 'Dos salas hacen que compartir tiempo juntos sea sencillo.',
    restTitle: 'Descansar', restBody: 'Cinco habitaciones dan al grupo espacio para recuperar energía.',
    experienceCta: 'Descubre la experiencia en la laguna →',
    amenitiesLabel: 'Amenidades confirmadas', amenitiesTitle: 'Detalles sencillos que<br><em>facilitan la estancia.</em>',
    essentialsTitle: 'Esenciales', essentialsBody: 'Wi-Fi · estacionamiento gratuito · cocina equipada · cafetera',
    waterTitle: 'Laguna', waterBody: 'Acceso directo a la laguna · dos muelles · kayaks para huéspedes',
    outdoorsTitle: 'Áreas comunes', outdoorsBody: 'Dos salas · terreno privado · espacios para convivir al aire libre',
    planningLabel: 'Antes de llegar', planningTitle: 'Un poco de planeación<br><em>hace la diferencia.</em>',
    planningBody: 'Ichkiichpan está intencionalmente alejado de las zonas más concurridas de Bacalar. Recomendamos comprar víveres antes de llegar; la tienda más cercana está aproximadamente a 10 minutos.',
    closingLabel: 'Tu estancia', closingTitle: 'Vengan juntos.<br><em>Luego hagan suyo el lugar.</em>',
    closingAssurance: 'Cinco habitaciones · Siete camas · Hasta 14 huéspedes', planStay: 'Planea tu estancia',
    languageLabel: 'Cambiar idioma', previousPhoto: 'Foto anterior', nextPhoto: 'Foto siguiente',
    choosePhoto: 'Elegir foto', showPhoto: 'Mostrar foto',
    heroImageAlt: 'Sala compartida de Ichkiichpan con un mural de Frida Kahlo',
    doubleCarouselLabel: 'Fotos de las habitaciones con camas dobles',
    doubleImage1Alt: 'Habitación con camas dobles y mural tropical pintado a mano',
    doubleImage2Alt: 'Habitación doble con detalles de madera y entrada privada',
    doubleImage3Alt: 'Camas dobles preparadas dentro de una habitación de Ichkiichpan',
    kingCarouselLabel: 'Fotos de la habitación king', kingImage1Alt: 'Amplia habitación king bajo un techo de palapa',
    kingImage2Alt: 'Cama king y sala de estar con ventanas hacia la selva',
    kingImage3Alt: 'Detalles cálidos de madera dentro de la habitación king',
    queenCarouselLabel: 'Foto de la habitación queen', queenImage1Alt: 'Habitación queen rodeada de luz filtrada por la selva',
    outdoorImageAlt: 'Muelle privado que se abre hacia la Laguna de Bacalar',
    gatherImageAlt: 'Sala compartida de Ichkiichpan', restImageAlt: 'Habitación preparada en Ichkiichpan',
    closingImageAlt: 'Muelle privado de Ichkiichpan al atardecer'
  }
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initializeCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const previous = carousel.querySelector('.carousel-arrow.prev');
  const next = carousel.querySelector('.carousel-arrow.next');
  const interval = Number(carousel.dataset.interval) || 5500;
  let index = 0;
  let timer = null;
  let visible = false;

  if (slides.length < 2) carousel.classList.add('single-slide');

  function loadSlide(slide) {
    if (!slide || slide.dataset.loaded || slide.dataset.loading) return;
    const src = slide.dataset.src;
    if (!src) return;
    slide.dataset.loading = 'true';
    const image = new Image();
    image.onload = () => {
      slide.style.backgroundImage = `url("${src}")`;
      slide.classList.remove('upload-placeholder');
      slide.dataset.loaded = 'true';
      delete slide.dataset.loading;
    };
    image.onerror = () => {
      slide.classList.add('load-error');
      delete slide.dataset.loading;
    };
    image.src = src;
  }

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    loadSlide(slides[index]);
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dotsWrap?.querySelectorAll('button').forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (reduceMotion || slides.length < 2 || !visible) return;
    loadSlide(slides[(index + 1) % slides.length]);
    timer = window.setInterval(() => show(index + 1), interval);
  }

  slides.forEach((slide, slideIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.dataset.slideIndex = String(slideIndex);
    dot.addEventListener('click', () => {
      show(slideIndex);
      start();
    });
    dotsWrap?.appendChild(dot);
  });

  previous?.addEventListener('click', () => { show(index - 1); start(); });
  next?.addEventListener('click', () => { show(index + 1); start(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', () => { if (!carousel.matches(':hover')) start(); });

  show(0);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting || false;
      if (visible) start(); else stop();
    }, { rootMargin: '300px 0px', threshold: .05 }).observe(carousel);
  } else {
    visible = true;
    start();
  }
}

document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);

let language = localStorage.getItem('ichkiichpan-language') || 'en';

function applyLanguage(lang) {
  language = copy[lang] ? lang : 'en';
  const translated = copy[language];
  document.documentElement.lang = language;
  document.title = translated.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translated.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', translated.ogTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', translated.ogDescription);
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = translated[element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = translated[element.dataset.i18nAria];
    if (value) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const value = translated[element.dataset.i18nAlt];
    if (value) element.setAttribute('alt', value);
  });
  document.querySelectorAll('.carousel-dots button').forEach(dot => {
    dot.setAttribute('aria-label', `${translated.showPhoto} ${Number(dot.dataset.slideIndex) + 1}`);
  });
  langButton?.setAttribute('aria-label', translated.languageLabel);
  if (langButton) langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
  localStorage.setItem('ichkiichpan-language', language);
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));
applyLanguage(language);
