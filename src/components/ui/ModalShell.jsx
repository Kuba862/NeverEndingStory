"use client";

import { useRef } from "react";

export default function ModalShell({
  ariaLabel,
  ariaLabelledBy,
  children,
  dialogRef,
  requestClose,
  scrollContainerProps = {},
  scrollContainerRef,
  visible,
}) {
  const backdropPointerDownTargetRef = useRef(null);
  const backdropPointerUpTargetRef = useRef(null);

  const handleBackdropPointerDown = (event) => {
    backdropPointerDownTargetRef.current = event.target;
    backdropPointerUpTargetRef.current = null;
  };

  const handleBackdropPointerUp = (event) => {
    backdropPointerUpTargetRef.current = event.target;
  };

  const handleBackdropPointerCancel = () => {
    backdropPointerDownTargetRef.current = null;
    backdropPointerUpTargetRef.current = null;
  };

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget &&
      backdropPointerDownTargetRef.current === event.currentTarget &&
      backdropPointerUpTargetRef.current === event.currentTarget
    ) {
      requestClose();
    }

    backdropPointerDownTargetRef.current = null;
    backdropPointerUpTargetRef.current = null;
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-ink/70 px-(--pad) py-4 backdrop-blur-[6px] transition-[opacity,visibility] duration-[280ms] ease-[cubic-bezier(.2,.7,.2,1)]",
        visible ? "visible opacity-100" : "invisible opacity-0",
      ].join(" ")}
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
      onPointerCancel={handleBackdropPointerCancel}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={[
          "relative flex max-h-[calc(100dvh-2rem)] w-full max-w-[640px] flex-col overflow-hidden rounded-media bg-paper text-ink shadow-2xl transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(.2,.7,.2,1)]",
          visible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Zamknij"
          onClick={() => requestClose()}
          className="absolute top-[18px] right-[18px] z-[2] grid size-10 cursor-pointer place-items-center rounded-full border-[1.5px] border-ink/16 bg-white text-ink transition-[transform,background-color,border-color,color] duration-[220ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:rotate-90 hover:border-ink hover:bg-ink hover:text-paper focus-visible:rotate-90"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
        </button>

        <div
          {...scrollContainerProps}
          ref={scrollContainerRef}
          className={[
            "overflow-y-auto p-[clamp(20px,3.2vw,28px)]",
            scrollContainerProps.className,
          ].filter(Boolean).join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
