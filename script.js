/* =========================
   CANVAS SETUP
========================= */

const canvas = document.getElementById("qbg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   PARTICLES
========================= */

const particles = [];
const count = 90;

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    size: Math.random() * 2 + 1
  });
}

/* =========================
   QUANTUM CIRCUIT LINES
========================= */

const circuits = [];
for (let i = 0; i < 6; i++) {
  circuits.push({
    y: (i + 1) * window.innerHeight / 7,
    offset: Math.random() * 500
  });
}

/* =========================
   MOUSE INTERACTION
========================= */

let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* =========================
   CLICK ENERGY BURST
========================= */

window.addEventListener("click", (e) => {
  particles.forEach(p => {
    let dx = p.x - e.clientX;
    let dy = p.y - e.clientY;
    let dist = Math.sqrt(dx * dx + dy * dy) || 1;

    p.vx += dx / dist * 2;
    p.vy += dy / dist * 2;
  });
});

/* =========================
   ANIMATION LOOP
========================= */

function animate() {

  /* TRAIL EFFECT (IMPORTANT) */
  ctx.fillStyle = "rgba(5,7,13,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* =====================
     PARTICLES
  ===================== */

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    // mouse attraction (magnetic quantum field)
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 140) {
      p.x -= dx * 0.01;
      p.y -= dy * 0.01;
    }

    // draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.9)";
    ctx.fill();
  });

  /* =====================
     CONNECTIONS (ENTANGLEMENT)
  ===================== */

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {

        ctx.strokeStyle = "rgba(56,189,248,0.12)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* =====================
     QUANTUM CIRCUIT SYSTEM
  ===================== */

  circuits.forEach(c => {

    // base wire
    ctx.strokeStyle = "rgba(56,189,248,0.25)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, c.y);
    ctx.lineTo(canvas.width, c.y);
    ctx.stroke();

    // moving quantum signal
    let x = (Date.now() * 0.25 + c.offset) % canvas.width;

    // glowing pulse
    ctx.beginPath();
    ctx.arc(x, c.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();

    // trail beam
    ctx.strokeStyle = "rgba(56,189,248,0.6)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x - 40, c.y);
    ctx.lineTo(x, c.y);
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

animate();

/* =========================
   NAVIGATION SYSTEM (FIXED)
========================= */

// =========================
// SAFE JARVIS NAVIGATION SYSTEM
// =========================

document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".section");

  function showSection(id) {
    let found = false;

    sections.forEach(sec => {
      sec.classList.remove("active");

      if (sec.id === id) {
        sec.classList.add("active");
        found = true;
      }
    });

    // fallback safety (prevents "blank screen" bug)
    if (!found) {
      document.querySelector("#about")?.classList.add("active");
      console.warn("Section not found:", id);
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.dataset.section;

      if (!target) {
        console.warn("Missing data-section on:", link);
        return;
      }

      showSection(target);
    });
  });

});

/* =========================
   JARVIS TYPEWRITER EFFECT
========================= */

const titleText = "Shreya Palase";
const subtitleText = "Quantum Computing Enthusiast | Quantum Algorithm | Qiskit";

const titleEl = document.getElementById("title-text");
const subtitleEl = document.getElementById("subtitle-text");

let i = 0;
let j = 0;

function typeTitle() {
  if (i < titleText.length) {
    titleEl.innerHTML += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, 120);
  } else {
    setTimeout(typeSubtitle, 400);
  }
}

function typeSubtitle() {
  if (j < subtitleText.length) {
    subtitleEl.innerHTML += subtitleText.charAt(j);
    j++;
    setTimeout(typeSubtitle, 80);
  }
}// loop restart
function restart() {
  titleEl.textContent = "";
  subtitleEl.textContent = "";
  i = 0;
  j = 0;
  typeTitle();
}

restart();
setInterval(restart, 8000);


const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

function showSection(id) {
  if (!id) return;

  console.log("Switching to:", id);

  sections.forEach(sec => {
    sec.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (!target) {
    console.error("Section not found:", id);
    return;
  }

  target.classList.add("active");
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("data-section");

    console.log("Clicked:", target);

    showSection(target);
  });
});
