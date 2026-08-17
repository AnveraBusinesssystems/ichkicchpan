const header=document.getElementById('siteHeader');
const menu=document.getElementById('mobileMenu');
const menuButton=document.getElementById('menuButton');
const menuClose=document.getElementById('menuClose');
const langButton=document.getElementById('langButton');

function syncHeader(){header?.classList.toggle('scrolled',window.scrollY>40)}
syncHeader();
window.addEventListener('scroll',syncHeader,{passive:true});

function openMenu(){menu?.classList.add('open');menu?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeMenu(){menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
menuButton?.addEventListener('click',openMenu);
menuClose?.addEventListener('click',closeMenu);
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

const copy={
  en:{
    navStay:'The stay',navLagoon:'Lagoon',navSpaces:'Spaces',navGallery:'Gallery',navLocation:'Location',checkAvailability:'Check availability',
    heroLine:'HIDDEN IN THE NATURE',factPrivate:'Entire private cabin',factBedrooms:'5 bedrooms',factWater:'Direct lagoon access',factDocks:'Private docks & kayaks',
    introTitle:'Between the jungle<br><em>and the lagoon.</em>',introBody:'A private place to slow down, reconnect and spend the day moving between shade, water and open sky.',
    feelingLabel:'The feeling',feelingTitle:'Hidden in the trees.<br>Open to the water.',feelingBody:'Jungle paths, hand-built wood, shaded palapas and quiet corners unfold naturally toward the lagoon.',
    lagoonLabel:'The lagoon',lagoonTitle:'A different blue<br><em>at every hour.</em>',lagoonBody:'Swim in the morning, drift out by kayak, or stay still at the end of the dock and let the day pass slowly.',
    statDirect:'Direct',statAccess:'water access',statPrivate:'Private',statDocks:'docks',statIncluded:'Included',statKayaks:'kayaks',
    spacesLabel:'Inside Ichkiichpan',spacesTitle:'Natural spaces.<br><em>Made to be lived in.</em>',bedroomsTitle:'Bedrooms',bedroomsBody:'Warm, spacious rooms beneath traditional palapa roofs.',cabinTitle:'The cabin',cabinBody:'Wood, earth tones and open-air living surrounded by jungle.',outdoorTitle:'Outdoor living',outdoorBody:'Gather outside and spend the day close to the water.',
    sunsetQuote:'“Some places ask you<br>to slow down.”',galleryLabel:'A closer look',galleryTitle:'Light, water, wood<br><em>and the jungle around you.</em>',
    locationTitle:'Away from the noise.<br><em>Close to the water.</em>',locationBody:'Ichkiichpan rests in a quiet natural setting on the lagoon, surrounded by tropical vegetation and space to disconnect.',
    availabilityLabel:'Your stay starts here',availabilityTitle:'Come closer<br><em>to what matters.</em>',availabilityBody:'Availability and booking will be connected later. For now, explore the place and imagine your stay.',
    footerLine:'Private cabin retreat',backTop:'Back to top ↑',close:'Close ×'
  },
  es:{
    navStay:'La estancia',navLagoon:'Laguna',navSpaces:'Espacios',navGallery:'Galería',navLocation:'Ubicación',checkAvailability:'Ver disponibilidad',
    heroLine:'ESCONDIDA EN LA NATURALEZA',factPrivate:'Cabaña privada completa',factBedrooms:'5 habitaciones',factWater:'Acceso directo a la laguna',factDocks:'Muelles privados y kayaks',
    introTitle:'Entre la selva<br><em>y la laguna.</em>',introBody:'Un lugar privado para bajar el ritmo, reconectar y pasar el día entre sombra, agua y cielo abierto.',
    feelingLabel:'La sensación',feelingTitle:'Escondida entre los árboles.<br>Abierta al agua.',feelingBody:'Senderos entre la selva, madera hecha a mano, palapas con sombra y rincones tranquilos que te llevan naturalmente hacia la laguna.',
    lagoonLabel:'La laguna',lagoonTitle:'Un azul distinto<br><em>a cada hora.</em>',lagoonBody:'Nada por la mañana, sal en kayak o quédate quieto al final del muelle y deja que el día pase despacio.',
    statDirect:'Directo',statAccess:'acceso al agua',statPrivate:'Privados',statDocks:'muelles',statIncluded:'Incluidos',statKayaks:'kayaks',
    spacesLabel:'Dentro de Ichkiichpan',spacesTitle:'Espacios naturales.<br><em>Hechos para disfrutarse.</em>',bedroomsTitle:'Habitaciones',bedroomsBody:'Espacios amplios y cálidos bajo techos tradicionales de palapa.',cabinTitle:'La cabaña',cabinBody:'Madera, tonos tierra y espacios abiertos rodeados de selva.',outdoorTitle:'Vida al aire libre',outdoorBody:'Reúnanse afuera y pasen el día cerca del agua.',
    sunsetQuote:'“Hay lugares que te invitan<br>a bajar el ritmo.”',galleryLabel:'Más de cerca',galleryTitle:'Luz, agua, madera<br><em>y selva alrededor.</em>',
    locationTitle:'Lejos del ruido.<br><em>Cerca del agua.</em>',locationBody:'Ichkiichpan descansa en un entorno natural y tranquilo junto a la laguna, rodeado de vegetación tropical y espacio para desconectarse.',
    availabilityLabel:'Tu estancia empieza aquí',availabilityTitle:'Acércate<br><em>a lo que importa.</em>',availabilityBody:'La disponibilidad y las reservas se conectarán más adelante. Por ahora, recorre el lugar e imagina tu estancia.',
    footerLine:'Retiro privado junto a la laguna',backTop:'Volver arriba ↑',close:'Cerrar ×'
  }
};

let language=localStorage.getItem('ichkiichpan-language')||'en';
function applyLanguage(lang){
  language=copy[lang]?lang:'en';
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n;
    if(copy[language][key]!==undefined) el.innerHTML=copy[language][key];
  });
  if(langButton) langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';
  localStorage.setItem('ichkiichpan-language',language);
}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));
applyLanguage(language);
