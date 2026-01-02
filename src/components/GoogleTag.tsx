import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GTAG_ID = "AW-17846076585";
const COOKIE_CONSENT_KEY = "orivyx_cookie_consent";

function loadGoogleTag() {
  // Verifica se o script já foi adicionado
  if (document.getElementById("gtag-script")) return;

  // Adiciona o script do gtag.js
  const gtagScript = document.createElement("script");
  gtagScript.id = "gtag-script";
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
  document.head.appendChild(gtagScript);

  // Adiciona o script de configuração
  const configScript = document.createElement("script");
  configScript.id = "gtag-config";
  configScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GTAG_ID}');
  `;
  document.head.appendChild(configScript);
}

export function GoogleTag() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Verifica consentimento inicial
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === "accepted") {
      setHasConsent(true);
    }

    // Escuta evento de consentimento
    const handleConsent = () => setHasConsent(true);
    window.addEventListener("cookieConsentAccepted", handleConsent);

    return () => {
      window.removeEventListener("cookieConsentAccepted", handleConsent);
    };
  }, []);

  useEffect(() => {
    // Não carrega o gtag em rotas de admin ou sem consentimento
    if (isAdminRoute || !hasConsent) return;

    loadGoogleTag();
  }, [isAdminRoute, hasConsent]);

  return null;
}
