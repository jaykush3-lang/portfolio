// GSAP Animations for Portfolio
// Requires: GSAP 3.12+, ScrollTrigger plugin

gsap.registerPlugin(ScrollTrigger);

// Initialize GSAP animations
const initGSAPAnimations = () => {
  // ============================================
  // HERO SECTION - Initial Timeline Animation
  // ============================================
  const heroTimeline = gsap.timeline();

  // Animate hero copy elements with stagger
  heroTimeline
    .to(".hero-copy", {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    }, 0)
    .to(".hero-copy p:first-child", {
      duration: 0.7,
      opacity: 1,
      y: 0,
      ease: "power3.out",
    }, 0.1)
    .to(".hero-copy h1", {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out",
    }, 0.2);

  // Animate hero stack elements
  gsap.to(".hero-stack", {
    duration: 0.7,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    delay: 0.3,
  });

  // Stagger floating cards
  gsap.to(".hero-stack .floating-card", {
    duration: 0.6,
    opacity: 1,
    y: 0,
    stagger: {
      amount: 0.3,
      from: "start",
      ease: "sine.inOut",
    },
    delay: 0.4,
    ease: "power2.out",
  });

  // Animate hero orbit elements with continuous rotation
  gsap.to(".orbit-one", {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: "none",
  });

  gsap.to(".orbit-two", {
    duration: 25,
    rotation: -360,
    repeat: -1,
    ease: "none",
    delay: 0.5,
  });

  gsap.to(".orbit-three", {
    duration: 30,
    rotation: 360,
    repeat: -1,
    ease: "none",
    delay: 1,
  });

  // ============================================
  // MOTION BAND - Continuous Marquee
  // ============================================
  gsap.to(".band-row", {
    duration: 20,
    x: -500,
    repeat: -1,
    ease: "linear",
  });

  // ============================================
  // SCROLL ANIMATIONS - Section Reveals
  // ============================================

  // Animate section copy with ScrollTrigger
  gsap.utils.toArray(".section-copy").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 40,
      ease: "power2.out",
    });
  });

  // Animate floating cards on scroll
  gsap.utils.toArray(".floating-card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      opacity: 0,
      y: 40,
      ease: "power3.out",
    });
  });

  // ============================================
  // SKILL CARDS - Staggered Scroll Animation
  // ============================================
  gsap.utils.toArray(".skill-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      y: 50,
      rotation: 2,
      ease: "back.out",
      delay: index * 0.08,
    });
  });

  // ============================================
  // PROJECT CARDS - Staggered Entrance
  // ============================================
  const projectContainer = document.querySelector(".projects-grid");
  if (projectContainer) {
    const projectCards = projectContainer.querySelectorAll(".project-card");
    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: projectContainer,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      opacity: 0,
      y: 60,
      rotation: -2,
      ease: "power3.out",
      stagger: {
        amount: 0.4,
        from: "start",
        ease: "sine.inOut",
      },
    });
  }

  // ============================================
  // HOVER ANIMATIONS - Scale on Hover
  // ============================================
  gsap.utils.toArray(".btn, .floating-card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        duration: 0.4,
        scale: 1.02,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        duration: 0.4,
        scale: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });

  // ============================================
  // TEXT ANIMATIONS - Character Split Reveal
  // ============================================
  const splitHeadings = document.querySelectorAll("h1, h2, h3");
  splitHeadings.forEach((heading, idx) => {
    // Skip if already processed
    if (heading.classList.contains("text-split")) return;

    const text = heading.textContent;
    const chars = text.split("");
    
    heading.innerHTML = chars
      .map((char) =>
        char === " "
          ? `<span style="display: inline-block; width: 0.25em;"></span>`
          : `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`
      )
      .join("");

    heading.classList.add("text-split");

    // Animate hero headings on load
    if (heading.closest(".hero")) {
      gsap.to(heading.querySelectorAll("span.char"), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.2,
          ease: "sine.inOut",
        },
        ease: "power2.out",
        delay: 0.3,
      });
    } else {
      // Other headings animate on scroll
      gsap.to(heading.querySelectorAll("span.char"), {
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.3,
          ease: "sine.inOut",
        },
        ease: "power2.out",
      });
    }
  });

  // ============================================
  // VIEWPORT ANIMATIONS
  // ============================================
  gsap.utils
    .toArray(".content-panel, .skill-feature, .value-banner, .contact-panel")
    .forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        ease: "power3.out",
      });
    });

  // ============================================
  // BUTTON CLICK ANIMATIONS & RIPPLE
  // ============================================
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Create ripple effect
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      btn.appendChild(ripple);

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      gsap.set(ripple, {
        width: size,
        height: size,
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.5)",
        pointerEvents: "none",
      });

      gsap.to(ripple, {
        duration: 0.6,
        opacity: 0,
        scale: 2,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    });
  });

  // ============================================
  // SECTION BACKGROUND FADE IN
  // ============================================
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      duration: 1.2,
      opacity: 0,
      ease: "sine.inOut",
    });
  });

  // ============================================
  // REFRESH ON WINDOW RESIZE
  // ============================================
  window.addEventListener(
    "resize",
    () => {
      ScrollTrigger.refresh();
    },
    { passive: true }
  );
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGSAPAnimations);
} else {
  initGSAPAnimations();
}
