import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState?: AppState) => {
    // Redireciona para a página que o usuário tentou acessar
    // Se não tiver returnTo, vai para /admin por padrão (não para /)
    const returnTo = appState?.returnTo || "/admin";
    navigate(returnTo, { replace: true });
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(audience && { audience }),
      }}
      cacheLocation="localstorage"
      useRefreshTokens
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
