import { SERVICES } from "@/data/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Services() {
  return (
    <section className="py-[clamp(64px,9vw,110px)]" id="uslugi">
      <SectionHead eyebrow="zakres działań">
        Wszystko w jednym{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          miejscu.
        </span>
      </SectionHead>

      <Container className="mt-[34px] grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {SERVICES.map((service) => (
          <Reveal
            as="article"
            key={service.title}
            className="flex flex-col gap-2 rounded-media border border-ink/16 bg-white p-[22px] transition-colors duration-[180ms] hover:border-acc"
          >
            <h3 className="font-stretch-[112%] text-[.98rem] font-extrabold uppercase">
              {service.title}
            </h3>
            <p className="text-[.9rem] text-ink/62">{service.body}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
