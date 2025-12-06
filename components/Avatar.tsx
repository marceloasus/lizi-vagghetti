import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative group cursor-default">
      {/* Glow behind avatar */}
      <div className="absolute inset-0 bg-[#C8AA6E]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
      
      {/* Container */}
      <div className="relative w-[150px] h-[150px] flex items-center justify-center bg-[#1c1917]/80 backdrop-blur-2xl rounded-[35px] border border-white/[0.08] shadow-2xl shadow-black/40 group-hover:border-[#C8AA6E]/20 transition-all duration-500 overflow-visible">
          {src ? (
             <img src={src} alt={alt} className="w-full h-full object-cover rounded-[35px]" />
          ) : (
             <BrandLogo className="w-[80px] h-[80px] text-[#C8AA6E] drop-shadow-[0_0_15px_rgba(200,170,110,0.15)]" />
          )}
          
          {/* Sparkle Badge - Bottom Right Corner */}
          <div className="absolute -bottom-3 -right-3 bg-[#1f1b18] border border-[#C8AA6E]/40 text-[#C8AA6E] p-2.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 animate-pulse-slow">
              <Sparkles size={16} fill="currentColor" />
          </div>
      </div>
    </div>
  );
};