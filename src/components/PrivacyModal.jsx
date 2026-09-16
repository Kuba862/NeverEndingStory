"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED_AT,
} from "@/data/privacy";
import Display from "./ui/Display";
import ModalShell from "./ui/ModalShell";
import { useDialog } from "./ui/useDialog";

export default function PrivacyModal({ onClose, returnFocusRef }) {
  const titleId = useId();
  const scrollContainerRef = useRef(null);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  const { dialogRef, requestClose, visible } = useDialog({
    onClosed: onClose,
    returnFocusRef,
    initialFocusRef: scrollContainerRef,
  });

  const modal = (
    <ModalShell
      ariaLabelledBy={titleId}
      dialogRef={dialogRef}
      requestClose={requestClose}
      scrollContainerRef={scrollContainerRef}
      scrollContainerProps={{
        tabIndex: 0,
        role: "region",
        "aria-labelledby": titleId,
      }}
      visible={visible}
    >
      <Display
        as="h2"
        id={titleId}
        className="mb-6 pr-12 text-[clamp(1.5rem,3.4vw,2rem)]"
      >
        Polityka prywatności
      </Display>

      <div className="space-y-8 text-[.95rem] leading-[1.7]">
        {PRIVACY_SECTIONS.map((section) => {
          const [intro, ...restParagraphs] = section.paragraphs ?? [];

          return (
            <section className="space-y-3" key={section.title}>
              <h3 className="font-stretch-[112%] text-[1rem] font-[850] uppercase text-acc-ink">
                {section.title}
              </h3>
              {intro ? <p className="text-ink/62">{intro}</p> : null}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-ink/62">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {restParagraphs.map((paragraph) => (
                <p className="text-ink/62" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          );
        })}

        <p className="border-t border-ink/16 pt-5 text-[.9rem] font-bold text-ink/62">
          Ostatnia aktualizacja: {PRIVACY_UPDATED_AT}
        </p>
      </div>
    </ModalShell>
  );

  return portalRoot ? createPortal(modal, portalRoot) : null;
}
