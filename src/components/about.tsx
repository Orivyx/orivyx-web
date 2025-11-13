export function About() {
  return (
    <section className="pt-36 flex flex-col items-center">
      <div className="grid grid-rows-2 items-center justify-center">
        <div className="flex items-center justify-centers max-h-16 justify-self-center pt-14">
          <img src="logo.png" alt="logo" className="scale-40" />
        </div>
        <h1 className="font-onest font-bold text-6xl/12 text-center tracking-tighter text-shadow-lg/20">
          O futuro da <span className="text-pink">performance</span>
          <br />
          começa aqui
        </h1>
      </div>
      <div className="grid grid-cols-4 mx-40 gap-10 pt-10">
        <div className="bg-white rounded-tr-[20px] rounded-tl-[100px] rounded-br-[20px] rounded-bl-[20px] text-right pt-8 pr-5 border border-pink shadow-lg/20">
          <h1 className="text-pink font-manrope text-xl font-bold">
            Performance e Crescimento
          </h1>
          <p className="text-black font-manrope font-extralight">
            Estratégias guiadas por dados
            <br /> que geram resultados reais e mensuráveis.
          </p>
        </div>
        <div className="bg-pink rounded-3xl text-center pt-8 border border-pink shadow-lg/20">
          <h1 className="font-manrope text-xl font-bold">
            Automação
            <br />
            Inteligente
          </h1>
          <p className="text-black font-manrope font-extralight">
            Reduza custos. Ganhe tempo. Multiplique resultados.
          </p>
        </div>
        <div className="bg-white rounded-3xl text-center pt-8 border border-pink shadow-lg/20">
          <h1 className="text-pink font-manrope text-xl font-bold">
            Segurança e Confiabilidade
          </h1>
          <p className="text-black font-manrope font-extralight">
            Nossos bots seguem padrões corporativos de segurança e compliance,
            garantindo total controle.
          </p>
        </div>
        <div className="bg-white rounded-tl-[20px] rounded-tr-[100px] rounded-br-[20px] rounded-bl-[20px] h-52 pt-8 pl-5 border border-pink shadow-lg/20">
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
      <div className="grid grid-cols-2 mx-40 pt-40">
        <h1 className="text-right font-onest font-bold text-6xl/12 pr-56 tracking-tighter">
          Somos o elo entre o potencial humano e o poder da{" "}
          <span className="text-pink">automação</span>
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl text-left pt-8 px-5 border border-pink shadow-lg/20 w-[276px] h-80">
            <h1 className="text-pink font-manrope text-3xl font-bold">
              Parceria que impulsiona
            </h1>
            <p className="text-black font-manrope font-extralight text-xl">
              Entendemos seu negócio, seus desafios e criamos automações que
              resolvem o que realmente importa.
            </p>
          </div>
          <div className="bg-white rounded-3xl text-right pt-8 px-5 border border-pink shadow-lg/20 w-[276px] h-80 col-start-2">
            <h1 className="text-pink font-manrope text-3xl font-bold">
              Suporte que
              <br />
              se importa
            </h1>
            <p className="text-black font-manrope font-extralight text-xl">
              Não somos apenas técnicos — somos pessoas que entendem pessoas.
              Cuidamos do seu projeto como se fosse nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
