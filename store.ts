import {createStore} from "vuex";
import { State } from './types';
import axios from "axios";

const store = createStore<State>({
    state: {
        allLanguagesDisabled: false,
        textInput: '',
        textResult: '',
        availableLanguages: null,
        translateFromIdx: +(localStorage.getItem('translateFromIdx') || '0'),
        translateToIdx: +(localStorage.getItem('translateToIdx') || '1'),
        currentOpenDropDown: null,
        searchEnabledLanguage: '',
        searchAvailableLanguage: '',
        enabledLanguages: []
    },
    mutations: {
        setUpdatedAvailableLanguages(state, updatedLanguages) {
            const enabledLanguages = updatedLanguages.filter((language) => language.enabled);
            state.allLanguagesDisabled = enabledLanguages.length < 2;
            state.availableLanguages = updatedLanguages;
            state.availableLanguages.forEach((language, idx) => {
                language.idx = idx;
            });
        },
        setTextInput(state, textInput) {
            state.textInput = textInput;
        },
        setTextResult(state, textResult) {
            state.textResult = textResult;
        },
        handleCurrentDropDown(state, currentOpenDropDown: string) {
            state.currentOpenDropDown = currentOpenDropDown;
        },
        closeDropDowns(state) {
            state.currentOpenDropDown = null;
            state.searchEnabledLanguage = '';
            state.searchAvailableLanguage = '';
        },
        setSearchAvailableLanguage(state, searchAvailableLanguage: string) {
            state.searchAvailableLanguage = searchAvailableLanguage;
        },
        setAvailableLanguages(state, availableLanguages) {
            state.availableLanguages = availableLanguages;
            state.availableLanguages.forEach((language, idx) => {
                language.idx = idx;
            });
        },
        setTranslateFromIdx(state, index) {
            if (index === state.translateToIdx) {
                [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
            } else {
                state.translateFromIdx = index;
            }
            localStorage.setItem('translateFromIdx', state.translateFromIdx.toString());
        },
        setTranslateToIdx(state, index) {
            if (index === state.translateFromIdx) {
                [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
            } else {
                state.translateToIdx = index;
            }
            localStorage.setItem('translateToIdx', state.translateToIdx.toString());
        },
        reverseLanguages(state) {
            [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
        }
    },
    actions: {
        async getAvailableLanguages({ commit }) {
            try {
                const response = await axios.get('/translator/all-app-languages');
                commit('setAvailableLanguages', response.data);
            } catch (error) {
                console.error('Error loading available languages:', error);
            }
        },
        async updateLanguageConfiguration({ commit }, { languageCode, enabled }) {
            try {
                const response = await axios.get(`/translator/update-language-config?languageCode=${languageCode}&enable=${enabled}`);
                commit('setUpdatedAvailableLanguages', response.data);
            } catch (error) {
                console.error('Error loading available languages:', error);
            }
        }
    },
    getters: {
        textResult: state => state.textResult
    },
});
export default store;
