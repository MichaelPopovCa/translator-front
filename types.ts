export interface State {
    textInput: string | null;
    textResult: string | null;
    supportedLanguages: Language [];
    filteredSupportedLanguages: Language [];
    translateFromIdx: number;
    translateToIdx: number;
    currentOpenDropDown: string | null;
    searchLanguage: string;
}
export interface Language {
    languageCode: string;
    languageName: string;
}
