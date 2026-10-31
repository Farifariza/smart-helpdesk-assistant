import React, { useState, useEffect } from 'react';
import {
  CategoryId,
  LanguageId,
  ToneId,
  AnalysisResult,
  HelpdeskCase,
  PresetSampleCase,
} from './types';
import { SAMPLE_CASES } from './data/categories';
import { generateDemoAnalysis } from './data/mockData';
import { Header } from './components/Header';
import { ProblemInputCard } from './components/ProblemInputCard';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { ProjectDocumentationModal } from './components/ProjectDocumentationModal';
import { CaseHistoryDrawer } from './components/CaseHistoryDrawer';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import {
  Sparkles,
  ShieldAlert,
  Headphones,
  CheckCircle2,
  Clock,
  HelpCircle,
} from 'lucide-react';

const STORAGE_KEY = 'smart_helpdesk_cases_v1';

export default function App() {
  // Input form state
  const [clientMessage, setClientMessage] = useState<string>(
    'Minu saadetise jälgimine pole juba kolm päeva uuenenud. Kas saate öelda, kus minu pakk asub?'
  );
  const [category, setCategory] = useState<CategoryId>('saadetise_hilinemine');
  const [language, setLanguage] = useState<LanguageId>('et');
  const [tone, setTone] = useState<ToneId>('viisakas');
  const [trackingNumber, setTrackingNumber] = useState<string>('EE987654321EE');

  // Execution & results state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [editedDraft, setEditedDraft] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // App mode & UI modals
  const [isAiAvailable, setIsAiAvailable] = useState<boolean>(false);
  const [useDemoMode, setUseDemoMode] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [casesHistory, setCasesHistory] = useState<HelpdeskCase[]>([]);

  // Check server status on mount
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey) {
          setIsAiAvailable(true);
        } else {
          setIsAiAvailable(false);
          // If no API key, default to DEMO mode seamlessly
          setUseDemoMode(true);
        }
      })
      .catch((err) => {
        console.warn('API status check offline, defaulting to local demo engine:', err);
        setIsAiAvailable(false);
        setUseDemoMode(true);
      });

    // Load history from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCasesHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
    }
  }, []);

  // Save history to localStorage
  const saveCaseToHistory = (newCase: HelpdeskCase) => {
    setCasesHistory((prev) => {
      const updated = [newCase, ...prev.slice(0, 29)]; // keep last 30
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save history', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setCasesHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear history', e);
    }
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: 'Vahetuse juhtumite ajalugu on kustutatud.',
    });
  };

  // Preset selection handler
  const handleSelectPreset = (preset: PresetSampleCase) => {
    setClientMessage(preset.clientMessage);
    setCategory(preset.category);
    setLanguage(preset.language);
    if (preset.trackingNumber) {
      setTrackingNumber(preset.trackingNumber);
    }
    setErrorMessage(null);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: `Laaditud näidis: "${preset.title}"`,
    });
  };

  // Reset case
  const handleResetCase = () => {
    setClientMessage('');
    setTrackingNumber('');
    setResult(null);
    setEditedDraft('');
    setErrorMessage(null);
    setIsCopied(false);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: 'Juhtum on tühjendatud. Võid alustada uue pöördumisega.',
    });
  };

  // Main Analyze action
  const handleAnalyze = async () => {
    if (!clientMessage || !clientMessage.trim()) {
      setErrorMessage('Palun sisesta kliendi probleemi kirjeldus enne analüüsimist.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setIsCopied(false);

    try {
      let analysisResult: AnalysisResult;

      // If user toggled demo mode or AI is not available, run local demo engine directly
      if (useDemoMode || !isAiAvailable) {
        // Small artificial pause (500ms) for realistic UX
        await new Promise((resolve) => setTimeout(resolve, 550));
        analysisResult = generateDemoAnalysis(
          clientMessage,
          category,
          language,
          tone,
          trackingNumber
        );
      } else {
        // Call backend server proxy with Gemini API
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientMessage,
            category,
            language,
            tone,
            trackingNumber,
          }),
        });

        const data = await response.json();

        if (data.fallbackToDemo || !data.success) {
          // Server signaled fallback
          analysisResult = generateDemoAnalysis(
            clientMessage,
            category,
            language,
            tone,
            trackingNumber
          );
        } else {
          analysisResult = {
            summary: data.summary,
            recommendedSteps: data.recommendedSteps,
            draftReply: data.draftReply,
            escalationGuidance: data.escalationGuidance,
            urgencyLevel: data.urgencyLevel || 'tavaline',
            source: 'gemini',
            generatedAt: data.generatedAt || new Date().toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' }),
          };
        }
      }

      setResult(analysisResult);
      setEditedDraft(analysisResult.draftReply);

      // Save to shift history
      saveCaseToHistory({
        id: Date.now().toString(),
        createdAt: new Date().toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' }),
        clientMessage,
        category,
        language,
        tone,
        trackingNumber: trackingNumber || undefined,
        result: analysisResult,
      });

      setToast({
        id: Date.now().toString(),
        type: 'success',
        message: 'Probleem analüüsitud ja vastuse mustand koostatud!',
      });
    } catch (err) {
      console.error('Analysis error:', err);
      // Fallback seamlessly so the app never crashes
      const demoRes = generateDemoAnalysis(
        clientMessage,
        category,
        language,
        tone,
        trackingNumber
      );
      setResult(demoRes);
      setEditedDraft(demoRes.draftReply);
      setToast({
        id: Date.now().toString(),
        type: 'info',
        message: 'Kasutati DEMO-analüüsimootorit (võrguühenduseta).',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy customer reply draft
  const handleCopyReply = () => {
    if (!editedDraft) return;
    navigator.clipboard.writeText(editedDraft);
    setIsCopied(true);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      message: 'Kliendi vastus kopeeritud lõikelauale!',
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Copy full case summary for internal CRM ticket
  const handleCopyFullCase = () => {
    if (!result) return;
    const fullReport = `=== SMARTOPS JUHTUMI RAPORT ===
Aeg: ${result.generatedAt}
Saadetise number: ${trackingNumber || 'Pole märgitud'}
Kategooria: ${category}
Vastuse keel: ${language.toUpperCase()}

1. KLIENDI PÖÖRDUMINE:
"${clientMessage}"

2. PROBLEEMI KOKKUVÕTE:
${result.summary}

3. KLIENDITOE TEGEVUSSAMMUD:
${result.recommendedSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

4. KLIENDILE KOOSTATUD VASTUS:
${editedDraft}

5. ESKALATSIOON / JÄRGMINE SAMM:
${result.escalationGuidance}
===============================`;

    navigator.clipboard.writeText(fullReport);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      message: 'Kogu juhtumi raport kopeeritud CRM märkmete jaoks!',
    });
  };

  // Restore a previous case from history
  const handleRestoreCase = (c: HelpdeskCase) => {
    setClientMessage(c.clientMessage);
    setCategory(c.category);
    setLanguage(c.language);
    setTone(c.tone);
    setTrackingNumber(c.trackingNumber || '');
    if (c.result) {
      setResult(c.result);
      setEditedDraft(c.result.draftReply);
    }
    setErrorMessage(null);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: 'Valitud juhtum taastatud ajaloost.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <Header
        isAiAvailable={isAiAvailable}
        useDemoMode={useDemoMode}
        onToggleDemoMode={() => {
          setUseDemoMode(!useDemoMode);
          setToast({
            id: Date.now().toString(),
            type: 'info',
            message: !useDemoMode
              ? 'Lülitatud DEMO-režiimi (ettevalmistatud logistika reeglid).'
              : isAiAvailable
              ? 'Lülitatud aktiivsesse Gemini 3.8 Flash režiimi.'
              : 'Päris API võtit pole; režiim jääb DEMO peale.',
          });
        }}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetCase={handleResetCase}
        historyCount={casesHistory.length}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome & Instructions Sub-header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-5 rounded-2xl shadow-sm border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold">
                Klienditoe logistika juhtpaneel
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Sisesta kliendi küsimus või kaebus. Tehisintellekt koostab logistika standardprotseduuridele vastavad sammud ja viisaka vastuse kliendi emakeeles (eesti, vene või inglise keeles).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSelectPreset(SAMPLE_CASES[0])}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Laadi juhendi ametlik näidispäring"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Laadi ametlik näidis</span>
            </button>
            <button
              onClick={() => setIsDocsOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Õppejuhend</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Form (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <ProblemInputCard
              clientMessage={clientMessage}
              setClientMessage={setClientMessage}
              category={category}
              setCategory={setCategory}
              language={language}
              setLanguage={setLanguage}
              tone={tone}
              setTone={setTone}
              trackingNumber={trackingNumber}
              setTrackingNumber={setTrackingNumber}
              isLoading={isLoading}
              onAnalyze={handleAnalyze}
              onClear={() => setClientMessage('')}
              errorMessage={errorMessage}
              onSelectPreset={handleSelectPreset}
            />

            {/* Quick tips card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-xs text-slate-600 shadow-2xs space-y-2">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-teal-600" />
                Klienditeenindaja meelespea:
              </span>
              <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                <li>Kontrolli alati enne saatmist kliendi nime ja saadetise numbri täpsust.</li>
                <li>Ära luba kliendile kindlat kellaaega, mida logistikasüsteem pole kinnitanud.</li>
                <li>Keeruliste juhtumite puhul kopeeri raport siseveebi (CRM) logisse.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: AI Analysis & Response Draft (7 cols on lg) */}
          <div className="lg:col-span-7">
            <AnalysisResultsView
              result={result}
              isLoading={isLoading}
              selectedLanguage={language}
              editedDraft={editedDraft}
              setEditedDraft={setEditedDraft}
              onCopyReply={handleCopyReply}
              onCopyFullCase={handleCopyFullCase}
              onResetCase={handleResetCase}
              isCopied={isCopied}
              trackingNumber={trackingNumber}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>Smart Helpdesk Assistant</strong> • Logistika- ja kullerteenuste klienditoe tehisintellekti prototüüp
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Õppetöö projekt</span>
            <span>•</span>
            <button
              onClick={() => setIsDocsOpen(true)}
              className="text-teal-700 hover:underline font-medium cursor-pointer"
            >
              Käivitamis- ja paigaldusjuhend
            </button>
          </div>
        </div>
      </footer>

      {/* Documentation & Student Presentation Modal */}
      <ProjectDocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Case History Drawer */}
      <CaseHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        cases={casesHistory}
        onSelectCase={handleRestoreCase}
        onClearHistory={handleClearHistory}
      />

      {/* Floating Notifications */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
