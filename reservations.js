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
function applyLanguage(lang){language=labels[lang]?lang:'en';document.documentElement.lang=language;const t=labels[language];document.querySelectorAll('.desktop-nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.footer-links a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.mobile-menu nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.booking-current').forEach(a=>a.textContent=t.availability);const manageLink=document.querySelector('.mobile-manage-link');if(manageLink)manageLink.textContent=t.manage;if(menuClose)menuClose.textContent=t.close;if(langButton)langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';localStorage.setItem('ichkiichpan-language',language);renderCalendars();updateSummary()}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));

const state={step:1,maxStep:1,checkIn:'',checkOut:'',adults:2,children:0,nights:0,guest:{},calendarStart:null};
const steps=[...document.querySelectorAll('.booking-step')];
const progressButtons=[...document.querySelectorAll('[data-step-button]')];
const calendarMonths=document.getElementById('calendarMonths');
const dateMessage=document.getElementById('dateMessage');
const availabilityResult=document.getElementById('availabilityResult');
const guestForm=document.getElementById('guestForm');
const guestMessage=document.getElementById('guestMessage');
const mobileBookingBar=document.getElementById('mobileBookingBar');

function isoToday(){const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`}
function toIso(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function fromIso(value){return new Date(`${value}T12:00:00`)}
function formatDate(value,short=false){if(!value)return short?'Select date':'Choose date';return new Intl.DateTimeFormat(language==='es'?'es-MX':'en-US',{month:'short',day:'numeric',year:short?undefined:'numeric'}).format(fromIso(value))}
function nightCount(start,end){if(!start||!end)return 0;return Math.round((fromIso(end)-fromIso(start))/86400000)}
function guestCount(){return state.adults+state.children}
function isPast(iso){return iso<isoToday()}
function isInSelection(iso){return state.checkIn&&state.checkOut&&iso>state.checkIn&&iso<state.checkOut}
function monthName(date){return new Intl.DateTimeFormat(language==='es'?'es-MX':'en-US',{month:'long',year:'numeric'}).format(date)}
function sameMonth(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()}

function updateSummary(){
  const total=guestCount();
  state.nights=nightCount(state.checkIn,state.checkOut);
  document.getElementById('selectedCheckIn').textContent=formatDate(state.checkIn,true);
  document.getElementById('selectedCheckOut').textContent=formatDate(state.checkOut,true);
  document.getElementById('summaryCheckIn').textContent=formatDate(state.checkIn);
  document.getElementById('summaryCheckOut').textContent=formatDate(state.checkOut);
  document.getElementById('summaryGuests').textContent=`${total} guest${total===1?'':'s'}`;
  document.getElementById('summaryNights').textContent=state.nights?`${state.nights} night${state.nights===1?'':'s'}`:'—';
  document.getElementById('guestTotal').textContent=`${total} guest${total===1?'':'s'}`;
  document.getElementById('adultCount').textContent=state.adults;
  document.getElementById('childCount').textContent=state.children;
}

function renderMonth(date){
  const year=date.getFullYear(),month=date.getMonth();
  const first=new Date(year,month,1),last=new Date(year,month+1,0);
  const weekdays=language==='es'?['D','L','M','M','J','V','S']:['S','M','T','W','T','F','S'];
  const cells=[];
  for(let i=0;i<first.getDay();i++)cells.push('<span class="calendar-day empty"></span>');
  for(let day=1;day<=last.getDate();day++){
    const d=new Date(year,month,day),iso=toIso(d);
    const classes=['calendar-day'];
    if(isPast(iso))classes.push('disabled');
    if(iso===state.checkIn)classes.push('selected','check-in');
    if(iso===state.checkOut)classes.push('selected','check-out');
    if(isInSelection(iso))classes.push('in-range');
    cells.push(`<button type="button" class="${classes.join(' ')}" data-date="${iso}" ${isPast(iso)?'disabled':''}>${day}</button>`);
  }
  return `<section class="calendar-month"><h3>${monthName(date)}</h3><div class="calendar-weekdays">${weekdays.map(d=>`<span>${d}</span>`).join('')}</div><div class="calendar-grid">${cells.join('')}</div></section>`;
}

function renderCalendars(){
  if(!calendarMonths)return;
  if(!state.calendarStart){const now=new Date();state.calendarStart=new Date(now.getFullYear(),now.getMonth(),1)}
  const second=new Date(state.calendarStart.getFullYear(),state.calendarStart.getMonth()+1,1);
  calendarMonths.innerHTML=renderMonth(state.calendarStart)+renderMonth(second);
  calendarMonths.querySelectorAll('[data-date]').forEach(button=>button.addEventListener('click',()=>selectDate(button.dataset.date)));
}

function selectDate(iso){
  if(!state.checkIn||state.checkOut||iso<state.checkIn){state.checkIn=iso;state.checkOut=''}
  else if(iso===state.checkIn){state.checkIn='';state.checkOut=''}
  else state.checkOut=iso;
  availabilityResult.hidden=true;dateMessage.textContent='';updateSummary();renderCalendars();
}

document.getElementById('calendarPrev')?.addEventListener('click',()=>{const now=new Date();const currentMonth=new Date(now.getFullYear(),now.getMonth(),1);const prev=new Date(state.calendarStart.getFullYear(),state.calendarStart.getMonth()-1,1);if(prev>=currentMonth){state.calendarStart=prev;renderCalendars()}});
document.getElementById('calendarNext')?.addEventListener('click',()=>{state.calendarStart=new Date(state.calendarStart.getFullYear(),state.calendarStart.getMonth()+1,1);renderCalendars()});
document.getElementById('clearDates')?.addEventListener('click',()=>{state.checkIn='';state.checkOut='';availabilityResult.hidden=true;dateMessage.textContent='';updateSummary();renderCalendars()});

document.querySelectorAll('[data-counter]').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.counter,change=Number(button.dataset.change);const total=guestCount();
  if(change>0&&total>=14)return;
  if(key==='adults')state.adults=Math.max(1,state.adults+change);
  if(key==='children')state.children=Math.max(0,state.children+change);
  updateSummary();
}));

function goToStep(step){
  if(step<1||step>4||step>state.maxStep)return;
  state.step=step;
  steps.forEach(section=>{const active=Number(section.dataset.step)===step;section.hidden=!active;section.classList.toggle('active',active)});
  progressButtons.forEach(button=>{const number=Number(button.dataset.stepButton);button.disabled=number>state.maxStep||number===4;button.classList.toggle('active',number===step);if(number===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current')});
  if(mobileBookingBar){if(step===1){mobileBookingBar.textContent='Check availability';mobileBookingBar.style.display='flex'}else if(step===2){mobileBookingBar.textContent='Continue';mobileBookingBar.style.display='none'}else if(step===3){mobileBookingBar.textContent='Pay & confirm';mobileBookingBar.style.display='none'}else mobileBookingBar.style.display='none'}
  document.getElementById('book')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function unlockStep(step){state.maxStep=Math.max(state.maxStep,step);progressButtons.forEach(button=>button.disabled=Number(button.dataset.stepButton)>state.maxStep)}

progressButtons.forEach(button=>button.addEventListener('click',()=>goToStep(Number(button.dataset.stepButton))));
document.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>goToStep(Number(button.dataset.back))));

document.getElementById('checkAvailabilityButton')?.addEventListener('click',()=>{
  updateSummary();
  if(!state.checkIn||!state.checkOut||state.nights<1){dateMessage.textContent='Select a check-in and check-out date to continue.';availabilityResult.hidden=true;return}
  dateMessage.textContent='';
  document.getElementById('availabilityTitle').textContent='Your stay selection is ready.';
  document.getElementById('availabilityText').textContent=`${formatDate(state.checkIn)} – ${formatDate(state.checkOut)} · ${state.nights} night${state.nights===1?'':'s'} · ${guestCount()} guest${guestCount()===1?'':'s'}. Live availability will be verified here once the public booking endpoint is connected.`;
  availabilityResult.hidden=false;
  availabilityResult.scrollIntoView({behavior:'smooth',block:'center'});
});

document.getElementById('continueFromAvailability')?.addEventListener('click',()=>{unlockStep(2);goToStep(2)});

guestForm?.addEventListener('submit',event=>{event.preventDefault();if(!guestForm.reportValidity()){guestMessage.textContent='Please complete the required guest information.';return}guestMessage.textContent='';state.guest=Object.fromEntries(new FormData(guestForm));unlockStep(3);goToStep(3)});

document.getElementById('stripeButton')?.addEventListener('click',()=>{
  const paymentMessage=document.getElementById('paymentMessage');
  paymentMessage.textContent='Stripe checkout will be connected here before launch. Frontend preview is continuing to confirmation.';
  state.maxStep=4;
  document.getElementById('confirmationGuest').textContent=[state.guest.firstName,state.guest.lastName].filter(Boolean).join(' ')||'Guest';
  document.getElementById('confirmationDates').textContent=state.checkIn&&state.checkOut?`${formatDate(state.checkIn)} – ${formatDate(state.checkOut)}`:'—';
  document.getElementById('confirmationGuests').textContent=`${guestCount()} guest${guestCount()===1?'':'s'}`;
  goToStep(4);
});

document.getElementById('manageForm')?.addEventListener('submit',event=>{event.preventDefault();document.getElementById('manageStatus').textContent='Secure guest reservation lookup will be connected before launch.'});

renderCalendars();updateSummary();applyLanguage(language);
