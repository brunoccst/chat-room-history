import { ChangeEvent } from 'react';
import { i18next } from 'utils';
import { useTranslation } from 'react-i18next';
import './language-selector.scss';

const LanguageNames = {
    "en": "English",
    "pt": "Português"
}

const LanguageSelector = () => {
    const { t } = useTranslation();

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        i18next.changeLanguage(event.currentTarget.value);
    }

    return (
        <div className="language-selector">
            <label>{t('language')}</label>
            <select value={i18next.language} onChange={onChange}>
                {
                    Object
                        .keys(i18next.services.resourceStore.data)
                        .map(lng => {
                            let languageName: string = "";
                            Object.entries(LanguageNames)
                                .find(([key, value]) => {
                                    if (key === lng) {
                                        languageName = value;
                                        return true;
                                    }

                                    return false;
                                });

                            return <option value={lng}>{languageName}</option>;
                        })
                }
            </select>
        </div>
    )
}

export default LanguageSelector;