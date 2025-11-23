import { Header } from "./components/header";
import { Contact } from "./components/pages/contact";
import { Footer } from "./components/footer";
import { useSectionObserver } from "./hooks/useSectionObserver";

import { useIsMobile } from "./hooks/useIsMobile";
import { HomeDesktop } from "./components/pages/home/homeDesktop";
import { HomeMobile } from "./components/pages/home/homeMobile";
import { AboutDesktop } from "./components/pages/about/aboutDesktop";
import { AboutMobile } from "./components/pages/about/aboutMobile";
import { ServicesDesktop } from "./components/pages/services/servicesDesktop";
import { ServicesMobile } from "./components/pages/services/servicesMobile";

export function App() {
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

        bg-[url('/bg-mobile.png')]        /* default (mobile e telas menores) */
        bg-cover                 

        md:bg-[url('/bg.png')]   /* usa o bg grande */
        md:bg-cover              /* mas não estoura */

        2xl:bg-[url('/test.png')]
        bg-1920                    /* só em 1920px pra cima vira cover */
      "
    >
      <Header active={activeSection} />
      <article>
        {isMobile ? <HomeMobile /> : <HomeDesktop />}
        {isMobile ? <AboutMobile /> : <AboutDesktop />}
        {isMobile ? <ServicesMobile /> : <ServicesDesktop />}
        <Contact />
        <Footer />
      </article>
    </main>
  );
}
