export interface State {
    allLanguagesDisabled: boolean;
    textInput: string | null;
    textResult: string | null;
    availableLanguages: Language [];
    translateFromIdx: number;
    translateToIdx: number;
    currentOpenDropDown: string | null;
    searchEnabledLanguage: string;
    searchAvailableLanguage: string;
    enabledLanguages: Language [];
}
export interface Language {
    languageCode: string;
    languageName: string;
    enabled: boolean;
    idx: number;
}
