import {createStore} from "vuex";
import { State } from './types';
import axios from "axios";

const store = createStore<State>({
    state: {
        textInput: null,
        textResult: null,
        availableLanguages: null,
        filteredAvailableLanguages: [],
        supportedLanguages: null,
        filteredSupportedLanguages: [],
        translateFromIdx: +(localStorage.getItem('translateFromIdx') || '0'),
        translateToIdx: +(localStorage.getItem('translateToIdx') || '1'),
        languageConfigIdx: +(localStorage.getItem('languageConfigIdx') || '0'),
        currentOpenDropDown: null,
        searchSupportedLanguage: '',
        searchAvailableLanguage: ''

    },
    mutations: {
        setSupportedLanguages(state, supportedLanguages) {
            state.supportedLanguages = supportedLanguages;
        },
        setFilteredSupportedLanguages(state, searchLanguage: string) {
            const filtered = state.supportedLanguages.filter((language) => {
                return language.languageName.toLowerCase().startsWith(searchLanguage.toLowerCase());
            });
            state.filteredSupportedLanguages = filtered.length > 0 ? filtered : state.supportedLanguages;
        },
        setTextInput(state, textInput) {
            state.textInput = textInput;
        },
        handleCurrentDropDown(state, currentOpenDropDown: string) {
            state.currentOpenDropDown = currentOpenDropDown;
        },
        closeDropDowns(state) {
            state.currentOpenDropDown = null;
            state.searchSupportedLanguage = '';
            state.searchAvailableLanguage = '';
        },
        setSearchSupportedLanguage(state, searchSupportedLanguage: string) {
            state.searchSupportedLanguage = searchSupportedLanguage;
        },
        setSearchAvailableLanguage(state, searchAvailableLanguage: string) {
            state.searchAvailableLanguage = searchAvailableLanguage;
        },
        setAvailableLanguages(state, availableLanguages) {
            state.availableLanguages = availableLanguages;
        },
        setFilteredAvailableLanguages(state, searchAvailableLanguage: string) {
            const filtered = state.availableLanguages.filter((language) => {
                return language.languageName.toLowerCase().startsWith(searchAvailableLanguage.toLowerCase());
            });
            state.filteredAvailableLanguages = filtered.length > 0 ? filtered : state.availableLanguages;
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
        async getSupportedLanguages({ commit }) {
            try {
                const response = await axios.get('http://localhost:5268/translator/supported-languages');
                commit('setSupportedLanguages', response.data);
            } catch (error) {
                console.error('Error loading supported languages:', error);
            }
        },
        async getAvailableLanguages({ commit }) {
            try {
                const response = await axios.get('http://localhost:5268/translator/all-app-languages');
                commit('setAvailableLanguages', response.data);
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
