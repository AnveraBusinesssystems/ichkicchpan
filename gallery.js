const langButton = document.getElementById('langButton');

const copy = {
  en: {
    title: 'Gallery — Ichkiichpan',
    description: 'Explore Ichkiichpan through the Bacalar Lagoon, architecture, bedrooms and private spaces shared by your group.',
    languageLabel: 'Change language',
    heroLabel: 'Gallery',
    heroTitle: 'See the retreat.<br><em>Feel the setting.</em>',
    heroBody: 'A visual walk from the lagoon and jungle paths to the rooms and shared spaces your group can make its own.',
    introTitle: 'The whole stay,<br><em>in one place.</em>',
    introBody: 'A closer look at the water, architecture and private spaces waiting for your group at Ichkiichpan.',
    planArrow: 'Plan your stay →',
    waterLabel: '01 · Water & Landscape',
    waterTitle: 'Where the property<br><em>meets the lagoon.</em>',
    lagoonCaption: 'Lagoon',
    aboveCaption: 'From above',
    retreatCaption: 'Retreat',
    pathCaption: 'Path to the water',
    waterCaption: 'The water',
    eveningCaption: 'Evening',
    dockCaption: 'At the dock',
    lastLightCaption: 'Last light',
    retreatLabel: '02 · The Retreat',
    retreatTitle: 'Wood, shade<br><em>and open air.</em>',
    architectureCaption: 'Architecture',
    treesCaption: 'Hidden in the trees',
    houseCaption: 'The main house',
    outdoorsCaption: 'Outdoors',
    livingCaption: 'Living outside',
    interiorCaption: 'Interior',
    woodCaption: 'Warm wood details',
    privateLabel: 'Your private retreat',
    privateTitle: 'A place to gather without sharing it with anyone else.',
    privateAssurance: 'Five bedrooms · Up to 14 guests · Direct lagoon access',
    roomsLabel: '03 · Your Stay',
    roomsTitle: 'Five bedrooms.<br><em>Different ways to settle in.</em>',
    doubleTitle: 'Double-Bed Rooms',
    doubleBody: 'Two double beds, wood details and hand-painted character.',
    kingTitle: 'King Room',
    kingBody: 'The most open sleeping space beneath the palapa roof.',
    queenTitle: 'Queen-Bed Rooms',
    queenBody: 'Quieter rooms tucked into the greenery.',
    groupLabel: 'For the whole group',
    groupTitle: 'Five bedrooms. One retreat, entirely yours.',
    groupAssurance: 'Up to 14 guests · Seven beds · Complete privacy',
    beyondLabel: 'Beyond the property',
    beyondTitle: 'The lagoon at your door.<br><em>The Maya world beyond it.</em>',
    beyondBody: 'Begin with the water at Ichkiichpan, then discover Bacalar, Chacchoben and the Caribbean coast at your own pace.',
    experienceArrow: 'Explore the experience →',
    closingLabel: 'Your stay',
    closingTitle: 'Come together.<br><em>Then make the place your own.</em>',
    closingAssurance: 'Five bedrooms · Seven beds · Up to 14 guests',
    heroAlt: 'Sunset over Bacalar Lagoon at Ichkiichpan',
    aerialAlt: 'Aerial view of Ichkiichpan and Bacalar Lagoon',
    pathAlt: 'Jungle path leading toward the lagoon',
    waterAlt: 'Blue water of Bacalar Lagoon',
    dockAlt: 'Dock at sunset on Bacalar Lagoon',
    lastLightAlt: 'Sunset across Bacalar Lagoon',
    treesAlt: 'Ichkiichpan cabin surrounded by tropical vegetation',
    houseAlt: 'Exterior of the main Ichkiichpan cabin',
    outdoorAlt: 'Outdoor living area at Ichkiichpan',
    woodAlt: 'Bedroom with warm wood details at Ichkiichpan',
    doubleAlt1: 'Double-bed room at Ichkiichpan',
    doubleAlt2: 'Details inside a double-bed room at Ichkiichpan',
    doubleAlt3: 'Interior of a double-bed room at Ichkiichpan',
    kingAlt1: 'King room at Ichkiichpan',
    kingAlt2: 'Sitting area inside the king room at Ichkiichpan',
    kingAlt3: 'Interior of the king room at Ichkiichpan',
    queenAlt1: 'Queen-bed room at Ichkiichpan',
    queenAlt2: 'Interior of a queen-bed room at Ichkiichpan'
  },
  es: {
    title: 'Galería — Ichkiichpan',
    description: 'Descubre Ichkiichpan a través de la Laguna de Bacalar, su arquitectura, habitaciones y espacios privados para tu grupo.',
    languageLabel: 'Cambiar idioma',
    heroLabel: 'Galería',
    heroTitle: 'Conozcan el refugio.<br><em>Sientan el entorno.</em>',
    heroBody: 'Un recorrido visual desde la laguna y los senderos entre la selva hasta las habitaciones y los espacios compartidos que su grupo podrá hacer suyos.',
    introTitle: 'Toda la estancia,<br><em>en un solo lugar.</em>',
    introBody: 'Una mirada cercana al agua, la arquitectura y los espacios privados que esperan a su grupo en Ichkiichpan.',
    planArrow: 'Planea tu estancia →',
    waterLabel: '01 · Agua y paisaje',
    waterTitle: 'Donde la propiedad<br><em>se encuentra con la laguna.</em>',
    lagoonCaption: 'Laguna',
    aboveCaption: 'Desde las alturas',
    retreatCaption: 'El refugio',
    pathCaption: 'El camino al agua',
    waterCaption: 'El agua',
    eveningCaption: 'Atardecer',
    dockCaption: 'En el muelle',
    lastLightCaption: 'La última luz',
    retreatLabel: '02 · El Refugio',
    retreatTitle: 'Madera, sombra<br><em>y espacios abiertos.</em>',
    architectureCaption: 'Arquitectura',
    treesCaption: 'Entre los árboles',
    houseCaption: 'La casa principal',
    outdoorsCaption: 'Exterior',
    livingCaption: 'Vivir al aire libre',
    interiorCaption: 'Interior',
    woodCaption: 'Detalles cálidos en madera',
    privateLabel: 'Su refugio privado',
    privateTitle: 'Un lugar para reunirse sin compartirlo con nadie más.',
    privateAssurance: 'Cinco habitaciones · Hasta 14 huéspedes · Acceso directo a la laguna',
    roomsLabel: '03 · Tu Estancia',
    roomsTitle: 'Cinco habitaciones.<br><em>Diferentes formas de descansar.</em>',
    doubleTitle: 'Habitaciones con camas matrimoniales',
    doubleBody: 'Dos camas matrimoniales, detalles en madera y carácter pintado a mano.',
    kingTitle: 'Habitación king',
    kingBody: 'El espacio para dormir más amplio bajo el techo de palapa.',
    queenTitle: 'Habitaciones queen',
    queenBody: 'Habitaciones más tranquilas, resguardadas entre la vegetación.',
    groupLabel: 'Para todo el grupo',
    groupTitle: 'Cinco habitaciones. Un refugio completamente suyo.',
    groupAssurance: 'Hasta 14 huéspedes · Siete camas · Privacidad total',
    beyondLabel: 'Más allá de la propiedad',
    beyondTitle: 'La laguna a sus puertas.<br><em>El mundo maya más allá.</em>',
    beyondBody: 'Comiencen por el agua en Ichkiichpan y luego descubran Bacalar, Chacchoben y la costa caribeña a su propio ritmo.',
    experienceArrow: 'Exploren la experiencia →',
    closingLabel: 'Tu estancia',
    closingTitle: 'Vengan juntos.<br><em>Luego hagan suyo el lugar.</em>',
    closingAssurance: 'Cinco habitaciones · Siete camas · Hasta 14 huéspedes',
    heroAlt: 'Atardecer sobre la Laguna de Bacalar en Ichkiichpan',
    aerialAlt: 'Vista aérea de Ichkiichpan y la Laguna de Bacalar',
    pathAlt: 'Sendero entre la selva que conduce hacia la laguna',
    waterAlt: 'Agua azul de la Laguna de Bacalar',
    dockAlt: 'Muelle al atardecer sobre la Laguna de Bacalar',
    lastLightAlt: 'Atardecer sobre la Laguna de Bacalar',
    treesAlt: 'Cabaña de Ichkiichpan rodeada de vegetación tropical',
    houseAlt: 'Exterior de la cabaña principal de Ichkiichpan',
    outdoorAlt: 'Sala exterior de Ichkiichpan',
    woodAlt: 'Habitación con detalles cálidos en madera en Ichkiichpan',
    doubleAlt1: 'Habitación con camas matrimoniales en Ichkiichpan',
    doubleAlt2: 'Detalles de una habitación con camas matrimoniales en Ichkiichpan',
    doubleAlt3: 'Interior de una habitación con camas matrimoniales en Ichkiichpan',
    kingAlt1: 'Habitación king en Ichkiichpan',
    kingAlt2: 'Sala dentro de la habitación king en Ichkiichpan',
    kingAlt3: 'Interior de la habitación king en Ichkiichpan',
    queenAlt1: 'Habitación queen en Ichkiichpan',
    queenAlt2: 'Interior de una habitación queen en Ichkiichpan'
  }
};

let language = 'en';
try {
  language = localStorage.getItem('ichkiichpan-language') || 'en';
} catch {}

function applyLanguage(lang) {
  language = copy[lang] ? lang : 'en';
  const translated = copy[language];
  document.documentElement.lang = language;
  document.title = translated.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translated.description);
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = translated[element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(image => {
    const value = translated[image.dataset.i18nAlt];
    if (value) image.alt = value;
  });
  langButton?.setAttribute('aria-label', translated.languageLabel);
  if (langButton) langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
  try {
    localStorage.setItem('ichkiichpan-language', language);
  } catch {}
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));
applyLanguage(language);
