import { ChevronRight, ArrowRight } from "lucide-react";
import CountUp from "react-countup";

export function HomeMobile() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        pt-32
        max-w-7xl 
        w-full 
        mx-auto 
        justify-self-center 
        overflow-x-hidden 
        px-4
      "
    >
      <div
        className="w-full max-w-[1200px] mx-auto h-auto
      "
      >
        <div className="grid grid-cols-2 grid-rows-2 w-full h-60 pr-14">
          {/* TEXTO PRINCIPAL */}
          <div className="min-w-0 font-bold font-onest text-3xl/6 grid grid-rows-3 justify-end col-start-2 h-16 row-start-1">
            <h1>Transformamos</h1>
            <h1 className="pl-24 text-pink">esforço</h1>
            <h1 className="justify-self-end">em lucro</h1>
          </div>

          {/* CARD 2 */}
          <div
            className="
              min-w-0
              relative 
              backdrop-blur-sm 
              border border-pink-500 
              rounded-3xl 
              w-[100px]
              h-[100px]
              px-2
              pt-2 
              col-start-2 
              justify-self-end 
              ml-7 
              mt-16
              row-start-2
            "
          >
            <div className="w-full h-full flex flex-col items-end text-right gap-0 ">
              <h1 className="font-manrope text-2xl font-bold text-white tracking-tighter">
                <CountUp end={90} duration={2.0} />%
              </h1>

              <p className="font-manrope text-tiny font-extralight text-white leading-tight">
                de ganho em eficiência com automação inteligente.
              </p>
            </div>

            <div className="absolute bottom-2 left-2">
              <button className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:text-zinc-400 focus:text-zinc-400">
                <ChevronRight
                  strokeWidth={3.2}
                  className="text-pink w-auto h-4 rotate-180"
                />
              </button>
            </div>
          </div>

          {/* TEXTO + BOTÃO */}
          <div className="min-w-0 col-start-1 row-start-3 pt-24">
            <h1 className="text-3xl/6 font-bold text-shadow-lg/20 tracking-tighter">
              Construa o futuro com a <span className="text-pink">Orivyx</span>
            </h1>

            <button
              onClick={() => scrollToSection("about")}
              className="
                w-28
                h-8
                flex 
                bg-pink 
                rounded-full 
                items-center 
                justify-center 
                shadow-xl/20 
                mt-2 
                group 
                transition-all 
                duration-300 
                hover:bg-pink/90
              "
            >
              <div className="flex flex-row items-center gap-1">
                <p className="text-xs">Explorar</p>
                <ArrowRight className="w-auto h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
