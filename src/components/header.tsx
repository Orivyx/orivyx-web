import { Instagram, Phone } from "lucide-react";

type HeaderProps = {
  active: string;
};

export function Header({ active }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { id: "home", label: "início" },
    { id: "about", label: "sobre" },
    { id: "services", label: "serviços" },
  ];

  return (
    <header
      className="
      flex items-center justify-between fixed w-full 
      max-w-[1200px]     /* reduzido para caber no Mac sem estourar */
      mx-auto left-1/2 -translate-x-1/2
      rounded-3xl px-8 py-5 mt-5
      font-manrope z-50 bg-black/40 backdrop-blur-lg
      overflow-hidden     /* blindagem anti-scroll */
    "
    >
      <div className="justify-center w-28 h-auto">
        <img src="logo.png" alt="logo" />
      </div>

      <nav className="flex justify-center gap-20">
        {" "}
        {/* gap menor */}
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

      <div className="flex flex-row justify-center items-center text-white gap-3">
        <a
          href="https://instagram.com/orivyxtech"
          className="text-white hover:text-zinc-400"
        >
          <Instagram className="w-7 h-auto" /> {/* menor para não empurrar */}
        </a>

        <a
          href="https://wa.me/5511920926916"
          className="flex flex-row bg-white text-pink text-base px-5 py-3 rounded-3xl font-bold gap-1.5 hover:bg-zinc-300 cursor-pointer"
        >
          <span>Contato</span>
          <Phone className="w-5 h-auto" />
        </a>
      </div>
    </header>
  );
}
