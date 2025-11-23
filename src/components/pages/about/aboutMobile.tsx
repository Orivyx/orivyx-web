import { Swiper, SwiperSlide } from "swiper/react";

export function AboutMobile() {
  return (
    <section
      id="about"
      className="pt-12 flex flex-col items-center max-w-7xl w-full mx-auto overflow-x-hidden overflow-y-hidden px-4 h-full max-h-7xl"
    >
      {/* LOGO + TÍTULO */}
      <div className="items-center justify-center h-20 mb-2.5">
        <h1 className="font-onest font-bold text-3xl/6 text-center tracking-tighter text-shadow-lg/20 px-4 max-w-full ">
          Somos o elo entre o<br />
          potencial humano e o<br />
          poder da <span className="text-pink">automação</span>
        </h1>
      </div>

      {/* SWIPER — 4 CARDS */}
      <Swiper
        slidesPerView={1.4}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        className="mySwiper w-full"
      >
        {/* CARD 1 — PERFORMANCE ESTRATÉGICA */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Performance Estratégica
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Inteligência aplicada para elevar resultados com previsibilidade,
              <br />
              precisão e consistência.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 2 — AUTOMAÇÃO INTELIGENTE */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-white/5 border border-white backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Automação Inteligente
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Processos que operam sozinhos, sem erros e com escala
              <br />
              imediata para sua operação.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 3 — SEGURANÇA CORPORATIVA */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Segurança Corporativa
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Infraestrutura robusta e protocolos avançados
              <br />
              garantindo proteção em cada etapa.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 4 — SUPORTE CONSULTIVO */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-white/5 border border-white backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Suporte Consultivo
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Apoio estratégico contínuo para manter sua operação
              <br />
              evoluindo com estabilidade total.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 5 — EFICIÊNCIA OPERACIONAL */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-white border border-pink backdrop-blur-lg text-pink pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Eficiência Operacional
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Elimine gargalos e transforme rotinas complexas
              <br />
              em fluxos simples e automáticos.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 6 — ESCALABILIDADE REAL */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Escalabilidade Real
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Soluções que crescem junto com seu negócio,
              <br />
              mantendo alta performance e consistência.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 7 — INOVAÇÃO ORIENTADA A RESULTADOS */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-white/5 border border-white backdrop-blur-lg text-white pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Inovação Orientada a Resultados
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Tecnologia com propósito: acelerar, simplificar
              <br />e fortalecer sua operação.
            </p>
          </div>
        </SwiperSlide>

        {/* CARD 8 — CONFIABILIDADE OPERACIONAL */}
        <SwiperSlide>
          <div className="transition-transform duration-300 hover:scale-105 rounded-2xl bg-white border border-pink backdrop-blur-lg text-pink pt-8 px-4 w-64 h-[250px]">
            <h1 className="text-2xl font-bold tracking-tight">
              Confiabilidade Operacional
            </h1>
            <p className="text-base font-manrope font-extralight mt-2">
              Processos que funcionam 24/7 com precisão,
              <br />
              mantendo seu negócio sempre no ritmo certo.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
