"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { createQuote, updateQuote } from "@/utils/firebase/quotes";
import { saveOrUpdateClient } from "@/utils/firebase/clients";
import { getCompanyProfile, CompanyData } from "@/utils/firebase/firestore";
import { getUserSettings } from "@/utils/firebase/settings";
import { QuoteItem, QuoteStatus, Quote } from "@/types/quote";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2, Calculator, FileDown, Wand2 } from "lucide-react";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";
import { QuotePDF } from "./QuotePDF";
import { AIChatAssistant } from "./AIChatAssistant";
import { saveAs } from "file-saver";
import { urlToBase64 } from "@/utils/image";

interface QuoteEditorProps {
  initialQuote?: Quote;
}

export function QuoteEditor({ initialQuote }: QuoteEditorProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "ai">("editor");

  // Quote Details
  const [clientName, setClientName] = useState(initialQuote?.clientName || "");
  const [clientEmail, setClientEmail] = useState(initialQuote?.clientEmail || "");
  const [clientAddress, setClientAddress] = useState(initialQuote?.clientAddress || "");
  const [number, setNumber] = useState(initialQuote?.number || ""); // Will be set by settings if empty
  
  // Items
  const [items, setItems] = useState<QuoteItem[]>(
    initialQuote?.items || [{ id: crypto.randomUUID(), description: "", quantity: 1, unit: "u", unitPrice: 0, total: 0 }]
  );



  // Calculations
  const [taxRate, setTaxRate] = useState(initialQuote?.taxRate || 20);

  useEffect(() => {
    const initData = async () => {
      if (user) {
        // Load Company Profile
        const profile = await getCompanyProfile(user.uid);
        setCompany(profile);

        // Load Settings if creating new quote
        if (!initialQuote) {
          const settings = await getUserSettings(user.uid);
          
          // Apply default tax rate from settings
          setTaxRate(settings.defaultTaxRate);
          
          // Generate number with prefix
          const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
          const year = new Date().getFullYear();
          setNumber(`${settings.quotePrefix}${year}-${randomNum}`);
        }
      }
    };
    initData();
  }, [user, initialQuote]);

  // Fallback for number if settings fail or take too long
  useEffect(() => {
    if (!number && !initialQuote) {
      setNumber(`DEV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
    }
  }, [number, initialQuote]);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleItemChange = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updates = { [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          const qty = field === "quantity" ? Number(value) : item.quantity;
          const price = field === "unitPrice" ? Number(value) : item.unitPrice;
          updates.total = qty * price;
        }
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), description: "", quantity: 1, unit: "u", unitPrice: 0, total: 0 }]);
  };

  const handleInjectItems = (newItems: QuoteItem[], newClientName?: string, newClientAddress?: string) => {
    setItems(prev => [...prev, ...newItems]);
    if (newClientName) setClientName(newClientName);
    if (newClientAddress) setClientAddress(newClientAddress);
    setActiveTab("editor");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = async (status: QuoteStatus) => {
    if (!user) return;
    if (!clientName) {
      toast.error("Le nom du client est requis");
      return;
    }

    setIsSaving(true);
    try {
      const quoteData = {
        number,
        clientName,
        clientEmail,
        clientAddress,
        items,
        subtotal,
        taxRate,
        taxAmount,
        total,
        status,
      };

      if (initialQuote) {
        await updateQuote(initialQuote.id, quoteData);
        toast.success("Devis mis à jour !");
      } else {
        await createQuote(user.uid, quoteData);
        toast.success("Devis créé !");
      }

      await saveOrUpdateClient(user.uid, {
        name: clientName,
        email: clientEmail,
        address: clientAddress
      }, total);

      if (status === 'sent' && company) {
        // Prepare company data with Base64 logo for PDF
        let pdfCompany = { ...company };
        if (company.logoUrl) {
          try {
            const base64Logo = await urlToBase64(company.logoUrl);
            pdfCompany = { ...company, logoUrl: base64Logo };
          } catch (e) {
            console.warn("Failed to convert logo to base64", e);
          }
        }

        const fullQuote: Quote = {
          id: initialQuote?.id || "temp",
          userId: user.uid,
          createdAt: initialQuote?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...quoteData
        };

        const blob = await pdf(<QuotePDF quote={fullQuote} company={pdfCompany} />).toBlob();
        saveAs(blob, `Devis-${number}.pdf`);
      }

      router.push("/dashboard/quotes");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Editor */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Client Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900">Informations Client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Client / Entreprise</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="Nom du client"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Numéro de Devis</label>
              <input 
                type="text" 
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-500 uppercase">Adresse</label>
              <input 
                type="text" 
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="12 rue de la Paix, 75000 Paris (Adresse, CP, Ville)"
              />
            </div>
          </div>
        </div>





        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("editor")}
            className={cn(
              "px-4 py-2 font-medium text-sm transition-colors relative",
              activeTab === "editor" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Éditeur
            {activeTab === "editor" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={cn(
              "px-4 py-2 font-medium text-sm transition-colors relative flex items-center gap-2",
              activeTab === "ai" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Wand2 className="w-4 h-4" />
            Assistant IA
            {activeTab === "ai" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
          </button>
        </div>

        {activeTab === "ai" ? (
          <AIChatAssistant onInjectItems={handleInjectItems} />
        ) : (
          /* Items Table */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-[40%]">Description</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-20">Qté</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-20">Unité</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-32">Prix Unit.</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-32 text-right">Total</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50">
                    <td className="p-2">
                      <input 
                        type="text" 
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        className="w-full p-2 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="Description"
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                        className="w-full p-2 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="text" 
                        value={item.unit || ""}
                        onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                        className="w-full p-2 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-center"
                        placeholder="u"
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, "unitPrice", Number(e.target.value))}
                        className="w-full p-2 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </td>
                    <td className="p-4 text-right font-medium text-slate-700">
                      {item.total.toFixed(2)} €
                    </td>
                    <td className="p-2 text-center">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              onClick={addItem}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors border-t border-slate-100"
            >
              <Plus className="w-4 h-4" />
              Ajouter une ligne
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Summary & Actions */}
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Récapitulatif
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Total HT</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>TVA ({taxRate}%)</span>
              <span>{taxAmount.toFixed(2)} €</span>
            </div>
            <div className="pt-4 border-t border-slate-700 flex justify-between items-end">
              <span className="font-bold text-lg">Total TTC</span>
              <span className="font-bold text-2xl text-blue-400">{total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Enregistrer brouillon
            </button>
            <button 
              onClick={() => handleSave("sent")}
              disabled={isSaving}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20"
            >
              Valider et Générer PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
