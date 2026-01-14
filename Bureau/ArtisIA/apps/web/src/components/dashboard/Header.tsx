"use client";

import { useState } from "react";
import { Search, Bell, User, LogOut, Settings, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function Header() {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications based on settings
  const notifications = [
    {
      id: 1,
      title: "Bienvenue sur ArtisIA",
      message: "Votre compte est configuré.",
      time: new Date(),
      read: true,
    },
    ...(settings?.notifications.weeklyReport
      ? [
          {
            id: 2,
            title: "Rapport Hebdomadaire",
            message: "Votre activité de la semaine est disponible.",
            time: new Date(Date.now() - 86400000),
            read: false,
          },
        ]
      : []),
    ...(settings?.notifications.productUpdates
      ? [
          {
            id: 3,
            title: "Nouveauté : Mode Sombre",
            message: "Essayez le nouveau thème sombre dans les réglages !",
            time: new Date(Date.now() - 172800000),
            read: false,
          },
        ]
      : []),
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        <Link
          href="/dashboard/settings"
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {user?.displayName || "Utilisateur"}
            </p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 overflow-hidden">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <button
            onClick={() => logout()}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            title="Se déconnecter"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
