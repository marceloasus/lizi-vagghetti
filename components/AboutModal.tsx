import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { PROFILE, ABOUT_TEXT } from '../constants';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-lg bg-[#1C1917] border border-[#C8AA6E]/30 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header / Cover */}
            <div className="relative h-24 bg-gradient-to-b from-[#C8AA6E]/20 to-[#1C1917] shrink-0">
              <div className="absolute top-4 right-4 z-10">
                <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/80 transition-colors backdrop-blur-md">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="px-8 pb-8 -mt-12 flex flex-col items-center overflow-y-auto custom-scrollbar">
              
              {/* Featured Portrait Image */}
              <div className="mb-6 relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#C8AA6E]/30 blur-2xl rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                
                {/* Image Container */}
                <div className="relative w-48 h-64 md:w-56 md:h-72 bg-[#1c1917] rounded-2xl border-2 border-[#C8AA6E]/30 shadow-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                   <img 
                     src={PROFILE.portraitUrl} 
                     alt={PROFILE.name} 
                     className="w-full h-full object-cover"
                   />
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-serif text-[#F5F5F0] mb-2">{PROFILE.name}</h3>
                <p className="text-[#C8AA6E] font-medium text-sm tracking-widest uppercase opacity-90">{PROFILE.role}</p>
              </div>

              {/* Text Content */}
              <div className="space-y-4 text-center">
                 <h4 className="font-serif text-xl text-[#C8AA6E] mb-2">{ABOUT_TEXT.welcome}</h4>
                 
                 {ABOUT_TEXT.paragraphs.map((paragraph, index) => (
                   <p key={index} className="text-gray-300 font-sans text-[15px] leading-relaxed">
                     {paragraph}
                   </p>
                 ))}
              </div>

              {/* Footer Signature */}
              <div className="mt-8 pt-6 border-t border-white/10 w-full flex justify-center items-center gap-2 opacity-60 shrink-0">
                <Heart size={14} className="text-[#C8AA6E]" fill="currentColor" />
                <span className="text-xs text-gray-400 uppercase tracking-widest">Gratidão e Luz</span>
                <Heart size={14} className="text-[#C8AA6E]" fill="currentColor" />
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};