import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Works from "@/components/Works";
import {
  LOCAL_BUSINESS_JSON_LD,
  serializeJsonLd,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(LOCAL_BUSINESS_JSON_LD),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Process />
        <Results />
        <Services />
        <Testimonials />
        <Team />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
