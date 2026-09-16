# Cinematic Loading Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a personalized, terminal-inspired cinematic intro that plays on every full page load before revealing the existing navbar, GlowCursor, and Hero.

**Architecture:** A focused `LoadingScreen` component owns the fixed Framer Motion sequence and temporary scroll lock. `App.jsx` owns one completion boolean and mounts the existing portfolio shell only after the intro completes, ensuring its current entrance animations remain visible and its GlowCursor configuration remains unchanged.

**Tech Stack:** React 19, Framer Motion 12, CSS, Vite

**Spec:** `docs/superpowers/specs/2026-09-12-cinematic-loading-screen-design.md`

## Global Constraints

- Play the intro on every full page load for approximately 3 seconds.
- Use only cream, black, and charcoal; introduce no pink loading-screen accent.
- Use the approved personalized terminal copy exactly.
- Provide no skip button and no Escape-key shortcut.
- Preserve the existing Hero content and GlowCursor configuration exactly.
- Replace the full sequence with an approximately 0.4-second static `JLC` fade when reduced motion is preferred.
- Add no dependencies and no test framework; this repository currently has no automated test runner.

---

### Task 1: Build the Cinematic Loading Component

**Files:**
- Create: `src/components/LoadingScreen.jsx`
- Create: `src/components/LoadingScreen.css`

**Interfaces:**
- Consumes: `onComplete: () => void`
- Produces: `LoadingScreen`, a fixed full-viewport intro that calls `onComplete` exactly once after its standard or reduced-motion sequence.

- [x] **Step 1: Create the terminal content model**

Define the immutable personalized lines at module scope so rendering does not recreate them:

```jsx
const terminalLines = [
  "> booting john_lloyd.portfolio",
  "[ OK ] identity ........ Full-Stack Developer",
  "[ OK ] location ........ Iloilo, Philippines",
  "[ OK ] frontend ........ React / React Native",
  "[ OK ] backend ......... Node.js / MongoDB",
  "[ OK ] mindset ......... Lifelong Learner",
  "[ OK ] status .......... Available for Remote Work",
  "> building digital experiences...",
  "> launching portfolio ██████████ 100%",
];
```

- [x] **Step 2: Implement the standard Framer Motion timeline**

Create `LoadingScreen({ onComplete })` with `useAnimate`, `useEffect`, and `useReducedMotion`. The standard sequence must reveal terminal rows with a short stagger, contract the terminal, reveal `JLC`, and move the two background panels in opposite vertical directions.

```jsx
const [scope, animate] = useAnimate();
const prefersReducedMotion = useReducedMotion();

useEffect(() => {
  let cancelled = false;

  const runSequence = async () => {
    if (prefersReducedMotion) {
      await animate(".loading-screen__monogram", { opacity: [0, 1, 0] }, { duration: 0.4 });
    } else {
      await animate(".loading-screen__line", { opacity: 1, y: 0 }, {
        delay: stagger(0.13),
        duration: 0.18,
      });
      await animate(".loading-screen__terminal", { opacity: 0, scale: 0.94 }, {
        delay: 0.2,
        duration: 0.25,
      });
      await animate(".loading-screen__monogram", { opacity: [0, 1, 1], scale: [0.9, 1, 1] }, {
        duration: 0.45,
      });
      await Promise.all([
        animate(".loading-screen__panel--top", { y: "-100%" }, { duration: 0.65, ease: [0.76, 0, 0.24, 1] }),
        animate(".loading-screen__panel--bottom", { y: "100%" }, { duration: 0.65, ease: [0.76, 0, 0.24, 1] }),
      ]);
    }

    if (!cancelled) onComplete();
  };

  runSequence();
  return () => {
    cancelled = true;
  };
}, [animate, onComplete, prefersReducedMotion]);
```

- [x] **Step 3: Add semantic and decorative markup**

Render one fixed overlay with a static screen-reader announcement. Mark the animated transcript, cursor, progress glyphs, monogram, and split panels as decorative.

```jsx
<div ref={scope} className="loading-screen" role="status" aria-live="polite">
  <span className="sr-only">Opening John Lloyd&apos;s portfolio.</span>
  <div className="loading-screen__panel loading-screen__panel--top" aria-hidden="true" />
  <div className="loading-screen__panel loading-screen__panel--bottom" aria-hidden="true" />
  <div className="loading-screen__terminal" aria-hidden="true">
    {terminalLines.map((line) => (
      <p key={line} className="loading-screen__line">{line}</p>
    ))}
    <span className="loading-screen__cursor">█</span>
  </div>
  <div className="loading-screen__monogram" aria-hidden="true">JLC</div>
</div>
```

- [x] **Step 4: Style the viewport overlay and responsive terminal**

In `LoadingScreen.css`, use `position: fixed`, `inset: 0`, and a z-index above the navbar. Use the existing cream value `#f7f7f3`, charcoal text, `var(--page-padding)`, a system monospace stack, and `clamp()` typography. Keep both split panels at half-viewport height and ensure the terminal stays within `min(46rem, 100%)`.

```css
.loading-screen {
  position: fixed;
  z-index: 999;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: var(--page-padding);
  color: #111111;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

.loading-screen__terminal {
  position: relative;
  z-index: 2;
  width: min(46rem, 100%);
  font-size: clamp(0.68rem, 1.25vw, 0.92rem);
  line-height: 1.8;
}

.loading-screen__line {
  margin: 0;
  opacity: 0;
  transform: translateY(0.35rem);
  white-space: pre-wrap;
}
```

- [x] **Step 5: Add temporary scroll locking with cleanup**

Inside the component effect, preserve and restore the document overflow value:

```jsx
const previousOverflow = document.documentElement.style.overflow;
document.documentElement.style.overflow = "hidden";

return () => {
  cancelled = true;
  document.documentElement.style.overflow = previousOverflow;
};
```

- [x] **Step 6: Run static checks for the component**

Run: `npm run lint`

Expected: exit code `0` with no ESLint errors.

---

### Task 2: Gate the Existing Portfolio Shell

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `LoadingScreen({ onComplete })`
- Produces: `isIntroComplete: boolean` controlling whether the loading screen or existing portfolio shell is mounted.

- [x] **Step 1: Add stable completion state**

Import `useCallback`, `useState`, and `LoadingScreen`, then create a stable completion callback:

```jsx
const [isIntroComplete, setIsIntroComplete] = useState(false);
const handleIntroComplete = useCallback(() => setIsIntroComplete(true), []);
```

- [x] **Step 2: Render the loader before the portfolio shell**

Return the loader until completion, then return the existing `GlowCursor` tree unchanged:

```jsx
if (!isIntroComplete) {
  return <LoadingScreen onComplete={handleIntroComplete} />;
}

return (
  <GlowCursor
    color="#000000"
    secondaryColor="#343434"
    trailLength={40}
    trailWidth={7}
    trailTaper={0.84}
    followSpeed={0.16}
    glowIntensity={0.28}
    glowSpread={1.1}
    hotspot={0.16}
    brightness={0.72}
    opacity={0.34}
    pulseSpeed={0.8}
    noiseStrength={0.035}
    idleFade
    idleTimeout={700}
    fadeDuration={900}
    blendMode="screen"
  >
    <div className="w-full max-w-full overflow-x-hidden text-stone-200 antialiased">
      <PortfolioNav />
      <main>
        <Hero />
      </main>
    </div>
  </GlowCursor>
);
```

- [x] **Step 3: Verify the handoff behavior manually**

Run `npm run dev`, reload the page twice, and confirm the full terminal sequence plays on each reload. Confirm the portfolio shell mounts only after the panels separate and that the Hero entrance animation is visible.

- [x] **Step 4: Run repository checks**

Run: `npm run lint`

Expected: exit code `0`.

Run: `npm run build`

Expected: exit code `0`; existing Browserslist-age and large-chunk warnings are acceptable.

---

### Task 3: Validate Accessibility and Responsive Motion

**Files:**
- Verify: `src/components/LoadingScreen.jsx`
- Verify: `src/components/LoadingScreen.css`
- Verify: `src/App.jsx`

**Interfaces:**
- Consumes: completed `LoadingScreen` and gated `App` shell.
- Produces: verified mobile, desktop, standard-motion, and reduced-motion behavior.

- [x] **Step 1: Verify standard desktop presentation**

At a desktop viewport, confirm all nine terminal rows fit without clipping, the terminal stays centered, both panels fully cover the viewport, and the split reveals no white flash.

- [x] **Step 2: Verify mobile presentation**

At a viewport near `390 × 844`, confirm long lines wrap cleanly, the status line remains readable, and the `JLC` monogram does not clip.

- [x] **Step 3: Verify reduced-motion presentation**

Emulate `prefers-reduced-motion: reduce`, reload, and confirm only the static `JLC` fade appears for approximately 0.4 seconds. Confirm terminal rows and panel motion do not run.

- [x] **Step 4: Verify interaction locking and cleanup**

During the loader, confirm the underlying navbar and Hero cannot receive pointer or keyboard interaction. After completion, confirm scrolling, navbar controls, Hero buttons, and GlowCursor work normally.

- [x] **Step 5: Check runtime errors**

Inspect the browser console after both standard and reduced-motion runs.

Expected: no React, Framer Motion, timer cleanup, or WebGL errors.

- [x] **Step 6: Run final verification**

Run: `npm run lint`

Expected: exit code `0`.

Run: `npm run build`

Expected: exit code `0`; only the repository's existing non-blocking warnings may remain.
