import { HERO_TRUST } from "@/data/site";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Display from "./ui/Display";
import Eyebrow from "./ui/Eyebrow";
import Frame from "./ui/Frame";

export default function Hero() {
  return (
    <header id="top">
      <Container className="grid grid-cols-[1.05fr_.95fr] items-center gap-[clamp(28px,4vw,56px)] py-[clamp(44px,7vw,84px)] pb-[clamp(36px,5vw,64px)] max-[900px]:grid-cols-1">
        <div>
          <Eyebrow>agencja social media · Kraków</Eyebrow>
          <Display
            as="h1"
            className="mt-[18px] mb-5 text-[clamp(2.7rem,6.4vw,5rem)]"
          >
            Zmieniamy relacje{" "}
            <span className="inline-block font-serif text-[.94em] font-medium tracking-normal text-acc normal-case italic">
              w Relacje.
            </span>
          </Display>
          <p className="mb-7 max-w-[46ch] text-[clamp(1rem,1.5vw,1.15rem)] text-ink/62">
            Reelsy, które przyprowadzają nowych gości. Relacje, które
            zatrzymują obecnych. Kompleksowo prowadzimy social media dla
            gastronomii, hoteli i beauty.
          </p>
          <div className="mb-[30px] flex flex-wrap gap-3.5">
            <Button href="#kontakt">Umów niezobowiązujące spotkanie</Button>
            <Button href="#realizacje" variant="ghost">
              Zobacz realizacje
            </Button>
          </div>
          <div className="flex flex-wrap gap-[26px] text-[.85rem] font-semibold text-ink/62">
            {HERO_TRUST.map((item) => (
              <span key={item.value}>
                <b className="font-extrabold text-ink">{item.value}</b>{" "}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <Frame
          src="/images/hero-zespol.jpg"
          alt="Zespół agencji never ending story"
          aspect="4/4.6"
          priority
          sizes="(max-width: 900px) calc(100vw - 40px), 540px"
          chip="nasza ekipa · zawsze u Was na planie"
          className="max-[900px]:order-first max-[900px]:aspect-[4/4.2]"
        />
      </Container>
    </header>
  );
}
