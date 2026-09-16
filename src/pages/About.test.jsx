import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import About from "./About";

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock;
globalThis.ResizeObserver = class {
  observe() {}
  disconnect() {}
};
window.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
});

describe("About", () => {
  it("shows a compact work preview alongside the introduction", () => {
    render(<About />);

    const workPreview = screen.getByLabelText("Work in motion");

    expect(workPreview).toBeInTheDocument();
    expect(workPreview).toHaveStyle({ "--dw-tile-w": "200px", "--dw-tile-h": "156px", "--dw-gray": "1" });
    expect(screen.queryByText("Selected work")).not.toBeInTheDocument();
    expect(screen.queryByText("Coming into view")).not.toBeInTheDocument();
  });
});
