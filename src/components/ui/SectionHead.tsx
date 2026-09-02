import type { ReactNode } from "react";
import Container from "./Container";
import Display from "./Display";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type SectionHeadProps = {
  eyebrow: string;
  children: ReactNode;
  lead?: string;
  dark?: boolean;
};

export default function SectionHead({
  eyebrow,
  children,
  lead,
  dark = false,
}: SectionHeadProps) {
  return (
    <Reveal>
      <Container>
        <Eyebrow className={dark ? "text-paper/70" : ""}>{eyebrow}</Eyebrow>
        <Display as="h2" className="mt-[.55rem] mb-[.4rem] text-[clamp(1.9rem,4.2vw,3rem)]">
          {children}
        </Display>
        {lead ? (
          <p className={`max-w-[56ch] text-[1.02rem] ${dark ? "text-paper/78" : "text-ink/62"}`}>
            {lead}
          </p>
        ) : null}
      </Container>
    </Reveal>
  );
}
