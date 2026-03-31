document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const themeButton = document.getElementById("toggle-theme");
  const year = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = ["about", "skills", "projects", "contact"];
  const cursorTrail = document.querySelector(".cursor-trail");
  const cursorRing = document.querySelector(".cursor-ring");
  const cursorCore = document.querySelector(".cursor-core");
  const cursorAura = document.querySelector(".cursor-aura");
  const magneticItems = document.querySelectorAll(".magnetic");
  const hoverPanels = document.querySelectorAll(
    ".floating-card, .content-panel, .skill-feature, .skill-card, .project-card, .value-banner, .contact-panel"
  );
  const magneticTextTargets = document.querySelectorAll(
    ".brand, .nav a, .btn, .hero-badge, .hero-strip span, .feature-tags span, .card-kicker, .eyebrow, .section-head h2, .section-copy h2, .skill-feature h3, .project-card h3, .hero-intro h2, .value-banner h2, .achievement-item h3"
  );

  const wrapWordsForMagnetism = (element) => {
    if (!element || element.dataset.magneticTextReady === "true") {
      return;
    }

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      const parts = node.nodeValue.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (!part) {
          return;
        }

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "magnetic-word";
        word.textContent = part;
        fragment.appendChild(word);
      });

      node.parentNode.replaceChild(fragment, node);
    });

    element.classList.add("magnetic-text");
    element.dataset.magneticTextReady = "true";
  };

  magneticTextTargets.forEach(wrapWordsForMagnetism);
  const magneticWords = document.querySelectorAll(".magnetic-word");

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
    const trailParticles = [];
    let trailReady = false;

    if (cursorTrail) {
      const totalParticles = 8;

      for (let index = 0; index < totalParticles; index += 1) {
        const particle = document.createElement("span");
        particle.className = "trail-particle";
        cursorTrail.appendChild(particle);
        trailParticles.push({
          element: particle,
          x: pointerX,
          y: pointerY,
          size: 10 + (totalParticles - index) * 2.4,
          opacity: Math.max(0.12, 0.55 - index * 0.06),
          delay: index * 0.075,
        });
      }

      trailReady = trailParticles.length > 0;
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

      if (trailReady) {
        trailParticles.forEach((particle, index) => {
          const easing = 0.16 - particle.delay * 0.055;
          particle.x += (pointerX - particle.x) * easing;
          particle.y += (pointerY - particle.y) * easing;

          const scale = 1 - index * 0.055;

          particle.element.style.setProperty("--particle-x", `${particle.x}px`);
          particle.element.style.setProperty("--particle-y", `${particle.y}px`);
          particle.element.style.setProperty("--particle-size", `${particle.size}px`);
          particle.element.style.setProperty("--particle-opacity", `${particle.opacity}`);
          particle.element.style.setProperty("--particle-scale", `${scale}`);
        });
      }

      magneticWords.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = pointerX - centerX;
        const deltaY = pointerY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const threshold = 110;

        if (distance < threshold) {
          const strength = (1 - distance / threshold) ** 1.8;
          word.style.setProperty("--word-x", `${deltaX * 0.12 * strength}px`);
          word.style.setProperty("--word-y", `${deltaY * 0.12 * strength}px`);
          word.style.setProperty("--word-scale", `${1 + strength * 0.08}`);
          word.classList.add("word-near");
        } else {
          word.style.setProperty("--word-x", "0px");
          word.style.setProperty("--word-y", "0px");
          word.style.setProperty("--word-scale", "1");
          word.classList.remove("word-near");
        }
      });

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
