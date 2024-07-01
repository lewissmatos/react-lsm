import React from "react";
import LsmProvider from "../Provider/LsmProvider";

/**
 * @param {string} fallbackLanguage
 * @param {Object} translations
 * @returns {Object}
 * @example:
 * const LsmProvider = initLsm("en-US", {
	"en-US": { greeting: "Hello", },
	"es-MX": { greeting: "Hola",  },
	});
 */
const initLsm = (
	fallbackLanguage: string,
	translations: { [key: string]: any }
) => {
	// Return a component
	const ConfiguredLsmProvider: React.FC<{
		children?: JSX.Element | JSX.Element[];
	}> = ({ children }) => {
		return (
			<LsmProvider
				fallbackLanguage={fallbackLanguage}
				translations={translations}
			>
				{children}
			</LsmProvider>
		);
	};

	return ConfiguredLsmProvider;
};

export default initLsm;
