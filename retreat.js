const langButton = document.getElementById('langButton');

const copy = {
  en: {
    title: 'The Retreat — Ichkiichpan',
    description: 'Discover Ichkiichpan, an entirely private Bacalar lagoon retreat for groups of up to 14 guests.',
    ogTitle: 'The Retreat — Ichkiichpan',
    ogDescription: 'An entirely private Bacalar lagoon retreat with five bedrooms, seven beds and direct access to the water.',
    heroLabel: 'The retreat',
    heroTitle: 'A place hidden between<br><em>jungle and water.</em>',
    heroBody: 'Private by nature. Open to the lagoon.',
    introTitle: 'A retreat<br><em>entirely your own.</em>',
    introBody: 'Ichkiichpan is an entire private retreat on the Bacalar Lagoon, created for families and groups who want to stay together with space, quiet and direct access to the water.',
    introCta: 'Check dates for your group →',
    experienceLabel: 'The experience',
    experienceTitle: 'Made for<br><em>being together.</em>',
    experienceBody: 'Shared spaces make it easy to gather around meals, conversation and long days outside, while five bedrooms and different corners of the property give everyone room to slow down in their own way.',
    experienceCta: 'See the rooms and shared spaces →',
    propertyLabel: 'The property',
    propertyTitle: 'Room to gather.<br><em>Space to slow down.</em>',
    guests: 'Guests',
    bedrooms: 'Bedrooms',
    beds: 'Beds',
    privateFact: 'Private',
    entireRetreat: 'Entire retreat',
    landscapeLabel: 'Built around the landscape',
    landscapeTitle: 'The landscape<br><em>shapes the stay.</em>',
    landscapeBody: 'Paths, shade, wood, palapa roofs and open-air spaces create a natural transition from the cabin to the lagoon.',
    landscapeCta: 'Discover the lagoon experience →',
    characterLabel: 'The character of Ichkiichpan',
    characterTitle: 'From shade<br><em>to open water.</em>',
    characterBody: 'The property moves gradually from jungle paths and timber structures to palapas, open-air spaces and the lagoon itself. The transitions are part of what gives Ichkiichpan its character.',
    pathsTitle: 'Paths',
    pathsBody: 'Wooden walkways and vegetation connect the property naturally.',
    shelterTitle: 'Shelter',
    shelterBody: 'Wood, shade and palapa roofs keep the architecture grounded in the landscape.',
    waterTitle: 'Water',
    waterBody: 'The property opens toward the lagoon, docks and wide views beyond.',
    characterCarouselAria: 'Paths, shelter and water at Ichkiichpan',
    closingLabel: 'Your stay',
    closingTitle: 'Come together.<br><em>Then make the place your own.</em>',
    closingAssurance: 'Five bedrooms · Seven beds · Up to 14 guests',
    planStay: 'Plan your stay',
    languageLabel: 'Change language',
    heroImageAlt: 'Ichkiichpan cabin surrounded by jungle vegetation',
    togetherImageAlt: 'The complete Ichkiichpan retreat surrounded by tropical forest',
    propertyImageAlt: 'Main two-level cabin at Ichkiichpan',
    landscapeImageAlt: 'Aerial view of the Ichkiichpan docks and Bacalar Lagoon',
    pathImageAlt: 'Wooden path opening onto the Bacalar Lagoon',
    shelterImageAlt: 'Palapa roof and timber balcony at Ichkiichpan',
    waterImageAlt: 'Private dock at sunset on the Bacalar Lagoon',
    closingImageAlt: 'Private Ichkiichpan dock at sunset'
  },
  es: {
    title: 'El Refugio — Ichkiichpan',
    description: 'Descubre Ichkiichpan, un refugio completamente privado en la Laguna de Bacalar para grupos de hasta 14 huéspedes.',
    ogTitle: 'El Refugio — Ichkiichpan',
    ogDescription: 'Un refugio privado en la Laguna de Bacalar con cinco habitaciones, siete camas y acceso directo al agua.',
    heroLabel: 'El refugio',
    heroTitle: 'Un lugar oculto entre<br><em>la selva y la laguna.</em>',
    heroBody: 'Privado por naturaleza. Abierto a la laguna.',
    introTitle: 'Un refugio<br><em>solo para ustedes.</em>',
    introBody: 'Ichkiichpan es un refugio completo y privado en la Laguna de Bacalar, creado para familias y grupos que desean compartir con amplitud, tranquilidad y acceso directo al agua.',
    introCta: 'Consultar fechas para su grupo →',
    experienceLabel: 'La experiencia',
    experienceTitle: 'Creado para<br><em>estar juntos.</em>',
    experienceBody: 'Los espacios compartidos invitan a reunirse alrededor de la mesa, conversar y disfrutar largos días al aire libre, mientras cinco habitaciones y distintos rincones ofrecen a todos un lugar para descansar a su manera.',
    experienceCta: 'Conocer las habitaciones y áreas comunes →',
    propertyLabel: 'La propiedad',
    propertyTitle: 'Espacio para reunirse.<br><em>Calma para descansar.</em>',
    guests: 'Huéspedes',
    bedrooms: 'Habitaciones',
    beds: 'Camas',
    privateFact: 'Privado',
    entireRetreat: 'Todo el refugio',
    landscapeLabel: 'Diseñado alrededor del paisaje',
    landscapeTitle: 'El paisaje<br><em>da forma a la estancia.</em>',
    landscapeBody: 'Senderos, sombra, madera, techos de palapa y espacios abiertos crean una transición natural desde la cabaña hasta la laguna.',
    landscapeCta: 'Descubrir la experiencia en la laguna →',
    characterLabel: 'El carácter de Ichkiichpan',
    characterTitle: 'De la sombra<br><em>al agua abierta.</em>',
    characterBody: 'La propiedad avanza suavemente desde los senderos entre la selva y las estructuras de madera hasta las palapas, los espacios abiertos y la laguna. Esa transición define el carácter de Ichkiichpan.',
    pathsTitle: 'Senderos',
    pathsBody: 'Pasarelas de madera y vegetación conectan la propiedad de forma natural.',
    shelterTitle: 'Refugio',
    shelterBody: 'La madera, la sombra y los techos de palapa integran la arquitectura con el paisaje.',
    waterTitle: 'Agua',
    waterBody: 'La propiedad se abre hacia la laguna, los muelles y las amplias vistas.',
    characterCarouselAria: 'Senderos, refugio y agua en Ichkiichpan',
    closingLabel: 'Tu estancia',
    closingTitle: 'Vengan juntos.<br><em>Luego hagan suyo el lugar.</em>',
    closingAssurance: 'Cinco habitaciones · Siete camas · Hasta 14 huéspedes',
    planStay: 'Planea tu estancia',
    languageLabel: 'Cambiar idioma',
    heroImageAlt: 'Cabaña Ichkiichpan rodeada de vegetación tropical',
    togetherImageAlt: 'El refugio completo de Ichkiichpan rodeado de selva tropical',
    propertyImageAlt: 'Cabaña principal de dos niveles en Ichkiichpan',
    landscapeImageAlt: 'Vista aérea de los muelles de Ichkiichpan y la Laguna de Bacalar',
    pathImageAlt: 'Sendero de madera que se abre hacia la Laguna de Bacalar',
    shelterImageAlt: 'Techo de palapa y balcón de madera en Ichkiichpan',
    waterImageAlt: 'Muelle privado al atardecer en la Laguna de Bacalar',
    closingImageAlt: 'Muelle privado de Ichkiichpan al atardecer'
  }
};

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
  langButton?.setAttribute('aria-label', translated.languageLabel);
  if (langButton) langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
  localStorage.setItem('ichkiichpan-language', language);
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));
applyLanguage(language);
