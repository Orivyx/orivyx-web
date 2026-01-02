import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Contact() {
  const navigate = useNavigate();

  return (
    <>
      {/* VERSÃO MOBILE */}
      <section
        id="contact-mobile"
        className="w-full mx-auto px-4 pt-8 pb-4 flex sm:hidden"
      >
        <div className="flex flex-col items-center bg-black/40 justify-center text-center rounded-2xl py-8 px-6 backdrop-blur-lg border border-white w-full">
          <h1 className="font-manrope font-bold text-2xl text-pink">
            Vamos conversar?
          </h1>
          <p className="font-manrope text-base font-extralight mt-2 text-white/80">
            Transforme sua empresa com automação inteligente
          </p>
          <button
            onClick={() => navigate("/forms")}
            className="
              mt-4 flex items-center gap-2
              bg-pink hover:bg-pink/90
              text-white font-bold
              px-6 py-3 rounded-full
              transition-all duration-300
              group
              text-sm
            "
          >
            Falar com a gente
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* VERSÃO DESKTOP */}
      <section
        id="contact"
        className="max-w-3xl w-full mx-auto justify-self-center pt-34 px-4 overflow-x-hidden hidden sm:flex"
      >
        <div className="flex flex-col items-center bg-black/40 justify-center text-center rounded-2xl py-10 backdrop-blur-lg border border-white h-[220px] w-full">
          <div className="flex items-center gap-3">
            <h1 className="font-manrope font-bold text-4xl text-pink">
              Entre em contato conosco
            </h1>
          </div>
          <p className="font-manrope text-2xl font-extralight mt-2">
            Seja bem-vindo ao mundo
          </p>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 object-contain mt-1"
          />
          <button
            onClick={() => navigate("/forms")}
            className="
              mt-4 flex items-center gap-2
              bg-pink hover:bg-pink/90
              text-white font-bold
              px-6 py-3 rounded-full
              transition-all duration-300
              group
            "
          >
            Falar com a gente
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
