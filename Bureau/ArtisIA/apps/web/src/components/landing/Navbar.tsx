"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Hammer, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Fonctionnalités", href: "/features" },
    { name: "Tarifs", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/30 transition-all duration-300">
              <Hammer className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-slate-900 tracking-tight">ArtisIA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  isActive(link.href) ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                )}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              <Link 
                href="/login"
                className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
        >
          <div className="p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-sm font-medium py-2",
                  isActive(link.href) ? "text-blue-600 bg-blue-50 px-3 rounded-lg" : "text-slate-600 px-3"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            <Link 
              href="/login" 
              className="block text-sm font-medium text-slate-900 py-2 px-3"
              onClick={() => setIsOpen(false)}
            >
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="block w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-medium"
              onClick={() => setIsOpen(false)}
            >
              Commencer gratuitement
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
