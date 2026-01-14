"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Hammer, ArrowLeft } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Column: Form */}
      <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10 bg-white">
        {/* Header with Back Link */}
        <div className="py-6 flex-none">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex flex-col justify-center pb-12">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-10">
              <Link href="/" className="inline-flex items-center gap-2 group mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-2xl font-bold text-slate-900 tracking-tight">ArtisIA</span>
              </Link>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">{title}</h2>
              <p className="text-slate-600">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>
      </div>

      {/* Right Column: Visual */}
      <div className="hidden lg:block relative bg-slate-50">
        <Image
          src="/auth/office.png"
          alt="Espace de travail moderne"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <blockquote className="font-display text-2xl font-medium mb-4">
              "ArtisIA a changé ma vie. Je passe enfin mes soirées en famille au lieu de faire des devis."
            </blockquote>
            <cite className="not-italic text-slate-300 font-medium">
              — Thomas D., Électricien à Lyon
            </cite>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
