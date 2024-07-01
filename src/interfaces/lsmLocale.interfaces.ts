// Define the interface for the Context and the Provider
export interface ILsmLocaleContextValues {
	language: string | null;
	setLanguage: (lang: string) => void;
	translations: Record<string, any> | null;
}

// Define the interface for the hook options
export type LsmLocaleOptions = {
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	replace?: {
		values: { [key: string]: string | number };
		withTranslation?: boolean;
	};
	mutate?: {
		when: boolean;
		value: string;
		withTranslation?: boolean;
	};
	startAdornment?: string;
	endAdornment?: string;
};

export interface ILsmLocaleConfig {
	translations: Record<string, any>;
	fallbackLanguage: string;
}
