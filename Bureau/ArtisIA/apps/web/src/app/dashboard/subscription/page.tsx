"use client";

import { Check, CreditCard, Zap, Shield, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "/mois",
    description: "Pour démarrer votre activité",
    features: [
      "Jusqu'à 5 devis par mois",
      "Gestion clients basique",
      "Export PDF standard",
      "Support par email"
    ],
    current: false,
    buttonText: "Votre plan actuel",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    price: "29€",
    period: "/mois",
    description: "Pour les artisans en croissance",
    features: [
      "Devis illimités",
      "Assistant IA illimité",
      "Personnalisation avancée",
      "Relances automatiques",
      "Support prioritaire 7j/7",
      "Statistiques détaillées"
    ],
    current: true, // Simulating Pro plan for now
    popular: true,
    buttonText: "Gérer mon abonnement",
    buttonVariant: "primary"
  }
];

export default function SubscriptionPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">Votre Abonnement</h1>
        <p className="text-slate-500 text-lg">
          Gérez votre offre et profitez de toute la puissance d'ArtisIA pour développer votre activité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
              plan.popular 
                ? "border-blue-600 shadow-xl shadow-blue-900/10 scale-105 z-10" 
                : "border-slate-100 shadow-sm hover:border-slate-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Recommandé
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 font-medium">{plan.period}</span>
              </div>
              <p className="text-slate-500 mt-2 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                plan.buttonVariant === "primary"
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Paiement sécurisé & Facturation</h2>
          <p className="text-slate-400 mb-8">
            Vos paiements sont sécurisés par Stripe. Vous pouvez télécharger vos factures directement depuis votre espace client.
          </p>
          <button className="text-white font-medium border-b border-blue-400 hover:text-blue-400 transition-colors pb-0.5">
            Voir l'historique de facturation
          </button>
        </div>
      </div>
    </div>
  );
}
