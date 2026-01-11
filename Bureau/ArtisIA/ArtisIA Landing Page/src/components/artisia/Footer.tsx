import React from 'react';
import { Wrench, Sparkles, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-[#2563EB]">
                <Wrench className="w-6 h-6" />
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[24px] font-bold">ArtisIA</span>
            </div>
            <p className="text-[16px] text-gray-400 mb-6 max-w-[300px]">
              L'assistant IA qui gère vos devis pendant que vous travaillez. 
              Conçu par des artisans, pour des artisans.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/company/artisia" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-[#2563EB] rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@artisia.fr"
                className="w-10 h-10 bg-gray-700 hover:bg-[#2563EB] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Product */}
          <div>
            <h4 className="text-[16px] font-bold mb-4">Produit</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#fonctionnalités')}
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  Fonctionnalités
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#tarifs')}
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  Tarifs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#témoignages')}
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  Témoignages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#faq')}
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Legal */}
          <div>
            <h4 className="text-[16px] font-bold mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-[14px] text-gray-400">
                  Mentions légales
                </span>
              </li>
              <li>
                <span className="text-[14px] text-gray-400">
                  CGU
                </span>
              </li>
              <li>
                <span className="text-[14px] text-gray-400">
                  Politique de confidentialité
                </span>
              </li>
              <li>
                <span className="text-[14px] text-gray-400">
                  RGPD
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-gray-400">
            © {currentYear} ArtisIA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-[14px] text-gray-400">
            <span className="inline-block w-2 h-2 bg-[#16A34A] rounded-full"></span>
            Hébergé en France 🇫🇷
          </div>
        </div>
      </div>
    </footer>
  );
}
