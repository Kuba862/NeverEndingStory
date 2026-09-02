"use client";

import { useRef, useState } from "react";
import type { CaseCategory, CaseId } from "@/data/cases";
import { CARDS } from "@/data/cards";
import CaseOverlay from "./CaseOverlay";
import Container from "./ui/Container";
import Frame from "./ui/Frame";
import SectionHead from "./ui/SectionHead";

type Filter = CaseCategory | "all";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "Wszystkie", value: "all" },
  { label: "Gastronomia", value: "gastro" },
  { label: "Hotele i noclegi", value: "hotel" },
  { label: "Beauty & wellness", value: "beauty" },
  { label: "Branding", value: "brand" },
];

export default function Works() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCase, setSelectedCase] = useState<CaseId | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const visibleCards = CARDS.filter((card) => filter === "all" || card.cat === filter);

  return (
    <section className="pt-[clamp(56px,8vw,100px)] pb-5" id="realizacje">
      <SectionHead
        eyebrow="wybrane realizacje"
        lead="Wybierz branżę i zobacz, jak wygląda nasza praca od środka — feedy, reelsy, kampanie i identyfikacje."
      >
        Każda marka to inna{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          historia.
        </span>
      </SectionHead>

      <Container
        className="mt-[26px] mb-[30px] flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filtruj realizacje"
      >
        {FILTERS.map((item) => {
          const active = item.value === filter;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={[
                "rounded-full border-[1.5px] px-[18px] py-[9px] text-[.88rem] font-[650] transition-all duration-[160ms]",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/16 bg-white text-ink/62 hover:border-ink hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </Container>

      <Container className="grid grid-cols-4 gap-[18px] max-[1050px]:grid-cols-3 max-[760px]:grid-cols-2 max-[460px]:grid-cols-1">
        {visibleCards.map((card, index) => (
          <button
            key={`${card.id}-${card.cat}-${index}`}
            type="button"
            aria-label={`Otwórz case study: ${card.name}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedCase(card.id);
            }}
            className="group relative block w-full overflow-hidden rounded-media text-left"
          >
            <Frame
              src={card.img}
              alt={card.name}
              aspect="4/5"
              sizes="(max-width: 460px) calc(100vw - 40px), (max-width: 760px) 45vw, (max-width: 1050px) 30vw, 285px"
              imageClassName="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.045]"
            />
            <span className="absolute top-[34px] right-3 z-[3] translate-y-[-6px] rounded-full bg-acc px-[13px] py-[7px] text-[.76rem] font-[750] text-white opacity-0 transition-all duration-[220ms] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Case study →
            </span>
            <span className="absolute right-0 bottom-0 left-0 z-[2] bg-gradient-to-t from-[rgba(20,10,6,.78)] to-[rgba(20,10,6,0)] px-4 pt-11 pb-4 text-white">
              <span className="block text-[.72rem] font-bold tracking-[.12em] uppercase opacity-85">
                {card.catLabel}
              </span>
              <span className="mt-1 block font-stretch-[112%] text-[1.06rem] font-[850] leading-[1.1] uppercase">
                {card.name}
              </span>
            </span>
          </button>
        ))}
      </Container>

      {selectedCase ? (
        <CaseOverlay
          caseId={selectedCase}
          onClose={() => setSelectedCase(null)}
          onSelectCase={setSelectedCase}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </section>
  );
}
