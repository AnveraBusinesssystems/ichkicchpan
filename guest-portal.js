const DEMO={email:'guest@ichkiichpan.com',code:'ICH-DEMO26',guest:'Sofía',fullName:'Sofía Martínez'};
const accessShell=document.getElementById('accessShell');
const identifyCard=document.getElementById('identifyCard');
const verificationCard=document.getElementById('verificationCard');
const portalApp=document.getElementById('portalApp');
const logoutButton=document.getElementById('logoutButton');
const accessForm=document.getElementById('accessForm');
const accessMessage=document.getElementById('accessMessage');
const emailInput=document.getElementById('guestEmail');
const codeInput=document.getElementById('reservationCode');
const toast=document.getElementById('portalToast');
let toastTimer;

function showToast(message){clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function normalizeCode(value){return String(value||'').trim().toUpperCase()}
function setVerifiedSession(enabled){if(enabled)sessionStorage.setItem('ichkiichpan-guest-demo','verified');else sessionStorage.removeItem('ichkiichpan-guest-demo')}
function openVerification(email){identifyCard.hidden=true;verificationCard.hidden=false;document.getElementById('verificationEmail').textContent=email}
function openPortal(){setVerifiedSession(true);accessShell.hidden=true;portalApp.hidden=false;logoutButton.hidden=false;document.getElementById('sidebarGuestName').textContent=DEMO.guest;document.getElementById('sidebarReservationCode').textContent=DEMO.code;showView('overview');window.scrollTo({top:0,behavior:'smooth'})}
function returnToLogin(){setVerifiedSession(false);portalApp.hidden=true;accessShell.hidden=false;identifyCard.hidden=false;verificationCard.hidden=true;logoutButton.hidden=true;accessMessage.textContent='';window.scrollTo({top:0,behavior:'smooth'})}
function showView(view){document.querySelectorAll('.portal-view').forEach(section=>{const active=section.dataset.view===view;section.hidden=!active;section.classList.toggle('active',active)});document.querySelectorAll('[data-portal-view]').forEach(button=>button.classList.toggle('active',button.dataset.portalView===view));const mobile=document.getElementById('mobileViewSelect');if(mobile)mobile.value=view;window.scrollTo({top:0,behavior:'smooth'})}

accessForm?.addEventListener('submit',event=>{event.preventDefault();if(!accessForm.reportValidity())return;const email=emailInput.value.trim().toLowerCase();const code=normalizeCode(codeInput.value);if(email!==DEMO.email||code!==DEMO.code){accessMessage.textContent='Demo reservation not found. Use the demo access details below.';return}accessMessage.textContent='';openVerification(email)});
document.getElementById('fillDemoButton')?.addEventListener('click',()=>{emailInput.value=DEMO.email;codeInput.value=DEMO.code;accessMessage.textContent='Demo reservation loaded.'});
document.getElementById('openDemoLinkButton')?.addEventListener('click',openPortal);
document.getElementById('backToLoginButton')?.addEventListener('click',()=>{verificationCard.hidden=true;identifyCard.hidden=false});
logoutButton?.addEventListener('click',returnToLogin);
document.querySelectorAll('[data-portal-view]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.portalView)));
document.querySelectorAll('[data-go-view]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.goView)));
document.getElementById('mobileViewSelect')?.addEventListener('change',event=>showView(event.target.value));
document.getElementById('copyCodeButton')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(DEMO.code);showToast('Reservation code copied.')}catch{showToast(`Reservation code: ${DEMO.code}`)}});
document.getElementById('saveArrivalButton')?.addEventListener('click',()=>showToast('Arrival time saved for this demo.'));
document.getElementById('receiptButton')?.addEventListener('click',()=>showToast('A real Stripe receipt will open here.'));

document.getElementById('requestForm')?.addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);document.getElementById('demoRequestType').textContent=data.get('type');document.getElementById('demoRequestText').textContent=data.get('message');document.getElementById('emptyRequest').hidden=true;document.getElementById('demoRequestItem').hidden=false;document.getElementById('requestMessage').textContent='Request received in the demo.';form.querySelector('button[type="submit"]').disabled=true;showToast('Request received.');});

if(sessionStorage.getItem('ichkiichpan-guest-demo')==='verified')openPortal();