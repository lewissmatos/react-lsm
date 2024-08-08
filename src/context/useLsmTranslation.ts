import {
	LsmInitOptions,
	LsmTranslationOptions,
} from "../interfaces/lsm.interfaces";
import { useLsmContext } from "./LsmContext";

// Create the hook
const useLsmTranslation = () => {
	// Get the context
	const {
		language,
		translations,
		setLanguage,
		availableLanguages,
		initOptions,
	} = useLsmContext();
	/**
	 * @function
	 * @description Create the hook's main function to translate the key and apply the options to format the value
	 * @param key The key to translate
	 * @param {LsmTranslationOptions} options The options to format the value with
	 * @throws Will throw an error if  language is not set, translations are not set, or if the locale for the language is not set.
	 * @returns The translated value or the key if no translation is found.
	 */
	const translate = (key: string, options?: LsmTranslationOptions) => {
		// Check if the language is set
		if (!language) throw new Error("language is not set!");

		// Check if the translations are set
		if (!translations) throw new Error("translations are not set!");

		// Check if the locale for the language is set
		if (!translations[language])
			throw new Error("translations for language not found!");

		// Get the locale data using the language as a key
		const localeData =
			translations[options?.overrideLanguage ?? language] ||
			Object.values(translations)?.[0] ||
			{};

		// Get the translated value
		const translatedValue = getKey(key, localeData) as string;

		// Format the value using the options
		let value =
			(options ? formatValue(translatedValue, options) : translatedValue) ||
			`_${key}_`;

		if (initOptions?.isDevMode && value === `_${key}_`) {
			console.warn(`Missing translation for key: ${key}`);
		}

		if (initOptions?.disableDefaultFallback) {
			return (value = value.replace(/[_*]/g, ""));
		}

		return value as string;
	};

	/**
	 * @function
	 * @description Format the value using the options
	 * @param value The value to format
	 * @param options The options to format the value with
	 * @returns The formatted value
	 * @throws Will throw an error if the value is not a string.
	 *
	 * The following options are available:
	 * - textCase: Capitalize, uppercase, or lowercase the value
	 * - replace: Replace the value with the specified values
	 * - mutate: Mutate the value based on the specified options
	 */
	const formatValue = (
		value: string,
		options: LsmTranslationOptions = {}
	): string => {
		if (
			(options.capitalize || options.uppercase || options.lowercase) &&
			options.textCase
		) {
			throw new Error(
				"The textCase option cannot be used with the capitalize, uppercase, or lowercase options!"
			);
		}
		/**
		 * @deprecated This should not be used because it interferes with the textCase option
		 * The capitalize option will capitalize the first letter of the value
		 */
		if (options.capitalize)
			value = value.charAt(0).toUpperCase() + value.slice(1);

		/**
		 * @deprecated This should not be used because it interferes with the textCase option
		 * The uppercase option will uppercase the value
		 */
		if (options.uppercase) value = value.toUpperCase();

		/**
		 * @deprecated This should not be used because it interferes with the textCase option
		 * The lowercase option will lowercase the value
		 */
		if (options.lowercase) value = value.toLowerCase();

		/**
		 * @function
		 * @description The following options are available:
		 * The textCase option will capitalize, uppercase, or lowercase the value
		 */

		if (options.textCase) {
			const textCases = {
				capitalize: () => value.charAt(0).toUpperCase() + value.slice(1),
				uppercase: () => value.toUpperCase(),
				lowercase: () => value.toLowerCase(),
			};
			value = textCases[options.textCase]() ?? value;
		}

		/*
		 * The prefixContent option will add the specified value to the beginning of the value
		 */
		if (options.prefixContent) {
			let {
				when,
				value: prefixContent,
				withTranslation,
			} = options.prefixContent;
			if (when) {
				prefixContent = withTranslation
					? translate(prefixContent ?? "")
					: prefixContent;
				value = !!Boolean(prefixContent) ? `${prefixContent}${value}` : value;
			} else {
				value = value;
			}
		}

		/*
		 * The suffixContent option will add the specified value to the end of the value
		 */
		if (options.suffixContent) {
			let {
				when,
				value: suffixContent,
				withTranslation,
			} = options.suffixContent;
			if (when) {
				suffixContent = withTranslation
					? translate(suffixContent ?? "")
					: suffixContent;
				value = !!Boolean(suffixContent) ? `${value}${suffixContent}` : value;
			} else {
				value = value as string;
			}
		}

		/*
		 * The replace option is an object with the following properties:
		 * - values: An object with the keys as the placeholder and the values as the replacement
		 * - withTranslation: Whether to translate the replacement value
		 */
		if (options?.replace) {
			let replacedValue = value;
			Object.entries(options?.replace?.values).forEach(([key, value]) => {
				const mustTranslate = options?.replace?.withTranslation || false;
				const finalValue = mustTranslate
					? translate((value as string)?.toString())
					: value?.toString();
				replacedValue = replacedValue?.replace(
					new RegExp(`{${key}}`, "g"),
					finalValue as string
				);
			});
			value = replacedValue;
		}

		/*
		 * The mutate option is an object with the following properties:
		 * - when: Whether to mutate the value
		 * - value: The value to mutate
		 * - withTranslation: Whether to translate the value
		 * - suffixContent: The end content to add to the value
		 */
		if (options?.mutate) {
			const { when, value: newValue, withTranslation } = options?.mutate;
			if (when) {
				if (newValue) {
					value = withTranslation ? translate(newValue) : newValue;
				} else {
					value = withTranslation ? translate(value) : value;
				}
			}
		}

		if (options?.rejectDefaultFallback) {
			value = value?.replace(/[_*]/g, "");
		}

		return value;
	};

	return {
		translate,
		language: language as string,
		setLanguage,
		availableLanguages,
	};
};

/**
 * @function
 * @description Determine the key to use for the translation
 * @param key The key to use for the translation
 * @param localeData The json object containing the translations
 * @returns The key to use for the translation, or the key if no translation is found
 */
function getKey(key: string, localeData: {}): string {
	// Check if the key is empty
	if (!key) {
		return "";
	}

	// Check if the key contains a dot, indicating a nested key
	if (!key.includes(".")) {
		return localeData[key as keyof typeof localeData] || `_${key}_`;
	}

	// In case of nested keys, split the key into an array and reduce it using the localeData object
	return (
		key
			?.split(".")
			?.reduce((acc, cur) => acc?.[cur as keyof {}], localeData)
			?.toString() || `_${key}_`
	);
}
export default useLsmTranslation;
