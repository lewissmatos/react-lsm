import { LsmLocaleOptions } from "../interfaces/lsmLocale.interfaces";
import { useLsmLocaleContext } from "./LsmLocaleContext";

// Create the hook
const useLsmLocale = () => {
	// Get the context
	let { language, locales, setLanguage } = useLsmLocaleContext();

	/**
	 * @function
	 * @description Create the hook's main function to translate the key and apply the options to format the value
	 * @param key The key to translate
	 * @param {LsmLocaleOptions} options The options to format the value with
	 * @throws Will throw an error if  language is not set, locales are not set, or if the locale for the language is not set.
	 * @returns The translated value or the key if no translation is found.
	 */
	const translate = (key: string, options?: LsmLocaleOptions) => {
		// Check if the language is set
		if (!language) throw new Error("language is not set");

		// Check if the locales are set
		if (!locales) throw new Error("locales are not set");

		// Check if the locale for the language is set
		if (!locales[language]) throw new Error("locales for language not found");

		// Get the locale data using the language as a key
		const localeData = locales[language] || Object.values(locales)?.[0] || {};

		// Get the translated value
		const translatedValue = getKey(key, localeData);

		// Format the value using the options
		const value =
			(options
				? formatLocaleValue(translatedValue, options)
				: translatedValue) || key;
		return value;
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
	 * - capitalize: Capitalize the first letter of the value
	 * - uppercase: Convert the value to uppercase
	 * - lowercase: Convert the value to lowercase
	 * - replace: Replace the value with the specified values
	 * - mutate: Mutate the value based on the specified options
	 */
	const formatLocaleValue = (
		value: string,
		options: LsmLocaleOptions = {}
	): string => {
		/*
		 * The capitalize option will capitalize the first letter of the value
		 */
		if (options.capitalize)
			value = value.charAt(0).toUpperCase() + value.slice(1);

		/*
		 * The uppercase option will uppercase the value
		 */
		if (options.uppercase) value = value.toUpperCase();

		/*
		 * The lowercase option will lowercase the value
		 */
		if (options.lowercase) value = value.toLowerCase();

		/*
		 * The startAdornment option will add the specified value to the beginning of the value
		 */
		if (options.startAdornment) value = `${options.startAdornment}${value}`;

		/*
		 * The endAdornment option will add the specified value to the end of the value
		 */
		if (options.endAdornment) value = `${value}${options.endAdornment}`;

		/*
		 * The replace option is an object with the following properties:
		 * - values: An object with the keys as the placeholder and the values as the replacement
		 * - withTranslation: Whether to translate the replacement value
		 */
		if (options.replace) {
			let replacedValue = value;
			Object.entries(options.replace.values).forEach(([key, value]) => {
				const mustTranslate = options.replace?.withTranslation || false;
				const finalValue = mustTranslate
					? translate(value?.toString())
					: value?.toString();
				replacedValue = replacedValue?.replace(
					new RegExp(`{${key}}`, "g"),
					finalValue
				);
			});
			value = replacedValue;
		}

		/*
		 * The mutate option is an object with the following properties:
		 * - when: Whether to mutate the value
		 * - value: The value to mutate
		 * - withTranslation: Whether to translate the value
		 * - endAdornment: The end adornment to add to the value
		 */
		if (options.mutate) {
			const { when, value: newValue, withTranslation } = options.mutate;
			if (when) {
				value = withTranslation ? translate(newValue) : newValue;
			}
		}

		return value;
	};

	return { translate, language: language as string, setLanguage };
};

/**
 * @function
 * @description Determine the key to use for the translation
 * @param key The key to use for the translation
 * @param localeData The json object containing the translations
 * @returns The key to use for the translation, or the key if no translation is found
 */
const getKey = (key: string, localeData: {}): string => {
	// Check if the key is empty
	if (!key) {
		return "";
	}

	// Check if the key contains a dot, indicating a nested key
	if (!key.includes(".")) {
		return localeData[key as keyof typeof localeData] || key;
	}

	// In case of nested keys, split the key into an array and reduce it using the localeData object
	return (
		key
			?.split(".")
			?.reduce((acc, cur) => acc?.[cur as keyof {}], localeData)
			?.toString() || key
	);
};
export default useLsmLocale;
