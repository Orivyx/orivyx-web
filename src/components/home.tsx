import { ChevronRight, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <main className="mx-40">
      <section className="">
        <article className="grid grid-cols-2 grid-rows-2">
          <div className="font-bold font-onest text-6xl grid grid-rows-4 justify-end col-start-2 h-46">
            <h1 className="">Transformamos</h1>
            <h1 className="pl-28 text-pink">esforço</h1>
            <h1 className="justify-self-end">em lucro</h1>
            <div className="grid-rows-4">
              <p className="font-manrope font-extralight text-base justify-self-end pr-4 mt-1.5">
                Automatizamos processos,
                <br />
                eliminamos tarefas repetitivas e
                <br />
                entregamos eficiência máxima.
              </p>
            </div>
          </div>
          <div className="relative backdrop-blur-sm border border-pink grid grid-cols-2 grid-rows-2 row-start-1 items-start justify-start rounded-2xl w-52 h-52 pl-6 pt-6 pb-16 ml-28 mt-10">
            <h1 className="font-manrope text-6xl font-bold col-span-2">90%</h1>
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
          <div className="relative backdrop-blur-sm border border-pink-500 rounded-2xl w-52 h-52 p-6 col-start-2 justify-self-end mr-3 mt-16">
            <div className="w-full h-full flex flex-col items-end text-right">
              <h1 className="font-manrope text-6xl font-bold text-white">
                80%
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
          <div className="col-start-1 row-start-3">
            <h1 className="text-6xl font-bold text-shadow-lg/20">
              Construa o futuro
              <br />
              com a <span className="text-pink">Orivyx</span>
            </h1>
            <button className="w-64 flex bg-pink rounded-full py-7 px-12 items-center justify-center shadow-xl/20 mt-5">
              <div className="flex flex-row items-center">
                <p className="text-xl col-span-1">Explorar</p>
                <ArrowRight className="col-start-2 justify-self-start" />
              </div>
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
