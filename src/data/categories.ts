import { CategoryOption, LanguageOption, PresetSampleCase } from '../types';

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'saadetise_hilinemine',
    label: 'Saadetise hilinemine',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Pakk on üle lubatud tarneaja või liikumine seisab vahelaos',
  },
  {
    id: 'kadunud_saadetis',
    label: 'Kadunud saadetis',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Saadetise asukoht on teadmata või pole pikka aega skaneeritud',
  },
  {
    id: 'kohaletoimetamise_probleem',
    label: 'Kohaletoimetamise probleem',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    description: 'Kuller ei saanud kätte, vale aadress või kohaletoimetamiskatse ebaõnnestus',
  },
  {
    id: 'pakiautomaadi_probleem',
    label: 'Pakiautomaadi probleem',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Kapiuks ei avane, uksekood puudub/aegunud või automaat on täis',
  },
  {
    id: 'kahjustatud_saadetis',
    label: 'Kahjustatud saadetis',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Pakend või saadetise sisu on transpordi käigus vigastatud',
  },
  {
    id: 'muu_probleem',
    label: 'Muu probleem',
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    description: 'Ümbersuunamine, tagastused, arveldamine või üldine päring',
  },
];

export const LANGUAGES: LanguageOption[] = [
  {
    id: 'et',
    label: 'Eesti keel',
    flag: '🇪🇪',
    greetingExample: 'Tere! Täname pöördumast...',
  },
  {
    id: 'ru',
    label: 'Vene keel',
    flag: '🌐',
    greetingExample: 'Здравствуйте! Благодарим за обращение...',
  },
  {
    id: 'en',
    label: 'Inglise keel',
    flag: '🇬🇧',
    greetingExample: 'Hello! Thank you for reaching out...',
  },
];

export const SAMPLE_CASES: PresetSampleCase[] = [
  {
    id: 'official-test-case',
    title: 'Saadetise viibimine',
    badge: 'Viivitus',
    category: 'saadetise_hilinemine',
    language: 'et',
    trackingNumber: 'EE987654321EE',
    clientMessage: 'Minu saadetise jälgimine pole juba kolm päeva uuenenud. Kas saate öelda, kus minu pakk asub?',
    isOfficialTestCase: false,
  },
  {
    id: 'parcel-locker-case',
    title: 'Pakiautomaadi ukse tõrge',
    badge: 'Pakiautomaat',
    category: 'pakiautomaadi_probleem',
    language: 'et',
    trackingNumber: 'EE882233445EE',
    clientMessage: 'Tere! Seisan Kristiine keskuse pakiautomaadi juures. Sisestasin SMS-iga tulnud uksekoodi 4492, aga kapp ei avanenud ja ekraan teatas veast. Kuidas ma oma paki kätte saan?',
    isOfficialTestCase: false,
  },
  {
    id: 'damaged-parcel-case',
    title: 'Kahjustatud saadetis kullerilt',
    badge: 'Vigastatud pakend',
    category: 'kahjustatud_saadetis',
    language: 'et',
    trackingNumber: 'EE554433221EE',
    clientMessage: 'Tere päevast. Kuller andis mulle üle paki, mille üks serv oli täielikult sisse muljutud ja teibitud üle meie teadmata. Seest kostub purunenud klaasi heli. Mida peaksin tegema kahjuhüvitise saamiseks?',
    isOfficialTestCase: false,
  },
  {
    id: 'delivery-attempt-en',
    title: 'Missed Delivery (English)',
    badge: 'Ingliskeelne',
    category: 'kohaletoimetamise_probleem',
    language: 'en',
    trackingNumber: 'EE112233445EE',
    clientMessage: 'Hello, I stayed home all morning waiting for the courier between 10:00 and 14:00, but nobody rang the doorbell and I received no phone call. Now the status says "delivery attempt failed". Can you please reschedule?',
    isOfficialTestCase: false,
  },
];
