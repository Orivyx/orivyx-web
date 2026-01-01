import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  displayName: string;
  status: "active" | "blocked";
  lastLogin: string;
  createdAt: string;
  passwordExpiresAt: string; // Data de expiração da senha
  groups?: string[];
};

const STORAGE_KEY = "orivyx_users";

const PASSWORD_EXPIRY_DAYS = 120;

// Calcula data de expiração da senha (120 dias a partir de uma data)
const calculatePasswordExpiry = (fromDate: Date = new Date()): string => {
  const expiryDate = new Date(fromDate);
  expiryDate.setDate(expiryDate.getDate() + PASSWORD_EXPIRY_DAYS);
  return expiryDate.toISOString().split("T")[0];
};

// Dados mockados iniciais
const defaultUsers: User[] = [
  {
    id: "1",
    username: "lsanchez",
    email: "lsanchez@orivyx.com",
    displayName: "Lucas Sanchez",
    status: "active",
    lastLogin: "2024-12-23 14:30",
    createdAt: "2024-01-15",
    passwordExpiresAt: "2025-04-22",
    groups: ["Owners", "Admins"],
  },
  {
    id: "2",
    username: "gmarques",
    email: "gmarques@orivyx.com",
    displayName: "Gabriel Marques",
    status: "active",
    lastLogin: "2024-12-22 09:15",
    createdAt: "2024-01-15",
    passwordExpiresAt: "2025-04-22",
    groups: ["Owners", "Admins"],
  },
  {
    id: "3",
    username: "admin",
    email: "admin@orivyx.com",
    displayName: "Administrador",
    status: "blocked",
    lastLogin: "2024-12-01 11:00",
    createdAt: "2024-01-01",
    passwordExpiresAt: "2024-12-01", // Expirada
    groups: ["Admins"],
  },
];

// Carrega do localStorage ou usa dados padrão
const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading users from localStorage:", e);
  }
  return defaultUsers;
};

type UsersContextType = {
  users: User[];
  getUser: (id: string) => User | undefined;
  addUser: (user: Omit<User, "id" | "status" | "lastLogin" | "createdAt" | "passwordExpiresAt">) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleBlock: (id: string) => void;
  resetPasswordExpiry: (id: string) => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(loadUsers);

  // Salva no localStorage sempre que users mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Error saving users to localStorage:", e);
    }
  }, [users]);

  const getUser = (id: string) => users.find((u) => u.id === id);

  const addUser = (userData: Omit<User, "id" | "status" | "lastLogin" | "createdAt" | "passwordExpiresAt">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      status: "active",
      lastLogin: "-",
      createdAt: new Date().toISOString().split("T")[0],
      passwordExpiresAt: calculatePasswordExpiry(),
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleBlock = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
  };

  const resetPasswordExpiry = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, passwordExpiresAt: calculatePasswordExpiry() }
          : u
      )
    );
  };

  return (
    <UsersContext.Provider
      value={{ users, getUser, addUser, updateUser, deleteUser, toggleBlock, resetPasswordExpiry }}
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

