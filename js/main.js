(function(){
const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
requestAnimationFrame(raf);
lenis.on('scroll',ScrollTrigger.update);
gsap.ticker.add(t=>{lenis.raf(t*1000)});
gsap.ticker.lagSmoothing(0);
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,cx=0,cy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
document.querySelectorAll('a,button,.magnetic-btn,.service-card').forEach(el=>{
el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});
(function animCursor(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;
dot.style.left=mx+'px';dot.style.top=my+'px';
ring.style.left=cx+'px';ring.style.top=cy+'px';
requestAnimationFrame(animCursor)})();
const word='REROOM';const lettersDiv=document.querySelector('#preloader .letters');
word.split('').forEach((ch,i)=>{const s=document.createElement('span');
s.className='letter';s.textContent=ch;s.style.animationDelay=i*.1+'s';lettersDiv.appendChild(s)});
setTimeout(()=>{document.getElementById('preloader').classList.add('hidden')},2000);
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>50)});
const revealEls=document.querySelectorAll('.reveal');
const revealObs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');revealObs.unobserve(e.target)}})},{threshold:.15});
revealEls.forEach(el=>revealObs.observe(el));
const counters=document.querySelectorAll('.counter');
const counterObs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.target;
let cur=0;const step=target/60;
const tm=setInterval(()=>{cur+=step;if(cur>=target){el.textContent=target;clearInterval(tm)}
else el.textContent=Math.floor(cur)},30);counterObs.unobserve(el)}})},{threshold:.5});
counters.forEach(c=>counterObs.observe(c));
document.querySelectorAll('.service-card').forEach(card=>{
card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
card.style.transform='perspective(800px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateZ(10px)'});
card.addEventListener('mouseleave',()=>{card.style.transform='perspective(800px) rotateY(0) rotateX(0) translateZ(0)'})});
document.querySelectorAll('.magnetic-btn').forEach(btn=>{
btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();
const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
btn.style.transform='translate('+x*.3+'px,'+y*.3+'px)'});
btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)'})});
gsap.registerPlugin(ScrollTrigger);
const track=document.querySelector('.portfolio-track');
if(track){const ts=track.scrollWidth-window.innerWidth;
gsap.to(track,{x:-ts,ease:'none',scrollTrigger:{trigger:'.portfolio',start:'top top',end:'+='+track.scrollWidth,pin:true,scrub:1,invalidateOnRefresh:true}})}
gsap.utils.toArray('.section-title h2').forEach(h=>{
gsap.from(h,{y:60,opacity:0,duration:1,scrollTrigger:{trigger:h,start:'top 85%'}})});
gsap.to('.about-img img',{yPercent:-15,ease:'none',
scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:true}});
gsap.utils.toArray('.advantage-row img').forEach(img=>{
gsap.to(img,{yPercent:-10,ease:'none',
scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}})});
if('ontouchstart' in window){dot.style.display='none';ring.style.display='none';
document.documentElement.style.cursor='auto';document.body.style.cursor='auto'}
})();