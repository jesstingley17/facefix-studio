
import React from 'react';
import { Preset } from '../types';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (p: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onReset: () => void;
}

const PRESETS: Preset[] = [
  { id: '1', label: 'Studio Portrait', prompt: 'Professional high-end studio portrait, soft cinematic lighting, neutral blurred background, professional attire', icon: 'fa-camera' },
  { id: '2', label: 'Cyberpunk', prompt: 'Neon-lit cyberpunk city background, futuristic metallic jacket, dramatic blue and pink lighting, detailed textures', icon: 'fa-robot' },
  { id: '3', label: 'Age 80', prompt: 'Hyper-realistic aging to age 80, detailed wrinkles, white hair, wise expression, maintaining lighting', icon: 'fa-hourglass-half' },
  { id: '4', label: 'Statue', prompt: 'A magnificent marble statue, carved from white Carrara stone, museum lighting, classical style', icon: 'fa-monument' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isLoading,
  onReset 
}) => {
  return (
    <div className="space-y-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800 h-full">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-3 ml-1 uppercase tracking-wider">
          Creative Presets
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPrompt(p.prompt)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                prompt === p.prompt 
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' 
                  : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              <i className={`fas ${p.icon} mb-2 text-lg`}></i>
              <span className="text-xs font-semibold">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-3 ml-1 uppercase tracking-wider">
          Custom Transformation
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe any transformation (optional)... e.g., 'Make me look like an ancient Egyptian pharaoh with golden skin'"
          className="w-full h-32 bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all placeholder:text-slate-600"
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
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
          className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium rounded-2xl transition-all"
        >
          Discard & Reset
        </button>
      </div>
      
      <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
        <div className="flex items-start gap-3">
          <i className="fas fa-unlock-alt text-indigo-400 mt-0.5"></i>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-indigo-300 font-semibold">Unlimited Mode Enabled.</span> All identity preservation constraints have been removed. Gemini 2.5 Flash will prioritize your prompt above all else.
          </p>
        </div>
      </div>
    </div>
  );
};
