const canvas=document.getElementById('mesh');
if(canvas){
  const ctx=canvas.getContext('2d');let w,h,dpr,pts=[];
  function size(){dpr=devicePixelRatio||1;w=canvas.width=innerWidth*dpr;h=canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';pts=Array.from({length:55},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18*dpr,vy:(Math.random()-.5)*.18*dpr,r:(Math.random()*1.3+.6)*dpr}))}
  function draw(){ctx.clearRect(0,0,w,h);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.fillStyle='rgba(90,167,255,.45)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130*dpr){ctx.strokeStyle=`rgba(90,167,255,${(1-d/(130*dpr))*.16})`;ctx.lineWidth=.6*dpr;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}requestAnimationFrame(draw)}
  addEventListener('resize',size);size();draw();
}

const themeButton=document.getElementById('theme');
if(themeButton){
  themeButton.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    themeButton.textContent=document.body.classList.contains('light')?'☀':'☾';
  });
}

document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.cert-card').forEach(card=>{card.style.display=(f==='all'||card.dataset.type===f)?'flex':'none'});
}));

const box=document.createElement('div');
box.className='lightbox';
box.innerHTML='<button type="button">Close</button><img alt="">';
document.body.appendChild(box);
const boxImg=box.querySelector('img');
box.querySelector('button').onclick=()=>box.classList.remove('open');
box.onclick=e=>{if(e.target===box)box.classList.remove('open')};
document.querySelectorAll('.gallery img,.clickable-image').forEach(img=>img.addEventListener('click',()=>{boxImg.src=img.src;boxImg.alt=img.alt||'';box.classList.add('open')}));
