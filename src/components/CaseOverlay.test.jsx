import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Works from "./Works";

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

async function openCase(user, name) {
  await user.click(screen.getByRole("button", { name: `Otwórz case study: ${name}` }));
  return screen.getByRole("dialog", { name });
}

describe("CaseOverlay", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens from a card click, closes on Escape, and returns focus to the card", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    render(<Works />);

    const card = screen.getByRole("button", {
      name: "Otwórz case study: Salute Wine Bar",
    });
    card.focus();
    await user.click(card);

    const dialog = screen.getByRole("dialog", { name: "Salute Wine Bar" });
    expect(
      within(dialog).getByRole("heading", { level: 2, name: "Salute Wine Bar" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(card).toHaveFocus();
  });

  it("keeps keyboard focus inside the dialog", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    render(<Works />);

    const dialog = await openCase(user, "Salute Wine Bar");
    const closeButton = within(dialog).getByRole("button", { name: /Zamknij/ });
    const lastButton = within(dialog).getByRole("button", {
      name: "Chcę taki efekt u siebie",
    });

    lastButton.focus();
    await user.tab();

    expect(closeButton).toHaveFocus();
  });

  it("renders optional sections only for cases that define them", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    render(<Works />);

    let dialog = await openCase(user, "Salute Wine Bar");
    expect(within(dialog).getByRole("heading", { name: "Feed & kadry" })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Reelsy" })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Identyfikacja" })).toBeInTheDocument();
    expect(within(dialog).getByText(/Czułem się/)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    dialog = await openCase(user, "Campanile Hotel");
    expect(within(dialog).queryByRole("heading", { name: "Feed & kadry" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("heading", { name: "Reelsy" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("heading", { name: "Identyfikacja" })).not.toBeInTheDocument();
    expect(within(dialog).queryByText(/opinia Google o naszej pracy/)).not.toBeInTheDocument();
  });

  it("wraps the next story action from the last case to the first", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    render(<Works />);

    let dialog = await openCase(user, "ñam ñam vino");
    const nextButton = within(dialog).getByRole("button", {
      name: /następna historia/i,
    });
    expect(nextButton).toHaveTextContent("Salute Wine Bar");

    await user.click(nextButton);

    dialog = screen.getByRole("dialog", { name: "Salute Wine Bar" });
    expect(dialog).toBeInTheDocument();
  });
});
