import {createStore} from "vuex";
import { State } from './types';
import axios from "axios";

const store = createStore<State>({
    state: {
        allLanguagesDisabled: false,
        textInput: '',
        textResult: '',
        availableLanguages: null,
        filteredAvailableLanguages: [],
        filteredAvailableLanguagesByEnabled: [],
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
            state.enabledLanguages = updatedLanguages.filter((language) => language.enabled);
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
        setSearchEnabledLanguage(state, searchEnabledLanguage: string) {
            state.searchEnabledLanguage = searchEnabledLanguage;
        },
        setSearchAvailableLanguage(state, searchAvailableLanguage: string) {
            state.searchAvailableLanguage = searchAvailableLanguage;
        },
        setAvailableLanguages(state, availableLanguages) {
            state.availableLanguages = availableLanguages;
            state.availableLanguages.forEach((language, idx) => {
                language.idx = idx;
            });
            state.enabledLanguages = availableLanguages.filter((language) => language.enabled);
        },
        setFilteredAvailableLanguages(state, searchAvailableLanguage: string) {
            const filtered = state.availableLanguages.filter((language) => {
                return language.languageName.toLowerCase().startsWith(searchAvailableLanguage.toLowerCase());
            });
            state.filteredAvailableLanguages = filtered.length > 0 ? filtered : state.availableLanguages;
        },
        setFilteredAvailableLanguagesByEnabled(state, searchAvailableLanguage: string) {
            const filtered = state.enabledLanguages.filter((language) => {
                return language.enabled && language.languageName.toLowerCase().startsWith(searchAvailableLanguage.toLowerCase());
            });
            state.filteredAvailableLanguagesByEnabled = filtered.length > 0 ? filtered : state.enabledLanguages;
        },
        setTranslateFromIdx(state, index) {
            if (index === state.translateToIdx) {
                [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
            } else {
                state.translateFromIdx = index;
            }
        },
        setTranslateToIdx(state, index) {
            if (index === state.translateFromIdx) {
                [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
            } else {
                state.translateToIdx = index;
            }
        },
        reverseLanguages(state) {
            [state.translateFromIdx, state.translateToIdx] = [state.translateToIdx, state.translateFromIdx];
        }
    },
    actions: {
        async getAvailableLanguages({ commit }) {
            try {
                const response = await axios.get('http://localhost:5268/translator/all-app-languages');
                commit('setAvailableLanguages', response.data);
            } catch (error) {
                console.error('Error loading available languages:', error);
            }
        },
        async updateLanguageConfiguration({ commit }, { languageCode, enabled }) {
            try {
                const response = await axios.get(`http://localhost:5268/translator/update-language-config?languageCode=${languageCode}&enable=${enabled}`);
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
