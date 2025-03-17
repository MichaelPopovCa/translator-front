import {createStore} from "vuex";
import { State } from './types';
import axios from "axios";

const store = createStore<State>({
    state: {
        textInput: null,
        textResult: null,
        supportedLanguages: null,
        filteredSupportedLanguages: [],
        translateFromIdx: +(localStorage.getItem('translateFromIdx') || '0'),
        translateToIdx: +(localStorage.getItem('translateToIdx') || '1'),
        currentOpenDropDown: null,
        searchLanguage: ''

    },
    mutations: {
        setSupportedLanguages(state, supportedLanguages) {
            state.supportedLanguages = supportedLanguages;
        },
        setTextInput(state, textInput) {
            state.textInput = textInput;
        },
        handleCurrentDropDown(state, currentOpenDropDown: string) {
            state.currentOpenDropDown = currentOpenDropDown;
        },
        closeDropDowns(state) {
            state.currentOpenDropDown = null;
        },
        setSearchLanguage(state, searchLanguage: string) {
            state.searchLanguage = searchLanguage;
        },
        setFilteredSupportedLanguages(state, searchLanguage: string) {
            const filtered = state.supportedLanguages.filter((language) => {
                return language.languageName.toLowerCase().startsWith(searchLanguage.toLowerCase());
            });
            state.filteredSupportedLanguages = filtered.length > 0 ? filtered : state.supportedLanguages;
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
    },
    getters: {
        textResult: state => state.textResult
    },
});
export default store;
