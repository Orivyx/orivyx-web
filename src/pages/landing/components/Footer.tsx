import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* FOOTER MOBILE */}
      <footer className="pt-8 pb-6 w-full px-4 flex sm:hidden flex-col items-center">
        <div className="bg-black/50 backdrop-blur-lg w-full rounded-2xl p-6 text-center">
          <button
            onClick={() => navigate("/forms")}
            className="inline-block bg-white text-pink text-sm px-6 py-3 rounded-full font-bold hover:bg-zinc-300"
          >
            Fale Conosco
          </button>

          <div className="font-extralight text-sm mt-4 text-white/70">
            <p>lsanchez@orivyx.com</p>
            <p>gmarques@orivyx.com</p>
          </div>

          <div className="flex justify-center gap-4 mt-4 text-sm font-extralight">
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-zinc-300"
            >
              privacidade
            </button>
          </div>

          <p className="text-white/50 text-xs mt-3">© 2026 Orivyx</p>
        </div>
      </footer>

      {/* FOOTER DESKTOP */}
      <footer
        id="footer"
        className="pt-36 w-full justify-center overflow-x-hidden hidden sm:flex"
      >
        <div className="bg-black/50 w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 h-[177px] items-center gap-10 md:gap-0 rounded-t-2xl">
          {/* LINKS */}
          <div className="font-extralight flex gap-1.5 text-left flex-col">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-zinc-300"
            >
              início
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-zinc-300"
            >
              sobre
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-zinc-300"
            >
              serviços
            </button>

            <button
              onClick={() => navigate("/forms")}
              className="hover:text-zinc-300"
            >
              contato
            </button>

            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-zinc-300"
            >
              privacidade
            </button>
          </div>

          {/* BOTÃO + EMAILS */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => navigate("/forms")}
              className="bg-white text-pink text-base px-6 py-3 rounded-3xl font-bold hover:bg-zinc-300 cursor-pointer"
            >
              Consulte
            </button>

            <div className="font-extralight text-center">
              <p>lsanchez@orivyx.com</p>
              <p>gmarques@orivyx.com</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
