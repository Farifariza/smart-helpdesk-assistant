import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Terminal,
  CloudUpload,
  Cpu,
  ShieldCheck,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDocumentationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'run' | 'deploy' | 'architecture' | 'evaluation'>('run');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Smart Helpdesk Assistant – Õppejuhend ja dokumentatsioon
              </h2>
              <p className="text-xs text-slate-400">
                Juhised kohalikuks käivitamiseks, avaldamiseks ja õppetöö esitlemiseks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Sulge aken"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-2">
          {[
            { id: 'run', label: '1. Arvutis käivitamine', icon: Terminal },
            { id: 'deploy', label: '2. Interneti üleslaadimine', icon: CloudUpload },
            { id: 'architecture', label: '3. Arhitektuur ja kood', icon: Cpu },
            { id: 'evaluation', label: '4. Näidisjuhtumi analüüs', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 text-teal-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content area */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed flex-1">
          {/* TAB 1: RUN LOCALLY */}
          {activeTab === 'run' && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200">
                <h3 className="font-bold text-teal-900 text-base mb-1">
                  Kuidas rakendust oma arvutis (Localhost) käivitada?
                </h3>
                <p className="text-xs text-teal-800">
                  Rakendus vajab töötamiseks Node.js keskkonda (soovitatav versioon 18 või uuem).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    Laadi projekt alla või klooni Gitist
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    Ava terminal või käsurida (Command Prompt / PowerShell / Terminal) projekti kaustas.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    Paigalda vajalikud teegid ja sõltuvused (Dependencies)
                  </h4>
                  <div className="relative bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs my-2">
                    <code>npm install</code>
                    <button
                      onClick={() => copySnippet('npm install', 'npm-install')}
                      className="absolute right-3 top-2.5 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Kopeeri käsk"
                    >
                      {copiedCode === 'npm-install' ? <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    See käsk tõmbab <code>package.json</code> failis kirjeldatud moodulid (React, TypeScript, Tailwind, Express jne).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                      3
                    </span>
                    (Valikuline) Seadista Gemini API võti
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    Soovi korral loo projekti juurkausta fail nimega <code>.env</code> ja lisa sinna oma Google AI Studio API võti:
                  </p>
                  <div className="relative bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs my-2">
                    <code>GEMINI_API_KEY="sinu_gemini_api_voti_siia"</code>
                  </div>
                  <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    💡 <strong>Märkus:</strong> Kui API võtit pole määratud, töötab rakendus automaatselt täisväärtuslikus <strong>DEMO-režiimis</strong> vastavalt logistikaettevõtte ametlikele reeglitele!
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                      4
                    </span>
                    Käivita arendusserver
                  </h4>
                  <div className="relative bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs my-2">
                    <code>npm run dev</code>
                    <button
                      onClick={() => copySnippet('npm run dev', 'npm-dev')}
                      className="absolute right-3 top-2.5 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedCode === 'npm-dev' ? <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600">
                    Ava veebibrauseris aadress: <a href="http://localhost:3000" className="text-teal-700 underline font-semibold" target="_blank" rel="noreferrer">http://localhost:3000</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPLOY TO WEB */}
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Kuidas rakendus internetti (pilve) üles laadida?
                </h3>
                <p className="text-xs text-slate-600">
                  Kuna Smart Helpdesk Assistant sisaldab turvalist Express serverit (mis kaitseb API võtmeid) ning Reacti kasutajaliidest, on selle avaldamiseks sobivad järgmised tasuta ja lihtsad platvormid:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Render / Railway */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-400 transition-all">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    Soovitus 1: Täisrakendus (Full-stack)
                  </span>
                  <h4 className="font-bold text-slate-900 mt-2">Render.com või Railway.app</h4>
                  <p className="text-xs text-slate-600 mt-1 mb-3">
                    Võimaldab käivitada korraga nii Express taustaserveri kui ka Vite esiosa.
                  </p>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Laadi kood GitHubi repositooriumisse.</li>
                    <li>Loo konto saidil Render.com ja vali <strong>"New Web Service"</strong>.</li>
                    <li>Build Command: <code>npm install && npm run build</code></li>
                    <li>Start Command: <code>npm run start</code></li>
                    <li>Lisa keskkonnamuutuja (Environment Variable): <code>GEMINI_API_KEY</code>.</li>
                  </ol>
                </div>

                {/* Option 2: Vercel / Netlify */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-400 transition-all">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Soovitus 2: Staatiline prototüüp
                  </span>
                  <h4 className="font-bold text-slate-900 mt-2">Vercel.com või Netlify</h4>
                  <p className="text-xs text-slate-600 mt-1 mb-3">
                    Kiireim viis esitada õppetöö prototüüpi (töötab automaatselt DEMO-analüüsi mootoriga).
                  </p>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Ühenda oma GitHubi konto Verceliga.</li>
                    <li>Vali projekt ja vajuta <strong>"Deploy"</strong>.</li>
                    <li>Vercel kompileerib automaatselt <code>dist</code> kausta.</li>
                    <li>Saad kohese avaliku lingi (nt <code>helpdesk.vercel.app</code>).</li>
                  </ol>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl">
                <h4 className="font-bold text-white text-sm mb-1">Tootmisversiooni kohalik testimine:</h4>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-xs text-teal-300">
                  npm run build && npm run preview
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">
                Tehniline arhitektuur ja koodi ülesehitus (Õppetöö aruandeks)
              </h3>
              <p className="text-xs text-slate-600">
                Rakendus on üles ehitatud tänapäevaste tarkvaraarenduse parimate tavade kohaselt:
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">
                    1. Kasutajaliides (Frontend): React 19 + TypeScript + Tailwind CSS
                  </h5>
                  <p className="text-xs text-slate-600">
                    Komponentpõhine struktuur, tüübikindel kood ja kohanduv (responsive) disain tumesinise ning türkiisi värvipaletiga. Kasutatud on puhtaid SVG-ikoone (Lucide React).
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">
                    2. Taustaserver (Backend Proxy): Express.js + Vite Middleware
                  </h5>
                  <p className="text-xs text-slate-600">
                    Kõik tehisintellekti päringud tehakse läbi serveri (<code>server.ts</code>). See hoiab API-võtmed turvalisena ega avalda neid kunagi brauseri koodis (vastab rangele küberturvalisuse nõudele).
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">
                    3. Kahetasandiline analüüsimootor (Gemini 3.8 Flash + SOP DEMO mootor)
                  </h5>
                  <p className="text-xs text-slate-600">
                    Kui API-võti on saadaval, kasutatakse mudelit <code>gemini-3.8-flash</code> range JSON-skeemiga. Kui võti puudub või võrguühenduses on tõrge, aktiveerub automaatselt ettevalmistatud reeglitel põhinev DEMO-mootor, tagades 100% töökindluse igas olukorras.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">
                    4. Logistikaäri reeglid (Anti-hallucination guardrails)
                  </h5>
                  <p className="text-xs text-slate-600">
                    Kuller- ja logistikaettevõttes ei tohi TI kunagi luua väljamõeldud paki asukohti ega kuupäevi. Seetõttu suunab mudel tegevused alati laoskaneeringute kontrolli ja sisejuurdluse algatamisse.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL TEST CASE */}
          {activeTab === 'evaluation' && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <h3 className="font-bold text-teal-950 text-base mb-1">
                  Ametlik testjuhtum ja vastavuse kontroll (Ülesande punkt 5)
                </h3>
                <p className="text-xs text-teal-800">
                  Juhendis nõutud testpöördumine: <em>„Minu saadetise jälgimine pole juba kolm päeva uuenenud. Kas saate öelda, kus minu pakk asub?“</em>
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Probleemi lühikokkuvõte:</span>
                  <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    Saadetise jälgimises pole kolme päeva jooksul uusi sündmusi registreeritud.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Soovituslikud tegevussammud:</span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Kontrollida saadetise viimast jälgimissündmust.</li>
                    <li>Vaadata saadetise liikumise ajalugu.</li>
                    <li>Kontrollida võimalikke tarneprobleeme.</li>
                    <li>Vajadusel edastada juhtum täiendavaks kontrollimiseks.</li>
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Kliendile saadetav vastus:</span>
                  <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    Viisakas ja professionaalne vastus kliendi valitud keeles, milles selgitatakse, et saadetise kohta tehakse täiendav kontroll.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Järgmine tegevus:</span>
                  <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    Kui süsteemis puudub värskem info, tuleb juhtum edastada täiendavaks uurimiseks.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Smart Helpdesk Assistant • Õppetöö prototüüp
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Sulge juhend
          </button>
        </div>
      </div>
    </div>
  );
};
