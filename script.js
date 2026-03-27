document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const themeButton = document.getElementById("toggle-theme");
  const year = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = ["about", "skills", "projects", "contact"];
  const cursorGlow = document.querySelector(".cursor-glow");
  const cursorDot = document.querySelector(".cursor-dot");
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
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let glowX = cursorX;
    let glowY = cursorY;

    const renderCursor = () => {
      glowX += (cursorX - glowX) * 0.16;
      glowY += (cursorY - glowY) * 0.16;

      root.style.setProperty("--cursor-x", `${glowX}px`);
      root.style.setProperty("--cursor-y", `${glowY}px`);

      if (cursorGlow) {
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }

      if (cursorDot) {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      window.requestAnimationFrame(renderCursor);
    };

    window.addEventListener("mousemove", (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
    });

    window.requestAnimationFrame(renderCursor);
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
      const moveX = offsetX / 18;
      const moveY = offsetY / 18;

      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
});
