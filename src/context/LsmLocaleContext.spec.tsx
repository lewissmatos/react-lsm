import { renderHook } from "@testing-library/react";
import React, { act } from "react";
import translations from "../example/translations.json";
import {
	useLsmLocaleContext,
	default as LsmLocaleContext,
} from "./LsmLocaleContext";
import initLsmLocale from "../settings/initLsmLocale";

// Mock component to test useLsmLocaleContext hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<LsmLocaleContext.Provider
		value={{ language: "en-US", setLanguage: jest.fn(), translations }}
	>
		{children}
	</LsmLocaleContext.Provider>
);

describe("LsmLocaleContext", () => {
	test("provides default context values within a LsmLocaleProvider", () => {
		const { result } = renderHook(() => useLsmLocaleContext(), { wrapper });
		expect(result.current.language).toBe("en-US");
	});

	test("updates the language when setLanguage is called", () => {
		const Provider = initLsmLocale("en-US", translations);
		// Wrap the hook with the context provider
		const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
		// Render the hook within the context provider
		const { result } = renderHook(() => useLsmLocaleContext(), { wrapper });
		// Use act to simulate the state update
		act(() => {
			result.current.setLanguage("es-MX");
		});
		// Assert the language has been updated
		expect(result.current.language).toBe("es-MX");
	});
});
