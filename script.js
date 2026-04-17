const canvas = document.getElementById("qbg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* PARTICLES */
const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 120;
const particles = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5),
    vy: (Math.random() - 0.5),
    size: Math.random() * 2 + 1
  });
}

/* ORBS */
const orbs = [];
for (let i = 0; i < 15; i++) {
  orbs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 40 + 20,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  });
}

/* MOUSE */
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

/* CIRCUIT */
const circuitLines = [];
for (let i = 0; i < 5; i++) {
  circuitLines.push({
    y: (i + 1) * canvas.height / 6,
    offset: Math.random() * 200
  });
}

/* CLICK BURST */
window.addEventListener("click", e => {
  particles.forEach(p => {
    let dx = p.x - e.clientX;
    let dy = p.y - e.clientY;
    let dist = Math.sqrt(dx * dx + dy * dy) || 1;
    p.vx += dx / dist;
    p.vy += dy / dist;
  });
});

/* ANIMATE */
function animate() {

  ctx.fillStyle = "rgba(5,7,13,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* ORBS */
  orbs.forEach(o => {
    o.x += o.vx;
    o.y += o.vy;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.03)";
    ctx.fill();
  });

  /* PARTICLES */
  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;

    if (Math.sqrt(dx*dx+dy*dy) < 120) {
      p.x -= dx * 0.01;
      p.y -= dy * 0.01;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  /* CONNECTIONS */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx+dy*dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(56,189,248,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* CIRCUIT */
  circuitLines.forEach(line => {
    ctx.strokeStyle = "rgba(56,189,248,0.15)";
    ctx.beginPath();
    ctx.moveTo(0, line.y);
    ctx.lineTo(canvas.width, line.y);
    ctx.stroke();

    let x = (Date.now()*0.2 + line.offset) % canvas.width;

    ctx.beginPath();
    ctx.arc(x, line.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* NAVIGATION */
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");
const navMenu = document.getElementById("nav-menu");

navLinks.forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
    navMenu.classList.remove("active");
  };
});

/* MENU */
document.getElementById("menu-toggle").onclick = () => {
  navMenu.classList.toggle("active");
};

/* TYPING */
const title = "Your Name";
const subtitle = "Quantum Computing Enthusiast";

let i=0,j=0;
function type(){
  document.getElementById("title-text").textContent = title.slice(0,i++);
  if(i<=title.length) setTimeout(type,100);
  else sub();
}
function sub(){
  document.getElementById("subtitle-text").textContent = subtitle.slice(0,j++);
  if(j<=subtitle.length) setTimeout(sub,60);
}
setInterval(()=>{i=0;j=0;type();},8000);
type();
