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
    <main className="text-white bg-[url(/bg.png)] w-screen bg-cover bg-top max-w-screen">
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
