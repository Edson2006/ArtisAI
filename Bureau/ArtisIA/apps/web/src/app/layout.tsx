import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtisIA - Vos devis en 30 secondes",
  description: "L'IA au service des artisans du bâtiment.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased text-slate-900 bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
