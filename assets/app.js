const canvas=document.getElementById('mesh');
const ctx=canvas.getContext('2d');
let w,h,dpr,pts=[];
function size(){
  dpr=window.devicePixelRatio||1;
  w=canvas.width=innerWidth*dpr; h=canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px';
  pts=Array.from({length:105},(_,i)=>({
    x:(i/104)*w,
    y:h*.27 + Math.sin(i*.18)*h*.08 + (Math.random()-.5)*h*.18,
    vx:(Math.random()-.5)*.35*dpr,
    vy:(Math.random()-.5)*.35*dpr,
    r:(Math.random()*2+1)*dpr
  }));
}
function draw(){
  ctx.clearRect(0,0,w,h);
  for(const p of pts){
    p.x+=p.vx;p.y+=p.vy;
    if(p.y<h*.05||p.y>h*.62)p.vy*=-1;
    const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,24*dpr);
    grad.addColorStop(0,'rgba(131,73,255,.9)');
    grad.addColorStop(1,'rgba(31,143,255,0)');
    ctx.fillStyle=grad;ctx.beginPath();ctx.arc(p.x,p.y,22*dpr,0,Math.PI*2);ctx.fill();
  }
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
      if(dist<140*dpr){
        ctx.strokeStyle=`rgba(${80+Math.floor(i%2)*100},${140},255,${(1-dist/(140*dpr))*.42})`;
        ctx.lineWidth=.7*dpr;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
window.addEventListener('resize',size);size();draw();

document.getElementById('theme').addEventListener('click',()=>{
  document.body.classList.toggle('light');
  document.getElementById('theme').textContent=document.body.classList.contains('light')?'☀':'☾';
});
