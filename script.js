const loader = document.querySelector(".page-loader");
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const revealItems = document.querySelectorAll(".reveal");

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 250);
});

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const closeMenu = () => {
  menuToggle?.classList.remove("is-active");
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileMenu?.classList.remove("is-open");
  mobileMenu?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const shouldOpen = !mobileMenu?.classList.contains("is-open");
  menuToggle.classList.toggle("is-active", shouldOpen);
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  mobileMenu?.classList.toggle("is-open", shouldOpen);
  mobileMenu?.setAttribute("aria-hidden", String(!shouldOpen));
  document.body.classList.toggle("menu-open", shouldOpen);
});

mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
