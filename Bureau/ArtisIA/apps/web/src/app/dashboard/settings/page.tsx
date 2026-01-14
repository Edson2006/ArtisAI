"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import { getUserSettings, updateUserSettings } from "@/utils/firebase/settings";
import { UserSettings, defaultSettings } from "@/types/settings";
import { 
  Settings, 
  FileText, 
  Bell, 
  Shield, 
  Save, 
  Moon, 
  Sun, 
  Monitor,
  Loader2
} from "lucide-react";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";

const tabs = [
  { id: "quotes", label: "Devis & Facturation", icon: FileText },
  { id: "general", label: "Général", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Sécurité", icon: Shield },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { refreshSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("quotes");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<UserSettings>({
    defaultValues: {
      userId: "",
      ...defaultSettings
    }
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (user) {
        try {
          const settings = await getUserSettings(user.uid);
          form.reset(settings);
        } catch (error) {
          console.error("Error loading settings:", error);
          toast.error("Erreur lors du chargement des réglages");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadSettings();
  }, [user, form]);

  const onSubmit = async (data: UserSettings) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateUserSettings(user.uid, data);
      await refreshSettings(); // Apply new settings immediately (theme, etc.)
      toast.success("Réglages enregistrés avec succès !");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Réglages</h1>
        <p className="text-slate-500 mt-1">Personnalisez votre expérience et vos préférences de facturation.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                )}
              >
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-blue-600" : "text-slate-400")} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
            
            {/* --- QUOTES & BILLING TAB --- */}
            {activeTab === "quotes" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Devis & Facturation</h2>
                  <p className="text-sm text-slate-500">Configurez les valeurs par défaut de vos documents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default VAT */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">TVA par défaut</label>
                    <select 
                      {...form.register("defaultTaxRate", { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="20">20% (Standard)</option>
                      <option value="10">10% (Intermédiaire)</option>
                      <option value="5.5">5.5% (Réduit)</option>
                      <option value="0">0% (Auto-entrepreneur / Franchise en base)</option>
                    </select>
                    <p className="text-xs text-slate-500">Sera appliqué automatiquement aux nouveaux devis.</p>
                  </div>

                  {/* Validity Period */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Validité des devis</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        {...form.register("defaultValidityDays", { valueAsNumber: true })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">jours</span>
                    </div>
                  </div>

                  {/* Quote Prefix */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Préfixe de numérotation</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        {...form.register("quotePrefix")}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono"
                      />
                      <div className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono text-sm flex items-center">
                        2024-001
                      </div>
                    </div>
                  </div>

                  {/* Legal Mentions */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-medium text-slate-700">Mentions légales (Pied de page)</label>
                    <textarea 
                      rows={4}
                      {...form.register("defaultLegalMentions")}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Ex: Acompte de 30% à la signature. Solde à la réception."
                    />
                    <p className="text-xs text-slate-500">Ce texte apparaîtra en bas de tous vos PDF.</p>
                  </div>
                </div>
              </div>
            )}

            {/* --- GENERAL TAB --- */}
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Préférences Générales</h2>
                  <p className="text-sm text-slate-500">Personnalisez l'interface d'ArtisIA.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Thème de l'interface</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        type="button"
                        onClick={() => form.setValue("theme", "light")}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          form.watch("theme") === "light" 
                            ? "border-blue-600 bg-blue-50 text-blue-700" 
                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                        )}
                      >
                        <Sun className="w-6 h-6" />
                        <span className="text-sm font-bold">Clair</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => form.setValue("theme", "dark")}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          form.watch("theme") === "dark" 
                            ? "border-blue-600 bg-blue-50 text-blue-700" 
                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                        )}
                      >
                        <Moon className="w-6 h-6" />
                        <span className="text-sm font-medium">Sombre</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => form.setValue("theme", "system")}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          form.watch("theme") === "system" 
                            ? "border-blue-600 bg-blue-50 text-blue-700" 
                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                        )}
                      >
                        <Monitor className="w-6 h-6" />
                        <span className="text-sm font-medium">Système</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Langue</label>
                    <select 
                      {...form.register("language")}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === "notifications" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Notifications</h2>
                  <p className="text-sm text-slate-500">Gérez les emails que vous recevez.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: "emailOnQuoteCreated", title: "Confirmation de devis", desc: "Recevoir une copie quand je crée un devis" },
                    { id: "emailOnQuoteAccepted", title: "Devis accepté", desc: "Être notifié quand un client valide un devis" },
                    { id: "weeklyReport", title: "Rapport hebdomadaire", desc: "Recevoir un résumé de mon activité chaque lundi" },
                    { id: "productUpdates", title: "Nouveautés produit", desc: "Être informé des nouvelles fonctionnalités ArtisIA" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          {...form.register(`notifications.${item.id}` as any)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SECURITY TAB --- */}
            {activeTab === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Sécurité</h2>
                  <p className="text-sm text-slate-500">Protégez votre compte et vos données.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Changer de mot de passe</label>
                    <div className="space-y-3">
                      <input 
                        type="password" 
                        placeholder="Mot de passe actuel"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                      <input 
                        type="password" 
                        placeholder="Nouveau mot de passe"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                      <input 
                        type="password" 
                        placeholder="Confirmer le nouveau mot de passe"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <button type="button" className="text-sm font-bold text-blue-600 hover:underline">Mettre à jour le mot de passe</button>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-red-600 mb-2">Zone de danger</h4>
                    <p className="text-sm text-slate-500 mb-4">La suppression de votre compte est irréversible. Toutes vos données seront effacées.</p>
                    <button type="button" className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors text-sm">
                      Supprimer mon compte
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
              <button 
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les réglages
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
