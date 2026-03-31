document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const themeButton = document.getElementById("toggle-theme");
  const year = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = ["about", "skills", "projects", "contact"];
  const cursorRain = document.querySelector(".cursor-rain");
  const cursorRing = document.querySelector(".cursor-ring");
  const cursorCore = document.querySelector(".cursor-core");
  const cursorAura = document.querySelector(".cursor-aura");
  const magneticItems = document.querySelectorAll(".magnetic");
  const hoverPanels = document.querySelectorAll(
    ".floating-card, .content-panel, .skill-feature, .skill-card, .project-card, .value-banner, .contact-panel"
  );

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const setThemeText = (isDark) => {
    if (themeButton) {
      themeButton.textContent = isDark ? "Light" : "Dark";
    }
  };

  const storedTheme = localStorage.getItem("portfolio-theme");
  const startDark = storedTheme === "dark";
  root.classList.toggle("theme-dark", startDark);
  setThemeText(startDark);

  themeButton?.addEventListener("click", () => {
    const isDark = root.classList.toggle("theme-dark");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    setThemeText(isDark);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const updateActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (activeEntry?.target?.id) {
        updateActiveLink(activeEntry.target.id);
      }
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      sectionObserver.observe(section);
    }
  });

  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (supportsFinePointer) {
    body.classList.add("cursor-enabled");
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let auraX = pointerX;
    let auraY = pointerY;
    const rainDrops = [];
    let rainReady = false;

    if (cursorRain) {
      const totalDrops = 18;

      for (let index = 0; index < totalDrops; index += 1) {
        const drop = document.createElement("span");
        drop.className = "rain-drop";
        cursorRain.appendChild(drop);
        rainDrops.push({
          element: drop,
          x: pointerX,
          y: pointerY,
          speedY: 0,
          speedX: 0,
          length: 14 + Math.random() * 20,
          opacity: 0,
        });
      }

      rainReady = rainDrops.length > 0;
    }

    const animateCursor = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      auraX += (pointerX - auraX) * 0.08;
      auraY += (pointerY - auraY) * 0.08;

      root.style.setProperty("--cursor-x", `${auraX}px`);
      root.style.setProperty("--cursor-y", `${auraY}px`);

      if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      if (cursorCore) {
        cursorCore.style.transform = `translate(${pointerX}px, ${pointerY}px)`;
      }

      if (cursorAura) {
        cursorAura.style.transform = `translate(${auraX}px, ${auraY}px)`;
      }

      if (rainReady) {
        rainDrops.forEach((drop, index) => {
          const drift = (index % 2 === 0 ? -1 : 1) * (0.35 + index * 0.025);
          const targetX = pointerX + drift * 12;
          const targetY = pointerY - 10 - index * 4;

          drop.speedX += (targetX - drop.x) * 0.02;
          drop.speedY += (targetY - drop.y) * 0.028;
          drop.speedX *= 0.84;
          drop.speedY = drop.speedY * 0.8 + 1.3 + index * 0.045;

          drop.x += drop.speedX;
          drop.y += drop.speedY;
          drop.opacity += (0.8 - drop.opacity) * 0.12;

          if (drop.y > pointerY + 120) {
            drop.x = pointerX + (Math.random() - 0.5) * 26;
            drop.y = pointerY - 24 - Math.random() * 36;
            drop.speedX = 0;
            drop.speedY = 1 + Math.random() * 1.6;
            drop.length = 14 + Math.random() * 20;
            drop.opacity = 0.2 + Math.random() * 0.3;
          }

          drop.element.style.setProperty("--drop-x", `${drop.x}px`);
          drop.element.style.setProperty("--drop-y", `${drop.y}px`);
          drop.element.style.setProperty("--drop-length", `${drop.length}px`);
          drop.element.style.setProperty("--drop-opacity", `${drop.opacity}`);
        });
      }

      window.requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    });

    window.requestAnimationFrame(animateCursor);
  }

  hoverPanels.forEach((panel) => {
    panel.addEventListener("mousemove", (event) => {
      const rect = panel.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty("--mx", `${x}%`);
      panel.style.setProperty("--my", `${y}%`);
    });
  });

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      if (!supportsFinePointer) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const moveX = offsetX / 22;
      const moveY = offsetY / 22;
      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
});
