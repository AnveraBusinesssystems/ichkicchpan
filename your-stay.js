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
let language=localStorage.getItem('ichkiichpan-language')||'en';
function applyLanguage(lang){language=labels[lang]?lang:'en';document.documentElement.lang=language;const t=labels[language];document.querySelectorAll('.desktop-nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.footer-links a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('.mobile-menu nav a').forEach((a,i)=>{if(t.nav[i])a.textContent=t.nav[i]});document.querySelectorAll('a[href="index.html#availability"]').forEach(a=>{if(a.classList.contains('outline-button')||a.classList.contains('solid-button'))a.textContent=t.availability});if(menuClose)menuClose.textContent=t.close;if(langButton)langButton.innerHTML=language==='en'?'EN <span>·</span> ES':'ES <span>·</span> EN';localStorage.setItem('ichkiichpan-language',language)}
langButton?.addEventListener('click',()=>applyLanguage(language==='en'?'es':'en'));applyLanguage(language);

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('.carousel-slide')];
  const dotsWrap=carousel.querySelector('.carousel-dots');
  const prev=carousel.querySelector('.carousel-arrow.prev');
  const next=carousel.querySelector('.carousel-arrow.next');
  const interval=Number(carousel.dataset.interval)||5500;
  let index=0;
  let timer=null;

  slides.forEach((slide,i)=>{
    const src=slide.dataset.src;
    if(src){
      const img=new Image();
      img.onload=()=>{slide.style.backgroundImage=`url("${src}")`;slide.classList.remove('upload-placeholder')};
      img.src=src;
    }
    const dot=document.createElement('button');
    dot.type='button';
    dot.setAttribute('aria-label',`Show photo ${i+1}`);
    if(i===0)dot.classList.add('active');
    dot.addEventListener('click',()=>{show(i);restart()});
    dotsWrap?.appendChild(dot);
  });

  const dots=[...dotsWrap?.querySelectorAll('button')||[]];
  function show(nextIndex){
    index=(nextIndex+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
    dots.forEach((dot,i)=>dot.classList.toggle('active',i===index));
  }
  function start(){if(reduceMotion||slides.length<2)return;timer=window.setInterval(()=>show(index+1),interval)}
  function stop(){if(timer){window.clearInterval(timer);timer=null}}
  function restart(){stop();start()}

  prev?.addEventListener('click',()=>{show(index-1);restart()});
  next?.addEventListener('click',()=>{show(index+1);restart()});
  carousel.addEventListener('mouseenter',stop);
  carousel.addEventListener('mouseleave',start);
  carousel.addEventListener('focusin',stop);
  carousel.addEventListener('focusout',()=>{if(!carousel.matches(':hover'))start()});
  start();
});
