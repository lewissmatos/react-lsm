import React from "react";
import LsmLocaleProvider from "../Provider/LsmLocaleProvider";

/**
 * @param {string} fallbackLanguage
 * @param {Object} locales
 * @returns {Object}
 * @example:
 * const LsmProvider = initLsmLocale("en-US", {
	"en-US": { greeting: "Hello", },
	"es-MX": { greeting: "Hola",  },
	});
 */
const initLsmLocale = (
	fallbackLanguage: string,
	locales: { [key: string]: any }
) => {
	// Return a component
	const ConfiguredLsmLocaleProvider: React.FC<{
		children?: React.ReactNode;
	}> = ({ children }) => {
		return (
			<LsmLocaleProvider fallbackLanguage={fallbackLanguage} locales={locales}>
				{children}
			</LsmLocaleProvider>
		);
	};

	return ConfiguredLsmLocaleProvider;
};

export default initLsmLocale;
