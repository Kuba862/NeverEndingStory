"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CASE_ORDER, CASES } from "@/data/cases";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Display from "./ui/Display";
import Eyebrow from "./ui/Eyebrow";
import Frame from "./ui/Frame";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CaseOverlay({
  caseId,
  onClose,
  onSelectCase,
  returnFocusRef,
}) {
  const currentCase = CASES[caseId];
  const closeButtonRef = useRef(null);
  const closingRef = useRef(false);
  const overlayRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextId = useMemo(() => {
    const currentIndex = CASE_ORDER.indexOf(caseId);
    return CASE_ORDER[(currentIndex + 1) % CASE_ORDER.length];
  }, [caseId]);

  const finishClose = useCallback(
    (returnFocus, jumpToContact) => {
      onClose();

      if (jumpToContact) {
        document.getElementById("kontakt")?.scrollIntoView({
          behavior: reducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      if (returnFocus) {
        returnFocusRef.current?.focus();
      }
    },
    [onClose, returnFocusRef],
  );

  const close = useCallback(
    ({ jumpToContact = false, returnFocus = true } = {}) => {
      if (closingRef.current) {
        return;
      }

      closingRef.current = true;
      setOpen(false);

      window.setTimeout(
        () => finishClose(returnFocus, jumpToContact),
        reducedMotion() ? 0 : 280,
      );
    },
    [finishClose],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    closingRef.current = false;
    overlayRef.current?.scrollTo({ top: 0 });

    const frame = window.requestAnimationFrame(() => {
      setProgress(0);
      setOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [caseId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }

      const focusable = Array.from(
        overlay.querySelectorAll(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (active && !overlay.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  const handleScroll = () => {
    const overlay = overlayRef.current;
    if (!overlay) {
      return;
    }

    const max = overlay.scrollHeight - overlay.clientHeight;
    setProgress(max > 0 ? (overlay.scrollTop / max) * 100 : 0);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="caseTitle"
      onScroll={handleScroll}
      className={[
        "fixed inset-0 z-[100] overflow-y-auto bg-paper transition-[opacity,transform,visibility] duration-[280ms] ease-[cubic-bezier(.2,.7,.2,1)]",
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-[14px] opacity-0",
      ].join(" ")}
    >
      <div className="sticky top-0 z-[5] border-b border-ink/16 bg-paper/92 backdrop-blur-[10px]">
        <Container className="flex items-center gap-[18px] py-3">
          <span className="font-stretch-[112%] text-[.95rem] font-[850] uppercase">
            {currentCase.name}
          </span>
          <span
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/16"
            aria-hidden="true"
          >
            <i
              className="block h-full bg-acc"
              style={{ width: `${progress}%` }}
            />
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[.88rem] font-[750] transition-colors hover:bg-ink hover:text-paper"
            onClick={() => close()}
          >
            Zamknij ✕
          </button>
        </Container>
      </div>

      <Container className="pt-[clamp(36px,5vw,60px)] pb-20">
        <div className="mb-[clamp(36px,5vw,60px)] grid grid-cols-2 items-end gap-[clamp(24px,4vw,52px)] max-[860px]:grid-cols-1">
          <div>
            <Eyebrow>{currentCase.catLabel}</Eyebrow>
            <Display
              as="h2"
              id="caseTitle"
              className="mt-3.5 mb-4 text-[clamp(2.2rem,5vw,3.8rem)]"
            >
              {currentCase.name}
            </Display>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {currentCase.tags.map((tag) => (
                <span
                  className="rounded-full border-[1.5px] border-ink/16 bg-white px-3.5 py-[7px] text-[.8rem] font-[650] text-ink/62"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Frame
            src={currentCase.hero}
            alt=""
            aspect="4/4.4"
            sizes="(max-width: 860px) calc(100vw - 40px), 560px"
            chip="case study"
          />
        </div>

        <div className="mb-[clamp(40px,6vw,70px)] grid grid-cols-2 gap-[clamp(24px,4vw,52px)] max-[860px]:grid-cols-1">
          <div>
            <h3 className="mb-2.5 font-stretch-[112%] text-base font-[850] uppercase text-acc">
              Wyzwanie
            </h3>
            <p className="text-ink/62">{currentCase.challenge}</p>
          </div>
          <div>
            <h3 className="mb-2.5 font-stretch-[112%] text-base font-[850] uppercase text-acc">
              Co zrobiliśmy
            </h3>
            <p className="text-ink/62">{currentCase.solution}</p>
          </div>
        </div>

        <div className="mb-[clamp(40px,6vw,70px)] grid grid-cols-3 gap-3.5 max-[760px]:grid-cols-1">
          {currentCase.kpis.map((kpi) => (
            <div
              className="rounded-media bg-wine p-6 text-paper"
              key={`${kpi.num}-${kpi.lbl}`}
            >
              <div className="text-[1.9rem] font-[850] leading-none text-white font-stretch-[118%]">
                {kpi.num}
              </div>
              <div className="mt-2 text-[.86rem] text-paper/78">{kpi.lbl}</div>
            </div>
          ))}
        </div>

        {currentCase.gallery ? (
          <section className="mb-[clamp(40px,6vw,70px)]">
            <Display as="h3" className="mb-[18px] text-[1.05rem] font-stretch-[112%]">
              Feed & kadry
            </Display>
            <div className="grid grid-cols-3 gap-3.5 max-[760px]:grid-cols-2">
              {currentCase.gallery.map((image, index) => (
                <Frame
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt=""
                  aspect={image.sq ? "1/1" : "4/5"}
                  sizes="(max-width: 760px) 45vw, 370px"
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentCase.reels ? (
          <section className="mb-[clamp(40px,6vw,70px)]">
            <Display as="h3" className="mb-[18px] text-[1.05rem] font-stretch-[112%]">
              Reelsy
            </Display>
            <div className="grid grid-cols-[repeat(3,minmax(0,260px))] gap-3.5 max-[760px]:grid-cols-3 max-[520px]:grid-cols-2">
              {currentCase.reels.map((image, index) => (
                <Frame
                  key={`${image}-${index}`}
                  src={image}
                  alt=""
                  aspect="9/16"
                  sizes="(max-width: 520px) 45vw, 260px"
                  chip="▶ reels"
                  className="reel group/reel"
                >
                  <span
                    className="reel-play absolute inset-0 z-[2] grid place-items-center"
                    aria-hidden="true"
                  >
                    <i className="grid size-[54px] place-items-center rounded-full bg-paper/92 transition-transform duration-200 group-hover/reel:scale-[1.08]" />
                  </span>
                </Frame>
              ))}
            </div>
            <p className="mt-3 text-[.82rem] text-ink/42">
              Na stronie docelowej: pętle wideo 9:16 odtwarzane automatycznie,
              bez dźwięku.
            </p>
          </section>
        ) : null}

        {currentCase.brand ? (
          <section className="mb-[clamp(40px,6vw,70px)]">
            <Display as="h3" className="mb-[18px] text-[1.05rem] font-stretch-[112%]">
              Identyfikacja
            </Display>
            <div className="grid grid-cols-[1.1fr_.9fr] gap-3.5 max-[760px]:grid-cols-1">
              {currentCase.brand.map((image, index) => (
                <Frame
                  key={`${image}-${index}`}
                  src={image}
                  alt=""
                  aspect={index === 0 ? "4/5" : "4/3"}
                  sizes="(max-width: 760px) calc(100vw - 40px), 560px"
                  className="border border-ink/16 bg-white"
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentCase.quote ? (
          <div className="mb-[clamp(40px,6vw,70px)] max-w-[62ch] border-l-[3px] border-acc py-1.5 pl-[26px]">
            <blockquote className="font-serif text-[1.25rem] leading-[1.55] italic">
              {currentCase.quote}
            </blockquote>
            {currentCase.quoteSrc ? (
              <cite className="mt-3.5 block text-[.8rem] font-bold tracking-[.1em] text-ink/42 not-italic uppercase">
                {currentCase.quoteSrc}
              </cite>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-ink/16 pt-[34px]">
          <button
            type="button"
            className="text-left font-stretch-[112%] text-[1.2rem] font-[850] uppercase"
            onClick={() => onSelectCase(nextId)}
          >
            <small className="mb-1 block font-stretch-[100%] text-[.8rem] font-semibold tracking-[.02em] text-ink/62 normal-case">
              następna historia
            </small>
            {CASES[nextId].name} →
          </button>
          <Button onClick={() => close({ jumpToContact: true, returnFocus: false })}>
            Chcę taki efekt u siebie
          </Button>
        </div>
      </Container>
    </div>
  );
}
