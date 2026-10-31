import React from 'react';
import { HelpdeskCase } from '../types';
import {
  X,
  History,
  RotateCcw,
  Trash2,
  Download,
  Calendar,
  Languages,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cases: HelpdeskCase[];
  onSelectCase: (c: HelpdeskCase) => void;
  onClearHistory: () => void;
}

export const CaseHistoryDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  cases,
  onSelectCase,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `helpdesk-juhtumid-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base">Vahetuse juhtumite ajalugu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Sulge paneel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">
            Kokku salvestatud: <strong>{cases.length}</strong> juhtumit
          </span>
          <div className="flex items-center gap-2">
            {cases.length > 0 && (
              <>
                <button
                  onClick={exportToJson}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-medium cursor-pointer"
                  title="Laadi alla JSON failina"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspordi</span>
                </button>
                <button
                  onClick={onClearHistory}
                  className="flex items-center gap-1 text-rose-600 hover:text-rose-800 font-medium cursor-pointer ml-2"
                  title="Kustuta ajalugu"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kustuta</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* List of cases */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cases.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <History className="w-10 h-10 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-slate-600">Ajalugu on tühi</p>
              <p className="text-xs text-slate-500 mt-1">
                Kõik analüüsitud kliendijuhtumid salvestatakse automaatselt siia selle töövahetuse jooksul.
              </p>
            </div>
          ) : (
            cases.map((c) => {
              const catObj = CATEGORIES.find((cat) => cat.id === c.category);
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all cursor-pointer group space-y-2 bg-white shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {catObj?.label || c.category}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {c.createdAt}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 line-clamp-2 font-medium">
                    {c.clientMessage}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Languages className="w-3 h-3 text-slate-400" />
                      Keel: {c.language.toUpperCase()}
                    </span>
                    <span className="text-teal-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Ava juhtum <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
