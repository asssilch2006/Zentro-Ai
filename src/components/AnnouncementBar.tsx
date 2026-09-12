import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface AnnouncementBarProps {
  onTryEmergent: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onTryEmergent }) => {
  return (
    <aside
      id="announcement-bar"
      aria-label="Promotional announcement"
      className="w-full bg-gradient-to-r from-blue-100 via-sky-50 to-blue-100 border-b border-blue-200/80 text-slate-800 text-xs sm:text-sm py-2 px-4 shadow-[inset_0_-1px_0_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="inline-flex items-center gap-1 text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-700 border border-blue-300/60 shrink-0">
          <Sparkles className="w-3 h-3 text-blue-600" />
          Featured Partner
        </span>

        <p className="font-medium text-slate-700">
          <strong className="text-slate-900 font-bold">Emergent:</strong> build full-stack web & mobile apps just by chatting.
        </p>

        <button
          id="announcement-try-btn"
          onClick={onTryEmergent}
          className="inline-flex items-center gap-1 bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-900 font-bold text-xs px-3.5 py-1 rounded-full shadow-sm transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95"
        >
          <span>Try it now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
