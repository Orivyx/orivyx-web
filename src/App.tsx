import { Header } from "./components/header";
import { Home } from "./components/home";

export function App() {
  return (
    <div className="text-white bg-[url(/image.png)] w-screen bg-cover bg-top max-w-[1440px]">
      <Header />
      <Home />
    </div>
  );
}
