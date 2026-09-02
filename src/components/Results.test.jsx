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

describe("Results", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows final pl-PL formatted values immediately under reduced motion", async () => {
    preferReducedMotion();
    render(<Results />);

    await waitFor(() => {
      expect(screen.getByText("+1500")).toBeInTheDocument();
      expect(screen.getByText((218432).toLocaleString("pl-PL"))).toBeInTheDocument();
      expect(screen.getByText("0,34 zł")).toBeInTheDocument();
      expect(screen.getByText("5,0")).toBeInTheDocument();
    });
  });
});
