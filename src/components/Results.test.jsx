import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Results from "./Results";

function preferReducedMotion() {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Testing Library normalizuje białe znaki w DOM-ie, a pl-PL rozdziela tysiące
// spacją nierozdzielającą — porównanie musi używać tej samej normalizacji.
function normalizeSpaces(value) {
  return value.replace(/\s/g, " ");
}

describe("Results", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows final pl-PL formatted values immediately under reduced motion", async () => {
    preferReducedMotion();
    render(<Results />);

    await waitFor(() => {
      expect(screen.getByText("+1500")).toBeInTheDocument();
      expect(
        screen.getByText(normalizeSpaces((218432).toLocaleString("pl-PL"))),
      ).toBeInTheDocument();
      expect(screen.getByText("0,34 zł")).toBeInTheDocument();
      expect(screen.getByText("5,0")).toBeInTheDocument();
    });
  });
});
