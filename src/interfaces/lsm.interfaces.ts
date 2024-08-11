// Define the interface for the Context and the Provider
export interface ILsmContextProps {
	language: string | null;
	setLanguage: (lang: string) => void;
	translations: Record<string, any> | null;
	availableLanguages: string[];
	initOptions?: LsmInitOptions;
}
export type LsmInitOptions = {
	isDevMode?: boolean;
	disableDefaultFallback?: boolean;
};

export type LsmTextCase = "capitalize" | "uppercase" | "lowercase";
export type LsmReplace = {
	values: { [key: string]: string | number };
	withTranslation?: boolean;
};

type LsmConditionalOptions = {
	when?: boolean;
	value?: string;
	withTranslation?: boolean;
};
type LsmMutate = LsmConditionalOptions & {};
type LsmFixContent = LsmConditionalOptions & {};

// Define the interface for the hook options
export type LsmTranslationOptions = {
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	textCase?: LsmTextCase;
	replace?: LsmReplace;
	mutate?: LsmMutate;
	prefixContent?: LsmFixContent;
	suffixContent?: LsmFixContent;
	rejectDefaultFallback?: boolean;
	overrideLanguage?: string;
};

export interface ILsmInitialConfig {
	translations: Record<string, any>;
	fallbackLanguage: string;
	initOptions?: LsmInitOptions;
}
