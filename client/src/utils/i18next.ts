import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import resources from 'resources';

i18next
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        nsSeparator: "::"
    });

export default i18next;