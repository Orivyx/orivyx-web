import { Header } from "./components/header";
import { Home } from "./components/home";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export function App() {
  return (
    <main className="text-white bg-[url(/bg.png)] w-screen bg-cover bg-top max-w-[1440px]">
      <Header />
      <article className="">
        <Home />
        <About />
        <Services />
        <Contact />
        <Footer />
      </article>
    </main>
  );
}
