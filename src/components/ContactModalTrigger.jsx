"use client";

import { useRef, useState } from "react";
import ContactModal from "./ContactModal";
import Button from "./ui/Button";

function isHiddenForFocus(element) {
  if (!element.isConnected) {
    return true;
  }

  let current = element;

  while (current) {
    const style = window.getComputedStyle(current);

    if (style.display === "none" || style.visibility === "hidden") {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}

export default function ContactModalTrigger({
  children,
  fallbackFocusRef,
  onClick,
  ...buttonProps
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleClick = (event) => {
    triggerRef.current = event.currentTarget;
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (
      fallbackFocusRef?.current &&
      (!triggerRef.current || isHiddenForFocus(triggerRef.current))
    ) {
      triggerRef.current = fallbackFocusRef.current;
    }

    setOpen(false);
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleClick}>
        {children}
      </Button>
      {open ? (
        <ContactModal
          onClose={handleClose}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </>
  );
}
