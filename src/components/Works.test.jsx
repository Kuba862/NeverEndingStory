import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Works from "./Works";

function caseCards() {
  return screen.getAllByRole("button", { name: /Otwórz case study:/ });
}

describe("Works", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all cards initially", () => {
    render(<Works />);

    expect(caseCards()).toHaveLength(8);
  });

  it("filters cards by category count and marks the active filter", async () => {
    const user = userEvent.setup();
    render(<Works />);

    const expected = [
      ["Wszystkie", 8],
      ["Gastronomia", 3],
      ["Hotele i noclegi", 1],
      ["Beauty & wellness", 2],
      ["Branding", 2],
    ];

    for (const [label, count] of expected) {
      const filter = screen.getByRole("button", { name: label });
      await user.click(filter);
      expect(filter).toHaveAttribute("aria-pressed", "true");
      expect(caseCards()).toHaveLength(count);
    }
  });

  it("does not emit a React key warning for the duplicated Salute card id", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Works />);

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
