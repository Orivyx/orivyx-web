"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  UserPlus,
  Search,
  ChevronRight,
  X,
  Loader2,
  RefreshCw,
  Check,
} from "lucide-react";
import { useUsers } from "./context";
import { useOverlordApi } from "@/services/overlordApi";

export function Overlord() {
  const navigate = useNavigate();
  const { users, loading, error, addUser, refreshUsers } = useUsers();
  const api = useOverlordApi();
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [availableGroups, setAvailableGroups] = useState<
    { name: string; members: number }[]
  >([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const [newUser, setNewUser] = useState({
    displayName: "",
    password: "",
    groups: [] as string[],
  });
  const [groupSearch, setGroupSearch] = useState("");

  // Filtrar grupos pela pesquisa
  const filteredGroups = availableGroups.filter((g) =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  // Buscar grupos quando abrir o modal
  useEffect(() => {
    if (showCreateModal && availableGroups.length === 0) {
      setLoadingGroups(true);
      api
        .listGroups()
        .then(setAvailableGroups)
        .catch(console.error)
        .finally(() => setLoadingGroups(false));
    }
  }, [showCreateModal, api, availableGroups.length]);

  const toggleGroup = (groupName: string) => {
    setNewUser((prev) => ({
      ...prev,
      groups: prev.groups.includes(groupName)
        ? prev.groups.filter((g) => g !== groupName)
        : [...prev.groups, groupName],
    }));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateUser = async () => {
    if (!newUser.displayName || !newUser.password) return;

    try {
      setCreating(true);
      setCreateError(null);
      await addUser({
        displayName: newUser.displayName.trim(),
        password: newUser.password,
        groups: newUser.groups,
      });
      setNewUser({ displayName: "", password: "", groups: [] });
      setGroupSearch("");
      setShowCreateModal(false);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Erro ao criar usuário"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/admin/overlord/${username}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white/60">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Carregando usuários...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-6 tracking-tight">
        Overlord
      </h1>
      <p className="text-white/60 mb-6 lg:mb-8 text-sm lg:text-base">
        Gestão de usuários do Active Directory
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
          {error}
          <button
            onClick={refreshUsers}
            className="ml-4 underline hover:no-underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex gap-2 lg:gap-4 mb-6 lg:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-pink"
          />
        </div>
        <button
          onClick={refreshUsers}
          className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
          title="Atualizar"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
        {/* Desktop only button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="hidden lg:flex items-center gap-2 px-6 py-3 bg-pink text-white rounded-xl font-medium hover:bg-pink/80 transition"
        >
          <UserPlus className="w-5 h-5" />
          Novo Usuário
        </button>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-pink text-white rounded-full shadow-lg shadow-pink/30 flex items-center justify-center z-40 active:scale-95 transition"
      >
        <UserPlus className="w-6 h-6" />
      </button>

      {/* Users List */}
      <Card className="bg-white/5 border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl font-onest">
            Usuários ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/60 text-sm">
                  <th className="pb-4 font-medium">Usuário</th>
                  <th className="pb-4 font-medium">Email</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Grupos</th>
                  <th className="pb-4 font-medium">Criado em</th>
                  <th className="pb-4 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.username}
                    onClick={() => handleUserClick(user.username)}
                    className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer group"
                  >
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-white/50">
                          @{user.username}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-white/70">{user.email || "-"}</td>
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
                    <td className="py-4 text-white/70">
                      {user.groups?.slice(0, 2).join(", ") || "-"}
                      {user.groups &&
                        user.groups.length > 2 &&
                        ` +${user.groups.length - 2}`}
                    </td>
                    <td className="py-4 text-white/70">{user.createdAt}</td>
                    <td className="py-4 text-right">
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-pink transition" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-2">
            {filteredUsers.map((user) => (
              <button
                key={user.username}
                onClick={() => handleUserClick(user.username)}
                className="w-full text-left p-4 bg-white/5 rounded-xl border border-white/10 active:bg-white/10 transition flex items-center gap-3"
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    user.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {user.displayName?.charAt(0)?.toUpperCase() || "?"}
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{user.displayName}</div>
                  <div className="text-sm text-white/50 truncate">
                    @{user.username}
                  </div>
                </div>
                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
              </button>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-white/40">
              Nenhum usuário encontrado
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !creating && setShowCreateModal(false)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-4 lg:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Novo Usuário</h2>
              <button
                onClick={() => !creating && setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
                disabled={creating}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {createError}
              </div>
            )}

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
                  disabled={creating}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Senha Inicial
                </label>
                <input
                  type="password"
                  placeholder="Senha forte"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  disabled={creating}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink disabled:opacity-50"
                />
                <p className="text-xs text-white/40 mt-2">
                  Mínimo 12 caracteres, incluindo maiúsculas, minúsculas,
                  números e símbolos
                </p>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Grupos
                </label>
                {loadingGroups ? (
                  <div className="flex items-center gap-2 text-white/40 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Carregando grupos...
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                    {/* Campo de pesquisa */}
                    <div className="p-2 border-b border-white/10">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          placeholder="Buscar grupo..."
                          value={groupSearch}
                          onChange={(e) => setGroupSearch(e.target.value)}
                          disabled={creating}
                          className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-pink/50 disabled:opacity-50"
                        />
                      </div>
                    </div>
                    {/* Lista de grupos */}
                    <div className="max-h-40 overflow-y-auto space-y-1 p-2 custom-scrollbar">
                      {filteredGroups.length === 0 ? (
                        <p className="text-white/40 text-sm text-center py-2">
                          {availableGroups.length === 0
                            ? "Nenhum grupo disponível"
                            : "Nenhum grupo encontrado"}
                        </p>
                      ) : (
                        filteredGroups.map((group) => (
                          <button
                            key={group.name}
                            type="button"
                            onClick={() => toggleGroup(group.name)}
                            disabled={creating}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition ${
                              newUser.groups.includes(group.name)
                                ? "bg-pink/20 border border-pink/50"
                                : "hover:bg-white/10 border border-transparent"
                            } disabled:opacity-50`}
                          >
                            <span className="text-sm">{group.name}</span>
                            {newUser.groups.includes(group.name) && (
                              <Check className="w-4 h-4 text-pink" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
                {newUser.groups.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newUser.groups.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-1 bg-pink/20 text-pink text-xs rounded-lg flex items-center gap-1"
                      >
                        {g}
                        <button
                          type="button"
                          onClick={() => toggleGroup(g)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition disabled:opacity-50"
                disabled={creating}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                disabled={creating || !newUser.displayName || !newUser.password}
                className="flex-1 py-3 bg-pink rounded-xl font-medium hover:bg-pink/80 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                {creating ? "Criando..." : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
