import { ChevronRight, ArrowRight } from "lucide-react";
import CountUp from "react-countup";

export function HomeDesktop() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        pt-48
        max-w-7xl 
        w-full 
        mx-auto 
        justify-self-center 
        overflow-x-hidden 
        px-4
      "
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 grid-rows-2 w-full min-w-0">
          {/* TEXTO PRINCIPAL */}
          <div className="min-w-0 font-bold font-onest text-6xl grid grid-rows-4 justify-end col-start-2 h-46">
            <h1>Transformamos</h1>
            <h1 className="pl-24 text-pink">esforço</h1>
            <h1 className="justify-self-end">em lucro</h1>

            <p className="font-manrope font-extralight text-base justify-self-end pr-4 mt-1.5">
              Automatizamos processos,
              <br />
              eliminamos tarefas repetitivas e
              <br />
              entregamos eficiência máxima.
            </p>
          </div>

          {/* CARD 1 */}
          <div
            className="
              min-w-0
              relative 
              backdrop-blur-sm 
              border border-pink 
              grid grid-cols-2 grid-rows-2 
              row-start-1 
              items-start 
              justify-start 
              rounded-2xl 
              w-52 
              h-52 
              pl-6 
              pt-6 
              pb-16 
              ml-20 
              mt-10
            "
          >
            <h1 className="font-manrope text-6xl font-bold col-span-2 tracking-tighter">
              <CountUp end={90} duration={2.0} />%
            </h1>

            <p className="font-manrope text-base font-extralight col-span-2">
              de ganho em eficiência
              <br />
              com automação
              <br />
              inteligente.
            </p>

            <div className="absolute bottom-3 right-4">
              <button className="bg-white rounded-full w-16 h-16 flex items-center justify-center hover:text-zinc-400 focus:text-zinc-400">
                <ChevronRight
                  strokeWidth={3.2}
                  className="text-pink w-auto h-11 justify-self-center"
                />
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            className="
              min-w-0
              relative 
              backdrop-blur-sm 
              border border-pink-500 
              rounded-2xl 
              w-52 
              h-52 
              p-6 
              col-start-2 
              justify-self-end 
              mr-3 
              mt-16
            "
          >
            <div className="w-full h-full flex flex-col items-end text-right">
              <h1 className="font-manrope text-6xl font-bold text-white tracking-tighter">
                <CountUp end={80} duration={2.0} />%
              </h1>

              <p className="font-manrope text-base font-extralight text-white leading-tight">
                de redução de custos
                <br />
                operacionais.
              </p>
            </div>

            <div className="absolute bottom-4 left-4">
              <button className="bg-white rounded-full w-16 h-16 flex items-center justify-center hover:text-zinc-400 focus:text-zinc-400">
                <ChevronRight
                  strokeWidth={3.2}
                  className="text-pink w-auto h-11 rotate-180"
                />
              </button>
            </div>
          </div>

          {/* TEXTO + BOTÃO */}
          <div className="min-w-0 col-start-1 row-start-2 row-end-3 pt-24">
            <h1 className="text-6xl/12 font-bold text-shadow-lg/20 tracking-tighter">
              Construa o futuro
              <br />
              com a <span className="text-pink">Orivyx</span>
            </h1>

            <button
              onClick={() => scrollToSection("about")}
              className="
                w-64 
                flex 
                bg-pink 
                rounded-full 
                py-7 px-12 
                items-center 
                justify-center 
                shadow-xl/20 
                mt-5 
                group 
                transition-all 
                duration-300 
                hover:bg-pink/90
              "
            >
              <div className="flex flex-row items-center gap-2">
                <p className="text-xl">Explorar</p>
                <ArrowRight className="transform transition-all duration-300 group-hover:translate-x-2" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
