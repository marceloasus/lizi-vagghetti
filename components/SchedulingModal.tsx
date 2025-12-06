import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const services = [
    { title: "Sessão de Apometria", duration: "1h 30min", price: "R$ 350,00" },
    { title: "Mentoria Espiritual", duration: "1h", price: "R$ 280,00" },
    { title: "Leitura de Cartas", duration: "50min", price: "R$ 200,00" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#1C1917] border border-[#C8AA6E]/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/5 flex justify-between items-center bg-[#25201b]">
              <div>
                <h3 className="text-xl font-serif text-[#F5F5F0]">Agendar Consulta</h3>
                <p className="text-xs text-[#C8AA6E] mt-1">Selecione o tipo de atendimento</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 space-y-3">
              {services.map((service, idx) => (
                <button 
                  key={idx}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-[#C8AA6E]/10 hover:border-[#C8AA6E]/40 transition-all group flex items-start gap-4"
                >
                  <div className="mt-1 p-2 rounded-full bg-[#C8AA6E]/10 text-[#C8AA6E]">
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-200 font-medium group-hover:text-[#C8AA6E] transition-colors">{service.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{service.duration} • Online via Zoom</p>
                  </div>
                  <div className="text-[#C8AA6E] font-semibold text-sm">
                    {service.price}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 pt-0 text-center">
              <p className="text-xs text-gray-500 mb-4">
                O agendamento será finalizado via WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};