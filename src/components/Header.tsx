import React from 'react';
import { Bot, Sparkles, BookOpen, History, RotateCcw, ShieldCheck } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <Bot className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Smart Helpdesk Assistant
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Logistika v1.0
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Tehisintellektil põhinev klienditoe abiline kullerteenuste haldamiseks
            </p>
          </div>
        </div>

        {/* Action Controls & AI Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* AI Mode Selector / Indicator */}
          <button
            onClick={onToggleDemoMode}
            title={
              useDemoMode
                ? 'Kliki, et lülituda päris Gemini TI ühendusele (kui API võti on olemas)'
                : 'Kliki, et lülituda test- ja DEMO-režiimile'
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              useDemoMode
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/40 hover:bg-amber-950/60'
                : isAiAvailable
                ? 'bg-teal-950/50 text-teal-300 border-teal-500/40 hover:bg-teal-900/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            {useDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold">DEMO-režiim</span>
                <span className="text-[10px] text-amber-400/80 hidden md:inline">
                  (Ettevalmistatud reeglistik)
                </span>
              </>
            ) : isAiAvailable ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-semibold text-teal-200">Gemini 3.8 Flash</span>
                <span className="text-[10px] text-teal-400/80 hidden md:inline">(Aktiivne TI)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Automaatne DEMO</span>
              </>
            )}
          </button>

          {/* History drawer button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:text-white transition-all cursor-pointer"
            title="Vaata selle vahetuse jooksul analüüsitud juhtumeid"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Ajalugu</span>
            {historyCount > 0 && (
              <span className="bg-teal-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Documentation modal button */}
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            title="Kuidas käivitada kohapeal, üles laadida ja kasutada õppetöös"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Õppejuhend ja esitlus</span>
            <span className="md:hidden">Juhend</span>
          </button>

          {/* Reset current case */}
          <button
            onClick={onResetCase}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent hover:border-rose-800/40 transition-all cursor-pointer flex items-center gap-1"
            title="Tühjenda praegune juhtum"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Tühjenda juhtum</span>
          </button>
        </div>
      </div>

      {/* Prototype privacy banner */}
      <div className="bg-teal-950/60 border-t border-teal-900/40 px-4 py-1.5 text-center text-[11px] text-teal-200/90 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span>
          <strong>Õppetöö prototüüp:</strong> Rakendus ei ole ühendatud ettevõtte reaalsete süsteemidega. Ära sisesta klientide päris isikuandmeid ega telefoninumbreid.
        </span>
      </div>
    </header>
  );
};
