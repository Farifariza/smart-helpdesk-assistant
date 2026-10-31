import React from 'react';
import {
  CategoryId,
  LanguageId,
  ToneId,
  PresetSampleCase,
} from '../types';
import { CATEGORIES, LANGUAGES, SAMPLE_CASES } from '../data/categories';
import {
  Sparkles,
  Send,
  AlertCircle,
  FileQuestion,
  Hash,
  Languages,
  Tag,
  Sliders,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface ProblemInputCardProps {
  clientMessage: string;
  setClientMessage: (val: string) => void;
  category: CategoryId;
  setCategory: (cat: CategoryId) => void;
  language: LanguageId;
  setLanguage: (lang: LanguageId) => void;
  tone: ToneId;
  setTone: (tone: ToneId) => void;
  trackingNumber: string;
  setTrackingNumber: (tn: string) => void;
  isLoading: boolean;
  onAnalyze: () => void;
  onClear: () => void;
  errorMessage: string | null;
  onSelectPreset: (preset: PresetSampleCase) => void;
}

export const ProblemInputCard: React.FC<ProblemInputCardProps> = ({
  clientMessage,
  setClientMessage,
  category,
  setCategory,
  language,
  setLanguage,
  tone,
  setTone,
  trackingNumber,
  setTrackingNumber,
  isLoading,
  onAnalyze,
  onClear,
  errorMessage,
  onSelectPreset,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 transition-all hover:shadow-md">
      {/* Card Header & Sample Scenarios */}
      <div className="space-y-3 pb-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-base sm:text-lg">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <span>Kliendi pöördumise sisestamine</span>
          </div>

          <span className="text-xs text-slate-500">
            Uus kliendipöördumine
          </span>
        </div>

        {/* Quick Template Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
            <FileQuestion className="w-3.5 h-3.5" />
            Tüüpmallid:
          </span>
          {SAMPLE_CASES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer font-medium"
              title={preset.title}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* Large Text Area for Customer Problem */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="clientMessage"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5"
            >
              Kliendi probleemi kirjeldus <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{clientMessage.length} tähemärki</span>
              {clientMessage.length > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                  title="Puhasta väli"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Puhasta</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              id="clientMessage"
              rows={5}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Sisesta siia kliendi pöördumine või kaebus (nt „Minu saadetise jälgimine pole juba kolm päeva uuenenud. Kas saate öelda, kus minu pakk asub?“)..."
              className={`w-full rounded-xl border p-3.5 text-sm sm:text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all resize-y ${
                errorMessage && !clientMessage.trim()
                  ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                  : 'border-slate-300 focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 bg-white'
              }`}
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5 font-medium animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Problem Category Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-teal-600" />
            Probleemi kategooria
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`text-left p-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-600 text-teal-950 font-semibold ring-2 ring-teal-500/20 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate">{cat.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection & Tone Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Language for Customer Reply */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-teal-600" />
              Vastuse keel kliendile
            </label>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    type="button"
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`py-2 px-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Response Tone */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-600" />
              Vastuse suhtlustoon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'viisakas', label: 'Viisakas' },
                { id: 'vabandav', label: 'Vabandav' },
                { id: 'lakooniline', label: 'Konkreetne' },
              ].map((t) => {
                const isSelected = tone === t.id;
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTone(t.id as ToneId)}
                    className={`py-2 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-teal-800 text-white border-teal-800 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optional Tracking Code & Privacy Note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Hash className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Näidis jälgimiskood (valikuline)"
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 bg-slate-50/50"
              />
            </div>
            <button
              type="button"
              onClick={() => setTrackingNumber(`EE${Math.floor(100000000 + Math.random() * 900000000)}EE`)}
              className="text-[11px] text-teal-700 hover:text-teal-900 underline whitespace-nowrap cursor-pointer"
            >
              Genereeri kood
            </button>
          </div>

          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Klahvikombinatsioon:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[10px]">
              Ctrl + Enter
            </kbd>
          </span>
        </div>

        {/* Main Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onAnalyze}
            disabled={isLoading}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              isLoading
                ? 'bg-slate-700 cursor-not-allowed opacity-90'
                : 'bg-gradient-to-r from-slate-900 via-teal-900 to-teal-800 hover:from-slate-800 hover:to-teal-700 active:scale-[0.99] shadow-teal-950/20'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analüüsin probleemi ja koostan lahendust...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-teal-300" />
                <span>Analüüsi probleemi</span>
                <Send className="w-4 h-4 text-teal-300 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
