import { useState, useEffect } from "react";
import { AdminLayout } from "../layout";
import {
  Trash2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MessageSquare,
  Calendar,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

type Lead = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  mensagem: string;
  createdAt: string;
};

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = () => {
    const storedLeads = localStorage.getItem("orivyx_leads");
    if (storedLeads) {
      const parsed = JSON.parse(storedLeads) as Lead[];
      parsed.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLeads(parsed);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const deleteLead = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    setLeads(updated);
    localStorage.setItem("orivyx_leads", JSON.stringify(updated));
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleBack = () => {
    setSelectedLead(null);
  };

  // Mobile: Show detail view
  if (
    selectedLead &&
    typeof window !== "undefined" &&
    window.innerWidth < 1024
  ) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para leads
          </button>

          {/* Lead Detail */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-onest font-bold">
                  {selectedLead.nome}
                </h2>
                <p className="text-white/60 font-manrope flex items-center gap-2 mt-1 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedLead.createdAt)}
                </p>
              </div>
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition"
              >
                <Mail className="w-5 h-5 text-pink" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/50">Email</p>
                  <p className="text-pink truncate">{selectedLead.email}</p>
                </div>
              </a>

              <a
                href={`tel:${selectedLead.telefone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition"
              >
                <Phone className="w-5 h-5 text-green-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/50">Telefone</p>
                  <p className="text-green-400">{selectedLead.telefone}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <Building2 className="w-5 h-5 text-white/60" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/50">Empresa</p>
                  <p className="truncate">{selectedLead.empresa}</p>
                </div>
              </div>

              {selectedLead.cargo && (
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <Briefcase className="w-5 h-5 text-white/60" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/50">Cargo</p>
                    <p className="truncate">{selectedLead.cargo}</p>
                  </div>
                </div>
              )}

              {selectedLead.mensagem && (
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Mensagem
                  </div>
                  <p className="text-sm text-white/90 whitespace-pre-wrap">
                    {selectedLead.mensagem}
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons - sticky at bottom */}
            <div className="flex gap-3 pt-2">
              <a
                href={`https://wa.me/55${selectedLead.telefone.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 active:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold text-center text-sm"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex-1 bg-pink active:bg-pink/90 text-white py-3 px-4 rounded-xl font-semibold text-center text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-onest">Leads</h1>
            <p className="text-white/60 font-manrope mt-1 text-sm">
              {leads.length} lead{leads.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={loadLeads}
            className="p-2 lg:px-4 lg:py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="hidden lg:inline">Atualizar</span>
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-12 text-center">
            <MessageSquare className="w-12 lg:w-16 h-12 lg:h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-lg lg:text-xl font-onest font-semibold mb-2">
              Nenhum lead ainda
            </h2>
            <p className="text-white/60 font-manrope text-sm lg:text-base">
              Os leads capturados pelo formulário aparecerão aqui.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: Full width list */}
            <div className="lg:hidden space-y-2">
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => handleSelectLead(lead)}
                  className="w-full text-left p-4 rounded-xl bg-black/40 border border-white/10 active:bg-white/10 transition flex items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-onest font-semibold truncate">
                      {lead.nome}
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      {lead.empresa}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {formatDate(lead.createdAt)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </button>
              ))}
            </div>

            {/* Desktop: Side by side layout */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {/* Lista de Leads */}
              <div className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => handleSelectLead(lead)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedLead?.id === lead.id
                        ? "bg-pink/20 border-pink"
                        : "bg-black/40 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-onest font-semibold truncate">
                      {lead.nome}
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      {lead.empresa}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {formatDate(lead.createdAt)}
                    </p>
                  </button>
                ))}
              </div>

              {/* Detalhes do Lead */}
              <div className="lg:col-span-2">
                {selectedLead ? (
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-onest font-bold">
                          {selectedLead.nome}
                        </h2>
                        <p className="text-white/60 font-manrope flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedLead.createdAt)}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteLead(selectedLead.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                        <a
                          href={`mailto:${selectedLead.email}`}
                          className="text-pink hover:underline"
                        >
                          {selectedLead.email}
                        </a>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <Phone className="w-4 h-4" />
                          Telefone
                        </div>
                        <a
                          href={`tel:${selectedLead.telefone.replace(
                            /\D/g,
                            ""
                          )}`}
                          className="text-pink hover:underline"
                        >
                          {selectedLead.telefone}
                        </a>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <Building2 className="w-4 h-4" />
                          Empresa
                        </div>
                        <p>{selectedLead.empresa}</p>
                      </div>

                      {selectedLead.cargo && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                            <Briefcase className="w-4 h-4" />
                            Cargo
                          </div>
                          <p>{selectedLead.cargo}</p>
                        </div>
                      )}
                    </div>

                    {selectedLead.mensagem && (
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                          <MessageSquare className="w-4 h-4" />
                          Mensagem
                        </div>
                        <p className="text-white/90 whitespace-pre-wrap">
                          {selectedLead.mensagem}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <a
                        href={`https://wa.me/55${selectedLead.telefone.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold text-center transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="flex-1 bg-pink hover:bg-pink/90 text-white py-3 px-4 rounded-xl font-semibold text-center transition-colors"
                      >
                        Enviar Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-white/20 mb-4" />
                    <p className="text-white/60">
                      Selecione um lead para ver os detalhes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
