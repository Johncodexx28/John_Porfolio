import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact.jsx";

describe("Contact navigation target", () => {
  it("keeps the contact anchor immediately above the form inside the dark section", () => {
    const { container } = render(<Contact />);
    const contactAnchor = container.querySelector("#contact");

    expect(contactAnchor).toHaveClass("contact-section__subtitle");
    expect(contactAnchor.closest("[data-nav-theme]"))?.toHaveAttribute(
      "data-nav-theme",
      "dark",
    );
  });
});
