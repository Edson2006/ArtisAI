"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50/50">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
      
      {/* Gradient Blobs - Made slightly stronger */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="font-display font-semibold">L'IA au service des artisans</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]"
            >
              Vos devis en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                quelques secondes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              Fini les soirées passées sur Excel. Décrivez votre chantier à l'oral ou par écrit, 
              <strong className="text-slate-900 font-bold"> ArtisIA</strong> génère instantanément un devis professionnel, détaillé et chiffré.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" />
                Essayer gratuitement
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm"
              >
                <FileText className="w-5 h-5 text-slate-500" />
                Voir un exemple
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-600 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>14 jours offerts</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 max-w-md mx-auto rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                {/* Mockup Header */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
                  </div>
                  <div className="text-xs font-bold text-slate-500">Devis #2024-001</div>
                </div>
                {/* Mockup Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="h-4 w-32 bg-slate-300 rounded mb-2" />
                      <div className="h-3 w-24 bg-slate-200 rounded" />
                    </div>
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                      <span className="text-blue-700 font-bold">A</span>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <div className="h-8 w-8 bg-blue-50 rounded flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                          {i}
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                          <div className="h-2 w-2/3 bg-slate-100 rounded" />
                        </div>
                        <div className="h-4 w-16 bg-slate-300 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex justify-end border-t border-slate-200 mt-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-1 font-medium">Total TTC</div>
                      <div className="text-2xl font-bold text-slate-900">1 850,00 €</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Devis envoyé !</div>
                  <div className="text-xs text-slate-500 font-medium">à l'instant</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
