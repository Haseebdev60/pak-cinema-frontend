import React, { useState, useEffect } from 'react';

/**
 * MovieImage Component
 * 
 * Elegant component that handles movie posters and banners.
 * Automatically displays a stunning premium dark/gold CSS-based fallback
 * if the remote Unsplash or other external URLs fail to load (e.g. offline environment).
 */
export default function MovieImage({ src, alt, className, type = 'poster' }) {
  const [error, setError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    if (type === 'banner') {
      return (
        <div 
          className={`relative flex flex-col justify-end p-8 bg-gradient-to-br from-cinema-card to-cinema-bg border border-white/5 w-full h-full overflow-hidden ${className}`}
        >
          {/* Ambient blur effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cinema-red/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-transparent to-transparent z-10"></div>
          
          {/* Content */}
          <div className="relative z-20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cinema-gold/10 flex items-center justify-center border border-cinema-gold/25 text-cinema-gold text-2xl shrink-0">
              🎬
            </div>
            <div>
              <span className="text-[10px] text-cinema-gold uppercase tracking-widest block mb-0.5">CineGold Premium Selection</span>
              <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider line-clamp-1">{alt}</h2>
            </div>
          </div>
        </div>
      );
    }

    // Default poster layout
    return (
      <div 
        className={`relative flex flex-col justify-between p-5 bg-gradient-to-br from-cinema-card to-cinema-bg border border-white/5 w-full h-full overflow-hidden ${className}`}
        style={{ minHeight: 'inherit' }}
      >
        {/* Ambient blur effects */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cinema-gold/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cinema-red/5 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Screen/Projector line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/30 to-transparent"></div>
        
        {/* Centered Graphic Icon */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-cinema-gold/10 flex items-center justify-center border border-cinema-gold/25 text-cinema-gold text-xl">
            🎬
          </div>
          <span className="text-xs font-bold text-cinema-gold tracking-wide uppercase text-center max-w-[150px] line-clamp-3">
            {alt}
          </span>
        </div>
        
        {/* Bottom banner details */}
        <div className="w-full text-center">
          <span className="text-[10px] text-white/30 tracking-widest uppercase">CineGold Premium</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
