import { createContext, useContext } from "react";
import { ILsmLocaleContextValues } from "../interfaces/lsmLocale.interfaces";

// Create the global context
const LsmLocaleContext = createContext<ILsmLocaleContextValues>({
	language: null,
	setLanguage: () => {},
	translations: null,
});

/**
 * @description Hook to get the LsmLocaleContext values
 * @returns {ILsmLocaleContextValues} The LsmLocaleContext values
 * @throws {Error} If the context is not available
 */
export const useLsmLocaleContext = () => {
	// Get the context from the global context
	const context = useContext(LsmLocaleContext);

	// Validate that the context is available
	if (!context) {
		throw new Error(
			"useLsmLocaleContext must be used within a LsmLocaleProvider"
		);
	}
	return context;
};

export default LsmLocaleContext;
