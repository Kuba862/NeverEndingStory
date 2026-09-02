import { TESTIMONIALS } from "@/data/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Testimonials() {
  return (
    <section className="pb-[clamp(64px,9vw,110px)]" id="opinie">
      <SectionHead eyebrow="opinie klientów">
        Tak mówią o nas{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          w Google.
        </span>
      </SectionHead>

      <Container className="mt-[34px] grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
        {TESTIMONIALS.map((testimonial) => (
          <Reveal
            as="article"
            key={testimonial.quote}
            className="rounded-media border border-ink/16 bg-white p-[26px]"
          >
            <div
              className="mb-3.5 text-base tracking-[3px] text-acc"
              aria-label="5 gwiazdek"
            >
              ★★★★★
            </div>
            <blockquote className="font-serif text-[1.04rem] leading-[1.6] italic">
              {testimonial.quote}
            </blockquote>
            <cite className="mt-4 block text-[.8rem] font-bold tracking-[.1em] text-ink/42 not-italic uppercase">
              {testimonial.cite}
            </cite>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
