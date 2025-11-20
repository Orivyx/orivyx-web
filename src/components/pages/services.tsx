export function Services() {
  return (
    <section
      id="services"
      className="max-w-7xl w-full mx-auto justify-self-center pt-28 flex flex-col overflow-x-hidden"
    >
      <div>
        <h1 className="font-bold text-6xl/12 tracking-tighter text-shadow-lg/20 justify-self-end">
          Nossos
          <br />
          <span className="text-pink">Serviços</span>
        </h1>
      </div>

      <div
        className="
          grid grid-cols-5 grid-rows-2 gap-5 py-8 text-right w-full
          overflow-x-hidden max-w-full px-4
        "
      >
        {/* CARD 1 */}
        <div className=" transition-transform duration-300 hover:scale-105 col-span-2 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white h-[179px]">
          <h1 className="text-2xl/12 tracking-tighter">
            Automação de Processos (RPA)
          </h1>
          <p className="text-base font-manrope font-extralight">
            Desenvolvemos bots personalizados
            <br />
            que executam tarefas repetitivas com precisão e velocidade.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="min-w-0 transition-transform duration-300 hover:scale-105 col-start-3 rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 pr-4 text-white h-[179px] w-full">
          <h1 className="text-2xl/6 tracking-tighter">
            RPA Local e<br />
            em Nuvem
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Automatizamos servidores locais e cloud com segurança.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="min-w-0 transition-transform duration-300 hover:scale-105 col-start-4 row-span-2 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Criação de Sites e Landing Pages
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Sites modernos, rápidos e responsivos, projetados para gerar
            resultado e presença digital.
          </p>
        </div>

        {/* CARD 4 */}
        <div className="min-w-0 transition-transform duration-300 hover:scale-105 col-start-5 row-span-2 rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 pr-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Integração
            <br />
            de Sistemas
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Conectamos ERPs, CRMs, planilhas e APIs para eliminar retrabalho
            <br />e centralizar informações.
          </p>
        </div>

        {/* CARD 5 */}
        <div className="min-w-0 transition-transform duration-300 hover:scale-105 row-start-2 col-span-3 rounded-2xl bg-white border border-pink backdrop-blur-lg py-6 px-4 text-pink h-36 w-full">
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
