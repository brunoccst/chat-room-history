import { ChangeEvent } from 'react';
import { i18next } from 'utils';
import './language-selector.scss';

type LanguageNameDict = { [shortName: string]: string }

const LanguageNames: LanguageNameDict = {
    ["en"]: "English",
    ["pt"]: "Português"
}

const LanguageSelector = () => {
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        i18next.changeLanguage(event.currentTarget.value);
    }

    return (
        <div className="language-selector">
            <label>Language:</label>
            <select value={i18next.language} onChange={onChange}>
                {
                    Object
                        .keys(i18next.services.resourceStore.data)
                        .map(lng => {
                            const languageName = LanguageNames[lng];
                            return <option value={lng}>{languageName}</option>;
                        })
                }
            </select>
        </div>
    )
}

export default LanguageSelector;