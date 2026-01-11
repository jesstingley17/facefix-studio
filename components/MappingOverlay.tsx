
import React, { useEffect, useState } from 'react';
import { FaceLandmarks } from '../types';

interface MappingOverlayProps {
  landmarks: FaceLandmarks | null;
  isMapping: boolean;
}

export const MappingOverlay: React.FC<MappingOverlayProps> = ({ landmarks, isMapping }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (landmarks) {
      setShowText(true);
      const timer = setTimeout(() => setShowText(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [landmarks]);

  if (!isMapping && !landmarks) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl">
      {/* Scanning Bar Animation */}
      {isMapping && (
        <div className="absolute inset-x-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-[scan_2s_linear_infinite] z-30"></div>
      )}

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Landmark Dots */}
      {landmarks?.points.map((pt, idx) => (
        <div
          key={pt.name}
          className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,1)] transition-all duration-700 ease-out"
          style={{ 
            left: `${pt.x / 10}%`, 
            top: `${pt.y / 10}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isMapping ? 0 : 0.8,
            transitionDelay: `${idx * 50}ms`
          }}
        >
          <div className="absolute inset-0 animate-ping bg-indigo-400 rounded-full opacity-40"></div>
        </div>
      ))}

      {/* Feedback Text */}
      {showText && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 px-6 py-3 rounded-2xl flex items-center gap-3 animate-bounce shadow-2xl">
          <i className="fas fa-check-circle text-indigo-400"></i>
          <span className="text-white font-bold text-sm tracking-wide">FACE GEOMETRY MAPPED</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
