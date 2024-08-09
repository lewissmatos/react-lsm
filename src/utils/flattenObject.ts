type FlattenObject = {
	obj: any;
	parentKey?: string;
	result?: any;
	format?: FlattenObjectKeyFormats;
};

export type FlattenObjectKeyFormats = "snake" | "camel" | "pascal" | "upper";

export const flattenObject = ({
	obj,
	parentKey = "",
	result = {},
	format = "snake",
}: FlattenObject) => {
	for (let key in obj) {
		const formattedKey = formatKey(key, format);
		const newKey = parentKey ? `${parentKey}_${formattedKey}` : formattedKey;
		if (typeof obj[key] === "object" && obj[key] !== null) {
			flattenObject({
				obj: obj[key],
				parentKey: newKey,
				result,
				format,
			});
		} else {
			result[newKey] = `${parentKey ? parentKey + "." : ""}${key}`;
		}
	}
	return result;
};

const formatKey = (key: string, format: FlattenObjectKeyFormats): string => {
	switch (format) {
		case "camel":
			return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
		case "pascal":
			return key.replace(/(^\w|_\w)/g, (_, letter) =>
				letter.toUpperCase().replace("_", "")
			);
		case "upper":
			return key.toUpperCase();
		case "snake":
		default:
			return key;
	}
};
