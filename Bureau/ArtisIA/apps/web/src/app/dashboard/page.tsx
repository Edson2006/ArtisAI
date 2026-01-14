"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileText, Users, DollarSign, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { 
    name: "Chiffre d'affaires", 
    value: "0 €", 
    change: "+0%", 
    trend: "neutral",
    icon: DollarSign,
    color: "bg-blue-500"
  },
  { 
    name: "Devis en attente", 
    value: "0", 
    change: "0 cette semaine", 
    trend: "neutral",
    icon: FileText,
    color: "bg-orange-500"
  },
  { 
    name: "Taux de conversion", 
    value: "0%", 
    change: "+0%", 
    trend: "neutral",
    icon: TrendingUp,
    color: "bg-green-500"
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1">Bienvenue sur votre espace de gestion.</p>
        </div>
        <Link 
          href="/dashboard/quotes/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Nouveau devis
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 
                stat.trend === 'down' ? 'bg-red-50 text-red-600' : 
                'bg-slate-50 text-slate-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Quotes */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Devis récents</h2>
            <Link href="/dashboard/quotes" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-medium mb-1">Aucun devis pour le moment</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              Commencez par créer votre premier devis pour voir apparaître vos statistiques.
            </p>
            <Link 
              href="/dashboard/quotes/new" 
              className="text-blue-600 font-bold text-sm hover:underline"
            >
              Créer un devis maintenant
            </Link>
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
          <h2 className="font-display text-lg font-bold mb-4">Astuce Pro</h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Complétez votre profil entreprise pour générer des devis valides juridiquement (SIRET, Adresse, Logo).
          </p>
          <Link 
            href="/dashboard/profile"
            className="block w-full bg-white/10 hover:bg-white/20 text-center py-3 rounded-xl font-bold text-sm transition-colors backdrop-blur-sm"
          >
            Compléter mon profil
          </Link>
        </div>
      </div>
    </div>
  );
}
