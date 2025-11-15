export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="pt-72">
      <div className="bg-black/50 px-[533px] grid grid-cols-2 h-[177px] items-center">
        <div className="font-extralight items-start flex flex-col">
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
        <div className="flex flex-col items-center gap-2">
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

          <div className="font-extralight">
            <p>lsanchez@orivyx.com</p>
            <p>gmarques@orivyx.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
