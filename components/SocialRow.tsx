import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const SocialRow: React.FC = () => {
  return (
    <div className="flex justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          aria-label={item.label}
          className="p-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm text-slate-600 hover:text-brand-600 hover:scale-110 hover:shadow-md transition-all duration-300"
        >
          <item.icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default SocialRow;