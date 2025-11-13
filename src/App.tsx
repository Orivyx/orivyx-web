import { Header } from "./components/header";
import { Home } from "./components/home";
import { About } from "./components/about";

export function App() {
  return (
    <main className="text-white bg-[url(/bg.png)] w-screen bg-cover bg-top max-w-[1440px]">
      <Header />
      <article>
        <Home />
        <About />
      </article>
    </main>
  );
}
