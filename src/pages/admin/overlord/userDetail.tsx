"use client";

import { useState } from "react";
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
  Clock,
  X,
  Shield,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useUsers } from "./context";

type ModalType = "delete" | "password" | null;

// Calcula dias restantes para expiração
const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { getUser, toggleBlock, deleteUser, resetPasswordExpiry } = useUsers();
  const [modal, setModal] = useState<ModalType>(null);
  const [newPassword, setNewPassword] = useState("");

  const user = userId ? getUser(userId) : undefined;

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

  const handleDelete = () => {
    deleteUser(user.id);
    navigate("/admin/overlord");
  };

  const handleChangePassword = () => {
    // Integrar com API + reset expiry
    console.log(`Changing password for ${user.username}: ${newPassword}`);
    resetPasswordExpiry(user.id);
    setNewPassword("");
    setModal(null);
  };

  const handleToggleBlock = () => {
    toggleBlock(user.id);
  };

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
              {user.email}
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Calendar className="w-5 h-5 text-white/40" />
              Criado em: {user.createdAt}
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="w-5 h-5 text-white/40" />
              Último login: {user.lastLogin}
            </div>
            {/* Expiração da senha */}
            {(() => {
              const daysLeft = getDaysUntilExpiry(user.passwordExpiresAt);
              const isExpired = daysLeft <= 0;
              const isExpiringSoon = daysLeft > 0 && daysLeft <= 30;

              return (
                <div
                  className={`flex items-center gap-3 ${
                    isExpired
                      ? "text-red-400"
                      : isExpiringSoon
                      ? "text-yellow-400"
                      : "text-white/70"
                  }`}
                >
                  {isExpired || isExpiringSoon ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <KeyRound className="w-5 h-5 text-white/40" />
                  )}
                  <div>
                    {isExpired ? (
                      <span className="font-medium">
                        Senha expirada em {user.passwordExpiresAt}
                      </span>
                    ) : isExpiringSoon ? (
                      <span>
                        Senha expira em {daysLeft} dias (
                        {user.passwordExpiresAt})
                      </span>
                    ) : (
                      <span>
                        Senha expira em: {user.passwordExpiresAt} ({daysLeft}{" "}
                        dias)
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
            {user.groups && user.groups.length > 0 && (
              <div className="flex items-center gap-3 text-white/70">
                <Shield className="w-5 h-5 text-white/40" />
                <div className="flex gap-2">
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
              className="w-full flex items-center gap-3 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 hover:bg-yellow-500/20 transition"
            >
              <KeyRound className="w-5 h-5" />
              Alterar Senha
            </button>

            <button
              onClick={() => resetPasswordExpiry(user.id)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition whitespace-nowrap"
            >
              <RefreshCw className="w-5 h-5 shrink-0" />
              Renovar Senha
            </button>

            <button
              onClick={handleToggleBlock}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                user.status === "active"
                  ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                  : "bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20"
              }`}
            >
              {user.status === "active" ? (
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
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition"
            >
              <Trash2 className="w-5 h-5" />
              Excluir Usuário
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Modal Overlay */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModal(null)}
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
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-3 bg-red-500 rounded-xl font-medium hover:bg-red-600 transition"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}

            {/* Password Modal */}
            {modal === "password" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Alterar Senha</h2>
                  <button
                    onClick={() => setModal(null)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/70 mb-4">
                  Alterar senha do usuário{" "}
                  <span className="text-white font-medium">
                    @{user.username}
                  </span>
                </p>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 py-3 bg-yellow-500 text-black rounded-xl font-medium hover:bg-yellow-400 transition"
                  >
                    Alterar
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
