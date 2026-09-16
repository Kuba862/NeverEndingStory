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
      const rect = node.getBoundingClientRect();

      // Treść widoczna już przy wejściu na stronę zostaje odsłonięta od razu.
      // Ukrywanie jej po pierwszym malowaniu unieważniało LCP (element był
      // liczony ponownie dopiero po 600 ms animacji) i dawało efekt mignięcia.
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return;
      }

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
