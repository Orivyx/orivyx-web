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
        bg-no-repeat overflow-x-hidden

        bg-[url('/bg-mobile.png')]
        bg-[length:100%_auto]
        bg-[center_top_-80px]

        sm:bg-[url('/bg.png')]
        sm:bg-cover
        sm:bg-top

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
