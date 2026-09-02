"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuId = "site-menu";

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/16 bg-paper/86 backdrop-blur-[10px]">
      <Container className="relative flex items-center gap-7 py-3.5">
        <a
          className="whitespace-nowrap font-stretch-[118%] text-[1.02rem] font-[850] leading-none tracking-[.02em] uppercase"
          href="#top"
          aria-label="never ending story — strona główna"
          onClick={closeMenu}
        >
          never ending{" "}
          <span className="font-serif text-[1.12em] font-medium tracking-normal text-acc normal-case italic">
            story.
          </span>
        </a>

        <div
          id={menuId}
          className={[
            "ml-auto flex gap-[26px] text-[.92rem] font-semibold",
            "max-[900px]:absolute max-[900px]:top-full max-[900px]:right-0 max-[900px]:left-0 max-[900px]:ml-0 max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:border-b max-[900px]:border-ink/16 max-[900px]:bg-paper max-[900px]:px-(--pad) max-[900px]:pt-[18px] max-[900px]:pb-[22px]",
            open ? "max-[900px]:flex" : "max-[900px]:hidden",
          ].join(" ")}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b-2 border-transparent px-0.5 py-1.5 transition-colors duration-[180ms] hover:border-acc"
            >
              {link.label}
            </a>
          ))}
          <Button
            href="#kontakt"
            size="sm"
            onClick={closeMenu}
            className="mt-1.5 hidden w-max max-[900px]:inline-flex"
          >
            Umów spotkanie
          </Button>
        </div>

        <Button href="#kontakt" size="sm" className="ml-2 max-[900px]:hidden">
          Umów spotkanie
        </Button>

        <button
          className="ml-auto hidden px-2 py-1 text-2xl leading-none max-[900px]:block"
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          ☰
        </button>
      </Container>
    </nav>
  );
}
