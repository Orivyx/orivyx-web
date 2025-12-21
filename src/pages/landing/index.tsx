import { SpeedInsights } from "@vercel/speed-insights/react";

import { Header } from "../../components/header";
import { Contact } from "../../components/contact";
import { Footer } from "../../components/footer";
import { useSectionObserver } from "../../hooks/useSectionObserver";

import { useIsMobile } from "../../hooks/useIsMobile";
import { HomeDesktop } from "./home/homeDesktop";
import { HomeMobile } from "./home/homeMobile";
import { AboutDesktop } from "./about/aboutDesktop";
import { AboutMobile } from "./about/aboutMobile";
import { ServicesDesktop } from "./services/servicesDesktop";
import { ServicesMobile } from "./services/servicesMobile";

export function Landing() {
  const activeSection = useSectionObserver([
    "home",
    "about",
    "services",
    "footer",
  ]);

  const isMobile = useIsMobile();

  return (
    <main
      className="
        text-white 
        bg-no-repeat bg-top overflow-x-hidden

        bg-[url('/bg-mobile.png')]
        bg-cover

        md:bg-[url('/bg.png')]
        md:bg-cover

        2xl:bg-[url('/test.png')]
        bg-1920
      "
    >
      <Header active={activeSection} />

      <article>
        {isMobile ? <HomeMobile /> : <HomeDesktop />}
        {isMobile ? <AboutMobile /> : <AboutDesktop />}
        {isMobile ? <ServicesMobile /> : <ServicesDesktop />}

        <Contact />
        <Footer />
        <SpeedInsights />
      </article>
    </main>
  );
}
