import React from 'react';
import {
  Bot,
  Sparkles,
  History,
  RotateCcw,
  Headphones,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

interface HeaderProps {
  isAiAvailable: boolean;
  useDemoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenDocs: () => void;
  onOpenHistory: () => void;
  onResetCase: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isAiAvailable,
  useDemoMode,
  onToggleDemoMode,
  onOpenDocs,
  onOpenHistory,
  onResetCase,
  historyCount,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Smart Helpdesk Assistant
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                Logistika Dispatch
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Kuller- ja logistikaettevõtte klienditoe töölaud
            </p>
          </div>
        </div>

        {/* Center: Live Agent & System Status (Modern Enterprise Look) */}
        <div className="hidden lg:flex items-center gap-3.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-400">Klienditugi:</span>
            <span className="font-semibold text-emerald-300">Liinil (Aktiivne)</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Headphones className="w-3.5 h-3.5 text-teal-400" />
            <span>1. taseme logistikatugi</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Süsteemid korras</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Mode Badge / Selector */}
          <button
            onClick={onToggleDemoMode}
            title={
              useDemoMode
                ? 'Kliki, et vahetada reaalajas Gemini TI režiimi'
                : 'Kliki, et lülituda ettevalmistatud logistika reeglistikule'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              useDemoMode
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/40 hover:bg-amber-950/60'
                : isAiAvailable
                ? 'bg-teal-950/50 text-teal-300 border-teal-500/40 hover:bg-teal-900/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            {useDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold">DEMO-mootor</span>
              </>
            ) : isAiAvailable ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-semibold text-teal-200">Gemini 3.8</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Automaatne</span>
              </>
            )}
          </button>

          {/* Ticket History */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:text-white transition-all cursor-pointer"
            title="Vaata selle vahetuse jooksul lahendatud juhtumeid"
          >
            <History className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Ajalugu</span>
            {historyCount > 0 && (
              <span className="bg-teal-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Discreet Info / SOP Juhised */}
          <button
            onClick={onOpenDocs}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            title="SOP reeglid, süsteemi arhitektuur ja juhised"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">SOP Juhised</span>
          </button>

          {/* Reset / New Case Button */}
          <button
            onClick={onResetCase}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            title="Alusta uut tühja juhtumit"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Uus juhtum</span>
          </button>
        </div>
      </div>
    </header>
  );
};
