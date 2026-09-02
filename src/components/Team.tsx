import { TEAM } from "@/data/site";
import Frame from "./ui/Frame";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Team() {
  return (
    <section className="pb-[clamp(64px,9vw,110px)]" id="zespol">
      <SectionHead eyebrow="poznaj nas">
        Ekipa, którą zobaczysz{" "}
        <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
          u siebie.
        </span>
      </SectionHead>

      <Container className="mt-[34px] grid grid-cols-6 gap-3.5 max-[1050px]:grid-cols-3 max-[560px]:grid-cols-2">
        {TEAM.map((person) => (
          <Reveal key={person.name}>
            <Frame
              src={person.image}
              alt={person.alt}
              aspect="3/4"
              sizes="(max-width: 560px) 45vw, (max-width: 1050px) 30vw, 180px"
            />
            <h3 className="mt-3 font-stretch-[112%] text-[.92rem] font-extrabold uppercase">
              {person.name}
            </h3>
            <p className="text-[.8rem] text-ink/62">{person.role}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
