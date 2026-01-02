import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  image: string;
  name: string;
  role: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: "/depoiments/depoimento-ricardo.png",
    name: "Ricardo Almeida",
    role: "CEO",
    company: "Empresa de Logística",
  },
  {
    id: 2,
    image: "/depoiments/depoimento-fernanda.png",
    name: "Fernanda Guimares",
    role: "Controller",
    company: "Grupo Empresarial",
  },
  {
    id: 3,
    image: "/depoiments/depoimento-will.png",
    name: "Will Pereira",
    role: "CFO",
    company: "Indústria",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [current]);

  // Auto-play
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="relative max-w-5xl w-full mx-auto py-20 sm:py-32 px-4 overflow-hidden">
      {/* Card Container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
        {/* Background glow inside card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="relative text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-manrope text-sm text-white/60 uppercase tracking-widest">
              Feedback Real
            </span>
          </div>
          <h2 className="font-onest text-3xl sm:text-4xl font-bold text-white mb-3">
            O que dizem sobre a <span className="text-pink">Orivyx</span>
          </h2>
          <p className="font-manrope text-white/50 text-base max-w-md mx-auto">
            Conversas reais com executivos que transformaram suas operações
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex justify-center items-center">
          {/* Navigation - left */}
          {testimonials.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-0 sm:-left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-pink/20 hover:border-pink/50 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-pink transition-colors" />
            </button>
          )}

          {/* iPhone Image Container */}
          <div className="relative px-8 sm:px-16">
            {/* Depoimento image (já inclui o frame do iPhone) */}
            <div
              className={`relative transition-all duration-500 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <img
                src={testimonial.image}
                alt={`Depoimento de ${testimonial.name}`}
                className="w-[200px] sm:w-[240px] h-auto drop-shadow-2xl mx-auto"
              />
            </div>
          </div>

          {/* Navigation - right */}
          {testimonials.length > 1 && (
            <button
              onClick={next}
              className="absolute right-0 sm:-right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-pink/20 hover:border-pink/50 transition-all group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-pink transition-colors" />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="mt-6 text-center">
          <p className="font-onest font-semibold text-white text-lg">
            {testimonial.name}
          </p>
          <p className="font-manrope text-white/50 text-sm">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>

        {/* Dots indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-pink"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
