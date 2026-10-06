document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const cursorGlow = document.getElementById("cursorGlow");

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 550);
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  if (cursorGlow) {
    window.addEventListener("mousemove", e => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold:0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Change this date/time to the final webinar time when confirmed.
  const webinarDate = new Date("2026-10-24T18:00:00+01:00").getTime();
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  function updateCountdown(){
    const distance = webinarDate - Date.now();
    if(distance <= 0){
      days.textContent = hours.textContent = minutes.textContent = seconds.textContent = "00";
      return;
    }
    const d = Math.floor(distance / 86400000);
    const h = Math.floor((distance % 86400000) / 3600000);
    const m = Math.floor((distance % 3600000) / 60000);
    const s = Math.floor((distance % 60000) / 1000);
    days.textContent = String(d).padStart(2,"0");
    hours.textContent = String(h).padStart(2,"0");
    minutes.textContent = String(m).padStart(2,"0");
    seconds.textContent = String(s).padStart(2,"0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.getElementById("year").textContent = new Date().getFullYear();

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        if(active) active.classList.add("active");
      }
    });
  }, {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => sectionObserver.observe(section));
});
