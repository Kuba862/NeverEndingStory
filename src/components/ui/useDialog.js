"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

export function useDialog({
  onClosed,
  returnFocusRef,
  initialFocusRef,
}) {
  const closingRef = useRef(false);
  const dialogRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const finishClose = useCallback(
    (returnFocus) => {
      onClosed();

      if (returnFocus) {
        returnFocusRef?.current?.focus();
      }
    },
    [onClosed, returnFocusRef],
  );

  const requestClose = useCallback(
    ({ returnFocus = true } = {}) => {
      if (closingRef.current) {
        return;
      }

      closingRef.current = true;
      setVisible(false);

      window.setTimeout(
        () => finishClose(returnFocus),
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

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    initialFocusRef?.current?.focus();
  }, [initialFocusRef, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll(focusableSelector),
      ).filter((element) => !element.matches(":disabled"));

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
      } else if (active && !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [requestClose, visible]);

  return { dialogRef, requestClose, visible };
}
