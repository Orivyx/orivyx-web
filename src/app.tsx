import { Header } from "./components/header";
import { Home } from "./components/pages/home";
import { About } from "./components/pages/about";
import { Services } from "./components/pages/services";
import { Contact } from "./components/pages/contact";
import { Footer } from "./components/footer";
import { useSectionObserver } from "./hooks/useSectionObserver";

export function App() {
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

        bg-[url('/bg.png')]        /* default (mobile e telas menores) */
        bg-contain                 

        md:bg-[url('/bg.png')]   /* usa o bg grande */
        md:bg-cover              /* mas não estoura */

        2xl:bg-[url('/test.png')]
        bg-1920                    /* só em 1920px pra cima vira cover */
      "
    >
      <Header active={activeSection} />
      <article>
        <Home />
        <About />
        <Services />
        <Contact />
        <Footer />
      </article>
    </main>
  );
}
