
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate next 30 days
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  // Start from tomorrow
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Skip weekends if desired, currently keeping all
    dates.push(d);
  }
  return dates;
};

// Available time slots
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00"
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
};

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const phoneNumber = "5548991460338";
  
  const [step, setStep] = useState<'service' | 'datetime'>('service');
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDates = useMemo(() => getAvailableDates(), []);

  const handleServiceSelect = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setStep('datetime');
    // Pre-select first date
    if (!selectedDate) setSelectedDate(availableDates[0]);
  };

  const handleBack = () => {
    setStep('service');
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const dateStr = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'numeric' }).format(selectedDate);
    const weekDay = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(selectedDate);

    const message = `Olá Lizi! ✨\n\nGostaria de agendar:\n*${selectedService.title}*\n\n🗓️ Data: ${weekDay}, ${dateStr}\n⏰ Horário: ${selectedTime}\n\nAguardo confirmação!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
    
    // Reset state after closing
    setTimeout(() => {
        setStep('service');
        setSelectedService(null);
        setSelectedTime(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#1C1917] border border-[#C8AA6E]/30 rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#25201b] shrink-0">
              <div className="flex items-center gap-3">
                {step === 'datetime' && (
                    <button onClick={handleBack} className="p-1.5 rounded-full hover:bg-white/5 text-[#C8AA6E] transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                )}
                <div>
                    <h3 className="text-lg font-serif text-[#F5F5F0]">
                        {step === 'service' ? 'Selecione o Serviço' : 'Escolha o Horário'}
                    </h3>
                    <p className="text-xs text-[#C8AA6E]/80">
                        {step === 'service' ? 'Passo 1 de 2' : 'Passo 2 de 2'}
                    </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#191512]">
                
              {/* STEP 1: SERVICE SELECTION */}
              {step === 'service' && (
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-5 space-y-3"
                >
                  {SERVICES.map((service, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full text-left p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-[#C8AA6E]/10 hover:border-[#C8AA6E]/50 transition-all group flex flex-col gap-2 active:scale-[0.98]"
                    >
                      <div className="flex justify-between w-full">
                          <h4 className="text-[#F5F5F0] font-medium text-[17px] group-hover:text-[#C8AA6E] transition-colors">
                              {service.title}
                          </h4>
                          <span className="text-[#C8AA6E] font-semibold">{service.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-light leading-relaxed pr-4">
                          {service.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{service.duration}</span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* STEP 2: DATE & TIME */}
              {step === 'datetime' && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-5"
                >
                    {/* Date Grid */}
                    <div className="mb-6">
                        <h4 className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-medium">Dias Disponíveis</h4>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                            {availableDates.map((date, idx) => {
                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDate(date)}
                                        className={`
                                            flex flex-col items-center justify-center h-[70px] rounded-xl border transition-all duration-300
                                            ${isSelected 
                                                ? 'bg-[#C8AA6E] border-[#C8AA6E] text-[#191512] shadow-[0_0_10px_rgba(200,170,110,0.4)] scale-105 z-10' 
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#C8AA6E]/50 hover:text-gray-200 hover:bg-white/10'}
                                        `}
                                    >
                                        <span className="text-[10px] font-medium uppercase mb-0.5 opacity-80">
                                            {new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '')}
                                        </span>
                                        <span className="text-lg font-bold font-serif">
                                            {date.getDate()}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Time Grid */}
                    <div>
                        <h4 className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-medium">Horários</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {TIME_SLOTS.map((time) => {
                                const isSelected = selectedTime === time;
                                return (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`
                                            py-2.5 rounded-xl border text-sm font-medium transition-all
                                            ${isSelected 
                                                ? 'bg-[#C8AA6E]/20 border-[#C8AA6E] text-[#C8AA6E]' 
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}
                                        `}
                                    >
                                        {time}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
              )}

            </div>

            {/* Footer */}
            {step === 'datetime' && (
                <div className="p-5 border-t border-white/10 bg-[#1c1917] shrink-0">
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedTime || !selectedDate}
                        className={`
                            w-full py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300
                            ${(!selectedTime || !selectedDate)
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-[#C8AA6E] text-[#191512] hover:bg-[#d4b483] shadow-lg shadow-[#C8AA6E]/20'}
                        `}
                    >
                        Confirmar Agendamento
                        <ChevronRight size={18} />
                    </button>
                    <p className="text-[10px] text-center text-gray-500 mt-3">
                        A confirmação será enviada via WhatsApp.
                    </p>
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
