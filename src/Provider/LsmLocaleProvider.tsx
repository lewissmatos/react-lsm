import React, { useState, ReactNode, FC, useEffect } from "react";
import LsmLocaleContext from "../context/LsmLocaleContext";
import { ILsmLocaleConfig } from "../interfaces/lsmLocale.interfaces";

// Set the default language key for the local storage access
const localStorageLangKey = "lsmLanguage";
const initialLanguage = localStorage.getItem(localStorageLangKey);
const LsmLocaleProvider: FC<ILsmLocaleConfig & { children?: ReactNode }> = ({
	children,
	fallbackLanguage,
	translations,
}) => {
	/**
	 * @param {string} initialLanguage - The initial language to use
	 * @param {string} fallbackLanguage - The fallback language to use
	 * @param {} translations - The translations to use
	 * */
	const [language, setLanguage] = useState<keyof typeof translations>(
		initialLanguage ?? fallbackLanguage
	);

	/**
	 * @param lang - The language to set
	 */
	const onChangeLanguage = (lang: keyof typeof translations) => {
		setLanguage(lang);
	};

	const contextValue = {
		language,
		setLanguage: onChangeLanguage,
		translations,
	};

	useEffect(() => {
		// Set the language in local storage each time the language changes
		localStorage.setItem(localStorageLangKey, language);
	}, [language]);

	return (
		<LsmLocaleContext.Provider value={contextValue}>
			{children}
		</LsmLocaleContext.Provider>
	);
};

export default LsmLocaleProvider;
