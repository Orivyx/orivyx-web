export function AboutDesktop() {
  return (
    <section
      id="about"
      className="pt-36 2xl:pt-64 flex flex-col items-center max-w-7xl w-full mx-auto overflow-x-hidden overflow-y-hidden px-4 h-full max-h-7xl"
    >
      {/* LOGO + TÍTULO */}
      <div className="grid grid-rows-2 items-center justify-center w-full max-w-full max-h-56">
        <div className="flex items-center justify-center pt-14 max-w-full overflow-x-hidden">
          <img src="logo.png" alt="logo" className="scale-40" />
        </div>

        <h1 className="font-onest font-bold text-5xl md:text-6xl/12 text-center tracking-tighter text-shadow-lg/20 px-4 max-w-full">
          O futuro da <span className="text-pink">performance</span>
          <br />
          começa aqui
        </h1>
      </div>

      {/* CARDS 4 COLUNAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 pt-10 w-full max-w-full">
        <div className="transition-transform duration-300 hover:scale-105 bg-white rounded-tr-[20px] rounded-tl-[100px] rounded-br-[20px] rounded-bl-[20px] text-right pt-8 pr-5 border border-pink shadow-lg/20 w-full">
          <h1 className="text-pink font-manrope text-xl font-bold">
            Performance e Crescimento
          </h1>
          <p className="text-black font-manrope font-extralight">
            Estratégias guiadas por dados
            <br /> que geram resultados reais e mensuráveis.
          </p>
        </div>

        <div className="transition-transform duration-300 hover:scale-105 bg-pink rounded-3xl text-center pt-8 border border-pink shadow-lg/20 w-full">
          <h1 className="font-manrope text-xl font-bold">
            Automação
            <br />
            Inteligente
          </h1>
          <p className="text-black font-manrope font-extralight">
            Reduza custos. Ganhe tempo. Multiplique resultados.
          </p>
        </div>

        <div className="transition-transform duration-300 hover:scale-105 bg-white rounded-3xl text-center pt-8 border border-pink shadow-lg/20 w-full">
          <h1 className="text-pink font-manrope text-xl font-bold">
            Segurança e Confiabilidade
          </h1>
          <p className="text-black font-manrope font-extralight">
            Nossos bots seguem padrões corporativos de segurança e compliance,
            garantindo total controle.
          </p>
        </div>

        <div className="transition-transform duration-300 hover:scale-105 bg-white rounded-tl-[20px] rounded-tr-[100px] rounded-br-[20px] rounded-bl-[20px] h-52 pt-8 pl-5 border border-pink shadow-lg/20 w-full">
          <h1 className="text-pink font-manrope text-xl font-bold">
            Suporte e<br />
            Evolução
          </h1>
          <p className="text-black font-manrope font-extralight">
            Monitoramento proativo, atualizações automáticas e melhoria
            constante da performance.
          </p>
        </div>
      </div>

      {/* TEXTO + 2 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 pt-40 w-full max-w-full gap-10 h-full pb-6">
        {/* TEXTO */}
        <h1 className="text-right 2xl:pr-72 font-onest font-bold text-5xl md:text-6xl/12 tracking-tighter md:pr-20 px-2 md:px-0">
          Somos o elo
          <br />
          entre o<br />
          potencial
          <br />
          humano e o<br />
          poder da <span className="text-pink">automação</span>
        </h1>

        {/* CONTAINER DOS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-full h-full">
          {/* CARD 1 — IGUAL AOS DE 4 COLUNAS */}
          <div
            className="
              transition-transform duration-300 hover:scale-105 
              bg-white rounded-3xl
              text-left pt-8 px-6 
              border border-pink shadow-lg/20 
              w-full h-80
              overflow-hidden
            "
          >
            <h1 className="text-pink font-manrope text-xl font-bold">
              Parceria que impulsiona
            </h1>
            <p className="text-black font-manrope font-extralight">
              Entendemos seu negócio, seus desafios e criamos automações que
              resolvem o que realmente importa.
            </p>
          </div>

          {/* CARD 2 — IGUAL AOS DE 4 COLUNAS */}
          <div
            className="q
              transition-transform duration-300 hover:scale-105 
              bg-white rounded-3xl
              text-right pt-8 px-6 
              border border-pink shadow-lg/20 
              w-full h-80
              overflow-hidden
            "
          >
            <h1 className="text-pink font-manrope text-xl font-bold">
              Suporte que <br /> se importa
            </h1>
            <p className="text-black font-manrope font-extralight">
              Não somos apenas técnicos — somos pessoas que entendem pessoas.
              Cuidamos do seu projeto como se fosse nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
