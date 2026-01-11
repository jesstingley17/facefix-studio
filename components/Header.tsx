
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <i className="fas fa-magic text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
            FaceFix Studio
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="px-4 py-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-all">
            Share Feedback
          </a>
        </div>
      </div>
    </header>
  );
};
