// ===============================
// BASIC LOADING ANIMATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Quantum Portfolio Loaded ⚛️");
});

// ===============================
// SMOOTH SCROLL FOR NAV LINKS
// ===============================
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===============================
// HOVER GLOW EFFECT ON CARDS
// ===============================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(100,255,218,0.15),
        rgba(10,25,47,0.9)
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#0a192f";
  });
});

// ===============================
// TYPING EFFECT (TITLE ANIMATION)
// ===============================
const title = document.querySelector("h1");

if (title) {
  const text = title.innerText;
  title.innerText = "";

  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      title.innerText += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
}

// ===============================
// SCROLL REVEAL EFFECT
// ===============================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "0.6s ease";
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  observer.observe(section);
});
