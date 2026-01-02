import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "orivyx_cookie_consent";

type ConsentStatus = "accepted" | "rejected" | null;

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;

    if (consent === null) {
      // Pequeno delay para animação suave
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);

    // Dispara evento para carregar o Google Tag
    window.dispatchEvent(new CustomEvent("cookieConsentAccepted"));
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        p-4 sm:p-6
        transition-all duration-300 ease-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
      `}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Texto */}
            <div className="flex-1">
              <h3 className="font-onest font-semibold text-white text-lg mb-1">
                🍪 Cookies & Privacidade
              </h3>
              <p className="font-manrope text-white/70 text-sm leading-relaxed">
                Usamos cookies para melhorar sua experiência, analisar o tráfego
                e personalizar anúncios. Ao clicar em "Aceitar", você concorda
                com nossa{" "}
                <a href="/privacy" className="text-pink hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>

            {/* Botões */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="
                  flex-1 sm:flex-none
                  px-4 py-2.5 rounded-full
                  border border-white/30 text-white/80
                  font-manrope text-sm font-medium
                  hover:bg-white/10 transition-colors
                "
              >
                Recusar
              </button>
              <button
                onClick={handleAccept}
                className="
                  flex-1 sm:flex-none
                  px-6 py-2.5 rounded-full
                  bg-pink hover:bg-pink/90
                  text-white font-manrope text-sm font-semibold
                  transition-colors
                "
              >
                Aceitar
              </button>
            </div>

            {/* Fechar (mobile) */}
            <button
              onClick={handleReject}
              className="absolute top-3 right-3 sm:hidden text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook para verificar se o usuário aceitou cookies
export function useCookieConsent(): boolean {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setAccepted(consent === "accepted");

    const handleAccept = () => setAccepted(true);
    window.addEventListener("cookieConsentAccepted", handleAccept);

    return () => {
      window.removeEventListener("cookieConsentAccepted", handleAccept);
    };
  }, []);

  return accepted;
}
