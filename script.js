const canvas = document.getElementById("qbg");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

/* PARTICLES */
let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx:(Math.random()-0.5),
    vy:(Math.random()-0.5)
  });
}

/* CIRCUIT LINES */
let lines = [];
for(let i=0;i<5;i++){
  lines.push({
    y: (i+1)*canvas.height/6,
    offset: Math.random()*200
  });
}

/* ANIMATE */
function animate(){

  ctx.fillStyle = "rgba(5,7,13,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  /* PARTICLES */
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  /* CONNECTIONS */
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx=particles[i].x-particles[j].x;
      let dy=particles[i].y-particles[j].y;
      let d=Math.sqrt(dx*dx+dy*dy);

      if(d<120){
        ctx.strokeStyle="rgba(56,189,248,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* QUANTUM CIRCUIT */
  lines.forEach(l=>{
    ctx.strokeStyle="rgba(56,189,248,0.3)";
    ctx.beginPath();
    ctx.moveTo(0,l.y);
    ctx.lineTo(canvas.width,l.y);
    ctx.stroke();

    let x=(Date.now()*0.3 + l.offset)%canvas.width;

    ctx.beginPath();
    ctx.arc(x,l.y,4,0,Math.PI*2);
    ctx.fillStyle="#38bdf8";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

/* NAV */
function show(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* JARVIS TYPING */
let title="YOUR NAME";
let sub="Quantum System Online";

let i=0,j=0;

function type(){
  document.getElementById("title").textContent = title.slice(0,i++);
  if(i<=title.length) setTimeout(type,100);
  else subType();
}

function subType(){
  document.getElementById("subtitle").textContent = sub.slice(0,j++);
  if(j<=sub.length) setTimeout(subType,50);
}

type();
