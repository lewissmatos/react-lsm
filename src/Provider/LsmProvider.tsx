import React, { useState, ReactNode, FC, useEffect } from "react";
import LsmContext from "../context/LsmContext";
import { ILsmConfig } from "../interfaces/lsm.interfaces";

// Set the default language key for the local storage access
const localStorageLangKey = "lsmLanguage";
const initialLanguage = localStorage.getItem(localStorageLangKey);
const LsmProvider: FC<ILsmConfig & { children?: ReactNode }> = ({
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
		<LsmContext.Provider value={contextValue}>{children}</LsmContext.Provider>
	);
};

export default LsmProvider;
