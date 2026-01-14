"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuoteEditor } from "@/components/quotes/QuoteEditor";
import { getQuote } from "@/utils/firebase/quotes";
import { Quote } from "@/types/quote";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function EditQuotePage() {
  const params = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        if (typeof params.id === "string") {
          const data = await getQuote(params.id);
          if (data) {
            setQuote(data);
          } else {
            toast.error("Devis introuvable");
            router.push("/dashboard/quotes");
          }
        }
      } catch (error) {
        console.error("Error loading quote:", error);
        toast.error("Erreur lors du chargement du devis");
      } finally {
        setIsLoading(false);
      }
    };
    loadQuote();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Modifier le Devis</h1>
        <p className="text-slate-500 mt-1">Modifiez les informations et mettez à jour le statut.</p>
      </div>
      
      <QuoteEditor initialQuote={quote} />
    </div>
  );
}
