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
})();