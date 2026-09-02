"use client";

import { useEffect, useRef, useState } from "react";
import { KPIS, type HomeKpi } from "@/data/site";
import Container from "./ui/Container";
import SectionHead from "./ui/SectionHead";

function formatKpi(value: number, kpi: HomeKpi) {
  const prefix = kpi.prefix ?? "";
  const suffix = kpi.suffix ?? "";

  if (kpi.decimal) {
    return `${prefix}${kpi.decimal}${String(value).padStart(2, "0")}${suffix}`;
  }

  return `${prefix}${value.toLocaleString("pl-PL")}${suffix}`;
}

function Counter({ kpi }: { kpi: HomeKpi }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const finalValue = kpi.staticValue ?? formatKpi(kpi.count, kpi);
  const [displayValue, setDisplayValue] = useState(
    kpi.staticValue ? finalValue : formatKpi(0, kpi),
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const showFinal = () => setDisplayValue(finalValue);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (kpi.staticValue || reduceMotion || !("IntersectionObserver" in window)) {
      showFinal();
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer.unobserve(entry.target);
          const start = performance.now();
          const duration = 1300;

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(formatKpi(Math.round(kpi.count * eased), kpi));

            if (progress < 1) {
              frame = requestAnimationFrame(tick);
            } else {
              showFinal();
            }
          };

          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [finalValue, kpi]);

  return (
    <div
      ref={ref}
      className="text-[clamp(2rem,3.6vw,2.9rem)] font-[850] leading-none text-white font-stretch-[118%]"
    >
      <span>{displayValue}</span>
    </div>
  );
}

export default function Results() {
  return (
    <section
      className="bg-wine py-[clamp(64px,9vw,110px)] text-paper"
      id="wyniki"
    >
      <SectionHead eyebrow="konkrety, nie obietnice" dark>
        Liczby z prawdziwych{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          kampanii.
        </span>
      </SectionHead>

      <Container className="mt-10 grid grid-cols-4 gap-0 border-l border-paper/18 max-[1000px]:grid-cols-2 max-[1000px]:border-l-0 max-[560px]:grid-cols-1">
        {KPIS.map((kpi) => (
          <div
            key={`${kpi.source}-${kpi.label}`}
            className="border-r border-paper/18 px-[26px] py-2 max-[1000px]:mb-[26px] max-[1000px]:border-r-0 max-[1000px]:border-l max-[1000px]:border-paper/18"
          >
            <Counter kpi={kpi} />
            <div className="mt-2.5 text-[.9rem] text-paper/78">{kpi.label}</div>
            <div className="mt-1.5 text-[.76rem] font-bold tracking-[.08em] text-acc uppercase">
              {kpi.source}
            </div>
          </div>
        ))}
      </Container>

      <Container className="mt-[34px]">
        <p className="text-[.8rem] text-paper/55">
          Wyniki pochodzą z pojedynczych, wskazanych kampanii i zależą m.in. od
          budżetu reklamowego oraz specyfiki marki.
        </p>
      </Container>
    </section>
  );
}
