"use client";

import { QuoteEditor } from "@/components/quotes/QuoteEditor";

export default function CreateQuotePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Nouveau Devis</h1>
        <p className="text-slate-500 mt-1">Créez un devis manuellement ou utilisez l'IA pour gagner du temps.</p>
      </div>
      
      <QuoteEditor />
    </div>
  );
}
