import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import Resume from "./Resume";

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

describe("Experience", () => {
  it("shows the community chapter without a Download CV control", () => {
    render(<Resume />);

    expect(screen.getAllByText("University of Iloilo Programming Circle")).not.toHaveLength(0);
    expect(screen.queryByRole("button", { name: /download cv/i })).not.toBeInTheDocument();
    const nextPhoto = screen.getByRole("button", { name: /next uipc photo/i });
    const initialPhoto = screen.getByRole("img", { name: "University of Iloilo Programming Circle members" });
    const initialPhotoSource = initialPhoto.getAttribute("src");

    fireEvent.click(nextPhoto);

    expect(screen.getByRole("img", { name: "University of Iloilo Programming Circle activity" })).toBeInTheDocument();
    expect(initialPhotoSource).not.toBe(screen.getByRole("img", { name: "University of Iloilo Programming Circle activity" }).getAttribute("src"));
  });
});
