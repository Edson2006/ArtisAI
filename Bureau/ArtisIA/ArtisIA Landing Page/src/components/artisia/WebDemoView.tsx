import React from 'react';
import { ArrowLeft, Search, Bell, MessageSquare, FileText, DollarSign, Users, BarChart3, Settings, Send, Mic, Calendar, TrendingUp, Plus, Filter, Download, Edit, Copy, Trash2, Phone, Mail, MapPin, ChevronRight, User, Globe, Moon, CreditCard, HelpCircle, Lock, LogOut, Camera, Package } from 'lucide-react';

interface WebDemoViewProps {
  onBack: () => void;
  onChangePlatform: () => void;
}

export function WebDemoView({ onBack, onChangePlatform }: WebDemoViewProps) {
  const [activeSection, setActiveSection] = React.useState('chat');
  const [inputValue, setInputValue] = React.useState('');
  
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat Assistant', badge: null },
    { id: 'quotes', icon: FileText, label: 'Devis', badge: 3 },
    { id: 'invoices', icon: DollarSign, label: 'Factures', badge: null },
    { id: 'clients', icon: Users, label: 'Clients', badge: null },
    { id: 'catalog', icon: BarChart3, label: 'Catalogue', badge: null },
    { id: 'settings', icon: Settings, label: 'Paramètres', badge: null },
  ];
  
  const recentActivity = [
    { id: 1, text: 'Devis #401 envoyé', time: 'Il y a 5 min', icon: FileText, color: '#2563EB', link: true },
    { id: 2, text: 'Rendez-vous ajouté', time: 'Il y a 12 min', icon: Calendar, color: '#16A34A', link: true },
    { id: 3, text: 'Paiement reçu - 180€', time: 'Il y a 1h', icon: DollarSign, color: '#F59E0B', link: false },
    { id: 4, text: 'Nouveau client créé', time: 'Il y a 2h', icon: Users, color: '#8B5CF6', link: false },
    { id: 5, text: '3 nouveaux emails', time: 'Il y a 3h', icon: Mail, color: '#EF4444', link: true },
    { id: 6, text: 'Catalogue mis à jour', time: 'Hier', icon: Package, color: '#64748B', link: false },
  ];
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Floating Control Buttons - Top Left */}
      <div className="absolute top-4 left-4 z-[60] flex items-center gap-2">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#1E293B] transition-colors shadow-lg"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      {/* Floating Control Buttons - Top Right */}
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-2">
        <span className="px-3 py-1.5 bg-[#8B5CF6] text-white text-[12px] font-semibold rounded-full shadow-lg">
          💻 Desktop
        </span>
        <button
          onClick={onChangePlatform}
          className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#1E293B] transition-colors shadow-lg"
          title="Changer de plateforme"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      
      {/* Web Interface */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC]">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-[#2563EB]">
            <div className="text-[24px] font-bold flex items-center gap-2">
              <span>🔧</span>
              <span>ArtisIA</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-[600px] mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Rechercher un client, un devis..."
                className="w-full h-12 pl-12 pr-4 bg-[#F8FAFC] rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-[#64748B]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#E2E8F0]">
              <div className="text-right">
                <div className="text-[14px] font-semibold text-[#1E293B]">Pierre Dupont</div>
                <div className="text-[12px] text-[#64748B]">Électricien</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white font-bold">
                PD
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT SIDEBAR */}
          <div className="w-[280px] bg-white border-r border-[#E2E8F0] flex flex-col flex-shrink-0">
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-sm'
                        : 'text-[#64748B] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-[#2563EB] text-white text-[12px] rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
            
            {/* User Profile Card */}
            <div className="p-4 border-t border-[#E2E8F0]">
              <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#2563EB] text-white text-[11px] rounded font-bold">STARTER</span>
                  <span className="text-[12px] text-[#64748B]">29€/mois</span>
                </div>
                <div className="text-[12px] text-[#64748B] mb-3">
                  14 jours d'essai restants
                </div>
                <button className="w-full h-8 bg-[#2563EB] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors">
                  Passer à Pro
                </button>
              </div>
            </div>
          </div>
          
          {/* CENTER PANEL */}
          <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
            {/* CHAT ASSISTANT VIEW */}
            {activeSection === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  <div className="max-w-[700px]">
                    <div className="flex justify-start mb-6">
                      <div className="bg-white rounded-2xl rounded-tl-none px-6 py-4 shadow-sm max-w-[80%]">
                        <p className="text-[16px] md:text-[18px] text-[#1E293B] leading-relaxed">
                          Bonjour Pierre ! Je suis votre assistant ArtisIA. Je peux vous aider à générer des devis, gérer vos clients et automatiser votre administratif.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mb-6">
                      <div className="bg-[#2563EB] text-white rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%]">
                        <p className="text-[16px] md:text-[18px] leading-relaxed">
                          J'ai besoin d'un devis pour une installation électrique complète dans une maison de 120m²
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start mb-6">
                      <div className="bg-white rounded-2xl rounded-tl-none px-6 py-4 shadow-sm max-w-[80%]">
                        <p className="text-[16px] md:text-[18px] text-[#1E293B] leading-relaxed mb-4">
                          Parfait ! J'ai préparé ce devis pour vous. Voici les informations :
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced Quote Card */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
                      <div className="bg-[#2563EB] px-6 py-4 flex items-center justify-between">
                        <span className="text-white font-bold text-[16px] flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          DEVIS #402
                        </span>
                        <span className="px-3 py-1 bg-[#F59E0B] text-white text-[13px] rounded-full font-semibold">
                          Brouillon
                        </span>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          {/* Left Column - Client Info */}
                          <div>
                            <h4 className="text-[14px] font-bold text-[#64748B] uppercase tracking-wide mb-4">Client</h4>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] font-bold">
                                JD
                              </div>
                              <div>
                                <div className="text-[16px] font-bold text-[#1E293B]">Jean Dubois</div>
                                <div className="text-[14px] text-[#64748B]">Particulier • Paris 15e</div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-[14px]">
                              <div className="flex justify-between py-2 border-b border-[#F8FAFC]">
                                <span className="text-[#64748B]">Type</span>
                                <span className="font-semibold text-[#1E293B]">Installation électrique</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-[#F8FAFC]">
                                <span className="text-[#64748B]">Surface</span>
                                <span className="font-semibold text-[#1E293B]">120 m²</span>
                              </div>
                              <div className="flex justify-between py-2">
                                <span className="text-[#64748B]">Délai</span>
                                <span className="font-semibold text-[#1E293B]">2-3 semaines</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Column - Line Items */}
                          <div>
                            <h4 className="text-[14px] font-bold text-[#64748B] uppercase tracking-wide mb-4">Détail des postes</h4>
                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between text-[15px]">
                                <span className="text-[#1E293B]">Tableau électrique 4 rangées</span>
                                <span className="font-semibold text-[#1E293B]">850€</span>
                              </div>
                              <div className="flex justify-between text-[15px]">
                                <span className="text-[#1E293B]">Câblage complet (120m²)</span>
                                <span className="font-semibold text-[#1E293B]">2,400€</span>
                              </div>
                              <div className="flex justify-between text-[15px]">
                                <span className="text-[#1E293B]">Prises et interrupteurs</span>
                                <span className="font-semibold text-[#1E293B]">680€</span>
                              </div>
                              <div className="flex justify-between text-[15px]">
                                <span className="text-[#1E293B]">Main d'œuvre (3 jours)</span>
                                <span className="font-semibold text-[#1E293B]">1,200€</span>
                              </div>
                            </div>
                            
                            <div className="border-t-2 border-[#E2E8F0] pt-4 mt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-[16px] font-bold text-[#1E293B]">Total HT</span>
                                <span className="text-[28px] font-bold text-[#2563EB]">5,130€</span>
                              </div>
                              <div className="flex justify-between text-[14px] text-[#64748B]">
                                <span>TVA 20%</span>
                                <span>1,026€</span>
                              </div>
                              <div className="flex justify-between text-[16px] font-bold text-[#1E293B] mt-2">
                                <span>Total TTC</span>
                                <span>6,156€</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-6 border-t border-[#E2E8F0]">
                          <button className="flex-1 h-11 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4" />
                            Générer le PDF
                          </button>
                          <button className="flex-1 h-11 bg-white border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2">
                            <Edit className="w-4 h-4" />
                            Modifier
                          </button>
                          <button className="h-11 px-4 bg-[#F8FAFC] text-[#64748B] rounded-lg font-semibold hover:bg-[#E2E8F0] transition-colors flex items-center justify-center gap-2">
                            <Copy className="w-4 h-4" />
                            Dupliquer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="bg-white border-t border-[#E2E8F0] p-6">
                  <div className="max-w-[700px]">
                    <div className="flex items-end gap-3">
                      <button className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                        <Mic className="w-6 h-6" />
                      </button>
                      <div className="flex-1 bg-[#F8FAFC] rounded-xl p-4 focus-within:ring-2 focus-within:ring-[#2563EB]">
                        <textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Tapez votre message... (Shift + Enter pour nouvelle ligne)"
                          rows={1}
                          className="w-full bg-transparent resize-none focus:outline-none text-[16px] text-[#1E293B] placeholder-[#64748B]"
                        />
                      </div>
                      <button
                        className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
                        disabled={!inputValue.trim()}
                      >
                        <Send className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* DEVIS LIST VIEW */}
            {activeSection === 'quotes' && (
              <>
                <div className="flex-1 overflow-y-auto p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-[32px] font-bold text-[#1E293B] mb-2">Devis</h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <select className="h-10 px-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                          <option>Tous les statuts</option>
                          <option>Brouillon</option>
                          <option>Envoyé</option>
                          <option>Accepté</option>
                        </select>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <input
                            type="text"
                            placeholder="Rechercher..."
                            className="h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] w-[300px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>
                      <button className="h-10 px-6 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nouveau devis
                      </button>
                    </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#2563EB] mb-2">12</div>
                      <div className="text-[14px] text-[#64748B]">Devis créés ce mois</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#16A34A] mb-2">8</div>
                      <div className="text-[14px] text-[#64748B]">Acceptés • 68% taux</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#F59E0B] mb-2">24,500€</div>
                      <div className="text-[14px] text-[#64748B]">Total HT ce mois</div>
                    </div>
                  </div>
                  
                  {/* Table */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">#</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Client</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Objet</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Montant</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Statut</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Date</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { num: '402', client: 'M. Dubois', service: 'Installation électrique', amount: '5,130€', status: 'Brouillon', color: 'orange', date: '10 Jan' },
                          { num: '401', client: 'Mme Martin', service: 'Réparation fuite', amount: '180€', status: 'Envoyé', color: 'blue', date: '9 Jan' },
                          { num: '400', client: 'Café Central', service: 'Mise aux normes', amount: '8,400€', status: 'Accepté', color: 'green', date: '8 Jan' },
                          { num: '399', client: 'M. Petit', service: 'Dépannage urgence', amount: '320€', status: 'Payé', color: 'darkgreen', date: '5 Jan' },
                          { num: '398', client: 'Mme Rousseau', service: 'Installation prises', amount: '450€', status: 'Envoyé', color: 'blue', date: '4 Jan' },
                          { num: '397', client: 'M. Bernard', service: 'Diagnostic', amount: '120€', status: 'Accepté', color: 'green', date: '3 Jan' },
                          { num: '396', client: 'Boulangerie Dupont', service: 'Remplacement tableau', amount: '1,850€', status: 'Refusé', color: 'red', date: '2 Jan' },
                        ].map((devis, idx) => (
                          <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-6 py-4 text-[14px] font-semibold text-[#1E293B]">#{devis.num}</td>
                            <td className="px-6 py-4 text-[14px] text-[#1E293B]">{devis.client}</td>
                            <td className="px-6 py-4 text-[14px] text-[#64748B]">{devis.service}</td>
                            <td className="px-6 py-4 text-[14px] font-semibold text-[#1E293B]">{devis.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                                devis.color === 'orange' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                                devis.color === 'blue' ? 'bg-[#EFF6FF] text-[#2563EB]' :
                                devis.color === 'green' ? 'bg-[#F0FDF4] text-[#16A34A]' :
                                devis.color === 'darkgreen' ? 'bg-[#DCFCE7] text-[#15803D]' :
                                'bg-[#FEE2E2] text-[#EF4444]'
                              }`}>
                                {devis.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[14px] text-[#64748B]">{devis.date}</td>
                            <td className="px-6 py-4">
                              <button className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                                <Download className="w-4 h-4 text-[#64748B]" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            
            {/* INVOICES VIEW */}
            {activeSection === 'invoices' && (
              <>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="mb-6">
                    <h1 className="text-[32px] font-bold text-[#1E293B] mb-2">Factures</h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <select className="h-10 px-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px]">
                          <option>Tous les statuts</option>
                          <option>Payée</option>
                          <option>En attente</option>
                          <option>En retard</option>
                        </select>
                      </div>
                      <button className="h-10 px-6 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nouvelle facture
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#2563EB] mb-2">8</div>
                      <div className="text-[14px] text-[#64748B]">Factures émises ce mois</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#16A34A] mb-2">6</div>
                      <div className="text-[14px] text-[#64748B]">Payées • 75% recouvrement</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#F59E0B] mb-2">18,200€</div>
                      <div className="text-[14px] text-[#64748B]">Total TTC ce mois</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">#</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Client</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Description</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Montant TTC</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Statut</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Échéance</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { num: 'F-2026-008', client: 'M. Dubois', desc: 'Devis #402', amount: '6,156€', status: 'Payée', color: 'green', date: '25 Jan', action: null },
                          { num: 'F-2026-007', client: 'Café Central', desc: 'Devis #400', amount: '10,080€', status: 'En attente', color: 'orange', date: '20 Jan', action: 'Relancer' },
                          { num: 'F-2026-006', client: 'Mme Martin', desc: 'Devis #401', amount: '216€', status: 'Retard', color: 'red', date: '15 Jan', action: 'Relancer' },
                          { num: 'F-2026-005', client: 'M. Petit', desc: 'Devis #399', amount: '384€', status: 'Payée', color: 'green', date: '12 Jan', action: null },
                          { num: 'F-2026-004', client: 'Mme Rousseau', desc: 'Devis #398', amount: '540€', status: 'Payée', color: 'green', date: '10 Jan', action: null },
                        ].map((invoice, idx) => (
                          <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-6 py-4 text-[14px] font-semibold text-[#1E293B]">{invoice.num}</td>
                            <td className="px-6 py-4 text-[14px] text-[#1E293B]">{invoice.client}</td>
                            <td className="px-6 py-4 text-[14px] text-[#64748B]">{invoice.desc}</td>
                            <td className="px-6 py-4 text-[14px] font-semibold text-[#1E293B]">{invoice.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                                invoice.color === 'green' ? 'bg-[#F0FDF4] text-[#16A34A]' :
                                invoice.color === 'orange' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                                'bg-[#FEE2E2] text-[#EF4444]'
                              }`}>
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[14px] text-[#64748B]">{invoice.date}</td>
                            <td className="px-6 py-4">
                              {invoice.action ? (
                                <button className="px-3 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-[12px] font-semibold hover:bg-[#2563EB] hover:text-white transition-colors">
                                  {invoice.action}
                                </button>
                              ) : (
                                <button className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                                  <Download className="w-4 h-4 text-[#64748B]" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            
            {/* CLIENTS VIEW */}
            {activeSection === 'clients' && (
              <>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="mb-6">
                    <h1 className="text-[32px] font-bold text-[#1E293B] mb-2">Clients</h1>
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="text"
                          placeholder="Rechercher un client..."
                          className="h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] w-[400px]"
                        />
                      </div>
                      <button className="h-10 px-6 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nouveau client
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#2563EB] mb-2">47</div>
                      <div className="text-[14px] text-[#64748B]">Clients actifs</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#16A34A] mb-2">12</div>
                      <div className="text-[14px] text-[#64748B]">Nouveaux ce mois</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#F59E0B] mb-2">89%</div>
                      <div className="text-[14px] text-[#64748B]">Taux satisfaction</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { name: 'Jean Dubois', type: 'Particulier', contact: 'Il y a 2 jours', total: '12,400€', avatar: 'JD' },
                      { name: 'Marie Leclerc', type: 'Particulier', contact: 'Il y a 5 jours', total: '3,280€', avatar: 'ML' },
                      { name: 'Café Central', type: 'Professionnel', contact: 'Il y a 1 semaine', total: '18,650€', avatar: 'CC' },
                      { name: 'Pierre Martin', type: 'Particulier', contact: 'Il y a 3 jours', total: '890€', avatar: 'PM' },
                      { name: 'Sophie Rousseau', type: 'Particulier', contact: 'Aujourd\'hui', total: '4,120€', avatar: 'SR' },
                      { name: 'Boulangerie Dupont', type: 'Professionnel', contact: 'Il y a 2 semaines', total: '6,540€', avatar: 'BD' },
                      { name: 'Marc Bernard', type: 'Particulier', contact: 'Il y a 4 jours', total: '2,300€', avatar: 'MB' },
                      { name: 'Restaurant Le Bon Coin', type: 'Professionnel', contact: 'Il y a 1 mois', total: '22,100€', avatar: 'RB' },
                      { name: 'Annie Petit', type: 'Particulier', contact: 'Il y a 6 jours', total: '1,850€', avatar: 'AP' },
                    ].map((client, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md hover:-translate-y-1 transition-all">
                        <div className="flex flex-col items-center text-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-[18px] mb-3">
                            {client.avatar}
                          </div>
                          <h3 className="text-[16px] font-bold text-[#1E293B] mb-1">{client.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                            client.type === 'Professionnel' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'bg-[#F8FAFC] text-[#64748B]'
                          }`}>
                            {client.type}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4 text-[13px]">
                          <div className="flex justify-between">
                            <span className="text-[#64748B]">Dernier contact</span>
                            <span className="font-semibold text-[#1E293B]">{client.contact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748B]">Total facturé</span>
                            <span className="font-semibold text-[#2563EB]">{client.total}</span>
                          </div>
                        </div>
                        
                        <button className="w-full h-9 bg-[#EFF6FF] text-[#2563EB] rounded-lg font-semibold text-[13px] hover:bg-[#2563EB] hover:text-white transition-colors">
                          Contacter
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <button className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] hover:bg-[#16A34A] hover:text-white transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* CATALOG VIEW */}
            {activeSection === 'catalog' && (
              <>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="mb-6">
                    <h1 className="text-[32px] font-bold text-[#1E293B] mb-2">Catalogue Produits</h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <select className="h-10 px-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px]">
                          <option>Toutes catégories</option>
                          <option>Électricité</option>
                          <option>Plomberie</option>
                          <option>Outillage</option>
                        </select>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] w-[300px]"
                          />
                        </div>
                      </div>
                      <button className="h-10 px-6 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter produit
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#2563EB] mb-2">156</div>
                      <div className="text-[14px] text-[#64748B]">Produits au catalogue</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#16A34A] mb-2">12</div>
                      <div className="text-[14px] text-[#64748B]">Catégories actives</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <div className="text-[36px] font-bold text-[#F59E0B] mb-2">65%</div>
                      <div className="text-[14px] text-[#64748B]">Marge moyenne</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Image</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Référence</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Nom</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Prix Achat HT</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Prix Vente HT</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Marge</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Stock</th>
                          <th className="text-left px-6 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { ref: 'ELEC-001', name: 'Tableau électrique 4 rangées', buyPrice: '120€', sellPrice: '280€', margin: '133%', stock: true },
                          { ref: 'ELEC-002', name: 'Disjoncteur 20A', buyPrice: '8€', sellPrice: '18€', margin: '125%', stock: true },
                          { ref: 'PLOMB-010', name: 'Robinet mitigeur', buyPrice: '35€', sellPrice: '75€', margin: '114%', stock: true },
                          { ref: 'ELEC-003', name: 'Câble 2.5mm² (rouleau 100m)', buyPrice: '45€', sellPrice: '95€', margin: '111%', stock: true },
                          { ref: 'PLOMB-011', name: 'Siphon lavabo', buyPrice: '12€', sellPrice: '28€', margin: '133%', stock: false },
                          { ref: 'ELEC-004', name: 'Prise murale 16A', buyPrice: '3€', sellPrice: '7€', margin: '133%', stock: true },
                          { ref: 'PLOMB-012', name: 'Tuyau PER Ø16 (rouleau 50m)', buyPrice: '28€', sellPrice: '62€', margin: '121%', stock: true },
                          { ref: 'ELEC-005', name: 'Interrupteur va-et-vient', buyPrice: '4€', sellPrice: '9€', margin: '125%', stock: true },
                        ].map((product, idx) => (
                          <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-6 py-4">
                              <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-[#64748B]" />
                              </div>
                            </td>
                            <td className="px-6 py-4 text-[13px] font-semibold text-[#64748B]">{product.ref}</td>
                            <td className="px-6 py-4 text-[14px] text-[#1E293B]">{product.name}</td>
                            <td className="px-6 py-4 text-[14px] text-[#64748B]">{product.buyPrice}</td>
                            <td className="px-6 py-4 text-[14px] font-semibold text-[#1E293B]">{product.sellPrice}</td>
                            <td className="px-6 py-4">
                              <span className="text-[14px] font-semibold text-[#16A34A]">{product.margin}</span>
                            </td>
                            <td className="px-6 py-4">
                              {product.stock ? (
                                <span className="text-[14px] text-[#16A34A]">✓</span>
                              ) : (
                                <span className="text-[14px] text-[#EF4444]">✗</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-[#64748B]" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            
            {/* SETTINGS VIEW */}
            {activeSection === 'settings' && (
              <>
                <div className="flex-1 overflow-y-auto p-8">
                  <h1 className="text-[32px] font-bold text-[#1E293B] mb-8">Paramètres</h1>
                  
                  <div className="space-y-8 max-w-[900px]">
                    {/* Profile Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <h3 className="text-[18px] font-bold text-[#1E293B] mb-6">Profil</h3>
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-[32px]">
                            PD
                          </div>
                          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-[#E2E8F0] rounded-full flex items-center justify-center shadow-sm hover:bg-[#F8FAFC] transition-colors">
                            <Camera className="w-4 h-4 text-[#64748B]" />
                          </button>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">Nom</label>
                            <input type="text" value="Pierre Dupont" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">Email</label>
                            <input type="email" value="pierre@electricite-dupont.fr" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">Téléphone</label>
                            <input type="tel" value="+33 6 12 34 56 78" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" />
                          </div>
                          <button className="col-span-2 h-10 bg-[#2563EB] text-white rounded-lg font-semibold text-[14px] hover:bg-[#1d4ed8] transition-colors">
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Company Info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <h3 className="text-[18px] font-bold text-[#1E293B] mb-6">Mon Entreprise</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">Nom entreprise</label>
                            <input type="text" value="Électricité Dupont SARL" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" readOnly />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">SIRET</label>
                            <input type="text" value="123 456 789 00012" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" readOnly />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">N° TVA</label>
                            <input type="text" value="FR12345678901" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" readOnly />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#64748B] mb-2">Adresse</label>
                            <input type="text" value="12 rue de la Paix, 75001 Paris" className="w-full h-10 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px]" readOnly />
                          </div>
                        </div>
                        <button className="h-10 px-6 bg-[#F8FAFC] text-[#64748B] rounded-lg font-semibold text-[14px] hover:bg-[#E2E8F0] transition-colors">
                          Modifier
                        </button>
                      </div>
                    </div>
                    
                    {/* Notifications */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                      <h3 className="text-[18px] font-bold text-[#1E293B] mb-6">Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Email notifications', sublabel: 'Recevoir les demandes de devis', checked: true },
                          { label: 'SMS alerts', sublabel: 'Alertes urgentes', checked: false },
                          { label: 'Push mobile', sublabel: 'Notifications sur l\'app', checked: true },
                          { label: 'Résumé quotidien', sublabel: 'Email à 18h avec l\'activité du jour', checked: true },
                        ].map((notif, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
                            <div>
                              <div className="text-[15px] font-semibold text-[#1E293B]">{notif.label}</div>
                              <div className="text-[13px] text-[#64748B]">{notif.sublabel}</div>
                            </div>
                            <button className={`w-12 h-6 rounded-full transition-colors ${notif.checked ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notif.checked ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Billing */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] rounded-xl p-6 border border-[#2563EB]/20">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#2563EB] text-white text-[12px] rounded-full font-bold">PLAN STARTER</span>
                            <span className="text-[20px] font-bold text-[#1E293B]">29€/mois</span>
                          </div>
                          <p className="text-[14px] text-[#64748B]">14 jours d'essai restants</p>
                        </div>
                        <button className="h-10 px-6 bg-[#16A34A] text-white rounded-lg font-semibold text-[14px] hover:bg-[#15803D] transition-colors">
                          Upgrade to Pro
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[13px] mb-1">
                            <span className="text-[#64748B]">Devis créés</span>
                            <span className="font-semibold text-[#1E293B]">23 / ∞</span>
                          </div>
                          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[13px] mb-1">
                            <span className="text-[#64748B]">Emails envoyés</span>
                            <span className="font-semibold text-[#1E293B]">15 / 100</span>
                          </div>
                          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                            <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[13px] mb-1">
                            <span className="text-[#64748B]">Stockage</span>
                            <span className="font-semibold text-[#1E293B]">230 MB / 5 GB</span>
                          </div>
                          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '5%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="mt-4 text-[14px] text-[#2563EB] font-semibold hover:underline">
                        Gérer l'abonnement →
                      </button>
                    </div>
                    
                    {/* Danger Zone */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#FEE2E2]">
                      <h3 className="text-[18px] font-bold text-[#EF4444] mb-4">Zone de danger</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[15px] font-semibold text-[#1E293B] mb-1">Supprimer mon compte</div>
                          <div className="text-[13px] text-[#64748B]">Cette action est irréversible</div>
                        </div>
                        <button className="h-10 px-6 bg-[#EF4444] text-white rounded-lg font-semibold text-[14px] hover:bg-[#DC2626] transition-colors">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* RIGHT SIDEBAR */}
          <div className="w-[340px] bg-white border-l border-[#E2E8F0] flex flex-col overflow-y-auto flex-shrink-0">
            {/* Activity Section */}
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-[16px] font-bold text-[#1E293B] mb-4">Activité Récente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <button
                      key={activity.id}
                      className="w-full flex items-start gap-3 hover:bg-[#F8FAFC] p-2 rounded-lg transition-colors text-left"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold text-[#1E293B] mb-1">
                          {activity.text}
                        </div>
                        <div className="text-[12px] text-[#64748B] flex items-center justify-between">
                          <span>{activity.time}</span>
                          {activity.link && <span className="text-[#2563EB] font-semibold">Voir →</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-[16px] font-bold text-[#1E293B] mb-4">Raccourcis</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-20 bg-[#EFF6FF] rounded-xl hover:-translate-y-1 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group">
                  <FileText className="w-6 h-6 text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-semibold text-[#2563EB]">Nouveau devis</span>
                </button>
                <button className="h-20 bg-[#F0FDF4] rounded-xl hover:-translate-y-1 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group">
                  <Users className="w-6 h-6 text-[#16A34A] group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-semibold text-[#16A34A]">Nouveau client</span>
                </button>
                <button className="h-20 bg-[#FAF5FF] rounded-xl hover:-translate-y-1 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group">
                  <Calendar className="w-6 h-6 text-[#8B5CF6] group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-semibold text-[#8B5CF6]">Voir agenda</span>
                </button>
                <button className="h-20 bg-[#FEF3C7] rounded-xl hover:-translate-y-1 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group">
                  <DollarSign className="w-6 h-6 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-semibold text-[#F59E0B]">Relances</span>
                </button>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] opacity-90">Ce mois</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-[36px] font-bold mb-1">12,450€</div>
                <div className="text-[13px] opacity-75">+23% vs mois dernier</div>
              </div>
            </div>
            
            {/* Tips Section */}
            <div className="p-6">
              <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FEF9C3] rounded-xl p-4 border border-[#F59E0B]/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-[24px]">💡</div>
                  <div>
                    <div className="text-[14px] font-bold text-[#92400E] mb-1">Astuce du jour</div>
                    <div className="text-[13px] text-[#78350F] leading-relaxed">
                      Utilisez <kbd className="px-1.5 py-0.5 bg-white rounded text-[11px] font-mono">Cmd+K</kbd> pour ouvrir la recherche rapide
                    </div>
                  </div>
                </div>
                <button className="text-[13px] font-semibold text-[#92400E] hover:text-[#78350F] transition-colors">
                  Suivant →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
