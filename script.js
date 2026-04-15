
/* =========================
   🌌 SMOOTH SCROLL NAV
========================= */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});

/* =========================
   ⚛️ ACTIVE SECTION HIGHLIGHT
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =========================
   ⚡ TYPING EFFECT (HEADER)
========================= */
const title = document.querySelector(".sidebar h3");

const text = "Quantum Computing Enthusiast | Qubit Explorer | Future Researcher";
let index = 0;

function typeEffect() {
  if (!title) return;

  if (index < text.length) {
    title.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 60);
  }
}

if (title) {
  title.innerHTML = "";
  typeEffect();
}

/* =========================
   🌌 MOUSE PARTICLE EFFECT
========================= */
document.addEventListener("mousemove", function (e) {
  const particle = document.createElement("div");

  particle.className = "mouse-particle";
  document.body.appendChild(particle);

  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";

  setTimeout(() => {
    particle.remove();
  }, 600);
});
