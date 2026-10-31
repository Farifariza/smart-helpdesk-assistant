import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Helper to check for Gemini API key
  const getApiKey = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key.trim() === '') {
      return null;
    }
    return key.trim();
  };

  // Status endpoint
  app.get('/api/status', (req: Request, res: Response) => {
    const key = getApiKey();
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(key),
      model: 'gemini-3.8-flash',
      mode: key ? 'live_ai' : 'demo_mode',
      notice: 'Süsteem toetab nii reaalajas Gemini 3.8 Flash mudelit kui ka ametlikku logistika DEMO-reeglistikku.',
    });
  });

  // Main analysis endpoint
  app.post('/api/analyze', async (req: Request, res: Response) => {
    const { clientMessage, category, language, tone, trackingNumber } = req.body;

    if (!clientMessage || typeof clientMessage !== 'string' || !clientMessage.trim()) {
      return res.status(400).json({ error: 'Kliendi probleemi kirjeldus on kohustuslik.' });
    }

    const apiKey = getApiKey();

    if (!apiKey) {
      // In demo mode without API key
      return res.json({
        fallbackToDemo: true,
        reason: 'API-võtit pole seadistatud. Kasutatakse kvaliteetset DEMO-analüüsimootorit.',
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const languageNames: Record<string, string> = {
        et: 'eesti keel',
        ru: 'vene keel (русский язык)',
        en: 'inglise keel (English)',
      };

      const targetLanguage = languageNames[language] || 'eesti keel';

      const prompt = `
Analüüsi järgmist logistika- ja kullerettevõtte kliendi pöördumist.

KLIENDI PÖÖRDUMINE:
"${clientMessage.trim()}"

TÄPSUSTAV INFO:
- Valitud kategooria: ${category || 'Määramata'}
- Sihtkeel vastusele: ${targetLanguage}
- Vastuse toon: ${tone || 'viisakas ja professionaalne'}
${trackingNumber ? `- Saadetise number: ${trackingNumber.trim()}` : ''}

KRIITILISED REEGLID KULLERTEENUSELE:
1. ÄRA KUNAGI genereeri väljamõeldud saadetise asukohti, tarneaegu ega olematuid jälgimissündmusi.
2. Kui andmed puuduvad või jälgimine seisab, selgita viisakalt, et tehakse täiendav kontroll logistikakeskuses / vahelaos.
3. Kliendile koostatav vastus (draftReply) PEAB OLEMA rangelt ${targetLanguage} keeles.
4. Kui pöördumine on ametlik testjuhtum ("Minu saadetise jälgimine pole juba kolm päeva uuenenud..."), jälgi standardset protokolli: kontrollida viimast sündmust, liikumise ajalugu, tarneprobleeme ja vajadusel edastada täiendavaks uurimiseks.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Oled logistika- ja kullerettevõtte professionaalne tehisintellektil põhinev klienditoe abiline (Smart Helpdesk Assistant). Sinu eesmärk on toetada klienditeenindajat klientide probleemide analüüsimisel, samm-sammuliste lahenduste leidmisel ning viisaka ja selge vastuse koostamisel. Ära kunagi fantaseeri paki asukohti ega kuupäevi.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: 'Probleemi lühikokkuvõte eesti keeles (1-2 lauset).',
              },
              recommendedSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Soovituslikud tegevussammud klienditoe töötajale (3-5 konkreetset punkti).',
              },
              draftReply: {
                type: Type.STRING,
                description: `Professionaalne, viisakas ja terviklik vastuse mustand kliendile valitud keeles (${targetLanguage}). Sisaldab tervitust, selgitust ja lõpufraasi.`,
              },
              escalationGuidance: {
                type: Type.STRING,
                description: 'Soovitus, kuidas edasi tegutseda juhul, kui probleemi ei ole võimalik kohe lahendada (eesti keeles).',
              },
              urgencyLevel: {
                type: Type.STRING,
                description: 'Kiirusaste: madal, tavaline, kiire või kriitiline.',
              },
            },
            required: ['summary', 'recommendedSteps', 'draftReply', 'escalationGuidance'],
          },
        },
      });

      const parsedJson = JSON.parse(response.text || '{}');

      return res.json({
        success: true,
        source: 'gemini',
        generatedAt: new Date().toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' }),
        ...parsedJson,
      });
    } catch (err: unknown) {
      console.error('Gemini API error in /api/analyze:', err);
      // Return fallback signal so frontend or server handles it seamlessly
      return res.json({
        fallbackToDemo: true,
        reason: 'Tehisintellekti serveriühenduses tekkis viga, aktiveeritud turvaline DEMO-režiim.',
      });
    }
  });

  // In production serve dist, in dev mount vite middleware
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Helpdesk Assistant server käivitati aadressil http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
