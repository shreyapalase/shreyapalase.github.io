// =========================
// QUANTUM BACKGROUND CANVAS
// =========================

const canvas = document.getElementById("qbg");
const ctx = canvas.getContext("2d");

// resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

// =========================
// PARTICLE SETUP
// =========================

const particles = [];
const PARTICLE_COUNT = 120;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2
  });
}

// =========================
// ANIMATION LOOP
// =========================

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.y += Math.sin(p.x * 0.01) * 0.3;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "rgba(56,189,248,0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.strokeStyle = "rgba(56,189,248,0.08)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();


// =====================================================
// 🔥 NEW FEATURE: SECTION SWITCHING (SAFE ADDITION)
// =====================================================

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

// default active section (safety check)
document.addEventListener("DOMContentLoaded", () => {
  const defaultSection = document.querySelector(".section");
  if (defaultSection) defaultSection.classList.add("active");
});

// navigation click handling
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.getAttribute("data-section");

    if (!target) return;

    // hide all sections
    sections.forEach(sec => sec.classList.remove("active"));

    // show selected section
    const activeSection = document.getElementById(target);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    // optional: active nav highlight
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});
