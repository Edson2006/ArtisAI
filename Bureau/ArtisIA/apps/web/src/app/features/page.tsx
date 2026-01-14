"use client";

import { Navbar } from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import { Mic, ScanEye, Zap, FileCheck, ShieldCheck, BrainCircuit, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    id: "voice",
    icon: <Mic className="w-8 h-8" />,
    title: "Dictée Vocale Intelligente",
    subtitle: "Parlez, ArtisIA écrit.",
    description: "Ne perdez plus de temps à taper. Racontez simplement votre chantier à l'application comme si vous parliez à un collègue. Notre IA comprend le jargon du bâtiment, structure les informations et crée les lignes de devis automatiquement.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    image: "/features/voice.png",
    benefits: ["Comprend les accents et le bruit de fond", "Reconnaît les termes techniques (placo, PER, IPN...)", "Structure automatique (Lot, Désignation, Quantité)"]
  },
  {
    id: "vision",
    icon: <ScanEye className="w-8 h-8" />,
    title: "Analyse Visuelle",
    subtitle: "Une photo vaut 1000 mots.",
    description: "Prenez en photo une note manuscrite griffonnée sur un coin de table, ou directement le problème à réparer (ex: un tableau électrique vétuste). ArtisIA analyse l'image, identifie les besoins et prépare le devis.",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    image: "/features/vision.png",
    benefits: ["Numérisation de notes manuscrites", "Détection de matériel sur photo", "Suggestion de travaux correctifs"]
  },
  {
    id: "pricing",
    icon: <BrainCircuit className="w-8 h-8" />,
    title: "Intelligence Tarifaire",
    subtitle: "Vos prix, toujours justes.",
    description: "Connectez votre propre catalogue ou laissez ArtisIA vous suggérer les prix du marché local. L'IA apprend de vos précédents devis pour vous proposer automatiquement vos tarifs habituels.",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    image: "/features/pricing.png",
    benefits: ["Base de prix marché intégrée", "Apprentissage de vos habitudes", "Calcul de marge automatique"]
  },
  {
    id: "pdf",
    icon: <FileCheck className="w-8 h-8" />,
    title: "Génération PDF Pro",
    subtitle: "L'image de votre entreprise.",
    description: "Générez des documents ultra-professionnels qui inspirent confiance. Ajoutez votre logo, vos certifications (RGE, Qualibat) et personnalisez les couleurs. Le tout conforme aux normes légales.",
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    image: "/features/pdf.png",
    benefits: ["Design moderne et épuré", "Mentions légales automatiques", "Signature électronique intégrée"]
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="font-display font-semibold">Puissance & Simplicité</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Une technologie de pointe <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              au bout des doigts
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez comment ArtisIA transforme votre smartphone en un assistant administratif surpuissant.
          </motion.p>
        </div>
      </section>

      {/* Features List */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${feature.gradient}`}>
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className={`text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>
                    {feature.subtitle}
                  </p>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-4">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-600`}>
                        <Sparkles className="w-3 h-3" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl group hover:shadow-3xl transition-shadow duration-500">
                  <Image 
                    src={feature.image} 
                    alt={feature.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
            Prêt à passer à la vitesse supérieure ?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Rejoignez les artisans qui ont déjà divisé leur temps administratif par 4.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ArtisIA. Fait avec ❤️ pour les artisans.</p>
        </div>
      </footer>
    </main>
  );
}
