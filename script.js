const canvas = document.getElementById("qbg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* PARTICLES */
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5),
    vy: (Math.random() - 0.5),
    size: Math.random() * 2 + 1
  });
}

/* CIRCUIT */
const circuitLines = [];
for (let i = 0; i < 5; i++) {
  circuitLines.push({
    y: (i + 1) * canvas.height / 6,
    offset: Math.random() * 200
  });
}

/* ANIMATE */
function animate() {

  ctx.fillStyle = "rgba(5,7,13,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* PARTICLES */
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.9)";
    ctx.fill();
  });

  /* CONNECTIONS */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx+dy*dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(56,189,248,0.15)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* CIRCUIT */
  circuitLines.forEach(line => {
    ctx.strokeStyle = "rgba(56,189,248,0.25)";
    ctx.beginPath();
    ctx.moveTo(0, line.y);
    ctx.lineTo(canvas.width, line.y);
    ctx.stroke();

    let x = (Date.now()*0.25 + line.offset) % canvas.width;

    ctx.beginPath();
    ctx.arc(x, line.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* NAV */
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

links.forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
  };
});
