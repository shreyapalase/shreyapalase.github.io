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

  // draw particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    // quantum wave-like motion
    p.y += Math.sin(p.x * 0.01) * 0.3;

    // bounce edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // draw particle
    ctx.fillStyle = "rgba(56,189,248,0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // draw connections
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
// 🔥 SECTION NAVIGATION SYSTEM (APP VIEW SWITCHING)
// =====================================================

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

// show section function
function showSection(id) {
  sections.forEach(sec => sec.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

// navigation click handling
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("data-section");
    if (!target) return;

    showSection(target);
  });
});
