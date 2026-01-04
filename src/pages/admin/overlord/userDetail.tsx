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

  // Carrega usuário
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;

      // Primeiro tenta do cache
      const cachedUser = getUser(userId);
      if (cachedUser) {
        setUser(cachedUser);
        setLoading(false);
        return;
      }

      // Se não encontrou, busca da API
      try {
        const fetchedUser = await fetchUser(userId);
        setUser(fetchedUser);
      } catch (err) {
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
      // Atualiza estado local
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
      {/* Header */}
      <button
        onClick={() => navigate("/admin/overlord")}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para Overlord
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 underline hover:no-underline"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* User Info Card */}
        <Card className="bg-white/5 border-white/20 text-white flex-1">
          <CardHeader>
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
          <CardContent className="space-y-4">
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
        <Card className="bg-white/5 border-white/20 text-white w-full lg:w-80">
          <CardHeader>
            <CardTitle className="text-xl font-onest">Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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

      {/* Audit Logs Section */}
      <Card className="bg-white/5 border-white/20 text-white mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-onest flex items-center gap-2">
            <History className="w-5 h-5" />
            Histórico de Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => !actionLoading && setModal(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Delete Modal */}
            {modal === "delete" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-red-400">
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

                <p className="text-white/70 mb-6">
                  Tem certeza que deseja excluir o usuário{" "}
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-yellow-400">
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

                <p className="text-white/70 mb-4">
                  Digite a nova senha para o usuário{" "}
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
                    Mínimo 12 caracteres, incluindo maiúsculas, minúsculas,
                    números e símbolos
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
                    {actionLoading ? "Alterando..." : "Alterar Senha"}
                  </button>
                </div>
              </>
            )}

            {/* Renew Expiration Modal */}
            {modal === "renew" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-blue-400">
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

                <p className="text-white/70 mb-6">
                  Deseja estender a expiração da conta do usuário{" "}
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
