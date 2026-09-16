# Experience, Education, and Technology Loop Design

## Goal

Extend the portfolio after Projects with a polished Experience section that includes professional experience, a scrolling technology showcase, educational background, certifications, and awards. The section must enter through natural scrolling rather than automatic navigation or scroll hijacking.

## Page Flow

1. Projects ends with the GitHub contribution card and repository link.
2. Experience rises over Projects as a dark foreground panel.
3. An editorial introduction establishes the section hierarchy.
4. Experience entries appear as a concise vertical timeline.
5. A continuous technology logo loop separates experience from education.
6. Education, certifications, and awards complete the section.

Education remains inside `#resume`, so the existing **Experience** navbar target stays valid without adding another navigation item.

## Transition and Motion

Use Framer Motion `useScroll`, `useTransform`, and a restrained spring to translate the Experience panel upward as it enters the viewport. Projects continues to scroll normally underneath it. The panel receives rounded upper corners, a dark background, and a subtle shadow to make the overlap legible.

Timeline cards reveal with short staggered transitions. Motion must disable or simplify when `prefers-reduced-motion` is enabled. No scroll snapping, forced scrolling, or pinned full-page sequence will be introduced.

## Experience Content

The first content block uses a two-column desktop composition:

- Left: section title, short professional summary, CV action, and skills summary.
- Right: timeline cards for independent development, collaborative systems, academic projects, and relevant practical work.

Placeholder details must remain realistic, concise, and easy to replace.

## Technology Logo Loop

Use the available React Bits animated-component guidance to implement a `LogoLoop`-style marquee. It will show recognizable icons and names for JavaScript, TypeScript, React, Node.js, Express, MongoDB, Python, Git, Figma, Tailwind CSS, Firebase, and AI tools.

The loop will:

- Move continuously at a calm speed.
- Pause on hover and keyboard focus.
- Duplicate items only for seamless visual looping.
- Use lightweight CSS transforms and avoid new dependencies where possible.
- Fall back to a wrapped static grid for reduced-motion users.

## Education and Recognition

Education follows the logo loop as a dedicated subsection containing degree, institution, dates, coursework, and academic focus. Certifications and awards appear in compact supporting cards beneath it, visually secondary to the degree and experience timeline.

## Responsive and Accessible Behavior

Desktop uses two columns; tablet and mobile collapse to one. Timeline markers, logo labels, and links maintain sufficient contrast against the dark panel. All interactive elements receive visible focus states, icons remain decorative where appropriate, and semantic headings preserve document order.

## Files Expected to Change

- `src/App.jsx`: render the existing Resume page after Projects.
- `src/pages/Projects.jsx`: remove the Projects-specific pink cursor configuration.
- `src/pages/Resume.jsx`: restructure Experience, technology loop, Education, certifications, and awards.
- `src/components/LogoLoop.jsx`: add the reusable React Bits-style technology loop.
- `src/index.css`: add scroll-transition and section styling.

## Verification

Run `npm run lint`, `npm run build`, and `git diff --check`. Manually verify the Projects-to-Experience overlap, navbar target, loop behavior, keyboard focus, reduced motion, and mobile layout.
