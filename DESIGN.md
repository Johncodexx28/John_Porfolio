# Portfolio Design Report

## Executive Summary

This repository implements a dark, motion-led personal portfolio for John Lloyd Cabanig. The experience is built as a single scrolling React page, using a persistent animated background, an expanding card navigation menu, and responsive content sections. The visual direction combines deep purple surfaces, white typography, and a pink primary accent (`#D93F87`) to present a creative developer identity.

## Current Experience

The page opens with a centered hero that introduces the portfolio owner, cycles through “FullStack-Developer” and “Web-Designer,” and offers calls to action for projects and a CV. The About section pairs personal copy and milestones with an interactive 3D lanyard. Interests are shown as a six-card responsive grid, while Achievements combines a circular image gallery, certificate cards, and a full-screen image modal.

The navigation is a fixed, animated menu containing three content groups: About, Projects, and Skills. The app is responsive through Tailwind breakpoints and component-level layout adjustments.

## Key Findings

- **Strong visual identity:** the purple, black, white, and pink palette is applied consistently across the hero, navigation, and supporting sections.
- **Interactive depth:** Framer Motion, GSAP, OGL, and React Three Fiber create an expressive experience that suits a portfolio.
- **Incomplete pathways:** `Projects.jsx` and `Contact.jsx` are placeholders, and neither is currently rendered by `App.jsx`.
- **Broken destinations:** the hero points to `#projects` and `#cv`, but matching sections are not present. Navigation card links have no `href` values.
- **Accessibility opportunities:** the hamburger control is keyboard-focusable but has no keyboard event handler; the certificate modal has no explicit focus management or Escape-key close behavior.

## Implications

The existing site establishes personality well, but visitors cannot yet follow its primary conversion paths: viewing projects, downloading a CV, or contacting the owner. Motion-heavy components and the continuously rendered shader background should also be checked on lower-powered mobile devices.

## Recommendations

1. Add and render semantic `Projects`, `Skills`, `CV`, and `Contact` sections with stable IDs that match every hero and navigation link.
2. Turn “Contact Me” into a real route or anchor and implement `api/sendEmail.js` only when the contact form is ready.
3. Improve keyboard support for the navigation and modal, including Enter/Space activation, focus movement, and Escape to close.
4. Respect `prefers-reduced-motion` and consider reducing background animation quality on small screens.
5. Validate the full experience at mobile, tablet, and desktop widths after each visual change.

## Appendix: Design System Snapshot

- **Framework:** React 19, Vite, Tailwind CSS.
- **Motion:** Framer Motion and GSAP.
- **Immersive visuals:** OGL shader background and Three.js/Rapier lanyard.
- **Primary accent:** `#D93F87`.
- **Content assets:** images and `.glb` models live in `src/assets/`; public files live in `public/`.
