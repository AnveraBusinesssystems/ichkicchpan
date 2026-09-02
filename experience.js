const langButton = document.getElementById('langButton');
const introParagraph = document.querySelector('.experience-intro-copy > p');
const introLink = document.createElement('a');

if (introParagraph) {
  introLink.className = 'experience-intro-link';
  introLink.href = 'reservations.html#book';
  introParagraph.insertAdjacentElement('afterend', introLink);
}

const copy = {
  en: {
    title: 'The Experience — Ichkiichpan',
    description: 'Discover Bacalar Lagoon, kayaks, Bacalar town, Chacchoben and Mahahual from Ichkiichpan.',
    languageLabel: 'Change language',
    heroLabel: 'The Experience',
    heroTitle: 'The lagoon at your door.<br><em>The Maya world beyond it.</em>',
    heroBody: 'Begin on the water at Ichkiichpan, then decide whether the day stays slow or takes you farther into southern Quintana Roo.',
    introLabel: 'FROM ICHKIICHPAN',
    introTitle: 'Start with the water.<br><em>Then choose how far to go.</em>',
    introBody: 'The experience begins with direct access to Bacalar Lagoon and the kayaks at the property. Beyond the retreat, Bacalar town, the Maya city of Chacchoben and the Caribbean coast at Mahahual each offer a completely different kind of day.',
    introCta: 'Plan your stay →',
    lagoonLabel: 'Bacalar Lagoon',
    lagoonTitle: 'The Seven Colors<br><em>start right outside.</em>',
    lagoonBody: 'Bacalar is a freshwater lagoon known for its changing blue tones. From Ichkiichpan, the water is not an excursion—it is part of the stay: swim, sit on the dock or move out across the lagoon at your own pace.',
    direct: 'Direct',
    lagoonAccess: 'Lagoon access from the property',
    kayakLabel: 'Kayaks',
    kayakTitle: 'Leave from<br><em>your own dock.</em>',
    kayakBody: 'Kayaks are available for guest use, making one of Bacalar’s signature ways of exploring the lagoon part of the property itself. Go out when the conditions feel right, return when you want, and keep the day entirely your own.',
    included: 'Included',
    guestUse: 'For guest use',
    beyondLabel: 'Beyond the lagoon',
    beyondTitle: 'Three directions.<br><em>Three different days.</em>',
    beyondBody: 'Leave the retreat when you want more history, town life or the Caribbean coast. These are the three experiences worth building around.',
    bacalarTitle: 'History by the lagoon',
    bacalarBody: 'Explore the town that grew around the 18th-century Fort of San Felipe, then move between the main plaza, cafés, restaurants and the waterfront before returning to the quieter side of the lagoon.',
    chacchobenTitle: 'The Maya world inland',
    chacchobenBody: 'Chacchoben is the most important known Maya settlement in Quintana Roo’s Lake Region. Occupation began around 300 BC, with the urban core taking shape around AD 250 among forest and freshwater landscapes.',
    mahahualTitle: 'Trade lagoon for sea',
    mahahualBody: 'Mahahual brings a different horizon: a laid-back Caribbean fishing village, a walkable malecón and warm coastal water known for reefs, snorkeling and diving.',
    promptLabel: 'Your Bacalar stay',
    promptTitle: 'Build the days around your group.',
    assurance: 'Private retreat · Up to 14 guests · Direct lagoon access',
    availability: 'Plan your stay →',
    careLabel: 'Respect the lagoon',
    careTitle: 'Beautiful because<br><em>it is alive.</em>',
    careBody: 'Bacalar is also an unusually delicate ecosystem, including living stromatolites. Enjoy the water responsibly: never touch or stand on stromatolites and follow local conservation guidance while on the lagoon.',
    closingLabel: 'Your stay',
    closingTitle: 'Come together.<br><em>Then make the place your own.</em>',
    closingAssurance: 'Private retreat · Up to 14 guests · Direct lagoon access',
    closingButton: 'Plan your stay',
    carouselLabels: ['Bacalar photo gallery', 'Chacchoben photo gallery', 'Mahahual photo gallery'],
    previousLabels: ['Previous Bacalar image', 'Previous Chacchoben image', 'Previous Mahahual image'],
    nextLabels: ['Next Bacalar image', 'Next Chacchoben image', 'Next Mahahual image'],
    dotLabels: ['Bacalar', 'Chacchoben', 'Mahahual'],
    imageAlts: [
      'Aerial view of Fort San Felipe beside the turquoise water of Bacalar Lagoon',
      'Stone courtyard and tower inside Fort San Felipe in Bacalar',
      'Top-down aerial view of Fort San Felipe and its star-shaped walls',
      'Elevated view of the Maya temple at Chacchoben surrounded by tropical forest',
      'Maya temple at Chacchoben beneath a vivid blue sky',
      'Visitors crossing the green plaza before a Chacchoben temple',
      'Wooden pier and small boat extending into the turquoise Caribbean water at Mahahual',
      'Sailboat resting beside the turquoise Caribbean shore at Mahahual',
      'White sand curving around calm turquoise water at Mahahual'
    ]
  },
  es: {
    title: 'La Experiencia — Ichkiichpan',
    description: 'Descubre la Laguna de Bacalar, los kayaks, el pueblo de Bacalar, Chacchoben y Mahahual desde Ichkiichpan.',
    languageLabel: 'Cambiar idioma',
    heroLabel: 'La Experiencia',
    heroTitle: 'La laguna a sus puertas.<br><em>El mundo maya más allá.</em>',
    heroBody: 'Comiencen en el agua de Ichkiichpan y decidan si el día transcurre sin prisa o los lleva más lejos por el sur de Quintana Roo.',
    introLabel: 'DESDE ICHKIICHPAN',
    introTitle: 'Empiecen por el agua.<br><em>Luego elijan hasta dónde llegar.</em>',
    introBody: 'La experiencia comienza con acceso directo a la Laguna de Bacalar y los kayaks de la propiedad. Más allá del refugio, el pueblo de Bacalar, la ciudad maya de Chacchoben y la costa caribeña de Mahahual ofrecen tres formas completamente distintas de vivir el día.',
    introCta: 'Planea tu estancia →',
    lagoonLabel: 'Laguna de Bacalar',
    lagoonTitle: 'Los Siete Colores<br><em>comienzan aquí mismo.</em>',
    lagoonBody: 'Bacalar es una laguna de agua dulce conocida por sus tonos cambiantes de azul. Desde Ichkiichpan, el agua no es una excursión: es parte de la estancia. Naden, descansen en el muelle o recorran la laguna a su propio ritmo.',
    direct: 'Directo',
    lagoonAccess: 'Acceso a la laguna desde la propiedad',
    kayakLabel: 'Kayaks',
    kayakTitle: 'Salgan desde<br><em>su propio muelle.</em>',
    kayakBody: 'Los kayaks están disponibles para los huéspedes, convirtiendo una de las mejores formas de explorar Bacalar en parte de la propiedad. Salgan cuando las condiciones sean ideales, regresen cuando quieran y disfruten el día a su manera.',
    included: 'Incluidos',
    guestUse: 'Para uso de los huéspedes',
    beyondLabel: 'Más allá de la laguna',
    beyondTitle: 'Tres direcciones.<br><em>Tres días diferentes.</em>',
    beyondBody: 'Salgan del refugio cuando quieran descubrir más historia, vida local o la costa caribeña. Estas son las tres experiencias que vale la pena incluir.',
    bacalarTitle: 'Historia junto a la laguna',
    bacalarBody: 'Conozcan el pueblo que creció alrededor del Fuerte de San Felipe del siglo XVIII. Recorran la plaza, sus cafés, restaurantes y el malecón antes de regresar al lado más tranquilo de la laguna.',
    chacchobenTitle: 'El mundo maya tierra adentro',
    chacchobenBody: 'Chacchoben es el asentamiento maya conocido más importante de la Región de los Lagos de Quintana Roo. Su ocupación comenzó alrededor del año 300 a. C. y su núcleo urbano tomó forma hacia el año 250 d. C.',
    mahahualTitle: 'Cambien la laguna por el mar',
    mahahualBody: 'Mahahual ofrece un horizonte distinto: un tranquilo pueblo pesquero caribeño, un malecón para recorrer y aguas cálidas conocidas por sus arrecifes, el snorkel y el buceo.',
    promptLabel: 'Tu estancia en Bacalar',
    promptTitle: 'Diseñen los días a su manera.',
    assurance: 'Retiro privado · Hasta 14 huéspedes · Acceso directo a la laguna',
    availability: 'Planea tu estancia →',
    careLabel: 'Cuiden la laguna',
    careTitle: 'Hermosa porque<br><em>está viva.</em>',
    careBody: 'Bacalar también es un ecosistema extraordinariamente delicado que incluye estromatolitos vivos. Disfruten el agua de manera responsable: nunca los toquen ni se paren sobre ellos y sigan las recomendaciones locales de conservación.',
    closingLabel: 'Tu estancia',
    closingTitle: 'Vengan juntos.<br><em>Luego hagan suyo el lugar.</em>',
    closingAssurance: 'Retiro privado · Hasta 14 huéspedes · Acceso directo a la laguna',
    closingButton: 'Planea tu estancia',
    carouselLabels: ['Galería de fotos de Bacalar', 'Galería de fotos de Chacchoben', 'Galería de fotos de Mahahual'],
    previousLabels: ['Imagen anterior de Bacalar', 'Imagen anterior de Chacchoben', 'Imagen anterior de Mahahual'],
    nextLabels: ['Siguiente imagen de Bacalar', 'Siguiente imagen de Chacchoben', 'Siguiente imagen de Mahahual'],
    dotLabels: ['Bacalar', 'Chacchoben', 'Mahahual'],
    imageAlts: [
      'Vista aérea del Fuerte de San Felipe junto al agua turquesa de la Laguna de Bacalar',
      'Patio de piedra y torre dentro del Fuerte de San Felipe en Bacalar',
      'Vista aérea cenital del Fuerte de San Felipe y sus murallas en forma de estrella',
      'Vista elevada del templo maya de Chacchoben rodeado de selva tropical',
      'Templo maya de Chacchoben bajo un cielo azul intenso',
      'Visitantes cruzando la plaza verde frente a un templo de Chacchoben',
      'Muelle de madera y pequeña embarcación sobre el agua turquesa del Caribe en Mahahual',
      'Velero junto a la costa caribeña de aguas turquesas en Mahahual',
      'Arena blanca bordeando las tranquilas aguas turquesas de Mahahual'
    ]
  }
};

let language = 'en';
try {
  language = localStorage.getItem('ichkiichpan-language') || 'en';
} catch {}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.innerHTML = value;
}

function applyLanguage(lang) {
  language = copy[lang] ? lang : 'en';
  const translated = copy[language];
  document.documentElement.lang = language;
  document.title = translated.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translated.description);

  setHtml('.experience-hero-copy .kicker', translated.heroLabel);
  setHtml('.experience-hero-copy h1', translated.heroTitle);
  setHtml('.experience-hero-copy > p:last-child', translated.heroBody);
  setHtml('.experience-intro-label .kicker', translated.introLabel);
  setHtml('.experience-intro-copy h2', translated.introTitle);
  setHtml('.experience-intro-copy p', translated.introBody);
  setHtml('.experience-intro-link', translated.introCta);

  const features = document.querySelectorAll('.feature-copy');
  if (features[0]) {
    features[0].querySelector('.kicker').textContent = translated.lagoonLabel;
    features[0].querySelector('h2').innerHTML = translated.lagoonTitle;
    features[0].querySelector('h2 + p').textContent = translated.lagoonBody;
    features[0].querySelector('.fact-line strong').textContent = translated.direct;
    features[0].querySelector('.fact-line span').textContent = translated.lagoonAccess;
  }
  if (features[1]) {
    features[1].querySelector('.kicker').textContent = translated.kayakLabel;
    features[1].querySelector('h2').innerHTML = translated.kayakTitle;
    features[1].querySelector('h2 + p').textContent = translated.kayakBody;
    features[1].querySelector('.fact-line strong').textContent = translated.included;
    features[1].querySelector('.fact-line span').textContent = translated.guestUse;
  }

  setHtml('.beyond-head .kicker', translated.beyondLabel);
  setHtml('.beyond-head h2', translated.beyondTitle);
  setHtml('.beyond-head > p:last-child', translated.beyondBody);

  const destinations = document.querySelectorAll('.destination-copy');
  if (destinations[0]) {
    destinations[0].querySelector('h3').textContent = translated.bacalarTitle;
    destinations[0].querySelector('h3 + p').textContent = translated.bacalarBody;
  }
  if (destinations[1]) {
    destinations[1].querySelector('h3').textContent = translated.chacchobenTitle;
    destinations[1].querySelector('h3 + p').textContent = translated.chacchobenBody;
  }
  if (destinations[2]) {
    destinations[2].querySelector('h3').textContent = translated.mahahualTitle;
    destinations[2].querySelector('h3 + p').textContent = translated.mahahualBody;
  }

  setHtml('.experience-booking-prompt .kicker', translated.promptLabel);
  setHtml('.experience-booking-prompt h3', translated.promptTitle);
  setHtml('.experience-booking-prompt-copy > p:last-child', translated.assurance);
  setHtml('.experience-booking-prompt .experience-booking-link', translated.availability);
  setHtml('.lagoon-care .kicker', translated.careLabel);
  setHtml('.lagoon-care h2', translated.careTitle);
  setHtml('.lagoon-care-copy p', translated.careBody);
  setHtml('.shared-closing-copy .kicker', translated.closingLabel);
  setHtml('.shared-closing-copy h2', translated.closingTitle);
  setHtml('.shared-closing-copy .closing-assurance', translated.closingAssurance);
  setHtml('.shared-closing-copy .solid-button', translated.closingButton);

  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel, index) => {
    carousel.setAttribute('aria-label', translated.carouselLabels[index]);
    carousel.querySelector('.carousel-prev')?.setAttribute('aria-label', translated.previousLabels[index]);
    carousel.querySelector('.carousel-next')?.setAttribute('aria-label', translated.nextLabels[index]);
    carousel.querySelectorAll('[data-carousel-dot]').forEach((dot, dotIndex) => {
      dot.setAttribute('aria-label', `${language === 'es' ? 'Mostrar imagen' : 'Show image'} ${dotIndex + 1} ${language === 'es' ? 'de' : 'of'} ${translated.dotLabels[index]}`);
    });
  });
  document.querySelectorAll('[data-slide]').forEach((image, index) => {
    image.alt = translated.imageAlts[index];
  });

  langButton?.setAttribute('aria-label', translated.languageLabel);
  if (langButton) langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
  try {
    localStorage.setItem('ichkiichpan-language', language);
  } catch {}
  document.dispatchEvent(new CustomEvent('experience:language'));
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  const credit = carousel.querySelector('[data-carousel-credit]');
  let current = 0;
  let timer;
  let visible = true;
  let paused = false;
  let pointerStart = null;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    if (credit) {
      const slide = slides[current];
      const rawCredit = slide.dataset.credit;
      const translatedCredit = language === 'es' ? rawCredit?.replace(/^Photo:/, 'Foto:') : rawCredit;
      credit.hidden = !translatedCredit;
      credit.textContent = translatedCredit || '';
      if (slide.dataset.creditUrl) credit.href = slide.dataset.creditUrl;
      else credit.removeAttribute('href');
    }
  }

  function stop() {
    window.clearInterval(timer);
  }

  function start() {
    stop();
    if (!reduceMotion && visible && !paused) timer = window.setInterval(() => show(current + 1), 5600);
  }

  function move(step) {
    show(current + step);
    start();
  }

  carousel.querySelector('.carousel-prev')?.addEventListener('click', () => move(-1));
  carousel.querySelector('.carousel-next')?.addEventListener('click', () => move(1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    show(index);
    start();
  }));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  });
  carousel.addEventListener('mouseenter', () => {
    paused = true;
    stop();
  });
  carousel.addEventListener('mouseleave', () => {
    paused = false;
    start();
  });
  carousel.addEventListener('focusin', () => {
    paused = true;
    stop();
  });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) {
      paused = false;
      start();
    }
  });
  carousel.addEventListener('pointerdown', event => {
    pointerStart = event.clientX;
  });
  carousel.addEventListener('pointerup', event => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  });
  document.addEventListener('experience:language', () => show(current));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      start();
    }, { threshold: .2 }).observe(carousel);
  }
  show(0);
  start();
});

applyLanguage(language);
