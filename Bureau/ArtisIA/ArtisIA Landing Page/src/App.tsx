import React from 'react';
import { Mail, DollarSign, FileText, Rocket, Check, Star, Shield, Clock, Zap, ArrowRight, Phone, Users, ChevronRight } from 'lucide-react';
import { Navigation } from './components/artisia/Navigation';
import { Button } from './components/artisia/Button';
import { FeatureCard } from './components/artisia/FeatureCard';
import { FAQItem } from './components/artisia/FAQItem';
import { SectionContainer } from './components/artisia/SectionContainer';
import { Footer } from './components/artisia/Footer';
import { PlatformSelectorModal } from './components/artisia/PlatformSelectorModal';
import { MobileDemoView } from './components/artisia/MobileDemoView';
import { WebDemoView } from './components/artisia/WebDemoView';

type ViewMode = 'landing' | 'platform-selector' | 'mobile-demo' | 'web-demo';

// Testimonial images
const testimonials = [
  {
    name: "Philippe Dubois",
    role: "Électricien",
    company: "Électricité Dubois",
    location: "Lyon",
    image: "/electricien.png",
    quote: "Je passais 2h par soir sur mes devis. Maintenant c'est 10 minutes. Ma femme me dit merci !",
    savings: "8h/semaine économisées"
  },
  {
    name: "Jean-Marc Fontaine",
    role: "Plombier-Chauffagiste",
    company: "France Plomberie",
    location: "Marseille",
    image: "/plombier.png",
    quote: "L'IA comprend vraiment notre métier. Elle sait que raccord PER ≠ cuivre. Bluffant.",
    savings: "12h/semaine économisées"
  },
  {
    name: "Thomas Moreau",
    role: "Peintre en bâtiment",
    company: "Moreau & Fils",
    location: "Bordeaux",
    image: "/peintre.png",
    quote: "Mes clients reçoivent le devis avant que je quitte leur maison. Ça change tout.",
    savings: "15 devis/semaine en plus"
  }
];

export default function App() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('landing');

  const handleOpenPlatformSelector = () => setViewMode('platform-selector');
  const handleClosePlatformSelector = () => setViewMode('landing');
  const handleSelectMobile = () => setViewMode('mobile-demo');
  const handleSelectWeb = () => setViewMode('web-demo');
  const handleBackToLanding = () => setViewMode('landing');
  const handleChangePlatform = () => setViewMode('platform-selector');

  // Show demo views
  if (viewMode === 'mobile-demo') {
    return (
      <MobileDemoView 
        onBack={handleBackToLanding}
        onChangePlatform={handleChangePlatform}
      />
    );
  }

  if (viewMode === 'web-demo') {
    return (
      <WebDemoView 
        onBack={handleBackToLanding}
        onChangePlatform={handleChangePlatform}
      />
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-white">
      <Navigation onTryFree={handleOpenPlatformSelector} />
      
      {/* HERO SECTION */}
      <section className="min-h-screen pt-20 bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20 relative z-10">
          {/* Promo Banner */}
          <div className="flex justify-center mb-8">
            <div 
              className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-[14px] font-semibold shadow-lg"
              style={{ background: 'linear-gradient(to right, #F59E0B, #D97706)' }}
            >
              <Zap className="w-4 h-4" />
              🔥 Offre de lancement : -50% pendant 3 mois
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[12px] font-bold text-[#2563EB] uppercase tracking-wide mb-6 bg-[#EFF6FF] px-3 py-1.5 rounded-full w-fit">
                <Users className="w-4 h-4" />
                POUR ARTISANS DU BÂTIMENT
              </div>
              
              <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1E293B] leading-[1.1] mb-6">
                Récupérez vos soirées.
                <br />
                <span className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] bg-clip-text text-transparent">
                  Vos devis en 30 secondes.
                </span>
              </h1>
              
              <p className="text-[18px] md:text-[20px] text-[#64748B] leading-relaxed mb-8">
                Fini les 2h par soir sur Excel. Transférez un email ou dictez, 
                ArtisIA génère le devis PDF avec vos prix. <strong>C'est tout.</strong>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleOpenPlatformSelector}
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#2563EB] text-white px-8 h-14 rounded-xl font-semibold text-[16px] shadow-[0_8px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Rocket className="w-5 h-5" />
                  Essayer Gratuitement
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleOpenPlatformSelector}
                  className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-semibold text-[16px] text-[#1E293B] border-2 border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
                >
                  Voir la Démo
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 text-[14px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>14 jours gratuits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Sans carte bancaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Annulation en 1 clic</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Mockup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[380px] aspect-[9/16] bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[40px] shadow-2xl p-3 transform hover:scale-[1.02] transition-transform">
                {/* Phone notch */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
                  <div className="bg-[#2563EB] p-4 pt-8">
                    <div className="text-[18px] font-bold text-white">ArtisIA</div>
                    <div className="text-[13px] text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse"></span>
                      Prêt à vous aider
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-4 bg-[#F8FAFC]">
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[85%]">
                      <p className="text-[13px] text-[#1E293B] font-medium">📧 Email reçu de Mme Martin :</p>
                      <p className="text-[12px] text-[#64748B] mt-1">"Bonjour, je souhaite un devis pour refaire l'électricité de ma cuisine..."</p>
                    </div>
                    <div className="bg-[#2563EB] text-white rounded-2xl rounded-tr-none p-4 max-w-[85%] ml-auto shadow-sm">
                      <p className="text-[13px]">✅ Devis généré !</p>
                      <p className="text-[12px] opacity-90 mt-1">Installation tableau + 8 prises = 1,850€</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#16A34A]">
                      <div className="flex items-center gap-2 text-[#16A34A] font-semibold text-[13px]">
                        <Check className="w-4 h-4" />
                        PDF prêt à envoyer
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -right-4 top-[25%] bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[12px] font-bold text-[#1E293B]">30 sec</span>
                </div>
                <div className="absolute -left-4 bottom-[35%] bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#16A34A]" />
                  <span className="text-[12px] font-bold text-[#1E293B]">1,850€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SOCIAL PROOF - Stats */}
      <section className="bg-[#1E293B] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[36px] md:text-[48px] font-bold text-white mb-2">500+</div>
              <div className="text-[14px] text-gray-400">Artisans actifs</div>
            </div>
            <div>
              <div className="text-[36px] md:text-[48px] font-bold text-white mb-2">12,450</div>
              <div className="text-[14px] text-gray-400">Devis générés</div>
            </div>
            <div>
              <div className="text-[36px] md:text-[48px] font-bold text-white mb-2">10h</div>
              <div className="text-[14px] text-gray-400">Économisées/semaine</div>
            </div>
            <div>
              <div className="text-[36px] md:text-[48px] font-bold text-[#16A34A] mb-2">4.9★</div>
              <div className="text-[14px] text-gray-400">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* PROBLEM SECTION */}
      <SectionContainer background="white" padding="large">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#DC2626] uppercase tracking-wide mb-4 bg-[#FEE2E2] px-4 py-2 rounded-full">
            😤 LE PROBLÈME
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Vos soirées appartiennent à Excel
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#64748B] max-w-[700px] mx-auto">
            Après 8h de chantier, vous méritez mieux que ça.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FEF2F2] rounded-2xl p-8 text-center border border-[#FECACA]">
            <div className="text-[56px] mb-4">📧</div>
            <h3 className="text-[20px] font-bold text-[#1E293B] mb-3">Décrypter les emails</h3>
            <p className="text-[16px] text-[#64748B] leading-relaxed">
              "Je voudrais un devis pour euh... refaire un truc dans la salle de bain"
            </p>
          </div>
          
          <div className="bg-[#FEF2F2] rounded-2xl p-8 text-center border border-[#FECACA]">
            <div className="text-[56px] mb-4">📊</div>
            <h3 className="text-[20px] font-bold text-[#1E293B] mb-3">Chercher les prix</h3>
            <p className="text-[16px] text-[#64748B] leading-relaxed">
              "C'était combien déjà le robinet thermostatique Grohe ?"
            </p>
          </div>
          
          <div className="bg-[#FEF2F2] rounded-2xl p-8 text-center border border-[#FECACA]">
            <div className="text-[56px] mb-4">⏰</div>
            <h3 className="text-[20px] font-bold text-[#1E293B] mb-3">Taper le devis</h3>
            <p className="text-[16px] text-[#64748B] leading-relaxed">
              2h par soir. Pendant que la famille vous attend.
            </p>
          </div>
        </div>
      </SectionContainer>
      
      {/* SOLUTION SECTION */}
      <SectionContainer background="gradient" padding="large">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#16A34A] uppercase tracking-wide mb-4 bg-[#DCFCE7] px-4 py-2 rounded-full">
            ✨ LA SOLUTION
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Transférez. Validez. C'est envoyé.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#64748B] max-w-[700px] mx-auto">
            30 secondes au lieu de 2 heures.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div 
            className="hidden md:block absolute top-16 left-[20%] right-[20%] h-1 rounded-full"
            style={{ background: 'linear-gradient(to right, #2563EB, #16A34A, #2563EB)' }}
          ></div>
          
          <div className="text-center relative">
            <div 
              className="w-20 h-20 text-white rounded-2xl flex items-center justify-center text-[32px] font-bold mx-auto mb-6 shadow-lg relative z-10"
              style={{ background: 'linear-gradient(to bottom right, #2563EB, #1d4ed8)' }}
            >
              1
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-[48px] mb-4">📩</div>
              <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">Transférez l'email</h3>
              <p className="text-[15px] text-[#64748B]">Ou dictez en conduisant</p>
            </div>
          </div>
          
          <div className="text-center relative">
            <div 
              className="w-20 h-20 text-white rounded-2xl flex items-center justify-center text-[32px] font-bold mx-auto mb-6 shadow-lg relative z-10"
              style={{ background: 'linear-gradient(to bottom right, #16A34A, #15803d)' }}
            >
              2
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-[48px] mb-4">🤖</div>
              <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">L'IA analyse tout</h3>
              <p className="text-[15px] text-[#64748B]">Prix, quantités, délais</p>
            </div>
          </div>
          
          <div className="text-center relative">
            <div 
              className="w-20 h-20 text-white rounded-2xl flex items-center justify-center text-[32px] font-bold mx-auto mb-6 shadow-lg relative z-10"
              style={{ background: 'linear-gradient(to bottom right, #2563EB, #1d4ed8)' }}
            >
              3
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-[48px] mb-4">✅</div>
              <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">Validez et envoyez</h3>
              <p className="text-[15px] text-[#64748B]">PDF pro avec votre logo</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button size="large" onClick={handleOpenPlatformSelector}>
            Essayer Gratuitement
          </Button>
        </div>
      </SectionContainer>
      
      {/* TESTIMONIALS */}
      <SectionContainer background="white" padding="large" id="témoignages">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#F59E0B] uppercase tracking-wide mb-4 bg-[#FEF3C7] px-4 py-2 rounded-full">
            ⭐ TÉMOIGNAGES
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Ils ont récupéré leurs soirées
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-[16px] text-[#1E293B] leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[#1E293B]">{testimonial.name}</div>
                  <div className="text-[14px] text-[#64748B]">{testimonial.role} • {testimonial.location}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  {testimonial.savings}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
      
      {/* FEATURES */}
      <SectionContainer background="gray" padding="large" id="fonctionnalités">
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Tout ce qu'il vous faut. Rien de plus.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🤖"
            title="Devis en 30 secondes"
            description="Dictez ou transférez un mail. Le devis PDF est prêt avec vos prix et votre logo."
          />
          <FeatureCard 
            icon="📅"
            title="Agenda intégré"
            description="L'IA vérifie vos dispos et propose des créneaux. Plus de double-booking."
          />
          <FeatureCard 
            icon="💳"
            title="Factures auto"
            description="Transformez vos devis en factures. Relances automatiques des impayés."
          />
          <FeatureCard 
            icon="📊"
            title="Vos prix, votre catalogue"
            description="Importez vos tarifs ou laissez l'IA scraper Rexel et Cedeo."
          />
          <FeatureCard 
            icon="📧"
            title="Envoi multi-canal"
            description="Email, WhatsApp, SMS. Avec votre signature professionnelle."
          />
          <FeatureCard 
            icon="🔒"
            title="100% Français"
            description="Hébergé en France. RGPD compliant. Vos données restent les vôtres."
          />
        </div>
      </SectionContainer>
      
      {/* PRICING */}
      <SectionContainer background="white" padding="large" id="tarifs">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#2563EB] uppercase tracking-wide mb-4 bg-[#EFF6FF] px-4 py-2 rounded-full">
            💰 TARIFS SIMPLES
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Un prix. Tout inclus.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#64748B]">
            Pas de surprise. Pas de frais cachés.
          </p>
        </div>
        
        <div className="max-w-[500px] mx-auto">
          <div 
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom right, #1E293B, #0F172A)', color: 'white' }}
          >
            {/* Badge promo */}
            <div className="absolute top-4 right-4 bg-[#F59E0B] text-[#1E293B] text-[12px] font-bold px-3 py-1 rounded-full">
              -50% LANCEMENT
            </div>
            
            <div className="text-center mb-8">
              <div className="text-[16px] text-gray-300 mb-2" style={{ color: '#cbd5e1' }}>Tarif unique</div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-[24px] text-gray-400 line-through" style={{ color: '#94a3b8' }}>58€</span>
                <span className="text-[56px] font-bold text-white" style={{ color: 'white' }}>29€</span>
                <span className="text-[18px] text-gray-300" style={{ color: '#cbd5e1' }}>/mois</span>
              </div>
              <div className="text-[14px] mt-2" style={{ color: '#22C55E' }}>Économisez 348€/an</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "Devis illimités",
                "Factures illimitées",
                "Catalogue intelligent",
                "Envoi email/WhatsApp",
                "Support prioritaire",
                "Mises à jour gratuites"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#22C55E' }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span style={{ color: 'white' }}>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={handleOpenPlatformSelector}
              className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl font-semibold text-[16px] transition-colors flex items-center justify-center gap-2"
            >
              Commencer l'essai gratuit
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="text-center mt-4 text-[13px]" style={{ color: '#cbd5e1' }}>
              14 jours gratuits • Sans carte bancaire
            </div>
          </div>
          
          {/* Guarantee */}
          <div className="mt-6 flex items-center justify-center gap-3 text-[14px] text-[#64748B]">
            <Shield className="w-5 h-5 text-[#16A34A]" />
            <span>Garantie satisfait ou remboursé 30 jours</span>
          </div>
        </div>
      </SectionContainer>
      
      {/* FAQ */}
      <SectionContainer background="gray" padding="large" maxWidth="800px" id="faq">
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1E293B] mb-4">
            Questions fréquentes
          </h2>
        </div>
        
        <div className="space-y-4">
          <FAQItem 
            question="Ça marche sur mobile ?"
            answer="Oui ! Application iOS et Android + version web responsive. Dictez même en conduisant."
          />
          <FAQItem 
            question="Mes données sont-elles sécurisées ?"
            answer="100% hébergé en France. RGPD compliant. Backup quotidien. Vos données vous appartiennent."
          />
          <FAQItem 
            question="L'IA peut-elle se tromper ?"
            answer="Vous validez toujours avant envoi. L'IA propose, vous disposez. Jamais d'envoi automatique sans votre OK."
          />
          <FAQItem 
            question="Comment importer mes prix ?"
            answer="Uploadez un Excel, ou 5 anciens devis PDF. L'IA extrait automatiquement votre catalogue."
          />
          <FAQItem 
            question="Je peux annuler quand je veux ?"
            answer="Oui, sans engagement. Annulez en 1 clic depuis les paramètres. Exportez vos données à tout moment."
          />
          <FAQItem 
            question="Ça marche avec mon logiciel comptable ?"
            answer="Export CSV compatible Cegid, EBP, Sage, QuickBooks. API disponible sur demande."
          />
        </div>
      </SectionContainer>
      
      {/* FINAL CTA */}
      <section 
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(to bottom right, #2563EB, #1d4ed8)' }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-6">
            Prêt à récupérer vos soirées ?
          </h2>
          <p className="text-[18px] text-white/80 mb-8">
            Rejoignez 500+ artisans qui ont déjà transformé leur quotidien.
          </p>
          <button
            onClick={handleOpenPlatformSelector}
            className="inline-flex items-center justify-center gap-3 bg-white text-[#2563EB] px-8 h-14 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <Rocket className="w-5 h-5" />
            Essayer Gratuitement
          </button>
          <div className="mt-4 text-[14px] text-white/60">
            14 jours gratuits • Sans carte bancaire • Annulation en 1 clic
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Platform Selector Modal */}
      <PlatformSelectorModal 
        isOpen={viewMode === 'platform-selector'}
        onClose={handleClosePlatformSelector}
        onSelectMobile={handleSelectMobile}
        onSelectWeb={handleSelectWeb}
      />
    </div>
  );
}