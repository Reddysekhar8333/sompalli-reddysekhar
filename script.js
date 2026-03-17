const roles = ["DevOps Engineer", "Cloud Practitioner", "ML Enthusiast", "Software Engineer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingText = document.getElementById("typingText");
const loader = document.getElementById("loader");
const nav = document.getElementById("mainNav");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const themeToggle = document.getElementById("themeToggle");
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("#navLinks .nav-link");
const animatedEls = document.querySelectorAll("[data-animate]");

// 
function typeRole() {
  const currentRole = roles[roleIndex];
  typingText.textContent = currentRole.substring(0, charIndex);

  if (!deleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, 95);
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 55);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1200 : 300);
  }
}

// 
function handleScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 10);
  scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
}

// 
function updateActiveNav() {
  let current = "hero";
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 130;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// 
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach((el) => observer.observe(el));
}

// 
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-bs-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.innerHTML = next === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
}

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    themeToggle.innerHTML =
      savedTheme === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
  }

  setTimeout(() => loader.classList.add("hidden"), 450);
  typeRole();
  initAnimations();
  updateActiveNav();
});

window.addEventListener("scroll", () => {
  handleScroll();
  updateActiveNav();
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", toggleTheme);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navCollapse = document.querySelector(".navbar-collapse");
    if (navCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navCollapse).hide();
    }
  });
});
