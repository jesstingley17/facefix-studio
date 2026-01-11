
import React, { useState } from 'react';

interface ResultCardProps {
  original: string;
  generated: string;
  isLoading: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ original, generated, isLoading }) => {
  const [sliderPos, setSliderPos] = useState(50);

  if (isLoading) {
    return (
      <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <i className="fas fa-bolt text-indigo-500 text-xl sm:text-2xl animate-pulse"></i>
          </div>
        </div>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-400 font-medium animate-pulse text-center px-4">Enhancing with Gemini AI...</p>
        <p className="text-xs text-slate-600 mt-2 px-4 sm:px-8 text-center max-w-sm">Powered by Google Gemini for the best quality results.</p>
      </div>
    );
  }

  // If no generated image yet, just show the original
  if (!generated) {
    return (
      <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <img 
          src={original} 
          alt="Original" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest pointer-events-none">
          Original
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 sm:px-8">
            <i className="fas fa-magic text-indigo-400 text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-50"></i>
            <p className="text-slate-400 text-xs sm:text-sm px-2">Enter a prompt and click "Transform Now" to generate</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Container for the comparison */}
      <div className="absolute inset-0 select-none">
        {/* Generated Image (Right) */}
        <img 
          src={generated} 
          alt="Generated" 
          className="w-full h-full object-cover"
        />
        
        {/* Original Image (Left, Clipped) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden" 
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={original} 
            alt="Original" 
            className="w-full h-full object-cover h-[600px]"
            style={{ width: `calc(100% * 100 / ${sliderPos})` }}
          />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize group"
          style={{ left: `calc(${sliderPos}% - 0.5px)` }}
        >
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fas fa-arrows-alt-h text-slate-900 text-lg"></i>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest pointer-events-none">
        Original
      </div>
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-indigo-600/80 backdrop-blur-md rounded-full text-xs font-bold text-white border border-indigo-500/20 uppercase tracking-widest pointer-events-none">
        Enhanced
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        <a 
          href={generated} 
          download="enhanced-photo.png"
          className="px-4 sm:px-6 py-2 bg-white text-slate-900 font-bold text-sm sm:text-base rounded-full shadow-lg hover:bg-slate-100 active:bg-slate-200 transition-all flex items-center gap-2 touch-manipulation min-h-[44px]"
        >
          <i className="fas fa-download"></i>
          <span>Download</span>
        </a>
      </div>
    </div>
  );
};
