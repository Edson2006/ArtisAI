"use client";

import { Navbar } from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import { Check, X, Zap, Star, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";

const plans = [
  {
    name: "Découverte",
    description: "Pour tester ArtisIA sans engagement.",
    price: "0€",
    period: "/mois",
    features: [
      "5 devis par mois",
      "Dictée vocale basique",
      "Export PDF avec filigrane",
      "Support par email"
    ],
    notIncluded: [
      "Analyse visuelle (Photo)",
      "Personnalisation du logo",
      "Base de prix marché",
      "Signature électronique"
    ],
    cta: "Commencer gratuitement",
    href: "/register",
    popular: false,
    color: "slate"
  },
  {
    name: "Artisan Pro",
    description: "L'essentiel pour gagner du temps.",
    price: "29€",
    period: "/mois",
    features: [
      "Devis illimités",
      "Dictée vocale illimitée",
      "Analyse visuelle (50/mois)",
      "PDF Pro (sans filigrane)",
      "Personnalisation complète",
      "Base de prix marché",
      "Support prioritaire 7j/7"
    ],
    notIncluded: [
      "Signature électronique",
      "Accès multi-utilisateurs"
    ],
    cta: "Essayer 14 jours",
    href: "/register?plan=pro",
    popular: true,
    color: "blue"
  },
  {
    name: "Entreprise",
    description: "Pour les équipes et PME.",
    price: "99€",
    period: "/mois",
    features: [
      "Tout ce qu'il y a dans Pro",
      "Analyse visuelle illimitée",
      "Signature électronique",
      "Jusqu'à 5 utilisateurs",
      "Tableau de bord équipe",
      "API & Intégrations",
      "Account Manager dédié"
    ],
    notIncluded: [],
    cta: "Contacter les ventes",
    href: "/contact",
    popular: false,
    color: "indigo"
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Des tarifs simples, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                rentabilisés dès le 1er devis
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600"
            >
              Choisissez le plan qui correspond à votre activité. Changez à tout moment.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={cn(
                  "relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl",
                  plan.popular 
                    ? "bg-white border-blue-200 shadow-lg shadow-blue-900/5 scale-105 z-10" 
                    : "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Le plus populaire
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm h-10">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500 ml-2">{plan.period}</span>
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className={cn(
                    "block w-full py-3 px-6 rounded-xl text-center font-bold transition-all mb-8",
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
                      : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-slate-400" />
                      </div>
                      <span className="text-slate-500 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-500 mb-4">Une question sur les tarifs ?</p>
            <Link href="mailto:contact@artisia.com" className="text-blue-600 font-bold hover:underline">
              Contacter notre équipe commerciale
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
