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

const state={step:1,maxStep:1,checkIn:'',checkOut:'',guests:2,nights:0,guest:{}};
const steps=[...document.querySelectorAll('.booking-step')];
const progressButtons=[...document.querySelectorAll('[data-step-button]')];
const checkIn=document.getElementById('checkIn');
const checkOut=document.getElementById('checkOut');
const guests=document.getElementById('guests');
const availabilityForm=document.getElementById('availabilityForm');
const dateMessage=document.getElementById('dateMessage');
const guestForm=document.getElementById('guestForm');
const guestMessage=document.getElementById('guestMessage');

function isoToday(){const now=new Date();const y=now.getFullYear();const m=String(now.getMonth()+1).padStart(2,'0');const d=String(now.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
function plusDays(dateString,days){const d=new Date(`${dateString}T12:00:00`);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}
function formatDate(value){if(!value)return 'Choose date';return new Intl.DateTimeFormat(language==='es'?'es-MX':'en-US',{month:'short',day:'numeric',year:'numeric'}).format(new Date(`${value}T12:00:00`))}
function nightCount(start,end){if(!start||!end)return 0;return Math.round((new Date(`${end}T12:00:00`)-new Date(`${start}T12:00:00`))/86400000)}

function updateSummary(){document.getElementById('summaryCheckIn').textContent=formatDate(state.checkIn);document.getElementById('summaryCheckOut').textContent=formatDate(state.checkOut);document.getElementById('summaryGuests').textContent=`${state.guests} guest${state.guests===1?'':'s'}`;document.getElementById('summaryNights').textContent=state.nights?`${state.nights} night${state.nights===1?'':'s'}`:'—'}
function syncDateState(){state.checkIn=checkIn?.value||'';state.checkOut=checkOut?.value||'';state.guests=Number(guests?.value||2);state.nights=nightCount(state.checkIn,state.checkOut);updateSummary()}

function goToStep(step){if(step<1||step>state.maxStep||step>5)return;state.step=step;steps.forEach(section=>{const active=Number(section.dataset.step)===step;section.hidden=!active;section.classList.toggle('active',active)});progressButtons.forEach(button=>{const number=Number(button.dataset.stepButton);button.disabled=number>state.maxStep;button.classList.toggle('active',number===step);if(number===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current')});document.getElementById('book')?.scrollIntoView({behavior:'smooth',block:'start'})}
function unlockStep(step){state.maxStep=Math.max(state.maxStep,step);progressButtons.forEach(button=>button.disabled=Number(button.dataset.stepButton)>state.maxStep)}

const today=isoToday();if(checkIn){checkIn.min=today;if(!checkIn.value)checkIn.value=plusDays(today,14)}if(checkOut){checkOut.min=plusDays(today,1);if(!checkOut.value)checkOut.value=plusDays(today,17)}syncDateState();
checkIn?.addEventListener('change',()=>{if(!checkIn.value)return;checkOut.min=plusDays(checkIn.value,1);if(!checkOut.value||checkOut.value<=checkIn.value)checkOut.value=plusDays(checkIn.value,3);syncDateState()});
checkOut?.addEventListener('change',syncDateState);guests?.addEventListener('change',syncDateState);

availabilityForm?.addEventListener('submit',event=>{event.preventDefault();syncDateState();if(!state.checkIn||!state.checkOut||state.nights<1){dateMessage.textContent='Check-out must be after check-in.';return}dateMessage.textContent='';unlockStep(2);goToStep(2)});

document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>{const next=Number(button.dataset.next);unlockStep(next);goToStep(next)}));
document.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>goToStep(Number(button.dataset.back))));
progressButtons.forEach(button=>button.addEventListener('click',()=>goToStep(Number(button.dataset.stepButton))));

guestForm?.addEventListener('submit',event=>{event.preventDefault();if(!guestForm.reportValidity()){guestMessage.textContent='Please complete the required guest information.';return}guestMessage.textContent='';state.guest=Object.fromEntries(new FormData(guestForm));unlockStep(4);goToStep(4)});

document.getElementById('stripeButton')?.addEventListener('click',()=>{const paymentMessage=document.getElementById('paymentMessage');paymentMessage.textContent='Stripe checkout will be connected here before launch. For frontend preview, continuing to confirmation.';unlockStep(5);document.getElementById('confirmationGuest').textContent=[state.guest.firstName,state.guest.lastName].filter(Boolean).join(' ')||'Guest';document.getElementById('confirmationDates').textContent=state.checkIn&&state.checkOut?`${formatDate(state.checkIn)} – ${formatDate(state.checkOut)}`:'—';document.getElementById('confirmationGuests').textContent=`${state.guests} guest${state.guests===1?'':'s'}`;goToStep(5)});

document.getElementById('manageForm')?.addEventListener('submit',event=>{event.preventDefault();const status=document.getElementById('manageStatus');status.textContent='Secure guest reservation lookup will be connected before launch.'});
