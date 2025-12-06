import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { AI_SYSTEM_INSTRUCTION, PROFILE } from '../constants';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: `Olá! Sou a assistente virtual da ${PROFILE.name}. Como posso te ajudar hoje com sua jornada espiritual? ✨` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: AI_SYSTEM_INSTRUCTION,
          },
        });
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: userText });
      
      let fullResponseText = "";
      const messageId = Date.now().toString() + '-model';
      
      setMessages(prev => [...prev, { id: messageId, role: 'model', text: '' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponseText += text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === messageId ? { ...msg, text: fullResponseText } : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: 'error', role: 'model', text: "Sinto muito, tive um problema de conexão. Tente novamente mais tarde. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 border border-brand-gold/30
          ${isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-[#25201b] hover:bg-[#302b25] hover:scale-105 animate-float'}
        `}
      >
        {isOpen ? <X className="text-brand-gold" size={24} /> : <MessageCircle className="text-brand-gold" size={28} />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[450px] bg-[#1c1917]/95 backdrop-blur-xl border border-brand-gold/20 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#25201b] border-b border-white/5 p-4 flex items-center gap-3">
             <div className="bg-brand-gold/10 p-2 rounded-full border border-brand-gold/20">
                <Sparkles size={18} className="text-brand-gold" />
             </div>
             <div>
                <h3 className="text-slate-100 font-serif font-medium text-sm">Assistente IA</h3>
                <p className="text-brand-gold text-xs flex items-center gap-1 opacity-80">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </p>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[85%] p-3 text-sm rounded-2xl shadow-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-brand-gold text-brand-900 font-medium rounded-br-none' 
                      : 'bg-[#2a2622] text-slate-200 border border-white/5 rounded-bl-none'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-[#2a2622] p-3 rounded-2xl rounded-bl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-brand-gold" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#1c1917] border-t border-white/5">
            <div className="flex items-center gap-2 bg-[#2a2622] rounded-full px-4 py-2 border border-white/10 focus-within:border-brand-gold/50 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-1.5 rounded-full text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default AiAssistant;