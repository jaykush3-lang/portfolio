document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButton = document.getElementById("toggle-theme");
  const year = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = ["about", "skills", "projects", "contact"];

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const setThemeText = (isDark) => {
    if (themeButton) {
      themeButton.textContent = isDark ? "Light" : "Dark";
    }
  };

  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startDark = storedTheme ? storedTheme === "dark" : false;

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
});
