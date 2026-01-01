"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { UserPlus, Search, ChevronRight, X } from "lucide-react";
import { useUsers } from "./context";

// Gera username a partir do nome completo
// Ex: "Luiz Sanchez" -> "lsanchez"
// Se já existir, usa letras do meio: "Maria Pereira Sanchez" -> "mpsanchez"
// Se ainda conflitar, adiciona mais letras do primeiro nome: "masanchez", "marsanchez"
const generateUsername = (fullName: string, existingUsernames: string[]): string => {
  const parts = fullName
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  const middleNames = parts.slice(1, -1); // Nomes do meio

  // Tenta username básico: primeira letra + sobrenome
  let username = `${firstName[0]}${lastName}`;
  
  if (!existingUsernames.includes(username)) {
    return username;
  }

  // Se já existe, adiciona letras dos nomes do meio
  let middleInitials = "";
  for (const middle of middleNames) {
    middleInitials += middle[0];
    username = `${firstName[0]}${middleInitials}${lastName}`;
    
    if (!existingUsernames.includes(username)) {
      return username;
    }
  }

  // Se ainda conflita, adiciona mais letras do primeiro nome
  // Ex: msanchez -> masanchez -> marsanchez -> marianchez
  for (let i = 2; i <= firstName.length; i++) {
    username = `${firstName.slice(0, i)}${middleInitials}${lastName}`;
    
    if (!existingUsernames.includes(username)) {
      return username;
    }
  }

  // Último recurso: nome completo do meio
  for (const middle of middleNames) {
    for (let i = 2; i <= middle.length; i++) {
      username = `${firstName[0]}${middle.slice(0, i)}${lastName}`;
      
      if (!existingUsernames.includes(username)) {
        return username;
      }
    }
  }

  // Se ainda conflitar, usa primeiro nome completo + sobrenome
  return `${firstName}${lastName}`;
};

export function Overlord() {
  const navigate = useNavigate();
  const { users, addUser } = useUsers();
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newUser, setNewUser] = useState({
    displayName: "",
    password: "",
  });

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const existingUsernames = users.map((u) => u.username);
  const generatedUsername = generateUsername(newUser.displayName, existingUsernames);
  const generatedEmail = generatedUsername ? `${generatedUsername}@orivyx.com` : "";

  const handleCreateUser = () => {
    if (!generatedUsername) return;
    
    addUser({
      username: generatedUsername,
      email: generatedEmail,
      displayName: newUser.displayName.trim(),
      groups: [],
    });
    setNewUser({ displayName: "", password: "" });
    setShowCreateModal(false);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/admin/overlord/${userId}`);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 tracking-tight">Overlord</h1>
      <p className="text-white/60 mb-8">Gestão de usuários do sistema</p>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-pink"
          />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-pink text-white rounded-xl font-medium hover:bg-pink/80 transition"
        >
          <UserPlus className="w-5 h-5" />
          Novo Usuário
        </button>
      </div>

      {/* Users Table */}
      <Card className="bg-white/5 border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-onest">Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/60 text-sm">
                  <th className="pb-4 font-medium">Usuário</th>
                  <th className="pb-4 font-medium">Email</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Último Login</th>
                  <th className="pb-4 font-medium">Criado em</th>
                  <th className="pb-4 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer group"
                  >
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-white/50">@{user.username}</div>
                      </div>
                    </td>
                    <td className="py-4 text-white/70">{user.email}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status === "active" ? "Ativo" : "Bloqueado"}
                      </span>
                    </td>
                    <td className="py-4 text-white/70">{user.lastLogin}</td>
                    <td className="py-4 text-white/70">{user.createdAt}</td>
                    <td className="py-4 text-right">
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-pink transition" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-white/40">
                Nenhum usuário encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Novo Usuário</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Luiz Sanchez"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, displayName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink"
                />
              </div>

              {/* Campos gerados automaticamente */}
              {generatedUsername && (
                <div className="rounded-xl p-4 space-y-3 border bg-white/5 border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Username</span>
                    <span className="text-pink font-medium">@{generatedUsername}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Email</span>
                    <span className="text-pink font-medium">{generatedEmail}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 py-3 bg-pink rounded-xl font-medium hover:bg-pink/80 transition"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
