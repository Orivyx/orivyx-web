export function Services() {
  return (
    <section id="services" className="mx-40 pt-28 flex flex-col">
      <div className="">
        <h1 className="justify-self-end font-bold text-6xl/12 tracking-tighter text-shadow-lg/20">
          Nossos
          <br />
          <span className="text-pink">serviços</span>
        </h1>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-5 p-8 text-right">
        <div className="transition-transform duration-300 hover:scale-105 col-span-2 row-start-1 row-end-2 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white h-[179px]">
          <h1 className="text-2xl/12 tracking-tighter">
            Automação de Processos (RPA)
          </h1>
          <p className="text-base font-manrope font-extralight">
            Desenvolvemos bots personalizados
            <br />
            que executam tarefas repetitivas com precisão e velocidade.
          </p>
        </div>
        <div className="transition-transform duration-300 hover:scale-105 col-start-3 row-start-1 row-end-2 rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 pr-4 text-white h-[179px] w-[200px]">
          <h1 className="text-2xl/6 tracking-tighter">
            RPA Local e<br />
            em Nuvem
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Automatizamos servidores locais e cloud com segurança.
          </p>
        </div>
        <div className="transition-transform duration-300 hover:scale-105 col-start-4 row-span-2 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Criação de Sites e Landing Pages
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Sites modernos, rápidos e responsivos, projetados para gerar
            resultado e presença digital.
          </p>
        </div>
        <div className="transition-transform duration-300 hover:scale-105 col-start-5 row-span-2 rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 pr-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Integração de Sistemas
          </h1>
          <p className="text-/5 font-manrope font-extralight pt-2">
            Conectamos ERPs, CRMs, planilhas e APIs para eliminar retrabalho
            <br />e centralizar informações.
          </p>
        </div>
        <div className="transition-transform duration-300 hover:scale-105 row-start-2 col-span-3 rounded-2xl bg-white border border-pink backdrop-blur-lg py-6 px-4 text-pink h-36">
          <h1 className="text-2xl tracking-tighter">
            Suporte Técnico Contínuo
          </h1>
          <p className="text-base/5 font-manrope font-extralight">
            Monitoramento, manutenção e atualizações
            <br />
            constantes para manter tudo rodando sem
            <br />
            interrupções.
          </p>
        </div>
      </div>
    </section>
  );
}
