import { CONTACT } from "@/data/site";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Display from "./ui/Display";
import Eyebrow from "./ui/Eyebrow";
import Frame from "./ui/Frame";
import Reveal from "./ui/Reveal";

export default function ContactCta() {
  return (
    <section className="bg-ink text-paper" id="kontakt">
      <Container className="grid grid-cols-[1.1fr_.9fr] items-center gap-[clamp(28px,5vw,64px)] py-[clamp(60px,8vw,100px)] max-[900px]:grid-cols-1">
        <Reveal>
          <Eyebrow className="text-paper/60">zacznijmy</Eyebrow>
          <Display
            as="h2"
            className="mt-3.5 mb-[18px] text-[clamp(2rem,4.6vw,3.4rem)]"
          >
            Opowiedz nam swoją{" "}
            <span className="font-serif font-medium tracking-normal text-acc normal-case italic">
              historię.
            </span>
          </Display>
          <p className="mb-7 max-w-[44ch] text-paper/72">
            Spotkajmy się na niezobowiązującą rozmowę — pokażemy, jak Twoja
            marka może wyglądać w social mediach i co realnie możemy dla niej
            zrobić.
          </p>
          <Button href={`mailto:${CONTACT.email}`}>
            Umów niezobowiązujące spotkanie
          </Button>
          <div className="mt-[26px] flex flex-col gap-2 text-base">
            <a
              className="w-max border-b-[1.5px] border-acc pb-0.5 font-bold"
              href={`mailto:${CONTACT.email}`}
            >
              {CONTACT.email}
            </a>
            <a
              className="w-max border-b-[1.5px] border-acc pb-0.5 font-bold"
              href={`tel:${CONTACT.phoneHref}`}
            >
              {CONTACT.phoneLabel}
            </a>
          </div>
        </Reveal>

        <Reveal className="w-full max-w-[420px] justify-self-end max-[900px]:justify-self-start">
          <Frame
            src="/images/cta-zespol.jpg"
            alt="Zespół never ending story"
            aspect="4/4.8"
            sizes="(max-width: 900px) calc(100vw - 40px), 420px"
            chip="do zobaczenia!"
            className="w-full"
          />
        </Reveal>
      </Container>
    </section>
  );
}
