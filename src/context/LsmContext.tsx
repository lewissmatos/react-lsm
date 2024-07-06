import { createContext, useContext } from "react";
import { ILsmContextProps } from "../interfaces/lsm.interfaces";

// Create the global context
export const LsmContext = createContext<ILsmContextProps | null>(null);

/**
 * @description Hook to get the LsmContext values
 * @returns {ILsmContextProps} The LsmContext values
 * @throws {Error} If the context is not available
 */
export const useLsmContext = () => {
	// Get the context from the global context
	const context = useContext(LsmContext);

	// Validate that the context is available
	if (!context) {
		throw new Error("useLsmContext must be used within a LsmProvider");
	}
	return context;
};

export default LsmContext;
