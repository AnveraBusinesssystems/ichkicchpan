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
let language='en';try{language=localStorage.getItem('ichkiichpan-language')||'en'}catch{}
function applyLanguage(lang){language=labels[lang]?lang:'en';document.documentElement.lang=language;const t=labels[language];document.querySelectorAll('.desktop-nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.footer-links a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.mobile-menu nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('a[href="index.html#availability"]').forEach(a=>{if(a.classList.contains('outline-button')||a.classList.contains('solid-button'))a.textContent=t.availability});if(menuClose)menuClose.textContent=t.close;if(langButton)langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';try{localStorage.setItem('ichkiichpan-language',language)}catch{}syncGalleryLinks()}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));applyLanguage(language);

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('[data-slide]')];
  const dots=[...carousel.querySelectorAll('[data-carousel-dot]')];
  const credit=carousel.querySelector('[data-carousel-credit]');
  let current=0;
  let timer;
  let visible=true;
  let paused=false;
  let pointerStart=null;

  function show(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===current;
      slide.classList.toggle('is-active',active);
      slide.setAttribute('aria-hidden',String(!active));
    });
    dots.forEach((dot,i)=>{
      const active=i===current;
      dot.classList.toggle('is-active',active);
      dot.setAttribute('aria-pressed',String(active));
    });
    if(credit){
      const slide=slides[current];
      const text=slide.dataset.credit;
      credit.hidden=!text;
      credit.textContent=text||'';
      if(slide.dataset.creditUrl)credit.href=slide.dataset.creditUrl;
      else credit.removeAttribute('href');
    }
  }
  function stop(){window.clearInterval(timer)}
  function start(){
    stop();
    if(!reduceMotion&&visible&&!paused)timer=window.setInterval(()=>show(current+1),5600);
  }
  function move(step){show(current+step);start()}

  carousel.querySelector('.carousel-prev')?.addEventListener('click',()=>move(-1));
  carousel.querySelector('.carousel-next')?.addEventListener('click',()=>move(1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start()}));
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}
    if(event.key==='ArrowRight'){event.preventDefault();move(1)}
  });
  carousel.addEventListener('mouseenter',()=>{paused=true;stop()});
  carousel.addEventListener('mouseleave',()=>{paused=false;start()});
  carousel.addEventListener('focusin',()=>{paused=true;stop()});
  carousel.addEventListener('focusout',event=>{
    if(!carousel.contains(event.relatedTarget)){paused=false;start()}
  });
  carousel.addEventListener('pointerdown',event=>{pointerStart=event.clientX});
  carousel.addEventListener('pointerup',event=>{
    if(pointerStart===null)return;
    const distance=event.clientX-pointerStart;
    pointerStart=null;
    if(Math.abs(distance)>45)move(distance>0?-1:1);
  });
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      visible=entries[0]?.isIntersecting??true;
      start();
    },{threshold:.2}).observe(carousel);
  }
  show(0);
  start();
});
