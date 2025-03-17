// store.ts
import {createStore} from "vuex";
import { State } from './types';

const store = createStore<State>({
    state: {
        textInput: null,
        textResult: null,
        languages: [
            { languageCode: "en", languageName: "English" },
            { languageCode: "es", languageName: "Spanish" },
            { languageCode: "fr", languageName: "French" },
            { languageCode: "de", languageName: "German" },
            { languageCode: "he", languageName: "Hebrew" },
            { languageCode: "ru", languageName: "Russian" },
            { languageCode: "ja", languageName: "Japanese" },
            { languageCode: "zh", languageName: "Chinese" },
            { languageCode: "it", languageName: "Italian" },
            { languageCode: "pt", languageName: "Portuguese" },
            { languageCode: "ar", languageName: "Arabic" },
            { languageCode: "ko", languageName: "Korean" },
            { languageCode: "nl", languageName: "Dutch" },
            { languageCode: "pl", languageName: "Polish" },
            { languageCode: "sv", languageName: "Swedish" },
            { languageCode: "no", languageName: "Norwegian" },
            { languageCode: "fi", languageName: "Finnish" },
            { languageCode: "da", languageName: "Danish" },
            { languageCode: "tr", languageName: "Turkish" },
            { languageCode: "cs", languageName: "Czech" },
            { languageCode: "el", languageName: "Greek" },
            { languageCode: "ro", languageName: "Romanian" },
            { languageCode: "th", languageName: "Thai" },
            { languageCode: "hi", languageName: "Hindi" },
            { languageCode: "ur", languageName: "Urdu" },
            { languageCode: "id", languageName: "Indonesian" },
            { languageCode: "ms", languageName: "Malay" },
            { languageCode: "ta", languageName: "Tamil" },
            { languageCode: "vi", languageName: "Vietnamese" },
            { languageCode: "hr", languageName: "Croatian" }
        ],
        currentLanguageSupportConfig: [ { languageCode: "en", languageName: "English" },  { languageCode: "fr", languageName: "French" }],
        translateFromIdx: +(localStorage.getItem('translateFromIdx') || '0'),
        translateToIdx: +(localStorage.getItem('translateToIdx') || '1'),
        currentOpenDropDown: null

    },
    mutations: {
        setTextInput(state, textInput) {
            state.textInput = textInput;
        },
        handleCurrentDropDown(state, currentOpenDropDown: string) {
            state.currentOpenDropDown = currentOpenDropDown;
        },
        closeDropDowns(state) {
            state.currentOpenDropDown = null;
        }
    },
    getters: {
        textResult: state => state.textResult
    },
});
export default store;
