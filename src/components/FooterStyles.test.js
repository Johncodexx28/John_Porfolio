import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve("src/components/Footer.css"), "utf8");

describe("Footer responsive styles", () => {
  it("keeps the back-to-top control circular instead of stretched on phones", () => {
    expect(styles).toMatch(
      /@media \(max-width: 767px\)[\s\S]*?\.portfolio-footer__top-btn\s*\{[^}]*align-self:\s*flex-start;[^}]*width:\s*44px;[^}]*height:\s*44px;[^}]*padding:\s*0;[^}]*border-radius:\s*50%;/,
    );
    expect(styles).toMatch(
      /@media \(max-width: 767px\)[\s\S]*?\.portfolio-footer__top-btn span\s*\{[^}]*display:\s*none;/,
    );
  });
});
