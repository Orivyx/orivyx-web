export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
            onClick={() => scrollToSection("footer")}
            className="hover:text-zinc-300"
          >
            contato
          </button>
        </div>

        {/* BOTÃO + EMAILS */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="https://wa.me/5511920926916"
            className="flex flex-row justify-center items-center text-white gap-4"
          >
            <div
              onClick={() => scrollToSection("footer")}
              className="bg-white text-pink text-base px-6 py-3 rounded-3xl font-bold gap-1.5 hover:bg-zinc-300 cursor-pointer"
            >
              <button>Consulte</button>
            </div>
          </a>

          <div className="font-extralight text-center">
            <p>lsanchez@orivyx.com</p>
            <p>gmarques@orivyx.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
