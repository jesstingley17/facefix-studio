
import React from 'react';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (p: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isLoading,
  onReset 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 bg-slate-900/40 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 h-full">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
          Transformation Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe any transformation... e.g., 'Make me look like an ancient Egyptian pharaoh with golden skin'"
          className="w-full h-28 sm:h-32 bg-slate-950 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all placeholder:text-slate-600"
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 touch-manipulation min-h-[44px]"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              <span>Unlocking Creativity...</span>
            </>
          ) : (
            <>
              <i className="fas fa-sparkles"></i>
              <span>Transform Now</span>
            </>
          )}
        </button>
        
        <button
          onClick={onReset}
          className="w-full py-2.5 sm:py-3 bg-slate-800/50 hover:bg-slate-800 active:bg-slate-700 text-slate-300 font-medium text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all touch-manipulation active:scale-95 min-h-[44px]"
        >
          Discard & Reset
        </button>
      </div>
      
      <div className="p-3 sm:p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl sm:rounded-2xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <i className="fas fa-unlock-alt text-indigo-400 mt-0.5 text-sm sm:text-base"></i>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            <span className="text-indigo-300 font-semibold">Unlimited Mode Enabled.</span> All restrictions removed - including identity preservation, content filters, and artistic limitations. All content types are permitted including shirtless, topless, sensual, artistic, and adult content.
          </p>
        </div>
      </div>
    </div>
  );
};
