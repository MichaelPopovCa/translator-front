export interface State {
    textInput: string | null;
    textResult: string | null;
    languages: Language [];
    currentLanguageSupportConfig: Language [];
    translateFromIdx: number;
    translateToIdx: number;
    currentOpenDropDown: string | null;
}
export interface Language {
    languageCode: string;
    languageName: string;
}
