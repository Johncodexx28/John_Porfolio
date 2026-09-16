import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("./components/LoadingScreen.jsx", () => ({
  default: ({ onComplete }) => <button type="button" onClick={onComplete}>Enter portfolio</button>,
}));
vi.mock("./components/PortfolioNav.jsx", () => ({ default: () => <nav>Navigation</nav> }));
vi.mock("./components/GlowCursor.jsx", () => ({ default: ({ children }) => children }));
vi.mock("./components/Footer.jsx", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("./pages", () => ({
  Hero: () => <section>Hero</section>,
  About: () => <section>About</section>,
  Projects: () => <section>Projects</section>,
  Experience: () => <section>Experience</section>,
  Contact: () => <section>Contact</section>,
}));

import App from "./App";

describe("App", () => {
  it("renders the portfolio after the intro completes", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Enter portfolio" }));

    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
