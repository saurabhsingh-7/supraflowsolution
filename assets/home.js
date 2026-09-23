(function(){'use strict';
var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
// case-study tabs (WAI-ARIA)
var tabs=$$('.tab'), panels=$$('.panel');
function sel(i,focus){
  tabs.forEach(function(t,n){var on=n===i;
    t.setAttribute('aria-selected',on?'true':'false');
    t.tabIndex=on?0:-1; if(on&&focus)t.focus();});
  panels.forEach(function(p,n){p.hidden=n!==i;});
}
tabs.forEach(function(t,i){
  t.addEventListener('click',function(){sel(i);});
  t.addEventListener('keydown',function(e){
    var m={ArrowRight:i+1,ArrowLeft:i-1,Home:0,End:tabs.length-1};
    if(!(e.key in m))return; e.preventDefault();
    sel((m[e.key]+tabs.length)%tabs.length,true);});
});
// contact form
var FORM_ENDPOINT='https://formspree.io/f/mrpbqwld', FALLBACK='hello@supraflowsolutions.com';
var form=document.getElementById('contactForm');
if(form){
  var status=document.getElementById('formStatus'), btn=document.getElementById('submitBtn');
  function say(s,m){status.dataset.state=s;status.textContent=m;
    status.scrollIntoView({behavior:'smooth',block:'center'});}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(form._gotcha.value)return;
    if(!form.checkValidity()){say('err','Please complete the required fields marked with an asterisk.');
      var bad=form.querySelector(':invalid'); if(bad)bad.focus(); return;}
    var fd=new FormData(form); fd.delete('_gotcha');
    fd.append('_subject','New enquiry — Supraflow Solutions website');
    fd.append('page',location.href);
    btn.disabled=true; btn.textContent='Sending…';
    if(!FORM_ENDPOINT){
      var lines=[]; fd.forEach(function(v,k){if(['_subject','page','consent'].indexOf(k)<0)lines.push(k+': '+v);});
      window.location.href='mailto:'+FALLBACK+'?subject='+encodeURIComponent('Zoho enquiry from '+(fd.get('name')||'website'))+'&body='+encodeURIComponent(lines.join('\n'));
      say('ok','Opening your email client — send the message and we will reply within one business day.');
      btn.disabled=false; btn.textContent='Send enquiry'; return;}
    fetch(FORM_ENDPOINT,{method:'POST',body:fd,headers:{Accept:'application/json'}})
      .then(function(r){if(!r.ok)throw new Error(r.status);form.reset();
        say('ok','Thank you — your enquiry is in. A senior consultant will reply within one business day.');})
      .catch(function(){say('err','Something went wrong. Please email '+FALLBACK+' or call +91 6306 115 296.');})
      .finally(function(){btn.disabled=false;btn.textContent='Send enquiry';});
  });
}
})();