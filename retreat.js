const header=document.getElementById('siteHeader');
const menu=document.getElementById('mobileMenu');
const menuButton=document.getElementById('menuButton');
const menuClose=document.getElementById('menuClose');
const langButton=document.getElementById('langButton');
function syncHeader(){header?.classList.toggle('scrolled',window.scrollY>40)}
syncHeader();window.addEventListener('scroll',syncHeader,{passive:true});
function openMenu(){menu?.classList.add('open');menu?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeMenu(){menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
menuButton?.addEventListener('click',openMenu);menuClose?.addEventListener('click',closeMenu);menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const labels={en:{nav:['The Retreat','Your Stay','The Experience','Gallery'],availability:'Check availability',close:'Close ×'},es:{nav:['El Refugio','Tu Estancia','La Experiencia','Galería'],availability:'Ver disponibilidad',close:'Cerrar ×'}};
function syncGalleryLinks(){document.querySelectorAll('.desktop-nav a:last-child,.footer-links a:last-child,.mobile-menu nav a:last-child').forEach(a=>a.href='gallery.html')}
let language=localStorage.getItem('ichkiichpan-language')||'en';
function applyLanguage(lang){language=labels[lang]?lang:'en';document.documentElement.lang=language;const t=labels[language];document.querySelectorAll('.desktop-nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.footer-links a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.mobile-menu nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('a[href="index.html#availability"]').forEach(a=>{if(a.classList.contains('outline-button')||a.classList.contains('solid-button'))a.textContent=t.availability});if(menuClose)menuClose.textContent=t.close;if(langButton)langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';localStorage.setItem('ichkiichpan-language',language);syncGalleryLinks()}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));applyLanguage(language);
