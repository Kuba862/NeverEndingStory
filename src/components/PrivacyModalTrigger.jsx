"use client";

import { useRef, useState } from "react";
import PrivacyModal from "./PrivacyModal";

export default function PrivacyModalTrigger({
  children,
  className = "",
  onClick,
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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>
      {open ? (
        <PrivacyModal
          onClose={() => setOpen(false)}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </>
  );
}
