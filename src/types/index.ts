export type CategoryId =
  | 'saadetise_hilinemine'
  | 'kadunud_saadetis'
  | 'kohaletoimetamise_probleem'
  | 'pakiautomaadi_probleem'
  | 'kahjustatud_saadetis'
  | 'muu_probleem';

export type LanguageId = 'et' | 'ru' | 'en';

export type ToneId = 'viisakas' | 'vabandav' | 'lakooniline';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  badgeColor: string;
  description: string;
}

export interface LanguageOption {
  id: LanguageId;
  label: string;
  flag: string;
  greetingExample: string;
}

export interface AnalysisResult {
  summary: string;
  recommendedSteps: string[];
  draftReply: string;
  escalationGuidance: string;
  urgencyLevel?: 'madal' | 'tavaline' | 'kiire' | 'kriitiline';
  categoryIdentified?: string;
  source: 'gemini' | 'demo';
  generatedAt: string;
}

export interface HelpdeskCase {
  id: string;
  createdAt: string;
  clientMessage: string;
  category: CategoryId;
  language: LanguageId;
  tone: ToneId;
  trackingNumber?: string;
  result?: AnalysisResult;
}

export interface PresetSampleCase {
  id: string;
  title: string;
  badge: string;
  category: CategoryId;
  language: LanguageId;
  trackingNumber?: string;
  clientMessage: string;
  isOfficialTestCase?: boolean;
}
