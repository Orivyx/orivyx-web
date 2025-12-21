import { useAuth0 } from "@auth0/auth0-react";

export function useAuth() {
  const auth = useAuth0();

  return {
    ...auth,
    login: () => auth.loginWithRedirect(),
    signup: () =>
      auth.loginWithRedirect({
        authorizationParams: { screen_hint: "signup" },
      }),
    logout: () =>
      auth.logout({
        logoutParams: { returnTo: window.location.origin },
      }),
  };
}
