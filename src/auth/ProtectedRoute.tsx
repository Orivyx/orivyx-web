import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const GROUPS_CLAIM = "https://orivyx.com/groups";

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
    return null;
  }

  const groups = (user as any)?.[GROUPS_CLAIM] ?? [];
  const isOwner = groups.includes("Owners");

  if (!isOwner) return <p>Access denied</p>;

  return <>{children}</>;
}
