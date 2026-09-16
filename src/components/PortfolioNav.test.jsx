import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import PortfolioNav from "./PortfolioNav";

const sectionMarkup = `
  <section id="hero" data-nav-theme="light"></section>
  <section id="about" data-nav-theme="dark"></section>
  <section id="projects" data-nav-theme="light"></section>
  <section id="experience" data-nav-theme="dark"></section>
  <section id="contact"></section>
`;

describe("PortfolioNav", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("uses the active Experience section's dark navigation theme", () => {
    document.body.innerHTML = sectionMarkup;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function getBounds() {
      const bounds = {
        hero: { top: -1000, bottom: -500 },
        about: { top: -600, bottom: -320 },
        projects: { top: -300, bottom: 100 },
        experience: { top: -50, bottom: 900 },
        contact: { top: 900, bottom: 1200 },
      };
      return bounds[this.id] || { top: 0, bottom: 0 };
    });

    const { container } = render(<PortfolioNav />);

    expect(container.querySelector(".portfolio-nav")).toHaveClass("is-dark");
  });
});
