import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CARDS } from "./cards";
import { CASES } from "./cases";
import { CLIENTS, TEAM } from "./site";

function publicPath(src) {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

describe("data modules", () => {
  it("has the expected case, card, and marquee counts", () => {
    expect(Object.values(CASES)).toHaveLength(7);
    expect(CARDS).toHaveLength(8);
    expect(CLIENTS).toHaveLength(20);
  });

  it("has every required case field populated", () => {
    for (const currentCase of Object.values(CASES)) {
      for (const field of [
        "id",
        "name",
        "cat",
        "catLabel",
        "hero",
        "challenge",
        "solution",
      ]) {
        expect(currentCase[field]).toBeTruthy();
      }

      expect(currentCase.tags.length).toBeGreaterThan(0);
      expect(currentCase.kpis.length).toBeGreaterThan(0);
    }
  });

  it("points every data image at an existing file under public", () => {
    const imagePaths = new Set([
      ...Object.values(CASES).flatMap((currentCase) => [
        currentCase.hero,
        ...(currentCase.gallery?.map((image) => image.src) ?? []),
        ...(currentCase.reels ?? []),
        ...(currentCase.brand ?? []),
      ]),
      ...CARDS.map((card) => card.img),
      ...TEAM.map((person) => person.image),
    ]);

    for (const imagePath of imagePaths) {
      expect(existsSync(publicPath(imagePath)), imagePath).toBe(true);
    }
  });
});
