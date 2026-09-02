import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";
import {
  LOCAL_BUSINESS_JSON_LD,
  serializeJsonLd,
} from "@/lib/structured-data";

describe("SEO artefacts", () => {
  it("returns an absolute homepage URL from the sitemap", () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThanOrEqual(1);
    expect(entries[0].url).toBe(new URL("/", SITE_URL).toString());
    expect(entries[0].lastModified).toBeInstanceOf(Date);
  });

  it("allows the homepage and points at the sitemap", () => {
    const result = robots();

    expect(result.rules.allow).toBe("/");
    expect(result.sitemap).toBe(new URL("/sitemap.xml", SITE_URL).toString());
  });

  it("serializes valid sanitized JSON-LD without aggregateRating", () => {
    const serialized = serializeJsonLd(LOCAL_BUSINESS_JSON_LD);
    const parsed = JSON.parse(serialized);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("ProfessionalService");
    expect(serialized).not.toContain("<");
    expect(parsed).not.toHaveProperty("aggregateRating");
  });
});
