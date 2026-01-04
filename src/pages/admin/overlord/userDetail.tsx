"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  ArrowLeft,
  KeyRound,
  Lock,
  Unlock,
  Trash2,
  User,
  Mail,
  Calendar,
  X,
  Shield,
  Loader2,
  RefreshCw,
  Clock,
  History,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useUsers, User as UserType, AuditLog } from "./context";

type ModalType = "delete" | "password" | "renew" | null;

const ACTION_LABELS: Record<string, string> = {
  CREATE_USER: "Usuário criado",
  UPDATE_USER: "Usuário atualizado",
  DELETE_USER: "Usuário excluído",
  BLOCK_USER: "Usuário bloqueado",
  UNBLOCK_USER: "Usuário desbloqueado",
  RESET_PASSWORD: "Senha alterada",
  EXPIRE_PASSWORD: "Senha expirada",
  RENEW_EXPIRATION: "Expiração renovada",
  ADD_TO_GROUP: "Adicionado a grupo",
  REMOVE_FROM_GROUP: "Removido de grupo",
  LOGIN: "Login",
  LOGOUT: "Logout",
};

function formatAction(action: string): string {
  return ACTION_LABELS[action] || action;
}

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const {
    getUser,
    fetchUser,
    toggleBlock,
    deleteUser,
    resetPassword,
    renewExpiration,
    getAuditLogs,
    loading: contextLoading,
  } = useUsers();

  const [modal, setModal] = useState<ModalType>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Carrega usuário
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;

      const cachedUser = getUser(userId);
      if (cachedUser) {
        setUser(cachedUser);
        setLoading(false);
        return;
      }

      try {
        const fetchedUser = await fetchUser(userId);
        setUser(fetchedUser);
      } catch {
        setError("Usuário não encontrado");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, getUser, fetchUser]);

  // Carrega logs de auditoria
  useEffect(() => {
    const loadAuditLogs = async () => {
      if (!userId) return;
      setLoadingLogs(true);
      try {
        const logs = await getAuditLogs(userId);
        setAuditLogs(logs);
      } catch (err) {
        console.error("Error loading audit logs:", err);
      } finally {
        setLoadingLogs(false);
      }
    };

    loadAuditLogs();
  }, [userId, getAuditLogs]);

  const handleDelete = async () => {
    if (!user) return;
    try {
      setActionLoading(true);
      await deleteUser(user.username);
      navigate("/admin/overlord");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir usuário");
      setModal(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user || !newPassword) return;
    try {
      setActionLoading(true);
      await resetPassword(user.username, newPassword);
      setNewPassword("");
      setModal(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao resetar senha");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleBlock = async () => {
    if (!user) return;
    try {
      setActionLoading(true);
      await toggleBlock(user.username);
      setUser({
        ...user,
        status: user.status === "active" ? "blocked" : "active",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao alterar status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRenewExpiration = async () => {
    if (!user) return;
    try {
      setActionLoading(true);
      await renewExpiration(user.username);
      setModal(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao renovar conta");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white/60">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Carregando usuário...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => navigate("/admin/overlord")}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <div className="text-center py-20 text-white/40">
          Usuário não encontrado
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header - Mobile friendly */}
      <div className="flex items-center gap-4 mb-4 lg:mb-6">
        <button
          onClick={() => navigate("/admin/overlord")}
          className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg lg:text-xl font-bold truncate flex-1">
          {user.displayName}
        </h1>
        {/* Status only on desktop header */}
        <span
          className={`hidden lg:inline-block px-3 py-1 rounded-full text-xs font-medium ${
            user.status === "active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {user.status === "active" ? "Ativo" : "Bloqueado"}
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* User Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-pink/20 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-pink" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-lg truncate">{user.displayName}</p>
              <p className="text-white/50 text-sm">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10">
            {/* Status */}
            <div className="flex items-center gap-3 text-sm">
              <div
                className={`w-4 h-4 rounded-full ${
                  user.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={
                  user.status === "active" ? "text-green-400" : "text-red-400"
                }
              >
                {user.status === "active" ? "Conta ativa" : "Conta bloqueada"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-white/40" />
              <span className="text-white/70 truncate">
                {user.email || "-"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-white/40" />
              <span className="text-white/70">
                Criado: {user.createdAt || "-"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-white/70">
                Expira:{" "}
                {user.accountExpiresAt ? (
                  <span
                    className={
                      new Date(user.accountExpiresAt) < new Date()
                        ? "text-red-400"
                        : new Date(user.accountExpiresAt) <
                          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {user.accountExpiresAt}
                  </span>
                ) : (
                  "Nunca"
                )}
              </span>
            </div>
          </div>

          {user.groups && user.groups.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                <Shield className="w-3 h-3" />
                Grupos
              </div>
              <div className="flex flex-wrap gap-1">
                {user.groups.map((group) => (
                  <span
                    key={group}
                    className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Audit History - Collapsible */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-white/40" />
              <span className="font-medium">Histórico</span>
              <span className="text-xs text-white/40">
                ({auditLogs.length})
              </span>
            </div>
            {showHistory ? (
              <ChevronUp className="w-5 h-5 text-white/40" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/40" />
            )}
          </button>

          {showHistory && (
            <div className="border-t border-white/10 p-3 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {loadingLogs ? (
                <div className="flex items-center justify-center py-4 text-white/40">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Carregando...
                </div>
              ) : auditLogs.length === 0 ? (
                <p className="text-center py-4 text-white/40 text-sm">
                  Nenhuma ação registrada
                </p>
              ) : (
                auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-2 p-2 bg-white/5 rounded-lg"
                  >
                    {log.success ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {formatAction(log.action)}
                      </p>
                      <p className="text-xs text-white/50">
                        @{log.performedBy} • {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB - Open Actions */}
      <button
        onClick={() => setShowActions(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-pink text-white rounded-full shadow-lg shadow-pink/30 flex items-center justify-center z-40 active:scale-95 transition"
      >
        <KeyRound className="w-6 h-6" />
      </button>

      {/* Mobile Actions Modal */}
      {showActions && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setShowActions(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-white/20 rounded-t-2xl p-4 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

            <h3 className="text-lg font-bold mb-4 text-center">Ações</h3>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowActions(false);
                  setModal("password");
                }}
                disabled={actionLoading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 active:bg-yellow-500/20 disabled:opacity-50"
              >
                <KeyRound className="w-5 h-5" />
                Alterar Senha
              </button>

              <button
                onClick={() => {
                  setShowActions(false);
                  setModal("renew");
                }}
                disabled={actionLoading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 active:bg-blue-500/20 disabled:opacity-50"
              >
                <RefreshCw className="w-5 h-5" />
                Renovar Expiração
              </button>

              <button
                onClick={() => {
                  setShowActions(false);
                  handleToggleBlock();
                }}
                disabled={actionLoading}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl active:opacity-80 disabled:opacity-50 ${
                  user.status === "active"
                    ? "bg-orange-500/10 border border-orange-500/30 text-orange-400"
                    : "bg-green-500/10 border border-green-500/30 text-green-400"
                }`}
              >
                {actionLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : user.status === "active" ? (
                  <>
                    <Lock className="w-5 h-5" />
                    Bloquear Usuário
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    Desbloquear Usuário
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowActions(false);
                  setModal("delete");
                }}
                disabled={actionLoading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 active:bg-red-500/20 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
                Excluir Usuário
              </button>
            </div>

            <button
              onClick={() => setShowActions(false)}
              className="w-full mt-4 py-3 border border-white/20 rounded-xl text-white/60 active:bg-white/5"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-6">
        {/* User Info Card */}
        <Card className="bg-white/5 border-white/20 text-white flex-1">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-onest flex items-center gap-3">
                <div className="w-14 h-14 bg-pink/20 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-pink" />
                </div>
                <div>
                  <div>{user.displayName}</div>
                  <div className="text-sm text-white/50 font-normal">
                    @{user.username}
                  </div>
                </div>
              </CardTitle>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.status === "active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {user.status === "active" ? "Ativo" : "Bloqueado"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-0">
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="w-5 h-5 text-white/40" />
              {user.email || "-"}
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Calendar className="w-5 h-5 text-white/40" />
              Criado em: {user.createdAt || "-"}
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="w-5 h-5 text-white/40" />
              Expira em:{" "}
              {user.accountExpiresAt ? (
                <span
                  className={
                    new Date(user.accountExpiresAt) < new Date()
                      ? "text-red-400"
                      : new Date(user.accountExpiresAt) <
                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {user.accountExpiresAt}
                </span>
              ) : (
                <span className="text-white/40">Nunca</span>
              )}
            </div>
            {user.groups && user.groups.length > 0 && (
              <div className="flex items-start gap-3 text-white/70">
                <Shield className="w-5 h-5 text-white/40 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {user.groups.map((group) => (
                    <span
                      key={group}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card className="bg-white/5 border-white/20 text-white w-80">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-onest">Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-6 pt-0">
            <button
              onClick={() => setModal("password")}
              disabled={actionLoading}
              className="w-full flex items-center gap-3 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 hover:bg-yellow-500/20 transition disabled:opacity-50"
            >
              <KeyRound className="w-5 h-5" />
              Alterar Senha
            </button>

            <button
              onClick={() => setModal("renew")}
              disabled={actionLoading}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/20 transition disabled:opacity-50"
            >
              <RefreshCw className="w-5 h-5" />
              Alterar Expiração
            </button>

            <button
              onClick={handleToggleBlock}
              disabled={actionLoading}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition disabled:opacity-50 ${
                user.status === "active"
                  ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                  : "bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20"
              }`}
            >
              {actionLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : user.status === "active" ? (
                <>
                  <Lock className="w-5 h-5" />
                  Bloquear Usuário
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  Desbloquear Usuário
                </>
              )}
            </button>

            <button
              onClick={() => setModal("delete")}
              disabled={actionLoading}
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
              Excluir Usuário
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Audit Logs */}
      <Card className="hidden lg:block bg-white/5 border-white/20 text-white mt-6">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-onest flex items-center gap-2">
            <History className="w-5 h-5" />
            Histórico de Ações
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {loadingLogs ? (
            <div className="flex items-center justify-center py-8 text-white/40">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Carregando histórico...
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              Nenhuma ação registrada
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="mt-0.5">
                    {log.success ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white">
                        {formatAction(log.action)}
                      </span>
                      <span className="text-xs text-white/40">
                        {log.timestamp}
                      </span>
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      por{" "}
                      <span className="text-purple-400">
                        @{log.performedBy}
                      </span>
                      {log.ipAddress && (
                        <span className="text-white/30 ml-2">
                          ({log.ipAddress})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Overlay */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center z-50"
          onClick={() => !actionLoading && setModal(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/20 rounded-t-2xl lg:rounded-2xl p-4 lg:p-6 w-full lg:max-w-md max-h-[80vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar for mobile */}
            <div className="lg:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

            {/* Delete Modal */}
            {modal === "delete" && (
              <>
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-red-400">
                    Excluir Usuário
                  </h2>
                  <button
                    onClick={() => setModal(null)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                    disabled={actionLoading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/70 mb-6 text-sm lg:text-base">
                  Tem certeza que deseja excluir{" "}
                  <span className="text-white font-medium">
                    @{user.username}
                  </span>
                  ? Esta ação não pode ser desfeita.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition"
                    disabled={actionLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={actionLoading}
                    className="flex-1 py-3 bg-red-500 rounded-xl font-medium hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {actionLoading ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </>
            )}

            {/* Password Modal */}
            {modal === "password" && (
              <>
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-yellow-400">
                    Alterar Senha
                  </h2>
                  <button
                    onClick={() => {
                      setModal(null);
                      setNewPassword("");
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg"
                    disabled={actionLoading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/70 mb-4 text-sm lg:text-base">
                  Nova senha para{" "}
                  <span className="text-white font-medium">
                    @{user.username}
                  </span>
                </p>

                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={actionLoading}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                  />
                  <p className="text-xs text-white/40 mt-2">
                    Mínimo 12 caracteres com maiúsculas, minúsculas, números e
                    símbolos
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setModal(null);
                      setNewPassword("");
                    }}
                    className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition"
                    disabled={actionLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleResetPassword}
                    disabled={actionLoading || newPassword.length < 12}
                    className="flex-1 py-3 bg-yellow-500 text-black rounded-xl font-medium hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {actionLoading ? "Alterando..." : "Alterar"}
                  </button>
                </div>
              </>
            )}

            {/* Renew Expiration Modal */}
            {modal === "renew" && (
              <>
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-blue-400">
                    Renovar Conta
                  </h2>
                  <button
                    onClick={() => setModal(null)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                    disabled={actionLoading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/70 mb-6 text-sm lg:text-base">
                  Estender a conta de{" "}
                  <span className="text-white font-medium">
                    @{user.username}
                  </span>{" "}
                  por mais{" "}
                  <span className="text-blue-400 font-bold">120 dias</span>?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition"
                    disabled={actionLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleRenewExpiration}
                    disabled={actionLoading}
                    className="flex-1 py-3 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {actionLoading ? "Renovando..." : "Renovar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
