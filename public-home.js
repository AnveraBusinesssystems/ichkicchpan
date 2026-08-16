const header=document.getElementById('siteHeader');
const menu=document.getElementById('mobileMenu');
const menuButton=document.getElementById('menuButton');
const menuClose=document.getElementById('menuClose');

function syncHeader(){header.classList.toggle('scrolled',window.scrollY>40)}
syncHeader();
window.addEventListener('scroll',syncHeader,{passive:true});

function openMenu(){menu.classList.add('open');menu.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeMenu(){menu.classList.remove('open');menu.setAttribute('aria-hidden','true');document.body.style.overflow=''}
menuButton?.addEventListener('click',openMenu);
menuClose?.addEventListener('click',closeMenu);
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.12,rootMargin:'0px 0px -4%'});

document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
