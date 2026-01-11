
import React, { useState } from 'react';
import { AppStatus, GenerationResult } from './types';
import { editPhoto } from './services/replicate';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultCard } from './components/ResultCard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
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

    try {
      const resultUrl = await editPhoto(originalImage, prompt);
      setGeneratedImage(resultUrl);
      
      const newRecord: GenerationResult = {
        id: Date.now().toString(),
        originalUrl: originalImage,
        generatedUrl: resultUrl,
        prompt: prompt || '',
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
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Unlimited Photo <span className="text-indigo-500">Metamorphosis</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Enhance, transform, or completely reimagine yourself. No restrictions on facial changes, backgrounds, or styling.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 animate-shake">
            <i className="fas fa-exclamation-triangle"></i>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!originalImage ? (
          <div className="max-w-xl mx-auto">
            <ImageUploader onImageSelected={handleImageSelected} disabled={status === AppStatus.GENERATING} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 relative group">
              <div className="relative">
                <ResultCard 
                  original={originalImage} 
                  generated={generatedImage || ''} 
                  isLoading={status === AppStatus.GENERATING} 
                />
              </div>
            </div>
            
            <div className="lg:col-span-4 sticky top-28">
              <ControlPanel 
                prompt={prompt} 
                setPrompt={setPrompt} 
                onGenerate={handleGenerate} 
                isLoading={status === AppStatus.GENERATING}
                onReset={resetAll}
              />
            </div>
          </div>
        )}

        {history.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Your Remix History</h3>
              <button onClick={() => setHistory([])} className="text-sm text-slate-500 hover:text-red-400 transition-colors">Clear All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
