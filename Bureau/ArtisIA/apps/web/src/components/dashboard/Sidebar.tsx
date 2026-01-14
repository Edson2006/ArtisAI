"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Hammer,
  CreditCard,
  Briefcase
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mes Devis", href: "/dashboard/quotes", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Mon Entreprise", href: "/dashboard/profile", icon: Briefcase },
  { name: "Abonnement", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Réglages", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Hammer className="w-5 h-5 text-white" />
        </div>
        <span className="font-display text-xl font-bold text-white tracking-tight">ArtisIA</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
