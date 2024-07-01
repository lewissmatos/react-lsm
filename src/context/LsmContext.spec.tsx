import { renderHook } from "@testing-library/react";
import React, { act } from "react";
import translations from "../example/translations.json";
import { useLsmContext, default as LsmContext } from "./LsmContext";
import initLsm from "../settings/initLsm";

// Mock component to test useLsmContext hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<LsmContext.Provider
		value={{ language: "en-US", setLanguage: jest.fn(), translations }}
	>
		{children}
	</LsmContext.Provider>
);

describe("LsmContext", () => {
	test("provides default context values within a LsmProvider", () => {
		const { result } = renderHook(() => useLsmContext(), { wrapper });
		expect(result.current.language).toBe("en-US");
	});

	test("updates the language when setLanguage is called", () => {
		const Provider = initLsm("en-US", translations);
		// Wrap the hook with the context provider
		const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
		// Render the hook within the context provider
		const { result } = renderHook(() => useLsmContext(), { wrapper });
		// Use act to simulate the state update
		act(() => {
			result.current.setLanguage("es-MX");
		});
		// Assert the language has been updated
		expect(result.current.language).toBe("es-MX");
	});
});
