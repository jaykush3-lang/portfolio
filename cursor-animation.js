/**
 * Custom Mouse Cursor Animation
 * Creates an animated custom cursor with trail effect and interactive states
 */

class CustomCursor {
  constructor() {
    // Check if device supports fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    this.initCursor();
    this.bindEvents();
    this.animate();
  }

  initCursor() {
    // Create cursor container
    const container = document.createElement("div");
    container.className = "cursor-container";
    document.body.appendChild(container);

    // Create cursor dot (inner circle)
    this.cursorDot = document.createElement("div");
    this.cursorDot.className = "cursor-dot";
    container.appendChild(this.cursorDot);

    // Create cursor ring (outer circle)
    this.cursorRing = document.createElement("div");
    this.cursorRing.className = "cursor-ring";
    container.appendChild(this.cursorRing);

    // Enable custom cursor
    document.body.classList.add("custom-cursor");

    // Position tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.dotX = 0;
    this.dotY = 0;

    // Trail particles
    this.trails = [];
    this.trailContainer = container;
  }

  bindEvents() {
    // Track mouse movement
    document.addEventListener("mousemove", (e) => this.onMouseMove(e));
    
    // Handle interactions
    this.bindInteractiveElements();

    // Hover states
    document.addEventListener("mouseenter", () => this.onMouseEnter(), true);
    document.addEventListener("mouseleave", () => this.onMouseLeave(), true);

    // Click effect
    document.addEventListener("mousedown", () => this.onMouseDown());
    document.addEventListener("mouseup", () => this.onMouseUp());

    // Text selection
    document.addEventListener("selectstart", () => this.onTextSelect());
    document.addEventListener("selectionchange", () => this.onTextSelect());
  }

  bindInteractiveElements() {
    // Interactive elements that should trigger hover state
    const interactiveSelectors = [
      "a",
      "button",
      ".btn",
      ".floating-card",
      ".content-panel",
      ".skill-card",
      ".project-card",
      "input",
      "textarea",
      ".interactive-element",
    ];

    const elements = document.querySelectorAll(interactiveSelectors.join(", "));

    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => this.onElementHover(true));
      el.addEventListener("mouseleave", () => this.onElementHover(false));
    });
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Create trail effect occasionally
    if (Math.random() > 0.8) {
      this.createTrail();
    }
  }

  onMouseEnter() {
    this.cursorDot.style.opacity = "1";
    this.cursorRing.style.opacity = "0.5";
  }

  onMouseLeave() {
    this.cursorDot.style.opacity = "0";
    this.cursorRing.style.opacity = "0";
  }

  onMouseDown() {
    this.cursorRing.classList.add("click");
    this.cursorDot.classList.add("active");

    // Create burst effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.createTrail(), i * 30);
    }
  }

  onMouseUp() {
    this.cursorRing.classList.remove("click");
    this.cursorDot.classList.remove("active");
  }

  onElementHover(isHovering) {
    if (isHovering) {
      this.cursorRing.classList.add("hover");
      this.cursorDot.classList.add("text");
    } else {
      this.cursorRing.classList.remove("hover");
      this.cursorDot.classList.remove("text");
    }
  }

  onTextSelect() {
    this.cursorDot.classList.add("text");
  }

  createTrail() {
    const trail = document.createElement("div");
    trail.className = "cursor-trail active";

    const x = this.mouseX + (Math.random() - 0.5) * 20;
    const y = this.mouseY + (Math.random() - 0.5) * 20;

    trail.style.left = x + "px";
    trail.style.top = y + "px";

    this.trailContainer.appendChild(trail);

    // Remove after animation
    setTimeout(() => trail.remove(), 1000);
  }

  animate() {
    // Smooth cursor ring movement (with lag)
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;

    // Faster dot movement
    this.dotX += (this.mouseX - this.dotX) * 0.5;
    this.dotY += (this.mouseY - this.dotY) * 0.5;

    // Apply positions
    this.cursorDot.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`;
    this.cursorRing.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize custom cursor when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CustomCursor();
  });
} else {
  new CustomCursor();
}

/**
 * Image Lazy Loading with Animation
 */
class ImageLoader {
  constructor() {
    this.loadImages();
  }

  loadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    }
  }
}

// Initialize image loader
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ImageLoader();
  });
} else {
  new ImageLoader();
}

/**
 * Interactive Element Tracking
 * Updates CSS custom properties for hover effects
 */
document.addEventListener("mousemove", (e) => {
  const interactiveElements = document.querySelectorAll(
    ".floating-card, .content-panel, .skill-card, .project-card, .interactive-element"
  );

  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--mx", `${x}%`);
    element.style.setProperty("--my", `${y}%`);
  });
});

/**
 * Dynamic Background Animation
 */
window.addEventListener("mousemove", (e) => {
  const bgElements = document.querySelectorAll(".bg-element");

  bgElements.forEach((element, index) => {
    const speed = (index + 1) * 0.02;
    const x = (e.clientX * speed) / window.innerWidth;
    const y = (e.clientY * speed) / window.innerHeight;

    element.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
});

/**
 * Parallax Effect for Images
 */
class ParallaxEffect {
  constructor() {
    this.setupParallax();
  }

  setupParallax() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    if (parallaxElements.length === 0) return;

    window.addEventListener("scroll", () => {
      parallaxElements.forEach((element) => {
        const speed = element.dataset.parallax || 0.5;
        const yOffset = window.pageYOffset * speed;
        element.style.transform = `translateY(${yOffset}px)`;
      });
    });
  }
}

// Initialize parallax when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ParallaxEffect();
  });
} else {
  new ParallaxEffect();
}

/**
 * Smooth Image Transitions
 */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    // Handle error images gracefully
    img.addEventListener("error", () => {
      img.classList.add("error");
      img.style.display = "none";
    });
  });
});

/**
 * Hover Glow Effect for Cards
 */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".floating-card, .card-with-image, .gallery-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create glow effect based on mouse position
      const glow = card.querySelector(".card-glow");
      if (glow) {
        glow.style.left = x + "px";
        glow.style.top = y + "px";
      }
    });
  });
});
