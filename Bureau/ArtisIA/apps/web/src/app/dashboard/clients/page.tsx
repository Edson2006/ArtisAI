"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserClients } from "@/utils/firebase/clients";
import { Client } from "@/types/client";
import { Loader2, Search, Users, Mail, MapPin, TrendingUp, Award } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import toast from "react-hot-toast";

export default function ClientsPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      if (user) {
        try {
          const data = await getUserClients(user.uid);
          setClients(data);
        } catch (error) {
          console.error("Error loading clients:", error);
          toast.error("Erreur lors du chargement des clients");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadClients();
  }, [user]);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate stats
  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0);
  const averageRevenue = totalClients > 0 ? totalRevenue / totalClients : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Mes Clients</h1>
        <p className="text-slate-500 mt-1">Gérez votre base client et analysez leur valeur.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Clients</p>
            <p className="text-2xl font-bold text-slate-900">{totalClients}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Chiffre d'Affaires Total</p>
            <p className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(totalRevenue)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Panier Moyen</p>
            <p className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(averageRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Rechercher un client par nom ou email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* Clients Table */}
      {filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-slate-900 font-medium mb-1">Aucun client trouvé</h3>
          <p className="text-slate-500 text-sm">
            Vos clients s'ajouteront automatiquement quand vous créerez des devis.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Localisation</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Devis</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total Dépensé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{client.name}</p>
                        <p className="text-xs text-slate-500">Ajouté le {format(new Date(client.createdAt), "d MMM yyyy", { locale: fr })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {client.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {client.email}
                        </div>
                      )}
                      {/* Placeholder for phone if we add it later */}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {client.address && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[200px]">{client.address}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {client.quotesCount} devis
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-900">
                      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(client.totalSpent)}
                    </span>
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
