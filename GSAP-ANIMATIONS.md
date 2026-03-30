# GSAP Animation Guide for Portfolio

This guide explains the GSAP (GreenSock Animation Platform) animations implemented in your portfolio website, inspired by the smooth, professional animations found on gsap.com.

## Overview

GSAP is a powerful JavaScript animation library that provides:
- **Smooth animations** with hardware acceleration
- **ScrollTrigger** for scroll-based animations
- **Staggered effects** for coordinated element animations
- **Easing functions** for natural motion
- **Performance optimization** through efficient rendering

## What's New

### 1. **Files Added**
- `gsap-animations.js` - Main GSAP animation controller
- Updated `index.html` - Added GSAP library CDN imports
- Enhanced `style.css` - Optimized styles for animations

### 2. **GSAP Libraries Included**

```html
<!-- From CDN (cdnjs) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollSmoother.min.js"></script>
```

## Animation Features

### A. **Hero Section Entrance** (Page Load)
- Smooth fade-in and slide-up of hero content
- Staggered card animations with delays
- Continuous rotating orbit animations
- Character-by-character text reveal for headings

**What to expect:**
- Hero copy fades in from bottom (0.6s duration)
- Heading characters appear one by one
- Cards slide up with 0.3s stagger delay
- Three orbits rotate continuously in opposite directions

```javascript
// Hero animations example
gsap.to(".hero-copy", {
  duration: 0.6,
  opacity: 1,
  y: 0,
  ease: "power2.out",
})
```

### B. **Scroll-Triggered Animations**

When scrolling down the page, elements animate into view:

1. **Section Copy** - Fades in when 80% visible
2. **Floating Cards** - Slides up with fade-in at 88% viewport visibility
3. **Skill Cards** - Staggered entrance with slight rotation
4. **Project Cards** - Coordinated reveal with wave effect
5. **All Sections** - Overall fade-in effect

```javascript
// ScrollTrigger example
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
```

### C. **Hover Animations**

Interactive hover effects on:
- Buttons (`.btn`)
- Cards (`.floating-card`)
- Links

**Effect:** 2% scale increase + smooth easing

```javascript
gsap.to(element, {
  duration: 0.4,
  scale: 1.02,
  ease: "power2.out",
})
```

### D. **Text Character Animation**

All headings (h1, h2, h3) split into individual characters that:
1. Start with `opacity: 0` and `translateY: 20px`
2. Animate to visible state with stagger
3. Hero section headings animate on page load
4. Other sections animate when scrolled into view

```javascript
// Character split animation
heading.innerHTML = chars.map(char =>
  `<span class="char" style="...">${char}</span>`
).join("");

gsap.to(heading.querySelectorAll("span.char"), {
  duration: 0.5,
  opacity: 1,
  y: 0,
  stagger: { amount: 0.3 },
  ease: "power2.out",
})
```

### E. **Button Ripple Effect**

Click any button to see:
- Material Design ripple animation
- Smooth scale-up and fade-out effect
- GSAP-powered for performance

### F. **Motion Band Animation**

The sticky motion band with tags:
- Continuous marquee scroll animation
- Linear easing for constant speed
- Infinite loop with -500px translation

### G. **Orbit Animations**

Three rotating orbits in the hero section:
- **Orbit 1:** 20s rotation, clockwise
- **Orbit 2:** 25s rotation, counter-clockwise
- **Orbit 3:** 30s rotation, clockwise

## Easing Functions Used

GSAP provides professional easing curves:

| Easing | Effect | Use Case |
|--------|--------|----------|
| `power2.out` | Smooth deceleration | Standard animations |
| `power3.out` | Faster deceleration | Hero section |
| `back.out` | Slight overshoot | Entrance animations |
| `sine.inOut` | Gentle wave | Stagger sequences |
| `linear` | Constant speed | Continuous motion |

## Performance Optimizations

1. **CSS Transforms** - Uses `transform` and `opacity` for GPU acceleration
2. **Will-change** - Applied to frequently animated elements
3. **Backface-visibility** - Hidden on animated elements
4. **3D Transforms** - Uses `translate3d()` for better performance
5. **Lazy Animation Initialization** - Resets on window resize

## Customization Tips

### Change Animation Speed
Modify duration in `gsap-animations.js`:

```javascript
gsap.to(".hero-copy", {
  duration: 0.6,  // Change this value (in seconds)
  opacity: 1,
  y: 0,
})
```

### Adjust Scroll Trigger Start Point
```javascript
scrollTrigger: {
  trigger: section,
  start: "top 80%",  // Change the percentage
  toggleActions: "play none none reverse",
}
```

### Change Easing
Available easing functions:
- `power1.out`, `power2.out`, `power3.out`, `power4.out`
- `sine.inOut`, `sine.out`, `sine.in`
- `back.out`, `elastic.out`, `bounce.out`
- `linear`, `none`

### Add New Animations

```javascript
// Add to gsap-animations.js
gsap.from(".your-element", {
  scrollTrigger: {
    trigger: ".your-element",
    start: "top 80%",
  },
  duration: 0.8,
  opacity: 0,
  y: 40,
  ease: "power2.out",
});
```

## Browser Compatibility

GSAP 3.12+ supports:
- ✅ Chrome/Edge 59+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ iOS Safari 12+
- ✅ Android Chrome
- ⚠️ Gracefully degrades in older browsers

## Accessibility

The animations include:
- ✅ Respect for `prefers-reduced-motion` preference
- ✅ Smooth 60fps performance
- ✅ Non-blocking animations (content still accessible)
- ✅ Keyboard navigation unaffected

## Resources

- **GSAP Documentation:** https://gsap.com/docs/
- **ScrollTrigger Guide:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Easing Visualizer:** https://gsap.com/resources/get-started/

## Troubleshooting

### Animations not playing?
1. Check browser console for errors
2. Verify GSAP library loaded: `console.log(gsap)`
3. Ensure JavaScript execution is enabled

### AnimationsStuttering?
1. Reduce simultaneous animations
2. Increase animation duration
3. Check for CSS conflicts with `transition` property

### Mobile performance issues?
1. Animations auto-disable on low-end devices
2. Use `will-change` sparingly
3. Reduce stagger amounts

---

**Created:** March 2026  
**GSAP Version:** 3.12.2+  
**Last Updated:** March 30, 2026
