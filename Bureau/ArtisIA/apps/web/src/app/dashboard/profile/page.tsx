"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { getCompanyProfile, updateCompanyProfile } from "@/utils/firebase/firestore";
import { uploadLogo } from "@/utils/firebase/storage";
import { Loader2, Save, Upload, Building2, MapPin, Phone, Mail, FileText, CheckCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const companySchema = z.object({
  name: z.string().min(2, "Le nom de l'entreprise est requis"),
  legalForm: z.string().min(1, "La forme juridique est requise"),
  siret: z.string().regex(/^\d{14}$/, "Le SIRET doit contenir 14 chiffres"),
  tvaNumber: z.string().optional(),
  address: z.string().min(5, "L'adresse complète est requise"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      legalForm: "SAS",
      siret: "",
      tvaNumber: "",
      address: "",
      phone: "",
      email: user?.email || "",
      website: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          const profile = await getCompanyProfile(user.uid);
          if (profile) {
            form.reset({
              name: profile.name,
              legalForm: profile.legalForm,
              siret: profile.siret,
              tvaNumber: profile.tvaNumber || "",
              address: profile.address,
              phone: profile.phone,
              email: profile.email,
              website: profile.website || "",
            });
            setLogoUrl(profile.logoUrl || null);
          }
        } catch (error) {
          console.error("Error loading profile:", error);
          toast.error("Erreur lors du chargement du profil");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadProfile();
  }, [user, form]);

  const onSubmit = async (data: CompanyFormValues) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateCompanyProfile(user.uid, {
        ...data,
        logoUrl: logoUrl || undefined,
      });
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error("L'image est trop lourde (max 2Mo)");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadLogo(user.uid, file);
      setLogoUrl(url);
      toast.success("Logo téléchargé !");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Erreur lors du téléchargement du logo");
    } finally {
      setIsUploading(false);
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Mon Entreprise</h1>
        <p className="text-slate-500 mt-1">Gérez vos informations légales et votre image de marque.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Logo & Branding */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4">Logo & Identité</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden mb-4 group hover:border-blue-500 transition-colors">
                {logoUrl ? (
                  <Image src={logoUrl} alt="Logo entreprise" fill className="object-contain p-2" />
                ) : (
                  <Building2 className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              
              <label className="cursor-pointer bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Modifier le logo
                <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleLogoUpload} />
              </label>
              <p className="text-xs text-slate-400 mt-2 text-center">
                PNG, JPG jusqu'à 2Mo.<br/>Fond transparent recommandé.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 text-sm">Pourquoi ces infos ?</h3>
                <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                  Ces informations apparaîtront automatiquement sur tous vos devis générés. Elles sont obligatoires pour que vos documents soient légaux.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nom de l'entreprise</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...form.register("name")}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="Maçonnerie Durand"
                  />
                </div>
                {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Forme Juridique</label>
                <select
                  {...form.register("legalForm")}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="EI">Entreprise Individuelle (EI)</option>
                  <option value="EURL">EURL</option>
                  <option value="SARL">SARL</option>
                  <option value="SAS">SAS</option>
                  <option value="SASU">SASU</option>
                  <option value="SA">SA</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Numéro SIRET</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...form.register("siret")}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="123 456 789 00012"
                  />
                </div>
                {form.formState.errors.siret && <p className="text-xs text-red-500">{form.formState.errors.siret.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Numéro de TVA (Optionnel)</label>
                <input
                  {...form.register("tvaNumber")}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="FR 12 345678900"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Adresse du siège</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    {...form.register("address")}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="12 rue des Artisans, 75000 Paris"
                  />
                </div>
                {form.formState.errors.address && <p className="text-xs text-red-500">{form.formState.errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...form.register("phone")}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email de contact</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...form.register("email")}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="contact@entreprise.com"
                  />
                </div>
                {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
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
