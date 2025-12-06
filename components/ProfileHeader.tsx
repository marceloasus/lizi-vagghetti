import React from 'react';
import { PROFILE } from '../constants';
import { Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in pt-8 pb-4">
      {/* Logo Container */}
      <div className="relative mb-8 group cursor-default">
        {/* Glow behind logo */}
        <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
        
        <div className="relative w-[110px] h-[110px] flex items-center justify-center bg-[#1c1917]/80 backdrop-blur-2xl rounded-[28px] border border-white/[0.08] shadow-2xl shadow-black/40 group-hover:border-brand-gold/20 transition-all duration-500">
            <BrandLogo className="w-[60px] h-[60px] text-brand-gold drop-shadow-[0_0_15px_rgba(212,180,131,0.15)]" />
            
            {/* Sparkle Badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#1f1b18] border border-brand-gold/30 text-brand-gold p-1.5 rounded-full shadow-lg z-10 animate-pulse-slow">
                <Sparkles size={12} fill="currentColor" />
            </div>
        </div>
      </div>
      
      {/* Name */}
      <h1 className="text-[2.2rem] sm:text-[2.5rem] leading-none font-serif font-medium text-[#f5f2eb] mb-4 tracking-wide drop-shadow-sm">
        {PROFILE.name}
      </h1>

      {/* Title - Gold */}
      <h2 className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.15em] mb-4 opacity-90">
        Especialista em Apometria Multidimensional
      </h2>

      {/* Role - White Bold */}
      <p className="text-[17px] font-semibold text-[#e6e2de] mb-1.5">
        Mentora Espiritual
      </p>

      {/* Subtitle - Grey */}
      <p className="text-[13px] text-[#9c948e] font-light mb-3 max-w-[280px] mx-auto leading-relaxed">
        Mentoria da Aurora e Mim e Despertar da Aurora
      </p>

      {/* Footer Role - White/Grey mix */}
      <p className="text-[14px] font-medium text-[#cfccc9] opacity-90">
        Psicoterapeuta • Médium Canalizadora
      </p>
      
      {/* Divider Dot */}
      <div className="mt-8 mb-4 flex justify-center opacity-40">
          <div className="w-1 h-1 rounded-full bg-brand-gold/70 shadow-[0_0_8px_currentColor]"></div>
      </div>
    </div>
  );
};

export default ProfileHeader;