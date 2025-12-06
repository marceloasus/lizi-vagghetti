import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE, LINKS, HEADER_BG_IMAGE } from './constants';
import { Avatar } from './components/Avatar';
import { LinkCard } from './components/LinkCard';
import { ChatModal } from './components/ChatModal';
import { SchedulingModal } from './components/SchedulingModal';
import { AboutModal } from './components/AboutModal';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    if (id === 'agendar') {
      setIsScheduleOpen(true);
    } else if (id === 'about') {
      setIsAboutOpen(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#191512] text-[#F5F5F0]">
      
      {/* --- AMBIENT LIGHTING SYSTEM (Background) --- */}
      
      {/* 1. Deep Warm Base Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2A1F18] via-[#191512] to-[#0F0C0A] z-0 pointer-events-none" />

      {/* 2. Golden Aurora (Top Glow) */}
      <div className="fixed top-[-20%] left-0 w-full h-[800px] z-0 pointer-events-none opacity-60 mix-blend-screen">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#C8AA6E] blur-[150px] rounded-full opacity-30 animate-pulse-slow"></div>
         <div className="absolute top-10 left-1/4 w-[40%] h-[60%] bg-[#D4AF37] blur-[120px] rounded-full opacity-20 animate-float"></div>
         <div className="absolute top-10 right-1/4 w-[40%] h-[60%] bg-[#8B5E3C] blur-[120px] rounded-full opacity-20 animate-float-delayed"></div>
      </div>

      {/* 3. Hero Image (Texture Overlay) */}
      <div className="absolute top-0 left-0 w-full h-[650px] z-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-40">
        <img 
          src={HEADER_BG_IMAGE} 
          alt="Texture" 
          className="w-full h-full object-cover grayscale contrast-125"
        />
        {/* Soft mask to blend image into dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#191512]/20 to-[#191512]"></div>
      </div>

      {/* 4. Star Particles */}
      <div className="star-bg" />
      
      {/* --- CONTENT --- */}
      <main className="relative z-10 max-w-lg mx-auto px-6 py-12 md:py-16 flex flex-col items-center">
        
        {/* Profile Section */}
        <div className="text-center mb-12 w-full flex flex-col items-center">
          <div className="flex justify-center mb-8">
            <Avatar src={PROFILE.avatarUrl} alt={PROFILE.name} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#E6Cfa0] mb-3 tracking-wide drop-shadow-[0_2px_10px_rgba(200,170,110,0.3)]">
              {PROFILE.name}
            </h1>
            
            {/* Gold Subtitle with divider lines */}
            <div className="flex items-center gap-3 w-full justify-center mb-2 opacity-90">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C8AA6E]"></div>
                <h2 className="text-xs md:text-sm font-bold text-[#C8AA6E] tracking-[0.2em] uppercase shadow-black drop-shadow-sm">
                  {PROFILE.handle}
                </h2>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C8AA6E]"></div>
            </div>

            {/* Subtitles stack */}
            <div className="mt-2 space-y-1.5 font-sans text-sm md:text-[15px] leading-relaxed">
              <p className="font-medium text-[#F3EFE0] tracking-wide">Mentora Espiritual</p>
              <p className="text-[#C8AA6E]/80 font-serif italic text-[13px]">"Mentoria da Aurora e Mim e Despertar da Aurora"</p>
              <p className="font-semibold text-white/90 text-xs uppercase tracking-wider pt-2 border-t border-[#C8AA6E]/20 mt-2 inline-block px-4">
                Psicoterapeuta • Médium Canalizadora
              </p>
            </div>
          </motion.div>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3.5">
          {LINKS.map((link, idx) => (
            <LinkCard 
              key={link.id} 
              item={link} 
              index={idx} 
              onClick={
                (link.id === 'agendar' || link.id === 'about') 
                  ? () => handleLinkClick(link.id) 
                  : undefined
              }
            />
          ))}
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-20 text-center text-gray-500 text-[10px] tracking-widest uppercase relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Subtle glow behind footer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-[#C8AA6E]/10 blur-xl rounded-full -z-10"></div>
          
          <div className="flex items-center justify-center gap-2 mb-2 opacity-60 text-[#C8AA6E]">
             <Sparkles size={8} /> <span>Apometria Ser de Luz</span> <Sparkles size={8} />
          </div>
        </motion.footer>

      </main>

      {/* Modals */}
      <ChatModal />
      <SchedulingModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;