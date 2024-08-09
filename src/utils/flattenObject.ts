type FlattenObject = {
	obj: any;
	parentKey?: string;
	result?: any;
};

export const flattenObject = ({
	obj,
	parentKey = "",
	result = {},
}: FlattenObject) => {
	for (let key in obj) {
		const newKey = parentKey ? `${parentKey}_${key}` : key;
		if (typeof obj[key] === "object" && obj[key] !== null) {
			flattenObject({
				obj: obj[key],
				parentKey: newKey,
				result,
			});
		} else {
			result[newKey] = `${parentKey ? parentKey + "." : ""}${key}`.replace(
				/_/g,
				"."
			);
		}
	}
	return result;
};
