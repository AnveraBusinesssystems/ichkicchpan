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
    navRetreat:'The retreat',navStay:'Your stay',navLagoon:'The lagoon',navGallery:'Gallery',checkAvailability:'Check availability',
    heroLine:'HIDDEN IN THE NATURE',
    introTitle:'Between the jungle<br><em>and the lagoon.</em>',introBody:'A private place to slow down, reconnect and spend the day moving between shade, water and open sky.',
    feelingLabel:'The retreat',feelingTitle:'Hidden in the trees.<br>Open to the water.',feelingBody:'Jungle paths, hand-built wood, shaded palapas and quiet corners unfold naturally toward the lagoon.',discoverRetreat:'Discover the retreat →',
    glanceLabel:'At a glance',glanceTitle:'A place<br><em>of your own.</em>',factBedrooms:'Bedrooms',factGuests:'Guests',factDocks:'Docks',factDirect:'Direct',factLagoon:'Lagoon access',factKayaks:'Kayaks',factIncluded:'For guest use',
    lagoonLabel:'The lagoon',lagoonTitle:'A different blue<br><em>at every hour.</em>',lagoonBody:'Swim in the morning, drift out by kayak, or stay still at the end of the dock and let the day pass slowly.',statDirect:'Direct',statAccess:'water access',statDocks:'docks',statKayaks:'Kayaks',statIncluded:'for guest use',
    spacesLabel:'Inside Ichkiichpan',spacesTitle:'Three ways<br><em>to settle in.</em>',sleepTitle:'Sleep',sleepBody:'Five bedrooms give the group room to spread out and recharge.',gatherTitle:'Gather',gatherBody:'Shared spaces inside and out make it easy to spend time together.',outsideTitle:'Live outside',outsideBody:'Palapas, docks and open-air spaces keep the lagoon close all day.',
    galleryLabel:'A closer look',galleryTitle:'Light, water, wood<br><em>and the jungle around you.</em>',
    availabilityLabel:'Your stay starts here',availabilityTitle:'Make the lagoon<br><em>your place for a while.</em>',availabilityBody:'Plan a private stay surrounded by jungle, open sky and direct access to the water.',
    footerLine:'Private lagoon retreat',backTop:'Back to top ↑',close:'Close ×'
  },
  es:{
    navRetreat:'El refugio',navStay:'Tu estancia',navLagoon:'La laguna',navGallery:'Galería',checkAvailability:'Ver disponibilidad',
    heroLine:'ESCONDIDA EN LA NATURALEZA',
    introTitle:'Entre la selva<br><em>y la laguna.</em>',introBody:'Un lugar privado para bajar el ritmo, reconectar y pasar el día entre sombra, agua y cielo abierto.',
    feelingLabel:'El refugio',feelingTitle:'Escondida entre los árboles.<br>Abierta al agua.',feelingBody:'Senderos entre la selva, madera, palapas con sombra y rincones tranquilos que se abren naturalmente hacia la laguna.',discoverRetreat:'Descubre el refugio →',
    glanceLabel:'De un vistazo',glanceTitle:'Un lugar<br><em>solo para ustedes.</em>',factBedrooms:'Habitaciones',factGuests:'Huéspedes',factDocks:'Muelles',factDirect:'Directo',factLagoon:'Acceso a la laguna',factKayaks:'Kayaks',factIncluded:'Para uso de huéspedes',
    lagoonLabel:'La laguna',lagoonTitle:'Un azul distinto<br><em>a cada hora.</em>',lagoonBody:'Nada por la mañana, sal en kayak o quédate quieto al final del muelle y deja que el día pase despacio.',statDirect:'Directo',statAccess:'acceso al agua',statDocks:'muelles',statKayaks:'Kayaks',statIncluded:'para huéspedes',
    spacesLabel:'Dentro de Ichkiichpan',spacesTitle:'Tres formas<br><em>de disfrutarlo.</em>',sleepTitle:'Descansa',sleepBody:'Cinco habitaciones le dan al grupo espacio para descansar y tener privacidad.',gatherTitle:'Reúnanse',gatherBody:'Espacios compartidos interiores y exteriores para pasar tiempo juntos.',outsideTitle:'Vive afuera',outsideBody:'Palapas, muelles y áreas abiertas mantienen la laguna cerca durante todo el día.',
    galleryLabel:'Más de cerca',galleryTitle:'Luz, agua, madera<br><em>y selva alrededor.</em>',
    availabilityLabel:'Tu estancia empieza aquí',availabilityTitle:'Haz de la laguna<br><em>tu lugar por unos días.</em>',availabilityBody:'Planea una estancia privada rodeada de selva, cielo abierto y acceso directo al agua.',
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
