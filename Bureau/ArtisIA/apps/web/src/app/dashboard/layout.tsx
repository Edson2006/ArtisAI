"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="p-8">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" />
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}
