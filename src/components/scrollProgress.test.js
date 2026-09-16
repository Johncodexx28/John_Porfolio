import { describe, expect, it } from "vitest";
import { getEntryRevealProgress, getScrollProgress, getTrackHeight } from "./scrollProgress";

describe("getScrollProgress", () => {
  it("starts expanding when the sticky stage reaches its viewport offset", () => {
    expect(getScrollProgress(96, 96, 400)).toBe(0);
    expect(getScrollProgress(0, 96, 400)).toBeCloseTo(0.24);
  });

  it("begins the reveal while the image is entering the viewport", () => {
    expect(getEntryRevealProgress(720, 800)).toBeCloseTo(0.1538);
    expect(getEntryRevealProgress(280, 800)).toBe(1);
    expect(getEntryRevealProgress(0, 800)).toBe(1);
  });

  it("keeps the expanded image pinned after the reveal completes", () => {
    expect(getTrackHeight(560, 0.72, 0.45)).toBeCloseTo(1215.2);
  });
});
