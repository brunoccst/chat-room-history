import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from 'resources';

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        nsSeparator: "::",
        detection: {
            order: ['querystring', 'cookie', 'navigator'],
            lookupQuerystring: 'culture',
            lookupCookie: '.AspNetCore.Culture',
            caches: ['cookie']
        }
    });

export default i18next;