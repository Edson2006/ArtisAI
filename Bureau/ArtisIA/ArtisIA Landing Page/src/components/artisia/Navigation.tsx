import React, { useState } from 'react';
import { Menu, X, Wrench, Sparkles } from 'lucide-react';
import { Button } from './Button';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { label: 'Fonctionnalités', href: '#fonctionnalités' },
    { label: 'Témoignages', href: '#témoignages' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'FAQ', href: '#faq' }
  ];
  
  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1 text-[#2563EB] group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[22px] font-bold text-[#1E293B]">ArtisIA</span>
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[15px] text-[#64748B] hover:text-[#2563EB] transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button size="medium">Essayer Gratuitement</Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-white z-40 lg:hidden" 
          style={{ top: '64px' }}
        >
          <div className="flex flex-col p-6 gap-2">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-[18px] text-[#1E293B] hover:text-[#2563EB] py-4 border-b border-[#E2E8F0] text-left font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <Button size="large" fullWidth>Essayer Gratuitement</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
