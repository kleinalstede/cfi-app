import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './translations/de.json';
import en from './translations/en.json';

i18n
  .use(LanguageDetector) // Erkennt die Gerätesprache automatisch
  .use(initReactI18next) // Bindet i18next an React
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en }
    },
    fallbackLng: 'de', // Standard-Sprache: Deutsch
    interpolation: { escapeValue: false } // Sicher für React
  });

export default i18n;