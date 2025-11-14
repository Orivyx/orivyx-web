import { Instagram, Phone } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between fixed w-[1300px] rounded-3xl px-10 py-5 mt-5 font-manrope m-20 z-50 bg-black/40 backdrop-blur-lg">
      <div className="justify-center w-32 h-auto">
        <img src="logo.png" alt="logo" className="" />
      </div>
      <nav className="flex justify-center gap-40">
        <button className="text-zinc-400 font-extralight text-xl hover:text-white focus:text-white">
          início
        </button>
        <button className="text-zinc-400 font-extralight text-xl hover:text-white focus:text-white">
          sobre
        </button>
        <button className="text-zinc-400 font-extralight text-xl hover:text-white focus:text-white">
          serviços
        </button>
      </nav>
      <div className="flex flex-row justify-center items-center text-white gap-4">
        <button className="text-white hover:text-zinc-400 focus:text-zinc-400">
          <Instagram className="w-9 h-auto" />
        </button>
        <div className="flex flex-row bg-white text-pink text-base px-6 py-3 rounded-3xl font-bold gap-1.5 hover:bg-zinc-300">
          <button className="">Contato</button>
          <Phone className="" />
        </div>
      </div>
    </header>
  );
}
