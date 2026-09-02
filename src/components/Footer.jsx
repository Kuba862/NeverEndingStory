import Container from "./ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-paper/14 bg-ink text-paper/55">
      <Container className="flex flex-wrap justify-between gap-4 py-[22px] text-[.82rem]">
        <span>© never ending story · Kraków</span>
        <span>agencja social media · foto & wideo · branding</span>
      </Container>
    </footer>
  );
}
