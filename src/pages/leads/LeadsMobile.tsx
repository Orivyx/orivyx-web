import { useState } from "react";
import { ArrowRight, Send, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  mensagem: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type Lead = FormData & {
  id: string;
  createdAt: string;
};

export function LeadsMobile() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cargo: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = "Empresa é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7
      )}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const saveLead = (data: FormData): void => {
    const lead: Lead = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const existingLeads = localStorage.getItem("orivyx_leads");
    const leads: Lead[] = existingLeads ? JSON.parse(existingLeads) : [];
    leads.push(lead);
    localStorage.setItem("orivyx_leads", JSON.stringify(leads));
  };

  const sendEmail = async (data: FormData): Promise<void> => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("EmailJS não configurado");
    }

    const templateParams = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      telefone_limpo: data.telefone.replace(/\D/g, ""),
      empresa: data.empresa,
      cargo: data.cargo || "Não informado",
      mensagem: data.mensagem || "Sem mensagem",
      data: new Date().toLocaleString("pt-BR"),
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Envia email e salva no localStorage
      await Promise.all([sendEmail(formData), saveLead(formData)]);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      // Mesmo com erro no email, salva localmente
      saveLead(formData);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main
        className="
          min-h-screen
          text-white 
          bg-no-repeat bg-cover bg-center
          bg-[url('/bg-mobile.png')]
          flex items-center justify-center
          px-4 py-12
        "
      >
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-pink/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-pink" />
            </div>
            <h1 className="font-onest text-2xl font-bold mb-3">
              Mensagem recebida!
            </h1>
            <p className="font-manrope text-base text-white/70 mb-6">
              Obrigado pelo seu interesse! Nossa equipe entrará em contato em
              breve.
            </p>
            <button
              onClick={() => navigate("/")}
              className="
                bg-pink hover:bg-pink/90
                rounded-full py-3 px-6
                font-onest font-semibold text-base
                flex items-center gap-2 mx-auto
                transition-all duration-300
              "
            >
              Voltar ao início
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        text-white 
        bg-no-repeat bg-cover bg-center
        bg-[url('/bg-mobile.png')]
        py-8 px-4
      "
    >
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="font-manrope text-sm">Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink" />
            <span className="font-manrope text-pink uppercase tracking-widest text-xs">
              Fale conosco
            </span>
          </div>

          <h1 className="font-onest text-3xl font-bold leading-tight">
            Vamos <span className="text-pink">transformar</span> seu negócio?
          </h1>

          <p className="font-manrope text-sm text-white/70 leading-relaxed">
            Preencha o formulário e nossa equipe entrará em contato para
            apresentar as melhores soluções.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h3 className="font-onest text-2xl font-bold text-pink mb-1">
              +90%
            </h3>
            <p className="font-manrope text-xs text-white/60">
              eficiência com automação
            </p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h3 className="font-onest text-2xl font-bold text-pink mb-1">
              -80%
            </h3>
            <p className="font-manrope text-xs text-white/60">
              custos operacionais
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Nome completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                className={`
                  w-full bg-white/5 border rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                  ${errors.nome ? "border-red-500" : "border-white/10"}
                `}
              />
              {errors.nome && (
                <p className="text-red-400 text-xs mt-1 font-manrope">
                  {errors.nome}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={`
                  w-full bg-white/5 border rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                  ${errors.email ? "border-red-500" : "border-white/10"}
                `}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 font-manrope">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className={`
                  w-full bg-white/5 border rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                  ${errors.telefone ? "border-red-500" : "border-white/10"}
                `}
              />
              {errors.telefone && (
                <p className="text-red-400 text-xs mt-1 font-manrope">
                  {errors.telefone}
                </p>
              )}
            </div>

            {/* Empresa */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Empresa *
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nome da empresa"
                className={`
                  w-full bg-white/5 border rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                  ${errors.empresa ? "border-red-500" : "border-white/10"}
                `}
              />
              {errors.empresa && (
                <p className="text-red-400 text-xs mt-1 font-manrope">
                  {errors.empresa}
                </p>
              )}
            </div>

            {/* Cargo */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Cargo
              </label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Seu cargo"
                className="
                  w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                "
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block font-manrope text-xs text-white/60 mb-1.5">
                Como podemos ajudar?
              </label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Conte-nos sobre seu projeto..."
                rows={3}
                className="
                  w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                  font-manrope text-sm text-white placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-pink/50
                  transition-all duration-300
                  resize-none
                "
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full bg-pink hover:bg-pink/90 disabled:bg-pink/50
                rounded-full py-4 px-6
                font-onest font-semibold text-base
                flex items-center justify-center gap-2
                transition-all duration-300
              "
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-white/40 font-manrope text-xs">
              Ao enviar, você concorda com nossa{" "}
              <a href="/privacy" className="text-pink hover:underline">
                Política de Privacidade
              </a>
              . Seus dados serão utilizados apenas para contato.
            </p>
          </form>
        </div>

        {/* Logo */}
        <div className="flex justify-center pt-4">
          <img src="/logo.png" alt="Orivyx" className="h-10 opacity-60" />
        </div>
      </div>
    </main>
  );
}
