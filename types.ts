export interface State {
    textInput: string | null;
    textResult: string | null;
    availableLanguages: Language [];
    filteredAvailableLanguages: Language []
    filteredAvailableLanguagesByEnabled: Language [];
    supportedLanguages: Language [];
    filteredSupportedLanguages: Language [];
    translateFromIdx: number;
    translateToIdx: number;
    languageConfigIdx: number;
    currentOpenDropDown: string | null;
    searchEnabledLanguage: string;
    searchAvailableLanguage: string;
}
export interface Language {
    languageCode: string;
    languageName: string;
    enabled: boolean;
}
