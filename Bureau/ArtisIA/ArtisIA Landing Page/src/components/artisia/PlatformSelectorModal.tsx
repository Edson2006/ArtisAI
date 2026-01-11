import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface PlatformSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMobile: () => void;
  onSelectWeb: () => void;
}

export function PlatformSelectorModal({ 
  isOpen, 
  onClose, 
  onSelectMobile, 
  onSelectWeb 
}: PlatformSelectorModalProps) {
  
  // Handle ESC key and body scroll - MUST be before any conditional return
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 200ms ease-out' }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-[600px] md:max-w-[800px] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
        style={{ animation: 'scaleIn 300ms ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[48px] mb-4">🎯</div>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#1E293B] mb-2">
            Comment voulez-vous tester ArtisIA ?
          </h2>
          <p className="text-[15px] text-[#64748B]">
            Choisissez votre plateforme préférée
          </p>
        </div>
        
        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Mobile Card */}
          <button
            onClick={onSelectMobile}
            className="group bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 md:p-8 hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-lg transition-all text-left"
          >
            <div className="flex justify-center mb-5">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[32px]"
                style={{ background: 'linear-gradient(to bottom right, #2563EB, #1d4ed8)', color: 'white' }}
              >
                📱
              </div>
            </div>
            
            <h3 className="text-[20px] font-bold text-[#1E293B] mb-2 text-center">
              Version Mobile
            </h3>
            
            <p className="text-[14px] text-[#64748B] mb-5 text-center">
              Comme sur votre smartphone
            </p>
            
            <ul className="space-y-2 mb-5">
              {['Interface tactile', 'Dictée vocale', 'Notifications'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-[#1E293B]">
                  <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="w-full h-11 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
              Tester sur Mobile
            </div>
          </button>
          
          {/* Web Card */}
          <button
            onClick={onSelectWeb}
            className="group bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 md:p-8 hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-lg transition-all text-left"
          >
            <div className="flex justify-center mb-5">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[32px]"
                style={{ background: 'linear-gradient(to bottom right, #10B981, #059669)', color: 'white' }}
              >
                💻
              </div>
            </div>
            
            <h3 className="text-[20px] font-bold text-[#1E293B] mb-2 text-center">
              Version Web
            </h3>
            
            <p className="text-[14px] text-[#64748B] mb-5 text-center">
              Interface desktop complète
            </p>
            
            <ul className="space-y-2 mb-5">
              {['Vue étendue', 'Multi-onglets', 'Raccourcis clavier'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-[#1E293B]">
                  <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="w-full h-11 border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold text-[14px] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              Tester sur Web
            </div>
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}}></style>
    </div>
  );
}