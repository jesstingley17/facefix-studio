
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`group relative border-2 border-dashed border-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-indigo-500/50 bg-slate-800/20 hover:bg-slate-800/40 flex flex-col items-center justify-center cursor-pointer touch-manipulation ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!disabled ? triggerUpload : undefined}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-active:scale-95 group-hover:bg-indigo-500/10 transition-all duration-300">
        <i className="fas fa-cloud-upload-alt text-xl sm:text-2xl text-slate-400 group-hover:text-indigo-400"></i>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center px-2">Drop your photo here</h3>
      <p className="text-slate-400 text-center text-sm sm:text-base max-w-xs px-2">
        Select any photo you want to transform. All content types are accepted including shirtless/topless photos.
      </p>
      
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        <span className="px-2 sm:px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">PNG</span>
        <span className="px-2 sm:px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">JPG</span>
        <span className="px-2 sm:px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">WebP</span>
      </div>
    </div>
  );
};
