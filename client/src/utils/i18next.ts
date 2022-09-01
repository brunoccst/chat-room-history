import i18next from 'i18next';
import resources from 'resources';

i18next
    .init({
        resources: resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        nsSeparator: "::"
    });

console.log(i18next.t('{{count}} person', { count: 1 }));
console.log(i18next.t('{{count}} person', { count: 2 }));
console.log(i18next.t('{{initiatorCount}} person entered the room', { count: 1, initiatorCount: 1 }));
console.log(i18next.t('{{initiatorCount}} person entered the room', { count: 2, initiatorCount: 2 }));
export default i18next;