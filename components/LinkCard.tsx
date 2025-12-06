import React from 'react';
import { LinkCardItem } from '../types';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LinkCardProps {
  item: LinkCardItem;
  index: number;
  onClick?: () => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item, index, onClick }) => {
  const Component = onClick ? 'button' : 'a';
  const isExternal = !onClick && (item.url.startsWith('http') || item.url.startsWith('https'));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + (index * 0.1) }}
    >
      <Component
        href={!onClick ? item.url : undefined}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`
          group relative w-full flex items-center p-4 pr-5 min-h-[76px]
          rounded-2xl transition-all duration-500 ease-out
          bg-white/[0.03] backdrop-blur-md
          border border-white/[0.08]
          hover:bg-white/[0.07]
          hover:border-[#C8AA6E]/30 
          hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]
          active:scale-[0.99]
          text-left cursor-pointer
        `}
      >
        {/* Icon Container */}
        <div className={`
          flex items-center justify-center
          w-11 h-11 rounded-full mr-4 shrink-0
          bg-white/[0.03] border border-white/10 text-[#d4c5b0]
          group-hover:text-[#C8AA6E] group-hover:border-[#C8AA6E]/30 group-hover:bg-[#C8AA6E]/10 
          transition-all duration-300
        `}>
          {item.icon && <item.icon size={22} strokeWidth={1.2} />}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <h3 className="font-serif text-[17px] font-medium text-[#f3f3f3] group-hover:text-white transition-colors truncate tracking-wide">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-[12px] text-[#9ca3af] group-hover:text-[#d1d5db] transition-colors font-sans font-light truncate">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="text-white/10 group-hover:text-[#C8AA6E]/60 group-hover:translate-x-0.5 transition-all duration-300 pl-3">
          <ChevronRight size={18} strokeWidth={1.5} />
        </div>
      </Component>
    </motion.div>
  );
};