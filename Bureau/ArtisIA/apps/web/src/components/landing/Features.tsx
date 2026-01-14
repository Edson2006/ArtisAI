"use client";

import { motion } from "framer-motion";
import { Mic, FileCheck, Clock, ShieldCheck, Smartphone, Mail, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Dictée Vocale",
    description: "Dictez vos chantiers en conduisant. L'IA comprend tout et structure le devis pour vous.",
    color: "bg-blue-500"
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Devis Instantanés",
    description: "Obtenez un PDF professionnel en moins de 30 secondes. Prêt à être envoyé au client.",
    color: "bg-indigo-500"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Gain de Temps",
    description: "Économisez jusqu'à 10h par semaine. Profitez de vos soirées, ArtisIA gère l'administratif.",
    color: "bg-purple-500"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Prix Justes",
    description: "Accédez à une base de prix marché mise à jour ou importez vos propres tarifs.",
    color: "bg-emerald-500"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "100% Mobile",
    description: "Tout est accessible depuis votre smartphone. Gérez votre entreprise depuis le chantier.",
    color: "bg-orange-500"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Envoi Automatisé",
    description: "Envoyez vos devis par email ou WhatsApp directement depuis l'application.",
    color: "bg-pink-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Tout ce dont vous avez besoin pour <br/>
            <span className="text-blue-600">gagner du temps</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Une suite d'outils puissants conçus spécifiquement pour les artisans du bâtiment.
            Simple, rapide et efficace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
