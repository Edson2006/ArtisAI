"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Plus } from "lucide-react";
import { QuoteItem } from "@/types/quote";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";

interface AIChatAssistantProps {
  onInjectItems: (items: QuoteItem[], clientName?: string, clientAddress?: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  items?: any[];
  clientName?: string;
  clientAddress?: string;
}

export function AIChatAssistant({ onInjectItems }: AIChatAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant expert BTP. Décrivez-moi les travaux à réaliser (ex: 'Peinture salon 25m² + plafond') et je préparerai le devis pour vous."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare messages for API
    // Filter out internal fields and map to API expected format if needed
    // But our API route now expects the same structure as we have locally (content, role)
    // We just need to remove the internal fields like 'items', 'clientName', etc. or let the API ignore them.
    // Let's send a clean version.
    const history = [...messages, userMessage].map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!response.ok) throw new Error("Erreur lors de la génération");

      const data = await response.json();
      
      // The API now returns { items, conversationalMessage, clientName, clientAddress }
      // But the route.ts wrapper puts it inside { items: ... } if it was just an array, 
      // OR if we updated route.ts correctly, it returns the object directly.
      // Let's check route.ts again. 
      // In route.ts: const items = JSON.parse(jsonStr); return NextResponse.json({ items });
      // So if jsonStr is the object, 'items' variable will hold the object.
      // And the response will be { items: { conversationalMessage, ... } }
      // Wait, I should probably fix route.ts to just return the parsed JSON directly or name it better.
      // But for now, let's assume route.ts returns { items: parsedJson }
      
      const aiResponse = data.items; // This is the object from the AI

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse.conversationalMessage || "Voici une proposition de devis.",
        items: aiResponse.items,
        clientName: aiResponse.clientName,
        clientAddress: aiResponse.clientAddress
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue avec l'IA");
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Désolé, je n'ai pas réussi à traiter votre demande. Veuillez réessayer."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInject = (msg: Message) => {
    if (!msg.items) return;

    // Convert raw AI items to QuoteItems
    const quoteItems: QuoteItem[] = msg.items.map((item: any) => ({
      id: crypto.randomUUID(),
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice
    }));

    onInjectItems(quoteItems, msg.clientName, msg.clientAddress);
    toast.success(`${quoteItems.length} lignes ajoutées au devis !`);
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 max-w-[80%]",
              msg.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              msg.role === "user" ? "bg-blue-600 text-white" : "bg-indigo-600 text-white"
            )}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className="space-y-2">
              <div className={cn(
                "p-3 rounded-2xl text-sm",
                msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
              )}>
                {msg.content}
              </div>

              {/* Generated Items Preview */}
              {msg.items && msg.items.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-500 uppercase">Proposition</span>
                      {(msg.clientName || msg.clientAddress) && (
                        <span className="text-[10px] text-blue-600 truncate max-w-[150px]">
                          {msg.clientName} {msg.clientAddress ? `• ${msg.clientAddress}` : ''}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleInject(msg)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-bold hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Ajouter
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {msg.items.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 text-sm hover:bg-slate-50">
                        <div className="font-medium text-slate-900">{item.description}</div>
                        <div className="flex justify-between text-slate-500 text-xs mt-1">
                          <span>{item.quantity} {item.unit} x {item.unitPrice}€</span>
                          <span className="font-bold text-slate-700">{(item.quantity * item.unitPrice).toFixed(2)}€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="text-sm text-slate-500">Analyse en cours...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Décrivez les travaux..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none h-[50px] max-h-[120px] transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Propulsé par IA - Vérifiez toujours les quantités et prix proposés.
        </p>
      </div>
    </div>
  );
}
