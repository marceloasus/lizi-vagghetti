import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center geometric star pattern approximating the provided logo */}
      <g transform="translate(50, 50)">
        {/* 8-pointed star base */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
             {/* Outer V shape */}
             <path d="M-6 -25 L0 -38 L6 -25 L0 -20 Z" className="text-brand-gold" fill="currentColor" />
             {/* Inner Diamond */}
             <path d="M-3 -12 L0 -18 L3 -12 L0 -6 Z" className="text-brand-goldLight" fill="currentColor" opacity="0.9" />
             {/* Decorative small dots/shards */}
             <circle cx="0" cy="-42" r="1.5" className="text-brand-goldDark" fill="currentColor" />
          </g>
        ))}
        {/* Center Ring */}
        <circle cx="0" cy="0" r="4" className="text-brand-gold" fill="currentColor" />
      </g>
    </svg>
  );
};