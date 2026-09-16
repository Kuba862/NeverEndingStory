import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as contactForm from "@/lib/contact-form";
import ContactCta from "./ContactCta";
import Hero from "./Hero";
import Nav from "./Nav";

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

async function openFromNav(user) {
  render(<Nav />);
  const trigger = screen.getByRole("button", { name: "Umów spotkanie" });
  await user.click(trigger);

  return {
    dialog: await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    }),
    trigger,
  };
}

async function openFromContactCta(user) {
  render(<ContactCta />);
  const trigger = screen.getByRole("button", {
    name: "Umów niezobowiązujące spotkanie",
  });
  await user.click(trigger);

  return {
    dialog: await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    }),
    trigger,
  };
}

async function openFromHero(user) {
  render(<Hero />);
  const trigger = screen.getByRole("button", {
    name: "Umów niezobowiązujące spotkanie",
  });
  await user.click(trigger);

  return {
    dialog: await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    }),
    trigger,
  };
}

async function fillValidForm(user) {
  await user.type(screen.getByLabelText("Imię"), "  Anna  ");
  await user.type(screen.getByLabelText("Nazwisko"), "  Kowalska  ");
  await user.type(screen.getByLabelText("Numer telefonu"), " +48 606 227 462 ");
  await user.type(
    screen.getByLabelText("Treść wiadomości"),
    "  Chcę porozmawiać o prowadzeniu social mediów.  ",
  );
}

describe("ContactModal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = "";
  });

  it("opens from the header CTA and keeps the single button guard", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);

    expect(screen.getAllByRole("button", { name: "Umów spotkanie" })).toHaveLength(1);
    expect(dialog).toBeInTheDocument();
    expect(dialog.parentElement.parentElement).toBe(document.body);
  });

  it("opens from the contact section CTA", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromContactCta(user);

    expect(dialog).toBeInTheDocument();
  });

  it("renders the Hero meeting CTA as a button, not a link", () => {
    render(<Hero />);

    const trigger = screen.getByRole("button", {
      name: "Umów niezobowiązujące spotkanie",
    });

    expect(trigger.tagName).toBe("BUTTON");
    expect(
      screen.queryByRole("link", {
        name: "Umów niezobowiązujące spotkanie",
      }),
    ).not.toBeInTheDocument();
  });

  it("opens the contact dialog from the Hero meeting CTA", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromHero(user);

    expect(dialog).toBeInTheDocument();
  });

  it("keeps the Hero meeting CTA free of an href", () => {
    render(<Hero />);

    expect(
      screen.getByRole("button", {
        name: "Umów niezobowiązujące spotkanie",
      }),
    ).not.toHaveAttribute("href");
  });

  it("collapses the mobile menu when the header CTA opens the dialog", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    render(<Nav />);

    const burger = screen.getByRole("button", { name: "Menu" });
    await user.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Umów spotkanie" }));
    await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    });

    expect(burger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the four labelled fields and focuses Imię on open", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);

    expect(within(dialog).getByLabelText("Imię")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Nazwisko")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Numer telefonu")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Treść wiadomości")).toBeInTheDocument();

    await waitFor(() => {
      expect(within(dialog).getByLabelText("Imię")).toHaveFocus();
    });
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { trigger } = await openFromNav(user);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("returns focus to the burger when the mobile header CTA is hidden", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const getComputedStyle = window.getComputedStyle.bind(window);
    let hideMenu = false;

    vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      if (hideMenu && element instanceof HTMLElement && element.id === "site-menu") {
        return {
          display: "none",
          visibility: "visible",
        };
      }

      return getComputedStyle(element);
    });

    render(<Nav />);

    const burger = screen.getByRole("button", { name: "Menu" });
    await user.click(burger);
    await user.click(screen.getByRole("button", { name: "Umów spotkanie" }));
    await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    });

    hideMenu = true;
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(burger).toHaveFocus();
  });

  it("closes from the close button", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);

    await user.click(within(dialog).getByRole("button", { name: "Zamknij" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes on a backdrop click but not on a panel click", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    let opened = await openFromNav(user);

    await user.click(opened.dialog);
    expect(opened.dialog).toBeInTheDocument();

    await user.click(opened.dialog.parentElement);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Umów spotkanie" }));
    opened.dialog = await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    });
    expect(opened.dialog).toBeInTheDocument();
  });

  it("does not close when text selection starts in the message field", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);
    const message = within(dialog).getByLabelText("Treść wiadomości");
    const backdrop = dialog.parentElement;
    const typedMessage = "Chcę zaznaczyć dłuższy fragment wiadomości.";

    await user.type(message, typedMessage);
    fireEvent.pointerDown(message);
    fireEvent.pointerUp(backdrop);
    fireEvent.click(backdrop);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 0);
    });

    expect(dialog).toBeInTheDocument();
    expect(message).toHaveValue(typedMessage);
  });

  it("wraps Tab from the last focusable control to the first", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);
    const closeButton = within(dialog).getByRole("button", { name: "Zamknij" });
    const submitButton = within(dialog).getByRole("button", {
      name: "Wyślij wiadomość",
    });

    submitButton.focus();
    await user.tab();

    expect(closeButton).toHaveFocus();
  });

  it("locks body scroll while open and restores the previous value after close", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    document.body.style.overflow = "clip";

    await openFromNav(user);
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("clip");
  });

  it("shows required errors on empty submit and does not call the send function", async () => {
    preferReducedMotion();
    const sendSpy = vi.spyOn(contactForm, "sendContactMessage");
    const user = userEvent.setup();
    const { dialog } = await openFromNav(user);

    await user.click(within(dialog).getByRole("button", { name: "Wyślij wiadomość" }));

    expect(screen.getByText("Podaj imię.")).toBeInTheDocument();
    expect(screen.getByText("Podaj nazwisko.")).toBeInTheDocument();
    expect(screen.getByText("Podaj numer telefonu.")).toBeInTheDocument();
    expect(screen.getByText("Napisz, w czym możemy pomóc.")).toBeInTheDocument();
    expect(screen.getByLabelText("Imię")).toHaveFocus();
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it("validates phone digit count", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    await openFromNav(user);

    await user.type(screen.getByLabelText("Imię"), "Anna");
    await user.type(screen.getByLabelText("Nazwisko"), "Kowalska");
    await user.type(screen.getByLabelText("Numer telefonu"), "123");
    await user.type(screen.getByLabelText("Treść wiadomości"), "Długa wiadomość");
    await user.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));

    expect(screen.getByText("Numer telefonu wygląda na niepoprawny.")).toBeInTheDocument();
  });

  it("validates a too-short message", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    await openFromNav(user);

    await user.type(screen.getByLabelText("Imię"), "Anna");
    await user.type(screen.getByLabelText("Nazwisko"), "Kowalska");
    await user.type(screen.getByLabelText("Numer telefonu"), "606227462");
    await user.type(screen.getByLabelText("Treść wiadomości"), "Hej");
    await user.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));

    expect(screen.getByText("Wiadomość jest za krótka — dopisz kilka zdań.")).toBeInTheDocument();
  });

  it("clears a field error on change after it was marked invalid", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    await openFromNav(user);

    await user.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));
    expect(screen.getByText("Podaj imię.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Imię"), "Anna");

    expect(screen.queryByText("Podaj imię.")).not.toBeInTheDocument();
  });

  it("calls the send function once with trimmed values and renders the live result", async () => {
    preferReducedMotion();
    const sendSpy = vi.spyOn(contactForm, "sendContactMessage");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    await openFromNav(user);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));

    await waitFor(() => {
      expect(sendSpy).toHaveBeenCalledTimes(1);
    });
    expect(sendSpy).toHaveBeenCalledWith({
      firstName: "Anna",
      lastName: "Kowalska",
      phone: "+48 606 227 462",
      message: "Chcę porozmawiać o prowadzeniu social mediów.",
    });

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(
      within(status).getByText("Formularz nie jest jeszcze podłączony do wysyłki."),
    ).toBeInTheDocument();
    expect(
      within(status).getByRole("link", {
        name: "agencjaneverendingstory@gmail.com",
      }),
    ).toHaveAttribute("href", "mailto:agencjaneverendingstory@gmail.com");
    expect(
      within(status).getByRole("link", { name: "+48 606 227 462" }),
    ).toHaveAttribute("href", "tel:+48606227462");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reopens with empty fields and no stale errors or result", async () => {
    preferReducedMotion();
    const user = userEvent.setup();
    await openFromNav(user);

    await user.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));
    expect(screen.getByText("Podaj imię.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Imię"), "Anna");

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Umów spotkanie" }));
    await screen.findByRole("dialog", {
      name: "Umów niezobowiązujące spotkanie",
    });

    expect(screen.getByLabelText("Imię")).toHaveValue("");
    expect(screen.queryByText("Podaj nazwisko.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Formularz nie jest jeszcze podłączony do wysyłki."),
    ).not.toBeInTheDocument();
  });
});
