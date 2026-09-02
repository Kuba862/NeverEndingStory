"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Component = "div",
  children,
  className = "",
}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(true);
  const setNode = (node) => {
    ref.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    let observer = null;

    const frame = window.requestAnimationFrame(() => {
      setVisible(false);
      setArmed(true);

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      observer.observe(node);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const stateClasses =
    armed && !visible ? "translate-y-[18px] opacity-0" : "translate-y-0 opacity-100";

  return (
    <Component
      ref={setNode}
      className={`transition-[opacity,transform] duration-[600ms] ease-out ${stateClasses} ${className}`}
    >
      {children}
    </Component>
  );
}
