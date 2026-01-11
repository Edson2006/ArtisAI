import React from "react";
import {
  ArrowLeft,
  Mic,
  Send,
  FileText,
  Check,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  Calendar,
  User,
  MessageSquare,
  Users,
  MoreHorizontal,
  Bell,
  Settings,
  Settings as SettingsIcon,
  CreditCard,
  HelpCircle,
  Globe,
  Moon,
  LogOut,
  Camera,
  BarChart3,
} from "lucide-react";

interface MobileDemoViewProps {
  onBack: () => void;
  onChangePlatform: () => void;
}

export function MobileDemoView({
  onBack,
  onChangePlatform,
}: MobileDemoViewProps) {
  const [currentScreen, setCurrentScreen] = React.useState(1);
  const [inputValue, setInputValue] = React.useState("");

  const totalScreens = 8;

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const restart = () => {
    setCurrentScreen(1);
  };

  // Auto-advance from splash screen
  React.useEffect(() => {
    if (currentScreen === 1) {
      const timer = setTimeout(() => {
        setCurrentScreen(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="fixed inset-0 bg-[#1E293B] z-50 flex flex-col">
      {/* Floating Control Buttons - Top Left */}
      <div className="absolute top-4 left-4 z-[60] flex items-center gap-2">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Control Buttons - Top Right */}
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-2">
        <span className="px-3 py-1.5 bg-[#2563EB] text-white text-[12px] font-semibold rounded-full shadow-lg">
          📱 iOS
        </span>
        <button
          onClick={onChangePlatform}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
          title="Changer de plateforme"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* iPhone Frame Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          className="relative"
          style={{ width: "390px", maxHeight: "90vh", aspectRatio: "390/844" }}
        >
          {/* iPhone Frame */}
          <div className="absolute inset-0 bg-black rounded-[55px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-3">
            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[45px] overflow-hidden flex flex-col relative">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50"></div>

              {/* Status Bar */}
              <div className="h-[44px] bg-transparent flex items-center justify-between px-8 pt-2 relative z-40">
                <span className="text-[15px] font-semibold">10:23</span>
                <div className="flex items-center gap-1">
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="11"
                      rx="2.5"
                      stroke="currentColor"
                    />
                    <path d="M17 4V8C17 8 17 6 17 6V4Z" fill="currentColor" />
                    <rect
                      x="2"
                      y="2"
                      width="12"
                      height="8"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-hidden">
                {/* SCREEN 1: SPLASH */}
                {currentScreen === 1 && (
                  <div className="h-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex flex-col items-center justify-center">
                    <div className="text-[64px] mb-4 animate-pulse">🔧</div>
                    <div className="text-[32px] font-bold text-white mb-2">
                      ArtisIA
                    </div>
                    <div className="text-[16px] text-white/80">
                      Votre assistant intelligent
                    </div>
                    <div className="mt-8 flex gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* SCREEN 2: ONBOARDING 1 */}
                {currentScreen === 2 && (
                  <div className="h-full bg-white flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-8">
                      <div className="text-[80px] mb-6">🎤</div>
                      <h2 className="text-[28px] font-bold text-[#1E293B] mb-4 text-center">
                        Dictez vos demandes
                      </h2>
                      <p className="text-[16px] text-[#64748B] text-center leading-relaxed">
                        En voiture, sur chantier, ou au bureau. Parlez
                        naturellement, ArtisIA comprend.
                      </p>
                    </div>
                    <div className="p-8 pb-12">
                      <div className="flex justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                      </div>
                      <button
                        onClick={nextScreen}
                        className="w-full h-14 bg-[#2563EB] text-white rounded-xl font-semibold text-[16px] active:scale-95 transition-transform"
                      >
                        Suivant
                      </button>
                      <button
                        onClick={() => setCurrentScreen(5)}
                        className="w-full h-12 text-[#64748B] text-[14px] font-semibold"
                      >
                        Passer
                      </button>
                    </div>
                  </div>
                )}

                {/* SCREEN 3: ONBOARDING 2 */}
                {currentScreen === 3 && (
                  <div className="h-full bg-white flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-8">
                      <div className="text-[80px] mb-6">⚡</div>
                      <h2 className="text-[28px] font-bold text-[#1E293B] mb-4 text-center">
                        Devis en 30 secondes
                      </h2>
                      <p className="text-[16px] text-[#64748B] text-center leading-relaxed">
                        L'IA cherche les prix dans votre catalogue et génère un
                        PDF professionnel.
                      </p>
                    </div>
                    <div className="p-8 pb-12">
                      <div className="flex justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                      </div>
                      <button
                        onClick={nextScreen}
                        className="w-full h-14 bg-[#2563EB] text-white rounded-xl font-semibold text-[16px] active:scale-95 transition-transform"
                      >
                        Suivant
                      </button>
                      <button
                        onClick={() => setCurrentScreen(5)}
                        className="w-full h-12 text-[#64748B] text-[14px] font-semibold"
                      >
                        Passer
                      </button>
                    </div>
                  </div>
                )}

                {/* SCREEN 4: ONBOARDING 3 */}
                {currentScreen === 4 && (
                  <div className="h-full bg-white flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-8">
                      <div className="text-[80px] mb-6">✅</div>
                      <h2 className="text-[28px] font-bold text-[#1E293B] mb-4 text-center">
                        Vous restez aux commandes
                      </h2>
                      <p className="text-[16px] text-[#64748B] text-center leading-relaxed">
                        Validez toujours avant envoi. L'IA propose, vous
                        décidez.
                      </p>
                    </div>
                    <div className="p-8 pb-12">
                      <div className="flex justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                      </div>
                      <button
                        onClick={nextScreen}
                        className="w-full h-14 bg-[#2563EB] text-white rounded-xl font-semibold text-[16px] active:scale-95 transition-transform"
                      >
                        Commencer
                      </button>
                    </div>
                  </div>
                )}

                {/* SCREEN 5: MAIN CHAT */}
                {currentScreen === 5 && (
                  <div className="h-full bg-white flex flex-col">
                    {/* Header */}
                    <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-full flex items-center justify-center text-white font-bold text-[16px]">
                          AI
                        </div>
                        <div>
                          <div className="text-[16px] font-bold text-[#1E293B]">
                            ArtisIA
                          </div>
                          <div className="text-[12px] text-[#64748B] flex items-center gap-1">
                            <span className="w-2 h-2 bg-[#16A34A] rounded-full"></span>
                            En ligne
                          </div>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <MoreHorizontal className="w-5 h-5 text-[#64748B]" />
                      </button>
                    </div>

                    {/* Messages - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                          <p className="text-[14px] text-[#1E293B] leading-relaxed">
                            Bonjour Pierre ! Comment puis-je vous aider
                            aujourd'hui ?
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#2563EB] text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                          <p className="text-[14px] leading-relaxed">
                            J'ai besoin d'un devis pour une installation
                            électrique complète, maison 120m²
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                          <p className="text-[14px] text-[#1E293B] leading-relaxed mb-2">
                            Parfait ! J'ai préparé le devis :
                          </p>
                        </div>
                      </div>

                      {/* Quote Card */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-[#2563EB] px-4 py-3 flex items-center justify-between">
                          <span className="text-white font-semibold text-[14px]">
                            📄 DEVIS #402
                          </span>
                          <span className="px-2 py-1 bg-[#F59E0B] text-white text-[12px] rounded-full font-semibold">
                            Brouillon
                          </span>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] font-bold">
                              JD
                            </div>
                            <div>
                              <div className="text-[15px] font-bold text-[#1E293B]">
                                Jean Dubois
                              </div>
                              <div className="text-[13px] text-[#64748B]">
                                Particulier • Paris 15e
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-[13px] mb-4">
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">
                                Tableau électrique
                              </span>
                              <span className="font-semibold text-[#1E293B]">
                                850€
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">
                                Câblage complet
                              </span>
                              <span className="font-semibold text-[#1E293B]">
                                2,400€
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">
                                Prises et interrupteurs
                              </span>
                              <span className="font-semibold text-[#1E293B]">
                                680€
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">
                                Main d'œuvre
                              </span>
                              <span className="font-semibold text-[#1E293B]">
                                1,200€
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-[#E2E8F0] pt-3 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-[15px] font-bold text-[#1E293B]">
                                Total HT
                              </span>
                              <span className="text-[22px] font-bold text-[#2563EB]">
                                5,130€
                              </span>
                            </div>
                          </div>

                          <button className="w-full h-11 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <FileText className="w-4 h-4" />
                            Voir le PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Input - Fixed at bottom */}
                    <div className="bg-white border-t border-[#E2E8F0] p-4 pb-6">
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                          <Mic className="w-5 h-5" />
                        </button>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Tapez un message..."
                          className="flex-1 h-10 px-4 bg-[#F8FAFC] rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                        <button className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="bg-white border-t border-[#E2E8F0] px-4 py-2 pb-6">
                      <div className="flex items-center justify-around">
                        <button className="flex flex-col items-center gap-1 text-[#2563EB]">
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-[11px] font-semibold">
                            Chat
                          </span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(6)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <FileText className="w-6 h-6" />
                          <span className="text-[11px]">Devis</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(7)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <Users className="w-6 h-6" />
                          <span className="text-[11px]">Clients</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(8)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <MoreHorizontal className="w-6 h-6" />
                          <span className="text-[11px]">Plus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 6: DEVIS LIST */}
                {currentScreen === 6 && (
                  <div className="h-full bg-white flex flex-col">
                    {/* Header */}
                    <div className="bg-white px-4 py-4 border-b border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-4">
                        <h1 className="text-[24px] font-bold text-[#1E293B]">
                          Mes Devis
                        </h1>
                        <button className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </div>
                    </div>

                    {/* List - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {[
                        {
                          num: "402",
                          client: "M. Dubois",
                          service: "Installation électrique",
                          amount: "5,130€",
                          status: "Brouillon",
                          color: "orange",
                          date: "10 Jan",
                        },
                        {
                          num: "401",
                          client: "Mme Martin",
                          service: "Réparation fuite",
                          amount: "180€",
                          status: "Envoyé",
                          color: "blue",
                          date: "9 Jan",
                        },
                        {
                          num: "400",
                          client: "Café Central",
                          service: "Mise aux normes",
                          amount: "8,400€",
                          status: "Accepté",
                          color: "green",
                          date: "8 Jan",
                        },
                        {
                          num: "399",
                          client: "M. Petit",
                          service: "Dépannage urgence",
                          amount: "320€",
                          status: "Payé",
                          color: "darkgreen",
                          date: "5 Jan",
                        },
                        {
                          num: "398",
                          client: "Mme Rousseau",
                          service: "Installation prises",
                          amount: "450€",
                          status: "Envoyé",
                          color: "blue",
                          date: "4 Jan",
                        },
                      ].map((devis) => (
                        <button
                          key={devis.num}
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl p-4 text-left hover:border-[#2563EB] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="text-[15px] font-bold text-[#1E293B] mb-1">
                                #{devis.num} - {devis.client}
                              </div>
                              <div className="text-[13px] text-[#64748B]">
                                {devis.service}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#64748B]" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[18px] font-bold text-[#2563EB]">
                              {devis.amount}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                                  devis.color === "orange"
                                    ? "bg-[#FEF3C7] text-[#F59E0B]"
                                    : devis.color === "blue"
                                    ? "bg-[#EFF6FF] text-[#2563EB]"
                                    : devis.color === "green"
                                    ? "bg-[#F0FDF4] text-[#16A34A]"
                                    : "bg-[#DCFCE7] text-[#15803D]"
                                }`}
                              >
                                {devis.status}
                              </span>
                              <span className="text-[12px] text-[#64748B]">
                                {devis.date}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="bg-white border-t border-[#E2E8F0] px-4 py-2 pb-6">
                      <div className="flex items-center justify-around">
                        <button
                          onClick={() => setCurrentScreen(5)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-[11px]">Chat</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-[#2563EB]">
                          <FileText className="w-6 h-6" />
                          <span className="text-[11px] font-semibold">
                            Devis
                          </span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(7)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <Users className="w-6 h-6" />
                          <span className="text-[11px]">Clients</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(8)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <MoreHorizontal className="w-6 h-6" />
                          <span className="text-[11px]">Plus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 7: CLIENT DETAIL */}
                {currentScreen === 7 && (
                  <div className="h-full bg-white flex flex-col">
                    {/* Header */}
                    <div className="bg-[#2563EB] px-4 py-6 pb-8">
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setCurrentScreen(5)}
                          className="text-white"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-white font-semibold">Client</span>
                        <button className="text-white text-[14px] font-semibold">
                          Modifier
                        </button>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[32px] mb-3">
                          JD
                        </div>
                        <h2 className="text-[24px] font-bold text-white mb-1">
                          Jean Dubois
                        </h2>
                        <p className="text-[14px] text-white/80">
                          Client depuis 2 ans
                        </p>
                      </div>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto -mt-4">
                      {/* Contact Section */}
                      <div className="bg-white rounded-t-3xl p-4 pb-6">
                        <h3 className="text-[16px] font-bold text-[#1E293B] mb-4">
                          Contact
                        </h3>
                        <div className="space-y-3">
                          <button className="w-full flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-10 h-10 bg-[#EFF6FF] rounded-full flex items-center justify-center">
                              <Phone className="w-5 h-5 text-[#2563EB]" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-[13px] text-[#64748B]">
                                Téléphone
                              </div>
                              <div className="text-[15px] font-semibold text-[#1E293B]">
                                06 12 34 56 78
                              </div>
                            </div>
                          </button>

                          <button className="w-full flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-10 h-10 bg-[#F0FDF4] rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-[#16A34A]" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-[13px] text-[#64748B]">
                                Email
                              </div>
                              <div className="text-[15px] font-semibold text-[#1E293B]">
                                j.dubois@email.fr
                              </div>
                            </div>
                          </button>

                          <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-10 h-10 bg-[#FEF3C7] rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-[#F59E0B]" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[13px] text-[#64748B]">
                                Adresse
                              </div>
                              <div className="text-[15px] font-semibold text-[#1E293B]">
                                28 rue Victor Hugo
                                <br />
                                75015 Paris
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Activity Section */}
                      <div className="bg-white p-4 border-t border-[#E2E8F0]">
                        <h3 className="text-[16px] font-bold text-[#1E293B] mb-4">
                          Activité récente
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[14px] font-semibold text-[#1E293B]">
                                Devis #402 envoyé
                              </div>
                              <div className="text-[12px] text-[#64748B]">
                                5,130€ • Il y a 2 jours
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                            <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[14px] font-semibold text-[#1E293B]">
                                Rendez-vous planifié
                              </div>
                              <div className="text-[12px] text-[#64748B]">
                                15 Jan à 10h00
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="bg-white p-4 border-t border-[#E2E8F0] pb-24">
                        <div className="grid grid-cols-2 gap-3">
                          <button className="h-12 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px]">
                            Nouveau devis
                          </button>
                          <button className="h-12 bg-[#16A34A] text-white rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Appeler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 8: SETTINGS */}
                {currentScreen === 8 && (
                  <div className="h-full bg-white flex flex-col">
                    {/* Header */}
                    <div className="bg-white px-4 py-4 border-b border-[#E2E8F0]">
                      <h1 className="text-[24px] font-bold text-[#1E293B]">
                        Paramètres
                      </h1>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Profile Section */}
                      <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[24px]">
                              PD
                            </div>
                            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Camera className="w-4 h-4 text-[#2563EB]" />
                            </button>
                          </div>
                          <div className="flex-1">
                            <div className="text-[20px] font-bold text-white">
                              Pierre Dupont
                            </div>
                            <div className="text-[14px] text-white/80">
                              Électricité Dupont
                            </div>
                            <button className="mt-2 text-[13px] text-white font-semibold">
                              Modifier le profil →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mon Entreprise */}
                      <div className="p-4">
                        <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wide mb-3">
                          Mon Entreprise
                        </h3>
                        <div className="space-y-2">
                          {[
                            {
                              icon: FileText,
                              label: "Informations légales",
                              color: "#2563EB",
                            },
                            {
                              icon: User,
                              label: "Logo & Templates",
                              color: "#8B5CF6",
                            },
                            {
                              icon: BarChart3,
                              label: "Catalogue de prix",
                              color: "#F59E0B",
                            },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              className="w-full flex items-center gap-3 p-3 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#2563EB] transition-colors"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${item.color}15` }}
                              >
                                <item.icon
                                  className="w-5 h-5"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <span className="flex-1 text-left text-[15px] font-semibold text-[#1E293B]">
                                {item.label}
                              </span>
                              <ChevronRight className="w-5 h-5 text-[#64748B]" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Préférences */}
                      <div className="p-4 border-t border-[#E2E8F0]">
                        <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wide mb-3">
                          Préférences
                        </h3>
                        <div className="space-y-2">
                          {[
                            {
                              icon: Bell,
                              label: "Notifications",
                              color: "#16A34A",
                            },
                            { icon: Globe, label: "Langue", color: "#2563EB" },
                            { icon: Moon, label: "Thème", color: "#64748B" },
                            {
                              icon: Mail,
                              label: "Signature email",
                              color: "#F59E0B",
                            },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              className="w-full flex items-center gap-3 p-3 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#2563EB] transition-colors"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${item.color}15` }}
                              >
                                <item.icon
                                  className="w-5 h-5"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <span className="flex-1 text-left text-[15px] font-semibold text-[#1E293B]">
                                {item.label}
                              </span>
                              <ChevronRight className="w-5 h-5 text-[#64748B]" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Facturation */}
                      <div className="p-4 border-t border-[#E2E8F0]">
                        <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wide mb-3">
                          Facturation
                        </h3>
                        <div className="space-y-2">
                          <button className="w-full flex items-center gap-3 p-3 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#2563EB] transition-colors">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#2563EB15]">
                              <CreditCard className="w-5 h-5 text-[#2563EB]" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-[15px] font-semibold text-[#1E293B]">
                                Abonnement
                              </div>
                              <div className="text-[13px] text-[#64748B]">
                                Plan Starter • 29€/mois
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#64748B]" />
                          </button>
                        </div>
                      </div>

                      {/* Aide */}
                      <div className="p-4 border-t border-[#E2E8F0] pb-24">
                        <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wide mb-3">
                          Aide
                        </h3>
                        <div className="space-y-2 mb-6">
                          {[
                            {
                              icon: HelpCircle,
                              label: "Centre d'aide",
                              color: "#8B5CF6",
                            },
                            {
                              icon: Mail,
                              label: "Contact support",
                              color: "#16A34A",
                            },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              className="w-full flex items-center gap-3 p-3 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#2563EB] transition-colors"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${item.color}15` }}
                              >
                                <item.icon
                                  className="w-5 h-5"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <span className="flex-1 text-left text-[15px] font-semibold text-[#1E293B]">
                                {item.label}
                              </span>
                              <ChevronRight className="w-5 h-5 text-[#64748B]" />
                            </button>
                          ))}
                        </div>

                        <div className="text-center mb-6">
                          <p className="text-[12px] text-[#64748B]">
                            Version 1.2.4
                          </p>
                        </div>

                        <button className="w-full h-12 bg-[#FEF2F2] text-[#EF4444] rounded-lg font-semibold flex items-center justify-center gap-2">
                          <LogOut className="w-5 h-5" />
                          Se déconnecter
                        </button>
                      </div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div className="bg-white border-t border-[#E2E8F0] px-4 py-2 pb-6">
                      <div className="flex items-center justify-around">
                        <button
                          onClick={() => setCurrentScreen(5)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-[11px]">Chat</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(6)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <FileText className="w-6 h-6" />
                          <span className="text-[11px]">Devis</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen(7)}
                          className="flex flex-col items-center gap-1 text-[#64748B]"
                        >
                          <Users className="w-6 h-6" />
                          <span className="text-[11px]">Clients</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-[#2563EB]">
                          <MoreHorizontal className="w-6 h-6" />
                          <span className="text-[11px] font-semibold">
                            Plus
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[60] flex items-center gap-3">
        <button
          onClick={prevScreen}
          disabled={currentScreen === 1}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors shadow-lg"
          title="Précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
          <span className="text-white/80 text-[12px] font-medium">
            {currentScreen}/{totalScreens}
          </span>
          <button
            onClick={restart}
            className="text-[11px] text-white/60 hover:text-white transition-colors px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
            title="Recommencer"
          >
            ↺
          </button>
        </div>

        <button
          onClick={nextScreen}
          disabled={currentScreen === totalScreens}
          className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors shadow-lg"
          title="Suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
