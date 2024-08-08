import React, { useState, FC, useEffect, useMemo } from "react";
import { LsmContext } from "../context/LsmContext";
import { ILsmInitialConfig } from "../interfaces/lsm.interfaces";

const LsmProvider: FC<
	ILsmInitialConfig & { children?: JSX.Element | JSX.Element[] }
> = ({ children, fallbackLanguage, translations, initOptions }) => {
	const localStorageLangKey = "lsmLanguage";
	const initialLanguage = localStorage.getItem(localStorageLangKey);
	const availableLanguages = Object.keys(translations ?? {});

	/**
	 * @param {string} initialLanguage - The initial language to use
	 * @param {string} fallbackLanguage - The fallback language to use
	 * @param {object} translations - The translations to use
	 * */
	const [language, setLanguage] = useState<keyof typeof translations>(
		initialLanguage ?? fallbackLanguage
	);

	/**
	 * @param lang - The language to set
	 */
	const onChangeLanguage = (lang: keyof typeof translations) => {
		if (!availableLanguages.includes(lang)) {
			throw new Error(`Language ${lang} is not available`);
		}
		setLanguage(lang);
		return lang;
	};

	const contextValue = useMemo(() => {
		return {
			language,
			setLanguage: onChangeLanguage,
			translations,
			availableLanguages,
			initOptions,
		};
	}, [language, onChangeLanguage, translations]);

	useEffect(() => {
		// Set the language in local storage each time the language changes
		localStorage.setItem(localStorageLangKey, language);
	}, [language]);

	return (
		<LsmContext.Provider value={contextValue}>{children}</LsmContext.Provider>
	);
};

export default LsmProvider;
