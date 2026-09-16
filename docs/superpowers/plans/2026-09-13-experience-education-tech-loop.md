# Experience, Education, and Technology Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a naturally rising Experience section after Projects, containing an experience timeline, React Bits-style technology loop, educational background, certifications, and awards.

**Architecture:** Keep `#resume` as the Experience navigation target and render the existing page after Projects. Build a reusable dependency-free `LogoLoop` inspired by React Bits, then use Framer Motion scroll transforms on the Experience shell for the Projects-to-Experience overlap.

**Tech Stack:** React 19, Framer Motion, Lucide React, CSS, Vite

**Spec:** `docs/superpowers/specs/2026-09-13-experience-education-tech-loop-design.md`

## Global Constraints

- Preserve the existing editorial portfolio identity and responsive breakpoints.
- Use natural scrolling only; no automatic scrolling, scroll snapping, or hijacking.
- Keep Education inside `#resume` under the existing Experience navbar item.
- Use lightweight transform-based animation and respect `prefers-reduced-motion`.
- Introduce no new package dependency.
- Do not commit changes unless the user explicitly requests it.

---

### Task 1: Reusable Technology Logo Loop

**Files:**
- Create: `src/components/LogoLoop.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `items: Array<{ name: string, icon: React.ComponentType, category: string }>`
- Produces: `<LogoLoop items={technologyItems} />`

- [ ] **Step 1: Create the accessible loop component**

Implement two repeated visual tracks while exposing only the first list to assistive technology:

```jsx
const LogoLoop = ({ items }) => (
  <div className="logo-loop" aria-label="Languages, frameworks, and tools">
    <div className="logo-loop__track">
      {[...items, ...items].map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={`${item.name}-${index}`}
            className="logo-loop__item"
            aria-hidden={index >= items.length}
          >
            <Icon size={22} aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);
```

- [ ] **Step 2: Add transform-only loop styling**

Use `@keyframes logo-loop-scroll` with `transform: translate3d(-50%, 0, 0)`. Pause on `.logo-loop:hover` and `.logo-loop:focus-within`. Under `prefers-reduced-motion: reduce`, disable animation, allow wrapping, and hide duplicated items.

- [ ] **Step 3: Verify component quality**

Run `npm run lint`. Expected: zero ESLint errors.

### Task 2: Experience and Education Content

**Files:**
- Modify: `src/pages/Resume.jsx`

**Interfaces:**
- Consumes: `LogoLoop` from `../components/LogoLoop.jsx`
- Produces: `<section id="resume" data-nav-theme="dark">`

- [ ] **Step 1: Split content into explicit data collections**

Create `experienceEntries`, `educationEntries`, `certifications`, `awards`, and `technologyItems`. Use realistic editable content for PHINMA University of Iloilo, independent development, collaborative school systems, programming recognition, and relevant coursework.

- [ ] **Step 2: Build the Experience timeline**

Keep the desktop two-column editorial structure. Place the heading, summary, CV action, and skills summary on the left; render experience entries as semantic `<article>` timeline cards on the right.

- [ ] **Step 3: Insert the technology loop**

Place `<LogoLoop items={technologyItems} />` between Experience and Education. Include JavaScript, TypeScript, React, Node.js, Express, MongoDB, Python, Git, Figma, Tailwind CSS, Firebase, and AI tools using available Lucide icons where exact brand icons are unavailable.

- [ ] **Step 4: Add Education and recognition**

Render Education as the primary lower subsection with degree, institution, dates, coursework, and focus. Add compact Certifications and Awards cards beneath it with correct heading order.

- [ ] **Step 5: Validate semantics**

Confirm one `h2` for Experience, subsection `h3` headings, article `h4` headings, descriptive link labels, decorative icons marked `aria-hidden`, and visible keyboard focus states.

### Task 3: Scroll-Linked Rising Panel

**Files:**
- Modify: `src/pages/Resume.jsx`
- Modify: `src/index.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useScroll`, `useTransform`, `useSpring`, `useReducedMotion`
- Produces: naturally scrolling `.portfolio-experience` panel rendered after `<Projects />`

- [ ] **Step 1: Add the section scroll transform**

Use a section ref and viewport progress:

```jsx
const sectionRef = useRef(null);
const prefersReducedMotion = useReducedMotion();
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "start 70%"],
});
const rawOffset = useTransform(scrollYProgress, [0, 1], [96, 0]);
const panelOffset = useSpring(rawOffset, { stiffness: 140, damping: 24 });
```

Apply `style={{ y: prefersReducedMotion ? 0 : panelOffset }}` to the Motion section.

- [ ] **Step 2: Style the foreground panel**

Use a dark background, rounded top corners, subtle upper shadow, `position: relative`, and a higher stacking level than Projects. Add a small negative top margin only on larger screens to create overlap without obscuring Projects content.

- [ ] **Step 3: Render the section**

Import `Resume` from `./pages` in `src/App.jsx` and render `<Resume />` directly after `<Projects />`.

- [ ] **Step 4: Verify navigation**

Activate the navbar Experience link and confirm `href="#resume"` lands on the real section with appropriate `scroll-margin-top`.

### Task 4: Cursor Cleanup and Final Verification

**Files:**
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Resume.jsx`

**Interfaces:**
- Projects returns to the default cursor configuration.
- Experience may define a restrained section color only if it remains legible against its dark background.

- [ ] **Step 1: Remove Projects cursor overrides**

Delete `data-glow-color`, `data-glow-secondary-color`, all numeric `data-glow-*` attributes, and `data-glow-blend` from the Projects section.

- [ ] **Step 2: Check responsive layouts manually**

Verify desktop three-column projects, tablet two-column projects, mobile one-column projects, single-column Experience content, non-clipped logo items, and readable timeline spacing.

- [ ] **Step 3: Check motion and accessibility manually**

Confirm the panel rises with scroll, the loop pauses on hover/focus, reduced motion disables nonessential movement, keyboard focus is visible, and no content is covered by the shared cursor canvas.

- [ ] **Step 4: Run repository verification**

Run:

```powershell
npm run lint
npm run build
git diff --check
```

Expected: all commands exit successfully. A stale Browserslist database warning is informational and does not fail the build.
