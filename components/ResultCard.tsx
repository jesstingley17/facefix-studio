
import React, { useState } from 'react';
import { saveImageToGallery } from '../utils/imageSave';

interface ResultCardProps {
  original: string;
  generated: string;
  isLoading: boolean;
}

type ViewMode = 'generated' | 'original' | 'side-by-side';

export const ResultCard: React.FC<ResultCardProps> = ({ original, generated, isLoading }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('generated');

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

  // View mode selector buttons
  const viewButtons = (
    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2 z-20">
      <button
        onClick={() => setViewMode('generated')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all backdrop-blur-md border touch-manipulation ${
          viewMode === 'generated'
            ? 'bg-indigo-600/90 text-white border-indigo-500/50 shadow-lg'
            : 'bg-black/40 text-white/70 border-white/20 hover:bg-black/60'
        }`}
      >
        <i className="fas fa-magic mr-1.5"></i>
        Enhanced
      </button>
      <button
        onClick={() => setViewMode('side-by-side')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all backdrop-blur-md border touch-manipulation ${
          viewMode === 'side-by-side'
            ? 'bg-indigo-600/90 text-white border-indigo-500/50 shadow-lg'
            : 'bg-black/40 text-white/70 border-white/20 hover:bg-black/60'
        }`}
      >
        <i className="fas fa-columns mr-1.5"></i>
        Compare
      </button>
      <button
        onClick={() => setViewMode('original')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all backdrop-blur-md border touch-manipulation ${
          viewMode === 'original'
            ? 'bg-black/60 text-white border-white/30 shadow-lg'
            : 'bg-black/40 text-white/70 border-white/20 hover:bg-black/60'
        }`}
      >
        <i className="fas fa-image mr-1.5"></i>
        Original
      </button>
    </div>
  );

  // Side-by-side view
  if (viewMode === 'side-by-side') {
    return (
      <div className="relative bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        {viewButtons}
        
        <div className="grid grid-cols-2 gap-0">
          {/* Original */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px]">
            <img 
              src={original} 
              alt="Original" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 uppercase tracking-widest">
              Original
            </div>
          </div>
          
          {/* Generated */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px] border-l border-slate-700">
            <img 
              src={generated} 
              alt="Generated" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2 sm:px-3 py-1 bg-indigo-600/80 backdrop-blur-md rounded-full text-xs font-bold text-white border border-indigo-500/20 uppercase tracking-widest">
              Enhanced
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={async () => {
              try {
                await saveImageToGallery(generated, 'enhanced-photo.png');
              } catch (error: any) {
                console.error('Failed to save image:', error);
                const link = document.createElement('a');
                link.href = generated;
                link.download = 'enhanced-photo.png';
                link.click();
              }
            }}
            className="px-4 sm:px-6 py-2 bg-white text-slate-900 font-bold text-sm sm:text-base rounded-full shadow-lg hover:bg-slate-100 active:bg-slate-200 transition-all flex items-center gap-2 touch-manipulation min-h-[44px]"
          >
            <i className="fas fa-save"></i>
            <span>Save to Gallery</span>
          </button>
        </div>
      </div>
    );
  }

  // Single image view (generated or original)
  const displayImage = viewMode === 'generated' ? generated : original;
  const isEnhanced = viewMode === 'generated';

  return (
    <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[600px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {viewButtons}
      
      <img 
        src={displayImage} 
        alt={isEnhanced ? "Enhanced" : "Original"} 
        className="w-full h-full object-cover"
      />

      {/* Label */}
      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold text-white border uppercase tracking-widest pointer-events-none ${
        isEnhanced 
          ? 'bg-indigo-600/80 border-indigo-500/20' 
          : 'bg-black/60 border-white/20'
      }`}>
        {isEnhanced ? 'Enhanced' : 'Original'}
      </div>

      {/* Save Button */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={async () => {
            try {
              await saveImageToGallery(generated, 'enhanced-photo.png');
            } catch (error: any) {
              console.error('Failed to save image:', error);
              const link = document.createElement('a');
              link.href = generated;
              link.download = 'enhanced-photo.png';
              link.click();
            }
          }}
          className="px-4 sm:px-6 py-2 bg-white text-slate-900 font-bold text-sm sm:text-base rounded-full shadow-lg hover:bg-slate-100 active:bg-slate-200 transition-all flex items-center gap-2 touch-manipulation min-h-[44px]"
        >
          <i className="fas fa-save"></i>
          <span>Save to Gallery</span>
        </button>
      </div>
    </div>
  );
};
