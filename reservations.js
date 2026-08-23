const header=document.getElementById('siteHeader');
const menu=document.getElementById('mobileMenu');
const menuButton=document.getElementById('menuButton');
const menuClose=document.getElementById('menuClose');
const langButton=document.getElementById('langButton');

function openMenu(){menu?.classList.add('open');menu?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeMenu(){menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
menuButton?.addEventListener('click',openMenu);menuClose?.addEventListener('click',closeMenu);menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

const labels={en:{nav:['The Retreat','Your Stay','The Experience','Gallery'],availability:'Check availability',manage:'Manage my reservation',close:'Close ×'},es:{nav:['El Refugio','Tu Estancia','La Experiencia','Galería'],availability:'Ver disponibilidad',manage:'Gestionar mi reserva',close:'Cerrar ×'}};
let language=localStorage.getItem('ichkiichpan-language')||'en';
function applyLanguage(lang){language=labels[lang]?lang:'en';document.documentElement.lang=language;const t=labels[language];document.querySelectorAll('.desktop-nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.footer-links a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.mobile-menu nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.booking-current,.mobile-booking-bar').forEach(a=>a.textContent=t.availability);const manageLink=document.querySelector('.mobile-manage-link');if(manageLink)manageLink.textContent=t.manage;if(menuClose)menuClose.textContent=t.close;if(langButton)langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';localStorage.setItem('ichkiichpan-language',language)}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));applyLanguage(language);

const checkIn=document.getElementById('checkIn');
const checkOut=document.getElementById('checkOut');
const availabilityForm=document.getElementById('availabilityForm');
const bookingResult=document.getElementById('bookingResult');
const resultTitle=document.getElementById('resultTitle');
const resultBody=document.getElementById('resultBody');
const changeDates=document.getElementById('changeDates');

function isoToday(){const now=new Date();const y=now.getFullYear();const m=String(now.getMonth()+1).padStart(2,'0');const d=String(now.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
function plusDays(dateString,days){const d=new Date(`${dateString}T12:00:00`);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}
const today=isoToday();
if(checkIn){checkIn.min=today;if(!checkIn.value)checkIn.value=plusDays(today,14)}
if(checkOut){checkOut.min=plusDays(today,1);if(!checkOut.value)checkOut.value=plusDays(today,17)}
checkIn?.addEventListener('change',()=>{if(!checkIn.value)return;checkOut.min=plusDays(checkIn.value,1);if(!checkOut.value||checkOut.value<=checkIn.value)checkOut.value=plusDays(checkIn.value,3)});

availabilityForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=Object.fromEntries(new FormData(availabilityForm));
  if(!data.checkIn||!data.checkOut||data.checkOut<=data.checkIn){bookingResult.hidden=false;resultTitle.textContent='Please check your dates.';resultBody.textContent='Check-out must be after check-in.';return}
  const nights=Math.round((new Date(`${data.checkOut}T12:00:00`)-new Date(`${data.checkIn}T12:00:00`))/86400000);
  bookingResult.hidden=false;
  resultTitle.textContent='Your stay is ready to check.';
  resultBody.textContent=`${nights} night${nights===1?'':'s'} · ${data.guests} guests · ${data.checkIn} to ${data.checkOut}. Live availability and pricing will appear here once the public booking endpoint is connected.`;
  bookingResult.scrollIntoView({behavior:'smooth',block:'center'});
});
changeDates?.addEventListener('click',()=>{bookingResult.hidden=true;checkIn?.focus()});

document.getElementById('manageForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const status=document.getElementById('manageStatus');
  status.textContent='Secure guest lookup will be connected after the public reservation authentication endpoint is added.';
});
