import Cookies from 'js-cookie';

export const jnLanguages = [
    {
        id: 1,
        text: "Bokmål",
        i18n: "nb-NO"
    },
    {
        id: 2,
        text: "Engelsk",
        i18n: "en"
    },
    {
        id: 3,
        text: "Nynorsk",
        i18n: "nn-NO"
    },
    {
        id: 4,
        text: "Såmegiella",
        i18n: "se-NO"
    }
]

class LocalizationService {

    constructor() {
        this.selectedLocalization = this.getLocalization();
    }

    getLocalization() {
        let languageId = Cookies.get("jobbnorge.language");
        if (languageId === undefined)
            languageId = 1;
        
        return jnLanguages.find(jnL => jnL.id == languageId).i18n;
    }
}    

export const localizationService = new LocalizationService();