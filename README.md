# Smart Helpdesk Assistant 📦🤖

> **Tehisintellektil põhinev logistika- ja kullerettevõtte klienditoe abiline**  
> Prototüüp loodud õppetöö raames klienditeenindajate töö tõhustamiseks ja kliendipäringute analüüsimiseks.

---

## 📌 Eesmärk ja ülevaade

**Smart Helpdesk Assistant** on loodud kuller- ja logistikaettevõtte (nt Omniva, DPD, Smartpost, Itella) klienditoe töötajatele, et:
1. **Analüüsida klientide probleeme ja kaebusi** kiiresti ja struktureeritult.
2. **Kuvada standardsed tegevussammud (SOP)**, mida klienditeenindaja peab logistikasüsteemis tegema.
3. **Genereerida professionaalsed ja viisakad vastused** kliendi emakeeles (**eesti**, **vene** või **inglise** keeles).
4. **Pakkuda eskalatsioonijuhiseid**, kui probleemi ei saa kohe lahendada.

> ⚠️ **Õppetöö prototüüp:** Rakendus ei kasuta päris klientide isikuandmeid ega ole ühendatud ettevõtte reaalsete tootmissüsteemidega.

---

## 🚀 Põhifunktsioonid

- **Kliendi probleemi sisestamine ja kategooriad:**
  - Saadetise hilinemine
  - Kadunud saadetis
  - Kohaletoimetamise probleem
  - Pakiautomaadi probleem
  - Kahjustatud saadetis
  - Muu probleem
- **Mitmekeelne vastuste generaator:**
  - 🇪🇪 Eesti keel
  - 🌐 Vene keel
  - 🇬🇧 Inglise keel
- **Suhtlustooni valik:** Viisakas, Vabandav, Konkreetne/ametlik.
- **Interaktiivne kontrollnimekiri:** Töötaja saab märkida soovituslikud tegevussammud tehtuks.
- **Vastuse haldus:** Vastuse redigeerimine, ühe klõpsuga kopeerimine, kiirfraaside lisamine ja juhtumi tühjendamine.
- **CRM-raporti eksport:** Võimalus kopeerida terve juhtumi logi siseveebi (CRM) pileti märkmetesse.
- **Vahetuse ajalugu (Shift History):** Käideldud juhtumid salvestatakse kohalikku mällu koos JSON ekspordi võimalusega.
- **Kahetasandiline TI:**
  - **Reaalajas TI:** Google Gemini 3.8 Flash mudel läbi turvalise Express taustaserveri.
  - **DEMO-režiim:** 100% autonoomne ja töökindel reeglistik, mis ei vaja API-võtit.

---

## 🛠️ Tehnoloogiad

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Ikoonid ja animatsioonid:** [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Backend / API Proxy:** [Express.js](https://expressjs.com/), [Vite](https://vitejs.dev/)
- **Tehisintellekt:** [@google/genai SDK](https://www.npmjs.com/package/@google/genai) (`gemini-3.8-flash`)

---

## 💻 Kuidas rakendust oma arvutis käivitada?

### 1. Eeldused
Sinu arvutisse peab olema paigaldatud **Node.js** (v18 või uuem):
- Kontrolli terminalis: `node -v`

### 2. Paigaldus
```bash
# 1. Klooni repositoorium
git clone https://github.com/SINU_KASUTAJANIMI/smart-helpdesk-assistant.git

# 2. Liigu projekti kausta
cd smart-helpdesk-assistant

# 3. Paigalda vajalikud sõltuvused
npm install
```

### 3. (Valikuline) Gemini API võtme lisamine
Kui soovid kasutada reaalset Gemini mudelit, loo fail `.env`:
```env
GEMINI_API_KEY="sinu_gemini_api_võti_siia"
```
*Kui API-võtit ei lisata, töötab rakendus automaatselt ettevalmistatud logistika DEMO-režiimis.*

### 4. Käivitamine
```bash
npm run dev
```
Ava veebibrauseris aadress: **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ Avaldamine internetti (Deployment)

### Render.com / Railway.app (Täisrakendus)
1. Loo konto [Render.com](https://render.com).
2. Vali **"New Web Service"** ja ühenda see GitHubi repositoorium.
3. Seadistused:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Environment Variables:** `GEMINI_API_KEY` (valikuline)

### Vercel / Netlify (Staatiline prototüüp)
1. Ühenda GitHub Verceliga.
2. Vali projekt ja vajuta **Deploy**.
3. Projekt kompileeritakse automaatselt `dist` kausta (töötab täielikult DEMO-mootoriga).

---

## 📄 Litsents

Õppetöö prototüüp. Vabalt kasutatav hariduslikel eesmärkidel.
