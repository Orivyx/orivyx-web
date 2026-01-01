import { Instagram, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  active: string;
};

export function Header({ active }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goToForms = () => {
    setOpen(false);
    navigate("/forms");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const links = [
    { id: "home", label: "início" },
    { id: "about", label: "sobre" },
    { id: "services", label: "serviços" },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className="
          flex items-center justify-between
          fixed top-5 left-1/2 -translate-x-1/2
          w-[95%] sm:w-[90%] max-w-[1200px]
          rounded-3xl px-6 py-5
          font-manrope z-50 bg-black/40 backdrop-blur-lg
        "
      >
        {/* LOGO */}
        <div className="flex flex-1 justify-start">
          <img src="logo.png" className="w-20 sm:w-28 h-auto" alt="logo" />
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden sm:flex flex-1 justify-center gap-20">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="relative px-3 text-xl font-extralight group"
              >
                <span
                  className={
                    isActive
                      ? "text-white/90 font-extralight"
                      : "text-white/70 group-hover:text-zinc-300"
                  }
                >
                  {l.label}
                </span>

                <span
                  className={`
                    absolute left-0 -bottom-1 h-0.5 bg-pink transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </button>
            );
          })}
        </nav>

        {/* AÇÕES DESKTOP */}
        <div className="hidden sm:flex flex-1 justify-end items-center gap-3 text-white">
          <a
            href="https://instagram.com/orivyxtech"
            className="text-white hover:text-zinc-400"
          >
            <Instagram className="w-7 h-auto" />
          </a>

          <button
            onClick={goToForms}
            className="flex items-center bg-white text-pink text-base px-5 py-3 rounded-3xl font-bold gap-1.5 hover:bg-zinc-300 cursor-pointer"
          >
            <span>Contato</span>
            <Phone className="w-5 h-auto" />
          </button>
        </div>

        {/* MOBILE: Instagram + Menu */}
        <div className="flex sm:hidden items-center gap-4">
          <a
            href="https://instagram.com/orivyxtech"
            className="text-white hover:text-zinc-400"
          >
            <Instagram className="w-7 h-auto" />
          </a>

          <button className="text-white" onClick={() => setOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* MENU LATERAL MOBILE */}
      <div
        className={`
          fixed top-0 right-0 h-full w-2/3
          bg-black/90 backdrop-blur-xl z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* BOTÃO FECHAR */}
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setOpen(false)}
        >
          <X size={32} />
        </button>

        {/* LINKS + CONTATO */}
        <div className="flex flex-col items-center gap-8 mt-24 px-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToSection(l.id)}
              className="text-base text-white/80 font-light hover:text-pink text-center w-full"
            >
              {l.label}
            </button>
          ))}

          {/* BOTÃO CONTATO CENTRALIZADO */}
          <button
            onClick={goToForms}
            className="
              flex justify-center items-center
              bg-white text-pink text-base
              px-5 py-3 rounded-3xl font-bold gap-2
              hover:bg-zinc-300 cursor-pointer
              w-full max-w-[230px]
              mx-auto mt-4
            "
          >
            <span>Contato</span>
            <Phone className="w-6 h-auto" />
          </button>
        </div>
      </div>
    </>
  );
}
