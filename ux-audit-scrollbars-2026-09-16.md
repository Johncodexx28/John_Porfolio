# UX quick review — portfolio scrollbars

**Scope:** The reported “two scrollbars” behaviour from the Hero area through the GitHub contribution calendar, compared with the Experience section. This is a focused responsive web audit for a public portfolio (mainstream audience).

**Evidence:** Rendered local Vite preview at a 735 × 742 viewport, plus source inspection. The page is vertically scrollable (`6882px` document height versus `742px` viewport height). The GitHub calendar wrapper is independently horizontally scrollable (`763px` content width versus `578px` available width). No page-level horizontal overflow was measured.

## The finding that matters

| ID | Finding | Dimension | Severity | Confidence | Effort |
|---|---|---|---|---|---|
| PLAT-01 | The GitHub contribution calendar creates a second, nested horizontal scrollbar on narrow viewports. | Responsive & platform conventions | Low | Observed (rendered + code) | S |

### PLAT-01 — Nested calendar scrollbar

**Location:** `src/pages/Projects.jsx:243-249`; `src/index.css:1955-1968`.

**Evidence:** The chart wrapper sets `overflow-x: auto`, while the calendar image has `min-width: 46rem` (`736px`). In the rendered preview the wrapper is only `578px` wide, leaving `185px` of content offscreen and producing its own horizontal scrollbar. The browser page remains vertically scrollable at the same time. The Experience section does not contain this scrollable wrapper, so only the browser’s normal vertical scrollbar remains.

**Why it matters:** Two visible scrollbars look like duplicate page scrolling, especially when the calendar is partially visible. In fact they control different directions: the outer scrollbar moves through the portfolio vertically; the inner one pans the wide GitHub calendar horizontally.

**Recommendation:** This is intentional CSS behaviour, not a global scroll bug. If horizontal panning is unwanted, make the calendar responsive instead of forcing its `46rem` minimum width (or replace it with a compact/mobile contribution view). If keeping it, add a brief visual cue such as “Scroll horizontally to view activity” on narrow screens and keep the nested scrollbar limited to the calendar.

## What is working

The page itself has no measured horizontal overflow, so there is no second page-level scrollbar to remove. The nested scroll is correctly contained in the chart rather than causing the entire layout to pan sideways.

---

*Focused audit of this one interaction; no code changes were made.*
