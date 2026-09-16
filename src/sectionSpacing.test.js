import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve("src/index.css"), "utf8");

describe("section boundary spacing", () => {
  it("uses asymmetric padding to keep the About-to-Projects transition compact", () => {
    expect(styles).toMatch(
      /\.portfolio-about\s*\{[^}]*padding:\s*clamp\(6rem, 12vh, 10rem\)\s+var\(--page-padding\)\s+clamp\(3rem, 5vh, 4\.5rem\);/s,
    );
    expect(styles).toMatch(
      /\.portfolio-projects\s*\{[^}]*padding:\s*clamp\(3\.5rem, 6vh, 5rem\)\s+var\(--page-padding\)\s+clamp\(5rem, 10vh, 8\.5rem\);/s,
    );
  });

  it("keeps the compact spacing asymmetric at responsive breakpoints", () => {
    expect(styles).toMatch(
      /@media \(max-width: 960px\)[\s\S]*?\.portfolio-about\s*\{[^}]*padding:\s*clamp\(3\.5rem, 6vh, 5rem\) var\(--page-padding\) 3rem;/,
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.portfolio-projects\s*\{[^}]*padding:\s*3\.5rem var\(--page-padding\) 4\.5rem;/,
    );
  });
});
