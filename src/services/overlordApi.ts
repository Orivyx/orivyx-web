import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const API_BASE_URL =
  import.meta.env.VITE_OVERLORD_API_URL || "http://localhost:3000";

export type ApiUser = {
  username: string;
  email: string;
  displayName: string;
  status: "active" | "blocked";
  groups: string[];
  createdAt: string;
  passwordLastSet?: string;
};

export type CreateUserRequest = {
  displayName: string;
  password: string;
  groups?: string[];
};

export type UpdateUserRequest = {
  displayName?: string;
  email?: string;
  groups?: string[];
};

export function useOverlordApi() {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      console.log("Token obtained successfully, length:", token?.length);
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } catch (error) {
      console.error("Failed to get token:", error);
      throw error;
    }
  }, [getAccessTokenSilently]);

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.data ?? data;
  };

  // GET /api/v1/users
  const listUsers = useCallback(async (): Promise<ApiUser[]> => {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, { headers });
    return handleResponse<ApiUser[]>(response);
  }, [getHeaders]);

  // GET /api/v1/users/:username
  const getUser = useCallback(
    async (username: string): Promise<ApiUser> => {
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${username}`, {
        headers,
      });
      return handleResponse<ApiUser>(response);
    },
    [getHeaders]
  );

  // POST /api/v1/users
  const createUser = useCallback(
    async (user: CreateUserRequest): Promise<ApiUser> => {
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
        method: "POST",
        headers,
        body: JSON.stringify(user),
      });
      return handleResponse<ApiUser>(response);
    },
    [getHeaders]
  );

  // PUT /api/v1/users/:username
  const updateUser = useCallback(
    async (username: string, data: UpdateUserRequest): Promise<ApiUser> => {
      const headers = await getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${username}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse<ApiUser>(response);
    },
    [getHeaders]
  );

  // DELETE /api/v1/users/:username
  const deleteUser = useCallback(
    async (username: string): Promise<void> => {
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
    },
    [getHeaders]
  );

  // POST /api/v1/users/:username/disable
  const disableUser = useCallback(
    async (username: string): Promise<void> => {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/disable`,
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
    },
    [getHeaders]
  );

  // POST /api/v1/users/:username/enable
  const enableUser = useCallback(
    async (username: string): Promise<void> => {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/enable`,
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
    },
    [getHeaders]
  );

  // POST /api/v1/users/:username/reset-password
  const resetPassword = useCallback(
    async (username: string, newPassword: string): Promise<void> => {
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
    },
    [getHeaders]
  );

  // POST /api/v1/users/:username/renew-expiration
  const renewExpiration = useCallback(
    async (username: string): Promise<void> => {
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
    },
    [getHeaders]
  );

  // GET /api/v1/users/:username/groups
  const getUserGroups = useCallback(
    async (username: string): Promise<string[]> => {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/groups`,
        { headers }
      );
      return handleResponse<string[]>(response);
    },
    [getHeaders]
  );

  // POST /api/v1/users/:username/groups
  const addUserToGroup = useCallback(
    async (username: string, group: string): Promise<void> => {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/groups`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ group }),
        }
      );
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
    },
    [getHeaders]
  );

  // DELETE /api/v1/users/:username/groups/:group
  const removeUserFromGroup = useCallback(
    async (username: string, group: string): Promise<void> => {
      const headers = await getHeaders();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/${username}/groups/${encodeURIComponent(
          group
        )}`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
    },
    [getHeaders]
  );

  // GET /api/v1/groups
  const listGroups = useCallback(async (): Promise<
    { name: string; members: number }[]
  > => {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/api/v1/groups`, { headers });
    return handleResponse<{ name: string; members: number }[]>(response);
  }, [getHeaders]);

  return {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    disableUser,
    enableUser,
    resetPassword,
    renewExpiration,
    getUserGroups,
    addUserToGroup,
    removeUserFromGroup,
    listGroups,
  };
}
