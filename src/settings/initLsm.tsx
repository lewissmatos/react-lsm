import React from "react";
import LsmProvider from "../Provider/LsmProvider";
import { LsmInitOptions } from "../interfaces/lsm.interfaces";

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
	translations: { [key: string]: any },
	initOptions?: LsmInitOptions
) => {
	// Return a component
	const ConfiguredLsmProvider: React.FC<{
		children?: JSX.Element | JSX.Element[];
	}> = ({ children }) => {
		return (
			<LsmProvider
				fallbackLanguage={fallbackLanguage}
				translations={translations}
				initOptions={initOptions}
			>
				{children}
			</LsmProvider>
		);
	};

	return ConfiguredLsmProvider;
};

export default initLsm;
