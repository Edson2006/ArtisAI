"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserQuotes, deleteQuote } from "@/utils/firebase/quotes";
import { Quote, QuoteStatus } from "@/types/quote";
import { Loader2, Plus, Search, Filter, MoreVertical, FileText, Trash2, Edit, Eye } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import toast from "react-hot-toast";

const statusColors: Record<QuoteStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  sent: "bg-blue-100 text-blue-600",
  accepted: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
  paid: "bg-purple-100 text-purple-600",
};

const statusLabels: Record<QuoteStatus, string> = {
  draft: "Brouillon",
  sent: "Envoyé",
  accepted: "Accepté",
  rejected: "Refusé",
  paid: "Payé",
};

export default function QuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadQuotes = async () => {
      if (user) {
        try {
          const data = await getUserQuotes(user.uid);
          setQuotes(data);
        } catch (error) {
          console.error("Error loading quotes:", error);
          toast.error("Erreur lors du chargement des devis");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadQuotes();
  }, [user]);

  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null);

  const handleDeleteClick = (quote: Quote) => {
    setQuoteToDelete(quote);
  };

  const confirmDelete = async () => {
    if (!quoteToDelete) return;
    
    try {
      await deleteQuote(quoteToDelete.id);
      setQuotes(quotes.filter(q => q.id !== quoteToDelete.id));
      toast.success("Devis supprimé avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setQuoteToDelete(null);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesStatus = filter === "all" || quote.status === filter;
    const matchesSearch = 
      quote.clientName.toLowerCase().includes(search.toLowerCase()) ||
      quote.number.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Delete Confirmation Modal */}
      {quoteToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Supprimer le devis ?</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Vous êtes sur le point de supprimer ce devis. Cette action est <span className="font-bold text-red-600">irréversible</span>.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Numéro</span>
                <span className="font-mono font-medium text-slate-900">{quoteToDelete.number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Client</span>
                <span className="font-medium text-slate-900">{quoteToDelete.clientName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Montant Total</span>
                <span className="font-bold text-slate-900">
                  {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(quoteToDelete.total)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setQuoteToDelete(null)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Mes Devis</h1>
          <p className="text-slate-500 mt-1">Gérez et suivez l'état de vos propositions commerciales.</p>
        </div>
        <Link 
          href="/dashboard/quotes/create" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Nouveau devis
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un client, un numéro..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400" />
          {(["all", "draft", "sent", "accepted", "paid"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {status === "all" ? "Tous" : statusLabels[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes List */}
      {filteredQuotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-slate-900 font-medium mb-1">Aucun devis trouvé</h3>
          <p className="text-slate-500 text-sm mb-6">
            {search || filter !== "all" ? "Essayez de modifier vos filtres." : "Commencez par créer votre premier devis."}
          </p>
          {(search || filter !== "all") && (
            <button 
              onClick={() => {setFilter("all"); setSearch("");}}
              className="text-blue-600 font-bold text-sm hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Numéro</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {quote.number}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {quote.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {format(new Date(quote.createdAt), "d MMM yyyy", { locale: fr })}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(quote.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                      {statusLabels[quote.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/quotes/${quote.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDeleteClick(quote)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
