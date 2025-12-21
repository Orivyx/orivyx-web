import "swiper/css/effect-cards";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

export function ServicesMobile() {
  return (
    <section
      id="services"
      className="max-w-7xl w-full mx-auto justify-self-center pt-6 px-4 flex-col overflow-y-hidden"
    >
      <div>
        <h1 className="font-bold text-3xl/6 text-right tracking-tighter text-shadow-lg/20 justify-self-end">
          Nossos
          <br />
          <span className="text-pink">Serviços</span>
        </h1>
      </div>

      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="
          px-4 h-[330px] w-[250px] mt-3 mb-4
        "
      >
        {/* CARD 1 */}
        <SwiperSlide className="rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white w-[50px] h-[179px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Automação de Processos (RPA)
          </h1>
          <p className="text-base font-manrope font-extralight">
            Desenvolvemos bots personalizados
            <br />
            que executam tarefas repetitivas com precisão e velocidade.
          </p>
        </SwiperSlide>

        {/* CARD 2 */}
        <SwiperSlide className="rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 px-4 text-white h-[179px]">
          <h1 className="text-2xl/6 tracking-tighter">
            RPA Local e<br />
            em Nuvem
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Automatizamos servidores locais e cloud com segurança.
          </p>
        </SwiperSlide>

        {/* CARD 3 */}
        <SwiperSlide className="rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg py-6 px-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Criação de Sites e Landing Pages
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Sites modernos, rápidos e responsivos, projetados para gerar
            resultado e presença digital.
          </p>
        </SwiperSlide>

        {/* CARD 4 */}
        <SwiperSlide className="rounded-2xl bg-white/5 border border-white backdrop-blur-lg py-6 px-4 text-white h-[347px]">
          <h1 className="text-2xl/6 tracking-tighter">
            Integração
            <br />
            de Sistemas
          </h1>
          <p className="text-base/5 font-manrope font-extralight pt-2">
            Conectamos ERPs, CRMs, planilhas e APIs para eliminar retrabalho
            <br />e centralizar informações.
          </p>
        </SwiperSlide>

        {/* CARD 5 */}
        <SwiperSlide className="rounded-2xl bg-white border border-pink backdrop-blur-lg py-6 px-4 text-pink h-36">
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
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
