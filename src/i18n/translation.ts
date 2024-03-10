import languages from './languages';
import en from './en/index';
import fr from './fr/index';

export type UiTranslate = {
  [key: string]: string | object | UiTranslate;
};

export const supportedLanguages = Object.keys(languages);

export const ui = {
  en: {
    ...en,
  },
  fr: {
    ...fr,
  },
} as const;

export const defaultLanguage = 'fr' as keyof typeof ui;
