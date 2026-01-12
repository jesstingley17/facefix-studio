
import React, { useState } from 'react';
import { AppStatus, GenerationResult } from './types';
import { editPhoto } from './services/imageEdit';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultCard } from './components/ResultCard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GenerationResult[]>([]);

  const handleImageSelected = async (base64: string) => {
    setOriginalImage(base64);
    setGeneratedImage(null);
    setError(null);
    setStatus(AppStatus.IDLE);
  };

  const handleGenerate = async () => {
    if (!originalImage) return;
    if (!prompt || !prompt.trim()) {
      setError('Please enter a prompt before generating.');
      return;
    }

    setStatus(AppStatus.GENERATING);
    setError(null);

    // Combine user prompt with selected options (lighting, clothing, pose)
    let finalPrompt = prompt.trim();
    const promptParts: string[] = [];
    
    if (selectedLighting) {
      const lightingPrompts: Record<string, string> = {
        'natural': 'natural daylight lighting',
        'studio': 'professional studio lighting, softbox lighting',
        'nighttime': 'nighttime lighting, ambient city lights',
        'golden-hour': 'golden hour lighting, warm sunset glow',
        'dramatic': 'dramatic lighting, high contrast, cinematic shadows',
        'soft': 'soft diffused lighting, gentle shadows',
        'warm': 'warm lighting, cozy atmosphere',
        'cool': 'cool lighting, blue tones',
        'rim': 'rim lighting, edge lighting',
        'spotlight': 'spotlight, dramatic focused lighting',
      };
      const lightingPrompt = lightingPrompts[selectedLighting];
      if (lightingPrompt) promptParts.push(lightingPrompt);
    }

    if (selectedClothing) {
      const clothingPrompts: Record<string, string> = {
        'casual': 'casual clothing, relaxed style',
        'formal': 'formal attire, elegant clothing',
        'swimwear': 'wearing beach attire, poolside clothing, summer resort wear, aquatic leisurewear, seaside apparel',
        'athletic': 'athletic wear, sportswear',
        'elegant': 'elegant dress, sophisticated clothing',
        'lingerie': 'wearing elegant silk, delicate lace details, fine textiles, sophisticated fabric textures, intricate patterns, luxurious materials, refined textiles',
        'streetwear': 'streetwear, urban style',
        'vintage': 'vintage clothing, retro style',
        'business': 'business attire, professional clothing',
        'evening': 'evening wear, glamorous dress',
        'minimal': 'minimal clothing, simple style',
        'none': 'no clothing, nude',
        'custom': 'custom clothing style',
      };
      const clothingPrompt = clothingPrompts[selectedClothing];
      if (clothingPrompt) promptParts.push(clothingPrompt);
    }

    if (selectedPose) {
      const posePrompts: Record<string, string> = {
        'standing': 'standing pose, full body',
        'sitting': 'sitting pose, relaxed position',
        'portrait': 'portrait pose, close-up',
        'dynamic': 'dynamic pose, movement',
        'elegant': 'elegant pose, graceful stance',
        'casual': 'casual pose, natural stance',
        'profile': 'profile view, side angle',
        'front': 'frontal view, facing camera',
        'three-quarter': 'three-quarter view',
        'action': 'action pose, energetic',
        'relaxed': 'relaxed pose, comfortable',
        'power': 'power pose, confident stance',
      };
      const posePrompt = posePrompts[selectedPose];
      if (posePrompt) promptParts.push(posePrompt);
    }

    if (promptParts.length > 0) {
      finalPrompt = finalPrompt ? `${finalPrompt}, ${promptParts.join(', ')}` : promptParts.join(', ');
    }

    try {
      const resultUrl = await editPhoto(originalImage, finalPrompt);
      setGeneratedImage(resultUrl);
      
      const newRecord: GenerationResult = {
        id: Date.now().toString(),
        originalUrl: originalImage,
        generatedUrl: resultUrl,
        prompt: prompt || '', // Store original prompt (without lighting) in history
        timestamp: Date.now(),
      };
      setHistory(prev => [newRecord, ...prev]);
      setStatus(AppStatus.IDLE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during generation.');
      setStatus(AppStatus.ERROR);
    }
  };

  const resetAll = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setSelectedLighting(null);
    setSelectedClothing(null);
    setSelectedPose(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight px-2">
            Unlimited Photo <span className="text-indigo-500">Metamorphosis</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Enhance, transform, or completely reimagine yourself. No restrictions on facial changes, backgrounds, or styling.
          </p>
        </div>

        {error && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start sm:items-center gap-2 sm:gap-3 text-red-400 animate-shake mx-2 sm:mx-0">
            <i className="fas fa-exclamation-triangle mt-0.5 sm:mt-0"></i>
            <p className="text-xs sm:text-sm font-medium break-words">{error}</p>
          </div>
        )}

        {!originalImage ? (
          <div className="max-w-xl mx-auto px-2 sm:px-0">
            <ImageUploader onImageSelected={handleImageSelected} disabled={status === AppStatus.GENERATING} />
            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 opacity-60 px-2 sm:px-0">
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-wand-sparkles text-indigo-400"></i>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Total Freedom</h4>
                <p className="text-xs text-slate-400 mt-1">Transform any feature without rigid identity locks.</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-bolt text-indigo-400"></i>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Fast Remixing</h4>
                <p className="text-xs text-slate-400 mt-1">Gemini 2.5 Flash processes your wildest requests in seconds.</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-unlock text-indigo-400"></i>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Unfiltered AI</h4>
                <p className="text-xs text-slate-400 mt-1">Maximized creative output using permissive AI safety tuning.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start px-2 sm:px-0">
            <div className="lg:col-span-8 relative group order-2 lg:order-1">
              <div className="relative">
                <ResultCard 
                  original={originalImage || ''} 
                  generated={generatedImage || ''} 
                  isLoading={status === AppStatus.GENERATING} 
                />
              </div>
            </div>
            
            <div className="lg:col-span-4 order-1 lg:order-2 z-10">
              <ControlPanel 
                prompt={prompt} 
                setPrompt={setPrompt}
                selectedLighting={selectedLighting}
                setSelectedLighting={setSelectedLighting}
                selectedClothing={selectedClothing}
                setSelectedClothing={setSelectedClothing}
                selectedPose={selectedPose}
                setSelectedPose={setSelectedPose}
                onGenerate={handleGenerate} 
                isLoading={status === AppStatus.GENERATING}
                onReset={resetAll}
              />
            </div>
          </div>
        )}

        {history.length > 0 && (
          <section className="mt-12 sm:mt-16 md:mt-20 px-2 sm:px-0">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Your Remix History</h3>
              <button onClick={() => setHistory([])} className="text-xs sm:text-sm text-slate-500 hover:text-red-400 transition-colors px-2 py-1 -mr-2">Clear All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {history.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-all"
                  onClick={() => {
                    setOriginalImage(item.originalUrl);
                    setGeneratedImage(item.generatedUrl);
                    setPrompt(item.prompt);
                  }}
                >
                  <img src={item.generatedUrl} alt="History item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-[10px] text-white/70 line-clamp-2 italic">"{item.prompt}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="py-10 border-t border-slate-800 bg-slate-950 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <i className="fas fa-magic text-indigo-500"></i>
            <span>© 2024 FaceFix Studio. Creative Metamorphosis powered by Google Gemini.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
