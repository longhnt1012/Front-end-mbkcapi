import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { getLanguage } from 'utils';
//
import enLocales from './en.json';
import viLocales from './vi.json';

import en from './en/index';
import vi from './vi/index';

export const resources = {
  en: { translations: { ...enLocales, ...en } },
  vi: { translations: { ...viLocales, ...vi } },
};

export const defaultNS = 'translations';
const langStorage = getLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: langStorage || 'vi',
    fallbackLng: 'vi',
    debug: false,
    ns: ['translations'],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
