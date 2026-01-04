import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export type User = {
  id: string;
  username: string;
  email: string;
  displayName: string;
  status: "active" | "blocked";
  lastLogin: string;
  createdAt: string;
  passwordExpiresAt: string;
  accountExpiresAt?: string;
  groups: string[];
};

export type CreateUserRequest = {
  displayName: string;
  password: string;
  groups?: string[];
};

type ApiUser = {
  username: string;
  email: string;
  displayName: string;
  status: "active" | "blocked";
  groups: string[];
  createdAt: string;
  passwordLastSet?: string;
  accountExpiresAt?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_OVERLORD_API_URL || "http://localhost:3000";

// Converte formato da API para o formato do frontend
const mapApiUserToUser = (apiUser: ApiUser): User => ({
  id: apiUser.username,
  username: apiUser.username,
  email: apiUser.email || "",
  displayName: apiUser.displayName || apiUser.username,
  status: apiUser.status === "blocked" ? "blocked" : "active",
  lastLogin: "-",
  createdAt: apiUser.createdAt || "-",
  passwordExpiresAt: apiUser.passwordLastSet || "-",
  accountExpiresAt: apiUser.accountExpiresAt,
  groups: apiUser.groups || [],
});

type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  getUser: (id: string) => User | undefined;
  fetchUser: (username: string) => Promise<User | null>;
  addUser: (user: CreateUserRequest) => Promise<void>;
  updateUser: (username: string, data: Partial<User>) => Promise<void>;
  deleteUser: (username: string) => Promise<void>;
  toggleBlock: (username: string) => Promise<void>;
  resetPassword: (username: string, newPassword: string) => Promise<void>;
  renewExpiration: (username: string) => Promise<void>;
  getAuditLogs: (username: string) => Promise<AuditLog[]>;
  refreshUsers: () => Promise<void>;
};

export type AuditLog = {
  id: string;
  action: string;
  performedBy: string;
  targetUser: string;
  details: Record<string, unknown>;
  ipAddress: string;
  success: boolean;
  timestamp: string;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const handleResponse = async <T,>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.data ?? data;
  };

  // Carrega usuários da API
  const refreshUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users`, { headers });
      const apiUsers = await handleResponse<ApiUser[]>(response);
      setUsers(apiUsers.map(mapApiUserToUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar usuários"
      );
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Carrega usuários ao montar
  useEffect(() => {
    refreshUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = (id: string) =>
    users.find((u) => u.id === id || u.username === id);

  const fetchUser = async (username: string): Promise<User | null> => {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${username}`, {
        headers,
      });
      const apiUser = await handleResponse<ApiUser>(response);
      return mapApiUserToUser(apiUser);
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  };

  const addUser = async (userData: CreateUserRequest) => {
    try {
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
        method: "POST",
        headers,
        body: JSON.stringify(userData),
      });
      await handleResponse(response);
      await refreshUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao criar usuário";
      setError(message);
      throw err;
    }
  };

  const updateUser = async (username: string, data: Partial<User>) => {
    try {
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${username}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          displayName: data.displayName,
          email: data.email,
        }),
      });
      await handleResponse(response);
      await refreshUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao atualizar usuário";
      setError(message);
      throw err;
    }
  };

  const deleteUser = async (username: string) => {
    try {
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${username}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      await refreshUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao excluir usuário";
      setError(message);
      throw err;
    }
  };

  const toggleBlock = async (username: string) => {
    try {
      setError(null);
      const user = getUser(username);
      const endpoint = user?.status === "active" ? "disable" : "enable";
      console.log("toggleBlock called for:", username, "endpoint:", endpoint);
      const headers = await getHeaders();
      console.log("Headers obtained:", headers);
      const url = `${API_BASE_URL}/api/v1/users/${username}/${endpoint}`;
      console.log("Fetching:", url);
      const response = await fetch(url, {
        method: "POST",
        headers,
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.log("Error response:", error);
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      await refreshUsers();
    } catch (err) {
      console.error("toggleBlock error:", err);
      const message =
        err instanceof Error ? err.message : "Erro ao alterar status";
      setError(message);
      throw err;
    }
  };

  const resetPassword = async (
    username: string,
    newPassword: string
  ): Promise<void> => {
    try {
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/reset-password`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ newPassword }),
        }
      );
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      await refreshUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao resetar senha";
      setError(message);
      throw err;
    }
  };

  const renewExpiration = async (username: string): Promise<void> => {
    try {
      setError(null);
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/renew-expiration`,
        {
          method: "POST",
          headers,
        }
      );
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      await refreshUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao renovar conta";
      setError(message);
      throw err;
    }
  };

  const getAuditLogs = async (username: string): Promise<AuditLog[]> => {
    try {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/audit?pageSize=50`,
        { headers }
      );
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      return [];
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        getUser,
        fetchUser,
        addUser,
        updateUser,
        deleteUser,
        toggleBlock,
        resetPassword,
        renewExpiration,
        getAuditLogs,
        refreshUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
