import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Nav from "./Nav";

describe("Nav", () => {
  it("renders the four section links and one meeting CTA", () => {
    render(<Nav />);

    const sectionLinks = ["Realizacje", "Jak pracujemy", "Usługi", "Zespół"].map(
      (label) => screen.getByRole("link", { name: label }),
    );

    expect(sectionLinks).toHaveLength(4);
    expect(screen.getAllByRole("link", { name: "Umów spotkanie" })).toHaveLength(1);
  });

  it("toggles the burger expanded state", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const burger = screen.getByRole("button", { name: "Menu" });
    expect(burger).toHaveAttribute("aria-expanded", "false");

    await user.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");
  });

  it("links to the expected section ids", () => {
    render(<Nav />);

    expect(screen.getByRole("link", { name: "Realizacje" })).toHaveAttribute(
      "href",
      "#realizacje",
    );
    expect(screen.getByRole("link", { name: "Jak pracujemy" })).toHaveAttribute(
      "href",
      "#proces",
    );
    expect(screen.getByRole("link", { name: "Usługi" })).toHaveAttribute(
      "href",
      "#uslugi",
    );
    expect(screen.getByRole("link", { name: "Zespół" })).toHaveAttribute(
      "href",
      "#zespol",
    );
  });
});
