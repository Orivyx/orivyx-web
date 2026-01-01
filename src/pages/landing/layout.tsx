import { ReactNode } from "react";
import { Header, Contact, Footer } from "./components";
import { useSectionObserver } from "./hooks";

type LandingLayoutProps = {
  children: ReactNode;
};

export function LandingLayout({ children }: LandingLayoutProps) {
  const activeSection = useSectionObserver([
    "home",
    "about",
    "services",
    "footer",
  ]);

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
        {children}
        <Contact />
        <Footer />
      </article>
    </main>
  );
}
