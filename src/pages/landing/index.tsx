import { SpeedInsights } from "@vercel/speed-insights/react";

import { useIsMobile } from "./hooks";
import { LandingLayout } from "./layout";
import { HomeDesktop } from "./home/homeDesktop";
import { HomeMobile } from "./home/homeMobile";
import { AboutDesktop } from "./about/aboutDesktop";
import { AboutMobile } from "./about/aboutMobile";
import { ServicesDesktop } from "./services/servicesDesktop";
import { ServicesMobile } from "./services/servicesMobile";
import { Testimonials } from "./components/Testimonials";

export function Landing() {
  const isMobile = useIsMobile();

  return (
    <LandingLayout>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
      {isMobile ? <AboutMobile /> : <AboutDesktop />}
      {isMobile ? <ServicesMobile /> : <ServicesDesktop />}
      <Testimonials />
      <SpeedInsights />
    </LandingLayout>
  );
}
