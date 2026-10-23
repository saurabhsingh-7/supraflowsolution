(function(){'use strict';
var $=function(s,r){return (r||document).querySelector(s)},
    $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var yr=$('#yr'); if(yr) yr.textContent=new Date().getFullYear();
var header=$('#siteHeader'), toTop=$('#to-top'), tick=false;
function onScroll(){var y=window.scrollY||window.pageYOffset;
  if(header) header.classList.toggle('scrolled',y>8);
  if(toTop) toTop.classList.toggle('show',y>620); tick=false;}
window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll);}},{passive:true});
onScroll();
if(toTop) toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
var burger=$('#burger'), drawer=$('#mobileNav');
if(burger&&drawer){
  function setD(o){drawer.dataset.open=o?'true':'false';
    burger.setAttribute('aria-expanded',o?'true':'false');
    document.body.style.overflow=o?'hidden':'';}
  burger.addEventListener('click',function(){setD(drawer.dataset.open!=='true');});
  $$('a',drawer).forEach(function(a){a.addEventListener('click',function(){setD(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.dataset.open==='true'){setD(false);burger.focus();}});
}
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},
    {threshold:0.06,rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach(function(el){io.observe(el);});
}else{$$('.reveal').forEach(function(el){el.classList.add('in');});}

/* WhatsApp floating button with auto-greeting popup — injected site-wide */
(function(){
  var waNumber='916306115296';
  var waMsg=encodeURIComponent("Hi Supraflow Solutions, I'd like to talk about a Zoho project.");
  var waHref='https://wa.me/'+waNumber+'?text='+waMsg;

  var wrap=document.createElement('div');
  wrap.className='wa-wrap';

  var bubble=document.createElement('div');
  bubble.className='wa-bubble';
  bubble.innerHTML='<button class="wa-bubble-close" aria-label="Dismiss">&times;</button>'+
    '<strong>Hey there! \uD83D\uDC4B</strong><span>Got a Zoho question? Chat with us directly on WhatsApp.</span>';
  bubble.addEventListener('click',function(e){
    if(e.target.classList.contains('wa-bubble-close')){
      bubble.classList.remove('show');
      e.stopPropagation();
      return;
    }
    window.open(waHref,'_blank','noopener,noreferrer');
  });

  var a=document.createElement('a');
  a.href=waHref;
  a.className='wa-float';
  a.target='_blank';
  a.rel='noopener noreferrer';
  a.setAttribute('aria-label','Chat with us on WhatsApp');
  a.innerHTML='<span class="wa-tip">Chat on WhatsApp</span><svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.4.68 4.66 1.86 6.6L4 29l7.56-1.98a11.93 11.93 0 0 0 4.46.86h.01c6.62 0 12-5.4 12-12.02C28.03 8.4 22.63 3 16.02 3zm0 21.9h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.76.98 1-3.66-.24-.38a9.86 9.86 0 0 1-1.52-5.23C6.08 9.52 10.6 5 16.02 5c2.65 0 5.14 1.03 7.02 2.91a9.86 9.86 0 0 1 2.9 7.03c0 5.42-4.52 9.96-9.92 9.96zm5.44-7.45c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>';

  wrap.appendChild(bubble);
  wrap.appendChild(a);
  document.body.appendChild(wrap);

  var dismissed=false;
  try{dismissed=sessionStorage.getItem('wa-bubble-dismissed')==='1';}catch(e){}
  if(!dismissed){
    setTimeout(function(){ bubble.classList.add('show'); },2800);
  }
  bubble.querySelector('.wa-bubble-close').addEventListener('click',function(){
    try{sessionStorage.setItem('wa-bubble-dismissed','1');}catch(e){}
  });
})();
})();