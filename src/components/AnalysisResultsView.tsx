import React, { useState } from 'react';
import {
  AnalysisResult,
  LanguageId,
} from '../types';
import {
  CheckCircle2,
  Copy,
  Check,
  Share2,
  FileText,
  ListTodo,
  LifeBuoy,
  MessageSquareText,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AnalysisResultsViewProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  selectedLanguage: LanguageId;
  editedDraft: string;
  setEditedDraft: (text: string) => void;
  onCopyReply: () => void;
  onCopyFullCase: () => void;
  onResetCase: () => void;
  isCopied: boolean;
  trackingNumber?: string;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  result,
  isLoading,
  selectedLanguage,
  editedDraft,
  setEditedDraft,
  onCopyReply,
  onCopyFullCase,
  onResetCase,
  isCopied,
  trackingNumber,
}) => {
  // State for ticked off action items
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Helper inserts for agent convenience
  const appendSnippet = (snippet: string) => {
    setEditedDraft(`${editedDraft.trim()}\n\n${snippet}`);
  };

  // Loading state placeholder with realistic steps
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 sm:p-10 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 animate-pulse">
            <Sparkles className="w-8 h-8 text-teal-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          Analüüsin kliendi pöördumist...
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6">
          Tuvastan logistilist probleemi, kontrollin standardseid tegevusjuhiseid ning koostan professionaalset vastust.
        </p>

        {/* Step-by-step progress simulation indicator */}
        <div className="w-full max-w-sm space-y-2.5 text-left text-xs bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-teal-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Kliendi teksti struktuuri lugemine</span>
          </div>
          <div className="flex items-center gap-2 text-teal-700 font-medium">
            <div className="w-4 h-4 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin shrink-0" />
            <span>Logistika standardprotseduuride (SOP) vastavusse viimine...</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Vastuse mustandi genereerimine sihtkeeles...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty state before user has analyzed anything
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-dashed border-slate-300 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <Layers className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
          Analüüsitulemused kuvatakse siin
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-5 leading-relaxed">
          Sisesta vasakult kliendi probleemi kirjeldus, vali kategooria ja keel ning vajuta nupule <strong>„Analüüsi probleemi“</strong>.
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Süsteem on valmis uue juhtumi analüüsimiseks</span>
        </div>
      </div>
    );
  }

  const urgencyBadge = {
    madal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tavaline: 'bg-blue-50 text-blue-700 border-blue-200',
    kiire: 'bg-amber-50 text-amber-700 border-amber-200',
    kriitiline: 'bg-rose-50 text-rose-700 border-rose-200',
  }[result.urgencyLevel || 'tavaline'];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
            2
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Analüüsi ja tegevuskava tulemused
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${urgencyBadge}`}>
            Kiirus: {result.urgencyLevel || 'tavaline'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Genereeritud: {result.generatedAt}
          </span>
          <span className="text-slate-300">•</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
            Allikas: {result.source === 'gemini' ? 'Gemini 3.8 Flash' : 'DEMO-mootor'}
          </span>
        </div>
      </div>

      {/* 1. PROBLEEMI LÜHIKOKKUVÕTE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 mb-2">
          <FileText className="w-4 h-4 text-teal-600" />
          <span>1. Probleemi lühikokkuvõte</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 font-medium bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* 2. SOOVITUSLIKUD TEGEVUSSAMMUD KLIENDITOE TÖÖTAJALE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
            <ListTodo className="w-4 h-4 text-teal-600" />
            <span>2. Soovituslikud tegevussammud klienditoe töötajale</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Märgi tehtuks ({Object.values(completedSteps).filter(Boolean).length}/{result.recommendedSteps.length})
          </span>
        </div>

        <div className="space-y-2">
          {result.recommendedSteps.map((step, idx) => {
            const isDone = Boolean(completedSteps[idx]);
            return (
              <div
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                    : 'bg-white border-slate-200 hover:bg-slate-50/80 text-slate-800'
                }`}
              >
                <button
                  type="button"
                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 bg-white hover:border-teal-500'
                  }`}
                  aria-label="Märgi samm tehtuks"
                >
                  {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <span className="flex-1 leading-snug">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROFESSIONAALNE VASTUSE MUSTAND KLIENDILE (VASTUSE HALDAMINE) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
            <MessageSquareText className="w-4 h-4 text-teal-600" />
            <span>3. Professionaalne vastuse mustand kliendile</span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {selectedLanguage === 'et' ? 'Eesti' : selectedLanguage === 'ru' ? 'Vene' : 'Inglise'}
            </span>
          </div>

          <span className="text-[11px] text-slate-500">
            Töötaja saab teksti vahetult muuta enne kliendile saatmist
          </span>
        </div>

        {/* Text Area for Response Draft */}
        <div className="relative mb-3">
          <textarea
            rows={8}
            value={editedDraft}
            onChange={(e) => setEditedDraft(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-4 text-xs sm:text-sm leading-relaxed text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 bg-white font-normal resize-y shadow-inner"
            placeholder="Siia genereeritakse kliendile saadetav vastus..."
          />
        </div>

        {/* Quick insertion helpers & word count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-3 text-xs border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Lisa tekstile:</span>
            {trackingNumber && (
              <button
                type="button"
                onClick={() => appendSnippet(`Saadetise jälgimiskood: ${trackingNumber}`)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] cursor-pointer"
              >
                + Saadetise kood
              </button>
            )}
            <button
              type="button"
              onClick={() => appendSnippet('Täiendavate küsimuste korral vastake julgelt sellele kirjale.')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] cursor-pointer"
            >
              + Lisaküsimused
            </button>
            <button
              type="button"
              onClick={() => setEditedDraft(result.draftReply)}
              className="px-2 py-0.5 rounded text-slate-500 hover:text-slate-700 text-[11px] underline cursor-pointer"
              title="Taasta esialgne genereeritud mustand"
            >
              Taasta algne mustand
            </button>
          </div>

          <div className="text-slate-400 text-[11px]">
            <span>{editedDraft.split(/\s+/).filter(Boolean).length} sõna</span>
            <span className="mx-1">•</span>
            <span>{editedDraft.length} tähemärki</span>
          </div>
        </div>

        {/* Action Buttons for Draft */}
        <div className="pt-3 flex flex-wrap items-center gap-2">
          {/* Primary: Kopeeri vastus */}
          <button
            type="button"
            onClick={onCopyReply}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isCopied
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Vastus kopeeritud!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Kopeeri vastus</span>
              </>
            )}
          </button>

          {/* Secondary: Kopeeri kogu juhtum (CRM märge) */}
          <button
            type="button"
            onClick={onCopyFullCase}
            className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Kopeeri kogu juhtumi raport (kokkuvõte, tegevused, vastus) CRM süsteemi märkmete jaoks"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span>Kopeeri kogu juhtumi raport</span>
          </button>

          {/* Reset / Tühjenda juhtum */}
          <button
            type="button"
            onClick={onResetCase}
            className="ml-auto py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Tühjenda ja alusta uut juhtumit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tühjenda juhtum</span>
          </button>
        </div>
      </div>

      {/* 4. SOOVITUS, KUIDAS EDASI TEGUTSEDA JUHUL, KUI PROBLEEMI EI SAA KOHE LAHENDADA */}
      <div className="bg-amber-50/60 rounded-2xl border border-amber-200/90 p-5 transition-all">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900 mb-2">
          <LifeBuoy className="w-4 h-4 text-amber-600" />
          <span>4. Järgmine tegevus (kui probleemi ei ole võimalik kohe lahendada)</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200/60">
          {result.escalationGuidance}
        </p>
      </div>
    </div>
  );
};
