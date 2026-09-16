import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PRIVACY_SECTIONS } from "@/data/privacy";
import { CONTACT } from "@/data/site";
import Footer from "./Footer";

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

async function openPrivacyModal(user) {
  render(<Footer />);
  const trigger = screen.getByRole("button", { name: "Polityka prywatności" });
  await user.click(trigger);

  return {
    dialog: await screen.findByRole("dialog", {
      name: "Polityka prywatności",
    }),
    trigger,
  };
}

describe("PrivacyModal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = "";
  });

  it("renders one footer control named Polityka prywatności as a button", () => {
    render(<Footer />);

    expect(
      screen.getAllByRole("button", { name: "Polityka prywatności" }),
    ).toHaveLength(1);
  });

  it("opens a dialog named Polityka prywatności from the footer control", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);

    expect(dialog).toBeInTheDocument();
  });

  it("renders one section heading for every privacy data section", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);

    const headings = PRIVACY_SECTIONS.map((section) =>
      within(dialog).getByRole("heading", {
        level: 3,
        name: section.title,
      }),
    );

    expect(headings).toHaveLength(PRIVACY_SECTIONS.length);
  });

  it("makes the scroll container focusable and names it", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);
    const scrollContainer = within(dialog).getByRole("region", {
      name: "Polityka prywatności",
    });

    expect(scrollContainer).toHaveAttribute("tabindex", "0");
  });

  it("moves focus to the scroll container when it opens", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);
    const scrollContainer = within(dialog).getByRole("region", {
      name: "Polityka prywatności",
    });

    await waitFor(() => {
      expect(scrollContainer).toHaveFocus();
    });
  });

  it("closes on Escape and returns focus to the footer trigger", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { trigger } = await openPrivacyModal(user);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("closes from the close button", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);

    await user.click(within(dialog).getByRole("button", { name: "Zamknij" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes on a backdrop click but not on a panel click", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);

    await user.click(dialog);
    expect(dialog).toBeInTheDocument();

    await user.click(dialog.parentElement);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("wraps Tab from the last focusable control to the first", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);
    const closeButton = within(dialog).getByRole("button", { name: "Zamknij" });
    const scrollContainer = within(dialog).getByRole("region", {
      name: "Polityka prywatności",
    });

    scrollContainer.focus();
    await user.tab();

    expect(closeButton).toHaveFocus();
  });

  it("locks body scroll while open and restores the previous value after close", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    document.body.style.overflow = "clip";

    await openPrivacyModal(user);
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("clip");
  });

  it("renders the contact email and phone from site data", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openPrivacyModal(user);

    expect(dialog).toHaveTextContent(CONTACT.email);
    expect(dialog).toHaveTextContent(CONTACT.phoneLabel);
  });
});
