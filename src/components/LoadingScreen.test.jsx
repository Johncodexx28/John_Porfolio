import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => ({
  stagger: () => 0,
  useAnimate: () => [{ current: null }, vi.fn(() => Promise.resolve())],
  useReducedMotion: () => false,
}));

import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders the full name as one unclipped text element", () => {
    const { container } = render(<LoadingScreen onComplete={() => {}} />);
    const name = container.querySelector(".loading-screen__name-morph");

    expect(name.textContent).toBe("John Lloyd Cabanig");
    expect(name.childElementCount).toBe(0);
  });
});
