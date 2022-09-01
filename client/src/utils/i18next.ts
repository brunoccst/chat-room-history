import i18next, { Resource } from 'i18next';
import resources from 'resources';

const i18nextResources: Resource = Object.assign({},
    ...Object.keys(resources).map((key: string) => ({
        [key]: { translation: resources[key] }
    }))
);

const options = {
    resources: i18nextResources,
    whitelist: Object.keys(resources),
    fallbackLng: "enUS",
    detection: {
        order: ['querystring', 'cookie', 'navigator'],
        lookupQuerystring: 'culture',
        lookupCookie: '.AspNetCore.Culture',
        caches: ['cookie']
    }
};

i18next.init(options);

export default i18next;