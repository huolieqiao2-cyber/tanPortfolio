(() => {
  const root=document.querySelector('.hobbies-carousel');
  if(!root)return;
  const track=root.querySelector('.carousel-track');
  const slides=[...root.querySelectorAll('.hobby-slide')];
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)');
  let index=0,timer,startX=null,dragX=0;
  const render=()=>{const slide=slides[0].getBoundingClientRect().width;const gap=parseFloat(getComputedStyle(track).columnGap)||0;const viewport=root.querySelector('.carousel-window').clientWidth;const x=viewport/2-(index*(slide+gap)+slide/2)+dragX;track.style.setProperty('--carousel-x',`${x}px`);slides.forEach((item,i)=>item.setAttribute('aria-current',String(i===index)));};
  const move=(step)=>{index=(index+step+slides.length)%slides.length;dragX=0;render();restart();};
  const restart=()=>{clearInterval(timer);if(!reduce.matches)timer=setInterval(()=>move(1),4200);};
  root.querySelector('.prev').addEventListener('click',()=>move(-1));
  root.querySelector('.next').addEventListener('click',()=>move(1));
  root.addEventListener('mouseenter',()=>clearInterval(timer));
  root.addEventListener('mouseleave',restart);
  slides.forEach((slide)=>{
    slide.addEventListener('pointermove',(event)=>{if(startX!==null)return;const rect=slide.getBoundingClientRect();slide.style.setProperty('--focus-x',`${((event.clientX-rect.left)/rect.width*100).toFixed(1)}%`);slide.style.setProperty('--focus-y',`${((event.clientY-rect.top)/rect.height*100).toFixed(1)}%`);});
    slide.addEventListener('pointerleave',()=>{slide.style.removeProperty('--focus-x');slide.style.removeProperty('--focus-y');});
  });
  track.addEventListener('pointerdown',(event)=>{startX=event.clientX;track.setPointerCapture(event.pointerId);clearInterval(timer);});
  track.addEventListener('pointermove',(event)=>{if(startX===null)return;dragX=event.clientX-startX;track.style.transition='none';render();});
  track.addEventListener('pointerup',(event)=>{if(startX===null)return;const delta=event.clientX-startX;startX=null;track.style.transition='';if(Math.abs(delta)>50)move(delta>0?-1:1);else{dragX=0;render();restart();}});
  window.addEventListener('resize',render,{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):restart());
  requestAnimationFrame(()=>{render();restart();});
  const contact=document.querySelector('.contact-page');
  if(contact){const contactObserver=new IntersectionObserver((entries)=>{if(entries[0].isIntersecting){contact.classList.add('is-visible');contactObserver.disconnect();}},{threshold:.2});contactObserver.observe(contact);}
})();
