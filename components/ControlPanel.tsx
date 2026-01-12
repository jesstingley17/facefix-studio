
import React from 'react';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (p: string) => void;
  selectedLighting: string | null;
  setSelectedLighting: (lighting: string | null) => void;
  selectedClothing: string | null;
  setSelectedClothing: (clothing: string | null) => void;
  selectedPose: string | null;
  setSelectedPose: (pose: string | null) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onReset: () => void;
}

interface Option {
  id: string;
  label: string;
  icon: string;
}

const LIGHTING_OPTIONS: Option[] = [
  { id: 'natural', label: 'Natural', icon: 'fa-sun' },
  { id: 'studio', label: 'Studio', icon: 'fa-lightbulb' },
  { id: 'nighttime', label: 'Nighttime', icon: 'fa-moon' },
  { id: 'golden-hour', label: 'Golden Hour', icon: 'fa-sun' },
  { id: 'dramatic', label: 'Dramatic', icon: 'fa-theater-masks' },
  { id: 'soft', label: 'Soft', icon: 'fa-cloud' },
  { id: 'warm', label: 'Warm', icon: 'fa-fire' },
  { id: 'cool', label: 'Cool', icon: 'fa-snowflake' },
  { id: 'rim', label: 'Rim', icon: 'fa-circle' },
  { id: 'spotlight', label: 'Spotlight', icon: 'fa-lightbulb' },
];

const CLOTHING_OPTIONS: Option[] = [
  { id: 'casual', label: 'Casual', icon: 'fa-tshirt' },
  { id: 'formal', label: 'Formal', icon: 'fa-user-tie' },
  { id: 'swimwear', label: 'Swimwear', icon: 'fa-swimming-pool' },
  { id: 'athletic', label: 'Athletic', icon: 'fa-dumbbell' },
  { id: 'elegant', label: 'Elegant', icon: 'fa-gem' },
  { id: 'lingerie', label: 'Lingerie', icon: 'fa-heart' },
  { id: 'streetwear', label: 'Streetwear', icon: 'fa-store' },
  { id: 'vintage', label: 'Vintage', icon: 'fa-clock-rotate-left' },
  { id: 'business', label: 'Business', icon: 'fa-briefcase' },
  { id: 'evening', label: 'Evening', icon: 'fa-moon' },
  { id: 'minimal', label: 'Minimal', icon: 'fa-minus' },
  { id: 'none', label: 'None', icon: 'fa-ban' },
  { id: 'custom', label: 'Custom', icon: 'fa-palette' },
];

const POSE_OPTIONS: Option[] = [
  { id: 'standing', label: 'Standing', icon: 'fa-user' },
  { id: 'sitting', label: 'Sitting', icon: 'fa-chair' },
  { id: 'portrait', label: 'Portrait', icon: 'fa-camera' },
  { id: 'dynamic', label: 'Dynamic', icon: 'fa-running' },
  { id: 'elegant', label: 'Elegant', icon: 'fa-sparkles' },
  { id: 'casual', label: 'Casual', icon: 'fa-smile' },
  { id: 'profile', label: 'Profile', icon: 'fa-user-circle' },
  { id: 'front', label: 'Front', icon: 'fa-user' },
  { id: 'three-quarter', label: '3/4 View', icon: 'fa-user-astronaut' },
  { id: 'action', label: 'Action', icon: 'fa-bolt' },
  { id: 'relaxed', label: 'Relaxed', icon: 'fa-couch' },
  { id: 'power', label: 'Power', icon: 'fa-hand-fist' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  prompt, 
  setPrompt,
  selectedLighting,
  setSelectedLighting,
  selectedClothing,
  setSelectedClothing,
  selectedPose,
  setSelectedPose,
  onGenerate, 
  isLoading,
  onReset 
}) => {
  const handleLightingSelect = (lightingId: string) => {
    setSelectedLighting(selectedLighting === lightingId ? null : lightingId);
  };

  const handleClothingSelect = (clothingId: string) => {
    setSelectedClothing(selectedClothing === clothingId ? null : clothingId);
  };

  const handlePoseSelect = (poseId: string) => {
    setSelectedPose(selectedPose === poseId ? null : poseId);
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-slate-900/40 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 h-full">
      {/* Lighting Options */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
          Lighting
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
          {LIGHTING_OPTIONS.map((lighting) => (
            <button
              key={lighting.id}
              onClick={() => handleLightingSelect(lighting.id)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all touch-manipulation active:scale-95 ${
                selectedLighting === lighting.id
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' 
                  : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-500 active:bg-slate-800/50'
              }`}
            >
              <i className={`fas ${lighting.icon} mb-1 sm:mb-2 text-base sm:text-lg`}></i>
              <span className="text-xs font-semibold text-center leading-tight">{lighting.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clothing Options */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
          Clothing
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {CLOTHING_OPTIONS.map((clothing) => (
            <button
              key={clothing.id}
              onClick={() => handleClothingSelect(clothing.id)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all touch-manipulation active:scale-95 ${
                selectedClothing === clothing.id
                  ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' 
                  : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-500 active:bg-slate-800/50'
              }`}
            >
              <i className={`fas ${clothing.icon} mb-1 sm:mb-2 text-base sm:text-lg`}></i>
              <span className="text-xs font-semibold text-center leading-tight">{clothing.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pose Options */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
          Pose
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {POSE_OPTIONS.map((pose) => (
            <button
              key={pose.id}
              onClick={() => handlePoseSelect(pose.id)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all touch-manipulation active:scale-95 ${
                selectedPose === pose.id
                  ? 'bg-pink-500/10 border-pink-500/50 text-pink-400' 
                  : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-500 active:bg-slate-800/50'
              }`}
            >
              <i className={`fas ${pose.icon} mb-1 sm:mb-2 text-base sm:text-lg`}></i>
              <span className="text-xs font-semibold text-center leading-tight">{pose.label}</span>
            </button>
          ))}
        </div>
      </div>

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
