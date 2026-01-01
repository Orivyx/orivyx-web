import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GTAG_ID = "AW-17846076585";

export function GoogleTag() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Não carrega o gtag em rotas de admin
    if (isAdminRoute) return;

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

    return () => {
      // Cleanup ao desmontar (opcional)
      const existingGtag = document.getElementById("gtag-script");
      const existingConfig = document.getElementById("gtag-config");
      if (existingGtag) existingGtag.remove();
      if (existingConfig) existingConfig.remove();
    };
  }, [isAdminRoute]);

  return null;
}

