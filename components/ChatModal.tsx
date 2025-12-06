import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_SYSTEM_INSTRUCTION, PROFILE } from '../constants';
import { ChatMessage } from '../types';

export const ChatModal: React.FC = () => {
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
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: AI_SYSTEM_INSTRUCTION },
        });
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: userText });
      
      let fullResponseText = "";
      const messageId = Date.now().toString() + '-model';
      setMessages(prev => [...prev, { id: messageId, role: 'model', text: '' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponseText += c.text;
          setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, text: fullResponseText } : msg));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: 'error', role: 'model', text: "Sinto muito, tive um problema de conexão. Tente novamente mais tarde. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl border border-[#C8AA6E]/30
          ${isOpen ? 'bg-slate-800' : 'bg-[#25201b] hover:bg-[#302b25]'}
        `}
      >
        {isOpen ? <X className="text-[#C8AA6E]" size={24} /> : <MessageCircle className="text-[#C8AA6E]" size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[85vw] max-w-[380px] h-[500px] bg-[#1c1917]/95 backdrop-blur-xl border border-[#C8AA6E]/20 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25201b] border-b border-white/5 p-4 flex items-center gap-3">
               <div className="bg-[#C8AA6E]/10 p-2 rounded-full border border-[#C8AA6E]/20">
                  <Sparkles size={18} className="text-[#C8AA6E]" />
               </div>
               <div>
                  <h3 className="text-slate-100 font-serif font-medium text-sm">Assistente IA</h3>
                  <p className="text-[#C8AA6E] text-xs flex items-center gap-1 opacity-80">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
               </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/20">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-3 text-sm rounded-2xl shadow-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-[#C8AA6E] text-[#1c1917] font-medium rounded-br-none' 
                      : 'bg-[#2a2622] text-slate-200 border border-white/5 rounded-bl-none'}
                  `}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-[#2a2622] p-3 rounded-2xl rounded-bl-none border border-white/5">
                      <Loader2 size={16} className="animate-spin text-[#C8AA6E]" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-[#1c1917] border-t border-white/5">
              <div className="flex items-center gap-2 bg-[#2a2622] rounded-full px-4 py-2 border border-white/10 focus-within:border-[#C8AA6E]/50 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-500"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-1.5 rounded-full text-[#C8AA6E] disabled:opacity-30 hover:bg-white/5 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};