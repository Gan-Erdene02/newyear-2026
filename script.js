const target=new Date(new Date().getFullYear()+1,0,1);
const $=id=>document.getElementById(id);

function animate(id, value){
  const el=$(id);
  if(el.textContent!==value){
    el.textContent=value;
    el.style.animation="bounce 0.6s";
    el.addEventListener("animationend",()=>el.style.animation="",{once:true});
  }
}

setInterval(()=>{
  const now=new Date();
  let d=target-now; if(d<0)d=0;
  const s=Math.floor(d/1000)%60, 
        m=Math.floor(d/60000)%60, 
        h=Math.floor(d/3600000)%24, 
        dd=Math.floor(d/86400000);

  animate('s',String(s).padStart(2,'0'));
  animate('m',String(m).padStart(2,'0'));
  animate('h',String(h).padStart(2,'0'));
  animate('d',String(dd).padStart(2,'0'));
},1000);

// snow
const snow=document.getElementById('snow');
for(let i=0;i<120;i++){
  const f=document.createElement('div');
  f.className='flake'; f.textContent='❄'; 
  f.style.left=Math.random()*100+'vw';
  f.style.fontSize=8+Math.random()*18+'px';
  f.style.animationDuration=6+Math.random()*12+'s';
  f.style.opacity=0.6+Math.random()*0.4;
  snow.appendChild(f);
}

// fireworks
const c=document.getElementById('fw'),ctx=c.getContext('2d');
function resize(){c.width=innerWidth; c.height=innerHeight;}
resize(); addEventListener('resize',resize);
let parts=[];
function fire(){for(let i=0;i<40;i++)parts.push({x:Math.random()*c.width,y:Math.random()*c.height/2,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6,life:60});}
setInterval(fire,1200);
(function anim(){
  ctx.clearRect(0,0,c.width,c.height);
  parts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.life--;
    ctx.fillStyle='rgba(255,215,120,.9)';
    ctx.fillRect(p.x,p.y,3,3);
  });
  parts=parts.filter(p=>p.life>0);
  requestAnimationFrame(anim);
})();
