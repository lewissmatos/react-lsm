import { renderHook } from "@testing-library/react";
import translations from "../examples/translations.json";
import useLsmTranslation from "../src/context/useLsmTranslation";
import { LsmTranslationOptions } from "../src/interfaces/lsm.interfaces";

// Mock component to test useLsmContext hook
jest.mock("../src/context/LsmContext.tsx", () => ({
	useLsmContext: jest.fn(),
}));

describe("useLsmTranslation", () => {
	const mockSetLanguage = jest.fn();
	const defaultContext = {
		language: "en-US",
		translations,
		setLanguage: mockSetLanguage,
		availableLanguages: Object.keys(translations ?? {}),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		require("../src/context/LsmContext.tsx").useLsmContext.mockImplementation(
			() => defaultContext
		);
	});

	// Throw an Error if the the translations do not exist
	it("should throw an error if translations are not set", () => {
		require("../src/context/LsmContext.tsx").useLsmContext.mockImplementation(
			() => ({
				...defaultContext,
				translations: null,
			})
		);
		const { result } = renderHook(() => useLsmTranslation());
		expect(() => result.current.translate("greeting")).toThrow(
			"translations are not set"
		);
	});

	// Throw an Error if the the language does not exist
	it("should throw an error if language is not set", () => {
		require("../src/context/LsmContext.tsx").useLsmContext.mockImplementation(
			() => ({
				...defaultContext,
				language: null,
			})
		);
		const { result } = renderHook(() => useLsmTranslation());
		expect(() => result.current.translate("greeting")).toThrow(
			"language is not set"
		);
	});

	// Throw an Error if the the locale data for a specific language does not exist
	it("should throw an error if the locale for the language is not set", () => {
		require("../src/context/LsmContext.tsx").useLsmContext.mockImplementation(
			() => ({
				...defaultContext,
				translations: {},
			})
		);
		const { result } = renderHook(() => useLsmTranslation());
		expect(() => result.current.translate("greeting")).toThrow(
			"translations for language not found"
		);
	});

	// Translate a simple key
	it("should translate a simple key", () => {
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting")).toEqual(
			translations["en-US"].greeting
		);
	});

	// Translate a simple nested key
	it("should translate a nested key", () => {
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("navbar.home")).toEqual(
			translations["en-US"].navbar.home
		);
	});

	// Return the key if it doesn't exist in the locale
	it("should return the key if no translation is found", () => {
		const unknownKey = "unknown";
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate(unknownKey)).toEqual(`_${unknownKey}_`);
	});

	// Capitalize
	it("should return a capitalized value if *capitalize* option is sent", () => {
		const options: LsmTranslationOptions = {
			capitalize: true,
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("info", options)).toEqual(
			translations["en-US"].info.charAt(0).toUpperCase() +
				translations["en-US"].info.slice(1)
		);
	});

	// Uppercase
	it("should return a upper value if *uppercase* option is sent", () => {
		const options: LsmTranslationOptions = {
			uppercase: true,
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting", options)).toEqual(
			translations["en-US"].greeting.toUpperCase()
		);
	});

	// Lowercase
	it("should return a lower value if *lowercase* option is sent", () => {
		const options: LsmTranslationOptions = {
			lowercase: true,
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting", options)).toEqual(
			translations["en-US"].greeting.toLowerCase()
		);
	});

	// Replace
	it("should return a replaced word in the value if *replace* option is sent", () => {
		const options: LsmTranslationOptions = {
			replace: { values: { value: 5 } },
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("activeNotifications", options)).toEqual(
			translations["en-US"].activeNotifications.replaceAll(
				"{value}",
				options.replace!.values.value.toString()
			)
		);
	});

	// Replace
	it("should return a replaced word in the value if *replace* option is sent", () => {
		require("../src/context/LsmContext.tsx").useLsmContext.mockImplementation(
			() => ({
				...defaultContext,
				language: "es-MX",
				translations,
			})
		);
		const { result } = renderHook(() => useLsmTranslation());
		const options: LsmTranslationOptions = {
			replace: {
				values: {
					status: "orderStatuses.pending",
				},
				withTranslation: true,
			},
		};

		expect(result.current.translate("orderStatus", options)).toEqual(
			`${translations["es-MX"].orderStatus.replaceAll(
				"{status}",
				translations["es-MX"].orderStatuses.pending
			)}`
		);
	});

	// Mutate With Translation
	it("should return a mutated word in the value if *mutate* option is sent, with translation", () => {
		const options: LsmTranslationOptions = {
			mutate: {
				when: true,
				value: "loading",
				withTranslation: true,
			},
		};

		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("submit", options)).toEqual(
			translations["en-US"].loading.charAt(0).toUpperCase() +
				translations["en-US"].loading.slice(1)
		);
	});

	// Mutate With Translation
	it("should return the original value even if *mutate* option is sent but *when* is false", () => {
		const options: LsmTranslationOptions = {
			mutate: {
				when: false,
				value: "loading",
			},
		};

		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("submit", options)).toEqual(
			translations["en-US"].submit
		);
	});

	// TextCase

	// Capitalize
	it("should return a capitalized value if *textCase = capitalize* option is sent", () => {
		const options: LsmTranslationOptions = {
			textCase: "capitalize",
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("info", options)).toEqual(
			translations["en-US"].info.charAt(0).toUpperCase() +
				translations["en-US"].info.slice(1)
		);
	});

	// Uppercase
	it("should return a capitalized value if *textCase = uppercase* option is sent", () => {
		const options: LsmTranslationOptions = {
			textCase: "uppercase",
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting", options)).toEqual(
			translations["en-US"].greeting.toUpperCase()
		);
	});

	// Lowercase
	it("should return a capitalized value if *textCase = lowercase* option is sent", () => {
		const options: LsmTranslationOptions = {
			textCase: "lowercase",
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting", options)).toEqual(
			translations["en-US"].greeting.toLowerCase()
		);
	});

	// Reject Default Fallback
	it("should return the key if no translation is found", () => {
		const options: LsmTranslationOptions = {
			rejectDefaultFallback: true,
		};
		const unknownKey = "unknown";
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate(unknownKey, options)).toEqual(unknownKey);
	});

	// Prefix Content
	it("should return the prefix content if *prefixContent* option is sent", () => {
		const options: LsmTranslationOptions = {
			prefixContent: {
				value: "🚀",
				when: true,
			},
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("submit", options)).toEqual(
			"🚀" + translations["en-US"].submit
		);
	});
	// Suffix Content
	it("should return the prefix content if *prefixContent* option is sent", () => {
		const options: LsmTranslationOptions = {
			suffixContent: {
				value: "🚀",
				when: true,
			},
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("submit", options)).toEqual(
			translations["en-US"].submit + "🚀"
		);
	});

	// Suffix and Prefix Content
	it("should return the prefix content if *prefixContent* option is sent", () => {
		const options: LsmTranslationOptions = {
			prefixContent: {
				value: "🚀",
				when: true,
			},
			suffixContent: {
				value: "🚀",
				when: true,
			},
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("submit", options)).toEqual(
			"🚀" + translations["en-US"].submit + "🚀"
		);
	});

	// Available Languages
	it("should return an array of available languages", () => {
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.availableLanguages).toEqual(["en-US", "es-MX"]);
	});

	// Override Language
	it("should return the translation for the override language", () => {
		const options: LsmTranslationOptions = {
			overrideLanguage: "es-MX",
		};
		const { result } = renderHook(() => useLsmTranslation());
		expect(result.current.translate("greeting", options)).toEqual(
			translations["es-MX"].greeting
		);
	});
});
