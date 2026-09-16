# Cinematic Loading Screen Design

## Purpose

Introduce the portfolio with a short, intentional animation that reinforces the existing editorial identity. The intro is cinematic rather than load-aware: it plays on every full page load for a fixed duration and does not represent asset progress.

## Visual Direction

The loading screen uses the Hero's warm cream background, black and charcoal typography, a crisp terminal-style monospace font, and restrained glass details. No pink accent is introduced.

The approximately 3-second sequence is:

1. A cream overlay appears immediately with a blinking terminal cursor.
2. Personalized system lines type into view in quick succession:

   ```text
   > booting john_lloyd.portfolio

   [ OK ] identity ........ Full-Stack Developer
   [ OK ] location ........ Iloilo, Philippines
   [ OK ] frontend ........ React / React Native
   [ OK ] backend ......... Node.js / MongoDB
   [ OK ] mindset ......... Lifelong Learner
   [ OK ] status .......... Available for Remote Work

   > building digital experiences...
   > launching portfolio ██████████ 100%
   ```

3. At `100%`, the terminal content contracts and crossfades into an oversized `JLC` monogram.
4. The monogram sharpens briefly.
5. Two cream panels separate vertically to reveal the navbar and Hero.

Motion should use smooth editorial easing rather than elastic or playful physics. The terminal text remains the visual focus; the final `JLC` may use the existing serif display font to connect the intro to the Hero.

## Component Architecture

Create a focused `LoadingScreen` component with an `onComplete` callback. `App.jsx` owns the single `isIntroComplete` state and initially renders the loader. Once the fixed sequence completes, the loader unmounts and the existing portfolio shell mounts.

Mounting the portfolio after completion ensures the navbar, GlowCursor, and Hero entrance animations begin visibly. The loading screen must not modify the existing GlowCursor configuration or Hero content.

## Timing and State

Use a Framer Motion sequence driven by one timeline rather than loosely chained arbitrary timers. Completion fires once after approximately 3 seconds. All animation frames, timers, and document state changes must be cleaned up if the component unmounts.

Scrolling and pointer interaction remain unavailable while the loader is active. There is no skip button and no Escape-key shortcut.

## Accessibility

The animated terminal transcript and progress bar are hidden from assistive technology. A single status message announces “Opening John Lloyd's portfolio.” Focus never moves into the decorative loader.

When `prefers-reduced-motion: reduce` is enabled, replace the terminal typing and panel split with a static `JLC` mark that fades out in approximately 0.4 seconds. The simplified intro still plays on every page load.

## Responsive Behavior

Scale the terminal text and monogram with `clamp()` so they remain readable without clipping on mobile. Keep the terminal block inset from the viewport edges using the existing page-padding token. The split panels must cover the complete viewport at every breakpoint.

## Verification

- Confirm the personalized terminal lines appear in order and the sequence reveals the portfolio after roughly 3 seconds.
- Confirm reduced-motion mode uses the simplified 0.4-second fade.
- Confirm the overlay blocks scrolling and interaction only while active.
- Confirm the Hero, navbar, GlowCursor colors, and existing animations remain unchanged.
- Run `npm run lint` and `npm run build`, then inspect mobile and desktop previews for clipping or flashes.
