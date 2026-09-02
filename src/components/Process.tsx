import { PROCESS_STEPS } from "@/data/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Process() {
  return (
    <section className="py-[clamp(64px,9vw,110px)]" id="proces">
      <SectionHead eyebrow="jak pracujemy">
        Trzy kroki.{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          Zero chaosu.
        </span>
      </SectionHead>

      <Container className="mt-9 grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
        {PROCESS_STEPS.map((step, stepIndex) => (
          <Reveal
            as="article"
            key={step.title}
            className="relative rounded-media border border-ink/16 bg-white px-6 pt-[26px] pb-7"
          >
            <div className="mb-5 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((barIndex) => (
                <i
                  className={`h-1 flex-1 rounded-full ${
                    barIndex <= stepIndex ? "bg-acc" : "bg-ink/16"
                  }`}
                  key={barIndex}
                />
              ))}
            </div>
            <h3 className="mb-2.5 font-stretch-[112%] text-[1.08rem] font-[850] uppercase">
              {step.title}
            </h3>
            <p className="text-[.95rem] text-ink/62">{step.body}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
